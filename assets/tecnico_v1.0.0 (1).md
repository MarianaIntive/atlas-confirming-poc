# Documentación Técnica: Portal de Confirming Banco Atlas (POC)
**Versión:** 1.0.0  
**Estado:** Draft / Proof of Concept  
**Fecha:** 14 de Mayo, 2026

---

## 1. Introducción y Propósito
Este documento proporciona una guía técnica exhaustiva del Proof of Concept (POC) desarrollado para el **Portal de Confirming de Banco Atlas**. El objetivo principal es servir como base para la transferencia de conocimiento (KT) y escalabilidad del producto hacia un entorno de producción real.

Siguiendo los principios de *Fundamentals of Software Architecture* (Mark Richards) y *Docs for Developers*, esta documentación detalla no solo el "qué" sino el "cómo" y el "por qué" de las decisiones técnicas tomadas. Se ha aplicado un estilo de escritura técnico preciso basado en *The Elements of Style*.

---

## 2. Arquitectura de Software

### 2.1 Patrón de Arquitectura: "Vanilla SPA"
A diferencia de los frameworks modernos (React/Angular), este POC utiliza una arquitectura de **Estado Centralizado en Memoria** con manipulación directa del DOM. 

*   **Rationale:** Minimizar la sobrecarga de dependencias (overhead) para validaciones rápidas de UX/UI.
*   **Gestión de Vistas:** Implementada mediante un sistema de clases CSS `.view` y `.page-view` controlado por JavaScript. La visibilidad se alterna mediante la clase `.active`.

### 2.2 Diagrama de Flujo de Datos
1.  **Ingreso:** El usuario interactúa con un componente (Ej: Botón "Simular").
2.  **Lógica:** Se dispara un evento que consulta el estado global (`invoices`, `participants`).
3.  **Procesamiento:** Se ejecutan cálculos financieros basados en la configuración del ente.
4.  **Renderizado:** Se inyecta HTML dinámico en el contenedor correspondiente (Ej: `#simulation-ticket`).

### 2.3 Modelo Lógico de Datos (ER)
Aunque no existe una DB física, el modelo lógico sigue esta estructura de relaciones:
*   **Participante (1) : (N) Factura**: Un EGP o Proveedor puede estar asociado a múltiples facturas.
*   **Participante (1) : (N) Usuario**: Un Ente tiene múltiples usuarios con distintos roles.
*   **Rol (1) : (N) Usuario**: Los permisos se heredan del rol asignado.
*   **Factura (1) : (1) Operación**: Una factura financiada genera un registro de operación único.

---

## 3. Especificaciones del Frontend (Visual Stack)

### 3.1 Sistema de Diseño y Tokens
El archivo `styles.css` actúa como la única fuente de verdad para el diseño. 

| Token | Valor | Propósito |
| :--- | :--- | :--- |
| `--atlas-primary` | `#901d2d` | Identidad corporativa, botones principales y headers. |
| `--radius-lg` | `8px` | Consistencia en bordes de botones y inputs. |
| `--shadow-lg` | `0 8px 24px rgba(0,0,0,0.1)` | Profundidad para modales y menús desplegables. |

### 3.2 Componentes UI Reutilizables
*   **Modales:** Sistema genérico que utiliza las funciones `openModal(id)` y `closeModal(id)`. Soporta variantes `modal-sm`, `modal-lg` y la clase `premium-modal` para flujos críticos como la simulación.
*   **Tablas:** Estilizadas con la clase `.data-table`, incluyen hover effects y badges de estado dinámicos.
*   **KPI Cards:** Diseñadas para mostrar métricas clave en el Dashboard con indicadores de tendencia (`.trend`).

---

### 2.2 Estructura de Archivos
```text
atlas-confirming-poc/
├── index.html       # Punto de entrada único y estructura de vistas/modales.
├── styles.css      # Sistema de diseño, tokens visuales y layouts.
├── app.js          # Lógica de negocio, gestión de estado y renderizado dinámico.
└── assets/         # Recursos estáticos (imágenes, iconos).
```

---

## 3. Configuración y Estilos (Frontend)

### 3.1 Design Tokens (CSS Variables)
Ubicados en el `:root` de `styles.css`. Se definieron para mantener consistencia con la marca Atlas:
*   `--atlas-primary`: #901d2d (Color institucional).
*   `--atlas-yellow-arrow`: #e4b012 (Acento).
*   `--bg-main`: #fafafa (Fondo neutro).

### 3.2 Layout System
Se utiliza una combinación de **CSS Grid** para la estructura principal (Sidebar + Main Content) y **Flexbox** para componentes internos (Cards, Form Rows).

---

## 4. Gestión de Datos y Estado (Logic)

### 4.1 Modelo de Datos (Mock Data)
El archivo `app.js` inicializa el estado global de la aplicación. Estructuras principales:

#### A. Invoices (Facturas)
Representa las cuentas por cobrar cargadas en el sistema.
```javascript
{
    id: string,       // Nro. Factura
    egp: string,      // Empresa Gran Pagador
    prov: string,     // Proveedor
    emision: date,    // ISO String
    vto: date,        // ISO String
    moneda: 'GS'|'USD',
    monto: number,
    estado: 'Pendiente'|'Financiada'|'Pagada'|'Mora'|'Bloqueada'|'Revertida'
}
```

#### B. Participants (Entes)
Define la configuración financiera de cada participante del ecosistema.
```javascript
{
    id: number,
    tipo: 'EGP'|'Proveedor',
    ruc: string,
    razon: string,
    email: string,
    monedas: string[],
    lineaCredito: number,
    tasaInteres: number, // TNA
    tasaComision: number,
    iva: number,
    clienteAtlas: boolean,
    desembolsoAuto: boolean
}
```

---

## 5. Lógicas de Negocio y Algoritmos

### 5.1 Algoritmo de Descuento (Confirming)
Siguiendo las mejores prácticas de *Software Architecture: The Hard Parts*, el motor de cálculo está desacoplado de la UI. La lógica reside en `recalculateSimulation()`:

```javascript
// Fórmula Financiera Aplicada
Interés = (Monto * (TNA / 100) * Días) / 365
Comisión = Monto * (TasaComisión / 100)
IVA = (Interés + Comisión) * (TasaIVA / 100)
Monto_Neto = Monto - Interés - Comisión - IVA
```

*   **Variables de Entrada:** `montoAdelanto` (usuario), `diasAdelanto` (calculado), `egpConfig` (datos del participante).
*   **Validación de Límites:** El sistema impide adelantar un monto superior al nominal de la factura original.

### 5.2 Gestión de Estados de Factura
El ciclo de vida de una factura en el portal está definido por los siguientes estados:
1.  **Pendiente:** Cargada pero no operada.
2.  **Financiada:** Adelanto ejecutado con éxito.
3.  **Mora:** Fecha de vencimiento superada sin pago del EGP.
4.  **Pagada:** Ciclo completado.
5.  **Bloqueada:** Restringida por el Banco para operaciones.

---

## 6. Diseño de APIs (Contratos REST)
Inspirado en *Design of Web APIs* de Arnaud Lauret, se proponen los siguientes contratos para la futura integración con el Backend:

### 6.1 Facturas (Invoices)
*   `GET /api/v1/invoices`: Lista facturas con soporte de filtros (`status`, `search`).
*   `POST /api/v1/invoices`: Carga individual de documentos.
*   `POST /api/v1/invoices/{id}/simulate`: Retorna el cálculo de descuento sin persistir.
*   `POST /api/v1/invoices/{id}/confirm-advance`: Ejecuta la operación de Confirming.

### 6.2 Participantes (Entities)
*   `GET /api/v1/participants`: Recupera lista de EGPs y Proveedores.
*   `PUT /api/v1/participants/{id}`: Actualiza condiciones financieras (TNA, Comisión).

---

## 7. Guía de Implementación Técnica

### 7.1 Gestión de Eventos en JS
Se utiliza **Event Delegation** para optimizar el rendimiento:
*   Los botones de "Simular" y "Editar" en tablas dinámicas se manejan mediante funciones inyectadas directamente (`onclick`) por simplicidad en esta fase, aunque se recomienda migrar a `addEventListener` global en producción.

### 7.2 Integración de Gráficos (Chart.js)
El `mainChartInstance` se destruye y recrea cada vez que se navega al Dashboard para asegurar que los datos estén actualizados y evitar fugas de memoria (memory leaks).

---

## 8. Seguridad y Mejores Prácticas
1.  **Sanitización:** Todos los inputs de búsqueda pasan por una validación básica antes de filtrar los arreglos de datos.
2.  **UI Feedback:** Uso de `showCustomAlert` y `showCustomConfirm` para todas las acciones destructivas (Ej: Revertir operación).
3.  **Responsividad:** El CSS incluye Media Queries para ocultar el sidebar y optimizar la visualización en dispositivos móviles (Breakpoints: 720px y 900px).

---

## 9. Guía de Estilo y Convenciones
Siguiendo *The Elements of Style*, el código y la documentación deben ser:
*   **Conciso:** Evitar comentarios redundantes que el código ya explica.
*   **Consistente:** Uso de `camelCase` para variables JS y `kebab-case` para clases CSS.
*   **Descriptivo:** Nombres de funciones que inicien con verbos de acción (`render`, `submit`, `open`, `close`).

---

## 10. Glosario Técnico
*   **EGP:** Empresa Gran Pagador. Cliente corporativo que origina las facturas.
*   **Confirming:** Servicio financiero de pago a proveedores con opción de adelanto.
*   **TNA:** Tasa Nominal Anual. Base para el cálculo de intereses de descuento.
*   **Vanilla JS:** JavaScript puro, sin librerías externas de framework.

---

---
*Documento generado por el equipo de Arquitectura de Software - Banco Atlas POC.*
