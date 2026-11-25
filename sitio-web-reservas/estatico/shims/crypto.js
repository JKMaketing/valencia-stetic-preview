// node:crypto simulado con Web Crypto (lo que usa el sitio: randomBytes, randomUUID).
const base64url = bytes => btoa(String.fromCharCode(...bytes)).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
class Bytes extends Uint8Array {
  toString(enc) {
    if (enc === 'hex') return [...this].map(b => b.toString(16).padStart(2, '0')).join('');
    if (enc === 'base64url') return base64url(this);
    if (enc === 'base64') return btoa(String.fromCharCode(...this));
    return super.toString();
  }
}
export const randomBytes = n => { const b = new Bytes(n); globalThis.crypto.getRandomValues(b); return b; };
export const randomUUID = () => globalThis.crypto.randomUUID();
export const timingSafeEqual = (a, b) => a.length === b.length && a.every((v, i) => v === b[i]);
export const createHmac = () => { throw new Error('createHmac no está disponible en el navegador'); };
export default { randomBytes, randomUUID, timingSafeEqual, createHmac };
