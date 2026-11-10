# Integración del sitio con el proyecto de la agenda

El sitio **no es un servidor aparte**: lo sirve `..\sistema-agendamiento` y comparte con el bot la agenda, la base SQLite, el panel y el envío de WhatsApp. Estos son todos los puntos donde se enganchó (cambios hechos el 6 nov 2026). Los 8 archivos de `codigo/` son **propios del sitio**; el resto son **puntos de integración** dentro de archivos del bot.

## Archivos propios del sitio (se editan en `codigo/` y se publican)
| Archivo | Qué hace |
| --- | --- |
| `public/reservas/index.html`, `app.js`, `estilos.css`, `logo.png`, `favicon.png` | Interfaz (SPA sin dependencias): perfil, reserva, éxito, gestión, «Mis citas», privacidad. |
| `src/reservas.js` | API pública `/api/publico/*`: configuración, disponibilidad, crear/ver/cambiar/cancelar reserva, límites por IP, confirmación por WhatsApp. |
| `src/enlaces.js` | URLs de la página, enlace privado, número público de WhatsApp, `CODIGO_RESERVA` (`VS-XXXXXX`). |
| `test/reservas.test.js` | 15 pruebas (API, reglas, compatibilidad con el bot, migración de base). |

## Puntos de integración en el proyecto de la agenda
| Archivo | Cambio |
| --- | --- |
| `src/db.js` | `migrar()` (aditiva e idempotente): columnas `citas.token`, `citas.grupo`, `contactos.email`. `citaPorToken`, `citasDelGrupo`, `citasWebPorGrupo`; `insertarCita` guarda `token` y `grupo`; `email` permitido en `CAMPOS_CONTACTO`. |
| `src/agenda.js` | `horasDisponiblesSecuencia`, `diasDisponiblesSecuencia`, `duracionVisita` (varios servicios consecutivos), `reservasActivas`, `reservarSecuencia`, `reprogramarVisita`. `cupoLibre` acepta un conjunto de citas a excluir. **Corrección:** se rechazan fechas fuera de `dias_adelante` (también para el bot). |
| `src/bot.js` | `visita()` y `reservaWeb()`; rama del código `VS-XXXXXX` en `procesarEntrante`; confirmar/cancelar actúan sobre toda la reserva; reprogramar una reserva multi-servicio envía el enlace; la ficha del servicio incluye el enlace a la web (si hay `PUBLIC_URL`); el bot responde con el enlace si piden «página/enlace». |
| `src/server.js` | Importa `reservas.js`; `/` → `/reservas`; `paginaReservas()` (lista cerrada de archivos, cabeceras CSP); rutas `/api/publico/*` sin sesión; `idSim()` para que el simulador use el mismo número de la reserva (`real`). |
| `src/config.js` | Variables `WA_PUBLIC_NUMBER` y `TRUST_PROXY`. |
| `config/negocio.json` | Sección `web` (whatsapp, instagram, frase, descripción, comodidades, galería, mapa, privacidad), `agenda.cambios_hasta_horas`, `plantillas.cita_web`, y 6 pendientes nuevos para el panel. |
| `public/panel.html` | Etiqueta «Reserva web» en cada cita. |
| `public/simulador.html` | Parámetros `?tel=…&texto=…` (prueba «Confirmar por WhatsApp»). |
| `plantillas/PLANTILLAS_WHATSAPP.md` | Plantilla 5: `cita_web_vs`. |
| `.env.example` | `WA_PUBLIC_NUMBER`, `TRUST_PROXY`. |
| `README.md` | Sección «Página de reservas web (`/reservas`)». |
| `test/*.js` | Las 15 pruebas del bot siguen intactas y pasando. |

## Cambios del 6 nov 2026 (datos de Google, teléfono y opiniones)
- `config/negocio.json`: `direccion` = «Calle 8 #12-59, Pereira»; `horario` y `horario_texto` = lunes–viernes 08:00–18:00, sábado 08:00–15:00; `web.telefono` (+573145301120), `web.coordenadas`, `web.mapa_url` (Cómo llegar), `web.opiniones` (3 reseñas de 5 estrellas de los últimos 365 días: Bryan, Camila Ospina, Lizeth Rozo); pendientes de dirección, horario y número público de WhatsApp reemplazados por «línea de WhatsApp para el bot». `web.whatsapp` sigue en `null`.
- `src/bot.js` (chat de la agenda): `bienvenida()` ahora dice «Estamos en ${negocio.direccion}.» (antes anteponía la ciudad y quitaba «Pereira» con una regex; con la dirección nueva habría salido «Pereira» dos veces).
- `test/flujo.test.js` (chat de la agenda): la prueba de «dónde quedan» espera «Calle 8 #12-59» en vez de «Corocito». `demo/demo-cliente.html`: dirección actualizada. Las pruebas con horas fijas siguen pasando con el horario nuevo (30 de 30).
- `src/reservas.js` / `test/reservas.test.js` (del sitio): `telefono`, `coordenadas` y `opiniones` en `/api/publico/config`; el test de configuración verifica dirección, teléfono, sin WhatsApp y opiniones.

