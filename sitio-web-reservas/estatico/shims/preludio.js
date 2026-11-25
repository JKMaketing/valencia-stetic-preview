import '../.generado/archivos.js';
// Se ejecuta ANTES que los módulos de la agenda: define `process.env` y la URL pública según dónde esté publicada la página.
const prefijo = globalThis.VS_PREFIJO || '';
globalThis.process = globalThis.process || {};
globalThis.process.env = Object.assign({
  MODO_DEMO: '1', SIMULADOR: '0', WA_TOKEN: '', WA_PHONE_NUMBER_ID: '', ASISTENTE_WEB: '1',
  PUBLIC_URL: `${location.origin}${prefijo}`, TRUST_PROXY: '0', RESERVAS_MAX_POR_HORA: '60', RESERVAS_MAX_API_MIN: '600', ASISTENTE_MAX_10MIN: '400',
}, globalThis.process.env || {});
globalThis.process.argv = [];
globalThis.process.cwd = () => '/';
