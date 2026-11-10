// Reservas web públicas (/reservas): perfil + flujo de reserva. Usa el MISMO motor de agenda, base de datos, panel y WhatsApp que el bot:
// una cita hecha en la web aparece en el panel, bloquea el cupo para el bot, recibe recordatorios y se puede gestionar por WhatsApp.
import crypto from 'node:crypto';
import { env, negocio, servicios, servicioPorId, modoSimulacion, categoriasOrden } from './config.js';
import * as db from './db.js';
import * as agenda from './agenda.js';
import * as wa from './whatsapp.js';
import * as capi from './capi.js';
import * as nlu from './nlu.js';
import { notificarEquipo, dentroVentana } from './bot.js';
import { enlaceCita, enlaceWhatsApp, numeroPublico } from './enlaces.js';
import { rutaDemo, configAsistente } from './demo.js';
import { ahoraMs, aMs, hoyLocal, diaSemana, fechaLarga, fechaHoraLarga, hora12, NOMBRES_DIAS } from './tiempo.js';

const MAX_SERVICIOS = 6;
const FOTO = /^fotos\/[\w-]+\.(jpe?g|png|webp)$/i;   // solo archivos de public/reservas/fotos/ (el servidor sirve una lista cerrada)
const fotoValida = f => (typeof f === 'string' && FOTO.test(f) ? f : null);
// Indicativos aceptados (los mismos de la web de referencia). Colombia es el predeterminado.
export const PAISES = { 57: 'CO', 51: 'PE', 593: 'EC', 54: 'AR', 595: 'PY', 598: 'UY', 56: 'CL', 591: 'BO', 507: 'PA', 52: 'MX', 351: 'PT', 1: 'US', 34: 'ES' };

// ───────── Límite de abusos (en memoria; por IP) ─────────
const cubetas = new Map();
export function limitar(ip, clave, max, ventanaMs) {
  const k = `${ip}|${clave}`, ahora = Date.now();
  let b = cubetas.get(k);
  if (!b || b.reinicia < ahora) { b = { n: 0, reinicia: ahora + ventanaMs }; cubetas.set(k, b); }
  b.n++;
  if (cubetas.size > 5000) for (const [kk, v] of cubetas) if (v.reinicia < ahora) cubetas.delete(kk);
  return b.n <= max;
}
export const ipDe = req => (env.TRUST_PROXY ? String(req.headers['x-forwarded-for'] || '').split(',')[0].trim() : '') || req.socket.remoteAddress || 'desconocida';

// ───────── Utilidades ─────────
class ErrorWeb extends Error { constructor(estado, mensaje) { super(mensaje); this.estado = estado; } }
const limpiar = (s, max) => String(s ?? '').replace(/[\u0000-\u001f<>]/g, ' ').replace(/\s+/g, ' ').trim().slice(0, max);
const ALFABETO = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789'; // sin letras ni números que se confunden (I, L, O, 0, 1)
const codigoReserva = () => 'VS-' + Array.from(crypto.randomBytes(6), b => ALFABETO[b % ALFABETO.length]).join('');
const nuevoToken = () => crypto.randomBytes(24).toString('base64url');
const precioTxt = s => (s?.precio ? `$${Number(s.precio).toLocaleString('es-CO')}` : null);
const enmascarar = wa_id => `••••${String(wa_id).slice(-4)}`;

