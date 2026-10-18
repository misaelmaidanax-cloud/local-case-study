# Local: pruebas (QA), operación y gestión de incidentes

<p align="center"><img src="assets/local-brand.png" alt="Logo de Local" width="480"></p>

> 🇬🇧 English version: [README.md](README.md)

Caso de estudio de cómo probé, operé y documenté **[Local](https://localarg.com)**, una aplicación web real y en funcionamiento que conecta a vecinos de Córdoba, Argentina, con los comercios de su barrio (kioscos, almacenes, farmacias, ferreterías y más).

Este repositorio **no** contiene el código de la aplicación. Contiene el trabajo que la rodea: planes de prueba, reportes de fallas con su causa, pruebas automáticas, procedimientos de operación y registros de decisiones.

## Mi rol

Soy el dueño del producto, y además su tester y operador.

- **Dueño del producto:** decido qué se construye, en qué orden y cuándo está listo para publicarse.
- **QA:** hago pruebas manuales y exploratorias en computadora y celular, escribo los reportes de fallas y verifico cada arreglo en el sitio real.
- **Operación:** dominio, correo, copias de seguridad, publicaciones de versiones, seguridad de las cuentas y un tablero de tareas.
- **Desarrollo:** el código lo escriben asistentes de IA (Claude Code) bajo mi dirección. No lo presento como código escrito a mano. Lo que aporto es la dirección del producto, las pruebas, la revisión de cada cambio y la disciplina de operación. Ver [docs/ai-assisted-workflow.md](docs/ai-assisted-workflow.md).

## Qué hay en este repositorio

| Carpeta o archivo | Qué muestra |
|---|---|
| [docs/test-plan.md](docs/test-plan.md) | Alcance, dispositivos, áreas de riesgo y la lista de chequeo que corro antes de cada publicación |
| [docs/bug-reports.md](docs/bug-reports.md) | Diez fallas reales: pasos, esperado y obtenido, causa, arreglo y cómo lo verifiqué |
| [docs/runbooks.md](docs/runbooks.md) | Publicación de versiones, copias de seguridad, dominio y correo, y seguridad de las cuentas |
| [docs/decisions.md](docs/decisions.md) | Por qué se tomó cada decisión técnica y qué se descartó |
| [docs/ai-assisted-workflow.md](docs/ai-assisted-workflow.md) | Cómo dirijo, reviso y verifico el código escrito por IA |
| [docs/skills-map.md](docs/skills-map.md) | Lo que hice acá, relacionado con puestos de QA, soporte y operaciones |
| [tests/](tests/) | Pruebas automáticas con Playwright contra el sitio real, incluidas pruebas de regresión de fallas pasadas |

El resto del detalle (producto, tecnologías, resultados) está en la [versión en inglés](README.md).

## Sobre mí

Experiencia en QA y operaciones de IA: pruebas manuales y automatizadas (Cypress, Selenium, Playwright), automatizaciones sin código e integraciones (n8n, Make, GoHighLevel, Zapier), soporte técnico y mesa de ayuda, y antes mantenimiento de aeronaves. Busco puestos remotos en QA, producto u operaciones de IA, soporte técnico o implementación.

- LinkedIn: _agregar el link_
- Proyecto: [localarg.com](https://localarg.com)
