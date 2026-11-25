(()=>{var Jo=Object.defineProperty;var en=(e,a)=>()=>(e&&(a=e(e=0)),a);var an=(e,a)=>{for(var o in a)Jo(e,o,{get:a[o],enumerable:!0})};var Eo={};an(Eo,{default:()=>$n});var $n,qo=en(()=>{$n={}});globalThis.__VS_ARCHIVOS={"config/negocio.json":`{
  "_nota": "Datos del centro. Todo lo marcado en 'pendientes_confirmar' debe validarlo Valencia Stetic antes de activar la pauta.",
  "pendientes_confirmar": [
    "diferencias entre las listas anteriores y el Contexto Maestro (se us\xF3 el Contexto Maestro): lifting $65.000, post operatorio x20 $1.150.000, reductor intensivo $1.000.000, masaje relajante b\xE1sico $95.000; Reductor pro ($1.185.000) ya no est\xE1 en el cat\xE1logo",
    "medios de pago aceptados (hoy el bot dice que los confirma el equipo)",
    "promociones de aniversario (hasta el 15 dic 2026): se conservan las tres que se agendan en l\xEDnea (l\xE1ser axilas x10, l\xE1ser bikini x10 y combo belleza); las otras cinco se atienden por contacto",
    "cat\xE1logo y textos cargados desde el \xABContexto Maestro\xBB (25 nov 2026): 87 servicios con precios y duraciones; confirmar con el centro cualquier cambio de precios y los valores variables (mesoterapia facial, sueroterapia, remoci\xF3n de tatuajes, subcisi\xF3n, cera de pecho, abdomen y espalda)",
    "duraciones: la agenda usa la duraci\xF3n real de cada servicio; si el centro prefiere un bloque fijo por ahora, poner agenda.duracion_fija_min (por ejemplo 30) en config/negocio.json",
    "validar \xABM\xE1s de 10 a\xF1os de experiencia\xBB (la pidi\xF3 el equipo de proyecto; el sitio de Google del centro dice \xABM\xE1s de 5 a\xF1os\xBB) antes de mantenerla en la web",
    "sitio de Google del centro: tiene horario distinto al del Perfil de Google (lun\u2013vie 8\u201319 y s\xE1b 9\u201317) y un tel\xE9fono con un d\xEDgito distinto (315\u2026); conviene corregirlo",
    "l\xEDnea de WhatsApp para el bot (el 314 530 1120 es solo tel\xE9fono de llamadas; mientras no exista, web.whatsapp queda en null y la p\xE1gina no muestra el bot\xF3n de WhatsApp)",
    "capacidad (cabinas / equipos) por servicio",
    "pol\xEDtica de cambios y cancelaciones",
    "festivos y d\xEDas cerrados",
    "nombre del asesor/a que firma los mensajes",
    "pol\xEDtica de tratamiento de datos personales (Ley 1581) que se enlaza en la p\xE1gina de reservas",
    "fotos del centro y permiso de uso de imagen para la galer\xEDa de la p\xE1gina",
    "comodidades que se quieran mostrar (medios de pago, parqueadero, Wi-Fi\u2026)",
    "horas m\xEDnimas de anticipaci\xF3n para cambiar o cancelar (agenda.cambios_hasta_horas)"
  ],
  "nombre": "Valencia Stetic",
  "ciudad": "Pereira",
  "direccion": "Calle 8 #12-59, Pereira",
  "como_llegar": "",
  "asesor": "el equipo de Valencia Stetic",
  "zona_horaria_offset": "-05:00",
  "moneda": "COP",
  "horario": {
    "0": null,
    "1": [
      "08:00",
      "18:00"
    ],
    "2": [
      "08:00",
      "18:00"
    ],
    "3": [
      "08:00",
      "18:00"
    ],
    "4": [
      "08:00",
      "18:00"
    ],
    "5": [
      "08:00",
      "18:00"
    ],
    "6": [
      "08:00",
      "15:00"
    ],
    "_nota": "0=domingo ... 6=s\xE1bado. null = cerrado. Formato HH:MM 24h."
  },
  "horario_texto": "lunes a viernes de 8:00 a. m. a 6:00 p. m. y s\xE1bados de 8:00 a. m. a 3:00 p. m.",
  "dias_cerrados": [
    "2026-11-16",
    "2026-12-08",
    "2026-12-25",
    "2027-01-01",
    "2027-01-11",
    "2027-03-22"
  ],
  "agenda": {
    "intervalo_min": 30,
    "anticipacion_min": 120,
    "dias_adelante": 14,
    "pausa_entre_citas_min": 10,
    "max_citas_activas_por_cliente": 2,
    "cambios_hasta_horas": null
  },
  "recursos": {
    "_nota": "Cu\xE1ntas citas simult\xE1neas admite cada recurso (cabinas, camillas, equipos).",
    "cabina": 1,
    "laser": 1
  },
  "politica_cambios": "Si necesitas cambiar o cancelar tu cita, av\xEDsanos por este chat con al menos 3 horas de anticipaci\xF3n.",
  "indicaciones_generales": "Te recomendamos llegar 10 minutos antes.",
  "seguimiento": {
    "seguimiento_1_horas": 20,
    "seguimiento_2_horas": 72,
    "seguimiento_2_activo": true,
    "recordatorio_horas_antes": 24,
    "recordatorio_corto_horas_antes": 2,
    "gracias_post_visita": true
  },
  "plantillas": {
    "_nota": "Nombres de plantillas aprobadas en WhatsApp Manager (ver plantillas/PLANTILLAS_WHATSAPP.md). Vac\xEDo = no se usa.",
    "recordatorio_cita": "recordatorio_cita_vs",
    "seguimiento_consulta": "seguimiento_consulta_vs",
    "gracias_visita": "gracias_visita_vs",
    "aviso_equipo": "aviso_equipo_vs",
    "cita_web": "cita_web_vs"
  },
  "faq": [
    {
      "id": "objecion_precio",
      "claves": [
        "muy caro",
        "es caro",
        "esta caro",
        "est\xE1 caro",
        "costoso",
        "muy costoso",
        "no me alcanza",
        "mucha plata",
        "mas barato",
        "m\xE1s barato",
        "rebajas"
      ],
      "respuesta": "Entiendo que el valor es una decisi\xF3n importante. Nuestros valores son los de la lista vigente y varios tratamientos se pueden hacer por sesi\xF3n o en paquete con abono (por ejemplo, el reductor intensivo: 50% al iniciar y el saldo a m\xE1s tardar en la quinta sesi\xF3n; el l\xE1ser diodo se cobra por sesi\xF3n y por zona). Si me cuentas qu\xE9 buscas, te sugiero la opci\xF3n que mejor se ajuste a lo que necesitas. Si buscas promociones, dime \xABpromociones\xBB y te muestro las vigentes; no invento ninguna."
    },
    {
      "id": "objecion_pensarlo",
      "claves": [
        "lo voy a pensar",
        "lo pienso",
        "despues te escribo",
        "despu\xE9s te escribo",
        "luego te escribo",
        "mas adelante",
        "m\xE1s adelante",
        "otro dia",
        "otro d\xEDa",
        "no estoy segura",
        "no estoy seguro",
        "todavia no",
        "todav\xEDa no",
        "dejame pensarlo",
        "d\xE9jame pensarlo"
      ],
      "respuesta": "Claro, t\xF3mate el tiempo que necesites. Cuando quieras retomar, aqu\xED mismo puedo mostrarte los horarios disponibles (la agenda se actualiza en tiempo real). Y si te queda alguna duda del tratamiento (cuidados, sesiones, contraindicaciones o valor), con gusto te la resuelvo ahora."
    },
    {
      "id": "objecion_miedo",
      "claves": [
        "me da miedo",
        "tengo miedo",
        "me asusta",
        "da susto",
        "duele mucho",
        "es doloroso",
        "es muy doloroso",
        "me da nervio",
        "me da nervios"
      ],
      "respuesta": "Es normal sentir inquietud, y est\xE1 bien preguntar. Cu\xE9ntame qu\xE9 tratamiento te interesa y te explico c\xF3mo lo hacemos para que sea lo m\xE1s llevadero (seg\xFAn el procedimiento usamos, por ejemplo, anestesia o crioterapia) y qu\xE9 puedes esperar. Si prefieres, una asesora tambi\xE9n puede orientarte antes de que decidas."
    },
    {
      "id": "objecion_seguridad",
      "claves": [
        "es seguro el centro",
        "es confiable",
        "quien lo realiza",
        "qui\xE9n lo realiza",
        "quienes atienden",
        "qui\xE9nes atienden",
        "quien me atiende",
        "qui\xE9n me atiende",
        "tienen experiencia",
        "certificad",
        "licenciad",
        "registro sanitario",
        "que tan seguro",
        "qu\xE9 tan seguro"
      ],
      "respuesta": "Tu seguridad es lo primero. Trabajamos con aparatolog\xEDa de \xFAltima generaci\xF3n y, antes de procedimientos con l\xE1ser, \xE1cidos, inyectables o aparatolog\xEDa, revisamos contigo las contraindicaciones; una asesora valida tu caso antes de la cita. Si quieres conocer m\xE1s sobre el equipo y sus soportes, te lo confirma una asesora para darte datos exactos."
    },
    {
      "id": "objecion_garantia",
      "claves": [
        "garantizan",
        "garantia",
        "garant\xEDa",
        "resultado garantizado",
        "funciona de verdad",
        "sirve de verdad",
        "seguro funciona",
        "que tan efectivo",
        "qu\xE9 tan efectivo"
      ],
      "respuesta": "Cada piel y cada cuerpo responde distinto, por eso no prometemos resultados id\xE9nticos para todas las personas. S\xED te explicamos qu\xE9 esperar de cada tratamiento, cu\xE1ntas sesiones suelen necesitarse y los cuidados que ayudan a que funcione mejor. Cu\xE9ntame cu\xE1l te interesa y te doy el detalle."
    },
    {
      "id": "menores",
      "claves": [
        "mi hija",
        "mi hijo",
        "menor de edad",
        "adolescente",
        "menores de edad",
        "mi ni\xF1a",
        "mi nina"
      ],
      "respuesta": "Para menores hay opciones y restricciones: el Spa Ni\xF1as es un plan grupal para 3 a 4 ni\xF1as de 4 a 10 a\xF1os, y Gl\xFAteos de acero es apto para menores con permiso de sus padres. En otros tratamientos hay restricciones (por ejemplo, Tensamax no es para menores de 14 a\xF1os). Dime qu\xE9 servicio te interesa y te oriento."
    },
    {
      "id": "paquetes",
      "claves": [
        "paquete",
        "paquetes",
        "combo",
        "combos",
        "plan de sesiones",
        "por sesiones"
      ],
      "respuesta": "Tenemos paquetes de sesiones para: Tratamiento reductor intensivo (15 sesiones), Celulitis PEFE (10 sesiones), Gl\xFAteos de acero (20 citas en 7 semanas), Post operatorio (10 o 20 sesiones), Divine Body Detox (10 sesiones), Carboxiterapia (5 sesiones) y Zona Negris (5 sesiones). El l\xE1ser diodo y la cera se cobran por sesi\xF3n y por zona. Dime cu\xE1l te interesa y te doy el valor y la forma de pago."
    },
    {
      "id": "primera_vez",
      "claves": [
        "primera vez",
        "nunca me he hecho",
        "primera sesion",
        "primera sesi\xF3n",
        "no se que hacerme",
        "no s\xE9 qu\xE9 hacerme",
        "que me recomiendan",
        "qu\xE9 me recomiendan",
        "que me recomienda",
        "qu\xE9 me recomienda"
      ],
      "respuesta": "Bienvenida. Para recomendarte bien, cu\xE9ntame qu\xE9 te gustar\xEDa mejorar: por ejemplo manchas, acn\xE9, arrugas, depilaci\xF3n, relajaci\xF3n, reducci\xF3n de medidas o recuperaci\xF3n post operatoria. Con eso te sugiero 1 o 2 tratamientos, con lo que incluyen, la duraci\xF3n y el valor."
    },
    {
      "id": "politica_cambios",
      "claves": [
        "politica de cancelacion",
        "pol\xEDtica de cancelaci\xF3n",
        "politica de cambios",
        "pol\xEDtica de cambios",
        "cuanto antes puedo cancelar",
        "cu\xE1nto antes puedo cancelar"
      ],
      "respuesta": "{politica_cambios}"
    },
    {
      "id": "ubicacion",
      "claves": [
        "donde",
        "d\xF3nde",
        "direccion",
        "direcci\xF3n",
        "ubicacion",
        "ubicaci\xF3n",
        "ubicados",
        "quedan",
        "llegar",
        "mapa",
        "barrio"
      ],
      "respuesta": "Estamos en {direccion}. {como_llegar}"
    },
    {
      "id": "horario",
      "claves": [
        "horario",
        "horarios",
        "abren",
        "cierran",
        "atienden",
        "hora abren",
        "domingo",
        "festivo"
      ],
      "respuesta": "Atendemos {horario_texto}."
    },
    {
      "id": "pago",
      "claves": [
        "pago",
        "pagar",
        "tarjeta",
        "nequi",
        "daviplata",
        "transferencia",
        "efectivo",
        "abono"
      ],
      "respuesta": "Los medios de pago te los confirma el equipo al momento de tu cita. Para paquetes: Reductor intensivo, 50% al iniciar y el saldo a m\xE1s tardar en la quinta sesi\xF3n; Gl\xFAteos de acero, 50% al iniciar y 50% a la mitad del tratamiento; Post operatorio de 20 sesiones, con pago total. El l\xE1ser diodo y la cera se pagan por sesi\xF3n."
    },
    {
      "id": "parqueadero",
      "claves": [
        "parqueadero",
        "parqueo",
        "parquear",
        "carro",
        "moto"
      ],
      "respuesta": "Sobre parqueadero te orienta el equipo cuando confirmes tu cita."
    }
  ],
  "palabras_asesora": [
    "asesora",
    "asesor",
    "humano",
    "persona",
    "hablar con alguien",
    "llamar",
    "llamada",
    "agente",
    "operador"
  ],
  "palabras_sensibles": [
    "embaraz",
    "lactan",
    "cirug",
    "operaci",
    "postoperatori",
    "post operatori",
    "lipo",
    "medicament",
    "enfermedad",
    "diabet",
    "cancer",
    "c\xE1ncer",
    "alergi",
    "herida",
    "infecci",
    "marcapaso",
    "anticoagul",
    "tratamiento medico",
    "tratamiento m\xE9dico"
  ],
  "palabras_baja": [
    "no me escriban",
    "no quiero mensajes",
    "no mas mensajes",
    "no m\xE1s mensajes",
    "dejen de escribir",
    "stop",
    "darme de baja",
    "eliminar mis datos",
    "borrar mis datos"
  ],
  "web": {
    "_nota": "Datos de la p\xE1gina p\xFAblica de reservas (/reservas). null o lista vac\xEDa = no se muestra. Nada de aqu\xED se inventa: se completa cuando el centro lo confirme. opiniones: copiadas a mano de Google Maps (solo rese\xF1as de los \xFAltimos 365 d\xEDas, 5 estrellas, sin editar); alternativa autom\xE1tica: API de Places (requiere clave de Google Cloud).",
    "whatsapp": null,
    "instagram": "https://www.instagram.com/valenciastetic/",
    "frase": "Centro Est\xE9tico en Pereira",
    "descripcion": "Un espacio para hacer una pausa y cuidarte, con orientaci\xF3n del equipo para elegir lo que mejor se ajuste a ti.",
    "comodidades": [],
    "galeria": [],
    "mapa_url": "https://www.google.com/maps/dir/?api=1&destination=4.8088651,-75.6854501",
    "privacidad_url": null,
    "telefono": "+573145301120",
    "coordenadas": {
      "lat": 4.8088651,
      "lng": -75.6854501
    },
    "opiniones": {
      "fuente": "Google",
      "puntuacion": 4.9,
      "total": 145,
      "enlace": "https://www.google.com/maps/place/Valencia+Stetic/@4.8088651,-75.6854501,17z/data=!4m6!3m5!1s0x8e3887395cdf34a3:0xc776f78e3b4b8577!8m2!3d4.8088651!4d-75.6854501!16s%2Fg%2F11kmp3cz5l",
      "leido": "2026-11-06",
      "items": [
        {
          "autor": "Bryan",
          "estrellas": 5,
          "fecha": "una semana atr\xE1s",
          "texto": "Buen\xEDsimo, todo es incre\xEDble, desde que se entra por la puerta la atenci\xF3n es inigualable, personalizada y pendientes de lo que uno desee en cada momento, las chicas Angie, Francia y Mar\xEDa Jos\xE9 lo hacen sentir a uno c\xF3modo y le dan un trato personalizado, el masaje relajante es fant\xE1stico, me dej\xF3 como nuevo fue algo incre\xEDble lo recomiendo a cualquier persona, adem\xE1s del masaje ofrecen muchos otros tratamientos ideales para toda persona que se quiera cuidar, sentirse bien o para regalar la mejor experiencia a cualquier ser amado."
        },
        {
          "autor": "Camila Ospina",
          "estrellas": 5,
          "fecha": "Hace 5 meses",
          "texto": "Excelente servicio y mucho profesionalismo. La limpieza facial super\xF3 totalmente mis expectativas; es un procedimiento muy completo y realizado con much\xEDsimo cuidado. Desde la atenci\xF3n hasta el resultado final, todo fue excelente. Sin duda, una experiencia que recomendar\xEDa."
        },
        {
          "autor": "Lizeth Rozo",
          "estrellas": 5,
          "fecha": "Hace 10 meses",
          "texto": "Me encanta este lugar. El personal es super profesional y son muy amables y atentas. Sin duda trabajan super bien y por lo tanto recomiendo mucho este centro est\xE9tico."
        }
      ]
    },
    "confianza": "8 a\xF1os cuidando de ti",
    "nosotros": [
      "Valencia Stetic es un centro est\xE9tico en Pereira creado para que hagas una pausa y te cuides con calma. Desde 2018 acompa\xF1amos a nuestras clientas con tratamientos faciales, depilaci\xF3n l\xE1ser, masajes y spa, cuerpo y bienestar.",
      "Cada visita empieza escuch\xE1ndote: te orientamos para elegir lo que mejor se ajusta a ti y te explicamos el procedimiento, los cuidados y lo que puedes esperar, sin presi\xF3n.",
      "En 2026 celebramos nuestro 8.\xBA aniversario con promociones especiales para agradecerte tu confianza."
    ],
    "nosotros_por_validar": "Historia derivada de la publicaci\xF3n del 6.\xBA aniversario (nov. 2024) y del 8.\xBA aniversario (2026): validar con el centro el a\xF1o de apertura, el equipo y el tono antes de publicar.",
    "facebook": "https://www.facebook.com/valenciasteticpereira"
  }
}
`,"config/servicios.json":`{
  "_nota": "Cat\xE1logo del bot y la web, generado del \xABContexto Maestro: Valencia Stetic (Website & Bot 24/7)\xBB (\xFAnica fuente de verdad, 25 nov 2026). precio = null: el valor depende del caso (ver precio_nota); no se inventan precios. duracion_min = lo que ocupa en la agenda (si el documento no da la duraci\xF3n queda en 30 min y no se muestra duracion_texto). Se puede forzar una duraci\xF3n fija con negocio.json \u2192 agenda.duracion_fija_min. Los paquetes (paquete) se agendan por la primera sesi\xF3n; las pol\xEDticas de pago est\xE1n en pago. Campos de contexto para el bot y la web: descripcion (texto SEO breve), procedimiento, indicado_para, sesiones, cuidados, contraindicaciones, alerta, resultados, retoque, pago. revisar_condiciones: una asesora revisa el caso antes de la cita; solo: solo se combina con servicios de su misma categor\xEDa; foto: archivo de public/reservas/fotos/.",
  "categorias": [
    "Aniversario",
    "Faciales",
    "Armonizaci\xF3n y l\xE1ser",
    "Depilaci\xF3n l\xE1ser diodo",
    "Depilaci\xF3n con cera",
    "Cejas y pesta\xF1as",
    "Spa y masajes",
    "Cuerpo y postoperatorio",
    "Sueroterapia"
  ],
  "categorias_info": [
    {
      "nombre": "Aniversario",
      "descripcion": "Ofertas del 8.\xBA aniversario, vigentes hasta el 15 de diciembre de 2026.",
      "claves": [
        "aniversario",
        "promo",
        "promos",
        "promocion",
        "promoci\xF3n",
        "promociones",
        "oferta",
        "ofertas",
        "descuento",
        "descuentos",
        "combo belleza"
      ]
    },
    {
      "nombre": "Faciales",
      "descripcion": "Limpiezas, peelings, Dermapen, PRP, NCTF, mesoterapia, Tensamax y radiofrecuencia fraccionada.",
      "claves": [
        "facial",
        "faciales",
        "rostro",
        "cara",
        "piel",
        "acne",
        "acn\xE9",
        "manchas",
        "arrugas",
        "limpieza"
      ]
    },
    {
      "nombre": "Armonizaci\xF3n y l\xE1ser",
      "descripcion": "L\xE1ser CO\u2082, toxina botul\xEDnica, \xE1cido hialur\xF3nico y dermatolog\xEDa est\xE9tica (zona negris, cauterizaci\xF3n, remoci\xF3n de tatuajes).",
      "claves": [
        "armonizacion",
        "armonizaci\xF3n",
        "zona negris",
        "negris",
        "manchas oscuras",
        "cauterizacion",
        "cauterizaci\xF3n",
        "tatuaje",
        "tatuajes",
        "verruga",
        "verrugas",
        "lunar",
        "lunares",
        "botox",
        "toxina",
        "hialuronico",
        "hialur\xF3nico",
        "relleno",
        "labios",
        "co2",
        "rejuvenecimiento",
        "lifting facial"
      ]
    },
    {
      "nombre": "Depilaci\xF3n l\xE1ser diodo",
      "descripcion": "Depilaci\xF3n l\xE1ser diodo Ice (tecnolog\xEDa Soprano) por zona y por sesi\xF3n.",
      "claves": [
        "laser",
        "l\xE1ser",
        "depilacion laser",
        "depilaci\xF3n l\xE1ser",
        "depilacion definitiva",
        "depilaci\xF3n definitiva",
        "diodo",
        "soprano"
      ]
    },
    {
      "nombre": "Depilaci\xF3n con cera",
      "descripcion": "Depilaci\xF3n con cera de chocolate por zona.",
      "claves": [
        "cera",
        "cera de chocolate",
        "depilacion con cera",
        "depilaci\xF3n con cera",
        "depilar"
      ]
    },
    {
      "nombre": "Cejas y pesta\xF1as",
      "descripcion": "Micropigmentaci\xF3n, laminado, depilaci\xF3n con hilo, sombreado, extensiones y lifting de pesta\xF1as.",
      "claves": [
        "cejas",
        "pesta\xF1as",
        "pestanas",
        "ojos",
        "mirada"
      ]
    },
    {
      "nombre": "Spa y masajes",
      "descripcion": "Masajes relajantes y terap\xE9uticos, spa coreano, relajaci\xF3n gold, plan cumplea\xF1os y spa ni\xF1as.",
      "claves": [
        "masaje",
        "masajes",
        "spa",
        "relajar",
        "relajacion",
        "relajaci\xF3n",
        "estres",
        "estr\xE9s",
        "bienestar"
      ]
    },
    {
      "nombre": "Cuerpo y postoperatorio",
      "descripcion": "Reducci\xF3n, celulitis, gl\xFAteos, peptonas, enzimas, carboxiterapia, subcisi\xF3n, Tensamax corporal, bronceado, post operatorio y Divine Body Detox.",
      "claves": [
        "post operatorio",
        "postoperatorio",
        "cirugia",
        "cirug\xEDa",
        "drenaje",
        "drenaje linfatico",
        "drenaje linf\xE1tico",
        "lipo",
        "corporal",
        "corporales",
        "reducir",
        "medidas",
        "celulitis",
        "gluteos",
        "gl\xFAteos",
        "grasa",
        "abdomen",
        "flacidez"
      ]
    },
    {
      "nombre": "Sueroterapia",
      "descripcion": "Sueroterapia endovenosa con 19 f\xF3rmulas seg\xFAn lo que necesites.",
      "claves": [
        "suero",
        "sueros",
        "sueroterapia",
        "vitaminas",
        "energia",
        "energ\xEDa",
        "fatiga"
      ]
    }
  ],
  "servicios": [
    {
      "id": "promo_belleza",
      "nombre": "Promo aniversario: combo belleza",
      "nombre_corto": "Promo combo belleza",
      "precio": 85000,
      "precio_nota": null,
      "paquete": null,
      "duracion_min": 80,
      "duracion_texto": "80 minutos (suma de los tiempos individuales)",
      "recurso": "cabina",
      "requiere_valoracion": false,
      "revisar_condiciones": false,
      "descripcion": "Promoci\xF3n de aniversario: depilaci\xF3n de cejas, laminado y lifting coreano en una sola visita de 80 minutos.",
      "incluye": "Depilaci\xF3n de cejas + laminado + lifting coreano.",
      "claves": [
        "promo aniversario: combo belleza",
        "combo belleza",
        "promo belleza",
        "lifting coreano"
      ],
      "categoria": "Aniversario",
      "activo": true,
      "codigos_anuncio": [],
      "vigente_hasta": "2026-12-15"
    },
    {
      "id": "promo_laser_bikini",
      "nombre": "Promo aniversario: l\xE1ser diodo bikini (paquete de 10 sesiones)",
      "nombre_corto": "Promo l\xE1ser bikini",
      "precio": 700000,
      "precio_nota": "Paquete de 10 sesiones; antes $800.000",
      "paquete": "Paquete de 10 sesiones",
      "duracion_min": 30,
      "duracion_texto": "30 minutos (primera cita de orientaci\xF3n)",
      "recurso": "laser",
      "requiere_valoracion": true,
      "revisar_condiciones": true,
      "descripcion": "Promoci\xF3n de aniversario: paquete de 10 sesiones de l\xE1ser diodo en bikini (no incluye bikini completo). Se agenda la primera cita de orientaci\xF3n y el equipo coordina las dem\xE1s.",
      "incluye": "Paquete de 10 sesiones de bikini. No incluye bikini completo.",
      "claves": [
        "promo aniversario: l\xE1ser diodo bikini (paquete de 10 sesiones)",
        "promo laser bikini",
        "promo l\xE1ser bikini",
        "laser bikini x10"
      ],
      "categoria": "Aniversario",
      "activo": true,
      "codigos_anuncio": [],
      "vigente_hasta": "2026-12-15",
      "contraindicaciones": "Lupus, psoriasis, embarazo, lactancia, acn\xE9 en tratamiento con isotretino\xEDna (Roaccutan), fotosensibilidad, vit\xEDligo, marcapasos, vello rubio, pelirrojo o canoso, tatuaje en la zona, queloides, quemaduras, descamaci\xF3n, bronceado intenso, hipotiroidismo, s\xEDndrome metab\xF3lico e hiperandrogenismo.",
      "cuidados": "Rasurar con cuchilla el mismo d\xEDa. Asistir con la piel libre de productos (cremas, desodorante). Sin exposici\xF3n solar (natural o artificial) y sin despigmentantes durante el tratamiento.",
      "sesiones": "Aproximadamente 10 a 12 sesiones, una cada 20 a 30 d\xEDas (var\xEDa seg\xFAn edad, sistema hormonal, tipo de piel, color del vello y respuesta individual). Hay modalidad de pago por sesiones."
    },
    {
      "id": "promo_laser_axilas",
      "nombre": "Promo aniversario: l\xE1ser diodo axilas (paquete de 10 sesiones)",
      "nombre_corto": "Promo l\xE1ser axilas",
      "precio": 480000,
      "precio_nota": "Paquete de 10 sesiones; antes $560.000",
      "paquete": "Paquete de 10 sesiones",
      "duracion_min": 15,
      "duracion_texto": "15 minutos (primera cita de orientaci\xF3n)",
      "recurso": "laser",
      "requiere_valoracion": true,
      "revisar_condiciones": true,
      "descripcion": "Promoci\xF3n de aniversario: paquete de 10 sesiones de l\xE1ser diodo en axilas. Se agenda la primera cita de orientaci\xF3n y el equipo coordina las dem\xE1s sesiones.",
      "incluye": "Paquete de 10 sesiones de axilas.",
      "claves": [
        "promo aniversario: l\xE1ser diodo axilas (paquete de 10 sesiones)",
        "promo laser axilas",
        "promo l\xE1ser axilas",
        "laser axilas x10"
      ],
      "categoria": "Aniversario",
      "activo": true,
      "codigos_anuncio": [],
      "vigente_hasta": "2026-12-15",
      "contraindicaciones": "Lupus, psoriasis, embarazo, lactancia, acn\xE9 en tratamiento con isotretino\xEDna (Roaccutan), fotosensibilidad, vit\xEDligo, marcapasos, vello rubio, pelirrojo o canoso, tatuaje en la zona, queloides, quemaduras, descamaci\xF3n, bronceado intenso, hipotiroidismo, s\xEDndrome metab\xF3lico e hiperandrogenismo.",
      "cuidados": "Rasurar con cuchilla el mismo d\xEDa. Asistir con la piel libre de productos (cremas, desodorante). Sin exposici\xF3n solar (natural o artificial) y sin despigmentantes durante el tratamiento.",
      "sesiones": "Aproximadamente 10 a 12 sesiones, una cada 20 a 30 d\xEDas (var\xEDa seg\xFAn edad, sistema hormonal, tipo de piel, color del vello y respuesta individual). Hay modalidad de pago por sesiones."
    },
    {
      "id": "facial",
      "nombre": "Limpieza facial b\xE1sica",
      "nombre_corto": "Limpieza b\xE1sica",
      "categoria": "Faciales",
      "activo": true,
      "codigos_anuncio": [
        "HAZ ESPACIO"
      ],
      "claves": [
        "limpieza facial b\xE1sica",
        "limpieza",
        "limpieza facial",
        "limpieza basica",
        "limpieza b\xE1sica",
        "cuidado facial",
        "comedones",
        "puntos negros"
      ],
      "descripcion": "Limpieza facial b\xE1sica en Pereira: limpieza profunda, exfoliaci\xF3n y extracci\xF3n para eliminar c\xE9lulas muertas, grasa y contaminantes, con hidrataci\xF3n y nutrici\xF3n en una sola sesi\xF3n.",
      "incluye": "Limpieza facial b\xE1sica, con atenci\xF3n del equipo de Valencia Stetic en cabina privada.",
      "duracion_min": 60,
      "duracion_texto": "1 hora",
      "precio": 100000,
      "recurso": "cabina",
      "requiere_valoracion": false,
      "procedimiento": "Higiene de la piel, exfoliaci\xF3n, vapor ozono, extracci\xF3n, mascarilla de aloe, l\xE1mpara LED, drenaje linf\xE1tico, hidratante y bloqueador.",
      "indicado_para": "Eliminaci\xF3n de c\xE9lulas muertas y poluci\xF3n, comedones, hidrataci\xF3n y nutrici\xF3n facial.",
      "cuidados": "No exposici\xF3n directa al sol 1 d\xEDa antes y 1 d\xEDa despu\xE9s; no jacuzzi, sauna, turco o piscina en las pr\xF3ximas 24 horas; evitar maquillarse en las pr\xF3ximas 12 horas; no aplicar lociones despigmentantes 1 d\xEDa antes ni 2 d\xEDas despu\xE9s.",
      "foto": "fotos/facial.jpg"
    },
    {
      "id": "limpieza_luxury",
      "nombre": "Limpieza facial luxury",
      "nombre_corto": "Limpieza luxury",
      "categoria": "Faciales",
      "activo": true,
      "codigos_anuncio": [],
      "claves": [
        "limpieza facial luxury",
        "luxury",
        "limpieza luxury",
        "limpieza profunda",
        "hydrafacial"
      ],
      "descripcion": "Limpieza facial luxury en Pereira: limpieza profunda avanzada con Hydrafacial, peeling ultras\xF3nico, radiofrecuencia y m\xE1s, para pieles desvitalizadas o con comedones.",
      "incluye": "Limpieza facial luxury, con atenci\xF3n del equipo de Valencia Stetic en cabina privada.",
      "duracion_min": 90,
      "duracion_texto": "1 hora y 30 minutos aproximadamente",
      "precio": 150000,
      "recurso": "cabina",
      "requiere_valoracion": false,
      "procedimiento": "Higiene de la piel, exfoliaci\xF3n, vapor ozono, extracci\xF3n, peeling ultras\xF3nico, Hydrafacial, spray oxigenante, crioterapia, radiofrecuencia, ionizaci\xF3n, ultrasonido (de ser necesario), corriente facial, mascarilla, drenaje linf\xE1tico, l\xE1mpara fotobiodin\xE1mica, hidratante y protector solar.",
      "indicado_para": "Pieles desvitalizadas, puntos negros y comedones, pieles que deseen mejorar su apariencia general.",
      "cuidados": "No exposici\xF3n directa al sol; no jacuzzi, sauna, turco o piscina en las pr\xF3ximas 24 horas; evitar maquillaje por 24 horas; no aplicar lociones despigmentantes 1 d\xEDa antes ni 1 d\xEDa despu\xE9s."
    },
    {
      "id": "porcelanizacion",
      "nombre": "Porcelanizaci\xF3n facial",
      "nombre_corto": "Porcelanizaci\xF3n",
      "categoria": "Faciales",
      "activo": true,
      "codigos_anuncio": [],
      "claves": [
        "porcelanizaci\xF3n facial",
        "porcelanizacion",
        "porcelanizaci\xF3n",
        "porcelana"
      ],
      "descripcion": "Porcelanizaci\xF3n facial en Pereira: peeling qu\xEDmico y mec\xE1nico suave con mascarilla hidratante y m\xE1scara LED, para pieles resecas, sin brillo y desvitalizadas.",
      "incluye": "Porcelanizaci\xF3n facial, con atenci\xF3n del equipo de Valencia Stetic en cabina privada.",
      "duracion_min": 60,
      "duracion_texto": "60 minutos",
      "precio": 200000,
      "recurso": "cabina",
      "requiere_valoracion": false,
      "procedimiento": "Higiene de la piel, puntas de diamante, hidrataci\xF3n con \xE1cidos, pasta \xE1cida, Nanopore, drenaje facial, dermoreparadora, hidrataci\xF3n y protector solar.",
      "indicado_para": "Pieles resecas, deshidratadas, sin brillo y desvitalizadas.",
      "cuidados": "No exposici\xF3n directa al sol; no jacuzzi, sauna, turco o piscina durante las pr\xF3ximas 72 horas; procurar no maquillarse en las pr\xF3ximas 24 horas; no aplicar ning\xFAn tipo de loci\xF3n despigmentante."
    },
    {
      "id": "hollywood_peel",
      "nombre": "L\xE1ser Hollywood Peel",
      "nombre_corto": "Hollywood Peel",
      "categoria": "Faciales",
      "activo": true,
      "codigos_anuncio": [],
      "claves": [
        "l\xE1ser hollywood peel",
        "hollywood",
        "peel",
        "hollywood peel",
        "laser hollywood",
        "l\xE1ser hollywood",
        "carbon activado",
        "carb\xF3n activado"
      ],
      "descripcion": "L\xE1ser Hollywood Peel en Pereira: l\xE1ser no invasivo e indoloro que exfolia, regula la grasa, minimiza poros y mejora la textura con resultados inmediatos.",
      "incluye": "L\xE1ser Hollywood Peel, con atenci\xF3n del equipo de Valencia Stetic en cabina privada.",
      "duracion_min": 90,
      "duracion_texto": "90 minutos",
      "precio": 200000,
      "recurso": "cabina",
      "requiere_valoracion": false,
      "procedimiento": "Higienizaci\xF3n, exfoliaci\xF3n, vapor, extracci\xF3n, mascarilla de carb\xF3n activado, Hollywood Peel, l\xE1ser lluvia de estrellas, hidrataci\xF3n, masaje facial y protector solar.",
      "indicado_para": "Piel grasa, poros agrandados, piel apagada y desvitalizada, textura rugosa, desequilibrada y acn\xE9.",
      "sesiones": "Se puede repetir 1 sesi\xF3n cada mes durante 4 meses.",
      "contraindicaciones": "Embarazo y lactancia; infecciones activas de la piel (herpes activo o acn\xE9 inflamatorio); queloides o cicatrices hipertr\xF3ficas; enfermedades autoinmunitarias; uso reciente de isotretino\xEDna (Accutane); piel oscura o bronceada.",
      "dolor": "Es un l\xE1ser no invasivo y totalmente indoloro."
    },
    {
      "id": "peeling_quimico",
      "nombre": "Peeling qu\xEDmico",
      "nombre_corto": "Peeling qu\xEDmico",
      "categoria": "Faciales",
      "activo": true,
      "codigos_anuncio": [],
      "claves": [
        "peeling qu\xEDmico",
        "peeling",
        "peeling quimico",
        "acidos",
        "\xE1cidos",
        "manchas",
        "cicatrices de acne"
      ],
      "descripcion": "Peeling qu\xEDmico en Pereira: \xE1cidos de uso est\xE9tico para un pelado controlado que deja la piel m\xE1s suave y uniforme y disminuye las bacterias causantes del acn\xE9.",
      "incluye": "Peeling qu\xEDmico, con atenci\xF3n del equipo de Valencia Stetic en cabina privada.",
      "duracion_min": 90,
      "duracion_texto": "1 hora y 30 minutos aproximadamente",
      "precio": 200000,
      "recurso": "cabina",
      "requiere_valoracion": false,
      "procedimiento": "Higienizaci\xF3n, vapor, puntas de diamante, extracci\xF3n, aplicaci\xF3n de \xE1cidos, mascarilla calmante, crioterapia, hidrataci\xF3n, masaje facial y protector solar.",
      "indicado_para": "Pieles con acn\xE9, deshidratadas, cicatrices de acn\xE9, alteraciones pigmentarias, piel grasa y envejecimiento.",
      "sesiones": "Var\xEDa seg\xFAn el estado de la piel; aproximadamente de 3 a 5 sesiones.",
      "contraindicaciones": "Pacientes diab\xE9ticos, pacientes sin rutina facial, quemaduras presentes en la zona y sensibilidad cut\xE1nea.",
      "revisar_condiciones": true
    },
    {
      "id": "dermapen",
      "nombre": "Dermapen",
      "nombre_corto": "Dermapen",
      "categoria": "Faciales",
      "activo": true,
      "codigos_anuncio": [],
      "claves": [
        "dermapen",
        "microagujas",
        "microneedling",
        "cicatrices",
        "lineas finas",
        "l\xEDneas finas"
      ],
      "descripcion": "Dermapen en Pereira: microagujas que estimulan col\xE1geno y elastina para mejorar textura, tono, cicatrices y marcas de acn\xE9, y favorecen la absorci\xF3n de activos.",
      "incluye": "Dermapen, con atenci\xF3n del equipo de Valencia Stetic en cabina privada.",
      "duracion_min": 120,
      "duracion_texto": "2 horas",
      "precio": 200000,
      "recurso": "cabina",
      "requiere_valoracion": false,
      "procedimiento": "Higiene de la piel, exfoliaci\xF3n, microdermoabrasi\xF3n, vapor, extracci\xF3n, anestesia, Dermapen, principio activo, dermoreparadora y bloqueador.",
      "indicado_para": "Reducir l\xEDneas finas, mejorar textura y tono, eliminar cicatrices y marcas de acn\xE9, minimizar poros dilatados y mejorar la apariencia general.",
      "cuidados": "Efectos esperados: ligera rojez, leve inflamaci\xF3n, sensaci\xF3n de calor y posible resequedad en los d\xEDas posteriores (normal). No exposici\xF3n directa al sol durante la primera semana; no maquillar por al menos 12 horas; evitar jacuzzi, sauna, piscina o fuentes de calor; hidrataci\xF3n en casa; durante los primeros 2 d\xEDas lavarse muy bien las manos antes de tocar la piel o aplicar protector.",
      "revisar_condiciones": true
    },
    {
      "id": "prp",
      "nombre": "Plasma rico en plaquetas (PRP)",
      "nombre_corto": "Plasma rico en plaquetas",
      "categoria": "Faciales",
      "activo": true,
      "codigos_anuncio": [],
      "claves": [
        "plasma rico en plaquetas (prp)",
        "plasma",
        "prp",
        "plaquetas",
        "plasma rico en plaquetas",
        "antiedad",
        "antiage"
      ],
      "descripcion": "Plasma rico en plaquetas (PRP) facial en Pereira: usa tu propio plasma para estimular col\xE1geno y elastina y lograr una piel m\xE1s joven, luminosa y sana.",
      "incluye": "Plasma rico en plaquetas (PRP), con atenci\xF3n del equipo de Valencia Stetic en cabina privada.",
      "duracion_min": 120,
      "duracion_texto": "2 horas",
      "precio": 200000,
      "recurso": "cabina",
      "requiere_valoracion": false,
      "procedimiento": "Higienizaci\xF3n, exfoliaci\xF3n, microdermoabrasi\xF3n, vapor, extracci\xF3n, mascarilla de aloe, anestesia, aplicaci\xF3n de plasma, mascarilla calmante, hidratante y protector solar.",
      "indicado_para": "Piel fl\xE1cida, deshidratada, l\xEDneas de expresi\xF3n, pieles desvitalizadas, prevenci\xF3n antiedad y cicatrices de acn\xE9.",
      "sesiones": "Se recomienda 1 aplicaci\xF3n mensual durante 3 meses consecutivos, seguido de un descanso de 10 meses.",
      "cuidados": "Consumir jugo de uva y aumentar el consumo de vegetales al menos 2 d\xEDas antes; asistir con el cabello lavado; evitar actividad f\xEDsica intensa y sudoraci\xF3n el d\xEDa del procedimiento; no acudir a saunas, piscinas o jacuzzi.",
      "alerta": "Si aparece un hematoma (morado), es obligatorio evitar la exposici\xF3n solar hasta su desaparici\xF3n total para prevenir manchas permanentes (melasma).",
      "revisar_condiciones": true
    },
    {
      "id": "nctf",
      "nombre": "NCTF 135 HA (Filorga)",
      "nombre_corto": "NCTF 135 HA",
      "categoria": "Faciales",
      "activo": true,
      "codigos_anuncio": [],
      "claves": [
        "nctf 135 ha (filorga)",
        "nctf",
        "filorga",
        "revitalizacion",
        "revitalizaci\xF3n",
        "hialuronico",
        "hialur\xF3nico"
      ],
      "descripcion": "NCTF 135 HA de Filorga en Pereira: c\xF3ctel poli-revitalizante de 55 activos con \xE1cido hialur\xF3nico para pieles fatigadas, opacas o con p\xE9rdida de firmeza y luminosidad.",
      "incluye": "NCTF 135 HA (Filorga), con atenci\xF3n del equipo de Valencia Stetic en cabina privada.",
      "duracion_min": 90,
      "duracion_texto": "1 hora y 30 minutos aproximadamente",
      "precio": 450000,
      "recurso": "cabina",
      "requiere_valoracion": false,
      "procedimiento": "Higiene de la piel, exfoliaci\xF3n, extracci\xF3n, mesoterapia NCTF, Dermapen NCTF, masaje facial y protector solar.",
      "indicado_para": "Pieles fatigadas, opacas o con p\xE9rdida de luminosidad, tonicidad, elasticidad y firmeza. \xC1reas: rostro, cuello, manos, piernas, vientre y brazos.",
      "resultados": "Cambios visibles a partir de 1 semana despu\xE9s de la primera sesi\xF3n.",
      "revisar_condiciones": true
    },
    {
      "id": "mesoterapia",
      "nombre": "Mesoterapia facial",
      "nombre_corto": "Mesoterapia facial",
      "categoria": "Faciales",
      "activo": true,
      "codigos_anuncio": [],
      "claves": [
        "mesoterapia facial",
        "mesoterapia",
        "ampolla",
        "ampollas",
        "tratamiento con vitaminas"
      ],
      "descripcion": "Mesoterapia facial en Pereira: microinfiltraciones personalizadas de vitaminas, \xE1cido hialur\xF3nico, p\xE9ptidos y amino\xE1cidos para aportar tersura y luminosidad.",
      "incluye": "Mesoterapia facial, con atenci\xF3n del equipo de Valencia Stetic en cabina privada.",
      "duracion_min": 60,
      "duracion_texto": "1 hora",
      "precio": null,
      "precio_nota": "Valor seg\xFAn el c\xF3ctel; requiere valoraci\xF3n",
      "recurso": "cabina",
      "requiere_valoracion": false,
      "procedimiento": "Higiene de la piel, exfoliaci\xF3n, microdermoabrasi\xF3n, anestesia t\xF3pica, mesoterapia, hidratante y bloqueador.",
      "indicado_para": "Pieles deshidratadas, envejecidas, nutrici\xF3n, flacidez facial y cicatrices de acn\xE9.",
      "revisar_condiciones": true
    },
    {
      "id": "tensamax_facial",
      "nombre": "Tensamax facial",
      "nombre_corto": "Tensamax facial",
      "categoria": "Faciales",
      "activo": true,
      "codigos_anuncio": [],
      "claves": [
        "tensamax facial",
        "tensamax",
        "radiofrecuencia",
        "flacidez facial",
        "bolsas en los ojos"
      ],
      "descripcion": "Tensamax facial en Pereira: radiofrecuencia monopolar no invasiva para reafirmar el rostro y suavizar l\xEDneas de expresi\xF3n y bolsas en los ojos.",
      "incluye": "Tensamax facial, con atenci\xF3n del equipo de Valencia Stetic en cabina privada.",
      "duracion_min": 30,
      "precio": 90000,
      "recurso": "cabina",
      "requiere_valoracion": false,
      "procedimiento": "Protocolo facial, limpieza superficial, aplicaci\xF3n de gel conductor y protector solar.",
      "indicado_para": "L\xEDneas de expresi\xF3n en frente y comisuras labiales; bolsas en los ojos; reafirmar la piel.",
      "contraindicaciones": "Embarazo y lactancia (absoluta); hemorragias recientes; tumores malignos; flebitis, trombos y arteriopat\xEDas; alteraciones de sensibilidad en el \xE1rea; marcapasos; cardiopat\xEDas o anticoagulantes continuos (requiere consentimiento escrito del cardi\xF3logo); aparatos auditivos implantados; DIU hormonados y anillos vaginales; estados febriles o infecciosos; epilepsia; menores de 14 a\xF1os.",
      "revisar_condiciones": true
    },
    {
      "id": "radiofrecuencia_fraccionada",
      "nombre": "Radiofrecuencia fraccionada",
      "nombre_corto": "Radiofrecuencia fracc.",
      "categoria": "Faciales",
      "activo": true,
      "codigos_anuncio": [],
      "claves": [
        "radiofrecuencia fraccionada",
        "fraccionada",
        "poros dilatados"
      ],
      "descripcion": "Radiofrecuencia fraccionada en Pereira: micro-perforaciones controladas que estimulan col\xE1geno y elastina para cicatrices, l\xEDneas de expresi\xF3n y poros dilatados.",
      "incluye": "Radiofrecuencia fraccionada, con atenci\xF3n del equipo de Valencia Stetic en cabina privada.",
      "duracion_min": 60,
      "duracion_texto": "1 hora",
      "precio": 350000,
      "recurso": "cabina",
      "requiere_valoracion": false,
      "procedimiento": "Higienizaci\xF3n, microdermoabrasi\xF3n, anestesia, radiofrecuencia, dermoreparadora y protector solar.",
      "indicado_para": "Cicatrices, l\xEDneas de expresi\xF3n, poros dilatados y tensado cut\xE1neo. M\xEDnimo tiempo de incapacidad.",
      "sesiones": "Generalmente 3 a 4 sesiones (1 sesi\xF3n cada 4 a 5 semanas).",
      "cuidados": "Aplicar hielo envuelto en un pa\xF1ito (sin quemar la piel) hasta bajar la temperatura; precauci\xF3n con el sol; protector solar de alta protecci\xF3n cada 4 horas; evitar jacuzzi, piscina, sauna o sudoraci\xF3n excesiva durante 2 d\xEDas.",
      "contraindicaciones": "Embarazo y lactancia; cardiopat\xEDas graves; alteraciones de coagulaci\xF3n; enfermedades del tejido conectivo; c\xE1ncer; implantes; pr\xF3tesis met\xE1licas; DIU de cobre; desfibriladores cardioversores.",
      "revisar_condiciones": true
    },
    {
      "id": "co2_blefaroplastia",
      "nombre": "L\xE1ser CO\u2082: blefaroplastia",
      "nombre_corto": "CO\u2082 blefaroplastia",
      "categoria": "Armonizaci\xF3n y l\xE1ser",
      "activo": true,
      "codigos_anuncio": [],
      "claves": [
        "l\xE1ser co\u2082: blefaroplastia",
        "blefaroplastia",
        "parpados",
        "p\xE1rpados",
        "bolsas"
      ],
      "descripcion": "L\xE1ser CO\u2082 para p\xE1rpados en Pereira: micro-puntos de energ\xEDa que estimulan col\xE1geno y elastina para un efecto lifting sin cirug\xEDa.",
      "incluye": "L\xE1ser CO\u2082: blefaroplastia, con atenci\xF3n del equipo de Valencia Stetic en cabina privada.",
      "duracion_min": 30,
      "precio": 400000,
      "recurso": "cabina",
      "requiere_valoracion": false,
      "indicado_para": "Arrugas y l\xEDneas de expresi\xF3n; cicatrices (acn\xE9 y quir\xFArgicas); manchas post-inflamatorias de acn\xE9; poros dilatados; textura y flacidez; rejuvenecimiento de rostro, cuello y escote. Resultados visibles desde la primera sesi\xF3n.",
      "descripcion_larga": "Tratamiento est\xE9tico avanzado para renovaci\xF3n profunda de la piel. Emite micro-puntos de energ\xEDa que estimulan col\xE1geno y elastina, logrando un efecto lifting sin cirug\xEDa y una piel firme, uniforme y rejuvenecida.",
      "revisar_condiciones": true
    },
    {
      "id": "co2_cicatriz_lipeptomia",
      "nombre": "L\xE1ser CO\u2082: cicatriz de lipeptom\xEDa (abdominoplastia)",
      "nombre_corto": "CO\u2082 cicatriz lipeptom\xEDa",
      "categoria": "Armonizaci\xF3n y l\xE1ser",
      "activo": true,
      "codigos_anuncio": [],
      "claves": [
        "l\xE1ser co\u2082: cicatriz de lipeptom\xEDa (abdominoplastia)",
        "cicatriz de lipeptomia",
        "cicatriz quirurgica",
        "cicatriz quir\xFArgica",
        "abdominoplastia"
      ],
      "descripcion": "L\xE1ser CO\u2082 para cicatriz de lipeptom\xEDa o abdominoplastia en Pereira: mejora la textura y apariencia de cicatrices quir\xFArgicas.",
      "incluye": "L\xE1ser CO\u2082: cicatriz de lipeptom\xEDa (abdominoplastia), con atenci\xF3n del equipo de Valencia Stetic en cabina privada.",
      "duracion_min": 30,
      "precio": 450000,
      "recurso": "cabina",
      "requiere_valoracion": false,
      "indicado_para": "Arrugas y l\xEDneas de expresi\xF3n; cicatrices (acn\xE9 y quir\xFArgicas); manchas post-inflamatorias de acn\xE9; poros dilatados; textura y flacidez; rejuvenecimiento de rostro, cuello y escote. Resultados visibles desde la primera sesi\xF3n.",
      "descripcion_larga": "Tratamiento est\xE9tico avanzado para renovaci\xF3n profunda de la piel. Emite micro-puntos de energ\xEDa que estimulan col\xE1geno y elastina, logrando un efecto lifting sin cirug\xEDa y una piel firme, uniforme y rejuvenecida.",
      "revisar_condiciones": true
    },
    {
      "id": "co2_lipeptomia_360",
      "nombre": "L\xE1ser CO\u2082: lipeptom\xEDa 360",
      "nombre_corto": "CO\u2082 lipeptom\xEDa 360",
      "categoria": "Armonizaci\xF3n y l\xE1ser",
      "activo": true,
      "codigos_anuncio": [],
      "claves": [
        "l\xE1ser co\u2082: lipeptom\xEDa 360",
        "lipeptomia 360",
        "lipeptom\xEDa 360"
      ],
      "descripcion": "L\xE1ser CO\u2082 para lipeptom\xEDa 360 en Pereira: renovaci\xF3n profunda de la piel y de las cicatrices de la zona tratada.",
      "incluye": "L\xE1ser CO\u2082: lipeptom\xEDa 360, con atenci\xF3n del equipo de Valencia Stetic en cabina privada.",
      "duracion_min": 30,
      "precio": 550000,
      "recurso": "cabina",
      "requiere_valoracion": false,
      "indicado_para": "Arrugas y l\xEDneas de expresi\xF3n; cicatrices (acn\xE9 y quir\xFArgicas); manchas post-inflamatorias de acn\xE9; poros dilatados; textura y flacidez; rejuvenecimiento de rostro, cuello y escote. Resultados visibles desde la primera sesi\xF3n.",
      "descripcion_larga": "Tratamiento est\xE9tico avanzado para renovaci\xF3n profunda de la piel. Emite micro-puntos de energ\xEDa que estimulan col\xE1geno y elastina, logrando un efecto lifting sin cirug\xEDa y una piel firme, uniforme y rejuvenecida.",
      "revisar_condiciones": true
    },
    {
      "id": "co2_cicatriz_pexia",
      "nombre": "L\xE1ser CO\u2082: cicatriz de lipeptom\xEDa + pexia",
      "nombre_corto": "CO\u2082 cicatriz + pexia",
      "categoria": "Armonizaci\xF3n y l\xE1ser",
      "activo": true,
      "codigos_anuncio": [],
      "claves": [
        "l\xE1ser co\u2082: cicatriz de lipeptom\xEDa + pexia",
        "pexia",
        "cicatriz mas pexia",
        "cicatriz m\xE1s pexia"
      ],
      "descripcion": "L\xE1ser CO\u2082 para cicatriz de lipeptom\xEDa m\xE1s pexia en Pereira: tratamiento avanzado de cicatrices quir\xFArgicas.",
      "incluye": "L\xE1ser CO\u2082: cicatriz de lipeptom\xEDa + pexia, con atenci\xF3n del equipo de Valencia Stetic en cabina privada.",
      "duracion_min": 30,
      "precio": 600000,
      "recurso": "cabina",
      "requiere_valoracion": false,
      "indicado_para": "Arrugas y l\xEDneas de expresi\xF3n; cicatrices (acn\xE9 y quir\xFArgicas); manchas post-inflamatorias de acn\xE9; poros dilatados; textura y flacidez; rejuvenecimiento de rostro, cuello y escote. Resultados visibles desde la primera sesi\xF3n.",
      "descripcion_larga": "Tratamiento est\xE9tico avanzado para renovaci\xF3n profunda de la piel. Emite micro-puntos de energ\xEDa que estimulan col\xE1geno y elastina, logrando un efecto lifting sin cirug\xEDa y una piel firme, uniforme y rejuvenecida.",
      "revisar_condiciones": true
    },
    {
      "id": "co2_facial",
      "nombre": "L\xE1ser CO\u2082: facial",
      "nombre_corto": "CO\u2082 facial",
      "categoria": "Armonizaci\xF3n y l\xE1ser",
      "activo": true,
      "codigos_anuncio": [],
      "claves": [
        "l\xE1ser co\u2082: facial",
        "co2 facial",
        "laser co2",
        "l\xE1ser co2",
        "co2",
        "rejuvenecimiento facial"
      ],
      "descripcion": "L\xE1ser CO\u2082 facial en Pereira: renovaci\xF3n profunda de la piel con efecto lifting sin cirug\xEDa para arrugas, cicatrices de acn\xE9 y poros dilatados.",
      "incluye": "L\xE1ser CO\u2082: facial, con atenci\xF3n del equipo de Valencia Stetic en cabina privada.",
      "duracion_min": 30,
      "precio": 650000,
      "recurso": "cabina",
      "requiere_valoracion": false,
      "indicado_para": "Arrugas y l\xEDneas de expresi\xF3n; cicatrices (acn\xE9 y quir\xFArgicas); manchas post-inflamatorias de acn\xE9; poros dilatados; textura y flacidez; rejuvenecimiento de rostro, cuello y escote. Resultados visibles desde la primera sesi\xF3n.",
      "descripcion_larga": "Tratamiento est\xE9tico avanzado para renovaci\xF3n profunda de la piel. Emite micro-puntos de energ\xEDa que estimulan col\xE1geno y elastina, logrando un efecto lifting sin cirug\xEDa y una piel firme, uniforme y rejuvenecida.",
      "revisar_condiciones": true
    },
    {
      "id": "co2_facial_cuello",
      "nombre": "L\xE1ser CO\u2082: facial, cuello y escote",
      "nombre_corto": "CO\u2082 facial cuello escote",
      "categoria": "Armonizaci\xF3n y l\xE1ser",
      "activo": true,
      "codigos_anuncio": [],
      "claves": [
        "l\xE1ser co\u2082: facial, cuello y escote",
        "cuello y escote",
        "escote",
        "cuello"
      ],
      "descripcion": "L\xE1ser CO\u2082 de rostro, cuello y escote en Pereira: rejuvenecimiento integral con efecto lifting sin cirug\xEDa.",
      "incluye": "L\xE1ser CO\u2082: facial, cuello y escote, con atenci\xF3n del equipo de Valencia Stetic en cabina privada.",
      "duracion_min": 30,
      "precio": 800000,
      "recurso": "cabina",
      "requiere_valoracion": false,
      "indicado_para": "Arrugas y l\xEDneas de expresi\xF3n; cicatrices (acn\xE9 y quir\xFArgicas); manchas post-inflamatorias de acn\xE9; poros dilatados; textura y flacidez; rejuvenecimiento de rostro, cuello y escote. Resultados visibles desde la primera sesi\xF3n.",
      "descripcion_larga": "Tratamiento est\xE9tico avanzado para renovaci\xF3n profunda de la piel. Emite micro-puntos de energ\xEDa que estimulan col\xE1geno y elastina, logrando un efecto lifting sin cirug\xEDa y una piel firme, uniforme y rejuvenecida.",
      "revisar_condiciones": true
    },
    {
      "id": "botox_1zona",
      "nombre": "Toxina botul\xEDnica (Botox): 1 zona",
      "nombre_corto": "Botox 1 zona",
      "categoria": "Armonizaci\xF3n y l\xE1ser",
      "activo": true,
      "codigos_anuncio": [],
      "claves": [
        "toxina botul\xEDnica (botox): 1 zona",
        "botox 1 zona",
        "una zona de botox"
      ],
      "descripcion": "Toxina botul\xEDnica (Botox) en Pereira: suaviza arrugas y l\xEDneas de expresi\xF3n para un aspecto descansado y rejuvenecido. Precio por 1 zona.",
      "incluye": "Toxina botul\xEDnica (Botox): 1 zona, con atenci\xF3n del equipo de Valencia Stetic en cabina privada.",
      "duracion_min": 30,
      "precio": 360000,
      "recurso": "cabina",
      "requiere_valoracion": false,
      "procedimiento": "Desinfecci\xF3n de la zona, crioterapia (para bajar el umbral del dolor) y aplicaci\xF3n de toxina.",
      "cuidados": "No agacharse ni acostarse durante las primeras 5 horas; no masajear las zonas tratadas; no sol, sauna, turco ni gimnasio por 24 horas; no utilizar casco de ning\xFAn tipo el mismo d\xEDa; no realizar tratamientos faciales con aparatolog\xEDa durante los primeros 15 d\xEDas.",
      "contraindicaciones": "Hipersensibilidad a la toxina; embarazo y lactancia; miastenia gravis; Esclerosis Lateral Amiotr\xF3fica (ELA); infecci\xF3n o inflamaci\xF3n en el \xE1rea; anticoagulados; uso de aspirina, analg\xE9sicos o warfarina; hemof\xEDlicos.",
      "alerta": "ESTRICTAMENTE PROHIBIDO consumir bebidas alcoh\xF3licas durante los 4 d\xEDas posteriores a la aplicaci\xF3n (alto riesgo de reacciones adversas y resultados no deseados).",
      "resultados": "Visibles en 3 a 7 d\xEDas; efecto m\xE1ximo a los 14 d\xEDas; duraci\xF3n de 4 a 6 meses.",
      "revisar_condiciones": true
    },
    {
      "id": "botox_tercio",
      "nombre": "Toxina botul\xEDnica (Botox): tercio superior",
      "nombre_corto": "Botox tercio superior",
      "categoria": "Armonizaci\xF3n y l\xE1ser",
      "activo": true,
      "codigos_anuncio": [],
      "claves": [
        "toxina botul\xEDnica (botox): tercio superior",
        "tercio superior",
        "botox tercio",
        "botox tercio superior"
      ],
      "descripcion": "Toxina botul\xEDnica (Botox) del tercio superior del rostro en Pereira: frente, entrecejo y patas de gallo para un aspecto descansado.",
      "incluye": "Toxina botul\xEDnica (Botox): tercio superior, con atenci\xF3n del equipo de Valencia Stetic en cabina privada.",
      "duracion_min": 30,
      "precio": 1000000,
      "recurso": "cabina",
      "requiere_valoracion": false,
      "procedimiento": "Desinfecci\xF3n de la zona, crioterapia (para bajar el umbral del dolor) y aplicaci\xF3n de toxina.",
      "cuidados": "No agacharse ni acostarse durante las primeras 5 horas; no masajear las zonas tratadas; no sol, sauna, turco ni gimnasio por 24 horas; no utilizar casco de ning\xFAn tipo el mismo d\xEDa; no realizar tratamientos faciales con aparatolog\xEDa durante los primeros 15 d\xEDas.",
      "contraindicaciones": "Hipersensibilidad a la toxina; embarazo y lactancia; miastenia gravis; Esclerosis Lateral Amiotr\xF3fica (ELA); infecci\xF3n o inflamaci\xF3n en el \xE1rea; anticoagulados; uso de aspirina, analg\xE9sicos o warfarina; hemof\xEDlicos.",
      "alerta": "ESTRICTAMENTE PROHIBIDO consumir bebidas alcoh\xF3licas durante los 4 d\xEDas posteriores a la aplicaci\xF3n (alto riesgo de reacciones adversas y resultados no deseados).",
      "resultados": "Visibles en 3 a 7 d\xEDas; efecto m\xE1ximo a los 14 d\xEDas; duraci\xF3n de 4 a 6 meses.",
      "revisar_condiciones": true
    },
    {
      "id": "acido_hialuronico",
      "nombre": "\xC1cido hialur\xF3nico",
      "nombre_corto": "\xC1cido hialur\xF3nico",
      "categoria": "Armonizaci\xF3n y l\xE1ser",
      "activo": true,
      "codigos_anuncio": [],
      "claves": [
        "\xE1cido hialur\xF3nico",
        "acido hialuronico",
        "relleno",
        "labios",
        "surcos",
        "ment\xF3n",
        "menton",
        "volumen"
      ],
      "descripcion": "\xC1cido hialur\xF3nico en Pereira: relleno d\xE9rmico reabsorbible que aporta volumen y define labios, surcos y contorno del rostro con efecto inmediato.",
      "incluye": "\xC1cido hialur\xF3nico, con atenci\xF3n del equipo de Valencia Stetic en cabina privada.",
      "duracion_min": 60,
      "duracion_texto": "1 hora",
      "precio": 900000,
      "recurso": "cabina",
      "requiere_valoracion": false,
      "procedimiento": "Aplicaci\xF3n de relleno d\xE9rmico reabsorbible inyectable.",
      "indicado_para": "Disminuye arrugas y pliegues faciales, aporta volumen y define el contorno del rostro y labios. Zonas: labios, surcos nasogenianos, ment\xF3n, entre otros.",
      "contraindicaciones": "Pacientes anticoagulados o con enfermedades autoinmunes; diabetes; embarazo o lactancia; tratamientos inmunodeprimidos; alergias; hipertensi\xF3n no controlada; rellenos previos desconocidos; enfermedades del col\xE1geno.",
      "alerta": "Efectos frecuentes: edema, eritema, hematomas, sangrado o sensaci\xF3n de bultos (transitorios y de resoluci\xF3n espont\xE1nea). En pacientes con antecedentes de herpes labial puede reactivarse (prevenible con medicaci\xF3n).",
      "revisar_condiciones": true
    },
    {
      "id": "zona_negris_axilas",
      "nombre": "Zona Negris: axilas (5 sesiones)",
      "nombre_corto": "Zona Negris axilas",
      "categoria": "Armonizaci\xF3n y l\xE1ser",
      "activo": true,
      "codigos_anuncio": [],
      "claves": [
        "zona negris: axilas (5 sesiones)",
        "zona negris axilas",
        "negris axilas",
        "axilas oscuras",
        "aclarar axilas"
      ],
      "descripcion": "Zona Negris en Pereira: aclaramiento progresivo de axilas oscuras con exfoliaci\xF3n, l\xE1ser Hollywood y mascarilla aclarante. Paquete de 5 sesiones.",
      "incluye": "Zona Negris: axilas (5 sesiones), con atenci\xF3n del equipo de Valencia Stetic en cabina privada.",
      "duracion_min": 30,
      "precio": 450000,
      "precio_nota": "Paquete de 5 sesiones",
      "recurso": "cabina",
      "requiere_valoracion": false,
      "procedimiento": "Higiene, exfoliaci\xF3n, puntas de diamante, mascarilla de carb\xF3n, L\xE1ser Hollywood y mascarilla aclarante.",
      "indicado_para": "Aclara progresivamente, unifica el tono, suaviza e hidrata manchas oscuras en cuello, axilas, entrepierna o codos (por hormonas, resistencia a la insulina, fricci\xF3n o depilaci\xF3n).",
      "sesiones": "Paquete de 5 sesiones, asistiendo 1 vez por semana y realizando el tratamiento en casa.",
      "cuidados": "Requiere adquirir el Kit Zona Negris, disponible en el centro.",
      "revisar_condiciones": true,
      "paquete": "Paquete de 5 sesiones"
    },
    {
      "id": "zona_negris_entrepierna",
      "nombre": "Zona Negris: entrepierna (5 sesiones)",
      "nombre_corto": "Zona Negris entrepierna",
      "categoria": "Armonizaci\xF3n y l\xE1ser",
      "activo": true,
      "codigos_anuncio": [],
      "claves": [
        "zona negris: entrepierna (5 sesiones)",
        "zona negris entrepierna",
        "negris entrepierna",
        "entrepierna oscura"
      ],
      "descripcion": "Zona Negris en Pereira: aclaramiento progresivo de la entrepierna con exfoliaci\xF3n, l\xE1ser Hollywood y mascarilla aclarante. Paquete de 5 sesiones.",
      "incluye": "Zona Negris: entrepierna (5 sesiones), con atenci\xF3n del equipo de Valencia Stetic en cabina privada.",
      "duracion_min": 30,
      "precio": 450000,
      "precio_nota": "Paquete de 5 sesiones",
      "recurso": "cabina",
      "requiere_valoracion": false,
      "procedimiento": "Higiene, exfoliaci\xF3n, puntas de diamante, mascarilla de carb\xF3n, L\xE1ser Hollywood y mascarilla aclarante.",
      "indicado_para": "Aclara progresivamente, unifica el tono, suaviza e hidrata manchas oscuras en cuello, axilas, entrepierna o codos (por hormonas, resistencia a la insulina, fricci\xF3n o depilaci\xF3n).",
      "sesiones": "Paquete de 5 sesiones, asistiendo 1 vez por semana y realizando el tratamiento en casa.",
      "cuidados": "Requiere adquirir el Kit Zona Negris, disponible en el centro.",
      "revisar_condiciones": true,
      "paquete": "Paquete de 5 sesiones"
    },
    {
      "id": "zona_negris_ambas",
      "nombre": "Zona Negris: axilas y entrepierna (5 sesiones)",
      "nombre_corto": "Zona Negris ambas",
      "categoria": "Armonizaci\xF3n y l\xE1ser",
      "activo": true,
      "codigos_anuncio": [],
      "claves": [
        "zona negris: axilas y entrepierna (5 sesiones)",
        "zona negris ambas",
        "negris ambas zonas"
      ],
      "descripcion": "Zona Negris en Pereira: aclaramiento de axilas y entrepierna en un solo paquete de 5 sesiones, con exfoliaci\xF3n, l\xE1ser Hollywood y mascarilla aclarante.",
      "incluye": "Zona Negris: axilas y entrepierna (5 sesiones), con atenci\xF3n del equipo de Valencia Stetic en cabina privada.",
      "duracion_min": 30,
      "precio": 700000,
      "precio_nota": "Paquete de 5 sesiones",
      "recurso": "cabina",
      "requiere_valoracion": false,
      "procedimiento": "Higiene, exfoliaci\xF3n, puntas de diamante, mascarilla de carb\xF3n, L\xE1ser Hollywood y mascarilla aclarante.",
      "indicado_para": "Aclara progresivamente, unifica el tono, suaviza e hidrata manchas oscuras en cuello, axilas, entrepierna o codos (por hormonas, resistencia a la insulina, fricci\xF3n o depilaci\xF3n).",
      "sesiones": "Paquete de 5 sesiones, asistiendo 1 vez por semana y realizando el tratamiento en casa.",
      "cuidados": "Requiere adquirir el Kit Zona Negris, disponible en el centro.",
      "revisar_condiciones": true,
      "paquete": "Paquete de 5 sesiones"
    },
    {
      "id": "cauterizacion_1_3",
      "nombre": "Cauterizaci\xF3n: 1 a 3 lesiones",
      "nombre_corto": "Cauterizaci\xF3n 1 a 3",
      "categoria": "Armonizaci\xF3n y l\xE1ser",
      "activo": true,
      "codigos_anuncio": [],
      "claves": [
        "cauterizaci\xF3n: 1 a 3 lesiones",
        "cauterizacion",
        "cauterizaci\xF3n",
        "verruga",
        "verrugas",
        "lunar",
        "lunares",
        "quitar lunares",
        "puntos rubi",
        "puntos rub\xED",
        "queratosis"
      ],
      "descripcion": "Cauterizaci\xF3n en Pereira: retiro de verrugas, lunares benignos (con valoraci\xF3n previa), puntos rub\xED y queratosis. Valor de 1 a 3 lesiones.",
      "incluye": "Cauterizaci\xF3n: 1 a 3 lesiones, con atenci\xF3n del equipo de Valencia Stetic en cabina privada.",
      "duracion_min": 30,
      "precio": 130000,
      "precio_nota": "Puede variar seg\xFAn el tama\xF1o de la lesi\xF3n",
      "recurso": "cabina",
      "requiere_valoracion": false,
      "indicado_para": "Eliminaci\xF3n de verrugas, retiro de lunares benignos (previa valoraci\xF3n), puntos rub\xED y queratosis.",
      "contraindicaciones": "Lesiones sospechosas de malignidad (lunares irregulares, cambios de color, sangrado) o antecedentes de c\xE1ncer de piel sin valoraci\xF3n m\xE9dica; embarazo; marcapasos; trastornos de coagulaci\xF3n o anticoagulantes; diabetes no controlada; infecciones activas; tendencia a queloides; enfermedades autoinmunes activas o inmunosupresi\xF3n; uso reciente de isotretino\xEDna (6 a 12 meses).",
      "alerta": "Los lunares benignos requieren valoraci\xF3n previa. Jam\xE1s se cauterizan lesiones sospechosas de malignidad.",
      "revisar_condiciones": true
    },
    {
      "id": "cauterizacion_4_7",
      "nombre": "Cauterizaci\xF3n: 4 a 7 lesiones",
      "nombre_corto": "Cauterizaci\xF3n 4 a 7",
      "categoria": "Armonizaci\xF3n y l\xE1ser",
      "activo": true,
      "codigos_anuncio": [],
      "claves": [
        "cauterizaci\xF3n: 4 a 7 lesiones",
        "cauterizacion 4 a 7",
        "cauterizaci\xF3n 4 a 7",
        "varias lesiones"
      ],
      "descripcion": "Cauterizaci\xF3n en Pereira: retiro de verrugas, lunares benignos (con valoraci\xF3n previa), puntos rub\xED y queratosis. Valor de 4 a 7 lesiones.",
      "incluye": "Cauterizaci\xF3n: 4 a 7 lesiones, con atenci\xF3n del equipo de Valencia Stetic en cabina privada.",
      "duracion_min": 30,
      "precio": 180000,
      "precio_nota": "Puede variar seg\xFAn el tama\xF1o de la lesi\xF3n",
      "recurso": "cabina",
      "requiere_valoracion": false,
      "indicado_para": "Eliminaci\xF3n de verrugas, retiro de lunares benignos (previa valoraci\xF3n), puntos rub\xED y queratosis.",
      "contraindicaciones": "Lesiones sospechosas de malignidad (lunares irregulares, cambios de color, sangrado) o antecedentes de c\xE1ncer de piel sin valoraci\xF3n m\xE9dica; embarazo; marcapasos; trastornos de coagulaci\xF3n o anticoagulantes; diabetes no controlada; infecciones activas; tendencia a queloides; enfermedades autoinmunes activas o inmunosupresi\xF3n; uso reciente de isotretino\xEDna (6 a 12 meses).",
      "alerta": "Los lunares benignos requieren valoraci\xF3n previa. Jam\xE1s se cauterizan lesiones sospechosas de malignidad.",
      "revisar_condiciones": true
    },
    {
      "id": "tatuajes",
      "nombre": "Remoci\xF3n de tatuajes con l\xE1ser",
      "nombre_corto": "Remoci\xF3n de tatuajes",
      "categoria": "Armonizaci\xF3n y l\xE1ser",
      "activo": true,
      "codigos_anuncio": [],
      "claves": [
        "remoci\xF3n de tatuajes con l\xE1ser",
        "tatuaje",
        "tatuajes",
        "quitar tatuaje",
        "remocion de tatuajes",
        "remoci\xF3n de tatuajes",
        "borrar tatuaje"
      ],
      "descripcion": "Remoci\xF3n de tatuajes con l\xE1ser en Pereira: fragmenta el pigmento para que el cuerpo lo elimine de forma natural. Entre 5 y 16 sesiones; valor seg\xFAn valoraci\xF3n.",
      "incluye": "Remoci\xF3n de tatuajes con l\xE1ser, con atenci\xF3n del equipo de Valencia Stetic en cabina privada.",
      "duracion_min": 30,
      "precio": null,
      "precio_nota": "Valor sujeto a valoraci\xF3n",
      "recurso": "laser",
      "requiere_valoracion": false,
      "procedimiento": "Higienizaci\xF3n, anestesia, crioterapia, remoci\xF3n l\xE1ser y gel de aloe.",
      "sesiones": "Entre 5 y 16 sesiones realizadas cada 6 semanas (depende de colores, tinta, profundidad, antig\xFCedad y zona).",
      "cuidados": "Si es posible, suspender analg\xE9sicos, antiinflamatorios, antial\xE9rgicos, anti\xE1cidos, antibi\xF3ticos y antioxidantes 5 a 7 d\xEDas antes (siempre que tu m\xE9dico lo autorice).",
      "contraindicaciones": "Marcapasos, epilepsia, alteraciones card\xEDacas, hipertensi\xF3n, diabetes, embarazo o lactancia, fotosensibilidad, piel lesionada o infectada, dermatitis o psoriasis, Roaccutan/isotretino\xEDna (6 meses previos), c\xE1ncer o terapia hormonal, tendencia a hiperpigmentaci\xF3n, hilos tensores, rellenos o cirug\xEDas recientes (3 a 6 meses).",
      "revisar_condiciones": true
    },
    {
      "id": "laser_bigote",
      "nombre": "L\xE1ser diodo: bigote",
      "nombre_corto": "L\xE1ser: bigote",
      "categoria": "Depilaci\xF3n l\xE1ser diodo",
      "activo": true,
      "codigos_anuncio": [],
      "claves": [
        "l\xE1ser diodo: bigote",
        "bigote",
        "bozo",
        "laser bigote",
        "l\xE1ser bigote"
      ],
      "descripcion": "Depilaci\xF3n l\xE1ser diodo Ice de bigote en Pereira, con tecnolog\xEDa Soprano: act\xFAa de forma progresiva, con baja temperatura y menos molestia. Precio por sesi\xF3n.",
      "incluye": "L\xE1ser diodo: bigote, con atenci\xF3n del equipo de Valencia Stetic en cabina privada.",
      "duracion_min": 30,
      "precio": 40000,
      "recurso": "laser",
      "requiere_valoracion": false,
      "procedimiento": "Crioterapia, l\xE1ser diodo y protector solar.",
      "indicado_para": "Reducir el vello de forma progresiva; ayuda a aclarar pigmentaciones y mejora la foliculitis.",
      "sesiones": "Aproximadamente 10 a 12 sesiones, una cada 20 a 30 d\xEDas (var\xEDa seg\xFAn edad, sistema hormonal, tipo de piel, color del vello y respuesta individual). Hay modalidad de pago por sesiones.",
      "cuidados": "Rasurar con cuchilla el mismo d\xEDa. Asistir con la piel libre de productos (cremas, desodorante). Sin exposici\xF3n solar (natural o artificial) y sin despigmentantes durante el tratamiento.",
      "contraindicaciones": "Lupus, psoriasis, embarazo, lactancia, acn\xE9 en tratamiento con isotretino\xEDna (Roaccutan), fotosensibilidad, vit\xEDligo, marcapasos, vello rubio, pelirrojo o canoso, tatuaje en la zona, queloides, quemaduras, descamaci\xF3n, bronceado intenso, hipotiroidismo, s\xEDndrome metab\xF3lico e hiperandrogenismo.",
      "dolor": "La tecnolog\xEDa Soprano act\xFAa de forma progresiva y a temperaturas m\xE1s bajas y estables, protegiendo la piel de quemaduras y reduciendo notablemente el dolor; adem\xE1s se usa crioterapia.",
      "revisar_condiciones": true
    },
    {
      "id": "laser_menton",
      "nombre": "L\xE1ser diodo: ment\xF3n",
      "nombre_corto": "L\xE1ser: ment\xF3n",
      "categoria": "Depilaci\xF3n l\xE1ser diodo",
      "activo": true,
      "codigos_anuncio": [],
      "claves": [
        "l\xE1ser diodo: ment\xF3n",
        "menton",
        "ment\xF3n",
        "laser menton"
      ],
      "descripcion": "Depilaci\xF3n l\xE1ser diodo Ice de ment\xF3n en Pereira, con tecnolog\xEDa Soprano: act\xFAa de forma progresiva, con baja temperatura y menos molestia. Precio por sesi\xF3n.",
      "incluye": "L\xE1ser diodo: ment\xF3n, con atenci\xF3n del equipo de Valencia Stetic en cabina privada.",
      "duracion_min": 30,
      "precio": 40000,
      "recurso": "laser",
      "requiere_valoracion": false,
      "procedimiento": "Crioterapia, l\xE1ser diodo y protector solar.",
      "indicado_para": "Reducir el vello de forma progresiva; ayuda a aclarar pigmentaciones y mejora la foliculitis.",
      "sesiones": "Aproximadamente 10 a 12 sesiones, una cada 20 a 30 d\xEDas (var\xEDa seg\xFAn edad, sistema hormonal, tipo de piel, color del vello y respuesta individual). Hay modalidad de pago por sesiones.",
      "cuidados": "Rasurar con cuchilla el mismo d\xEDa. Asistir con la piel libre de productos (cremas, desodorante). Sin exposici\xF3n solar (natural o artificial) y sin despigmentantes durante el tratamiento.",
      "contraindicaciones": "Lupus, psoriasis, embarazo, lactancia, acn\xE9 en tratamiento con isotretino\xEDna (Roaccutan), fotosensibilidad, vit\xEDligo, marcapasos, vello rubio, pelirrojo o canoso, tatuaje en la zona, queloides, quemaduras, descamaci\xF3n, bronceado intenso, hipotiroidismo, s\xEDndrome metab\xF3lico e hiperandrogenismo.",
      "dolor": "La tecnolog\xEDa Soprano act\xFAa de forma progresiva y a temperaturas m\xE1s bajas y estables, protegiendo la piel de quemaduras y reduciendo notablemente el dolor; adem\xE1s se usa crioterapia.",
      "revisar_condiciones": true
    },
    {
      "id": "laser_patillas",
      "nombre": "L\xE1ser diodo: patillas",
      "nombre_corto": "L\xE1ser: patillas",
      "categoria": "Depilaci\xF3n l\xE1ser diodo",
      "activo": true,
      "codigos_anuncio": [],
      "claves": [
        "l\xE1ser diodo: patillas",
        "patillas",
        "laser patillas"
      ],
      "descripcion": "Depilaci\xF3n l\xE1ser diodo Ice de patillas en Pereira, con tecnolog\xEDa Soprano: act\xFAa de forma progresiva, con baja temperatura y menos molestia. Precio por sesi\xF3n.",
      "incluye": "L\xE1ser diodo: patillas, con atenci\xF3n del equipo de Valencia Stetic en cabina privada.",
      "duracion_min": 30,
      "precio": 40000,
      "recurso": "laser",
      "requiere_valoracion": false,
      "procedimiento": "Crioterapia, l\xE1ser diodo y protector solar.",
      "indicado_para": "Reducir el vello de forma progresiva; ayuda a aclarar pigmentaciones y mejora la foliculitis.",
      "sesiones": "Aproximadamente 10 a 12 sesiones, una cada 20 a 30 d\xEDas (var\xEDa seg\xFAn edad, sistema hormonal, tipo de piel, color del vello y respuesta individual). Hay modalidad de pago por sesiones.",
      "cuidados": "Rasurar con cuchilla el mismo d\xEDa. Asistir con la piel libre de productos (cremas, desodorante). Sin exposici\xF3n solar (natural o artificial) y sin despigmentantes durante el tratamiento.",
      "contraindicaciones": "Lupus, psoriasis, embarazo, lactancia, acn\xE9 en tratamiento con isotretino\xEDna (Roaccutan), fotosensibilidad, vit\xEDligo, marcapasos, vello rubio, pelirrojo o canoso, tatuaje en la zona, queloides, quemaduras, descamaci\xF3n, bronceado intenso, hipotiroidismo, s\xEDndrome metab\xF3lico e hiperandrogenismo.",
      "dolor": "La tecnolog\xEDa Soprano act\xFAa de forma progresiva y a temperaturas m\xE1s bajas y estables, protegiendo la piel de quemaduras y reduciendo notablemente el dolor; adem\xE1s se usa crioterapia.",
      "revisar_condiciones": true
    },
    {
      "id": "laser_barba",
      "nombre": "L\xE1ser diodo: perfilamiento de barba",
      "nombre_corto": "L\xE1ser: perfilar barba",
      "categoria": "Depilaci\xF3n l\xE1ser diodo",
      "activo": true,
      "codigos_anuncio": [],
      "claves": [
        "l\xE1ser diodo: perfilamiento de barba",
        "barba",
        "perfilamiento de barba",
        "perfilar barba"
      ],
      "descripcion": "Depilaci\xF3n l\xE1ser diodo Ice de perfilamiento de barba en Pereira, con tecnolog\xEDa Soprano: act\xFAa de forma progresiva, con baja temperatura y menos molestia. Precio por sesi\xF3n.",
      "incluye": "L\xE1ser diodo: perfilamiento de barba, con atenci\xF3n del equipo de Valencia Stetic en cabina privada.",
      "duracion_min": 30,
      "precio": 40000,
      "recurso": "laser",
      "requiere_valoracion": false,
      "procedimiento": "Crioterapia, l\xE1ser diodo y protector solar.",
      "indicado_para": "Reducir el vello de forma progresiva; ayuda a aclarar pigmentaciones y mejora la foliculitis.",
      "sesiones": "Aproximadamente 10 a 12 sesiones, una cada 20 a 30 d\xEDas (var\xEDa seg\xFAn edad, sistema hormonal, tipo de piel, color del vello y respuesta individual). Hay modalidad de pago por sesiones.",
      "cuidados": "Rasurar con cuchilla el mismo d\xEDa. Asistir con la piel libre de productos (cremas, desodorante). Sin exposici\xF3n solar (natural o artificial) y sin despigmentantes durante el tratamiento.",
      "contraindicaciones": "Lupus, psoriasis, embarazo, lactancia, acn\xE9 en tratamiento con isotretino\xEDna (Roaccutan), fotosensibilidad, vit\xEDligo, marcapasos, vello rubio, pelirrojo o canoso, tatuaje en la zona, queloides, quemaduras, descamaci\xF3n, bronceado intenso, hipotiroidismo, s\xEDndrome metab\xF3lico e hiperandrogenismo.",
      "dolor": "La tecnolog\xEDa Soprano act\xFAa de forma progresiva y a temperaturas m\xE1s bajas y estables, protegiendo la piel de quemaduras y reduciendo notablemente el dolor; adem\xE1s se usa crioterapia.",
      "revisar_condiciones": true
    },
    {
      "id": "laser_linea_alba",
      "nombre": "L\xE1ser diodo: l\xEDnea del ombligo",
      "nombre_corto": "L\xE1ser: l\xEDnea ombligo",
      "categoria": "Depilaci\xF3n l\xE1ser diodo",
      "activo": true,
      "codigos_anuncio": [],
      "claves": [
        "l\xE1ser diodo: l\xEDnea del ombligo",
        "linea del ombligo",
        "l\xEDnea del ombligo",
        "linea alba",
        "l\xEDnea alba",
        "ombligo"
      ],
      "descripcion": "Depilaci\xF3n l\xE1ser diodo Ice de l\xEDnea del ombligo en Pereira, con tecnolog\xEDa Soprano: act\xFAa de forma progresiva, con baja temperatura y menos molestia. Precio por sesi\xF3n.",
      "incluye": "L\xE1ser diodo: l\xEDnea del ombligo, con atenci\xF3n del equipo de Valencia Stetic en cabina privada.",
      "duracion_min": 30,
      "precio": 40000,
      "recurso": "laser",
      "requiere_valoracion": false,
      "procedimiento": "Crioterapia, l\xE1ser diodo y protector solar.",
      "indicado_para": "Reducir el vello de forma progresiva; ayuda a aclarar pigmentaciones y mejora la foliculitis.",
      "sesiones": "Aproximadamente 10 a 12 sesiones, una cada 20 a 30 d\xEDas (var\xEDa seg\xFAn edad, sistema hormonal, tipo de piel, color del vello y respuesta individual). Hay modalidad de pago por sesiones.",
      "cuidados": "Rasurar con cuchilla el mismo d\xEDa. Asistir con la piel libre de productos (cremas, desodorante). Sin exposici\xF3n solar (natural o artificial) y sin despigmentantes durante el tratamiento.",
      "contraindicaciones": "Lupus, psoriasis, embarazo, lactancia, acn\xE9 en tratamiento con isotretino\xEDna (Roaccutan), fotosensibilidad, vit\xEDligo, marcapasos, vello rubio, pelirrojo o canoso, tatuaje en la zona, queloides, quemaduras, descamaci\xF3n, bronceado intenso, hipotiroidismo, s\xEDndrome metab\xF3lico e hiperandrogenismo.",
      "dolor": "La tecnolog\xEDa Soprano act\xFAa de forma progresiva y a temperaturas m\xE1s bajas y estables, protegiendo la piel de quemaduras y reduciendo notablemente el dolor; adem\xE1s se usa crioterapia.",
      "revisar_condiciones": true
    },
    {
      "id": "laser",
      "nombre": "L\xE1ser diodo: axilas",
      "nombre_corto": "L\xE1ser: axilas",
      "categoria": "Depilaci\xF3n l\xE1ser diodo",
      "activo": true,
      "codigos_anuncio": [
        "LASER",
        "L\xC1SER"
      ],
      "claves": [
        "l\xE1ser diodo: axilas",
        "axila",
        "axilas",
        "laser axilas",
        "l\xE1ser axilas"
      ],
      "descripcion": "Depilaci\xF3n l\xE1ser diodo Ice de axilas en Pereira, con tecnolog\xEDa Soprano: act\xFAa de forma progresiva, con baja temperatura y menos molestia. Precio por sesi\xF3n.",
      "incluye": "L\xE1ser diodo: axilas, con atenci\xF3n del equipo de Valencia Stetic en cabina privada.",
      "duracion_min": 30,
      "precio": 70000,
      "recurso": "laser",
      "requiere_valoracion": false,
      "procedimiento": "Crioterapia, l\xE1ser diodo y protector solar.",
      "indicado_para": "Reducir el vello de forma progresiva; ayuda a aclarar pigmentaciones y mejora la foliculitis.",
      "sesiones": "Aproximadamente 10 a 12 sesiones, una cada 20 a 30 d\xEDas (var\xEDa seg\xFAn edad, sistema hormonal, tipo de piel, color del vello y respuesta individual). Hay modalidad de pago por sesiones.",
      "cuidados": "Rasurar con cuchilla el mismo d\xEDa. Asistir con la piel libre de productos (cremas, desodorante). Sin exposici\xF3n solar (natural o artificial) y sin despigmentantes durante el tratamiento.",
      "contraindicaciones": "Lupus, psoriasis, embarazo, lactancia, acn\xE9 en tratamiento con isotretino\xEDna (Roaccutan), fotosensibilidad, vit\xEDligo, marcapasos, vello rubio, pelirrojo o canoso, tatuaje en la zona, queloides, quemaduras, descamaci\xF3n, bronceado intenso, hipotiroidismo, s\xEDndrome metab\xF3lico e hiperandrogenismo.",
      "dolor": "La tecnolog\xEDa Soprano act\xFAa de forma progresiva y a temperaturas m\xE1s bajas y estables, protegiendo la piel de quemaduras y reduciendo notablemente el dolor; adem\xE1s se usa crioterapia.",
      "revisar_condiciones": true
    },
    {
      "id": "laser_antebrazo",
      "nombre": "L\xE1ser diodo: antebrazo",
      "nombre_corto": "L\xE1ser: antebrazo",
      "categoria": "Depilaci\xF3n l\xE1ser diodo",
      "activo": true,
      "codigos_anuncio": [],
      "claves": [
        "l\xE1ser diodo: antebrazo",
        "antebrazo",
        "ante brazo",
        "laser antebrazo"
      ],
      "descripcion": "Depilaci\xF3n l\xE1ser diodo Ice de antebrazo en Pereira, con tecnolog\xEDa Soprano: act\xFAa de forma progresiva, con baja temperatura y menos molestia. Precio por sesi\xF3n.",
      "incluye": "L\xE1ser diodo: antebrazo, con atenci\xF3n del equipo de Valencia Stetic en cabina privada.",
      "duracion_min": 30,
      "precio": 70000,
      "recurso": "laser",
      "requiere_valoracion": false,
      "procedimiento": "Crioterapia, l\xE1ser diodo y protector solar.",
      "indicado_para": "Reducir el vello de forma progresiva; ayuda a aclarar pigmentaciones y mejora la foliculitis.",
      "sesiones": "Aproximadamente 10 a 12 sesiones, una cada 20 a 30 d\xEDas (var\xEDa seg\xFAn edad, sistema hormonal, tipo de piel, color del vello y respuesta individual). Hay modalidad de pago por sesiones.",
      "cuidados": "Rasurar con cuchilla el mismo d\xEDa. Asistir con la piel libre de productos (cremas, desodorante). Sin exposici\xF3n solar (natural o artificial) y sin despigmentantes durante el tratamiento.",
      "contraindicaciones": "Lupus, psoriasis, embarazo, lactancia, acn\xE9 en tratamiento con isotretino\xEDna (Roaccutan), fotosensibilidad, vit\xEDligo, marcapasos, vello rubio, pelirrojo o canoso, tatuaje en la zona, queloides, quemaduras, descamaci\xF3n, bronceado intenso, hipotiroidismo, s\xEDndrome metab\xF3lico e hiperandrogenismo.",
      "dolor": "La tecnolog\xEDa Soprano act\xFAa de forma progresiva y a temperaturas m\xE1s bajas y estables, protegiendo la piel de quemaduras y reduciendo notablemente el dolor; adem\xE1s se usa crioterapia.",
      "revisar_condiciones": true
    },
    {
      "id": "laser_abdomen",
      "nombre": "L\xE1ser diodo: abdomen",
      "nombre_corto": "L\xE1ser: abdomen",
      "categoria": "Depilaci\xF3n l\xE1ser diodo",
      "activo": true,
      "codigos_anuncio": [],
      "claves": [
        "l\xE1ser diodo: abdomen",
        "abdomen",
        "barriga",
        "laser abdomen"
      ],
      "descripcion": "Depilaci\xF3n l\xE1ser diodo Ice de abdomen en Pereira, con tecnolog\xEDa Soprano: act\xFAa de forma progresiva, con baja temperatura y menos molestia. Precio por sesi\xF3n.",
      "incluye": "L\xE1ser diodo: abdomen, con atenci\xF3n del equipo de Valencia Stetic en cabina privada.",
      "duracion_min": 30,
      "precio": 80000,
      "recurso": "laser",
      "requiere_valoracion": false,
      "procedimiento": "Crioterapia, l\xE1ser diodo y protector solar.",
      "indicado_para": "Reducir el vello de forma progresiva; ayuda a aclarar pigmentaciones y mejora la foliculitis.",
      "sesiones": "Aproximadamente 10 a 12 sesiones, una cada 20 a 30 d\xEDas (var\xEDa seg\xFAn edad, sistema hormonal, tipo de piel, color del vello y respuesta individual). Hay modalidad de pago por sesiones.",
      "cuidados": "Rasurar con cuchilla el mismo d\xEDa. Asistir con la piel libre de productos (cremas, desodorante). Sin exposici\xF3n solar (natural o artificial) y sin despigmentantes durante el tratamiento.",
      "contraindicaciones": "Lupus, psoriasis, embarazo, lactancia, acn\xE9 en tratamiento con isotretino\xEDna (Roaccutan), fotosensibilidad, vit\xEDligo, marcapasos, vello rubio, pelirrojo o canoso, tatuaje en la zona, queloides, quemaduras, descamaci\xF3n, bronceado intenso, hipotiroidismo, s\xEDndrome metab\xF3lico e hiperandrogenismo.",
      "dolor": "La tecnolog\xEDa Soprano act\xFAa de forma progresiva y a temperaturas m\xE1s bajas y estables, protegiendo la piel de quemaduras y reduciendo notablemente el dolor; adem\xE1s se usa crioterapia.",
      "revisar_condiciones": true
    },
    {
      "id": "laser_pecho",
      "nombre": "L\xE1ser diodo: pecho",
      "nombre_corto": "L\xE1ser: pecho",
      "categoria": "Depilaci\xF3n l\xE1ser diodo",
      "activo": true,
      "codigos_anuncio": [],
      "claves": [
        "l\xE1ser diodo: pecho",
        "pecho",
        "laser pecho"
      ],
      "descripcion": "Depilaci\xF3n l\xE1ser diodo Ice de pecho en Pereira, con tecnolog\xEDa Soprano: act\xFAa de forma progresiva, con baja temperatura y menos molestia. Precio por sesi\xF3n.",
      "incluye": "L\xE1ser diodo: pecho, con atenci\xF3n del equipo de Valencia Stetic en cabina privada.",
      "duracion_min": 30,
      "precio": 80000,
      "recurso": "laser",
      "requiere_valoracion": false,
      "procedimiento": "Crioterapia, l\xE1ser diodo y protector solar.",
      "indicado_para": "Reducir el vello de forma progresiva; ayuda a aclarar pigmentaciones y mejora la foliculitis.",
      "sesiones": "Aproximadamente 10 a 12 sesiones, una cada 20 a 30 d\xEDas (var\xEDa seg\xFAn edad, sistema hormonal, tipo de piel, color del vello y respuesta individual). Hay modalidad de pago por sesiones.",
      "cuidados": "Rasurar con cuchilla el mismo d\xEDa. Asistir con la piel libre de productos (cremas, desodorante). Sin exposici\xF3n solar (natural o artificial) y sin despigmentantes durante el tratamiento.",
      "contraindicaciones": "Lupus, psoriasis, embarazo, lactancia, acn\xE9 en tratamiento con isotretino\xEDna (Roaccutan), fotosensibilidad, vit\xEDligo, marcapasos, vello rubio, pelirrojo o canoso, tatuaje en la zona, queloides, quemaduras, descamaci\xF3n, bronceado intenso, hipotiroidismo, s\xEDndrome metab\xF3lico e hiperandrogenismo.",
      "dolor": "La tecnolog\xEDa Soprano act\xFAa de forma progresiva y a temperaturas m\xE1s bajas y estables, protegiendo la piel de quemaduras y reduciendo notablemente el dolor; adem\xE1s se usa crioterapia.",
      "revisar_condiciones": true
    },
    {
      "id": "laser_facial",
      "nombre": "L\xE1ser diodo: facial",
      "nombre_corto": "L\xE1ser: facial",
      "categoria": "Depilaci\xF3n l\xE1ser diodo",
      "activo": true,
      "codigos_anuncio": [],
      "claves": [
        "l\xE1ser diodo: facial",
        "laser facial",
        "l\xE1ser facial",
        "depilacion facial",
        "depilaci\xF3n facial",
        "rostro completo"
      ],
      "descripcion": "Depilaci\xF3n l\xE1ser diodo Ice de rostro completo en Pereira, con tecnolog\xEDa Soprano: act\xFAa de forma progresiva, con baja temperatura y menos molestia. Precio por sesi\xF3n.",
      "incluye": "L\xE1ser diodo: facial, con atenci\xF3n del equipo de Valencia Stetic en cabina privada.",
      "duracion_min": 30,
      "precio": 90000,
      "recurso": "laser",
      "requiere_valoracion": false,
      "procedimiento": "Crioterapia, l\xE1ser diodo y protector solar.",
      "indicado_para": "Reducir el vello de forma progresiva; ayuda a aclarar pigmentaciones y mejora la foliculitis.",
      "sesiones": "Aproximadamente 10 a 12 sesiones, una cada 20 a 30 d\xEDas (var\xEDa seg\xFAn edad, sistema hormonal, tipo de piel, color del vello y respuesta individual). Hay modalidad de pago por sesiones.",
      "cuidados": "Rasurar con cuchilla el mismo d\xEDa. Asistir con la piel libre de productos (cremas, desodorante). Sin exposici\xF3n solar (natural o artificial) y sin despigmentantes durante el tratamiento.",
      "contraindicaciones": "Lupus, psoriasis, embarazo, lactancia, acn\xE9 en tratamiento con isotretino\xEDna (Roaccutan), fotosensibilidad, vit\xEDligo, marcapasos, vello rubio, pelirrojo o canoso, tatuaje en la zona, queloides, quemaduras, descamaci\xF3n, bronceado intenso, hipotiroidismo, s\xEDndrome metab\xF3lico e hiperandrogenismo.",
      "dolor": "La tecnolog\xEDa Soprano act\xFAa de forma progresiva y a temperaturas m\xE1s bajas y estables, protegiendo la piel de quemaduras y reduciendo notablemente el dolor; adem\xE1s se usa crioterapia.",
      "revisar_condiciones": true
    },
    {
      "id": "laser_brazo",
      "nombre": "L\xE1ser diodo: brazo completo",
      "nombre_corto": "L\xE1ser: brazo completo",
      "categoria": "Depilaci\xF3n l\xE1ser diodo",
      "activo": true,
      "codigos_anuncio": [],
      "claves": [
        "l\xE1ser diodo: brazo completo",
        "brazo",
        "brazos",
        "brazo completo"
      ],
      "descripcion": "Depilaci\xF3n l\xE1ser diodo Ice de brazo completo en Pereira, con tecnolog\xEDa Soprano: act\xFAa de forma progresiva, con baja temperatura y menos molestia. Precio por sesi\xF3n.",
      "incluye": "L\xE1ser diodo: brazo completo, con atenci\xF3n del equipo de Valencia Stetic en cabina privada.",
      "duracion_min": 30,
      "precio": 90000,
      "recurso": "laser",
      "requiere_valoracion": false,
      "procedimiento": "Crioterapia, l\xE1ser diodo y protector solar.",
      "indicado_para": "Reducir el vello de forma progresiva; ayuda a aclarar pigmentaciones y mejora la foliculitis.",
      "sesiones": "Aproximadamente 10 a 12 sesiones, una cada 20 a 30 d\xEDas (var\xEDa seg\xFAn edad, sistema hormonal, tipo de piel, color del vello y respuesta individual). Hay modalidad de pago por sesiones.",
      "cuidados": "Rasurar con cuchilla el mismo d\xEDa. Asistir con la piel libre de productos (cremas, desodorante). Sin exposici\xF3n solar (natural o artificial) y sin despigmentantes durante el tratamiento.",
      "contraindicaciones": "Lupus, psoriasis, embarazo, lactancia, acn\xE9 en tratamiento con isotretino\xEDna (Roaccutan), fotosensibilidad, vit\xEDligo, marcapasos, vello rubio, pelirrojo o canoso, tatuaje en la zona, queloides, quemaduras, descamaci\xF3n, bronceado intenso, hipotiroidismo, s\xEDndrome metab\xF3lico e hiperandrogenismo.",
      "dolor": "La tecnolog\xEDa Soprano act\xFAa de forma progresiva y a temperaturas m\xE1s bajas y estables, protegiendo la piel de quemaduras y reduciendo notablemente el dolor; adem\xE1s se usa crioterapia.",
      "revisar_condiciones": true
    },
    {
      "id": "laser_bikini",
      "nombre": "L\xE1ser diodo: bikini",
      "nombre_corto": "L\xE1ser: bikini",
      "categoria": "Depilaci\xF3n l\xE1ser diodo",
      "activo": true,
      "codigos_anuncio": [],
      "claves": [
        "l\xE1ser diodo: bikini",
        "bikini",
        "laser bikini",
        "zona intima",
        "zona \xEDntima"
      ],
      "descripcion": "Depilaci\xF3n l\xE1ser diodo Ice de bikini en Pereira, con tecnolog\xEDa Soprano: act\xFAa de forma progresiva, con baja temperatura y menos molestia. Precio por sesi\xF3n.",
      "incluye": "L\xE1ser diodo: bikini, con atenci\xF3n del equipo de Valencia Stetic en cabina privada.",
      "duracion_min": 30,
      "precio": 90000,
      "recurso": "laser",
      "requiere_valoracion": false,
      "procedimiento": "Crioterapia, l\xE1ser diodo y protector solar.",
      "indicado_para": "Reducir el vello de forma progresiva; ayuda a aclarar pigmentaciones y mejora la foliculitis.",
      "sesiones": "Aproximadamente 10 a 12 sesiones, una cada 20 a 30 d\xEDas (var\xEDa seg\xFAn edad, sistema hormonal, tipo de piel, color del vello y respuesta individual). Hay modalidad de pago por sesiones.",
      "cuidados": "Rasurar con cuchilla el mismo d\xEDa. Asistir con la piel libre de productos (cremas, desodorante). Sin exposici\xF3n solar (natural o artificial) y sin despigmentantes durante el tratamiento.",
      "contraindicaciones": "Lupus, psoriasis, embarazo, lactancia, acn\xE9 en tratamiento con isotretino\xEDna (Roaccutan), fotosensibilidad, vit\xEDligo, marcapasos, vello rubio, pelirrojo o canoso, tatuaje en la zona, queloides, quemaduras, descamaci\xF3n, bronceado intenso, hipotiroidismo, s\xEDndrome metab\xF3lico e hiperandrogenismo.",
      "dolor": "La tecnolog\xEDa Soprano act\xFAa de forma progresiva y a temperaturas m\xE1s bajas y estables, protegiendo la piel de quemaduras y reduciendo notablemente el dolor; adem\xE1s se usa crioterapia.",
      "revisar_condiciones": true
    },
    {
      "id": "laser_gluteos",
      "nombre": "L\xE1ser diodo: gl\xFAteos",
      "nombre_corto": "L\xE1ser: gl\xFAteos",
      "categoria": "Depilaci\xF3n l\xE1ser diodo",
      "activo": true,
      "codigos_anuncio": [],
      "claves": [
        "l\xE1ser diodo: gl\xFAteos",
        "gluteos laser",
        "gl\xFAteos l\xE1ser",
        "laser gluteos"
      ],
      "descripcion": "Depilaci\xF3n l\xE1ser diodo Ice de gl\xFAteos en Pereira, con tecnolog\xEDa Soprano: act\xFAa de forma progresiva, con baja temperatura y menos molestia. Precio por sesi\xF3n.",
      "incluye": "L\xE1ser diodo: gl\xFAteos, con atenci\xF3n del equipo de Valencia Stetic en cabina privada.",
      "duracion_min": 30,
      "precio": 90000,
      "recurso": "laser",
      "requiere_valoracion": false,
      "procedimiento": "Crioterapia, l\xE1ser diodo y protector solar.",
      "indicado_para": "Reducir el vello de forma progresiva; ayuda a aclarar pigmentaciones y mejora la foliculitis.",
      "sesiones": "Aproximadamente 10 a 12 sesiones, una cada 20 a 30 d\xEDas (var\xEDa seg\xFAn edad, sistema hormonal, tipo de piel, color del vello y respuesta individual). Hay modalidad de pago por sesiones.",
      "cuidados": "Rasurar con cuchilla el mismo d\xEDa. Asistir con la piel libre de productos (cremas, desodorante). Sin exposici\xF3n solar (natural o artificial) y sin despigmentantes durante el tratamiento.",
      "contraindicaciones": "Lupus, psoriasis, embarazo, lactancia, acn\xE9 en tratamiento con isotretino\xEDna (Roaccutan), fotosensibilidad, vit\xEDligo, marcapasos, vello rubio, pelirrojo o canoso, tatuaje en la zona, queloides, quemaduras, descamaci\xF3n, bronceado intenso, hipotiroidismo, s\xEDndrome metab\xF3lico e hiperandrogenismo.",
      "dolor": "La tecnolog\xEDa Soprano act\xFAa de forma progresiva y a temperaturas m\xE1s bajas y estables, protegiendo la piel de quemaduras y reduciendo notablemente el dolor; adem\xE1s se usa crioterapia.",
      "revisar_condiciones": true
    },
    {
      "id": "laser_bikini_completo",
      "nombre": "L\xE1ser diodo: bikini completo",
      "nombre_corto": "L\xE1ser: bikini completo",
      "categoria": "Depilaci\xF3n l\xE1ser diodo",
      "activo": true,
      "codigos_anuncio": [],
      "claves": [
        "l\xE1ser diodo: bikini completo",
        "bikini completo",
        "brasile\xF1o",
        "brasileno"
      ],
      "descripcion": "Depilaci\xF3n l\xE1ser diodo Ice de bikini completo en Pereira, con tecnolog\xEDa Soprano: act\xFAa de forma progresiva, con baja temperatura y menos molestia. Precio por sesi\xF3n.",
      "incluye": "L\xE1ser diodo: bikini completo, con atenci\xF3n del equipo de Valencia Stetic en cabina privada.",
      "duracion_min": 30,
      "precio": 100000,
      "recurso": "laser",
      "requiere_valoracion": false,
      "procedimiento": "Crioterapia, l\xE1ser diodo y protector solar.",
      "indicado_para": "Reducir el vello de forma progresiva; ayuda a aclarar pigmentaciones y mejora la foliculitis.",
      "sesiones": "Aproximadamente 10 a 12 sesiones, una cada 20 a 30 d\xEDas (var\xEDa seg\xFAn edad, sistema hormonal, tipo de piel, color del vello y respuesta individual). Hay modalidad de pago por sesiones.",
      "cuidados": "Rasurar con cuchilla el mismo d\xEDa. Asistir con la piel libre de productos (cremas, desodorante). Sin exposici\xF3n solar (natural o artificial) y sin despigmentantes durante el tratamiento.",
      "contraindicaciones": "Lupus, psoriasis, embarazo, lactancia, acn\xE9 en tratamiento con isotretino\xEDna (Roaccutan), fotosensibilidad, vit\xEDligo, marcapasos, vello rubio, pelirrojo o canoso, tatuaje en la zona, queloides, quemaduras, descamaci\xF3n, bronceado intenso, hipotiroidismo, s\xEDndrome metab\xF3lico e hiperandrogenismo.",
      "dolor": "La tecnolog\xEDa Soprano act\xFAa de forma progresiva y a temperaturas m\xE1s bajas y estables, protegiendo la piel de quemaduras y reduciendo notablemente el dolor; adem\xE1s se usa crioterapia.",
      "revisar_condiciones": true
    },
    {
      "id": "laser_espalda",
      "nombre": "L\xE1ser diodo: espalda",
      "nombre_corto": "L\xE1ser: espalda",
      "categoria": "Depilaci\xF3n l\xE1ser diodo",
      "activo": true,
      "codigos_anuncio": [],
      "claves": [
        "l\xE1ser diodo: espalda",
        "laser espalda",
        "l\xE1ser espalda",
        "espalda completa"
      ],
      "descripcion": "Depilaci\xF3n l\xE1ser diodo Ice de espalda en Pereira, con tecnolog\xEDa Soprano: act\xFAa de forma progresiva, con baja temperatura y menos molestia. Precio por sesi\xF3n.",
      "incluye": "L\xE1ser diodo: espalda, con atenci\xF3n del equipo de Valencia Stetic en cabina privada.",
      "duracion_min": 30,
      "precio": 100000,
      "recurso": "laser",
      "requiere_valoracion": false,
      "procedimiento": "Crioterapia, l\xE1ser diodo y protector solar.",
      "indicado_para": "Reducir el vello de forma progresiva; ayuda a aclarar pigmentaciones y mejora la foliculitis.",
      "sesiones": "Aproximadamente 10 a 12 sesiones, una cada 20 a 30 d\xEDas (var\xEDa seg\xFAn edad, sistema hormonal, tipo de piel, color del vello y respuesta individual). Hay modalidad de pago por sesiones.",
      "cuidados": "Rasurar con cuchilla el mismo d\xEDa. Asistir con la piel libre de productos (cremas, desodorante). Sin exposici\xF3n solar (natural o artificial) y sin despigmentantes durante el tratamiento.",
      "contraindicaciones": "Lupus, psoriasis, embarazo, lactancia, acn\xE9 en tratamiento con isotretino\xEDna (Roaccutan), fotosensibilidad, vit\xEDligo, marcapasos, vello rubio, pelirrojo o canoso, tatuaje en la zona, queloides, quemaduras, descamaci\xF3n, bronceado intenso, hipotiroidismo, s\xEDndrome metab\xF3lico e hiperandrogenismo.",
      "dolor": "La tecnolog\xEDa Soprano act\xFAa de forma progresiva y a temperaturas m\xE1s bajas y estables, protegiendo la piel de quemaduras y reduciendo notablemente el dolor; adem\xE1s se usa crioterapia.",
      "revisar_condiciones": true
    },
    {
      "id": "laser_media_inferior",
      "nombre": "L\xE1ser diodo: media pierna inferior",
      "nombre_corto": "L\xE1ser: media pierna inf.",
      "categoria": "Depilaci\xF3n l\xE1ser diodo",
      "activo": true,
      "codigos_anuncio": [],
      "claves": [
        "l\xE1ser diodo: media pierna inferior",
        "media pierna inferior",
        "pantorrilla",
        "pantorrillas",
        "laser media pierna inferior"
      ],
      "descripcion": "Depilaci\xF3n l\xE1ser diodo Ice de media pierna inferior en Pereira, con tecnolog\xEDa Soprano: act\xFAa de forma progresiva, con baja temperatura y menos molestia. Precio por sesi\xF3n.",
      "incluye": "L\xE1ser diodo: media pierna inferior, con atenci\xF3n del equipo de Valencia Stetic en cabina privada.",
      "duracion_min": 30,
      "precio": 120000,
      "recurso": "laser",
      "requiere_valoracion": false,
      "procedimiento": "Crioterapia, l\xE1ser diodo y protector solar.",
      "indicado_para": "Reducir el vello de forma progresiva; ayuda a aclarar pigmentaciones y mejora la foliculitis.",
      "sesiones": "Aproximadamente 10 a 12 sesiones, una cada 20 a 30 d\xEDas (var\xEDa seg\xFAn edad, sistema hormonal, tipo de piel, color del vello y respuesta individual). Hay modalidad de pago por sesiones.",
      "cuidados": "Rasurar con cuchilla el mismo d\xEDa. Asistir con la piel libre de productos (cremas, desodorante). Sin exposici\xF3n solar (natural o artificial) y sin despigmentantes durante el tratamiento.",
      "contraindicaciones": "Lupus, psoriasis, embarazo, lactancia, acn\xE9 en tratamiento con isotretino\xEDna (Roaccutan), fotosensibilidad, vit\xEDligo, marcapasos, vello rubio, pelirrojo o canoso, tatuaje en la zona, queloides, quemaduras, descamaci\xF3n, bronceado intenso, hipotiroidismo, s\xEDndrome metab\xF3lico e hiperandrogenismo.",
      "dolor": "La tecnolog\xEDa Soprano act\xFAa de forma progresiva y a temperaturas m\xE1s bajas y estables, protegiendo la piel de quemaduras y reduciendo notablemente el dolor; adem\xE1s se usa crioterapia.",
      "revisar_condiciones": true
    },
    {
      "id": "laser_media_superior",
      "nombre": "L\xE1ser diodo: media pierna superior",
      "nombre_corto": "L\xE1ser: media pierna sup.",
      "categoria": "Depilaci\xF3n l\xE1ser diodo",
      "activo": true,
      "codigos_anuncio": [],
      "claves": [
        "l\xE1ser diodo: media pierna superior",
        "media pierna superior",
        "muslo",
        "muslos",
        "laser media pierna superior"
      ],
      "descripcion": "Depilaci\xF3n l\xE1ser diodo Ice de media pierna superior en Pereira, con tecnolog\xEDa Soprano: act\xFAa de forma progresiva, con baja temperatura y menos molestia. Precio por sesi\xF3n.",
      "incluye": "L\xE1ser diodo: media pierna superior, con atenci\xF3n del equipo de Valencia Stetic en cabina privada.",
      "duracion_min": 30,
      "precio": 140000,
      "recurso": "laser",
      "requiere_valoracion": false,
      "procedimiento": "Crioterapia, l\xE1ser diodo y protector solar.",
      "indicado_para": "Reducir el vello de forma progresiva; ayuda a aclarar pigmentaciones y mejora la foliculitis.",
      "sesiones": "Aproximadamente 10 a 12 sesiones, una cada 20 a 30 d\xEDas (var\xEDa seg\xFAn edad, sistema hormonal, tipo de piel, color del vello y respuesta individual). Hay modalidad de pago por sesiones.",
      "cuidados": "Rasurar con cuchilla el mismo d\xEDa. Asistir con la piel libre de productos (cremas, desodorante). Sin exposici\xF3n solar (natural o artificial) y sin despigmentantes durante el tratamiento.",
      "contraindicaciones": "Lupus, psoriasis, embarazo, lactancia, acn\xE9 en tratamiento con isotretino\xEDna (Roaccutan), fotosensibilidad, vit\xEDligo, marcapasos, vello rubio, pelirrojo o canoso, tatuaje en la zona, queloides, quemaduras, descamaci\xF3n, bronceado intenso, hipotiroidismo, s\xEDndrome metab\xF3lico e hiperandrogenismo.",
      "dolor": "La tecnolog\xEDa Soprano act\xFAa de forma progresiva y a temperaturas m\xE1s bajas y estables, protegiendo la piel de quemaduras y reduciendo notablemente el dolor; adem\xE1s se usa crioterapia.",
      "revisar_condiciones": true
    },
    {
      "id": "laser_pierna",
      "nombre": "L\xE1ser diodo: pierna completa",
      "nombre_corto": "L\xE1ser: pierna completa",
      "categoria": "Depilaci\xF3n l\xE1ser diodo",
      "activo": true,
      "codigos_anuncio": [],
      "claves": [
        "l\xE1ser diodo: pierna completa",
        "pierna completa",
        "piernas completas",
        "laser pierna"
      ],
      "descripcion": "Depilaci\xF3n l\xE1ser diodo Ice de pierna completa en Pereira, con tecnolog\xEDa Soprano: act\xFAa de forma progresiva, con baja temperatura y menos molestia. Precio por sesi\xF3n.",
      "incluye": "L\xE1ser diodo: pierna completa, con atenci\xF3n del equipo de Valencia Stetic en cabina privada.",
      "duracion_min": 30,
      "precio": 200000,
      "recurso": "laser",
      "requiere_valoracion": false,
      "procedimiento": "Crioterapia, l\xE1ser diodo y protector solar.",
      "indicado_para": "Reducir el vello de forma progresiva; ayuda a aclarar pigmentaciones y mejora la foliculitis.",
      "sesiones": "Aproximadamente 10 a 12 sesiones, una cada 20 a 30 d\xEDas (var\xEDa seg\xFAn edad, sistema hormonal, tipo de piel, color del vello y respuesta individual). Hay modalidad de pago por sesiones.",
      "cuidados": "Rasurar con cuchilla el mismo d\xEDa. Asistir con la piel libre de productos (cremas, desodorante). Sin exposici\xF3n solar (natural o artificial) y sin despigmentantes durante el tratamiento.",
      "contraindicaciones": "Lupus, psoriasis, embarazo, lactancia, acn\xE9 en tratamiento con isotretino\xEDna (Roaccutan), fotosensibilidad, vit\xEDligo, marcapasos, vello rubio, pelirrojo o canoso, tatuaje en la zona, queloides, quemaduras, descamaci\xF3n, bronceado intenso, hipotiroidismo, s\xEDndrome metab\xF3lico e hiperandrogenismo.",
      "dolor": "La tecnolog\xEDa Soprano act\xFAa de forma progresiva y a temperaturas m\xE1s bajas y estables, protegiendo la piel de quemaduras y reduciendo notablemente el dolor; adem\xE1s se usa crioterapia.",
      "revisar_condiciones": true
    },
    {
      "id": "cera_bigote",
      "nombre": "Cera de chocolate: bigote",
      "nombre_corto": "Cera: bigote",
      "categoria": "Depilaci\xF3n con cera",
      "activo": true,
      "codigos_anuncio": [],
      "claves": [
        "cera de chocolate: bigote",
        "cera bigote"
      ],
      "descripcion": "Depilaci\xF3n con cera de chocolate de bigote en Pereira: elimina el vello desde la ra\xEDz y deja la piel suave por m\xE1s tiempo.",
      "incluye": "Cera de chocolate: bigote, con atenci\xF3n del equipo de Valencia Stetic en cabina privada.",
      "duracion_min": 30,
      "precio": 7000,
      "recurso": "cabina",
      "requiere_valoracion": false,
      "procedimiento": "Aplicaci\xF3n de cera de chocolate desde la ra\xEDz del vello.",
      "indicado_para": "Piel suave por m\xE1s tiempo y crecimiento del vello m\xE1s lento, en zonas faciales y corporales.",
      "cuidados": "No aplicar crema ni desodorante antes de la cita. Exfoliar la zona 1 d\xEDa antes. El vello debe tener un crecimiento m\xEDnimo de 5 mm. No exponer la zona directamente al sol durante las 24 horas posteriores."
    },
    {
      "id": "cera_axila",
      "nombre": "Cera de chocolate: axila",
      "nombre_corto": "Cera: axila",
      "categoria": "Depilaci\xF3n con cera",
      "activo": true,
      "codigos_anuncio": [],
      "claves": [
        "cera de chocolate: axila",
        "cera axila",
        "cera axilas"
      ],
      "descripcion": "Depilaci\xF3n con cera de chocolate de axila en Pereira: elimina el vello desde la ra\xEDz y deja la piel suave por m\xE1s tiempo.",
      "incluye": "Cera de chocolate: axila, con atenci\xF3n del equipo de Valencia Stetic en cabina privada.",
      "duracion_min": 30,
      "precio": 18000,
      "recurso": "cabina",
      "requiere_valoracion": false,
      "procedimiento": "Aplicaci\xF3n de cera de chocolate desde la ra\xEDz del vello.",
      "indicado_para": "Piel suave por m\xE1s tiempo y crecimiento del vello m\xE1s lento, en zonas faciales y corporales.",
      "cuidados": "No aplicar crema ni desodorante antes de la cita. Exfoliar la zona 1 d\xEDa antes. El vello debe tener un crecimiento m\xEDnimo de 5 mm. No exponer la zona directamente al sol durante las 24 horas posteriores."
    },
    {
      "id": "cera_bikini_lateral",
      "nombre": "Cera de chocolate: bikini lateral",
      "nombre_corto": "Cera: bikini lateral",
      "categoria": "Depilaci\xF3n con cera",
      "activo": true,
      "codigos_anuncio": [],
      "claves": [
        "cera de chocolate: bikini lateral",
        "cera bikini lateral",
        "bikini lateral"
      ],
      "descripcion": "Depilaci\xF3n con cera de chocolate de bikini lateral en Pereira: elimina el vello desde la ra\xEDz y deja la piel suave por m\xE1s tiempo.",
      "incluye": "Cera de chocolate: bikini lateral, con atenci\xF3n del equipo de Valencia Stetic en cabina privada.",
      "duracion_min": 30,
      "precio": 18000,
      "recurso": "cabina",
      "requiere_valoracion": false,
      "procedimiento": "Aplicaci\xF3n de cera de chocolate desde la ra\xEDz del vello.",
      "indicado_para": "Piel suave por m\xE1s tiempo y crecimiento del vello m\xE1s lento, en zonas faciales y corporales.",
      "cuidados": "No aplicar crema ni desodorante antes de la cita. Exfoliar la zona 1 d\xEDa antes. El vello debe tener un crecimiento m\xEDnimo de 5 mm. No exponer la zona directamente al sol durante las 24 horas posteriores."
    },
    {
      "id": "cera_bikini",
      "nombre": "Cera de chocolate: bikini (p\xE9lvica y laterales)",
      "nombre_corto": "Cera: bikini",
      "categoria": "Depilaci\xF3n con cera",
      "activo": true,
      "codigos_anuncio": [],
      "claves": [
        "cera de chocolate: bikini (p\xE9lvica y laterales)",
        "cera bikini",
        "cera pelvica",
        "cera p\xE9lvica"
      ],
      "descripcion": "Depilaci\xF3n con cera de chocolate de bikini (zona p\xE9lvica y laterales) en Pereira: elimina el vello desde la ra\xEDz y deja la piel suave por m\xE1s tiempo.",
      "incluye": "Cera de chocolate: bikini (p\xE9lvica y laterales), con atenci\xF3n del equipo de Valencia Stetic en cabina privada.",
      "duracion_min": 30,
      "precio": 30000,
      "recurso": "cabina",
      "requiere_valoracion": false,
      "procedimiento": "Aplicaci\xF3n de cera de chocolate desde la ra\xEDz del vello.",
      "indicado_para": "Piel suave por m\xE1s tiempo y crecimiento del vello m\xE1s lento, en zonas faciales y corporales.",
      "cuidados": "No aplicar crema ni desodorante antes de la cita. Exfoliar la zona 1 d\xEDa antes. El vello debe tener un crecimiento m\xEDnimo de 5 mm. No exponer la zona directamente al sol durante las 24 horas posteriores."
    },
    {
      "id": "cera_media_inferior",
      "nombre": "Cera de chocolate: media pierna inferior",
      "nombre_corto": "Cera: media pierna inf.",
      "categoria": "Depilaci\xF3n con cera",
      "activo": true,
      "codigos_anuncio": [],
      "claves": [
        "cera de chocolate: media pierna inferior",
        "cera media pierna inferior"
      ],
      "descripcion": "Depilaci\xF3n con cera de chocolate de media pierna inferior en Pereira: elimina el vello desde la ra\xEDz y deja la piel suave por m\xE1s tiempo.",
      "incluye": "Cera de chocolate: media pierna inferior, con atenci\xF3n del equipo de Valencia Stetic en cabina privada.",
      "duracion_min": 30,
      "precio": 30000,
      "recurso": "cabina",
      "requiere_valoracion": false,
      "procedimiento": "Aplicaci\xF3n de cera de chocolate desde la ra\xEDz del vello.",
      "indicado_para": "Piel suave por m\xE1s tiempo y crecimiento del vello m\xE1s lento, en zonas faciales y corporales.",
      "cuidados": "No aplicar crema ni desodorante antes de la cita. Exfoliar la zona 1 d\xEDa antes. El vello debe tener un crecimiento m\xEDnimo de 5 mm. No exponer la zona directamente al sol durante las 24 horas posteriores."
    },
    {
      "id": "cera_media_superior",
      "nombre": "Cera de chocolate: media pierna superior",
      "nombre_corto": "Cera: media pierna sup.",
      "categoria": "Depilaci\xF3n con cera",
      "activo": true,
      "codigos_anuncio": [],
      "claves": [
        "cera de chocolate: media pierna superior",
        "cera media pierna superior"
      ],
      "descripcion": "Depilaci\xF3n con cera de chocolate de media pierna superior en Pereira: elimina el vello desde la ra\xEDz y deja la piel suave por m\xE1s tiempo.",
      "incluye": "Cera de chocolate: media pierna superior, con atenci\xF3n del equipo de Valencia Stetic en cabina privada.",
      "duracion_min": 30,
      "precio": 40000,
      "recurso": "cabina",
      "requiere_valoracion": false,
      "procedimiento": "Aplicaci\xF3n de cera de chocolate desde la ra\xEDz del vello.",
      "indicado_para": "Piel suave por m\xE1s tiempo y crecimiento del vello m\xE1s lento, en zonas faciales y corporales.",
      "cuidados": "No aplicar crema ni desodorante antes de la cita. Exfoliar la zona 1 d\xEDa antes. El vello debe tener un crecimiento m\xEDnimo de 5 mm. No exponer la zona directamente al sol durante las 24 horas posteriores."
    },
    {
      "id": "cera_brazos",
      "nombre": "Cera de chocolate: brazos",
      "nombre_corto": "Cera: brazos",
      "categoria": "Depilaci\xF3n con cera",
      "activo": true,
      "codigos_anuncio": [],
      "claves": [
        "cera de chocolate: brazos",
        "cera brazos"
      ],
      "descripcion": "Depilaci\xF3n con cera de chocolate de brazos en Pereira: elimina el vello desde la ra\xEDz y deja la piel suave por m\xE1s tiempo.",
      "incluye": "Cera de chocolate: brazos, con atenci\xF3n del equipo de Valencia Stetic en cabina privada.",
      "duracion_min": 30,
      "precio": 40000,
      "recurso": "cabina",
      "requiere_valoracion": false,
      "procedimiento": "Aplicaci\xF3n de cera de chocolate desde la ra\xEDz del vello.",
      "indicado_para": "Piel suave por m\xE1s tiempo y crecimiento del vello m\xE1s lento, en zonas faciales y corporales.",
      "cuidados": "No aplicar crema ni desodorante antes de la cita. Exfoliar la zona 1 d\xEDa antes. El vello debe tener un crecimiento m\xEDnimo de 5 mm. No exponer la zona directamente al sol durante las 24 horas posteriores."
    },
    {
      "id": "cera_pierna",
      "nombre": "Cera de chocolate: pierna completa",
      "nombre_corto": "Cera: pierna completa",
      "categoria": "Depilaci\xF3n con cera",
      "activo": true,
      "codigos_anuncio": [],
      "claves": [
        "cera de chocolate: pierna completa",
        "cera pierna completa",
        "cera piernas"
      ],
      "descripcion": "Depilaci\xF3n con cera de chocolate de pierna completa en Pereira: elimina el vello desde la ra\xEDz y deja la piel suave por m\xE1s tiempo.",
      "incluye": "Cera de chocolate: pierna completa, con atenci\xF3n del equipo de Valencia Stetic en cabina privada.",
      "duracion_min": 30,
      "precio": 70000,
      "recurso": "cabina",
      "requiere_valoracion": false,
      "procedimiento": "Aplicaci\xF3n de cera de chocolate desde la ra\xEDz del vello.",
      "indicado_para": "Piel suave por m\xE1s tiempo y crecimiento del vello m\xE1s lento, en zonas faciales y corporales.",
      "cuidados": "No aplicar crema ni desodorante antes de la cita. Exfoliar la zona 1 d\xEDa antes. El vello debe tener un crecimiento m\xEDnimo de 5 mm. No exponer la zona directamente al sol durante las 24 horas posteriores."
    },
    {
      "id": "cera_pecho",
      "nombre": "Cera de chocolate: pecho",
      "nombre_corto": "Cera: pecho",
      "categoria": "Depilaci\xF3n con cera",
      "activo": true,
      "codigos_anuncio": [],
      "claves": [
        "cera de chocolate: pecho",
        "cera pecho"
      ],
      "descripcion": "Depilaci\xF3n con cera de chocolate de pecho en Pereira: elimina el vello desde la ra\xEDz y deja la piel suave por m\xE1s tiempo.",
      "incluye": "Cera de chocolate: pecho, con atenci\xF3n del equipo de Valencia Stetic en cabina privada.",
      "duracion_min": 30,
      "precio": null,
      "precio_nota": "Entre $25.000 y $40.000",
      "recurso": "cabina",
      "requiere_valoracion": false,
      "procedimiento": "Aplicaci\xF3n de cera de chocolate desde la ra\xEDz del vello.",
      "indicado_para": "Piel suave por m\xE1s tiempo y crecimiento del vello m\xE1s lento, en zonas faciales y corporales.",
      "cuidados": "No aplicar crema ni desodorante antes de la cita. Exfoliar la zona 1 d\xEDa antes. El vello debe tener un crecimiento m\xEDnimo de 5 mm. No exponer la zona directamente al sol durante las 24 horas posteriores."
    },
    {
      "id": "cera_abdomen",
      "nombre": "Cera de chocolate: abdomen",
      "nombre_corto": "Cera: abdomen",
      "categoria": "Depilaci\xF3n con cera",
      "activo": true,
      "codigos_anuncio": [],
      "claves": [
        "cera de chocolate: abdomen",
        "cera abdomen"
      ],
      "descripcion": "Depilaci\xF3n con cera de chocolate de abdomen en Pereira: elimina el vello desde la ra\xEDz y deja la piel suave por m\xE1s tiempo.",
      "incluye": "Cera de chocolate: abdomen, con atenci\xF3n del equipo de Valencia Stetic en cabina privada.",
      "duracion_min": 30,
      "precio": null,
      "precio_nota": "Entre $25.000 y $50.000",
      "recurso": "cabina",
      "requiere_valoracion": false,
      "procedimiento": "Aplicaci\xF3n de cera de chocolate desde la ra\xEDz del vello.",
      "indicado_para": "Piel suave por m\xE1s tiempo y crecimiento del vello m\xE1s lento, en zonas faciales y corporales.",
      "cuidados": "No aplicar crema ni desodorante antes de la cita. Exfoliar la zona 1 d\xEDa antes. El vello debe tener un crecimiento m\xEDnimo de 5 mm. No exponer la zona directamente al sol durante las 24 horas posteriores."
    },
    {
      "id": "cera_espalda",
      "nombre": "Cera de chocolate: espalda",
      "nombre_corto": "Cera: espalda",
      "categoria": "Depilaci\xF3n con cera",
      "activo": true,
      "codigos_anuncio": [],
      "claves": [
        "cera de chocolate: espalda",
        "cera espalda"
      ],
      "descripcion": "Depilaci\xF3n con cera de chocolate de espalda en Pereira: elimina el vello desde la ra\xEDz y deja la piel suave por m\xE1s tiempo.",
      "incluye": "Cera de chocolate: espalda, con atenci\xF3n del equipo de Valencia Stetic en cabina privada.",
      "duracion_min": 30,
      "precio": null,
      "precio_nota": "Entre $15.000 y $70.000",
      "recurso": "cabina",
      "requiere_valoracion": false,
      "procedimiento": "Aplicaci\xF3n de cera de chocolate desde la ra\xEDz del vello.",
      "indicado_para": "Piel suave por m\xE1s tiempo y crecimiento del vello m\xE1s lento, en zonas faciales y corporales.",
      "cuidados": "No aplicar crema ni desodorante antes de la cita. Exfoliar la zona 1 d\xEDa antes. El vello debe tener un crecimiento m\xEDnimo de 5 mm. No exponer la zona directamente al sol durante las 24 horas posteriores."
    },
    {
      "id": "micropigmentacion",
      "nombre": "Micropigmentaci\xF3n de cejas",
      "nombre_corto": "Micropigmentaci\xF3n",
      "categoria": "Cejas y pesta\xF1as",
      "activo": true,
      "codigos_anuncio": [],
      "claves": [
        "micropigmentaci\xF3n de cejas",
        "micropigmentacion",
        "micropigmentaci\xF3n",
        "microblading",
        "cejas semipermanentes",
        "pelo a pelo cejas"
      ],
      "descripcion": "Micropigmentaci\xF3n de cejas en Pereira: pigmento subd\xE9rmico de aspecto natural, con t\xE9cnica pelo a pelo, sombreado o h\xEDbrida. Retoque a $150.000 dentro de 40 d\xEDas.",
      "incluye": "Micropigmentaci\xF3n de cejas, con atenci\xF3n del equipo de Valencia Stetic en cabina privada.",
      "duracion_min": 180,
      "duracion_texto": "3 horas aproximadamente",
      "precio": 350000,
      "recurso": "cabina",
      "requiere_valoracion": false,
      "procedimiento": "Anestesia, dise\xF1o de cejas y micropigmentaci\xF3n. T\xE9cnicas: pelo a pelo, sombreado e h\xEDbrida.",
      "resultados": "El efecto dura entre 10 meses y 1 a 3 a\xF1os (seg\xFAn piel, edad, h\xE1bitos y cuidados de los primeros 10 d\xEDas). Se recomienda retoque al mes y luego anual.",
      "retoque": "Retoque $150.000 solo dentro de los 40 d\xEDas posteriores; pasado ese tiempo aplica otra tarifa.",
      "revisar_condiciones": true
    },
    {
      "id": "laminado_cejas",
      "nombre": "Laminado de cejas",
      "nombre_corto": "Laminado de cejas",
      "categoria": "Cejas y pesta\xF1as",
      "activo": true,
      "codigos_anuncio": [],
      "claves": [
        "laminado de cejas",
        "laminado",
        "cejas laminadas"
      ],
      "descripcion": "Laminado de cejas en Pereira: alisa, moldea y fija el vello para lograr m\xE1s grosor, orden y definici\xF3n con acabado natural. Ideal para cejas onduladas o rebeldes.",
      "incluye": "Laminado de cejas, con atenci\xF3n del equipo de Valencia Stetic en cabina privada.",
      "duracion_min": 30,
      "duracion_texto": "30 minutos",
      "precio": 45000,
      "recurso": "cabina",
      "requiere_valoracion": false,
      "procedimiento": "Higienizaci\xF3n, depilaci\xF3n y laminado."
    },
    {
      "id": "depilacion_cejas",
      "nombre": "Depilaci\xF3n de cejas con hilo",
      "nombre_corto": "Depilaci\xF3n de cejas",
      "categoria": "Cejas y pesta\xF1as",
      "activo": true,
      "codigos_anuncio": [],
      "claves": [
        "depilaci\xF3n de cejas con hilo",
        "depilacion de cejas",
        "depilaci\xF3n de cejas",
        "depilar cejas",
        "hilo",
        "diseno de cejas",
        "dise\xF1o de cejas",
        "perfilado"
      ],
      "descripcion": "Depilaci\xF3n de cejas con hilo en Pereira: dise\xF1o personalizado que enmarca tu rostro seg\xFAn la forma natural de tu ceja.",
      "incluye": "Depilaci\xF3n de cejas con hilo, con atenci\xF3n del equipo de Valencia Stetic en cabina privada.",
      "duracion_min": 20,
      "duracion_texto": "20 minutos",
      "precio": 18000,
      "recurso": "cabina",
      "requiere_valoracion": false,
      "procedimiento": "Dise\xF1o personalizado y depilaci\xF3n con hilo."
    },
    {
      "id": "sombreado_cejas",
      "nombre": "Sombreado de cejas",
      "nombre_corto": "Sombreado de cejas",
      "categoria": "Cejas y pesta\xF1as",
      "activo": true,
      "codigos_anuncio": [],
      "claves": [
        "sombreado de cejas",
        "sombreado"
      ],
      "descripcion": "Sombreado de cejas en Pereira: relleno y definici\xF3n en tonos caf\xE9 claro, caf\xE9 medio o caf\xE9 oscuro.",
      "incluye": "Sombreado de cejas, con atenci\xF3n del equipo de Valencia Stetic en cabina privada.",
      "duracion_min": 30,
      "precio": 18000,
      "recurso": "cabina",
      "requiere_valoracion": false,
      "procedimiento": "Aplicaci\xF3n de sombreado en tono caf\xE9 claro, medio u oscuro."
    },
    {
      "id": "cejas",
      "nombre": "Combo depilaci\xF3n y sombreado de cejas",
      "nombre_corto": "Combo cejas",
      "categoria": "Cejas y pesta\xF1as",
      "activo": true,
      "codigos_anuncio": [],
      "claves": [
        "combo depilaci\xF3n y sombreado de cejas",
        "ceja",
        "cejas",
        "combo cejas",
        "depilacion y sombreado",
        "depilaci\xF3n y sombreado",
        "sombreado + depilacion"
      ],
      "descripcion": "Combo de depilaci\xF3n con hilo y sombreado de cejas en Pereira: dise\xF1o, relleno y definici\xF3n en una sola cita.",
      "incluye": "Combo depilaci\xF3n y sombreado de cejas, con atenci\xF3n del equipo de Valencia Stetic en cabina privada.",
      "duracion_min": 30,
      "precio": 30000,
      "recurso": "cabina",
      "requiere_valoracion": false,
      "procedimiento": "Depilaci\xF3n con hilo (dise\xF1o personalizado) y sombreado."
    },
    {
      "id": "extension_pestanas",
      "nombre": "Extensi\xF3n de pesta\xF1as (pelo a pelo)",
      "nombre_corto": "Extensi\xF3n de pesta\xF1as",
      "categoria": "Cejas y pesta\xF1as",
      "activo": true,
      "codigos_anuncio": [],
      "claves": [
        "extensi\xF3n de pesta\xF1as (pelo a pelo)",
        "extension de pesta\xF1as",
        "extensi\xF3n de pesta\xF1as",
        "extensiones",
        "pesta\xF1as pelo a pelo",
        "pestanas pelo a pelo"
      ],
      "descripcion": "Extensi\xF3n de pesta\xF1as pelo a pelo en Pereira: una extensi\xF3n sint\xE9tica sobre cada pesta\xF1a natural para un resultado sutil y definido. Dura hasta unos 20 d\xEDas.",
      "incluye": "Extensi\xF3n de pesta\xF1as (pelo a pelo), con atenci\xF3n del equipo de Valencia Stetic en cabina privada.",
      "duracion_min": 90,
      "duracion_texto": "1 hora y 30 minutos",
      "precio": 90000,
      "recurso": "cabina",
      "requiere_valoracion": false,
      "procedimiento": "Colocaci\xF3n individual de una extensi\xF3n sint\xE9tica sobre cada pesta\xF1a natural.",
      "cuidados": "No mojarlas, no frotar, no aplicar pesta\xF1ina y no aplicar productos aceitosos.",
      "retoque": "Retoque $60.000 solo si a\xFAn conserva extensiones; montura nueva $70.000."
    },
    {
      "id": "lifting",
      "nombre": "Lifting de pesta\xF1as",
      "nombre_corto": "Lifting de pesta\xF1as",
      "categoria": "Cejas y pesta\xF1as",
      "activo": true,
      "codigos_anuncio": [],
      "claves": [
        "lifting de pesta\xF1as",
        "lifting",
        "pestana",
        "pestanas",
        "pesta\xF1a",
        "pesta\xF1as",
        "curvar pesta\xF1as"
      ],
      "descripcion": "Lifting de pesta\xF1as en Pereira: eleva, alarga y curva tus pesta\xF1as naturales sin extensiones. Ideal para pesta\xF1as rectas; dura de 4 a 6 semanas.",
      "incluye": "Lifting de pesta\xF1as, con atenci\xF3n del equipo de Valencia Stetic en cabina privada.",
      "duracion_min": 40,
      "duracion_texto": "40 minutos",
      "precio": 65000,
      "recurso": "cabina",
      "requiere_valoracion": false,
      "procedimiento": "Higienizaci\xF3n y aplicaci\xF3n de producto.",
      "cuidados": "No mojar ni exponer al vapor las primeras 24 horas; evitar maquillaje o pesta\xF1ina el primer d\xEDa; no frotar ni dormir boca abajo las primeras 24 horas; evitar productos aceitosos; peinar suavemente a diario; no usar rizador mec\xE1nico; retirar la pesta\xF1ina solo con desmaquillante sin aceite.",
      "retoque": "Retoque $50.000 antes de los 2 meses; despu\xE9s vuelve a $65.000."
    },
    {
      "id": "masaje_basico",
      "nombre": "Masaje relajante b\xE1sico",
      "nombre_corto": "Relajante b\xE1sico",
      "categoria": "Spa y masajes",
      "activo": true,
      "codigos_anuncio": [],
      "claves": [
        "masaje relajante b\xE1sico",
        "masaje basico",
        "masaje b\xE1sico",
        "relajante basico",
        "relajante b\xE1sico",
        "piedras calientes"
      ],
      "descripcion": "Masaje relajante b\xE1sico en Pereira: m\xE9todos manuales suaves y r\xEDtmicos que relajan la musculatura, favorecen el drenaje y promueven bienestar. Incluye piedras calientes.",
      "incluye": "Musicoterapia y aromaterapia, bebida de bienvenida, masaje relajante y terapia con piedras calientes.",
      "duracion_min": 60,
      "duracion_texto": "1 hora",
      "precio": 95000,
      "recurso": "cabina",
      "requiere_valoracion": false
    },
    {
      "id": "masaje_terapeutico",
      "nombre": "Masaje terap\xE9utico",
      "nombre_corto": "Masaje terap\xE9utico",
      "categoria": "Spa y masajes",
      "activo": true,
      "codigos_anuncio": [],
      "claves": [
        "masaje terap\xE9utico",
        "terapeutico",
        "terap\xE9utico",
        "masaje terapeutico",
        "contractura",
        "contracturas",
        "dolor de espalda",
        "tension muscular",
        "tensi\xF3n muscular"
      ],
      "descripcion": "Masaje terap\xE9utico en Pereira: t\xE9cnica manual para aliviar tensiones musculares, reducir cansancio y estr\xE9s y estimular el sistema linf\xE1tico. Incluye infrarrojo.",
      "incluye": "Musicoterapia y aromaterapia, bebida de bienvenida, masaje (60 min) e infrarrojo (15 min).",
      "duracion_min": 75,
      "duracion_texto": "75 minutos",
      "precio": 100000,
      "recurso": "cabina",
      "requiere_valoracion": false
    },
    {
      "id": "masaje",
      "nombre": "Masaje relajante premium",
      "nombre_corto": "Relajante premium",
      "categoria": "Spa y masajes",
      "activo": true,
      "codigos_anuncio": [
        "PAUSA"
      ],
      "claves": [
        "masaje relajante premium",
        "masaje relajante",
        "relajante",
        "premium"
      ],
      "descripcion": "Masaje relajante premium en Pereira: maniobras suaves y lentas con bambuterapia, piedras volc\xE1nicas, exfoliaci\xF3n, chocolaterapia y masaje de cuero cabelludo.",
      "incluye": "Bebida de bienvenida, masaje relajante (50 min), bambuterapia, piedras volc\xE1nicas, exfoliaci\xF3n facial y corporal, chocolaterapia facial y corporal, masaje de cuero cabelludo, musicoterapia y aromaterapia.",
      "duracion_min": 75,
      "duracion_texto": "75 minutos",
      "precio": 130000,
      "recurso": "cabina",
      "requiere_valoracion": false
    },
    {
      "id": "plan_cumpleanos",
      "nombre": "Masaje relajante plan cumplea\xF1os",
      "nombre_corto": "Plan cumplea\xF1os",
      "categoria": "Spa y masajes",
      "activo": true,
      "codigos_anuncio": [],
      "claves": [
        "masaje relajante plan cumplea\xF1os",
        "cumplea\xF1os",
        "cumpleanos",
        "plan cumplea\xF1os",
        "regalo",
        "sorpresa"
      ],
      "descripcion": "Plan cumplea\xF1os en Pereira: masaje relajante con decoraci\xF3n, torta personal, copa de vino y canci\xF3n para celebrar tu d\xEDa o sorprender a alguien.",
      "incluye": "Decoraci\xF3n con bombas, aviso de cumplea\xF1os, torta personal, copa de vino, velita, canci\xF3n de cumplea\xF1os, musicoterapia y aromaterapia.",
      "duracion_min": 90,
      "duracion_texto": "90 minutos",
      "precio": 150000,
      "recurso": "cabina",
      "requiere_valoracion": false,
      "procedimiento": "60 min de masaje, bambuterapia, piedras volc\xE1nicas, exfoliaci\xF3n facial y corporal, pa\xF1os calientes en espalda, chocolaterapia facial y corporal, masaje de cuero cabelludo."
    },
    {
      "id": "spa_capilar",
      "nombre": "Spa coreano",
      "nombre_corto": "Spa coreano",
      "categoria": "Spa y masajes",
      "activo": true,
      "codigos_anuncio": [
        "RITUAL"
      ],
      "claves": [
        "spa coreano",
        "coreano",
        "spa capilar",
        "capilar",
        "cabello",
        "pelo",
        "cuero cabelludo",
        "head spa"
      ],
      "descripcion": "Spa coreano en Pereira: ritual inspirado en t\xE9cnicas orientales que revitaliza el rostro y fortalece el cabello, con agua, masajes y activos especializados.",
      "incluye": "Facial: diagn\xF3stico, activaci\xF3n facial, shiatsu facial, higiene, exfoliaci\xF3n, mascarilla facial y masaje estimulante. Capilar: shampoo detox, mascarilla capilar, vapor, tratamiento de medios a puntas, infrarrojo e hidroterapia capilar. Musicoterapia y aromaterapia.",
      "duracion_min": 60,
      "duracion_texto": "60 minutos",
      "precio": 150000,
      "recurso": "cabina",
      "requiere_valoracion": false
    },
    {
      "id": "terapia_gold",
      "nombre": "Terapia de relajaci\xF3n gold: por persona",
      "nombre_corto": "Relajaci\xF3n gold",
      "categoria": "Spa y masajes",
      "activo": true,
      "codigos_anuncio": [],
      "claves": [
        "terapia de relajaci\xF3n gold: por persona",
        "gold",
        "terapia gold",
        "terapia de relajacion",
        "terapia de relajaci\xF3n",
        "jacuzzi",
        "turco"
      ],
      "descripcion": "Terapia de relajaci\xF3n gold en Pereira: experiencia premium integral con masaje de cuerpo completo, ba\xF1o turco y jacuzzi para desconectarte por completo.",
      "incluye": "Masaje relajante cuerpo completo (60 min), exfoliaci\xF3n corporal, chocolaterapia, ba\xF1o turco (15 min), jacuzzi tina con hidromasaje (45 min), copa de yogurt con granola o copa de vino, musicoterapia y aromaterapia.",
      "duracion_min": 150,
      "duracion_texto": "2 horas y media",
      "precio": 250000,
      "recurso": "cabina",
      "requiere_valoracion": false
    },
    {
      "id": "terapia_gold_pareja",
      "nombre": "Terapia de relajaci\xF3n gold: en pareja",
      "nombre_corto": "Relajaci\xF3n gold pareja",
      "categoria": "Spa y masajes",
      "activo": true,
      "codigos_anuncio": [],
      "claves": [
        "terapia de relajaci\xF3n gold: en pareja",
        "gold pareja",
        "en pareja",
        "pareja",
        "spa en pareja"
      ],
      "descripcion": "Terapia de relajaci\xF3n gold en pareja en Pereira: masaje de cuerpo completo, ba\xF1o turco y jacuzzi para vivir juntos una desconexi\xF3n total.",
      "incluye": "Masaje relajante cuerpo completo (60 min), exfoliaci\xF3n corporal, chocolaterapia, ba\xF1o turco (15 min), jacuzzi tina con hidromasaje (45 min), copa de yogurt con granola o copa de vino, musicoterapia y aromaterapia.",
      "duracion_min": 150,
      "duracion_texto": "2 horas y media",
      "precio": 380000,
      "recurso": "cabina",
      "requiere_valoracion": false
    },
    {
      "id": "spa_ninas",
      "nombre": "Spa ni\xF1as",
      "nombre_corto": "Spa ni\xF1as",
      "categoria": "Spa y masajes",
      "activo": true,
      "codigos_anuncio": [],
      "claves": [
        "spa ni\xF1as",
        "spa ninas",
        "ni\xF1as",
        "ninas",
        "ni\xF1a",
        "nina",
        "spa infantil",
        "cumplea\xF1os de ni\xF1as"
      ],
      "descripcion": "Spa para ni\xF1as en Pereira: plan grupal para 3 a 4 ni\xF1as de 4 a 10 a\xF1os con decoraci\xF3n, masajito, chocolaterapia, jacuzzi de espuma, maquillaje infantil y torta.",
      "incluye": "Decoraci\xF3n, c\xF3ctel de bienvenida, pr\xE9stamo de batas, fotos, masajito relajante, chocolaterapia, pepinitos faciales, ba\xF1o de espuma (jacuzzi), maquillaje infantil, nuggets con papas y gaseosa, aromaterapia, torta personal, decoraci\xF3n con bombas y aviso, helado y tarjeta de invitaci\xF3n.",
      "duracion_min": 90,
      "duracion_texto": "90 minutos",
      "precio": 150000,
      "precio_nota": "Por ni\xF1a; plan grupal de 3 a 4 ni\xF1as de 4 a 10 a\xF1os",
      "recurso": "cabina",
      "requiere_valoracion": false
    },
    {
      "id": "tensamax",
      "nombre": "Tensamax corporal",
      "nombre_corto": "Tensamax corporal",
      "categoria": "Cuerpo y postoperatorio",
      "activo": true,
      "codigos_anuncio": [],
      "claves": [
        "tensamax corporal",
        "tensamax",
        "radiofrecuencia corporal",
        "flacidez",
        "firmeza",
        "reafirmante"
      ],
      "descripcion": "Tensamax corporal en Pereira: radiofrecuencia monopolar no invasiva para reducir grasa localizada, mejorar la celulitis y reafirmar la piel.",
      "incluye": "Tensamax corporal, con atenci\xF3n del equipo de Valencia Stetic en cabina privada.",
      "duracion_min": 30,
      "precio": 130000,
      "recurso": "cabina",
      "requiere_valoracion": false,
      "procedimiento": "Protocolo corporal, limpieza superficial, aplicaci\xF3n de gel conductor y protector solar.",
      "indicado_para": "Reafirmar brazos, manos, gl\xFAteos, pecho o abdomen; mejorar celulitis; disminuir adiposidades localizadas; reducir volumen por retenci\xF3n de l\xEDquidos; coadyuvante en edema e inflamaci\xF3n.",
      "contraindicaciones": "Embarazo y lactancia (absoluta); hemorragias recientes; tumores malignos; flebitis, trombos y arteriopat\xEDas; alteraciones de sensibilidad en el \xE1rea; marcapasos; cardiopat\xEDas o anticoagulantes continuos (requiere consentimiento escrito del cardi\xF3logo); aparatos auditivos implantados; DIU hormonados y anillos vaginales; estados febriles o infecciosos; epilepsia; menores de 14 a\xF1os.",
      "revisar_condiciones": true
    },
    {
      "id": "reductor_intensivo",
      "nombre": "Tratamiento reductor intensivo",
      "nombre_corto": "Reductor intensivo",
      "categoria": "Cuerpo y postoperatorio",
      "activo": true,
      "codigos_anuncio": [],
      "claves": [
        "tratamiento reductor intensivo",
        "reductor",
        "reductor intensivo",
        "reducir medidas",
        "moldear",
        "adelgazar",
        "bajar de peso",
        "grasa localizada",
        "abdomen plano"
      ],
      "descripcion": "Tratamiento reductor intensivo en Pereira: 15 sesiones para disminuir grasa localizada con masajes, mesoterapia, lipol\xE1ser, radiofrecuencia, Tensamax y plan nutricional.",
      "incluye": "8 masajes reductores, 3 mesoterapias (quemadores), carboxiterapia, lipol\xE1ser, corrientes, radiofrecuencia, ultrasonido, manta t\xE9rmica, 4 sesiones de Tensamax y plan nutricional complementario.",
      "duracion_min": 60,
      "duracion_texto": "1 hora por sesi\xF3n",
      "precio": 1000000,
      "precio_nota": "Paquete de 15 sesiones",
      "recurso": "cabina",
      "requiere_valoracion": false,
      "sesiones": "15 sesiones totales (12 asistencias al centro), 1 hora por sesi\xF3n. Frecuencia recomendada: 2 a 3 veces por semana.",
      "cuidados": "Requiere compromiso 50/50: alimentaci\xF3n balanceada, hidrataci\xF3n y ejercicio, y uso obligatorio de faja para moldear, desinflamar y evitar flacidez.",
      "pago": "Abono del 50% al iniciar; saldo total cancelado a m\xE1s tardar en la quinta sesi\xF3n.",
      "revisar_condiciones": true,
      "paquete": "Paquete de 15 sesiones"
    },
    {
      "id": "celulitis_pefe",
      "nombre": "Tratamiento celulitis (PEFE)",
      "nombre_corto": "Celulitis PEFE",
      "categoria": "Cuerpo y postoperatorio",
      "activo": true,
      "codigos_anuncio": [],
      "claves": [
        "tratamiento celulitis (pefe)",
        "celulitis",
        "pefe",
        "piel de naranja",
        "tratamiento celulitis",
        "retencion de liquidos",
        "retenci\xF3n de l\xEDquidos"
      ],
      "descripcion": "Tratamiento de celulitis (PEFE) en Pereira: 10 sesiones contra la retenci\xF3n de l\xEDquidos, la fibrosis y la piel de naranja, con drenajes, radiofrecuencia y lipol\xE1ser.",
      "incluye": "6 drenajes, 3 radiofrecuencias, corrientes, lipol\xE1ser, infrarrojo, carboxiterapia y 2 ampollas anticelulitis (aparatolog\xEDa ajustada seg\xFAn necesidad).",
      "duracion_min": 60,
      "duracion_texto": "1 hora por sesi\xF3n",
      "precio": 700000,
      "precio_nota": "Paquete de 10 sesiones",
      "recurso": "cabina",
      "requiere_valoracion": false,
      "sesiones": "10 sesiones de 1 hora, 3 veces por semana (1 inyecci\xF3n semanal).",
      "revisar_condiciones": true,
      "paquete": "Paquete de 10 sesiones"
    },
    {
      "id": "gluteos_acero",
      "nombre": "Gl\xFAteos de acero",
      "nombre_corto": "Gl\xFAteos de acero",
      "categoria": "Cuerpo y postoperatorio",
      "activo": true,
      "codigos_anuncio": [],
      "claves": [
        "gl\xFAteos de acero",
        "gluteos de acero",
        "gluteos",
        "gl\xFAteos",
        "levantar gluteos",
        "aumentar gluteos"
      ],
      "descripcion": "Gl\xFAteos de acero en Pereira: 20 citas en 7 semanas para mejorar celulitis y flacidez gl\xFAtea y estimular col\xE1geno y elastina, con electrofitness y radiofrecuencia.",
      "incluye": "10 masajes para gl\xFAteos, 6 peptonas, 6 electrofitness, 6 radiofrecuencias, 3 vacumterapias, pack fr\xEDos, 2 exfoliaciones, copa y 8 crioterapias.",
      "duracion_min": 60,
      "duracion_texto": "1 hora por cita",
      "precio": 1100000,
      "precio_nota": "Paquete de 20 citas en 7 semanas",
      "recurso": "cabina",
      "requiere_valoracion": false,
      "sesiones": "20 citas en 7 semanas (3 citas por semana, 1 hora por cita). Apto para menores de edad con permiso de sus padres.",
      "cuidados": "Constancia con las citas, ejercicio 3 veces por semana, plan nutricional, desintoxicaci\xF3n oral, enema de caf\xE9 y aplicaci\xF3n de hielo.",
      "pago": "50% al iniciar y 50% restante a la mitad del tratamiento.",
      "revisar_condiciones": true,
      "paquete": "Paquete de 20 citas en 7 semanas"
    },
    {
      "id": "peptonas",
      "nombre": "Peptonas (sesi\xF3n individual)",
      "nombre_corto": "Peptonas",
      "categoria": "Cuerpo y postoperatorio",
      "activo": true,
      "codigos_anuncio": [],
      "claves": [
        "peptonas (sesi\xF3n individual)",
        "peptonas",
        "peptona",
        "aminoacidos",
        "amino\xE1cidos"
      ],
      "descripcion": "Peptonas en Pereira: complejos de amino\xE1cidos aplicados por mesoterapia que nutren, tonifican y apoyan el aumento de masa muscular, ideal para gl\xFAteos.",
      "incluye": "Peptonas (sesi\xF3n individual), con atenci\xF3n del equipo de Valencia Stetic en cabina privada.",
      "duracion_min": 30,
      "precio": 100000,
      "precio_nota": "Por sesi\xF3n",
      "recurso": "cabina",
      "requiere_valoracion": false,
      "procedimiento": "Electrofitness, higienizaci\xF3n y aplicaci\xF3n de peptonas.",
      "sesiones": "M\xEDnimo 4 a 6 sesiones; ideal 8 a 10 (1 por semana). Los resultados duran de 8 meses a 1 a\xF1o.",
      "cuidados": "Requiere alta ingesta proteica (pollo, salm\xF3n, huevos, at\xFAn, l\xE1cteos descremados o yogurt griego) y ejercicio espec\xEDfico de gl\xFAteos.",
      "revisar_condiciones": true
    },
    {
      "id": "enzimas",
      "nombre": "Enzimas recombinantes",
      "nombre_corto": "Enzimas recombinantes",
      "categoria": "Cuerpo y postoperatorio",
      "activo": true,
      "codigos_anuncio": [],
      "claves": [
        "enzimas recombinantes",
        "enzimas",
        "fibrosis"
      ],
      "descripcion": "Enzimas recombinantes en Pereira: principios activos 100% biol\xF3gicos con resultados desde la primera sesi\xF3n para grasa localizada, celulitis, fibrosis y cicatrices.",
      "incluye": "Enzimas recombinantes, con atenci\xF3n del equipo de Valencia Stetic en cabina privada.",
      "duracion_min": 30,
      "precio": 280000,
      "recurso": "cabina",
      "requiere_valoracion": false,
      "procedimiento": "Higiene, exfoliaci\xF3n y aplicaci\xF3n de enzimas.",
      "indicado_para": "Grasa localizada, celulitis, fibrosis, flacidez y mejora de cicatrices.",
      "revisar_condiciones": true
    },
    {
      "id": "quemador_meso",
      "nombre": "Quemador de grasa: mesoterapia",
      "nombre_corto": "Quemador mesoterapia",
      "categoria": "Cuerpo y postoperatorio",
      "activo": true,
      "codigos_anuncio": [],
      "claves": [
        "quemador de grasa: mesoterapia",
        "quemador",
        "quemador de grasa",
        "mesoterapia corporal",
        "reducir medidas"
      ],
      "descripcion": "Quemador de grasa por mesoterapia en Pereira: tratamiento no quir\xFArgico para reducir grasa localizada resistente a dieta y ejercicio. Incluye drenaje.",
      "incluye": "Quemador de grasa: mesoterapia, con atenci\xF3n del equipo de Valencia Stetic en cabina privada.",
      "duracion_min": 30,
      "precio": 100000,
      "precio_nota": "Incluye drenaje",
      "recurso": "cabina",
      "requiere_valoracion": false,
      "indicado_para": "Reducir medidas, moldear el contorno, mejorar la celulitis y estimular la circulaci\xF3n y el drenaje linf\xE1tico.",
      "revisar_condiciones": true
    },
    {
      "id": "quemador_hidrolipoclasia",
      "nombre": "Quemador de grasa: hidrolipoclasia",
      "nombre_corto": "Hidrolipoclasia",
      "categoria": "Cuerpo y postoperatorio",
      "activo": true,
      "codigos_anuncio": [],
      "claves": [
        "quemador de grasa: hidrolipoclasia",
        "hidrolipoclasia"
      ],
      "descripcion": "Hidrolipoclasia en Pereira: tratamiento no quir\xFArgico para reducir tejido graso localizado y moldear el contorno. Incluye drenaje.",
      "incluye": "Quemador de grasa: hidrolipoclasia, con atenci\xF3n del equipo de Valencia Stetic en cabina privada.",
      "duracion_min": 30,
      "precio": 130000,
      "precio_nota": "Incluye drenaje",
      "recurso": "cabina",
      "requiere_valoracion": false,
      "indicado_para": "Reducir medidas, moldear el contorno, mejorar la celulitis y estimular la circulaci\xF3n y el drenaje linf\xE1tico."
    },
    {
      "id": "carboxiterapia",
      "nombre": "Carboxiterapia: 1 sesi\xF3n",
      "nombre_corto": "Carboxiterapia",
      "categoria": "Cuerpo y postoperatorio",
      "activo": true,
      "codigos_anuncio": [],
      "claves": [
        "carboxiterapia: 1 sesi\xF3n",
        "carboxiterapia",
        "carboxi",
        "estrias",
        "estr\xEDas"
      ],
      "descripcion": "Carboxiterapia en Pereira: microinyecciones de CO\u2082 medicinal que mejoran circulaci\xF3n y producci\xF3n de col\xE1geno, para celulitis, flacidez y estr\xEDas. Valor por 1 zona.",
      "incluye": "Carboxiterapia: 1 sesi\xF3n, con atenci\xF3n del equipo de Valencia Stetic en cabina privada.",
      "duracion_min": 30,
      "precio": 60000,
      "precio_nota": "Por 1 zona",
      "recurso": "cabina",
      "requiere_valoracion": false,
      "indicado_para": "Celulitis, flacidez facial y corporal, estr\xEDas y textura cut\xE1nea, sin incapacidad.",
      "revisar_condiciones": true
    },
    {
      "id": "carboxiterapia_5",
      "nombre": "Carboxiterapia: paquete de 5 sesiones",
      "nombre_corto": "Carboxiterapia x5",
      "categoria": "Cuerpo y postoperatorio",
      "activo": true,
      "codigos_anuncio": [],
      "claves": [
        "carboxiterapia: paquete de 5 sesiones",
        "carboxiterapia paquete",
        "carboxiterapia x5"
      ],
      "descripcion": "Paquete de 5 sesiones de carboxiterapia en Pereira para celulitis, flacidez y estr\xEDas. Valor \xFAnicamente por 1 zona.",
      "incluye": "Carboxiterapia: paquete de 5 sesiones, con atenci\xF3n del equipo de Valencia Stetic en cabina privada.",
      "duracion_min": 30,
      "precio": 250000,
      "precio_nota": "Paquete de 5 sesiones, por 1 zona",
      "recurso": "cabina",
      "requiere_valoracion": false,
      "indicado_para": "Celulitis, flacidez facial y corporal, estr\xEDas y textura cut\xE1nea, sin incapacidad.",
      "revisar_condiciones": true,
      "paquete": "Paquete de 5 sesiones, por 1 zona"
    },
    {
      "id": "subcision",
      "nombre": "Subcisi\xF3n",
      "nombre_corto": "Subcisi\xF3n",
      "categoria": "Cuerpo y postoperatorio",
      "activo": true,
      "codigos_anuncio": [],
      "claves": [
        "subcisi\xF3n",
        "subcision",
        "hoyuelos"
      ],
      "descripcion": "Subcisi\xF3n en Pereira: mejora celulitis severa, hoyuelos y cicatrices de acn\xE9. Los casos leves requieren 1 sesi\xF3n; los avanzados, sesiones mensuales. Desde $150.000.",
      "incluye": "Subcisi\xF3n, con atenci\xF3n del equipo de Valencia Stetic en cabina privada.",
      "duracion_min": 30,
      "precio": null,
      "precio_nota": "Desde $150.000 seg\xFAn las \xE1reas tratadas",
      "recurso": "cabina",
      "requiere_valoracion": false,
      "procedimiento": "Higienizaci\xF3n, exfoliaci\xF3n, anestesia y procedimiento.",
      "alerta": "Posible hinchaz\xF3n, hematomas y dolor leve de recuperaci\xF3n progresiva.",
      "revisar_condiciones": true
    },
    {
      "id": "bronceado",
      "nombre": "Bronceado brasile\xF1o org\xE1nico",
      "nombre_corto": "Bronceado brasile\xF1o",
      "categoria": "Cuerpo y postoperatorio",
      "activo": true,
      "codigos_anuncio": [],
      "claves": [
        "bronceado brasile\xF1o org\xE1nico",
        "bronceado",
        "bronceo",
        "bronceado brasile\xF1o",
        "bronceado brasileno",
        "tono dorado"
      ],
      "descripcion": "Bronceado brasile\xF1o org\xE1nico en Pereira: tono dorado uniforme y natural con activos naturales que hidratan y nutren. Incluye marcaci\xF3n para resaltar curvas.",
      "incluye": "Bronceado brasile\xF1o org\xE1nico, con atenci\xF3n del equipo de Valencia Stetic en cabina privada.",
      "duracion_min": 30,
      "precio": 120000,
      "recurso": "cabina",
      "requiere_valoracion": false,
      "procedimiento": "Sesi\xF3n controlada con activos naturales y activadores de pigmentaci\xF3n; marcaci\xF3n con cinta especial para definir el dise\xF1o.",
      "contraindicaciones": "Irritaci\xF3n o inflamaci\xF3n cut\xE1nea, quemaduras o heridas, dermatitis, hongos o infecciones, embarazo en primer trimestre."
    },
    {
      "id": "postop",
      "nombre": "Post operatorio: paquete de 10 sesiones",
      "nombre_corto": "Postoperatorio x10",
      "categoria": "Cuerpo y postoperatorio",
      "activo": true,
      "codigos_anuncio": [],
      "claves": [
        "post operatorio: paquete de 10 sesiones",
        "postoperatorio",
        "post operatorio",
        "postquirurgico",
        "postquir\xFArgico",
        "post quirurgico",
        "post quir\xFArgico",
        "drenaje",
        "drenaje linfatico",
        "drenaje linf\xE1tico",
        "cirugia",
        "cirug\xEDa",
        "lipo",
        "lipoescultura",
        "abdominoplastia",
        "recuperacion",
        "recuperaci\xF3n",
        "postoperatorio x10"
      ],
      "descripcion": "Post operatorio en Pereira, paquete de 10 sesiones: rehabilitaci\xF3n post-quir\xFArgica con drenaje linf\xE1tico para desinflamar y apoyar la cicatrizaci\xF3n.",
      "incluye": "Post operatorio: paquete de 10 sesiones, con atenci\xF3n del equipo de Valencia Stetic en cabina privada.",
      "duracion_min": 60,
      "duracion_texto": "1 hora aproximadamente por sesi\xF3n",
      "precio": 650000,
      "precio_nota": "Paquete de 10 sesiones",
      "recurso": "cabina",
      "requiere_valoracion": false,
      "procedimiento": "Seg\xFAn autorizaci\xF3n m\xE9dica: drenaje linf\xE1tico, ultrasonido, radiofrecuencia, corrientes, infrarrojo y manta t\xE9rmica.",
      "indicado_para": "Desinflamar, reducir la retenci\xF3n de l\xEDquidos, optimizar la cicatrizaci\xF3n y acelerar la recuperaci\xF3n.",
      "cuidados": "Se trabaja seg\xFAn la autorizaci\xF3n de tu cirujano: cu\xE9ntanos la fecha de tu cirug\xEDa.",
      "revisar_condiciones": true,
      "solo": true,
      "paquete": "Paquete de 10 sesiones"
    },
    {
      "id": "postop20",
      "nombre": "Post operatorio: paquete de 20 sesiones",
      "nombre_corto": "Postoperatorio x20",
      "categoria": "Cuerpo y postoperatorio",
      "activo": true,
      "codigos_anuncio": [],
      "claves": [
        "post operatorio: paquete de 20 sesiones",
        "postoperatorio x20",
        "post operatorio x20",
        "masaje postoperatorio x20",
        "20 sesiones"
      ],
      "descripcion": "Post operatorio en Pereira, paquete de 20 sesiones: acompa\xF1amiento completo en tu recuperaci\xF3n post-quir\xFArgica. La tarifa aplica pagando el total.",
      "incluye": "Post operatorio: paquete de 20 sesiones, con atenci\xF3n del equipo de Valencia Stetic en cabina privada.",
      "duracion_min": 60,
      "duracion_texto": "1 hora aproximadamente por sesi\xF3n",
      "precio": 1150000,
      "precio_nota": "Paquete de 20 sesiones; aplica con pago total",
      "recurso": "cabina",
      "requiere_valoracion": false,
      "procedimiento": "Seg\xFAn autorizaci\xF3n m\xE9dica: drenaje linf\xE1tico, ultrasonido, radiofrecuencia, corrientes, infrarrojo y manta t\xE9rmica.",
      "indicado_para": "Desinflamar, reducir la retenci\xF3n de l\xEDquidos, optimizar la cicatrizaci\xF3n y acelerar la recuperaci\xF3n.",
      "pago": "La tarifa del paquete de 20 sesiones aplica realizando el pago total.",
      "revisar_condiciones": true,
      "solo": true,
      "paquete": "Paquete de 20 sesiones; aplica con pago total"
    },
    {
      "id": "body_detox",
      "nombre": "Divine Body Detox: 1 sesi\xF3n",
      "nombre_corto": "Divine Body Detox",
      "categoria": "Cuerpo y postoperatorio",
      "activo": true,
      "codigos_anuncio": [],
      "claves": [
        "divine body detox: 1 sesi\xF3n",
        "detox",
        "body detox",
        "divine",
        "divine body detox",
        "desintoxicante",
        "drenaje linfatico manual"
      ],
      "descripcion": "Divine Body Detox en Pereira: masaje 100% manual con drenaje linf\xE1tico indoloro, moldeo corporal y relajaci\xF3n, con resultados visibles desde la primera sesi\xF3n.",
      "incluye": "Divine Body Detox: 1 sesi\xF3n, con atenci\xF3n del equipo de Valencia Stetic en cabina privada.",
      "duracion_min": 90,
      "duracion_texto": "90 minutos",
      "precio": 160000,
      "recurso": "cabina",
      "requiere_valoracion": false,
      "indicado_para": "Zonas trabajadas: cuello, pecho, brazos, abdomen, pierna completa, pies, gl\xFAteos y espalda. Frecuencia: 2 veces por semana.",
      "dolor": "Es un masaje 100% manual con drenaje linf\xE1tico indoloro."
    },
    {
      "id": "body_detox_10",
      "nombre": "Divine Body Detox: paquete de 10 sesiones",
      "nombre_corto": "Divine Detox x10",
      "categoria": "Cuerpo y postoperatorio",
      "activo": true,
      "codigos_anuncio": [],
      "claves": [
        "divine body detox: paquete de 10 sesiones",
        "detox paquete",
        "detox x10",
        "body detox x10"
      ],
      "descripcion": "Paquete de 10 sesiones de Divine Body Detox en Pereira: drenaje linf\xE1tico manual, moldeo corporal y relajaci\xF3n, 2 veces por semana.",
      "incluye": "Divine Body Detox: paquete de 10 sesiones, con atenci\xF3n del equipo de Valencia Stetic en cabina privada.",
      "duracion_min": 90,
      "duracion_texto": "90 minutos por sesi\xF3n",
      "precio": 1300000,
      "precio_nota": "Paquete de 10 sesiones",
      "recurso": "cabina",
      "requiere_valoracion": false,
      "indicado_para": "Zonas trabajadas: cuello, pecho, brazos, abdomen, pierna completa, pies, gl\xFAteos y espalda. Frecuencia: 2 veces por semana.",
      "paquete": "Paquete de 10 sesiones"
    },
    {
      "id": "sueroterapia",
      "nombre": "Sueroterapia endovenosa",
      "nombre_corto": "Sueroterapia",
      "categoria": "Sueroterapia",
      "activo": true,
      "codigos_anuncio": [],
      "claves": [
        "sueroterapia endovenosa",
        "sueroterapia",
        "suero",
        "sueros",
        "energia",
        "energ\xEDa",
        "fatiga",
        "quelacion",
        "quelaci\xF3n",
        "vitaminas",
        "malestar general",
        "suero vitaminas"
      ],
      "descripcion": "Sueroterapia endovenosa en Pereira: terapia preventiva e integrativa con 19 sueros (energizante, quelaci\xF3n, antioxidante, detox, antiage y m\xE1s) seg\xFAn tu necesidad.",
      "incluye": "Sueros disponibles: quelaci\xF3n, antioxidante, energizante, revitalizaci\xF3n, inmunol\xF3gico, diabetes, obesidad, fatiga cr\xF3nica, sistema nervioso central, piel, osteoartritis, gastritis cr\xF3nica, genitourinaria, detox, activador energ\xE9tico, antigripal, colon, sistema respiratorio y antiage.",
      "duracion_min": 30,
      "precio": null,
      "precio_nota": "Valor seg\xFAn el suero; requiere valoraci\xF3n",
      "recurso": "cabina",
      "requiere_valoracion": false,
      "indicado_para": "Fatiga, migra\xF1a, gastritis, artrosis, estr\xE9s, insomnio, gripes recurrentes y m\xE1s; mejora rendimiento, defensas y circulaci\xF3n (quelaci\xF3n biol\xF3gica).",
      "revisar_condiciones": true
    }
  ]
}
`};var on=globalThis.VS_PREFIJO||"";globalThis.process=globalThis.process||{};globalThis.process.env=Object.assign({MODO_DEMO:"1",SIMULADOR:"0",WA_TOKEN:"",WA_PHONE_NUMBER_ID:"",ASISTENTE_WEB:"1",PUBLIC_URL:`${location.origin}${on}`,TRUST_PROXY:"0",RESERVAS_MAX_POR_HORA:"60",RESERVAS_MAX_API_MIN:"600",ASISTENTE_MAX_10MIN:"400"},globalThis.process.env||{});globalThis.process.argv=[];globalThis.process.cwd=()=>"/";var Re=null,Ra=e=>{Re=e},Je=class{constructor(a,o){this.bd=a,this.sql=o}_filas(a){let o=this.bd.prepare(this.sql);try{a.length&&o.bind(a.map(i=>i===void 0?null:i));let n=[];for(;o.step();)n.push(o.getAsObject());return n}finally{o.free()}}all(...a){return this._filas(a)}get(...a){return this._filas(a)[0]}run(...a){this.bd.run(this.sql,a.map(n=>n===void 0?null:n));let o=this.bd.exec("SELECT last_insert_rowid() AS id")[0];return{changes:this.bd.getRowsModified(),lastInsertRowid:o?o.values[0][0]:0}}},$e=class{constructor(a){if(!Re)throw new Error("sql.js no est\xE1 inicializado");let o=globalThis.__VS_DB_BYTES;this.bd=o?new Re.Database(o):new Re.Database,globalThis.__VS_DB_BYTES=null}exec(a){this.bd.exec(a)}prepare(a){return new Je(this.bd,a)}exportar(){return this.bd.export()}close(){this.bd.close()}};var $a=globalThis.__VS_ARCHIVOS||{},Na=e=>{let a=Object.keys($a).find(o=>String(e).endsWith(o));return a?$a[a]:void 0},nn=e=>{let a=Na(e);if(a===void 0){let o=new Error(`ENOENT: ${e}`);throw o.code="ENOENT",o}return a},rn=e=>Na(e)!==void 0,sn=()=>{},cn=()=>{},pe={readFileSync:nn,existsSync:rn,mkdirSync:sn,writeFileSync:cn};var La=e=>{let a=[];for(let o of e.join("/").split("/"))!o||o==="."||(o===".."?a.pop():a.push(o));return a},tn=(...e)=>(String(e[0]||"").startsWith("/")?"/":"")+La(e).join("/"),ln=(...e)=>{let a="";for(let o of e.reverse())if(a=a?`${o}/${a}`:o,String(o).startsWith("/"))break;return"/"+La([a]).join("/")},dn=e=>{let a=String(e).replace(/\/+$/,"").lastIndexOf("/");return a<=0?"/":String(e).slice(0,a)},un=e=>String(e).replace(/\/+$/,"").split("/").pop();var Y={join:tn,resolve:ln,dirname:dn,basename:un,sep:"/"};var Da=e=>String(e).replace(/^file:\/\//,"");var ea=Y.resolve(Y.dirname(Da("file:///app/src/config.js")),"..");function pn(){let e=Y.join(ea,".env");if(pe.existsSync(e))for(let a of pe.readFileSync(e,"utf8").split(/\r?\n/)){let o=a.trim();if(!o||o.startsWith("#"))continue;let n=o.indexOf("=");if(n<0)continue;let i=o.slice(0,n).trim(),s=o.slice(n+1).trim();(s.startsWith('"')&&s.endsWith('"')||s.startsWith("'")&&s.endsWith("'"))&&(s=s.slice(1,-1)),process.env[i]===void 0&&(process.env[i]=s)}}pn();var E=(e,a="")=>(process.env[e]??a).toString().trim(),m={PORT:Number(E("PORT","3200")),PUBLIC_URL:E("PUBLIC_URL"),DATA_DIR:Y.resolve(ea,E("DATA_DIR","./data")),PANEL_PASSWORD:E("PANEL_PASSWORD"),SESSION_SECRET:E("SESSION_SECRET","dev-secret-cambiar"),SIMULADOR:E("SIMULADOR","1")==="1",WA_TOKEN:E("WA_TOKEN"),WA_PHONE_NUMBER_ID:E("WA_PHONE_NUMBER_ID"),WA_BUSINESS_ACCOUNT_ID:E("WA_BUSINESS_ACCOUNT_ID"),WA_VERIFY_TOKEN:E("WA_VERIFY_TOKEN","valencia-stetic-verify"),META_APP_SECRET:E("META_APP_SECRET"),META_GRAPH_VERSION:E("META_GRAPH_VERSION","v23.0"),WA_TEMPLATE_LANG:E("WA_TEMPLATE_LANG","es"),META_DATASET_ID:E("META_DATASET_ID"),META_CAPI_TOKEN:E("META_CAPI_TOKEN")||E("WA_TOKEN"),CAPI_EVENT_CITA:E("CAPI_EVENT_CITA","LeadSubmitted"),CAPI_EVENT_ASISTIO:E("CAPI_EVENT_ASISTIO","Purchase"),STAFF_WA_NUMBERS:E("STAFF_WA_NUMBERS").split(",").map(e=>e.replace(/\D/g,"")).filter(Boolean),WA_PUBLIC_NUMBER:E("WA_PUBLIC_NUMBER"),TRUST_PROXY:E("TRUST_PROXY","0")==="1",ANTHROPIC_API_KEY:E("ANTHROPIC_API_KEY"),CLAUDE_MODEL:E("CLAUDE_MODEL","claude-opus-5-5")},oe=()=>!m.WA_TOKEN||!m.WA_PHONE_NUMBER_ID;function Ne(e){return JSON.parse(pe.readFileSync(Y.join(ea,e),"utf8"))}var l=Ne("config/negocio.json"),j=Ne("config/servicios.json").servicios.filter(e=>e.activo!==!1),Oa=Ne("config/servicios.json").categorias||[],Ia=Ne("config/servicios.json").categorias_info||[];for(let e of j)e.duracion_real_min=e.duracion_min,l.agenda?.duracion_fija_min&&(e.duracion_min=Number(l.agenda.duracion_fija_min));var g=e=>j.find(a=>a.id===e)||null;var Ma=l.zona_horaria_offset||"-05:00",mn=(()=>{let e=Ma.match(/([+-])(\d{2}):(\d{2})/),a=Number(e[2])*60+Number(e[3]);return e[1]==="-"?-a:a})(),bn=null;var h=()=>bn??Date.now(),ne=e=>String(e).padStart(2,"0");function me(e){let a=new Date(e+mn*6e4);return`${a.getUTCFullYear()}-${ne(a.getUTCMonth()+1)}-${ne(a.getUTCDate())}T${ne(a.getUTCHours())}:${ne(a.getUTCMinutes())}`}var ie=e=>Date.parse(`${e.length===10?e+"T00:00":e}:00${Ma}`),be=()=>me(h()),A=()=>be().slice(0,10);function k(e,a){return new Date(Date.parse(e+"T12:00:00Z")+a*864e5).toISOString().slice(0,10)}var F=e=>new Date(e+"T12:00:00Z").getUTCDay(),W=(e,a)=>me(ie(e)+a*6e4),z=e=>{let[a,o]=e.split(":").map(Number);return a*60+o},aa=e=>`${ne(Math.floor(e/60))}:${ne(e%60)}`,Va=["domingo","lunes","martes","mi\xE9rcoles","jueves","viernes","s\xE1bado"],gn=["dom","lun","mar","mi\xE9","jue","vie","s\xE1b"],oa=["enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre"],na=Va,Ha=oa;function Q(e){let[a,o,n]=e.split("-").map(Number),i=`${Va[F(e)]} ${n} de ${oa[o-1]}`,s=A();return e===s?i=`hoy, ${i}`:e===k(s,1)&&(i=`ma\xF1ana, ${i}`),i}function Ua(e){let[,a,o]=e.split("-").map(Number);return`${gn[F(e)]} ${o} ${oa[a-1].slice(0,3)}`}function $(e){let[a,o]=e.split(":").map(Number),n=a>=12?"p. m.":"a. m.";return a=a%12||12,`${a}:${ne(o)} ${n}`}var ge=e=>/^(hoy|mañana)/.test(e)?e:`el ${e}`,Fa=e=>/^(hoy|mañana)/.test(e)?`de ${e}`:`del ${e}`,T=e=>`${Q(e.slice(0,10))} a las ${$(e.slice(11,16))}`;var y;function ia(e){return e||(pe.mkdirSync(m.DATA_DIR,{recursive:!0}),e=Y.join(m.DATA_DIR,"agenda.sqlite")),y=new $e(e),y.exec(`
    PRAGMA journal_mode = WAL;
    PRAGMA foreign_keys = ON;

    CREATE TABLE IF NOT EXISTS contactos (
      wa_id TEXT PRIMARY KEY,
      nombre TEXT,
      nombre_perfil TEXT,
      estado TEXT,
      estado_datos TEXT DEFAULT '{}',
      etapa TEXT DEFAULT 'Nuevo',
      bot_pausado INTEGER DEFAULT 0,
      baja INTEGER DEFAULT 0,
      servicio_interes TEXT,
      fallos INTEGER DEFAULT 0,
      -- atribuci\xF3n Click-to-WhatsApp
      ad_id TEXT, ctwa_clid TEXT, source_url TEXT, source_type TEXT, ad_headline TEXT, ad_body TEXT,
      codigo_anuncio TEXT,
      primer_contacto INTEGER,
      ultimo_entrante INTEGER,
      ultimo_saliente INTEGER,
      seguimiento1 INTEGER DEFAULT 0,
      seguimiento2 INTEGER DEFAULT 0,
      notas TEXT
    );

    CREATE TABLE IF NOT EXISTS mensajes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      wa_id TEXT NOT NULL,
      direccion TEXT NOT NULL,      -- in | out
      tipo TEXT,
      cuerpo TEXT,
      payload TEXT,                 -- JSON del mensaje enviado (botones/listas)
      wamid TEXT,
      autor TEXT,                   -- bot | equipo | cliente | sistema
      ts INTEGER NOT NULL
    );
    CREATE INDEX IF NOT EXISTS ix_msg_wa ON mensajes(wa_id, ts);
    CREATE UNIQUE INDEX IF NOT EXISTS ix_msg_wamid ON mensajes(wamid) WHERE wamid IS NOT NULL AND direccion = 'in';

    CREATE TABLE IF NOT EXISTS citas (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      wa_id TEXT NOT NULL,
      nombre TEXT,
      servicio_id TEXT NOT NULL,
      inicio TEXT NOT NULL,         -- local YYYY-MM-DDTHH:MM
      fin TEXT NOT NULL,            -- local, incluye pausa entre citas
      recurso TEXT NOT NULL,
      estado TEXT NOT NULL DEFAULT 'agendada', -- agendada | confirmada | cancelada | asistio | no_asistio
      requiere_revision INTEGER DEFAULT 0,
      precio INTEGER,
      valor_cobrado INTEGER,
      ad_id TEXT, codigo_anuncio TEXT, ctwa_clid TEXT,
      origen TEXT DEFAULT 'bot',    -- bot | panel
      recordatorio1 INTEGER DEFAULT 0,
      recordatorio2 INTEGER DEFAULT 0,
      gracias INTEGER DEFAULT 0,
      notas TEXT,
      creado INTEGER NOT NULL,
      actualizado INTEGER
    );
    CREATE INDEX IF NOT EXISTS ix_citas_inicio ON citas(inicio);
    CREATE INDEX IF NOT EXISTS ix_citas_wa ON citas(wa_id);

    CREATE TABLE IF NOT EXISTS bloqueos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      inicio TEXT NOT NULL,
      fin TEXT NOT NULL,
      recurso TEXT,                 -- null = todos
      motivo TEXT
    );

    CREATE TABLE IF NOT EXISTS eventos_capi (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      wa_id TEXT, cita_id INTEGER,
      evento TEXT, payload TEXT, estado TEXT, respuesta TEXT,
      ts INTEGER
    );
  `),fn(y),y}function fn(e){let a=n=>new Set(e.prepare(`PRAGMA table_info(${n})`).all().map(i=>i.name)),o=(n,i,s)=>{a(n).has(i)||e.exec(`ALTER TABLE ${n} ADD COLUMN ${i} ${s}`)};o("citas","token","TEXT"),o("citas","grupo","TEXT"),o("contactos","email","TEXT"),e.exec("CREATE UNIQUE INDEX IF NOT EXISTS ix_citas_token ON citas(token) WHERE token IS NOT NULL"),e.exec("CREATE INDEX IF NOT EXISTS ix_citas_grupo ON citas(grupo) WHERE grupo IS NOT NULL")}var M=()=>y;function I(e){let a=y.prepare("SELECT * FROM contactos WHERE wa_id = ?").get(e);return a&&(a.estado_datos=JSON.parse(a.estado_datos||"{}")),a||null}function Le(e,{nombre_perfil:a}={}){let o=I(e);return o?a&&a!==o.nombre_perfil&&(y.prepare("UPDATE contactos SET nombre_perfil = ? WHERE wa_id = ?").run(a,e),o.nombre_perfil=a):(y.prepare("INSERT INTO contactos (wa_id, nombre_perfil, primer_contacto, etapa) VALUES (?, ?, ?, ?)").run(e,a||null,h(),"Nuevo"),o=I(e),o._nuevo=!0),o}var vn=new Set(["nombre","estado","estado_datos","etapa","bot_pausado","baja","servicio_interes","fallos","ad_id","ctwa_clid","source_url","source_type","ad_headline","ad_body","codigo_anuncio","ultimo_entrante","ultimo_saliente","seguimiento1","seguimiento2","notas","email"]);function q(e,a){let o=Object.keys(a).filter(i=>vn.has(i));if(!o.length)return;let n=o.map(i=>{let s=a[i];return i==="estado_datos"?JSON.stringify(s||{}):typeof s=="boolean"?s?1:0:s??null});y.prepare(`UPDATE contactos SET ${o.map(i=>`${i} = ?`).join(", ")} WHERE wa_id = ?`).run(...n,e)}var Ba={Nuevo:0,Orientado:1,"Precio enviado":2,Seguimiento:2,"Requiere asesora":2,"Cita agendada":3,"No asisti\xF3":4,Asisti\u00F3:5,Baja:9};function x(e,a,{forzar:o=!1}={}){let n=I(e);n&&(o||(Ba[a]??0)>=(Ba[n.etapa]??0))&&q(e,{etapa:a})}function De({wa_id:e,direccion:a,tipo:o,cuerpo:n,payload:i,wamid:s,autor:r}){try{let c=y.prepare("INSERT INTO mensajes (wa_id, direccion, tipo, cuerpo, payload, wamid, autor, ts) VALUES (?,?,?,?,?,?,?,?)").run(e,a,o||"text",n||"",i?JSON.stringify(i):null,s||null,r||null,h());return Number(c.lastInsertRowid)}catch(c){if(String(c.message).includes("UNIQUE"))return null;throw c}}var ka=e=>!!(e&&y.prepare("SELECT 1 FROM mensajes WHERE wamid = ? AND direccion = 'in'").get(e)),Oe=(e,a=0)=>y.prepare("SELECT * FROM mensajes WHERE wa_id = ? AND id > ? ORDER BY id").all(e,a).map(o=>({...o,payload:o.payload?JSON.parse(o.payload):null})),Wa=(e,a=8)=>y.prepare("SELECT direccion, cuerpo FROM mensajes WHERE wa_id = ? ORDER BY id DESC LIMIT ?").all(e,a).reverse();function K(e){return y.prepare("SELECT * FROM citas WHERE id = ?").get(e)||null}function G(e){return y.prepare("SELECT * FROM citas WHERE wa_id = ? AND estado IN ('agendada','confirmada') AND inicio >= ? ORDER BY inicio").all(e,me(h()))}function Ga(e,a,o,n=0){return y.prepare(`SELECT * FROM citas WHERE recurso = ? AND estado IN ('agendada','confirmada','asistio')
    AND inicio < ? AND fin > ? AND id != ?`).all(e,o,a,n)}function Xa(e,a,o){return y.prepare("SELECT * FROM bloqueos WHERE (recurso IS NULL OR recurso = ?) AND inicio < ? AND fin > ?").all(e,o,a)}function ra(e){let a=y.prepare(`INSERT INTO citas (wa_id, nombre, servicio_id, inicio, fin, recurso, estado, requiere_revision, precio, ad_id, codigo_anuncio, ctwa_clid, origen, notas, token, grupo, creado)
    VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`).run(e.wa_id,e.nombre||null,e.servicio_id,e.inicio,e.fin,e.recurso,e.estado||"agendada",e.requiere_revision?1:0,e.precio??null,e.ad_id||null,e.codigo_anuncio||null,e.ctwa_clid||null,e.origen||"bot",e.notas||null,e.token||null,e.grupo||null,h());return K(Number(a.lastInsertRowid))}var Ya=e=>e&&y.prepare("SELECT * FROM citas WHERE token = ?").get(String(e))||null,re=e=>e?y.prepare("SELECT * FROM citas WHERE grupo = ? ORDER BY inicio").all(e):[];var _n=new Set(["estado","requiere_revision","valor_cobrado","recordatorio1","recordatorio2","gracias","notas","inicio","fin","nombre","precio"]);function w(e,a){let o=Object.keys(a).filter(n=>_n.has(n));return o.length&&y.prepare(`UPDATE citas SET ${o.map(n=>`${n} = ?`).join(", ")}, actualizado = ? WHERE id = ?`).run(...o.map(n=>typeof a[n]=="boolean"?a[n]?1:0:a[n]??null),h(),e),K(e)}function je(e){y.exec("BEGIN IMMEDIATE");try{let a=e();return y.exec("COMMIT"),a}catch(a){throw y.exec("ROLLBACK"),a}}var Ie=e=>y.prepare("INSERT INTO eventos_capi (wa_id, cita_id, evento, payload, estado, respuesta, ts) VALUES (?,?,?,?,?,?,?)").run(e.wa_id,e.cita_id??null,e.evento,JSON.stringify(e.payload),e.estado,e.respuesta??null,h());var yn=e=>btoa(String.fromCharCode(...e)).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,""),sa=class extends Uint8Array{toString(a){return a==="hex"?[...this].map(o=>o.toString(16).padStart(2,"0")).join(""):a==="base64url"?yn(this):a==="base64"?btoa(String.fromCharCode(...this)):super.toString()}},hn=e=>{let a=new sa(e);return globalThis.crypto.getRandomValues(a),a},En=()=>globalThis.crypto.randomUUID(),qn=(e,a)=>e.length===a.length&&e.every((o,n)=>o===a[n]),xn=()=>{throw new Error("createHmac no est\xE1 disponible en el navegador")},Me={randomBytes:hn,randomUUID:En,timingSafeEqual:qn,createHmac:xn};var N=l.agenda,Sn=e=>Number(l.recursos?.[e]??1);function jn(e){if((l.dias_cerrados||[]).includes(e))return null;let a=l.horario[String(F(e))];return a?[z(a[0]),z(a[1])]:null}function zn(e,a,o=new Set){let n=W(a,e.duracion_min+(N.pausa_entre_citas_min||0));return Xa(e.recurso,a,n).length?!1:Ga(e.recurso,a,n,0).filter(i=>!o.has(i.id)).length<Sn(e.recurso)}function J(e,a,{excluirCitaId:o=0}={}){return ce([e],a,{excluir:new Set([o])})}var Ve=e=>{let a=0;return e.map(o=>{let n=a;return a+=o.duracion_min+(N.pausa_entre_citas_min||0),n})};function ce(e,a,{excluir:o=new Set}={}){let n=e.map(g);if(!n.length||n.some(b=>!b))return[];if(n.some(b=>b.vigente_hasta&&(A()>b.vigente_hasta||a>b.vigente_hasta)))return[];if(a>k(A(),N.dias_adelante||14))return[];let i=jn(a);if(!i)return[];let[s,r]=i,c=Ve(n),t=c.at(-1)+n.at(-1).duracion_min,u=h()+(N.anticipacion_min||0)*6e4,d=[];for(let b=s;b+t<=r;b+=N.intervalo_min||30){let p=`${a}T${aa(b)}`;ie(p)<u||n.every((f,S)=>zn(f,W(p,c[S]),o))&&d.push(aa(b))}return d}var ca=e=>{let a=e.map(g).filter(Boolean);return a.length?Ve(a).at(-1)+a.at(-1).duracion_min:0};function Qa(e,a=10,o={}){let n=A(),i=[];for(let s=0;s<=(N.dias_adelante||14)&&i.length<a;s++){let r=k(n,s),c=J(e,r,o);c.length&&i.push({fecha:r,cupos:c.length})}return i}function ta(e,{excluir:a=new Set}={}){let o=A(),n=[];for(let i=0;i<=(N.dias_adelante||14);i++){let s=k(o,i),r=ce(e,s,{excluir:a});r.length&&n.push({fecha:s,cupos:r.length})}return n}var V=class extends Error{constructor(){super("CUPO_OCUPADO")}},Z=class extends Error{constructor(){super("LIMITE_CITAS")}};function Ka({wa_id:e,servicioId:a,inicio:o,nombre:n,contacto:i={},origen:s="bot",notas:r}){let c=g(a);if(!c)throw new Error("Servicio no existe");return je(()=>{let t=o.slice(0,10);if(!J(a,t).includes(o.slice(11,16)))throw new V;if(s==="bot"&&G(e).length>=(N.max_citas_activas_por_cliente||2))throw new Z;return ra({wa_id:e,nombre:n,servicio_id:c.id,inicio:o,fin:W(o,c.duracion_min+(N.pausa_entre_citas_min||0)),recurso:c.recurso,estado:"agendada",requiere_revision:!!(c.requiere_valoracion||c.revisar_condiciones),precio:c.precio,ad_id:i.ad_id,codigo_anuncio:i.codigo_anuncio,ctwa_clid:i.ctwa_clid,origen:s,notas:r})})}function Za(e,a){let o=K(e);if(!o)throw new Error("Cita no existe");let n=g(o.servicio_id);return je(()=>{if(!J(o.servicio_id,a.slice(0,10),{excluirCitaId:o.id}).includes(a.slice(11,16)))throw new V;return w(o.id,{inicio:a,fin:W(a,n.duracion_min+(N.pausa_entre_citas_min||0)),estado:"agendada",recordatorio1:0,recordatorio2:0})})}function Tn(e){return new Set(G(e).map(a=>a.grupo||`c${a.id}`)).size}function Ja({wa_id:e,servicioIds:a,inicio:o,nombre:n,contacto:i={},origen:s="web",notas:r,token:c,grupo:t}){let u=a.map(g);if(!u.length||u.some(p=>!p))throw new Error("Servicio no existe");let d=Ve(u),b=N.pausa_entre_citas_min||0;return je(()=>{if(!ce(a,o.slice(0,10)).includes(o.slice(11,16)))throw new V;if(s!=="panel"&&Tn(e)>=(N.max_citas_activas_por_cliente||2))throw new Z;return u.map((p,f)=>{let S=W(o,d[f]);return ra({wa_id:e,nombre:n,servicio_id:p.id,inicio:S,fin:W(S,p.duracion_min+b),recurso:p.recurso,estado:"agendada",requiere_revision:!!(p.requiere_valoracion||p.revisar_condiciones),precio:p.precio,ad_id:i.ad_id,codigo_anuncio:i.codigo_anuncio,ctwa_clid:i.ctwa_clid,origen:s,notas:r,token:f===0?c:null,grupo:t})})})}function eo(e,a){let o=[...e].sort((t,u)=>t.inicio.localeCompare(u.inicio)),n=o.map(t=>t.servicio_id),i=n.map(g),s=Ve(i),r=N.pausa_entre_citas_min||0,c=new Set(o.map(t=>t.id));return je(()=>{if(!ce(n,a.slice(0,10),{excluir:c}).includes(a.slice(11,16)))throw new V;return o.map((t,u)=>{let d=W(a,s[u]);return w(t.id,{inicio:d,fin:W(d,i[u].duracion_min+r),estado:"agendada",recordatorio1:0,recordatorio2:0})})})}var R=(e,a)=>(e=String(e??""),e.length>a?e.slice(0,a-1)+"\u2026":e);function An(e){return e.tipo==="texto"?e.texto:e.tipo==="botones"?`${e.texto}
${e.botones.map(a=>`[${a.titulo}]`).join(" ")}`:e.tipo==="lista"?`${e.texto}
${e.secciones.flatMap(a=>a.filas).map(a=>`\u2022 ${a.titulo}${a.descripcion?" \u2014 "+a.descripcion:""}`).join(`
`)}`:e.tipo==="plantilla"?`[Plantilla ${e.nombre}] ${(e.params||[]).join(" | ")}`:JSON.stringify(e)}function Cn(e,a){let o={messaging_product:"whatsapp",recipient_type:"individual",to:e};if(a.tipo==="texto")return{...o,type:"text",text:{body:R(a.texto,4096),preview_url:!1}};if(a.tipo==="botones")return{...o,type:"interactive",interactive:{type:"button",...a.encabezado?{header:{type:"text",text:R(a.encabezado,60)}}:{},body:{text:R(a.texto,1024)},...a.pie?{footer:{text:R(a.pie,60)}}:{},action:{buttons:a.botones.slice(0,3).map(n=>({type:"reply",reply:{id:R(n.id,256),title:R(n.titulo,20)}}))}}};if(a.tipo==="lista"){let n=10,i=a.secciones.map(s=>{let r=s.filas.slice(0,n);return n-=r.length,{title:R(s.titulo||"Opciones",24),rows:r.map(c=>({id:R(c.id,200),title:R(c.titulo,24),...c.descripcion?{description:R(c.descripcion,72)}:{}}))}}).filter(s=>s.rows.length);return{...o,type:"interactive",interactive:{type:"list",...a.encabezado?{header:{type:"text",text:R(a.encabezado,60)}}:{},body:{text:R(a.texto,4096)},...a.pie?{footer:{text:R(a.pie,60)}}:{},action:{button:R(a.boton||"Ver opciones",20),sections:i}}}}if(a.tipo==="plantilla"){let n=[];return a.params?.length&&n.push({type:"body",parameters:a.params.map(i=>({type:"text",text:String(i)}))}),(a.botones_payload||[]).forEach((i,s)=>n.push({type:"button",sub_type:"quick_reply",index:String(s),parameters:[{type:"payload",payload:i}]})),{...o,type:"template",template:{name:a.nombre,language:{code:a.idioma||m.WA_TEMPLATE_LANG},components:n}}}throw new Error("Tipo de mensaje desconocido: "+a.tipo)}async function oo(e,a){let o=`https://graph.facebook.com/${m.META_GRAPH_VERSION}/${e}`,n=await fetch(o,{method:"POST",headers:{Authorization:`Bearer ${m.WA_TOKEN}`,"Content-Type":"application/json"},body:JSON.stringify(a)}),i=await n.json().catch(()=>({}));if(!n.ok)throw new Error(`Graph ${n.status}: ${JSON.stringify(i.error||i)}`);return i}async function H(e,a,{autor:o="bot"}={}){let n=null,i=null,s=oe()||String(e).startsWith("sim");if(!s)try{n=(await oo(`${m.WA_PHONE_NUMBER_ID}/messages`,Cn(e,a))).messages?.[0]?.id||null}catch(r){i=r.message,console.error("[whatsapp] error enviando a",e,r.message)}return De({wa_id:e,direccion:"out",tipo:a.tipo,cuerpo:An(a)+(i?`
\u26A0\uFE0F No enviado: ${i}`:""),payload:a,wamid:n,autor:o}),i||q(e,{ultimo_saliente:h()}),{ok:!i,wamid:n,simulado:s,error:i}}async function no(e){if(!(oe()||!e||String(e).startsWith("sim")))try{await oo(`${m.WA_PHONE_NUMBER_ID}/messages`,{messaging_product:"whatsapp",status:"read",message_id:e})}catch{}}var wn=()=>!!(m.META_DATASET_ID&&m.META_CAPI_TOKEN&&m.WA_BUSINESS_ACCOUNT_ID);function Pn({evento:e,ctwa_clid:a,valor:o,eventId:n}){return{event_name:e,event_time:Math.floor(h()/1e3),event_id:n,action_source:"business_messaging",messaging_channel:"whatsapp",user_data:{whatsapp_business_account_id:m.WA_BUSINESS_ACCOUNT_ID,ctwa_clid:a},...o!=null?{custom_data:{currency:l.moneda||"COP",value:Number(o)}}:{}}}async function io({wa_id:e,cita_id:a,evento:o,ctwa_clid:n,valor:i}){if(!n)return{omitido:"sin ctwa_clid (no vino de anuncio CTWA)"};let s=Pn({evento:o,ctwa_clid:n,valor:i,eventId:`vs-${a||e}-${o}`});if(!wn())return Ie({wa_id:e,cita_id:a,evento:o,payload:s,estado:"simulado",respuesta:"CAPI no configurada (faltan META_DATASET_ID / token / WABA)"}),{simulado:!0};try{let r=await fetch(`https://graph.facebook.com/${m.META_GRAPH_VERSION}/${m.META_DATASET_ID}/events?access_token=${encodeURIComponent(m.META_CAPI_TOKEN)}`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({data:[s]})}),c=await r.json().catch(()=>({}));return Ie({wa_id:e,cita_id:a,evento:o,payload:s,estado:r.ok?"enviado":"error",respuesta:JSON.stringify(c)}),{ok:r.ok,respuesta:c}}catch(r){return Ie({wa_id:e,cita_id:a,evento:o,payload:s,estado:"error",respuesta:r.message}),{ok:!1,error:r.message}}}var He=e=>io({wa_id:e.wa_id,cita_id:e.id,evento:m.CAPI_EVENT_CITA,ctwa_clid:e.ctwa_clid}),ro=e=>io({wa_id:e.wa_id,cita_id:e.id,evento:m.CAPI_EVENT_ASISTIO,ctwa_clid:e.ctwa_clid,valor:e.valor_cobrado??e.precio??0});var P=e=>String(e||"").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g,"").replace(/\s+/g," ").trim(),da=(e,a)=>{let o=` ${P(e)} `;return a.some(n=>o.includes(P(n)))},X=(e,a)=>a.test(P(e));function ua(e){let a=P(e);for(let o of j)for(let n of o.codigos_anuncio||[])if(new RegExp(`\\b${P(n)}\\b`).test(a))return{codigo:n.toUpperCase(),servicio:o.id};return null}function fe(e){let a=ua(e);if(a)return a.servicio;let o=null,n=0,i=` ${P(e)} `;for(let s of j)for(let r of[s.nombre,...s.claves||[]]){let c=P(r);i.includes(c)&&c.length>n&&(o=s.id,n=c.length)}return o}var Rn=e=>e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),co=e=>{let a=P(e);return(l.palabras_baja||[]).some(o=>new RegExp(`(^|[^a-z0-9])${Rn(P(o))}([^a-z0-9]|$)`).test(a))},to=e=>da(e,l.palabras_asesora||[]),Fe=e=>da(e,l.palabras_sensibles||[]),lo=e=>X(e,/^(hola|holi|buen[oa]s|buen dia|buenas tardes|buenas noches|hey|que tal)\b/),uo=e=>X(e,/^(si|sii+|sip|claro|dale|listo|ok|okay|de una|perfecto|confirmo|confirmar|correcto|vale|bueno)\b/),po=e=>X(e,/^(no|nop|nel|todavia no|aun no|despues|luego)\b/),te=e=>X(e,/\b(agendar|agenda|agendo|cita|reservar|reserva|apartar|separar|turno|disponibilidad|cupo|cupos|horario disponible|cuando hay)\b/),mo=e=>X(e,/\b(cancelar|cancela|cancelo|anular|no puedo ir|no voy a poder)\b/),bo=e=>X(e,/\b(reprogramar|cambiar (la |mi )?(cita|hora|fecha)|mover (la |mi )?cita|otro dia|otra hora|aplazar|correr la cita)\b/),pa=e=>X(e,/\b(precio|precios|valor|cuanto (vale|cuesta|es|sale|cobran)|costo|tarifa|promo|promocion|descuento)\b/),go=e=>X(e,/^(menu|inicio|empezar|volver|opciones|servicios)$|\b(ver|conocer|cuales son|que) (los |sus |todos los )?(servicios|tratamientos)\b/),fo=e=>X(e,/^(gracias|muchas gracias|mil gracias|ok gracias|listo gracias)\b/);function ma(e){for(let a of l.faq||[])if(da(e,a.claves))return a;return null}function Be(e){let a=P(e),o=A();if(/\bpasado manana\b/.test(a))return k(o,2);if(/\bmanana\b/.test(a)&&!/\b(en|por|de) la manana\b/.test(a))return k(o,1);if(/\bhoy\b/.test(a))return o;let n=["domingo","lunes","martes","miercoles","jueves","viernes","sabado"];for(let c=0;c<7;c++)if(new RegExp(`\\b${n[c]}\\b`).test(a)){let t=(c-F(o)+7)%7;return t===0&&(t=/\b(proximo|siguiente|que viene)\b/.test(a)?7:0),k(o,t)}let i=a.match(/\b(\d{1,2})[/-](\d{1,2})(?:[/-](\d{2,4}))?\b/),s,r;if(i)s=+i[1],r=+i[2];else{let c=Ha.map(P);i=a.match(new RegExp(`\\b(\\d{1,2})\\s*(?:de\\s+)?(${c.join("|")})`)),i&&(s=+i[1],r=c.indexOf(i[2])+1)}if(s&&r>=1&&r<=12&&s>=1&&s<=31){let c=+o.slice(0,4),t=`${c}-${String(r).padStart(2,"0")}-${String(s).padStart(2,"0")}`;return t<o&&(t=`${c+1}${t.slice(4)}`),t}return null}function ba(e){let a=P(e).replace(/\./g,""),o=a.match(/\b(\d{1,2})(?:[:h](\d{2}))?\s*(am|pm|a m|p m|de la manana|de la tarde|de la noche|del mediodia)?\b/);if(o&&!/\b\d{1,2}[/-]\d{1,2}\b/.test(a)){let n=+o[1],i=o[2]?+o[2]:0,s=o[3]||"";if(n<=23&&i<60)return(/pm|p m|tarde|noche/.test(s)&&n<12||!s&&n>=1&&n<=6)&&(n+=12),{hhmm:`${String(n).padStart(2,"0")}:${String(i).padStart(2,"0")}`}}return/\b(en|por|de) la manana\b|\btemprano\b/.test(a)?{franja:"manana"}:/\b(en|por|de) la tarde\b|\bmediodia\b|\bdespues de almuerzo\b/.test(a)?{franja:"tarde"}:null}function ze(e){let a=String(e||"").trim().replace(/^(me llamo|mi nombre es|soy|es|a nombre de|nombre:?)\s+/i,"").replace(/[^\p{L}\s'-]/gu," ").replace(/\s+/g," ").trim();return!a||a.length<2||a.split(" ").length>5?null:a.split(" ").map(o=>o.charAt(0).toUpperCase()+o.slice(1).toLowerCase()).join(" ")}var Ue=e=>` ${P(e).replace(/[^a-z0-9]+/g," ").trim()} `;function ke(e){let a=Ue(e),o=[];for(let i of j)for(let s of[i.nombre,...i.claves||[]]){let r=Ue(s).trim();r.length>=4&&o.push({id:i.id,k:r})}o.sort((i,s)=>s.k.length-i.k.length);let n=[];for(let{id:i,k:s}of o){let r=a.indexOf(` ${s} `);r>=0&&(n.includes(i)||n.push(i),a=a.slice(0,r)+" ".repeat(s.length+1)+a.slice(r+s.length+1))}return n}function vo(e){let a=Ue(e),o=null,n=0,i=A(),s=new Set(j.filter(r=>!r.vigente_hasta||i<=r.vigente_hasta).map(r=>r.categoria));for(let r of Ia.filter(c=>s.has(c.nombre)))for(let c of[r.nombre,...r.claves||[]]){let t=Ue(c).trim();t.length>=3&&a.includes(` ${t} `)&&t.length>n&&(o=r.nombre,n=t.length)}return o}function _o(e){let a=P(e);return/\b(contraindicaci|quien no puede|quienes no pueden|no se recomienda|efectos? secundarios?|riesgos?|es seguro|tiene peligro|puedo hacerme|puedo hacerlo|me lo puedo hacer|restricci)/.test(a)?"contraindicaciones":/\b(retoque|retocar)/.test(a)?"retoque":/\b(abono|pagar|cuotas|financi|fiado|forma de pago|formas de pago|pago por sesion)/.test(a)?"pago":/\b(cuantas sesiones|numero de sesiones|cada cuanto|frecuencia|cuantas veces|cuanto tiempo dura el tratamiento|protocolo)/.test(a)?"sesiones":/\b(resultados?|cuando (se )?(ve|veo|ven|notan|notare)|cuanto (dura|duran) (el )?(efecto|resultado)|efecto dura|permanente|definitiv)/.test(a)?"resultados":/\b(duele|dolor|doloroso|molest|anestesia|aguanta)/.test(a)?"dolor":/\b(cuidados|recomendacion|recomendaciones|que debo hacer|antes de (la|mi) (cita|sesion)|despues de|post ?tratamiento|instrucciones|indicaciones|prepararme|como me preparo)/.test(a)?"cuidados":/\b(cuanto (dura|demora|tarda|se demora)|duracion|cuanto tiempo|que tanto dura)/.test(a)?"duracion":/\b(que incluye|que trae|que hacen|en que consiste|procedimiento|como es|que se hace)/.test(a)?"incluye":null}function yo(e){let a=P(e),o=[[/\b(me da miedo|tengo miedo|me asusta|nerviosa|nervioso|nervios|me da susto|inseguro|insegura)\b/,"Es totalmente normal sentir nervios antes de un tratamiento; vamos paso a paso y te explico todo antes de que decidas nada."],[/\b(primera vez|nunca me he hecho|nunca he ido|no se por donde empezar|no sé por dónde empezar)\b/,"Qu\xE9 bueno que te animes a dar este primer paso. Te acompa\xF1o con calma para que elijas lo que realmente te conviene."],[/\b(estresad|agotad|cansad|agotamiento|burnout|no puedo mas|no aguanto)\b/,"Siento que vengas con tanto cansancio; mereces una pausa. Veamos qu\xE9 te puede hacer bien."],[/\b(me siento mal con mi (piel|cuerpo|cara)|me averguenza|me da verguenza|me acomplejo|complejo|acomplejad|no me gusta mi (piel|cuerpo|cara))\b/,"Gracias por cont\xE1rmelo con confianza. Hay tratamientos que pueden ayudarte y lo importante es elegir el adecuado para tu caso; te oriento sin ning\xFAn apuro."],[/\b(urgente|tengo prisa|rapido|rápido|a las carreras|estoy afanada|estoy afanado)\b/,"Voy directo al grano para que ahorres tiempo."],[/\b(cumpleanos|cumpleaños|aniversario|boda|matrimonio|evento|viaje|graduacion|graduación)\b/,"\xA1Qu\xE9 bonita ocasi\xF3n! Hagamos que llegues radiante."]];for(let[n,i]of o)if(n.test(a))return i;return null}var ho=()=>(m.PUBLIC_URL||`http://localhost:${m.PORT}`).replace(/\/+$/,"");function We({servicio:e,cod:a,fuente:o}={}){let n=new URL(`${ho()}/reservas/reservar`);return e&&n.searchParams.set("servicio",e),a&&n.searchParams.set("cod",a),o&&n.searchParams.set("src",o),n.toString()}var Ge=e=>`${ho()}/reservas/cita/${e}`,fa=()=>String(m.WA_PUBLIC_NUMBER||l.web?.whatsapp||"").replace(/\D/g,"")||null;function va(e){let a=fa();return a?`https://wa.me/${a}?text=${encodeURIComponent(e)}`:null}var _a=/\bVS-[A-HJ-NP-Z2-9]{6}\b/i;var ya=null;async function Nn(){return m.ANTHROPIC_API_KEY?(ya||(ya=Promise.resolve().then(()=>(qo(),Eo)).then(({default:e})=>new e({apiKey:m.ANTHROPIC_API_KEY,timeout:2e4,maxRetries:1})).catch(e=>(console.warn("[ia] @anthropic-ai/sdk no disponible:",e.message),null))),ya):null}var xo=()=>!!m.ANTHROPIC_API_KEY,Ln=e=>e.precio?`$${Number(e.precio).toLocaleString("es-CO")} COP${e.precio_nota?` (${e.precio_nota})`:""}`:`por confirmar${e.precio_nota?` \u2014 ${e.precio_nota}`:""} (no lo inventes; di que el equipo confirma el valor)`,Dn=e=>!e.vigente_hasta||be().slice(0,10)<=e.vigente_hasta,On=()=>`Eres el asistente de atenci\xF3n 24/7 de ${l.nombre} (${l.ciudad}), centro de cuidado facial y corporal que combina aparatolog\xEDa de \xFAltima generaci\xF3n, est\xE9tica m\xE9dica y armonizaci\xF3n facial, terapias biol\xF3gicas (PRP, enzimas, sueroterapia) y experiencias de bienestar y spa.
Tono: profesional, c\xE1lido, emp\xE1tico y confiable; transmites seguridad cl\xEDnica sin perder cercan\xEDa. Espa\xF1ol de Colombia, frases cortas, m\xE1ximo un emoji, sin diminutivos.

FLUJO IDEAL
1) Saluda y descubre el objetivo (rejuvenecimiento, manchas, acn\xE9, depilaci\xF3n, relajaci\xF3n, reducci\xF3n de medidas, post operatorio...).
2) Recomienda 1 o 2 tratamientos acordes, explicando brevemente en qu\xE9 consisten, qu\xE9 incluyen, duraci\xF3n y precio.
3) Filtro de seguridad: antes de confirmar viabilidad en procedimientos con l\xE1ser, \xE1cidos, inyectables o aparatolog\xEDa, advierte con amabilidad las principales contraindicaciones (embarazo, lactancia, isotretino\xEDna/Roaccutan, marcapasos, diabetes no controlada) y las espec\xEDficas del servicio.
4) Cierra hacia el agendamiento e informa los requisitos previos del servicio (por ejemplo, venir rasurada el mismo d\xEDa para l\xE1ser diodo, o cabello lavado para PRP).