function validarServicios(ids) {
  if (!Array.isArray(ids) || !ids.length) throw new ErrorWeb(422, 'Elige al menos un servicio.');
  const unicos = [...new Set(ids.map(String))];
  if (unicos.length > MAX_SERVICIOS) throw new ErrorWeb(422, `Puedes elegir hasta ${MAX_SERVICIOS} servicios por visita.`);
  const ss = unicos.map(servicioPorId);
  if (ss.some(s => !s)) throw new ErrorWeb(422, 'Uno de los servicios no existe.');
  const restringidos = ss.filter(s => s.requiere_valoracion || s.solo);
  if (unicos.length > 1 && restringidos.length && ss.some(s => !(s.requiere_valoracion || s.solo) || s.categoria !== restringidos[0].categoria)) throw new ErrorWeb(422, 'La depilación láser (cita de orientación) y el masaje postoperatorio se agendan solos o junto a otros de su misma categoría, no mezclados con el resto.');
  return unicos;
}
const idsDeQuery = q => String(q ?? '').split(',').map(s => s.trim()).filter(Boolean);
const fechaValida = f => /^\d{4}-\d{2}-\d{2}$/.test(f || '') && !Number.isNaN(Date.parse(f));

function validarTelefono(pais, telefono) {
  const p = String(pais || '57').replace(/\D/g, '');
  if (!PAISES[p]) throw new ErrorWeb(422, 'Elige un indicativo de país válido.');
  let n = String(telefono ?? '').replace(/\D/g, '');
  if (n.startsWith(p) && n.length > (p === '57' ? 10 : 11)) n = n.slice(p.length); // pegaron el número con indicativo
  if (p === '57' ? !/^3\d{9}$/.test(n) : !/^\d{7,12}$/.test(n)) throw new ErrorWeb(422, p === '57' ? 'Escribe tu celular de 10 dígitos (empieza por 3).' : 'Escribe un número de WhatsApp válido.');
  return p + n;
}

// ───────── Configuración pública ─────────
function horarioPublico() {
  return [1, 2, 3, 4, 5, 6, 0].map(n => {
    const h = negocio.horario?.[String(n)];
    return { dia: NOMBRES_DIAS[n].charAt(0).toUpperCase() + NOMBRES_DIAS[n].slice(1), n, abierto: !!h, texto: h ? `${hora12(h[0])} a ${hora12(h[1])}` : 'Cerrado' };
  });
}

/** Opiniones copiadas a mano de Google (config → web.opiniones). Sin puntuación, total y enlace reales no se muestra nada. */
function opinionesPublicas() {
  const o = negocio.web?.opiniones;
  if (!o || !(o.puntuacion > 0) || !(o.total > 0) || !String(o.enlace || '').startsWith('https://')) return null;
  const items = (o.items || []).filter(i => i && i.autor && i.texto && i.estrellas >= 1 && i.estrellas <= 5)
    .map(i => ({ autor: String(i.autor), estrellas: Math.round(i.estrellas), fecha: i.fecha ? String(i.fecha) : null, texto: String(i.texto) }));
  return { fuente: o.fuente || 'Google', puntuacion: o.puntuacion, total: o.total, enlace: o.enlace, items };
}

export function configPublica() {
  const h = negocio.horario?.[String(diaSemana(hoyLocal()))];
  return {
    negocio: {
      nombre: negocio.nombre, frase: negocio.web?.frase || null, descripcion: negocio.web?.descripcion || null, ciudad: negocio.ciudad || null,
      direccion: negocio.direccion, como_llegar: negocio.como_llegar || null, mapa_url: negocio.web?.mapa_url || null,
      horario: horarioPublico(), horario_texto: negocio.horario_texto, hoy_abierto: !!h && !(negocio.dias_cerrados || []).includes(hoyLocal()),
      telefono: /^\+\d{8,15}$/.test(negocio.web?.telefono || '') ? negocio.web.telefono : null, coordenadas: negocio.web?.coordenadas || null,
      opiniones: opinionesPublicas(), confianza: negocio.web?.confianza || null,
      facebook: String(negocio.web?.facebook || '').startsWith('https://') ? negocio.web.facebook : null,
      instagram: negocio.web?.instagram || null, comodidades: negocio.web?.comodidades || [], galeria: (negocio.web?.galeria || []).map(g => ({ src: fotoValida(g.src || g), alt: limpiar(g.alt || '', 120) })).filter(g => g.src),
      privacidad_url: negocio.web?.privacidad_url || null, politica_cambios: String(negocio.politica_cambios || '').replace(/por este chat/gi, 'por WhatsApp'), indicaciones_generales: negocio.indicaciones_generales,
    },
    servicios: servicios.map(s => ({
      id: s.id, nombre: s.nombre, descripcion: s.descripcion, incluye: s.incluye, duracion_min: s.duracion_min, precio: s.precio ?? null, precio_nota: s.precio_nota || null, paquete: s.paquete || null, categoria: s.categoria || null, foto: fotoValida(s.foto),
      requiere_valoracion: !!s.requiere_valoracion, revisar_condiciones: !!s.revisar_condiciones, solo: !!(s.requiere_valoracion || s.solo), indicaciones: s.indicaciones || null, codigos: s.codigos_anuncio || [],
    })),
    agenda: { dias_adelante: negocio.agenda.dias_adelante, hoy: hoyLocal() },
    asistente: configAsistente(),
    categorias: [...new Set([...categoriasOrden, ...servicios.map(s => s.categoria).filter(Boolean)])],
    whatsapp: { numero: numeroPublico(), enlace: enlaceWhatsApp('Hola, quiero información sobre los servicios de Valencia Stetic'), simulador: env.SIMULADOR && modoSimulacion() },
    paises: Object.entries(PAISES).map(([codigo, iso]) => ({ codigo, iso })),
  };
}

