# Valencia Stetic · Preview de reservas web + asistente de agendamiento

Preview compartible del sitio de reservas de **Valencia Stetic** (centro estético en Pereira) integrado al **sistema de agendamiento** (el mismo bot de WhatsApp, aquí como asistente dentro de la web, sin número de teléfono).

> Es una **demostración**: usa una base de datos de prueba, **no envía nada a WhatsApp** y no contiene credenciales. Los precios, textos de servicios y duraciones son los cargados el 10 nov 2026 y están **por validar con el centro**.

## Qué incluye
- **Web de reservas** (`/reservas`): 49 servicios en 8 categorías con valores, texto breve por servicio («Ver info +»), reserva de 2 o más servicios con total, cambio y cancelación con enlace privado, opiniones de Google, datos estructurados para SEO.
- **Asistente integrado** (botón «Asistente»): el bot con menús por categorías, agenda real compartida con la web, reglas de seguridad (no inventa precios, temas de salud a una asesora).
- **Recorrido de demostración** (`/reservas/demo`): 8 escenarios con un clic (anuncio → cita, texto libre, láser, postoperatorio, asesora, cancelar, recordatorio automático y **conversión**) y una «Vista del equipo» (embudo, citas y evento de compra).

## Cómo correrlo (solo necesita Node 24 o superior, sin instalar paquetes)
```bash
cd sitio-web-reservas
node demo.mjs                 # http://localhost:3300/reservas/demo
node demo.mjs iniciar         # lo deja en segundo plano  ·  node demo.mjs estado | parar
node demo.mjs iniciar --publico   # además crea un enlace temporal público (requiere `cloudflared`)
```
Pruebas (32): `cd sistema-agendamiento && npm test`.

## Estructura
| Carpeta | Contenido |
| --- | --- |
| `sistema-agendamiento/` | Servidor (Node, SQLite integrado): agenda, bot, panel, API pública. `config/` trae negocio y servicios. |
| `sitio-web-reservas/` | Fuente del sitio (`codigo/`), lanzador de la demo (`demo.mjs`), documentación (`README.md`, `INTEGRACION.md`, `CATALOGO_SERVICIOS.md`) y `sincronizar.mjs` (copia `codigo/` al servidor). |

El detalle de cómo se engancha el sitio al bot está en `sitio-web-reservas/INTEGRACION.md`; el estado y los pendientes del centro, en `sitio-web-reservas/README.md`.

## Pendientes del centro (resumen)
Línea de WhatsApp del bot · duraciones reales (hoy 30 min por servicio) · validar precios y textos · validar «Más de 10 años de experiencia» · fotos reales con permiso de uso · política de datos · plantilla `cita_web_vs` · hosting con HTTPS.

## Contenido público y privacidad
Repositorio **público**. Incluye textos de opiniones públicas de Google (con el nombre como aparece allí) y una imagen de apoyo para «Limpieza facial» (recorte de un diseño del centro). Las imágenes y los textos pertenecen a Valencia Stetic. No contiene `.env`, bases de datos ni credenciales: no las subas.
