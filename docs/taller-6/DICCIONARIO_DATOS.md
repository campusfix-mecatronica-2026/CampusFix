# Diccionario de datos de CampusFix

## Convenciones

- **Obligatorio:** el campo debe existir al crear el documento.
- **Inmutable:** el valor no cambia despues de la creacion.
- **Servidor:** se asigna con `serverTimestamp()` y no con la hora del dispositivo.
- Los IDs relacionados son cadenas con el UID de Authentication o el ID de un documento de Firestore.

## Coleccion `users`

Ruta: `users/{uid}`

| Campo | Tipo Firestore | Obligatorio | Restricciones | Descripcion |
| --- | --- | --- | --- | --- |
| `displayName` | string | Si | 2 a 80 caracteres; sin espacios extremos. | Nombre visible del usuario. |
| `email` | string | Si | Formato de correo; debe coincidir con el usuario autenticado. | Correo institucional o de acceso. |
| `role` | string | Si | `student`, `operator` o `admin`. No puede ser elevado por el propio usuario. | Rol usado por las reglas de autorizacion. |
| `active` | boolean | Si | `true` al crear el perfil. | Permite desactivar el perfil sin eliminar su trazabilidad. |
| `createdAt` | timestamp | Si | Servidor; inmutable. | Fecha de creacion del perfil. |
| `updatedAt` | timestamp | Si | Servidor. | Fecha de la ultima actualizacion. |

## Coleccion `categories`

Ruta: `categories/{categoryId}`

| Campo | Tipo Firestore | Obligatorio | Restricciones | Descripcion |
| --- | --- | --- | --- | --- |
| `name` | string | Si | 3 a 50 caracteres; unico a nivel funcional. | Nombre mostrado en el formulario. |
| `description` | string | Si | 5 a 200 caracteres. | Alcance de la categoria. |
| `active` | boolean | Si | Valor booleano. | Controla si puede seleccionarse en nuevos reportes. |
| `order` | number | Si | Entero mayor o igual a cero. | Orden visual del catalogo. |

IDs iniciales: `infraestructura`, `seguridad`, `tecnologia` y `aseo`.

## Coleccion `reports`

Ruta: `reports/{reportId}`

| Campo | Tipo Firestore | Obligatorio | Restricciones | Descripcion |
| --- | --- | --- | --- | --- |
| `title` | string | Si | 5 a 100 caracteres; sin espacios extremos. | Resumen corto del incidente. |
| `description` | string | Si | 10 a 1000 caracteres. | Explicacion detallada del problema. |
| `categoryId` | string | Si | Debe corresponder a una categoria activa. | Referencia logica a `categories`. |
| `priority` | string | Si | `Baja`, `Media` o `Alta`. | Nivel de atencion solicitado. |
| `status` | string | Si | Al crear debe ser `Abierto`; luego `En proceso` o `Resuelto`. | Estado actual del flujo. |
| `location` | map | Si | Debe contener `label`; coordenadas opcionales y validas. | Ubicacion descriptiva y geografica. |
| `location.label` | string | Si | 3 a 150 caracteres. | Lugar legible para el usuario. |
| `location.latitude` | number/null | No | Entre -90 y 90. | Latitud capturada por el dispositivo. |
| `location.longitude` | number/null | No | Entre -180 y 180. | Longitud capturada por el dispositivo. |
| `reporterId` | string | Si | UID autenticado; inmutable. | Usuario que creo el reporte. |
| `assigneeId` | string/null | Si | UID de operador o `null`. | Responsable actual de la atencion. |
| `evidencePath` | string/null | Si | Ruta bajo `evidence/{reporterId}/{reportId}/` o `null`. | Referencia al archivo de Firebase Storage. |
| `createdAt` | timestamp | Si | Servidor; inmutable. | Fecha real de creacion. |
| `updatedAt` | timestamp | Si | Servidor. | Ultima modificacion del reporte. |
| `resolvedAt` | timestamp/null | Si | Servidor cuando el estado sea `Resuelto`; en otro caso `null`. | Fecha de cierre operativo. |

### Mapa `location`

`location` se almacena dentro del reporte porque siempre se consulta junto con el incidente y no requiere un ciclo de vida independiente.

## Subcoleccion `history`

Ruta: `reports/{reportId}/history/{eventId}`

| Campo | Tipo Firestore | Obligatorio | Restricciones | Descripcion |
| --- | --- | --- | --- | --- |
| `type` | string | Si | `created`, `status_changed`, `assigned` o `commented`. | Tipo de evento de auditoria. |
| `actorId` | string | Si | UID autenticado; inmutable. | Usuario que genero el evento. |
| `previousStatus` | string/null | Si | Estado valido o `null`. | Estado anterior cuando aplique. |
| `newStatus` | string/null | Si | Estado valido o `null`. | Nuevo estado cuando aplique. |
| `comment` | string/null | Si | Maximo 500 caracteres o `null`. | Justificacion o nota asociada. |
| `createdAt` | timestamp | Si | Servidor; inmutable. | Momento exacto del evento. |

## Integridad y seguridad

| Control | Implementacion prevista |
| --- | --- |
| Identidad | Firebase Authentication aporta `request.auth.uid`. |
| Propiedad | `reporterId` debe ser igual al UID al crear el reporte. |
| Roles | El perfil guarda el rol; las reglas consultan `users/{uid}`. |
| Valores permitidos | Las reglas validan estados, prioridades, tipos y longitudes. |
| Fechas confiables | Se usa `request.time`/`serverTimestamp()` en vez de la hora local. |
| Evidencia | Storage limita ruta, propietario, tipo imagen y tamano maximo. |
| Auditoria | El historial permite creacion controlada y prohibe edicion/eliminacion. |
| Eliminacion | Los clientes no eliminan reportes; el cierre se representa con estado. |

## Indices compuestos previstos

| Coleccion | Campos | Consulta soportada |
| --- | --- | --- |
| `reports` | `reporterId ASC`, `createdAt DESC` | Historial del estudiante. |
| `reports` | `status ASC`, `createdAt DESC` | Bandeja por estado. |
| `reports` | `status ASC`, `priority ASC`, `createdAt DESC` | Priorizacion operativa. |
| `reports` | `assigneeId ASC`, `status ASC`, `updatedAt DESC` | Casos asignados a un operador. |
| `categories` | `active ASC`, `order ASC` | Categorias activas del formulario. |

## Correspondencia con la aplicacion movil

| Campo actual en la app | Campo cloud | Ajuste requerido |
| --- | --- | --- |
| `id` | ID del documento | Usar el ID devuelto por Firestore. |
| `category` | `categoryId` | Guardar el ID del catalogo y resolver su nombre en la interfaz. |
| `date` | `createdAt` | Sustituir el texto local por timestamp del servidor. |
| `evidence` | `evidencePath` | Sustituir booleano por ruta o `null`. |
| Sin campo | `reporterId` | Tomar el UID autenticado. |
| Sin campo | `assigneeId` | Iniciar en `null`. |
| Sin campo | `updatedAt` y `resolvedAt` | Gestionar desde el servicio cloud. |

Esta correspondencia evita que el documento academico describa una estructura distinta a la que finalmente use el codigo.
