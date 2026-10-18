# Procedimientos de operación

Pasos que sigo para operar Local. No hay secretos acá: las claves viven en el panel de cada servicio y solo en mi terminal.

## 1. Publicar una versión nueva
1. `npx tsc --noEmit` (revisión de tipos)
2. `npm run lint` (los errores frenan la publicación)
3. `npm run build`
4. Mirar el cambio en el navegador, en computadora y en ancho de celular.
5. `npm run deploy`
6. Pasar la lista de chequeo en el sitio real ([test-plan.md](test-plan.md)).
7. Guardar el cambio con un mensaje que diga qué cambió y por qué.

## 2. Aplicar una migración de la base de datos
1. Hacer una copia de seguridad (sección 3).
2. Leer la migración. Si reescribe una función compartida, compararla con la última versión de esa función (BUG-003).
3. Correrla en el editor SQL de la base de datos y confirmar que salió bien.
4. Aplicarla **antes** de publicar el código que depende de ella.
5. Recorrer a mano todo el alta de un comercio: registrarse, volverse comerciante, crear un comercio.
6. Anotar la migración en el README del proyecto.

## 3. Copia de seguridad de los datos
El plan gratuito de la base de datos no hace copias automáticas, así que corro un script una vez por semana y antes de cada migración.
1. Abrir una terminal en la carpeta del proyecto.
2. Cargar la dirección de la base y la clave de servicio **solo en esa terminal**, nunca en un archivo, una captura o un chat.
3. Correr el script: crea un archivo JSON por tabla en una carpeta con fecha.
4. Guardar la carpeta en un lugar privado (tiene datos personales).
5. Borrar la clave de la terminal.

Además, un proceso programado consulta la base todos los días para que el plan gratuito no la pause.

## 4. Dominio y correo
1. Registrar el dominio donde se administran los DNS.
2. Conectarlo a la app; el sitio del catálogo va en un subdominio.
3. Redirigir `www` al dominio principal con una redirección permanente.
4. Correo de contacto: reenviar la dirección del dominio a una casilla personal y mandar una prueba.
5. Correo de la app: agregar el dominio al proveedor de correo, crear los registros DNS, esperar el "verificado", crear una clave solo para enviar y cargarla en el servicio de cuentas.
6. Traducir las plantillas de correo y mandar una prueba real de cada una.
7. Apagar el seguimiento de clics en los correos de la app: reescribe los links y puede romper los de un solo uso.

## 5. Lista de seguridad de las cuentas
- [ ] Verificación en dos pasos en la cuenta con la que se entra al alojamiento, la base de datos y el código.
- [ ] Códigos de recuperación guardados fuera de línea.
- [ ] Ningún secreto en capturas, chats, commits ni documentos. Si se expone uno, se cambia.
- [ ] La clave de servicio se usa solo para las copias de seguridad, desde una terminal.
- [ ] Seguridad por filas activada en todas las tablas; los roles solo cambian por un administrador (salvo de cliente a comerciante).
- [ ] El rol de administrador se asigna a mano en la base de datos, nunca desde la app.

## 6. Modelo de informe de incidente
```
Título:
Quién lo detectó y cuándo:
Impacto (quién no pudo hacer qué):
Causa:
Arreglo:
Cómo se verificó:
Qué cambia en el proceso:
```