REGLAS CR\xCDTICAS
- No inventes precios, duraciones, promociones ni disponibilidad: solo lo que est\xE1 en la informaci\xF3n del centro. La disponibilidad la muestra el sistema de agenda.
- Mesoterapia facial, sueroterapia endovenosa y remoci\xF3n de tatuajes: nunca des un precio fijo; el valor depende del c\xF3ctel/suero o del tatuaje; ofrece agendar valoraci\xF3n. Subcisi\xF3n: \xABdesde $150.000 seg\xFAn las \xE1reas tratadas\xBB. Cauterizaci\xF3n: el valor puede variar seg\xFAn el tama\xF1o de la lesi\xF3n.
- Paquetes: Reductor intensivo ($1.000.000): 50% al iniciar y saldo a m\xE1s tardar en la 5.\xAA sesi\xF3n. Gl\xFAteos de acero ($1.100.000): 50% al iniciar y 50% a mitad del tratamiento. Post operatorio de 20 sesiones ($1.150.000): aplica con pago total.
- Alertas obligatorias: Botox, prohibido el alcohol durante los 4 d\xEDas posteriores. PRP, si aparece hematoma evitar el sol hasta que desaparezca (riesgo de melasma). Cauterizaci\xF3n: los lunares benignos requieren valoraci\xF3n previa y jam\xE1s se cauterizan lesiones sospechosas.
- Retoques: micropigmentaci\xF3n $150.000 solo dentro de 40 d\xEDas; extensi\xF3n de pesta\xF1as $60.000 solo si conserva extensiones (montura nueva $70.000); lifting de pesta\xF1as $50.000 antes de 2 meses (despu\xE9s $65.000).
- No des consejo m\xE9dico ni diagnostiques. Si mencionan embarazo, cirug\xEDas, medicamentos o enfermedades, informa las contraindicaciones del servicio, aclara que una asesora revisa su caso y marca derivar_asesora=true.
- Nunca prometas resultados, ausencia de dolor ni un n\xFAmero fijo de sesiones para todas las personas: cada piel responde distinto; da los rangos que aparecen en la informaci\xF3n.
- Si algo no est\xE1 en la informaci\xF3n, no lo supongas: di que una asesora lo confirma y marca derivar_asesora=true.
- Si la persona quiere agendar, usa intencion="agendar" y el servicio_id si lo identificas.

