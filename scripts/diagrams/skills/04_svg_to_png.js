#!/usr/bin/env node
/**
 * SKILL 04 — SVG → PNG (via Puppeteer @ deviceScaleFactor 2x)
 *
 * Convierte cada .svg en output/svg/ a .png de alta resolución en output/png/
 * usando Puppeteer (Chromium headless).
 *
 * USO: node skills/04_svg_to_png.js [svg_dir] [png_dir]
 *   Defaults:
 *     svg_dir = output/svg/
 *     png_dir = output/png/
 *
 * Requiere: puppeteer (npm install en scripts/diagrams/)
 */

const puppeteer = require('puppeteer');
const fs        = require('fs');
const path      = require('path');

const SCRIPT_DIR = __dirname;
const BASE_DIR   = path.dirname(SCRIPT_DIR);

const SVG_DIR = process.argv[2]
  ? path.resolve(process.argv[2])
  : path.join(BASE_DIR, 'output', 'svg');

const PNG_DIR = process.argv[3]
  ? path.resolve(process.argv[3])
  : path.join(BASE_DIR, 'output', 'png');

/** Parse the first viewBox attribute on the root <svg> element */
function getViewBox(svgContent) {
  const root = svgContent.match(/<svg[^>]+>/);
  if (!root) return null;
  const vb = root[0].match(/viewBox="([^"]+)"/);
  if (!vb) return null;
  const parts = vb[1].split(/\s+/).map(Number);
  return parts.length === 4 ? { x: parts[0], y: parts[1], w: parts[2], h: parts[3] } : null;
}

(async () => {
  if (!fs.existsSync(SVG_DIR)) {
    console.error(`❌  Directorio SVG no encontrado: ${SVG_DIR}`);
    console.error('   Ejecutar primero: bash skills/03_render_svg.sh');
    process.exit(1);
  }

  fs.mkdirSync(PNG_DIR, { recursive: true });

  const svgFiles = fs.readdirSync(SVG_DIR)
    .filter(f => f.endsWith('.svg') && f !== 'test.svg')
    .sort();

  if (!svgFiles.length) {
    console.error(`❌  No hay archivos .svg en ${SVG_DIR}`);
    process.exit(1);
  }

  console.log(`\n🖼️   Convirtiendo ${svgFiles.length} SVGs → PNG (2x resolución)\n`);

  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
    headless: 'new',
  });

  let ok = 0, fail = 0;
  const manifest = [];

  for (const svgFile of svgFiles) {
    const svgPath = path.join(SVG_DIR, svgFile);
    const pngName = svgFile.replace('.svg', '.png');
    const pngPath = path.join(PNG_DIR, pngName);

    const svgContent = fs.readFileSync(svgPath, 'utf8');
    const vb = getViewBox(svgContent);

    const rawW = vb ? vb.w : 1600;
    const rawH = vb ? vb.h : 900;
    const scale  = rawW > 1600 ? 1600 / rawW : 1;
    const pw = Math.ceil(rawW * scale);
    const ph = Math.ceil(rawH * scale);

    process.stdout.write(`  ${svgFile.slice(0, 55).padEnd(56)} `);
    try {
      const page = await browser.newPage();
      await page.setViewport({ width: pw, height: ph, deviceScaleFactor: 2 });
      await page.goto(`file://${svgPath}`, { waitUntil: 'networkidle0', timeout: 30000 });
      await page.evaluate((pw, ph) => {
        const svg = document.querySelector('svg');
        if (svg) { svg.setAttribute('width', pw); svg.setAttribute('height', ph); }
      }, pw, ph);
      await page.screenshot({ path: pngPath, fullPage: false, omitBackground: false });
      await page.close();

      const size = fs.statSync(pngPath).size;
      console.log(`✅ ${pw}×${ph} (${Math.round(size / 1024)}KB)`);
      manifest.push({ file: pngName, w: pw, h: ph, sizeKb: Math.round(size / 1024) });
      ok++;
    } catch (err) {
      console.log(`❌ ${err.message.slice(0, 60)}`);
      fail++;
    }
  }

  await browser.close();

  // Save manifest
  const mf = path.join(PNG_DIR, 'manifest.json');
  fs.writeFileSync(mf, JSON.stringify(manifest, null, 2));

  console.log(`\n✅  ${ok} PNGs generados  |  ❌ ${fail} errores`);
  console.log(`   Directorio: ${PNG_DIR}\n`);

  if (fail > 0) process.exit(1);
})();
