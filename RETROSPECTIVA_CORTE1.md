# Retrospectiva del Corte I - CampusFix

**Asignatura:** Mobile Cloud Computing - IS0249-210

**Programa:** Ingeniería Mecatrónica

**Proyecto:** CampusFix

**Integrante:** Jeyson Arley Sánchez Gómez

**Fecha:** 20 de septiembre de 2026

## 1. Propósito y alcance

Esta retrospectiva analiza el trabajo realizado durante los tres primeros sprints de CampusFix:

1. **Sprint 1:** inception del proyecto y Product Backlog.
2. **Sprint 2:** diseño UX/UI y definición arquitectónica.
3. **Sprint 3:** esqueleto móvil, navegación básica y distribución de un APK de prueba.

El objetivo es reconocer los resultados obtenidos, identificar oportunidades de mejora y convertirlas en acciones concretas para el Corte II. Las conclusiones se sustentan con evidencias trazables del repositorio oficial.

## 2. Resumen de lo realizado

### Sprint 1 - Inception y Product Backlog

Se definió CampusFix como una aplicación móvil para registrar y hacer seguimiento a incidentes de infraestructura, tecnología, seguridad y limpieza dentro de una institución educativa. Se establecieron el problema, los usuarios objetivo, el alcance inicial, las historias de usuario y el tablero Kanban.

**Evidencias:**

