#!/usr/bin/env node
/**
 * SKILL 01 — Jira Story Fetcher
 *
 * Descarga las historias de Jira indicadas y guarda un JSON con
 * el contenido completo (summary, descripción, criterios de aceptación,
 * estado, tipo) listo para que el agente genere los diagramas Mermaid.
 *
 * USO:
 *   node skills/01_jira_fetcher.js
 *
 * VARIABLES DE ENTORNO requeridas (agregar en Cursor Secrets):
 *   ATLASSIAN_BASE_URL  — ej: https://tu-empresa.atlassian.net
 *   ATLASSIAN_EMAIL     — ej: usuario@empresa.com
 *   ATLASSIAN_API_TOKEN — token generado en id.atlassian.com/manage-profile/security/api-tokens
 *
 * INPUT:  config/issues.json   — lista de issue keys a descargar
 * OUTPUT: output/jira_stories.json — historias en bruto
 *         output/jira_stories_summary.md — resumen legible para el agente
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

// ─── Config ────────────────────────────────────────────────────────────────
const BASE_URL = process.env.ATLASSIAN_BASE_URL || '';
const EMAIL    = process.env.ATLASSIAN_EMAIL    || '';
const TOKEN    = process.env.ATLASSIAN_API_TOKEN || '';

const CONFIG_FILE  = path.join(__dirname, '../config/issues.json');
const OUTPUT_JSON  = path.join(__dirname, '../output/jira_stories.json');
const OUTPUT_MD    = path.join(__dirname, '../output/jira_stories_summary.md');

if (!BASE_URL || !EMAIL || !TOKEN) {
  console.error('❌  Faltan variables de entorno: ATLASSIAN_BASE_URL, ATLASSIAN_EMAIL, ATLASSIAN_API_TOKEN');
  console.error('   Agregalas en Cursor Dashboard → Cloud Agents → Secrets');
  process.exit(1);
}

// ─── Helpers ────────────────────────────────────────────────────────────────
function apiRequest(path) {
  return new Promise((resolve, reject) => {
    const auth = Buffer.from(`${EMAIL}:${TOKEN}`).toString('base64');
    const url  = new URL(path, BASE_URL);
    const options = {
      hostname: url.hostname,
      path: url.pathname + url.search,
      method: 'GET',
      headers: { 'Authorization': `Basic ${auth}`, 'Accept': 'application/json' }
    };
    const req = https.request(options, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try { resolve({ status: res.statusCode, body: JSON.parse(data) }); }
        catch(e) { resolve({ status: res.statusCode, body: data }); }
      });
    });
    req.on('error', reject);
    req.end();
  });
}

/** Extrae texto plano del formato ADF (Atlassian Document Format) */
function adfToText(node, depth = 0) {
  if (!node) return '';
  if (typeof node === 'string') return node;

  const type = node.type;
  let text = '';

  if (type === 'text') return node.text || '';

  if (type === 'paragraph') {
    const inner = (node.content || []).map(n => adfToText(n)).join('');
    return inner.trim() ? inner + '\n' : '';
  }
  if (type === 'heading') {
    const level = '#'.repeat(node.attrs?.level || 2);
    const inner = (node.content || []).map(n => adfToText(n)).join('');
    return `${level} ${inner}\n`;
  }
  if (type === 'bulletList' || type === 'orderedList') {
    return (node.content || []).map((li, i) => {
      const bullet = type === 'orderedList' ? `${i + 1}.` : '-';
      const inner = (li.content || []).map(n => adfToText(n)).join('').trim();
      return `  ${bullet} ${inner}`;
    }).join('\n') + '\n';
  }
  if (type === 'listItem') {
    return (node.content || []).map(n => adfToText(n)).join('');
  }
  if (type === 'codeBlock') {
    const code = (node.content || []).map(n => adfToText(n)).join('');
    return `\`\`\`\n${code}\n\`\`\`\n`;
  }
  if (type === 'blockquote') {
    return (node.content || []).map(n => '> ' + adfToText(n)).join('');
  }
  if (type === 'table') {
    return '[tabla]\n';
  }
  // generic: recurse
  return (node.content || []).map(n => adfToText(n, depth + 1)).join('');
}

