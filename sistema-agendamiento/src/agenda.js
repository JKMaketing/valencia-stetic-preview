// Motor de disponibilidad y reservas.
import { negocio, servicioPorId } from './config.js';
import { ahoraMs, aMs, hoyLocal, sumarDias, diaSemana, hhmmAMin, minAHhmm, sumarMin } from './tiempo.js';
import * as db from './db.js';

const A = negocio.agenda;

export const capacidad = recurso => Number(negocio.recursos?.[recurso] ?? 1);

function franjaDelDia(fecha) {
  if ((negocio.dias_cerrados || []).includes(fecha)) return null;
  const h = negocio.horario[String(diaSemana(fecha))];
  return h ? [hhmmAMin(h[0]), hhmmAMin(h[1])] : null;
}

/** `excluir`: ids de citas que no cuentan (la propia cita al reprogramar). */
function cupoLibre(servicio, inicio, excluir = new Set()) {
  const fin = sumarMin(inicio, servicio.duracion_min + (A.pausa_entre_citas_min || 0));
  if (db.bloqueosQueCruzan(servicio.recurso, inicio, fin).length) return false;
  return db.citasQueCruzan(servicio.recurso, inicio, fin, 0).filter(c => !excluir.has(c.id)).length < capacidad(servicio.recurso);
}

/** Horas de inicio libres ("HH:MM") para un servicio en una fecha. */
export function horasDisponibles(servicioId, fecha, { excluirCitaId = 0 } = {}) {
  return horasDisponiblesSecuencia([servicioId], fecha, { excluir: new Set([excluirCitaId]) });
}

/** Minutos desde el inicio de la visita hasta el comienzo de cada servicio (se hacen uno tras otro, con la pausa entre citas). */
const desplazamientos = servicios => { let off = 0; return servicios.map(s => { const o = off; off += s.duracion_min + (A.pausa_entre_citas_min || 0); return o; }); };

/** Horas de inicio libres para una visita con varios servicios consecutivos (la web permite elegir varios). */
export function horasDisponiblesSecuencia(servicioIds, fecha, { excluir = new Set() } = {}) {
  const ss = servicioIds.map(servicioPorId);
  if (!ss.length || ss.some(s => !s)) return [];
  if (fecha > sumarDias(hoyLocal(), A.dias_adelante || 14)) return []; // fuera de la ventana de agenda: la API no debe aceptar fechas que la interfaz nunca ofrece
  const franja = franjaDelDia(fecha);
  if (!franja) return [];
  const [abre, cierra] = franja;
  const offs = desplazamientos(ss), total = offs.at(-1) + ss.at(-1).duracion_min;
  const limite = ahoraMs() + (A.anticipacion_min || 0) * 60000;
  const out = [];
  for (let t = abre; t + total <= cierra; t += A.intervalo_min || 30) {
    const inicio = `${fecha}T${minAHhmm(t)}`;
    if (aMs(inicio) < limite) continue;
    if (ss.every((s, i) => cupoLibre(s, sumarMin(inicio, offs[i]), excluir))) out.push(minAHhmm(t));
  }
  return out;
}

/** Duración total de la visita en minutos (sin la pausa final). */
export const duracionVisita = servicioIds => { const ss = servicioIds.map(servicioPorId).filter(Boolean); return ss.length ? desplazamientos(ss).at(-1) + ss.at(-1).duracion_min : 0; };

/** Próximas fechas con al menos un cupo. */
export function diasDisponibles(servicioId, max = 10, opts = {}) {
  const hoy = hoyLocal();
  const out = [];
  for (let i = 0; i <= (A.dias_adelante || 14) && out.length < max; i++) {
    const f = sumarDias(hoy, i);
    const horas = horasDisponibles(servicioId, f, opts);
    if (horas.length) out.push({ fecha: f, cupos: horas.length });
  }
  return out;
}

/** Igual que diasDisponibles pero para una visita con varios servicios. */
export function diasDisponiblesSecuencia(servicioIds, { excluir = new Set() } = {}) {
  const hoy = hoyLocal(), out = [];
  for (let i = 0; i <= (A.dias_adelante || 14); i++) {
    const f = sumarDias(hoy, i), horas = horasDisponiblesSecuencia(servicioIds, f, { excluir });
    if (horas.length) out.push({ fecha: f, cupos: horas.length });
  }
  return out;
}

export class CupoOcupadoError extends Error { constructor() { super('CUPO_OCUPADO'); } }
export class LimiteCitasError extends Error { constructor() { super('LIMITE_CITAS'); } }

