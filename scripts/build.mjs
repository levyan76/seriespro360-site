import { createRequire } from 'module';
const require = createRequire(import.meta.url);
import { buildSync, transformSync } from 'esbuild';
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { createHash } from 'crypto';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');

const pkg = JSON.parse(readFileSync(join(root, 'package.json'), 'utf-8'));

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
  external: ['react', 'react-dom'],
  define: {
    '__APP_VERSION__': JSON.stringify(pkg.version),
  },
});

// Process CSS
const cssSrc = readFileSync(join(root, 'styles.css'), 'utf-8');
const cssResult = transformSync(cssSrc, {
  loader: 'css',
  minify: true,
});
writeFileSync(join(distDir, 'app.min.css'), cssResult.code);

// Auto-versioning: inject content hash into index.html
const landingJs = readFileSync(join(distDir, 'landing.js'));
const hash = createHash('sha256').update(landingJs).digest('hex').slice(0, 8);
const indexPath = join(root, 'index.html');
const indexSrc = readFileSync(indexPath, 'utf-8');
const indexUpdated = indexSrc.replace(/dist\/landing\.js\?v=[^"]+/, `dist/landing.js?v=${hash}`);
writeFileSync(indexPath, indexUpdated);

const ms = (performance.now() - t0).toFixed(0);
console.log(`✅ Build completed in ${ms}ms`);
console.log(`✅ dist/landing.js (v=${hash})`);
console.log(`✅ dist/presentation.js`);
console.log(`✅ dist/app.min.css`);
