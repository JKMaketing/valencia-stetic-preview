// Persistencia en SQLite (node:sqlite, incluido en Node 22.13+/24).
import fs from 'node:fs';
import path from 'node:path';
import { DatabaseSync } from 'node:sqlite';
import { env } from './config.js';
import { ahoraMs, aLocal } from './tiempo.js';

let db;

export const ETAPAS = ['Nuevo', 'Orientado', 'Precio enviado', 'Cita agendada', 'Asistió', 'No asistió', 'Seguimiento', 'Requiere asesora', 'Baja'];

export function abrirDb(archivo) {
  if (!archivo) {
    fs.mkdirSync(env.DATA_DIR, { recursive: true });
    archivo = path.join(env.DATA_DIR, 'agenda.sqlite');
  }
  db = new DatabaseSync(archivo);
  db.exec(`
    PRAGMA journal_mode = WAL;
    PRAGMA foreign_keys = ON;

    CREATE TABLE IF NOT EXISTS contactos (
      wa_id TEXT PRIMARY KEY,
      nombre TEXT,
      nombre_perfil TEXT,
      estado TEXT,
      estado_datos TEXT DEFAULT '{}',
      etapa TEXT DEFAULT 'Nuevo',
      bot_pausado INTEGER DEFAULT 0,
      baja INTEGER DEFAULT 0,
      servicio_interes TEXT,
      fallos INTEGER DEFAULT 0,
      -- atribución Click-to-WhatsApp
      ad_id TEXT, ctwa_clid TEXT, source_url TEXT, source_type TEXT, ad_headline TEXT, ad_body TEXT,
      codigo_anuncio TEXT,
      primer_contacto INTEGER,
      ultimo_entrante INTEGER,
      ultimo_saliente INTEGER,
      seguimiento1 INTEGER DEFAULT 0,
      seguimiento2 INTEGER DEFAULT 0,
      notas TEXT
    );

    CREATE TABLE IF NOT EXISTS mensajes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      wa_id TEXT NOT NULL,
      direccion TEXT NOT NULL,      -- in | out
      tipo TEXT,
      cuerpo TEXT,
      payload TEXT,                 -- JSON del mensaje enviado (botones/listas)
      wamid TEXT,
      autor TEXT,                   -- bot | equipo | cliente | sistema
      ts INTEGER NOT NULL
    );
    CREATE INDEX IF NOT EXISTS ix_msg_wa ON mensajes(wa_id, ts);
    CREATE UNIQUE INDEX IF NOT EXISTS ix_msg_wamid ON mensajes(wamid) WHERE wamid IS NOT NULL AND direccion = 'in';

    CREATE TABLE IF NOT EXISTS citas (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      wa_id TEXT NOT NULL,
      nombre TEXT,
      servicio_id TEXT NOT NULL,
      inicio TEXT NOT NULL,         -- local YYYY-MM-DDTHH:MM
      fin TEXT NOT NULL,            -- local, incluye pausa entre citas
      recurso TEXT NOT NULL,
      estado TEXT NOT NULL DEFAULT 'agendada', -- agendada | confirmada | cancelada | asistio | no_asistio
      requiere_revision INTEGER DEFAULT 0,
      precio INTEGER,
      valor_cobrado INTEGER,
      ad_id TEXT, codigo_anuncio TEXT, ctwa_clid TEXT,
      origen TEXT DEFAULT 'bot',    -- bot | panel
      recordatorio1 INTEGER DEFAULT 0,
      recordatorio2 INTEGER DEFAULT 0,
      gracias INTEGER DEFAULT 0,
      notas TEXT,
      creado INTEGER NOT NULL,
      actualizado INTEGER
    );
    CREATE INDEX IF NOT EXISTS ix_citas_inicio ON citas(inicio);
    CREATE INDEX IF NOT EXISTS ix_citas_wa ON citas(wa_id);

    CREATE TABLE IF NOT EXISTS bloqueos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      inicio TEXT NOT NULL,
      fin TEXT NOT NULL,
      recurso TEXT,                 -- null = todos
      motivo TEXT
    );

    CREATE TABLE IF NOT EXISTS eventos_capi (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      wa_id TEXT, cita_id INTEGER,
      evento TEXT, payload TEXT, estado TEXT, respuesta TEXT,
      ts INTEGER
    );
  `);
  migrar(db);
  return db;
}

/** Migraciones aditivas e idempotentes (la base de producción ya existe y no se debe perder). */
function migrar(d) {
  const columnas = tabla => new Set(d.prepare(`PRAGMA table_info(${tabla})`).all().map(c => c.name));
  const agregar = (tabla, col, def) => { if (!columnas(tabla).has(col)) d.exec(`ALTER TABLE ${tabla} ADD COLUMN ${col} ${def}`); };
  agregar('citas', 'token', 'TEXT');   // enlace privado para ver / cambiar / cancelar la cita desde la web
  agregar('citas', 'grupo', 'TEXT');   // varias citas reservadas juntas en la web comparten grupo
  agregar('contactos', 'email', 'TEXT');
  d.exec('CREATE UNIQUE INDEX IF NOT EXISTS ix_citas_token ON citas(token) WHERE token IS NOT NULL');
  d.exec('CREATE INDEX IF NOT EXISTS ix_citas_grupo ON citas(grupo) WHERE grupo IS NOT NULL');
}

