// Sirve dist-pages como lo haría GitHub Pages (bajo el prefijo y con 404.html como respaldo) para probar antes de publicar.
//   node servir-local.mjs [--puerto 4173] [--prefijo /valencia-stetic-preview]
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';

const AQUI = import.meta.dirname, RAIZ = path.resolve(AQUI, '..', 'dist-pages');
const arg = (n, d) => { const i = process.argv.indexOf(n); return i >= 0 ? process.argv[i + 1] : d; };
const PUERTO = Number(arg('--puerto', '4173')), PREFIJO = arg('--prefijo', '/valencia-stetic-preview').replace(/\/+$/, '');
const TIPOS = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.png': 'image/png', '.jpg': 'image/jpeg', '.wasm': 'application/wasm', '.json': 'application/json' };

http.createServer((req, res) => {
  const ruta = decodeURIComponent(new URL(req.url, 'http://x').pathname);
  if (!ruta.startsWith(PREFIJO)) { res.writeHead(302, { Location: PREFIJO + '/' }); return res.end(); }
  let rel = ruta.slice(PREFIJO.length) || '/';
  let f = path.join(RAIZ, rel);
  if (!f.startsWith(RAIZ)) { res.writeHead(403); return res.end(); }
  if (fs.existsSync(f) && fs.statSync(f).isDirectory()) f = path.join(f, 'index.html');
  let estado = 200;
  if (!fs.existsSync(f)) { f = path.join(RAIZ, '404.html'); estado = 404; }
  res.writeHead(estado, { 'Content-Type': TIPOS[path.extname(f)] || 'application/octet-stream' });
  fs.createReadStream(f).pipe(res);
}).listen(PUERTO, () => console.log(`Preview estático: http://localhost:${PUERTO}${PREFIJO}/reservas/demo`));
