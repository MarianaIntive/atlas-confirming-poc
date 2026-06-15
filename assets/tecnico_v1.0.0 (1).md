# Documentación Técnica: Portal de Confirming Banco Atlas (POC)

**Versión documento / POC:** 2.10.2 (`v2.10.2`)  
**Estado:** Proof of Concept — iteración activa  
**Última actualización:** 19 de Mayo, 2026  
**Versión anterior del documento:** 1.0.0

---

## 1. Introducción y Propósito

Este documento es la guía técnica del **Portal de Confirming Banco Atlas (POC)**. Debe mantenerse alineado con cada release visible en la UI (etiqueta `POC vX.Y.Z` bajo el usuario logueado y en login).

**Fuente de verdad de versión en código:** `version.js` → constantes `POC_APP_VERSION`, `POC_APP_VERSION_DATE`, `POC_APP_VERSION_LABEL`.

**Despliegue:** GitHub Pages desde rama `master` → https://marianaintive.github.io/atlas-confirming-poc/

---

## 2. Arquitectura de Software

### 2.1 Patrón: Vanilla SPA

- Estado centralizado en memoria (`invoices`, `participants`, `abmUsers`, `abmRoles`, `abmNotifications`).
- Vistas con clases `.view` / `.page-view` y toggle `.active`.
- Sin bundler; `index.html` + `version.js` + `app.js` + `abm-grids.js` + `styles.css`.

### 2.2 Estructura de archivos

```text
atlas-confirming-poc/
├── index.html              # Vistas, modales, topbar con usuario y versión POC
├── version.js              # Versión de iteración (actualizar en cada release)
├── app.js                  # Lógica, máquina de estados, ABM, bulk upload
├── abm-grids.js            # Grillas EGP/Proveedor, paginado y modales de detalle ABM
├── styles.css              # Design tokens y layout
└── assets/
    ├── logo-banco-atlas.png
    └── tecnico_v1.0.0 (1).md   # Este documento
```

### 2.3 Flujo de datos

1. Evento UI → consulta estado global.
2. Reglas de negocio (estados, elegibilidad, simulación).
3. `render*` inyecta filas en `<tbody>` o actualiza modales.

### 2.4 Modelo lógico (sin DB)

- **Participante (1) : (N) Factura**
- **Participante (1) : (N) Usuario ABM** (`enteId`)
- **Rol (1) : (N) permisos** (lista en objeto rol)
- **Notificación** disparada por `estadoDisparador` de factura

---

## 3. Frontend (Visual Stack)

### 3.1 Design tokens (`styles.css`)

| Token | Valor | Uso |
| :--- | :--- | :--- |
| `--atlas-primary` | `#901d2d` | Marca, CTAs |
| `--sidebar-width` | `268px` | Layout principal |
| `--radius-lg` | `8px` | Inputs y botones |

### 3.2 Componentes

- **Modales:** `openModal(id)` / `closeModal(id)` — `modal-sm`, `modal-lg`, `premium-modal` (simulación).
- **Tablas:** `.data-table`, badges `.status-*`, selección masiva en Confirming.
- **Versión POC:** `.poc-version` en topbar (debajo del nombre de usuario) y `.login-poc-version` en pantalla de login.

### 3.3 Dependencias CDN

- Phosphor Icons, Chart.js (dashboard), SheetJS / XLSX (carga masiva).

---

## 4. Gestión de datos (Mock)

### 4.1 Factura (`invoices`)

```javascript
{
    id: string,
    egp: string,
    prov: string,
    emision: string,      // ISO date YYYY-MM-DD
    vto: string,
    fechaPago: string,    // ISO; default = vto en alta
    moneda: 'GS' | 'USD',
    monto: number,
    estado: string        // ver §5.1
}
```

### 4.2 Participante (`participants`)

```javascript
{
    id: number,
    tipo: 'EGP' | 'Proveedor',
    ruc, razon, email, telefono,
    monedas: string[],
    lineaCredito, tasaInteres, tasaComision, iva,
    condiciones: string,
    clienteAtlas: boolean,
    desembolsoAuto: boolean,  // EGP: auto → Pendiente desembolso; NO → Pendiente aprobación banco
    bloqueado?: boolean       // impide operar en plataforma sin eliminar el registro
}
```

