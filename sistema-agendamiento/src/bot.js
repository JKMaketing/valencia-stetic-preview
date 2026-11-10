// Cerebro del asistente: atiende, orienta y agenda por WhatsApp.
import { env, negocio, servicios, servicioPorId } from './config.js';
import * as db from './db.js';
import * as nlu from './nlu.js';
import * as agenda from './agenda.js';
import * as wa from './whatsapp.js';
import * as capi from './capi.js';
import { CODIGO_RESERVA, enlaceCita, enlaceReservas } from './enlaces.js';
import { interpretarConIA, iaDisponible } from './ia.js';
import { ahoraMs, aMs, ahoraLocal, diaSemana, hhmmAMin, fechaLarga, fechaCorta, hora12, fechaHoraLarga, conArticulo, delArticulo } from './tiempo.js';

const HORA = 3600000;
const VENTANA_MS = 24 * HORA - 10 * 60000; // ventana de atención de WhatsApp (con margen)
const PAUSA_AUTO_MS = 12 * HORA;           // el bot se reactiva solo si el equipo no escribe en 12 h

// ───────── Utilidades de mensajes ─────────
const texto = t => ({ tipo: 'texto', texto: t });
const botones = (t, bs, extra = {}) => ({ tipo: 'botones', texto: t, botones: bs, ...extra });
const lista = (t, boton, secciones, extra = {}) => ({ tipo: 'lista', texto: t, boton, secciones, ...extra });
const mayus = s => s.charAt(0).toUpperCase() + s.slice(1);
const primerNombre = c => (c.nombre || c.nombre_perfil || '').split(' ')[0];
const precioTxt = s => (s.precio
  ? `$${Number(s.precio).toLocaleString('es-CO')}${s.precio_nota ? ` (${s.precio_nota.toLowerCase()})` : ''}`
  : (s.precio_nota ? `${s.precio_nota.toLowerCase()}; te lo confirma el equipo al agendar` : 'te lo confirma el equipo al agendar'));
const llenar = t => t.replace(/\{(\w+)\}/g, (_, k) => negocio[k] ?? '').replace(/\s+$/, '').trim();

export const dentroVentana = c => !!c?.ultimo_entrante && ahoraMs() - c.ultimo_entrante < VENTANA_MS;

export function enHorario() {
  const ahora = ahoraLocal();
  const fecha = ahora.slice(0, 10);
  if ((negocio.dias_cerrados || []).includes(fecha)) return false;
  const h = negocio.horario[String(diaSemana(fecha))];
  if (!h) return false;
  const m = hhmmAMin(ahora.slice(11, 16));
  return m >= hhmmAMin(h[0]) && m < hhmmAMin(h[1]);
}

const BOTON_ASESORA = { id: 'act:asesora', titulo: 'Hablar con asesora' };

// ───────── Piezas de conversación ─────────
function bienvenida(c) {
  const n = primerNombre(c);
  return `Hola${n ? ' ' + n : ''}, gracias por escribir a ${negocio.nombre}. Estamos en ${negocio.direccion}. Te ayudo a conocer nuestros servicios y a agendar tu cita aquí mismo, en pocos pasos.`;
}

// Con muchos servicios el menú va por categorías (una lista de WhatsApp admite máximo 10 filas en total).
const slugCat = c => String(c).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const categoriasServicios = () => {
  const m = new Map();
  for (const s of servicios) if (s.categoria) m.set(s.categoria, [...(m.get(s.categoria) || []), s]);
  return m;
};
const precioCorto = s => (s.precio ? `$${Number(s.precio).toLocaleString('es-CO')}` : (s.precio_nota || 'Valor por confirmar'));

function menuCategorias(intro) {
  const cats = [...categoriasServicios()].slice(0, 9);
  return lista(intro, 'Ver categorías', [{
    titulo: 'Categorías',
    filas: [
      ...cats.map(([nombre, ss]) => ({ id: `cat:${slugCat(nombre)}:0`, titulo: nombre.slice(0, 24), descripcion: `${ss.length} ${ss.length === 1 ? 'servicio' : 'servicios'}` })),
      { id: 'act:asesora', titulo: 'Hablar con asesora', descripcion: 'Una persona del equipo te atiende' },
    ],
  }]);
}

function mostrarCategoria(t, slug, pagina = 0) {
  const ent = [...categoriasServicios()].find(([n]) => slugCat(n) === slug);
  if (!ent) return mostrarMenu(t);
  const [nombre, ss] = ent, TAM = 8, desde = pagina * TAM, trozo = ss.slice(desde, desde + TAM);
  const filas = trozo.map(s => ({ id: `svc:${s.id}`, titulo: (s.nombre_corto || s.nombre).slice(0, 24), descripcion: precioCorto(s).slice(0, 72) }));
  if (desde + TAM < ss.length) filas.push({ id: `cat:${slug}:${pagina + 1}`, titulo: 'Ver más', descripcion: `${ss.length - desde - TAM} más en ${nombre}`.slice(0, 72) });
  filas.push({ id: 'act:menu', titulo: 'Ver categorías', descripcion: 'Volver al inicio' });
  return t.decir(lista(`*${nombre}*\n¿Cuál te interesa?`, 'Ver opciones', [{ titulo: nombre.slice(0, 24), filas }]));
}