MANEJO DE OBJECIONES (siempre con empat\xEDa, sin presionar ni inventar urgencia)
- \xABEs caro / hay descuento\xBB: valida su preocupaci\xF3n, explica el valor (aparatolog\xEDa, protocolo, seguimiento), ofrece sesi\xF3n individual o paquete con abono seg\xFAn corresponda y la opci\xF3n que mejor se ajuste a su presupuesto; las promociones solo si est\xE1n en la informaci\xF3n.
- \xABLo voy a pensar\xBB: respeta su tiempo, ofrece resolver dudas (cuidados, sesiones, contraindicaciones) y deja la puerta abierta a agendar cuando quiera.
- \xABMe da miedo / \xBFduele?\xBB: normaliza la inquietud; explica qu\xE9 se usa para el confort (anestesia, crioterapia, tecnolog\xEDa Soprano) y qu\xE9 esperar; ofrece hablar con una asesora.
- \xAB\xBFEs seguro? \xBFQui\xE9n lo hace? \xBFGarantizan resultados?\xBB: seguridad primero (revisi\xF3n de contraindicaciones y valoraci\xF3n); sin promesas de resultados id\xE9nticos; ofrece que una asesora confirme datos del equipo.
- Menores: Spa Ni\xF1as (4 a 10 a\xF1os, plan grupal de 3 a 4 ni\xF1as); Gl\xFAteos de acero apto para menores con permiso de sus padres; Tensamax no es para menores de 14 a\xF1os.

