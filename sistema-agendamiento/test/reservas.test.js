// Página pública de reservas: API, reglas de agenda compartidas con el bot y compatibilidad con WhatsApp.
import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';

process.env.WA_TOKEN = '';
process.env.PANEL_PASSWORD = '';
process.env.SIMULADOR = '1';
process.env.TRUST_PROXY = '1';                // el límite por IP lee X-Forwarded-For: cada prueba usa su propia IP
process.env.RESERVAS_MAX_POR_HORA = '100';
process.env.PUBLIC_URL = 'https://agenda.valenciastetic.test';

const { fijarReloj, aMs } = await import('../src/tiempo.js');
const db = await import('../src/db.js');
const bot = await import('../src/bot.js');
const { crearServidor } = await import('../src/server.js');

fijarReloj(aMs('2026-11-04T10:00')); // miércoles
let srv, base, ipN = 0;
before(async () => {
  db.abrirDb(':memory:');
  srv = crearServidor();
  await new Promise(r => srv.listen(0, r));
  base = `http://127.0.0.1:${srv.address().port}`;
});
after(() => srv.close());

const ip = () => `10.1.${Math.floor(++ipN / 250)}.${ipN % 250}`;
const llamar = (metodo, ruta, cuerpo, ipFija) => fetch(base + ruta, { method: metodo, headers: { 'Content-Type': 'application/json', 'X-Forwarded-For': ipFija || ip() }, body: cuerpo ? JSON.stringify(cuerpo) : undefined })
  .then(async r => ({ status: r.status, headers: r.headers, body: await r.json().catch(() => null) }));
const get = (r, ipFija) => llamar('GET', r, null, ipFija);
const post = (r, b, ipFija) => llamar('POST', r, b, ipFija);
const datos = (o = {}) => ({ servicios: ['facial'], inicio: '2026-11-05T14:00', nombre: 'Laura Gómez', pais: '57', telefono: '3001110001', email: '', notas: '', acepto: true, sitio: '', ref: {}, ...o });
const tokenDe = r => r.body.token;

test('configuración pública: servicios, horario y nada inventado ni secreto', async () => {
  const r = await get('/api/publico/config');
  assert.equal(r.status, 200);
  assert.equal(r.body.servicios.length, 49, 'catálogo completo de la lista de precios del centro');
  const porId = id => r.body.servicios.find(s => s.id === id);
  assert.equal(porId('facial').precio, 100000); assert.equal(porId('reductor_pro').precio, 1185000); assert.equal(porId('laser_pierna').precio, 200000);
  for (const id of ['mesoterapia', 'cauterizacion', 'tatuajes', 'sueroterapia']) assert.ok(porId(id).precio === null && porId(id).precio_nota, `${id}: valor variable, no se inventa`);
  assert.ok(r.body.servicios.every(s => s.descripcion && s.descripcion.length <= 215 && s.categoria), 'cada servicio trae su texto breve y categoría');
  assert.equal(r.body.categorias.length, 8);
  assert.equal(r.body.negocio.galeria.length, 0, 'sin galería por ahora');
  assert.equal(r.body.negocio.horario.length, 7);
  assert.equal(r.body.negocio.horario[6].texto, 'Cerrado');            // domingo
  assert.equal(r.body.negocio.horario[0].texto, '8:00 a. m. a 6:00 p. m.');
  assert.ok(porId('postop').solo && porId('postop').revisar_condiciones && porId('postop20').solo);
  assert.ok(porId('laser').solo && porId('laser_pecho').solo, 'láser: cita de orientación, solo con otras zonas láser');

  assert.equal((await get('/api/publico/disponibilidad?servicios=postop,masaje')).status, 422, 'el masaje postoperatorio se agenda solo');
  assert.equal((await get('/api/publico/disponibilidad?servicios=laser,laser_pecho,laser_bikini')).status, 200, 'varias zonas de láser en una visita');
  assert.equal((await get('/api/publico/disponibilidad?servicios=laser,facial')).status, 422, 'el láser no se mezcla con otras categorías');
  assert.equal((await get('/api/publico/disponibilidad?servicios=facial,lifting,cejas,masaje,body_detox,dermapen')).status, 200, 'hasta 6 servicios');
  assert.equal((await get('/api/publico/disponibilidad?servicios=facial,lifting,cejas,masaje,body_detox,dermapen,nctf')).status, 422, 'más de 6 no');
  assert.equal((await get('/api/publico/disponibilidad?servicios=postop')).status, 200);
  assert.equal(r.body.servicios.find(s => s.id === 'facial').foto, 'fotos/facial.jpg');
  assert.ok(r.body.servicios.filter(s => s.id !== 'facial').every(s => s.foto === null), 'solo la limpieza facial tiene foto');
  assert.ok(r.body.servicios.every(s => s.duracion_min === 30), 'cada servicio ocupa 30 min de agenda');
  assert.equal((await fetch(base + '/reservas/fotos/facial.jpg')).headers.get('content-type'), 'image/jpeg');
  assert.equal((await fetch(base + '/reservas/fotos/..%2Fapp.js')).status, 404);
  assert.equal(r.body.negocio.confianza, 'Más de 10 años de experiencia');
  assert.equal(r.body.negocio.direccion, 'Calle 8 #12-59, Pereira');
  assert.equal(r.body.negocio.telefono, '+573145301120');
  assert.equal(r.body.whatsapp.numero, null, 'el 314 530 1120 es solo teléfono: sin línea de WhatsApp no hay botón de WhatsApp');
  const op = r.body.negocio.opiniones;
  assert.ok(op && op.puntuacion === 4.9 && op.total === 145 && op.items.length === 3 && op.items.every(i => i.estrellas === 5 && i.texto && i.autor));
  const texto = JSON.stringify(r.body);
  assert.ok(!/PANEL_PASSWORD|SESSION_SECRET|WA_TOKEN|META_APP_SECRET|ANTHROPIC/i.test(texto));
});

