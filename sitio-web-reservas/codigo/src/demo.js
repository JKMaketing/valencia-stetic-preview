// Asistente integrado a la web (el chatbot, sin número de WhatsApp) y modo demostración.
//  · ASISTENTE_WEB=1 → la página de reservas muestra un chat con el MISMO bot de WhatsApp (mismos menús, agenda y reglas).
//    Las conversaciones usan un identificador "sim9<sid>": nunca se envía nada a WhatsApp.
//  · MODO_DEMO=1 → además se habilita /reservas/demo (escenarios de ejemplo) y la «Vista del equipo» (citas, embudo y eventos de conversión
//    de esa visita). Pensado para compartir un preview con una base de datos de pruebas (DATA_DIR aparte).
import * as db from './db.js';
import * as bot from './bot.js';
import * as wa from './whatsapp.js';
import { servicioPorId, negocio } from './config.js';
import { aLocal, ahoraMs, fechaHoraLarga, conArticulo } from './tiempo.js';

export const demoActiva = () => process.env.MODO_DEMO === '1';
export const asistenteActivo = () => demoActiva() || process.env.ASISTENTE_WEB === '1';
export const configAsistente = () => ({ activo: asistenteActivo(), demo: demoActiva(), nombre: 'Asistente de Valencia Stetic' });

const SID = /^\d{10,16}$/;
const waId = sid => `sim9${sid}`;
const ETAPAS_EMBUDO = ['Nuevo', 'Orientado', 'Cita agendada', 'Asistió'];
const limpiar = (s, max) => String(s ?? '').replace(/[\u0000-\u001f<>]/g, ' ').replace(/\s+/g, ' ').trim().slice(0, max);

// Limpieza: en la demo se borran las conversaciones de prueba con más de 24 h sin actividad (se revisa cada 10 min, sin temporizadores)
let ultimaLimpieza = 0;
function limpiarViejas() {
  const ahora = Date.now(); if (ahora - ultimaLimpieza < 600_000) return; ultimaLimpieza = ahora;
  const d = db.getDb(), corte = ahoraMs() - 24 * 3600_000;
  const viejas = d.prepare("SELECT wa_id FROM mensajes WHERE wa_id LIKE 'sim9%' GROUP BY wa_id HAVING MAX(ts) < ?").all(corte).map(r => r.wa_id);
  for (const w of viejas) for (const t of ['mensajes', 'citas', 'eventos_capi', 'contactos']) d.prepare(`DELETE FROM ${t} WHERE wa_id = ?`).run(w);
}

function validarSid(sid, ErrorWeb) {
  if (!SID.test(String(sid || ''))) throw new ErrorWeb(400, 'Sesión de chat inválida.');
  return String(sid);
}

/** Cita(s) visibles para esta visita: las del chat (sid) y las reservas hechas en la web por este navegador (códigos VS-XXXXXX). */
function citasDeVisita(sid, codigos) {
  const ids = new Map();
  for (const c of db.getDb().prepare('SELECT * FROM citas WHERE wa_id = ? ORDER BY inicio').all(waId(sid))) ids.set(c.id, c);
  for (const cod of codigos) for (const c of db.citasDelGrupo(cod)) ids.set(c.id, c);
  return [...ids.values()].sort((a, b) => a.inicio.localeCompare(b.inicio));
}
const enmascarar = w => (String(w).startsWith('sim9') ? 'Chat del asistente' : `••••${String(w).slice(-4)}`);

