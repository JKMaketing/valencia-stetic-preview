// Pruebas de extremo a extremo del bot en modo simulación (sin WhatsApp real).
import { test, before } from 'node:test';
import assert from 'node:assert/strict';
import crypto from 'node:crypto';

process.env.WA_TOKEN = '';
process.env.META_APP_SECRET = '';
process.env.ANTHROPIC_API_KEY = '';

const { fijarReloj, aMs } = await import('../src/tiempo.js');
const db = await import('../src/db.js');
const bot = await import('../src/bot.js');
const agenda = await import('../src/agenda.js');
const wa = await import('../src/whatsapp.js');
const { ejecutarTareas } = await import('../src/programador.js');

// Miércoles 4 nov 2026, 10:00 a. m. en Pereira
fijarReloj(aMs('2026-11-04T10:00'));
before(() => db.abrirDb(':memory:'));

let n = 0;
async function escribe(wa_id, { texto = '', reply_id = null, referral = null, nombre = null } = {}) {
  const antes = db.getDb().prepare('SELECT COALESCE(MAX(id),0) id FROM mensajes WHERE wa_id = ?').get(wa_id).id;
  await bot.procesarEntrante({ wa_id, nombre_perfil: nombre, wamid: `t.${++n}`, tipo: reply_id ? 'interactive' : 'text', texto, reply_id, referral });
  return db.mensajesDe(wa_id, antes).filter(m => m.direccion === 'out');
}
const ids = m => (m.payload?.botones || m.payload?.secciones?.flatMap(s => s.filas) || []).map(x => x.id);
const ultimo = arr => arr[arr.length - 1];

test('flujo completo desde anuncio Click-to-WhatsApp hasta cita agendada', async () => {
  const W = '573001112233';
  const referral = { source_id: '120210000000001', source_type: 'ad', headline: 'Una pausa también cuenta', ctwa_clid: 'ARAkLkA8rmlFeiCktEJQ', source_url: 'https://fb.me/x' };
  let r = await escribe(W, { texto: 'Hola, vi PAUSA y quiero información sobre masaje relajante', referral, nombre: 'Laura Gómez' });
  assert.match(r[0].cuerpo, /gracias por escribir a Valencia Stetic/);
  assert.match(r[1].cuerpo, /Masaje relajante/);
  assert.ok(ids(r[1]).includes('act:agendar:masaje'));
  let c = db.obtenerContacto(W);
  assert.equal(c.codigo_anuncio, 'PAUSA');
  assert.equal(c.ctwa_clid, 'ARAkLkA8rmlFeiCktEJQ');
  assert.equal(c.etapa, 'Precio enviado');

  r = await escribe(W, { reply_id: 'act:agendar:masaje', texto: 'Agendar cita' });
  const dias = ids(r[0]);
  assert.ok(dias.length > 0 && dias[0].startsWith('day:'));
  assert.ok(!dias.includes('day:2026-11-08'), 'domingo cerrado');
  assert.equal(dias[0], 'day:2026-11-04', 'hoy aún tiene cupos después de 12:00');

  r = await escribe(W, { reply_id: 'day:2026-11-05' });
  const horas = ids(r[0]);
  assert.ok(horas.includes('slot:2026-11-05T09:00'));

  r = await escribe(W, { reply_id: 'slot:2026-11-05T10:00' });
  assert.match(r[0].cuerpo, /A nombre de quién/);
  assert.ok(ids(r[0]).includes('nom:perfil'));

  r = await escribe(W, { texto: 'me llamo laura gómez' });
  assert.match(r[0].cuerpo, /Revisemos tu cita/);
  assert.match(r[0].cuerpo, /jueves 5 de noviembre/);
  assert.match(r[0].cuerpo, /10:00 a\. m\./);

  r = await escribe(W, { reply_id: 'conf:si' });
  assert.match(r[0].cuerpo, /tu cita quedó agendada/);
  const citas = db.citasActivasDe(W);
  assert.equal(citas.length, 1);
  assert.equal(citas[0].inicio, '2026-11-05T10:00');
  assert.equal(citas[0].nombre, 'Laura Gómez');
  assert.equal(citas[0].codigo_anuncio, 'PAUSA');
  c = db.obtenerContacto(W);
  assert.equal(c.etapa, 'Cita agendada');
  assert.equal(c.estado, null);
  await new Promise(r => setTimeout(r, 20));
  const ev = db.ultimosEventosCapi(5).find(e => e.wa_id === W);
  assert.ok(ev, 'evento CAPI registrado');
  assert.equal(JSON.parse(ev.payload).user_data.ctwa_clid, 'ARAkLkA8rmlFeiCktEJQ');
  assert.equal(JSON.parse(ev.payload).action_source, 'business_messaging');
});

