// Comprensión básica de texto libre por reglas (servicios, fechas, horas, intenciones).
import { negocio, servicios, categoriasInfo } from './config.js';
import { hoyLocal, sumarDias, diaSemana, NOMBRES_MESES } from './tiempo.js';

export const normalizar = s => String(s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/\s+/g, ' ').trim();
const contiene = (texto, claves) => { const t = ` ${normalizar(texto)} `; return claves.some(k => t.includes(normalizar(k))); };
const palabra = (texto, re) => re.test(normalizar(texto));

/** Código de anuncio de la estrategia (HAZ ESPACIO, PAUSA, RITUAL, LASER) presente en el mensaje. */
export function detectarCodigoAnuncio(texto) {
  const t = normalizar(texto);
  for (const s of servicios) for (const c of s.codigos_anuncio || []) {
    if (new RegExp(`\\b${normalizar(c)}\\b`).test(t)) return { codigo: c.toUpperCase(), servicio: s.id };
  }
  return null;
}

export function detectarServicio(texto) {
  const cod = detectarCodigoAnuncio(texto);
  if (cod) return cod.servicio;
  let mejor = null, largo = 0;
  const t = ` ${normalizar(texto)} `;
  for (const s of servicios) for (const k of [s.nombre, ...(s.claves || [])]) {
    const nk = normalizar(k);
    if (t.includes(nk) && nk.length > largo) { mejor = s.id; largo = nk.length; }
  }
  return mejor;
}

// Palabras completas: «stop» no debe disparar la baja dentro de «postoperatorio».
const escapar = s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
export const esBaja = t => { const n = normalizar(t); return (negocio.palabras_baja || []).some(k => new RegExp(`(^|[^a-z0-9])${escapar(normalizar(k))}([^a-z0-9]|$)`).test(n)); };
export const pideAsesora = t => contiene(t, negocio.palabras_asesora || []);
export const esSensible = t => contiene(t, negocio.palabras_sensibles || []);
export const esSaludo = t => palabra(t, /^(hola|holi|buen[oa]s|buen dia|buenas tardes|buenas noches|hey|que tal)\b/);
export const esAfirmacion = t => palabra(t, /^(si|sii+|sip|claro|dale|listo|ok|okay|de una|perfecto|confirmo|confirmar|correcto|vale|bueno)\b/);
export const esNegacion = t => palabra(t, /^(no|nop|nel|todavia no|aun no|despues|luego)\b/);
export const quiereAgendar = t => palabra(t, /\b(agendar|agenda|agendo|cita|reservar|reserva|apartar|separar|turno|disponibilidad|cupo|cupos|horario disponible|cuando hay)\b/);
export const quiereCancelar = t => palabra(t, /\b(cancelar|cancela|cancelo|anular|no puedo ir|no voy a poder)\b/);
export const quiereReprogramar = t => palabra(t, /\b(reprogramar|cambiar (la |mi )?(cita|hora|fecha)|mover (la |mi )?cita|otro dia|otra hora|aplazar|correr la cita)\b/);
export const preguntaPrecio = t => palabra(t, /\b(precio|precios|valor|cuanto (vale|cuesta|es|sale|cobran)|costo|tarifa|promo|promocion|descuento)\b/);
export const pideMenu = t => palabra(t, /^(menu|inicio|empezar|volver|opciones|servicios)$|\b(ver|conocer|cuales son|que) (los |sus |todos los )?(servicios|tratamientos)\b/);
export const gracias = t => palabra(t, /^(gracias|muchas gracias|mil gracias|ok gracias|listo gracias)\b/);

export function faqQueResponde(texto) {
  for (const f of negocio.faq || []) if (contiene(texto, f.claves)) return f;
  return null;
}

