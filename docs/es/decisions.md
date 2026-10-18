# Decisiones

Por qué Local es como es, y qué se descartó.

| # | Decisión | Por qué | Descartado |
|---|---|---|---|
| D-01 | **Tecnología:** un framework de React en servidores de borde, con base de datos, cuentas y seguridad por filas administradas | Una sola persona, sin presupuesto para servidores, páginas rápidas en Argentina y reglas de seguridad reales | Un servidor propio (más para mantener); un armador sin código (poco control de permisos y del mapa) |
| D-02 | **Pedir no requiere cuenta**; alcanzan nombre y teléfono, y el pedido va al comercio por WhatsApp | La gente del barrio no se registra para comprar un solo producto | Registro obligatorio (se pierden los primeros usuarios) |
| D-03 | **La verificación del correo es opcional**, con un código escrito en la misma pantalla y una insignia chica | El registro tiene que seguir siendo rápido; la insignia no bloquea nada | Un link de verificación (las apps de correo abren y gastan los links); verificación obligatoria |
| D-04 | **Un solo dominio principal**; la página de cada comercio entrega sus datos de vista previa desde el servidor | Los links compartidos mostraban la dirección vieja y una tarjeta genérica | Redirigir en el servidor (los rastreadores lo seguirían y verían datos por defecto) |
| D-05 | **Mapa:** mosaicos vectoriales abiertos con estilo propio y plan B con mapas de imágenes | Aspecto limpio en todos los zooms, sin clave de pago y sin fallar del todo si el proveedor se cae | Un proveedor pago (costo y una clave que cuidar); mapa solo de imágenes (borroso al acercar) |
| D-06 | **Instalación:** barra propia en cada visita, instrucciones en iPhone y un service worker mínimo que no guarda nada | Los navegadores deciden cuándo avisar y iPhone nunca avisa | Forzar el aviso (no se puede sin un toque); caché sin conexión (precios y stock viejos) |
| D-07 | **Textos mínimos en la interfaz** | El público son comerciantes y vecinos; las frases de más los distraían | Mensajes amables con explicaciones |
| D-08 | **Copias de seguridad con un script, y una consulta diaria a la base** | El plan gratuito de la base no hace copias y se pausa si no se usa | Pagar el plan antes de tiempo |

**Consecuencias a tener en cuenta:** la seguridad vive en las reglas de la base de datos, así que las migraciones son las publicaciones más riesgosas (BUG-003). El proveedor del mapa se sostiene con donaciones; si crece el tráfico, cambiarlo es tocar un solo archivo.