Informaci\xF3n del centro (\xDANICA fuente v\xE1lida):
- Direcci\xF3n: ${l.direccion}
- Horario: ${l.horario_texto}
- Pol\xEDtica de cambios: ${l.politica_cambios}
- Cat\xE1logo (id \u2014 nombre \xB7 categor\xEDa \xB7 valor \xB7 duraci\xF3n):
${j.filter(Dn).map(e=>`  \u2022 ${e.id} \u2014 ${e.nombre} \xB7 ${e.categoria} \xB7 ${Ln(e)} \xB7 ${e.duracion_texto||"duraci\xF3n por confirmar"}${e.paquete?" \xB7 paquete":""}${e.vigente_hasta?` \xB7 promoci\xF3n hasta ${e.vigente_hasta}`:""}`).join(`
`)}

Formato: respuesta de m\xE1ximo 450 caracteres (550 si debes enumerar contraindicaciones).`;function In(e,a){let o=new Set(ke([e,...a.slice(-4).map(i=>i.cuerpo)].join(" . "))),n=[["descripcion","Descripci\xF3n"],["incluye","Incluye"],["procedimiento","Procedimiento"],["indicado_para","Indicado para"],["sesiones","Sesiones"],["resultados","Resultados"],["cuidados","Cuidados"],["retoque","Retoque"],["pago","Pago"],["dolor","Dolor"],["contraindicaciones","Contraindicaciones"],["alerta","Alerta"]];return[...o].slice(0,3).map(i=>j.find(s=>s.id===i)).filter(Boolean).map(i=>`## ${i.nombre} (id: ${i.id})
${n.filter(([s])=>i[s]).map(([s,r])=>`${r}: ${i[s]}`).join(`
`)}`).join(`