function menuServicios(intro = '¿Qué servicio quieres conocer o agendar?') {
  if (servicios.length > 8 && categoriasServicios().size > 1) return menuCategorias(intro);
  return lista(intro, 'Ver servicios', [{
    titulo: 'Servicios',
    filas: [
      ...servicios.map(s => ({ id: `svc:${s.id}`, titulo: s.nombre_corto || s.nombre, descripcion: `${s.duracion_min} min aprox.${s.requiere_valoracion ? ' · con orientación previa' : ''}` })),
      { id: 'act:asesora', titulo: 'Hablar con asesora', descripcion: 'Una persona del equipo te atiende' },
    ],
  }]);
}

function fichaServicio(s) {
  const lineas = [
    `*${s.nombre}*`, s.descripcion, '',
    `• Incluye: ${s.incluye}`,
    `• Duración aproximada: ${s.duracion_min} minutos`,
    `• Valor: ${precioTxt(s)}`,
  ];
  if (s.requiere_valoracion) lineas.push('', 'La primera cita es de orientación: el equipo revisa tu caso y define contigo el plan. No hay un número de sesiones igual para todas las personas.');
  else if (s.revisar_condiciones) lineas.push('', 'Antes de la cita una asesora revisa tu caso contigo para confirmar que el servicio es adecuado para ti.');
  if (env.PUBLIC_URL) lineas.push('', `También puedes reservar en línea: ${enlaceReservas({ servicio: s.id, fuente: 'bot' })}`);
  lineas.push('', '¿Quieres que busquemos un horario?');
  return botones(lineas.join('\n'), [
    { id: `act:agendar:${s.id}`, titulo: 'Agendar cita' },
    { id: 'act:menu', titulo: 'Ver otro servicio' },
    BOTON_ASESORA,
  ]);
}

function resumenCita(c, d) {
  const s = servicioPorId(d.servicio);
  const fecha = d.inicio.slice(0, 10), hora = d.inicio.slice(11, 16);
  const titulo = d.reprogramar ? 'Revisemos el nuevo horario de tu cita:' : 'Revisemos tu cita:';
  return botones([
    titulo, '',
    `• Servicio: ${s.nombre}${s.requiere_valoracion ? ' (cita de orientación)' : ''}`,
    `• Fecha: ${fechaLarga(fecha)}`,
    `• Hora: ${hora12(hora)}`,
    `• A nombre de: ${c.nombre || d.nombre || c.nombre_perfil || '—'}`,
    `• Valor: ${precioTxt(s)}`,
    `• Lugar: ${negocio.direccion}`, '',
    '¿La confirmo?',
  ].join('\n'), [
    { id: 'conf:si', titulo: 'Confirmar' },
    { id: 'conf:cambiar', titulo: 'Cambiar horario' },
    BOTON_ASESORA,
  ]);
}

// ───────── Contexto de una conversación ─────────
class Turno {
  constructor(contacto) { this.c = contacto; this.salida = []; this.datos = { ...(contacto.estado_datos || {}) }; this.estado = contacto.estado || null; }
  decir(...ms) { this.salida.push(...ms); }
  ir(estado, datos) { this.estado = estado; if (datos) this.datos = { ...this.datos, ...datos }; }
  limpiar() { this.estado = null; this.datos = {}; }
}

// ───────── Acciones ─────────
function mostrarServicio(t, id) {
  const s = servicioPorId(id);
  if (!s) return mostrarMenu(t);
  delete t.datos.reprogramar;
  t.ir('info_servicio', { servicio: s.id });
  db.actualizarContacto(t.c.wa_id, { servicio_interes: s.id });
  db.avanzarEtapa(t.c.wa_id, s.precio ? 'Precio enviado' : 'Orientado');
  t.decir(fichaServicio(s));
}

function mostrarMenu(t, intro) {
  delete t.datos.reprogramar;
  t.ir('elegir_servicio', { servicio: null });
  t.decir(menuServicios(intro));
}

function iniciarAgenda(t, servicioId) {
  const sid = servicioId || t.datos.servicio || t.c.servicio_interes;
  if (!sid || !servicioPorId(sid)) return mostrarMenu(t, '¿Qué servicio quieres agendar?');
  const s = servicioPorId(sid);
  const dias = agenda.diasDisponibles(sid, 10, { excluirCitaId: t.datos.reprogramar || 0 });
  t.ir('elegir_dia', { servicio: sid, fecha: null, inicio: null });
  db.actualizarContacto(t.c.wa_id, { servicio_interes: sid });
  db.avanzarEtapa(t.c.wa_id, 'Orientado');
  if (!dias.length) {
    t.decir(texto(`En este momento no tengo cupos en línea para ${s.nombre} en los próximos días.`));
    return derivar(t, 'sin_cupos');
  }
  t.decir(lista(`¿Qué día te queda mejor para tu cita de ${s.nombre}?`, 'Ver días', [{
    titulo: 'Días con cupo',
    filas: dias.map(d => ({ id: `day:${d.fecha}`, titulo: mayus(fechaCorta(d.fecha)), descripcion: `${d.cupos} horario${d.cupos === 1 ? '' : 's'} disponible${d.cupos === 1 ? '' : 's'}` })),
  }], { pie: 'También puedes escribir el día, por ejemplo: "el sábado"' }));
}

