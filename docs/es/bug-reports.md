# Reportes de fallas

Diez fallas reales encontradas al probar Local en octubre de 2026.
**Gravedad:** Crítica = impide registrarse, pedir o dar de alta un comercio. Alta = una pantalla principal no anda. Media = funciona pero confunde. Baja = estética o causada por la plataforma.

| # | Falla | Gravedad |
|---|---|---|
| 001 | El cartel de inicio de sesión sale cortado arriba (computadora) | Alta |
| 002 | Código de verificación rechazado y paso perdido al recargar | Media |
| 003 | El panel de comercio falla después de una migración | **Crítica** |
| 004 | No hay forma de abrir el perfil en computadora | Media |
| 005 | Links compartidos con el dominio viejo y vista previa genérica | Media |
| 006 | El puntito de ubicación nunca aparece | Baja |
| 007 | La app instalada sigue con el ícono viejo | Baja |
| 008 | Logo aceptado sin revisar su calidad | Media |
| 009 | Mapa vacío en producción tras actualizar una librería | Alta |
| 010 | Falsos errores al probar en una pestaña en segundo plano | Baja |

---

## BUG-001 · El cartel de inicio de sesión sale cortado arriba (computadora)
- **Qué pasó:** al tocar "Iniciar sesión", el cartel se dibujaba dentro de la barra de arriba, con el campo de email cortado y sin fondo oscurecido.
- **Causa:** la barra usa `backdrop-filter`, que la convierte en la caja de referencia de los elementos `position: fixed`, y el fondo del cartel tomaba el tamaño de la barra.
- **Arreglo:** dibujar el cartel directamente en `document.body`.
- **Verificado:** lo abrí en computadora y en celular, y agregué una prueba automática de regresión.
- **Lección:** probar cada cartel nuevo dentro de contenedores con filtros o transformaciones.

## BUG-002 · Código de verificación rechazado y paso perdido al recargar
- **Qué pasó:** el campo aceptaba 6 dígitos, pero el mail traía un código de 10. Además, al volver de la app de correo la pantalla volvía al primer paso.
- **Causa:** el largo del código estaba fijo en la pantalla y el servicio de cuentas usaba otro; el estado "código pedido" vivía solo en memoria.
- **Arreglo:** aceptar de 6 a 10 dígitos, dejar el servicio en 6 y guardar el paso en `sessionStorage` durante 15 minutos.
- **Verificado:** probé de nuevo el flujo completo después del arreglo.
- **Lección:** lo que se configura en un servicio externo tiene que coincidir con lo que supone la pantalla.

## BUG-003 · El panel de comercio falla después de una migración (regresión)
- **Qué pasó:** al tocar el ícono del comercio aparecía "No pudimos activar tu panel", en web y en celular. Reintentar no ayudaba.
- **Causa:** una migración nueva reescribió una función compartida de la base de datos a partir de una versión vieja y borró una regla posterior que permite que un cliente se vuelva comerciante.
- **Arreglo:** una migración posterior unió todas las reglas, y se corrigió también el archivo defectuoso.
- **Verificado:** abrí el panel desde una cuenta de cliente y se activó.
- **Lección:** después de cada migración recorro a mano todo el alta de un comercio. El cambio lo escribió una IA y mi revisión no lo comparó con la versión anterior de la función; lo detectó la prueba manual de punta a punta.

## BUG-004 · No hay forma de abrir el perfil en computadora
- **Qué pasó:** el botón de cuenta de la barra cerraba la sesión. El link al perfil estaba solo en la barra de abajo del celular.
- **Causa:** el botón existía antes que la pantalla de perfil y nunca se actualizó.
- **Arreglo:** el botón abre el perfil; cerrar sesión quedó adentro.
- **Verificado:** probé de nuevo en computadora.

## BUG-005 · Links compartidos: dominio viejo y vista previa genérica
- **Qué pasó:** el link de un comercio enviado por WhatsApp usaba la dirección vieja `workers.dev` y mostraba la tarjeta genérica de Local.
- **Causa:** el link se armaba con la dirección abierta en ese momento; y los programas de vista previa no ejecutan JavaScript, así que solo veían los datos por defecto.
- **Arreglo:** los links usan siempre el dominio principal; la página de cada comercio ahora entrega en el servidor su título, descripción e imagen, y después redirige en el navegador.
- **Verificado:** pedí la página con el identificador de WhatsApp, y después mandé un link real y vi el nombre del comercio.
- **Lección:** probar las vistas previas con el identificador de un rastreador. Se agregó una prueba de regresión.

## BUG-006 · El puntito de ubicación nunca aparece
- **Clasificación:** del entorno, no es una falla de la app.
- **Qué pasó:** no aparecía el pedido de permiso ni el puntito en el mapa.
- **Causa:** el navegador tenía bloqueada la ubicación para el sitio; una vez bloqueada, un sitio no puede volver a pedirla.
- **Arreglo:** se documentó cómo desbloquearla (computadora, Android, iPhone). La app además vuelve a pedirla cuando la pestaña recupera el foco y cuando cambia el permiso.
- **Verificado:** al desbloquearla, apareció el puntito.

## BUG-007 · La app instalada sigue con el ícono viejo
- **Clasificación:** comportamiento de la plataforma.
- **Causa:** las apps web instaladas guardan su ícono; en iPhone nunca se actualiza y en Android puede tardar días.
- **Arreglo:** ninguno en el código. Se documentó: desinstalar la app y volver a instalarla.

## BUG-008 · Logo aceptado sin revisar su calidad
- **Qué pasó:** el primer archivo medía 1024 px pero era una captura de 169 px agrandada, con bordes blandos y esquinas oscuras.
- **Causa:** no había criterios para aceptar imágenes de diseño.
- **Arreglo:** escribí lo que necesito (transparencia real, sin cuadritos dibujados, tamaño, colores exactos) y pedí un archivo nuevo; reemplazó al primero en todos lados.
- **Verificado:** revisé el canal de transparencia y lo vi sobre fondo claro y oscuro.
- **Lección:** las imágenes se revisan antes de usarlas, y los límites de calidad se avisan antes de aplicar, no después.

## BUG-009 · Mapa vacío en producción tras actualizar una librería
- **Qué pasó:** el mapa del sitio real salía gris y vacío; en desarrollo andaba.
- **Causa:** la versión nueva carga un archivo auxiliar que la versión de producción no incluía.
- **Arreglo:** se volvió a la versión anterior y se agregó un plan B: si la capa vectorial no se dibuja en 25 segundos, se muestran mapas de imágenes simples.
- **Verificado:** confirmé en el sitio real que el mapa vectorial se dibuja.
- **Lección:** cada actualización de una librería se revisa en el sitio real, no solo en local.

## BUG-010 · Falsos errores en una pestaña en segundo plano
- **Clasificación:** del entorno de pruebas.
- **Qué pasó:** el mapa parecía roto y el temporizador del plan B saltaba antes de tiempo, y después daba error al quitar una capa.
- **Causa:** los navegadores pausan el dibujo y los temporizadores en pestañas en segundo plano; además el código del plan B suponía que el mapa seguía existiendo.
- **Arreglo:** el temporizador arranca solo cuando la pestaña está visible, y el plan B oculta la capa en vez de quitarla.
- **Lección:** las pruebas de dibujo se hacen con la pestaña visible; si un resultado parece raro, mirar primero el estado de la pestaña.
