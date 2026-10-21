# Publicación del Taller 7 desde la cuenta de Jeyson

Esta guía debe ejecutarse con la sesión de GitHub de **`Jeyson17-as`**. Antes de publicar, verificar el usuario en la esquina superior derecha de GitHub.

## 1. Crear el Pull Request

Abrir:

https://github.com/campusfix-mecatronica-2026/CampusFix/compare/main...feature/44-taller6-base-datos-cloud?expand=1

**Título:**

```text
[Taller 7 - Corte 2] Integrar Firebase y Sprint Review
```

**Descripción:**

```markdown
## Objetivo

Integrar en la rama principal el incremento cloud de CampusFix y el consolidado de Sprint Review del Corte 2.

## Cambios principales

- Conexión con Firebase Authentication y Cloud Firestore.
- Persistencia de reportes y eventos en reports/{reportId}/history.
- Reglas de seguridad e índices compuestos.
- Modelo y diccionario de datos.
- Evidencias completas del Taller 6.
- Documento docs/SPRINT_REVIEW_CORTE2.md.
- Corrección de la escritura por lote para crear reporte e historial.

## Verificación

- [x] TypeScript compila sin errores.
- [x] Expo Doctor: 18/18 verificaciones aprobadas.
- [x] Inicio de sesión probado con Firebase Authentication.
- [x] Reportes e historial persistidos en Firestore.
- [x] Reglas publicadas e índices habilitados.
- [x] APK Android compilada correctamente mediante Expo EAS.
- [ ] Revisión y aprobación de otro integrante o del docente.
- [ ] Fusión a main después de la revisión.

Closes #44
```

Después de crearlo, solicitar revisión a **Jorge o al profesor**. Jeyson no debe aprobar su propio Pull Request.

## 2. Publicar la Discussion

Abrir:

https://github.com/campusfix-mecatronica-2026/CampusFix/discussions/new?category=show-and-tell

**Título:**

```text
Sprint Review Corte 2 - Taller 7 - CampusFix
```

**Contenido:**

```markdown
## Síntesis general del incremento

Durante el Corte 2, CampusFix evolucionó de un prototipo con datos locales a una aplicación móvil conectada a Firebase. El incremento implementa autenticación por correo y contraseña, persistencia de reportes en Cloud Firestore, historial por reporte, reglas de seguridad, índices compuestos y una compilación Android instalable.

## Mi intervención — Jeyson Arley Sánchez Gómez (@Jeyson17-as)

- Definí el modelo y el diccionario de datos cloud.
- Implementé la configuración Firebase en la aplicación Expo.
- Adapté el servicio y el ViewModel para autenticación, escritura y consulta.
- Implementé la escritura por lote del reporte y su historial.
- Incorporé reglas de seguridad, índices y documentación técnica.
- Corregí los Bugs #18, #19, #21 y #25 mediante Pull Requests trazables.

## Evidencias

- [Issue #44](https://github.com/campusfix-mecatronica-2026/CampusFix/issues/44)
- [Rama Firebase](https://github.com/campusfix-mecatronica-2026/CampusFix/tree/feature/44-taller6-base-datos-cloud)
- [Documento consolidado](https://github.com/campusfix-mecatronica-2026/CampusFix/blob/feature/44-taller6-base-datos-cloud/docs/SPRINT_REVIEW_CORTE2.md)
- [Evidencias Firebase](https://github.com/campusfix-mecatronica-2026/CampusFix/tree/feature/44-taller6-base-datos-cloud/docs/taller-6/evidencias)
- [Build Android](https://expo.dev/accounts/campusfix-mecatronica-2026/projects/campusfix/builds/de0c249b-a324-46bc-aa18-7aebd8ae5ddb)
```

Después de publicar, Jorge debe agregar **un comentario individual** describiendo su participación. La Discussion principal debe seguir figurando como creada por Jeyson.

## 3. Publicar el APK en GitHub Releases

Este paso se realiza después de aprobar y fusionar el Pull Request.

1. Descargar el APK desde:
   https://expo.dev/artifacts/eas/2Zpmpo5T-lRQDVrkKDcIQyfdaKpIZXfHa-15Eyp_Yog.apk
2. Abrir:
   https://github.com/campusfix-mecatronica-2026/CampusFix/releases/new
3. Seleccionar **Choose a tag** y escribir `v1.0.0-corte2`.
4. Crear la etiqueta sobre la rama `main`.
5. Título: `CampusFix Corte 2 - Firebase`.
6. Adjuntar `CampusFix-Corte2-v1.0.0.apk`.
7. Publicar el Release.

**SHA-256 esperado del APK:**

```text
9768448143E263BF5CBD5F492153F7B5710FDCCD6B369F42756A1F9670EC6642
```

## 4. Video

Cuando el video esté en Drive o YouTube, agregar su enlace a:

- `README.md`
- `docs/SPRINT_REVIEW_CORTE2.md`
- Discussion de Sprint Review
- Descripción del GitHub Release

