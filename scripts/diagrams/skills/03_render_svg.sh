#!/usr/bin/env bash
# SKILL 03 — Mermaid → SVG renderer
#
# Renderiza cada archivo .mmd en output/mmd/ a .svg usando @mermaid-js/mermaid-cli (mmdc)
# Requiere: node >= 18, @mermaid-js/mermaid-cli instalado (npm install en scripts/diagrams/)
#
# USO: bash skills/03_render_svg.sh [mmd_dir] [svg_dir]
#   Defaults:
#     mmd_dir = output/mmd/
#     svg_dir = output/svg/

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BASE_DIR="$(dirname "$SCRIPT_DIR")"

MMD_DIR="${1:-$BASE_DIR/output/mmd}"
SVG_DIR="${2:-$BASE_DIR/output/svg}"

mkdir -p "$SVG_DIR"

# puppeteer config: no-sandbox para CI/cloud
PUPPETEER_CFG="$BASE_DIR/config/puppeteer.json"
if [ ! -f "$PUPPETEER_CFG" ]; then
  echo '{"args":["--no-sandbox","--disable-setuid-sandbox","--disable-dev-shm-usage"]}' > "$PUPPETEER_CFG"
fi

# Detect mmdc
MMDC=""
if command -v mmdc &>/dev/null; then
  MMDC="mmdc"
elif [ -f "$BASE_DIR/node_modules/.bin/mmdc" ]; then
  MMDC="$BASE_DIR/node_modules/.bin/mmdc"
elif command -v npx &>/dev/null; then
  MMDC="npx mmdc"
else
  echo "❌  mmdc no encontrado. Ejecutar: npm install en scripts/diagrams/"
  exit 1
fi

MMD_FILES=("$MMD_DIR"/*.mmd)
if [ ${#MMD_FILES[@]} -eq 0 ] || [ ! -f "${MMD_FILES[0]}" ]; then
  echo "❌  No se encontraron archivos .mmd en $MMD_DIR"
  echo "   Ejecutar primero: python3 skills/02_extract_mermaid.py"
  exit 1
fi

echo ""
echo "🎨  Renderizando ${#MMD_FILES[@]} diagramas Mermaid → SVG"
echo "   mmdc: $MMDC"
echo "   output: $SVG_DIR"
echo ""

OK=0
FAIL=0

for mmd_file in "$MMD_DIR"/*.mmd; do
  base=$(basename "$mmd_file" .mmd)
  svg_file="$SVG_DIR/${base}.svg"

  printf "  %-60s " "$base ..."

  if $MMDC \
      -i "$mmd_file" \
      -o "$svg_file" \
      -p "$PUPPETEER_CFG" \
      --width 1600 \
      2>/dev/null; then
    size=$(wc -c < "$svg_file" 2>/dev/null || echo 0)
    echo "✅ ($(( size / 1024 ))KB)"
    (( OK++ )) || true
  else
    echo "❌"
    (( FAIL++ )) || true
  fi
done

echo ""
echo "✅  $OK SVGs generados  |  ❌ $FAIL errores"
echo "   Directorio: $SVG_DIR"

[ $FAIL -eq 0 ] || exit 1
