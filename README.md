# Valencia Stetic · Preview de reservas web + asistente de agendamiento

Preview compartible del sitio de reservas de **Valencia Stetic** (centro estético en Pereira) integrado al **sistema de agendamiento** (el mismo bot de WhatsApp, aquí como asistente dentro de la web, sin número de teléfono).

> Es una **demostración**: usa una base de datos de prueba, **no envía nada a WhatsApp** y no contiene credenciales. Precios, textos y protocolos salen del «Contexto Maestro: Valencia Stetic (Website & Bot 24/7)» (25 nov 2026) y están **por validar con el centro**.

## Qué incluye
- **Web de reservas** (`/reservas`): 87 servicios en 8 categorías más las promociones de aniversario vigentes, con valor, duración, «Ver info +» (texto breve para SEO) y «Ver protocolo y cuidados» (procedimiento, indicaciones, cuidados y contraindicaciones). Reserva de 2 a 6 servicios con total, cambio y cancelación con enlace privado, opiniones de Google y datos estructurados.
- **Asistente integrado** (botón «Asistente»): el bot con menús por categorías, agenda real compartida con la web y contexto completo del catálogo: dudas por servicio (cuidados, sesiones, dolor, contraindicaciones, pago, retoques), cotización de varios servicios, manejo de objeciones (precio, «lo voy a pensar», miedo, seguridad, garantías, menores) y filtro de seguridad para temas de salud. No inventa precios ni promociones.
- **Recorrido de demostración** (`/reservas/demo`): 11 escenarios con un clic (anuncio → cita, texto libre, láser, postoperatorio, objeciones, cotización, tema de salud, asesora, cancelar, recordatorio y **conversión**) y una «Vista del equipo» (embudo, citas y evento de compra).

## Preview publicado (GitHub Pages, sin servidor)
**https://jkmaketing.github.io/valencia-stetic-preview/reservas/demo** — la web, el asistente y la agenda corren dentro del navegador: no dependen de ningún computador ni servidor. Los datos de prueba se guardan en el navegador de cada visitante («Reiniciar» en la demo los borra).

Para actualizarlo después de cambiar el catálogo o el bot: `cd sitio-web-reservas/estatico && npm install && node construir.mjs --salida ../../docs` y subir `docs/` (Pages publica la carpeta `/docs` de `main`). Más detalle en `sitio-web-reservas/estatico/LEEME.md`.

Alternativas con servidor real: el `Dockerfile` y `render.yaml` de la raíz (Render, Fly.io, Railway…).

## Cómo correrlo en un computador (solo necesita Node 24 o superior, sin instalar paquetes)
```bash
cd sitio-web-reservas
node demo.mjs                     # http://localhost:3300/reservas/demo
node demo.mjs iniciar             # en segundo plano  ·  node demo.mjs estado | parar
node demo.mjs iniciar --publico   # además un enlace temporal público (requiere `cloudflared`)
```
Pruebas (34): `cd sistema-agendamiento && npm test`.

## Estructura
| Carpeta | Contenido |
| --- | --- |
| `sistema-agendamiento/` | Servidor (Node, SQLite integrado): agenda, bot, panel, API pública. `config/` trae negocio y servicios (`servicios.json` se genera del Contexto Maestro). |
| `sitio-web-reservas/` | Fuente del sitio (`codigo/`), lanzador de la demo (`demo.mjs`), documentación (`README.md`, `INTEGRACION.md`) y `sincronizar.mjs`. |
| `docs/`, `sitio-web-reservas/estatico/` | Versión estática (todo en el navegador) y su compilador, para GitHub Pages. `Dockerfile` y `render.yaml`: opción con servidor. |

El detalle de cómo se engancha el sitio al bot está en `sitio-web-reservas/INTEGRACION.md`; el estado y los pendientes del centro, en `sitio-web-reservas/README.md`.

## Pendientes del centro (resumen)
Línea de WhatsApp del bot · validar precios, textos y duraciones · medios de pago · fotos reales con permiso de uso · política de datos · plantilla `cita_web_vs` · hosting definitivo con dominio y HTTPS.

## Contenido público
Repositorio **público**. Incluye textos de opiniones públicas de Google (con el nombre como aparece allí) y una imagen de apoyo para «Limpieza facial» y diseños de la campaña de aniversario. Las imágenes y los textos pertenecen a Valencia Stetic. No contiene `.env`, bases de datos ni credenciales: no las subas.
