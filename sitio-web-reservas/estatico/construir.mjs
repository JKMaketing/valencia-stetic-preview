// Compila la web + agenda + bot para que corran 100% en el navegador y se publiquen en GitHub Pages (sin servidor).
//   node construir.mjs [--salida <carpeta>] [--prefijo /valencia-stetic-preview]
// Resultado: <salida>/ (index.html, 404.html, reservas/…). Publicarla con Pages: https://<usuario>.github.io<prefijo>/
import fs from 'node:fs';
import path from 'node:path';
import { build } from 'esbuild';

const AQUI = import.meta.dirname, SITIO = path.resolve(AQUI, '..'), AGENDA = path.resolve(SITIO, '..', 'sistema-agendamiento');
const arg = (n, d) => { const i = process.argv.indexOf(n); return i >= 0 ? process.argv[i + 1] : d; };
const SALIDA = path.resolve(arg('--salida', path.join(SITIO, 'dist-pages')));
const PREFIJO = arg('--prefijo', '/valencia-stetic-preview').replace(/\/+$/, '');
const RES = path.join(SALIDA, 'reservas');

fs.rmSync(SALIDA, { recursive: true, force: true });
fs.mkdirSync(RES, { recursive: true });

// 1) Configuración incrustada (lo que el servidor lee de config/*.json)
const generado = path.join(AQUI, '.generado');
fs.mkdirSync(generado, { recursive: true });
const archivos = {};
for (const rel of ['config/negocio.json', 'config/servicios.json']) archivos[rel] = fs.readFileSync(path.join(AGENDA, rel), 'utf8');
fs.writeFileSync(path.join(generado, 'archivos.js'), `globalThis.__VS_ARCHIVOS = ${JSON.stringify(archivos)};\n`);
const preludio = path.join(AQUI, 'shims', 'preludio.js');
const original = fs.readFileSync(preludio, 'utf8');
if (!original.includes('.generado/archivos.js')) fs.writeFileSync(preludio, `import '../.generado/archivos.js';\n${original}`);

// 2) Backend del navegador
const sh = n => path.join(AQUI, 'shims', n);
const alias = { 'node:fs': sh('fs.js'), 'node:path': sh('path.js'), 'node:url': sh('url.js'), 'node:crypto': sh('crypto.js'), 'node:sqlite': sh('sqlite.js'), '@anthropic-ai/sdk': sh('vacio.js') };
await build({
  entryPoints: [path.join(AQUI, 'navegador.js')], bundle: true, format: 'iife', platform: 'browser', target: 'es2022', minify: true, outfile: path.join(RES, 'backend.js'),
  define: { 'import.meta.url': JSON.stringify('file:///app/src/config.js') }, logLevel: 'warning',
  plugins: [{ name: 'node-shims', setup(b) { b.onResolve({ filter: /^(node:|@anthropic-ai)/ }, a => ({ path: alias[a.path] || alias[a.path.replace(/^node:/, 'node:')] })); } }],
});

// 3) Sitio (mismos archivos que sirve el servidor) con el prefijo de la publicación
const origen = path.join(SITIO, 'codigo', 'public', 'reservas');
const copiar = (de, a) => { fs.mkdirSync(path.dirname(a), { recursive: true }); fs.copyFileSync(de, a); };
for (const f of fs.readdirSync(origen, { withFileTypes: true })) {
  if (f.isDirectory()) { for (const g of fs.readdirSync(path.join(origen, f.name))) copiar(path.join(origen, f.name, g), path.join(RES, f.name, g)); continue; }
  const dest = path.join(RES, f.name);
  if (/\.(js|css|html)$/.test(f.name) && f.name !== 'backend.js') {
    let t = fs.readFileSync(path.join(origen, f.name), 'utf8');
    t = t.split("'/reservas").join(`'${PREFIJO}/reservas`).split('"/reservas').join(`"${PREFIJO}/reservas`);
    if (f.name === 'index.html') {
      t = t.replace('<meta charset="utf-8">', `<meta charset="utf-8">\n  <meta name="robots" content="noindex">`);
      t = t.replace(`<script src="${PREFIJO}/reservas/app.js" defer></script>`,
        `<script>window.VS_PREFIJO = ${JSON.stringify(PREFIJO)};</script>\n  <script src="${PREFIJO}/reservas/sql-wasm.js" defer></script>\n  <script src="${PREFIJO}/reservas/backend.js" defer></script>\n  <script src="${PREFIJO}/reservas/app.js" defer></script>`);
    }
    fs.writeFileSync(dest, t);
  } else copiar(path.join(origen, f.name), dest);
}
const sql = path.join(AQUI, 'node_modules', 'sql.js', 'dist');
copiar(path.join(sql, 'sql-wasm.js'), path.join(RES, 'sql-wasm.js'));
copiar(path.join(sql, 'sql-wasm.wasm'), path.join(RES, 'sql-wasm.wasm'));

// 3b) Rutas internas con su propia carpeta (así responden 200 y no dependen del 404.html)
const slugsPromo = [...fs.readFileSync(path.join(origen, 'app.js'), 'utf8').matchAll(/"id": "([a-z0-9-]+)", "nombre"/g)].map(m => m[1]);
for (const ruta of ['demo', 'reservar', 'mis-citas', 'privacidad', 'servicios', 'contacto', 'nosotros', ...slugsPromo.map(s => `promo/${s}`)]) {
  fs.mkdirSync(path.join(RES, ruta), { recursive: true });
  fs.copyFileSync(path.join(RES, 'index.html'), path.join(RES, ruta, 'index.html'));
}

// 4) Páginas de entrada: portada → recorrido de demostración; 404.html = la misma app (rutas internas como /reservas/reservar)
fs.copyFileSync(path.join(RES, 'index.html'), path.join(SALIDA, '404.html'));
fs.writeFileSync(path.join(SALIDA, 'index.html'), `<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="robots" content="noindex"><meta http-equiv="refresh" content="0; url=${PREFIJO}/reservas/demo"><title>Valencia Stetic · Preview</title></head><body><a href="${PREFIJO}/reservas/demo">Abrir el preview de Valencia Stetic</a></body></html>\n`);
fs.writeFileSync(path.join(SALIDA, '.nojekyll'), '');
const kb = f => Math.round(fs.statSync(f).size / 1024);
console.log(`Listo en ${SALIDA}\n  backend.js ${kb(path.join(RES, 'backend.js'))} KB · sql-wasm.wasm ${kb(path.join(RES, 'sql-wasm.wasm'))} KB · prefijo ${PREFIJO}`);