test('páginas y archivos: se sirven, no hay rutas arbitrarias y llevan cabeceras de seguridad', async () => {
  for (const ruta of ['/reservas', '/reservas/reservar', '/reservas/mis-citas', '/reservas/privacidad', '/reservas/cita/AbCdEfGhIjKlMnOpQrStUvWx']) {
    const r = await fetch(base + ruta);
    assert.equal(r.status, 200, ruta);
    assert.match(await r.text(), /<div id="app"/);
    assert.match(r.headers.get('content-security-policy'), /frame-ancestors 'self'/);
    assert.equal(r.headers.get('x-content-type-options'), 'nosniff');
  }
  assert.equal((await fetch(base + '/reservas/app.js')).headers.get('content-type').split(';')[0], 'text/javascript');
  for (const mala of ['/reservas/../src/config.js', '/reservas/..%2fsrc%2fconfig.js', '/reservas/.env', '/reservas/index.html', '/reservas/cita/corto', '/reservas/data/agenda.sqlite'])
    assert.equal((await fetch(base + mala)).status, 404, mala);
  const raiz = await fetch(base + '/', { redirect: 'manual' });
  assert.equal(raiz.status, 302);
  assert.equal(raiz.headers.get('location'), '/reservas');
});

test('el panel y la API interna NO quedan expuestos por la API pública', async () => {
  for (const ruta of ['/api/publico/citas', '/api/publico/contactos', '/api/publico/resumen', '/api/publico/cita/x']) assert.ok([404, 405].includes((await get(ruta)).status), ruta);
});

test('disponibilidad: días, horas, combinaciones válidas y entradas inválidas', async () => {
  const dias = await get('/api/publico/disponibilidad?servicios=facial');
  assert.equal(dias.status, 200);
  assert.ok(dias.body.dias.length >= 5);
  assert.ok(dias.body.dias.every(d => d.fecha >= '2026-11-04'));
  assert.ok(!dias.body.dias.some(d => d.fecha === '2026-11-08'), 'domingo cerrado');
  const horas = await get('/api/publico/disponibilidad?servicios=facial&fecha=2026-11-05');
  assert.ok(horas.body.horas.includes('09:00') && horas.body.horas.includes('14:00'));
  assert.equal(horas.body.duracion_min, 30);
  const hoy = await get('/api/publico/disponibilidad?servicios=facial&fecha=2026-11-04'); // son las 10:00; anticipación mínima 2 h
  assert.ok(!hoy.body.horas.includes('11:00') && hoy.body.horas.includes('12:00'));
  assert.equal((await get('/api/publico/disponibilidad?servicios=inexistente')).status, 422);
  assert.equal((await get('/api/publico/disponibilidad?servicios=laser,facial')).status, 422, 'el láser se agenda solo');
  assert.equal((await get('/api/publico/disponibilidad?servicios=facial,masaje,cejas,facial')).status, 200, 'se ignoran repetidos');
  assert.equal((await get('/api/publico/disponibilidad?servicios=')).status, 422);
  assert.equal((await get('/api/publico/disponibilidad?servicios=facial&fecha=hoy')).status, 400);
  const combo = await get('/api/publico/disponibilidad?servicios=facial,masaje&fecha=2026-11-09');
  assert.equal(combo.body.duracion_min, 70);
  assert.ok(combo.body.horas.includes('09:00') && !combo.body.horas.includes('17:30'), 'la visita completa debe caber en el horario');
});

