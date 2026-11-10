// Servidor HTTP: webhook de WhatsApp, API del panel del equipo y simulador.
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { env, negocio, servicios, servicioPorId, modoSimulacion, ROOT } from './config.js';
import * as db from './db.js';
import * as bot from './bot.js';
import * as agenda from './agenda.js';
import * as wa from './whatsapp.js';
import { capiConfigurada } from './capi.js';
import * as reservas from './reservas.js';
import { iaDisponible } from './ia.js';
import { ejecutarTareas, iniciarProgramador } from './programador.js';
import { ahoraMs, aMs, aLocal, hoyLocal, sumarDias } from './tiempo.js';

// ───────── Utilidades HTTP ─────────
const json = (res, code, data) => { res.writeHead(code, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' }); res.end(JSON.stringify(data)); };
const leerCuerpo = req => new Promise((ok, mal) => {
  const partes = []; let tam = 0;
  req.on('data', c => { tam += c.length; if (tam > 2e6) { mal(new Error('Cuerpo demasiado grande')); req.destroy(); } else partes.push(c); });
  req.on('end', () => ok(Buffer.concat(partes)));
  req.on('error', mal);
});
const leerJson = async req => { const b = await leerCuerpo(req); try { return b.length ? JSON.parse(b.toString('utf8')) : {}; } catch { return {}; } };
function estatico(res, archivo, tipo = 'text/html; charset=utf-8') {
  const f = path.join(ROOT, 'public', archivo);
  if (!fs.existsSync(f)) return json(res, 404, { error: 'No encontrado' });
  res.writeHead(200, { 'Content-Type': tipo, 'Cache-Control': 'no-store' });
  fs.createReadStream(f).pipe(res);
}

/** Identificador del chat simulado. Con real=true (solo en modo simulación) usa el número tal cual, para probar la cita hecha en la página web con ese mismo número. */
const idSim = (numero, real = false) => (real && modoSimulacion() ? '' : 'sim') + String(numero).replace(/\D/g, '');

// ───────── Página pública de reservas (archivos de public/reservas, lista cerrada: sin rutas arbitrarias) ─────────
const ARCHIVOS_RESERVAS = { 'app.js': 'text/javascript; charset=utf-8', 'asistente.js': 'text/javascript; charset=utf-8', 'estilos.css': 'text/css; charset=utf-8', 'logo.png': 'image/png', 'favicon.png': 'image/png' };
function paginaReservas(res, p) {
  const sub = p.replace(/^\/reservas\/?/, '');
  const cabeceras = {
    'X-Content-Type-Options': 'nosniff', 'Referrer-Policy': 'strict-origin-when-cross-origin', 'Cache-Control': 'no-cache',
    'Content-Security-Policy': "default-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src https://fonts.gstatic.com; img-src 'self' data:; connect-src 'self'; frame-ancestors 'self'; base-uri 'self'; form-action 'self'",
  };
  let archivo, tipo;
  if (ARCHIVOS_RESERVAS[sub]) { archivo = path.join('reservas', sub); tipo = ARCHIVOS_RESERVAS[sub]; }
  else if (/^fotos\/[\w-]+\.(jpe?g|png|webp)$/i.test(sub)) { archivo = path.join('reservas', sub); tipo = { jpg: 'image/jpeg', jpeg: 'image/jpeg', png: 'image/png', webp: 'image/webp' }[sub.split('.').pop().toLowerCase()]; cabeceras['Cache-Control'] = 'public, max-age=3600'; }
  else if (sub === '' || ['reservar', 'mis-citas', 'privacidad', 'demo'].includes(sub) || /^cita\/[\w-]{20,64}$/.test(sub)) { archivo = path.join('reservas', 'index.html'); tipo = 'text/html; charset=utf-8'; }
  else return json(res, 404, { error: 'No encontrado' });
  const f = path.join(ROOT, 'public', archivo);
  if (!fs.existsSync(f)) return json(res, 404, { error: 'No encontrado' });
  res.writeHead(200, { 'Content-Type': tipo, ...cabeceras });
  fs.createReadStream(f).pipe(res);
}

// ───────── Sesión del panel ─────────
const COOKIE = 'vs_sesion';
const firmar = v => crypto.createHmac('sha256', env.SESSION_SECRET).update(v).digest('base64url');
const crearSesion = () => { const exp = String(ahoraMs() + 7 * 24 * 3600000); return `${exp}.${firmar(exp)}`; };
function sesionValida(req) {
  if (!env.PANEL_PASSWORD) return modoSimulacion(); // sin clave, solo se permite en modo simulación (desarrollo)
  const c = Object.fromEntries((req.headers.cookie || '').split(';').map(p => p.trim().split('=')).filter(p => p.length === 2));
  const [exp, sig] = (c[COOKIE] || '').split('.');
  if (!exp || !sig || Number(exp) < ahoraMs()) return false;
  const a = Buffer.from(sig), b = Buffer.from(firmar(exp));
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

// ───────── Cola por contacto (evita respuestas cruzadas si llegan mensajes seguidos) ─────────
const colas = new Map();
function encolar(clave, fn) {
  const p = (colas.get(clave) || Promise.resolve()).then(fn).catch(err => console.error('[bot]', err));
  colas.set(clave, p);
  p.finally(() => { if (colas.get(clave) === p) colas.delete(clave); });
  return p;
}

// ───────── Métricas ─────────
function resumen(desde, hasta) {
  const d = db.getDb();
  const msDesde = aMs(desde), msHasta = aMs(sumarDias(hasta, 1));
  const contactos = d.prepare('SELECT * FROM contactos WHERE primer_contacto >= ? AND primer_contacto < ?').all(msDesde, msHasta);
  const citasCreadas = d.prepare("SELECT * FROM citas WHERE creado >= ? AND creado < ?").all(msDesde, msHasta);
  const citasEnRango = d.prepare("SELECT * FROM citas WHERE inicio >= ? AND inicio < ?").all(desde, sumarDias(hasta, 1));
  const ahora = aLocal(ahoraMs());
  const vencidas = citasEnRango.filter(c => c.inicio < ahora && c.estado !== 'cancelada');
  const asistidas = citasEnRango.filter(c => c.estado === 'asistio');
  const origen = c => c.codigo_anuncio || c.ad_headline || (c.ad_id ? `Anuncio ${c.ad_id}` : null) || (c.ctwa_clid ? 'Anuncio (sin código)' : 'Orgánico / directo');
  const porAnuncio = {};
  const citasPorContacto = {};
  for (const ci of d.prepare("SELECT * FROM citas WHERE estado != 'cancelada' OR estado = 'cancelada'").all()) (citasPorContacto[ci.wa_id] ||= []).push(ci);
  for (const c of contactos) {
    const k = origen(c);
    const g = porAnuncio[k] ||= { origen: k, conversaciones: 0, con_cita: 0, asistieron: 0, ingresos: 0 };
    g.conversaciones++;
    const cs = (citasPorContacto[c.wa_id] || []).filter(ci => ci.estado !== 'cancelada');
    if (cs.length) g.con_cita++;
    const asis = cs.filter(ci => ci.estado === 'asistio');
    if (asis.length) g.asistieron++;
    g.ingresos += asis.reduce((s, ci) => s + (ci.valor_cobrado || 0), 0);
  }
  const porServicio = {};
  for (const ci of citasCreadas) {
    const g = porServicio[ci.servicio_id] ||= { servicio: servicioPorId(ci.servicio_id)?.nombre || ci.servicio_id, agendadas: 0, canceladas: 0, asistieron: 0 };
    g.agendadas++;
    if (ci.estado === 'cancelada') g.canceladas++;
    if (ci.estado === 'asistio') g.asistieron++;
  }
  const etapas = {};
  for (const c of contactos) etapas[c.etapa] = (etapas[c.etapa] || 0) + 1;
  const conCita = contactos.filter(c => (citasPorContacto[c.wa_id] || []).some(ci => ci.estado !== 'cancelada')).length;
  const tasa = (a, b) => (b ? Math.round((a / b) * 1000) / 10 : null);
  return {
    rango: { desde, hasta },
    conversaciones: contactos.length,
    desde_anuncio: contactos.filter(c => c.ctwa_clid || c.ad_id || c.codigo_anuncio).length,
    citas_agendadas: citasCreadas.filter(c => c.estado !== 'cancelada').length,
    citas_canceladas: citasCreadas.filter(c => c.estado === 'cancelada').length,
    citas_por_bot: citasCreadas.filter(c => c.origen === 'bot').length,
    asistieron: asistidas.length,
    no_asistieron: citasEnRango.filter(c => c.estado === 'no_asistio').length,
    pendientes_marcar: vencidas.filter(c => ['agendada', 'confirmada'].includes(c.estado)).length,
    ingresos: asistidas.reduce((s, c) => s + (c.valor_cobrado || 0), 0),
    tasa_conversacion_a_cita: tasa(conCita, contactos.length),
    tasa_asistencia: tasa(asistidas.length, vencidas.filter(c => c.estado === 'asistio' || c.estado === 'no_asistio').length),
    requieren_asesora: d.prepare("SELECT COUNT(*) n FROM contactos WHERE bot_pausado > 0").get().n,
    por_anuncio: Object.values(porAnuncio).sort((a, b) => b.conversaciones - a.conversaciones),
    por_servicio: Object.values(porServicio),
    etapas,
  };
}

function csvEmbudo() {
  const filas = [['id_contacto', 'primer_contacto', 'origen', 'codigo_anuncio', 'ad_id', 'servicio_interes', 'etapa', 'citas', 'asistencias', 'ingresos_cobrados']];
  const d = db.getDb();
  for (const c of d.prepare('SELECT * FROM contactos ORDER BY primer_contacto').all()) {
    const cs = d.prepare("SELECT * FROM citas WHERE wa_id = ? AND estado != 'cancelada'").all(c.wa_id);
    const asis = cs.filter(x => x.estado === 'asistio');
    filas.push([
      crypto.createHash('sha256').update(c.wa_id).digest('hex').slice(0, 10), // sin teléfono (privacidad)
      aLocal(c.primer_contacto || 0).replace('T', ' '),
      c.ctwa_clid || c.ad_id ? 'Meta Ads CTWA' : (c.codigo_anuncio ? 'Código de anuncio' : 'Orgánico/directo'),
      c.codigo_anuncio || '', c.ad_id || '', c.servicio_interes || '', c.etapa, cs.length, asis.length, asis.reduce((s, x) => s + (x.valor_cobrado || 0), 0),
    ]);
  }
  return '﻿' + filas.map(f => f.map(v => `"${String(v ?? '').replace(/"/g, '""')}"`).join(',')).join('\r\n');
}

// ───────── Rutas ─────────
async function rutas(req, res) {
  const url = new URL(req.url, 'http://local');
  const p = url.pathname.replace(/\/+$/, '') || '/';
  const q = Object.fromEntries(url.searchParams);
  const m = req.method;

  // Webhook de WhatsApp
  if (p === '/webhook' && m === 'GET') {
    if (q['hub.mode'] === 'subscribe' && q['hub.verify_token'] === env.WA_VERIFY_TOKEN) { res.writeHead(200, { 'Content-Type': 'text/plain' }); return res.end(q['hub.challenge'] || ''); }
    return json(res, 403, { error: 'Token de verificación inválido' });
  }
  if (p === '/webhook' && m === 'POST') {
    const raw = await leerCuerpo(req);
    if (!wa.firmaValida(raw, req.headers['x-hub-signature-256'])) return json(res, 401, { error: 'Firma inválida' });
    json(res, 200, { ok: true }); // responder rápido a Meta; se procesa después
    let body; try { body = JSON.parse(raw.toString('utf8')); } catch { return; }
    for (const msg of wa.parsearWebhook(body)) encolar(msg.wa_id, () => bot.procesarEntrante(msg));
    return;
  }

  if (p === '/health') return json(res, 200, { ok: true, simulacion: modoSimulacion(), hora_local: aLocal(ahoraMs()) });
  if (p === '/') { res.writeHead(302, { Location: '/reservas' }); return res.end(); }

  // ── Página pública de reservas y su API (sin sesión: la usan las clientas)
  if (p === '/reservas' || p.startsWith('/reservas/')) return paginaReservas(res, p);
  if (p.startsWith('/api/publico/')) {
    try { return json(res, 200, await reservas.rutaPublica(req, url, leerJson)); }
    catch (err) { if (!err.estado) console.error('[publico]', err); return json(res, err.estado || 500, { error: err.estado ? err.message : 'Ocurrió un error. Inténtalo de nuevo.' }); }
  }
  if (p === '/panel') return estatico(res, 'panel.html');
  if (p === '/simulador') return env.SIMULADOR ? estatico(res, 'simulador.html') : json(res, 404, { error: 'Simulador desactivado' });
  if (p === '/estilos.css') return estatico(res, 'estilos.css', 'text/css; charset=utf-8');

  // Inicio de sesión
  if (p === '/api/login' && m === 'POST') {
    const { clave } = await leerJson(req);
    if (!env.PANEL_PASSWORD && modoSimulacion()) return json(res, 200, { ok: true });
    const a = Buffer.from(String(clave || '')), b = Buffer.from(env.PANEL_PASSWORD || '');
    if (!env.PANEL_PASSWORD || a.length !== b.length || !crypto.timingSafeEqual(a, b)) return json(res, 401, { error: 'Clave incorrecta' });
    res.setHeader('Set-Cookie', `${COOKIE}=${crearSesion()}; HttpOnly; Path=/; SameSite=Lax; Max-Age=604800${env.PUBLIC_URL.startsWith('https') ? '; Secure' : ''}`);
    return json(res, 200, { ok: true });
  }
  if (p === '/api/logout') { res.setHeader('Set-Cookie', `${COOKIE}=; Path=/; Max-Age=0`); return json(res, 200, { ok: true }); }

  if (p.startsWith('/api/') || p.startsWith('/sim/')) {
    if (!sesionValida(req)) return json(res, 401, { error: 'Sesión requerida' });
  } else return json(res, 404, { error: 'No encontrado' });

  // ── Configuración y estado
  if (p === '/api/config') return json(res, 200, {
    negocio: { nombre: negocio.nombre, direccion: negocio.direccion, horario_texto: negocio.horario_texto, pendientes_confirmar: negocio.pendientes_confirmar, recursos: negocio.recursos },
    servicios, etapas: db.ETAPAS, simulacion: modoSimulacion(), capi: capiConfigurada(), ia: iaDisponible(), simulador: env.SIMULADOR,
    hoy: hoyLocal(), webhook: env.PUBLIC_URL ? `${env.PUBLIC_URL}/webhook` : '/webhook',
  });
  if (p === '/api/resumen') return json(res, 200, resumen(q.desde || sumarDias(hoyLocal(), -29), q.hasta || hoyLocal()));
  if (p === '/api/export.csv') { res.writeHead(200, { 'Content-Type': 'text/csv; charset=utf-8', 'Content-Disposition': 'attachment; filename="embudo_valencia_stetic.csv"' }); return res.end(csvEmbudo()); }
  if (p === '/api/capi') return json(res, 200, db.ultimosEventosCapi(50).map(e => ({ ...e, payload: JSON.parse(e.payload || '{}') })));
  if (p === '/api/tareas' && m === 'POST') return json(res, 200, await ejecutarTareas());

  // ── Citas
  if (p === '/api/citas' && m === 'GET') {
    const desde = q.desde || hoyLocal(); const hasta = q.hasta || sumarDias(desde, 1);
    return json(res, 200, db.citasDelRango(desde, hasta).map(c => ({ ...c, servicio: servicioPorId(c.servicio_id)?.nombre || c.servicio_id })));
  }
  if (p === '/api/citas' && m === 'POST') {
    const b = await leerJson(req);
    try { return json(res, 200, bot.crearCitaDesdePanel({ wa_id: b.wa_id, nombre: b.nombre, servicioId: b.servicio_id, inicio: b.inicio, notas: b.notas })); }
    catch (err) { return json(res, 409, { error: err instanceof agenda.CupoOcupadoError ? 'Ese horario no está disponible' : err.message }); }
  }
  let r;
  if ((r = p.match(/^\/api\/citas\/(\d+)\/estado$/)) && m === 'POST') {
    const { estado, valor, avisar } = await leerJson(req);
    const id = Number(r[1]);
    if (!db.obtenerCita(id)) return json(res, 404, { error: 'Cita no existe' });
    if (estado === 'asistio') return json(res, 200, await bot.marcarAsistio(id, valor));
    if (estado === 'no_asistio') return json(res, 200, bot.marcarNoAsistio(id));
    if (estado === 'cancelada') return json(res, 200, await bot.cancelarDesdePanel(id, avisar !== false));
    if (estado === 'confirmada' || estado === 'agendada') return json(res, 200, db.actualizarCita(id, { estado, ...(estado === 'confirmada' ? { requiere_revision: 0 } : {}) }));
    return json(res, 400, { error: 'Estado inválido' });
  }
  if ((r = p.match(/^\/api\/citas\/(\d+)\/reprogramar$/)) && m === 'POST') {
    const { inicio } = await leerJson(req);
    try { return json(res, 200, agenda.reprogramar(Number(r[1]), inicio)); }
    catch (err) { return json(res, 409, { error: err instanceof agenda.CupoOcupadoError ? 'Ese horario no está disponible' : err.message }); }
  }
  if ((r = p.match(/^\/api\/citas\/(\d+)\/notas$/)) && m === 'POST') {
    const { notas } = await leerJson(req);
    return json(res, 200, db.actualizarCita(Number(r[1]), { notas }));
  }
  if (p === '/api/disponibilidad') {
    if (q.fecha) return json(res, 200, { horas: agenda.horasDisponibles(q.servicio, q.fecha) });
    return json(res, 200, { dias: agenda.diasDisponibles(q.servicio, 14) });
  }

  // ── Contactos / conversaciones
  if (p === '/api/contactos') return json(res, 200, db.listarContactos({ q: q.q || '' }).map(c => ({ ...c, estado_datos: undefined, ventana_abierta: bot.dentroVentana(c) })));
  if ((r = p.match(/^\/api\/contactos\/([^/]+)\/mensajes$/))) {
    const c = db.obtenerContacto(r[1]);
    if (!c) return json(res, 404, { error: 'No existe' });
    return json(res, 200, { contacto: { ...c, ventana_abierta: bot.dentroVentana(c) }, mensajes: db.mensajesDe(r[1], Number(q.desde || 0)), citas: db.getDb().prepare('SELECT * FROM citas WHERE wa_id = ? ORDER BY inicio DESC').all(r[1]) });
  }
  if ((r = p.match(/^\/api\/contactos\/([^/]+)\/mensaje$/)) && m === 'POST') {
    const { texto } = await leerJson(req);
    if (!texto?.trim()) return json(res, 400, { error: 'Mensaje vacío' });
    try { return json(res, 200, await bot.enviarManual(r[1], texto.trim())); } catch (err) { return json(res, 409, { error: err.message }); }
  }
  if ((r = p.match(/^\/api\/contactos\/([^/]+)\/bot$/)) && m === 'POST') {
    const { pausado } = await leerJson(req);
    if (pausado) db.actualizarContacto(r[1], { bot_pausado: ahoraMs() }); else bot.reactivarBot(r[1]);
    return json(res, 200, db.obtenerContacto(r[1]));
  }
  if ((r = p.match(/^\/api\/contactos\/([^/]+)\/etapa$/)) && m === 'POST') {
    const { etapa, notas } = await leerJson(req);
    if (etapa && db.ETAPAS.includes(etapa)) db.avanzarEtapa(r[1], etapa, { forzar: true });
    if (notas !== undefined) db.actualizarContacto(r[1], { notas });
    return json(res, 200, db.obtenerContacto(r[1]));
  }

  // ── Bloqueos de agenda
  if (p === '/api/bloqueos' && m === 'GET') return json(res, 200, db.listarBloqueos());
  if (p === '/api/bloqueos' && m === 'POST') {
    const b = await leerJson(req);
    if (!b.inicio || !b.fin || b.fin <= b.inicio) return json(res, 400, { error: 'Rango inválido' });
    return json(res, 200, { id: db.crearBloqueo(b) });
  }
  if ((r = p.match(/^\/api\/bloqueos\/(\d+)$/)) && m === 'DELETE') { db.borrarBloqueo(Number(r[1])); return json(res, 200, { ok: true }); }

  // ── Simulador (prueba el bot sin WhatsApp)
  if (p.startsWith('/sim/')) {
    if (!env.SIMULADOR) return json(res, 404, { error: 'Simulador desactivado' });
    if (p === '/sim/enviar' && m === 'POST') {
      const b = await leerJson(req);
      const wa_id = idSim(b.wa_id || '573000000000', b.real);
      const antes = db.getDb().prepare('SELECT COALESCE(MAX(id),0) AS id FROM mensajes WHERE wa_id = ?').get(wa_id).id;
      await encolar(wa_id, () => bot.procesarEntrante({
        wa_id, nombre_perfil: b.nombre || null, wamid: `sim.${crypto.randomUUID()}`, tipo: b.reply_id ? 'interactive' : 'text',
        texto: b.texto || '', reply_id: b.reply_id || null, referral: b.referral || null,
      }));
      return json(res, 200, { wa_id, mensajes: db.mensajesDe(wa_id, antes) });
    }
    if (p === '/sim/mensajes') {
      const wa_id = idSim(q.wa_id || '', q.real === '1');
      return json(res, 200, { mensajes: db.mensajesDe(wa_id, Number(q.desde || 0)) });
    }
    if (p === '/sim/reiniciar' && m === 'POST') {
      const b = await leerJson(req);
      const wa_id = idSim(b.wa_id || '', b.real);
      const d = db.getDb();
      d.prepare('DELETE FROM mensajes WHERE wa_id = ?').run(wa_id);
      d.prepare('DELETE FROM citas WHERE wa_id = ?').run(wa_id);
      d.prepare('DELETE FROM eventos_capi WHERE wa_id = ?').run(wa_id);
      d.prepare('DELETE FROM contactos WHERE wa_id = ?').run(wa_id);
      return json(res, 200, { ok: true });
    }
  }
  return json(res, 404, { error: 'No encontrado' });
}

export function crearServidor() {
  return http.createServer((req, res) => {
    rutas(req, res).catch(err => { console.error('[http]', err); if (!res.headersSent) json(res, 500, { error: 'Error interno' }); });
  });
}

// Arranque directo: node src/server.js
if (process.argv[1] && path.resolve(process.argv[1]) === path.resolve(ROOT, 'src', 'server.js')) {
  db.abrirDb();
  if (!env.PANEL_PASSWORD && !modoSimulacion()) console.warn('⚠️  Falta PANEL_PASSWORD: el panel quedará bloqueado hasta configurarla.');
  iniciarProgramador();
  crearServidor().listen(env.PORT, () => {
    console.log(`Valencia Stetic · agendamiento WhatsApp en http://localhost:${env.PORT}`);
    console.log(`  Panel:      http://localhost:${env.PORT}/panel`);
    if (env.SIMULADOR) console.log(`  Simulador:  http://localhost:${env.PORT}/simulador`);
    console.log(`  Webhook:    ${env.PUBLIC_URL || 'http://localhost:' + env.PORT}/webhook`);
    console.log(`  Modo:       ${modoSimulacion() ? 'SIMULACIÓN (sin WA_TOKEN, no envía a WhatsApp)' : 'PRODUCCIÓN (WhatsApp Cloud API)'}`);
  });
}
