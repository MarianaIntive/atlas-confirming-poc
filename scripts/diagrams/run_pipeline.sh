#!/usr/bin/env bash
# ============================================================
#  PIPELINE — Generación automática de diagramas de arquitectura
# ============================================================
#
#  Ejecuta el pipeline completo en orden:
#    1. Fetch historias desde Jira
#    2. [AGENTE] Genera diagrams.md con los diagramas Mermaid
#    3. Extrae bloques .mmd del markdown
#    4. Renderiza SVGs con mermaid-cli
#    5. Convierte SVGs a PNGs con Puppeteer
#    6. Construye PNGs finales + archivo .drawio
#    7. (Opcional) Git commit y push
#
#  USO:
#    bash run_pipeline.sh [--skip-fetch] [--skip-agent] [--no-commit]
#
#  VARIABLES DE ENTORNO requeridas:
#    ATLASSIAN_BASE_URL  — ej: https://empresa.atlassian.net
#    ATLASSIAN_EMAIL     — ej: usuario@empresa.com
#    ATLASSIAN_API_TOKEN — token de Atlassian API
#
#  PASOS MANUALES (cuando se ejecuta sin Cursor Agent):
#    Después del paso 1, editar output/diagrams.md con los diagramas
#    Mermaid generados por el agente IA, luego continuar con --skip-fetch
# ============================================================

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

# ─── Parse args ──────────────────────────────────────────────────────────────
SKIP_FETCH=false
SKIP_AGENT=false
NO_COMMIT=false

for arg in "$@"; do
  case "$arg" in
    --skip-fetch) SKIP_FETCH=true ;;
    --skip-agent) SKIP_AGENT=true ;;
    --no-commit)  NO_COMMIT=true ;;
  esac
done

# ─── Colors ──────────────────────────────────────────────────────────────────
RED='\033[0;31m'; GREEN='\033[0;32m'; YELLOW='\033[1;33m'; CYAN='\033[0;36m'; NC='\033[0m'
step() { echo -e "\n${CYAN}━━━ PASO $1: $2 ${NC}"; }
ok()   { echo -e "${GREEN}✅  $1${NC}"; }
warn() { echo -e "${YELLOW}⚠️   $1${NC}"; }
err()  { echo -e "${RED}❌  $1${NC}"; }

# ─── Verify dependencies ─────────────────────────────────────────────────────
echo -e "\n${CYAN}🚀  PIPELINE — Generación de Diagramas de Arquitectura${NC}"
echo    "   $(date '+%Y-%m-%d %H:%M:%S')"
echo    "   Directorio: $SCRIPT_DIR"

if [ ! -f "node_modules/.bin/mmdc" ]; then
  warn "node_modules no instalados. Ejecutando npm install..."
  npm install --silent
fi

# ─── PASO 1: Fetch Jira ───────────────────────────────────────────────────────
if [ "$SKIP_FETCH" = false ]; then
  step 1 "Fetch historias desde Jira"

  if [ -z "${ATLASSIAN_BASE_URL:-}" ] || [ -z "${ATLASSIAN_EMAIL:-}" ] || [ -z "${ATLASSIAN_API_TOKEN:-}" ]; then
    err "Faltan variables de entorno Jira. Agregar en Cursor Dashboard → Secrets:"
    echo "     ATLASSIAN_BASE_URL, ATLASSIAN_EMAIL, ATLASSIAN_API_TOKEN"
    exit 1
  fi

  node skills/01_jira_fetcher.js
  ok "Historias guardadas en output/jira_stories.json y output/jira_stories_summary.md"
else
  warn "PASO 1 omitido (--skip-fetch)"
fi

# ─── PASO 2: Agente genera diagrams.md ───────────────────────────────────────
step 2 "Generación de diagramas Mermaid por el agente IA"

if [ "$SKIP_AGENT" = false ]; then
  if [ ! -f "output/jira_stories_summary.md" ]; then
    err "Falta output/jira_stories_summary.md — ejecutar primero sin --skip-fetch"
    exit 1
  fi

  cat <<'AGENT_PROMPT'
