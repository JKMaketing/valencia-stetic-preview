# Sitio web de reservas · Valencia Stetic

Página pública para que las clientas de **Valencia Stetic** (centro de cuidado facial y corporal, Pereira) elijan servicio, día y hora y reserven solas. Es un **clon adaptado** de `reservas.labarberiadelacircunvalar.com` con la marca de Valencia Stetic, y está **conectada al bot de agendamiento por WhatsApp** (misma agenda, misma base de datos, mismo panel).

> Esta carpeta es el espacio de trabajo del **chat del sitio web**. El bot y su servidor viven en `..\sistema-agendamiento` (chat «AGENDA | VALENCIA STETIC»). Lo que nace aquí se ejecuta allá: ver «Cómo se trabaja».

## Cómo verlo funcionando
```bash
npm run servidor        # arranca el servidor del bot (puerto 3200), que sirve el sitio
```
- Sitio: http://localhost:3200/reservas
- Flujo directo: http://localhost:3200/reservas/reservar?servicio=facial
- Panel del equipo (ve las reservas): http://localhost:3200/panel
- Simulador de WhatsApp: http://localhost:3200/simulador

(En Claude Desktop también existe el lanzador `agenda-valencia-stetic`.)

## Preview en línea para compartir (demo)
```bash
npm run demo:iniciar    # en segundo plano, con enlace público temporal (https://….trycloudflare.com); imprime el enlace
npm run demo:estado     # ¿está corriendo y responde?  ·  npm run demo:enlace  # solo el enlace
npm run demo:parar      # lo detiene (el enlace deja de existir)
npm run demo:local      # en segundo plano, solo en este equipo (http://localhost:3300/reservas/demo)
npm run demo            # en primer plano (Ctrl+C para cerrar)   ·   npm run demo:publico  # primer plano + enlace público
```
- **Fiabilidad:** el lanzador vigila el servidor y el túnel: si se caen, los levanta solos (si cae el túnel, el enlace cambia y queda en `demo-enlace.txt`). No sobrevive a apagar el equipo; para un enlace fijo hace falta hosting con HTTPS.
- **Más ligero:** el «Modo rápido» recorta las pausas de los recorridos; hay botón «Detener», contador de pasos y un aviso fijo de «versión de demostración». Las conversaciones de prueba con más de 24 h se borran solas.
- **8 escenarios**, incluido el **recordatorio automático** (el sistema escribe el día anterior y la clienta confirma con un toque) y, en la conversión, el mensaje de gracias posterior a la visita.
- Muestra la **web**, el **asistente integrado** (botón «Asistente»: el mismo bot de WhatsApp, sin número) y **8 escenarios** con un clic: anuncio → cita, texto libre, láser (orientación), masaje postoperatorio (revisión), asesora, cancelar y **conversión** (el equipo marca «Asistió y pagó» y queda el evento de compra con su valor). La **Vista del equipo** (📋) enseña embudo, citas y eventos de la visita.
- Es seguro compartirlo: usa una base de prueba nueva en cada arranque (`demo-datos/`), no envía nada a WhatsApp, el simulador va apagado, el panel queda con clave aleatoria y cada visita solo ve sus propios datos. El enlace público vive mientras la ventana siga abierta.
- Para dejar el asistente en la web real (sin demo): `ASISTENTE_WEB=1` en el `.env` de la agenda.