### 4.3 Usuario ABM (`abmUsers`)

```javascript
{ id, nombre, apellido, email, telefono, enteId, rolId, documento?, estado: 'Pendiente de Autorización' | 'Autorizado' | 'Rechazado', bloqueado?: boolean, motivoRechazo?: string }
```

### 4.4 Rol ABM (`abmRoles`)

Catálogo por dominio (`ABM_ROLES_BY_DOMINIO`):

- **Banco:** ADMIN, SUPERVISOR, OPERADOR, APROBADOR, GERENTE, EJECUTIVO DE CUENTAS
- **EGP:** ADMIN, OPERADOR
- **Proveedor:** ADMIN, SUPERVISOR, OPERADOR

```javascript
{ id, dominio: 'Banco'|'EGP'|'Proveedor', rol: string, permisos: string[] }
```

Catálogo de permisos (`ROLE_PERMISSION_CATALOG` en `app.js`):

- **Pantalla ABM (18):** acceso a pantalla, ABM entes (ver/crear/borrar/modificar), bloqueo EGP, ABM usuarios (CRUD), autorización/bloqueo usuarios, roles y perfiles, ABM notificaciones (CRUD no sistema), filtros ABM.
- **Pantalla Confirming (21):** acceso a pantalla, filtros, grillas (vigentes / no vigentes / no operables), carga manual/masiva, edición datos y fecha de pago, habilitar/bloquear, simular adelanto, aprobar desembolso EGP/Banco, revertir (1ra y 2da aprobación), info sensible EGP/Proveedor, documentos y descarga de grilla.

El modal de rol renderiza checkboxes desde el catálogo; los mocks `abmRoles` incluyen sets representativos por dominio/rol.

### 4.5 Notificación ABM (`abmNotifications`)

```javascript
{ id, agrupador, nombre, estadoDisparador, tiposNotificacion: ['Dominio y Rol' | 'Email'], tipoEnvio, dominio, rol, emails, mensaje, activa }
```

`tipoEnvio` es etiqueta derivada (`Email`, `Dominio y Rol` o `Ambas`) según los tipos seleccionados en el modal.

### 4.6 Auditoría ABM (`abmAuditLog`)

Registro en memoria de operaciones sensibles (autorizar/rechazar/confirmar autorización de usuarios):

```javascript
{ id, timestamp, actorUsername, actorDocumento, actorDominio, actorRol, action, targetUserId, targetUserEmail, details }
```

---

## 5. Lógicas de negocio

### 5.1 Máquina de estados de factura (v2)

Estados vigentes en la POC (no existen Pagada / Mora / Revertida del doc 1.0.0):

| Estado | Uso |
| :--- | :--- |
| Pendiente | Carga ERP / alta; habilitar o bloquear (EGP) |
| Habilitada | Lista para simular adelanto |
| Bloqueada | Restringida |
| Pendiente aprobación EGP | Post-simulación |
| Pendiente aprobación banco | EGP sin desembolso auto (MVP2) |
| Pendiente de desembolso | CORE BANKING |
| Financiada | Desembolso OK |
| Vencida | Vencimiento superado |
| NO ELEGIBLE | Fecha de pago &lt; 30 días desde hoy |

**Pestañas Confirming:**

- **Vigentes:** operativos (incl. Pendiente aprobación banco).
- **No vigentes:** Financiada, Vencida.
- **No operables:** NO ELEGIBLE.

**Transiciones destacadas:**

- Simular (individual o masivo ≥2 Habilitada, misma combinatoria EGP/Proveedor/Moneda) → Pendiente aprobación EGP.
- EGP aprueba + `desembolsoAuto` → Pendiente de desembolso → (timer) Financiada o error → Pendiente aprobación banco.
- EGP rechaza con motivo → actualiza `fechaPago` / `vto`; elegibilidad 30 días → Habilitada o NO ELEGIBLE.
- EGP rechaza sin motivo / banco rechaza → Bloqueada.

### 5.2 Fecha de pago y elegibilidad