function mostrarHoras(t, fecha, { pagina = 0, franja = null, aviso = null } = {}) {
  const sid = t.datos.servicio;
  let horas = agenda.horasDisponibles(sid, fecha, { excluirCitaId: t.datos.reprogramar || 0 });
  if (!horas.length) {
    t.decir(texto(aviso || `Para ${conArticulo(fechaLarga(fecha))} ya no tengo cupos. Te muestro otros días:`));
    return iniciarAgenda(t, sid);
  }
  let intro = aviso ? `${aviso}\n\n` : '';
  if (franja) {
    const f = horas.filter(h => (franja === 'manana' ? hhmmAMin(h) < 720 : hhmmAMin(h) >= 720));
    if (f.length) horas = f;
    else intro += `En la ${franja === 'manana' ? 'mañana' : 'tarde'} no quedan cupos ese día. `;
  }
  const POR_PAGINA = 9;
  const paginar = horas.length > 10;
  const visibles = paginar ? horas.slice(pagina * POR_PAGINA, (pagina + 1) * POR_PAGINA) : horas;
  const filas = visibles.map(h => ({ id: `slot:${fecha}T${h}`, titulo: hora12(h) }));
  if (paginar && (pagina + 1) * POR_PAGINA < horas.length) filas.push({ id: `slotp:${fecha}:${pagina + 1}`, titulo: 'Más horarios ➜', descripcion: 'Ver horarios más tarde' });
  else if (paginar) filas.push({ id: `slotp:${fecha}:0`, titulo: 'Volver al inicio', descripcion: 'Primeros horarios del día' });
  t.ir('elegir_hora', { fecha });
  t.decir(lista(`${intro}Horarios libres para ${conArticulo(fechaLarga(fecha))}:`, 'Ver horarios', [{ titulo: 'Horarios', filas }],
    { pie: 'Puedes escribir la hora, por ejemplo: "4 pm"' }));
}

function elegirHora(t, inicio) {
  t.ir(null, { inicio });
  if (t.datos.reprogramar || t.c.nombre) { t.ir('confirmar'); return t.decir(resumenCita(t.c, t.datos)); }
  t.ir('pedir_nombre');
  const bs = t.c.nombre_perfil && nlu.limpiarNombre(t.c.nombre_perfil) ? [{ id: 'nom:perfil', titulo: nlu.limpiarNombre(t.c.nombre_perfil) }] : null;
  const pregunta = '¡Perfecto! ¿A nombre de quién agendo la cita? Escríbeme nombre y apellido.';
  t.decir(bs ? botones(pregunta + ' O toca el botón si es a tu nombre.', bs) : texto(pregunta));
}

async function confirmarReserva(t) {
  const d = t.datos;
  if (!d.servicio || !d.inicio) return iniciarAgenda(t);
  const s = servicioPorId(d.servicio);
  try {
    let cita;
    if (d.reprogramar) {
      cita = agenda.reprogramar(d.reprogramar, d.inicio);
      t.limpiar();
      db.avanzarEtapa(t.c.wa_id, 'Cita agendada', { forzar: true });
      t.decir(texto(`Listo, movimos tu cita ✅\n\n${s.nombre}\n${mayus(fechaHoraLarga(cita.inicio))}\n${negocio.direccion}\n\nTe enviaremos un recordatorio antes de la cita.`));
      notificarEquipo(`Cita reprogramada: ${cita.nombre || t.c.nombre_perfil || t.c.wa_id} · ${s.nombre} · ${fechaHoraLarga(cita.inicio)}`);
      return;
    }
    cita = agenda.reservar({ wa_id: t.c.wa_id, servicioId: s.id, inicio: d.inicio, nombre: t.c.nombre || d.nombre || t.c.nombre_perfil, contacto: t.c });
    t.limpiar();
    db.avanzarEtapa(t.c.wa_id, 'Cita agendada', { forzar: true });
    const partes = [
      'Listo, tu cita quedó agendada ✅', '',
      `*${s.nombre}*${s.requiere_valoracion ? ' (orientación)' : ''}`,
      mayus(fechaHoraLarga(cita.inicio)),
      negocio.direccion,
      `Valor: ${precioTxt(s)}`, '',
      [s.indicaciones, negocio.indicaciones_generales].filter(Boolean).join(' '),
      negocio.politica_cambios,
    ];
    if (s.requiere_valoracion || s.revisar_condiciones) partes.push('', 'Una asesora revisará tu caso y te confirmará por aquí las indicaciones previas antes de la cita.');
    partes.push('', 'Te enviaremos un recordatorio el día anterior. Si necesitas cambiarla, escríbeme por aquí.');
    t.decir(texto(partes.join('\n').replace(/\n{3,}/g, '\n\n')));
    capi.eventoCita(cita).catch(() => {});
    notificarEquipo(`Nueva cita: ${cita.nombre || t.c.wa_id} · ${s.nombre} · ${fechaHoraLarga(cita.inicio)}${cita.codigo_anuncio ? ' · anuncio ' + cita.codigo_anuncio : ''}${cita.requiere_revision ? ' · REVISAR condiciones' : ''}`);
  } catch (err) {
    if (err instanceof agenda.CupoOcupadoError) return mostrarHoras(t, d.inicio.slice(0, 10), { aviso: 'Ese horario se acaba de ocupar, lo siento. Estos siguen libres:' });
    if (err instanceof agenda.LimiteCitasError) {
      t.limpiar();
      t.decir(botones('Ya tienes citas activas con nosotros. Para agendar otra, una asesora te ayuda a organizarlas.', [BOTON_ASESORA, { id: 'act:mis_citas', titulo: 'Ver mis citas' }]));
      return;
    }
    throw err;
  }
}

