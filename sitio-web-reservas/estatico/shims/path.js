// Mínimo de node:path (POSIX) para los módulos de la agenda.
const limpiar = partes => {
  const out = [];
  for (const p of partes.join('/').split('/')) { if (!p || p === '.') continue; if (p === '..') out.pop(); else out.push(p); }
  return out;
};
export const join = (...a) => (String(a[0] || '').startsWith('/') ? '/' : '') + limpiar(a).join('/');
export const resolve = (...a) => { let r = ''; for (const p of a.reverse()) { r = r ? `${p}/${r}` : p; if (String(p).startsWith('/')) break; } return '/' + limpiar([r]).join('/'); };
export const dirname = p => { const i = String(p).replace(/\/+$/, '').lastIndexOf('/'); return i <= 0 ? '/' : String(p).slice(0, i); };
export const basename = p => String(p).replace(/\/+$/, '').split('/').pop();
export const sep = '/';
export default { join, resolve, dirname, basename, sep };
