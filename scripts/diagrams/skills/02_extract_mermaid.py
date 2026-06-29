#!/usr/bin/env python3
"""
SKILL 02 — Mermaid Block Extractor

Extrae todos los bloques ```mermaid de un archivo Markdown y los guarda
como archivos .mmd individuales listos para renderizar con mmdc.

USO:
  python3 skills/02_extract_mermaid.py [input_md] [output_dir]

  Defaults:
    input_md   = output/diagrams.md       (generado por el agente)
    output_dir = output/mmd/

INPUT:  output/diagrams.md  — el markdown con todos los diagramas Mermaid
OUTPUT: output/mmd/*.mmd    — un archivo por diagrama
        output/mmd/manifest.txt — mapeo idx → nombre de página
"""

import re, os, sys, json

def extract(src_file, out_dir):
    os.makedirs(out_dir, exist_ok=True)
    content = open(src_file, encoding='utf-8').read()

    # Match heading + mermaid block
    pattern = re.compile(
        r'^(#{1,4} .+?)$.*?```mermaid\n(.*?)```',
        re.MULTILINE | re.DOTALL
    )
    matches = list(pattern.finditer(content))

    if not matches:
        print("⚠️  No se encontraron bloques ```mermaid en el archivo.")
        sys.exit(1)

    manifest = []
    for i, m in enumerate(matches):
        heading = re.sub(r'^#+\s+', '', m.group(1)).strip()
        heading = re.sub(r'[*_`]', '', heading)
        code    = m.group(2).strip()

        safe = re.sub(r'[^\w\s-]', '', heading).strip().replace(' ', '_')[:50]
        fname = f"{i:02d}_{safe}"

        mmd_path = os.path.join(out_dir, fname + '.mmd')
        open(mmd_path, 'w', encoding='utf-8').write(code)
        manifest.append({'index': i, 'file': fname, 'heading': heading, 'type': code.split('\n')[0].strip()})
        print(f"  [{i:02d}] {heading[:60]}")

    manifest_path = os.path.join(out_dir, 'manifest.json')
    json.dump(manifest, open(manifest_path, 'w', encoding='utf-8'), ensure_ascii=False, indent=2)

    print(f"\n✅  {len(matches)} bloques extraídos → {out_dir}")
    print(f"   Manifest: {manifest_path}")
    return manifest

if __name__ == '__main__':
    src = sys.argv[1] if len(sys.argv) > 1 else 'output/diagrams.md'
    dst = sys.argv[2] if len(sys.argv) > 2 else 'output/mmd'

    # Resolve relative to script dir
    base = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    if not os.path.isabs(src): src = os.path.join(base, src)
    if not os.path.isabs(dst): dst = os.path.join(base, dst)

    if not os.path.exists(src):
        print(f"❌  Archivo no encontrado: {src}")
        print(f"   El agente debe generar primero el markdown de diagramas en output/diagrams.md")
        sys.exit(1)

    print(f"\n🔍  Extrayendo bloques Mermaid de: {src}\n")
    extract(src, dst)
