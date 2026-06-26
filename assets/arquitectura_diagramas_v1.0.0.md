# Diagramas de Arquitectura y Secuencia — API Gestión ABM
## Portal de Confirming — Banco Atlas

| Campo | Valor |
|-------|-------|
| **Fuente de verdad** | Jira — Proyecto MAGIA |
| **Issues cubiertos** | MAGIA-119/120/121/122/125/126/127/128/129/130/134/135/136/137/190/191/192/193 |
| **Versión documento** | 1.1.0 |
| **Fecha** | 2026-06-26 |

> **v1.1.0:** Corrección arquitectura — existen **2 BFFs** separados: BFF ENTES (Entes + Usuarios) y BFF NOTIFICACIONES (Notificaciones).

---

## Tabla de contenidos

1. [Mapa de endpoints — fuente Jira](#1-mapa-de-endpoints--fuente-jira)
2. [Diagrama de arquitectura general](#2-diagrama-de-arquitectura-general)
3. [Diagrama de capas FE → BFF → BE](#3-diagrama-de-capas-fe--bff--be)
4. [Diagramas de secuencia — Entes](#4-diagramas-de-secuencia--entes)
5. [Diagramas de secuencia — Usuarios](#5-diagramas-de-secuencia--usuarios)
6. [Diagramas de secuencia — Notificaciones](#6-diagramas-de-secuencia--notificaciones)
7. [User Flow — Entes](#7-user-flow--entes)
8. [User Flow — Usuarios](#8-user-flow--usuarios)
9. [User Flow — Notificaciones](#9-user-flow--notificaciones)
10. [Modelo de datos](#10-modelo-de-datos)
11. [Matriz de trazabilidad Jira](#11-matriz-de-trazabilidad-jira)

---

## 1. Mapa de endpoints — fuente Jira

> Nombres exactos extraídos de las historias en Jira (proyecto MAGIA). Estado al 26/06/2026.

### BFF ENTES (Entes + Usuarios)

| Método | Endpoint BFF | Historia | Estado Jira |
|--------|-------------|----------|-------------|
| `POST` | `/api/v1/BFFguardarInfoEntes` | MAGIA-119 | Relevamiento |
| `GET` | `/api/v1/BFFobtenerInfoEnte` | MAGIA-120 | Relevamiento |
| `GET` | `/api/v1/BFFcargarGrillaEnte` | MAGIA-136 | Relevamiento |
| `PATCH` | `/api/v1/BFFactualizarInfoEntes` | MAGIA-134 | Relevamiento |
| `POST` | `/api/v1/BFFguardarInfoUsuarios` | MAGIA-123 | Relevamiento |
| `GET` | `/api/v1/BFFobtenerInfoUsuario` | MAGIA-124 | Relevamiento |
| `GET` | `/api/v1/BFFcargarGrillaUsuario` | MAGIA-192 | Relevamiento |
| `PATCH` | `/api/v1/BFFactualizarInfoUsuarios` | MAGIA-191 | Relevamiento |

### BFF NOTIFICACIONES (Notificaciones)

| Método | Endpoint BFF | Historia | Estado Jira |
|--------|-------------|----------|-------------|
| `GET` | `/api/v1/BFFcargarGrillaNotificaciones` | MAGIA-128 | Relevamiento |
| `PATCH` | `/api/v1/BFFactualizarNotificaciones` | MAGIA-127 | En Espera |

### BE — API Gestión ABM (Microservicio: API CORE BANKING)

| Método | Endpoint BE | Historia | Estado Jira |
|--------|------------|----------|-------------|
| `POST` | `/api/v1/BEguardarInfoEntes` | MAGIA-121 | Relevamiento |
| `GET` | `/api/v1/BEobtenerInfoEnte` | MAGIA-122 | Relevamiento |
| `GET` | `/api/v1/BEcargarGrillaEntes` | MAGIA-137 | Relevamiento |
| `PATCH` | `/api/v1/BEactualizarInfoEntes` | MAGIA-135 | Relevamiento |
| `POST` | `/api/v1/BEguardarInfoUsuarios` | MAGIA-125 | Relevamiento |
| `GET` | `/api/v1/BEobtenerInfoUsuarios` | MAGIA-126 | Relevamiento |
| `GET` | `/api/v1/BEcargarGrillaUsuario` | MAGIA-193 | Relevamiento |
| `PATCH` | `/api/v1/BEactualizarInfoUsuarios` | MAGIA-190 | Relevamiento |
| `GET` | `/api/v1/BEcargarGrillaNotificaciones` | MAGIA-130 | Relevamiento |
| `PATCH` | `/api/v1/BEactualizarNotificaciones` | MAGIA-129 | En Espera |

### Query params por endpoint (según historias Jira)

| Endpoint | Params |
|----------|--------|
| `BFFcargarGrillaEnte` / `BEcargarGrillaEntes` | `entity=EGP\|PROVEEDOR`, `pagelimit=20`, `status=todos` |
| `BFFcargarGrillaUsuario` / `BEcargarGrillaUsuario` | `entity=USUARIOS`, `pagelimit=20`, `status=todos` |
| `BFFcargarGrillaNotificaciones` / `BEcargarGrillaNotificaciones` | `entity=Notificaciones`, `pagelimit=20`, `status=todos` |
| `BFFobtenerInfoEnte` / `BEobtenerInfoEnte` | `ID` (del ente) |
| `BFFobtenerInfoUsuario` / `BEobtenerInfoUsuarios` | `ID` (del usuario) |

---

## 2. Diagrama de arquitectura general

```mermaid
flowchart TB
    subgraph FE["Frontend — Portal Confirming (SPA)"]
        UI["index.html / app.js / abm-grids.js"]
    end

    subgraph GW["API Gateway / Ingress"]
        APIGW["Kong / NGINX\nTLS · Rate limit · JWT forward"]
    end

    subgraph BFF_E["BFF ENTES\n(Entes + Usuarios)"]
        direction TB
        BE1["POST /BFFguardarInfoEntes (MAGIA-119)"]
        BE2["GET  /BFFobtenerInfoEnte (MAGIA-120)"]
        BE3["GET  /BFFcargarGrillaEnte (MAGIA-136)"]
        BE4["PATCH /BFFactualizarInfoEntes (MAGIA-134)"]
        BE5["POST /BFFguardarInfoUsuarios (MAGIA-123)"]
        BE6["GET  /BFFobtenerInfoUsuario (MAGIA-124)"]
        BE7["GET  /BFFcargarGrillaUsuario (MAGIA-192)"]
        BE8["PATCH /BFFactualizarInfoUsuarios (MAGIA-191)"]
    end

    subgraph BFF_N["BFF NOTIFICACIONES\n(Notificaciones)"]
        direction TB
        BN1["GET  /BFFcargarGrillaNotificaciones (MAGIA-128)"]
        BN2["PATCH /BFFactualizarNotificaciones (MAGIA-127)"]
    end

    subgraph BE["BE — API Gestión ABM\n(Microservicio: API CORE BANKING)"]
        direction TB
        BE_E1["POST /BEguardarInfoEntes (MAGIA-121)"]
        BE_E2["GET  /BEobtenerInfoEnte (MAGIA-122)"]
        BE_E3["GET  /BEcargarGrillaEntes (MAGIA-137)"]
        BE_E4["PATCH /BEactualizarInfoEntes (MAGIA-135)"]
        BE_U1["POST /BEguardarInfoUsuarios (MAGIA-125)"]
        BE_U2["GET  /BEobtenerInfoUsuarios (MAGIA-126)"]
        BE_U3["GET  /BEcargarGrillaUsuario (MAGIA-193)"]
        BE_U4["PATCH /BEactualizarInfoUsuarios (MAGIA-190)"]
        BE_N1["GET  /BEcargarGrillaNotificaciones (MAGIA-130)"]
        BE_N2["PATCH /BEactualizarNotificaciones (MAGIA-129)"]
    end

    subgraph INFRA["Infraestructura compartida"]
        DB[("Base de datos\nEntes · Usuarios · Notificaciones")]
        KC["Keycloak\nAutenticación / Autorización"]
        MAIL["Servicio Email\nPOST /enviarNotificacion"]
    end

    UI --> APIGW
    APIGW --> BFF_E
    APIGW --> BFF_N
    BFF_E --> BE
    BFF_N --> BE
    BE --> DB
    BE --> KC
    BE --> MAIL
    BFF_E --> KC
    BFF_N --> KC
```

---

## 3. Diagrama de capas FE → BFF → BE

```mermaid
flowchart LR
    FE(["FE\nPortal Confirming"])

    subgraph BFF_ENTES["BFF ENTES\n(Entes + Usuarios)"]
        BFF_E["Entes\nMAGIA-119/120/134/136"]
        BFF_U["Usuarios\nMAGIA-123/124/191/192"]
    end

    subgraph BFF_NOTIF["BFF NOTIFICACIONES\n(Notificaciones)"]
        BFF_N["Notificaciones\nMAGIA-127/128"]
    end

    subgraph BE_ABM["BE API Gestión ABM\n(API CORE BANKING)"]
        BE_E["Entes\nMAGIA-121/122/135/137"]
        BE_U["Usuarios\nMAGIA-125/126/190/193"]
        BE_N["Notificaciones\nMAGIA-129/130"]
    end

    DB[("DB")]

    FE -->|POST BFFguardarInfoEntes| BFF_E
    FE -->|GET BFFobtenerInfoEnte| BFF_E
    FE -->|GET BFFcargarGrillaEnte| BFF_E
    FE -->|PATCH BFFactualizarInfoEntes| BFF_E

    FE -->|POST BFFguardarInfoUsuarios| BFF_U
    FE -->|GET BFFobtenerInfoUsuario| BFF_U
    FE -->|GET BFFcargarGrillaUsuario| BFF_U
    FE -->|PATCH BFFactualizarInfoUsuarios| BFF_U

    FE -->|GET BFFcargarGrillaNotificaciones| BFF_N
    FE -->|PATCH BFFactualizarNotificaciones| BFF_N

    BFF_E -->|POST BEguardarInfoEntes| BE_E
    BFF_E -->|GET BEobtenerInfoEnte| BE_E
    BFF_E -->|GET BEcargarGrillaEntes| BE_E
    BFF_E -->|PATCH BEactualizarInfoEntes| BE_E

    BFF_U -->|POST BEguardarInfoUsuarios| BE_U
    BFF_U -->|GET BEobtenerInfoUsuarios| BE_U
    BFF_U -->|GET BEcargarGrillaUsuario| BE_U
    BFF_U -->|PATCH BEactualizarInfoUsuarios| BE_U

    BFF_N -->|GET BEcargarGrillaNotificaciones| BE_N
    BFF_N -->|PATCH BEactualizarNotificaciones| BE_N

    BE_E & BE_U & BE_N --> DB
```

---

## 4. Diagramas de secuencia — Entes

### 4.1 POST /BFFguardarInfoEntes → /BEguardarInfoEntes (MAGIA-119 / MAGIA-121)

> Historia: "COMO plataforma Confirming QUIERO guardar los entes generados en la plataforma PARA que sean utilizables por los usuarios"

```mermaid
sequenceDiagram
    autonumber
    actor U as Usuario (ABM)
    participant FE as Frontend
    participant BFF as BFF ENTES
    participant BE as BE API Gestión ABM
    participant DB as Base de Datos
    participant MAIL as Servicio Email

    U->>FE: Presiona "Confirmar" en alta de ente (EGP o PROVEEDOR)
    FE->>FE: Validación local de campos obligatorios

    alt Servicio responde OK (escenario feliz — MAGIA-119)
        FE->>BFF: POST /api/v1/BFFguardarInfoEntes\n{Request payload ente}
        BFF->>BFF: Validar token / autorización
        BFF->>BE: POST /api/v1/BEguardarInfoEntes\n{Request payload ente}
        BE->>DB: INSERT ente
        DB-->>BE: Confirmación
        BE->>MAIL: Disparar notificación alta ente
        BE-->>BFF: Response OK
        BFF-->>FE: Response OK
        FE-->>U: Novedad OK al FE
    end

    alt Servicio responde ERROR en BFF (MAGIA-119 — error path)
        FE->>BFF: POST /api/v1/BFFguardarInfoEntes
        BFF->>BFF: Error de validación / autorización
        Note over BFF: NO realiza llamada al BE
        BFF-->>FE: Response error (código funcional)
        FE-->>U: Novedad ERROR al FE
    end

    alt Servicio responde ERROR en BE (MAGIA-121 — error path)
        FE->>BFF: POST /api/v1/BFFguardarInfoEntes
        BFF->>BE: POST /api/v1/BEguardarInfoEntes
        BE-->>BFF: Response error BE
        BFF-->>FE: Response error propagado
        FE-->>U: Novedad ERROR al FE
    end
```

### 4.2 GET /BFFcargarGrillaEnte → /BEcargarGrillaEntes (MAGIA-136 / MAGIA-137)

> Historia: "COMO plataforma Confirming QUIERO los entes existentes en la plataforma PARA que sean visibles por los usuarios"

```mermaid
sequenceDiagram
    autonumber
    actor U as Usuario (ABM)
    participant FE as Frontend
    participant BFF as BFF ENTES
    participant BE as BE API Gestión ABM
    participant DB as Base de Datos

    U->>FE: Ingresa a pestaña EGP o PROVEEDOR

    alt Servicio responde OK (MAGIA-136 / MAGIA-137)
        FE->>BFF: GET /api/v1/BFFcargarGrillaEnte\n?entity=EGP|PROVEEDOR&pagelimit=20&status=todos
        BFF->>BFF: Validar token / autorización
        BFF->>BE: GET /api/v1/BEcargarGrillaEntes\n?entity=EGP|PROVEEDOR&pagelimit=20&status=todos
        BE->>DB: SELECT entes paginado con filtros
        DB-->>BE: Resultado paginado
        BE-->>BFF: Response OK {lista entes, paginación}
        BFF-->>FE: Response OK (adaptado para grilla)
        FE-->>U: Grilla EGP/PROVEEDOR renderizada (25/pág)
    end

    alt Servicio responde ERROR en BFF (MAGIA-136 — error path)
        FE->>BFF: GET /api/v1/BFFcargarGrillaEnte
        BFF->>BFF: Error / token inválido
        Note over BFF: NO realiza llamada al BE
        BFF-->>FE: Response error
        FE-->>U: Novedad ERROR al FE
    end

    alt Servicio responde ERROR en BE (MAGIA-137 — error path)
        FE->>BFF: GET /api/v1/BFFcargarGrillaEnte
        BFF->>BE: GET /api/v1/BEcargarGrillaEntes
        BE-->>BFF: Response error BE
        BFF-->>FE: Response error propagado
        FE-->>U: Novedad ERROR al FE
    end
```

### 4.3 GET /BFFobtenerInfoEnte → /BEobtenerInfoEnte (MAGIA-120 / MAGIA-122)

> Historia: "COMO plataforma Confirming QUIERO ver la información del ente existente en la plataforma PARA que sean visibles por los usuarios"

```mermaid
sequenceDiagram
    autonumber
    actor U as Usuario (ABM)
    participant FE as Frontend
    participant BFF as BFF ENTES
    participant BE as BE API Gestión ABM
    participant DB as Base de Datos

    U->>FE: Presiona "Ver detalle" (ojito) en fila de ente

    alt Servicio responde OK (MAGIA-120 / MAGIA-122)
        FE->>BFF: GET /api/v1/BFFobtenerInfoEnte?ID={enteId}
        BFF->>BFF: Validar token / autorización
        BFF->>BE: GET /api/v1/BEobtenerInfoEnte?ID={enteId}
        BE->>DB: SELECT ente + relaciones + condiciones financieras
        DB-->>BE: Detalle completo del ente
        BE-->>BFF: Response OK {ente detalle}
        BFF-->>FE: Response OK (adaptado para modal)
        FE-->>U: Modal detalle ente (solo lectura)
    end

    alt Servicio responde ERROR en BFF (MAGIA-120 — error path)
        FE->>BFF: GET /api/v1/BFFobtenerInfoEnte?ID={enteId}
        BFF->>BFF: Error
        Note over BFF: NO realiza llamada al BE
        BFF-->>FE: Response error
        FE-->>U: Novedad ERROR al FE
    end
```

### 4.4 PATCH /BFFactualizarInfoEntes → /BEactualizarInfoEntes (MAGIA-134 / MAGIA-135)

> Historia: "QUIERO actualizar los entes generados en la plataforma PARA que sean utilizables por los usuarios en los flujos de **editar, bloquear, gestionar y borrar**"

```mermaid
sequenceDiagram
    autonumber
    actor U as Usuario (ABM)
    participant FE as Frontend
    participant BFF as BFF ENTES
    participant BE as BE API Gestión ABM
    participant DB as Base de Datos

    Note over U,DB: Acción: Editar | Bloquear | Gestionar (autorizar/rechazar) | Borrar
    U->>FE: Presiona "Confirmar" en edición/bloqueo/gestión/borrado de ente

    alt Servicio responde OK (MAGIA-134 / MAGIA-135)
        FE->>BFF: PATCH /api/v1/BFFactualizarInfoEntes\n{id, acción, datos modificados}
        BFF->>BFF: Validar token / autorización
        BFF->>BE: PATCH /api/v1/BEactualizarInfoEntes\n{id, acción, datos modificados}
        BE->>DB: UPDATE ente (estado / datos / bloqueo)
        DB-->>BE: Confirmación actualización
        BE-->>BFF: Response OK
        BFF-->>FE: Response OK
        FE-->>U: Novedad OK al FE
    end

    alt Servicio responde ERROR en BFF (MAGIA-134 — error path)
        FE->>BFF: PATCH /api/v1/BFFactualizarInfoEntes
        BFF->>BFF: Error / validación fallida
        Note over BFF: NO realiza llamada al BE
        BFF-->>FE: Response error (errores funcionales definidos)
        FE-->>U: Novedad ERROR al FE
    end

    alt Servicio responde ERROR en BE (MAGIA-135 — error path)
        FE->>BFF: PATCH /api/v1/BFFactualizarInfoEntes
        BFF->>BE: PATCH /api/v1/BEactualizarInfoEntes
        BE-->>BFF: Response error BE
        BFF-->>FE: Response error propagado
        FE-->>U: Novedad ERROR al FE
    end
```

---

## 5. Diagramas de secuencia — Usuarios

### 5.1 POST /BFFguardarInfoUsuarios → /BEguardarInfoUsuarios (MAGIA-123 / MAGIA-125)

> Historia: "COMO plataforma Confirming QUIERO guardar los usuarios generados en la plataforma PARA que sean utilizables por los usuarios"

```mermaid
sequenceDiagram
    autonumber
    actor U as Usuario (ABM)
    participant FE as Frontend
    participant BFF as BFF ENTES
    participant BE as BE API Gestión ABM
    participant DB as Base de Datos
    participant MAIL as Servicio Email

    U->>FE: Presiona "Confirmar" en alta de usuario
    FE->>FE: Validación local

    alt Servicio responde OK (MAGIA-123 / MAGIA-125)
        FE->>BFF: POST /api/v1/BFFguardarInfoUsuarios\n{nombre, apellido, email, teléfono, enteId, rolId, ...}
        BFF->>BFF: Validar token / autorización
        BFF->>BE: POST /api/v1/BEguardarInfoUsuarios\n{payload usuario}
        BE->>DB: INSERT usuario (estado=Pendiente de Autorización)
        DB-->>BE: Confirmación
        BE->>MAIL: Notificación alta usuario pendiente autorización
        BE-->>BFF: Response OK {id usuario creado}
        BFF-->>FE: Response OK
        FE-->>U: Novedad OK al FE
    end

    alt Servicio responde ERROR en BFF (MAGIA-123 — error path)
        FE->>BFF: POST /api/v1/BFFguardarInfoUsuarios
        Note over BFF: NO realiza llamada al BE
        BFF-->>FE: Response error (errores funcionales)
        FE-->>U: Novedad ERROR al FE
    end

    alt Servicio responde ERROR en BE (MAGIA-125 — error path)
        FE->>BFF: POST /api/v1/BFFguardarInfoUsuarios
        BFF->>BE: POST /api/v1/BEguardarInfoUsuarios
        BE-->>BFF: Response error BE
        BFF-->>FE: Response error propagado
        FE-->>U: Novedad ERROR al FE
    end
```

### 5.2 GET /BFFcargarGrillaUsuario → /BEcargarGrillaUsuario (MAGIA-192 / MAGIA-193)

> Historia: "COMO plataforma Confirming QUIERO los usuarios existentes en la plataforma PARA que sean visibles"

```mermaid
sequenceDiagram
    autonumber
    actor U as Usuario (ABM)
    participant FE as Frontend
    participant BFF as BFF ENTES
    participant BE as BE API Gestión ABM
    participant DB as Base de Datos

    U->>FE: Ingresa a pestaña Usuarios

    alt Servicio responde OK (MAGIA-192 / MAGIA-193)
        FE->>BFF: GET /api/v1/BFFcargarGrillaUsuario\n?entity=USUARIOS&pagelimit=20&status=todos
        BFF->>BFF: Validar token / autorización
        BFF->>BE: GET /api/v1/BEcargarGrillaUsuario\n?entity=USUARIOS&pagelimit=20&status=todos
        BE->>DB: SELECT usuarios paginado con filtros
        DB-->>BE: Resultado paginado
        BE-->>BFF: Response OK {lista usuarios, paginación}
        BFF-->>FE: Response OK (adaptado para grilla)
        FE-->>U: Grilla usuarios renderizada (paginado 20/pág)
    end

    alt Servicio responde ERROR en BFF (MAGIA-192 — error path)
        FE->>BFF: GET /api/v1/BFFcargarGrillaUsuario
        Note over BFF: NO realiza llamada al BE
        BFF-->>FE: Response error
        FE-->>U: Novedad ERROR al FE
    end

    alt Servicio responde ERROR en BE (MAGIA-193 — error path)
        FE->>BFF: GET /api/v1/BFFcargarGrillaUsuario
        BFF->>BE: GET /api/v1/BEcargarGrillaUsuario
        BE-->>BFF: Response error BE
        BFF-->>FE: Response error propagado
        FE-->>U: Novedad ERROR al FE
    end
```

### 5.3 GET /BFFobtenerInfoUsuario → /BEobtenerInfoUsuarios (MAGIA-124 / MAGIA-126)

> Historia: "COMO plataforma Confirming QUIERO ver la información del usuario existente en la plataforma PARA que sean visibles por los usuarios"

```mermaid
sequenceDiagram
    autonumber
    actor U as Usuario (ABM)
    participant FE as Frontend
    participant BFF as BFF ENTES
    participant BE as BE API Gestión ABM
    participant DB as Base de Datos

    U->>FE: Presiona "Ver detalle" de un usuario

    alt Servicio responde OK (MAGIA-124 / MAGIA-126)
        FE->>BFF: GET /api/v1/BFFobtenerInfoUsuario?ID={userId}
        BFF->>BFF: Validar token / autorización
        BFF->>BE: GET /api/v1/BEobtenerInfoUsuarios?ID={userId}
        BE->>DB: SELECT usuario + ente + rol
        DB-->>BE: Detalle usuario
        BE-->>BFF: Response OK {usuario detalle}
        BFF-->>FE: Response OK (adaptado para modal)
        FE-->>U: Modal detalle usuario (solo lectura)
    end

    alt Servicio responde ERROR en BFF (MAGIA-124 — error path)
        FE->>BFF: GET /api/v1/BFFobtenerInfoUsuario?ID={userId}
        Note over BFF: NO realiza llamada al BE
        BFF-->>FE: Response error
        FE-->>U: Novedad ERROR al FE
    end
```

### 5.4 PATCH /BFFactualizarInfoUsuarios → /BEactualizarInfoUsuarios (MAGIA-191 / MAGIA-190)

> Historia: "QUIERO actualizar los usuarios generados en la plataforma" — flujos: **editar, gestionar, bloquear, borrar**

```mermaid
sequenceDiagram
    autonumber
    actor U as Usuario (ABM)
    participant FE as Frontend
    participant BFF as BFF ENTES
    participant BE as BE API Gestión ABM
    participant DB as Base de Datos
    participant KC as Keycloak
    participant MAIL as Servicio Email

    Note over U,MAIL: Acción: Editar | Gestionar (autorizar/rechazar) | Bloquear | Borrar
    U->>FE: Presiona "Confirmar" en editar/gestionar/bloquear/borrar usuario

    alt Servicio responde OK (MAGIA-191 / MAGIA-190)
        FE->>BFF: PATCH /api/v1/BFFactualizarInfoUsuarios\n{id, acción, datos}
        BFF->>BFF: Validar token / autorización
        BFF->>BE: PATCH /api/v1/BEactualizarInfoUsuarios\n{id, acción, datos}
        BE->>DB: UPDATE usuario (estado / datos / bloqueo)
        DB-->>BE: Confirmación
        opt Acción = Autorizar
            BE->>KC: Activar usuario en Keycloak
            BE->>MAIL: Notificación primer login
        end
        BE-->>BFF: Response OK
        BFF-->>FE: Response OK
        FE-->>U: Novedad OK al FE
    end

    alt Servicio responde ERROR en BFF (MAGIA-191 — error path)
        FE->>BFF: PATCH /api/v1/BFFactualizarInfoUsuarios
        Note over BFF: NO realiza llamada al BE
        BFF-->>FE: Response error (errores funcionales)
        FE-->>U: Novedad ERROR al FE
    end

    alt Servicio responde ERROR en BE (MAGIA-190 — error path)
        FE->>BFF: PATCH /api/v1/BFFactualizarInfoUsuarios
        BFF->>BE: PATCH /api/v1/BEactualizarInfoUsuarios
        BE-->>BFF: Response error BE
        BFF-->>FE: Response error propagado
        FE-->>U: Novedad ERROR al FE
    end
```

---

## 6. Diagramas de secuencia — Notificaciones

### 6.1 GET /BFFcargarGrillaNotificaciones → /BEcargarGrillaNotificaciones (MAGIA-128 / MAGIA-130)

> Historia: "COMO plataforma Confirming QUIERO las notificaciones existentes en la plataforma PARA que sean visibles por los usuarios"

```mermaid
sequenceDiagram
    autonumber
    actor U as Usuario (ABM)
    participant FE as Frontend
    participant BFF as BFF NOTIFICACIONES
    participant BE as BE API Gestión ABM
    participant DB as Base de Datos

    U->>FE: Ingresa a pestaña Notificaciones

    alt Servicio responde OK (MAGIA-128 / MAGIA-130)
        FE->>BFF: GET /api/v1/BFFcargarGrillaNotificaciones\n?entity=Notificaciones&pagelimit=20&status=todos
        BFF->>BFF: Validar token / permiso "ABM Notificaciones - Ver"
        BFF->>BE: GET /api/v1/BEcargarGrillaNotificaciones\n?entity=Notificaciones&pagelimit=20&status=todos
        BE->>DB: SELECT notificaciones (catálogo 20+) paginado
        DB-->>BE: Lista notificaciones con agrupador, disparador, tipo, estado activa
        BE-->>BFF: Response OK {content[], paginación}
        BFF-->>FE: Response OK (formatear tipoEnvio: Email | Dominio y Rol | Ambas)
        FE-->>U: Grilla notificaciones renderizada\n(Agrupador · Nombre · Estado disparador · Tipo · Dominio · Rol · Activa)
    end

    alt Servicio responde ERROR en BFF (MAGIA-128 — error path)
        FE->>BFF: GET /api/v1/BFFcargarGrillaNotificaciones
        Note over BFF: NO realiza llamada al BE
        BFF-->>FE: Response error
        FE-->>U: Novedad ERROR al FE
    end

    alt Servicio responde ERROR en BE (MAGIA-130 — error path)
        FE->>BFF: GET /api/v1/BFFcargarGrillaNotificaciones
        BFF->>BE: GET /api/v1/BEcargarGrillaNotificaciones
        BE-->>BFF: Response error BE
        BFF-->>FE: Response error propagado
        FE-->>U: Novedad ERROR al FE
    end
```

### 6.2 PATCH /BFFactualizarNotificaciones → /BEactualizarNotificaciones (MAGIA-127 / MAGIA-129)

> Historia: "COMO plataforma Confirming QUIERO actualizar las notificaciones generados en la plataforma PARA que sean utilizables por los usuarios en los flujos de **activar/inactivar**"

```mermaid
sequenceDiagram
    autonumber
    actor U as Usuario (ABM)
    participant FE as Frontend
    participant BFF as BFF NOTIFICACIONES
    participant BE as BE API Gestión ABM
    participant DB as Base de Datos

    Note over U,DB: Acción: Activar o Inactivar una notificación
    U->>FE: Presiona botón "Activar" o "Desactivar" en fila de notificación

    alt Servicio responde OK (MAGIA-127 / MAGIA-129)
        FE->>BFF: PATCH /api/v1/BFFactualizarNotificaciones\n{id, activa: true|false}
        BFF->>BFF: Validar token / permiso "ABM Notificaciones - Modificar"
        BFF->>BE: PATCH /api/v1/BEactualizarNotificaciones\n{id, activa: true|false}
        BE->>DB: UPDATE notificacion SET activa = ?
        DB-->>BE: Confirmación
        BE-->>BFF: Response OK {notificación actualizada}
        BFF-->>FE: Response OK
        FE-->>U: Novedad OK al FE\n(grilla actualizada con nuevo estado)
    end

    alt Servicio responde ERROR en BFF (MAGIA-127 — error path)
        FE->>BFF: PATCH /api/v1/BFFactualizarNotificaciones
        Note over BFF: NO realiza llamada al BE
        BFF-->>FE: Response error (errores funcionales)
        FE-->>U: Novedad ERROR al FE
    end

    alt Servicio responde ERROR en BE (MAGIA-129 — error path)
        FE->>BFF: PATCH /api/v1/BFFactualizarNotificaciones
        BFF->>BE: PATCH /api/v1/BEactualizarNotificaciones
        BE-->>BFF: Response error BE
        BFF-->>FE: Response error propagado
        FE-->>U: Novedad ERROR al FE
    end
```

---

## 7. User Flow — Entes

```mermaid
flowchart TD
    Start((Inicio)) --> Login[Login Portal Confirming]
    Login --> NavABM[Navegar a Gestión ABM]
    NavABM --> TabEnte{Seleccionar tab}
    TabEnte -->|EGP| CargarGrillaEGP["GET /BFFcargarGrillaEnte\n?entity=EGP&pagelimit=20&status=todos\nBFF ENTES — MAGIA-136 → MAGIA-137"]
    TabEnte -->|PROVEEDOR| CargarGrillaProv["GET /BFFcargarGrillaEnte\n?entity=PROVEEDOR&pagelimit=20&status=todos\nBFF ENTES — MAGIA-136 → MAGIA-137"]

    CargarGrillaEGP --> AccionEGP{Acción sobre grilla EGP}
    CargarGrillaProv --> AccionProv{Acción sobre grilla Proveedor}

    AccionEGP -->|Ver detalle| ObtenerEnte["GET /BFFobtenerInfoEnte?ID=\nBFF ENTES — MAGIA-120 → MAGIA-122"]
    AccionProv -->|Ver detalle| ObtenerEnte
    ObtenerEnte --> ModalDetalle[Modal detalle solo lectura]
    ModalDetalle --> FinDetalle((Fin))

    AccionEGP -->|Nuevo EGP| FormAlta[Formulario Alta Ente]
    AccionProv -->|Nuevo Proveedor| FormAlta
    FormAlta --> ValFE{Validación FE\ncampos obligatorios}
    ValFE -->|Error| FormAlta
    ValFE -->|OK| PostEnte["POST /BFFguardarInfoEntes\nBFF ENTES — MAGIA-119 → MAGIA-121"]
    PostEnte --> RespAlta{Response}
    RespAlta -->|OK| NotifAlta[BE dispara notif. email alta ente]
    NotifAlta --> RefreshGrilla[Refrescar grilla]
    RespAlta -->|ERROR en BFF| ErrBFF["BFF ENTES NO llama BE\nMostrar error funcional al FE"]
    RespAlta -->|ERROR en BE| ErrBE[Mostrar error propagado al FE]

    AccionEGP -->|Editar| FormEditar[Formulario Editar Ente]
    AccionProv -->|Editar| FormEditar
    FormEditar --> PatchEdit["PATCH /BFFactualizarInfoEntes\naction=editar — BFF ENTES — MAGIA-134 → MAGIA-135"]
    PatchEdit --> RespEdit{Response}
    RespEdit -->|OK| RefreshGrilla
    RespEdit -->|ERROR en BFF| ErrBFF
    RespEdit -->|ERROR en BE| ErrBE

    AccionEGP -->|Gestionar pendiente| FormGestionar[Modal Gestionar Autorización]
    AccionProv -->|Gestionar pendiente| FormGestionar
    FormGestionar --> DecAuth{Decisión}
    DecAuth -->|Autorizar| PatchAuth["PATCH /BFFactualizarInfoEntes\naction=autorizar — BFF ENTES — MAGIA-134 → MAGIA-135"]
    DecAuth -->|Rechazar + motivo| PatchRej["PATCH /BFFactualizarInfoEntes\naction=rechazar — BFF ENTES — MAGIA-134 → MAGIA-135"]
    PatchAuth --> RefreshGrilla
    PatchRej --> RefreshGrilla

    AccionEGP -->|Bloquear / Desbloquear| PatchBlock["PATCH /BFFactualizarInfoEntes\naction=bloquear|desbloquear — BFF ENTES — MAGIA-134 → MAGIA-135"]
    AccionProv -->|Bloquear / Desbloquear| PatchBlock
    PatchBlock --> RefreshGrilla

    AccionEGP -->|Borrar| PatchBorrar["PATCH /BFFactualizarInfoEntes\naction=borrar — BFF ENTES — MAGIA-134 → MAGIA-135"]
    AccionProv -->|Borrar| PatchBorrar
    PatchBorrar --> RefreshGrilla

    RefreshGrilla --> TabEnte
    ErrBFF --> TabEnte
    ErrBE --> TabEnte
```

---

## 8. User Flow — Usuarios

```mermaid
flowchart TD
    Start((Inicio)) --> Login[Login Portal Confirming]
    Login --> NavABM[Gestión ABM → Tab Usuarios]
    NavABM --> CargarGrilla["GET /BFFcargarGrillaUsuario\n?entity=USUARIOS&pagelimit=20&status=todos\nBFF ENTES — MAGIA-192 → MAGIA-193"]

    CargarGrilla --> Accion{Acción sobre grilla}

    Accion -->|Ver detalle| ObtenerUsuario["GET /BFFobtenerInfoUsuario?ID=\nBFF ENTES — MAGIA-124 → MAGIA-126"]
    ObtenerUsuario --> ModalDet[Modal detalle solo lectura]
    ModalDet --> FinDet((Fin))

    Accion -->|Nuevo Usuario| FormNuevo[Formulario Nuevo Usuario]
    FormNuevo --> ValFE{Validación FE\nnombre/apellido/email/teléfono/ente/rol}
    ValFE -->|Error| FormNuevo
    ValFE -->|OK| PostUsuario["POST /BFFguardarInfoUsuarios\nBFF ENTES — MAGIA-123 → MAGIA-125"]
    PostUsuario --> RespAlta{Response}
    RespAlta -->|OK| NotifPend[BE notifica alta usuario pendiente autorización]
    NotifPend --> RefreshGrilla[Refrescar grilla Usuarios]
    RespAlta -->|ERROR BFF| ErrBFF["BFF ENTES NO llama BE\nError funcional al FE"]
    RespAlta -->|ERROR BE| ErrBE[Error propagado al FE]

    Accion -->|Editar| FormEditar[Formulario Editar Usuario]
    FormEditar --> CambioCritico{¿Cambió ente o rol?}
    CambioCritico -->|Sí| PatchReauth["PATCH /BFFactualizarInfoUsuarios\naction=editar + re-pendiente\nBFF ENTES — MAGIA-191 → MAGIA-190"]
    CambioCritico -->|No| PatchEdit["PATCH /BFFactualizarInfoUsuarios\naction=editar\nBFF ENTES — MAGIA-191 → MAGIA-190"]
    PatchReauth --> RefreshGrilla
    PatchEdit --> RefreshGrilla

    Accion -->|Gestionar pendiente| FormGestionar[Modal Gestionar Usuario]
    FormGestionar --> DecAuth{Decisión}
    DecAuth -->|Autorizar| ValCI{¿Misma CI que autorizador?}
    ValCI -->|Sí| ErrorCI[Error: no puede auto-autorizarse]
    ValCI -->|No| PatchAuth["PATCH /BFFactualizarInfoUsuarios\naction=autorizar\nBFF ENTES — MAGIA-191 → MAGIA-190"]
    DecAuth -->|Rechazar + motivo| PatchRej["PATCH /BFFactualizarInfoUsuarios\naction=rechazar\nBFF ENTES — MAGIA-191 → MAGIA-190"]
    PatchAuth --> NotifPrimer[BE notifica primer login\nKeycloak activa usuario]
    NotifPrimer --> RefreshGrilla
    PatchRej --> RefreshGrilla

    Accion -->|Bloquear / Desbloquear| PatchBlock["PATCH /BFFactualizarInfoUsuarios\naction=bloquear|desbloquear\nBFF ENTES — MAGIA-191 → MAGIA-190"]
    PatchBlock --> RefreshGrilla

    Accion -->|Borrar| PatchBorrar["PATCH /BFFactualizarInfoUsuarios\naction=borrar\nBFF ENTES — MAGIA-191 → MAGIA-190"]
    PatchBorrar --> RefreshGrilla

    RefreshGrilla --> Accion
    ErrBFF --> Accion
    ErrBE --> Accion
    ErrorCI --> FormGestionar
```

---

## 9. User Flow — Notificaciones

```mermaid
flowchart TD
    Start((Inicio)) --> Login[Login Portal Confirming\npermiso: ABM Notificaciones - Ver]
    Login --> NavABM[Gestión ABM → Tab Notificaciones]
    NavABM --> CargarGrilla["GET /BFFcargarGrillaNotificaciones\n?entity=Notificaciones&pagelimit=20&status=todos\nBFF NOTIFICACIONES — MAGIA-128 → MAGIA-130"]

    CargarGrilla --> VerGrilla[Grilla muestra catálogo notificaciones\nAgrupador · Nombre · Estado disparador · Tipo · Dominio · Rol · Activa]

    VerGrilla --> Filtro{¿Filtrar por nombre?}
    Filtro -->|Sí| ReQuery["GET /BFFcargarGrillaNotificaciones?nombre=...\nBFF NOTIFICACIONES — MAGIA-128 → MAGIA-130"]
    ReQuery --> VerGrilla
    Filtro -->|No| Accion{Acción}

    Accion -->|Activar| PatchActivar["PATCH /BFFactualizarNotificaciones\n{id, activa: true}\nBFF NOTIFICACIONES — MAGIA-127 → MAGIA-129"]
    Accion -->|Desactivar| PatchDesactivar["PATCH /BFFactualizarNotificaciones\n{id, activa: false}\nBFF NOTIFICACIONES — MAGIA-127 → MAGIA-129"]

    PatchActivar --> RespPatch{Response}
    PatchDesactivar --> RespPatch

    RespPatch -->|OK| RefreshGrilla[Refrescar grilla notificaciones]
    RespPatch -->|ERROR BFF| ErrBFF["BFF NOTIFICACIONES NO llama BE\nError funcional al FE"]
    RespPatch -->|ERROR BE| ErrBE[Error propagado al FE]

    RefreshGrilla --> VerGrilla
    ErrBFF --> VerGrilla
    ErrBE --> VerGrilla

    subgraph Runtime["Flujo runtime — disparo automático por BE"]
        Evento["Evento de negocio disparado\n(ej. alta ente, cambio estado usuario/factura)"]
        Evento --> ConsultarNotif["BE consulta notificaciones activas\ndonde estadoDisparador = evento"]
        ConsultarNotif --> HayActiva{¿Notificación activa?}
        HayActiva -->|No| SinEnvio[No envía — fin]
        HayActiva -->|Sí| TipoEnvio{Tipo envío}
        TipoEnvio -->|Email| Email["POST /enviarNotificacion\n→ Servicio Email"]
        TipoEnvio -->|Dominio y Rol| InApp["Notificación in-app\n/ campana topbar"]
        TipoEnvio -->|Ambas| Ambos[Email + In-app]
    end

    VerGrilla -.->|"PATCH activa=true habilita\ndisparo en runtime"| Runtime
```

---

## 10. Modelo de datos

```mermaid
erDiagram
    ENTE ||--o{ USUARIO : "tiene N usuarios"
    ENTE ||--o{ ENTE : "EGP padre → 0..N Proveedores"
    ROL ||--o{ USUARIO : "asignado a N usuarios"
    NOTIFICACION }o--|| AGRUPADOR_ENUM : "pertenece a"

    ENTE {
        bigint id PK
        string tipo "EGP | Proveedor"
        string ruc UK
        string razon_social
        string email
        string telefono
        json monedas "GS | USD"
        decimal linea_credito
        decimal tasa_interes
        decimal tasa_comision
        decimal iva
        boolean cliente_atlas
        boolean desembolso_auto
        bigint egp_padre_id FK "solo Proveedor"
        string estado "Pendiente de Autorización | Autorizado | Rechazado"
        boolean bloqueado
        string motivo_rechazo
        json adjuntos "documentos legales"
    }

    USUARIO {
        bigint id PK
        string nombre
        string apellido
        string documento UK
        string email UK
        string telefono
        bigint ente_id FK
        bigint rol_id FK
        string estado "Pendiente de Autorización | Autorizado | Rechazado"
        boolean bloqueado
        string motivo_rechazo
        string keycloak_id
    }

    ROL {
        bigint id PK
        string dominio "Banco | EGP | Proveedor"
        string rol "ADMIN | SUPERVISOR | OPERADOR | ..."
        json permisos
    }

    NOTIFICACION {
        bigint id PK
        string agrupador "ABM | Login | Simulacion | GestionFacturas"
        string nombre
        string estado_disparador
        json tipos_notificacion "Email | DominioRol | Ambas"
        string dominio
        string rol
        string emails
        text mensaje
        boolean activa
    }

    AGRUPADOR_ENUM {
        string codigo PK "ABM | Login | Simulacion | GestionFacturas"
    }
```

---

## 11. Matriz de trazabilidad Jira

| # | Dominio | BFF | Capa | Método | Endpoint (Jira) | Historia Jira | Estado |
|---|---------|-----|------|--------|-----------------|---------------|--------|
| 1 | Entes | BFF ENTES | BFF | POST | `/api/v1/BFFguardarInfoEntes` | MAGIA-119 | Relevamiento |
| 2 | Entes | BFF ENTES | BFF | GET | `/api/v1/BFFobtenerInfoEnte` | MAGIA-120 | Relevamiento |
| 3 | Entes | BFF ENTES | BFF | GET | `/api/v1/BFFcargarGrillaEnte` | MAGIA-136 | Relevamiento |
| 4 | Entes | BFF ENTES | BFF | PATCH | `/api/v1/BFFactualizarInfoEntes` | MAGIA-134 | Relevamiento |
| 5 | Entes | — | BE | POST | `/api/v1/BEguardarInfoEntes` | MAGIA-121 | Relevamiento |
| 6 | Entes | — | BE | GET | `/api/v1/BEobtenerInfoEnte` | MAGIA-122 | Relevamiento |
| 7 | Entes | — | BE | GET | `/api/v1/BEcargarGrillaEntes` | MAGIA-137 | Relevamiento |
| 8 | Entes | — | BE | PATCH | `/api/v1/BEactualizarInfoEntes` | MAGIA-135 | Relevamiento |
| 9 | Usuarios | BFF ENTES | BFF | POST | `/api/v1/BFFguardarInfoUsuarios` | MAGIA-123 | Relevamiento |
| 10 | Usuarios | BFF ENTES | BFF | GET | `/api/v1/BFFobtenerInfoUsuario` | MAGIA-124 | Relevamiento |
| 11 | Usuarios | BFF ENTES | BFF | GET | `/api/v1/BFFcargarGrillaUsuario` | MAGIA-192 | Relevamiento |
| 12 | Usuarios | BFF ENTES | BFF | PATCH | `/api/v1/BFFactualizarInfoUsuarios` | MAGIA-191 | Relevamiento |
| 13 | Usuarios | — | BE | POST | `/api/v1/BEguardarInfoUsuarios` | MAGIA-125 | Relevamiento |
| 14 | Usuarios | — | BE | GET | `/api/v1/BEobtenerInfoUsuarios` | MAGIA-126 | Relevamiento |
| 15 | Usuarios | — | BE | GET | `/api/v1/BEcargarGrillaUsuario` | MAGIA-193 | Relevamiento |
| 16 | Usuarios | — | BE | PATCH | `/api/v1/BEactualizarInfoUsuarios` | MAGIA-190 | Relevamiento |
| 17 | Notificaciones | BFF NOTIFICACIONES | BFF | GET | `/api/v1/BFFcargarGrillaNotificaciones` | MAGIA-128 | Relevamiento |
| 18 | Notificaciones | BFF NOTIFICACIONES | BFF | PATCH | `/api/v1/BFFactualizarNotificaciones` | MAGIA-127 | En Espera |
| 19 | Notificaciones | — | BE | GET | `/api/v1/BEcargarGrillaNotificaciones` | MAGIA-130 | Relevamiento |
| 20 | Notificaciones | — | BE | PATCH | `/api/v1/BEactualizarNotificaciones` | MAGIA-129 | En Espera |

---

### Criterios de aceptación comunes a todos los endpoints (fuente Jira)

> Extraídos de cada historia MAGIA — criterios idénticos aplicados a los 20 endpoints:

1. Que se exponga el EP correctamente (método correcto: POST / GET / PATCH)
2. Que se respeten los parámetros de request definidos
3. Que se respete el payload de response definido
4. Que se implementen los códigos de error
5. Que se llame al servicio de backend correctamente en el flujo OK
6. Que se envíe la novedad de error/ok al FE
7. **Regla cross-cutting:** cuando el servicio responde ERROR, el BFF **NO realiza llamada al BE**

---

*Documento generado desde historias Jira — Proyecto MAGIA — Banco Atlas*
*Fuente de verdad: https://bancoatlaspy.atlassian.net*
