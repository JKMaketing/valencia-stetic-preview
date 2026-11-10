// Asistente integrado a la web (el mismo bot de WhatsApp, sin número) + recorrido de demostración con «Vista del equipo».
// Sin dependencias; todo el texto entra con textContent (nada de innerHTML).
(() => {
  'use strict';
  const API = '/api/publico';
  const fmtHora = ms => new Date(ms).toLocaleTimeString('es-CO', { timeZone: 'America/Bogota', hour: 'numeric', minute: '2-digit' });
  const dormir = ms => new Promise(r => setTimeout(r, ms));
  const rapido = { get: () => guardar.leer('vs_rapido') === '1', set: v => guardar.poner('vs_rapido', v ? '1' : '0') };
  const pausa = ms => dormir(rapido.get() ? Math.round(ms / 4) : ms);
  const guardar = { leer: k => { try { return localStorage.getItem(k); } catch { return null; } }, poner: (k, v) => { try { localStorage.setItem(k, v); } catch { /* sin almacenamiento */ } } };

  function h(tag, props, ...kids) {
    const el = document.createElement(tag);
    for (const [k, v] of Object.entries(props || {})) {
      if (v === false || v == null) continue;
      if (k === 'class') el.className = v; else if (k === 'texto') el.textContent = v;
      else if (k.startsWith('on')) el.addEventListener(k.slice(2), v); else if (v === true) el.setAttribute(k, ''); else el.setAttribute(k, v);
    }
    const poner = k => { if (Array.isArray(k)) k.forEach(poner); else if (k != null && k !== false) el.append(k.nodeType ? k : document.createTextNode(String(k))); };
    kids.forEach(poner);
    return el;
  }
  // *negrita* de WhatsApp → <b> sin innerHTML
  const conNegritas = (txt, el) => { String(txt ?? '').split(/(\*[^*\n]+\*)/).forEach(t => { if (/^\*[^*\n]+\*$/.test(t)) el.append(h('b', { texto: t.slice(1, -1) })); else if (t) el.append(document.createTextNode(t)); }); return el; };
  const fechaCorta = iso => { const [d, t] = String(iso).split('T'), [y, m, dd] = d.split('-').map(Number); const f = new Date(Date.UTC(y, m - 1, dd)).toLocaleDateString('es-CO', { timeZone: 'UTC', weekday: 'short', day: 'numeric', month: 'short' }); return `${f}${t ? ' · ' + t : ''}`; };

  let cfg = null, sid = guardar.leer('vs_sid');
  if (!/^\d{10,16}$/.test(sid || '')) { sid = String(Date.now()) + String(Math.floor(Math.random() * 900 + 100)); sid = sid.slice(0, 16); guardar.poner('vs_sid', sid); }
  const codigos = () => { try { return JSON.parse(guardar.leer('vs_citas') || '[]').map(x => x.codigo).filter(Boolean); } catch { return []; } };

  async function api(ruta, cuerpo) {
    const r = await fetch(API + ruta, { method: cuerpo ? 'POST' : 'GET', headers: cuerpo ? { 'Content-Type': 'application/json' } : undefined, body: cuerpo ? JSON.stringify(cuerpo) : undefined });
    const j = await r.json().catch(() => ({}));
    if (!r.ok) throw new Error(j.error || 'No pudimos responder. Inténtalo de nuevo.');
    return j;
  }

  // ───────── Estado del chat ─────────
  const E = { abierto: false, ocupado: false, ultimo: 0, opciones: [], listas: {}, guion: false, parar: false, equipoAbierto: false };
  let $btn, $panel, $msgs, $form, $txt, $hoja, $guion, $equipo, $equipoCuerpo;

  function pintar(ms) {
    for (const m of ms) {
      if (m.id <= E.ultimo) continue;
      E.ultimo = m.id;
      if (m.direccion === 'in') { $msgs.append(h('div', { class: 'as-b yo' }, m.cuerpo, h('span', { class: 'as-t', texto: fmtHora(m.ts) }))); continue; }
      const p = m.payload || { tipo: 'texto', texto: m.cuerpo };
      if (p.tipo === 'plantilla') continue; // las plantillas son para WhatsApp real
      const burbuja = conNegritas(p.texto ?? m.cuerpo, h('div', { class: 'as-b ellos' }));
      if (p.pie) burbuja.append(h('span', { class: 'as-pie', texto: p.pie }));
      if (p.tipo === 'botones') {
        const fila = h('div', { class: 'as-bts' });
        for (const b of p.botones) { fila.append(h('button', { type: 'button', onclick: () => elegir(b.id, b.titulo) }, b.titulo)); E.opciones.push({ id: b.id, titulo: b.titulo }); }
        burbuja.append(fila);
      }
      if (p.tipo === 'lista') {
        burbuja.append(h('div', { class: 'as-bts' }, h('button', { type: 'button', onclick: () => abrirLista(p) }, `☰ ${p.boton || 'Ver opciones'}`)));
        for (const s of p.secciones || []) for (const f of s.filas || []) E.opciones.push({ id: f.id, titulo: f.titulo });
      }
      burbuja.append(h('span', { class: 'as-t', texto: fmtHora(m.ts) }));
      $msgs.append(burbuja);
    }
    $msgs.scrollTop = $msgs.scrollHeight;
  }
  function abrirLista(p) {
    $hoja.replaceChildren(h('div', { class: 'as-hoja-cab' }, h('b', { texto: p.boton || 'Opciones' }), h('button', { type: 'button', 'aria-label': 'Cerrar', onclick: () => $hoja.classList.add('oculto') }, '✕')),
      ...(p.secciones || []).flatMap(s => [s.titulo && h('div', { class: 'as-sec', texto: s.titulo }), ...(s.filas || []).slice(0, 10).map(f => h('button', { type: 'button', class: 'as-fila', onclick: () => { $hoja.classList.add('oculto'); elegir(f.id, f.titulo); } }, h('span', { texto: f.titulo }), f.descripcion && h('small', { texto: f.descripcion })))]));
    $hoja.classList.remove('oculto');
  }
  function escribiendo(on) {
    const ya = $msgs.querySelector('.as-escribe');
    if (on && !ya) { $msgs.append(h('div', { class: 'as-b ellos as-escribe', 'aria-label': 'Escribiendo' }, h('i'), h('i'), h('i'))); $msgs.scrollTop = $msgs.scrollHeight; }
    if (!on && ya) ya.remove();
  }
  async function enviar(cuerpo) {
    for (let i = 0; E.ocupado && i < 100; i++) await dormir(100);   // espera su turno (p. ej. el saludo inicial) en vez de perder el mensaje
    if (E.ocupado) return false;
    E.ocupado = true; E.opciones = []; escribiendo(true);
    try {
      const r = await api('/asistente', { sid, nombre: 'Valentina Demo', ...cuerpo });
      escribiendo(false); pintar(r.mensajes);
      if (E.equipoAbierto) cargarEquipo();
      return true;
    } catch (e) { escribiendo(false); $msgs.append(h('div', { class: 'as-b ellos as-error', texto: e.message })); return false; }
    finally { E.ocupado = false; }
  }
  const decir = (texto, extra) => enviar({ texto, ...(extra || {}) });
  const elegir = (id, titulo) => enviar({ reply_id: id, texto: titulo });

  async function cargarHistorial() {
    try { const r = await api(`/asistente/mensajes?sid=${sid}&desde=${E.ultimo}`); pintar(r.mensajes); return r.mensajes.length; } catch { return 0; }
  }
  async function reiniciar() {
    E.parar = true; await dormir(50);
    try { await api('/asistente/reiniciar', { sid }); } catch { /* ignorar */ }
    $msgs.replaceChildren(); E.ultimo = 0; E.opciones = []; E.parar = false; setGuion('');
    if (E.equipoAbierto) cargarEquipo();
    await decir('Hola');
  }

  function abrir(on = true, saludo = true) {
    E.abierto = on; $panel.classList.toggle('abierto', on); $btn.setAttribute('aria-expanded', String(on));
    document.body.classList.toggle('as-abierto', on);
    if (on && saludo && !$msgs.children.length) cargarHistorial().then(n => { if (!n) decir('Hola'); });
    if (on) setTimeout(() => $txt.focus({ preventScroll: true }), 50);
  }

  // ───────── Montaje del widget ─────────
  function montarWidget() {
    $btn = h('button', { class: 'as-btn', type: 'button', 'aria-label': 'Abrir el asistente de Valencia Stetic', 'aria-expanded': 'false', onclick: () => abrir(!E.abierto) },
      h('span', { class: 'as-btn-ico', 'aria-hidden': 'true', texto: '💬' }), h('span', { class: 'as-btn-txt', texto: 'Asistente' }));
    $msgs = h('div', { class: 'as-msgs', role: 'log', 'aria-live': 'polite' });
    $hoja = h('div', { class: 'as-hoja oculto' });
    $guion = h('div', { class: 'as-guion oculto', role: 'status' });
    $txt = h('input', { class: 'as-txt', placeholder: 'Escribe tu mensaje', autocomplete: 'off', maxlength: 300, 'aria-label': 'Mensaje' });
    $form = h('form', { class: 'as-form', onsubmit: e => { e.preventDefault(); const t = $txt.value.trim(); if (!t) return; $txt.value = ''; decir(t); } }, $txt, h('button', { 'aria-label': 'Enviar' }, '➤'));
    $panel = h('section', { class: 'as-panel', 'aria-label': 'Asistente de Valencia Stetic' },
      h('header', { class: 'as-cab' }, h('div', { class: 'as-av', texto: 'VS' }), h('div', { class: 'as-tit' }, h('b', { texto: cfg.asistente.nombre }), h('small', { texto: cfg.asistente.demo ? 'Demostración · sin WhatsApp real' : 'En línea · te ayudo a agendar' })),
        cfg.asistente.demo && h('button', { type: 'button', class: 'as-ico', title: 'Vista del equipo', 'aria-label': 'Vista del equipo', onclick: () => abrirEquipo(!E.equipoAbierto) }, '📋'),
        h('button', { type: 'button', class: 'as-ico', title: 'Reiniciar la conversación', 'aria-label': 'Reiniciar la conversación', onclick: reiniciar }, '↻'),
        h('button', { type: 'button', class: 'as-ico', 'aria-label': 'Cerrar', onclick: () => abrir(false) }, '✕')),
      $guion, $msgs, $form, $hoja);
    document.body.append($btn, $panel);
    if (cfg.asistente.demo) montarEquipo();
  }

  // ───────── Vista del equipo (solo demostración) ─────────
  const ESTADOS = { agendada: 'Agendada', confirmada: 'Confirmada', cancelada: 'Cancelada', asistio: 'Asistió', no_asistio: 'No asistió' };
  const cop = n => '$ ' + Number(n).toLocaleString('es-CO');
  function montarEquipo() {
    $equipoCuerpo = h('div', { class: 'eq-cuerpo' }, 'Cargando…');
    $equipo = h('aside', { class: 'eq', 'aria-label': 'Vista del equipo' },
      h('header', { class: 'eq-cab' }, h('div', {}, h('b', { texto: 'Vista del equipo' }), h('small', { texto: 'Lo que ve el centro en su panel (datos de esta demostración)' })), h('button', { type: 'button', class: 'as-ico', 'aria-label': 'Cerrar', onclick: () => abrirEquipo(false) }, '✕')),
      $equipoCuerpo);
    document.body.append($equipo);
  }
  function abrirEquipo(on) { E.equipoAbierto = on; $equipo.classList.toggle('abierto', on); document.body.classList.toggle('eq-abierto', on); if (on) cargarEquipo(); }
  async function cargarEquipo() {
    try { pintarEquipo(await api(`/demo/equipo?sid=${sid}&codigos=${codigos().join(',')}`)); } catch (e) { $equipoCuerpo.replaceChildren(h('p', { texto: e.message })); }
  }
  async function accionEquipo(cita_id, estado, valor) {
    try { pintarEquipo(await api('/demo/estado', { sid, codigos: codigos(), cita_id, estado, valor })); await cargarHistorial(); } catch (e) { alert(e.message); }
  }
  function pintarEquipo(d) {
    const idx = d.embudo.etapas.indexOf(d.embudo.actual);
    const embudo = h('ol', { class: 'eq-embudo' }, d.embudo.etapas.map((e, i) => h('li', { class: i <= idx ? 'hecho' : '' , 'aria-current': i === idx ? 'step' : null, texto: e })));
    const valor = h('input', { type: 'number', min: 0, step: 10000, value: 120000, 'aria-label': 'Valor cobrado en pesos', class: 'eq-valor' });
    const citas = d.citas.length ? d.citas.map(c => h('div', { class: `eq-cita ${c.estado}` },
      h('div', { class: 'eq-cita-cab' }, h('b', { texto: c.servicio }), h('span', { class: `eq-est ${c.estado}`, texto: ESTADOS[c.estado] || c.estado })),
      h('div', { class: 'eq-meta', texto: `${fechaCorta(c.inicio)} · ${c.quien}${c.origen === 'web' ? ' · reserva web' : ''}` }),
      c.revisar && h('div', { class: 'eq-rev', texto: '⚑ Revisar condiciones: una asesora la revisa antes de la cita' }),
      c.valor != null && h('div', { class: 'eq-meta', texto: `Valor cobrado: ${cop(c.valor)}` }),
      (c.estado === 'agendada' || c.estado === 'confirmada') && h('div', { class: 'eq-acciones' },
        c.estado === 'agendada' && h('button', { type: 'button', onclick: () => accionEquipo(c.id, 'confirmada') }, 'Confirmó'),
        h('button', { type: 'button', class: 'prim', onclick: () => accionEquipo(c.id, 'asistio', valor.value) }, 'Asistió y pagó'), valor,
        h('button', { type: 'button', onclick: () => accionEquipo(c.id, 'no_asistio') }, 'No asistió')))) : [h('p', { class: 'eq-vacio', texto: 'Aún no hay citas de esta visita. Agenda con el asistente o en la web y aparecerá aquí.' })];
    const eventos = d.eventos.length ? h('ul', { class: 'eq-ev' }, d.eventos.map(e => h('li', {}, h('b', { texto: e.evento }), e.valor != null ? ` · ${cop(e.valor)}` : '', h('small', { texto: ` ${e.estado === 'simulado' ? '(simulado: en producción se envía a Meta)' : e.estado}` })))) : h('p', { class: 'eq-vacio', texto: 'Todavía no hay eventos de conversión.' });
    $equipoCuerpo.replaceChildren(...[
      h('h3', { texto: 'Embudo de esta visita' }), embudo, idx < 0 && d.embudo.actual && h('p', { class: 'eq-rev', texto: `Etapa: ${d.embudo.actual}. La conversación pasó a una persona del equipo.` }), d.anuncio && h('p', { class: 'eq-meta', texto: `Origen: anuncio «${d.anuncio}»` }),
      h('h3', { texto: 'Citas' }), ...citas,
      h('h3', { texto: 'Conversión (API de Conversiones de Meta)' }), eventos,
      h('p', { class: 'eq-nota', texto: 'Al marcar «Asistió y pagó» se registra la compra con su valor; así Meta aprende qué anuncios traen clientas que sí llegan.' })].filter(Boolean));
  }

  // ───────── Escenarios de demostración ─────────
  const ANUNCIO = { source_id: '120210000000001', headline: 'Haz espacio para ti', body: 'Limpieza facial' };
  const reserva = [{ pick: 'act:agendar', nota: 'Elige «Agendar cita»' }, { pick: 'day:', nth: 1, nota: 'Elige un día con cupos reales de la agenda' }, { pick: 'slot:', nth: 2, nota: 'Elige una hora disponible' }, { pick: 'nom:perfil', nota: 'Confirma a nombre de quién va la cita' }, { pick: 'conf:si', nota: 'Confirma la cita' }];
  const ESCENARIOS = [
    { id: 'anuncio', titulo: 'Llega desde un anuncio y agenda', desc: 'Una clienta ve el anuncio «Haz espacio para ti», escribe y el asistente la lleva hasta la cita confirmada.',
      pasos: [{ di: 'Hola, vi HAZ ESPACIO y quiero información sobre limpieza facial', ref: ANUNCIO, nota: 'Escribe desde el anuncio de Meta (el sistema guarda de cuál vino)' }, ...reserva, { fin: 'Cita agendada. Abre la Vista del equipo: ya aparece en el embudo y en la agenda.', equipo: true }] },
    { id: 'libre', titulo: 'Pregunta con sus propias palabras', desc: 'Dirección, horario y precio por texto libre; el asistente responde sin inventar precios y luego agenda.',
      pasos: [{ di: '¿Dónde quedan y cuál es el horario?', nota: 'Pregunta por la ubicación' }, { di: '¿Cuánto vale el masaje relajante?', nota: 'Pregunta el precio: el valor está por confirmar y el asistente no lo inventa' }, ...reserva, { fin: 'Cita agendada desde una conversación libre.', equipo: true }] },
    { id: 'laser', titulo: 'Depilación láser: cita de orientación', desc: 'El láser empieza con una cita de orientación que queda marcada para que una asesora revise el caso.',
      pasos: [{ di: 'Hola, vi LASER y quiero información sobre depilación láser', nota: 'Pregunta por depilación láser' }, ...reserva, { fin: 'La cita queda marcada «Revisar condiciones» en la Vista del equipo.', equipo: true }] },
    { id: 'postop', titulo: 'Masaje postoperatorio con revisión', desc: 'Servicio sensible: se agenda solo y una asesora revisa el caso antes de la cita.',
      pasos: [{ di: 'Quiero información del masaje postoperatorio', nota: 'Pregunta por el masaje postoperatorio' }, ...reserva, { fin: 'Queda marcada «Revisar condiciones»: el equipo valida la indicación del cirujano.', equipo: true }] },
    { id: 'asesora', titulo: 'Pide hablar con una asesora', desc: 'Cuando el caso es sensible o la clienta lo pide, el asistente pasa la conversación a una persona.',
      pasos: [{ di: 'Hola, estoy embarazada, ¿puedo hacerme un masaje?', nota: 'Cuenta algo de salud' }, { di: 'Quiero hablar con una asesora', nota: 'Pide una persona' }, { fin: 'El bot se pausa y la conversación queda para el equipo (etapa «Requiere asesora»).', equipo: true }] },
    { id: 'cancelar', titulo: 'Agenda y luego cancela', desc: 'La clienta gestiona su propia cita por el chat: el cupo vuelve a quedar libre.',
      pasos: [{ di: 'Hola, vi HAZ ESPACIO y quiero información sobre limpieza facial', ref: ANUNCIO, nota: 'Llega desde el anuncio' }, ...reserva, { di: 'Quiero cancelar mi cita', nota: 'Pide cancelar' }, { pick: 'cita:sel', nota: 'Elige cuál cita', opcional: true }, { pick: 'cita:cancelar_ok', nota: 'Confirma la cancelación' }, { fin: 'Cita cancelada y cupo liberado.', equipo: true }] },
    { id: 'recordatorio', titulo: 'Recordatorio automático y confirmación', desc: 'El día anterior el sistema le escribe a la clienta; ella confirma con un toque y la cita pasa a «Confirmada» (menos inasistencias).',
      pasos: [{ di: 'Hola, vi HAZ ESPACIO y quiero información sobre limpieza facial', ref: ANUNCIO, nota: 'Llega desde el anuncio' }, ...reserva, { recordatorio: true, nota: 'El día anterior el sistema envía el recordatorio solo' }, { pick: 'cita:confirmar', nota: 'La clienta confirma con un toque' }, { fin: 'Cita confirmada sin que el equipo haya escrito nada.', equipo: true }] },
    { id: 'conversion', titulo: 'De la conversación a la venta (conversión)', desc: 'Agenda, y luego el centro marca que la clienta asistió y pagó: se registra la compra que alimenta la campaña.',
      pasos: [{ di: 'Hola, vi HAZ ESPACIO y quiero información sobre limpieza facial', ref: ANUNCIO, nota: 'Llega desde el anuncio' }, ...reserva, { equipo: true, nota: 'El día de la cita, el centro abre su panel' }, { asistio: 120000, nota: 'El equipo marca «Asistió y pagó» $ 120.000' }, { fin: 'Conversión registrada: evento de compra con su valor, ligado al anuncio de origen.', equipo: true }] },
  ];

  function setGuion(txt, conDetener = false) {
    $guion.classList.toggle('oculto', !txt);
    $guion.replaceChildren(...[h('span', { texto: txt || '' }), conDetener && h('button', { type: 'button', class: 'as-detener', onclick: () => { E.parar = true; setGuion('Recorrido detenido. Puedes seguir escribiendo con el asistente.'); } }, 'Detener')].filter(Boolean));
  }
  async function reproducir(esc) {
    if (E.guion) return; E.guion = true; E.parar = false;
    abrir(true, false);
    await api('/asistente/reiniciar', { sid }).catch(() => {}); $msgs.replaceChildren(); E.ultimo = 0; E.opciones = [];
    if (E.equipoAbierto) cargarEquipo();
    let n = 0; const total = esc.pasos.filter(x => !x.fin).length;
    try {
      for (const p of esc.pasos) {
        if (E.parar) return;
        n++;
        if (p.fin) { setGuion(`✓ ${p.fin}`); if (p.equipo) abrirEquipo(true); await pausa(400); break; }
        setGuion(`Paso ${n} de ${total} · ${p.nota || ''}`, true); await pausa(1300);
        if (E.parar) return;
        if (p.di) { await enviar({ texto: p.di, ...(p.ref ? { referral: p.ref } : {}) }); }
        else if (p.pick) {
          const cand = E.opciones.filter(o => o.id.startsWith(p.pick));
          const o = cand[Math.min(p.nth || 0, cand.length - 1)];
          if (!o) { if (p.opcional) continue; setGuion('No pude continuar este recorrido (la agenda no tiene esa opción hoy). Reinicia con ↻ e inténtalo de nuevo.'); return; }
          await elegir(o.id, o.titulo);
        } else if (p.asistio) {
          const eq = await api(`/demo/equipo?sid=${sid}&codigos=${codigos().join(',')}`);
          const cita = eq.citas.find(c => c.estado === 'agendada' || c.estado === 'confirmada');
          if (cita) await accionEquipo(cita.id, 'asistio', p.asistio);
        } else if (p.recordatorio) {
          const r = await api('/demo/recordatorio', { sid }); pintar(r.mensajes);
        } else if (p.equipo) { abrirEquipo(true); }
        await pausa(900);
      }
    } finally { E.guion = false; }
  }

  // ───────── Página /reservas/demo ─────────
  async function pintarDemo(raiz) {
    await listo;
    if (!cfg?.asistente?.demo) { raiz.append(h('p', { texto: 'Esta página solo está disponible en la versión de demostración.' })); return; }
    raiz.append(
      h('h1', { class: 'titulo', texto: 'Recorrido de demostración' }),
      h('p', { class: 'frase', texto: 'Mira el sistema completo: la web de reservas, el asistente (el mismo bot de WhatsApp, aquí sin número) y lo que ve el equipo, hasta la conversión.' }),
      h('div', { class: 'aviso-box aviso', role: 'note', texto: 'Es una demostración: no se envía nada a WhatsApp ni se guarda nada real. Si pruebas la reserva en la web, usa datos de prueba.' }),
      h('label', { class: 'demo-rapido' }, h('input', { type: 'checkbox', checked: rapido.get() ? true : null, onchange: e => rapido.set(e.target.checked) }), ' Modo rápido (los recorridos avanzan más ligero)'),
      h('h2', { class: 'demo-h', texto: '1. Escenarios con el asistente' }),
      h('ul', { class: 'demo-lista' }, ESCENARIOS.map(e => h('li', { class: 'demo-esc' }, h('div', {}, h('h3', { texto: e.titulo }), h('p', { texto: e.desc })), h('button', { type: 'button', class: 'boton', onclick: () => reproducir(e) }, 'Ver el recorrido')))),
      h('h2', { class: 'demo-h', texto: '2. Pruébalo tú' }),
      h('div', { class: 'demo-pasos' },
        h('p', {}, h('b', { texto: 'Habla con el asistente: ' }), 'abre el botón «Asistente» y escribe, por ejemplo, «quiero un masaje el sábado».'),
        h('p', {}, h('b', { texto: 'Reserva en la web: ' }), h('a', { href: '/reservas/reservar', 'data-ruta': '1' }, 'elige servicio, día y hora'), ' con datos de prueba.'),
        h('p', {}, h('b', { texto: 'Mira al equipo: ' }), h('button', { type: 'button', class: 'boton sec chico', onclick: () => abrirEquipo(true) }, 'Abrir Vista del equipo'), ' para confirmar, marcar asistencia y ver la conversión.')));
  }

  async function iniciar() {
    try { cfg = await (await fetch(`${API}/config`)).json(); } catch { return; }
    if (!cfg?.asistente?.activo) return;
    montarWidget();
    if (cfg.asistente.demo) document.body.prepend(h('div', { class: 'demo-banner', role: 'note' }, 'Versión de demostración · no se envía nada a WhatsApp · usa datos de prueba · ', h('a', { href: '/reservas/demo', 'data-ruta': '1' }, 'Ver recorrido')));
    if (new URLSearchParams(location.search).get('asistente') === '1') abrir(true);
  }
  window.VSAsistente = { pintarDemo, abrir: () => $panel && abrir(true), listo: () => !!cfg?.asistente?.activo };
  const listo = new Promise(res => { const ir = () => iniciar().then(res, res); if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', ir); else ir(); });
})();
