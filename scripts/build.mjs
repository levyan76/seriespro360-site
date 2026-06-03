import { transformSync } from 'esbuild';
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');

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

// Concatenate all source files
const combined = files
  .map(f => {
    const src = readFileSync(join(root, f), 'utf-8');
    return `/* ── ${f} ── */\n${src}`;
  })
  .join('\n\n');

// Transpile JSX → JS + minify
const result = transformSync(combined, {
  loader: 'jsx',
  jsxFactory: 'React.createElement',
  jsxFragment: 'React.Fragment',
  minify: true,
  target: 'es2020',
  charset: 'utf8',
  sourcemap: false,
});

// Write output
const distDir = join(root, 'dist');
if (!existsSync(distDir)) mkdirSync(distDir, { recursive: true });
writeFileSync(join(distDir, 'app.min.js'), result.code);

const sizeKB = (Buffer.byteLength(result.code) / 1024).toFixed(1);
const ms = (performance.now() - t0).toFixed(0);
console.log(`✅ dist/app.min.js — ${sizeKB} KB (${ms}ms)`);

// Auto-update cache-buster in index.html
const hash = Date.now().toString(36);
const indexPath = join(root, 'index.html');
let html = readFileSync(indexPath, 'utf-8');
html = html.replace(/dist\/app\.min\.js\?v=[^"]+/, `dist/app.min.js?v=${hash}`);
html = html.replace(/dist\/landing\.js[^"]*/, `dist/app.min.js?v=${hash}`);
writeFileSync(indexPath, html);
console.log(`✅ index.html cache-buster → v=${hash}`);