══════════════════════════════════════════════════════════════════
  ACCIÓN REQUERIDA — CURSOR AGENT
══════════════════════════════════════════════════════════════════
  El agente debe leer el archivo output/jira_stories_summary.md
  y generar output/diagrams.md con los siguientes diagramas Mermaid:

  1. Diagrama de arquitectura general (flowchart TB)
  2. Diagrama de capas FE → BFF(s) → BE (flowchart LR)
  3. Diagrama de secuencia por cada endpoint POST (guardar)
  4. Diagrama de secuencia por cada endpoint GET (grilla)
  5. Diagrama de secuencia por cada endpoint GET (detalle/info)
  6. Diagrama de secuencia por cada endpoint PATCH (actualizar)
  7. User flow por cada dominio de negocio
  8. Modelo de datos ER

  Formato del output/diagrams.md:
    ## Nombre del diagrama
    ```mermaid
    ...código mermaid...
    ```

  Instrucciones de arquitectura (de config/issues.json):
    - BFFs separados según campo "bffs" en config/issues.json
    - BE es el microservicio indicado en "microservicio_be"
    - Flujos OK + ERROR BFF + ERROR BE en cada secuencia

  Cuando termines de generar output/diagrams.md,
  continuar el pipeline con: bash run_pipeline.sh --skip-fetch --skip-agent
══════════════════════════════════════════════════════════════════
AGENT_PROMPT

  echo ""
  warn "Pipeline pausado. El agente debe generar output/diagrams.md"
  warn "Luego ejecutar: bash run_pipeline.sh --skip-fetch --skip-agent"
  exit 0
else
  if [ ! -f "output/diagrams.md" ]; then
    err "Falta output/diagrams.md — el agente debe generarlo primero"
    exit 1
  fi
  ok "Usando output/diagrams.md existente"
fi

# ─── PASO 3: Extract mermaid blocks ──────────────────────────────────────────
step 3 "Extraer bloques Mermaid → archivos .mmd"
python3 skills/02_extract_mermaid.py
ok "Archivos .mmd generados en output/mmd/"

# ─── PASO 4: Render SVG ───────────────────────────────────────────────────────
step 4 "Renderizar .mmd → .svg (mermaid-cli)"
bash skills/03_render_svg.sh
ok "SVGs generados en output/svg/"

# ─── PASO 5: SVG → PNG ────────────────────────────────────────────────────────
step 5 "Convertir .svg → .png (Puppeteer @2x)"
node skills/04_svg_to_png.js
ok "PNGs generados en output/png/"

# ─── PASO 6: Build final outputs ─────────────────────────────────────────────
step 6 "Construir outputs finales (PNGs + .drawio)"
python3 skills/05_build_outputs.py
ok "Assets generados en el directorio configurado"

# ─── PASO 7: Git commit ───────────────────────────────────────────────────────
if [ "$NO_COMMIT" = false ]; then
  step 7 "Git commit y push"
  cd "$(git rev-parse --show-toplevel 2>/dev/null || echo "$SCRIPT_DIR/../..")"

  PROJECT=$(node -e "const c=require('$SCRIPT_DIR/config/issues.json'); console.log(c.projectName || 'proyecto')" 2>/dev/null || echo "proyecto")
  DATE=$(date '+%Y-%m-%d')

  git add assets/ 2>/dev/null || true
  if git diff --cached --quiet; then
    warn "No hay cambios para commitear"
  else
    git commit -m "Actualizar diagramas de arquitectura: ${PROJECT} (${DATE})"
    git push
    ok "Cambios pusheados a $(git branch --show-current)"
  fi
else
  warn "PASO 7 omitido (--no-commit)"
fi

echo ""
echo -e "${GREEN}══════════════════════════════════════════════════════════════════${NC}"
echo -e "${GREEN}  ✅  PIPELINE COMPLETADO EXITOSAMENTE${NC}"
echo -e "${GREEN}══════════════════════════════════════════════════════════════════${NC}"
echo ""
