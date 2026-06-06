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

const ms = (performance.now() - t0).toFixed(0);

// Auto-update cache-buster in index.html
const hash = Date.now().toString(36);
const indexPath = join(root, 'index.html');
let html = readFileSync(indexPath, 'utf-8');
html = html.replace(/dist\/app\.min\.js\?v=[^"]+/, `dist/app.min.js?v=${hash}`);
html = html.replace(/dist\/landing\.js[^"]*/, `dist/app.min.js?v=${hash}`);
writeFileSync(indexPath, html);
console.log(`✅ index.html cache-buster → v=${hash}`);
console.log(`⚡ Done in ${ms}ms`);
