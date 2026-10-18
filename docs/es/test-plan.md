# Plan de pruebas

Se actualiza después de cada publicación y de cada incidente.

**Incluye:** búsqueda y mapa, ficha del comercio, carrito y pedido, cuenta, perfil, panel de comercio, administración, correo, instalación de la app, vistas previas de links, páginas legales y dominios.
**Por ahora no incluye:** pruebas de carga, auditoría de accesibilidad ni pagos (la app no procesa pagos).

## Dispositivos

| Dispositivo | Navegador | Para qué |
|---|---|---|
| Computadora con Windows | Chrome | Camino principal en computadora |
| Celular Android | Chrome, app instalada | Camino principal de los usuarios: instalar, ubicación, WhatsApp |
| iPhone | Safari | Instalación manual, sin aviso de instalación |
| Ventana de 375 px de ancho | Chrome | Revisión rápida del diseño en celular |

Las pruebas se hacen sobre el sitio real (`localarg.com`) después de cada publicación. Las pruebas automáticas son de solo lectura.

## Áreas de riesgo, de más a menos importante

1. **Alta de comercios** (registrarse, volverse comerciante, crear un comercio, verlo en el mapa). Se rompió una vez por una migración (BUG-003).
2. **Pedir sin cuenta** y el pase a WhatsApp.
3. **Cuenta:** registro (con términos obligatorios), inicio de sesión, recuperar contraseña, verificación opcional del correo.
4. **Mapa y ubicación:** pines según el zoom, estados del permiso, mapa vectorial y plan B.
5. **Links compartidos y vistas previas** (BUG-005).
6. **Instalación:** manifiesto, íconos, barra de instalación.
7. **Migraciones** que tocan funciones compartidas de la base de datos.

## Lista de chequeo antes de cada publicación

- [ ] La página principal carga, con el título correcto y el mapa presente.
- [ ] "Iniciar sesión" abre un cartel centrado.
- [ ] "Crear cuenta" sin aceptar los términos muestra un error y no crea nada.
- [ ] `/terminos` y `/privacidad` abren.
- [ ] El link de un comercio entrega el nombre de ese comercio en su vista previa.
- [ ] El manifiesto es válido y cada ícono tiene el tamaño declarado.
- [ ] `www` redirige al dominio principal y el sitio del catálogo carga.
- [ ] A mano, después de cualquier migración: registrarse, volverse comerciante, crear un comercio y hacer un pedido.
- [ ] A mano, en un celular: barra de instalación, pedido de ubicación y compartir el link de un comercio por WhatsApp.

La parte automática está en [../../tests](../../tests).

## Límites conocidos de los navegadores (no son fallas)

- Un permiso de ubicación bloqueado no se puede volver a pedir (BUG-006).
- Las apps instaladas conservan el ícono viejo hasta reinstalarlas (BUG-007).
- iPhone no muestra aviso de instalación.
- Los rastreadores de vista previa no ejecutan JavaScript (BUG-005).
- Las pestañas en segundo plano pausan el dibujo y los temporizadores (BUG-010).

## Cuando aparece una falla

Se registra en [bug-reports.md](bug-reports.md), se verifica el arreglo en el sitio real, se agrega una prueba de regresión si se puede automatizar, y se actualiza esta lista si la causa fue un hueco en el proceso.
