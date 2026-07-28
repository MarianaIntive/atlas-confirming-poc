# Historias de Usuario — Épica LOGIN (Portal de Confirming · Banco Atlas)

> **Versión:** v1.0.0 · **Fecha:** 2026-07-28
> **Fuente única de requerimientos:** `login (2).xlsx` — hoja **LOGIN** (filas 3 a 42), complementada con las hojas *Matriz de trazabilidad*, *API REST — Backend dominio (Identity)* y *API REST — BFF (orientada a UI)*.
> **Autor:** PO (elaboración de historias) · **Producto:** Portal de Confirming (Atlas Trade)
> **POC de referencia:** https://marianaintive.github.io/atlas-confirming-poc/

---

## Tabla de contenidos

1. [Criterio de elaboración y alcance](#1-criterio-de-elaboración-y-alcance)
2. [Matriz de inclusión / desestimación (fila por fila del Excel)](#2-matriz-de-inclusión--desestimación-fila-por-fila-del-excel)
3. [Contexto de solución, actores y supuestos](#3-contexto-de-solución-actores-y-supuestos)
4. [Reglas de negocio transversales (RN)](#4-reglas-de-negocio-transversales-rn)
5. [Catálogo de mensajes de UI](#5-catálogo-de-mensajes-de-ui)
6. [Historias de usuario funcionales (Gherkin)](#6-historias-de-usuario-funcionales-gherkin)
7. [Historias técnicas — Endpoints BFF / BE](#7-historias-técnicas--endpoints-bff--be)
8. [Tareas técnicas / habilitadores](#8-tareas-técnicas--habilitadores)
9. [Spikes y decisiones pendientes (columna DUDAS)](#9-spikes-y-decisiones-pendientes-columna-dudas)
10. [Recomendaciones del PO — historias faltantes (no están en el Excel)](#10-recomendaciones-del-po--historias-faltantes-no-están-en-el-excel)
11. [Observaciones sobre la consistencia del Excel](#11-observaciones-sobre-la-consistencia-del-excel)
12. [Matriz de trazabilidad HU ↔ endpoint ↔ pantalla de la POC](#12-matriz-de-trazabilidad-hu--endpoint--pantalla-de-la-poc)
13. [Definition of Ready / Definition of Done](#13-definition-of-ready--definition-of-done)

---

## 1. Criterio de elaboración y alcance

| Criterio | Decisión aplicada |
|----------|-------------------|
| **Filas tachadas** | **Desestimadas.** No se elaboran historias. Se registran en la matriz (§2) con el motivo, para conservar la trazabilidad de la decisión. |
| **Filas puntuadas / detalladas** | **Elaboradas.** Se escribe historia completa (objetivo + escenarios + criterios de aceptación en Gherkin) solo para las filas vivas que tienen contenido punteado en las columnas `OBJETIVO` y/o `ESCENARIOS`. |
| **Escenarios del Excel** | Se transcriben literalmente en el bloque *Escenarios (fuente Excel)* de cada historia y, a partir de ese título/enunciado, se construye la lógica completa en **Gherkin**, agregando validaciones, errores y aclaraciones cuando el escenario lo requiere. |
| **Historias faltantes** | **No se mezclan** con las anteriores. Se listan por separado en §10 como recomendación del PO, con justificación y prioridad sugerida. |
| **Identificadores** | Se conserva el `Issue Key` del Excel (`LO-xx`) como identificador estable para no romper la trazabilidad con Jira. Las historias sin key en el Excel reciben un key propuesto (`LO-NN-a`, marcado como *propuesto*). |
| **Idioma y formato** | Español; Gherkin con palabras clave en inglés (`Feature/Background/Scenario/Given/When/Then/And`), igual convención que `assets/funcional_v1.0.0.md` §14. |

**Convención de tipos**

| Tipo | Significado |
|------|-------------|
| `HU-FE` | Historia de usuario con impacto principal en Front End (pantalla / flujo de usuario). |
| `HU-BE` | Historia de usuario cuyo valor se entrega vía backend/notificación (sin pantalla propia). |
| `HT` | Historia técnica (endpoint BFF/BE). Habilitador de una o más HU. |
| `TAREA` | Habilitador de infraestructura o configuración, sin valor de usuario directo. |

---

## 2. Matriz de inclusión / desestimación (fila por fila del Excel)

Hoja `LOGIN`. Se listan las 40 filas con contenido (filas 3 a 42).

| Fila | Key | Summary (Excel) | Tipo | Estado | Motivo |
|-----:|-----|-----------------|------|--------|--------|
| 3 | LO-01 | Implementar servicio OAuth | TAREA | ✅ Incluida | Habilitador; ver §8 T-01 |
| 4 | ~~LO-02~~ | ~~Estructura DER LOGIN~~ | — | ❌ Desestimada | Tachada en el Excel |
| 5 | XX | Configuración de ente Open-API Atlas | TAREA | ✅ Incluida | Habilitador; ver §8 T-02 |
| 6 | — | Atlas Core - Atlas Trade configuración de servicios de mail | TAREA | ✅ Incluida | Habilitador; ver §8 T-03 |
| 7 | — | SPEC CORE (Open API alta/baja de ente, permisos ente notificaciones) | TAREA | ✅ Incluida | Habilitador; ver §8 T-04 |
| 8 | ~~LO-03~~ | ~~Mail Bienvenida - Login usuarios BANCO~~ | — | ❌ Desestimada | Tachada. Nota viva del Excel: *"Ya está resuelto por Keycloak"* (el usuario BANCO se autentica con AD, no recibe credencial temporal) |
| 9 | ~~LO-04~~ | ~~EP POST BE - Envio de mail~~ | — | ❌ Desestimada | Tachada; reemplazada por LO-06 (misma capacidad, servicio existente) |
| 10 | **LO-05** | Mail Bienvenida - Login usuarios EGP/PROVEEDOR | HU-BE | ✅ **Historia elaborada** | §6.1 |
| 11 | **LO-06** | EP POST BE - Envío de mail | HT | ✅ **Historia elaborada** | §7.1 |
| 12 | **LO-07** | PANTALLA LOGIN - Primer Login BANCO | HU-FE | ✅ **Historia elaborada** | §6.2 |
| 13 | ~~LO-08~~ | ~~EP GET BFF/BE - Validar mail/contraseña temporal contra Keycloak~~ | — | ❌ Desestimada | Tachada. BANCO no usa contraseña temporal (AD) |
| 14 | ~~LO-09~~ | ~~EP POST BFF/BE - Actualizar contraseña integrada al AD~~ | — | ❌ Desestimada | Tachada. El cambio de contraseña de BANCO se hace en el AD, fuera del portal |
| 15 | **LO-10** | PANTALLA LOGIN - Primer Login EGP / PROVEEDOR CLIENTE / PROVEEDOR NO CLIENTE | HU-FE | ✅ **Historia elaborada** | §6.3 (unifica los 3 perfiles) |
| 16 | **LO-11** | EP GET BFF/BE - Validar mail/contraseña temporal contra Keycloak (con flag de pass temporal) | HT | ✅ **Historia elaborada** | §7.2 |
| 17 | ~~LO-12~~ | ~~EP POST BFF/BE - Actualizar contraseña integrada al homebanking~~ | — | ❌ Desestimada | Summary tachado. **Impacta a LO-10** (ver alerta en §6.3 y recomendación R-01) |
| 18 | **LO-13** | EP POST BFF/BE - Actualizar contraseña ingresada por el usuario | HT | ✅ **Historia elaborada** | §7.3 |
| 19 | ~~LO-14~~ | ~~PANTALLA LOGIN - Primer Login PROVEEDOR - CLIENTE~~ | — | ❌ Desestimada | Tachada; absorbida por LO-10 |
| 20 | ~~LO-15~~ | ~~EP GET BFF/BE - Validar mail/contraseña temporal~~ | — | ❌ Desestimada | Tachada; absorbida por LO-11 |
| 21 | ~~LO-16~~ | ~~EP POST BFF/BE - Actualizar contraseña integrada al homebanking~~ | — | ❌ Desestimada | Tachada |
| 22 | ~~LO-17~~ | ~~EP POST BFF/BE - Actualizar contraseña ingresada por el usuario~~ | — | ❌ Desestimada | Tachada; absorbida por LO-13 |
| 23 | ~~LO-18~~ | ~~PANTALLA LOGIN - Primer Login PROVEEDOR - NO CLIENTE~~ | — | ❌ Desestimada | Tachada; absorbida por LO-10 |
| 24 | ~~LO-19~~ | ~~EP GET BFF/BE - Validar mail/contraseña temporal~~ | — | ❌ Desestimada | Tachada; absorbida por LO-11 |
| 25 | ~~LO-20~~ | ~~EP POST BFF/BE - Actualizar contraseña ingresada por el usuario~~ | — | ❌ Desestimada | Tachada; absorbida por LO-13 |
| 26 | ~~LO-21~~ | ~~Doble Autenticación - Configuración primer login BANCO~~ | — | ❌ Desestimada | Tachada. El 2FA de BANCO lo provee el AD (ver LO-07 y S-01) |
| 27 | **LO-22** | Doble Autenticación - Configuración primer login EGP / PROVEEDOR CLIENTE / PROVEEDOR NO CLIENTE | HU-FE | ✅ **Historia elaborada** | §6.4 |
| 28 | ~~LO-23~~ | ~~Doble Autenticación - Configuración primer login (PROVEEDOR NO CLIENTE)~~ | — | ❌ Desestimada | Tachada; absorbida por LO-22 |
| 29 | **LO-24** | EP POST BE - Envío de mail con template OTP + validación de código | HT | ✅ **Historia elaborada** | §7.4 |
| 30 | **LO-24-a** *(propuesto)* | EP GET BFF/BE - Mail del usuario | HT | ✅ **Historia elaborada** | §7.5 (fila sin key en el Excel) |
| 31 | **LO-25** | PANTALLA LOGIN - Acceso próximo login password | HU-FE | ✅ **Historia elaborada** | §6.5 |
| 32 | **LO-26** | EP GET BFF - Validación de credenciales AD / Home / Manual | HT | ✅ **Historia elaborada** | §7.6 |
| 33 | **LO-27** | Doble Autenticación - Acceso próximos login | HU-FE | ✅ **Historia elaborada** | §6.6 |
| 34 | **LO-28** | EP GET BFF - Validación de 2FA | HT | ✅ **Historia elaborada** | §7.7 |
| 35 | **LO-29** | Cierre de sesión automático por inactividad | HU-FE | ✅ **Historia elaborada** | §6.7 |
| 36 | **LO-29-a** *(propuesto)* | EP validador del inicio de sesión devuelve también la cookie | HT | ✅ **Historia elaborada** | §7.8 (fila sin key en el Excel) |
| 37 | **LO-30** | Cambio / Desbloqueo de contraseña - BANCO | HU-FE | ✅ **Historia elaborada** | §6.8 |
| 38 | **LO-31** | Cambio / Desbloqueo de contraseña - EGP/PROVEEDOR homebanking | HU-FE | ✅ **Historia elaborada** | §6.9 |
| 39 | **LO-32** | Cambio / Desbloqueo de contraseña - EGP/PROVEEDOR pass manual | HU-FE | ✅ **Historia elaborada** | §6.10 |
| 40 | **LO-33** | EP PATCH BFF - Cambio de contraseña | HT | ✅ **Historia elaborada** | §7.9 |
| 41 | **LO-34** | Bloqueo de contraseña n intentos FE | HU-FE | ✅ **Historia elaborada** | §6.11 |
| 42 | **LO-35** | EP POST - Validación de pass (responde al FE y actualiza flag de status) | HT | ✅ **Historia elaborada** | §7.10 |

**Resumen:** 40 filas con contenido → **18 desestimadas** (tachadas), **11 historias de usuario**, **10 historias técnicas**, **4 tareas habilitadoras** (una fila, la 41, es HU-FE con detalle técnico en `OBJETIVO`).

---

## 3. Contexto de solución, actores y supuestos

### 3.1 Perfiles de usuario (dominios)

| Dominio | Origen de la credencial | 2FA | Cambio de contraseña |
|---------|------------------------|-----|----------------------|
| **BANCO** | Active Directory (AD) corporativo, federado en Keycloak | Provisto por el AD (fuera del portal) | En el AD / Mesa de ayuda. El portal solo informa (LO-30) |
| **EGP** | Credencial temporal enviada por mail; luego contraseña propia gestionada en Keycloak | OTP por mail configurado en el primer login (LO-22) | Home Banking o manual (LO-31 / LO-32) |
| **PROVEEDOR CLIENTE** | Ídem EGP (es cliente del banco, tiene Home Banking) | Ídem EGP | Home Banking o manual |
| **PROVEEDOR NO CLIENTE** | Ídem EGP (no tiene Home Banking) | Ídem EGP | Solo manual con OTP por mail |

### 3.2 Componentes involucrados

- **FE**: Portal de Confirming (SPA).
- **BFF Identity/Login**: orquesta login, 2FA, contraseñas y expone contrato orientado a UI (hoja *API REST — BFF*).
- **BE Identity (dominio)**: endpoints `/internal/v1/**` (hoja *API REST — Backend dominio*).
- **Keycloak**: IdP; federa AD, almacena credenciales de EGP/Proveedor, aplica política de contraseñas, bloqueo por intentos y flag de contraseña temporal.
- **Atlas Core — Servicio de Notificaciones / Mail**: servicio **existente** que envía los mails (bienvenida y OTP). Atlas Trade guarda `ID Template` e histórico de notificaciones; Atlas Core guarda el template.
- **Home Banking**: canal alternativo de actualización de contraseña para EGP / Proveedor cliente.

### 3.3 Supuestos (a confirmar con el equipo técnico)

| # | Supuesto |
|---|----------|
| SUP-01 | Keycloak es la fuente de verdad de credenciales y **resuelve dónde buscar la contraseña** según el dominio del usuario (nota del Excel en LO-26). El FE nunca decide el origen. |
| SUP-02 | El alta del usuario en el ABM es la que dispara el mail de bienvenida (el BFF de ABM invoca `POST /v1/auth/welcome-mail/trigger`). |
| SUP-03 | El histórico de notificaciones se persiste en Atlas Trade (nota del Excel en LO-06). |
| SUP-04 | La sesión del portal se sostiene con cookie emitida por el BFF (nota del Excel en LO-29). |
| SUP-05 | El bloqueo por intentos fallidos lo aplica Keycloak; el BFF lo traduce a un flag que el FE muestra (LO-34 / LO-35). |

---

## 4. Reglas de negocio transversales (RN)

Estas reglas se referencian desde los criterios de aceptación para no repetirlas.

| ID | Regla | Fuente |
|----|-------|--------|
| **RN-01** | La contraseña temporal recibida por mail es de **un solo uso** y obliga al cambio: el servicio de validación responde con `passwordTemporal = true` y el FE **no permite** continuar a la plataforma sin cambiarla. | LO-10, LO-11 (Excel) |
| **RN-02** | **Política de contraseña** (propuesta a validar con Seguridad — ver S-04): mínimo 8 caracteres, al menos 1 mayúscula, 1 minúscula, 1 número y 1 carácter especial; no puede ser igual a la temporal ni a las últimas 3 contraseñas; no puede contener el usuario ni el documento. | Propuesta PO |
| **RN-03** | **OTP**: 6 dígitos numéricos, vigencia 5 minutos, un solo uso, máximo 3 intentos de validación por código, reenvío habilitado con cooldown de 60 segundos y máximo 3 reenvíos por flujo. | Propuesta PO sobre LO-22 |
| **RN-04** | **Bloqueo por intentos**: a los **3 intentos fallidos** consecutivos de contraseña, Keycloak bloquea la credencial; el BFF actualiza el flag de estado y el FE muestra el mensaje de cuenta bloqueada con la vía de recupero. | LO-34 (Excel) |
| **RN-05** | **Cierre por inactividad**: la sesión expira a los **5 minutos** de inactividad; **1 minuto antes** (minuto 4) el FE muestra un aviso con opción de extender. La vigencia se controla con la cookie de sesión; cookie inválida ⇒ redirección al login. | LO-29 (Excel) |
| **RN-06** | El 2FA se solicita **siempre al iniciar sesión luego de un cierre de sesión** (decisión del Excel en LO-27). Para usuarios BANCO el 2FA lo resuelve el AD. | LO-27 (Excel) |
| **RN-07** | Ningún mensaje de error debe permitir **enumerar usuarios**: credenciales inválidas y usuario inexistente devuelven el mismo mensaje genérico. | Propuesta PO (seguridad) |
| **RN-08** | Todo intento de login (exitoso o fallido), configuración de 2FA y cambio de contraseña se registra en auditoría con usuario, fecha/hora, IP y resultado. | Propuesta PO (entidades `INTENTO_LOGIN`, `SESION_AUDIT` de la matriz) |
| **RN-09** | El portal no expone en la UI si el usuario es cliente o no cliente del banco; el canal de actualización disponible lo determina el backend (`login-policy`). | Propuesta PO sobre LO-26 |
| **RN-10** | Los textos de la UI se muestran en español, sin datos sensibles: el mail al que se envía el OTP se muestra **enmascarado** (`ju****@empresa.com`). | Propuesta PO |

---

## 5. Catálogo de mensajes de UI

Referenciados por código desde los escenarios Gherkin.

| Código | Contexto | Mensaje |
|--------|----------|---------|
| MSG-01 | Credenciales inválidas | "Usuario o contraseña incorrectos. Te quedan {n} intentos antes de que bloqueemos tu acceso." |
| MSG-02 | Cuenta bloqueada (RN-04) | "Tu acceso fue bloqueado por 3 intentos fallidos. Usá la opción *¿Olvidaste tu contraseña?* o contactá a la Mesa de Ayuda." |
| MSG-03 | Contraseña temporal vencida | "La contraseña temporal venció. Te reenviamos un nuevo acceso a tu correo." |
| MSG-04 | Política de contraseña no cumplida | "La contraseña no cumple los requisitos de seguridad." (+ checklist en pantalla) |
| MSG-05 | Confirmación de contraseña distinta | "Las contraseñas no coinciden." |
| MSG-06 | OTP incorrecto | "El código ingresado no es correcto. Te quedan {n} intentos." |
| MSG-07 | OTP vencido | "El código expiró. Solicitá un código nuevo." |
| MSG-08 | OTP enviado | "Te enviamos un código de 6 dígitos a {mailEnmascarado}. Vence en 5 minutos." |
| MSG-09 | Reenvío en cooldown | "Podés solicitar un nuevo código en {segundos} segundos." |
| MSG-10 | Aviso de inactividad (RN-05) | "Tu sesión está por cerrarse por inactividad. ¿Querés continuar conectado?" |
| MSG-11 | Sesión cerrada por inactividad | "Cerramos tu sesión por inactividad para proteger tu información." |
| MSG-12 | Usuario BANCO en cambio de contraseña | "Tu contraseña se administra en el directorio corporativo (AD). Cambiala desde tu equipo Banco Atlas o contactá a la Mesa de Ayuda." |
| MSG-13 | Elección de canal EGP/Proveedor | "Podés actualizar tu contraseña desde Home Banking o crear una nueva contraseña acá." |
| MSG-14 | Error de servicio | "No pudimos procesar tu solicitud en este momento. Intentá nuevamente en unos minutos." |
| MSG-15 | 2FA configurado | "¡Listo! Configuramos la verificación en dos pasos de tu cuenta." |
| MSG-16 | Redirección a Home Banking | "Te vamos a llevar a Home Banking para actualizar tu contraseña. Volvé al portal e ingresá con la nueva contraseña." |

---

## 6. Historias de usuario funcionales (Gherkin)

---

### 6.1 LO-05 — Mail de bienvenida · usuarios EGP / PROVEEDOR

| Campo | Valor |
|-------|-------|
| **Key** | LO-05 |
| **Tipo** | HU-BE (sin pantalla propia; se dispara desde el ABM de usuarios) |
| **Dominios** | EGP, PROVEEDOR CLIENTE, PROVEEDOR NO CLIENTE |
| **Depende de** | LO-06 (§7.1), T-03, T-04 |
| **Habilita** | LO-10 (§6.3) |

**Historia**

> **COMO** usuario con dominio/rol dado de alta en la plataforma
> **QUIERO** recibir un mail de bienvenida
> **PARA** obtener la información para loguearme en la plataforma

**Escenarios (fuente Excel)**

```text
-El sistema envía un correo al usuario, con link de acceso, usuario/contraseña temporal
---BD Atlas Trade se guarda el ID Template
---Servicio de Notificaciones de Core envía el mail
--BD Atlas Core se guarda template
```

**Criterios de aceptación**

```gherkin
Feature: Mail de bienvenida para usuarios EGP y Proveedor
  Como usuario dado de alta en la plataforma quiero recibir un mail de bienvenida
  para obtener la información necesaria para ingresar por primera vez.

  Background:
    Given existe el template de mail de bienvenida vigente en la BD de Atlas Core
    And Atlas Trade tiene registrado el "ID Template" de bienvenida
    And el servicio de Notificaciones de Atlas Core está disponible

  Scenario Outline: Envío del mail de bienvenida al autorizar el alta del usuario
    Given un usuario del dominio "<dominio>" con correo "<mail>" y rol "<rol>"
    When el ABM autoriza el alta del usuario
    Then el BFF invoca el servicio de Notificaciones de Atlas Core con el ID Template de bienvenida
    And el usuario recibe un correo en "<mail>" que contiene el link de acceso al portal
    And el correo contiene su nombre de usuario
    And el correo contiene una contraseña temporal de un solo uso
    And el correo indica la vigencia de la contraseña temporal
    And se registra la notificación en el histórico de notificaciones de Atlas Trade con estado "ENVIADO"

    Examples:
      | dominio             | mail                     | rol       |
      | EGP                 | ana@retail.com.py        | ADMIN     |
      | PROVEEDOR CLIENTE   | laura@proveedor.com.py   | ADMIN     |
      | PROVEEDOR NO CLIENTE| jose@servicios.com.py    | OPERADOR  |

  Scenario: El usuario de dominio BANCO no recibe mail de bienvenida con credenciales
    Given un usuario del dominio "BANCO" dado de alta en el ABM
    When el ABM autoriza el alta del usuario
    Then no se genera contraseña temporal
    And el usuario ingresa con sus credenciales de AD
    # Aclaración: LO-03 fue desestimada porque el caso lo resuelve Keycloak/AD

  Scenario: El servicio de notificaciones no está disponible
    Given el servicio de Notificaciones de Atlas Core responde con error
    When se intenta enviar el mail de bienvenida
    Then la notificación queda registrada en el histórico con estado "PENDIENTE_REINTENTO"
    And el sistema reintenta el envío según la política de reintentos definida en LO-06
    And el alta del usuario no se revierte

  Scenario: Reenvío del mail de bienvenida desde el ABM
    Given un usuario dado de alta que no recibió o perdió el mail de bienvenida
    When un usuario con permiso de ABM solicita "Reenviar mail de bienvenida"
    Then el sistema invalida la contraseña temporal anterior
    And genera una nueva contraseña temporal
    And envía un nuevo mail de bienvenida
    And registra un nuevo ítem en el histórico de notificaciones
```

**Aclaraciones / validaciones**

- El mail **no** debe incluir datos sensibles adicionales (documento, teléfono).
- La contraseña temporal se genera cumpliendo RN-02 y se marca en Keycloak como temporal (RN-01).
- Vigencia sugerida de la contraseña temporal: **72 horas** (a confirmar, S-05).

---

### 6.2 LO-07 — Pantalla de login · Primer login BANCO

| Campo | Valor |
|-------|-------|
| **Key** | LO-07 |
| **Tipo** | HU-FE |
| **Dominio** | BANCO |
| **Depende de** | LO-01 (OAuth/Keycloak), LO-26 (§7.6), S-01 (spike 2FA del AD) |
| **Pantalla POC** | `login` → `2fa-ad` → plataforma |

**Historia**

> **COMO** usuario con dominio/rol que me habilita a ingresar a la plataforma de Confirming
> **QUIERO** ingresar a la plataforma con mis credenciales de AD
> **PARA** loguearme en la plataforma

**Escenarios (fuente Excel)**

```text
-Al loguearse se recibe la Autenticacion del doble factor desde el AD
```

**Criterios de aceptación**

```gherkin
Feature: Primer login de usuario BANCO con credenciales de AD
  Como usuario interno del Banco quiero ingresar con mis credenciales corporativas
  para acceder al Portal de Confirming sin gestionar una contraseña adicional.

  Background:
    Given estoy en la pantalla de login del Portal de Confirming
    And mi usuario pertenece al dominio "BANCO" y está habilitado para Confirming

  Scenario: Primer ingreso exitoso con credenciales de AD y 2FA del AD
    Given ingreso mi usuario corporativo y mi contraseña de AD
    When confirmo el ingreso
    Then el sistema valida mis credenciales contra el AD federado en Keycloak
    And el sistema me solicita completar la autenticación de doble factor gestionada por el AD
    When completo satisfactoriamente el doble factor en el AD
    Then accedo a la plataforma con el dominio y rol que tengo asignados
    And no se me solicita crear ni actualizar una contraseña en el portal
    And se registra el intento de login exitoso en auditoría

  Scenario: Doble factor del AD rechazado o no completado
    Given ingresé mis credenciales de AD correctamente
    And el sistema me solicitó la autenticación de doble factor
    When no completo el doble factor o el AD lo rechaza
    Then no accedo a la plataforma
    And vuelvo a la pantalla de login
    And veo el mensaje MSG-14 con la indicación de reintentar el ingreso
    And se registra el intento fallido en auditoría

  Scenario: Credenciales de AD incorrectas
    Given ingreso mi usuario corporativo con una contraseña incorrecta
    When confirmo el ingreso
    Then permanezco en la pantalla de login
    And veo el mensaje MSG-01 con la cantidad de intentos restantes
    And el contador de intentos fallidos se incrementa según RN-04

  Scenario: Usuario de AD válido sin rol habilitado en Confirming
    Given mis credenciales de AD son válidas
    And no tengo un rol habilitado para el Portal de Confirming
    When confirmo el ingreso
    Then no accedo a la plataforma
    And veo un mensaje indicando que no tengo permisos para operar en Confirming
    And el mensaje ofrece el contacto de la Mesa de Ayuda

  Scenario: Contraseña de AD expirada
    Given mi contraseña de AD está expirada
    When confirmo el ingreso
    Then no accedo a la plataforma
    And veo el mensaje MSG-12 indicando que debo actualizarla en el directorio corporativo
    # Continúa en LO-30

  Scenario: Campos obligatorios vacíos
    Given dejo vacío el campo "Usuario" o el campo "Contraseña"
    When intento confirmar el ingreso
    Then el sistema no envía la solicitud
    And veo la validación de campo obligatorio en el campo vacío

  Scenario: El servicio de autenticación no responde
    Given el BFF de login no está disponible
    When confirmo el ingreso
    Then veo el mensaje MSG-14
    And el botón de ingreso vuelve a estar habilitado para reintentar
```

**Aclaraciones**

- **S-01 (spike):** se debe investigar el 2FA del AD para definir si la experiencia es una redirección al IdP corporativo o un paso embebido en el portal. La HU asume **redirección/paso gestionado por el AD** y el portal solo espera el resultado.
- El portal **no** ofrece "crear contraseña" ni "configurar 2FA" a usuarios BANCO (LO-21 desestimada).

---

### 6.3 LO-10 — Pantalla de login · Primer login EGP / PROVEEDOR CLIENTE / PROVEEDOR NO CLIENTE

| Campo | Valor |
|-------|-------|
| **Key** | LO-10 |
| **Tipo** | HU-FE |
| **Dominios** | EGP, PROVEEDOR CLIENTE, PROVEEDOR NO CLIENTE |
| **Depende de** | LO-05 (§6.1), LO-11 (§7.2), LO-13 (§7.3) |
| **Habilita** | LO-22 (§6.4) |
| **Pantalla POC** | `login` → `primer-login-temporal` → `canal-password` → `nueva-password` → LO-22 |

> ⚠️ **Alerta de dependencia:** el objetivo del Excel incluye *"actualizar la contraseña mediante homebanking"*, pero el endpoint que soportaba ese canal (**LO-12 / LO-16**) está **tachado**. Se elabora la historia con el canal Home Banking como **derivación informativa** (el usuario es enviado a Home Banking y luego vuelve a ingresar), y se deja la integración plena como recomendación **R-01** y spike **S-02**.

**Historia**

> **COMO** usuario con dominio/rol que me habilita a ingresar a la plataforma de Confirming
> **QUIERO** poder introducir el usuario y contraseña recibidos por mail
> **PARA** loguearme en la plataforma y actualizar la contraseña mediante homebanking o generando una nueva contraseña

**Escenarios (fuente Excel)**

```text
-El sistema ejecuta el flujo de primer login, valida contraseña temporal, usuario y rol
 (en la respuesta del servicio se envía un flag que marca a la pass como contraseña temporal
 para obligar al usuario a cambiarla)
-El sistema ejecuta el flujo de actualización de contraseña temporal integrando al homebanking
-El sistema ejecuta el flujo de actualización manual de contraseña
```

**Criterios de aceptación**

```gherkin
Feature: Primer login de usuario EGP / Proveedor con contraseña temporal
  Como usuario externo quiero ingresar con las credenciales que recibí por mail
  y definir mi contraseña definitiva para poder operar en el portal.

  Background:
    Given recibí el mail de bienvenida con mi usuario y una contraseña temporal
    And estoy en la pantalla de login del Portal de Confirming

  # ---------- Validación de la credencial temporal ----------

  Scenario Outline: El sistema detecta la contraseña temporal y obliga a cambiarla
    Given mi usuario pertenece al dominio "<dominio>"
    When ingreso mi usuario y la contraseña temporal recibida por mail
    Then el servicio valida usuario, contraseña temporal y rol contra Keycloak
    And la respuesta incluye el flag "passwordTemporal = true"
    And el sistema me lleva a la pantalla de actualización de contraseña
    And no puedo navegar a ninguna pantalla del portal hasta completar el cambio

    Examples:
      | dominio              |
      | EGP                  |
      | PROVEEDOR CLIENTE    |
      | PROVEEDOR NO CLIENTE |

  Scenario: Contraseña temporal incorrecta
    Given ingreso mi usuario con una contraseña temporal incorrecta
    When confirmo el ingreso
    Then permanezco en la pantalla de login
    And veo el mensaje MSG-01 con los intentos restantes
    And el contador de intentos fallidos se incrementa según RN-04

  Scenario: Contraseña temporal vencida
    Given la contraseña temporal que recibí superó su vigencia
    When ingreso usuario y contraseña temporal
    Then veo el mensaje MSG-03
    And el sistema dispara el reenvío del mail de bienvenida con una nueva contraseña temporal
    And permanezco en la pantalla de login

  Scenario: Usuario válido sin rol habilitado
    Given mis credenciales temporales son correctas
    And mi usuario no tiene un rol habilitado en el portal
    When confirmo el ingreso
    Then no accedo a la plataforma
    And veo un mensaje indicando que mi usuario no tiene permisos asignados
    And se ofrece el contacto de la Mesa de Ayuda

  Scenario: Usuario inexistente
    Given ingreso un usuario que no existe en la plataforma
    When confirmo el ingreso
    Then veo el mensaje genérico MSG-01
    And el sistema no revela si el usuario existe o no
    # Regla RN-07: evitar enumeración de usuarios

  # ---------- Elección de canal de actualización ----------

  Scenario: EGP o Proveedor cliente puede elegir Home Banking o contraseña manual
    Given validé mi contraseña temporal
    And mi usuario tiene habilitado el canal "HOMEBANKING" según la política de login
    When el sistema me muestra la pantalla de actualización de contraseña
    Then veo el mensaje MSG-13
    And veo la opción "Actualizar desde Home Banking"
    And veo la opción "Crear una contraseña nueva acá"

  Scenario: Proveedor no cliente solo puede definir contraseña manual
    Given validé mi contraseña temporal
    And mi usuario no tiene habilitado el canal "HOMEBANKING"
    When el sistema me muestra la pantalla de actualización de contraseña
    Then solo veo la opción de crear una contraseña nueva en el portal
    And no veo ninguna referencia a Home Banking
    # Regla RN-09: el canal disponible lo define el backend

  Scenario: Derivación a Home Banking
    Given estoy en la pantalla de actualización de contraseña
    When elijo "Actualizar desde Home Banking"
    Then veo el mensaje MSG-16 explicando la derivación
    And confirmo la derivación
    And el sistema me redirige a Home Banking
    And mi contraseña temporal sigue vigente hasta que la actualice
    # Pendiente S-02 / R-01: alcance real de la integración con Home Banking

  # ---------- Actualización manual de la contraseña ----------

  Scenario: Actualización manual exitosa
    Given elegí crear una contraseña nueva en el portal
    When ingreso una contraseña que cumple la política RN-02
    And repito la misma contraseña en el campo de confirmación
    And confirmo el cambio
    Then el sistema actualiza mi contraseña en Keycloak
    And el flag de contraseña temporal queda en "false"
    And el sistema me lleva al flujo de configuración de doble autenticación
    # Continúa en LO-22

  Scenario Outline: La contraseña nueva no cumple la política de seguridad
    Given estoy en la pantalla de creación de contraseña
    When ingreso la contraseña "<password>"
    Then veo el mensaje MSG-04
    And el requisito "<requisito>" aparece como no cumplido en el checklist
    And el botón de confirmación permanece deshabilitado

    Examples:
      | password      | requisito                  |
      | abc123        | mínimo 8 caracteres        |
      | abcdefgh      | al menos un número         |
      | abcdefg1      | al menos una mayúscula     |
      | ABCDEFG1      | al menos una minúscula     |
      | Abcdefg1      | al menos un carácter especial |

  Scenario: La confirmación no coincide
    Given ingresé una contraseña válida
    When ingreso una confirmación distinta
    Then veo el mensaje MSG-05
    And el botón de confirmación permanece deshabilitado

  Scenario: La contraseña nueva es igual a la temporal
    Given estoy en la pantalla de creación de contraseña
    When ingreso como nueva contraseña la misma contraseña temporal
    And confirmo el cambio
    Then el sistema rechaza el cambio
    And veo el mensaje MSG-04 indicando que no puede repetir la contraseña anterior

  Scenario: Visibilidad de la contraseña y checklist en vivo
    Given estoy en la pantalla de creación de contraseña
    Then veo el checklist con los requisitos de la política de contraseña
    And cada requisito se marca como cumplido a medida que escribo
    And puedo mostrar u ocultar el contenido del campo de contraseña

  Scenario: Error del servicio al actualizar la contraseña
    Given ingresé una contraseña válida
    When confirmo el cambio y el servicio responde con error
    Then veo el mensaje MSG-14
    And permanezco en la pantalla de creación de contraseña con los datos ingresados
    And mi contraseña temporal sigue siendo válida

  Scenario: Abandono del flujo antes de completar el cambio
    Given validé mi contraseña temporal
    And no completé el cambio de contraseña
    When cierro el navegador y vuelvo a ingresar con la contraseña temporal
    Then el sistema me vuelve a exigir el cambio de contraseña
    # Regla RN-01
```

---

### 6.4 LO-22 — Doble autenticación · Configuración en el primer login (EGP / PROVEEDOR CLIENTE / PROVEEDOR NO CLIENTE)

| Campo | Valor |
|-------|-------|
| **Key** | LO-22 |
| **Tipo** | HU-FE |
| **Dominios** | EGP, PROVEEDOR CLIENTE, PROVEEDOR NO CLIENTE |
| **Depende de** | LO-10 (§6.3), LO-24 (§7.4), LO-24-a (§7.5) |
| **Pantalla POC** | `2fa-mail` → `2fa-otp` → `2fa-listo` |

**Historia**

> **COMO** usuario EGP/PROVEEDOR que está realizando el primer login **y que ya cambió su contraseña**
> **QUIERO** configurar el doble factor de autenticación (2FA)
> **PARA** completar el flujo de login

**Escenarios (fuente Excel)**

```text
-Al finalizar la actualización de contraseña el sistema ejecuta el flujo de configuración de 2FA
--Valida datos del usuario (mail): msj "te enviamos un correo a xxx@aaa" y la opción de cambiarlo
  para la recepción del OTP
--Se envía notificación OTP por mail
--Recibe el código OTP
--Ingresa el código OTP en la plataforma
-Validación del código ingresado vs el enviado por mail
--Finaliza la configuración de 2FA
```

**Criterios de aceptación**

```gherkin
Feature: Configuración del doble factor de autenticación en el primer login
  Como usuario EGP o Proveedor que ya definió su contraseña quiero configurar la
  verificación en dos pasos para completar mi primer ingreso de forma segura.

  Background:
    Given completé la actualización de mi contraseña temporal
    And el sistema inicia automáticamente el flujo de configuración de 2FA

  # ---------- Confirmación del correo de recepción ----------

  Scenario: Confirmación del correo registrado
    When el sistema muestra la pantalla de configuración de 2FA
    Then veo el texto "Te enviamos un correo a" con mi correo registrado enmascarado
    And veo la opción para modificar el correo de recepción del código
    And veo el botón para enviar el código

  Scenario: Cambio del correo de recepción del código
    Given estoy en la pantalla de configuración de 2FA
    When elijo modificar el correo de recepción
    And ingreso el correo "nuevo.correo@empresa.com.py"
    And confirmo el cambio
    Then el sistema valida el formato del correo
    And el código OTP se envía al nuevo correo
    And el correo queda registrado como dato de contacto del usuario

  Scenario Outline: Correo con formato inválido
    Given elegí modificar el correo de recepción
    When ingreso el correo "<mail>"
    Then veo la validación de formato de correo inválido
    And el botón de confirmación permanece deshabilitado

    Examples:
      | mail              |
      | correo            |
      | correo@           |
      | correo@empresa    |
      | @empresa.com      |

  # ---------- Envío y validación del OTP ----------

  Scenario: Envío del código OTP
    Given confirmé el correo de recepción
    When solicito el envío del código
    Then el sistema envía la notificación OTP por mail usando el template de OTP
    And veo el mensaje MSG-08 con el correo enmascarado y la vigencia del código
    And veo el campo para ingresar los 6 dígitos
    And veo el contador de reenvío deshabilitado por 60 segundos

  Scenario: Validación exitosa del código y cierre de la configuración
    Given recibí el código OTP en mi correo
    When ingreso el código correcto
    Then el sistema valida el código ingresado contra el código enviado
    And veo el mensaje MSG-15
    And la configuración de 2FA queda registrada para mi usuario
    And accedo a la plataforma con mi dominio y rol
    And se registra el evento en auditoría

  Scenario: Código incorrecto con intentos restantes
    Given recibí el código OTP
    When ingreso un código incorrecto
    Then veo el mensaje MSG-06 con la cantidad de intentos restantes
    And permanezco en la pantalla de ingreso del código

  Scenario: Se agotan los intentos del código
    Given ingresé un código incorrecto 3 veces
    When ingreso un código incorrecto por tercera vez
    Then el código queda invalidado
    And veo el mensaje MSG-07 indicando que debo solicitar un código nuevo
    And el botón de reenvío queda habilitado

  Scenario: Código vencido
    Given recibí el código OTP hace más de 5 minutos
    When ingreso ese código
    Then veo el mensaje MSG-07
    And el botón de reenvío queda habilitado

  Scenario: Reenvío del código dentro del cooldown
    Given solicité el envío del código hace menos de 60 segundos
    When intento reenviar el código
    Then veo el mensaje MSG-09 con los segundos restantes
    And no se envía un nuevo código

  Scenario: Reenvío del código habilitado
    Given pasaron más de 60 segundos desde el último envío
    When solicito reenviar el código
    Then el sistema envía un nuevo código y invalida el anterior
    And el contador de reenvío se reinicia en 60 segundos

  Scenario: Máximo de reenvíos alcanzado
    Given ya solicité 3 reenvíos en este flujo
    When intento reenviar el código nuevamente
    Then el sistema no envía un nuevo código
    And veo un mensaje indicando que debo reintentar el ingreso más tarde o contactar a la Mesa de Ayuda

  Scenario Outline: Validaciones de formato del campo de código
    Given estoy en la pantalla de ingreso del código
    When ingreso "<valor>" en el campo de código
    Then el campo solo acepta 6 dígitos numéricos
    And el botón de validación se habilita únicamente con 6 dígitos ingresados

    Examples:
      | valor    |
      | 12345    |
      | 12345a   |
      | 1234567  |

  Scenario: El servicio de envío de mail no está disponible
    Given el servicio de notificaciones responde con error
    When solicito el envío del código
    Then veo el mensaje MSG-14
    And puedo reintentar el envío
    And el flujo de 2FA no queda marcado como completado

  Scenario: El 2FA es obligatorio para completar el primer login
    Given estoy en el flujo de configuración de 2FA
    When intento saltear el paso o navegar a otra pantalla del portal
    Then el sistema no me permite continuar
    And permanezco en el flujo de configuración de 2FA
```

**Aclaraciones**

- Para usuarios **BANCO** este flujo no aplica (LO-21 desestimada; el 2FA lo provee el AD).
- El canal del segundo factor en esta iteración es **mail (OTP)**. La hoja de API menciona `qrUri/secret` en `POST /v1/auth/mfa/setup`: si se habilita **TOTP con app autenticadora**, corresponde una historia aparte (ver **R-02**).

---

### 6.5 LO-25 — Pantalla de login · Acceso en los próximos logins (password)

| Campo | Valor |
|-------|-------|
| **Key** | LO-25 |
| **Tipo** | HU-FE |
| **Dominios** | Todos |
| **Depende de** | LO-26 (§7.6), LO-29-a (§7.8) |
| **Habilita** | LO-27 (§6.6) |
| **Pantalla POC** | `login` → LO-27 → plataforma |

**Historia**

> **COMO** usuario de la plataforma que finalizó su primer login
> **QUIERO** ingresar a la plataforma con las nuevas credenciales
> **PARA** acceder y utilizar la plataforma

**Escenarios (fuente Excel)**

```text
1-El sistema ejecuta el flujo de login y autentica credenciales AD
2-El sistema ejecuta el flujo de login y autentica credenciales homebanking
3-El sistema ejecuta el flujo de login y autentica credenciales configuradas manualmente
```
> Nota del Excel (LO-26): *"Keycloak se encarga de diferenciar dónde buscar la pass"*.

**Criterios de aceptación**

```gherkin
Feature: Acceso recurrente al portal con credenciales definitivas
  Como usuario que ya completó su primer login quiero ingresar con mis credenciales
  definitivas para operar en el portal.

  Background:
    Given completé mi primer login
    And estoy en la pantalla de login del Portal de Confirming

  Scenario Outline: Ingreso exitoso según el origen de la credencial
    Given mi contraseña está administrada en "<origen>"
    When ingreso mi usuario y contraseña
    Then Keycloak resuelve el origen de la credencial sin intervención del front end
    And la autenticación es exitosa
    And el sistema continúa con la validación de doble factor
    And el portal recibe la cookie de sesión

    Examples:
      | origen                       |
      | AD                           |
      | Home Banking                 |
      | Contraseña manual del portal |

  Scenario: El usuario no debe elegir el origen de su contraseña
    Given estoy en la pantalla de login
    Then solo veo los campos "Usuario" y "Contraseña"
    And no veo ninguna opción para seleccionar AD, Home Banking o contraseña manual

  Scenario: Credenciales incorrectas
    When ingreso mi usuario con una contraseña incorrecta
    Then veo el mensaje MSG-01 con los intentos restantes
    And permanezco en la pantalla de login
    # Continúa en LO-34 al alcanzar 3 intentos

  Scenario: Usuario bloqueado
    Given mi usuario está bloqueado por intentos fallidos
    When ingreso mis credenciales correctas
    Then no accedo a la plataforma
    And veo el mensaje MSG-02 con la vía de recupero

  Scenario: Usuario deshabilitado o dado de baja en el ABM
    Given mi usuario fue dado de baja o deshabilitado en el ABM
    When ingreso mis credenciales
    Then no accedo a la plataforma
    And veo un mensaje indicando que mi acceso no está habilitado
    And se ofrece el contacto de la Mesa de Ayuda

  Scenario: Contraseña expirada por política
    Given mi contraseña superó la vigencia definida por política
    When ingreso mis credenciales correctas
    Then el sistema me exige actualizar la contraseña antes de continuar
    # Continúa en LO-31 / LO-32

  Scenario: Sesión ya iniciada en el mismo navegador
    Given tengo una sesión válida vigente en este navegador
    When abro nuevamente la URL del portal
    Then accedo directamente a la plataforma sin volver a ingresar credenciales

  Scenario: El servicio de autenticación no responde
    Given el BFF de login no está disponible
    When intento ingresar
    Then veo el mensaje MSG-14
    And permanezco en la pantalla de login con el botón habilitado para reintentar

  Scenario: Campos obligatorios
    When intento ingresar con el campo "Usuario" o "Contraseña" vacío
    Then el sistema no envía la solicitud
    And veo la validación de campo obligatorio
```

---

### 6.6 LO-27 — Doble autenticación · Accesos posteriores

| Campo | Valor |
|-------|-------|
| **Key** | LO-27 |
| **Tipo** | HU-FE |
| **Dominios** | EGP, PROVEEDOR CLIENTE, PROVEEDOR NO CLIENTE (BANCO: 2FA del AD, S-01) |
| **Depende de** | LO-25 (§6.5), LO-28 (§7.7), LO-24 (§7.4) |
| **Pantalla POC** | `login` → `2fa-otp` (con opción "recordar este dispositivo") |

**Historia**

> **COMO** usuario de la plataforma que finalizó su primer login
> **QUIERO** validar el doble factor de autenticación y registrar mi dispositivo como seguro
> **PARA** acceder y utilizar la plataforma

**Escenarios (fuente Excel)**

```text
1-El sistema pide la ejecución de la doble autenticación para validar el login
```
> Nota del Excel (DUDAS): *"Para usuarios EGP/PROVEEDOR: ¿cada cuánto tiempo queremos pedir la doble autenticación? = siempre pedirlo al cerrar sesión"* (RN-06). Para usuarios BANCO queda el spike S-01.

**Criterios de aceptación**

```gherkin
Feature: Validación de doble factor en accesos posteriores
  Como usuario recurrente quiero validar el segundo factor y poder marcar mi
  dispositivo como seguro para acceder de forma ágil y protegida.

  Background:
    Given completé la configuración de 2FA en mi primer login
    And autentiqué correctamente mi usuario y contraseña

  Scenario: Solicitud de doble factor luego de un cierre de sesión
    Given cerré sesión en mi acceso anterior
    When me autentico nuevamente
    Then el sistema me solicita el código de doble factor
    And el código se envía al correo registrado
    And veo el mensaje MSG-08

  Scenario: Validación exitosa del doble factor
    Given recibí el código de doble factor
    When ingreso el código correcto
    Then accedo a la plataforma con mi dominio y rol
    And el portal recibe la cookie de sesión
    And se registra el acceso en auditoría

  Scenario: Registro del dispositivo como seguro
    Given estoy en la pantalla de validación del doble factor
    When marco la opción "Recordar este dispositivo"
    And valido el código correctamente
    Then el dispositivo queda registrado como dispositivo confiable de mi usuario
    And veo la confirmación del registro

  Scenario: Ingreso desde un dispositivo ya registrado como seguro
    Given tengo este dispositivo registrado como confiable
    And no cerré sesión explícitamente en el acceso anterior
    When me autentico con usuario y contraseña
    Then el sistema no me solicita el código de doble factor
    And accedo directamente a la plataforma

  Scenario: Ingreso desde un dispositivo nuevo
    Given nunca ingresé desde este dispositivo o navegador
    When me autentico con usuario y contraseña
    Then el sistema me solicita el código de doble factor
    And el sistema me informa que detectó un acceso desde un dispositivo nuevo

  Scenario: Se solicita doble factor siempre luego de cerrar sesión, aun en dispositivo confiable
    Given tengo este dispositivo registrado como confiable
    And cerré sesión explícitamente
    When me autentico nuevamente
    Then el sistema me solicita el código de doble factor
    # Regla RN-06

  Scenario Outline: Código de doble factor inválido o vencido
    Given recibí el código de doble factor
    When ingreso un código "<condición>"
    Then veo el mensaje "<mensaje>"
    And no accedo a la plataforma

    Examples:
      | condición                | mensaje |
      | incorrecto               | MSG-06  |
      | vencido (más de 5 min)   | MSG-07  |
      | ya utilizado             | MSG-07  |

  Scenario: Se agotan los intentos de validación del código
    Given ingresé el código incorrectamente 3 veces
    Then el código queda invalidado
    And vuelvo a la pantalla de login
    And veo un mensaje indicando que debo iniciar el ingreso nuevamente

  Scenario: Reenvío del código
    Given estoy en la pantalla de validación del doble factor
    When solicito reenviar el código
    Then se aplican las reglas de cooldown y máximo de reenvíos de RN-03

  Scenario: Abandono de la validación del doble factor
    Given el sistema me solicitó el código de doble factor
    When abandono el flujo sin validar el código
    Then no se genera sesión activa
    And al volver al portal debo autenticarme desde el inicio

  Scenario: Usuario BANCO
    Given mi usuario pertenece al dominio "BANCO"
    When me autentico con mis credenciales de AD
    Then el doble factor lo gestiona el AD
    And el portal no solicita un código OTP propio
    # Sujeto al resultado del spike S-01
```

---

### 6.7 LO-29 — Cierre de sesión automático por inactividad

| Campo | Valor |
|-------|-------|
| **Key** | LO-29 |
| **Tipo** | HU-FE |
| **Dominios** | Todos |
| **Depende de** | LO-29-a (§7.8 — la validación de inicio de sesión devuelve la cookie) |
| **Pantalla POC** | modal `sesión por expirar` + retorno a `login` con MSG-11 |

**Historia**

> **COMO** usuario logueado en la plataforma
> **QUIERO** que se cierre la sesión automáticamente luego de n minutos
> **PARA** proteger la información sensible que gestiono en la plataforma

**Escenarios (fuente Excel)**

```text
1-El sistema mostrará un warning de cierre de sesión para permitirle al usuario extender la sesión
2-El sistema extiende la sesión ante la confirmación
3-El sistema cierra la sesión ante la no confirmación
```
> Notas del Excel: *5 minutos de inactividad · 1 minuto antes se muestra el warning · en base a cookies en FE · cuando tenga cookie inválido devuelve al login* (RN-05).

**Criterios de aceptación**

```gherkin
Feature: Cierre de sesión automático por inactividad
  Como usuario logueado quiero que el portal cierre mi sesión tras un período de
  inactividad para proteger la información que gestiono.

  Background:
    Given inicié sesión correctamente en el portal
    And el tiempo de inactividad permitido es de 5 minutos
    And el aviso previo se muestra 1 minuto antes del cierre

  Scenario: Aviso previo al cierre por inactividad
    Given estoy en cualquier pantalla del portal
    When permanezco 4 minutos sin interactuar
    Then veo el aviso MSG-10
    And el aviso muestra una cuenta regresiva de 60 segundos
    And el aviso ofrece las acciones "Continuar conectado" y "Cerrar sesión"

  Scenario: Extensión de la sesión ante la confirmación
    Given veo el aviso de cierre por inactividad
    When elijo "Continuar conectado"
    Then el aviso se cierra
    And la sesión se renueva por 5 minutos más
    And permanezco en la misma pantalla sin perder los datos cargados en pantalla

  Scenario: Cierre de sesión ante la no confirmación
    Given veo el aviso de cierre por inactividad
    When no realizo ninguna acción durante los 60 segundos de la cuenta regresiva
    Then el sistema cierra mi sesión
    And soy redirigido a la pantalla de login
    And veo el mensaje MSG-11

  Scenario: Cierre inmediato solicitado desde el aviso
    Given veo el aviso de cierre por inactividad
    When elijo "Cerrar sesión"
    Then el sistema cierra mi sesión inmediatamente
    And soy redirigido a la pantalla de login

  Scenario Outline: La interacción del usuario reinicia el contador
    Given estoy operando en el portal
    When realizo la acción "<acción>" antes de los 4 minutos
    Then el contador de inactividad se reinicia
    And no veo el aviso de cierre de sesión

    Examples:
      | acción                        |
      | navegar a otra sección        |
      | hacer clic en la pantalla     |
      | escribir en un campo          |
      | desplazar la pantalla         |

  Scenario: Cookie de sesión inválida o vencida
    Given mi cookie de sesión está vencida o es inválida
    When intento ejecutar cualquier acción que consulte al BFF
    Then el sistema me redirige a la pantalla de login
    And veo el mensaje MSG-11
    # Nota del Excel: "cuando tenga cookie inválido devuelve al login"

  Scenario: Operación en curso al momento del cierre
    Given tengo un formulario con datos sin guardar
    When la sesión se cierra por inactividad
    Then el sistema no guarda la información no confirmada
    And al volver a ingresar comienzo desde el inicio de la operación

  Scenario: Cierre de sesión manual
    Given estoy operando en el portal
    When elijo "Cerrar Sesión" en el menú lateral
    Then el sistema invalida la cookie de sesión
    And soy redirigido a la pantalla de login
    And en el próximo ingreso se me solicitará el doble factor
    # Regla RN-06
```

**Aclaraciones**

- El contador vive en el FE (basado en la cookie), pero la **autoridad** del cierre es la cookie: si el backend la invalida antes, el FE debe redirigir al login en la siguiente llamada.
- El aviso debe ser accesible: foco en el botón principal y anuncio del aviso por lector de pantalla.

---

### 6.8 LO-30 — Cambio / Desbloqueo de contraseña · BANCO

| Campo | Valor |
|-------|-------|
| **Key** | LO-30 |
| **Tipo** | HU-FE |
| **Dominio** | BANCO |
| **Depende de** | LO-26 (§7.6 — resolución del dominio del usuario) |
| **Pantalla POC** | `olvide-password` → `aviso-ad` |

**Historia**

> **COMO** usuario que intenta loguearse en la plataforma y olvidó o expiró su contraseña
> **QUIERO** cambiar la contraseña de mi cuenta
> **PARA** poder loguearme en la plataforma

**Escenarios (fuente Excel)**

```text
1-El sistema mostrará un warning de que debe actualizarlo desde el AD
```

**Criterios de aceptación**

```gherkin
Feature: Recupero de contraseña para usuarios BANCO
  Como usuario interno del Banco quiero saber cómo recuperar mi acceso cuando
  olvido o se expira mi contraseña corporativa.

  Background:
    Given estoy en la pantalla de login del Portal de Confirming

  Scenario: Aviso de gestión de contraseña en el AD
    Given mi usuario pertenece al dominio "BANCO"
    When elijo "¿Olvidaste tu contraseña?"
    And ingreso mi usuario corporativo
    Then veo el aviso MSG-12 indicando que la contraseña se administra en el directorio corporativo
    And veo la referencia a la Mesa de Ayuda con su canal de contacto
    And no veo ningún formulario para definir una contraseña nueva en el portal

  Scenario: Contraseña de AD expirada detectada en el login
    Given mi contraseña de AD está expirada
    When intento ingresar con mis credenciales
    Then veo el aviso MSG-12
    And puedo volver a la pantalla de login

  Scenario: Usuario BANCO bloqueado por intentos fallidos
    Given mi usuario BANCO quedó bloqueado por 3 intentos fallidos
    When elijo "¿Olvidaste tu contraseña?" e ingreso mi usuario
    Then veo el aviso MSG-12 con la indicación de desbloqueo por Mesa de Ayuda
    And el portal no ofrece desbloqueo automático

  Scenario: El portal no revela la existencia del usuario
    Given ingreso un usuario que no existe
    When solicito el recupero de contraseña
    Then veo un mensaje genérico con las indicaciones de recupero
    And el sistema no informa si el usuario existe
    # Regla RN-07

  Scenario: Retorno al login
    Given estoy viendo el aviso de gestión de contraseña en el AD
    When elijo "Volver al inicio"
    Then regreso a la pantalla de login con los campos vacíos
```

---

### 6.9 LO-31 — Cambio / Desbloqueo de contraseña · EGP / PROVEEDOR con Home Banking

| Campo | Valor |
|-------|-------|
| **Key** | LO-31 |
| **Tipo** | HU-FE |
| **Dominios** | EGP, PROVEEDOR CLIENTE |
| **Depende de** | LO-33 (§7.9), LO-24 (§7.4) |
| **Pantalla POC** | `olvide-password` → `canal-password` → Home Banking / `nueva-password` |

**Historia**

> **COMO** usuario que intenta loguearse en la plataforma y olvidó o expiró su contraseña
> **QUIERO** cambiar la contraseña de mi cuenta
> **PARA** poder loguearme en la plataforma

**Escenarios (fuente Excel)**

```text
1-El sistema mostrará un warning de que puede actualizarlo desde homebanking
  o si desea continuar cambiar la contraseña manualmente
```

**Criterios de aceptación**

```gherkin
Feature: Recupero de contraseña para EGP y Proveedor cliente con Home Banking
  Como usuario cliente del banco quiero elegir entre actualizar mi contraseña
  desde Home Banking o crear una nueva en el portal para recuperar mi acceso.

  Background:
    Given estoy en la pantalla de login del Portal de Confirming
    And mi usuario tiene habilitado el canal "HOMEBANKING" según la política de login

  Scenario: Elección del canal de actualización
    When elijo "¿Olvidaste tu contraseña?"
    And ingreso mi usuario
    Then veo el mensaje MSG-13
    And veo la opción "Actualizar desde Home Banking"
    And veo la opción "Crear una contraseña nueva acá"

  Scenario: Derivación a Home Banking
    Given estoy viendo las opciones de actualización de contraseña
    When elijo "Actualizar desde Home Banking"
    Then veo el mensaje MSG-16
    And al confirmar soy redirigido a Home Banking
    And puedo volver al portal e ingresar con la contraseña actualizada
    # Alcance de la integración sujeto a S-02 / R-01

  Scenario: Cambio manual con validación por OTP
    Given estoy viendo las opciones de actualización de contraseña
    When elijo "Crear una contraseña nueva acá"
    Then el sistema envía un código OTP a mi correo registrado
    And veo el mensaje MSG-08
    When ingreso el código correcto
    Then accedo al formulario de nueva contraseña
    When ingreso una contraseña que cumple la política RN-02 y su confirmación
    And confirmo el cambio
    Then el sistema actualiza mi contraseña
    And veo la confirmación del cambio
    And puedo ingresar al portal con la nueva contraseña

  Scenario: Cuenta bloqueada — el cambio de contraseña la desbloquea
    Given mi usuario está bloqueado por 3 intentos fallidos
    When completo el cambio de contraseña con validación de OTP
    Then el bloqueo de mi cuenta se libera
    And el contador de intentos fallidos se reinicia
    And puedo ingresar con la nueva contraseña

  Scenario Outline: Errores en la validación del código OTP
    Given solicité el cambio manual de contraseña
    When ingreso un código "<condición>"
    Then veo el mensaje "<mensaje>"
    And no accedo al formulario de nueva contraseña

    Examples:
      | condición  | mensaje |
      | incorrecto | MSG-06  |
      | vencido    | MSG-07  |

  Scenario: La contraseña nueva no cumple la política
    Given estoy en el formulario de nueva contraseña
    When ingreso una contraseña que no cumple la política RN-02
    Then veo el mensaje MSG-04 con el checklist de requisitos no cumplidos
    And el botón de confirmación permanece deshabilitado

  Scenario: La contraseña nueva coincide con una contraseña anterior
    Given estoy en el formulario de nueva contraseña
    When ingreso una contraseña igual a una de las últimas 3 utilizadas
    And confirmo el cambio
    Then el sistema rechaza el cambio
    And veo el mensaje MSG-04 indicando que no puede reutilizar contraseñas anteriores

  Scenario: Usuario sin correo registrado
    Given mi usuario no tiene correo registrado
    When solicito el cambio manual de contraseña
    Then el sistema no puede enviar el código
    And veo un mensaje indicando que debo contactar a la Mesa de Ayuda

  Scenario: Error del servicio al actualizar la contraseña
    Given completé el formulario de nueva contraseña
    When confirmo el cambio y el servicio responde con error
    Then veo el mensaje MSG-14
    And mi contraseña anterior sigue vigente
    And puedo reintentar el cambio
```

---

### 6.10 LO-32 — Cambio / Desbloqueo de contraseña · EGP / PROVEEDOR con contraseña manual

| Campo | Valor |
|-------|-------|
| **Key** | LO-32 |
| **Tipo** | HU-FE |
| **Dominios** | PROVEEDOR NO CLIENTE (y EGP/Proveedor cliente que eligió contraseña manual) |
| **Depende de** | LO-33 (§7.9), LO-24 (§7.4) |
| **Pantalla POC** | `olvide-password` → `2fa-otp` → `nueva-password` |

**Historia**

> **COMO** usuario que intenta loguearse en la plataforma y olvidó o expiró su contraseña
> **QUIERO** cambiar la contraseña de mi cuenta
> **PARA** poder loguearme en la plataforma

**Escenarios (fuente Excel)**

```text
1-El sistema muestra el flujo de cambio de contraseña
```

**Criterios de aceptación**

```gherkin
Feature: Recupero de contraseña con gestión manual en el portal
  Como usuario sin Home Banking quiero recuperar mi acceso definiendo una nueva
  contraseña en el portal, validando mi identidad con un código enviado por mail.

  Background:
    Given estoy en la pantalla de login del Portal de Confirming
    And mi usuario no tiene habilitado el canal "HOMEBANKING"

  Scenario: Flujo completo de cambio de contraseña
    When elijo "¿Olvidaste tu contraseña?"
    And ingreso mi usuario
    Then el sistema no me ofrece la opción de Home Banking
    And el sistema envía un código OTP a mi correo registrado
    And veo el mensaje MSG-08
    When ingreso el código correcto
    Then accedo al formulario de nueva contraseña
    When ingreso una contraseña que cumple la política RN-02
    And repito la misma contraseña en la confirmación
    And confirmo el cambio
    Then el sistema actualiza mi contraseña
    And veo la confirmación del cambio con acceso directo al login
    And se registra el cambio en auditoría

  Scenario: Reenvío del código durante el recupero
    Given solicité el cambio de contraseña y recibí el código
    When solicito reenviar el código
    Then se aplican las reglas de cooldown y máximo de reenvíos de RN-03

  Scenario Outline: Validaciones del formulario de nueva contraseña
    Given accedí al formulario de nueva contraseña
    When ingreso "<password>" y confirmo "<confirmacion>"
    Then veo el mensaje "<mensaje>"
    And el cambio no se realiza

    Examples:
      | password      | confirmacion  | mensaje |
      | corta1!       | corta1!       | MSG-04  |
      | Valida123!    | Valida124!    | MSG-05  |
      |               |               | MSG-04  |

  Scenario: Cuenta bloqueada — el cambio de contraseña la desbloquea
    Given mi usuario está bloqueado por 3 intentos fallidos
    When completo el flujo de cambio de contraseña
    Then el bloqueo de mi cuenta se libera
    And puedo ingresar con la nueva contraseña

  Scenario: Contraseña expirada por política
    Given mi contraseña superó la vigencia definida por política
    When intento ingresar con mis credenciales correctas
    Then el sistema me lleva al flujo de cambio de contraseña
    And al completarlo accedo a la plataforma sin volver a autenticarme

  Scenario: Solicitud de recupero para un usuario inexistente
    When solicito el recupero con un usuario que no existe
    Then veo el mismo mensaje que para un usuario válido
    And el sistema no envía ningún código
    # Regla RN-07

  Scenario: Enlace o código utilizado dos veces
    Given ya utilicé el código para cambiar mi contraseña
    When intento reutilizar el mismo código
    Then veo el mensaje MSG-07
    And debo iniciar el flujo de recupero nuevamente
```

---

### 6.11 LO-34 — Bloqueo de contraseña por n intentos (FE)

| Campo | Valor |
|-------|-------|
| **Key** | LO-34 |
| **Tipo** | HU-FE |
| **Dominios** | Todos |
| **Depende de** | LO-35 (§7.10) |
| **Pantalla POC** | `login` con contador de intentos → `usuario-bloqueado` |

**Historia** *(reconstruida a partir del detalle técnico del Excel)*

> **COMO** usuario que intenta ingresar a la plataforma
> **QUIERO** ser informado con claridad cuando mis credenciales son incorrectas y cuando mi acceso queda bloqueado
> **PARA** entender qué ocurrió y cómo recuperar el acceso

**Detalle (fuente Excel)**

```text
En N intentos (3 intentos) se bloquea a nivel BFF en keycloak
-POST Login al BFF falla
-se actualiza el flag actualizado de pass bloqueada al BFF
-FE muestra msj de error
```

**Criterios de aceptación**

```gherkin
Feature: Bloqueo de la credencial por intentos fallidos
  Como usuario quiero recibir información clara sobre mis intentos fallidos y el
  bloqueo de mi acceso para poder recuperarlo sin ayuda innecesaria.

  Background:
    Given estoy en la pantalla de login del Portal de Confirming
    And la política de bloqueo es de 3 intentos fallidos consecutivos

  Scenario Outline: Aviso de intentos restantes
    Given llevo <fallidos> intentos fallidos consecutivos
    When ingreso mi usuario con una contraseña incorrecta
    Then veo el mensaje MSG-01 indicando que me quedan <restantes> intentos
    And permanezco en la pantalla de login

    Examples:
      | fallidos | restantes |
      | 0        | 2         |
      | 1        | 1         |

  Scenario: Bloqueo al tercer intento fallido
    Given llevo 2 intentos fallidos consecutivos
    When ingreso mi usuario con una contraseña incorrecta por tercera vez
    Then Keycloak bloquea mi credencial
    And el servicio devuelve el estado de contraseña bloqueada
    And veo el mensaje MSG-02
    And el formulario de login queda deshabilitado para nuevos intentos con ese usuario
    And veo el acceso directo a "¿Olvidaste tu contraseña?"

  Scenario: Intento de ingreso con la contraseña correcta estando bloqueado
    Given mi credencial está bloqueada
    When ingreso mi usuario y mi contraseña correcta
    Then no accedo a la plataforma
    And veo el mensaje MSG-02

  Scenario: El contador se reinicia luego de un ingreso exitoso
    Given llevo 2 intentos fallidos consecutivos
    When ingreso mis credenciales correctas
    Then accedo a la plataforma
    And el contador de intentos fallidos vuelve a cero

  Scenario: Desbloqueo por cambio de contraseña
    Given mi credencial está bloqueada
    When completo el flujo de cambio de contraseña de LO-31 o LO-32
    Then mi credencial queda desbloqueada
    And puedo ingresar con la nueva contraseña

  Scenario: Usuario BANCO bloqueado
    Given mi usuario pertenece al dominio "BANCO"
    And mi credencial quedó bloqueada por intentos fallidos
    Then el mensaje me indica que el desbloqueo se gestiona en el directorio corporativo o con la Mesa de Ayuda
    # Coherente con LO-30

  Scenario: El mensaje no revela si el usuario existe
    Given ingreso un usuario inexistente con cualquier contraseña
    When confirmo el ingreso
    Then veo el mensaje MSG-01
    And el sistema no informa que el usuario no existe
    # Regla RN-07

  Scenario: Registro de auditoría de los intentos
    Given realizo intentos fallidos de ingreso
    Then cada intento queda registrado en auditoría con usuario, fecha/hora, IP y resultado
    And el bloqueo queda registrado como evento de seguridad
    # Regla RN-08
```

---

## 7. Historias técnicas — Endpoints BFF / BE

> Los contratos se toman de las hojas *API REST — BFF (orientada a UI)* y *API REST — Backend dominio (Identity)* del Excel. Todas comparten el patrón de error handling de `assets/funcional_v1.0.0.md` §8.8.

### 7.1 LO-06 — `POST` BE · Envío de mail (servicio existente de Notificaciones)

| Campo | Valor |
|-------|-------|
| **Referencia Excel** | MAGIA-62 / MAGIA-133 · *"Se va a utilizar el servicio ya existente Notificaciones / Mail"* |
| **Endpoints** | BFF `POST /v1/auth/welcome-mail/trigger` → BE `POST /internal/v1/notifications/welcome` |
| **Habilita** | LO-05 |

**Detalle (fuente Excel)**

```text
Se va a utilizar el servicio ya existente Notificaciones / Mail
-Envio desde el BFF
-Reintentos
-Historico de notificaciones
Guarda histórico de notificaciones en Atlas Trade
-BFF llama al servicio de notificación (se va a utilizar el servicio ya existente)
```

```gherkin
Feature: Envío de mail desde el BFF con el servicio de notificaciones existente

  Scenario: Envío exitoso
    Given el BFF recibe la solicitud de envío del mail de bienvenida con el ID Template
    When invoca el servicio existente de Notificaciones de Atlas Core
    Then el servicio responde 202 aceptando el envío
    And el BFF registra la notificación en el histórico de Atlas Trade con estado "ENVIADO"
    And responde 202 al consumidor

  Scenario: Reintentos ante error transitorio
    Given el servicio de Notificaciones responde con error 5xx
    When el BFF procesa la respuesta
    Then registra la notificación con estado "PENDIENTE_REINTENTO"
    And reintenta el envío hasta 3 veces con backoff exponencial
    And si agota los reintentos deja la notificación en estado "ERROR" con el detalle del fallo

  Scenario: Error de datos en la solicitud
    Given la solicitud no incluye destinatario o ID Template
    When el BFF valida la solicitud
    Then responde 400 con el detalle del campo faltante
    And no invoca al servicio de Notificaciones

  Scenario: Consulta del histórico de notificaciones
    Given existen notificaciones registradas para un usuario
    When se consulta el histórico
    Then se obtiene fecha/hora, template, destinatario, estado y cantidad de reintentos
```

---

### 7.2 LO-11 — `GET/POST` BFF/BE · Validar mail + contraseña temporal contra Keycloak (flag de contraseña temporal)

| Campo | Valor |
|-------|-------|
| **Endpoints** | BFF `POST /v1/auth/first-login` → BE `POST /internal/v1/auth/first-login` |
| **Habilita** | LO-10 |
| **Contrato (Excel)** | Body `{ username, password, domain: BANCO\|EGP\|PROVEEDOR, passwordChannel: AD\|HOMEBANKING\|MANUAL\|OTP }` · Response 200 `{ nextStep: CONFIGURAR_2FA\|COMPLETAR_OTP, sessionToken }` · Errores 400, 401, 403, 422 |

```gherkin
Feature: Validación de credencial temporal con flag de contraseña temporal

  Scenario: Credencial temporal válida
    Given un usuario con contraseña temporal vigente
    When el FE invoca POST /v1/auth/first-login con usuario y contraseña temporal
    Then el BFF valida la credencial contra Keycloak
    And responde 200 con "passwordTemporal = true" y el nextStep del wizard
    And devuelve los canales de actualización habilitados para el usuario

  Scenario: Credencial temporal inválida
    When se invoca el endpoint con una contraseña incorrecta
    Then responde 401
    And el cuerpo incluye la cantidad de intentos restantes

  Scenario: Credencial temporal vencida
    When se invoca el endpoint con una contraseña temporal vencida
    Then responde 422 con el código de error "TEMP_PASSWORD_EXPIRED"

  Scenario: Usuario sin rol habilitado
    When se invoca el endpoint con un usuario sin rol en el portal
    Then responde 403 con el código de error "USER_WITHOUT_ROLE"

  Scenario: Usuario bloqueado
    When se invoca el endpoint con un usuario bloqueado
    Then responde 423 con el código de error "USER_LOCKED"

  Scenario: Datos incompletos
    When se invoca el endpoint sin usuario o sin contraseña
    Then responde 400 y no consulta a Keycloak

  Scenario: Keycloak no disponible
    Given Keycloak no responde
    When se invoca el endpoint
    Then responde 503
    And el BFF no expone detalles internos del error
```

---

### 7.3 LO-13 — `POST` BFF/BE · Actualizar la contraseña ingresada por el usuario

| Campo | Valor |
|-------|-------|
| **Endpoints** | BFF `PATCH /v1/auth/password` → BE `PATCH /internal/v1/auth/password` |
| **Habilita** | LO-10 |
| **Contrato (Excel)** | Body `{ currentPassword, newPassword, otp }` · Response 200 `{ updated: true }` |

```gherkin
Feature: Actualización de la contraseña definida por el usuario

  Scenario: Actualización exitosa
    Given el usuario validó su contraseña temporal
    When invoca el endpoint con la contraseña actual y una nueva contraseña válida
    Then el BFF actualiza la credencial en Keycloak
    And el flag de contraseña temporal queda en false
    And responde 200 con { "updated": true }

  Scenario: Nueva contraseña que no cumple la política
    When se envía una contraseña que no cumple la política de Keycloak
    Then responde 422 con la lista de requisitos no cumplidos

  Scenario: Reutilización de contraseña
    When se envía una contraseña igual a una de las últimas 3 utilizadas
    Then responde 422 con el código "PASSWORD_REUSE"

  Scenario: Contraseña actual incorrecta
    When se envía una contraseña actual incorrecta
    Then responde 401
    And no se modifica la credencial

  Scenario: Sesión de primer login inválida
    Given el sessionToken del wizard está vencido
    When se invoca el endpoint
    Then responde 401 con el código "FIRST_LOGIN_SESSION_EXPIRED"
    And el usuario debe reiniciar el primer login
```

---

### 7.4 LO-24 — `POST` BE · Envío de mail con template de OTP + validación del código

| Campo | Valor |
|-------|-------|
| **Referencia Excel** | MAGIA-62 / MAGIA-133 · *"con diferente template flag = validación OTP / notificación primer mail"* + *"validación de código OTP desde response"* |
| **Endpoints** | BFF `POST /v1/auth/mfa/setup` y `POST /v1/auth/mfa/verify` → BE `POST /internal/v1/auth/mfa/enroll` y `POST /internal/v1/auth/mfa/verify` |
| **Habilita** | LO-22, LO-27, LO-31, LO-32 |

```gherkin
Feature: Envío y validación del código OTP por mail

  Scenario: Envío con el template de OTP
    Given se solicita el envío de un código OTP para un usuario
    When el BFF invoca el servicio de Notificaciones con el flag de template "VALIDACION_OTP"
    Then el mail se envía con el template de OTP y no con el de bienvenida
    And el código se genera con 6 dígitos y vigencia de 5 minutos
    And el código se almacena cifrado o hasheado, nunca en texto plano

  Scenario: Validación exitosa del código
    When el FE invoca la validación con el código correcto dentro de la vigencia
    Then el servicio responde 200 con { "verified": true }
    And el código queda invalidado para nuevos usos

  Scenario Outline: Validación fallida
    When el FE invoca la validación con un código <condicion>
    Then el servicio responde <status> con el código de error "<error>"

    Examples:
      | condicion              | status | error         |
      | incorrecto             | 401    | OTP_INVALID   |
      | vencido                | 401    | OTP_EXPIRED   |
      | ya utilizado           | 401    | OTP_USED      |
      | con 3 fallos previos   | 429    | OTP_ATTEMPTS  |

  Scenario: Cooldown de reenvío
    When se solicita un reenvío antes de 60 segundos del último envío
    Then el servicio responde 429 con el tiempo restante
```

---

### 7.5 LO-24-a *(propuesto)* — `GET` BFF/BE · Mail del usuario

| Campo | Valor |
|-------|-------|
| **Origen** | Fila 30 del Excel, sin Issue Key |
| **Habilita** | LO-22 (pantalla "te enviamos un correo a xxx@aaa") |

```gherkin
Feature: Consulta del correo registrado del usuario

  Scenario: Obtención del correo para el flujo de 2FA
    Given un usuario en flujo de primer login
    When el FE consulta el correo registrado del usuario
    Then el servicio responde 200 con el correo enmascarado y un identificador de contacto
    And no expone el correo completo en logs

  Scenario: Usuario sin correo registrado
    When el FE consulta el correo de un usuario sin correo
    Then el servicio responde 200 con contacto vacío
    And el FE ofrece registrar o corregir el correo antes de enviar el OTP

  Scenario: Actualización del correo de recepción del OTP
    When el usuario informa un correo nuevo con formato válido
    Then el servicio actualiza el dato de contacto
    And el OTP se envía al correo nuevo
```

---

### 7.6 LO-26 — `GET` BFF · Validación de credenciales AD / Home Banking / manual

| Campo | Valor |
|-------|-------|
| **Endpoints** | BFF `POST /v1/auth/login` + `POST /v1/auth/token-exchange` → BE `GET /internal/v1/users/{id}/login-policy` |
| **Nota del Excel** | *"Keycloak se encarga de diferenciar dónde buscar la pass"* |
| **Habilita** | LO-07, LO-25, LO-30, LO-31, LO-32 |

```gherkin
Feature: Autenticación única con resolución del origen de la credencial en Keycloak

  Scenario: Inicio del flujo OAuth
    When el FE invoca POST /v1/auth/login
    Then el BFF responde 200 con authorizationUrl, state y codeVerifier

  Scenario: Intercambio de código por token
    Given el FE recibió el código de autorización
    When invoca POST /v1/auth/token-exchange
    Then el BFF responde 200 con accessToken, refreshToken y el flag mfaRequired

  Scenario Outline: El origen de la credencial es transparente para el FE
    Given un usuario cuya contraseña se administra en "<origen>"
    When se autentica con usuario y contraseña
    Then Keycloak resuelve el federated provider correspondiente
    And el FE no envía ningún parámetro que indique el origen

    Examples:
      | origen        |
      | AD            |
      | HOMEBANKING   |
      | MANUAL        |

  Scenario: Consulta de la política de login del usuario
    When el BE recibe GET /internal/v1/users/{id}/login-policy
    Then responde con los canales permitidos (AD, HB, manual) del usuario
    And el FE usa esa respuesta para mostrar u ocultar la opción de Home Banking

  Scenario: Credenciales inválidas
    When la autenticación falla
    Then el BFF responde 401 con el contador de intentos restantes
    And el mensaje no distingue entre usuario inexistente y contraseña incorrecta
```

---

### 7.7 LO-28 — `GET/POST` BFF · Validación de 2FA

| Campo | Valor |
|-------|-------|
| **Endpoints** | BFF `POST /v1/auth/mfa/verify` → BE `POST /internal/v1/auth/mfa/verify` |
| **Contrato (Excel)** | Body `{ otp, trustDevice }` · Response 200 `{ verified: true, deviceId }` |
| **Habilita** | LO-27 |

```gherkin
Feature: Validación del segundo factor en el acceso

  Scenario: Validación exitosa con registro de dispositivo confiable
    When el FE invoca la validación con el código correcto y trustDevice = true
    Then el servicio responde 200 con verified = true y el deviceId generado
    And registra el dispositivo en DISPOSITIVO_CONFIABLE asociado al usuario

  Scenario: Validación exitosa sin registrar el dispositivo
    When el FE invoca la validación con trustDevice = false
    Then el servicio responde 200 con verified = true
    And no registra ningún dispositivo confiable

  Scenario: Dispositivo confiable vigente
    Given el usuario tiene un dispositivo confiable vigente
    And no cerró sesión explícitamente
    When se autentica con usuario y contraseña
    Then el flag mfaRequired se devuelve en false

  Scenario: Doble factor exigido luego de cerrar sesión
    Given el usuario cerró sesión explícitamente
    When se autentica nuevamente desde un dispositivo confiable
    Then el flag mfaRequired se devuelve en true
    # Regla RN-06

  Scenario: Código inválido
    When el FE invoca la validación con un código incorrecto
    Then responde 401 con el código de error "OTP_INVALID" y los intentos restantes
```

---

### 7.8 LO-29-a *(propuesto)* — El validador de inicio de sesión devuelve también la cookie

| Campo | Valor |
|-------|-------|
| **Origen** | Fila 36 del Excel, sin Issue Key |
| **Habilita** | LO-29 |

```gherkin
Feature: Emisión de la cookie de sesión en el inicio de sesión

  Scenario: Emisión de la cookie al autenticar
    When el usuario completa la autenticación y el doble factor
    Then el BFF emite la cookie de sesión con los atributos HttpOnly, Secure y SameSite
    And la cookie tiene una vigencia de 5 minutos de inactividad

  Scenario: Renovación de la cookie por actividad
    Given el usuario tiene una sesión activa
    When realiza una llamada al BFF antes de que expire la cookie
    Then la vigencia de la cookie se renueva

  Scenario: Cookie inválida o vencida
    Given la cookie de sesión está vencida o fue invalidada
    When el FE invoca cualquier endpoint protegido
    Then el BFF responde 401
    And el FE redirige a la pantalla de login
    # Nota del Excel: "cuando tenga cookie inválido devuelve al login"

  Scenario: Cierre de sesión
    When el usuario cierra sesión
    Then el BFF invalida la cookie y la sesión en Keycloak
```

---

### 7.9 LO-33 — `PATCH` BFF · Cambio de contraseña

| Campo | Valor |
|-------|-------|
| **Endpoints** | BFF `PATCH /v1/auth/password` y `POST /v1/auth/password/forgot` → BE `PATCH /internal/v1/auth/password` |
| **Contrato (Excel)** | `POST /v1/auth/password/forgot` Body `{ username, domain }` · Response 200 `{ action: REDIRECT_AD\|CHOOSE_CHANNEL\|OTP_SENT, message }` |
| **Habilita** | LO-30, LO-31, LO-32 |

```gherkin
Feature: Cambio de contraseña iniciado por el usuario

  Scenario Outline: Resolución de la acción según el dominio del usuario
    When el FE invoca POST /v1/auth/password/forgot para un usuario de dominio "<dominio>"
    Then el BFF responde 200 con action = "<action>"

    Examples:
      | dominio              | action         |
      | BANCO                | REDIRECT_AD    |
      | EGP                  | CHOOSE_CHANNEL |
      | PROVEEDOR CLIENTE    | CHOOSE_CHANNEL |
      | PROVEEDOR NO CLIENTE | OTP_SENT       |

  Scenario: Respuesta uniforme para usuarios inexistentes
    When el FE invoca el endpoint con un usuario inexistente
    Then el BFF responde 200 con un mensaje genérico
    And no envía ningún código
    # Regla RN-07

  Scenario: Cambio de contraseña con OTP válido
    When el FE invoca PATCH /v1/auth/password con newPassword y otp válidos
    Then el BFF actualiza la credencial y responde 200 con { "updated": true }
    And libera el bloqueo de la cuenta si estaba bloqueada
    And reinicia el contador de intentos fallidos

  Scenario: OTP inválido en el cambio de contraseña
    When el FE invoca el endpoint con un otp inválido
    Then responde 401 y no modifica la credencial

  Scenario: Límite de solicitudes de recupero
    When un mismo usuario solicita el recupero más de 5 veces en una hora
    Then el BFF responde 429
```

---

### 7.10 LO-35 — `POST` · Validación de contraseña (responde al FE y actualiza el flag de estado)

| Campo | Valor |
|-------|-------|
| **Habilita** | LO-34 |

```gherkin
Feature: Validación de contraseña con actualización del estado de la credencial

  Scenario: Intento fallido con intentos disponibles
    When el FE invoca la validación de contraseña con credenciales incorrectas
    Then el servicio responde 401
    And el cuerpo incluye "remainingAttempts" con los intentos restantes
    And el contador de intentos fallidos se incrementa en Keycloak

  Scenario: Bloqueo al alcanzar el máximo de intentos
    Given el usuario acumula 2 intentos fallidos
    When falla el tercer intento
    Then Keycloak bloquea la credencial
    And el servicio actualiza el flag de estado de contraseña a "BLOQUEADA"
    And responde 423 con el código de error "USER_LOCKED"

  Scenario: Consulta del estado de la credencial
    When el FE consulta el estado de la credencial de un usuario autenticado
    Then obtiene el estado (ACTIVA, TEMPORAL, EXPIRADA, BLOQUEADA) y la fecha del último cambio

  Scenario: Reinicio del contador ante login exitoso
    Given el usuario tenía intentos fallidos acumulados
    When se autentica correctamente
    Then el contador de intentos fallidos se reinicia en cero

  Scenario: No exposición de información sensible
    Then las respuestas de error no informan si el usuario existe
    And no incluyen el hash ni fragmentos de la contraseña
```

---

## 8. Tareas técnicas / habilitadores

| ID | Key Excel | Tarea | Objetivo (Excel) | Definition of Done |
|----|-----------|-------|------------------|--------------------|
| **T-01** | LO-01 | Implementar servicio OAuth | Implementación OAuth para login | Keycloak configurado con el realm del portal, clients de FE y BFF, flujo Authorization Code + PKCE operativo en el ambiente de desarrollo, federación con AD habilitada |
| **T-02** | XX | Configuración de ente Open-API Atlas | Configuración inicial OPEN API ATLAS: generar Json Web Token; conexión a BFF OAuth | JWT generado y validado; conectividad BFF ↔ Open API Atlas probada en desarrollo |
| **T-03** | — | Atlas Core / Atlas Trade — configuración de servicios de mail | Implementación del servicio de mail | Templates de bienvenida y de OTP creados en Atlas Core; `ID Template` registrado en Atlas Trade; envío de prueba exitoso a un buzón real |
| **T-04** | — | SPEC CORE | Michi Fenix / Ignis Open API alta-baja: crear el ente para Trade para que se conecte como cliente Atlas; permisos del ente de notificaciones para el ente Trade | Ente Trade creado y habilitado como cliente Atlas; permisos de notificaciones otorgados y verificados con una llamada real |

---

## 9. Spikes y decisiones pendientes (columna DUDAS)

| ID | Origen | Pregunta abierta | Impacto si no se resuelve | Propuesta del PO |
|----|--------|------------------|---------------------------|------------------|
| **S-01** | LO-07, LO-27 | *"Spike de investigación de 2FA del AD"*: ¿el AD provee el segundo factor y con qué experiencia (redirección al IdP o paso embebido)? | Bloquea el diseño de la pantalla de primer login y del login recurrente de BANCO | Timeboxear el spike antes de estimar LO-07; asumir redirección al IdP corporativo como escenario base |
| **S-02** | LO-10, LO-15 (Excel) | ¿En qué momento se ofrece la integración con Home Banking? (1) primer login / cambio de contraseña temporal — más complejo; (2) dentro de la plataforma en *Mi Perfil → Integrar Home Banking* — menos complejo; (3) en el segundo login mediante la opción de cambio de contraseña | Bloquea el alcance de LO-10 y LO-31; el endpoint del canal Home Banking (LO-12) está desestimado | Recomendación: **opción 2** para la primera entrega (menor complejidad, no bloquea el primer login) y dejar la opción 1 para una iteración posterior |
| **S-03** | LO-27 | ¿Cada cuánto se solicita el 2FA a usuarios EGP/Proveedor? | Afecta la experiencia y la seguridad | Decisión ya registrada en el Excel: **siempre al iniciar sesión luego de un cierre de sesión** (RN-06). Confirmar la vigencia del dispositivo confiable (sugerido: 30 días) |
| **S-04** | Transversal | Política formal de contraseñas y de expiración | Bloquea LO-10, LO-31, LO-32 y las validaciones de UI | Validar RN-02 con el área de Seguridad de la Información antes de desarrollar |
| **S-05** | LO-05 | Vigencia de la contraseña temporal y comportamiento al vencer | Afecta MSG-03 y el reenvío del mail | Sugerido: 72 horas con reenvío automático desde la pantalla de login |
| **S-06** | LO-29 | ¿El tiempo de inactividad es igual para todos los dominios? | Afecta la configuración de la cookie | Sugerido: 5 minutos para todos, parametrizable por ambiente |

---

## 10. Recomendaciones del PO — historias faltantes (no están en el Excel)

> Estas historias **no** figuran en el Excel y **no** fueron elaboradas como historias formales. Se listan como recomendación, con justificación y prioridad sugerida, para que el equipo decida su incorporación al backlog.

### 10.1 Imprescindibles antes de salir a producción

| ID | Historia propuesta | Por qué falta / riesgo | Prioridad |
|----|--------------------|------------------------|-----------|
| **R-01** | **Actualización de contraseña integrada a Home Banking** — definir el flujo real (redirección, deep link o API) y su endpoint | LO-10, LO-31 y el objetivo del Excel mencionan el canal Home Banking, pero los endpoints que lo soportaban (LO-12 / LO-16) están tachados. Hoy el canal queda como promesa sin implementación | 🔴 Alta |
| **R-02** | **Segundo factor con app autenticadora (TOTP)** | La hoja de API define `POST /v1/auth/mfa/setup` con `qrUri` y `secret`, propios de TOTP, pero los escenarios del Excel solo describen OTP por mail. Hay una inconsistencia de alcance a cerrar | 🔴 Alta |
| **R-03** | **Cierre de sesión manual (logout)** | El Excel no tiene historia de logout, aunque RN-06 depende de él ("siempre pedir 2FA al cerrar sesión") y el portal ya expone el botón. Requiere invalidación de cookie, de token en Keycloak y de la sesión en el navegador | 🔴 Alta |
| **R-04** | **Auditoría de accesos y eventos de seguridad** | La matriz de trazabilidad menciona `INTENTO_LOGIN` y `SESION_AUDIT`, pero ninguna historia describe qué se registra, con qué retención ni quién lo consulta. Es requisito habitual de una entidad financiera | 🔴 Alta |
| **R-05** | **Desbloqueo de usuario desde el ABM (Mesa de Ayuda / Admin Banco)** | Todos los mensajes de bloqueo derivan a la Mesa de Ayuda, pero no existe la historia que le da la herramienta para desbloquear ni reenviar credenciales | 🔴 Alta |
| **R-06** | **Expiración periódica de la contraseña y aviso previo** | LO-30/31/32 mencionan contraseñas expiradas, pero ninguna historia define la vigencia, el aviso anticipado ni el flujo de cambio proactivo | 🟠 Media-alta |

### 10.2 Recomendadas para completar la experiencia

| ID | Historia propuesta | Por qué falta / riesgo | Prioridad |
|----|--------------------|------------------------|-----------|
| **R-07** | **Gestión de dispositivos confiables desde *Mi Perfil*** (ver y revocar) | LO-27 crea `DISPOSITIVO_CONFIABLE` pero el usuario no tiene forma de revocarlo si pierde el equipo | 🟠 Media |
| **R-08** | **Cambio de contraseña desde dentro de la plataforma (*Mi Perfil*)** | Todas las historias cubren el cambio desde el login. Un usuario logueado que quiere rotar su contraseña no tiene camino | 🟠 Media |
| **R-09** | **Actualización del correo de contacto con doble validación** | LO-22 permite cambiar el mail de recepción del OTP; sin validación del correo anterior es un vector de toma de cuenta | 🟠 Media |
| **R-10** | **Protección contra ataques automatizados (rate limiting / captcha)** | RN-04 protege la credencial pero no el endpoint: sin límite por IP el login queda expuesto a fuerza bruta distribuida | 🟠 Media |
| **R-11** | **Sesiones concurrentes y sesión única** | No está definido qué ocurre si el mismo usuario inicia sesión en dos navegadores | 🟡 Media-baja |
| **R-12** | **Accesibilidad y responsive de las pantallas de acceso** | Ninguna historia define criterios de accesibilidad (navegación por teclado, contraste, lectores de pantalla) ni comportamiento en mobile para el login | 🟡 Media-baja |
| **R-13** | **Textos, idioma y tono de los mensajes de error** | El Excel no define los textos; en §5 se propone un catálogo que debería validarse con Comunicación / UX Writing | 🟡 Media-baja |
| **R-14** | **Observabilidad del flujo de login (métricas y alertas)** | Sin tasa de login exitoso, de bloqueos y de OTP no entregados, no hay forma de detectar una degradación del acceso | 🟡 Media-baja |
| **R-15** | **Onboarding del primer login: aviso de bienvenida en la plataforma** | Al completar el primer login el usuario entra sin ninguna guía sobre qué puede hacer según su rol | 🟢 Baja |

---

## 11. Observaciones sobre la consistencia del Excel

Hallazgos que conviene resolver en el archivo fuente para evitar errores de trazabilidad:

1. **Doble numeración de historias.** La hoja `LOGIN` usa `LO-01 … LO-35` y la hoja `Matriz de trazabilidad` usa `LO-01 … LO-16` con un significado distinto (por ejemplo, `LO-02` es *"Estructura DER LOGIN"* en la hoja LOGIN y *"Mail bienvenida BANCO"* en la matriz). **Se tomó la hoja `LOGIN` como fuente de verdad.** Recomendación: unificar los identificadores antes de cargar a Jira.
2. **La matriz de trazabilidad incluye capacidades desestimadas**: mantiene *Mail bienvenida BANCO*, *Primer login BANCO*, *2FA primer login BANCO* y las variantes separadas de Proveedor cliente / no cliente, todas tachadas en la hoja LOGIN.
3. **Contradicción de alcance en el 2FA**: los escenarios describen OTP por mail y la hoja de API describe TOTP (`qrUri`, `secret`). Ver R-02.
4. **Canal Home Banking sin endpoint**: LO-10 y LO-31 lo requieren; LO-12 y LO-16 están tachadas. Ver R-01 y S-02.
5. **Filas sin `Issue Key`** (filas 6, 7, 30, 36): se les asignó un key propuesto en este documento; conviene formalizarlo.
6. **Método HTTP inconsistente** en LO-11 y LO-26: el Excel los enuncia como `GET` pero se trata de operaciones de autenticación con cuerpo, que en la hoja de API figuran correctamente como `POST`. Se documentaron como `POST`.

---

## 12. Matriz de trazabilidad HU ↔ endpoint ↔ pantalla de la POC

| HU | Historias técnicas | Endpoints BFF | Pantalla / paso en la POC |
|----|--------------------|---------------|---------------------------|
| LO-05 | LO-06 | `POST /v1/auth/welcome-mail/trigger` | — (mail; se documenta como notificación) |
| LO-07 | LO-26 | `POST /v1/auth/login`, `POST /v1/auth/token-exchange` | `login` → `2fa-ad` |
| LO-10 | LO-11, LO-13 | `POST /v1/auth/first-login`, `PATCH /v1/auth/password` | `login` → `primer-login-temporal` → `canal-password` → `nueva-password` |
| LO-22 | LO-24, LO-24-a | `POST /v1/auth/mfa/setup`, `POST /v1/auth/mfa/verify` | `2fa-mail` → `2fa-otp` → `2fa-listo` |
| LO-25 | LO-26, LO-29-a | `POST /v1/auth/login`, `POST /v1/auth/token-exchange` | `login` |
| LO-27 | LO-28, LO-24 | `POST /v1/auth/mfa/verify` | `2fa-otp` (con "recordar este dispositivo") |
| LO-29 | LO-29-a | cookie de sesión del BFF | modal `sesión por expirar` → `login` con MSG-11 |
| LO-30 | LO-33 | `POST /v1/auth/password/forgot` | `olvide-password` → `aviso-ad` |
| LO-31 | LO-33, LO-24 | `POST /v1/auth/password/forgot`, `PATCH /v1/auth/password` | `olvide-password` → `canal-password` → `nueva-password` |
| LO-32 | LO-33, LO-24 | `POST /v1/auth/password/forgot`, `PATCH /v1/auth/password` | `olvide-password` → `2fa-otp` → `nueva-password` |
| LO-34 | LO-35 | `POST /v1/auth/login` | `login` con contador de intentos → `usuario-bloqueado` |

> Las pantallas están implementadas en la POC (`auth.js`) y son accesibles desde el panel **"Escenarios de login (demo)"** de la pantalla de login o por URL directa: `?paso=<pantalla>`. Ver `assets/poc-pantallas-login.md`.

---

## 13. Definition of Ready / Definition of Done

**Definition of Ready (por historia)**

- [ ] Objetivo y valor expresados en formato COMO / QUIERO / PARA.
- [ ] Criterios de aceptación en Gherkin, con caminos alternativos y de error.
- [ ] Mensajes de UI identificados (§5) y validados con UX.
- [ ] Contrato de endpoints identificado (§7) y acordado con el equipo técnico.
- [ ] Dependencias y spikes bloqueantes resueltos o acotados.
- [ ] Diseño o pantalla de referencia disponible (POC).
- [ ] Historia estimada por el equipo.

**Definition of Done (por historia)**

- [ ] Todos los escenarios Gherkin verificados (manual o automatizado).
- [ ] Validaciones de formulario y mensajes de error implementados según §5.
- [ ] Eventos de auditoría registrados (RN-08).
- [ ] Sin datos sensibles en logs ni en respuestas de error (RN-07, RN-10).
- [ ] Probado en los dominios que aplica (BANCO / EGP / PROVEEDOR CLIENTE / PROVEEDOR NO CLIENTE).
- [ ] Accesible por teclado y con contraste suficiente en las pantallas afectadas.
- [ ] Documentación funcional y matriz de trazabilidad actualizadas.
