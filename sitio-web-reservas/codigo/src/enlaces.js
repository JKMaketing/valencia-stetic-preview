// Enlaces entre la página de reservas, WhatsApp y el bot (un solo lugar para que todos usen las mismas URLs).
import { env, negocio } from './config.js';

export const baseUrl = () => (env.PUBLIC_URL || `http://localhost:${env.PORT}`).replace(/\/+$/, '');

/** Enlace a la página de reservas; `servicio` abre el flujo con ese servicio ya elegido y `cod` identifica el anuncio (HAZ ESPACIO, PAUSA…). */
export function enlaceReservas({ servicio, cod, fuente } = {}) {
  const u = new URL(`${baseUrl()}/reservas/reservar`);
  if (servicio) u.searchParams.set('servicio', servicio);
  if (cod) u.searchParams.set('cod', cod);
  if (fuente) u.searchParams.set('src', fuente);
  return u.toString();
}

/** Enlace privado para ver, cambiar o cancelar una reserva (el token es la llave: no se comparte). */
export const enlaceCita = token => `${baseUrl()}/reservas/cita/${token}`;

/** Número público de WhatsApp (solo dígitos con indicativo). Sale de WA_PUBLIC_NUMBER o de config/negocio.json → web.whatsapp. */
export const numeroPublico = () => String(env.WA_PUBLIC_NUMBER || negocio.web?.whatsapp || '').replace(/\D/g, '') || null;

/** Enlace wa.me con el mensaje prellenado (null si todavía no hay número confirmado). */
export function enlaceWhatsApp(textoPrellenado) {
  const n = numeroPublico();
  return n ? `https://wa.me/${n}?text=${encodeURIComponent(textoPrellenado)}` : null;
}

/** Código de reserva web: lo escribe la persona en WhatsApp ("Reservé en la web, código VS-7K3QMD") y el bot lo reconoce. */
export const CODIGO_RESERVA = /\bVS-[A-HJ-NP-Z2-9]{6}\b/i;