`)}var Mn={type:"object",properties:{intencion:{type:"string",enum:["agendar","info_servicio","pregunta","cancelar","reprogramar","asesora","saludo","otro"]},servicio_id:{type:["string","null"],enum:[...j.map(e=>e.id),null]},respuesta:{type:"string"},derivar_asesora:{type:"boolean"}},required:["intencion","servicio_id","respuesta","derivar_asesora"],additionalProperties:!1},Vn=e=>/^claude-(opus-5-5|opus-5|fable-5-1|sonnet-5-5)$/.test(e);async function So(e,a=[]){let o=await Nn();if(!o)return null;let n=a.slice(-6).map(r=>`${r.direccion==="in"?"Cliente":"Asistente"}: ${String(r.cuerpo).slice(0,300)}`).join(`
`),i=In(e,a),s={model:m.CLAUDE_MODEL,max_tokens:2e3,system:[{type:"text",text:On(),cache_control:{type:"ephemeral"}},...i?[{type:"text",text:`Detalle de los servicios de esta conversaci\xF3n:
${i}`}]:[]],output_config:{effort:"low",format:{type:"json_schema",schema:Mn}},messages:[{role:"user",content:`${n?`Conversaci\xF3n reciente:
${n}

`:""}\xDAltimo mensaje del cliente:
${e}`}]};try{let r=Vn(m.CLAUDE_MODEL)?await o.beta.messages.create({...s,betas:["server-side-fallback-2026-07-01"],fallbacks:"default"}):await o.messages.create(s);if(r.stop_reason==="refusal"||r.stop_reason==="max_tokens")return null;let c=r.content.find(u=>u.type==="text");if(!c)return null;let t=JSON.parse(c.text);return t.respuesta=String(t.respuesta||"").slice(0,600),t}catch(r){return console.warn("[ia] fallo, se contin\xFAa con reglas:",r?.status||"",r?.message),null}}var jo=36e5,Hn=24*jo-10*6e4,Un=12*jo,_=e=>({tipo:"texto",texto:e}),O=(e,a,o={})=>({tipo:"botones",texto:e,botones:a,...o}),ye=(e,a,o,n={})=>({tipo:"lista",texto:e,boton:a,secciones:o,...n}),Te=e=>e.charAt(0).toUpperCase()+e.slice(1),Ae=e=>(e.nombre||e.nombre_perfil||"").split(" ")[0],he=e=>e.precio?`$${Number(e.precio).toLocaleString("es-CO")}${e.precio_nota?` (${e.precio_nota.toLowerCase()})`:""}`:e.precio_nota?`${e.precio_nota.toLowerCase()}; te lo confirma el equipo al agendar`:"te lo confirma el equipo al agendar",Fn=e=>e.replace(/\{(\w+)\}/g,(a,o)=>l[o]??"").replace(/\s+$/,"").trim(),Sa=e=>!!e?.ultimo_entrante&&h()-e.ultimo_entrante<Hn;function Bn(){let e=be(),a=e.slice(0,10);if((l.dias_cerrados||[]).includes(a))return!1;let o=l.horario[String(F(a))];if(!o)return!1;let n=z(e.slice(11,16));return n>=z(o[0])&&n<z(o[1])}var ee={id:"act:asesora",titulo:"Hablar con asesora"};function zo(e){let a=Ae(e);return`Hola${a?" "+a:""} \u{1F499} gracias por escribir a ${l.nombre}. Estamos en ${l.direccion}. Cu\xE9ntame qu\xE9 te gustar\xEDa cuidar o mejorar y te recomiendo lo que mejor te quede; si ya sabes qu\xE9 tratamiento quieres, te muestro horarios en un momento.`}var ja=e=>String(e).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g,"").replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,""),za=()=>{let e=new Map,a=be().slice(0,10);for(let o of j)o.categoria&&(!o.vigente_hasta||a<=o.vigente_hasta)&&e.set(o.categoria,[...e.get(o.categoria)||[],o]);return e},To=e=>e.precio?`$${Number(e.precio).toLocaleString("es-CO")}`:e.precio_nota||"Valor por confirmar";function kn(e){let a=[...za()].slice(0,9);return ye(e,"Ver categor\xEDas",[{titulo:"Categor\xEDas",filas:[...a.map(([o,n])=>({id:`cat:${ja(o)}:0`,titulo:o.slice(0,24),descripcion:`${n.length} ${n.length===1?"servicio":"servicios"}`})),{id:"act:asesora",titulo:"Hablar con asesora",descripcion:"Una persona del equipo te atiende"}]}])}function Ao(e,a,o=0){let n=[...za()].find(([d])=>ja(d)===a);if(!n)return D(e);let[i,s]=n,r=8,c=o*r,u=s.slice(c,c+r).map(d=>({id:`svc:${d.id}`,titulo:(d.nombre_corto||d.nombre).slice(0,24),descripcion:To(d).slice(0,72)}));return c+r<s.length&&u.push({id:`cat:${a}:${o+1}`,titulo:"Ver m\xE1s",descripcion:`${s.length-c-r} m\xE1s en ${i}`.slice(0,72)}),u.push({id:"act:menu",titulo:"Ver categor\xEDas",descripcion:"Volver al inicio"}),e.decir(ye(`*${i}*
\xBFCu\xE1l te interesa?`,"Ver opciones",[{titulo:i.slice(0,24),filas:u}]))}function Wn(e="\xBFPor d\xF3nde empezamos? Elige una categor\xEDa y te cuento todo con calma."){return j.length>8&&za().size>1?kn(e):ye(e,"Ver servicios",[{titulo:"Servicios",filas:[...j.map(a=>({id:`svc:${a.id}`,titulo:a.nombre_corto||a.nombre,descripcion:`${a.duracion_min} min aprox.${a.requiere_valoracion?" \xB7 con orientaci\xF3n previa":""}`})),{id:"act:asesora",titulo:"Hablar con asesora",descripcion:"Una persona del equipo te atiende"}]}])}var de=e=>e.incluye&&!String(e.incluye).startsWith(`${e.nombre}, con atenci\xF3n`)?e.incluye:null;function Gn(e){let a=[`*${e.nombre}*`,e.descripcion,"",...de(e)?[`\u2022 Incluye: ${de(e)}`]:[],`\u2022 Duraci\xF3n: ${e.duracion_texto||"te la confirma el equipo al agendar"}`,`\u2022 Valor: ${he(e)}`,...e.pago?[`\u2022 Forma de pago: ${e.pago}`]:[],...e.sesiones?[`\u2022 Sesiones: ${e.sesiones}`]:[]];return e.alerta&&a.push("",`\u26A0\uFE0F ${e.alerta}`),e.requiere_valoracion?a.push("","La primera cita es de orientaci\xF3n: el equipo revisa tu caso y define contigo el plan. No hay un n\xFAmero de sesiones igual para todas las personas."):e.revisar_condiciones&&a.push("","Antes de la cita una asesora revisa tu caso contigo para confirmar que el servicio es adecuado para ti."),m.PUBLIC_URL&&a.push("",`Tambi\xE9n puedes reservar en l\xEDnea: ${We({servicio:e.id,fuente:"bot"})}`),a.push("","\xBFQuieres que busquemos un horario?"),e.contraindicaciones&&a.push("","Antes de agendar, revisa las contraindicaciones en \xABM\xE1s informaci\xF3n\xBB."),O(a.join(`
`),[{id:`act:agendar:${e.id}`,titulo:"Agendar cita"},{id:`inf:mas:${e.id}`,titulo:"M\xE1s informaci\xF3n"},{id:"act:menu",titulo:"Ver otro servicio"}])}function Xn(e,a){let o=Ae(a),n=(r,c)=>{let t=String(r||"").replace(/\s+/g," ").trim();if(t.length<=c)return t;let u=t.slice(0,c),d=Math.max(u.lastIndexOf(". "),u.lastIndexOf("; "));return d>60?u.slice(0,d+1):u.replace(/[ ,;]+\S*$/,"")+"\u2026"},i=[`${o?o+", ":""}te cuento lo esencial de *${e.nombre}* \u{1F499}`,"",`\u2022 Valor: ${he(e)}`,`\u2022 Duraci\xF3n: ${e.duracion_texto||"te la confirma el equipo al agendar"}`],s=e.cuidados?n(e.cuidados,190):l.indicaciones_generales||"";return s&&i.push(`\u2022 Recomendaciones: ${s}`),e.alerta&&i.push(`\u26A0\uFE0F ${n(e.alerta,170)}`),e.revisar_condiciones&&i.push("\u2022 Una asesora revisa tu caso antes de la cita para cuidarte bien."),i.push("","Si quieres m\xE1s detalle (procedimiento, sesiones o contraindicaciones), p\xEDdemelo cuando quieras. Ahora cu\xE9ntame para qu\xE9 d\xEDa te gustar\xEDa agendar \u{1F447}"),i.join(`
`)}var Yn=[["procedimiento","Procedimiento en cabina"],["indicado_para","Indicado para"],["sesiones","Sesiones"],["resultados","Resultados"],["cuidados","Cuidados y recomendaciones"],["retoque","Retoques"],["pago","Forma de pago"],["contraindicaciones","Contraindicaciones"]];function Qn(e){let a=[`*${e.nombre}*`];de(e)&&a.push(`*Qu\xE9 incluye:* ${de(e)}`);for(let[o,n]of Yn)e[o]&&a.push(`*${n}:* ${e[o]}`);return e.alerta&&a.push(`\u26A0\uFE0F ${e.alerta}`),a.length===1&&a.push("El equipo te explica el protocolo completo en la cita o con una asesora."),e.contraindicaciones&&a.push("Si alguna de estas condiciones aplica en tu caso, cu\xE9ntanoslo: una asesora revisa tu caso antes de la cita (esto no reemplaza una valoraci\xF3n m\xE9dica)."),a.join(`