- Constante `PAYMENT_DATE_MIN_DAYS = 30`.
- `isPaymentDateEligible(fechaPago)`: días calendario desde hoy ≥ 30.
- Alta individual, bulk y rechazo EGP con motivo aplican `resolveInitialInvoiceState()`.
- Tab **No operables:** botón **Editar fecha de pago**; si ≥ 30 días → **Habilitada**.

### 5.3 Acciones masivas Confirming

- **Habilitar:** Pendiente o Bloqueada → Habilitada.
- **Bloquear:** Pendiente o Habilitada → Bloqueada.
- **Simular:** ≥2 Habilitada, mismo EGP, proveedor y moneda.

### 5.4 Motor de simulación

`recalculateSimulation()` — interés, comisión, IVA, neto (TNA, días, config EGP).

### 5.5 Carga masiva

- Template Excel: columnas incl. **Fecha de pago** (opcional, default vencimiento).
- `processBulkInvoiceRows` + `normalizeBulkRow`; estados iniciales solo Pendiente / Habilitada / Bloqueada + regla 30 días.

### 5.6 ABM

- Pestañas: Entes, Usuarios, Roles, Notificaciones.
- CRUD simulado en memoria; modales alta/edición para entes, usuarios, roles y notificaciones.
- Eliminar factura: delegación en `#invoices-tbody` + `data-invoice-id` (evita rotura de `onclick` con IDs con guiones).

### 5.7 Contexto de ente

- Selector topbar **Estás operando para el ente** filtra Confirming y muestra panel informativo.

---

## 6. APIs propuestas (futuro backend)

Sin cambio sustancial respecto a 1.0.0; ampliar con:

- `PATCH /api/v1/invoices/{id}/payment-date`
- `POST /api/v1/invoices/bulk`
- `POST /api/v1/invoices/bulk/simulate`

---

## 7. Implementación JS

- **Versión UI:** `applyPocVersionLabels()` en `DOMContentLoaded` y post-login; elementos `[data-poc-version]`.
- **Usuario mostrado:** `syncLoggedUserDisplayFromLogin()` desde campo `#username`.
- **Event delegation:** eliminación de facturas en grilla.
- **Chart.js:** destruir/recrear instancia al entrar al dashboard.

---

## 8. Seguridad y UX (POC)

- Confirmaciones en acciones destructivas.
- Sanitización básica en atributos HTML (`invoiceIdToHtmlAttr`).
- Responsive: sidebar colapsable &lt; 900px.

---

## 9. Convenciones

- `camelCase` en JS; `kebab-case` en CSS.
- Ramas feature: `cursor/<descripcion>-d4a4`.
- **Merge obligatorio a `master`** tras cada entrega para publicar en GitHub Pages.

---

## 10. Glosario

- **EGP:** Empresa Gran Pagador.
- **Confirming:** Adelanto a proveedores sobre facturas.
- **TNA:** Tasa nominal anual.
- **POC:** Proof of Concept; versión visible `vX.Y.Z`.

---

## 11. Versionado y proceso de release (obligatorio)

### 11.1 Esquema `vMAJOR.MINOR.PATCH`

| Incremento | Cuándo | Ejemplo |
| :--- | :--- | :--- |
| **MAJOR** | Cambio de modelo, estados, flujos o breaking UX | 1.0.0 → 2.0.0 (máquina de estados nueva) |
| **MINOR** | Funcionalidad nueva visible | 2.0.0 → 2.1.0 (nueva pestaña ABM) |
| **PATCH** | Correcciones, textos, estilos, solo documentación | 2.0.0 → 2.0.1 |

### 11.2 Checklist en cada cambio

1. Actualizar `version.js` (`POC_APP_VERSION`, `POC_APP_VERSION_DATE`).
2. Actualizar este documento: cabecera, §5 si aplica, y entrada en **§12 Changelog**.
3. Commit descriptivo en rama `cursor/...-d4a4`.
4. **Merge a `master` y `git push origin master`** (despliegue automático Pages).

### 11.3 Ubicación en UI

- Login: pie de tarjeta (`data-poc-version`).
- App: topbar, debajo de `#logged-user-display` (`data-poc-version`).

