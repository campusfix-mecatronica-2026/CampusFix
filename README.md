# CampusFix

Aplicación móvil para reportar, gestionar y hacer seguimiento a problemas dentro de una institución educativa.
## Visión del proyecto

CampusFix busca mejorar la comunicación entre la comunidad educativa y el personal encargado de solucionar incidentes. La aplicación permitirá registrar reportes de infraestructura, tecnología, seguridad y limpieza, además de consultar su estado hasta que sean resueltos.
## Problema a resolver

Actualmente, los daños y problemas dentro de las instituciones educativas suelen comunicarse por canales informales, como conversaciones o mensajes. Esto ocasiona falta de registro, poca claridad sobre las prioridades y dificultad para conocer si el problema ya fue atendido.
## Solución propuesta

CampusFix centralizará los reportes en una aplicación móvil. Los usuarios podrán registrar el tipo de problema, descripción, ubicación, prioridad y evidencia fotográfica. La información se almacenará en la nube para que el personal responsable pueda actualizar el estado del reporte y el usuario pueda consultar su progreso.
## Stack tecnológico propuesto

- **Aplicación móvil:** React Native con Expo.
- **Lenguaje:** TypeScript.
- **Servicios en la nube:** Firebase Authentication, Cloud Firestore y Firebase Storage.
- **Control de versiones:** Git y GitHub.
- **Gestión ágil:** tablero Kanban de GitHub Projects.
## Integrantes del equipo

- **Jeyson Arley Sánchez Gómez** — Código: 202210063611
- **Jorge Armando Sánchez Quintero** — Código: 202220003611
## Usuarios objetivo

- Estudiantes, docentes y personal administrativo que necesiten reportar un problema.
- Personal de mantenimiento, tecnología, seguridad y limpieza encargado de atender los reportes.
- Administradores de la institución que necesiten supervisar los incidentes y sus prioridades.

## Alcance inicial del producto (MVP)

- Registro e inicio de sesión de usuarios.
- Creación de reportes con categoría, descripción, ubicación, prioridad y fotografía.
- Consulta de los reportes creados y su estado.
- Actualización del estado por parte del personal responsable.
- Almacenamiento de la información y las fotografías en la nube.
## Tablero Kanban

El Product Backlog del proyecto está disponible en el siguiente enlace:

[CampusFix - Product Backlog](https://github.com/orgs/campusfix-mecatronica-2026/projects/1/views/1)

## Sprint 2 - Diseño UX/UI y arquitectura

El Sprint 2 incorpora un prototipo móvil navegable desarrollado con React Native y Expo. El flujo validado incluye:

- Inicio de sesión.
- Pantalla principal y resumen de reportes.
- Creación del reporte en dos pasos.
- Registro de ubicación, prioridad y evidencia fotográfica.
- Confirmación con identificador único.
- Consulta del detalle y seguimiento del incidente.

La arquitectura propuesta sigue el patrón **MVVM** y contempla Firebase Authentication, Cloud Firestore, Firebase Storage y Cloud Functions como servicios administrados.

### Entregables

- [Informe de la Actividad Evaluable 02 (PDF)](docs/CampusFix_Actividad_Evaluable_02.pdf)
- [Informe editable (Word)](docs/CampusFix_Actividad_Evaluable_02.docx)
- [Diagrama de arquitectura MVVM](docs/arquitectura-campusfix.svg)
- [Evidencias del prototipo](docs/evidencias/)