/** Crea la cita verificando el cupo dentro de una transacción. */
export function reservar({ wa_id, servicioId, inicio, nombre, contacto = {}, origen = 'bot', notas }) {
  const s = servicioPorId(servicioId);
  if (!s) throw new Error('Servicio no existe');
  return db.transaccion(() => {
    const fecha = inicio.slice(0, 10);
    if (!horasDisponibles(servicioId, fecha).includes(inicio.slice(11, 16))) throw new CupoOcupadoError();
    if (origen === 'bot' && db.citasActivasDe(wa_id).length >= (A.max_citas_activas_por_cliente || 2)) throw new LimiteCitasError();
    return db.insertarCita({
      wa_id, nombre, servicio_id: s.id, inicio,
      fin: sumarMin(inicio, s.duracion_min + (A.pausa_entre_citas_min || 0)),
      recurso: s.recurso, estado: 'agendada', requiere_revision: !!(s.requiere_valoracion || s.revisar_condiciones),
      precio: s.precio, ad_id: contacto.ad_id, codigo_anuncio: contacto.codigo_anuncio, ctwa_clid: contacto.ctwa_clid,
      origen, notas,
    });
  });
}

/** Mueve una cita a otro horario verificando cupo. */
export function reprogramar(citaId, nuevoInicio) {
  const c = db.obtenerCita(citaId);
  if (!c) throw new Error('Cita no existe');
  const s = servicioPorId(c.servicio_id);
  return db.transaccion(() => {
    if (!horasDisponibles(c.servicio_id, nuevoInicio.slice(0, 10), { excluirCitaId: c.id }).includes(nuevoInicio.slice(11, 16)))
      throw new CupoOcupadoError();
    return db.actualizarCita(c.id, {
      inicio: nuevoInicio, fin: sumarMin(nuevoInicio, s.duracion_min + (A.pausa_entre_citas_min || 0)),
      estado: 'agendada', recordatorio1: 0, recordatorio2: 0,
    });
  });
}

/** Reservas activas de una persona: las citas reservadas juntas en la web cuentan como una sola. */
export function reservasActivas(wa_id) {
  return new Set(db.citasActivasDe(wa_id).map(c => c.grupo || `c${c.id}`)).size;
}

/** Crea una visita con uno o varios servicios consecutivos (reserva web). Todo o nada, con el cupo verificado dentro de la transacción. */
export function reservarSecuencia({ wa_id, servicioIds, inicio, nombre, contacto = {}, origen = 'web', notas, token, grupo }) {
  const ss = servicioIds.map(servicioPorId);
  if (!ss.length || ss.some(s => !s)) throw new Error('Servicio no existe');
  const offs = desplazamientos(ss), pausa = A.pausa_entre_citas_min || 0;
  return db.transaccion(() => {
    if (!horasDisponiblesSecuencia(servicioIds, inicio.slice(0, 10)).includes(inicio.slice(11, 16))) throw new CupoOcupadoError();
    if (origen !== 'panel' && reservasActivas(wa_id) >= (A.max_citas_activas_por_cliente || 2)) throw new LimiteCitasError();
    return ss.map((s, i) => {
      const ini = sumarMin(inicio, offs[i]);
      return db.insertarCita({
        wa_id, nombre, servicio_id: s.id, inicio: ini, fin: sumarMin(ini, s.duracion_min + pausa), recurso: s.recurso, estado: 'agendada',
        requiere_revision: !!(s.requiere_valoracion || s.revisar_condiciones), precio: s.precio, ad_id: contacto.ad_id, codigo_anuncio: contacto.codigo_anuncio, ctwa_clid: contacto.ctwa_clid,
        origen, notas, token: i === 0 ? token : null, grupo,
      });
    });
  });
}

/** Mueve una reserva completa (una o varias citas seguidas) a otro horario de inicio. */
export function reprogramarVisita(citas, nuevoInicio) {
  const orden = [...citas].sort((a, b) => a.inicio.localeCompare(b.inicio));
  const ids = orden.map(c => c.servicio_id), ss = ids.map(servicioPorId), offs = desplazamientos(ss), pausa = A.pausa_entre_citas_min || 0;
  const excluir = new Set(orden.map(c => c.id));
  return db.transaccion(() => {
    if (!horasDisponiblesSecuencia(ids, nuevoInicio.slice(0, 10), { excluir }).includes(nuevoInicio.slice(11, 16))) throw new CupoOcupadoError();
    return orden.map((c, i) => {
      const ini = sumarMin(nuevoInicio, offs[i]);
      return db.actualizarCita(c.id, { inicio: ini, fin: sumarMin(ini, ss[i].duracion_min + pausa), estado: 'agendada', recordatorio1: 0, recordatorio2: 0 });
    });
  });
}