---

## 12. Changelog

### v2.10.2 — 2026-05-19

- **ABM Notificaciones — Alta/edición:** checkboxes **Tipo de notificación** (Dominio y Rol, Email, Ambas) con selección múltiple; validación condicional de rol/emails; columna **Tipo** en grilla y detalle.

### v2.10.1 — 2026-05-19

- **ABM EGP / Proveedor:** columna **Estado** en grillas (badge de autorización: Pendiente de Autorización, Autorizado, Rechazado).
- Mock **Distribuidora Norte** — proveedor en estado *Pendiente de Autorización* (EGP padre Retail S.A.).

### v2.10.0 — 2026-05-19

- **ABM EGP / Proveedor — Autorización de entes:** flujo **Gestionar** (modal con RUC, Razón Social, Tipo de Ente) para entes en **Pendiente de Autorización** — **Autorizar** o **Rechazar** (motivo obligatorio); auditoría ABM y simulación `POST /api/v1/enviarNotificacion`.
- **ABM EGP / Proveedor — Entes rechazados:** al editar, badge **Ente Rechazado** y botón **Confirmar y Autorizar**; validación de cambios en campos obligatorios con confirmación si no hubo modificaciones.
- Altas nuevas de entes quedan en estado **Pendiente de Autorización**; mock con ente rechazado (Agencia Creativa) y pendiente (Tigo).

### v2.9.4 — 2026-05-19

- **ABM Editar Proveedor:** datos bancarios y titular visibles solo al editar proveedores **no Cliente Atlas**; no aparecen en alta. Defaults: cuenta `CC-{RUC}`, banco Banco Atlas, moneda PYG.

### v2.9.3 — 2026-05-19

- **ABM Usuarios:** se quita columna **Tipo ente** de la grilla y el campo **Tipo de ente asociado** del modal de detalle; selector de ente sin indicar tipo en el modal de alta/edición.

### v2.9.2 — 2026-05-19

- **ABM Alta/Edición EGP y Proveedor:** se quita sección Configuración (Cliente Atlas, Desembolsos automáticos) del modal de alta/edición; visible solo en modal Ver detalle.

### v2.9.1 — 2026-05-19

- **ABM filtros Estado:** EGP, Proveedor y Usuarios comparten valores **Todos**, **Pendiente de Autorización**, **Autorizado**, **Activo** y **Bloqueado**; entes con campo `estado` en mock.

### v2.9.0 — 2026-05-19

- **ABM Entes:** pestaña única reemplazada por **EGP** y **Proveedor** con columnas y formatos específicos por tipo; paginado de 25 registros por página en todas las grillas ABM.
- **ABM — Ver detalle (ojito):** modal unificado en EGP, Proveedor, Usuarios, Roles y Notificaciones; permisos agrupados en vista de rol; adjuntos descargables simulados; campos bancarios/titular en proveedor no cliente Atlas.
- **ABM — Alta:** menú + con opciones **Nuevo EGP** y **Nuevo Proveedor**; modal de alta sin monedas, línea de crédito ni condiciones financieras (visibles en grilla / ver detalle).
- **ABM Notificaciones:** columna **Agrupador** (ABM, Login, Simulación, Gestión de facturas); catálogo mock ampliado con 20 notificaciones según eventos de ABM, login, simulación de adelantos y máquina de estados.

### v2.8.1 — 2026-05-19

- **Modales:** apilamiento con `z-index` dinámico para que alertas/confirmaciones queden siempre sobre modales de edición abiertos.

### v2.8.0 — 2026-05-19

- **ABM Usuarios — Gestionar:** modal con cédula, nombre, apellido, rol y ente; botones Autorizar/Rechazar; validación de cédula duplicada; motivo obligatorio al rechazar; registro de auditoría (`abmAuditLog`).
- **ABM Usuarios — Rechazados:** edición con etiqueta "Usuario Rechazado" y botón **Confirmar y Autorizar**; warning si no hubo cambios en campos obligatorios.

### v2.7.1 — 2026-05-19

- **ABM Entes:** filtro por estado (Todos / Activo / Bloqueado).

