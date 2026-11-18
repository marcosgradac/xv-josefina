# Supabase real — XV Josefina

## Estado actual

Se usa el proyecto existente XV Josefina (kbuwwwfpxesxjpvipjmy). No ejecutar las migraciones antiguas de supabase/migrations: corresponden a una propuesta anterior con otro esquema y NO al servidor actual. Tampoco ejecutar scripts/generate-tariffs.mjs ni los antiguos scripts/rsvp-browser-*.mjs como backend de esta aplicación. No se recrearon tablas ni se modificaron políticas, usuarios o contraseñas.

## Ejecutar

La conexión local está en .env.local (ignorado por Git). Solo contiene VITE_SUPABASE_URL y VITE_SUPABASE_PUBLISHABLE_KEY. Nunca agregar claves secret/service_role ni contraseñas.

- npm install
- npm run dev
- Abrir http://localhost:5173 y http://localhost:5173/admin
- npm run build
- npm run lint
- npm run test:rsvp

Supabase JS está fijado a 2.119.0. La ruta /admin tiene rewrite para Vercel. Para producción, agregar las mismas dos variables públicas en Vercel y volver a desplegar; este trabajo no hace commit, push ni deploy.

## Contrato existente

- Público: supabase.functions.invoke('submit-rsvp'). Envía client_request_id, full_name, phone_country_code, phone_number, adults_count, teens_count, children_count, under_five_count, song_request y attendance_status. No envía importes, precios ni total de personas. Reutiliza UUID para reintentar el mismo contenido y bloquea doble toque. Solo confirma cuando recibe ok:true, id y totales válidos del servidor.
- Estimación visual: src/config/pricing.ts; valores 60000 / 40000 / 25000 / 0. La respuesta definitiva procede de la función.
- Administración: Supabase Auth con contraseña manual, sesión persistente y my_admin_status() === true antes de descargar datos. Sin registro público ni enlace en el menú de invitados.
- El panel obtiene las familias activas de `rsvp_dashboard` en páginas de 500 filas. Consulta `payments` únicamente para esos identificadores. Cuando la vista está vacía, el panel muestra totales en cero y omite la consulta de pagos.
- Edición: UPDATE rsvp_submissions con los campos editables únicamente; filtro id y updated_at para detectar cambios concurrentes. La base calcula los totales. No permite reducción por debajo de lo abonado; se informa al usuario. No hay eliminación definitiva.
- Pagos: INSERT payments con id UUID de operación, submission_id, amount, payment_method y note. No se envía recorded_by; lo asigna la base. Reintentos del mismo pago reutilizan id y verifican un posible duplicado autenticado antes de mostrar éxito. No se realizan cobros ni transferencias.
- Después de cada cambio se recarga la vista y el historial. No hay sincronización realtime; botón Actualizar.

## Retirar una asistencia

En **Familias**, abrí el detalle y pulsá **Eliminar asistencia**. El modal muestra el nombre, los integrantes y el importe abonado. Si hubo pagos, confirmá únicamente después de devolver ese dinero. El registro se hace en el mismo paso y la aplicación vuelve a Familias con los totales actualizados.

La función suma los pagos originales en Supabase, comprueba el importe mostrado en el modal y archiva la asistencia en la misma transacción que registra la devolución. En **Pagos**, la entrada **DEVOLUCIÓN** aparece con signo negativo junto a los pagos originales. Una asistencia sin pagos solo se archiva. Si cambió el importe o la asistencia, actualizá el panel antes de reintentar. No restaures una asistencia con devolución poniendo `archived_at` en `NULL` sin reconciliar el historial económico.

La migración propuesta está en `supabase/review/archive-with-refund.sql`. Revisá su compatibilidad con el esquema y los triggers de pagos del proyecto desplegado. Una vez aprobada, aplicá únicamente ese archivo antes de publicar la interfaz. La vista existente debe excluir las asistencias archivadas y la cuenta administradora debe poder leer sus pagos originales para mostrarlos junto a la devolución. La prueba local usa PostgreSQL embebido y un esquema de prueba.

## Pruebas

`npm run test:rsvp` comprueba tarifas, menores gratis, saldos, permisos del panel, exclusión de pagos archivados y protección contra archivado duplicado. Usa un transporte simulado.

Las migraciones y scripts antiguos quedan como referencia histórica; sus resultados NO validan el esquema actual. No aplicarlos a este proyecto Supabase.

## Seguridad y pendientes de publicación

Se comprobó con la clave pública que consultas anónimas a rsvp_submissions, rsvp_dashboard, payments y my_admin_status se rechazan. El preflight de submit-rsvp responde y permite CORS. Estas comprobaciones no demuestran por sí solas todas las reglas RLS.

No se dispone del código desplegado de la Edge Function ni de acceso al dashboard para auditar sus límites de frecuencia/CAPTCHA. Antes de publicar, verificar esas medidas en servidor. No se inventó una clave CAPTCHA ni se modificó la función existente a ciegas. No usar un CAPTCHA solo en el navegador como protección.

No se crearon usuarios alternativos para probar permisos. Un usuario autenticado no administrador debe probarse con una cuenta existente autorizada para esa prueba. La contraseña actual se conserva y nunca se incluye en código ni documentación.

## Verificación real de esta integración

Se inició sesión manualmente con la cuenta existente y se validó acceso a la vista. La sesión se conservó al recargar. Se creó UN registro identificado como PRUEBA TÉCNICA CODEX (id fa7c080a-ff1f-4dc0-bf34-e8b402c93109): cinco personas y 185000. Se registraron pagos técnicos de 50000 y 135000, ambos con observación explícita de que no representan dinero real. La vista confirmó PARCIAL / saldo 135000 y luego PAGADO / saldo 0. Se modificó el nombre a PRUEBA TÉCNICA CODEX · EDICIÓN VERIFICADA y se comprobó que se conserva el historial. Se verificaron búsqueda por teléfono y listado/copia de canción. Un envío anónimo inválido fue rechazado por la Edge Function con HTTP 400 sin guardar datos.

Los registros técnicos fueron archivados en Supabase. Sus pagos se conservan como respaldo privado y quedan fuera del panel activo.

Se verificó también el cierre de sesión: el panel y los datos desaparecen en las pestañas abiertas y vuelve el ingreso manual. La revisión visual mostró el panel a 360 px. Quedan pendientes: usuario autenticado no administrador, auditoría de spam/CAPTCHA en servidor y configuración de variables en Vercel.
