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
## Integrante del proyecto

- **Jeyson Arley Sánchez Gómez** — Código: 202210063611
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

## Sprint 3 - Esqueleto móvil y navegación básica

El incremento del Sprint 3 reorganiza el prototipo según el patrón **MVVM** y conecta las siete vistas mediante un navegador Native Stack tipado. El trabajo se desarrolla en la rama [`sprint-3-esqueleto-navegacion`](https://github.com/campusfix-mecatronica-2026/CampusFix/tree/sprint-3-esqueleto-navegacion).

### Estructura del código

```text
src/
├── components/    Componentes visuales reutilizables
├── data/          Datos iniciales del prototipo
├── models/        Entidades y tipos del dominio
├── navigation/    Rutas y navegador principal
├── services/      Construcción y consulta de reportes
├── theme/         Colores y estilos compartidos
├── viewmodels/    Estado y reglas de presentación
└── views/         Pantallas conectadas de la aplicación
```

### Flujo navegable

```text
Inicio de sesión
  → Inicio
    → Nuevo reporte
      → Evidencia y ubicación
        → Confirmación
          → Detalle del reporte
    → Mis reportes
      → Detalle del reporte
```

### Ejecución local

```bash
npm install
npm run web
```

Para probarlo en Expo Go se utiliza `npm start`; para Android, `npm run android`.

## Actividad Evaluable 06 - Base de datos cloud

CampusFix se encuentra conectado al proyecto Firebase `campusfix-corte2-jeyson-2026` mediante el SDK modular. La aplicacion autentica usuarios con correo y contrasena, crea reportes en Cloud Firestore, registra el evento inicial en la subcoleccion `history` y consulta los reportes del usuario ordenados por fecha.

### Entregables

- [Informe final en PDF](docs/taller-6/CampusFix_Actividad_Evaluable_06_Base_de_Datos_Cloud.pdf)
- [Informe editable en Word](docs/taller-6/CampusFix_Actividad_Evaluable_06_Base_de_Datos_Cloud.docx)
- [Modelo de datos](docs/taller-6/MODELO_DATOS.md)
- [Diccionario de datos](docs/taller-6/DICCIONARIO_DATOS.md)
- [Reglas de Firestore](firestore.rules)
- [Indices de Firestore](firestore.indexes.json)

## Taller 7 - Sprint Review Corte 2

El Taller 7 consolida la trazabilidad del incremento cloud, la validacion del Definition of Done y las evidencias de funcionamiento de CampusFix.

### Entregables

- [Documento consolidado SPRINT_REVIEW_CORTE2.md](docs/SPRINT_REVIEW_CORTE2.md)
- Discussion Sprint Review Corte 2: pendiente de publicar desde `Jeyson17-as`.
- Pull Request de Firebase y Sprint Review: pendiente de publicar desde `Jeyson17-as`.
- [Evidencias de persistencia cloud](docs/taller-6/evidencias/)
- [Compilacion Android en Expo EAS](https://expo.dev/accounts/campusfix-mecatronica-2026/projects/campusfix/builds/de0c249b-a324-46bc-aa18-7aebd8ae5ddb)
- GitHub Release con APK: pendiente de publicar desde `Jeyson17-as`.