- [README del proyecto](https://github.com/campusfix-mecatronica-2026/CampusFix/blob/main/README.md)
- [Tablero Product Backlog](https://github.com/orgs/campusfix-mecatronica-2026/projects/1/views/1)
- [Commit inicial del proyecto](https://github.com/campusfix-mecatronica-2026/CampusFix/commit/8a07898)
- [Commit que incorpora el tablero Kanban](https://github.com/campusfix-mecatronica-2026/CampusFix/commit/727b1c4)

### Sprint 2 - Diseño UX/UI y arquitectura

Se desarrolló un prototipo móvil navegable con el flujo de inicio de sesión, inicio, creación del reporte, evidencia y ubicación, confirmación, listado y detalle. Se definió una arquitectura MVVM y se documentó la integración propuesta con Firebase Authentication, Cloud Firestore y Firebase Storage. Estos servicios cloud corresponden a la arquitectura prevista; su persistencia real todavía debe implementarse en el siguiente incremento.

**Evidencias:**

- [Commit del prototipo y la arquitectura](https://github.com/campusfix-mecatronica-2026/CampusFix/commit/b5da4b0)
- [Informe de la Actividad Evaluable 02](https://github.com/campusfix-mecatronica-2026/CampusFix/blob/main/docs/CampusFix_Actividad_Evaluable_02.pdf)
- [Diagrama de arquitectura MVVM](https://github.com/campusfix-mecatronica-2026/CampusFix/blob/main/docs/arquitectura-campusfix.svg)
- [Evidencias visuales del prototipo](https://github.com/campusfix-mecatronica-2026/CampusFix/tree/main/docs/evidencias)

### Sprint 3 - Esqueleto móvil y navegación

Se reorganizó la aplicación en capas de modelos, vistas, viewmodels, servicios, componentes y navegación. Se conectaron siete vistas con React Navigation Native Stack, se configuró Expo EAS y se generó un APK que fue instalado y probado en un dispositivo Android físico. El flujo validado permite crear un reporte de demostración y consultar su detalle; los datos siguen siendo locales y de prototipo.

**Evidencias:**

- [Rama del Sprint 3](https://github.com/campusfix-mecatronica-2026/CampusFix/tree/sprint-3-esqueleto-navegacion)
- [Pull Request #17 - Sprint 3](https://github.com/campusfix-mecatronica-2026/CampusFix/pull/17)
- [Commit de organización MVVM](https://github.com/campusfix-mecatronica-2026/CampusFix/commit/33feca0)
- [Commit de navegación](https://github.com/campusfix-mecatronica-2026/CampusFix/commit/f694ccd)
- [Commit de configuración EAS](https://github.com/campusfix-mecatronica-2026/CampusFix/commit/6d145ca)
- [Commit de pruebas del APK](https://github.com/campusfix-mecatronica-2026/CampusFix/commit/1ca9cdf)
- [Build de prueba en Expo EAS](https://expo.dev/accounts/campusfix-mecatronica-2026/projects/campusfix/builds/1b334e00-e097-4598-a3ca-583ae618174d)
- [Capturas del Sprint 3](https://github.com/campusfix-mecatronica-2026/CampusFix/tree/sprint-3-esqueleto-navegacion/docs/evidencias/sprint-3)

## 3. Qué se hizo bien

1. **Definición clara del problema y del alcance.** El Product Backlog y el flujo de CampusFix se mantuvieron alineados con la necesidad de reportar incidentes y consultar su seguimiento.
2. **Coherencia entre UX/UI y arquitectura.** Las pantallas del prototipo se transformaron en vistas conectadas y se organizaron de acuerdo con MVVM.
3. **Trazabilidad técnica.** El Sprint 3 quedó registrado en una rama específica, con commits descriptivos, un Pull Request y evidencias de la compilación.
4. **Validación en un dispositivo real.** El APK se generó con Expo EAS, se instaló en Android y se validó el flujo principal de navegación.
5. **Uso adecuado de servicios administrados para la distribución.** Expo EAS funcionó como servicio cloud para compilar y distribuir el APK de prueba.

## 4. Qué se puede mejorar

1. **Trazabilidad del trabajo.** En el siguiente corte cada historia debe quedar respaldada por una rama, commits descriptivos, evidencias y un Pull Request.
2. **Persistencia cloud.** Firebase aparece como arquitectura propuesta, pero todavía no existe evidencia de autenticación ni almacenamiento real de reportes y fotografías.
3. **Pruebas automatizadas.** La validación actual es principalmente manual. Se necesitan pruebas para la navegación, las reglas del formulario y los servicios.
4. **Manejo de errores y estados.** Deben agregarse indicadores de carga, mensajes de error, validaciones de campos y respuesta ante fallos de red.
5. **Cierre oportuno de Pull Requests.** El PR #17 está aprobado, pero continúa abierto. El equipo debe acordar el momento de integración y mantener `main` actualizado.

## 5. Reflexiones individuales

### Jeyson Arley Sánchez Gómez

**Qué se hizo bien**

- El flujo definido desde el prototipo mantiene una secuencia comprensible: iniciar sesión, crear el reporte, registrar ubicación y evidencia, confirmar y consultar el seguimiento.
- La arquitectura MVVM propuesta separa las responsabilidades y facilita que el prototipo evolucione hacia una solución con servicios cloud.

**Qué se puede mejorar**

- Se requiere aumentar la trazabilidad del trabajo mediante ramas, commits, revisiones y evidencias asociadas a cada historia de usuario.
- Los datos del prototipo deben dejar de ser locales y conectarse con autenticación, base de datos y almacenamiento de evidencias en la nube.

**Acción propuesta**

- Implementar el primer incremento de Firebase Authentication y Cloud Firestore, conservando la separación MVVM y documentando la configuración. También se debe incorporar una base de pruebas automatizadas para la navegación y los formularios.

## 6. Acciones de mejora para el Corte II

| Acción | Responsable | Issue asociado | Prioridad |
|---|---|---|---|
| Implementar autenticación y persistencia de reportes con Firebase | Jeyson Arley Sánchez Gómez | Pendiente de crear | Alta |
| Agregar pruebas automatizadas de navegación, formulario y servicios | Jeyson Arley Sánchez Gómez | Pendiente de crear | Alta |
| Definir ramas, commits y revisiones para cada historia del Corte II | Jeyson Arley Sánchez Gómez | Pendiente de crear | Media |

## 7. Enlaces de la retrospectiva

- **Discussion principal:** pendiente de crear.
- **Tablero de retrospectiva en GitHub Projects:** pendiente de crear (opcional, recomendado).
- **Issues de mejora:** pendientes de crear.
- **Pull Request de esta retrospectiva:** pendiente de crear desde la rama `retrospectiva-corte1`.

## 8. Conclusión

CampusFix cerró el Corte I con un problema bien definido, un backlog visible, un prototipo coherente, una estructura MVVM, navegación funcional y un APK probado en Android. La prioridad del Corte II será convertir el prototipo local en una aplicación conectada a servicios cloud, mejorar la cobertura de pruebas y mantener una trazabilidad clara de cada incremento.