// ───────── Disponibilidad ─────────
export function disponibilidad(q) {
  const ids = validarServicios(idsDeQuery(q.servicios || q.servicio));
  if (q.fecha) {
    if (!fechaValida(q.fecha)) throw new ErrorWeb(400, 'Fecha inválida.');
    return { horas: agenda.horasDisponiblesSecuencia(ids, q.fecha), duracion_min: agenda.duracionVisita(ids) };
  }
  return { dias: agenda.diasDisponiblesSecuencia(ids), duracion_min: agenda.duracionVisita(ids) };
}

// ───────── Reserva ─────────
function describir(citas) {
  return citas.map(c => { const s = servicioPorId(c.servicio_id); return { id: c.id, servicio_id: c.servicio_id, servicio: s?.nombre || c.servicio_id, inicio: c.inicio, duracion_min: s?.duracion_min, estado: c.estado, orientacion: !!s?.requiere_valoracion }; });
}
const primerNombre = n => String(n || '').split(' ')[0];

function textoConfirmacion(citas, nombre, codigo, token) {
  const ss = citas.map(c => servicioPorId(c.servicio_id));
  const lineas = [`Hola ${primerNombre(nombre)}, recibimos tu reserva en Valencia Stetic ✅`, ''];
  citas.forEach((c, i) => lineas.push(`• ${ss[i].nombre}${ss[i].requiere_valoracion ? ' (cita de orientación)' : ''} · ${hora12(c.inicio.slice(11, 16))}`));
  lineas.push(`📅 ${fechaLarga(citas[0].inicio.slice(0, 10)).replace(/^./, m => m.toUpperCase())}`, `📍 ${negocio.direccion}`);
  const valor = ss.every(s => s.precio) ? `$${ss.reduce((t, s) => t + Number(s.precio), 0).toLocaleString('es-CO')}` : 'el equipo te confirma el valor vigente';
  lineas.push(`Valor: ${valor}`, '');
  if (negocio.politica_cambios) lineas.push(negocio.politica_cambios);
  lineas.push(`Código de tu reserva: ${codigo}`, `Para ver, cambiar o cancelar: ${enlaceCita(token)}`);
  return lineas.join('\n');
}