function derivar(t, motivo) {
  t.limpiar();
  db.actualizarContacto(t.c.wa_id, { bot_pausado: ahoraMs() });
  db.avanzarEtapa(t.c.wa_id, 'Requiere asesora', { forzar: true });
  let msg;
  if (motivo === 'sensible') msg = 'Gracias por contarnos. Para orientarte con seguridad, una asesora revisará tu caso y te escribirá personalmente por este chat.';
  else if (motivo === 'sin_cupos') msg = 'Una asesora te escribirá por este chat para buscarte un espacio.';
  else msg = 'Con gusto. Te comunico con una asesora del equipo; te responde por este mismo chat.';
  msg += enHorario() ? ' En breve te escribimos.' : ` Nuestro horario es ${negocio.horario_texto}; te respondemos apenas abramos.`;
  t.decir(texto(msg));
  notificarEquipo(`Atender por WhatsApp: ${t.c.nombre || t.c.nombre_perfil || ''} (+${t.c.wa_id}) · motivo: ${motivo}`);
}

function listarMisCitas(t, intencion = null) {
  const citas = db.citasActivasDe(t.c.wa_id);
  if (!citas.length) {
    t.decir(texto('No encuentro citas próximas agendadas desde este número.'));
    return mostrarMenu(t, '¿Quieres agendar una?');
  }
  if (citas.length === 1) return opcionesCita(t, citas[0], intencion);
  t.decir(lista('Estas son tus próximas citas. ¿Cuál quieres revisar?', 'Ver citas', [{
    titulo: 'Tus citas',
    filas: citas.map(ci => ({ id: `cita:sel:${ci.id}${intencion ? ':' + intencion : ''}`, titulo: servicioPorId(ci.servicio_id)?.nombre_corto || ci.servicio_id, descripcion: mayus(fechaHoraLarga(ci.inicio)) })),
  }]));
}

function opcionesCita(t, cita, intencion) {
  const s = servicioPorId(cita.servicio_id);
  if (intencion === 'reprogramar') return iniciarReprogramacion(t, cita);
  const pregunta = intencion === 'cancelar'
    ? `¿Quieres cancelar tu cita de ${s.nombre} ${delArticulo(fechaHoraLarga(cita.inicio))}? Si prefieres, también podemos moverla a otro horario.`
    : `Tu cita: ${s.nombre}, ${fechaHoraLarga(cita.inicio)}. ¿Qué quieres hacer?`;
  t.decir(botones(pregunta, intencion === 'cancelar'
    ? [{ id: `cita:cancelar_ok:${cita.id}`, titulo: 'Sí, cancelar' }, { id: `cita:reprogramar:${cita.id}`, titulo: 'Cambiar horario' }, { id: 'cita:mantener', titulo: 'Mantener cita' }]
    : [{ id: `cita:confirmar:${cita.id}`, titulo: 'Confirmo asistencia' }, { id: `cita:reprogramar:${cita.id}`, titulo: 'Cambiar horario' }, { id: `cita:cancelar:${cita.id}`, titulo: 'Cancelar cita' }]));
}

function iniciarReprogramacion(t, cita) {
  t.ir(null, { reprogramar: cita.id, servicio: cita.servicio_id });
  iniciarAgenda(t, cita.servicio_id);
}

const citaPropia = (t, id) => { const c = db.obtenerCita(Number(id)); return c && c.wa_id === t.c.wa_id ? c : null; };
/** Citas que se reservaron juntas (reserva web con varios servicios); si no hay grupo, la cita sola. */
const visita = cita => (cita.grupo ? db.citasDelGrupo(cita.grupo).filter(c => c.wa_id === cita.wa_id) : [cita]);

/** La persona escribe desde la página de reservas con su código (VS-XXXXXX): se reconoce la reserva y se le ofrece confirmar, cambiar o cancelar. */
function reservaWeb(t, txt) {
  const codigo = txt.match(CODIGO_RESERVA)[0].toUpperCase();
  const citas = db.citasDelGrupo(codigo);
  if (!citas.length) {
    t.decir(texto('No encuentro esa reserva. Revisa el código que aparece al terminar de reservar (empieza por VS-).'));
    return mostrarMenu(t);
  }
  if (citas[0].wa_id !== t.c.wa_id) {
    t.decir(texto('Ese código corresponde a otro número de WhatsApp. Una asesora te ayuda a revisarlo.'));
    return derivar(t, 'solicitud');
  }
  const vivas = citas.filter(c => ['agendada', 'confirmada'].includes(c.estado));
  if (!vivas.length) { t.decir(texto('Esa reserva ya no está activa. ¿Quieres agendar una nueva?')); return mostrarMenu(t); }
  const nombres = vivas.map(c => servicioPorId(c.servicio_id)?.nombre).join(' + ');
  db.avanzarEtapa(t.c.wa_id, 'Cita agendada', { forzar: true });
  t.limpiar();
  t.decir(botones([
    `Hola${primerNombre(t.c) ? ' ' + primerNombre(t.c) : ''}, recibí tu reserva ${codigo} ✅`, '',
    `• ${nombres}`, `• ${mayus(fechaHoraLarga(vivas[0].inicio))}`, `• ${negocio.direccion}`, '',
    '¿Nos confirmas tu asistencia?',
  ].join('\n'), [
    { id: `cita:confirmar:${vivas[0].id}`, titulo: 'Confirmo asistencia' },
    { id: `cita:reprogramar:${vivas[0].id}`, titulo: 'Cambiar horario' },
    { id: `cita:cancelar:${vivas[0].id}`, titulo: 'Cancelar cita' },
  ]));
}