test('reservar: la cita entra al panel, bloquea el cupo y se confirma por WhatsApp', async () => {
  const r = await post('/api/publico/citas', datos({ email: 'laura@example.com', ref: { cod: 'HAZ ESPACIO', src: 'bot' } }));
  assert.equal(r.status, 200, JSON.stringify(r.body));
  assert.match(r.body.codigo, /^VS-[A-HJ-NP-Z2-9]{6}$/);
  assert.ok(r.body.token.length >= 30);
  assert.equal(r.body.citas.length, 1);
  assert.equal(r.body.citas[0].servicio_id, 'facial');
  assert.match(r.body.whatsapp_texto, new RegExp(r.body.codigo));
  assert.match(r.body.simulador, /\/simulador\?tel=573001110001/);          // en simulación se ofrece probar el chat
  // panel (misma base y mismas tablas que el bot)
  const citas = await get('/api/citas?desde=2026-11-05&hasta=2026-11-06');
  const c = citas.body.find(x => x.wa_id === '573001110001');
  assert.ok(c);
  assert.equal(c.origen, 'web'); assert.equal(c.nombre, 'Laura Gómez'); assert.equal(c.inicio, '2026-11-05T14:00'); assert.equal(c.grupo, r.body.codigo);
  const contacto = db.obtenerContacto('573001110001');
  assert.equal(contacto.etapa, 'Cita agendada'); assert.equal(contacto.email, 'laura@example.com');
  assert.equal(contacto.codigo_anuncio, 'HAZ ESPACIO', 'el anuncio de origen queda para los resultados por anuncio');
  // confirmación por WhatsApp registrada con botones del bot
  const salientes = db.mensajesDe('573001110001').filter(m => m.direccion === 'out');
  assert.equal(salientes.length, 1);
  assert.match(salientes[0].cuerpo, new RegExp(r.body.codigo));
  assert.match(salientes[0].cuerpo, /Confirmo asistencia/);
  assert.equal(salientes[0].autor, 'sistema');
  // el cupo ya no se ofrece, ni en la web ni al bot
  const horas = await get('/api/publico/disponibilidad?servicios=facial&fecha=2026-11-05');
  assert.ok(!horas.body.horas.includes('14:00'));
  const otra = await post('/api/publico/citas', datos({ telefono: '3001110002', nombre: 'Marta Ruiz' }));
  assert.equal(otra.status, 409); assert.match(otra.body.error, /horario/i);
  const masaje = await post('/api/publico/citas', datos({ telefono: '3001110002', nombre: 'Marta Ruiz', servicios: ['masaje'], inicio: '2026-11-05T14:30' }));
  assert.equal(masaje.status, 409, 'cabina compartida: el masaje también choca con el facial');
});

test('reservar: validaciones del servidor (no se confía en el navegador)', async () => {
  const casos = [
    [{ acepto: false }, /aceptar/i], [{ nombre: 'Ab' }, /nombre/i], [{ nombre: 'http://spam.com' }, /nombre/i],
    [{ telefono: '300111000' }, /celular/i], [{ telefono: '2001110001' }, /celular/i], [{ pais: '999' }, /indicativo/i],
    [{ email: 'no-es-correo' }, /correo/i], [{ servicios: ['inexistente'] }, /existe/i], [{ servicios: [] }, /servicio/i],
    [{ servicios: ['facial', 'masaje', 'cejas', 'lifting', 'laser'] }, /hasta 4|orientación|solos/i], [{ inicio: '2026-11-05 14:00' }, /fecha/i], [{ inicio: '' }, /fecha/i],
  ];
  for (const [mal, esperado] of casos) {
    const r = await post('/api/publico/citas', datos({ telefono: '3001119999', ...mal }));
    assert.ok([409, 422].includes(r.status) && esperado.test(r.body.error), `${JSON.stringify(mal)} → ${r.status} ${r.body?.error}`);
  }
  for (const inicio of ['2026-11-05T03:00', '2026-11-05T13:10', '2026-11-08T10:00', '2026-11-03T10:00', '2026-12-30T10:00', '2026-11-04T10:30']) {
    const r = await post('/api/publico/citas', datos({ telefono: '3001119999', inicio }));
    assert.equal(r.status, 409, `${inicio} no debe poder reservarse`);
  }
  assert.equal(db.getDb().prepare("SELECT COUNT(*) n FROM citas WHERE wa_id = '573001119999'").get().n, 0, 'ninguna reserva inválida debe quedar guardada');
});