// ─── Main ────────────────────────────────────────────────────────────────────
async function main() {
  // Read issue list from config
  if (!fs.existsSync(CONFIG_FILE)) {
    console.error(`❌  Archivo de configuración no encontrado: ${CONFIG_FILE}`);
    console.error('   Crealo con el formato: { "issues": ["PROJ-1", "PROJ-2", ...] }');
    process.exit(1);
  }

  const config = JSON.parse(fs.readFileSync(CONFIG_FILE, 'utf8'));
  const issueKeys = config.issues || [];

  if (!issueKeys.length) {
    console.error('❌  No hay issues configurados en config/issues.json');
    process.exit(1);
  }

  console.log(`\n📋  Fetching ${issueKeys.length} issues desde ${BASE_URL}\n`);

  const stories = [];
  const errors  = [];

  for (const key of issueKeys) {
    process.stdout.write(`  → ${key} ... `);
    try {
      const res = await apiRequest(
        `/rest/api/3/issue/${key}?fields=summary,description,status,issuetype,priority,assignee,labels,components,customfield_10014`
      );
      if (res.status !== 200) {
        console.log(`❌ HTTP ${res.status}`);
        errors.push({ key, error: `HTTP ${res.status}` });
        continue;
      }
      const f = res.body.fields || {};
      const descText = f.description
        ? (typeof f.description === 'object' ? adfToText(f.description) : String(f.description))
        : '';

      stories.push({
        key,
        summary:     f.summary || '',
        status:      f.status?.name || '',
        type:        f.issuetype?.name || '',
        priority:    f.priority?.name || '',
        description: descText.trim(),
        url:         `${BASE_URL}/browse/${key}`,
      });
      console.log(`✅ ${f.summary?.slice(0, 60) || ''}`);
    } catch (err) {
      console.log(`❌ ${err.message}`);
      errors.push({ key, error: err.message });
    }
  }

  // Save raw JSON
  fs.mkdirSync(path.dirname(OUTPUT_JSON), { recursive: true });
  fs.writeFileSync(OUTPUT_JSON, JSON.stringify({ stories, errors, fetchedAt: new Date().toISOString() }, null, 2));

  // Build markdown summary for the agent
  let md = `# Historias Jira — ${config.projectName || 'Proyecto'}\n\n`;
  md += `> Extraído: ${new Date().toISOString()}  \n`;
  md += `> Fuente: ${BASE_URL}  \n`;
  md += `> Total: ${stories.length} historias, ${errors.length} errores\n\n---\n\n`;

  for (const s of stories) {
    md += `## [${s.key}](${s.url}) — ${s.summary}\n\n`;
    md += `| Campo | Valor |\n|-------|-------|\n`;
    md += `| **Estado** | ${s.status} |\n`;
    md += `| **Tipo** | ${s.type} |\n`;
    md += `| **Prioridad** | ${s.priority} |\n\n`;
    if (s.description) {
      md += `### Descripción\n\n${s.description}\n\n`;
    }
    md += `---\n\n`;
  }

  if (errors.length) {
    md += `## ⚠️ Errores al obtener\n\n`;
    errors.forEach(e => { md += `- **${e.key}**: ${e.error}\n`; });
  }

  fs.writeFileSync(OUTPUT_MD, md);

  console.log(`\n✅  Listo:`);
  console.log(`   JSON: ${OUTPUT_JSON}`);
  console.log(`   MD:   ${OUTPUT_MD}`);
  console.log(`   ${stories.length} historias obtenidas, ${errors.length} errores\n`);

  if (errors.length) {
    console.warn(`⚠️  Issues con error: ${errors.map(e => e.key).join(', ')}`);
  }
}

main().catch(err => { console.error(err); process.exit(1); });
