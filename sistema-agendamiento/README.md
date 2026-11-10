# Valencia Stetic · Agendamiento automático por WhatsApp

Sistema que atiende y agenda solo a las personas que escriben desde los anuncios **Click-to-WhatsApp** de Meta Ads (y a quien escriba directo). Implementa la ruta comercial de la estrategia de octubre de 2026:

```
Anuncio Meta (A01–A04) ─► WhatsApp ─► bot orienta (servicio, qué incluye, duración, valor)
        │                                  │
        │ ctwa_clid + código de anuncio    ├─► elige día y hora con cupos reales ─► confirma ─► CITA
        │                                  ├─► dudas / salud / "asesora" ─► pausa el bot y avisa al equipo
        ▼                                  ▼
Conversions API ◄── cita agendada / asistió + valor ◄── panel del equipo (asistió, no asistió, cobro)
                                           │
              recordatorio el día anterior + 2 h antes · seguimiento a las 20 h y 72 h si no agendó
```

## Qué hace

| Función | Detalle |
| --- | --- |
| Atención 24/7 | Responde al instante, también fuera de horario. Reconoce el anuncio por el mensaje prellenado (`HAZ ESPACIO`, `PAUSA`, `RITUAL`, `LASER`) y muestra directo la ficha del servicio. |
| Agenda real | Calcula cupos por servicio con horario, festivos, duración, pausa entre citas, anticipación mínima, capacidad por recurso (cabina / láser) y bloqueos. Una reserva verifica el cupo dentro de una transacción: dos personas no pueden tomar el mismo horario. |
| Conversación guiada | Menús y botones de WhatsApp, pero también entiende texto: "el sábado", "15/11", "a las 3 de la tarde", "en la mañana", "¿dónde quedan?", "cuánto vale el facial", "cambiar mi cita", "cancelar". |
| Reglas de la estrategia | No inventa precios (si `precio` es `null` dice que el equipo lo confirma), no promete resultados ni número de sesiones, láser se agenda como cita de orientación y queda marcado **Revisar condiciones**. Temas de salud (embarazo, cirugías, medicamentos…) pasan a una asesora. |
| Pase a humano | "Asesora", temas sensibles o 3 mensajes sin entender pausan el bot en esa conversación y avisan al equipo. El bot se reactiva desde el panel (o solo, tras 12 h sin mensajes del equipo). |
| Recordatorios | Día anterior con botones Confirmo / Cambiar horario / Cancelar, y aviso corto 2 h antes. |
| Seguimiento | A las 20 h a quien preguntó y no agendó; segundo intento a las 72 h por plantilla (opcional). Respeta "no quiero mensajes". |
| Señal a Meta Ads | Envía por **Conversions API** el evento de cita (`LeadSubmitted`) y el de asistencia con valor cobrado (`Purchase`) ligados al `ctwa_clid` del anuncio, para optimizar por citas y ventas, no solo por conversaciones baratas. |
| Panel del equipo | Agenda del día, conversaciones en vivo, responder como equipo, etapas del embudo (Nuevo, Orientado, Precio enviado, Cita agendada, Asistió, No asistió, Seguimiento, Requiere asesora), resultados por anuncio y por servicio, bloqueos de agenda y exportación CSV sin teléfonos. |
| IA opcional | Con `ANTHROPIC_API_KEY`, las preguntas que no cubren las reglas las responde Claude usando **solo** la información de `config/` (salida JSON validada). Sin clave, todo funciona con reglas. |

## Página de reservas web (`/reservas`)