test('reservar: texto con HTML se limpia y el campo trampa de los bots no guarda nada', async () => {
  const r = await post('/api/publico/citas', datos({ telefono: '3001118888', inicio: '2026-11-06T10:00', nombre: 'Ana <b>Pérez</b>', notas: 'hola <script>alert(1)</script>' }));
  assert.equal(r.status, 200);
  const c = db.getDb().prepare("SELECT * FROM citas WHERE wa_id = '573001118888'").get();
  assert.ok(!/[<>]/.test(c.nombre) && !/[<>]/.test(c.notas));
  const antes = db.getDb().prepare('SELECT COUNT(*) n FROM citas').get().n;
  const bot_ = await post('/api/publico/citas', datos({ telefono: '3001117777', inicio: '2026-11-06T15:00', sitio: 'soy un bot' }));
  assert.equal(bot_.status, 200);
  assert.equal(db.getDb().prepare('SELECT COUNT(*) n FROM citas').get().n, antes, 'el campo trampa no crea citas');
});

test('varios servicios: citas seguidas en la misma reserva, se cancelan y se mueven juntas', async () => {
  const r = await post('/api/publico/citas', datos({ telefono: '3001112001', servicios: ['facial', 'masaje'], inicio: '2026-11-09T10:00' }));
  assert.equal(r.status, 200, JSON.stringify(r.body));
  assert.deepEqual(r.body.citas.map(c => [c.servicio_id, c.inicio]), [['facial', '2026-11-09T10:00'], ['masaje', '2026-11-09T10:40']]); // 30 min + 10 de pausa
  const filas = db.citasDelGrupo(r.body.codigo);
  assert.equal(filas.length, 2);
  assert.equal(filas.filter(c => c.token).length, 1, 'solo la primera lleva el enlace privado');
  assert.equal(db.getDb().prepare("SELECT COUNT(*) n FROM mensajes WHERE wa_id = '573001112001' AND direccion = 'out'").get().n, 1, 'una sola confirmación por reserva');
  const token = tokenDe(r);
  // al dueño le sigue apareciendo su propio horario como libre para cambiarlo; a los demás no
  assert.ok(!(await get('/api/publico/disponibilidad?servicios=facial,masaje&fecha=2026-11-09')).body.horas.includes('10:00'));
  assert.ok((await get(`/api/publico/cita/${token}/disponibilidad?fecha=2026-11-09`)).body.horas.includes('10:00'));
  // reprogramar mueve las dos
  const mov = await post(`/api/publico/cita/${token}/reprogramar`, { inicio: '2026-11-10T15:00' });
  assert.equal(mov.status, 200, JSON.stringify(mov.body));
  assert.deepEqual(db.citasDelGrupo(r.body.codigo).map(c => [c.servicio_id, c.inicio]), [['facial', '2026-11-10T15:00'], ['masaje', '2026-11-10T15:40']]);
  assert.equal((await post(`/api/publico/cita/${token}/reprogramar`, { inicio: '2026-11-10T18:30' })).status, 409, 'no cabe antes del cierre');
  // cancelar libera todo
  const can = await post(`/api/publico/cita/${token}/cancelar`, {});
  assert.equal(can.status, 200); assert.equal(can.body.estado, 'cancelada');
  assert.ok(db.citasDelGrupo(r.body.codigo).every(c => c.estado === 'cancelada'));
  assert.ok((await get('/api/publico/disponibilidad?servicios=facial,masaje&fecha=2026-11-10')).body.horas.includes('15:00'));
  assert.equal((await post(`/api/publico/cita/${token}/cancelar`, {})).status, 409, 'ya estaba cancelada');
});

