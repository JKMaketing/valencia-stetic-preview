# Traspaso: quién es dueño de qué (6 nov 2026)

Dos chats trabajan sobre este proyecto, cada uno con su carpeta dentro de `Freelance\Valencia Stetic`:

| Chat | Carpeta | Dueño de |
| --- | --- | --- |
| **AGENDA \| VALENCIA STETIC** | `sistema-agendamiento\` (esta) | El bot de WhatsApp, la agenda, la base de datos, el panel, el simulador, CAPI, recordatorios, plantillas y el servidor. Toda la documentación de puesta en marcha está en `README.md`. |
| **Sitio web de reservas** | `..\sitio-web-reservas\` | La página pública `/reservas`: 8 archivos que viven en `..\sitio-web-reservas\codigo\` (`public/reservas/*`, `src/reservas.js`, `src/enlaces.js`, `test/reservas.test.js`). |

**Los 8 archivos del sitio también existen aquí** porque el sitio lo sirve este mismo servidor; son copias desplegadas. La fuente de verdad está en `..\sitio-web-reservas\codigo\`. Para comparar: `cd ..\sitio-web-reservas && npm run estado`.

Los puntos donde el sitio se engancha a este proyecto (base de datos, motor de agenda, bot, servidor, panel, configuración) están listados en `..\sitio-web-reservas\INTEGRACION.md`. Si cambias alguno, corre `npm test` aquí (30 pruebas) y anótalo allá.

Nada de la base de datos ni de la configuración del bot se movió de lugar: este proyecto sigue funcionando exactamente igual que antes (`npm start`, puerto 3200).