test('el cupo ocupado ya no se ofrece a otra persona (capacidad 1 por cabina)', async () => {
  const libres = agenda.horasDisponibles('facial', '2026-11-05');
  assert.ok(!libres.includes('10:00'), 'misma cabina ocupada');
  assert.ok(!libres.includes('09:30'), 'facial de 60 min chocaría con la cita de las 10');
  assert.ok(!libres.includes('10:30'));
  assert.ok(libres.includes('11:30'), 'después de cita + pausa de 10 min (11:10) queda libre 11:30');
  assert.ok(agenda.horasDisponibles('laser', '2026-11-05').includes('10:00'), 'láser usa otro recurso');
  assert.throws(() => agenda.reservar({ wa_id: '573009999999', servicioId: 'masaje', inicio: '2026-11-05T10:00' }), agenda.CupoOcupadoError);
});

test('texto libre: fecha y hora escritas, FAQ y precio sin inventar', async () => {
  const W = '573004445566';
  let r = await escribe(W, { texto: 'buenas tardes', nombre: 'Ana' });
  assert.match(r[0].cuerpo, /Hola Ana/);
  r = await escribe(W, { texto: 'dónde quedan?' });
  assert.match(r[0].cuerpo, /Calle 8 #12-59/);
  r = await escribe(W, { texto: 'cuánto vale la mesoterapia facial' });
  assert.match(r[0].cuerpo, /Mesoterapia facial/);
  assert.match(r[0].cuerpo, /te lo confirma el equipo/);
  r = await escribe(W, { texto: 'quiero agendar' });
  assert.ok(ids(r[0])[0].startsWith('day:'));
  r = await escribe(W, { texto: 'el viernes' });
  assert.match(r[0].cuerpo, /viernes 6 de noviembre/);
  r = await escribe(W, { texto: 'a las 3 de la tarde' });
  assert.match(r[0].cuerpo, /A nombre de quién/);
  r = await escribe(W, { texto: 'Ana María Ríos' });
  assert.match(r[0].cuerpo, /3:00 p\. m\./);
  r = await escribe(W, { texto: 'sí, confirmo' });
  assert.match(r[0].cuerpo, /quedó agendada/);
  assert.equal(db.citasActivasDe(W)[0].inicio, '2026-11-06T15:00');
});

test('"quiero agendar el sábado a las 10" salta directo a confirmar nombre', async () => {
  const W = '573109998877';
  await escribe(W, { texto: 'Hola, vi HAZ ESPACIO y quiero información sobre cuidado facial', nombre: 'Ana Ríos' });
  let r = await escribe(W, { texto: 'quiero agendar el sábado a las 10' });
  assert.match(r[0].cuerpo, /A nombre de quién/);
  r = await escribe(W, { reply_id: 'nom:perfil' });
  assert.match(r[0].cuerpo, /sábado 7 de noviembre/);
  assert.match(r[0].cuerpo, /10:00 a\. m\./);
  await escribe(W, { reply_id: 'conf:cambiar' });
  // hora ocupada/inexistente: ofrece la más cercana
  r = await escribe(W, { texto: 'mejor el sábado a las 6 de la tarde' });
  assert.match(r[0].cuerpo, /no tengo cupo ese día; lo más cercano es/);
});

test('láser queda marcado para revisión del equipo', async () => {
  const W = '573007778899';
  await escribe(W, { texto: 'Hola, vi LASER y quiero información sobre depilación', nombre: 'Sara' });
  await escribe(W, { reply_id: 'act:agendar:laser' });
  await escribe(W, { reply_id: 'day:2026-11-07' });
  await escribe(W, { reply_id: 'slot:2026-11-07T09:00' });
  await escribe(W, { reply_id: 'nom:perfil' });
  const r = await escribe(W, { reply_id: 'conf:si' });
  assert.match(r[0].cuerpo, /Una asesora revisará tu caso/);
  assert.equal(db.citasActivasDe(W)[0].requiere_revision, 1);
});

test('temas de salud y pedido de asesora pausan el bot', async () => {
  const W = '573001230000';
  let r = await escribe(W, { texto: 'hola, estoy embarazada, puedo hacerme el masaje?' });
  assert.match(r[0].cuerpo, /una asesora revisará tu caso/i);
  assert.ok(db.obtenerContacto(W).bot_pausado > 0);
  assert.equal(db.obtenerContacto(W).etapa, 'Requiere asesora');
  r = await escribe(W, { texto: 'hola?' });
  assert.equal(r.length, 0, 'mientras atiende el equipo, el bot no responde');
  bot.reactivarBot(W);
  r = await escribe(W, { texto: 'quiero ver los servicios' });
  assert.ok(r.length > 0);
});

test('reprogramar y cancelar desde el chat', async () => {
  const W = '573004445566';
  const cita = db.citasActivasDe(W)[0];
  let r = await escribe(W, { texto: 'necesito cambiar la cita' });
  assert.ok(ids(r[0])[0].startsWith('day:'));
  r = await escribe(W, { reply_id: 'day:2026-11-10' });
  r = await escribe(W, { reply_id: 'slot:2026-11-10T11:00' });
  assert.match(r[0].cuerpo, /nuevo horario/);
  r = await escribe(W, { reply_id: 'conf:si' });
  assert.match(r[0].cuerpo, /movimos tu cita/);
  assert.equal(db.obtenerCita(cita.id).inicio, '2026-11-10T11:00');
  r = await escribe(W, { texto: 'quiero cancelar' });
  assert.ok(ids(r[0]).includes(`cita:cancelar_ok:${cita.id}`));
  r = await escribe(W, { reply_id: `cita:cancelar_ok:${cita.id}` });
  assert.equal(db.obtenerCita(cita.id).estado, 'cancelada');
  assert.equal(db.obtenerContacto(W).etapa, 'Seguimiento');
});

test('recordatorio del día anterior y seguimiento a quien no agendó', async () => {
  // Jueves 5 nov 9:00: la cita de Laura (5 nov 10:00) ya entró en la ventana de 24 h → recordatorio
  fijarReloj(aMs('2026-11-04T16:00'));
  const res = await ejecutarTareas();
  assert.ok(res.recordatorios >= 1);
  const W = '573001112233';
  const rec = db.mensajesDe(W).filter(m => m.direccion === 'out').pop();
  assert.match(rec.cuerpo, /te recordamos tu cita/);
  assert.ok(ids(rec).some(i => i.startsWith('cita:confirmar:')));
  const r = await escribe(W, { reply_id: ids(rec)[0] });
  assert.match(r[0].cuerpo, /Gracias por confirmar/);
  assert.equal(db.citasActivasDe(W)[0].estado, 'confirmada');

  // Contacto que preguntó y no agendó: seguimiento a las ~20 h
  const S = '573005550000';
  fijarReloj(aMs('2026-11-04T10:00'));
  await escribe(S, { texto: 'info del facial', nombre: 'Paula' });
  fijarReloj(aMs('2026-11-05T07:00') + 0); // fuera de horario de envío (antes de 8 a. m.)
  await ejecutarTareas();
  assert.equal(db.obtenerContacto(S).seguimiento1, 0);
  fijarReloj(aMs('2026-11-05T08:30'));
  await ejecutarTareas();
  assert.equal(db.obtenerContacto(S).seguimiento1, 1);
  assert.match(db.mensajesDe(S).pop().cuerpo, /te quedó alguna duda/);
});

test('baja de mensajes', async () => {
  const W = '573006660000';
  await escribe(W, { texto: 'hola' });
  const r = await escribe(W, { texto: 'no quiero mensajes por favor' });
  assert.match(r[0].cuerpo, /No te enviaremos más mensajes/);
  assert.equal(db.obtenerContacto(W).baja, 1);
});

test('webhook: firma y lectura de referral CTWA', () => {
  const body = { entry: [{ changes: [{ value: {
    contacts: [{ wa_id: '573001112233', profile: { name: 'Laura' } }],
    messages: [{ from: '573001112233', id: 'wamid.X', type: 'text', text: { body: 'Hola, vi RITUAL' },
      referral: { source_url: 'https://fb.me/1', source_id: '999', source_type: 'ad', headline: 'Tu próximo ritual', ctwa_clid: 'CLID1' } }],
  } }] }] };
  const m = wa.parsearWebhook(body)[0];
  assert.equal(m.referral.ctwa_clid, 'CLID1');
  assert.equal(m.referral.source_id, '999');
  assert.equal(m.nombre_perfil, 'Laura');
  const btn = wa.parsearWebhook({ entry: [{ changes: [{ value: { messages: [{ from: '1', id: 'w2', type: 'interactive', interactive: { type: 'list_reply', list_reply: { id: 'day:2026-11-05', title: 'Jue 5 nov' } } }] } }] }] })[0];
  assert.equal(btn.reply_id, 'day:2026-11-05');
  const g = wa.aPayloadGraph('57300', { tipo: 'lista', texto: 'x', boton: 'Ver horarios con nombre largo', secciones: [{ titulo: 'H', filas: Array.from({ length: 12 }, (_, i) => ({ id: 'r' + i, titulo: 'Fila con un título demasiado largo ' + i })) }] });
  assert.equal(g.interactive.action.sections[0].rows.length, 10);
  assert.ok(g.interactive.action.sections[0].rows[0].title.length <= 24);
  assert.ok(g.interactive.action.button.length <= 20);
});

test('firma HMAC del webhook', async () => {
  process.env.META_APP_SECRET = 's3cr3t';
  const { env } = await import('../src/config.js');
  env.META_APP_SECRET = 's3cr3t';
  const raw = Buffer.from('{"a":1}');
  const sig = 'sha256=' + crypto.createHmac('sha256', 's3cr3t').update(raw).digest('hex');
  assert.equal(wa.firmaValida(raw, sig), true);
  assert.equal(wa.firmaValida(raw, 'sha256=' + '0'.repeat(64)), false);
  env.META_APP_SECRET = '';
});