test('enlace privado de la reserva: datos mínimos, sin teléfono completo y sin adivinar', async () => {
  const r = await post('/api/publico/citas', datos({ telefono: '3001113001', inicio: '2026-11-11T09:00' }));
  const v = await get(`/api/publico/cita/${tokenDe(r)}`);
  assert.equal(v.status, 200);
  assert.equal(v.body.telefono, '••••3001'); assert.equal(v.body.nombre, 'Laura');
  assert.ok(v.body.puede_cambiar);
  assert.ok(!JSON.stringify(v.body).includes('573001113001'));
  assert.equal((await get('/api/publico/cita/' + 'x'.repeat(30))).status, 404);
  assert.equal((await get('/api/publico/cita/corto')).status, 404);
  assert.equal((await get('/api/publico/cita/' + r.body.codigo.padEnd(24, 'A'))).status, 404, 'el código de reserva no sirve como llave');
});

test('límite de reservas activas por persona y cambios con plazo mínimo', async () => {
  const tel = '3001114001';
  assert.equal((await post('/api/publico/citas', datos({ telefono: tel, inicio: '2026-11-12T09:00' }))).status, 200);
  assert.equal((await post('/api/publico/citas', datos({ telefono: tel, servicios: ['masaje'], inicio: '2026-11-12T12:00' }))).status, 200);
  const tercera = await post('/api/publico/citas', datos({ telefono: tel, servicios: ['cejas'], inicio: '2026-11-12T16:00' }));
  assert.equal(tercera.status, 409); assert.match(tercera.body.error, /reservas activas/i);
  // con plazo configurado (3 h), no se puede cancelar a última hora
  const { negocio } = await import('../src/config.js');
  const r = await post('/api/publico/citas', datos({ telefono: '3001114002', inicio: '2026-11-04T12:00' }));
  assert.equal(r.status, 200);
  negocio.agenda.cambios_hasta_horas = 3;
  try {
    const v = await get(`/api/publico/cita/${tokenDe(r)}`);
    assert.equal(v.body.puede_cambiar, false); assert.equal(v.body.plazo_horas, 3);
    const can = await post(`/api/publico/cita/${tokenDe(r)}/cancelar`, {});
    assert.equal(can.status, 409); assert.match(can.body.error, /plazo/i);
  } finally { negocio.agenda.cambios_hasta_horas = null; }
});

test('láser: cita de orientación marcada para revisión; notas de salud pasan al equipo', async () => {
  const l = await post('/api/publico/citas', datos({ telefono: '3001115001', servicios: ['laser'], inicio: '2026-11-13T10:00' }));
  assert.equal(l.status, 200);
  assert.equal(l.body.citas[0].orientacion, true);
  assert.equal(db.getDb().prepare("SELECT requiere_revision FROM citas WHERE wa_id = '3001115001' OR wa_id = '573001115001'").get().requiere_revision, 1);
  const s = await post('/api/publico/citas', datos({ telefono: '3001115002', inicio: '2026-11-13T15:00', notas: 'estoy embarazada' }));
  assert.equal(s.status, 200); assert.equal(s.body.revisar, true);
  assert.equal(db.getDb().prepare("SELECT requiere_revision FROM citas WHERE wa_id = '573001115002'").get().requiere_revision, 1);
});

test('límite de abusos: demasiadas reservas desde la misma IP', async () => {
  process.env.RESERVAS_MAX_POR_HORA = '3';
  try {
    const mi = '172.16.9.9';
    const codigos = [];
    for (let i = 0; i < 4; i++) codigos.push((await post('/api/publico/citas', datos({ nombre: 'x' }), mi)).status);
    assert.deepEqual(codigos, [422, 422, 422, 429]);
    assert.equal((await get('/api/publico/config', '172.16.9.10')).status, 200, 'otra IP no se afecta');
  } finally { process.env.RESERVAS_MAX_POR_HORA = '100'; }
});