## Servicios por visita, duración y fotos
- **Catálogo (10 nov 2026):** 49 servicios en 8 categorías (limpiezas faciales, relajantes, corporales, cejas y pestañas, depilación láser diodo por zona, cauterización, remoción de tatuajes y sueroterapia) con los **precios de la lista del centro**. Cada uno tiene un texto breve (máx. 2 líneas, con «Pereira» y la palabra clave) que sale al tocar **«Ver info +»** y también alimenta el SEO (JSON-LD `hasOfferCatalog`). Mesoterapia, cauterización, tatuajes y sueroterapia no tienen valor fijo: se muestra la nota («según la ampolla», etc.). Los paquetes se agendan por la primera sesión.
- Al agendar se ve **el valor de cada servicio y el total** (si hay valores por confirmar, dice cuántos quedan). Las descripciones y la lista de precios quedan por validar con el centro.
- Se pueden agregar **2 o más servicios** (hasta 6) en una misma reserva, de una o varias categorías; se hacen uno tras otro. El láser (varias zonas juntas) y el masaje postoperatorio solo se combinan con servicios de su misma categoría.
- **Por ahora cada servicio ocupa 30 min de agenda** (`duracion_min: 30` en `config/servicios.json`, más 10 min de pausa entre citas). Pendiente: duraciones reales.
- **«Más de 10 años de experiencia»** va bajo el nombre del centro (`web.confianza`; pendiente de validar, el sitio de Google dice 5).
- **Fotos:** solo la **limpieza facial** tiene foto (`fotos/facial.jpg`, recorte de un diseño de Drive sin precio ni número; parece de banco de imágenes). Se probó una galería «Así trabajamos» con capturas del Instagram del centro y se **deshizo** (no gustó). Las piezas de Drive de masaje y láser no se usan (fotogramas de clientas, precios y un número sin confirmar).
- **Cómo agregar fotos:** el sitio ya las soporta. Para agregarlas: copiar el archivo a `codigo/public/reservas/fotos/` (jpg, png o webp), poner `"foto": "fotos/facial.jpg"` en el servicio (`servicios.json`) o `{"src": "fotos/x.jpg", "alt": "…"}` en `web.galeria` (`negocio.json`) y correr `npm run publicar`. Solo fotos con permiso de uso del centro.

## Qué hay en esta carpeta
| Carpeta / archivo | Contenido |
| --- | --- |
| `codigo/` | **Fuente de verdad del sitio**: `public/reservas/` (HTML, `app.js`, `estilos.css`, logo, favicon), `src/reservas.js` (API pública y reglas), `src/enlaces.js` (URLs y códigos de reserva) y `test/reservas.test.js` (15 pruebas). |
| `INTEGRACION.md` | Los puntos exactos donde el sitio se engancha al proyecto de la agenda (base de datos, motor de agenda, bot, servidor, panel…). |
| `sincronizar.mjs` | Copia `codigo/` ⇄ `..\sistema-agendamiento` y avisa si algo está más nuevo en un lado. |
| `referencia-barberia/` | Captura de la web de referencia: HTML, CSS, JS, tokens de diseño (`SUMMARY.md`), capturas de pantalla y los 4 pasos del flujo (`flujo/`). **Material de terceros: solo para consulta, no publicar.** |
| `capturas/` | Capturas del sitio terminado (escritorio y celular, validaciones, gestión, chat del bot). |
| `pruebas-navegador/` | Scripts de Playwright que recorren la web de referencia y el sitio nuevo (necesitan `playwright-core` de `~/.claude/skills/deconstruct`). |

## Cómo se trabaja (dos chats, dos carpetas)
1. **Se edita aquí**, en `codigo/`.
2. `npm run publicar` copia los archivos a `..\sistema-agendamiento`, y `npm run publicar:probar` además corre las 30 pruebas del bot + sitio.
3. `npm run estado` compara ambos lados. Si el chat de la agenda tocó algo directamente, `npm run traer` lo trae de vuelta (no pisa nada más nuevo sin `--forzar`).
4. El chat de la **agenda** no debería editar los 8 archivos de `codigo/`; el chat del **sitio** puede tocar los puntos de integración (`INTEGRACION.md`) solo si lo documenta allí.

## Estado (6 nov 2026)
**Hecho y probado:** perfil del negocio, reserva en 3 pasos con varios servicios (hasta 6), cambio y cancelación con enlace privado, «Mis citas», confirmación por WhatsApp con botones, reconocimiento del código `VS-XXXXXX` por el bot, aviso de privacidad (borrador), límites contra abusos, y pensado primero para celular. **32 pruebas** (todas pasan) (`npm test` en la agenda) y recorridos completos en navegador, escritorio y celular, sin errores de consola.