`).slice(0,3900)}function Kn(e,a,o){let n=[{id:`act:agendar:${a.id}`,titulo:"Agendar cita"},{id:`inf:mas:${a.id}`,titulo:"M\xE1s informaci\xF3n"},ee],i={contraindicaciones:a.contraindicaciones&&`Para *${a.nombre}* se tienen en cuenta estas contraindicaciones: ${a.contraindicaciones}${a.alerta?`

\u26A0\uFE0F ${a.alerta}`:""}

Si alguna aplica para ti, una asesora revisa tu caso antes de la cita (esto no reemplaza una valoraci\xF3n m\xE9dica).`,cuidados:(a.cuidados||a.alerta)&&`Cuidados y recomendaciones de *${a.nombre}*: ${a.cuidados||""}${a.alerta?`

\u26A0\uFE0F ${a.alerta}`:""}`,sesiones:a.sesiones&&`Sobre las sesiones de *${a.nombre}*: ${a.sesiones}`,resultados:(a.resultados||a.sesiones)&&`Sobre los resultados de *${a.nombre}*: ${a.resultados||""}${a.resultados&&a.sesiones?" ":""}${a.sesiones?`Sesiones: ${a.sesiones}`:""} Cada persona responde distinto, por eso no prometemos resultados id\xE9nticos.`,dolor:Zn(a),duracion:`${a.nombre}: ${a.duracion_texto?`dura ${a.duracion_texto.toLowerCase()}`:"la duraci\xF3n te la confirma el equipo al agendar"}.`,incluye:(de(a)||a.procedimiento)&&`*${a.nombre}*${de(a)?` incluye: ${de(a)}`:""}${a.procedimiento?`

En cabina: ${a.procedimiento}`:""}`,pago:a.pago?`Forma de pago de *${a.nombre}*: ${a.pago}`:`Para *${a.nombre}* el valor es ${he(a)}. Los medios de pago te los confirma el equipo al momento de tu cita.`,retoque:a.retoque&&`Retoques de *${a.nombre}*: ${a.retoque}`}[o];e.decir(O((i||`Esa informaci\xF3n de *${a.nombre}* te la confirma una asesora del equipo, para no darte datos imprecisos.`).slice(0,1e3),n))}function Zn(e){let a=(e.procedimiento||"").toLowerCase(),o=["anestesia","crioterapia"].filter(i=>a.includes(i)),n=e.dolor||(o.length?`En *${e.nombre}* se usa ${o.join(" y ")} para que la experiencia sea m\xE1s llevadera.`:null);return`${n?n+" ":""}La sensibilidad es distinta en cada persona; si te da inquietud, una asesora puede explicarte qu\xE9 esperar antes de decidir.`}function Jn(e,a){let o=a.map(g).filter(Boolean).slice(0,8),n=o.filter(c=>c.precio),i=o.filter(c=>!c.precio),s=n.reduce((c,t)=>c+Number(t.precio),0),r=["Te armo la cotizaci\xF3n:","",...o.map(c=>`\u2022 ${c.nombre}: ${To(c)}`),""];r.push(n.length?`Total de lo que tiene valor definido: $${s.toLocaleString("es-CO")}${i.length?`, m\xE1s ${i.length} por confirmar`:""}.`:"Estos valores te los confirma el equipo seg\xFAn tu caso."),o.some(c=>/láser diodo/i.test(c.nombre))&&r.push("El l\xE1ser diodo se cobra por sesi\xF3n y por zona; se recomiendan varias sesiones."),o.some(c=>c.paquete)&&r.push("Los paquetes se pagan seg\xFAn su pol\xEDtica (por ejemplo, abono al iniciar)."),m.PUBLIC_URL&&r.push("",`Puedes reservar todo junto en l\xEDnea: ${We({servicio:o.map(c=>c.id).join(",").slice(0,200),fuente:"bot"})}`),e.ir("info_servicio",{servicio:o[0].id}),q(e.c.wa_id,{servicio_interes:o[0].id}),x(e.c.wa_id,n.length?"Precio enviado":"Orientado"),e.decir(O(r.join(`
`),[{id:`act:agendar:${o[0].id}`,titulo:`Agendar ${(o[0].nombre_corto||o[0].nombre).slice(0,11)}`},{id:"act:menu",titulo:"Ver servicios"},ee]))}function Xe(e,a){let o=g(a.servicio),n=a.inicio.slice(0,10),i=a.inicio.slice(11,16),s=a.reprogramar?"Revisemos el nuevo horario de tu cita:":"Revisemos tu cita:";return O([s,"",`\u2022 Servicio: ${o.nombre}${o.requiere_valoracion?" (cita de orientaci\xF3n)":""}`,`\u2022 Fecha: ${Q(n)}`,`\u2022 Hora: ${$(i)}`,`\u2022 A nombre de: ${e.nombre||a.nombre||e.nombre_perfil||"\u2014"}`,`\u2022 Valor: ${he(o)}`,`\u2022 Lugar: ${l.direccion}`,"","\xBFLa confirmo?"].join(`
`),[{id:"conf:si",titulo:"Confirmar"},{id:"conf:cambiar",titulo:"Cambiar horario"},ee])}var Ea=class{constructor(a){this.c=a,this.salida=[],this.datos={...a.estado_datos||{}},this.estado=a.estado||null}decir(...a){this.salida.push(...a)}ir(a,o){this.estado=a,o&&(this.datos={...this.datos,...o})}limpiar(){this.estado=null,this.datos={}}};function ve(e,a){let o=g(a);if(!o)return D(e);delete e.datos.reprogramar,e.ir("info_servicio",{servicio:o.id}),q(e.c.wa_id,{servicio_interes:o.id}),x(e.c.wa_id,o.precio?"Precio enviado":"Orientado"),e.decir(Gn(o))}function D(e,a){delete e.datos.reprogramar,e.ir("elegir_servicio",{servicio:null}),e.decir(Wn(a))}function L(e,a){let o=a||e.datos.servicio||e.c.servicio_interes;if(!o||!g(o))return D(e,"\xBFQu\xE9 servicio quieres agendar?");let n=g(o),i=Qa(o,10,{excluirCitaId:e.datos.reprogramar||0});if(e.ir("elegir_dia",{servicio:o,fecha:null,inicio:null}),q(e.c.wa_id,{servicio_interes:o}),x(e.c.wa_id,"Orientado"),!i.length)return e.decir(_(`En este momento no tengo cupos en l\xEDnea para ${n.nombre} en los pr\xF3ximos d\xEDas.`)),ue(e,"sin_cupos");e.decir(ye(`${e.datos.servicio===o&&e.datos._acompanado?"":"Genial, te acompa\xF1o con la cita. "}\xBFQu\xE9 d\xEDa te queda m\xE1s c\xF3modo para ${n.nombre}?`,"Ver d\xEDas",[{titulo:"D\xEDas con cupo",filas:i.map(s=>({id:`day:${s.fecha}`,titulo:Te(Ua(s.fecha)),descripcion:`${s.cupos} horario${s.cupos===1?"":"s"} disponible${s.cupos===1?"":"s"}`}))}],{pie:'Tambi\xE9n puedes escribirlo: "el s\xE1bado" o "ma\xF1ana en la tarde"'}))}function B(e,a,{pagina:o=0,franja:n=null,aviso:i=null}={}){let s=e.datos.servicio,r=J(s,a,{excluirCitaId:e.datos.reprogramar||0});if(!r.length)return e.decir(_(i||`Para ${ge(Q(a))} ya no tengo cupos. Te muestro otros d\xEDas:`)),L(e,s);let c=i?`${i}