function vistaEquipo(sid, codigos) {
  const citas = citasDeVisita(sid, codigos);
  const waIds = [...new Set([waId(sid), ...citas.map(c => c.wa_id)])];
  const contactos = waIds.map(w => db.obtenerContacto(w)).filter(Boolean);
  // La etapa que importa es la más avanzada de los contactos de esta visita
  const orden = ['Nuevo', 'Orientado', 'Precio enviado', 'Cita agendada', 'Asistió'];
  const etapa = contactos.map(c => c.etapa).sort((a, b) => orden.indexOf(b) - orden.indexOf(a))[0] || null;
  const eventos = waIds.flatMap(w => db.getDb().prepare('SELECT * FROM eventos_capi WHERE wa_id = ? ORDER BY id').all(w))
    .map(e => { const p = JSON.parse(e.payload || '{}'); return { evento: e.evento, estado: e.estado, valor: p.custom_data?.value ?? null, moneda: p.custom_data?.currency ?? null, cuando: aLocal(e.ts) }; });
  return {
    embudo: { etapas: ETAPAS_EMBUDO, actual: etapa },
    anuncio: contactos.find(c => c.codigo_anuncio)?.codigo_anuncio || null,
    citas: citas.map(c => ({
      id: c.id, servicio: servicioPorId(c.servicio_id)?.nombre || c.servicio_id, inicio: c.inicio, estado: c.estado, revisar: !!c.requiere_revision,
      origen: c.origen || null, valor: c.valor_cobrado ?? null, quien: enmascarar(c.wa_id), grupo: c.grupo || null,
    })),
    eventos,
  };
}

