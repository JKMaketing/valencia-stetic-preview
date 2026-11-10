// Sirve la demo para el cliente en http://localhost:3210 con el mismo esqueleto HTML que usa la publicación.
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const dir = dirname(fileURLToPath(import.meta.url));
createServer(async (req, res) => {
  const cuerpo = await readFile(join(dir, 'demo-cliente.html'), 'utf8');
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end(`<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover"></head><body>${cuerpo}</body></html>`);
}).listen(3210, () => console.log('Demo en http://localhost:3210'));
