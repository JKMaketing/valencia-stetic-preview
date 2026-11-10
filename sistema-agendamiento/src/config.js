// Carga .env (sin dependencias) y la configuración del negocio.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

function loadDotEnv() {
  const file = path.join(ROOT, '.env');
  if (!fs.existsSync(file)) return;
  for (const raw of fs.readFileSync(file, 'utf8').split(/\r?\n/)) {
    const line = raw.trim();
    if (!line || line.startsWith('#')) continue;
    const i = line.indexOf('=');
    if (i < 0) continue;
    const key = line.slice(0, i).trim();
    let val = line.slice(i + 1).trim();
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) val = val.slice(1, -1);
    if (process.env[key] === undefined) process.env[key] = val;
  }
}
loadDotEnv();

const e = (k, d = '') => (process.env[k] ?? d).toString().trim();

export const env = {
  PORT: Number(e('PORT', '3200')),
  PUBLIC_URL: e('PUBLIC_URL'),
  DATA_DIR: path.resolve(ROOT, e('DATA_DIR', './data')),
  PANEL_PASSWORD: e('PANEL_PASSWORD'),
  SESSION_SECRET: e('SESSION_SECRET', 'dev-secret-cambiar'),
  SIMULADOR: e('SIMULADOR', '1') === '1',
  WA_TOKEN: e('WA_TOKEN'),
  WA_PHONE_NUMBER_ID: e('WA_PHONE_NUMBER_ID'),
  WA_BUSINESS_ACCOUNT_ID: e('WA_BUSINESS_ACCOUNT_ID'),
  WA_VERIFY_TOKEN: e('WA_VERIFY_TOKEN', 'valencia-stetic-verify'),
  META_APP_SECRET: e('META_APP_SECRET'),
  META_GRAPH_VERSION: e('META_GRAPH_VERSION', 'v23.0'),
  WA_TEMPLATE_LANG: e('WA_TEMPLATE_LANG', 'es'),
  META_DATASET_ID: e('META_DATASET_ID'),
  META_CAPI_TOKEN: e('META_CAPI_TOKEN') || e('WA_TOKEN'),
  CAPI_EVENT_CITA: e('CAPI_EVENT_CITA', 'LeadSubmitted'),
  CAPI_EVENT_ASISTIO: e('CAPI_EVENT_ASISTIO', 'Purchase'),
  STAFF_WA_NUMBERS: e('STAFF_WA_NUMBERS').split(',').map(s => s.replace(/\D/g, '')).filter(Boolean),
  // Página pública de reservas
  WA_PUBLIC_NUMBER: e('WA_PUBLIC_NUMBER'),
  // 1 = el servidor está detrás de un proxy (Railway, Render, Caddy…) y se puede confiar en X-Forwarded-For para limitar abusos por IP
  TRUST_PROXY: e('TRUST_PROXY','0')==='1',
  ANTHROPIC_API_KEY: e('ANTHROPIC_API_KEY'),
  CLAUDE_MODEL: e('CLAUDE_MODEL', 'claude-opus-5-5'),
};

export const modoSimulacion = () => !env.WA_TOKEN || !env.WA_PHONE_NUMBER_ID;

function readJson(rel) {
  return JSON.parse(fs.readFileSync(path.join(ROOT, rel), 'utf8'));
}

export const negocio = readJson('config/negocio.json');
export const servicios = readJson('config/servicios.json').servicios.filter(s => s.activo !== false);
export const categoriasOrden = readJson('config/servicios.json').categorias || [];   // orden de las categorías en la web y el bot
export const servicioPorId = id => servicios.find(s => s.id === id) || null;
