import { createRequire } from 'module';
const require = createRequire(import.meta.url);
import { buildSync, transformSync } from 'esbuild';
import { readFileSync, writeFileSync, mkdirSync, existsSync, statSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');

console.log('⚡ Building SeriesPro360…');
const t0 = performance.now();

const distDir = join(root, 'dist');
if (!existsSync(distDir)) mkdirSync(distDir, { recursive: true });

// Build JS entry points
buildSync({
  entryPoints: {
    'landing': join(root, 'landing.jsx'),
    'presentation': join(root, 'presentation.jsx')
  },
  outdir: distDir,
  bundle: true,
  minify: true,
  target: 'es2020',
  charset: 'utf8',
  jsxFactory: 'React.createElement',
  jsxFragment: 'React.Fragment',
  external: ['react', 'react-dom']
});

// Process CSS
const cssSrc = readFileSync(join(root, 'styles.css'), 'utf-8');
const cssResult = transformSync(cssSrc, {
  loader: 'css',
  minify: true,
});
writeFileSync(join(distDir, 'app.min.css'), cssResult.code);

const ms = (performance.now() - t0).toFixed(0);
console.log(`✅ Build completed in ${ms}ms`);
console.log(`✅ dist/landing.js`);
console.log(`✅ dist/presentation.js`);
console.log(`✅ dist/app.min.css`);