test('compatibilidad con el bot: la persona escribe su código y gestiona la reserva por WhatsApp', async () => {
  const r = await post('/api/publico/citas', datos({ telefono: '3001116001', servicios: ['facial', 'masaje'], inicio: '2026-11-17T09:00', nombre: 'Sofía Mejía' }));
  assert.equal(r.status, 200, JSON.stringify(r.body));
  const wa ='573001116001', msg = (texto, extra = {}) => bot.procesarEntrante({ wa_id: wa, nombre_perfil: 'Sofía', wamid: `wamid.${Math.random()}`, tipo: 'text', texto, ...extra });
  const ultimo = () => db.mensajesDe(wa).filter(m => m.direccion === 'out').at(-1);
  await msg(`Hola, reservé en la web con el código ${r.body.codigo.toLowerCase()} y quiero confirmar mi cita en Valencia Stetic.`);
  assert.match(ultimo().cuerpo, /recibí tu reserva/i);
  assert.match(ultimo().cuerpo, /Limpieza facial básica \+ Masaje relajante premium/);
  assert.match(ultimo().cuerpo, /Confirmo asistencia/);
  // confirmar confirma toda la reserva (los dos servicios)
  const idPrincipal = db.citasDelGrupo(r.body.codigo)[0].id;
  await msg('Confirmo asistencia', { tipo: 'interactive', reply_id: `cita:confirmar:${idPrincipal}` });
  assert.deepEqual(db.citasDelGrupo(r.body.codigo).map(c => c.estado), ['confirmada', 'confirmada']);
  // reprogramar una reserva con varios servicios envía el enlace de la web (se mueven juntos)
  await msg('Cambiar horario', { tipo: 'interactive', reply_id: `cita:reprogramar:${idPrincipal}` });
  assert.match(ultimo().cuerpo, new RegExp(`/reservas/cita/${tokenDe(r)}`));
  // cancelar desde el chat cancela todos los servicios de la reserva
  await msg('Sí, cancelar', { tipo: 'interactive', reply_id: `cita:cancelar_ok:${idPrincipal}` });
  assert.deepEqual(db.citasDelGrupo(r.body.codigo).map(c => c.estado), ['cancelada', 'cancelada']);
  // código inexistente y código de otro número
  const previos = db.mensajesDe(wa).length;
  await msg('mi reserva es VS-ZZZZZZ');
  assert.match(db.mensajesDe(wa).slice(previos).filter(m => m.direccion === 'out').map(m => m.cuerpo).join('\n'), /No encuentro esa reserva/); // y luego ofrece el menú
  const ajeno = await post('/api/publico/citas', datos({ telefono: '3001116002', inicio: '2026-11-17T15:00' }));
  const previos2 = db.mensajesDe(wa).length;
  await msg(`código ${ajeno.body.codigo}`);
  const respuesta = db.mensajesDe(wa).slice(previos2).filter(m => m.direccion === 'out').map(m => m.cuerpo).join('\n');
  assert.match(respuesta, /otro número/i);
  assert.match(respuesta, /asesora/i);
  assert.ok(db.obtenerContacto(wa).bot_pausado > 0, 'un código ajeno pasa a una asesora');
  assert.equal(db.citasDelGrupo(ajeno.body.codigo)[0].estado, 'agendada', 'y no toca la cita de la otra persona');
});

test('compatibilidad con el bot: el bot ofrece el enlace de la página y la cita web hereda el anuncio (CAPI)', async () => {
  const wa = '573001117001';
  await bot.procesarEntrante({ wa_id: wa, nombre_perfil: 'Camila', wamid: 'wamid.ad1', tipo: 'text', texto: 'Hola, vi PAUSA y quiero información sobre masaje relajante', referral: { source_id: '555', source_type: 'ad', ctwa_clid: 'CLID-WEB-1' } });
  const ficha = db.mensajesDe(wa).filter(m => m.direccion === 'out').map(m => m.cuerpo).join('\n');
  assert.match(ficha, /También puedes reservar en línea: https:\/\/agenda\.valenciastetic\.test\/reservas\/reservar\?servicio=masaje/);
  const antes = db.mensajesDe(wa).length;
  await bot.procesarEntrante({ wa_id: wa, wamid: 'wamid.ad2', tipo: 'text', texto: '¿tienen página web para reservar?' });
  assert.match(db.mensajesDe(wa).slice(antes).filter(m => m.direccion === 'out').map(m => m.cuerpo).join('\n'), /\/reservas\/reservar\?servicio=masaje/);
  // la misma persona reserva en la web: la cita conserva el clic del anuncio y manda el evento a Meta (en simulación queda registrado)
  const r = await post('/api/publico/citas', datos({ telefono: '3001117001', servicios: ['masaje'], inicio: '2026-11-18T10:00', ref: { cod: 'PAUSA' } }));
  assert.equal(r.status, 200);
  await new Promise(res => setTimeout(res, 30));
  assert.equal(db.getDb().prepare('SELECT ctwa_clid FROM citas WHERE wa_id = ?').get(wa).ctwa_clid, 'CLID-WEB-1');
  const ev = db.ultimosEventosCapi(10).find(e => e.wa_id === wa);
  assert.ok(ev, 'evento de cita hacia Meta'); assert.equal(ev.estado, 'simulado');
});