export const getDb = () => db;

// ───────── Contactos ─────────
export function obtenerContacto(wa_id) {
  const c = db.prepare('SELECT * FROM contactos WHERE wa_id = ?').get(wa_id);
  if (c) c.estado_datos = JSON.parse(c.estado_datos || '{}');
  return c || null;
}

export function crearOActualizarContacto(wa_id, { nombre_perfil } = {}) {
  let c = obtenerContacto(wa_id);
  if (!c) {
    db.prepare('INSERT INTO contactos (wa_id, nombre_perfil, primer_contacto, etapa) VALUES (?, ?, ?, ?)')
      .run(wa_id, nombre_perfil || null, ahoraMs(), 'Nuevo');
    c = obtenerContacto(wa_id);
    c._nuevo = true;
  } else if (nombre_perfil && nombre_perfil !== c.nombre_perfil) {
    db.prepare('UPDATE contactos SET nombre_perfil = ? WHERE wa_id = ?').run(nombre_perfil, wa_id);
    c.nombre_perfil = nombre_perfil;
  }
  return c;
}

const CAMPOS_CONTACTO = new Set(['nombre', 'estado', 'estado_datos', 'etapa', 'bot_pausado', 'baja', 'servicio_interes', 'fallos',
  'ad_id', 'ctwa_clid', 'source_url', 'source_type', 'ad_headline', 'ad_body', 'codigo_anuncio',
  'ultimo_entrante', 'ultimo_saliente', 'seguimiento1', 'seguimiento2', 'notas', 'email']);

export function actualizarContacto(wa_id, campos) {
  const keys = Object.keys(campos).filter(k => CAMPOS_CONTACTO.has(k));
  if (!keys.length) return;
  const vals = keys.map(k => {
    const v = campos[k];
    if (k === 'estado_datos') return JSON.stringify(v || {});
    if (typeof v === 'boolean') return v ? 1 : 0;
    return v ?? null;
  });
  db.prepare(`UPDATE contactos SET ${keys.map(k => `${k} = ?`).join(', ')} WHERE wa_id = ?`).run(...vals, wa_id);
}

/** Avanza la etapa del embudo sin retroceder (salvo etapas terminales explícitas). */
const ORDEN_ETAPA = { 'Nuevo': 0, 'Orientado': 1, 'Precio enviado': 2, 'Seguimiento': 2, 'Requiere asesora': 2, 'Cita agendada': 3, 'No asistió': 4, 'Asistió': 5, 'Baja': 9 };
export function avanzarEtapa(wa_id, etapa, { forzar = false } = {}) {
  const c = obtenerContacto(wa_id);
  if (!c) return;
  if (forzar || (ORDEN_ETAPA[etapa] ?? 0) >= (ORDEN_ETAPA[c.etapa] ?? 0)) actualizarContacto(wa_id, { etapa });
}

export function listarContactos({ q = '', limite = 200 } = {}) {
  const like = `%${q}%`;
  return db.prepare(`
    SELECT c.*, (SELECT cuerpo FROM mensajes m WHERE m.wa_id = c.wa_id ORDER BY ts DESC, id DESC LIMIT 1) AS ultimo_mensaje,
           MAX(COALESCE(c.ultimo_entrante,0), COALESCE(c.ultimo_saliente,0)) AS actividad
    FROM contactos c
    WHERE (? = '' OR c.wa_id LIKE ? OR c.nombre LIKE ? OR c.nombre_perfil LIKE ?)
    ORDER BY actividad DESC LIMIT ?`).all(q, like, like, like, limite);
}

// ───────── Mensajes ─────────
export function registrarMensaje({ wa_id, direccion, tipo, cuerpo, payload, wamid, autor }) {
  try {
    const r = db.prepare('INSERT INTO mensajes (wa_id, direccion, tipo, cuerpo, payload, wamid, autor, ts) VALUES (?,?,?,?,?,?,?,?)')
      .run(wa_id, direccion, tipo || 'text', cuerpo || '', payload ? JSON.stringify(payload) : null, wamid || null, autor || null, ahoraMs());
    return Number(r.lastInsertRowid);
  } catch (err) {
    if (String(err.message).includes('UNIQUE')) return null; // reintento de webhook ya procesado
    throw err;
  }
}
export const mensajeYaProcesado = wamid => !!(wamid && db.prepare("SELECT 1 FROM mensajes WHERE wamid = ? AND direccion = 'in'").get(wamid));
export const mensajesDe = (wa_id, desdeId = 0) =>
  db.prepare('SELECT * FROM mensajes WHERE wa_id = ? AND id > ? ORDER BY id').all(wa_id, desdeId)
    .map(m => ({ ...m, payload: m.payload ? JSON.parse(m.payload) : null }));
export const ultimosMensajes = (wa_id, n = 8) =>
  db.prepare('SELECT direccion, cuerpo FROM mensajes WHERE wa_id = ? ORDER BY id DESC LIMIT ?').all(wa_id, n).reverse();

