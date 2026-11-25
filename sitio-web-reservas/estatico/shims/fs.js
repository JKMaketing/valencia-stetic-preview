// node:fs simulado: solo sirve los JSON de configuración incrustados al compilar (config/negocio.json y config/servicios.json).
const archivos = globalThis.__VS_ARCHIVOS || {};
const buscar = p => { const k = Object.keys(archivos).find(k => String(p).endsWith(k)); return k ? archivos[k] : undefined; };
export const readFileSync = p => { const t = buscar(p); if (t === undefined) { const e = new Error(`ENOENT: ${p}`); e.code = 'ENOENT'; throw e; } return t; };
export const existsSync = p => buscar(p) !== undefined;
export const mkdirSync = () => undefined;
export const writeFileSync = () => undefined;
export default { readFileSync, existsSync, mkdirSync, writeFileSync };
