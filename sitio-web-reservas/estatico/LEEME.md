# Versión estática (GitHub Pages)

Corre **la misma agenda, bot y API pública** del servidor dentro del navegador: `construir.mjs` empaqueta los módulos de `sistema-agendamiento/src` con esbuild, simula `node:sqlite` con **sql.js** (SQLite en WebAssembly) y `fetch('/api/publico/…')` se responde en la página. Los datos de prueba viven en `localStorage` del visitante.

```bash
cd sitio-web-reservas/estatico
npm install                      # esbuild y sql.js
node construir.mjs --salida ../../docs --prefijo /valencia-stetic-preview
node servir-local.mjs            # prueba local como GitHub Pages: http://localhost:4173/valencia-stetic-preview/reservas/demo
```
Después de `construir`, sube la carpeta `docs/`; GitHub Pages publica `main:/docs` en `https://jkmaketing.github.io/valencia-stetic-preview/`.

Limitaciones: no hay WhatsApp ni IA externa; el panel del equipo no existe (la demo trae su «Vista del equipo»); cada navegador tiene su propia agenda.
