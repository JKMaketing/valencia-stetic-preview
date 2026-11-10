// Tareas automáticas: recordatorios de cita y seguimiento a consultas sin agendar.
import { negocio, servicioPorId } from './config.js';
import * as db from './db.js';
import * as wa from './whatsapp.js';
import { dentroVentana } from './bot.js';
import { ahoraMs, aMs, aLocal, ahoraLocal, fechaHoraLarga, fechaLarga, hora12, conArticulo } from './tiempo.js';

const HORA = 3600000;
const S = negocio.seguimiento || {};
const P = negocio.plantillas || {};
const nombreDe = c => (c?.nombre || c?.nombre_perfil || '').split(' ')[0];
const horaLocal = () => Number(ahoraLocal().slice(11, 13));

async function recordatorios() {
  const ahora = ahoraMs();
  if (horaLocal() < 7 || horaLocal() >= 21) return 0;
  let n = 0;
  const hasta = aLocal(ahora + (S.recordatorio_horas_antes ?? 24) * HORA);
  const citas = db.getDb().prepare(`SELECT * FROM citas WHERE estado IN ('agendada','confirmada') AND inicio > ? AND inicio <= ?`).all(aLocal(ahora), hasta);
  for (const cita of citas) {
    const c = db.obtenerContacto(cita.wa_id);
    if (!c || c.baja) continue;
    const s = servicioPorId(cita.servicio_id);
    const faltaMs = aMs(cita.inicio) - ahora;

    // Recordatorio principal (día anterior). No se envía si la cita se agendó hace menos de 3 h.
    if (!cita.recordatorio1 && ahora - cita.creado > 3 * HORA && cita.estado !== 'confirmada') {
      const ids = [`cita:confirmar:${cita.id}`, `cita:reprogramar:${cita.id}`, `cita:cancelar:${cita.id}`];
      if (dentroVentana(c)) {
        await wa.enviar(c.wa_id, {
          tipo: 'botones',
          texto: `Hola${nombreDe(c) ? ' ' + nombreDe(c) : ''}, te recordamos tu cita de ${s?.nombre} ${conArticulo(fechaHoraLarga(cita.inicio))} en ${negocio.direccion}. ¿Nos confirmas tu asistencia?`,
          botones: [{ id: ids[0], titulo: 'Confirmo asistencia' }, { id: ids[1], titulo: 'Cambiar horario' }, { id: ids[2], titulo: 'Cancelar cita' }],
        });
      } else if (P.recordatorio_cita) {
        await wa.enviar(c.wa_id, {
          tipo: 'plantilla', nombre: P.recordatorio_cita,
          params: [nombreDe(c) || 'hola', s?.nombre || 'tu servicio', fechaLarga(cita.inicio.slice(0, 10)), hora12(cita.inicio.slice(11, 16))],
          botones_payload: ids,
        });
      }
      db.actualizarCita(cita.id, { recordatorio1: 1 });
      n++;
      continue;
    }
    // Recordatorio corto (2 h antes), solo si la ventana de 24 h está abierta (sin costo de plantilla)
    const corto = (S.recordatorio_corto_horas_antes ?? 2) * HORA;
    if (!cita.recordatorio2 && faltaMs <= corto && dentroVentana(c)) {
      await wa.enviar(c.wa_id, { tipo: 'texto', texto: `Te esperamos hoy a las ${hora12(cita.inicio.slice(11, 16))} para tu cita de ${s?.nombre}. 📍 ${negocio.direccion}` });
      db.actualizarCita(cita.id, { recordatorio2: 1 });
      n++;
    }
  }
  return n;
}

async function seguimientos() {
  const ahora = ahoraMs();
  if (horaLocal() < 8 || horaLocal() >= 20) return 0;
  let n = 0;
  const candidatos = db.getDb().prepare(`SELECT * FROM contactos WHERE baja = 0 AND bot_pausado = 0
    AND etapa IN ('Nuevo','Orientado','Precio enviado','Seguimiento') AND ultimo_entrante IS NOT NULL`).all();
  for (const c of candidatos) {
    if (db.citasActivasDe(c.wa_id).length) continue;
    const desde = ahora - c.ultimo_entrante;
    if (!c.seguimiento1 && desde >= (S.seguimiento_1_horas ?? 20) * HORA && desde < 23.5 * HORA) {
      await wa.enviar(c.wa_id, {
        tipo: 'botones',
        texto: `Hola${nombreDe(c) ? ' ' + nombreDe(c) : ''}, ¿te quedó alguna duda sobre el servicio o los horarios? Con gusto te ayudamos.`,
        botones: [{ id: 'act:agendar', titulo: 'Ver horarios' }, { id: 'act:menu', titulo: 'Ver servicios' }, { id: 'act:asesora', titulo: 'Hablar con asesora' }],
      });
      db.actualizarContacto(c.wa_id, { seguimiento1: 1, etapa: 'Seguimiento' });
      n++;
    } else if (S.seguimiento_2_activo && P.seguimiento_consulta && c.seguimiento1 && !c.seguimiento2
      && desde >= (S.seguimiento_2_horas ?? 72) * HORA && desde < 7 * 24 * HORA) {
      await wa.enviar(c.wa_id, { tipo: 'plantilla', nombre: P.seguimiento_consulta, params: [nombreDe(c) || 'hola'], botones_payload: ['act:agendar', 'act:menu'] });
      db.actualizarContacto(c.wa_id, { seguimiento2: 1 });
      n++;
    }
  }
  return n;
}

let corriendo = false;
export async function ejecutarTareas() {
  if (corriendo) return { omitido: true };
  corriendo = true;
  try { return { recordatorios: await recordatorios(), seguimientos: await seguimientos() }; }
  catch (err) { console.error('[programador]', err); return { error: err.message }; }
  finally { corriendo = false; }
}

export function iniciarProgramador(cadaMs = 60000) {
  const id = setInterval(ejecutarTareas, cadaMs);
  id.unref?.();
  return id;
}
