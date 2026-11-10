// Sincroniza los archivos PROPIOS del sitio web (carpeta `codigo/`) con el proyecto de la agenda (`../sistema-agendamiento`),
// que es donde el sitio realmente se ejecuta (lo sirve el mismo servidor del bot).
//
//   node sincronizar.mjs estado              Compara las dos carpetas y dice cuál está más nueva (no cambia nada)
//   node sincronizar.mjs publicar [--probar] Copia codigo/ → sistema-agendamiento (y con --probar corre `npm test` allá)
//   node sincronizar.mjs traer               Copia sistema-agendamiento → codigo/ (si alguien editó directo en la agenda)
//   (publicar y traer no pisan un archivo distinto y más nuevo en el destino; agrega --forzar para hacerlo)
//
// Regla de trabajo: el chat del SITIO edita en `codigo/` y publica; el chat de la AGENDA no toca estos archivos
// (sí los puntos de integración listados en INTEGRACION.md). Fuente de verdad: `codigo/`.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { spawnSync } from 'node:child_process';

const SITIO = import.meta.dirname, CODIGO = path.join(SITIO, 'codigo'), AGENDA = path.resolve(SITIO, '..', 'sistema-agendamiento');
const ARCHIVOS = [
  'public/reservas/index.html', 'public/reservas/app.js', 'public/reservas/estilos.css', 'public/reservas/asistente.js', 'public/reservas/logo.png', 'public/reservas/favicon.png',
  'src/reservas.js', 'src/enlaces.js', 'src/demo.js', 'test/reservas.test.js',
];
// Fotos de servicios y galería: todo lo que haya en codigo/public/reservas/fotos/ se publica también
const dirFotos = path.join(CODIGO, 'public', 'reservas', 'fotos');
if (fs.existsSync(dirFotos)) for (const f of fs.readdirSync(dirFotos)) if (/\.(jpe?g|png|webp)$/i.test(f)) ARCHIVOS.push(`public/reservas/fotos/${f}`);
const [cmd = 'estado', ...flags] = process.argv.slice(2), forzar = flags.includes('--forzar'), probar = flags.includes('--probar');
const hash = f => (fs.existsSync(f) ? crypto.createHash('sha256').update(fs.readFileSync(f)).digest('hex') : null);
const mtime = f => (fs.existsSync(f) ? fs.statSync(f).mtimeMs : 0);

if (!fs.existsSync(AGENDA)) { console.error(`No encuentro el proyecto de la agenda en ${AGENDA}`); process.exit(1); }
const filas = ARCHIVOS.map(rel => {
  const a = path.join(CODIGO, rel), b = path.join(AGENDA, rel), ha = hash(a), hb = hash(b);
  const estado = ha === hb ? 'igual' : !ha ? 'solo en agenda' : !hb ? 'solo en sitio' : mtime(a) >= mtime(b) ? 'sitio más nuevo' : 'AGENDA más nueva';
  return { rel, a, b, estado };
});

function copiar(origenKey, destinoKey, etiqueta) {
  let n = 0, saltados = [];
  for (const f of filas) {
    if (f.estado === 'igual') continue;
    const [orig, dest] = [f[origenKey], f[destinoKey]];
    if (!fs.existsSync(orig)) continue;
    const destinoMasNuevo = fs.existsSync(dest) && mtime(dest) > mtime(orig);
    if (destinoMasNuevo && !forzar) { saltados.push(f.rel); continue; }
    fs.mkdirSync(path.dirname(dest), { recursive: true }); fs.copyFileSync(orig, dest); fs.utimesSync(dest, new Date(), new Date(fs.statSync(orig).mtimeMs)); n++;
    console.log(`  ${etiqueta}: ${f.rel}`);
  }
  console.log(`${n} archivo(s) copiado(s).`);
  if (saltados.length) console.log(`NO se copiaron (el destino es más nuevo; revisa y usa --forzar si quieres pisarlos):\n  - ${saltados.join('\n  - ')}`);
}

if (cmd === 'estado') {
  for (const f of filas) console.log(`${f.estado.padEnd(18)} ${f.rel}`);
  const dif = filas.filter(f => f.estado !== 'igual').length;
  console.log(dif ? `\n${dif} archivo(s) distinto(s).` : '\nTodo igual: el sitio y la agenda están sincronizados.');
} else if (cmd === 'publicar') {
  copiar('a', 'b', 'sitio → agenda');
  if (probar) { const r = spawnSync('npm', ['test'], { cwd: AGENDA, stdio: 'inherit', shell: true }); process.exit(r.status ?? 1); }
} else if (cmd === 'traer') copiar('b', 'a', 'agenda → sitio');
else { console.error('Uso: node sincronizar.mjs estado | publicar [--probar] | traer   (--forzar para pisar el destino más nuevo)'); process.exit(1); }