/** Rutas /api/publico/asistente* y /api/publico/demo*. Devuelve undefined si la ruta no es de este módulo. */
export async function rutaDemo({ p, m, q, req, leerJson, ip, ErrorWeb, limitar }) {
  if (!p.startsWith('/api/publico/asistente') && !p.startsWith('/api/publico/demo')) return undefined;
  if (!asistenteActivo()) throw new ErrorWeb(404, 'No encontrado');
  if (demoActiva()) limpiarViejas();

  if (p === '/api/publico/asistente' && m === 'POST') {
    if (!limitar(ip, 'asistente', Number(process.env.ASISTENTE_MAX_10MIN || 80), 600_000)) throw new ErrorWeb(429, 'Muchos mensajes seguidos. Espera un momento.');
    const b = await leerJson(req), sid = validarSid(b.sid, ErrorWeb), wa_id = waId(sid);
    const texto = limpiar(b.texto, 300), reply_id = b.reply_id ? limpiar(b.reply_id, 120) : null;
    if (!texto && !reply_id) throw new ErrorWeb(400, 'Escribe un mensaje.');
    const antes = db.getDb().prepare('SELECT COALESCE(MAX(id),0) AS id FROM mensajes WHERE wa_id = ?').get(wa_id).id;
    // Un anuncio de ejemplo (solo en demo) permite mostrar cómo llega una persona desde Meta Ads
    let referral = null;
    if (demoActiva() && b.referral && typeof b.referral === 'object') {
      referral = { source_id: limpiar(b.referral.source_id, 40) || '120210000000001', source_type: 'ad', headline: limpiar(b.referral.headline, 80), body: limpiar(b.referral.body, 120), source_url: 'https://fb.me/anuncio-demo', ctwa_clid: `DEMO_${sid}` };
    }
    await bot.procesarEntrante({
      wa_id, nombre_perfil: limpiar(b.nombre, 60) || null, wamid: `sim.web.${sid}.${Date.now()}.${Math.random().toString(36).slice(2, 8)}`,
      tipo: reply_id ? 'interactive' : 'text', texto, reply_id, referral,
    });
    return { mensajes: db.mensajesDe(wa_id, antes) };
  }
  if (p === '/api/publico/asistente/mensajes' && m === 'GET') {
    const sid = validarSid(q.sid, ErrorWeb);
    return { mensajes: db.mensajesDe(waId(sid), Number(q.desde || 0)) };
  }
  if (p === '/api/publico/asistente/reiniciar' && m === 'POST') {
    const sid = validarSid((await leerJson(req)).sid, ErrorWeb), d = db.getDb(), w = waId(sid);
    for (const t of ['mensajes', 'citas', 'eventos_capi', 'contactos']) d.prepare(`DELETE FROM ${t} WHERE wa_id = ?`).run(w);
    return { ok: true };
  }

  // ── Solo demostración: vista del equipo (qué ve el centro) y acciones que llevan a la conversión
  if (!demoActiva()) throw new ErrorWeb(404, 'No encontrado');
  const codigos = String(q.codigos || '').split(',').map(x => x.trim().toUpperCase()).filter(x => /^VS-[A-Z0-9]{6}$/.test(x)).slice(0, 10);
  if (p === '/api/publico/demo/equipo' && m === 'GET') return vistaEquipo(validarSid(q.sid, ErrorWeb), codigos);
  // Muestra el recordatorio automático (el que el sistema envía el día anterior) en el chat de esta visita
  if (p === '/api/publico/demo/recordatorio' && m === 'POST') {
    if (!limitar(ip, 'demo-recordatorio', 30, 600_000)) throw new ErrorWeb(429, 'Demasiadas acciones seguidas.');
    const b = await leerJson(req), sid = validarSid(b.sid, ErrorWeb), w = waId(sid);
    const cita = db.getDb().prepare("SELECT * FROM citas WHERE wa_id = ? AND estado IN ('agendada','confirmada') ORDER BY inicio LIMIT 1").get(w);
    if (!cita) throw new ErrorWeb(404, 'Primero agenda una cita con el asistente.');
    const c = db.obtenerContacto(w), s = servicioPorId(cita.servicio_id), nombre = String(c?.nombre || c?.nombre_perfil || '').split(' ')[0];
    const antes = db.getDb().prepare('SELECT COALESCE(MAX(id),0) AS id FROM mensajes WHERE wa_id = ?').get(w).id;
    await wa.enviar(w, { tipo: 'botones', texto: `Hola${nombre ? ' ' + nombre : ''}, te recordamos tu cita de ${s?.nombre} ${conArticulo(fechaHoraLarga(cita.inicio))} en ${negocio.direccion}. ¿Nos confirmas tu asistencia?`,
      botones: [{ id: `cita:confirmar:${cita.id}`, titulo: 'Confirmo asistencia' }, { id: `cita:reprogramar:${cita.id}`, titulo: 'Cambiar horario' }, { id: `cita:cancelar:${cita.id}`, titulo: 'Cancelar cita' }] });
    db.actualizarCita(cita.id, { recordatorio1: 1 });
    return { mensajes: db.mensajesDe(w, antes) };
  }
  if (p === '/api/publico/demo/estado' && m === 'POST') {
    if (!limitar(ip, 'demo-estado', 60, 600_000)) throw new ErrorWeb(429, 'Demasiadas acciones seguidas.');
    const b = await leerJson(req), sid = validarSid(b.sid, ErrorWeb);
    const cod = (Array.isArray(b.codigos) ? b.codigos : []).map(x => String(x).toUpperCase()).filter(x => /^VS-[A-Z0-9]{6}$/.test(x)).slice(0, 10);
    const cita = citasDeVisita(sid, cod).find(c => c.id === Number(b.cita_id));
    if (!cita) throw new ErrorWeb(404, 'Esa cita no es de esta visita.');
    if (b.estado === 'asistio') { const valor = Math.min(Math.max(Number(b.valor) || 0, 0), 5_000_000); await bot.marcarAsistio(cita.id, valor || null); }
    else if (b.estado === 'no_asistio') bot.marcarNoAsistio(cita.id);
    else if (b.estado === 'confirmada') db.actualizarCita(cita.id, { estado: 'confirmada', requiere_revision: 0 });
    else throw new ErrorWeb(400, 'Estado inválido.');
    await new Promise(r => setTimeout(r, 80)); // el evento de conversión se registra en segundo plano
    return vistaEquipo(sid, cod);
  }
  throw new ErrorWeb(404, 'No encontrado');
}