test('migración: una base anterior (sin token, grupo ni email) se actualiza sin perder citas y es idempotente', async () => {
  const { DatabaseSync } = await import('node:sqlite');
  const os = await import('node:os'), path = await import('node:path'), fs = await import('node:fs');
  const archivo = path.join(fs.mkdtempSync(path.join(os.tmpdir(), 'vs-')), 'vieja.sqlite');
  const d = new DatabaseSync(archivo);
  d.exec(`CREATE TABLE contactos (wa_id TEXT PRIMARY KEY, nombre TEXT, nombre_perfil TEXT, estado TEXT, estado_datos TEXT DEFAULT '{}', etapa TEXT DEFAULT 'Nuevo', bot_pausado INTEGER DEFAULT 0, baja INTEGER DEFAULT 0, servicio_interes TEXT, fallos INTEGER DEFAULT 0, ad_id TEXT, ctwa_clid TEXT, source_url TEXT, source_type TEXT, ad_headline TEXT, ad_body TEXT, codigo_anuncio TEXT, primer_contacto INTEGER, ultimo_entrante INTEGER, ultimo_saliente INTEGER, seguimiento1 INTEGER DEFAULT 0, seguimiento2 INTEGER DEFAULT 0, notas TEXT);
    CREATE TABLE citas (id INTEGER PRIMARY KEY AUTOINCREMENT, wa_id TEXT NOT NULL, nombre TEXT, servicio_id TEXT NOT NULL, inicio TEXT NOT NULL, fin TEXT NOT NULL, recurso TEXT NOT NULL, estado TEXT NOT NULL DEFAULT 'agendada', requiere_revision INTEGER DEFAULT 0, precio INTEGER, valor_cobrado INTEGER, ad_id TEXT, codigo_anuncio TEXT, ctwa_clid TEXT, origen TEXT DEFAULT 'bot', recordatorio1 INTEGER DEFAULT 0, recordatorio2 INTEGER DEFAULT 0, gracias INTEGER DEFAULT 0, notas TEXT, creado INTEGER NOT NULL, actualizado INTEGER);
    INSERT INTO contactos (wa_id, nombre) VALUES ('573000000009', 'Clienta Antigua');
    INSERT INTO citas (wa_id, nombre, servicio_id, inicio, fin, recurso, creado) VALUES ('573000000009', 'Clienta Antigua', 'facial', '2026-11-20T10:00', '2026-11-20T11:10', 'cabina', 1);`);
  d.close();
  db.abrirDb(archivo);
  db.abrirDb(archivo); // segunda apertura: no debe fallar por columnas ya agregadas
  const cols = t => db.getDb().prepare(`PRAGMA table_info(${t})`).all().map(c => c.name);
  assert.ok(cols('citas').includes('token') && cols('citas').includes('grupo') && cols('contactos').includes('email'));
  assert.equal(db.obtenerCita(1).nombre, 'Clienta Antigua');
  assert.equal(db.obtenerContacto('573000000009').nombre, 'Clienta Antigua');
});

