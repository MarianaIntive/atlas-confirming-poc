# Agente de Diagramas de Arquitectura

Genera automáticamente diagramas de arquitectura (secuencia, flowchart, ER, user flow)
desde historias Jira. Produce PNGs listos para entregar y un archivo `.drawio` multi-página.

---

## Estructura del agente

```
scripts/diagrams/
├── run_pipeline.sh              ← Orchestrador principal
├── package.json
├── config/
│   ├── issues.json              ← ✏️ EDITAR: lista de issues Jira
│   ├── pipeline.config.json     ← ✏️ EDITAR: rutas de output, nombre proyecto
│   └── puppeteer.json           ← Config Chrome headless (no editar)
├── skills/
│   ├── 01_jira_fetcher.js       ← Descarga historias desde la API de Jira
│   ├── 02_extract_mermaid.py    ← Extrae bloques ```mermaid del .md generado
│   ├── 03_render_svg.sh         ← Renderiza .mmd → .svg con mermaid-cli
│   ├── 04_svg_to_png.js         ← Convierte .svg → .png con Puppeteer @2x
│   └── 05_build_outputs.py      ← Copia PNGs al destino y construye .drawio
└── output/                      ← Generado automáticamente (gitignored)
    ├── jira_stories.json
    ├── jira_stories_summary.md
    ├── diagrams.md              ← Generado por el agente IA
    ├── mmd/                     ← Archivos .mmd individuales
    ├── svg/                     ← SVGs renderizados
    └── png/                     ← PNGs @2x
```

---

## Uso rápido

### 1. Configurar el nuevo proyecto

Editar `config/issues.json`:
```json
{
  "issues": ["PROJ-1", "PROJ-2", "PROJ-3"],
  "projectName": "Nombre del Proyecto",
  "bffs": {
    "BFF ENTES": ["Entes", "Usuarios"],
    "BFF NOTIFICACIONES": ["Notificaciones"]
  },
  "microservicio_be": "API CORE BANKING"
}
```

Editar `config/pipeline.config.json`:
```json
{
  "project_name": "mi-proyecto",
  "output_assets_dir": "assets/diagramas"
}
```

### 2. Configurar credenciales Jira

Agregar en **Cursor Dashboard → Cloud Agents → Secrets**:

| Variable | Valor |
|----------|-------|
| `ATLASSIAN_BASE_URL` | `https://tu-empresa.atlassian.net` |
| `ATLASSIAN_EMAIL` | `usuario@empresa.com` |
| `ATLASSIAN_API_TOKEN` | Token de https://id.atlassian.com/manage-profile/security/api-tokens |

### 3. Instalar dependencias (solo primera vez)

```bash
cd scripts/diagrams
npm install
```

### 4. Ejecutar el pipeline completo (con Cursor Agent)

Decirle al agente:
> "Generar diagramas de arquitectura desde Jira para los issues en `scripts/diagrams/config/issues.json`"

El agente:
1. Ejecuta el fetch de Jira (skill 01)
2. Analiza las historias y genera `output/diagrams.md`
3. Ejecuta los skills de renderización (02–05)
4. Hace commit y push automático

### 5. Ejecutar solo la fase de renderización (sin agente)

Si ya tenés `output/diagrams.md` con los diagramas Mermaid:

```bash
cd scripts/diagrams
bash run_pipeline.sh --skip-fetch --skip-agent
```

### 6. Ejecutar todo sin commit automático

```bash
bash run_pipeline.sh --no-commit
```

---

## Skills individuales

Cada skill puede ejecutarse de forma independiente:

```bash
cd scripts/diagrams

# Descargar historias de Jira
node skills/01_jira_fetcher.js

# Extraer bloques Mermaid de un .md
python3 skills/02_extract_mermaid.py output/diagrams.md output/mmd/

# Renderizar SVGs
bash skills/03_render_svg.sh output/mmd/ output/svg/

# Convertir SVGs a PNGs
node skills/04_svg_to_png.js output/svg/ output/png/

# Construir outputs finales
python3 skills/05_build_outputs.py
```

---

## Outputs generados

| Archivo | Descripción |
|---------|-------------|
| `assets/diagramas/*.png` | Un PNG por diagrama (1600px @2x) |
| `assets/diagramas/*.drawio` | Archivo draw.io multi-página (todos los diagramas) |
| `assets/arquitectura_diagramas_v*.md` | Markdown con todos los diagramas Mermaid |

---

## Diagramas generados automáticamente

| # | Tipo | Contenido |
|---|------|-----------|
| 01 | Arquitectura general | FE → API GW → BFF(s) → BE → Infra |
| 02 | Capas FE→BFF→BE | Todos los endpoints mapeados |
| 03–N | Secuencia por endpoint | Flujos OK + ERROR BFF + ERROR BE |
| N+1–M | User flows | Uno por dominio de negocio |
| M+1 | Modelo ER | Entidades y relaciones |

---

## Requisitos del entorno

| Herramienta | Versión | Uso |
|-------------|---------|-----|
| Node.js | >= 18 | mermaid-cli, puppeteer |
| Python 3 | >= 3.9 | extract, build_outputs |
| Google Chrome / Chromium | Cualquiera | Renderizado PNG |
| npm | >= 9 | Gestión de paquetes |

---

## Regla Cursor (.cursor/rules/architecture-diagrams.mdc)

Esta carpeta incluye una regla Cursor que guía al agente automáticamente
cuando detecta solicitudes de generación de diagramas. El agente sabe:
- Qué diagramas generar y en qué formato
- Qué BFFs usar según la configuración
- Cómo estructurar el `output/diagrams.md`
- Cómo ejecutar el pipeline de renderización

---

*Banco Atlas — Portal Confirming — v1.0.0*
