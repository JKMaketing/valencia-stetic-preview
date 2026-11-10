// Conversions API para mensajería empresarial (Click-to-WhatsApp).
// Envía a Meta los eventos "cita agendada" y "asistió/pagó" ligados al ctwa_clid del anuncio,
// para que la campaña optimice por citas y ventas reales y no solo por conversaciones.
import { env, negocio } from './config.js';
import * as db from './db.js';
import { ahoraMs } from './tiempo.js';

export const capiConfigurada = () => !!(env.META_DATASET_ID && env.META_CAPI_TOKEN && env.WA_BUSINESS_ACCOUNT_ID);

export function construirEvento({ evento, ctwa_clid, valor, eventId }) {
  return {
    event_name: evento,
    event_time: Math.floor(ahoraMs() / 1000),
    event_id: eventId,
    action_source: 'business_messaging',
    messaging_channel: 'whatsapp',
    user_data: { whatsapp_business_account_id: env.WA_BUSINESS_ACCOUNT_ID, ctwa_clid },
    ...(valor != null ? { custom_data: { currency: negocio.moneda || 'COP', value: Number(valor) } } : {}),
  };
}

/** Envía (o registra en simulación) un evento. Solo aplica a contactos que llegaron desde un anuncio (tienen ctwa_clid). */
export async function enviarEvento({ wa_id, cita_id, evento, ctwa_clid, valor }) {
  if (!ctwa_clid) return { omitido: 'sin ctwa_clid (no vino de anuncio CTWA)' };
  const data = construirEvento({ evento, ctwa_clid, valor, eventId: `vs-${cita_id || wa_id}-${evento}` });
  if (!capiConfigurada()) {
    db.registrarEventoCapi({ wa_id, cita_id, evento, payload: data, estado: 'simulado', respuesta: 'CAPI no configurada (faltan META_DATASET_ID / token / WABA)' });
    return { simulado: true };
  }
  try {
    const r = await fetch(`https://graph.facebook.com/${env.META_GRAPH_VERSION}/${env.META_DATASET_ID}/events?access_token=${encodeURIComponent(env.META_CAPI_TOKEN)}`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ data: [data] }),
    });
    const json = await r.json().catch(() => ({}));
    db.registrarEventoCapi({ wa_id, cita_id, evento, payload: data, estado: r.ok ? 'enviado' : 'error', respuesta: JSON.stringify(json) });
    return { ok: r.ok, respuesta: json };
  } catch (err) {
    db.registrarEventoCapi({ wa_id, cita_id, evento, payload: data, estado: 'error', respuesta: err.message });
    return { ok: false, error: err.message };
  }
}

export const eventoCita = cita => enviarEvento({ wa_id: cita.wa_id, cita_id: cita.id, evento: env.CAPI_EVENT_CITA, ctwa_clid: cita.ctwa_clid });
export const eventoAsistio = cita => enviarEvento({ wa_id: cita.wa_id, cita_id: cita.id, evento: env.CAPI_EVENT_ASISTIO, ctwa_clid: cita.ctwa_clid, valor: cita.valor_cobrado ?? cita.precio ?? 0 });
