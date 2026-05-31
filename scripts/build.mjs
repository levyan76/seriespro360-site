import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const sharp = require('sharp');
import { buildSync, transformSync } from 'esbuild';
import { readFileSync, writeFileSync, mkdirSync, existsSync, copyFileSync } from 'fs';
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

// Copy + optimize product logos → dist/logos/
const logosDistDir = join(distDir, 'logos');
if (!existsSync(logosDistDir)) mkdirSync(logosDistDir, { recursive: true });

const logosToCopy = [
  { src: join(root, 'logos/logo-trimpro360.png'),  dest: join(logosDistDir, 'logo-trimpro360.webp'),  w: 200 },
  { src: join(root, 'logos/logo-calcupro360.png'), dest: join(logosDistDir, 'logo-calcupro360.webp'), w: 200 },
];
for (const l of logosToCopy) {
  if (existsSync(l.src)) {
    await sharp(l.src).resize(l.w).webp({ quality: 85 }).toFile(l.dest);
    const kb = (require('fs').statSync(l.dest).size / 1024).toFixed(0);
    console.log(`✅ ${l.dest.split('/').pop()} — ${kb} KB`);
  }
}

// Optimize og-image → WebP
const ogSrc = join(root, 'og-image.jpg');
const ogDest = join(root, 'og-image.webp');
if (existsSync(ogSrc)) {
  await sharp(ogSrc).webp({ quality: 82 }).toFile(ogDest);
  const sizeKB = (require('fs').statSync(ogDest).size / 1024).toFixed(0);
  console.log(`✅ og-image.webp — ${sizeKB} KB`);
}

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