test('asistente web + demostración: del anuncio a la cita y a la conversión; sin demo no hay vista del equipo', async () => {
  process.env.MODO_DEMO = '1';
  try {
    const sid = '1700000000001', conv = (b, i) => post('/api/publico/asistente', { sid, nombre: 'Valentina Demo', ...b }, i);
    assert.equal((await get('/api/publico/config')).body.asistente.demo, true);
    assert.equal((await post('/api/publico/asistente', { sid: 'x', texto: 'Hola' })).status, 400, 'sesión inválida');
    let r = await conv({ texto: 'Hola, vi HAZ ESPACIO y quiero información sobre limpieza facial', referral: { headline: 'Haz espacio para ti' } });
    assert.equal(r.status, 200);
    const ids = ms => ms.flatMap(m => (m.payload?.botones || []).map(b => b.id).concat((m.payload?.secciones || []).flatMap(s => s.filas.map(f => f.id))));
    const elegir = async (pref, n = 0) => { const o = ids(r.body.mensajes).filter(x => x.startsWith(pref)); assert.ok(o.length, `sin opción ${pref}`); r = await conv({ reply_id: o[Math.min(n, o.length - 1)], texto: 'x' }); };
    await elegir('act:agendar'); await elegir('day:', 1); await elegir('slot:', 1); await elegir('nom:perfil'); await elegir('conf:si');
    assert.ok(r.body.mensajes.some(m => /quedó agendada/.test(m.cuerpo)));
    let eq = (await get(`/api/publico/demo/equipo?sid=${sid}`)).body;
    assert.equal(eq.citas.length, 1); assert.equal(eq.embudo.actual, 'Cita agendada'); assert.equal(eq.anuncio, 'HAZ ESPACIO');
    assert.ok(!JSON.stringify(eq).includes('sim9'), 'no se expone el identificador interno');
    const otra = (await get('/api/publico/demo/equipo?sid=1700000000002')).body;
    assert.equal(otra.citas.length, 0, 'cada visita ve solo lo suyo');
    const rec = await post('/api/publico/demo/recordatorio', { sid });
    const idConfirmar = ids(rec.body.mensajes).find(x => x.startsWith('cita:confirmar'));
    assert.ok(idConfirmar, 'el recordatorio automático trae el botón de confirmar');
    r = await conv({ reply_id: idConfirmar, texto: 'Confirmo asistencia' });
    eq = (await get(`/api/publico/demo/equipo?sid=${sid}`)).body;
    assert.equal(eq.citas[0].estado, 'confirmada', 'confirmar desde el recordatorio actualiza la cita');
    assert.equal((await post('/api/publico/demo/recordatorio', { sid: '1700000000002' })).status, 404, 'sin cita no hay recordatorio');
    eq = (await post('/api/publico/demo/estado', { sid, cita_id: eq.citas[0].id, estado: 'asistio', valor: 120000 })).body;
    assert.equal(eq.embudo.actual, 'Asistió');
    assert.ok(eq.eventos.some(e => e.evento === 'Purchase' && e.valor === 120000), 'queda el evento de compra con su valor');
    assert.equal((await post('/api/publico/demo/estado', { sid: '1700000000002', cita_id: eq.citas[0].id, estado: 'asistio' })).status, 404, 'no se puede actuar sobre citas ajenas');
    // «postoperatorio» contiene «stop»: no debe tomarse como una baja
    const r2 = await post('/api/publico/asistente', { sid: '1700000000003', texto: 'Quiero información del masaje postoperatorio' });
    assert.ok(!r2.body.mensajes.some(m => /No te enviaremos más mensajes/.test(m.cuerpo)));
  } finally { delete process.env.MODO_DEMO; }
  assert.equal((await get('/api/publico/demo/equipo?sid=1700000000001')).status, 404, 'fuera de la demo no existe la vista del equipo');
  assert.equal((await post('/api/publico/asistente', { sid: '1700000000001', texto: 'Hola' })).status, 404, 'sin ASISTENTE_WEB tampoco hay asistente');
});

test('bot: menú por categorías respeta el límite de 10 filas de WhatsApp y pagina el láser', async () => {
  process.env.ASISTENTE_WEB = '1';
  try {
    const sid = '1700000000009', conv = b => post('/api/publico/asistente', { sid, nombre: 'Valentina Demo', ...b });
    const filas = r => r.body.mensajes.flatMap(m => (m.payload?.secciones || []).flatMap(s => s.filas));
    let r = await conv({ texto: 'Hola' });
    let f = filas(r);
    assert.ok(f.length > 0 && f.length <= 10, 'inicio: máximo 10 filas');
    assert.ok(f.filter(x => x.id.startsWith('cat:')).length === 8, '8 categorías');
    const laser = f.find(x => x.id.startsWith('cat:depilacion-laser'));
    assert.ok(laser, 'categoría de láser');
    r = await conv({ reply_id: laser.id, texto: laser.titulo });
    f = filas(r);
    assert.ok(f.length <= 10 && f.filter(x => x.id.startsWith('svc:')).length === 8, 'primera página: 8 zonas + navegación');
    const mas = f.find(x => x.titulo === 'Ver más');
    assert.ok(mas, 'hay más zonas');
    r = await conv({ reply_id: mas.id, texto: 'Ver más' });
    f = filas(r);
    assert.ok(f.length <= 10 && f.some(x => x.id.startsWith('svc:')), 'segunda página con más zonas');
    assert.ok(f.every(x => x.titulo.length <= 24), 'títulos de fila de máximo 24 caracteres');
    r = await conv({ reply_id: f.find(x => x.id.startsWith('svc:')).id, texto: 'x' });
    assert.ok(r.body.mensajes.some(m => /\$\d/.test(m.cuerpo)), 'la ficha muestra el valor');
  } finally { delete process.env.ASISTENTE_WEB; }
});