**Pendiente de confirmar con el centro** (también aparece en el panel del bot):
- **Línea de WhatsApp del bot.** Todavía no existe: el 314 530 1120 es solo teléfono de llamadas (sale como botón «Llamar»). Sin línea, `web.whatsapp` queda en `null` y no se muestra el botón de WhatsApp ni «Confirmar por WhatsApp» (la pantalla final dice que el equipo se comunicará, o que llamen). Se carga en `..\sistema-agendamiento\config\negocio.json → web.whatsapp` o en `.env → WA_PUBLIC_NUMBER`.
- **Opiniones:** 3 reseñas de 5 estrellas (Bryan, Camila Ospina, Lizeth Rozo) de los últimos 365 días; en 180 días solo había 2. Releer puntuación (4,9) y total (145) el día de publicar.
- **Servicios:** duraciones propuestas, «Más de 5 años de experiencia», spa capilar (oculto), requisitos del masaje postoperatorio y las inconsistencias del sitio de Google (horario y un teléfono con otro dígito): ver `pendientes_confirmar`.
- Política de tratamiento de datos (el texto de `/reservas/privacidad` es borrador), fotos con permiso de uso (la galería está vacía), comodidades y plazo mínimo para cambiar o cancelar (`agenda.cambios_hasta_horas`). Los precios ya están cargados (lista del 10 nov 2026, por validar).
- **Para publicar:** plantilla de WhatsApp `cita_web_vs` aprobada, credenciales de WhatsApp Cloud API, hosting HTTPS con volumen persistente para la base, y `PUBLIC_URL`.

**Datos vigentes (fuente: Perfil de Empresa de Google, leído el 6 nov 2026):** Calle 8 #12-59, Pereira (la «Calle 18» de 2022 era un error); lunes a viernes 8:00 a. m.–6:00 p. m., sábado 8:00 a. m.–3:00 p. m., domingo cerrado; teléfono 314 530 1120; 4,9 estrellas, 145 opiniones. Aplicado a sitio, bot y agenda (`config/negocio.json`). El sitio incluye `LocalBusiness` en JSON-LD (dirección, teléfono, horario; sin `AggregateRating`, que Google no admite para reseñas del propio negocio).

**Servicios (6, del sitio de Google; ver `CATALOGO_SERVICIOS.md`):** Limpieza facial, Lifting de pestañas, Depilación láser diodo (cita de orientación, sola), Depilación y sombreado de cejas, Masaje postoperatorio (revisar condiciones, solo) y Masaje relajante. Precios «Valor por confirmar» y duraciones propuestas. El Spa capilar coreano está oculto (`activo: false`) hasta que el centro confirme si sigue vigente. Eslogan «Centro Estético en Pereira», «Más de 5 años de experiencia» (por validar) y enlaces a Instagram y Facebook.

**Opiniones** (`negocio.json → web.opiniones`): 3 reseñas copiadas a mano de Google (5 estrellas, últimos 365 días, las de mejor comentario; Diana Pareja, hace 7 meses, quedó fuera por ser más corta), sin editar, con nombre, estrellas y fecha relativa como las muestra Google. Alternativa automática: la API de Places (Place Details → `rating`, `userRatingCount`, `reviews`) requiere una clave de Google Cloud que debe crear el usuario; no se hace scraping de Maps.

## Decisiones de diseño que conviene recordar
- **Sin paso «Profesional»:** el motor de agenda maneja capacidad por recurso (cabina, láser), no por persona, y el equipo no está definido.
- **No se inventa nada:** lo que está en `null` o vacío en `config/negocio.json` no se muestra (precios, WhatsApp, galería, comodidades).
- **Láser = cita de orientación**, siempre sola y marcada «Revisar condiciones»; notas de salud pasan a una asesora (igual que en el bot).
- **Paleta:** azul #00B7E6 para detalles; botones en #00789C (contraste AA con texto blanco). Poppins desde Google Fonts.
- **Seguridad:** todo se valida en el servidor, límite por IP, campo trampa, CSP, sin `innerHTML`, tokens de 192 bits. **Riesgo conocido:** se reserva sin verificar que el número sea de quien reserva (igual que la referencia); si aparece abuso, exigir confirmación por WhatsApp en un plazo o un código por plantilla.

## Ideas siguientes (no empezadas)
- Liberar automáticamente reservas web sin confirmar a las X horas.
- Agenda por profesional (cuando el equipo esté definido) y paso «Profesional».
- Galería real y reseñas, una vez haya fotos con permiso.
- Separar el sitio como front estático (otro hosting) que consuma `/api/publico/*` con CORS, si se quiere desacoplar del servidor del bot.
- Alojar Poppins localmente para no contactar a Google.
