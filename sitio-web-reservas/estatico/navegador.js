// Backend en el navegador: la MISMA agenda, bot y API pública del servidor, ejecutados en la página con SQLite en WebAssembly.
// Intercepta fetch('/api/publico/…') y responde con rutaPublica(); los datos se guardan en este navegador (localStorage).
import './shims/preludio.js';
import { usarSql } from './shims/sqlite.js';
import * as db from '../../sistema-agendamiento/src/db.js';
import { rutaPublica } from '../../sistema-agendamiento/src/reservas.js';

const PREF = globalThis.VS_PREFIJO || '';
const CLAVE = 'vs_estatico_db';

const aBase64 = bytes => { let s = ''; for (let i = 0; i < bytes.length; i += 0x8000) s += String.fromCharCode(...bytes.subarray(i, i + 0x8000)); return btoa(s); };
const deBase64 = t => Uint8Array.from(atob(t), c => c.charCodeAt(0));

async function iniciar() {
  const SQL = await globalThis.initSqlJs({ locateFile: f => `${PREF}/reservas/${f}` });
  usarSql(SQL);
  try { const guardada = localStorage.getItem(CLAVE); if (guardada) globalThis.__VS_DB_BYTES = deBase64(guardada); } catch { /* sin almacenamiento */ }
  try { db.abrirDb(':memory:'); }
  catch { globalThis.__VS_DB_BYTES = null; try { localStorage.removeItem(CLAVE); } catch { /* nada */ } db.abrirDb(':memory:'); }
}
const listo = iniciar();

let pendiente = null;
function persistir() {
  clearTimeout(pendiente);
  pendiente = setTimeout(() => {
    try { const t = aBase64(db.getDb().exportar()); if (t.length < 4_500_000) localStorage.setItem(CLAVE, t); } catch { /* sin almacenamiento */ }
  }, 500);
}

async function manejar(url, init) {
  await listo;
  const ruta = url.pathname.slice(url.pathname.indexOf('/api/publico')) + url.search;
  const req = { method: String(init?.method || 'GET').toUpperCase(), headers: { 'x-forwarded-for': 'navegador' }, socket: { remoteAddress: 'navegador' }, _cuerpo: init?.body || '' };
  const leerJson = async r => { try { return JSON.parse(r._cuerpo || '{}'); } catch { return {}; } };
  const responder = (datos, estado) => new Response(JSON.stringify(datos).split('"/reservas/').join(`"${PREF}/reservas/`), { status: estado, headers: { 'Content-Type': 'application/json; charset=utf-8' } });
  try {
    const datos = await rutaPublica(req, new URL(ruta, 'http://local'), leerJson);
    if (req.method !== 'GET') persistir();
    return responder(datos, 200);
  } catch (err) {
    return responder({ error: err?.estado ? err.message : 'Ocurrió un error. Inténtalo de nuevo.' }, err?.estado || 500);
  }
}

const fetchOriginal = globalThis.fetch.bind(globalThis);
globalThis.fetch = (entrada, init) => {
  const url = new URL(typeof entrada === 'string' ? entrada : entrada.url, location.href);
  return url.pathname.includes('/api/publico') ? manejar(url, init) : fetchOriginal(entrada, init);
};
globalThis.VSBackend = { listo, reiniciar: () => { try { localStorage.removeItem(CLAVE); } catch { /* nada */ } location.reload(); } };