// ───────── Re-pregunta del paso actual ─────────
function repetirPaso(t) {
  switch (t.estado) {
    case 'elegir_dia': return iniciarAgenda(t);
    case 'elegir_hora': return t.datos.fecha ? mostrarHoras(t, t.datos.fecha) : iniciarAgenda(t);
    case 'pedir_nombre': return t.decir(texto('¿A nombre de quién agendo la cita? Escríbeme nombre y apellido.'));
    case 'confirmar': return t.decir(resumenCita(t.c, t.datos));
    case 'info_servicio': return t.decir(botones('¿Quieres que busquemos un horario?', [{ id: 'act:agendar', titulo: 'Agendar cita' }, { id: 'act:menu', titulo: 'Ver otro servicio' }, BOTON_ASESORA]));
    default: return t.decir(botones('¿En qué te ayudo?', [{ id: 'act:menu', titulo: 'Ver servicios' }, { id: 'act:agendar', titulo: 'Agendar cita' }, BOTON_ASESORA]));
  }
}

// ───────── Respuestas a botones / listas ─────────
async function manejarBoton(t, id) {
  const [tipo, a, b, c] = id.split(':');
  if (tipo === 'svc') return mostrarServicio(t, a);
  if (tipo === 'cat') return mostrarCategoria(t, a, Number(b) || 0);
  if (tipo === 'act') {
    if (a === 'agendar') { delete t.datos.reprogramar; return iniciarAgenda(t, b); }
    if (a === 'menu') return mostrarMenu(t);
    if (a === 'asesora') return derivar(t, 'solicitud');
    if (a === 'mis_citas') return listarMisCitas(t);
  }
  if (tipo === 'day') return mostrarHoras(t, a);
  if (tipo === 'slotp') return mostrarHoras(t, a, { pagina: Number(b) || 0 });
  if (tipo === 'slot') {
    const inicio = id.slice(5);
    if (!t.datos.servicio) return iniciarAgenda(t);
    if (!agenda.horasDisponibles(t.datos.servicio, inicio.slice(0, 10), { excluirCitaId: t.datos.reprogramar || 0 }).includes(inicio.slice(11, 16)))
      return mostrarHoras(t, inicio.slice(0, 10), { aviso: 'Ese horario ya no está disponible. Estos siguen libres:' });
    return elegirHora(t, inicio);
  }
  if (tipo === 'nom' && a === 'perfil') {
    const nombre = nlu.limpiarNombre(t.c.nombre_perfil);
    if (nombre) { db.actualizarContacto(t.c.wa_id, { nombre }); t.c.nombre = nombre; }
    if (!t.datos.inicio) return iniciarAgenda(t);
    t.ir('confirmar'); return t.decir(resumenCita(t.c, t.datos));
  }
  if (tipo === 'conf') {
    if (a === 'si') return confirmarReserva(t);
    if (a === 'cambiar') return iniciarAgenda(t);
  }
  if (tipo === 'cita') {
    if (a === 'mantener') { t.limpiar(); return t.decir(texto('Perfecto, tu cita sigue en pie. Te esperamos.')); }
    if (a === 'nueva') return mostrarMenu(t);
    const cita = citaPropia(t, b);
    if (!cita) return listarMisCitas(t);
    if (a === 'sel') return opcionesCita(t, cita, c || null);
    if (a === 'confirmar') {
      for (const x of visita(cita)) if (['agendada', 'confirmada'].includes(x.estado)) db.actualizarCita(x.id, { estado: 'confirmada' }); // una reserva web puede tener varios servicios seguidos
      t.limpiar();
      return t.decir(texto(`¡Gracias por confirmar! Te esperamos ${conArticulo(fechaHoraLarga(cita.inicio))} en ${negocio.direccion}.`));
    }
    if (a === 'reprogramar') {
      const grupo = visita(cita);
      if (grupo.length > 1) { // varios servicios seguidos: se mueven juntos desde el enlace de la reserva
        t.limpiar();
        return t.decir(botones(`Tu reserva incluye ${grupo.length} servicios seguidos. Para moverla completa elige el nuevo horario aquí: ${enlaceCita(grupo[0].token)}`, [BOTON_ASESORA, { id: 'cita:mantener', titulo: 'Mantener cita' }]));
      }
      return iniciarReprogramacion(t, cita);
    }
    if (a === 'cancelar') return opcionesCita(t, cita, 'cancelar');
    if (a === 'cancelar_ok') {
      for (const x of visita(cita)) if (['agendada', 'confirmada'].includes(x.estado)) db.actualizarCita(x.id, { estado: 'cancelada' });
      t.limpiar();
      if (!db.citasActivasDe(t.c.wa_id).length) db.avanzarEtapa(t.c.wa_id, 'Seguimiento', { forzar: true });
      notificarEquipo(`Cita cancelada por el cliente: ${cita.nombre || t.c.wa_id} · ${servicioPorId(cita.servicio_id)?.nombre} · ${fechaHoraLarga(cita.inicio)}`);
      return t.decir(botones('Tu cita quedó cancelada. Cuando quieras retomar, aquí estamos.', [{ id: `act:agendar:${cita.servicio_id}`, titulo: 'Agendar otra fecha' }, { id: 'act:menu', titulo: 'Ver servicios' }]));
    }
  }
  return repetirPaso(t);
}

