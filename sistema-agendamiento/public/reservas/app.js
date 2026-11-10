// Página de reservas de Valencia Stetic (sin dependencias). Todo el texto dinámico entra con textContent: no se usa innerHTML.
(() => {
  'use strict';
  const BASE = '/reservas';
  const $app = document.getElementById('app');
  const MESES = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
  const DIAS = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];

  // ───────── Estado ─────────
  const S = {
    cfg: null, ref: {}, paso: 1, sel: [], dias: [], mes: null, fecha: null, horas: [], hora: null, duracion: 0,
    f: { nombre: '', pais: '57', telefono: '', email: '', notas: '', acepto: false, sitio: '' }, err: {}, aviso: null, enviando: false, cargando: false,
    res: null, cita: null, modoCambio: false,
  };

  // ───────── Utilidades ─────────
  function h(tag, props, ...kids) {
    const el = document.createElement(tag);
    for (const [k, v] of Object.entries(props || {})) {
      if (v === false || v == null) continue;
      if (k === 'class') el.className = v;
      else if (k === 'texto') el.textContent = v;
      else if (k.startsWith('on')) el.addEventListener(k.slice(2), v);
      else if (v === true) el.setAttribute(k, '');
      else el.setAttribute(k, v);
    }
    const poner = k => { if (Array.isArray(k)) k.forEach(poner); else if (k != null && k !== false) el.append(k.nodeType ? k : document.createTextNode(String(k))); };
    kids.forEach(poner);
    return el;
  }
  const svg = (d, w = 16) => { const s = document.createElementNS('http://www.w3.org/2000/svg', 'svg'); s.setAttribute('width', w); s.setAttribute('height', w); s.setAttribute('viewBox', '0 0 16 16'); s.setAttribute('aria-hidden', 'true'); const p = document.createElementNS('http://www.w3.org/2000/svg', 'path'); p.setAttribute('d', d); p.setAttribute('fill', 'none'); p.setAttribute('stroke', 'currentColor'); p.setAttribute('stroke-width', '1.4'); p.setAttribute('stroke-linecap', 'round'); s.append(p); return s; };
  const ICONO_RELOJ = 'M8 1.8a6.2 6.2 0 1 0 0 12.4A6.2 6.2 0 0 0 8 1.8ZM8 4.6V8l2.3 1.5';
  const ICONO_PIN = 'M8 14.5s4.8-4.4 4.8-8a4.8 4.8 0 1 0-9.6 0c0 3.6 4.8 8 4.8 8ZM8 8.2a1.7 1.7 0 1 0 0-3.4 1.7 1.7 0 0 0 0 3.4Z';
  const telTexto = t => String(t || '').replace(/^\+57(\d{3})(\d{3})(\d{4})$/, '$1 $2 $3');
  const botonLlamar = (clase = 'boton sec') => S.cfg.negocio.telefono && h('a', { class: clase, href: `tel:${S.cfg.negocio.telefono}` }, `Llamar · ${telTexto(S.cfg.negocio.telefono)}`);
  const estrellas = n => h('span', { class: 'estrellas', role: 'img', 'aria-label': `${n} de 5 estrellas`, texto: '★'.repeat(n) + '☆'.repeat(5 - n) });
  // Datos estructurados para buscadores: negocio local con dirección, teléfono y horario (sin AggregateRating: Google no lo admite para reseñas del propio negocio).
  function datosEstructurados() {
    const n = S.cfg.negocio, previo = document.getElementById('ld-negocio'); if (previo) previo.remove();
    const cod = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const ld = { '@context': 'https://schema.org', '@type': 'HealthAndBeautyBusiness', name: n.nombre, url: location.origin + BASE, image: location.origin + `${BASE}/logo.png`,
      address: { '@type': 'PostalAddress', streetAddress: n.direccion.replace(/,\s*Pereira\s*$/i, ''), addressLocality: n.ciudad || 'Pereira', addressRegion: 'Risaralda', addressCountry: 'CO' } };
    if (n.telefono) ld.telephone = n.telefono;
    if (n.coordenadas) ld.geo = { '@type': 'GeoCoordinates', latitude: n.coordenadas.lat, longitude: n.coordenadas.lng };
    const redes = [n.instagram, n.facebook].filter(Boolean); if (redes.length) ld.sameAs = redes;
    ld.openingHoursSpecification = n.horario.filter(x => x.abierto).map(x => { const [a, b] = x.texto.split(' a ').map(t => { const [hh, rest] = t.split(':'); const mm = rest.slice(0, 2), pm = /p\. m\./.test(rest); return String((Number(hh) % 12) + (pm ? 12 : 0)).padStart(2, '0') + ':' + mm; }); return { '@type': 'OpeningHoursSpecification', dayOfWeek: cod[x.n], opens: a, closes: b }; });
    ld.hasOfferCatalog = { '@type': 'OfferCatalog', name: 'Servicios de Valencia Stetic', itemListElement: grupos().map(([cat, ss]) => ({ '@type': 'OfferCatalog', name: cat, itemListElement: ss.map(x => ({ '@type': 'Offer', ...(x.precio ? { price: x.precio, priceCurrency: 'COP' } : {}), itemOffered: { '@type': 'Service', name: x.nombre, description: x.descripcion, serviceType: cat, areaServed: 'Pereira' } })) })) };
    const s = document.createElement('script'); s.type = 'application/ld+json'; s.id = 'ld-negocio'; s.textContent = JSON.stringify(ld); document.head.append(s);
  }
  const ICONO_TEL = 'M3.2 2.2h2.4l1.2 3-1.5 1a8 8 0 0 0 3.4 3.4l1-1.5 3 1.2v2.4c0 .6-.5 1.1-1.1 1.1A10 10 0 0 1 2.1 3.3c0-.6.5-1.1 1.1-1.1Z';
  const cop = n => '$ ' + Number(n).toLocaleString('es-CO');
  const hora12 = hhmm => { let [hh, mm] = hhmm.split(':').map(Number); const suf = hh >= 12 ? 'p. m.' : 'a. m.'; hh = hh % 12 || 12; return `${hh}:${String(mm).padStart(2, '0')} ${suf}`; };
  const partes = iso => iso.slice(0, 10).split('-').map(Number);
  const diaSemana = iso => { const [y, m, d] = partes(iso); return new Date(Date.UTC(y, m - 1, d)).getUTCDay(); };
  const fechaLarga = iso => { const [, m, d] = partes(iso); return `${DIAS[diaSemana(iso)]} ${d} de ${MESES[m - 1]}`; };
  const mayus = s => s.charAt(0).toUpperCase() + s.slice(1);
  const duracion = min => (min >= 60 ? `${Math.floor(min / 60)} h${min % 60 ? ` ${min % 60} min` : ''}` : `${min} min`);
  const servicio = id => S.cfg.servicios.find(s => s.id === id);
  const precioDe = s => (s.precio ? cop(s.precio) : (s.precio_nota || 'Valor por confirmar'));
  const totalTxt = ids => { const ss = ids.map(servicio).filter(Boolean), suma = ss.reduce((t, s) => t + Number(s.precio || 0), 0), pend = ss.filter(s => !s.precio).length; return !pend ? cop(suma) : suma ? `${cop(suma)} + ${pend} por confirmar` : 'Valor por confirmar'; };
  const grupos = () => { const m = new Map((S.cfg.categorias || []).map(c => [c, []])); for (const s of S.cfg.servicios) { const k = s.categoria || 'Servicios'; if (!m.has(k)) m.set(k, []); m.get(k).push(s); } return [...m].filter(([, v]) => v.length); };
  const desdeTxt = ss => { const p = ss.map(s => s.precio).filter(Boolean); return p.length ? `desde ${cop(Math.min(...p))}` : ''; };
  const slug = t => String(t).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  const MAX_SERV = 6;
  const esOrientacion = ids => ids.some(i => servicio(i)?.requiere_valoracion);
  const guardado = { leer: () => { try { return JSON.parse(localStorage.getItem('vs_citas') || '[]'); } catch { return []; } }, poner: v => { try { localStorage.setItem('vs_citas', JSON.stringify(v.slice(0, 20))); } catch { /* sin almacenamiento */ } } };

  async function api(ruta, opciones = {}) {
    const r = await fetch(ruta, { headers: opciones.body ? { 'Content-Type': 'application/json' } : undefined, ...opciones, body: opciones.body ? JSON.stringify(opciones.body) : undefined });
    const j = await r.json().catch(() => ({}));
    if (!r.ok) { const e = new Error(j.error || 'No pudimos completar la solicitud. Inténtalo de nuevo.'); e.estado = r.status; throw e; }
    return j;
  }

  // ───────── Atribución (anuncio / origen): se conserva mientras dura la visita ─────────
  function capturarRef() {
    const q = new URLSearchParams(location.search), claves = ['cod', 'src', 'utm_source', 'utm_medium', 'utm_campaign'];
    let ref = {};
    try { ref = JSON.parse(sessionStorage.getItem('vs_ref') || '{}'); } catch { /* ignorar */ }
    for (const k of claves) if (q.get(k)) ref[k] = q.get(k).slice(0, 60);
    try { sessionStorage.setItem('vs_ref', JSON.stringify(ref)); } catch { /* ignorar */ }
    S.ref = ref;
  }

  // ───────── Router ─────────
  function ruta() {
    const p = location.pathname.replace(/\/+$/, '') || BASE, sub = p.slice(BASE.length).replace(/^\//, '');
    if (sub === 'reservar') return { v: 'reservar' };
    if (sub === 'mis-citas') return { v: 'mis-citas' };
    if (sub === 'privacidad') return { v: 'privacidad' };
    if (sub === 'demo') return { v: 'demo' };
    const m = sub.match(/^cita\/([\w-]+)$/);
    return m ? { v: 'cita', token: m[1] } : { v: 'perfil' };
  }
  function ir(destino, reemplazar) { if (reemplazar) history.replaceState(null, '', destino); else history.pushState(null, '', destino); render(); window.scrollTo(0, 0); }
  document.addEventListener('click', e => {
    const a = e.target.closest('a[data-ruta]');
    if (!a || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    e.preventDefault(); ir(a.getAttribute('href'));
  });
  window.addEventListener('popstate', render);
  const enlace = (href, props, ...kids) => h('a', { href, 'data-ruta': '1', ...props }, ...kids);

  // ───────── Piezas comunes ─────────
  function cabecera({ atras } = {}) {
    const n = S.cfg.negocio;
    return h('header', { class: 'cabecera' }, h('div', { class: 'contenedor' },
      atras && h('button', { class: 'atras', type: 'button', 'aria-label': 'Volver', onclick: atras }, '‹'),
      enlace(BASE, { class: 'marca', 'aria-label': `${n.nombre}, inicio` }, h('img', { src: `${BASE}/logo.png`, alt: '' }), h('span', { texto: n.nombre })),
      h('span', { class: 'espacio' }),
      enlace(`${BASE}/mis-citas`, { class: 'boton sec chico' }, 'Mis citas')));
  }
  function pie() {
    const n = S.cfg.negocio, w = S.cfg.whatsapp;
    return h('footer', { class: 'pie' }, h('div', { class: 'contenedor' },
      h('div', {}, h('span', { class: 'marca-pie', texto: n.nombre }), ` · ${n.direccion}`),
      n.telefono && h('div', {}, 'Teléfono ', h('a', { href: `tel:${n.telefono}` }, telTexto(n.telefono))),
      w.numero && h('div', {}, `WhatsApp +${w.numero}`),
      h('div', {}, n.instagram && [h('a', { href: n.instagram, target: '_blank', rel: 'noopener' }, 'Instagram'), ' · '], n.facebook && [h('a', { href: n.facebook, target: '_blank', rel: 'noopener' }, 'Facebook'), ' · '], enlace(`${BASE}/mis-citas`, {}, 'Mis citas'), ' · ', n.privacidad_url ? h('a', { href: n.privacidad_url, target: '_blank', rel: 'noopener' }, 'Privacidad') : enlace(`${BASE}/privacidad`, {}, 'Privacidad')),
      h('div', { texto: `© ${new Date().getFullYear()} ${n.nombre}. Usamos tus datos solo para gestionar tu cita.` })));
  }
  function whatsappFlotante() {
    if (S.cfg.asistente?.activo) return null;   // con el asistente integrado no hace falta el botón flotante de WhatsApp
    const w = S.cfg.whatsapp;
    const href = w.enlace || (w.simulador ? '/simulador' : null);
    if (!href) return null;
    const a = h('a', { class: 'wa-flotante', href, target: '_blank', rel: 'noopener', 'aria-label': w.enlace ? 'Escríbenos por WhatsApp' : 'Probar el bot de WhatsApp (simulador)', title: w.enlace ? 'Escríbenos por WhatsApp' : 'Probar el bot (simulador)' });
    const s = document.createElementNS('http://www.w3.org/2000/svg', 'svg'); s.setAttribute('width', 30); s.setAttribute('height', 30); s.setAttribute('viewBox', '0 0 24 24'); s.setAttribute('aria-hidden', 'true');
    const p = document.createElementNS('http://www.w3.org/2000/svg', 'path'); p.setAttribute('fill', 'currentColor');
    p.setAttribute('d', 'M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z');
    s.append(p); a.append(s); return a;
  }
  function montar(...nodos) {
    $app.replaceChildren(...nodos.filter(Boolean));
    document.body.classList.toggle('con-barra', !!$app.querySelector('.barra-movil'));
    const t = $app.querySelector('h1'); if (t) { t.setAttribute('tabindex', '-1'); t.focus({ preventScroll: true }); }
  }
  const cargandoVista = () => montar(h('div', { class: 'cargando', role: 'status' }, h('div', { class: 'giro', 'aria-hidden': 'true' }), 'Cargando…'));
  const aviso = (tipo, texto, extra) => h('div', { class: `aviso-box ${tipo}`, role: tipo === 'error' ? 'alert' : 'status' }, texto, extra);

  // ───────── Vista: perfil ─────────
  function vistaPerfil() {
    const c = S.cfg, n = c.negocio, hoyDia = diaSemana(c.agenda.hoy);
    const hero = h('section', { class: 'hero' }, h('div', { class: 'contenedor hero-grid' },
      n.galeria.length
        ? h('div', { class: 'galeria' }, n.galeria.slice(0, 5).map(g => h('img', { src: `${BASE}/${g.src}`, alt: g.alt || '', loading: 'lazy' })))
        : h('div', { class: 'portada' }, h('img', { class: 'logo-grande', src: `${BASE}/logo.png`, alt: `Logo de ${n.nombre}` })),
      h('div', {},
        h('h1', { class: 'titulo', texto: n.nombre }),
        n.frase && h('p', { class: 'frase', texto: n.frase }),
        n.confianza && h('p', { class: 'confianza', texto: `✓ ${n.confianza}` }),
        n.descripcion && h('p', { texto: n.descripcion }),
        h('ul', { class: 'datos-rapidos' },
          h('li', {}, svg(ICONO_RELOJ), h('span', {}, h('span', { class: n.hoy_abierto ? 'punto' : 'punto cerrado', 'aria-hidden': 'true' }), n.hoy_abierto ? `Hoy: ${n.horario.find(x => x.n === hoyDia)?.texto}` : 'Hoy estamos cerrados')),
          h('li', {}, svg(ICONO_PIN), h('span', {}, n.direccion, ' ', n.como_llegar && h('small', { style: 'display:block;color:var(--suave)', texto: n.como_llegar }), n.mapa_url && h('a', { href: n.mapa_url, target: '_blank', rel: 'noopener' }, 'Cómo llegar'))),
          n.telefono && h('li', {}, svg(ICONO_TEL), h('a', { href: `tel:${n.telefono}` }, telTexto(n.telefono)))))));

    const itemServicio = s => h('li', { class: 'servicio', id: `s-${s.id}` },
      h('div', { class: 'serv-cab' }, s.foto && h('img', { class: 'serv-foto', src: `${BASE}/${s.foto}`, alt: s.nombre, loading: 'lazy', width: 64, height: 64 }), h('div', {}, h('h3', { texto: s.nombre }))),
      h('span', { class: s.precio ? 'precio' : 'precio pendiente', texto: precioDe(s) }),
      h('span', { class: 'meta', texto: `${duracion(s.duracion_min)} aprox.${s.paquete && s.precio ? ' · ' + s.paquete.toLowerCase() : ''}` }),
      enlace(`${BASE}/reservar?servicio=${s.id}`, { class: 'mas', 'aria-label': `Reservar ${s.nombre}`, title: 'Reservar' }, '+'),
      h('details', { class: 'info' }, h('summary', {}, h('span', { texto: 'Ver info' })), h('p', { texto: s.descripcion }),
        (s.requiere_valoracion || s.revisar_condiciones) && h('p', { class: 'info-nota', texto: s.requiere_valoracion ? 'La primera cita es de orientación: el equipo revisa tu caso y define contigo el plan.' : 'Una asesora revisa tu caso antes de la cita.' })));
    const servicios = h('section', { class: 'seccion', 'aria-labelledby': 'h-serv' }, h('h2', { id: 'h-serv' }, 'Servicios y valores'),
      h('p', { class: 'ayuda', texto: 'Toca «Ver info +» para conocer cada servicio. Puedes agendar 2 o más en la misma visita.' }),
      grupos().map(([cat, ss], i) => h('details', { class: 'cat', id: `cat-${slug(cat)}`, open: i === 0 ? true : null },
        h('summary', {}, h('span', { class: 'cat-nombre', texto: cat }), h('small', { texto: [`${ss.length} ${ss.length === 1 ? 'servicio' : 'servicios'}`, desdeTxt(ss)].filter(Boolean).join(' · ') })),
        ss.every(s => s.requiere_valoracion) && h('p', { class: 'nota-cat', texto: 'La primera cita es de orientación: el equipo revisa tu piel y tu vello y define contigo el plan. Puedes agendar varias zonas en la misma visita.' }),
        h('ul', { class: 'lista-servicios' }, ss.map(itemServicio)))));

    const como = h('section', { class: 'seccion', 'aria-labelledby': 'h-como' }, h('h2', { id: 'h-como' }, 'Reservar es fácil'),
      h('ol', { style: 'padding-left:20px;margin:0;display:grid;gap:6px' },
        h('li', {}, h('b', {}, 'Elige'), ' uno o varios servicios.'), h('li', {}, h('b', {}, 'Escoge'), ' el día y la hora que te queden bien.'), h('li', {}, h('b', {}, 'Déjanos'), ' tu nombre y tu WhatsApp: te confirmamos por ahí.')),
      h('p', { class: 'nota-pie', texto: 'No pagas nada en línea. Si necesitas cambiar tu cita, lo haces desde el enlace que te enviamos ' + (c.whatsapp.enlace ? 'o escribiéndonos por WhatsApp.' : 'o llamándonos.') }));

    const comodidades = n.comodidades.length ? h('section', { class: 'seccion' }, h('h2', {}, 'Comodidades'), h('ul', { class: 'etiquetas' }, n.comodidades.map(x => h('li', { texto: x })))) : null;

    const op = n.opiniones;
    const opiniones = op && op.items.length ? h('section', { class: 'seccion', 'aria-labelledby': 'h-op' }, h('h2', { id: 'h-op' }, 'Lo que dicen nuestras clientas'),
      h('p', { class: 'op-resumen' }, estrellas(Math.round(op.puntuacion)), h('b', { texto: String(op.puntuacion).replace('.', ',') }), ` · ${op.total} opiniones en ${op.fuente}`),
      h('ul', { class: 'opiniones' }, op.items.map(i => h('li', { class: 'opinion' },
        h('div', { class: 'op-cab' }, estrellas(i.estrellas), h('b', { texto: i.autor }), i.fecha && h('small', { texto: i.fecha })),
        h('p', { texto: `“${i.texto}”` })))),
      h('p', { class: 'nota-pie' }, h('a', { href: op.enlace, target: '_blank', rel: 'noopener' }, `Ver todas en ${op.fuente}`), ' · Opiniones tomadas tal cual de ', op.fuente, '.')) : null;

    const lateral = h('aside', { class: 'lateral' }, h('div', { class: 'panel' },
      enlace(`${BASE}/reservar`, { class: 'boton grande' }, 'Reservar'),
      botonLlamar('boton sec grande'),
      h('h3', { style: 'margin-top:18px' }, 'Horario'),
      h('ul', { class: 'horario' }, n.horario.map(x => h('li', { class: `${x.n === hoyDia ? 'hoy' : ''} ${x.abierto ? '' : 'cerrado'}` }, h('span', { texto: x.dia }), h('span', { texto: x.texto })))),
      (c.whatsapp.enlace || n.instagram || n.facebook) && [h('h3', {}, 'Contacto'), h('ul', { class: 'etiquetas' },
        n.facebook && h('li', { style: 'padding:0;border:0' }, h('a', { href: n.facebook, target: '_blank', rel: 'noopener' }, 'Facebook')),
        c.whatsapp.enlace && h('li', { style: 'padding:0;border:0' }, h('a', { href: c.whatsapp.enlace, target: '_blank', rel: 'noopener' }, 'WhatsApp')),
        n.instagram && h('li', { style: 'padding:0;border:0' }, h('a', { href: n.instagram, target: '_blank', rel: 'noopener' }, 'Instagram')))]));

    document.title = `Centro estético en Pereira · Reserva tu cita · ${n.nombre}`; datosEstructurados();
    const barra = h('div', { class: 'barra-movil' }, h('div', { class: 'fila' }, enlace(`${BASE}/reservar`, { class: 'boton grande', style: 'flex:1;width:auto;min-width:0' }, 'Reservar'), S.cfg.negocio.telefono && h('a', { class: 'boton sec grande', href: `tel:${S.cfg.negocio.telefono}`, 'aria-label': `Llamar al ${telTexto(S.cfg.negocio.telefono)}`, style: 'min-width:0;width:auto;flex:0 0 auto;padding-inline:22px' }, 'Llamar')));   // en celular el botón principal siempre está a mano
    montar(cabecera(), hero, h('main', { class: 'contenedor principal', id: 'contenido' }, h('div', {}, servicios, como, comodidades, opiniones), lateral), pie(), barra, whatsappFlotante());
  }

  // ───────── Vista: reservar (3 pasos) ─────────
  const PASOS = ['Servicios', 'Fecha y hora', 'Tus datos'];
  const sinCupos = () => h('div', { class: 'vacio' }, 'Por ahora no hay horarios libres para esta combinación en los próximos días. ',
    S.cfg.whatsapp.enlace ? h('a', { href: S.cfg.whatsapp.enlace, target: '_blank', rel: 'noopener' }, 'Escríbenos por WhatsApp') : 'Inténtalo más tarde', ' y te ayudamos a encontrar un espacio.');

  async function cargarDias(base = `/api/publico/disponibilidad?servicios=${S.sel.join(',')}`) {
    S.cargando = true; S.dias = []; S.horas = []; S.hora = null; S.fecha = null; render();
    try {
      const r = await api(base);
      S.dias = r.dias; S.duracion = r.duracion_min ?? S.duracion;
      const primero = S.dias[0]; S.mes = primero ? primero.fecha.slice(0, 7) : S.cfg.agenda.hoy.slice(0, 7);
    } catch (e) { S.aviso = { t: 'error', m: e.message }; }
    S.cargando = false; render();
  }
  async function elegirDia(fecha, base = `/api/publico/disponibilidad?servicios=${S.sel.join(',')}`) {
    S.fecha = fecha; S.hora = null; S.horas = []; render();
    try { S.horas = (await api(`${base}${base.includes('?') ? '&' : '?'}fecha=${fecha}`)).horas; } catch (e) { S.aviso = { t: 'error', m: e.message }; }
    render();
  }

  function calendario(baseDias, baseHoras) {
    const hoy = S.cfg.agenda.hoy, [y, m] = S.mes.split('-').map(Number);
    const libres = new Map(S.dias.map(d => [d.fecha, d.cupos]));
    const lim = new Date(Date.UTC(+hoy.slice(0, 4), +hoy.slice(5, 7) - 1, +hoy.slice(8, 10) + S.cfg.agenda.dias_adelante)).toISOString().slice(0, 7);
    const primero = new Date(Date.UTC(y, m - 1, 1)), offset = (primero.getUTCDay() + 6) % 7, total = new Date(Date.UTC(y, m, 0)).getUTCDate();
    const mover = d => { const n = new Date(Date.UTC(y, m - 1 + d, 1)).toISOString().slice(0, 7); S.mes = n; render(); };
    const celdas = [];
    for (let i = 0; i < offset; i++) celdas.push(h('span', {}));
    for (let d = 1; d <= total; d++) {
      const f = `${S.mes}-${String(d).padStart(2, '0')}`, libre = libres.has(f);
      celdas.push(h('button', { type: 'button', class: `cal-dia ${libre ? 'libre' : ''} ${f === hoy ? 'hoy' : ''}`, disabled: !libre, 'aria-pressed': String(S.fecha === f), 'aria-label': `${fechaLarga(f)}${libre ? '' : ', sin horarios'}`, onclick: () => elegirDia(f, baseHoras) }, String(d)));
    }
    return h('div', { class: 'calendario' },
      h('div', { class: 'cal-cab' },
        h('button', { type: 'button', 'aria-label': 'Mes anterior', disabled: S.mes <= hoy.slice(0, 7), onclick: () => mover(-1) }, '‹'),
        h('h2', { 'aria-live': 'polite', texto: `${MESES[m - 1]} ${y}` }),
        h('button', { type: 'button', 'aria-label': 'Mes siguiente', disabled: S.mes >= lim, onclick: () => mover(1) }, '›')),
      h('div', { class: 'cal-grid', role: 'group', 'aria-label': 'Días' }, ['L', 'M', 'M', 'J', 'V', 'S', 'D'].map(x => h('span', { class: 'cal-dow', 'aria-hidden': 'true', texto: x })), celdas));
  }
  function horasPanel() {
    if (!S.fecha) return h('div', { class: 'horas' }, h('p', { class: 'vacio', texto: 'Elige un día para ver los horarios.' }));
    const grupos = [['Mañana', x => +x.slice(0, 2) < 12], ['Tarde', x => +x.slice(0, 2) >= 12 && +x.slice(0, 2) < 18], ['Noche', x => +x.slice(0, 2) >= 18]];
    return h('div', { class: 'horas' },
      h('h2', { style: 'margin:0 0 4px;font-size:1.05rem', texto: mayus(fechaLarga(S.fecha)) }),
      !S.horas.length ? h('p', { class: 'vacio', texto: 'No quedan horarios este día. Prueba con otro.' }) : grupos.map(([nombre, f]) => {
        const hs = S.horas.filter(f); return hs.length && [h('p', { class: 'franja', texto: nombre }), h('div', { class: 'horas-grid' }, hs.map(x => h('button', { type: 'button', class: 'hora', 'aria-pressed': String(S.hora === x), onclick: () => { S.hora = x; render(); } }, hora12(x))))];
      }));
  }

  function resumen(ids, { boton } = {}) {
    const n = S.cfg.negocio, min = S.duracion;
    return h('div', { class: 'resumen' },
      h('div', { class: 'lugar' }, h('img', { src: `${BASE}/logo.png`, alt: '' }), h('div', {}, h('b', { texto: n.nombre }), h('small', { texto: n.direccion }))),
      ids.length ? ids.map(i => h('div', { class: 'res-item' }, h('div', {}, servicio(i).nombre, h('small', { texto: duracion(servicio(i).duracion_min) + (servicio(i).requiere_valoracion ? ' · cita de orientación' : '') })), h('span', { texto: servicio(i).precio ? cop(servicio(i).precio) : 'Por confirmar' }))) : h('p', { class: 'vacio-res', texto: 'Aún no has elegido servicios.' }),
      S.fecha && S.hora && [h('div', { class: 'res-fila' }, h('span', {}, 'Cuándo'), h('b', { texto: `${mayus(fechaLarga(S.fecha))} · ${hora12(S.hora)}` }))],
      ids.length > 0 && h('div', { class: 'res-total' }, h('span', {}, 'Total'), h('span', {}, h('span', { style: ids.some(i => !servicio(i).precio) ? 'font-size:.9rem' : '', texto: totalTxt(ids) }), h('small', { texto: min ? duracion(min) : '' }))),
      boton);
  }

  function limpiarError(el, id) { if (!S.err[id]) return; delete S.err[id]; el.removeAttribute('aria-invalid'); (el.closest('.campo') || el.closest('div'))?.querySelector('.error-msg')?.remove(); }
  function campo(id, etiqueta, control, { opcional, ayuda } = {}) {
    return h('div', { class: 'campo' }, h('label', { for: id }, etiqueta, opcional && h('span', { class: 'opcional', texto: ' (opcional)' })), control, ayuda && h('small', { id: `${id}-ayuda`, texto: ayuda }), S.err[id] && h('span', { class: 'error-msg', id: `${id}-error`, role: 'alert', texto: S.err[id] }));
  }
  function validar() {
    const f = S.f, e = {};
    if (f.nombre.trim().length < 3) e.nombre = 'Escribe tu nombre y apellido.';
    const num = f.telefono.replace(/\D/g, '');
    if (f.pais === '57' ? !/^3\d{9}$/.test(num) : !/^\d{7,12}$/.test(num)) e.telefono = f.pais === '57' ? 'Escribe tu celular de 10 dígitos (empieza por 3).' : 'Escribe un número de WhatsApp válido.';
    if (f.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.email.trim())) e.email = 'El correo no parece válido.';
    if (!f.acepto) e.acepto = 'Para reservar necesitas aceptar el tratamiento de tus datos.';
    S.err = e; return !Object.keys(e).length;
  }
  function formularioDatos() {
    const f = S.f, inp = (id, extra) => h('input', { id, value: f[id], 'aria-invalid': S.err[id] ? 'true' : null, 'aria-describedby': S.err[id] ? `${id}-error` : null, oninput: e => { f[id] = e.target.value; limpiarError(e.target, id); }, ...extra });
    return h('form', { class: 'formulario', novalidate: true, onsubmit: enviarReserva, 'aria-label': 'Tus datos' },
      campo('nombre', 'Nombre y apellido', inp('nombre', { autocomplete: 'name', required: true })),
      campo('telefono', 'Tu WhatsApp', h('div', { class: 'tel' },
        h('select', { id: 'pais', 'aria-label': 'Indicativo del país', onchange: e => { f.pais = e.target.value; } }, S.cfg.paises.map(p => h('option', { value: p.codigo, selected: p.codigo === f.pais }, `${p.iso} +${p.codigo}`))),
        inp('telefono', { type: 'tel', inputmode: 'tel', autocomplete: 'tel-national', required: true, placeholder: f.pais === '57' ? '300 123 4567' : '' })), { ayuda: 'Con tu celular te confirmamos y encuentras tu cita si necesitas cambiarla.' }),
      campo('email', 'Correo', inp('email', { type: 'email', autocomplete: 'email' }), { opcional: true, ayuda: 'Solo si quieres recibir también la confirmación por correo.' }),
      campo('notas', 'Notas para el equipo', h('textarea', { id: 'notas', maxlength: 300, placeholder: 'Algo que quieras contarnos (opcional).', oninput: e => { f.notas = e.target.value; } }, f.notas), { opcional: true, ayuda: 'Para temas de salud, una asesora te escribirá por WhatsApp: no es necesario detallarlos aquí.' }),
      h('div', { class: 'trampa', 'aria-hidden': 'true' }, h('label', { for: 'sitio' }, 'No llenes este campo'), h('input', { id: 'sitio', tabindex: '-1', autocomplete: 'off', oninput: e => { f.sitio = e.target.value; } })),
      h('div', {}, h('label', { class: 'consentimiento' }, h('input', { type: 'checkbox', id: 'acepto', checked: f.acepto, 'aria-invalid': S.err.acepto ? 'true' : null, onchange: e => { f.acepto = e.target.checked; limpiarError(e.target, 'acepto'); } }),
        h('span', {}, 'Acepto el ', enlace(`${BASE}/privacidad`, { target: '_blank' }, 'tratamiento de mis datos'), ' para gestionar esta cita.')), S.err.acepto && h('span', { class: 'error-msg', role: 'alert', texto: S.err.acepto })),
      h('div', { class: 'aviso-box info' }, h('b', {}, 'Antes de venir. '), S.cfg.negocio.politica_cambios, ' No pagas nada en línea.'));
  }
  async function enviarReserva(e) {
    e?.preventDefault?.();
    if (S.enviando) return;
    S.aviso = null;
    if (!validar()) { render(); setTimeout(() => $app.querySelector('[aria-invalid="true"]')?.focus(), 0); return; }
    S.enviando = true; render();
    try {
      const r = await api('/api/publico/citas', { method: 'POST', body: { servicios: S.sel, inicio: `${S.fecha}T${S.hora}`, nombre: S.f.nombre, pais: S.f.pais, telefono: S.f.telefono, email: S.f.email, notas: S.f.notas, acepto: true, sitio: S.f.sitio, ref: S.ref } });
      if (r.token) guardado.poner([{ token: r.token, codigo: r.codigo, ts: Date.now() }, ...guardado.leer().filter(x => x.token !== r.token)]);
      S.res = r; S.enviando = false; history.replaceState(null, '', `${BASE}/reservar?listo=${encodeURIComponent(r.codigo)}`); render(); window.scrollTo(0, 0);
    } catch (err) {
      S.enviando = false; S.aviso = { t: 'error', m: err.message };
      if (err.estado === 409 && /horario/i.test(err.message)) { S.paso = 2; S.hora = null; await cargarDias(); if (S.dias.some(d => d.fecha === S.fecha)) await elegirDia(S.fecha); return; }
      render(); window.scrollTo(0, 0);
    }
  }

  function vistaReservar() {
    if (S.res) return vistaExito();
    document.title = `Reservar · ${S.cfg.negocio.nombre}`;
    const lista = S.cfg.servicios, paso = S.paso;
    const puede = paso === 1 ? S.sel.length > 0 : paso === 2 ? !!(S.fecha && S.hora) : true;
    const avanzar = () => {
      S.aviso = null;
      if (paso === 1) { S.paso = 2; cargarDias(); } else if (paso === 2) { S.paso = 3; render(); window.scrollTo(0, 0); } else enviarReserva();
    };
    const etiquetaBoton = paso === 3 ? (S.enviando ? 'Confirmando…' : 'Confirmar cita') : 'Continuar';
    const boton = h('button', { class: 'boton grande', type: 'button', disabled: !puede || S.enviando, onclick: avanzar, style: 'margin-top:14px' }, etiquetaBoton);
    const alternar = id => {
      const s = servicio(id), ya = S.sel.includes(id);
      if (ya) S.sel = S.sel.filter(x => x !== id);
      else if (s.solo) S.sel = [...S.sel.filter(x => servicio(x).solo && servicio(x).categoria === s.categoria), id].slice(-MAX_SERV);   // láser y postoperatorio: solo con los de su categoría
      else S.sel = [...S.sel.filter(x => !servicio(x).solo), id].slice(-MAX_SERV);
      S.fecha = null; S.hora = null; S.dias = []; S.horas = []; render();
    };

    let cuerpo;
    const gs = grupos();
    if (!gs.some(([c]) => c === S.cat)) S.cat = (S.sel.length && servicio(S.sel[0])?.categoria) || gs[0]?.[0];
    const delaCat = (gs.find(([c]) => c === S.cat) || [null, []])[1];
    if (paso === 1) cuerpo = [h('h1', { texto: 'Elige tus servicios' }), h('p', { class: 'ayuda', texto: `Agrega 2 o más servicios (hasta ${MAX_SERV}) en la misma visita, de una o de varias categorías. Los hacemos uno tras otro, en el orden en que los elijas.` }),
      h('div', { class: 'cat-tabs', role: 'tablist', 'aria-label': 'Categorías' }, gs.map(([c]) => { const nSel = S.sel.filter(i => servicio(i)?.categoria === c).length; return h('button', { type: 'button', role: 'tab', class: 'cat-tab', 'aria-selected': String(c === S.cat), onclick: () => { S.cat = c; render(); } }, c, nSel > 0 && h('span', { class: 'cat-sel', texto: String(nSel) })); })),
      h('div', { class: 'opciones', role: 'group', 'aria-label': S.cat }, delaCat.map(s => h('div', { class: 'opcion-wrap' },
        h('button', { type: 'button', class: 'opcion', 'aria-pressed': String(S.sel.includes(s.id)), onclick: () => alternar(s.id) },
          h('span', { class: 'n', texto: s.nombre }), h('span', { class: 'm', texto: `${duracion(s.duracion_min)}${s.paquete && s.precio ? ' · ' + s.paquete.toLowerCase() : ''}` }), h('span', { class: s.precio ? 'p' : 'p pendiente', texto: precioDe(s) })),
        h('details', { class: 'info' }, h('summary', {}, h('span', { texto: 'Ver info' })), h('p', { texto: s.descripcion }))))),
      esOrientacion(S.sel) && aviso('aviso', 'La primera cita de depilación láser es de orientación: el equipo revisa tu caso y define contigo el plan. No hay un número de sesiones igual para todas las personas.'),
      S.sel.some(i => servicio(i)?.revisar_condiciones) && aviso('aviso', 'Antes de tu cita una asesora revisará tu caso contigo y te escribirá para confirmar los detalles. Estos servicios se agendan solos o junto a otros de su misma categoría (el masaje postoperatorio requiere la indicación de tu cirujano).')];
    else if (paso === 2) cuerpo = [h('h1', { texto: 'Elige fecha y hora' }),
      h('p', { class: 'ayuda' }, S.sel.map(i => servicio(i).nombre).join(' + '), ' · ', h('button', { type: 'button', class: 'boton sec chico', onclick: () => { S.paso = 1; render(); } }, 'Cambiar servicios')),
      S.cargando ? h('div', { class: 'cargando', role: 'status' }, h('div', { class: 'giro', 'aria-hidden': 'true' }), 'Buscando horarios…') : (S.dias.length ? h('div', { class: 'fecha-hora' }, calendario(), horasPanel()) : sinCupos())];
    else cuerpo = [h('h1', { texto: 'Tus datos' }), h('p', { class: 'ayuda', texto: 'Con tu celular encuentras tu cita si necesitas cambiarla.' }), formularioDatos()];

    const barra = h('div', { class: 'barra-movil' }, h('div', { class: 'fila' }, h('div', { class: 'tot' }, S.sel.length ? [h('b', { texto: S.sel.some(i => servicio(i).precio) ? totalTxt(S.sel) : `${S.sel.length} ${S.sel.length === 1 ? 'servicio' : 'servicios'}` }), S.fecha && S.hora ? `${mayus(fechaLarga(S.fecha))} · ${hora12(S.hora)}` : 'Elige servicio, día y hora'] : 'Elige al menos un servicio'),
      h('button', { class: 'boton', type: 'button', disabled: !puede || S.enviando, onclick: avanzar }, etiquetaBoton)));
    const pasosEl = h('ol', { class: 'pasos', 'aria-label': 'Pasos de la reserva' }, PASOS.map((p, i) => h('li', { class: i + 1 < paso ? 'hecho' : i + 1 === paso ? 'actual' : '', 'aria-current': i + 1 === paso ? 'step' : null }, `${i + 1}. ${p}`)));
    montar(
      cabecera({ atras: () => { if (S.paso > 1) { S.paso--; S.aviso = null; render(); } else ir(BASE); } }),
      h('main', { class: 'contenedor reserva', id: 'contenido' }, pasosEl, S.aviso && aviso(S.aviso.t, S.aviso.m),
        h('div', { class: 'reserva-grid' }, h('div', {}, cuerpo), h('aside', { class: 'lateral' }, resumen(S.sel, { boton }))), S.enviando && h('div', { class: 'solo-lectores', role: 'status', texto: 'Confirmando tu cita…' })),
      barra, pie(), whatsappFlotante());
  }

  // ───────── Confirmación ─────────
  function icsDe(citas, codigo) {
    const n = S.cfg.negocio, pad = x => String(x).padStart(2, '0');
    const utc = (iso, sumarMin = 0) => { const [y, m, d] = partes(iso), [hh, mm] = iso.slice(11, 16).split(':').map(Number); const t = new Date(Date.UTC(y, m - 1, d, hh + 5, mm + sumarMin)); return `${t.getUTCFullYear()}${pad(t.getUTCMonth() + 1)}${pad(t.getUTCDate())}T${pad(t.getUTCHours())}${pad(t.getUTCMinutes())}00Z`; };
    const lineas = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Valencia Stetic//Reservas//ES', 'CALSCALE:GREGORIAN'];
    citas.forEach((c, i) => lineas.push('BEGIN:VEVENT', `UID:${codigo}-${i}@valenciastetic`, `DTSTAMP:${utc(new Date().toISOString().slice(0, 16), 300)}`, `DTSTART:${utc(c.inicio)}`, `DTEND:${utc(c.inicio, c.duracion_min || 60)}`,
      `SUMMARY:${c.servicio} · ${n.nombre}`, `LOCATION:${n.direccion}`, `DESCRIPTION:Código de reserva ${codigo}`, 'END:VEVENT'));
    lineas.push('END:VCALENDAR'); return lineas.join('\r\n');
  }
  function descargarIcs(citas, codigo) {
    const url = URL.createObjectURL(new Blob([icsDe(citas, codigo)], { type: 'text/calendar;charset=utf-8' }));
    const a = h('a', { href: url, download: 'cita-valencia-stetic.ics' }); document.body.append(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(url), 2000);
  }
  function fichaCitas(citas, { codigo, nombre, estado, telefono } = {}) {
    const n = S.cfg.negocio, total = totalTxt(citas.map(c => c.servicio_id)), hayPend = citas.some(c => !servicio(c.servicio_id)?.precio);
    return h('div', { class: 'ficha' },
      codigo && h('div', { class: 'fila' }, h('span', {}, 'Código'), h('b', {}, h('span', { class: 'codigo', texto: codigo }))),
      estado && h('div', { class: 'fila' }, h('span', {}, 'Estado'), h('b', {}, h('span', { class: `estado ${estado}`, texto: { agendada: 'Agendada', confirmada: 'Confirmada', cancelada: 'Cancelada', asistio: 'Asistió' }[estado] || estado }))),
      nombre && h('div', { class: 'fila' }, h('span', {}, 'A nombre de'), h('b', { texto: nombre + (telefono ? ` · ${telefono}` : '') })),
      citas.map(c => h('div', { class: 'fila' }, h('span', {}, c.servicio, c.orientacion && ' (orientación)'), h('b', { texto: `${hora12(c.inicio.slice(11, 16))}${c.duracion_min ? ' · ' + duracion(c.duracion_min) : ''}` }))),
      h('div', { class: 'fila' }, h('span', {}, 'Día'), h('b', { texto: mayus(fechaLarga(citas[0].inicio)) })),
      h('div', { class: 'fila' }, h('span', {}, 'Lugar'), h('b', { texto: n.direccion })),
      h('div', { class: 'fila' }, h('span', {}, 'Valor'), h('b', { texto: hayPend ? `${total} · el equipo confirma el valor pendiente` : total })));
  }
  function vistaExito() {
    const r = S.res, n = S.cfg.negocio, conWa = !!(r.whatsapp || r.simulador);
    document.title = `Cita agendada · ${n.nombre}`;
    montar(cabecera(), h('main', { class: 'contenedor', id: 'contenido', style: 'padding-bottom:56px' }, h('div', { class: 'exito' },
      h('div', { class: 'sello', 'aria-hidden': 'true', texto: '✓' }), h('h1', { texto: 'Tu cita quedó agendada' }),
      h('p', { class: 'ayuda', texto: conWa ? 'Te escribiremos por WhatsApp para confirmarla y enviarte los recordatorios.' : `Guarda tu código ${r.codigo}. El equipo se comunicará contigo para confirmar tu cita${n.telefono ? `; si prefieres, llámanos al ${telTexto(n.telefono)}` : ''}.` })),
      r.revisar && aviso('aviso', conWa ? 'Una asesora del equipo revisará tu caso y te contactará por WhatsApp antes de la cita.' : 'Una asesora del equipo revisará tu caso y te contactará antes de la cita.'),
      fichaCitas(r.citas, { codigo: r.codigo }),
      h('div', { class: 'acciones' },
        r.whatsapp && h('a', { class: 'boton grande', href: r.whatsapp, target: '_blank', rel: 'noopener' }, 'Confirmar por WhatsApp'),
        !r.whatsapp && r.simulador && h('a', { class: 'boton grande', href: r.simulador, target: '_blank', rel: 'noopener' }, 'Confirmar por WhatsApp (simulador)'),
        !conWa && botonLlamar('boton grande'),
        h('button', { class: 'boton sec', type: 'button', onclick: () => descargarIcs(r.citas, r.codigo) }, 'Agregar a mi calendario'),
        enlace(r.enlace_gestion, { class: 'boton sec' }, 'Ver, cambiar o cancelar mi reserva'),
        h('button', { class: 'boton sec', type: 'button', onclick: () => { S.res = null; S.sel = []; S.paso = 1; S.fecha = null; S.hora = null; S.f.acepto = false; ir(BASE); } }, 'Volver al inicio')),
      h('p', { class: 'nota-pie', style: 'text-align:center;margin-top:18px', texto: `${n.politica_cambios} No pagas nada en línea.` })), pie(), whatsappFlotante());
  }

  // ───────── Vista: gestionar una reserva con su enlace privado ─────────
  async function vistaCita({ token }) {
    if (!S.cita || S.cita.token !== token) {
      cargandoVista();
      try { S.cita = { ...(await api(`/api/publico/cita/${token}`)), token }; }
      catch (e) { return montar(cabecera(), h('main', { class: 'contenedor', style: 'padding:40px 0' }, h('h1', { texto: 'No encontramos esa reserva' }), aviso('error', e.message), enlace(BASE, { class: 'boton' }, 'Ir al inicio')), pie()); }
    }
    const r = S.cita; document.title = `Tu reserva · ${S.cfg.negocio.nombre}`;
    if (S.modoCambio) return vistaCambio(token, r);
    const w = S.cfg.whatsapp, texto = `Hola, quiero revisar mi reserva ${r.codigo} en Valencia Stetic.`;
    const recargar = () => { S.cita = null; render(); };
    montar(cabecera(), h('main', { class: 'contenedor', id: 'contenido', style: 'padding:24px 0 56px;max-width:640px' },
      h('h1', { texto: 'Tu reserva' }), S.aviso && aviso(S.aviso.t, S.aviso.m),
      fichaCitas(r.citas, { codigo: r.codigo, nombre: r.nombre, estado: r.estado, telefono: r.telefono }),
      h('div', { class: 'acciones' },
        r.puede_cambiar && h('button', { class: 'boton', type: 'button', onclick: () => { S.modoCambio = true; S.diasListos = false; S.aviso = null; S.fecha = null; S.hora = null; S.dias = []; S.horas = []; render(); } }, 'Cambiar horario'),
        r.puede_cambiar && h('button', { class: 'boton peligro', type: 'button', onclick: () => pedirCancelar(token, recargar) }, 'Cancelar reserva'),
        !r.puede_cambiar && r.estado !== 'cancelada' && h('p', { class: 'nota-pie', texto: r.plazo_horas != null ? `Pasó el plazo para cambiarla por aquí (${r.plazo_horas} h antes). Escríbenos y lo revisamos.` : 'Esta reserva ya no se puede modificar por aquí.' }),
        w.enlace && h('a', { class: 'boton sec', href: w.enlace.replace(/text=[^&]*/, 'text=' + encodeURIComponent(texto)), target: '_blank', rel: 'noopener' }, 'Escribirnos por WhatsApp'),
        r.estado !== 'cancelada' && h('button', { class: 'boton sec', type: 'button', onclick: () => descargarIcs(r.citas, r.codigo) }, 'Agregar a mi calendario'),
        r.estado === 'cancelada' && enlace(`${BASE}/reservar`, { class: 'boton' }, 'Reservar de nuevo')),
      h('p', { class: 'nota-pie', style: 'text-align:center;margin-top:16px', texto: r.politica_cambios })), pie(), whatsappFlotante());
  }
  function pedirCancelar(token, recargar) {
    const caja = h('div', { class: 'aviso-box error', role: 'alertdialog', 'aria-label': 'Confirmar cancelación' }, h('p', { style: 'margin:0 0 10px', texto: '¿Seguro que quieres cancelar esta reserva? Liberaremos el horario.' }),
      h('div', { style: 'display:flex;gap:10px;flex-wrap:wrap' },
        h('button', { class: 'boton peligro chico', type: 'button', onclick: async () => {
          try { await api(`/api/publico/cita/${token}/cancelar`, { method: 'POST', body: {} }); S.aviso = { t: 'ok', m: 'Tu reserva quedó cancelada. Cuando quieras, puedes reservar de nuevo.' }; } catch (e) { S.aviso = { t: 'error', m: e.message }; }
          recargar();
        } }, 'Sí, cancelar'),
        h('button', { class: 'boton sec chico', type: 'button', onclick: () => caja.remove() }, 'No, mantenerla')));
    $app.querySelector('.acciones').before(caja); caja.scrollIntoView({ block: 'center' });
  }
  // Cambio de horario: reutiliza el calendario y las horas del flujo de reserva, pidiendo la disponibilidad al enlace de la reserva (sin contar la propia cita).
  async function vistaCambio(token, r) {
    const base = `/api/publico/cita/${token}/disponibilidad`;
    if (!S.diasListos) {
      S.diasListos = true; S.cargando = true;
      api(base).then(j => { S.dias = j.dias; S.mes = (S.dias[0]?.fecha || S.cfg.agenda.hoy).slice(0, 7); }).catch(e => { S.aviso = { t: 'error', m: e.message }; }).finally(() => { S.cargando = false; render(); });
    }
    const guardar = async () => {
      try { await api(`/api/publico/cita/${token}/reprogramar`, { method: 'POST', body: { inicio: `${S.fecha}T${S.hora}` } }); S.modoCambio = false; S.aviso = { t: 'ok', m: 'Listo, cambiamos tu horario. Te avisaremos por WhatsApp.' }; }
      catch (e) { S.aviso = { t: 'error', m: e.message }; }
      S.cita = null; S.dias = []; S.fecha = null; S.hora = null; render();
    };
    montar(cabecera({ atras: () => { S.modoCambio = false; S.aviso = null; render(); } }), h('main', { class: 'contenedor reserva', id: 'contenido', style: 'padding-bottom:56px' },
      h('h1', { texto: 'Elige el nuevo horario' }), S.aviso && aviso(S.aviso.t, S.aviso.m),
      h('p', { class: 'ayuda', texto: r.citas.map(c => c.servicio).join(' + ') }),
      S.cargando ? h('div', { class: 'cargando', role: 'status' }, h('div', { class: 'giro', 'aria-hidden': 'true' }), 'Buscando horarios…') : (S.dias.length ? h('div', { class: 'fecha-hora' }, calendario(null, base), horasPanel()) : sinCupos()),
      h('div', { style: 'max-width:420px;margin-top:20px' }, h('button', { class: 'boton grande', type: 'button', disabled: !(S.fecha && S.hora), onclick: guardar }, 'Guardar el nuevo horario'))), pie(), whatsappFlotante());
  }

  // ───────── Vista: mis citas (las reservas hechas desde este navegador) ─────────
  async function vistaMisCitas() {
    cargandoVista(); document.title = `Mis citas · ${S.cfg.negocio.nombre}`;
    const w = S.cfg.whatsapp, guardadas = guardado.leer(), tarjetas = [];
    for (const g of guardadas) { try { const r = await api(`/api/publico/cita/${g.token}`); tarjetas.push({ g, r }); } catch { /* reserva ya no existe */ } }
    montar(cabecera({ atras: () => ir(BASE) }), h('main', { class: 'contenedor', id: 'contenido', style: 'padding:24px 0 56px;max-width:640px' }, h('h1', { texto: 'Mis citas' }),
      tarjetas.length ? [h('p', { class: 'ayuda', texto: 'Estas son las reservas que hiciste desde este dispositivo.' }), ...tarjetas.map(({ g, r }) => h('div', { class: 'ficha' },
        h('div', { class: 'fila' }, h('span', {}, 'Código'), h('b', {}, h('span', { class: 'codigo', texto: r.codigo }))),
        h('div', { class: 'fila' }, h('span', {}, r.citas.map(c => c.servicio).join(' + ')), h('b', { texto: `${mayus(fechaLarga(r.citas[0].inicio))} · ${hora12(r.citas[0].inicio.slice(11, 16))}` })),
        h('div', { class: 'fila' }, h('span', {}, 'Estado'), h('b', {}, h('span', { class: `estado ${r.estado}`, texto: { agendada: 'Agendada', confirmada: 'Confirmada', cancelada: 'Cancelada', asistio: 'Asistió' }[r.estado] }))),
        h('div', { style: 'margin-top:10px' }, enlace(`${BASE}/cita/${g.token}`, { class: 'boton sec chico' }, 'Ver, cambiar o cancelar'))))]
        : [h('p', { class: 'ayuda', texto: 'No encontramos reservas hechas desde este dispositivo. Si reservaste por WhatsApp o desde otro celular, escríbenos y el asistente te muestra tus citas.' })],
      h('div', { class: 'acciones', style: 'margin-top:16px' }, enlace(`${BASE}/reservar`, { class: 'boton' }, 'Reservar una cita'),
        w.enlace && h('a', { class: 'boton sec', target: '_blank', rel: 'noopener', href: w.enlace.replace(/text=[^&]*/, 'text=' + encodeURIComponent('Hola, quiero ver mis citas en Valencia Stetic.')) }, 'Ver mis citas por WhatsApp'))), pie(), whatsappFlotante());
  }

  // ───────── Vista: privacidad (borrador a validar con el centro) ─────────
  // Recorrido de demostración (lo dibuja asistente.js; solo existe con MODO_DEMO=1)
  function vistaDemo() {
    document.title = `Demostración · ${S.cfg.negocio.nombre}`;
    const raiz = h('div', { id: 'demo-raiz' });
    montar(cabecera(), h('main', { class: 'contenedor', id: 'contenido', style: 'padding:24px 0 72px;max-width:820px' }, raiz), pie());
    window.VSAsistente ? window.VSAsistente.pintarDemo(raiz) : setTimeout(() => window.VSAsistente?.pintarDemo(raiz), 400);
  }
  function vistaPrivacidad() {
    const n = S.cfg.negocio; document.title = `Privacidad · ${n.nombre}`;
    montar(cabecera({ atras: () => ir(BASE) }), h('main', { class: 'contenedor texto-legal', id: 'contenido' },
      h('p', { class: 'borrador', texto: 'Borrador por validar: este texto debe ser revisado por el centro (y su asesor legal) antes de publicarse.' }),
      h('h1', { texto: 'Cómo tratamos tus datos' }),
      h('p', {}, `${n.nombre} usa los datos que dejas al reservar (nombre, número de WhatsApp, correo si lo escribes y las notas) únicamente para gestionar tu cita: confirmarla, recordártela, atender cambios o cancelaciones y comunicarnos contigo sobre ese servicio.`),
      h('h2', { texto: 'Qué guardamos' }), h('p', {}, 'Tu nombre, tu número de WhatsApp, tu correo (opcional), las notas que escribas, el servicio y el horario reservados, y de qué página o anuncio llegaste (sin datos personales). No guardamos datos clínicos en etiquetas: los temas de salud los atiende una persona del equipo.'),
      h('h2', { texto: 'Con quién los compartimos' }), h('p', {}, 'Con el equipo del centro y con los proveedores tecnológicos necesarios para enviarte mensajes (por ejemplo, WhatsApp de Meta). No vendemos tus datos.'),
      h('h2', { texto: 'Tus derechos' }), h('p', {}, 'Puedes pedir conocer, actualizar o eliminar tus datos, y dejar de recibir mensajes escribiendo "no quiero mensajes" por WhatsApp o contactándonos por Instagram.'),
      h('h2', { texto: 'Contacto del responsable' }), h('p', {}, `${n.nombre} · ${n.direccion}.`)), pie());
  }

  // ───────── Render ─────────
  let inicioReserva = false;
  function render() {
    if (!S.cfg) return;
    const r = ruta();
    if (r.v !== 'reservar') inicioReserva = false;
    if (r.v !== 'cita') { S.modoCambio = false; S.cita = null; }
    if (r.v !== 'reservar' && S.res) S.res = null;
    if (r.v === 'perfil') return vistaPerfil();
    if (r.v === 'reservar') { iniciarReserva(); return vistaReservar(); }
    if (r.v === 'mis-citas') return vistaMisCitas();
    if (r.v === 'privacidad') return vistaPrivacidad();
    if (r.v === 'demo') return vistaDemo();
    if (r.v === 'cita') return vistaCita(r);
  }
  function iniciarReserva() {
    if (inicioReserva) return; inicioReserva = true;
    const q = new URLSearchParams(location.search);
    const pre = (q.get('servicio') || '').split(',').filter(id => servicio(id)).slice(0, 4);
    if (pre.length && !S.sel.length) {
      S.sel = pre.some(i => servicio(i).solo) ? [pre.find(i => servicio(i).solo)] : pre;
      S.paso = 2; setTimeout(cargarDias, 0); // viene de un servicio concreto (perfil, anuncio o bot): se salta directo a elegir día y hora
    }
  }

  // ───────── Arranque ─────────
  (async function arrancar() {
    capturarRef();
    try { S.cfg = await api('/api/publico/config'); } catch (e) { $app.replaceChildren(h('div', { class: 'cargando' }, 'No pudimos cargar la página. Recárgala en un momento o escríbenos por Instagram (@valenciastetic).')); return; }
    render();
  })();
})();
