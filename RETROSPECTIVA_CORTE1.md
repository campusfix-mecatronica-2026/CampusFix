# Retrospectiva del Corte I - CampusFix

**Asignatura:** Mobile Cloud Computing - IS0249-210  
**Programa:** Ingenieria Mecatronica  
**Proyecto:** CampusFix  
**Integrantes:** Jeyson Arley Sanchez Gomez y Jorge Armando Sanchez Quintero  
**Fecha:** 20 de septiembre de 2026

## 1. Proposito y alcance

Esta retrospectiva analiza el trabajo realizado durante los tres primeros sprints de CampusFix:

1. **Sprint 1:** inception del proyecto y Product Backlog.
2. **Sprint 2:** diseno UX/UI y definicion arquitectonica.
3. **Sprint 3:** esqueleto movil, navegacion basica y distribucion de un APK de prueba.

El objetivo es reconocer los resultados obtenidos, identificar oportunidades de mejora y convertirlas en acciones concretas para el Corte II. Las conclusiones se sustentan con evidencias trazables del repositorio oficial.

## 2. Resumen de lo realizado

### Sprint 1 - Inception y Product Backlog

Se definio CampusFix como una aplicacion movil para registrar y hacer seguimiento a incidentes de infraestructura, tecnologia, seguridad y limpieza dentro de una institucion educativa. Se establecieron el problema, los usuarios objetivo, el alcance inicial, las historias de usuario y el tablero Kanban.

**Evidencias:**

