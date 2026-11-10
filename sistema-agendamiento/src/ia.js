// IA opcional: responde preguntas libres usando SOLO la información del centro.
// Se activa únicamente si hay ANTHROPIC_API_KEY y el paquete @anthropic-ai/sdk está instalado.
import { env, negocio, servicios } from './config.js';

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

const precioTxt = s => (s.precio ? `$${Number(s.precio).toLocaleString('es-CO')} COP` : 'por confirmar (no lo inventes; di que el equipo confirma el valor vigente)');

const SISTEMA = `Eres el asistente de WhatsApp de ${negocio.nombre}, un centro de cuidado facial y corporal en ${negocio.ciudad}.
Tu trabajo: responder dudas breves y llevar a la persona a agendar su cita. Escribe en español de Colombia, tono cálido, claro y sereno, frases cortas, máximo un emoji, sin diminutivos.

Información del centro (es la ÚNICA fuente válida):
- Dirección: ${negocio.direccion}
- Horario: ${negocio.horario_texto}
- Política de cambios: ${negocio.politica_cambios}
- Servicios:
${servicios.map(s => `  • ${s.nombre} (id: ${s.id}) — ${s.descripcion} Incluye: ${s.incluye} Duración aprox.: ${s.duracion_min} min. Precio: ${precioTxt(s)}.${s.requiere_valoracion ? ' Requiere orientación/valoración previa del equipo.' : ''}`).join('\n')}

Reglas obligatorias:
- Si algo no está en la información anterior, no lo supongas: di que el equipo lo confirma y marca derivar_asesora=true.
- Nunca prometas resultados, ausencia de dolor, resultados permanentes ni un número fijo de sesiones.
- No des consejo médico. Si mencionan embarazo, cirugías, medicamentos, enfermedades o condiciones de salud, responde con amabilidad que una asesora le orienta personalmente y marca derivar_asesora=true.
- No inventes promociones, descuentos ni disponibilidad. La disponibilidad la muestra el sistema de agenda, no tú.
- Si la persona quiere agendar, usa intencion="agendar" y el servicio_id si lo identificas.
- Respuesta de máximo 450 caracteres.`;

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
  const params = {
    model: env.CLAUDE_MODEL,
    max_tokens: 2000,
    system: [{ type: 'text', text: SISTEMA, cache_control: { type: 'ephemeral' } }],
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
