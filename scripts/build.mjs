import { transformSync } from 'esbuild';
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');

// ── Build config
const esbuildOpts = {
  loader: 'jsx',
  jsxFactory: 'React.createElement',
  jsxFragment: 'React.Fragment',
  minify: true,
  target: 'es2020',
  charset: 'utf8',
  sourcemap: false,
};

const distDir = join(root, 'dist');
if (!existsSync(distDir)) mkdirSync(distDir, { recursive: true });

function buildBundle(outputName, sourceFiles) {
  const combined = sourceFiles.map(f => {
    const src = readFileSync(join(root, f), 'utf-8');
    return `/* ── ${f} ── */\n${src}`;
  }).join('\n\n');
  const result = transformSync(combined, esbuildOpts);
  writeFileSync(join(distDir, outputName), result.code);
  const kb = (Buffer.byteLength(result.code) / 1024).toFixed(1);
  console.log(`✅ dist/${outputName} — ${kb} KB`);
  return result.code;
}

// Order matters — globals depend on prior scripts
const files = [
  'i18n.jsx',
  'logos.jsx',
  'tweaks-panel.jsx',
  'calculator.jsx',
  'landing.jsx',
];

console.log('⚡ Building SeriesPro360…');
const t0 = performance.now();

// ── CSS: minify styles.css → dist/app.min.css
const cssRaw = readFileSync(join(root, 'styles.css'), 'utf-8');
const cssResult = transformSync(cssRaw, { loader: 'css', minify: true });
writeFileSync(join(distDir, 'app.min.css'), cssResult.code);
console.log(`✅ dist/app.min.css — ${(Buffer.byteLength(cssResult.code) / 1024).toFixed(1)} KB`);

// ── Bundle 1: landing page principale
buildBundle('app.min.js', files);

// ── Bundle 2: i18n seul (partagé par les pages produit)
buildBundle('i18n.min.js', ['i18n.jsx']);

// ── Bundle 3: page produit (logos + calculator + product-page)
buildBundle('product-page.min.js', ['logos.jsx', 'calculator.jsx', 'product-page.jsx']);

// ── Bundle 4: TrimPro360 landing page style SeriesPro360
buildBundle('trimpro360-landing.min.js', ['trimpro360-landing.jsx']);

// ── Bundle 5: CalcuPro360 landing page style SeriesPro360
buildBundle('calcupro360-landing.min.js', ['calcupro360-landing.jsx']);

const ms = (performance.now() - t0).toFixed(0);

// Auto-update cache-buster in ALL html files
const hash = Date.now().toString(36);
const { readdirSync } = await import('fs');
const htmlFiles = readdirSync(root).filter(f => f.endsWith('.html'));
for (const file of htmlFiles) {
  const filePath = join(root, file);
  let html = readFileSync(filePath, 'utf-8');
  html = html.replace(/dist\/app\.min\.css(\?v=[^"']+)?/g, `dist/app.min.css?v=${hash}`);
  html = html.replace(/dist\/app\.min\.js(\?v=[^"']+)?/g, `dist/app.min.js?v=${hash}`);
  html = html.replace(/dist\/i18n\.min\.js(\?v=[^"']+)?/g, `dist/i18n.min.js?v=${hash}`);
  html = html.replace(/dist\/product-page\.min\.js(\?v=[^"']+)?/g, `dist/product-page.min.js?v=${hash}`);
  html = html.replace(/dist\/trimpro360-landing\.min\.js(\?v=[^"']+)?/g, `dist/trimpro360-landing.min.js?v=${hash}`);
  html = html.replace(/dist\/calcupro360-landing\.min\.js(\?v=[^"']+)?/g, `dist/calcupro360-landing.min.js?v=${hash}`);
  html = html.replace(/dist\/landing\.js[^"']*/g, `dist/app.min.js?v=${hash}`);
  writeFileSync(filePath, html);
}
console.log(`✅ cache-buster → v=${hash} (${htmlFiles.length} fichiers HTML)`);
console.log(`⚡ Done in ${ms}ms`);