Página pública donde la clienta elige servicio, día y hora y reserva sola. Replica el flujo de la web de referencia (`reservas.labarberiadelacircunvalar.com`: perfil del negocio → elegir servicios → fecha y hora → datos → confirmación, más «Mis citas» y botón flotante de WhatsApp) con la marca de Valencia Stetic (azul #00B7E6, celeste, crema, gris, Poppins; tono cálido y sereno). **No es un sitio aparte**: la sirve este mismo servidor y usa la **misma agenda, base de datos, panel y WhatsApp que el bot**.

| Ruta | Qué es |
| --- | --- |
| `/reservas` | Perfil: servicios (qué incluye, duración, valor), horario, dirección, contacto. La raíz `/` redirige aquí; el panel sigue en `/panel`. |
| `/reservas/reservar?servicio=facial` | Flujo de reserva en 3 pasos. Con `servicio` (uno o varios separados por coma) salta directo a elegir día y hora. |
| `/reservas/cita/<token>` | Enlace privado de una reserva: ver, **cambiar horario** o **cancelar**. El token (192 bits) solo lo recibe quien reservó. |
| `/reservas/mis-citas` | Reservas hechas desde ese dispositivo. |
| `/reservas/privacidad` | Aviso de datos (**borrador a validar** por el centro). |

### Cómo queda conectada con el bot
- **Mismos cupos:** una reserva web ocupa el mismo cupo (cabina / láser, pausa entre citas, festivos, bloqueos del panel) que una del bot; nadie puede tomar el mismo horario por los dos lados (la reserva se verifica dentro de una transacción).
- **Panel:** la cita aparece en la agenda con la etiqueta *Reserva web*, el anuncio de origen y *Revisar condiciones* (láser o notas de salud); se marca asistencia, valor y cancelación igual que las demás.
- **Confirmación por WhatsApp:** al reservar, el sistema escribe a la clienta (texto con botones si su ventana de 24 h está abierta; si no, la plantilla `cita_web_vs`, ver `plantillas/`). Además, la pantalla final trae **«Confirmar por WhatsApp»**: abre su chat con «Hola, reservé en la web con el código VS-XXXXXX…» y el bot reconoce el código y le ofrece *Confirmo asistencia / Cambiar horario / Cancelar cita*. Funciona aunque la plantilla todavía no esté aprobada.
- **Después de reservar:** mismos recordatorios (día anterior y 2 h antes), seguimiento y «gracias» del bot. Si la persona escribe «cancelar» o «cambiar mi cita» por WhatsApp, el bot actúa sobre la reserva web; si tenía varios servicios seguidos, los confirma o cancela juntos y, para moverlos, le envía el enlace de la reserva.
- **Anuncios y orígenes:** `?cod=HAZ%20ESPACIO` (o `PAUSA`, `RITUAL`, `LASER`) queda guardado en el contacto y la cita, así «Por anuncio / origen» del panel cuenta también las reservas web. Si la persona ya había llegado por un anuncio Click-to-WhatsApp, la cita conserva su `ctwa_clid` y se envía el evento de cita a Meta.
- **Bot → web:** la ficha de cada servicio incluye «También puedes reservar en línea: …» (si `PUBLIC_URL` está definida) y si la persona pide «página» o «enlace» el bot se lo envía con su servicio ya elegido.
- Enlaces para usar: biografía de Instagram, Perfil de Empresa de Google, botón del anuncio (destino sitio web) o `https://TU-DOMINIO/reservas/reservar?servicio=facial&cod=HAZ%20ESPACIO&src=anuncio`.

### Qué se adaptó respecto a la referencia (y por qué)
- **Sin paso «Profesional»:** el motor de agenda maneja capacidad por recurso (cabina, láser), no personas; el equipo no está definido. Se agrega cuando haya agendas por profesional.
- **Varios servicios por visita (hasta 3):** se hacen uno tras otro con la pausa configurada. El láser se agenda **solo**, como cita de orientación.
- **Valores:** si el precio es `null`, la página dice «Valor por confirmar» (la estrategia prohíbe inventar precios). Sin pago en línea.
- **Notas con temas de salud:** se guarda la nota, se marca la cita *Revisar condiciones* y se avisa al equipo; no se etiqueta nada clínico.
- **Correo:** se guarda (opcional) pero no se envían correos; el canal de confirmación es WhatsApp.

### Configuración
- `config/negocio.json → web`: `whatsapp` (número público), `instagram`, `frase`, `descripcion`, `comodidades`, `galeria` (fotos con permiso de uso), `mapa_url`, `privacidad_url`. Lo que está en `null` o vacío no se muestra: **nada se inventa**.
- `.env`: `PUBLIC_URL` (HTTPS), `WA_PUBLIC_NUMBER` (si no está, el botón de WhatsApp de la página no aparece; en modo simulación apunta al simulador), `TRUST_PROXY=1` si hay proxy.
- Sin `WA_PUBLIC_NUMBER`, en simulación la pantalla final ofrece «Confirmar por WhatsApp (simulador)».

### Seguridad y límites conocidos
- La API pública valida todo en el servidor (fechas dentro de la ventana de agenda, horario realmente libre, teléfono, país, textos limpios), limita abusos por IP (6 reservas/hora, 120 consultas/min; en memoria, se reinicia con el servidor), incluye campo trampa contra bots, cabeceras CSP y no usa `innerHTML`. El panel y su API siguen exigiendo clave.
- **Riesgo:** como en la referencia, se reserva con solo el WhatsApp, sin verificar que el número sea de quien reserva. Alguien podría apartar cupos con números ajenos. Mitigación actual: el equipo ve y cancela desde el panel y la persona real puede ignorar o cancelar por WhatsApp. Si aparece abuso: exigir confirmación por WhatsApp en un plazo (liberar cupos sin confirmar) o código por plantilla.
- La tipografía Poppins se carga desde Google Fonts (el visitante contacta a Google); para evitarlo, alojar la fuente en `public/reservas`.
- `agenda.cambios_hasta_horas` (plazo mínimo para cambiar/cancelar por la web) está en `null`: sin límite hasta que el centro confirme su política.
- Datos pendientes de confirmar con el centro (también en el panel): línea de WhatsApp del bot (el 314 530 1120 es solo teléfono de llamadas; dirección y horario ya salen del Perfil de Empresa de Google: Calle 8 #12-59, Pereira), política de datos, fotos con permiso, comodidades y plazo de cambios.

## Probar en local (5 minutos)

Requiere Node.js 22.13 o superior (probado en Node 24). No necesita instalar paquetes.

```bash
cd "D:/Juan Kno/Documents/Freelance/Valencia Stetic/sistema-agendamiento"
```
```bash
npm start
```

- Simulador de chat: http://localhost:3200/simulador → toca un anuncio (A01–A04) y agenda como si fueras una clienta.
- Página de reservas: http://localhost:3200/reservas
- Panel del equipo: http://localhost:3200/panel (sin `PANEL_PASSWORD` y sin `WA_TOKEN` entra directo, solo en modo simulación).
- Pruebas automáticas: `npm test` (30 pruebas: 15 del bot y la página de reservas; escenarios del bot: anuncio → cita, choque de cupos, texto libre, láser, salud, reprogramar/cancelar, recordatorios, seguimiento, baja, webhook).

## Puesta en marcha

### 1. Datos que debe confirmar Valencia Stetic
Edita `config/negocio.json` y `config/servicios.json`:
- Dirección exacta y cómo llegar, horario real y días cerrados (festivos 2026–2027 precargados: revisar).
- Por servicio: qué incluye, duración, **precio vigente** (o dejar `null`), recurso que ocupa.
- Capacidad (`recursos`): cuántas cabinas / equipos de láser atienden a la vez.
- Política de cambios, indicaciones previas, nombre de quien firma.
- Cuando todo esté confirmado, vacía `pendientes_confirmar` para quitar el aviso del panel.

### 2. WhatsApp Cloud API (Meta)
1. En **Meta Business Suite** del cliente: crear una app tipo *Empresa* en developers.facebook.com y agregar el producto **WhatsApp**.
2. Registrar el número del centro en la WABA. El número que use la API **no puede seguir abierto en la app WhatsApp Business** salvo que se active la *coexistencia* de Meta (verificar disponibilidad para el número antes de migrar; si no, usar un número nuevo y actualizar perfiles y anuncios).
3. Crear un **usuario del sistema** con token permanente (permisos `whatsapp_business_messaging`, `whatsapp_business_management`; `ads_management` si se usará CAPI con ese token).
4. Copiar a `.env`: `WA_TOKEN`, `WA_PHONE_NUMBER_ID`, `WA_BUSINESS_ACCOUNT_ID`, `META_APP_SECRET`.

### 3. Publicar el servidor (HTTPS)
Opciones probadas con este código:
- **Railway / Render / Fly.io** con el `Dockerfile` incluido y un **volumen persistente montado en `/data`** (ahí vive la base SQLite). Sin volumen se pierden las citas en cada despliegue.
- **VPS** (Ubuntu) con Docker: `docker build -t vs-agenda .` y `docker run -d --restart=always -p 3200:3200 -v vs_data:/data --env-file .env vs-agenda`, detrás de Caddy/Nginx con HTTPS.

Variables mínimas: copia `.env.example` a `.env` y completa `PANEL_PASSWORD`, `SESSION_SECRET`, `PUBLIC_URL`, `SIMULADOR=0` en producción.

### 4. Conectar el webhook
En la app de Meta → WhatsApp → Configuración:
- URL de devolución de llamada: `https://TU-DOMINIO/webhook`
- Token de verificación: el valor de `WA_VERIFY_TOKEN`
- Suscribir el campo **messages**.

Prueba: escribe al número desde tu celular. Debe aparecer en el panel en segundos.

### 5. Plantillas
Crear y esperar aprobación de las 4 plantillas de `plantillas/PLANTILLAS_WHATSAPP.md`.

### 6. Conversions API (citas y ventas hacia Meta Ads)
1. Administrador de eventos → crear/usar un **conjunto de datos** y vincularlo a la cuenta de WhatsApp (WABA).
2. Poner su ID en `META_DATASET_ID` y un token con permisos en `META_CAPI_TOKEN`.
3. En Ajustes del panel se ve cada evento enviado y la respuesta de Meta. Revisa en el Administrador de eventos que lleguen los eventos y, si la cuenta lo ofrece, usa la optimización por evento en el conjunto de anuncios.

> Los nombres de evento son configurables (`CAPI_EVENT_CITA`, `CAPI_EVENT_ASISTIO`). Verifica en la documentación vigente de Meta para *Conversions API for Business Messaging* cuáles acepta tu cuenta antes de lanzar.

### 7. Anuncios Click-to-WhatsApp
- Objetivo: **Interacción** (o el que habilite destino WhatsApp en la cuenta) → ubicación de la conversión: **WhatsApp** → número conectado a la API.
- En el creativo, **mensaje prellenado** con el código de cada anuncio (ya están en la estrategia):
  - A01 `Hola, vi HAZ ESPACIO y quiero información sobre cuidado facial`
  - A02 `Hola, vi PAUSA y quiero información sobre masaje relajante`
  - A03 `Hola, vi RITUAL y quiero información sobre spa capilar`
  - A04 `Hola, vi LASER y quiero información sobre depilación`
- **No** configurar saludo automático ni preguntas frecuentes en la plantilla de mensajes del anuncio: el bot ya da la bienvenida y duplicaría mensajes.
- Edad mínima 25+, Pereira con radio de 3–5 km desde la dirección confirmada.

### 8. Ensayo antes de pautar
Desde un celular del equipo: escribir con cada mensaje prellenado, agendar, reprogramar, cancelar, pedir asesora, y marcar en el panel "Asistió" con un valor. Confirmar que llegan los avisos al equipo y los eventos a Meta.

## Uso diario del equipo (panel)

- **Agenda**: citas del día. Botones Confirmar · Asistió (pide el valor cobrado) · No asistió · Mover · Cancelar · Chat. "+ Nueva cita" para citas que entran por teléfono o en persona (bloquea el cupo para el bot).
- **Conversaciones**: todos los chats en vivo. Las marcadas **Atiende asesora** esperan respuesta humana (contador en la pestaña). Al escribir desde el panel el bot se pausa en ese chat; usa **Reactivar bot** al terminar.
- **Resultados**: conversaciones, citas, conversación→cita, asistencia, ingresos, por anuncio y por servicio. Cruza con el gasto de cada anuncio en Meta para costo por cita y CAC (la estrategia prioriza el costo por cliente que asistió y pagó).
- **Ajustes**: estado de integraciones, bloqueos de agenda (vacaciones, capacitaciones) y registro de eventos enviados a Meta.

Marcar asistencia y valor cada día es lo que permite medir el retorno real de la pauta.

## Privacidad

- Los teléfonos y conversaciones viven solo en la base del servidor (`/data`), accesible con la clave del panel.
- La exportación CSV usa un identificador anónimo, sin teléfonos ni mensajes.
- No se guardan datos clínicos en etiquetas: los temas de salud se derivan a una persona.
- "No quiero mensajes" / "stop" desactiva todo seguimiento automático para ese contacto.

## Estructura

```
config/negocio.json      horario, dirección, agenda, recursos, FAQ, plantillas, palabras clave
config/servicios.json    catálogo (incluye, duración, precio, recurso, códigos de anuncio)
src/server.js            webhook, API del panel, simulador
src/bot.js               conversación y agendamiento
src/agenda.js            disponibilidad y reservas sin choques
src/nlu.js               fechas, horas, servicios e intenciones en texto libre
src/programador.js       recordatorios y seguimientos (cada minuto)
src/capi.js              Conversions API (ctwa_clid)
src/whatsapp.js          envío/recepción Cloud API, firma del webhook, modo simulación
src/ia.js                IA opcional con Claude
public/panel.html        panel del equipo
public/simulador.html    simulador de WhatsApp
plantillas/              plantillas para aprobar en WhatsApp Manager
test/                    pruebas de extremo a extremo
```