/** Si el texto trae una fecha (y quizá una hora), salta directo a esos horarios. Devuelve true si lo resolvió. */
function usarFechaDelTexto(t, txt) {
  const f = nlu.interpretarFecha(txt);
  if (!f) return false;
  const h = nlu.interpretarHora(txt.replace(/\b\d{1,2}[/-]\d{1,2}([/-]\d{2,4})?\b/, '').replace(/\b\d{1,2}\s*(de\s+)?[a-záéíóú]{4,10}\b/i, m => (/de la|del/i.test(m) ? m : '')));
  const conHora = h?.hhmm && /\b(a las|a la|am|pm|a\.? ?m|p\.? ?m|:)/i.test(txt);
  if (conHora) {
    const libres = agenda.horasDisponibles(t.datos.servicio, f, { excluirCitaId: t.datos.reprogramar || 0 });
    if (libres.includes(h.hhmm)) { elegirHora(t, `${f}T${h.hhmm}`); return true; }
    const cercana = libres.slice().sort((x, y) => Math.abs(hhmmAMin(x) - hhmmAMin(h.hhmm)) - Math.abs(hhmmAMin(y) - hhmmAMin(h.hhmm)))[0];
    if (cercana) { mostrarHoras(t, f, { aviso: `A las ${hora12(h.hhmm)} no tengo cupo ese día; lo más cercano es ${hora12(cercana)}.` }); return true; }
  }
  mostrarHoras(t, f, { franja: h?.franja });
  return true;
}

/** "quiero agendar el sábado a las 10": usa servicio, día y hora del mismo mensaje. */
function agendarDesdeTexto(t, sid, txt) {
  delete t.datos.reprogramar;
  const s = sid || t.datos.servicio || t.c.servicio_interes;
  if (s && servicioPorId(s) && nlu.interpretarFecha(txt)) {
    t.ir('elegir_dia', { servicio: s, fecha: null, inicio: null });
    db.actualizarContacto(t.c.wa_id, { servicio_interes: s });
    db.avanzarEtapa(t.c.wa_id, 'Orientado');
    if (usarFechaDelTexto(t, txt)) return;
  }
  return iniciarAgenda(t, s);
}

// ───────── Texto libre ─────────
async function manejarTexto(t, txt, { primerMensaje }) {
  // 1) Pasos que esperan un dato concreto
  if (t.estado === 'pedir_nombre') {
    const nombre = nlu.limpiarNombre(txt);
    if (nombre && !nlu.quiereAgendar(txt) && !nlu.faqQueResponde(txt)) {
      db.actualizarContacto(t.c.wa_id, { nombre }); t.c.nombre = nombre;
      t.ir('confirmar'); return t.decir(resumenCita(t.c, t.datos));
    }
  }
  if (t.estado === 'confirmar') {
    if (nlu.esAfirmacion(txt)) return confirmarReserva(t);
    if (nlu.esNegacion(txt)) return iniciarAgenda(t);
  }
  if (t.estado === 'elegir_hora' && t.datos.fecha) {
    const h = nlu.interpretarHora(txt);
    const otraFecha = nlu.interpretarFecha(txt);
    if (otraFecha && otraFecha !== t.datos.fecha) return mostrarHoras(t, otraFecha, { franja: h?.franja });
    if (h?.hhmm) {
      const libres = agenda.horasDisponibles(t.datos.servicio, t.datos.fecha, { excluirCitaId: t.datos.reprogramar || 0 });
      if (libres.includes(h.hhmm)) return elegirHora(t, `${t.datos.fecha}T${h.hhmm}`);
      const cercana = libres.slice().sort((x, y) => Math.abs(hhmmAMin(x) - hhmmAMin(h.hhmm)) - Math.abs(hhmmAMin(y) - hhmmAMin(h.hhmm)))[0];
      return mostrarHoras(t, t.datos.fecha, { aviso: `A las ${hora12(h.hhmm)} no tengo cupo${cercana ? `; lo más cercano es ${hora12(cercana)}` : ''}.` });
    }
    if (h?.franja) return mostrarHoras(t, t.datos.fecha, { franja: h.franja });
  }
  if (t.estado === 'elegir_dia' && usarFechaDelTexto(t, txt)) return;

  // 2) Intenciones globales
  if (nlu.quiereReprogramar(txt) && db.citasActivasDe(t.c.wa_id).length) return listarMisCitas(t, 'reprogramar');
  if (nlu.quiereCancelar(txt)) return listarMisCitas(t, 'cancelar');
  if (nlu.pideMenu(txt)) return mostrarMenu(t);
  if (/\b(p[aá]gina|sitio web|web|enlace|link|en l[ií]nea|online)\b/i.test(txt) && !nlu.detectarServicio(txt)) {
    t.decir(texto(`Puedes reservar en línea cuando quieras, eligiendo el servicio, el día y la hora: ${enlaceReservas({ servicio: t.datos.servicio || t.c.servicio_interes, fuente: 'bot' })}`));
    return repetirPaso(t);
  }

  const sid = nlu.detectarServicio(txt);
  const faq = nlu.faqQueResponde(txt);
  if (faq) {
    t.decir(texto(llenar(faq.respuesta)));
    if (sid && !t.datos.servicio) return mostrarServicio(t, sid);
    return repetirPaso(t);
  }
  if (nlu.preguntaPrecio(txt)) {
    const s = servicioPorId(sid || t.datos.servicio || t.c.servicio_interes);
    if (s) {
      if (sid && sid !== t.datos.servicio) return mostrarServicio(t, s.id);
      t.decir(texto(s.precio ? `El valor de ${s.nombre} es ${precioTxt(s)}. Incluye: ${s.incluye}` : `El valor vigente de ${s.nombre} te lo confirma el equipo al agendar; depende de lo que se defina contigo. Incluye: ${s.incluye}`));
      if (!s.precio) db.avanzarEtapa(t.c.wa_id, 'Orientado'); else db.avanzarEtapa(t.c.wa_id, 'Precio enviado');
      return repetirPaso(t);
    }
    return mostrarMenu(t, '¿De qué servicio quieres conocer el valor?');
  }
  if (sid) return nlu.quiereAgendar(txt) ? agendarDesdeTexto(t, sid, txt) : mostrarServicio(t, sid);
  if (nlu.quiereAgendar(txt)) return agendarDesdeTexto(t, null, txt);
  if (nlu.gracias(txt) && !t.estado) return t.decir(texto('Con gusto. Si necesitas algo más, escríbeme por aquí.'));
  if (primerMensaje || (nlu.esSaludo(txt) && !t.estado)) { t.decir(texto(bienvenida(t.c))); return mostrarMenu(t); }

  // 3) IA opcional para preguntas abiertas
  if (iaDisponible()) {
    const r = await interpretarConIA(txt, db.ultimosMensajes(t.c.wa_id, 8));
    if (r) {
      if (r.derivar_asesora || r.intencion === 'asesora') { if (r.respuesta) t.decir(texto(r.respuesta)); return derivar(t, 'ia'); }
      if (r.intencion === 'cancelar') return listarMisCitas(t, 'cancelar');
      if (r.intencion === 'reprogramar') return listarMisCitas(t, 'reprogramar');
      if (r.intencion === 'agendar') { if (r.respuesta) t.decir(texto(r.respuesta)); return iniciarAgenda(t, r.servicio_id); }
      if (r.respuesta) t.decir(texto(r.respuesta));
      if (r.servicio_id && !t.estado) return mostrarServicio(t, r.servicio_id);
      return repetirPaso(t);
    }
  }

  // 4) No entendido
  const fallos = (t.c.fallos || 0) + 1;
  db.actualizarContacto(t.c.wa_id, { fallos });
  if (fallos >= 3) return derivar(t, 'no_entendido');
  t.decir(texto('Disculpa, no te entendí bien. Te dejo las opciones para continuar:'));
  return repetirPaso(t);
}

