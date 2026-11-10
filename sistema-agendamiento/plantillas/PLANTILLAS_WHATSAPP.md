# Plantillas de WhatsApp para aprobar en Meta

WhatsApp solo permite escribir mensajes libres dentro de las **24 horas** siguientes al último mensaje del cliente. Fuera de esa ventana, el sistema usa estas plantillas. Créalas en **WhatsApp Manager → Plantillas de mensajes**, idioma **Español (es)**, con estos nombres exactos (o cambia los nombres en `config/negocio.json → plantillas`).

> El bot responde siempre dentro de la ventana, así que las plantillas solo se usan para: recordatorio de cita cuando la persona agendó hace más de 24 h, segundo seguimiento (72 h), agradecimiento después de la visita y aviso al equipo.

---

## 1. `recordatorio_cita_vs` — Categoría: **Utilidad**

**Cuerpo:**
```
Hola {{1}}, te recordamos tu cita de {{2}} en Valencia Stetic el {{3}} a las {{4}}. ¿Nos confirmas tu asistencia?
```
Ejemplos para revisión: `Laura` · `Masaje relajante` · `jueves 5 de noviembre` · `10:00 a. m.`

**Botones (respuesta rápida), en este orden:**
1. `Confirmo asistencia`
2. `Cambiar horario`
3. `Cancelar cita`

El sistema envía en cada botón un *payload* (`cita:confirmar:ID`, `cita:reprogramar:ID`, `cita:cancelar:ID`) para saber qué cita es.

---

## 2. `seguimiento_consulta_vs` — Categoría: **Marketing**

**Cuerpo:**
```
Hola {{1}}, gracias por escribir a Valencia Stetic. Si quieres retomar tu consulta o conocer los horarios disponibles, puedes responder aquí. Gracias por tenernos en cuenta.
```
Ejemplo: `Laura`

**Botones (respuesta rápida):**
1. `Ver horarios`
2. `Ver servicios`

Se envía una sola vez, 72 h después del último mensaje, solo a quien preguntó y no agendó, nunca a quien pidió no recibir mensajes. Se puede apagar con `seguimiento.seguimiento_2_activo = false`.

---

## 3. `gracias_visita_vs` — Categoría: **Utilidad**

**Cuerpo:**
```
Hola {{1}}, gracias por visitarnos en Valencia Stetic. ¿Cómo fue tu experiencia? Si quieres, puedes contarnos tu opinión respondiendo este mensaje.
```
Ejemplo: `Laura`

Solo se usa si al marcar "Asistió" la ventana de 24 h ya se cerró. No se pide calificación positiva ni se condiciona nada a la reseña.

---

## 4. `aviso_equipo_vs` — Categoría: **Utilidad**

**Cuerpo:**
```
Aviso de agenda Valencia Stetic: {{1}}
```
Ejemplo: `Nueva cita: Laura Gómez · Masaje relajante · jueves 5 de noviembre a las 10:00 a. m.`

Se envía a los números de `STAFF_WA_NUMBERS` cuando entra una cita, se cancela/reprograma o un cliente necesita asesora. Si no quieres avisos por WhatsApp, deja vacío `STAFF_WA_NUMBERS`: todo queda igual en el panel.

---

## 5. `cita_web_vs` — Categoría: **Utilidad**

La usa la **página de reservas** (`/reservas`) para confirmar por WhatsApp una cita hecha en la web, cuando la persona todavía no ha escrito al número (ventana de 24 h cerrada). Si ya escribió, el sistema envía texto libre con botones y no necesita plantilla.

**Cuerpo:**
```
Hola {{1}}, recibimos tu reserva en Valencia Stetic: {{2}}, el {{3}} a las {{4}}. Tu código es {{5}}. ¿Nos confirmas tu asistencia?
```
Ejemplos para revisión: `Laura` · `Cuidado facial` · `jueves 5 de noviembre` · `10:00 a. m.` · `VS-7K3QMD`

**Botones (respuesta rápida), en este orden:**
1. `Confirmo asistencia`
2. `Cambiar horario`
3. `Cancelar cita`

Cada botón envía el *payload* `cita:confirmar:ID`, `cita:reprogramar:ID` o `cita:cancelar:ID`, igual que el recordatorio.

> Mientras la plantilla no esté aprobada, la persona igual puede confirmar tocando **«Confirmar por WhatsApp»** en la pantalla final de la reserva: abre su chat con el mensaje «Hola, reservé en la web con el código VS-XXXXXX…» y el bot reconoce el código.
