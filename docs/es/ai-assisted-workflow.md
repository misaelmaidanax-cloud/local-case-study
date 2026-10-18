# Cómo trabajo con asistentes de IA

El código de Local lo escribe un asistente de programación con IA (Claude Code). Yo lo dirijo, reviso lo que produce, pruebo el resultado y decido qué se publica.

## Quién hace qué

| Yo | El asistente |
|---|---|
| Decido el producto: qué se hace y en qué orden | Escribe y edita código y migraciones |
| Describo los problemas con capturas de dispositivos reales | Propone planes, riesgos y alternativas |
| Apruebo los planes de cualquier flujo, diseño o integración nueva | Corre revisión de tipos, lint y compilación antes de cada publicación |
| Pruebo cada cambio en el sitio real, en computadora y celular | Prepara borradores: textos legales, plantillas de correo y archivos de marca |
| Manejo yo las claves, las cuentas y la decisión de publicar | Nunca recibe contraseñas ni claves |

## Reglas que fijé
1. **Plan antes de los cambios grandes.** Los arreglos chicos y claros se aplican directo.
2. **Controles antes de cada publicación:** pasan la revisión de tipos, el lint y la compilación, y después miro el cambio en el navegador.
3. **Textos mínimos en la interfaz.**
4. **Usar exactamente el archivo que doy.** Nunca redibujar la marca; avisar los límites de calidad antes de aplicar.
5. **Recordarme solo cuando lo pido.**
6. **Ningún secreto en chats ni capturas.** Si se filtra uno, se cambia.

Las reglas quedan guardadas en las notas del asistente, así que valen en cada sesión nueva.

## El ciclo
1. Cuento un problema o una idea, casi siempre con una captura.
2. El asistente lo reproduce, explica la causa y propone un arreglo con sus riesgos.
3. Yo apruebo o cambio el rumbo.
4. Implementa, corre los controles, lo revisa en un navegador y publica.
5. Yo verifico en mis dispositivos. Se actualiza el tablero de tareas.

## Dónde falló
- **BUG-003:** una migración escrita por la IA revirtió una regla anterior y rompió el alta de comercios. Los controles del código pasaron todos porque la falla estaba en el comportamiento de la base de datos; la detectó una prueba manual de punta a punta.
- **Marca:** armó variantes del logo que no pedí. Le indiqué que use mi archivo tal cual.
- **Textos de la interfaz:** seguía agregando explicaciones amables. Lo pedí tres veces; ahora la regla quedó guardada.

## Qué aprendí
- Los controles automáticos dicen que el código compila, no que un comercio nuevo pueda registrarse.
- La revisión más valiosa compara el comportamiento entre versiones de una pieza compartida, no un archivo aislado.
- Reglas escritas y un tablero de tareas hacen al asistente mucho más consistente entre sesiones.