/** Confirma por WhatsApp. Dentro de la ventana de 24 h va texto con botones; fuera, la plantilla aprobada. En simulación queda registrado en el chat del panel. */
async function confirmarPorWhatsApp(citas, c, codigo, token) {
  const ss = citas.map(x => servicioPorId(x.servicio_id));
  const contacto = db.obtenerContacto(c.wa_id);
  const principal = citas[0];
  try {
    if (dentroVentana(contacto) || modoSimulacion()) {
      await wa.enviar(c.wa_id, {
        tipo: 'botones', texto: textoConfirmacion(citas, c.nombre, codigo, token),
        botones: [{ id: `cita:confirmar:${principal.id}`, titulo: 'Confirmo asistencia' }, { id: `cita:reprogramar:${principal.id}`, titulo: 'Cambiar horario' }, { id: `cita:cancelar:${principal.id}`, titulo: 'Cancelar cita' }],
      }, { autor: 'sistema' });
    } else if (negocio.plantillas?.cita_web) {
      await wa.enviar(c.wa_id, {
        tipo: 'plantilla', nombre: negocio.plantillas.cita_web,
        params: [primerNombre(c.nombre) || 'hola', ss.map(s => s.nombre).join(' + '), fechaLarga(principal.inicio.slice(0, 10)), hora12(principal.inicio.slice(11, 16)), codigo],
        botones_payload: [`cita:confirmar:${principal.id}`, `cita:reprogramar:${principal.id}`, `cita:cancelar:${principal.id}`],
      }, { autor: 'sistema' });
    }
  } catch (err) { console.error('[reservas] no se pudo confirmar por WhatsApp:', err.message); }
}

export async function crearReserva(b, ip) {
  if (b.sitio) return { ok: true, codigo: 'VS-000000', citas: [] }; // campo trampa para bots: se aparenta éxito y no se guarda nada
  if (b.acepto !== true) throw new ErrorWeb(422, 'Debes aceptar el tratamiento de tus datos para reservar.');
  const ids = validarServicios(b.servicios);
  const inicio = String(b.inicio || '');
  if (!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(inicio)) throw new ErrorWeb(422, 'Elige una fecha y una hora.');
  const nombre = limpiar(b.nombre, 80);
  if (nombre.length < 3 || /https?:|www\.|@/i.test(nombre)) throw new ErrorWeb(422, 'Escribe tu nombre y apellido.');
  const wa_id = validarTelefono(b.pais, b.telefono);
  const email = limpiar(b.email, 120);
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) throw new ErrorWeb(422, 'El correo no parece válido.');
  const notas = limpiar(b.notas, 300);
  const ref = b.ref && typeof b.ref === 'object' ? b.ref : {};

  const c0 = db.crearOActualizarContacto(wa_id, {});
  const codigoAnuncio = servicios.flatMap(s => s.codigos_anuncio || []).map(x => x.toUpperCase()).includes(String(ref.cod || '').toUpperCase()) ? String(ref.cod).toUpperCase() : null;
  db.actualizarContacto(wa_id, {
    nombre, ...(email ? { email } : {}), servicio_interes: ids[0],
    ...(!c0.codigo_anuncio && codigoAnuncio ? { codigo_anuncio: codigoAnuncio } : {}),
    ...(!c0.source_type ? { source_type: 'web', source_url: limpiar([ref.src, ref.utm_source, ref.utm_campaign].filter(Boolean).join(' · '), 200) || null } : {}),
  });
  const contacto = db.obtenerContacto(wa_id);

  const codigo = codigoReserva(), token = nuevoToken();
  let citas;
  try {
    citas = agenda.reservarSecuencia({ wa_id, servicioIds: ids, inicio, nombre, contacto, origen: 'web', notas: notas || undefined, token, grupo: codigo });
  } catch (err) {
    if (err instanceof agenda.CupoOcupadoError) throw new ErrorWeb(409, 'Ese horario se acaba de ocupar. Elige otro, por favor.');
    if (err instanceof agenda.LimiteCitasError) throw new ErrorWeb(409, 'Ya tienes reservas activas con nosotros. Escríbenos por WhatsApp y te ayudamos a organizarlas.');
    throw err;
  }
  db.avanzarEtapa(wa_id, 'Cita agendada', { forzar: true });

  // Temas de salud en las notas: no se guardan etiquetas clínicas; se marca para que una persona del equipo revise (igual que en el bot).
  const sensible = notas && nlu.esSensible(notas);
  if (sensible) for (const c of citas) db.actualizarCita(c.id, { requiere_revision: true });
  const revisar = sensible || citas.some(c => c.requiere_revision);
  const ss = citas.map(c => servicioPorId(c.servicio_id));
  notificarEquipo(`Nueva cita WEB: ${nombre} · ${ss.map(s => s.nombre).join(' + ')} · ${fechaHoraLarga(citas[0].inicio)}${codigoAnuncio ? ' · anuncio ' + codigoAnuncio : ''}${revisar ? ' · REVISAR condiciones' : ''}`);
  capi.eventoCita(citas[0]).catch(() => {});
  confirmarPorWhatsApp(citas, { wa_id, nombre }, codigo, token);

  const texto = `Hola, reservé en la web con el código ${codigo} y quiero confirmar mi cita en Valencia Stetic.`;
  return {
    ok: true, codigo, token, citas: describir(citas), revisar, direccion: negocio.direccion,
    enlace_gestion: `/reservas/cita/${token}`, whatsapp: enlaceWhatsApp(texto), whatsapp_texto: texto, simulador: env.SIMULADOR && modoSimulacion() ? `/simulador?tel=${encodeURIComponent(wa_id)}&texto=${encodeURIComponent(texto)}` : null,
  };
}

