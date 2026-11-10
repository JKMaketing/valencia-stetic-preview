// Preview compartible: web de reservas + asistente integrado + recorrido de demostración, con base de datos de PRUEBA.
//
//   node demo.mjs                    Demo local en primer plano: http://localhost:3300/reservas/demo
//   node demo.mjs --publico          Además crea un enlace público temporal (https://….trycloudflare.com, requiere `cloudflared`)
//   node demo.mjs iniciar [--publico]  Lo deja corriendo en segundo plano (sin ventana) y muestra el enlace
//   node demo.mjs estado             Dice si está corriendo, el enlace y si responde
//   node demo.mjs enlace             Imprime solo el enlace público
//   node demo.mjs parar              Lo detiene (el enlace público deja de existir)
//
// Seguridad: usa una base nueva en demo-datos/ (se borra en cada arranque), no envía nada a WhatsApp, deja el simulador
// desactivado y bloquea el panel con una clave aleatoria. Solo se exponen /reservas y /api/publico.
// Fiabilidad: si el servidor o el túnel se caen, se vuelven a levantar solos (con el túnel el enlace puede cambiar: queda en demo-enlace.txt).
import { spawn, spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const SITIO = import.meta.dirname, AGENDA = path.resolve(SITIO, '..', 'sistema-agendamiento'), DATOS = path.join(SITIO, 'demo-datos');
const PID = path.join(SITIO, 'demo.pid'), ENLACE = path.join(SITIO, 'demo-enlace.txt'), LOG = path.join(SITIO, 'demo.log');
const PUERTO = Number(process.env.DEMO_PORT || 3300);
const [orden, ...resto] = process.argv.slice(2);
const comando = ['iniciar', 'estado', 'enlace', 'parar'].includes(orden) ? orden : null;
const publico = (comando ? resto : [orden, ...resto]).includes('--publico');
const vivo = pid => { try { process.kill(pid, 0); return true; } catch { return false; } };
const leerPid = () => { try { return Number(fs.readFileSync(PID, 'utf8')) || 0; } catch { return 0; } };
const leerEnlace = () => { try { return fs.readFileSync(ENLACE, 'utf8').trim(); } catch { return ''; } };
const responde = async url => { try { return (await fetch(url, { signal: AbortSignal.timeout(6000) })).ok; } catch { return false; } };
const matarArbol = pid => (process.platform === 'win32' ? spawnSync('taskkill', ['/PID', String(pid), '/T', '/F'], { stdio: 'ignore' }) : process.kill(pid));

// ───────── Órdenes de control ─────────
if (comando === 'estado' || comando === 'enlace') {
  const pid = leerPid(), url = leerEnlace();
  if (comando === 'enlace') { console.log(url ? `${url}/reservas/demo` : '(sin enlace público)'); process.exit(0); }
  if (!pid || !vivo(pid)) { console.log('La demo NO está corriendo. Inícialo con: npm run demo:iniciar'); process.exit(0); }
  const local = await responde(`http://localhost:${PUERTO}/health`), externo = url ? await responde(`${url}/health`) : null;
  console.log(`Corriendo (PID ${pid}). Local: ${local ? 'responde' : 'NO responde'}.${url ? ` Público: ${externo ? 'responde' : 'NO responde'} → ${url}/reservas/demo` : ' Sin enlace público.'}`);
  process.exit(0);
}
if (comando === 'parar') {
  const pid = leerPid();
  if (pid && vivo(pid)) { matarArbol(pid); console.log('Demo detenida.'); } else console.log('La demo no estaba corriendo.');
  for (const f of [PID, ENLACE]) fs.rmSync(f, { force: true });
  process.exit(0);
}
if (comando === 'iniciar') {
  const previo = leerPid();
  if (previo && vivo(previo)) { console.log(`Ya está corriendo (PID ${previo}). Usa «estado», «enlace» o «parar».`); process.exit(0); }
  fs.rmSync(ENLACE, { force: true });
  const fd = fs.openSync(LOG, 'w');
  const hijo = spawn(process.execPath, [import.meta.filename, ...(publico ? ['--publico'] : [])], { detached: true, stdio: ['ignore', fd, fd], windowsHide: true, cwd: SITIO });
  hijo.unref();
  for (let i = 0; i < 60; i++) {
    await new Promise(r => setTimeout(r, 1000));
    if (await responde(`http://localhost:${PUERTO}/health`) && (!publico || leerEnlace())) break;
  }
  const url = leerEnlace();
  console.log(`Demo corriendo en segundo plano (PID ${hijo.pid}).\nLocal:   http://localhost:${PUERTO}/reservas/demo${url ? `\nPúblico: ${url}/reservas/demo` : ''}\nDetener: npm run demo:parar   ·   Estado: npm run demo:estado`);
  process.exit(0);
}

// ───────── Ejecución (primer plano o proceso en segundo plano) ─────────
fs.rmSync(DATOS, { recursive: true, force: true });
fs.mkdirSync(DATOS, { recursive: true });
fs.writeFileSync(PID, String(process.pid));
let cerrando = false, servidor = null, tunel = null, urlActual = '';
const salir = () => { cerrando = true; for (const h of [servidor, tunel]) if (h?.pid) matarArbol(h.pid); for (const f of [PID, ENLACE]) fs.rmSync(f, { force: true }); process.exit(0); };
process.on('SIGINT', salir); process.on('SIGTERM', salir);
const reinicios = []; // marcas de tiempo: si se cae demasiadas veces seguidas, se rinde
const demasiados = () => { const ahora = Date.now(); reinicios.push(ahora); while (reinicios.length && ahora - reinicios[0] > 300_000) reinicios.shift(); return reinicios.length > 8; };

function arrancarServidor(urlPublica) {
  const env = {
    ...process.env, PORT: String(PUERTO), DATA_DIR: DATOS, MODO_DEMO: '1', SIMULADOR: '0', WA_TOKEN: '', WA_PHONE_NUMBER_ID: '',
    PANEL_PASSWORD: crypto.randomBytes(12).toString('base64url'), SESSION_SECRET: crypto.randomBytes(24).toString('hex'),
    TRUST_PROXY: publico ? '1' : '', PUBLIC_URL: urlPublica || '', RESERVAS_MAX_POR_HORA: '30',
  };
  servidor = spawn(process.execPath, ['--disable-warning=ExperimentalWarning', 'src/server.js'], { cwd: AGENDA, env, stdio: 'inherit' });
  const este = servidor;
  servidor.on('exit', c => {
    if (cerrando || este.detenido) return;
    console.log(`Servidor detenido (${c}).`);
    if (demasiados()) { console.error('Se cayó demasiadas veces seguidas: me detengo.'); salir(); }
    console.log('Reiniciando el servidor…'); setTimeout(() => arrancarServidor(urlPublica), 1500);
  });
  console.log(`\nDemo local:   http://localhost:${PUERTO}/reservas/demo\nWeb:          http://localhost:${PUERTO}/reservas`);
  if (urlPublica) { console.log(`\n★ ENLACE PARA COMPARTIR:  ${urlPublica}/reservas/demo\n  (temporal: deja de funcionar al detener la demo o apagar el equipo)\n`); fs.writeFileSync(ENLACE, urlPublica); }
}

function arrancarTunel() {
  const bin = ['cloudflared', 'C:\\Program Files (x86)\\cloudflared\\cloudflared.exe'].find(b => spawnSync(b, ['--version'], { stdio: 'ignore' }).status === 0);
  if (!bin) { console.error('No encuentro `cloudflared`. Instálalo (https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/downloads/) o usa la demo sin --publico.'); salir(); }
  tunel = spawn(bin, ['tunnel', '--no-autoupdate', '--url', `http://localhost:${PUERTO}`], { stdio: ['ignore', 'pipe', 'pipe'] });
  let listo = false;
  const leer = d => { const m = String(d).match(/https:\/\/[a-z0-9-]+\.trycloudflare\.com/); if (m && !listo) { listo = true; urlActual = m[0]; if (servidor?.pid) { servidor.detenido = true; matarArbol(servidor.pid); setTimeout(() => arrancarServidor(urlActual), 1500); } else arrancarServidor(urlActual); } };
  tunel.stdout.on('data', leer); tunel.stderr.on('data', leer);
  tunel.on('exit', () => {
    if (cerrando) return;
    console.log('El túnel se cerró.');
    if (demasiados()) { console.error('El túnel se cayó demasiadas veces seguidas: me detengo.'); salir(); }
    console.log('Abriendo un túnel nuevo (el enlace cambiará)…'); setTimeout(arrancarTunel, 2000);
  });
  setTimeout(() => { if (!listo && !cerrando) { console.error('El túnel no respondió a tiempo.'); salir(); } }, 45000);
}

if (!publico) arrancarServidor('');
else arrancarTunel();

// Vigilancia: si el enlace público deja de responder (túnel colgado), se reabre
if (publico) setInterval(async () => {
  if (cerrando || !urlActual) return;
  if (!(await responde(`${urlActual}/health`)) && !(await responde(`${urlActual}/health`))) {
    console.log('El enlace público no responde: reabriendo el túnel…');
    if (tunel?.pid) matarArbol(tunel.pid);
  }
}, 120_000);
