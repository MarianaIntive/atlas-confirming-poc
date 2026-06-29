#!/usr/bin/env python3
"""
SKILL 05 — Build Outputs
Copia los PNGs al directorio de destino y construye el archivo .drawio
multi-página embebiendo los PNGs como base64.

USO: python3 skills/05_build_outputs.py [config_file]
  config_file = config/pipeline.config.json (default)

INPUT:
  output/png/           — PNGs generados por el skill 04
  output/mmd/manifest.json — nombres de páginas

OUTPUT:
  {output_assets_dir}/*.png    — PNGs copiados con nombres limpios
  {output_assets_dir}/*.drawio — archivo draw.io multi-página
"""

import os, sys, json, base64, struct, shutil, re
from datetime import datetime, timezone
from pathlib import Path

SCRIPT_DIR = Path(__file__).parent
BASE_DIR   = SCRIPT_DIR.parent

# ─── Load pipeline config ────────────────────────────────────────────────────
cfg_path = sys.argv[1] if len(sys.argv) > 1 else BASE_DIR / 'config' / 'pipeline.config.json'
cfg_path = Path(cfg_path)

if not cfg_path.exists():
    print(f"❌  Config no encontrado: {cfg_path}")
    sys.exit(1)

cfg = json.loads(cfg_path.read_text())

PNG_DIR        = BASE_DIR / 'output' / 'png'
MMD_MANIFEST   = BASE_DIR / 'output' / 'mmd' / 'manifest.json'
ASSETS_DIR     = Path(cfg.get('output_assets_dir', str(BASE_DIR / 'output' / 'assets')))
PROJECT_NAME   = cfg.get('project_name', 'proyecto')

ASSETS_DIR.mkdir(parents=True, exist_ok=True)

# ─── Load manifests ──────────────────────────────────────────────────────────
if not PNG_DIR.exists():
    print(f"❌  Directorio PNG no encontrado: {PNG_DIR}")
    print("   Ejecutar primero: node skills/04_svg_to_png.js")
    sys.exit(1)

# Build page name mapping from mmd manifest
page_names = {}
if MMD_MANIFEST.exists():
    for entry in json.loads(MMD_MANIFEST.read_text()):
        fname = entry['file']
        heading = entry['heading']
        page_names[fname + '.png'] = heading

# ─── Helper: PNG dimensions from header ──────────────────────────────────────
def png_dims(path):
    with open(path, 'rb') as f:
        data = f.read(24)
    if len(data) < 24: return 800, 600
    w = struct.unpack('>I', data[16:20])[0]
    h = struct.unpack('>I', data[20:24])[0]
    return w, h

# ─── Process PNGs ────────────────────────────────────────────────────────────
png_files = sorted([f for f in PNG_DIR.iterdir() if f.suffix == '.png' and f.stem != 'test'])
if not png_files:
    print(f"❌  No hay PNGs en {PNG_DIR}")
    sys.exit(1)

print(f"\n📦  Construyendo outputs para {len(png_files)} diagramas")
print(f"   Destino: {ASSETS_DIR}\n")

pages = []
copied = []

for i, png_path in enumerate(png_files):
    # Clean destination name: strip leading NN_ prefix if present
    dest_name = re.sub(r'^\d+_', '', png_path.name)
    dest_path = ASSETS_DIR / dest_name

    # Copy PNG
    shutil.copy2(png_path, dest_path)

    # Determine page name
    heading = page_names.get(png_path.name, dest_name.replace('.png', '').replace('_', ' '))

    # Build draw.io page
    raw_w, raw_h = png_dims(png_path)
    log_w, log_h = raw_w // 2, raw_h // 2  # deviceScaleFactor=2

    data_b64 = base64.b64encode(png_path.read_bytes()).decode('ascii')
    data_uri  = f"data:image/png;base64,{data_b64}"

    safe_name = heading.replace('"', '').replace('<', '').replace('>', '').replace('&', 'y')[:60]
    page_xml = f"""<diagram id="pg{i:02d}" name="{safe_name}">
  <mxGraphModel dx="1422" dy="762" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="{log_w + 100}" pageHeight="{log_h + 100}">
    <root>
      <mxCell id="0"/>
      <mxCell id="1" parent="0"/>
      <mxCell id="2" value="" style="shape=image;html=1;verticalLabelPosition=bottom;labelBackgroundColor=none;verticalAlign=top;align=center;strokeColor=none;fillColor=none;aspect=fixed;image={data_uri};" vertex="1" parent="1">
        <mxGeometry x="50" y="50" width="{log_w}" height="{log_h}" as="geometry"/>
      </mxCell>
    </root>
  </mxGraphModel>
</diagram>"""
    pages.append(page_xml)
    copied.append(dest_name)
    size_kb = png_path.stat().st_size // 1024
    print(f"  [{i:02d}] {dest_name:<55} {log_w}×{log_h}  {size_kb}KB")

# ─── Write draw.io file ───────────────────────────────────────────────────────
now = datetime.now(timezone.utc).strftime('%Y-%m-%dT%H:%M:%S.000Z')
drawio_content = f'<?xml version="1.0" encoding="UTF-8"?>\n'
drawio_content += f'<mxfile host="diagrams.net" modified="{now}" agent="Cursor Cloud Agent" version="26.0.0">\n'
drawio_content += '\n'.join(pages)
drawio_content += '\n</mxfile>'

drawio_name = f"{re.sub(r'[^a-z0-9_-]', '_', PROJECT_NAME.lower())}_diagramas.drawio"
drawio_path = ASSETS_DIR / drawio_name
drawio_path.write_text(drawio_content, encoding='utf-8')

size_mb = drawio_path.stat().st_size / 1024 / 1024
print(f"\n✅  {len(copied)} PNGs copiados a {ASSETS_DIR}")
print(f"✅  draw.io: {drawio_path}  ({size_mb:.1f}MB, {len(pages)} páginas)")