// ───────── Gestión con el enlace privado ─────────
function visitaPorToken(token) {
  const principal = db.citaPorToken(token);
  if (!principal) throw new ErrorWeb(404, 'No encontramos esa reserva. Revisa el enlace que te enviamos.');
  const citas = principal.grupo ? db.citasDelGrupo(principal.grupo) : [principal];
  return { principal, citas };
}
const activa = citas => citas.some(c => ['agendada', 'confirmada'].includes(c.estado) && c.inicio >= `${hoyLocal()}T00:00`);
function dentroDePlazo(citas) {
  const h = negocio.agenda?.cambios_hasta_horas;
  if (h == null) return true;
  return aMs(citas[0].inicio) - ahoraMs() >= h * 3600000;
}

export function verReserva(token) {
  const { principal, citas } = visitaPorToken(token);
  const puede = activa(citas) && aMs(citas[0].inicio) > ahoraMs();
  return {
    codigo: principal.grupo, nombre: primerNombre(principal.nombre), telefono: enmascarar(principal.wa_id), citas: describir(citas), estado: citas.every(c => c.estado === 'cancelada') ? 'cancelada' : citas.some(c => c.estado === 'asistio') ? 'asistio' : citas.some(c => c.estado === 'confirmada') ? 'confirmada' : 'agendada',
    puede_cambiar: puede && dentroDePlazo(citas), plazo_horas: negocio.agenda?.cambios_hasta_horas ?? null, politica_cambios: String(negocio.politica_cambios || '').replace(/por este chat/gi, 'por WhatsApp'), direccion: negocio.direccion,
    servicios_ids: citas.map(c => c.servicio_id),
  };
}

export function disponibilidadReserva(token, q) {
  const { citas } = visitaPorToken(token);
  const excluir = new Set(citas.map(c => c.id)), ids = citas.map(c => c.servicio_id);
  if (q.fecha) { if (!fechaValida(q.fecha)) throw new ErrorWeb(400, 'Fecha inválida.'); return { horas: agenda.horasDisponiblesSecuencia(ids, q.fecha, { excluir }) }; }
  return { dias: agenda.diasDisponiblesSecuencia(ids, { excluir }) };
}