`:"";if(n){let p=r.filter(f=>n==="manana"?z(f)<720:z(f)>=720);p.length?r=p:c+=`En la ${n==="manana"?"ma\xF1ana":"tarde"} no quedan cupos ese d\xEDa. `}let t=9,u=r.length>10,b=(u?r.slice(o*t,(o+1)*t):r).map(p=>({id:`slot:${a}T${p}`,titulo:$(p)}));u&&(o+1)*t<r.length?b.push({id:`slotp:${a}:${o+1}`,titulo:"M\xE1s horarios \u279C",descripcion:"Ver horarios m\xE1s tarde"}):u&&b.push({id:`slotp:${a}:0`,titulo:"Volver al inicio",descripcion:"Primeros horarios del d\xEDa"}),e.ir("elegir_hora",{fecha:a}),e.decir(ye(`${c}Perfecto. Estos son los horarios libres para ${ge(Q(a))}; elige el que mejor se acomode a tu d\xEDa:`,"Ver horarios",[{titulo:"Horarios",filas:b}],{pie:'Puedes escribir la hora, por ejemplo: "4 pm"'}))}function Ta(e,a){if(e.ir(null,{inicio:a}),e.datos.reprogramar||e.c.nombre)return e.ir("confirmar"),e.decir(Xe(e.c,e.datos));e.ir("pedir_nombre");let o=e.c.nombre_perfil&&ze(e.c.nombre_perfil)?[{id:"nom:perfil",titulo:ze(e.c.nombre_perfil)}]:null,n="\xA1Listo, ese horario es tuyo mientras terminamos! \xBFA nombre de qui\xE9n agendo la cita? Escr\xEDbeme nombre y apellido.";e.decir(o?O(n+" O toca el bot\xF3n si es a tu nombre.",o):_(n))}async function Co(e){let a=e.datos;if(!a.servicio||!a.inicio)return L(e);let o=g(a.servicio);try{let n;if(a.reprogramar){n=Za(a.reprogramar,a.inicio),e.limpiar(),x(e.c.wa_id,"Cita agendada",{forzar:!0}),e.decir(_(`Listo, movimos tu cita \u2705

${o.nombre}
${Te(T(n.inicio))}
${l.direccion}

Te enviaremos un recordatorio antes de la cita.`)),ae(`Cita reprogramada: ${n.nombre||e.c.nombre_perfil||e.c.wa_id} \xB7 ${o.nombre} \xB7 ${T(n.inicio)}`);return}n=Ka({wa_id:e.c.wa_id,servicioId:o.id,inicio:a.inicio,nombre:e.c.nombre||a.nombre||e.c.nombre_perfil,contacto:e.c}),e.limpiar(),x(e.c.wa_id,"Cita agendada",{forzar:!0});let i=["Listo, tu cita qued\xF3 agendada \u2705 Me alegra que te cuides, te esperamos con mucho gusto.","",`*${o.nombre}*${o.requiere_valoracion?" (orientaci\xF3n)":""}`,Te(T(n.inicio)),l.direccion,`Valor: ${he(o)}`,"",[o.indicaciones,l.indicaciones_generales].filter(Boolean).join(" "),l.politica_cambios];o.cuidados&&i.push("",`Recomendaciones: ${o.cuidados.slice(0,450)}`),o.alerta&&i.push("",`\u26A0\uFE0F ${o.alerta.slice(0,300)}`),(o.requiere_valoracion||o.revisar_condiciones)&&i.push("","Una asesora revisar\xE1 tu caso y te confirmar\xE1 por aqu\xED las indicaciones previas antes de la cita."),i.push("","Te enviaremos un recordatorio el d\xEDa anterior. Si necesitas cambiarla, escr\xEDbeme por aqu\xED."),e.decir(_(i.join(`
`).replace(/\n{3,}/g,`