## Cambios del 6 nov 2026 (catálogo de 6 servicios del sitio de Google)
- `config/servicios.json` (chat de la agenda): ahora 6 servicios activos — `facial` («Limpieza facial», antes «Cuidado facial»), `lifting` (nuevo, cabina 60), `laser` (igual), `cejas` (nuevo, cabina 45), `postop` (Masaje postoperatorio, nuevo, cabina 60) y `masaje`. `spa_capilar` quedó con `activo: false` (oculto en bot y web, no borrado). Duraciones propuestas, precios `null`. Campos nuevos opcionales: `revisar_condiciones` y `solo`.
- `postop`: decisión más segura — `revisar_condiciones: true` (la cita nace con `requiere_revision`, una asesora la revisa) y `solo: true` (no se combina con otros servicios, como el láser). No es «cita de orientación».
- `src/agenda.js`: `requiere_revision` también cuando el servicio trae `revisar_condiciones` (2 sitios). `src/bot.js`: la ficha y la confirmación mencionan la revisión de una asesora para esos servicios.
- `test/servidor.test.js` y `test/flujo.test.js`: nombres y conteos nuevos (6 servicios, «Limpieza facial», «Lifting de pestañas»); el webhook de prueba usa el código LASER porque RITUAL (spa capilar) está inactivo. Las citas antiguas de `spa_capilar` en una base existente se conservan pero ya no se pueden agendar.
- Sitio (`codigo/`): `solo`, `revisar_condiciones`, `confianza` y `facebook` en `/api/publico/config`; chip «Revisar condiciones», aviso del postoperatorio, Facebook en pie y contacto, y «Más de 5 años de experiencia» bajo el eslogan.
- `config/negocio.json`: `web.frase` = «Centro Estético en Pereira», `web.confianza`, `web.facebook` y 5 pendientes nuevos (validar «5 años», duraciones, spa capilar, requisitos del postoperatorio, inconsistencias del sitio de Google).

## Cambios del 6 nov 2026 (asistente integrado y demostración)
- Archivos nuevos propios del sitio: `src/demo.js` (API del asistente y de la demo), `public/reservas/asistente.js` (chat flotante, escenarios y «Vista del equipo») y `demo.mjs` (arranca la demo; no se publica a la agenda).
- `src/server.js` (chat de la agenda): `asistente.js` en la lista cerrada de archivos de `/reservas` y la ruta `/reservas/demo` entre las páginas permitidas.
- `src/nlu.js` (chat de la agenda): `esBaja` ahora compara palabras completas. Antes «stop» dentro de «postoperatorio» daba de baja al contacto («No te enviaremos más mensajes»).
- Variables: `ASISTENTE_WEB=1` muestra el asistente en la web (el mismo bot, ids `sim9<sid>`, nunca envía a WhatsApp real); `MODO_DEMO=1` añade `/reservas/demo`, la vista del equipo y las acciones de conversión. Sin ninguna de las dos, esas rutas dan 404.
- `test/reservas.test.js`: 1 prueba nueva (asistente + demo + conversión + regresión de «postoperatorio»): ahora son 31.

## Cambios del 10 nov 2026 (catálogo completo con precios)
- `config/servicios.json` (chat de la agenda): ahora 49 servicios en 8 categorías (`categorias` fija el orden) con los precios de la lista enviada por el centro, un texto breve por servicio (descripción de máx. 2 líneas, pensado para SEO) y `precio_nota` cuando el valor es variable o es un paquete (`paquete`). Duración de todos: 30 min por ahora. Los ids existentes se conservan: `facial`=Limpieza facial básica, `masaje`=Masaje relajante premium, `lifting`, `cejas`=Sombreado + depilación, `laser`=Láser diodo: axilas, `postop`=Masaje postoperatorio x10, `spa_capilar`=Spa coreano (reactivado).
- `src/config.js` (chat de la agenda): exporta `categoriasOrden`.
- `src/bot.js` (chat de la agenda): el menú va por categorías (`cat:<slug>:<página>`; WhatsApp admite máx. 10 filas por lista, y el láser se pagina de 8 en 8); `precioTxt` muestra la nota del precio (paquetes y valores variables).
- `test/flujo.test.js` y `test/servidor.test.js` (chat de la agenda): ahora con precios, la etapa tras la ficha es «Precio enviado»; la prueba de precio por confirmar usa la mesoterapia; 49 servicios; nombres nuevos.
- Sitio (`codigo/`): categorías plegables con «Ver info +» (texto SEO), valor visible en cada servicio y total en la reserva (suma lo que tiene precio y dice cuántos quedan por confirmar), pestañas por categoría al agendar, hasta 6 servicios por visita (láser y postoperatorio solo con los de su categoría) y `hasOfferCatalog` en el JSON-LD.

## Reglas para no pisarse
- Cambios en `codigo/` → los hace el chat del **sitio** y los publica con `npm run publicar`.
- Cambios en los puntos de integración → quien los haga debe correr `npm test` en la agenda (30 pruebas) y anotar aquí qué tocó.
- Las migraciones de base de datos son **aditivas**: no borrar ni renombrar columnas (la base de producción ya tendrá datos).
- No cambiar los nombres de eventos de estado de las citas (`agendada`, `confirmada`, `cancelada`, `asistio`, `no_asistio`): los usan el panel, los recordatorios y CAPI.