// ───────── Entrada principal ─────────
/**
 * Procesa un mensaje entrante (de WhatsApp o del simulador) y responde.
 * @param {{wa_id, nombre_perfil, wamid, tipo, texto, reply_id, referral}} m
 */
export async function procesarEntrante(m) {
  if (db.mensajeYaProcesado(m.wamid)) return { duplicado: true };
  let c = db.crearOActualizarContacto(m.wa_id, { nombre_perfil: m.nombre_perfil });
  const primerMensaje = !!c._nuevo;
  const idMsg = db.registrarMensaje({ wa_id: m.wa_id, direccion: 'in', tipo: m.tipo, cuerpo: m.texto || `[${m.tipo}]`, wamid: m.wamid, autor: 'cliente', payload: m.reply_id ? { reply_id: m.reply_id } : null });
  if (idMsg === null) return { duplicado: true };

  const cambios = { ultimo_entrante: ahoraMs() };
  if (m.referral) Object.assign(cambios, {
    ad_id: m.referral.source_id || null, ctwa_clid: m.referral.ctwa_clid || null, source_url: m.referral.source_url || null,
    source_type: m.referral.source_type || null, ad_headline: m.referral.headline || null, ad_body: m.referral.body || null,
  });
  const cod = nlu.detectarCodigoAnuncio(m.texto || '');
  if (cod) Object.assign(cambios, { codigo_anuncio: cod.codigo, servicio_interes: cod.servicio });
  db.actualizarContacto(m.wa_id, cambios);
  c = db.obtenerContacto(m.wa_id);
  wa.marcarLeido(m.wamid);

  const txt = (m.texto || '').trim();

  // Baja de mensajes
  if (!m.reply_id && nlu.esBaja(txt)) {
    db.actualizarContacto(c.wa_id, { baja: 1, estado: null, estado_datos: {} });
    db.avanzarEtapa(c.wa_id, 'Baja', { forzar: true });
    await wa.enviar(c.wa_id, texto('Entendido. No te enviaremos más mensajes de seguimiento. Si en algún momento quieres retomar, escríbenos por aquí.'));
    return { baja: true };
  }

  // Conversación atendida por una persona del equipo
  if (c.bot_pausado) {
    const ultimoEquipo = db.getDb().prepare("SELECT MAX(ts) AS ts FROM mensajes WHERE wa_id = ? AND autor = 'equipo'").get(c.wa_id)?.ts || 0;
    if (ahoraMs() - Math.max(Number(c.bot_pausado), ultimoEquipo) < PAUSA_AUTO_MS) return { pausado: true };
    db.actualizarContacto(c.wa_id, { bot_pausado: 0 }); c.bot_pausado = 0;
  }

  const t = new Turno(c);
  if (c.baja && txt) db.actualizarContacto(c.wa_id, { baja: 0 }); // volvió a escribir por iniciativa propia

  if (m.reply_id) {
    db.actualizarContacto(c.wa_id, { fallos: 0 });
    await manejarBoton(t, m.reply_id);
  } else if (!txt) {
    t.decir(texto('Recibí tu archivo. Por ahora te atiendo mejor por texto. 😊'));
    repetirPaso(t);
  } else if (CODIGO_RESERVA.test(txt)) {
    reservaWeb(t, txt);
  } else if (nlu.esSensible(txt)) {
    derivar(t, 'sensible');
  } else if (nlu.pideAsesora(txt) && !nlu.quiereAgendar(txt)) {
    derivar(t, 'solicitud');
  } else if (primerMensaje && (cod || nlu.detectarServicio(txt))) {
    // Llega desde un anuncio (o menciona un servicio): bienvenida + ficha del servicio, sin pasos extra
    t.decir(texto(bienvenida(c)));
    const sid = cod?.servicio || nlu.detectarServicio(txt);
    if (nlu.quiereAgendar(txt)) agendarDesdeTexto(t, sid, txt); else mostrarServicio(t, sid);
  } else {
    await manejarTexto(t, txt, { primerMensaje });
  }

  db.actualizarContacto(c.wa_id, { estado: t.estado, estado_datos: t.datos });
  for (const msg of t.salida) await wa.enviar(c.wa_id, msg);
  return { respuestas: t.salida.length };
}

