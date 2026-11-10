// Utilidades de fecha en hora de Colombia (UTC-5, sin horario de verano).
// Las horas locales se manejan como texto "YYYY-MM-DDTHH:MM".
import { negocio } from './config.js';

const OFFSET = negocio.zona_horaria_offset || '-05:00';
const OFFSET_MIN = (() => {
  const m = OFFSET.match(/([+-])(\d{2}):(\d{2})/);
  const v = Number(m[2]) * 60 + Number(m[3]);
  return m[1] === '-' ? -v : v;
})();

let relojFijo = null; // para pruebas
export const fijarReloj = ms => { relojFijo = ms; };
export const ahoraMs = () => (relojFijo ?? Date.now());

const pad = n => String(n).padStart(2, '0');

/** epoch ms -> "YYYY-MM-DDTHH:MM" local */
export function aLocal(ms) {
  const d = new Date(ms + OFFSET_MIN * 60000);
  return `${d.getUTCFullYear()}-${pad(d.getUTCMonth() + 1)}-${pad(d.getUTCDate())}T${pad(d.getUTCHours())}:${pad(d.getUTCMinutes())}`;
}
/** "YYYY-MM-DDTHH:MM" local -> epoch ms */
export const aMs = local => Date.parse(`${local.length === 10 ? local + 'T00:00' : local}:00${OFFSET}`);

export const ahoraLocal = () => aLocal(ahoraMs());
export const hoyLocal = () => ahoraLocal().slice(0, 10);

export function sumarDias(fecha, n) {
  const d = new Date(Date.parse(fecha + 'T12:00:00Z') + n * 86400000);
  return d.toISOString().slice(0, 10);
}
export const diaSemana = fecha => new Date(fecha + 'T12:00:00Z').getUTCDay();
export const sumarMin = (local, min) => aLocal(aMs(local) + min * 60000);
export const hhmmAMin = hhmm => { const [h, m] = hhmm.split(':').map(Number); return h * 60 + m; };
export const minAHhmm = min => `${pad(Math.floor(min / 60))}:${pad(min % 60)}`;

const DIAS = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
const DIAS_CORTO = ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'];
const MESES = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
export const NOMBRES_DIAS = DIAS;
export const NOMBRES_MESES = MESES;

/** "2026-11-05" -> "jueves 5 de noviembre" (+ "hoy"/"mañana") */
export function fechaLarga(fecha) {
  const [y, m, d] = fecha.split('-').map(Number);
  let txt = `${DIAS[diaSemana(fecha)]} ${d} de ${MESES[m - 1]}`;
  const hoy = hoyLocal();
  if (fecha === hoy) txt = `hoy, ${txt}`;
  else if (fecha === sumarDias(hoy, 1)) txt = `mañana, ${txt}`;
  return txt;
}
export function fechaCorta(fecha) {
  const [, m, d] = fecha.split('-').map(Number);
  return `${DIAS_CORTO[diaSemana(fecha)]} ${d} ${MESES[m - 1].slice(0, 3)}`;
}
/** "14:30" -> "2:30 p. m." */
export function hora12(hhmm) {
  let [h, m] = hhmm.split(':').map(Number);
  const suf = h >= 12 ? 'p. m.' : 'a. m.';
  h = h % 12 || 12;
  return `${h}:${pad(m)} ${suf}`;
}
/** "jueves 5…" -> "el jueves 5…"; "mañana, jueves…" se deja igual. */
export const conArticulo = txt => (/^(hoy|mañana)/.test(txt) ? txt : `el ${txt}`);
/** "jueves 5…" -> "del jueves 5…"; "mañana, jueves…" -> "de mañana, jueves…" */
export const delArticulo = txt => (/^(hoy|mañana)/.test(txt) ? `de ${txt}` : `del ${txt}`);
export const fechaHoraLarga = local => `${fechaLarga(local.slice(0, 10))} a las ${hora12(local.slice(11, 16))}`;
