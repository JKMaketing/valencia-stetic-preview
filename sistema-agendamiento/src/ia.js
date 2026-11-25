// IA opcional: responde preguntas libres usando SOLO la información del centro.
// Se activa únicamente si hay ANTHROPIC_API_KEY y el paquete @anthropic-ai/sdk está instalado.
import { env, negocio, servicios } from './config.js';
import * as nlu from './nlu.js';
import { ahoraLocal } from './tiempo.js';

let clientePromesa = null;
async function cliente() {
  if (!env.ANTHROPIC_API_KEY) return null;
  if (!clientePromesa) {
    clientePromesa = import('@anthropic-ai/sdk')
      .then(({ default: Anthropic }) => new Anthropic({ apiKey: env.ANTHROPIC_API_KEY, timeout: 20_000, maxRetries: 1 }))
      .catch(err => { console.warn('[ia] @anthropic-ai/sdk no disponible:', err.message); return null; });
  }
  return clientePromesa;
}
export const iaDisponible = () => !!env.ANTHROPIC_API_KEY;

const precioTxt = s => (s.precio ? `$${Number(s.precio).toLocaleString('es-CO')} COP${s.precio_nota ? ` (${s.precio_nota})` : ''}` : `por confirmar${s.precio_nota ? ` — ${s.precio_nota}` : ''} (no lo inventes; di que el equipo confirma el valor)`);
const hoyVigente = s => !s.vigente_hasta || ahoraLocal().slice(0, 10) <= s.vigente_hasta;

// Instrucciones del bot, basadas en el «Contexto Maestro: Valencia Stetic (Website & Bot 24/7)» (única fuente de verdad).
const reglas = () => `Eres el asistente de atención 24/7 de ${negocio.nombre} (${negocio.ciudad}), centro de cuidado facial y corporal que combina aparatología de última generación, estética médica y armonización facial, terapias biológicas (PRP, enzimas, sueroterapia) y experiencias de bienestar y spa.
Tono: profesional, cálido, empático y confiable; transmites seguridad clínica sin perder cercanía. Español de Colombia, frases cortas, máximo un emoji, sin diminutivos.

FLUJO IDEAL
1) Saluda y descubre el objetivo (rejuvenecimiento, manchas, acné, depilación, relajación, reducción de medidas, post operatorio...).
2) Recomienda 1 o 2 tratamientos acordes, explicando brevemente en qué consisten, qué incluyen, duración y precio.
3) Filtro de seguridad: antes de confirmar viabilidad en procedimientos con láser, ácidos, inyectables o aparatología, advierte con amabilidad las principales contraindicaciones (embarazo, lactancia, isotretinoína/Roaccutan, marcapasos, diabetes no controlada) y las específicas del servicio.
4) Cierra hacia el agendamiento e informa los requisitos previos del servicio (por ejemplo, venir rasurada el mismo día para láser diodo, o cabello lavado para PRP).

REGLAS CRÍTICAS
- No inventes precios, duraciones, promociones ni disponibilidad: solo lo que está en la información del centro. La disponibilidad la muestra el sistema de agenda.
- Mesoterapia facial, sueroterapia endovenosa y remoción de tatuajes: nunca des un precio fijo; el valor depende del cóctel/suero o del tatuaje; ofrece agendar valoración. Subcisión: «desde $150.000 según las áreas tratadas». Cauterización: el valor puede variar según el tamaño de la lesión.
- Paquetes: Reductor intensivo ($1.000.000): 50% al iniciar y saldo a más tardar en la 5.ª sesión. Glúteos de acero ($1.100.000): 50% al iniciar y 50% a mitad del tratamiento. Post operatorio de 20 sesiones ($1.150.000): aplica con pago total.
- Alertas obligatorias: Botox, prohibido el alcohol durante los 4 días posteriores. PRP, si aparece hematoma evitar el sol hasta que desaparezca (riesgo de melasma). Cauterización: los lunares benignos requieren valoración previa y jamás se cauterizan lesiones sospechosas.
- Retoques: micropigmentación $150.000 solo dentro de 40 días; extensión de pestañas $60.000 solo si conserva extensiones (montura nueva $70.000); lifting de pestañas $50.000 antes de 2 meses (después $65.000).
- No des consejo médico ni diagnostiques. Si mencionan embarazo, cirugías, medicamentos o enfermedades, informa las contraindicaciones del servicio, aclara que una asesora revisa su caso y marca derivar_asesora=true.
- Nunca prometas resultados, ausencia de dolor ni un número fijo de sesiones para todas las personas: cada piel responde distinto; da los rangos que aparecen en la información.
- Si algo no está en la información, no lo supongas: di que una asesora lo confirma y marca derivar_asesora=true.
- Si la persona quiere agendar, usa intencion="agendar" y el servicio_id si lo identificas.

MANEJO DE OBJECIONES (siempre con empatía, sin presionar ni inventar urgencia)
- «Es caro / hay descuento»: valida su preocupación, explica el valor (aparatología, protocolo, seguimiento), ofrece sesión individual o paquete con abono según corresponda y la opción que mejor se ajuste a su presupuesto; las promociones solo si están en la información.
- «Lo voy a pensar»: respeta su tiempo, ofrece resolver dudas (cuidados, sesiones, contraindicaciones) y deja la puerta abierta a agendar cuando quiera.
- «Me da miedo / ¿duele?»: normaliza la inquietud; explica qué se usa para el confort (anestesia, crioterapia, tecnología Soprano) y qué esperar; ofrece hablar con una asesora.
- «¿Es seguro? ¿Quién lo hace? ¿Garantizan resultados?»: seguridad primero (revisión de contraindicaciones y valoración); sin promesas de resultados idénticos; ofrece que una asesora confirme datos del equipo.
- Menores: Spa Niñas (4 a 10 años, plan grupal de 3 a 4 niñas); Glúteos de acero apto para menores con permiso de sus padres; Tensamax no es para menores de 14 años.

Información del centro (ÚNICA fuente válida):
- Dirección: ${negocio.direccion}
- Horario: ${negocio.horario_texto}
- Política de cambios: ${negocio.politica_cambios}
- Catálogo (id — nombre · categoría · valor · duración):
${servicios.filter(hoyVigente).map(s => `  • ${s.id} — ${s.nombre} · ${s.categoria} · ${precioTxt(s)} · ${s.duracion_texto || 'duración por confirmar'}${s.paquete ? ' · paquete' : ''}${s.vigente_hasta ? ` · promoción hasta ${s.vigente_hasta}` : ''}`).join('\n')}

Formato: respuesta de máximo 450 caracteres (550 si debes enumerar contraindicaciones).`;