// ───────── Aviso al equipo ─────────
export async function notificarEquipo(textoAviso) {
  console.log('[equipo]', textoAviso);
  const plantilla = negocio.plantillas?.aviso_equipo;
  if (!env.STAFF_WA_NUMBERS.length || !plantilla) return;
  const limpio = textoAviso.replace(/[\n\t]+/g, ' ').replace(/ {4,}/g, ' ').slice(0, 900);
  for (const n of env.STAFF_WA_NUMBERS) await wa.enviar(n, { tipo: 'plantilla', nombre: plantilla, params: [limpio] }, { autor: 'sistema' });
}

// ───────── Acciones del panel ─────────
export async function enviarManual(wa_id, cuerpo) {
  const c = db.obtenerContacto(wa_id);
  if (!c) throw new Error('Contacto no existe');
  if (!dentroVentana(c)) throw new Error('Pasaron más de 24 h desde el último mensaje del cliente: WhatsApp solo permite plantillas aprobadas.');
  db.actualizarContacto(wa_id, { bot_pausado: c.bot_pausado || ahoraMs() }); // al escribir el equipo, el bot se pausa
  return wa.enviar(wa_id, texto(cuerpo), { autor: 'equipo' });
}

export function reactivarBot(wa_id) {
  db.actualizarContacto(wa_id, { bot_pausado: 0, fallos: 0, estado: null, estado_datos: {} });
  const c = db.obtenerContacto(wa_id);
  if (c?.etapa === 'Requiere asesora') db.avanzarEtapa(wa_id, db.citasActivasDe(wa_id).length ? 'Cita agendada' : 'Orientado', { forzar: true });
}

export async function marcarAsistio(citaId, valor) {
  const cita = db.actualizarCita(citaId, { estado: 'asistio', valor_cobrado: valor != null && valor !== '' ? Math.round(Number(valor)) : null });
  db.avanzarEtapa(cita.wa_id, 'Asistió', { forzar: true });
  capi.eventoAsistio(cita).catch(() => {});
  const c = db.obtenerContacto(cita.wa_id);
  if (negocio.seguimiento?.gracias_post_visita && c && !c.baja) {
    const msg = 'Gracias por visitarnos hoy. ¿Cómo fue tu experiencia? Si quieres, puedes contarnos tu opinión por aquí; nos ayuda a mejorar.';
    if (dentroVentana(c)) await wa.enviar(cita.wa_id, texto(msg));
    else if (negocio.plantillas?.gracias_visita) await wa.enviar(cita.wa_id, { tipo: 'plantilla', nombre: negocio.plantillas.gracias_visita, params: [primerNombre(c) || 'hola'] });
    db.actualizarCita(cita.id, { gracias: 1 });
  }
  return db.obtenerCita(citaId);
}

export function marcarNoAsistio(citaId) {
  const cita = db.actualizarCita(citaId, { estado: 'no_asistio' });
  db.avanzarEtapa(cita.wa_id, 'No asistió', { forzar: true });
  return cita;
}

export async function cancelarDesdePanel(citaId, avisar = true) {
  const cita = db.actualizarCita(citaId, { estado: 'cancelada' });
  const c = db.obtenerContacto(cita.wa_id);
  if (!db.citasActivasDe(cita.wa_id).length) db.avanzarEtapa(cita.wa_id, 'Seguimiento', { forzar: true });
  if (avisar && c && dentroVentana(c)) {
    await wa.enviar(cita.wa_id, botones(`Tu cita de ${servicioPorId(cita.servicio_id)?.nombre} ${delArticulo(fechaHoraLarga(cita.inicio))} fue cancelada. Si quieres, buscamos otro horario.`,
      [{ id: `act:agendar:${cita.servicio_id}`, titulo: 'Buscar otro horario' }, BOTON_ASESORA]), { autor: 'equipo' });
  }
  return cita;
}

export function crearCitaDesdePanel({ wa_id, nombre, servicioId, inicio, notas }) {
  const id = String(wa_id).replace(/\D/g, '');
  db.crearOActualizarContacto(id, {});
  if (nombre) db.actualizarContacto(id, { nombre });
  const c = db.obtenerContacto(id);
  const cita = agenda.reservar({ wa_id: id, servicioId, inicio, nombre: nombre || c.nombre || c.nombre_perfil, contacto: c, origen: 'panel', notas });
  db.avanzarEtapa(id, 'Cita agendada', { forzar: true });
  return cita;
}

export { aMs };