- [README del proyecto](https://github.com/campusfix-mecatronica-2026/CampusFix/blob/main/README.md)
- [Tablero Product Backlog](https://github.com/orgs/campusfix-mecatronica-2026/projects/1/views/1)
- [Commit inicial del proyecto](https://github.com/campusfix-mecatronica-2026/CampusFix/commit/8a07898)
- [Commit que incorpora el tablero Kanban](https://github.com/campusfix-mecatronica-2026/CampusFix/commit/727b1c4)

### Sprint 2 - Diseno UX/UI y arquitectura

Se desarrollo un prototipo movil navegable con el flujo de inicio de sesion, inicio, creacion del reporte, evidencia y ubicacion, confirmacion, listado y detalle. Se definio una arquitectura MVVM y se documento la integracion propuesta con Firebase Authentication, Cloud Firestore y Firebase Storage. Estos servicios cloud corresponden a la arquitectura prevista; su persistencia real todavia debe implementarse en el siguiente incremento.

**Evidencias:**

- [Commit del prototipo y la arquitectura](https://github.com/campusfix-mecatronica-2026/CampusFix/commit/b5da4b0)
- [Informe de la Actividad Evaluable 02](https://github.com/campusfix-mecatronica-2026/CampusFix/blob/main/docs/CampusFix_Actividad_Evaluable_02.pdf)
- [Diagrama de arquitectura MVVM](https://github.com/campusfix-mecatronica-2026/CampusFix/blob/main/docs/arquitectura-campusfix.svg)
- [Evidencias visuales del prototipo](https://github.com/campusfix-mecatronica-2026/CampusFix/tree/main/docs/evidencias)

### Sprint 3 - Esqueleto movil y navegacion

Se reorganizo la aplicacion en capas de modelos, vistas, viewmodels, servicios, componentes y navegacion. Se conectaron siete vistas con React Navigation Native Stack, se configuro Expo EAS y se genero un APK que fue instalado y probado en un dispositivo Android fisico. El flujo validado permite crear un reporte de demostracion y consultar su detalle; los datos siguen siendo locales y de prototipo.

**Evidencias:**

- [Rama del Sprint 3](https://github.com/campusfix-mecatronica-2026/CampusFix/tree/sprint-3-esqueleto-navegacion)
- [Pull Request #17 - Sprint 3](https://github.com/campusfix-mecatronica-2026/CampusFix/pull/17)
- [Commit de organizacion MVVM](https://github.com/campusfix-mecatronica-2026/CampusFix/commit/33feca0)
- [Commit de navegacion](https://github.com/campusfix-mecatronica-2026/CampusFix/commit/f694ccd)
- [Commit de configuracion EAS](https://github.com/campusfix-mecatronica-2026/CampusFix/commit/6d145ca)
- [Commit de pruebas del APK](https://github.com/campusfix-mecatronica-2026/CampusFix/commit/1ca9cdf)
- [Build de prueba en Expo EAS](https://expo.dev/accounts/campusfix-mecatronica-2026/projects/campusfix/builds/1b334e00-e097-4598-a3ca-583ae618174d)
- [Capturas del Sprint 3](https://github.com/campusfix-mecatronica-2026/CampusFix/tree/sprint-3-esqueleto-navegacion/docs/evidencias/sprint-3)

## 3. Que se hizo bien

1. **Definicion clara del problema y del alcance.** El Product Backlog y el flujo de CampusFix se mantuvieron alineados con la necesidad de reportar incidentes y consultar su seguimiento.
2. **Coherencia entre UX/UI y arquitectura.** Las pantallas del prototipo se transformaron en vistas conectadas y se organizaron de acuerdo con MVVM.
3. **Trazabilidad tecnica.** El Sprint 3 quedo registrado en una rama especifica, con commits descriptivos, un Pull Request y evidencias de la compilacion.
4. **Validacion en un dispositivo real.** El APK se genero con Expo EAS, se instalo en Android y se valido el flujo principal de navegacion.
5. **Uso adecuado de servicios administrados para la distribucion.** Expo EAS funciono como servicio cloud para compilar y distribuir el APK de prueba.

## 4. Que se puede mejorar

1. **Distribucion y trazabilidad del trabajo.** La mayor parte de los commits visibles esta asociada a un solo autor. En el siguiente corte cada integrante debe trabajar con ramas, commits y Pull Requests propios.
2. **Persistencia cloud.** Firebase aparece como arquitectura propuesta, pero todavia no existe evidencia de autenticacion ni almacenamiento real de reportes y fotografias.
3. **Pruebas automatizadas.** La validacion actual es principalmente manual. Se necesitan pruebas para la navegacion, las reglas del formulario y los servicios.
4. **Manejo de errores y estados.** Deben agregarse indicadores de carga, mensajes de error, validaciones de campos y respuesta ante fallos de red.
5. **Cierre oportuno de Pull Requests.** El PR #17 esta aprobado, pero continua abierto. El equipo debe acordar el momento de integracion y mantener `main` actualizado.

## 5. Reflexiones individuales

### Jorge Armando Sanchez Quintero

**Que se hizo bien**

- La implementacion del Sprint 3 se dividio en commits pequenos y descriptivos, lo cual permite relacionar cada cambio con navegacion, arquitectura, EAS y documentacion.
- Se logro generar e instalar un APK funcional y se guardaron evidencias del recorrido principal en un dispositivo Android.

**Que se puede mejorar**

- Es necesario incorporar pruebas automatizadas y una verificacion mas sistematica de errores, accesibilidad y casos limite.
- La integracion debe distribuirse mejor para que las contribuciones de ambos integrantes sean visibles mediante ramas y Pull Requests individuales.

**Accion propuesta**

- Crear una base de pruebas automatizadas para navegacion, validacion del formulario y servicios, e integrarla al flujo de Pull Requests del Corte II.

### Jeyson Arley Sanchez Gomez

**Que se hizo bien**

- El flujo definido desde el prototipo mantiene una secuencia comprensible: iniciar sesion, crear el reporte, registrar ubicacion y evidencia, confirmar y consultar el seguimiento.
- La arquitectura MVVM propuesta separa las responsabilidades y facilita que el prototipo evolucione hacia una solucion con servicios cloud.

**Que se puede mejorar**

- Se requiere aumentar la trazabilidad individual del trabajo mediante commits, revisiones y evidencias asociadas a cada integrante.
- Los datos del prototipo deben dejar de ser locales y conectarse con autenticacion, base de datos y almacenamiento de evidencias en la nube.

**Accion propuesta**

- Implementar el primer incremento de Firebase Authentication y Cloud Firestore, conservando la separacion MVVM y documentando la configuracion.

## 6. Acciones de mejora para el Corte II

| Accion | Responsable | Issue asociado | Prioridad |
|---|---|---|---|
| Implementar autenticacion y persistencia de reportes con Firebase | Jeyson Arley Sanchez Gomez | Pendiente de crear | Alta |
| Agregar pruebas automatizadas de navegacion, formulario y servicios | Jorge Armando Sanchez Quintero | Pendiente de crear | Alta |
| Definir ramas, commits y revisiones individuales para cada historia del Corte II | Jorge Armando Sanchez Quintero | Pendiente de crear | Media |

## 7. Enlaces de la retrospectiva

- **Discussion principal:** pendiente de crear.
- **Tablero de retrospectiva en GitHub Projects:** pendiente de crear (opcional, recomendado).
- **Issues de mejora:** pendientes de crear.
- **Pull Request de esta retrospectiva:** pendiente de crear desde la rama `retrospectiva-corte1`.

## 8. Conclusion

CampusFix cerro el Corte I con un problema bien definido, un backlog visible, un prototipo coherente, una estructura MVVM, navegacion funcional y un APK probado en Android. La prioridad del Corte II sera convertir el prototipo local en una aplicacion conectada a servicios cloud, mejorar la cobertura de pruebas y distribuir el trabajo con mayor trazabilidad entre los integrantes.