export async function cancelarReserva(token) {
  const { principal, citas } = visitaPorToken(token);
  if (!activa(citas)) throw new ErrorWeb(409, 'Esta reserva ya no está activa.');
  if (!dentroDePlazo(citas)) throw new ErrorWeb(409, `Ya pasó el plazo para cancelar por aquí (${negocio.agenda.cambios_hasta_horas} h antes). Escríbenos por WhatsApp y lo revisamos.`);
  for (const c of citas) if (['agendada', 'confirmada'].includes(c.estado)) db.actualizarCita(c.id, { estado: 'cancelada' });
  if (!db.citasActivasDe(principal.wa_id).length) db.avanzarEtapa(principal.wa_id, 'Seguimiento', { forzar: true });
  notificarEquipo(`Cita CANCELADA desde la web: ${principal.nombre || principal.wa_id} · ${citas.map(c => servicioPorId(c.servicio_id)?.nombre).join(' + ')} · ${fechaHoraLarga(citas[0].inicio)}`);
  return verReserva(token);
}

export async function reprogramarReserva(token, inicio) {
  const { principal, citas } = visitaPorToken(token);
  if (!activa(citas)) throw new ErrorWeb(409, 'Esta reserva ya no está activa.');
  if (!dentroDePlazo(citas)) throw new ErrorWeb(409, `Ya pasó el plazo para cambiarla por aquí (${negocio.agenda.cambios_hasta_horas} h antes). Escríbenos por WhatsApp y lo revisamos.`);
  if (!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(String(inicio || ''))) throw new ErrorWeb(422, 'Elige una fecha y una hora.');
  const vivas = citas.filter(c => ['agendada', 'confirmada'].includes(c.estado));
  try { agenda.reprogramarVisita(vivas, inicio); }
  catch (err) { if (err instanceof agenda.CupoOcupadoError) throw new ErrorWeb(409, 'Ese horario no está disponible. Elige otro, por favor.'); throw err; }
  db.avanzarEtapa(principal.wa_id, 'Cita agendada', { forzar: true });
  notificarEquipo(`Cita REPROGRAMADA desde la web: ${principal.nombre || principal.wa_id} · ${vivas.map(c => servicioPorId(c.servicio_id)?.nombre).join(' + ')} · ${fechaHoraLarga(inicio)}`);
  return verReserva(token);
}

// ───────── Enrutador de la API pública ─────────
export async function rutaPublica(req, url, leerJson) {
  const p = url.pathname.replace(/\/+$/, ''), m = req.method, q = Object.fromEntries(url.searchParams), ip = ipDe(req);
  if (!limitar(ip, 'api', Number(process.env.RESERVAS_MAX_API_MIN || 120), 60_000)) throw new ErrorWeb(429, 'Demasiadas solicitudes. Espera un momento.');
  let r;
  const delegada = await rutaDemo({ p, m, q, req, leerJson, ip, ErrorWeb, limitar });
  if (delegada !== undefined) return delegada;
  if (p === '/api/publico/config' && m === 'GET') return configPublica();
  if (p === '/api/publico/disponibilidad' && m === 'GET') return disponibilidad(q);
  if (p === '/api/publico/citas' && m === 'POST') {
    if (!limitar(ip, 'reservar', Number(process.env.RESERVAS_MAX_POR_HORA || 6), 3600_000)) throw new ErrorWeb(429, 'Hiciste varias reservas seguidas. Si necesitas más, escríbenos por WhatsApp.');
    return crearReserva(await leerJson(req), ip);
  }
  if ((r = p.match(/^\/api\/publico\/cita\/([\w-]{20,64})(\/[a-z]+)?$/))) {
    const token = r[1], accion = r[2];
    if (!accion && m === 'GET') return verReserva(token);
    if (accion === '/disponibilidad' && m === 'GET') return disponibilidadReserva(token, q);
    if (!limitar(ip, 'gestion', 20, 3600_000)) throw new ErrorWeb(429, 'Demasiados intentos. Espera un momento.');
    if (accion === '/cancelar' && m === 'POST') return cancelarReserva(token);
    if (accion === '/reprogramar' && m === 'POST') return reprogramarReserva(token, (await leerJson(req)).inicio);
  }
  throw new ErrorWeb(404, 'No encontrado');
}
export { ErrorWeb };
