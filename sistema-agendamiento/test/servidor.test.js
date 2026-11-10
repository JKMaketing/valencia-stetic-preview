// Prueba del servidor HTTP: webhook de Meta, simulador y API del panel.
import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';

process.env.WA_TOKEN = '';
process.env.PANEL_PASSWORD = '';
process.env.SIMULADOR = '1';

const { fijarReloj, aMs } = await import('../src/tiempo.js');
const db = await import('../src/db.js');
const { crearServidor } = await import('../src/server.js');

fijarReloj(aMs('2026-11-04T10:00'));
let srv, base;
before(async () => {
  db.abrirDb(':memory:');
  srv = crearServidor();
  await new Promise(r => srv.listen(0, r));
  base = `http://127.0.0.1:${srv.address().port}`;
});
after(() => srv.close());

const get = p => fetch(base + p).then(async r => ({ status: r.status, body: await r.json().catch(() => null) }));
const post = (p, b) => fetch(base + p, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(b) }).then(async r => ({ status: r.status, body: await r.json().catch(() => null) }));

test('verificación del webhook de Meta', async () => {
  const ok = await fetch(`${base}/webhook?hub.mode=subscribe&hub.verify_token=valencia-stetic-verify&hub.challenge=12345`);
  assert.equal(ok.status, 200);
  assert.equal(await ok.text(), '12345');
  const mal = await fetch(`${base}/webhook?hub.mode=subscribe&hub.verify_token=otro&hub.challenge=1`);
  assert.equal(mal.status, 403);
});

test('mensaje real por webhook crea contacto y respuesta', async () => {
  const body = { object: 'whatsapp_business_account', entry: [{ changes: [{ field: 'messages', value: {
    contacts: [{ wa_id: '573118887766', profile: { name: 'Marta' } }],
    messages: [{ from: '573118887766', id: 'wamid.HBg1', timestamp: '1793800000', type: 'text', text: { body: 'Hola, vi LASER y quiero información sobre depilación láser' },
      referral: { source_id: '777', source_type: 'ad', headline: 'Tu próximo ritual empieza aquí', ctwa_clid: 'CLID-XYZ', source_url: 'https://fb.me/a' } }],
  } }] }] };
  const r = await post('/webhook', body);
  assert.equal(r.status, 200);
  await new Promise(res => setTimeout(res, 80));
  const c = db.obtenerContacto('573118887766');
  assert.equal(c.ctwa_clid, 'CLID-XYZ');
  assert.equal(c.codigo_anuncio, 'LASER');
  // reintento del mismo webhook (Meta reintenta): no duplica respuestas
  await post('/webhook', body);
  await new Promise(res => setTimeout(res, 80));
  const salientes = db.mensajesDe('573118887766').filter(m => m.direccion === 'out');
  assert.equal(salientes.length, 2);
});

test('simulador + panel: agendar y marcar asistencia', async () => {
  let r = await post('/sim/enviar', { wa_id: '573000000001', nombre: 'Prueba Uno', texto: 'Hola, vi HAZ ESPACIO y quiero información sobre cuidado facial', referral: { source_id: '1', ctwa_clid: 'SIMCLID' } });
  assert.equal(r.status, 200);
  assert.ok(r.body.mensajes.some(m => /Limpieza facial básica/.test(m.cuerpo)));
  await post('/sim/enviar', { wa_id: '573000000001', reply_id: 'act:agendar:facial' });
  await post('/sim/enviar', { wa_id: '573000000001', reply_id: 'day:2026-11-05' });
  await post('/sim/enviar', { wa_id: '573000000001', reply_id: 'slot:2026-11-05T14:00' });
  await post('/sim/enviar', { wa_id: '573000000001', reply_id: 'nom:perfil' });
  r = await post('/sim/enviar', { wa_id: '573000000001', reply_id: 'conf:si' });
  assert.ok(r.body.mensajes.some(m => /quedó agendada/.test(m.cuerpo)));

  const citas = await get('/api/citas?desde=2026-11-05&hasta=2026-11-06');
  assert.equal(citas.status, 200);
  const cita = citas.body.find(c => c.wa_id === 'sim573000000001');
  assert.ok(cita);
  assert.equal(cita.servicio, 'Limpieza facial básica');

  r = await post(`/api/citas/${cita.id}/estado`, { estado: 'asistio', valor: '120000' });
  assert.equal(r.body.estado, 'asistio');
  assert.equal(r.body.valor_cobrado, 120000);
  await new Promise(res => setTimeout(res, 30));
  const capi = await get('/api/capi');
  const compra = capi.body.find(e => e.evento === 'Purchase');
  assert.equal(compra.payload.custom_data.value, 120000);
  assert.equal(compra.payload.user_data.ctwa_clid, 'SIMCLID');

  const res = await get('/api/resumen?desde=2026-11-01&hasta=2026-11-30');
  assert.equal(res.body.citas_agendadas, 1);
  assert.ok(res.body.por_anuncio.some(a => a.origen === 'HAZ ESPACIO' && a.con_cita === 1));
  const cfg = await get('/api/config');
  assert.equal(cfg.body.simulacion, true);
  assert.equal(cfg.body.servicios.length, 49);
});

test('panel: cita manual bloquea el cupo y el bloqueo de agenda quita horas', async () => {
  let r = await post('/api/citas', { wa_id: '57 300 555 4444', nombre: 'Cliente Teléfono', servicio_id: 'laser', inicio: '2026-11-06T09:00' });
  assert.equal(r.status, 200);
  r = await post('/api/citas', { wa_id: '573005554445', servicio_id: 'laser', inicio: '2026-11-06T09:00' });
  assert.equal(r.status, 409);
  await post('/api/bloqueos', { inicio: '2026-11-06T14:00', fin: '2026-11-06T19:00', recurso: '', motivo: 'Capacitación' });
  const d = await get('/api/disponibilidad?servicio=masaje&fecha=2026-11-06');
  assert.ok(!d.body.horas.some(h => h >= '13:30'), 'masaje de 60 min que cruza el bloqueo no se ofrece');
  assert.ok(d.body.horas.includes('09:00'));
  const csv = await fetch(base + '/api/export.csv').then(r => r.text());
  assert.ok(!csv.includes('573005554444'), 'el CSV no incluye teléfonos');
});