`))),He(n).catch(()=>{}),ae(`Nueva cita: ${n.nombre||e.c.wa_id} \xB7 ${o.nombre} \xB7 ${T(n.inicio)}${n.codigo_anuncio?" \xB7 anuncio "+n.codigo_anuncio:""}${n.requiere_revision?" \xB7 REVISAR condiciones":""}`)}catch(n){if(n instanceof V)return B(e,a.inicio.slice(0,10),{aviso:"Ese horario se acaba de ocupar, lo siento. Estos siguen libres:"});if(n instanceof Z){e.limpiar(),e.decir(O("Ya tienes citas activas con nosotros. Para agendar otra, una asesora te ayuda a organizarlas.",[ee,{id:"act:mis_citas",titulo:"Ver mis citas"}]));return}throw n}}function ue(e,a){e.limpiar(),q(e.c.wa_id,{bot_pausado:h()}),x(e.c.wa_id,"Requiere asesora",{forzar:!0});let o;a==="sensible"?o="Gracias por contarnos. Para orientarte con seguridad, una asesora revisar\xE1 tu caso y te escribir\xE1 personalmente por este chat.":a==="sin_cupos"?o="Una asesora te escribir\xE1 por este chat para buscarte un espacio.":o="Con gusto. Te comunico con una asesora del equipo; te responde por este mismo chat.",o+=Bn()?" En breve te escribimos.":` Nuestro horario es ${l.horario_texto}; te respondemos apenas abramos.`,e.decir(_(o)),ae(`Atender por WhatsApp: ${e.c.nombre||e.c.nombre_perfil||""} (+${e.c.wa_id}) \xB7 motivo: ${a}`)}function _e(e,a=null){let o=G(e.c.wa_id);if(!o.length)return e.decir(_("No encuentro citas pr\xF3ximas agendadas desde este n\xFAmero.")),D(e,"\xBFQuieres agendar una?");if(o.length===1)return qa(e,o[0],a);e.decir(ye("Estas son tus pr\xF3ximas citas. \xBFCu\xE1l quieres revisar?","Ver citas",[{titulo:"Tus citas",filas:o.map(n=>({id:`cita:sel:${n.id}${a?":"+a:""}`,titulo:g(n.servicio_id)?.nombre_corto||n.servicio_id,descripcion:Te(T(n.inicio))}))}]))}function qa(e,a,o){let n=g(a.servicio_id);if(o==="reprogramar")return wo(e,a);let i=o==="cancelar"?`\xBFQuieres cancelar tu cita de ${n.nombre} ${Fa(T(a.inicio))}? Si prefieres, tambi\xE9n podemos moverla a otro horario.`:`Tu cita: ${n.nombre}, ${T(a.inicio)}. \xBFQu\xE9 quieres hacer?`;e.decir(O(i,o==="cancelar"?[{id:`cita:cancelar_ok:${a.id}`,titulo:"S\xED, cancelar"},{id:`cita:reprogramar:${a.id}`,titulo:"Cambiar horario"},{id:"cita:mantener",titulo:"Mantener cita"}]:[{id:`cita:confirmar:${a.id}`,titulo:"Confirmo asistencia"},{id:`cita:reprogramar:${a.id}`,titulo:"Cambiar horario"},{id:`cita:cancelar:${a.id}`,titulo:"Cancelar cita"}]))}function wo(e,a){e.ir(null,{reprogramar:a.id,servicio:a.servicio_id}),L(e,a.servicio_id)}var ei=(e,a)=>{let o=K(Number(a));return o&&o.wa_id===e.c.wa_id?o:null},ha=e=>e.grupo?re(e.grupo).filter(a=>a.wa_id===e.wa_id):[e];function ai(e,a){let o=a.match(_a)[0].toUpperCase(),n=re(o);if(!n.length)return e.decir(_("No encuentro esa reserva. Revisa el c\xF3digo que aparece al terminar de reservar (empieza por VS-).")),D(e);if(n[0].wa_id!==e.c.wa_id)return e.decir(_("Ese c\xF3digo corresponde a otro n\xFAmero de WhatsApp. Una asesora te ayuda a revisarlo.")),ue(e,"solicitud");let i=n.filter(r=>["agendada","confirmada"].includes(r.estado));if(!i.length)return e.decir(_("Esa reserva ya no est\xE1 activa. \xBFQuieres agendar una nueva?")),D(e);let s=i.map(r=>g(r.servicio_id)?.nombre).join(" + ");x(e.c.wa_id,"Cita agendada",{forzar:!0}),e.limpiar(),e.decir(O([`Hola${Ae(e.c)?" "+Ae(e.c):""}, recib\xED tu reserva ${o} \u2705`,"",`\u2022 ${s}`,`\u2022 ${Te(T(i[0].inicio))}`,`\u2022 ${l.direccion}`,"","\xBFNos confirmas tu asistencia?"].join(`
`),[{id:`cita:confirmar:${i[0].id}`,titulo:"Confirmo asistencia"},{id:`cita:reprogramar:${i[0].id}`,titulo:"Cambiar horario"},{id:`cita:cancelar:${i[0].id}`,titulo:"Cancelar cita"}]))}function le(e){switch(e.estado){case"elegir_dia":return L(e);case"elegir_hora":return e.datos.fecha?B(e,e.datos.fecha):L(e);case"pedir_nombre":return e.decir(_("\xBFA nombre de qui\xE9n agendo la cita? Escr\xEDbeme nombre y apellido."));case"confirmar":return e.decir(Xe(e.c,e.datos));case"info_servicio":return e.decir(O("\xBFQuieres que busquemos un horario?",[{id:"act:agendar",titulo:"Agendar cita"},{id:"act:menu",titulo:"Ver otro servicio"},ee]));default:return e.decir(O("\xBFEn qu\xE9 te ayudo?",[{id:"act:menu",titulo:"Ver servicios"},{id:"act:agendar",titulo:"Agendar cita"},ee]))}}async function oi(e,a){let[o,n,i,s]=a.split(":");if(o==="svc")return ve(e,n);if(o==="cat")return Ao(e,n,Number(i)||0);if(o==="inf"&&n==="rapido"){let r=g(i);return r?(e.decir(_(Xn(r,e.c))),e.datos._acompanado=!0,x(e.c.wa_id,r.precio?"Precio enviado":"Orientado"),L(e,r.id)):D(e)}if(o==="inf"&&n==="mas"){let r=g(i);return r?(e.ir("info_servicio",{servicio:r.id}),e.decir(O(Qn(r),[{id:`act:agendar:${r.id}`,titulo:"Agendar cita"},{id:"act:menu",titulo:"Ver otro servicio"},ee]))):D(e)}if(o==="act"){if(n==="agendar")return delete e.datos.reprogramar,L(e,i);if(n==="menu")return D(e);if(n==="asesora")return ue(e,"solicitud");if(n==="mis_citas")return _e(e)}if(o==="day")return B(e,n);if(o==="slotp")return B(e,n,{pagina:Number(i)||0});if(o==="slot"){let r=a.slice(5);return e.datos.servicio?J(e.datos.servicio,r.slice(0,10),{excluirCitaId:e.datos.reprogramar||0}).includes(r.slice(11,16))?Ta(e,r):B(e,r.slice(0,10),{aviso:"Ese horario ya no est\xE1 disponible. Estos siguen libres:"}):L(e)}if(o==="nom"&&n==="perfil"){let r=ze(e.c.nombre_perfil);return r&&(q(e.c.wa_id,{nombre:r}),e.c.nombre=r),e.datos.inicio?(e.ir("confirmar"),e.decir(Xe(e.c,e.datos))):L(e)}if(o==="conf"){if(n==="si")return Co(e);if(n==="cambiar")return L(e)}if(o==="cita"){if(n==="mantener")return e.limpiar(),e.decir(_("Perfecto, tu cita sigue en pie. Te esperamos."));if(n==="nueva")return D(e);let r=ei(e,i);if(!r)return _e(e);if(n==="sel")return qa(e,r,s||null);if(n==="confirmar"){for(let c of ha(r))["agendada","confirmada"].includes(c.estado)&&w(c.id,{estado:"confirmada"});return e.limpiar(),e.decir(_(`\xA1Gracias por confirmar! Te esperamos ${ge(T(r.inicio))} en ${l.direccion}.`))}if(n==="reprogramar"){let c=ha(r);return c.length>1?(e.limpiar(),e.decir(O(`Tu reserva incluye ${c.length} servicios seguidos. Para moverla completa elige el nuevo horario aqu\xED: ${Ge(c[0].token)}`,[ee,{id:"cita:mantener",titulo:"Mantener cita"}]))):wo(e,r)}if(n==="cancelar")return qa(e,r,"cancelar");if(n==="cancelar_ok"){for(let c of ha(r))["agendada","confirmada"].includes(c.estado)&&w(c.id,{estado:"cancelada"});return e.limpiar(),G(e.c.wa_id).length||x(e.c.wa_id,"Seguimiento",{forzar:!0}),ae(`Cita cancelada por el cliente: ${r.nombre||e.c.wa_id} \xB7 ${g(r.servicio_id)?.nombre} \xB7 ${T(r.inicio)}`),e.decir(O("Tu cita qued\xF3 cancelada. Cuando quieras retomar, aqu\xED estamos.",[{id:`act:agendar:${r.servicio_id}`,titulo:"Agendar otra fecha"},{id:"act:menu",titulo:"Ver servicios"}]))}}return le(e)}function Po(e,a){let o=Be(a);if(!o)return!1;let n=ba(a.replace(/\b\d{1,2}[/-]\d{1,2}([/-]\d{2,4})?\b/,"").replace(/\b\d{1,2}\s*(de\s+)?[a-záéíóú]{4,10}\b/i,s=>/de la|del/i.test(s)?s:""));if(n?.hhmm&&/\b(a las|a la|am|pm|a\.? ?m|p\.? ?m|:)/i.test(a)){let s=J(e.datos.servicio,o,{excluirCitaId:e.datos.reprogramar||0});if(s.includes(n.hhmm))return Ta(e,`${o}T${n.hhmm}`),!0;let r=s.slice().sort((c,t)=>Math.abs(z(c)-z(n.hhmm))-Math.abs(z(t)-z(n.hhmm)))[0];if(r)return B(e,o,{aviso:`A las ${$(n.hhmm)} no tengo cupo ese d\xEDa; lo m\xE1s cercano es ${$(r)}.`}),!0}return B(e,o,{franja:n?.franja}),!0}function xa(e,a,o){delete e.datos.reprogramar;let n=a||e.datos.servicio||e.c.servicio_interes;if(!(n&&g(n)&&Be(o)&&(e.ir("elegir_dia",{servicio:n,fecha:null,inicio:null}),q(e.c.wa_id,{servicio_interes:n}),x(e.c.wa_id,"Orientado"),Po(e,o))))return L(e,n)}async function ni(e,a,{primerMensaje:o}){let n=yo(a);if(n&&!e.estado?.startsWith?.("pedir_")&&e.decir(_(n)),e.estado==="pedir_nombre"){let d=ze(a);if(d&&!te(a)&&!ma(a))return q(e.c.wa_id,{nombre:d}),e.c.nombre=d,e.ir("confirmar"),e.decir(Xe(e.c,e.datos))}if(e.estado==="confirmar"){if(uo(a))return Co(e);if(po(a))return L(e)}if(e.estado==="elegir_hora"&&e.datos.fecha){let d=ba(a),b=Be(a);if(b&&b!==e.datos.fecha)return B(e,b,{franja:d?.franja});if(d?.hhmm){let p=J(e.datos.servicio,e.datos.fecha,{excluirCitaId:e.datos.reprogramar||0});if(p.includes(d.hhmm))return Ta(e,`${e.datos.fecha}T${d.hhmm}`);let f=p.slice().sort((S,U)=>Math.abs(z(S)-z(d.hhmm))-Math.abs(z(U)-z(d.hhmm)))[0];return B(e,e.datos.fecha,{aviso:`A las ${$(d.hhmm)} no tengo cupo${f?`; lo m\xE1s cercano es ${$(f)}`:""}.`})}if(d?.franja)return B(e,e.datos.fecha,{franja:d.franja})}if(e.estado==="elegir_dia"&&Po(e,a))return;if(bo(a)&&G(e.c.wa_id).length)return _e(e,"reprogramar");if(mo(a))return _e(e,"cancelar");if(go(a))return D(e);if(/\b(p[aá]gina|sitio web|web|enlace|link|en l[ií]nea|online)\b/i.test(a)&&!fe(a))return e.decir(_(`Puedes reservar en l\xEDnea cuando quieras, eligiendo el servicio, el d\xEDa y la hora: ${We({servicio:e.datos.servicio||e.c.servicio_interes,fuente:"bot"})}`)),le(e);let i=fe(a),s=ke(a);if(s.length>=2&&(pa(a)||/\b(cotiz|presupuesto|cuanto (seria|serian|me sale|saldria))/i.test(a)))return Jn(e,s);let r=ma(a);if(r)return e.decir(_(Fn(r.respuesta))),i&&!e.datos.servicio?ve(e,i):le(e);let c=_o(a),t=g(i||e.datos.servicio||e.c.servicio_interes);if(c&&t&&!te(a))return Kn(e,t,c);if(!i){let d=vo(a);if(d)return Ao(e,ja(d),0)}if(pa(a)){let d=g(i||e.datos.servicio||e.c.servicio_interes);return d?i&&i!==e.datos.servicio?ve(e,d.id):(e.decir(_(d.precio?`El valor de ${d.nombre} es ${he(d)}. Incluye: ${d.incluye}`:`El valor vigente de ${d.nombre} te lo confirma el equipo al agendar; depende de lo que se defina contigo. Incluye: ${d.incluye}`)),d.precio?x(e.c.wa_id,"Precio enviado"):x(e.c.wa_id,"Orientado"),le(e)):D(e,"\xBFDe qu\xE9 servicio quieres conocer el valor?")}if(i)return te(a)?xa(e,i,a):ve(e,i);if(te(a))return xa(e,null,a);if(fo(a)&&!e.estado)return e.decir(_("Con gusto. Si necesitas algo m\xE1s, escr\xEDbeme por aqu\xED."));if(o||lo(a)&&!e.estado)return e.decir(_(zo(e.c))),D(e);if(xo()){let d=await So(a,Wa(e.c.wa_id,8));if(d)return d.derivar_asesora||d.intencion==="asesora"?(d.respuesta&&e.decir(_(d.respuesta)),ue(e,"ia")):d.intencion==="cancelar"?_e(e,"cancelar"):d.intencion==="reprogramar"?_e(e,"reprogramar"):d.intencion==="agendar"?(d.respuesta&&e.decir(_(d.respuesta)),L(e,d.servicio_id)):(d.respuesta&&e.decir(_(d.respuesta)),d.servicio_id&&!e.estado?ve(e,d.servicio_id):le(e))}let u=(e.c.fallos||0)+1;return q(e.c.wa_id,{fallos:u}),u>=3?ue(e,"no_entendido"):(e.decir(_("Disculpa, no te entend\xED bien. Te dejo las opciones para continuar:")),le(e))}async function Ro(e){if(ka(e.wamid))return{duplicado:!0};let a=Le(e.wa_id,{nombre_perfil:e.nombre_perfil}),o=!!a._nuevo;if(De({wa_id:e.wa_id,direccion:"in",tipo:e.tipo,cuerpo:e.texto||`[${e.tipo}]`,wamid:e.wamid,autor:"cliente",payload:e.reply_id?{reply_id:e.reply_id}:null})===null)return{duplicado:!0};let i={ultimo_entrante:h()};e.referral&&Object.assign(i,{ad_id:e.referral.source_id||null,ctwa_clid:e.referral.ctwa_clid||null,source_url:e.referral.source_url||null,source_type:e.referral.source_type||null,ad_headline:e.referral.headline||null,ad_body:e.referral.body||null});let s=ua(e.texto||"");s&&Object.assign(i,{codigo_anuncio:s.codigo,servicio_interes:s.servicio}),q(e.wa_id,i),a=I(e.wa_id),no(e.wamid);let r=(e.texto||"").trim();if(!e.reply_id&&co(r))return q(a.wa_id,{baja:1,estado:null,estado_datos:{}}),x(a.wa_id,"Baja",{forzar:!0}),await H(a.wa_id,_("Entendido. No te enviaremos m\xE1s mensajes de seguimiento. Si en alg\xFAn momento quieres retomar, escr\xEDbenos por aqu\xED.")),{baja:!0};if(a.bot_pausado){let t=M().prepare("SELECT MAX(ts) AS ts FROM mensajes WHERE wa_id = ? AND autor = 'equipo'").get(a.wa_id)?.ts||0;if(h()-Math.max(Number(a.bot_pausado),t)<Un)return{pausado:!0};q(a.wa_id,{bot_pausado:0}),a.bot_pausado=0}let c=new Ea(a);if(a.baja&&r&&q(a.wa_id,{baja:0}),e.reply_id)q(a.wa_id,{fallos:0}),await oi(c,e.reply_id);else if(!r)c.decir(_("Recib\xED tu archivo. Por ahora te atiendo mejor por texto. \u{1F60A}")),le(c);else if(_a.test(r))ai(c,r);else if(Fe(r)){let t=g(fe(r)||c.datos?.servicio||a.servicio_interes);t?.contraindicaciones&&c.decir(_(`Gracias por contarnos. Para *${t.nombre}* se tienen en cuenta estas contraindicaciones: ${t.contraindicaciones.slice(0,900)}${t.alerta?`

\u26A0\uFE0F ${t.alerta}`:""}`)),ue(c,"sensible")}else if(to(r)&&!te(r))ue(c,"solicitud");else if(o&&(s||fe(r))){c.decir(_(zo(a)));let t=s?.servicio||fe(r);te(r)?xa(c,t,r):ve(c,t)}else await ni(c,r,{primerMensaje:o});q(a.wa_id,{estado:c.estado,estado_datos:c.datos});for(let t of c.salida)await H(a.wa_id,t);return{respuestas:c.salida.length}}async function ae(e){console.log("[equipo]",e);let a=l.plantillas?.aviso_equipo;if(!m.STAFF_WA_NUMBERS.length||!a)return;let o=e.replace(/[\n\t]+/g," ").replace(/ {4,}/g," ").slice(0,900);for(let n of m.STAFF_WA_NUMBERS)await H(n,{tipo:"plantilla",nombre:a,params:[o]},{autor:"sistema"})}async function $o(e,a){let o=w(e,{estado:"asistio",valor_cobrado:a!=null&&a!==""?Math.round(Number(a)):null});x(o.wa_id,"Asisti\xF3",{forzar:!0}),ro(o).catch(()=>{});let n=I(o.wa_id);return l.seguimiento?.gracias_post_visita&&n&&!n.baja&&(Sa(n)?await H(o.wa_id,_("Gracias por visitarnos hoy. \xBFC\xF3mo fue tu experiencia? Si quieres, puedes contarnos tu opini\xF3n por aqu\xED; nos ayuda a mejorar.")):l.plantillas?.gracias_visita&&await H(o.wa_id,{tipo:"plantilla",nombre:l.plantillas.gracias_visita,params:[Ae(n)||"hola"]}),w(o.id,{gracias:1})),K(e)}function No(e){let a=w(e,{estado:"no_asistio"});return x(a.wa_id,"No asisti\xF3",{forzar:!0}),a}var Ce=()=>process.env.MODO_DEMO==="1",Oo=()=>Ce()||process.env.ASISTENTE_WEB==="1",Io=()=>({activo:Oo(),demo:Ce(),nombre:"Asistente de Valencia Stetic"}),ri=/^\d{10,16}$/,xe=e=>`sim9${e}`,si=["Nuevo","Orientado","Cita agendada","Asisti\xF3"],Ee=(e,a)=>String(e??"").replace(/[\u0000-\u001f<>]/g," ").replace(/\s+/g," ").trim().slice(0,a),Lo=0;function ci(){let e=Date.now();if(e-Lo<6e5)return;Lo=e;let a=M(),o=h()-24*36e5,n=a.prepare("SELECT wa_id FROM mensajes WHERE wa_id LIKE 'sim9%' GROUP BY wa_id HAVING MAX(ts) < ?").all(o).map(i=>i.wa_id);for(let i of n)for(let s of["mensajes","citas","eventos_capi","contactos"])a.prepare(`DELETE FROM ${s} WHERE wa_id = ?`).run(i)}function qe(e,a){if(!ri.test(String(e||"")))throw new a(400,"Sesi\xF3n de chat inv\xE1lida.");return String(e)}function Mo(e,a){let o=new Map;for(let n of M().prepare("SELECT * FROM citas WHERE wa_id = ? ORDER BY inicio").all(xe(e)))o.set(n.id,n);for(let n of a)for(let i of re(n))o.set(i.id,i);return[...o.values()].sort((n,i)=>n.inicio.localeCompare(i.inicio))}var ti=e=>String(e).startsWith("sim9")?"Chat del asistente":`\u2022\u2022\u2022\u2022${String(e).slice(-4)}`;function Do(e,a){let o=Mo(e,a),n=[...new Set([xe(e),...o.map(t=>t.wa_id)])],i=n.map(t=>I(t)).filter(Boolean),s=["Nuevo","Orientado","Precio enviado","Cita agendada","Asisti\xF3"],r=i.map(t=>t.etapa).sort((t,u)=>s.indexOf(u)-s.indexOf(t))[0]||null,c=n.flatMap(t=>M().prepare("SELECT * FROM eventos_capi WHERE wa_id = ? ORDER BY id").all(t)).map(t=>{let u=JSON.parse(t.payload||"{}");return{evento:t.evento,estado:t.estado,valor:u.custom_data?.value??null,moneda:u.custom_data?.currency??null,cuando:me(t.ts)}});return{embudo:{etapas:si,actual:r},anuncio:i.find(t=>t.codigo_anuncio)?.codigo_anuncio||null,citas:o.map(t=>({id:t.id,servicio:g(t.servicio_id)?.nombre||t.servicio_id,inicio:t.inicio,estado:t.estado,revisar:!!t.requiere_revision,origen:t.origen||null,valor:t.valor_cobrado??null,quien:ti(t.wa_id),grupo:t.grupo||null})),eventos:c}}async function Vo({p:e,m:a,q:o,req:n,leerJson:i,ip:s,ErrorWeb:r,limitar:c}){if(!e.startsWith("/api/publico/asistente")&&!e.startsWith("/api/publico/demo"))return;if(!Oo())throw new r(404,"No encontrado");if(Ce()&&ci(),e==="/api/publico/asistente"&&a==="POST"){if(!c(s,"asistente",Number(process.env.ASISTENTE_MAX_10MIN||80),6e5))throw new r(429,"Muchos mensajes seguidos. Espera un momento.");let u=await i(n),d=qe(u.sid,r),b=xe(d),p=Ee(u.texto,300),f=u.reply_id?Ee(u.reply_id,120):null;if(!p&&!f)throw new r(400,"Escribe un mensaje.");let S=M().prepare("SELECT COALESCE(MAX(id),0) AS id FROM mensajes WHERE wa_id = ?").get(b).id,U=null;return Ce()&&u.referral&&typeof u.referral=="object"&&(U={source_id:Ee(u.referral.source_id,40)||"120210000000001",source_type:"ad",headline:Ee(u.referral.headline,80),body:Ee(u.referral.body,120),source_url:"https://fb.me/anuncio-demo",ctwa_clid:`DEMO_${d}`}),await Ro({wa_id:b,nombre_perfil:Ee(u.nombre,60)||null,wamid:`sim.web.${d}.${Date.now()}.${Math.random().toString(36).slice(2,8)}`,tipo:f?"interactive":"text",texto:p,reply_id:f,referral:U}),{mensajes:Oe(b,S)}}if(e==="/api/publico/asistente/mensajes"&&a==="GET"){let u=qe(o.sid,r);return{mensajes:Oe(xe(u),Number(o.desde||0))}}if(e==="/api/publico/asistente/reiniciar"&&a==="POST"){let u=qe((await i(n)).sid,r),d=M(),b=xe(u);for(let p of["mensajes","citas","eventos_capi","contactos"])d.prepare(`DELETE FROM ${p} WHERE wa_id = ?`).run(b);return{ok:!0}}if(!Ce())throw new r(404,"No encontrado");let t=String(o.codigos||"").split(",").map(u=>u.trim().toUpperCase()).filter(u=>/^VS-[A-Z0-9]{6}$/.test(u)).slice(0,10);if(e==="/api/publico/demo/equipo"&&a==="GET")return Do(qe(o.sid,r),t);if(e==="/api/publico/demo/recordatorio"&&a==="POST"){if(!c(s,"demo-recordatorio",30,6e5))throw new r(429,"Demasiadas acciones seguidas.");let u=await i(n),d=qe(u.sid,r),b=xe(d),p=M().prepare("SELECT * FROM citas WHERE wa_id = ? AND estado IN ('agendada','confirmada') ORDER BY inicio LIMIT 1").get(b);if(!p)throw new r(404,"Primero agenda una cita con el asistente.");let f=I(b),S=g(p.servicio_id),U=String(f?.nombre||f?.nombre_perfil||"").split(" ")[0],Pe=M().prepare("SELECT COALESCE(MAX(id),0) AS id FROM mensajes WHERE wa_id = ?").get(b).id;return await H(b,{tipo:"botones",texto:`Hola${U?" "+U:""}, te recordamos tu cita de ${S?.nombre} ${ge(T(p.inicio))} en ${l.direccion}. \xBFNos confirmas tu asistencia?`,botones:[{id:`cita:confirmar:${p.id}`,titulo:"Confirmo asistencia"},{id:`cita:reprogramar:${p.id}`,titulo:"Cambiar horario"},{id:`cita:cancelar:${p.id}`,titulo:"Cancelar cita"}]}),w(p.id,{recordatorio1:1}),{mensajes:Oe(b,Pe)}}if(e==="/api/publico/demo/estado"&&a==="POST"){if(!c(s,"demo-estado",60,6e5))throw new r(429,"Demasiadas acciones seguidas.");let u=await i(n),d=qe(u.sid,r),b=(Array.isArray(u.codigos)?u.codigos:[]).map(f=>String(f).toUpperCase()).filter(f=>/^VS-[A-Z0-9]{6}$/.test(f)).slice(0,10),p=Mo(d,b).find(f=>f.id===Number(u.cita_id));if(!p)throw new r(404,"Esa cita no es de esta visita.");if(u.estado==="asistio"){let f=Math.min(Math.max(Number(u.valor)||0,0),5e6);await $o(p.id,f||null)}else if(u.estado==="no_asistio")No(p.id);else if(u.estado==="confirmada")w(p.id,{estado:"confirmada",requiere_revision:0});else throw new r(400,"Estado inv\xE1lido.");return await new Promise(f=>setTimeout(f,80)),Do(d,b)}throw new r(404,"No encontrado")}var Ho=6,li=/^fotos\/[\w-]+\.(jpe?g|png|webp)$/i,Uo=e=>typeof e=="string"&&li.test(e)?e:null,Bo={57:"CO",51:"PE",593:"EC",54:"AR",595:"PY",598:"UY",56:"CL",591:"BO",507:"PA",52:"MX",351:"PT",1:"US",34:"ES"},we=new Map;function Ye(e,a,o,n){let i=`${e}|${a}`,s=Date.now(),r=we.get(i);if((!r||r.reinicia<s)&&(r={n:0,reinicia:s+n},we.set(i,r)),r.n++,we.size>5e3)for(let[c,t]of we)t.reinicia<s&&we.delete(c);return r.n<=o}var di=e=>(m.TRUST_PROXY?String(e.headers["x-forwarded-for"]||"").split(",")[0].trim():"")||e.socket.remoteAddress||"desconocida",v=class extends Error{constructor(a,o){super(o),this.estado=a}},Se=(e,a)=>String(e??"").replace(/[\u0000-\u001f<>]/g," ").replace(/\s+/g," ").trim().slice(0,a),Fo="ABCDEFGHJKMNPQRSTUVWXYZ23456789",ui=()=>"VS-"+Array.from(Me.randomBytes(6),e=>Fo[e%Fo.length]).join(""),pi=()=>Me.randomBytes(24).toString("base64url");var mi=e=>`\u2022\u2022\u2022\u2022${String(e).slice(-4)}`;function ko(e){if(!Array.isArray(e)||!e.length)throw new v(422,"Elige al menos un servicio.");let a=[...new Set(e.map(String))];if(a.length>Ho)throw new v(422,`Puedes elegir hasta ${Ho} servicios por visita.`);let o=a.map(g);if(o.some(i=>i?.vigente_hasta&&A()>i.vigente_hasta))throw new v(422,"Esta promoci\xF3n ya finaliz\xF3. Elige un servicio vigente.");if(o.some(i=>!i))throw new v(422,"Uno de los servicios no existe.");if(o.length>1&&o.some(i=>i.vigente_hasta))throw new v(422,"Agenda cada promoci\xF3n en una reserva independiente.");let n=o.filter(i=>i.requiere_valoracion||i.solo);if(a.length>1&&n.length&&o.some(i=>!(i.requiere_valoracion||i.solo)||i.categoria!==n[0].categoria))throw new v(422,"La depilaci\xF3n l\xE1ser (cita de orientaci\xF3n) y el masaje postoperatorio se agendan solos o junto a otros de su misma categor\xEDa, no mezclados con el resto.");return a}var bi=e=>String(e??"").split(",").map(a=>a.trim()).filter(Boolean),Wo=e=>/^\d{4}-\d{2}-\d{2}$/.test(e||"")&&!Number.isNaN(Date.parse(e));function gi(e,a){let o=String(e||"57").replace(/\D/g,"");if(!Bo[o])throw new v(422,"Elige un indicativo de pa\xEDs v\xE1lido.");let n=String(a??"").replace(/\D/g,"");if(n.startsWith(o)&&n.length>(o==="57"?10:11)&&(n=n.slice(o.length)),o==="57"?!/^3\d{9}$/.test(n):!/^\d{7,12}$/.test(n))throw new v(422,o==="57"?"Escribe tu celular de 10 d\xEDgitos (empieza por 3).":"Escribe un n\xFAmero de WhatsApp v\xE1lido.");return o+n}function fi(){return[1,2,3,4,5,6,0].map(e=>{let a=l.horario?.[String(e)];return{dia:na[e].charAt(0).toUpperCase()+na[e].slice(1),n:e,abierto:!!a,texto:a?`${$(a[0])} a ${$(a[1])}`:"Cerrado"}})}function vi(){let e=l.web?.opiniones;if(!e||!(e.puntuacion>0)||!(e.total>0)||!String(e.enlace||"").startsWith("https://"))return null;let a=(e.items||[]).filter(o=>o&&o.autor&&o.texto&&o.estrellas>=1&&o.estrellas<=5).map(o=>({autor:String(o.autor),estrellas:Math.round(o.estrellas),fecha:o.fecha?String(o.fecha):null,texto:String(o.texto)}));return{fuente:e.fuente||"Google",puntuacion:e.puntuacion,total:e.total,enlace:e.enlace,items:a}}function _i(){let e=l.horario?.[String(F(A()))];return{negocio:{nombre:l.nombre,frase:l.web?.frase||null,descripcion:l.web?.descripcion||null,ciudad:l.ciudad||null,direccion:l.direccion,como_llegar:l.como_llegar||null,mapa_url:l.web?.mapa_url||null,horario:fi(),horario_texto:l.horario_texto,hoy_abierto:!!e&&!(l.dias_cerrados||[]).includes(A()),telefono:/^\+\d{8,15}$/.test(l.web?.telefono||"")?l.web.telefono:null,coordenadas:l.web?.coordenadas||null,opiniones:vi(),confianza:l.web?.confianza||null,facebook:String(l.web?.facebook||"").startsWith("https://")?l.web.facebook:null,instagram:l.web?.instagram||null,nosotros:(l.web?.nosotros||[]).map(a=>Se(a,600)).filter(Boolean),comodidades:l.web?.comodidades||[],galeria:(l.web?.galeria||[]).map(a=>({src:Uo(a.src||a),alt:Se(a.alt||"",120)})).filter(a=>a.src),privacidad_url:l.web?.privacidad_url||null,politica_cambios:String(l.politica_cambios||"").replace(/por este chat/gi,"por WhatsApp"),indicaciones_generales:l.indicaciones_generales},servicios:j.filter(a=>!a.vigente_hasta||A()<=a.vigente_hasta).map(a=>({id:a.id,nombre:a.nombre,descripcion:a.descripcion,incluye:a.incluye,duracion_min:a.duracion_min,precio:a.precio??null,precio_nota:a.precio_nota||null,vigente_hasta:a.vigente_hasta||null,paquete:a.paquete||null,categoria:a.categoria||null,foto:Uo(a.foto),duracion_texto:a.duracion_texto||null,procedimiento:a.procedimiento||null,indicado_para:a.indicado_para||null,sesiones:a.sesiones||null,cuidados:a.cuidados||null,contraindicaciones:a.contraindicaciones||null,alerta:a.alerta||null,resultados:a.resultados||null,retoque:a.retoque||null,pago:a.pago||null,requiere_valoracion:!!a.requiere_valoracion,revisar_condiciones:!!a.revisar_condiciones,solo:!!(a.requiere_valoracion||a.solo),indicaciones:a.indicaciones||null,codigos:a.codigos_anuncio||[]})),agenda:{dias_adelante:l.agenda.dias_adelante,hoy:A()},asistente:Io(),categorias:[...new Set([...Oa,...j.map(a=>a.categoria).filter(Boolean)])],whatsapp:{numero:fa(),enlace:va("Hola, quiero informaci\xF3n sobre los servicios de Valencia Stetic"),simulador:m.SIMULADOR&&oe()},paises:Object.entries(Bo).map(([a,o])=>({codigo:a,iso:o}))}}function yi(e){let a=ko(bi(e.servicios||e.servicio));if(e.fecha){if(!Wo(e.fecha))throw new v(400,"Fecha inv\xE1lida.");return{horas:ce(a,e.fecha),duracion_min:ca(a)}}return{dias:ta(a),duracion_min:ca(a)}}function Go(e){return e.map(a=>{let o=g(a.servicio_id);return{id:a.id,servicio_id:a.servicio_id,servicio:o?.nombre||a.servicio_id,inicio:a.inicio,duracion_min:o?.duracion_min,estado:a.estado,orientacion:!!o?.requiere_valoracion}})}var Aa=e=>String(e||"").split(" ")[0];function hi(e,a,o,n){let i=e.map(c=>g(c.servicio_id)),s=[`Hola ${Aa(a)}, recibimos tu reserva en Valencia Stetic \u2705`,""];e.forEach((c,t)=>s.push(`\u2022 ${i[t].nombre}${i[t].requiere_valoracion?" (cita de orientaci\xF3n)":""} \xB7 ${$(c.inicio.slice(11,16))}`)),s.push(`\u{1F4C5} ${Q(e[0].inicio.slice(0,10)).replace(/^./,c=>c.toUpperCase())}`,`\u{1F4CD} ${l.direccion}`);let r=i.every(c=>c.precio)?`$${i.reduce((c,t)=>c+Number(t.precio),0).toLocaleString("es-CO")}`:"el equipo te confirma el valor vigente";return s.push(`Valor: ${r}`,""),l.politica_cambios&&s.push(l.politica_cambios),s.push(`C\xF3digo de tu reserva: ${o}`,`Para ver, cambiar o cancelar: ${Ge(n)}`),s.join(`
`)}async function Ei(e,a,o,n){let i=e.map(c=>g(c.servicio_id)),s=I(a.wa_id),r=e[0];try{Sa(s)||oe()?await H(a.wa_id,{tipo:"botones",texto:hi(e,a.nombre,o,n),botones:[{id:`cita:confirmar:${r.id}`,titulo:"Confirmo asistencia"},{id:`cita:reprogramar:${r.id}`,titulo:"Cambiar horario"},{id:`cita:cancelar:${r.id}`,titulo:"Cancelar cita"}]},{autor:"sistema"}):l.plantillas?.cita_web&&await H(a.wa_id,{tipo:"plantilla",nombre:l.plantillas.cita_web,params:[Aa(a.nombre)||"hola",i.map(c=>c.nombre).join(" + "),Q(r.inicio.slice(0,10)),$(r.inicio.slice(11,16)),o],botones_payload:[`cita:confirmar:${r.id}`,`cita:reprogramar:${r.id}`,`cita:cancelar:${r.id}`]},{autor:"sistema"})}catch(c){console.error("[reservas] no se pudo confirmar por WhatsApp:",c.message)}}async function qi(e,a){if(e.sitio)return{ok:!0,codigo:"VS-000000",citas:[]};if(e.acepto!==!0)throw new v(422,"Debes aceptar el tratamiento de tus datos para reservar.");let o=ko(e.servicios),n=String(e.inicio||"");if(!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(n))throw new v(422,"Elige una fecha y una hora.");let i=Se(e.nombre,80);if(i.length<3||/https?:|www\.|@/i.test(i))throw new v(422,"Escribe tu nombre y apellido.");let s=gi(e.pais,e.telefono),r=Se(e.email,120);if(r&&!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(r))throw new v(422,"El correo no parece v\xE1lido.");let c=Se(e.notas,300),t=e.ref&&typeof e.ref=="object"?e.ref:{},u=Le(s,{}),d=j.flatMap(C=>C.codigos_anuncio||[]).map(C=>C.toUpperCase()).includes(String(t.cod||"").toUpperCase())?String(t.cod).toUpperCase():null;q(s,{nombre:i,...r?{email:r}:{},servicio_interes:o[0],...!u.codigo_anuncio&&d?{codigo_anuncio:d}:{},...u.source_type?{}:{source_type:"web",source_url:Se([t.src,t.utm_source,t.utm_campaign].filter(Boolean).join(" \xB7 "),200)||null}});let b=I(s),p=ui(),f=pi(),S;try{S=Ja({wa_id:s,servicioIds:o,inicio:n,nombre:i,contacto:b,origen:"web",notas:c||void 0,token:f,grupo:p})}catch(C){throw C instanceof V?new v(409,"Ese horario se acaba de ocupar. Elige otro, por favor."):C instanceof Z?new v(409,"Ya tienes reservas activas con nosotros. Escr\xEDbenos por WhatsApp y te ayudamos a organizarlas."):C}x(s,"Cita agendada",{forzar:!0});let U=c&&Fe(c);if(U)for(let C of S)w(C.id,{requiere_revision:!0});let Pe=U||S.some(C=>C.requiere_revision),Zo=S.map(C=>g(C.servicio_id));ae(`Nueva cita WEB: ${i} \xB7 ${Zo.map(C=>C.nombre).join(" + ")} \xB7 ${T(S[0].inicio)}${d?" \xB7 anuncio "+d:""}${Pe?" \xB7 REVISAR condiciones":""}`),He(S[0]).catch(()=>{}),Ei(S,{wa_id:s,nombre:i},p,f);let Ze=`Hola, reserv\xE9 en la web con el c\xF3digo ${p} y quiero confirmar mi cita en Valencia Stetic.`;return{ok:!0,codigo:p,token:f,citas:Go(S),revisar:Pe,direccion:l.direccion,enlace_gestion:`/reservas/cita/${f}`,whatsapp:va(Ze),whatsapp_texto:Ze,simulador:m.SIMULADOR&&oe()?`/simulador?tel=${encodeURIComponent(s)}&texto=${encodeURIComponent(Ze)}`:null}}function Qe(e){let a=Ya(e);if(!a)throw new v(404,"No encontramos esa reserva. Revisa el enlace que te enviamos.");let o=a.grupo?re(a.grupo):[a];return{principal:a,citas:o}}var Ca=e=>e.some(a=>["agendada","confirmada"].includes(a.estado)&&a.inicio>=`${A()}T00:00`);function wa(e){let a=l.agenda?.cambios_hasta_horas;return a==null?!0:ie(e[0].inicio)-h()>=a*36e5}function Pa(e){let{principal:a,citas:o}=Qe(e),n=Ca(o)&&ie(o[0].inicio)>h();return{codigo:a.grupo,nombre:Aa(a.nombre),telefono:mi(a.wa_id),citas:Go(o),estado:o.every(i=>i.estado==="cancelada")?"cancelada":o.some(i=>i.estado==="asistio")?"asistio":o.some(i=>i.estado==="confirmada")?"confirmada":"agendada",puede_cambiar:n&&wa(o),plazo_horas:l.agenda?.cambios_hasta_horas??null,politica_cambios:String(l.politica_cambios||"").replace(/por este chat/gi,"por WhatsApp"),direccion:l.direccion,servicios_ids:o.map(i=>i.servicio_id)}}function xi(e,a){let{citas:o}=Qe(e),n=new Set(o.map(s=>s.id)),i=o.map(s=>s.servicio_id);if(a.fecha){if(!Wo(a.fecha))throw new v(400,"Fecha inv\xE1lida.");return{horas:ce(i,a.fecha,{excluir:n})}}return{dias:ta(i,{excluir:n})}}async function Si(e){let{principal:a,citas:o}=Qe(e);if(!Ca(o))throw new v(409,"Esta reserva ya no est\xE1 activa.");if(!wa(o))throw new v(409,`Ya pas\xF3 el plazo para cancelar por aqu\xED (${l.agenda.cambios_hasta_horas} h antes). Escr\xEDbenos por WhatsApp y lo revisamos.`);for(let n of o)["agendada","confirmada"].includes(n.estado)&&w(n.id,{estado:"cancelada"});return G(a.wa_id).length||x(a.wa_id,"Seguimiento",{forzar:!0}),ae(`Cita CANCELADA desde la web: ${a.nombre||a.wa_id} \xB7 ${o.map(n=>g(n.servicio_id)?.nombre).join(" + ")} \xB7 ${T(o[0].inicio)}`),Pa(e)}async function ji(e,a){let{principal:o,citas:n}=Qe(e);if(!Ca(n))throw new v(409,"Esta reserva ya no est\xE1 activa.");if(!wa(n))throw new v(409,`Ya pas\xF3 el plazo para cambiarla por aqu\xED (${l.agenda.cambios_hasta_horas} h antes). Escr\xEDbenos por WhatsApp y lo revisamos.`);if(!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(String(a||"")))throw new v(422,"Elige una fecha y una hora.");let i=n.filter(s=>["agendada","confirmada"].includes(s.estado));try{eo(i,a)}catch(s){throw s instanceof V?new v(409,"Ese horario no est\xE1 disponible. Elige otro, por favor."):s}return x(o.wa_id,"Cita agendada",{forzar:!0}),ae(`Cita REPROGRAMADA desde la web: ${o.nombre||o.wa_id} \xB7 ${i.map(s=>g(s.servicio_id)?.nombre).join(" + ")} \xB7 ${T(a)}`),Pa(e)}async function Xo(e,a,o){let n=a.pathname.replace(/\/+$/,""),i=e.method,s=Object.fromEntries(a.searchParams),r=di(e);if(!Ye(r,"api",Number(process.env.RESERVAS_MAX_API_MIN||120),6e4))throw new v(429,"Demasiadas solicitudes. Espera un momento.");let c,t=await Vo({p:n,m:i,q:s,req:e,leerJson:o,ip:r,ErrorWeb:v,limitar:Ye});if(t!==void 0)return t;if(n==="/api/publico/config"&&i==="GET")return _i();if(n==="/api/publico/disponibilidad"&&i==="GET")return yi(s);if(n==="/api/publico/citas"&&i==="POST"){if(!Ye(r,"reservar",Number(process.env.RESERVAS_MAX_POR_HORA||6),36e5))throw new v(429,"Hiciste varias reservas seguidas. Si necesitas m\xE1s, escr\xEDbenos por WhatsApp.");return qi(await o(e),r)}if(c=n.match(/^\/api\/publico\/cita\/([\w-]{20,64})(\/[a-z]+)?$/)){let u=c[1],d=c[2];if(!d&&i==="GET")return Pa(u);if(d==="/disponibilidad"&&i==="GET")return xi(u,s);if(!Ye(r,"gestion",20,36e5))throw new v(429,"Demasiados intentos. Espera un momento.");if(d==="/cancelar"&&i==="POST")return Si(u);if(d==="/reprogramar"&&i==="POST")return ji(u,(await o(e)).inicio)}throw new v(404,"No encontrado")}var Qo=globalThis.VS_PREFIJO||"",Ke="vs_estatico_db",zi=e=>{let a="";for(let o=0;o<e.length;o+=32768)a+=String.fromCharCode(...e.subarray(o,o+32768));return btoa(a)},Ti=e=>Uint8Array.from(atob(e),a=>a.charCodeAt(0));async function Ai(){let e=await globalThis.initSqlJs({locateFile:a=>`${Qo}/reservas/${a}`});Ra(e);try{let a=localStorage.getItem(Ke);a&&(globalThis.__VS_DB_BYTES=Ti(a))}catch{}try{ia(":memory:")}catch{globalThis.__VS_DB_BYTES=null;try{localStorage.removeItem(Ke)}catch{}ia(":memory:")}}var Ko=Ai(),Yo=null;function Ci(){clearTimeout(Yo),Yo=setTimeout(()=>{try{let e=zi(M().exportar());e.length<45e5&&localStorage.setItem(Ke,e)}catch{}},500)}async function wi(e,a){await Ko;let o=e.pathname.slice(e.pathname.indexOf("/api/publico"))+e.search,n={method:String(a?.method||"GET").toUpperCase(),headers:{"x-forwarded-for":"navegador"},socket:{remoteAddress:"navegador"},_cuerpo:a?.body||""},i=async r=>{try{return JSON.parse(r._cuerpo||"{}")}catch{return{}}},s=(r,c)=>new Response(JSON.stringify(r).split('"/reservas/').join(`"${Qo}/reservas/`),{status:c,headers:{"Content-Type":"application/json; charset=utf-8"}});try{let r=await Xo(n,new URL(o,"http://local"),i);return n.method!=="GET"&&Ci(),s(r,200)}catch(r){return s({error:r?.estado?r.message:"Ocurri\xF3 un error. Int\xE9ntalo de nuevo."},r?.estado||500)}}var Pi=globalThis.fetch.bind(globalThis);globalThis.fetch=(e,a)=>{let o=new URL(typeof e=="string"?e:e.url,location.href);return o.pathname.includes("/api/publico")?wi(o,a):Pi(e,a)};globalThis.VSBackend={listo:Ko,reiniciar:()=>{try{localStorage.removeItem(Ke)}catch{}location.reload()}};})();