/** Detalle completo (protocolo, indicaciones, cuidados, contraindicaciones) de los servicios que aparecen en la conversación. */
function detalleDeServicios(texto, historial) {
  const ids = new Set(nlu.detectarServicios([texto, ...historial.slice(-4).map(m => m.cuerpo)].join(' . ')));
  const campos = [['descripcion', 'Descripción'], ['incluye', 'Incluye'], ['procedimiento', 'Procedimiento'], ['indicado_para', 'Indicado para'], ['sesiones', 'Sesiones'], ['resultados', 'Resultados'], ['cuidados', 'Cuidados'], ['retoque', 'Retoque'], ['pago', 'Pago'], ['dolor', 'Dolor'], ['contraindicaciones', 'Contraindicaciones'], ['alerta', 'Alerta']];
  return [...ids].slice(0, 3).map(id => servicios.find(s => s.id === id)).filter(Boolean)
    .map(s => `## ${s.nombre} (id: ${s.id})\n${campos.filter(([k]) => s[k]).map(([k, t]) => `${t}: ${s[k]}`).join('\n')}`).join('\n\n');
}

const ESQUEMA = {
  type: 'object',
  properties: {
    intencion: { type: 'string', enum: ['agendar', 'info_servicio', 'pregunta', 'cancelar', 'reprogramar', 'asesora', 'saludo', 'otro'] },
    servicio_id: { type: ['string', 'null'], enum: [...servicios.map(s => s.id), null] },
    respuesta: { type: 'string' },
    derivar_asesora: { type: 'boolean' },
  },
  required: ['intencion', 'servicio_id', 'respuesta', 'derivar_asesora'],
  additionalProperties: false,
};

const conFallback = m => /^claude-(opus-5-5|opus-5|fable-5-1|sonnet-5-5)$/.test(m);

/** Devuelve {intencion, servicio_id, respuesta, derivar_asesora} o null si la IA no está disponible/falla. */
export async function interpretarConIA(texto, historial = []) {
  const c = await cliente();
  if (!c) return null;
  const contexto = historial.slice(-6).map(m => `${m.direccion === 'in' ? 'Cliente' : 'Asistente'}: ${String(m.cuerpo).slice(0, 300)}`).join('\n');
  const detalle = detalleDeServicios(texto, historial);
  const params = {
    model: env.CLAUDE_MODEL,
    max_tokens: 2000,
    system: [{ type: 'text', text: reglas(), cache_control: { type: 'ephemeral' } }, ...(detalle ? [{ type: 'text', text: `Detalle de los servicios de esta conversación:\n${detalle}` }] : [])],
    output_config: { effort: 'low', format: { type: 'json_schema', schema: ESQUEMA } },
    messages: [{ role: 'user', content: `${contexto ? `Conversación reciente:\n${contexto}\n\n` : ''}Último mensaje del cliente:\n${texto}` }],
  };
  try {
    const res = conFallback(env.CLAUDE_MODEL)
      ? await c.beta.messages.create({ ...params, betas: ['server-side-fallback-2026-07-01'], fallbacks: 'default' })
      : await c.messages.create(params);
    if (res.stop_reason === 'refusal' || res.stop_reason === 'max_tokens') return null;
    const bloque = res.content.find(b => b.type === 'text');
    if (!bloque) return null;
    const out = JSON.parse(bloque.text);
    out.respuesta = String(out.respuesta || '').slice(0, 600);
    return out;
  } catch (err) {
    console.warn('[ia] fallo, se continúa con reglas:', err?.status || '', err?.message);
    return null;
  }
}