### v2.7.0 — 2026-05-19

- **ABM Entes / Usuarios:** botón bloquear/desbloquear (sin eliminar); columnas Estado/Acceso; modal **Gestionar** para usuarios Pendiente de Autorización → Autorizado o Rechazado.

### v2.6.0 — 2026-05-19

- **ABM Entes:** se quita columna Tipo de la grilla (permanece en modales); botón ver (ojito) con modal solo lectura y panel Relaciones EGP–Proveedor por RUC; campos bancarios/titular en edición para sesión Proveedor ADMIN/SUPERVISOR; mock Retail S.A. también como proveedor de Tigo.

### v2.5.0 — 2026-05-19

- **ABM Roles:** catálogo granular de permisos por pantalla (ABM y Confirming); modal renderizado desde `ROLE_PERMISSION_CATALOG`; mocks `abmRoles` actualizados con sets por dominio/rol.

### v2.4.2 — 2026-06-02

- **Roles EGP / Proveedor:** solo ADMIN u OPERADOR (reemplaza PROVEEDOR en catálogo, mocks y notificaciones).

### v2.4.1 — 2026-06-02

- **Roles por dominio:** catálogo corregido (Banco 6 roles; EGP y Proveedor: ADMIN + OPERADOR); usuarios mock y notificaciones alineados.

### v2.4.0 — 2026-06-02

- **ABM Usuarios:** columna Rol; modal con campo obligatorio Asignar Rol (un rol por usuario, listado desde `abmRoles`).

### v2.3.0 — 2026-06-02

- **ABM Usuarios:** columna Estado (Pendiente de Autorización / Autorizado) y filtro Ambos / por estado.

### v2.2.0 — 2026-06-02

- **ABM filtros:** Entes (RUC/razón social, Cliente Atlas Sí/No/Ambos, **Estado Activo/Bloqueado/Todos**); Usuarios (ente RUC/razón, cédula, apellido + columna cédula); Roles (dominio, rol); Notificaciones (nombre).

### v2.1.0 — 2026-06-02

- **ABM Entes:** campos financieros y de configuración en solo visualización; desembolso automático siempre activo (bloqueado); email opcional; **EGP Padre** obligatorio para Proveedor; columna EGP en grilla; mock proveedores vinculados a EGP.
- **Fechas:** formato **dd-mm-yyyy** en grillas, filtros e inputs de fecha.
- **Confirming:** mocks NO ELEGIBLE con fecha de pago vencida (hoy) y vencimiento &gt; 30 días; botón editar fecha de pago en Pendiente/Habilitada/Bloqueada; filtros por fecha de vencimiento y de pago.

### v2.0.0 — 2026-06-02

Consolidación de iteraciones desde 2026-05-14 (doc 1.0.0):

- **ABM:** pestañas Entes / Usuarios / Roles / Notificaciones; iconos editar/eliminar; modales Nuevo/Editar usuario y rol; notificaciones por estado disparador.
- **Confirming:** panel ente; aprobar/rechazar desembolso (banco); selección múltiple; Habilitar/Bloquear/Simular masivo; estilo botones bulk (rojo Atlas / deshabilitado gris).
- **Facturas:** eliminar por fila (columna X); carga masiva Excel/CSV + template; corrección delegación click eliminar.
- **Máquina de estados:** flujo normal EGP + reversión; pestañas Vigentes / No vigentes / No operables; simular masivo; CORE BANKING simulado; mock ≥2 facturas por estado.
- **Fecha de pago:** campo en alta; regla 30 días → NO ELEGIBLE; edición en No operables; columna en grilla y bulk.
- **Versión POC:** `version.js` + etiqueta cross-plataforma en login y topbar; sincronización nombre usuario logueado.
- **Proceso:** documentación técnica actualizada; merge continuo a `master`.

### v1.0.0

- Release inicial documentada: Vanilla SPA, mock facturas/participantes, simulación, estados simplificados (Pendiente, Financiada, Pagada, Mora, Bloqueada, Revertida), dashboard Chart.js.

---

*Documento mantenido por el equipo POC Banco Atlas — actualizar en cada release.*