// ───────── Citas ─────────
export function obtenerCita(id) { return db.prepare('SELECT * FROM citas WHERE id = ?').get(id) || null; }

export function citasActivasDe(wa_id) {
  return db.prepare(`SELECT * FROM citas WHERE wa_id = ? AND estado IN ('agendada','confirmada') AND inicio >= ? ORDER BY inicio`)
    .all(wa_id, aLocal(ahoraMs()));
}

/** Citas que se cruzan con [inicio, fin) en un recurso. */
export function citasQueCruzan(recurso, inicio, fin, excluirId = 0) {
  return db.prepare(`SELECT * FROM citas WHERE recurso = ? AND estado IN ('agendada','confirmada','asistio')
    AND inicio < ? AND fin > ? AND id != ?`).all(recurso, fin, inicio, excluirId);
}
export function bloqueosQueCruzan(recurso, inicio, fin) {
  return db.prepare('SELECT * FROM bloqueos WHERE (recurso IS NULL OR recurso = ?) AND inicio < ? AND fin > ?').all(recurso, fin, inicio);
}
export function citasDelRango(desde, hasta) {
  return db.prepare(`SELECT ci.*, co.nombre_perfil, co.etapa FROM citas ci LEFT JOIN contactos co ON co.wa_id = ci.wa_id
    WHERE ci.inicio >= ? AND ci.inicio < ? ORDER BY ci.inicio`).all(desde, hasta);
}

export function insertarCita(c) {
  const r = db.prepare(`INSERT INTO citas (wa_id, nombre, servicio_id, inicio, fin, recurso, estado, requiere_revision, precio, ad_id, codigo_anuncio, ctwa_clid, origen, notas, token, grupo, creado)
    VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`).run(
    c.wa_id, c.nombre || null, c.servicio_id, c.inicio, c.fin, c.recurso, c.estado || 'agendada', c.requiere_revision ? 1 : 0,
    c.precio ?? null, c.ad_id || null, c.codigo_anuncio || null, c.ctwa_clid || null, c.origen || 'bot', c.notas || null, c.token || null, c.grupo || null, ahoraMs());
  return obtenerCita(Number(r.lastInsertRowid));
}

export const citaPorToken = token => (token ? db.prepare('SELECT * FROM citas WHERE token = ?').get(String(token)) || null : null);
export const citasDelGrupo = grupo => (grupo ? db.prepare('SELECT * FROM citas WHERE grupo = ? ORDER BY inicio').all(grupo) : []);
/** Última reserva web activa de un contacto (para reconocerla cuando escribe por WhatsApp con su código). */
export const citasWebPorGrupo = (wa_id, grupo) => db.prepare("SELECT * FROM citas WHERE wa_id = ? AND grupo = ? ORDER BY inicio").all(wa_id, grupo);

const CAMPOS_CITA = new Set(['estado', 'requiere_revision', 'valor_cobrado', 'recordatorio1', 'recordatorio2', 'gracias', 'notas', 'inicio', 'fin', 'nombre', 'precio']);
export function actualizarCita(id, campos) {
  const keys = Object.keys(campos).filter(k => CAMPOS_CITA.has(k));
  if (!keys.length) return obtenerCita(id);
  db.prepare(`UPDATE citas SET ${keys.map(k => `${k} = ?`).join(', ')}, actualizado = ? WHERE id = ?`)
    .run(...keys.map(k => (typeof campos[k] === 'boolean' ? (campos[k] ? 1 : 0) : campos[k] ?? null)), ahoraMs(), id);
  return obtenerCita(id);
}

/** Ejecuta fn dentro de una transacción (evita doble reserva del mismo cupo). */
export function transaccion(fn) {
  db.exec('BEGIN IMMEDIATE');
  try { const r = fn(); db.exec('COMMIT'); return r; }
  catch (err) { db.exec('ROLLBACK'); throw err; }
}

// ───────── Bloqueos ─────────
export const listarBloqueos = () => db.prepare('SELECT * FROM bloqueos WHERE fin >= ? ORDER BY inicio').all(aLocal(ahoraMs()));
export const crearBloqueo = ({ inicio, fin, recurso, motivo }) =>
  Number(db.prepare('INSERT INTO bloqueos (inicio, fin, recurso, motivo) VALUES (?,?,?,?)').run(inicio, fin, recurso || null, motivo || null).lastInsertRowid);
export const borrarBloqueo = id => db.prepare('DELETE FROM bloqueos WHERE id = ?').run(id);

// ───────── CAPI ─────────
export const registrarEventoCapi = e =>
  db.prepare('INSERT INTO eventos_capi (wa_id, cita_id, evento, payload, estado, respuesta, ts) VALUES (?,?,?,?,?,?,?)')
    .run(e.wa_id, e.cita_id ?? null, e.evento, JSON.stringify(e.payload), e.estado, e.respuesta ?? null, ahoraMs());
export const ultimosEventosCapi = (n = 50) => db.prepare('SELECT * FROM eventos_capi ORDER BY id DESC LIMIT ?').all(n);
