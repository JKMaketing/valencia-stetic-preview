// Envío y recepción con WhatsApp Cloud API. Sin WA_TOKEN funciona en modo simulación.
import crypto from 'node:crypto';
import { env, modoSimulacion } from './config.js';
import * as db from './db.js';
import { ahoraMs } from './tiempo.js';

const cortar = (s, n) => { s = String(s ?? ''); return s.length > n ? s.slice(0, n - 1) + '…' : s; };

/** Representación de texto plano de un mensaje (para el historial y el panel). */
export function comoTexto(m) {
  if (m.tipo === 'texto') return m.texto;
  if (m.tipo === 'botones') return `${m.texto}\n${m.botones.map(b => `[${b.titulo}]`).join(' ')}`;
  if (m.tipo === 'lista') return `${m.texto}\n${m.secciones.flatMap(s => s.filas).map(f => `• ${f.titulo}${f.descripcion ? ' — ' + f.descripcion : ''}`).join('\n')}`;
  if (m.tipo === 'plantilla') return `[Plantilla ${m.nombre}] ${(m.params || []).join(' | ')}`;
  return JSON.stringify(m);
}

/** Convierte el mensaje interno al formato de la Graph API (respetando límites de WhatsApp). */
export function aPayloadGraph(to, m) {
  const base = { messaging_product: 'whatsapp', recipient_type: 'individual', to };
  if (m.tipo === 'texto') return { ...base, type: 'text', text: { body: cortar(m.texto, 4096), preview_url: false } };
  if (m.tipo === 'botones') {
    return {
      ...base, type: 'interactive', interactive: {
        type: 'button',
        ...(m.encabezado ? { header: { type: 'text', text: cortar(m.encabezado, 60) } } : {}),
        body: { text: cortar(m.texto, 1024) },
        ...(m.pie ? { footer: { text: cortar(m.pie, 60) } } : {}),
        action: { buttons: m.botones.slice(0, 3).map(b => ({ type: 'reply', reply: { id: cortar(b.id, 256), title: cortar(b.titulo, 20) } })) },
      },
    };
  }
  if (m.tipo === 'lista') {
    let restantes = 10; // WhatsApp admite máximo 10 filas en total
    const sections = m.secciones.map(s => {
      const filas = s.filas.slice(0, restantes); restantes -= filas.length;
      return {
        title: cortar(s.titulo || 'Opciones', 24),
        rows: filas.map(f => ({ id: cortar(f.id, 200), title: cortar(f.titulo, 24), ...(f.descripcion ? { description: cortar(f.descripcion, 72) } : {}) })),
      };
    }).filter(s => s.rows.length);
    return {
      ...base, type: 'interactive', interactive: {
        type: 'list',
        ...(m.encabezado ? { header: { type: 'text', text: cortar(m.encabezado, 60) } } : {}),
        body: { text: cortar(m.texto, 4096) },
        ...(m.pie ? { footer: { text: cortar(m.pie, 60) } } : {}),
        action: { button: cortar(m.boton || 'Ver opciones', 20), sections },
      },
    };
  }
  if (m.tipo === 'plantilla') {
    const components = [];
    if (m.params?.length) components.push({ type: 'body', parameters: m.params.map(t => ({ type: 'text', text: String(t) })) });
    (m.botones_payload || []).forEach((p, i) => components.push({ type: 'button', sub_type: 'quick_reply', index: String(i), parameters: [{ type: 'payload', payload: p }] }));
    return { ...base, type: 'template', template: { name: m.nombre, language: { code: m.idioma || env.WA_TEMPLATE_LANG }, components } };
  }
  throw new Error('Tipo de mensaje desconocido: ' + m.tipo);
}

async function graph(pathname, body) {
  const url = `https://graph.facebook.com/${env.META_GRAPH_VERSION}/${pathname}`;
  const r = await fetch(url, { method: 'POST', headers: { Authorization: `Bearer ${env.WA_TOKEN}`, 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
  const json = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(`Graph ${r.status}: ${JSON.stringify(json.error || json)}`);
  return json;
}

/** Envía un mensaje y lo registra. Devuelve { ok, wamid?, simulado? }. */
export async function enviar(wa_id, m, { autor = 'bot' } = {}) {
  let wamid = null, error = null;
  const esSimulado = modoSimulacion() || String(wa_id).startsWith('sim');
  if (!esSimulado) {
    try {
      const res = await graph(`${env.WA_PHONE_NUMBER_ID}/messages`, aPayloadGraph(wa_id, m));
      wamid = res.messages?.[0]?.id || null;
    } catch (err) {
      error = err.message;
      console.error('[whatsapp] error enviando a', wa_id, err.message);
    }
  }
  db.registrarMensaje({ wa_id, direccion: 'out', tipo: m.tipo, cuerpo: comoTexto(m) + (error ? `\n⚠️ No enviado: ${error}` : ''), payload: m, wamid, autor });
  if (!error) db.actualizarContacto(wa_id, { ultimo_saliente: ahoraMs() });
  return { ok: !error, wamid, simulado: esSimulado, error };
}

export async function marcarLeido(wamid) {
  if (modoSimulacion() || !wamid || String(wamid).startsWith('sim')) return;
  try { await graph(`${env.WA_PHONE_NUMBER_ID}/messages`, { messaging_product: 'whatsapp', status: 'read', message_id: wamid }); } catch { /* no crítico */ }
}

/** Valida la firma X-Hub-Signature-256 del webhook. */
export function firmaValida(rawBody, header) {
  if (!env.META_APP_SECRET) return true; // sin secreto configurado no se valida (solo desarrollo)
  if (!header?.startsWith('sha256=')) return false;
  const esperado = crypto.createHmac('sha256', env.META_APP_SECRET).update(rawBody).digest('hex');
  const a = Buffer.from(header.slice(7), 'hex'), b = Buffer.from(esperado, 'hex');
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

/** Extrae los mensajes entrantes de un webhook de WhatsApp Cloud API. */
export function parsearWebhook(body) {
  const out = [];
  for (const entry of body?.entry || []) {
    for (const change of entry.changes || []) {
      const v = change.value || {};
      if (!v.messages) continue;
      const perfiles = Object.fromEntries((v.contacts || []).map(c => [c.wa_id, c.profile?.name]));
      for (const msg of v.messages) {
        const r = { wa_id: msg.from, nombre_perfil: perfiles[msg.from] || null, wamid: msg.id, tipo: msg.type, texto: '', reply_id: null, referral: null };
        if (msg.type === 'text') r.texto = msg.text?.body || '';
        else if (msg.type === 'interactive') {
          const rep = msg.interactive?.button_reply || msg.interactive?.list_reply;
          r.reply_id = rep?.id || null; r.texto = rep?.title || '';
        } else if (msg.type === 'button') { r.reply_id = msg.button?.payload || null; r.texto = msg.button?.text || ''; }
        else if (msg.type === 'image' || msg.type === 'video' || msg.type === 'document') r.texto = msg[msg.type]?.caption || '';
        if (msg.referral) {
          r.referral = {
            source_url: msg.referral.source_url, source_id: msg.referral.source_id, source_type: msg.referral.source_type,
            headline: msg.referral.headline, body: msg.referral.body, ctwa_clid: msg.referral.ctwa_clid,
          };
        }
        out.push(r);
      }
    }
  }
  return out;
}
