# Documentación Técnica: Portal de Confirming Banco Atlas (POC)

**Versión documento / POC:** 2.1.0 (`v2.1.0`)  
**Estado:** Proof of Concept — iteración activa  
**Última actualización:** 2 de Junio, 2026  
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
- Sin bundler; `index.html` + `version.js` + `app.js` + `styles.css`.

### 2.2 Estructura de archivos

```text
atlas-confirming-poc/
├── index.html              # Vistas, modales, topbar con usuario y versión POC
├── version.js              # Versión de iteración (actualizar en cada release)
├── app.js                  # Lógica, máquina de estados, ABM, bulk upload
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
    desembolsoAuto: boolean   // EGP: auto → Pendiente desembolso; NO → Pendiente aprobación banco
}
```

### 4.3 Usuario ABM (`abmUsers`)

```javascript
{ id, nombre, apellido, email, telefono, enteId, documento? }
```

### 4.4 Rol ABM (`abmRoles`)

```javascript
{ id, dominio: 'Banco'|'EGP'|'Proveedor', rol: string, permisos: string[] }
```

### 4.5 Notificación ABM (`abmNotifications`)

```javascript
{ id, nombre, estadoDisparador, dominio, rol, emails, mensaje, activa }
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