/** Interpreta una fecha escrita ("mañana", "el sábado", "15/11", "15 de noviembre"). Devuelve YYYY-MM-DD o null. */
export function interpretarFecha(texto) {
  const t = normalizar(texto);
  const hoy = hoyLocal();
  if (/\bpasado manana\b/.test(t)) return sumarDias(hoy, 2);
  if (/\bmanana\b/.test(t) && !/\b(en|por|de) la manana\b/.test(t)) return sumarDias(hoy, 1);
  if (/\bhoy\b/.test(t)) return hoy;
  const dias = ['domingo', 'lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado'];
  for (let i = 0; i < 7; i++) {
    if (new RegExp(`\\b${dias[i]}\\b`).test(t)) {
      let delta = (i - diaSemana(hoy) + 7) % 7;
      if (delta === 0) delta = /\b(proximo|siguiente|que viene)\b/.test(t) ? 7 : 0;
      return sumarDias(hoy, delta);
    }
  }
  let m = t.match(/\b(\d{1,2})[/-](\d{1,2})(?:[/-](\d{2,4}))?\b/);
  let d, mes;
  if (m) { d = +m[1]; mes = +m[2]; }
  else {
    const meses = NOMBRES_MESES.map(normalizar);
    m = t.match(new RegExp(`\\b(\\d{1,2})\\s*(?:de\\s+)?(${meses.join('|')})`));
    if (m) { d = +m[1]; mes = meses.indexOf(m[2]) + 1; }
  }
  if (d && mes >= 1 && mes <= 12 && d >= 1 && d <= 31) {
    let y = +hoy.slice(0, 4);
    let f = `${y}-${String(mes).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    if (f < hoy) f = `${y + 1}${f.slice(4)}`;
    return f;
  }
  return null;
}

/** Interpreta una hora ("10", "10:30", "3 pm", "3 de la tarde"). Devuelve {hhmm} o {franja:'manana'|'tarde'} o null. */
export function interpretarHora(texto) {
  const t = normalizar(texto).replace(/\./g, '');
  const m = t.match(/\b(\d{1,2})(?:[:h](\d{2}))?\s*(am|pm|a m|p m|de la manana|de la tarde|de la noche|del mediodia)?\b/);
  if (m && !/\b\d{1,2}[/-]\d{1,2}\b/.test(t)) {
    let h = +m[1]; const min = m[2] ? +m[2] : 0; const suf = m[3] || '';
    if (h <= 23 && min < 60) {
      if (/pm|p m|tarde|noche/.test(suf) && h < 12) h += 12;
      else if (!suf && h >= 1 && h <= 6) h += 12; // "a las 3" en un centro estético = 3 p. m.
      return { hhmm: `${String(h).padStart(2, '0')}:${String(min).padStart(2, '0')}` };
    }
  }
  if (/\b(en|por|de) la manana\b|\btemprano\b/.test(t)) return { franja: 'manana' };
  if (/\b(en|por|de) la tarde\b|\bmediodia\b|\bdespues de almuerzo\b/.test(t)) return { franja: 'tarde' };
  return null;
}

/** Nombre propio razonable a partir de lo que escribió la persona. */
export function limpiarNombre(texto) {
  let t = String(texto || '').trim()
    .replace(/^(me llamo|mi nombre es|soy|es|a nombre de|nombre:?)\s+/i, '')
    .replace(/[^\p{L}\s'-]/gu, ' ').replace(/\s+/g, ' ').trim();
  if (!t || t.length < 2 || t.split(' ').length > 5) return null;
  return t.split(' ').map(p => p.charAt(0).toUpperCase() + p.slice(1).toLowerCase()).join(' ');
}

// ───────── Contexto del catálogo: varios servicios, categorías y preguntas de detalle ─────────
const limpio = t => ` ${normalizar(t).replace(/[^a-z0-9]+/g, ' ').trim()} `;

/** Todos los servicios que menciona el texto (para cotizar combos). Las coincidencias más largas ganan y se "consumen". */
export function detectarServicios(texto) {
  let t = limpio(texto);
  const claves = [];
  for (const s of servicios) for (const k of [s.nombre, ...(s.claves || [])]) { const nk = limpio(k).trim(); if (nk.length >= 4) claves.push({ id: s.id, k: nk }); }
  claves.sort((a, b) => b.k.length - a.k.length);
  const hallados = [];
  for (const { id, k } of claves) {
    const i = t.indexOf(` ${k} `);
    if (i >= 0) { if (!hallados.includes(id)) hallados.push(id); t = t.slice(0, i) + ' '.repeat(k.length + 1) + t.slice(i + k.length + 1); }
  }
  return hallados;
}

/** Categoría a la que se refiere el texto cuando no nombra un servicio concreto (ej. "quiero un masaje", "depilación láser"). */
export function categoriaDeTexto(texto) {
  const t = limpio(texto); let mejor = null, largo = 0;
  const hoy = hoyLocal(), vivas = new Set(servicios.filter(s => !s.vigente_hasta || hoy <= s.vigente_hasta).map(s => s.categoria));
  for (const c of categoriasInfo.filter(c => vivas.has(c.nombre))) for (const k of [c.nombre, ...(c.claves || [])]) {
    const nk = limpio(k).trim();
    if (nk.length >= 3 && t.includes(` ${nk} `) && nk.length > largo) { mejor = c.nombre; largo = nk.length; }
  }
  return mejor;
}

/** Qué quiere saber la persona de un servicio: contraindicaciones, cuidados, sesiones, resultados, dolor, duración, incluye, pago o retoque. */
export function preguntaDetalle(texto) {
  const t = normalizar(texto);
  if (/\b(contraindicaci|quien no puede|quienes no pueden|no se recomienda|efectos? secundarios?|riesgos?|es seguro|tiene peligro|puedo hacerme|puedo hacerlo|me lo puedo hacer|restricci)/.test(t)) return 'contraindicaciones';
  if (/\b(retoque|retocar)/.test(t)) return 'retoque';
  if (/\b(abono|pagar|cuotas|financi|fiado|forma de pago|formas de pago|pago por sesion)/.test(t)) return 'pago';
  if (/\b(cuantas sesiones|numero de sesiones|cada cuanto|frecuencia|cuantas veces|cuanto tiempo dura el tratamiento|protocolo)/.test(t)) return 'sesiones';
  if (/\b(resultados?|cuando (se )?(ve|veo|ven|notan|notare)|cuanto (dura|duran) (el )?(efecto|resultado)|efecto dura|permanente|definitiv)/.test(t)) return 'resultados';
  if (/\b(duele|dolor|doloroso|molest|anestesia|aguanta)/.test(t)) return 'dolor';
  if (/\b(cuidados|recomendacion|recomendaciones|que debo hacer|antes de (la|mi) (cita|sesion)|despues de|post ?tratamiento|instrucciones|indicaciones|prepararme|como me preparo)/.test(t)) return 'cuidados';
  if (/\b(cuanto (dura|demora|tarda|se demora)|duracion|cuanto tiempo|que tanto dura)/.test(t)) return 'duracion';
  if (/\b(que incluye|que trae|que hacen|en que consiste|procedimiento|como es|que se hace)/.test(t)) return 'incluye';
  return null;
}
