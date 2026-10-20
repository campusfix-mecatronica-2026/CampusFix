# Sprint Review Corte 2 — CampusFix

**Asignatura:** Mobile Cloud Computing — IS0276-210  
**Programa:** Ingeniería Mecatrónica  
**Fecha de cierre:** 20 de octubre de 2026  
**Repositorio oficial:** https://github.com/campusfix-mecatronica-2026/CampusFix

## 1. Objetivo del incremento

El objetivo del Corte 2 fue convertir el prototipo móvil local de CampusFix en una aplicación conectada a servicios cloud. El incremento integra autenticación con Firebase Authentication, persistencia de reportes y trazabilidad en Cloud Firestore, reglas de seguridad, índices compuestos y una compilación Android instalable.

## 2. Síntesis del incremento entregado

- Inicio de sesión mediante correo y contraseña con Firebase Authentication.
- Creación de reportes persistentes en la colección `reports` de Cloud Firestore.
- Registro de eventos de seguimiento en la subcolección `reports/{reportId}/history`.
- Lectura del resumen, listado y detalle de reportes desde la nube.
- Categorías almacenadas en la colección `categories`.
- Usuario relacionado con los reportes mediante `reporterId`.
- Timestamps de servidor para `createdAt` y `updatedAt`.
- Reglas de seguridad Firestore para usuarios autenticados y personal autorizado.
- Índices compuestos para consultas por reportante, estado, prioridad y fecha.
- Evidencias funcionales de autenticación, persistencia, consulta y seguimiento.
- APK Android del incremento compilada mediante Expo EAS.

## 3. Intervenciones individuales

### Jeyson Arley Sánchez Gómez — `Jeyson17-as`

- Definió el modelo y el diccionario de datos cloud.
- Implementó la configuración Firebase dentro de la aplicación Expo.
- Adaptó el servicio de reportes y el ViewModel para autenticación y persistencia.
- Integró la creación del reporte y su historial mediante escritura por lote.
- Incorporó reglas de seguridad e índices de Firestore al repositorio.
- Corrigió la identificación del programa como Ingeniería Mecatrónica.
- Generó documentación y evidencias del Taller 6 utilizadas en esta Sprint Review.

Evidencias:

- [Rama del incremento cloud](https://github.com/campusfix-mecatronica-2026/CampusFix/tree/feature/44-taller6-base-datos-cloud)
- [Issue #44 — Base de datos cloud](https://github.com/campusfix-mecatronica-2026/CampusFix/issues/44)
- [Commit de integración Firebase](https://github.com/campusfix-mecatronica-2026/CampusFix/commit/fa7f251b87e3cfa6796d3b0380092129cbb97418)
- [Commit de escritura por lote](https://github.com/campusfix-mecatronica-2026/CampusFix/commit/f16f4d61ddd91455bb79b841154db3d34768f15b)
- [PR #40 — Corrección de credenciales](https://github.com/campusfix-mecatronica-2026/CampusFix/pull/40)
- [PR #41 — Limpieza del formulario](https://github.com/campusfix-mecatronica-2026/CampusFix/pull/41)
- [PR #42 — Fecha real de reportes](https://github.com/campusfix-mecatronica-2026/CampusFix/pull/42)
- [PR #43 — Cierre de sesión seguro](https://github.com/campusfix-mecatronica-2026/CampusFix/pull/43)

### Jorge — `jorgeasanchezq`

- Configuró y verificó el proyecto `campusfix-corte2-jeyson-2026` en Firebase Console.
- Validó las colecciones `users`, `categories` y `reports`, junto con el historial de cada reporte.
- Publicó y verificó reglas de seguridad e índices compuestos en Cloud Firestore.
- Probó el flujo completo: autenticación, creación, confirmación, persistencia y consulta del detalle.
- Verificó la aplicación en Android y coordinó la generación del APK del Corte 2.
- Consolidó las evidencias visuales utilizadas para demostrar el incremento.

Evidencias:

- [Evidencias de Firebase y aplicación](https://github.com/campusfix-mecatronica-2026/CampusFix/tree/feature/44-taller6-base-datos-cloud/docs/taller-6/evidencias)
- [Compilación Android del Corte 2](https://expo.dev/accounts/campusfix-mecatronica-2026/projects/campusfix/builds/de0c249b-a324-46bc-aa18-7aebd8ae5ddb)
- [APK Android](https://expo.dev/artifacts/eas/2Zpmpo5T-lRQDVrkKDcIQyfdaKpIZXfHa-15Eyp_Yog.apk)

## 4. Matriz de trazabilidad

| Requisito / HU / Bug | Implementación | Evidencia | Estado |
|---|---|---|---|
| HU-02 — Iniciar sesión | Firebase Authentication en `LoginView` y ViewModel | `07-authentication.png`, `01-inicio-sesion.png` | Cumple |
| HU-03 — Crear reporte | Escritura persistente en `reports` | `03-firestore-reporte.png`, `09-app-formulario.png` | Cumple |
| HU-05 — Clasificar reporte | `categoryId` y datos en `categories` | `02-firestore-categorias.png` | Cumple |
| HU-06 — Registrar ubicación | Campo `location.label` persistido | `10-app-evidencia.png`, `12-app-detalle.png` | Cumple |
| HU-07 — Consultar reportes | Consulta por `reporterId` y `createdAt` | Índice compuesto y pantalla de inicio | Cumple |
| HU-08 — Consultar detalle | Lectura del reporte y seguimiento | `12-app-detalle.png` | Cumple |
| Bug #18 — Limpiar formulario | Restablecimiento posterior al envío | [PR #41](https://github.com/campusfix-mecatronica-2026/CampusFix/pull/41) | Cumple |
| Bug #19 — Fecha real | Timestamps reales y formato `es-CO` | [PR #42](https://github.com/campusfix-mecatronica-2026/CampusFix/pull/42) | Cumple |
| Bug #21 — Cierre de sesión | Limpieza segura del estado | [PR #43](https://github.com/campusfix-mecatronica-2026/CampusFix/pull/43) | Cumple |
| Bug #25 — Credenciales predeterminadas | Campos vacíos y autenticación real | [PR #40](https://github.com/campusfix-mecatronica-2026/CampusFix/pull/40) | Cumple |
| Taller 6 — Persistencia cloud | Firebase Auth + Firestore + reglas + índices | [Issue #44](https://github.com/campusfix-mecatronica-2026/CampusFix/issues/44) | Cumple en rama; pendiente integración a `main` |

## 5. Evidencias de persistencia cloud

Las evidencias se encuentran en [`docs/taller-6/evidencias`](./taller-6/evidencias) e incluyen:

1. Usuario autenticado en Firebase Authentication.
2. Categorías almacenadas en Firestore.
3. Reporte persistido con referencia al usuario.
4. Historial del reporte creado en la subcolección `history`.
5. Reglas de seguridad publicadas.
6. Índices compuestos habilitados.
7. Flujo de la aplicación desde autenticación hasta detalle del reporte.

El modelo está documentado en:

- [`MODELO_DATOS.md`](./taller-6/MODELO_DATOS.md)
- [`DICCIONARIO_DATOS.md`](./taller-6/DICCIONARIO_DATOS.md)
- [`firestore.rules`](../firestore.rules)
- [`firestore.indexes.json`](../firestore.indexes.json)

## 6. Verificación del Definition of Done

| Criterio DoD | Resultado | Evidencia |
|---|---|---|
| Código compila sin errores TypeScript | Cumple | `npm exec -- tsc --noEmit` |
| Dependencias compatibles con Expo SDK 54 | Cumple | Expo Doctor: 18/18 verificaciones |
| Autenticación cloud operativa | Cumple | Firebase Authentication y prueba en aplicación |
| Datos persistentes después de cerrar y abrir | Cumple | Reporte e historial visibles en Firestore |
| Reglas e índices configurados | Cumple | Evidencias 05 y 06 del Taller 6 |
| Flujo móvil principal funcional | Cumple | Inicio, formulario, confirmación y detalle |
| APK Android compilada | Cumple | Build Expo EAS `de0c249b-a324-46bc-aa18-7aebd8ae5ddb` |
| PR revisado e integrado a `main` | Pendiente | Requiere abrir, aprobar y fusionar PR del incremento cloud |
| Video demostrativo publicado | Pendiente | Requiere agregar enlace del video final |
| Acceso Firebase para `endiromero@gmail.com` | Pendiente de verificación administrativa | Debe comprobarse en Usuarios y permisos |

## 7. Pull Requests y trazabilidad Git

- [PR #17 — Esqueleto móvil y navegación](https://github.com/campusfix-mecatronica-2026/CampusFix/pull/17)
- [PR #40 — Credenciales predeterminadas](https://github.com/campusfix-mecatronica-2026/CampusFix/pull/40)
- [PR #41 — Limpieza del formulario](https://github.com/campusfix-mecatronica-2026/CampusFix/pull/41)
- [PR #42 — Fecha real de reportes](https://github.com/campusfix-mecatronica-2026/CampusFix/pull/42)
- [PR #43 — Cierre de sesión seguro](https://github.com/campusfix-mecatronica-2026/CampusFix/pull/43)
- [Comparación para PR del incremento Firebase](https://github.com/campusfix-mecatronica-2026/CampusFix/compare/main...feature/44-taller6-base-datos-cloud)

## 8. Resultado de la Sprint Review

El incremento demuestra que CampusFix pasó de un prototipo con datos locales a una aplicación móvil conectada a Firebase. El flujo de autenticación y reporte persiste información en Cloud Firestore, genera historial y permite consultar nuevamente el incidente. La prioridad administrativa antes de la entrega es revisar y fusionar el PR cloud, publicar la Discussion, conceder acceso al docente, publicar el APK en GitHub Releases y agregar el enlace definitivo del video.

## 9. Enlaces de entrega

- **Repositorio:** https://github.com/campusfix-mecatronica-2026/CampusFix
- **Rama cloud:** https://github.com/campusfix-mecatronica-2026/CampusFix/tree/feature/44-taller6-base-datos-cloud
- **Evidencias:** https://github.com/campusfix-mecatronica-2026/CampusFix/tree/feature/44-taller6-base-datos-cloud/docs/taller-6/evidencias
- **Build APK:** https://expo.dev/accounts/campusfix-mecatronica-2026/projects/campusfix/builds/de0c249b-a324-46bc-aa18-7aebd8ae5ddb
- **Video demostrativo:** pendiente de publicar.

