# Historias de Usuario — Épica LOGIN (Portal de Confirming · Banco Atlas)

> **Versión:** v2.0.0 · **Fecha:** 2026-07-29
> **Fuente única de requerimientos:** `login (2).xlsx` — hoja **LOGIN** (filas 3 a 42), complementada con las hojas *Matriz de trazabilidad*, *API REST — Backend dominio (Identity)* y *API REST — BFF (orientada a UI)*.
> **Autor:** PO (elaboración de historias) · **Producto:** Portal de Confirming (Atlas Trade)
> **POC de referencia:** https://marianaintive.github.io/atlas-confirming-poc/
> **Nota de regeneración:** Documento regenerado con la skill `po-expert-user-stories` para comparación lado a lado con `historias-usuario-login_v1.0.0.md`. **Mismo alcance y hechos** que v1.0.0; cambia únicamente la forma de escribir las historias (tarjeta de backlog, AC numerados, Gherkin en español).

---

## Tabla de contenidos

0. [Qué cambia respecto de v1.0.0](#0-qué-cambia-respecto-de-v100)
1. [Criterio de elaboración y alcance](#1-criterio-de-elaboración-y-alcance)
2. [Matriz de inclusión / desestimación (fila por fila del Excel)](#2-matriz-de-inclusión--desestimación-fila-por-fila-del-excel)
3. [Contexto de solución, actores y supuestos](#3-contexto-de-solución-actores-y-supuestos)
4. [Reglas de negocio transversales (RN)](#4-reglas-de-negocio-transversales-rn)
5. [Catálogo de mensajes de UI](#5-catálogo-de-mensajes-de-ui)
6. [Historias de usuario funcionales (tarjetas de backlog)](#6-historias-de-usuario-funcionales-tarjetas-de-backlog)
7. [Historias técnicas — Endpoints BFF / BE (enablers)](#7-historias-técnicas--endpoints-bff--be-enablers)
8. [Tareas técnicas / habilitadores](#8-tareas-técnicas--habilitadores)
9. [Spikes y decisiones pendientes (columna DUDAS)](#9-spikes-y-decisiones-pendientes-columna-dudas)
10. [Recomendaciones del PO — historias faltantes (no están en el Excel)](#10-recomendaciones-del-po--historias-faltantes-no-están-en-el-excel)
11. [Observaciones sobre la consistencia del Excel](#11-observaciones-sobre-la-consistencia-del-excel)
12. [Matriz de trazabilidad HU ↔ endpoint ↔ pantalla de la POC](#12-matriz-de-trazabilidad-hu--endpoint--pantalla-de-la-poc)
13. [Definition of Ready / Definition of Done](#13-definition-of-ready--definition-of-done)

---

## 0. Qué cambia respecto de v1.0.0

Cambios de **forma de escritura** (el alcance, filas incluidas/desestimadas, RN, MSG, spikes, R-01..R-15, endpoints y escenarios fuente del Excel son idénticos a v1.0.0):

1. Cada HU/HT se presenta como **tarjeta de backlog** con metadatos en tabla (Tipo, Épica, Actor, Dominios, Prioridad, Depende de, Habilita, Pantalla POC / Contrato).
2. La historia Connextra va en multilínea `Como / quiero / para` **sin** negritas COMO/QUIERO/PARA.
3. Se separan **Criterios de aceptación** numerados (fuente de verdad del PO, con tags `[Feliz]`, `[Alternativo]`, `[Error]`, `[Validación]`) de los **Escenarios BDD**.
4. Gherkin con **palabras clave en español**: `Característica`, `Antecedentes`, `Escenario`, `Esquema del escenario`, `Ejemplos`, `Dado`, `Cuando`, `Entonces`, `Y`.
5. Cada HU incluye **Valor de negocio**, **Fuera de alcance**, **Notas / preguntas abiertas** y **Chequeo INVEST**.
6. Cada HT incluye **Objetivo técnico**, AC numerados, BDD en español y tabla **Errores esperados**.

---

## 1. Criterio de elaboración y alcance

| Criterio | Decisión aplicada |
|----------|-------------------|
| **Filas tachadas** | **Desestimadas.** No se elaboran historias. Se registran en la matriz (§2) con el motivo, para conservar la trazabilidad de la decisión. |
| **Filas puntuadas / detalladas** | **Elaboradas.** Se escribe historia completa en formato tarjeta (metadatos + Connextra + AC numerados + BDD) solo para las filas vivas que tienen contenido punteado en las columnas `OBJETIVO` y/o `ESCENARIOS`. |
| **Escenarios del Excel** | Se transcriben literalmente en el bloque *Escenarios fuente* de cada historia y, a partir de ese título/enunciado, se construyen los AC numerados y la lógica completa en **Gherkin (español)**, agregando validaciones, errores y aclaraciones cuando el escenario lo requiere. |
| **Historias faltantes** | **No se mezclan** con las anteriores. Se listan por separado en §10 como recomendación del PO, con justificación y prioridad sugerida. |
| **Identificadores** | Se conserva el `Issue Key` del Excel (`LO-xx`) como identificador estable para no romper la trazabilidad con Jira. Las historias sin key en el Excel reciben un key propuesto (`LO-NN-a`, marcado como *propuesto*). |
| **Idioma y formato** | Español; Gherkin con palabras clave en español (`Característica` / `Antecedentes` / `Escenario` / `Dado` / `Cuando` / `Entonces` / `Y`), según skill `po-expert-user-stories`. |

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
| 10 | **LO-05** | Mail Bienvenida - Login usuarios EGP/PROVEEDOR | HU-BE | ✅ **Historia elaborada** | §6 |
| 11 | **LO-06** | EP POST BE - Envío de mail | HT | ✅ **Historia elaborada** | §7 |
| 12 | **LO-07** | PANTALLA LOGIN - Primer Login BANCO | HU-FE | ✅ **Historia elaborada** | §6 |
| 13 | ~~LO-08~~ | ~~EP GET BFF/BE - Validar mail/contraseña temporal contra Keycloak~~ | — | ❌ Desestimada | Tachada. BANCO no usa contraseña temporal (AD) |
| 14 | ~~LO-09~~ | ~~EP POST BFF/BE - Actualizar contraseña integrada al AD~~ | — | ❌ Desestimada | Tachada. El cambio de contraseña de BANCO se hace en el AD, fuera del portal |
| 15 | **LO-10** | PANTALLA LOGIN - Primer Login EGP / PROVEEDOR CLIENTE / PROVEEDOR NO CLIENTE | HU-FE | ✅ **Historia elaborada** | §6 (unifica los 3 perfiles) |
| 16 | **LO-11** | EP GET BFF/BE - Validar mail/contraseña temporal contra Keycloak (con flag de pass temporal) | HT | ✅ **Historia elaborada** | §7 |
| 17 | ~~LO-12~~ | ~~EP POST BFF/BE - Actualizar contraseña integrada al homebanking~~ | — | ❌ Desestimada | Summary tachado. **Impacta a LO-10** (ver alerta en LO-10 y recomendación R-01) |
| 18 | **LO-13** | EP POST BFF/BE - Actualizar contraseña ingresada por el usuario | HT | ✅ **Historia elaborada** | §7 |
| 19 | ~~LO-14~~ | ~~PANTALLA LOGIN - Primer Login PROVEEDOR - CLIENTE~~ | — | ❌ Desestimada | Tachada; absorbida por LO-10 |
| 20 | ~~LO-15~~ | ~~EP GET BFF/BE - Validar mail/contraseña temporal~~ | — | ❌ Desestimada | Tachada; absorbida por LO-11 |
| 21 | ~~LO-16~~ | ~~EP POST BFF/BE - Actualizar contraseña integrada al homebanking~~ | — | ❌ Desestimada | Tachada |
| 22 | ~~LO-17~~ | ~~EP POST BFF/BE - Actualizar contraseña ingresada por el usuario~~ | — | ❌ Desestimada | Tachada; absorbida por LO-13 |
| 23 | ~~LO-18~~ | ~~PANTALLA LOGIN - Primer Login PROVEEDOR - NO CLIENTE~~ | — | ❌ Desestimada | Tachada; absorbida por LO-10 |
| 24 | ~~LO-19~~ | ~~EP GET BFF/BE - Validar mail/contraseña temporal~~ | — | ❌ Desestimada | Tachada; absorbida por LO-11 |
| 25 | ~~LO-20~~ | ~~EP POST BFF/BE - Actualizar contraseña ingresada por el usuario~~ | — | ❌ Desestimada | Tachada; absorbida por LO-13 |
| 26 | ~~LO-21~~ | ~~Doble Autenticación - Configuración primer login BANCO~~ | — | ❌ Desestimada | Tachada. El 2FA de BANCO lo provee el AD (ver LO-07 y S-01) |
| 27 | **LO-22** | Doble Autenticación - Configuración primer login EGP / PROVEEDOR CLIENTE / PROVEEDOR NO CLIENTE | HU-FE | ✅ **Historia elaborada** | §6 |
| 28 | ~~LO-23~~ | ~~Doble Autenticación - Configuración primer login (PROVEEDOR NO CLIENTE)~~ | — | ❌ Desestimada | Tachada; absorbida por LO-22 |
| 29 | **LO-24** | EP POST BE - Envío de mail con template OTP + validación de código | HT | ✅ **Historia elaborada** | §7 |
| 30 | **LO-24-a** *(propuesto)* | EP GET BFF/BE - Mail del usuario | HT | ✅ **Historia elaborada** | §7 (fila sin key en el Excel) |
| 31 | **LO-25** | PANTALLA LOGIN - Acceso próximo login password | HU-FE | ✅ **Historia elaborada** | §6 |
| 32 | **LO-26** | EP GET BFF - Validación de credenciales AD / Home / Manual | HT | ✅ **Historia elaborada** | §7 |
| 33 | **LO-27** | Doble Autenticación - Acceso próximos login | HU-FE | ✅ **Historia elaborada** | §6 |
| 34 | **LO-28** | EP GET BFF - Validación de 2FA | HT | ✅ **Historia elaborada** | §7 |
| 35 | **LO-29** | Cierre de sesión automático por inactividad | HU-FE | ✅ **Historia elaborada** | §6 |
| 36 | **LO-29-a** *(propuesto)* | EP validador del inicio de sesión devuelve también la cookie | HT | ✅ **Historia elaborada** | §7 (fila sin key en el Excel) |
| 37 | **LO-30** | Cambio / Desbloqueo de contraseña - BANCO | HU-FE | ✅ **Historia elaborada** | §6 |
| 38 | **LO-31** | Cambio / Desbloqueo de contraseña - EGP/PROVEEDOR homebanking | HU-FE | ✅ **Historia elaborada** | §6 |
| 39 | **LO-32** | Cambio / Desbloqueo de contraseña - EGP/PROVEEDOR pass manual | HU-FE | ✅ **Historia elaborada** | §6 |
| 40 | **LO-33** | EP PATCH BFF - Cambio de contraseña | HT | ✅ **Historia elaborada** | §7 |
| 41 | **LO-34** | Bloqueo de contraseña n intentos FE | HU-FE | ✅ **Historia elaborada** | §6 |
| 42 | **LO-35** | EP POST - Validación de pass (responde al FE y actualiza flag de status) | HT | ✅ **Historia elaborada** | §7 |

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

Referenciados por código desde los escenarios BDD y los criterios de aceptación.

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

## 6. Historias de usuario funcionales (tarjetas de backlog)

> Formato según skill `po-expert-user-stories`: tarjeta de backlog, AC numerados como fuente de verdad del PO, BDD en español.

---

### LO-05 — Mail de bienvenida para EGP / PROVEEDOR

| | |
|---|---|
| **Tipo** | HU-BE |
| **Épica** | LOGIN |
| **Actor** | Usuario EGP o Proveedor dado de alta en el ABM |
| **Dominios** | EGP, PROVEEDOR CLIENTE, PROVEEDOR NO CLIENTE |
| **Prioridad sugerida** | Must |
| **Depende de** | LO-06, T-03, T-04 |
| **Habilita** | LO-10 |
| **Pantalla POC** | — (mail; sin pantalla propia) |

#### Historia
```
Como usuario con dominio/rol dado de alta en la plataforma
quiero recibir un mail de bienvenida
para obtener la información para loguearme en la plataforma
```

#### Valor de negocio
Sin el mail de bienvenida, los usuarios externos no pueden completar el primer ingreso. Es el disparador del onboarding de EGP y Proveedores.

#### Escenarios fuente
> Transcripción literal del Excel:

```text
-El sistema envía un correo al usuario, con link de acceso, usuario/contraseña temporal
---BD Atlas Trade se guarda el ID Template
---Servicio de Notificaciones de Core envía el mail
--BD Atlas Core se guarda template
```

#### Criterios de aceptación
1. **[Feliz]** Al autorizar el alta de un usuario EGP / PROVEEDOR CLIENTE / PROVEEDOR NO CLIENTE, el sistema envía un mail con link de acceso, usuario, contraseña temporal de un solo uso (RN-01) y su vigencia.
2. **[Feliz]** El envío usa el ID Template de bienvenida registrado en Atlas Trade y el template vigente en Atlas Core vía el servicio de Notificaciones.
3. **[Feliz]** La notificación queda en el histórico de Atlas Trade con estado `ENVIADO`.
4. **[Alternativo]** Un usuario con permiso de ABM puede reenviar el mail: se invalida la temporal anterior, se genera una nueva y se registra un nuevo ítem en el histórico.
5. **[Alternativo]** Un usuario BANCO no recibe mail de bienvenida con credenciales temporales (LO-03 desestimada; ingresa con AD).
6. **[Error]** Si el servicio de Notificaciones falla, la notificación queda `PENDIENTE_REINTENTO`, se reintenta según LO-06 y el alta del usuario no se revierte.
7. **[Validación]** El mail no incluye documento ni teléfono; la temporal cumple RN-02 y se marca como temporal en Keycloak.

#### Escenarios BDD
```gherkin
Característica: Mail de bienvenida para usuarios EGP y Proveedor
  Como usuario dado de alta en la plataforma quiero recibir un mail de bienvenida
  para obtener la información necesaria para ingresar por primera vez.

  Antecedentes:
    Dado existe el template de mail de bienvenida vigente en la BD de Atlas Core
    Y Atlas Trade tiene registrado el "ID Template" de bienvenida
    Y el servicio de Notificaciones de Atlas Core está disponible

  Esquema del escenario: Envío del mail de bienvenida al autorizar el alta del usuario
    Dado un usuario del dominio "<dominio>" con correo "<mail>" y rol "<rol>"
    Cuando el ABM autoriza el alta del usuario
    Entonces el BFF invoca el servicio de Notificaciones de Atlas Core con el ID Template de bienvenida
    Y el usuario recibe un correo en "<mail>" que contiene el link de acceso al portal
    Y el correo contiene su nombre de usuario
    Y el correo contiene una contraseña temporal de un solo uso
    Y el correo indica la vigencia de la contraseña temporal
    Y se registra la notificación en el histórico de notificaciones de Atlas Trade con estado "ENVIADO"

    Ejemplos:
      | dominio             | mail                     | rol       |
      | EGP                 | ana@retail.com.py        | ADMIN     |
      | PROVEEDOR CLIENTE   | laura@proveedor.com.py   | ADMIN     |
      | PROVEEDOR NO CLIENTE| jose@servicios.com.py    | OPERADOR  |

  Escenario: El usuario de dominio BANCO no recibe mail de bienvenida con credenciales
    Dado un usuario del dominio "BANCO" dado de alta en el ABM
    Cuando el ABM autoriza el alta del usuario
    Entonces no se genera contraseña temporal
    Y el usuario ingresa con sus credenciales de AD

  Escenario: El servicio de notificaciones no está disponible
    Dado el servicio de Notificaciones de Atlas Core responde con error
    Cuando se intenta enviar el mail de bienvenida
    Entonces la notificación queda registrada en el histórico con estado "PENDIENTE_REINTENTO"
    Y el sistema reintenta el envío según la política de reintentos definida en LO-06
    Y el alta del usuario no se revierte

  Escenario: Reenvío del mail de bienvenida desde el ABM
    Dado un usuario dado de alta que no recibió o perdió el mail de bienvenida
    Cuando un usuario con permiso de ABM solicita "Reenviar mail de bienvenida"
    Entonces el sistema invalida la contraseña temporal anterior
    Y genera una nueva contraseña temporal
    Y envía un nuevo mail de bienvenida
    Y registra un nuevo ítem en el histórico de notificaciones
```

#### Fuera de alcance
- Mail de bienvenida para usuarios BANCO (LO-03 desestimada).
- Contenido/diseño visual del template (Atlas Core).
- Pantalla de primer login (LO-10).

#### Notas / preguntas abiertas
- Vigencia sugerida de la contraseña temporal: **72 horas** (S-05).
- El mail no debe incluir datos sensibles adicionales (documento, teléfono).

#### Chequeo INVEST
| I | N | V | E | S | T |
|---|---|---|---|---|---|
| ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |

---

### LO-07 — Primer login BANCO con credenciales de AD

| | |
|---|---|
| **Tipo** | HU-FE |
| **Épica** | LOGIN |
| **Actor** | Usuario interno del Banco (dominio BANCO) |
| **Dominios** | BANCO |
| **Prioridad sugerida** | Must |
| **Depende de** | LO-01 (OAuth/Keycloak), LO-26, S-01 |
| **Habilita** | Acceso a plataforma para BANCO |
| **Pantalla POC** | `login` → `2fa-ad` → plataforma |

#### Historia
```
Como usuario con dominio/rol que me habilita a ingresar a la plataforma de Confirming
quiero ingresar a la plataforma con mis credenciales de AD
para loguearme en la plataforma
```

#### Valor de negocio
Habilita el acceso de operadores internos del Banco sin gestionar contraseñas adicionales en el portal, reutilizando el AD corporativo.

#### Escenarios fuente
> Transcripción literal del Excel:

```text
-Al loguearse se recibe la Autenticacion del doble factor desde el AD
```

#### Criterios de aceptación
1. **[Feliz]** Un usuario BANCO habilitado ingresa con usuario y contraseña de AD; completa el 2FA gestionado por el AD y accede con su dominio/rol, sin crear contraseña en el portal.
2. **[Feliz]** El intento exitoso se registra en auditoría (RN-08).
3. **[Error]** Si el 2FA del AD se rechaza o no se completa, no accede, vuelve al login y ve MSG-14; se audita el fallo.
4. **[Error]** Credenciales de AD incorrectas: permanece en login, ve MSG-01 con intentos restantes (RN-04).
5. **[Error]** Usuario AD válido sin rol en Confirming: no accede; mensaje de sin permisos + contacto Mesa de Ayuda.
6. **[Error]** Contraseña de AD expirada: ve MSG-12 (continúa en LO-30).
7. **[Validación]** Campos Usuario/Contraseña vacíos: no envía solicitud; muestra validación de obligatorio.
8. **[Error]** BFF de login no disponible: ve MSG-14 y puede reintentar.

#### Escenarios BDD
```gherkin
Característica: Primer login de usuario BANCO con credenciales de AD
  Como usuario interno del Banco quiero ingresar con mis credenciales corporativas
  para acceder al Portal de Confirming sin gestionar una contraseña adicional.

  Antecedentes:
    Dado estoy en la pantalla de login del Portal de Confirming
    Y mi usuario pertenece al dominio "BANCO" y está habilitado para Confirming

  Escenario: Primer ingreso exitoso con credenciales de AD y 2FA del AD
    Dado ingreso mi usuario corporativo y mi contraseña de AD
    Cuando confirmo el ingreso
    Entonces el sistema valida mis credenciales contra el AD federado en Keycloak
    Y el sistema me solicita completar la autenticación de doble factor gestionada por el AD
    Cuando completo satisfactoriamente el doble factor en el AD
    Entonces accedo a la plataforma con el dominio y rol que tengo asignados
    Y no se me solicita crear ni actualizar una contraseña en el portal
    Y se registra el intento de login exitoso en auditoría

  Escenario: Doble factor del AD rechazado o no completado
    Dado ingresé mis credenciales de AD correctamente
    Y el sistema me solicitó la autenticación de doble factor
    Cuando no completo el doble factor o el AD lo rechaza
    Entonces no accedo a la plataforma
    Y vuelvo a la pantalla de login
    Y veo el mensaje MSG-14 con la indicación de reintentar el ingreso
    Y se registra el intento fallido en auditoría

  Escenario: Credenciales de AD incorrectas
    Dado ingreso mi usuario corporativo con una contraseña incorrecta
    Cuando confirmo el ingreso
    Entonces permanezco en la pantalla de login
    Y veo el mensaje MSG-01 con la cantidad de intentos restantes
    Y el contador de intentos fallidos se incrementa según RN-04

  Escenario: Usuario de AD válido sin rol habilitado en Confirming
    Dado mis credenciales de AD son válidas
    Y no tengo un rol habilitado para el Portal de Confirming
    Cuando confirmo el ingreso
    Entonces no accedo a la plataforma
    Y veo un mensaje indicando que no tengo permisos para operar en Confirming
    Y el mensaje ofrece el contacto de la Mesa de Ayuda

  Escenario: Contraseña de AD expirada
    Dado mi contraseña de AD está expirada
    Cuando confirmo el ingreso
    Entonces no accedo a la plataforma
    Y veo el mensaje MSG-12 indicando que debo actualizarla en el directorio corporativo

  Escenario: Campos obligatorios vacíos
    Dado dejo vacío el campo "Usuario" o el campo "Contraseña"
    Cuando intento confirmar el ingreso
    Entonces el sistema no envía la solicitud
    Y veo la validación de campo obligatorio en el campo vacío

  Escenario: El servicio de autenticación no responde
    Dado el BFF de login no está disponible
    Cuando confirmo el ingreso
    Entonces veo el mensaje MSG-14
    Y el botón de ingreso vuelve a estar habilitado para reintentar
```

#### Fuera de alcance
- Configurar 2FA o crear contraseña en el portal para BANCO (LO-21 desestimada).
- Cambio de contraseña de AD dentro del portal (LO-30 solo informa).

#### Notas / preguntas abiertas
- **S-01:** definir si el 2FA del AD es redirección al IdP o paso embebido; la HU asume redirección/paso gestionado por el AD.

#### Chequeo INVEST
| I | N | V | E | S | T |
|---|---|---|---|---|---|
| ✅ | ✅ | ✅ | ⚠️ | ✅ | ✅ |

---

### LO-10 — Primer login EGP / PROVEEDOR con contraseña temporal

| | |
|---|---|
| **Tipo** | HU-FE |
| **Épica** | LOGIN |
| **Actor** | Usuario EGP o Proveedor (cliente o no cliente) |
| **Dominios** | EGP, PROVEEDOR CLIENTE, PROVEEDOR NO CLIENTE |
| **Prioridad sugerida** | Must |
| **Depende de** | LO-05, LO-11, LO-13 |
| **Habilita** | LO-22 |
| **Pantalla POC** | `login` → `primer-login-temporal` → `canal-password` → `nueva-password` → LO-22 |

> ⚠️ **Alerta de dependencia:** el objetivo del Excel incluye *"actualizar la contraseña mediante homebanking"*, pero el endpoint que soportaba ese canal (**LO-12 / LO-16**) está **tachado**. Se elabora la historia con el canal Home Banking como **derivación informativa** (el usuario es enviado a Home Banking y luego vuelve a ingresar), y se deja la integración plena como recomendación **R-01** y spike **S-02**.

#### Historia
```
Como usuario con dominio/rol que me habilita a ingresar a la plataforma de Confirming
quiero poder introducir el usuario y contraseña recibidos por mail
para loguearme en la plataforma y actualizar la contraseña mediante homebanking o generando una nueva contraseña
```

#### Valor de negocio
Convierte la credencial temporal del mail de bienvenida en una contraseña definitiva y habilita el onboarding seguro de usuarios externos.

#### Escenarios fuente
> Transcripción literal del Excel:

```text
-El sistema ejecuta el flujo de primer login, valida contraseña temporal, usuario y rol
 (en la respuesta del servicio se envía un flag que marca a la pass como contraseña temporal
 para obligar al usuario a cambiarla)
-El sistema ejecuta el flujo de actualización de contraseña temporal integrando al homebanking
-El sistema ejecuta el flujo de actualización manual de contraseña
```

#### Criterios de aceptación
1. **[Feliz]** Al ingresar con contraseña temporal vigente, el servicio responde `passwordTemporal = true` y el FE obliga el cambio (RN-01); no se puede navegar al portal hasta completarlo.
2. **[Feliz]** EGP / Proveedor cliente con canal HOMEBANKING ve MSG-13 y opciones Home Banking o contraseña manual; Proveedor no cliente solo ve contraseña manual (RN-09).
3. **[Feliz]** Actualización manual exitosa (RN-02 + confirmación): actualiza Keycloak, `passwordTemporal = false` y continúa a LO-22.
4. **[Alternativo]** Derivación a Home Banking muestra MSG-16 y redirige; la temporal sigue vigente hasta actualizarla (alcance sujeto a S-02 / R-01).
5. **[Error]** Temporal incorrecta → MSG-01 + contador RN-04; temporal vencida → MSG-03 y reenvío de bienvenida.
6. **[Error]** Usuario sin rol → sin acceso + Mesa de Ayuda; usuario inexistente → MSG-01 genérico (RN-07).
7. **[Validación]** Política RN-02 en checklist en vivo (MSG-04); confirmación distinta → MSG-05; igual a temporal → rechazo MSG-04.
8. **[Error]** Fallo del servicio al actualizar → MSG-14; abandono del flujo mantiene la obligación de cambio (RN-01).

#### Escenarios BDD
```gherkin
Característica: Primer login de usuario EGP / Proveedor con contraseña temporal
  Como usuario externo quiero ingresar con las credenciales que recibí por mail
  y definir mi contraseña definitiva para poder operar en el portal.

  Antecedentes:
    Dado recibí el mail de bienvenida con mi usuario y una contraseña temporal
    Y estoy en la pantalla de login del Portal de Confirming

  Esquema del escenario: El sistema detecta la contraseña temporal y obliga a cambiarla
    Dado mi usuario pertenece al dominio "<dominio>"
    Cuando ingreso mi usuario y la contraseña temporal recibida por mail
    Entonces el servicio valida usuario, contraseña temporal y rol contra Keycloak
    Y la respuesta incluye el flag "passwordTemporal = true"
    Y el sistema me lleva a la pantalla de actualización de contraseña
    Y no puedo navegar a ninguna pantalla del portal hasta completar el cambio

    Ejemplos:
      | dominio              |
      | EGP                  |
      | PROVEEDOR CLIENTE    |
      | PROVEEDOR NO CLIENTE |

  Escenario: Contraseña temporal incorrecta
    Dado ingreso mi usuario con una contraseña temporal incorrecta
    Cuando confirmo el ingreso
    Entonces permanezco en la pantalla de login
    Y veo el mensaje MSG-01 con los intentos restantes
    Y el contador de intentos fallidos se incrementa según RN-04

  Escenario: Contraseña temporal vencida
    Dado la contraseña temporal que recibí superó su vigencia
    Cuando ingreso usuario y contraseña temporal
    Entonces veo el mensaje MSG-03
    Y el sistema dispara el reenvío del mail de bienvenida con una nueva contraseña temporal
    Y permanezco en la pantalla de login

  Escenario: Usuario válido sin rol habilitado
    Dado mis credenciales temporales son correctas
    Y mi usuario no tiene un rol habilitado en el portal
    Cuando confirmo el ingreso
    Entonces no accedo a la plataforma
    Y veo un mensaje indicando que mi usuario no tiene permisos asignados
    Y se ofrece el contacto de la Mesa de Ayuda

  Escenario: Usuario inexistente
    Dado ingreso un usuario que no existe en la plataforma
    Cuando confirmo el ingreso
    Entonces veo el mensaje genérico MSG-01
    Y el sistema no revela si el usuario existe o no

  Escenario: EGP o Proveedor cliente puede elegir Home Banking o contraseña manual
    Dado validé mi contraseña temporal
    Y mi usuario tiene habilitado el canal "HOMEBANKING" según la política de login
    Cuando el sistema me muestra la pantalla de actualización de contraseña
    Entonces veo el mensaje MSG-13
    Y veo la opción "Actualizar desde Home Banking"
    Y veo la opción "Crear una contraseña nueva acá"

  Escenario: Proveedor no cliente solo puede definir contraseña manual
    Dado validé mi contraseña temporal
    Y mi usuario no tiene habilitado el canal "HOMEBANKING"
    Cuando el sistema me muestra la pantalla de actualización de contraseña
    Entonces solo veo la opción de crear una contraseña nueva en el portal
    Y no veo ninguna referencia a Home Banking

  Escenario: Derivación a Home Banking
    Dado estoy en la pantalla de actualización de contraseña
    Cuando elijo "Actualizar desde Home Banking"
    Entonces veo el mensaje MSG-16 explicando la derivación
    Y confirmo la derivación
    Y el sistema me redirige a Home Banking
    Y mi contraseña temporal sigue vigente hasta que la actualice

  Escenario: Actualización manual exitosa
    Dado elegí crear una contraseña nueva en el portal
    Cuando ingreso una contraseña que cumple la política RN-02
    Y repito la misma contraseña en el campo de confirmación
    Y confirmo el cambio
    Entonces el sistema actualiza mi contraseña en Keycloak
    Y el flag de contraseña temporal queda en "false"
    Y el sistema me lleva al flujo de configuración de doble autenticación

  Esquema del escenario: La contraseña nueva no cumple la política de seguridad
    Dado estoy en la pantalla de creación de contraseña
    Cuando ingreso la contraseña "<password>"
    Entonces veo el mensaje MSG-04
    Y el requisito "<requisito>" aparece como no cumplido en el checklist
    Y el botón de confirmación permanece deshabilitado

    Ejemplos:
      | password      | requisito                  |
      | abc123        | mínimo 8 caracteres        |
      | abcdefgh      | al menos un número         |
      | abcdefg1      | al menos una mayúscula     |
      | ABCDEFG1      | al menos una minúscula     |
      | Abcdefg1      | al menos un carácter especial |

  Escenario: La confirmación no coincide
    Dado ingresé una contraseña válida
    Cuando ingreso una confirmación distinta
    Entonces veo el mensaje MSG-05
    Y el botón de confirmación permanece deshabilitado

  Escenario: La contraseña nueva es igual a la temporal
    Dado estoy en la pantalla de creación de contraseña
    Cuando ingreso como nueva contraseña la misma contraseña temporal
    Y confirmo el cambio
    Entonces el sistema rechaza el cambio
    Y veo el mensaje MSG-04 indicando que no puede repetir la contraseña anterior

  Escenario: Visibilidad de la contraseña y checklist en vivo
    Dado estoy en la pantalla de creación de contraseña
    Entonces veo el checklist con los requisitos de la política de contraseña
    Y cada requisito se marca como cumplido a medida que escribo
    Y puedo mostrar u ocultar el contenido del campo de contraseña

  Escenario: Error del servicio al actualizar la contraseña
    Dado ingresé una contraseña válida
    Cuando confirmo el cambio y el servicio responde con error
    Entonces veo el mensaje MSG-14
    Y permanezco en la pantalla de creación de contraseña con los datos ingresados
    Y mi contraseña temporal sigue siendo válida

  Escenario: Abandono del flujo antes de completar el cambio
    Dado validé mi contraseña temporal
    Y no completé el cambio de contraseña
    Cuando cierro el navegador y vuelvo a ingresar con la contraseña temporal
    Entonces el sistema me vuelve a exigir el cambio de contraseña
```

#### Fuera de alcance
- Integración plena API con Home Banking (R-01 / S-02; LO-12 tachado).
- Configuración de 2FA (LO-22).
- Usuarios BANCO (LO-07).

#### Notas / preguntas abiertas
- Validar RN-02 con Seguridad (S-04).
- Decidir momento de oferta de Home Banking (S-02).

#### Chequeo INVEST
| I | N | V | E | S | T |
|---|---|---|---|---|---|
| ⚠️ | ✅ | ✅ | ⚠️ | ✅ | ✅ |

---

### LO-22 — Configuración de 2FA en el primer login (EGP / PROVEEDOR)

| | |
|---|---|
| **Tipo** | HU-FE |
| **Épica** | LOGIN |
| **Actor** | Usuario EGP o Proveedor que ya cambió su contraseña temporal |
| **Dominios** | EGP, PROVEEDOR CLIENTE, PROVEEDOR NO CLIENTE |
| **Prioridad sugerida** | Must |
| **Depende de** | LO-10, LO-24, LO-24-a |
| **Habilita** | Acceso post primer login; LO-27 |
| **Pantalla POC** | `2fa-mail` → `2fa-otp` → `2fa-listo` |

#### Historia
```
Como usuario EGP/PROVEEDOR que está realizando el primer login y que ya cambió su contraseña
quiero configurar el doble factor de autenticación (2FA)
para completar el flujo de login
```

#### Valor de negocio
Cierra el onboarding con un segundo factor obligatorio, reduciendo el riesgo de acceso indebido con solo usuario/contraseña.

#### Escenarios fuente
> Transcripción literal del Excel:

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

#### Criterios de aceptación
1. **[Feliz]** Tras cambiar la contraseña, inicia el flujo 2FA: muestra correo enmascarado (RN-10), opción de cambiarlo y botón de envío.
2. **[Feliz]** Al solicitar el código se envía OTP por mail (template OTP), se muestra MSG-08 y campo de 6 dígitos con cooldown 60s (RN-03).
3. **[Feliz]** Código correcto: MSG-15, 2FA registrado, acceso a plataforma y auditoría (RN-08).
4. **[Alternativo]** Cambio de correo de recepción con formato válido; OTP va al nuevo correo.
5. **[Error]** Código incorrecto → MSG-06; 3 fallos o código vencido/usado → MSG-07 e invalidación; reenvío en cooldown → MSG-09.
6. **[Error]** Máximo 3 reenvíos: no envía más y deriva a reintentar/Mesa de Ayuda; fallo de notificaciones → MSG-14.
7. **[Validación]** Solo 6 dígitos numéricos; 2FA no se puede saltear en el primer login.
8. **[Validación]** Formato de correo inválido deshabilita confirmación.

#### Escenarios BDD
```gherkin
Característica: Configuración del doble factor de autenticación en el primer login
  Como usuario EGP o Proveedor que ya definió su contraseña quiero configurar la
  verificación en dos pasos para completar mi primer ingreso de forma segura.

  Antecedentes:
    Dado completé la actualización de mi contraseña temporal
    Y el sistema inicia automáticamente el flujo de configuración de 2FA

  Escenario: Confirmación del correo registrado
    Cuando el sistema muestra la pantalla de configuración de 2FA
    Entonces veo el texto "Te enviamos un correo a" con mi correo registrado enmascarado
    Y veo la opción para modificar el correo de recepción del código
    Y veo el botón para enviar el código

  Escenario: Cambio del correo de recepción del código
    Dado estoy en la pantalla de configuración de 2FA
    Cuando elijo modificar el correo de recepción
    Y ingreso el correo "nuevo.correo@empresa.com.py"
    Y confirmo el cambio
    Entonces el sistema valida el formato del correo
    Y el código OTP se envía al nuevo correo
    Y el correo queda registrado como dato de contacto del usuario

  Esquema del escenario: Correo con formato inválido
    Dado elegí modificar el correo de recepción
    Cuando ingreso el correo "<mail>"
    Entonces veo la validación de formato de correo inválido
    Y el botón de confirmación permanece deshabilitado

    Ejemplos:
      | mail              |
      | correo            |
      | correo@           |
      | correo@empresa    |
      | @empresa.com      |

  Escenario: Envío del código OTP
    Dado confirmé el correo de recepción
    Cuando solicito el envío del código
    Entonces el sistema envía la notificación OTP por mail usando el template de OTP
    Y veo el mensaje MSG-08 con el correo enmascarado y la vigencia del código
    Y veo el campo para ingresar los 6 dígitos
    Y veo el contador de reenvío deshabilitado por 60 segundos

  Escenario: Validación exitosa del código y cierre de la configuración
    Dado recibí el código OTP en mi correo
    Cuando ingreso el código correcto
    Entonces el sistema valida el código ingresado contra el código enviado
    Y veo el mensaje MSG-15
    Y la configuración de 2FA queda registrada para mi usuario
    Y accedo a la plataforma con mi dominio y rol
    Y se registra el evento en auditoría

  Escenario: Código incorrecto con intentos restantes
    Dado recibí el código OTP
    Cuando ingreso un código incorrecto
    Entonces veo el mensaje MSG-06 con la cantidad de intentos restantes
    Y permanezco en la pantalla de ingreso del código

  Escenario: Se agotan los intentos del código
    Dado ingresé un código incorrecto 3 veces
    Cuando ingreso un código incorrecto por tercera vez
    Entonces el código queda invalidado
    Y veo el mensaje MSG-07 indicando que debo solicitar un código nuevo
    Y el botón de reenvío queda habilitado

  Escenario: Código vencido
    Dado recibí el código OTP hace más de 5 minutos
    Cuando ingreso ese código
    Entonces veo el mensaje MSG-07
    Y el botón de reenvío queda habilitado

  Escenario: Reenvío del código dentro del cooldown
    Dado solicité el envío del código hace menos de 60 segundos
    Cuando intento reenviar el código
    Entonces veo el mensaje MSG-09 con los segundos restantes
    Y no se envía un nuevo código

  Escenario: Reenvío del código habilitado
    Dado pasaron más de 60 segundos desde el último envío
    Cuando solicito reenviar el código
    Entonces el sistema envía un nuevo código y invalida el anterior
    Y el contador de reenvío se reinicia en 60 segundos

  Escenario: Máximo de reenvíos alcanzado
    Dado ya solicité 3 reenvíos en este flujo
    Cuando intento reenviar el código nuevamente
    Entonces el sistema no envía un nuevo código
    Y veo un mensaje indicando que debo reintentar el ingreso más tarde o contactar a la Mesa de Ayuda

  Esquema del escenario: Validaciones de formato del campo de código
    Dado estoy en la pantalla de ingreso del código
    Cuando ingreso "<valor>" en el campo de código
    Entonces el campo solo acepta 6 dígitos numéricos
    Y el botón de validación se habilita únicamente con 6 dígitos ingresados

    Ejemplos:
      | valor    |
      | 12345    |
      | 12345a   |
      | 1234567  |

  Escenario: El servicio de envío de mail no está disponible
    Dado el servicio de notificaciones responde con error
    Cuando solicito el envío del código
    Entonces veo el mensaje MSG-14
    Y puedo reintentar el envío
    Y el flujo de 2FA no queda marcado como completado

  Escenario: El 2FA es obligatorio para completar el primer login
    Dado estoy en el flujo de configuración de 2FA
    Cuando intento saltear el paso o navegar a otra pantalla del portal
    Entonces el sistema no me permite continuar
    Y permanezco en el flujo de configuración de 2FA
```

#### Fuera de alcance
- 2FA para BANCO (LO-21 desestimada; lo provee el AD).
- TOTP con app autenticadora (`qrUri`/`secret`) — ver R-02.
- Validación 2FA en logins posteriores (LO-27).

#### Notas / preguntas abiertas
- Canal de esta iteración: **OTP por mail**. Inconsistencia con API TOTP → R-02.

#### Chequeo INVEST
| I | N | V | E | S | T |
|---|---|---|---|---|---|
| ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |

---

### LO-25 — Acceso recurrente con credenciales definitivas

| | |
|---|---|
| **Tipo** | HU-FE |
| **Épica** | LOGIN |
| **Actor** | Usuario de la plataforma que finalizó su primer login |
| **Dominios** | Todos |
| **Prioridad sugerida** | Must |
| **Depende de** | LO-26, LO-29-a |
| **Habilita** | LO-27 |
| **Pantalla POC** | `login` → LO-27 → plataforma |

#### Historia
```
Como usuario de la plataforma que finalizó su primer login
quiero ingresar a la plataforma con las nuevas credenciales
para acceder y utilizar la plataforma
```

#### Valor de negocio
Es el camino de uso diario del portal: autenticación única transparente al origen de la credencial (AD / HB / manual).

#### Escenarios fuente
> Transcripción literal del Excel:

```text
1-El sistema ejecuta el flujo de login y autentica credenciales AD
2-El sistema ejecuta el flujo de login y autentica credenciales homebanking
3-El sistema ejecuta el flujo de login y autentica credenciales configuradas manualmente
```

> Nota del Excel (LO-26): *"Keycloak se encarga de diferenciar dónde buscar la pass"*.

#### Criterios de aceptación
1. **[Feliz]** Ingreso exitoso con credenciales de AD, Home Banking o manual: Keycloak resuelve el origen; continúa a 2FA; el portal recibe cookie de sesión.
2. **[Feliz]** La UI solo muestra Usuario y Contraseña; el usuario no elige el origen.
3. **[Alternativo]** Sesión válida vigente en el mismo navegador: acceso directo sin reingresar credenciales.
4. **[Error]** Credenciales incorrectas → MSG-01 (continúa LO-34); usuario bloqueado → MSG-02; usuario dado de baja → sin acceso + Mesa de Ayuda.
5. **[Error]** Contraseña expirada por política: exige actualizar (LO-31 / LO-32).
6. **[Error]** BFF no disponible → MSG-14; campos vacíos → validación de obligatorio.

#### Escenarios BDD
```gherkin
Característica: Acceso recurrente al portal con credenciales definitivas
  Como usuario que ya completó su primer login quiero ingresar con mis credenciales
  definitivas para operar en el portal.

  Antecedentes:
    Dado completé mi primer login
    Y estoy en la pantalla de login del Portal de Confirming

  Esquema del escenario: Ingreso exitoso según el origen de la credencial
    Dado mi contraseña está administrada en "<origen>"
    Cuando ingreso mi usuario y contraseña
    Entonces Keycloak resuelve el origen de la credencial sin intervención del front end
    Y la autenticación es exitosa
    Y el sistema continúa con la validación de doble factor
    Y el portal recibe la cookie de sesión

    Ejemplos:
      | origen                       |
      | AD                           |
      | Home Banking                 |
      | Contraseña manual del portal |

  Escenario: El usuario no debe elegir el origen de su contraseña
    Dado estoy en la pantalla de login
    Entonces solo veo los campos "Usuario" y "Contraseña"
    Y no veo ninguna opción para seleccionar AD, Home Banking o contraseña manual

  Escenario: Credenciales incorrectas
    Cuando ingreso mi usuario con una contraseña incorrecta
    Entonces veo el mensaje MSG-01 con los intentos restantes
    Y permanezco en la pantalla de login

  Escenario: Usuario bloqueado
    Dado mi usuario está bloqueado por intentos fallidos
    Cuando ingreso mis credenciales correctas
    Entonces no accedo a la plataforma
    Y veo el mensaje MSG-02 con la vía de recupero

  Escenario: Usuario deshabilitado o dado de baja en el ABM
    Dado mi usuario fue dado de baja o deshabilitado en el ABM
    Cuando ingreso mis credenciales
    Entonces no accedo a la plataforma
    Y veo un mensaje indicando que mi acceso no está habilitado
    Y se ofrece el contacto de la Mesa de Ayuda

  Escenario: Contraseña expirada por política
    Dado mi contraseña superó la vigencia definida por política
    Cuando ingreso mis credenciales correctas
    Entonces el sistema me exige actualizar la contraseña antes de continuar

  Escenario: Sesión ya iniciada en el mismo navegador
    Dado tengo una sesión válida vigente en este navegador
    Cuando abro nuevamente la URL del portal
    Entonces accedo directamente a la plataforma sin volver a ingresar credenciales

  Escenario: El servicio de autenticación no responde
    Dado el BFF de login no está disponible
    Cuando intento ingresar
    Entonces veo el mensaje MSG-14
    Y permanezco en la pantalla de login con el botón habilitado para reintentar

  Escenario: Campos obligatorios
    Cuando intento ingresar con el campo "Usuario" o "Contraseña" vacío
    Entonces el sistema no envía la solicitud
    Y veo la validación de campo obligatorio
```

#### Fuera de alcance
- Validación del segundo factor (LO-27).
- Bloqueo por intentos (detalle FE en LO-34).
- Primer login con temporal (LO-10).

#### Notas / preguntas abiertas
- Ninguna adicional respecto de v1; Keycloak es autoridad del origen (SUP-01).

#### Chequeo INVEST
| I | N | V | E | S | T |
|---|---|---|---|---|---|
| ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |

---

### LO-27 — Validación de 2FA en accesos posteriores

| | |
|---|---|
| **Tipo** | HU-FE |
| **Épica** | LOGIN |
| **Actor** | Usuario EGP/Proveedor recurrente (BANCO vía AD — S-01) |
| **Dominios** | EGP, PROVEEDOR CLIENTE, PROVEEDOR NO CLIENTE (BANCO: 2FA del AD, S-01) |
| **Prioridad sugerida** | Must |
| **Depende de** | LO-25, LO-28, LO-24 |
| **Habilita** | Sesión completa post-login |
| **Pantalla POC** | `login` → `2fa-otp` (con opción "recordar este dispositivo") |

#### Historia
```
Como usuario de la plataforma que finalizó su primer login
quiero validar el doble factor de autenticación y registrar mi dispositivo como seguro
para acceder y utilizar la plataforma
```

#### Valor de negocio
Protege los accesos recurrentes y permite fricción reducida en dispositivos confiables, siempre exigiendo 2FA tras un cierre de sesión (RN-06).

#### Escenarios fuente
> Transcripción literal del Excel:

```text
1-El sistema pide la ejecución de la doble autenticación para validar el login
```

> Nota del Excel (DUDAS): *"Para usuarios EGP/PROVEEDOR: ¿cada cuánto tiempo queremos pedir la doble autenticación? = siempre pedirlo al cerrar sesión"* (RN-06). Para usuarios BANCO queda el spike S-01.

#### Criterios de aceptación
1. **[Feliz]** Tras autenticar usuario/contraseña luego de un cierre de sesión, se solicita OTP; se envía al correo y se muestra MSG-08.
2. **[Feliz]** Código correcto: acceso, cookie de sesión y auditoría.
3. **[Feliz]** Opción "Recordar este dispositivo" registra dispositivo confiable.
4. **[Alternativo]** Dispositivo confiable sin cierre explícito: no pide OTP; dispositivo nuevo: pide OTP e informa acceso nuevo.
5. **[Alternativo]** Tras cierre explícito, aun con dispositivo confiable, se pide OTP (RN-06).
6. **[Error]** Código incorrecto/vencido/usado → MSG-06/MSG-07; 3 fallos → vuelve al login; reenvío según RN-03.
7. **[Error]** Abandono del flujo: no hay sesión; debe reiniciar ingreso.
8. **[Alternativo]** Usuario BANCO: 2FA lo gestiona el AD; el portal no pide OTP propio (sujeto a S-01).

#### Escenarios BDD
```gherkin
Característica: Validación de doble factor en accesos posteriores
  Como usuario recurrente quiero validar el segundo factor y poder marcar mi
  dispositivo como seguro para acceder de forma ágil y protegida.

  Antecedentes:
    Dado completé la configuración de 2FA en mi primer login
    Y autentiqué correctamente mi usuario y contraseña

  Escenario: Solicitud de doble factor luego de un cierre de sesión
    Dado cerré sesión en mi acceso anterior
    Cuando me autentico nuevamente
    Entonces el sistema me solicita el código de doble factor
    Y el código se envía al correo registrado
    Y veo el mensaje MSG-08

  Escenario: Validación exitosa del doble factor
    Dado recibí el código de doble factor
    Cuando ingreso el código correcto
    Entonces accedo a la plataforma con mi dominio y rol
    Y el portal recibe la cookie de sesión
    Y se registra el acceso en auditoría

  Escenario: Registro del dispositivo como seguro
    Dado estoy en la pantalla de validación del doble factor
    Cuando marco la opción "Recordar este dispositivo"
    Y valido el código correctamente
    Entonces el dispositivo queda registrado como dispositivo confiable de mi usuario
    Y veo la confirmación del registro

  Escenario: Ingreso desde un dispositivo ya registrado como seguro
    Dado tengo este dispositivo registrado como confiable
    Y no cerré sesión explícitamente en el acceso anterior
    Cuando me autentico con usuario y contraseña
    Entonces el sistema no me solicita el código de doble factor
    Y accedo directamente a la plataforma

  Escenario: Ingreso desde un dispositivo nuevo
    Dado nunca ingresé desde este dispositivo o navegador
    Cuando me autentico con usuario y contraseña
    Entonces el sistema me solicita el código de doble factor
    Y el sistema me informa que detectó un acceso desde un dispositivo nuevo

  Escenario: Se solicita doble factor siempre luego de cerrar sesión, aun en dispositivo confiable
    Dado tengo este dispositivo registrado como confiable
    Y cerré sesión explícitamente
    Cuando me autentico nuevamente
    Entonces el sistema me solicita el código de doble factor

  Esquema del escenario: Código de doble factor inválido o vencido
    Dado recibí el código de doble factor
    Cuando ingreso un código "<condición>"
    Entonces veo el mensaje "<mensaje>"
    Y no accedo a la plataforma

    Ejemplos:
      | condición                | mensaje |
      | incorrecto               | MSG-06  |
      | vencido (más de 5 min)   | MSG-07  |
      | ya utilizado             | MSG-07  |

  Escenario: Se agotan los intentos de validación del código
    Dado ingresé el código incorrectamente 3 veces
    Entonces el código queda invalidado
    Y vuelvo a la pantalla de login
    Y veo un mensaje indicando que debo iniciar el ingreso nuevamente

  Escenario: Reenvío del código
    Dado estoy en la pantalla de validación del doble factor
    Cuando solicito reenviar el código
    Entonces se aplican las reglas de cooldown y máximo de reenvíos de RN-03

  Escenario: Abandono de la validación del doble factor
    Dado el sistema me solicitó el código de doble factor
    Cuando abandono el flujo sin validar el código
    Entonces no se genera sesión activa
    Y al volver al portal debo autenticarme desde el inicio

  Escenario: Usuario BANCO
    Dado mi usuario pertenece al dominio "BANCO"
    Cuando me autentico con mis credenciales de AD
    Entonces el doble factor lo gestiona el AD
    Y el portal no solicita un código OTP propio
```

#### Fuera de alcance
- Configuración inicial de 2FA (LO-22).
- Gestión/revocación de dispositivos desde Mi Perfil (R-07).
- Logout formal como historia propia (R-03), aunque RN-06 depende de él.

#### Notas / preguntas abiertas
- Vigencia del dispositivo confiable sugerida: 30 días (S-03).
- Experiencia 2FA BANCO pendiente de S-01.

#### Chequeo INVEST
| I | N | V | E | S | T |
|---|---|---|---|---|---|
| ⚠️ | ✅ | ✅ | ✅ | ✅ | ✅ |

---

### LO-29 — Cierre de sesión automático por inactividad

| | |
|---|---|
| **Tipo** | HU-FE |
| **Épica** | LOGIN |
| **Actor** | Usuario logueado en la plataforma |
| **Dominios** | Todos |
| **Prioridad sugerida** | Must |
| **Depende de** | LO-29-a |
| **Habilita** | Protección de sesión |
| **Pantalla POC** | modal `sesión por expirar` + retorno a `login` con MSG-11 |

#### Historia
```
Como usuario logueado en la plataforma
quiero que se cierre la sesión automáticamente luego de n minutos
para proteger la información sensible que gestiono en la plataforma
```

#### Valor de negocio
Reduce el riesgo de exposición de información financiera ante estaciones desatendidas (RN-05: 5 min / aviso al minuto 4).

#### Escenarios fuente
> Transcripción literal del Excel:

```text
1-El sistema mostrará un warning de cierre de sesión para permitirle al usuario extender la sesión
2-El sistema extiende la sesión ante la confirmación
3-El sistema cierra la sesión ante la no confirmación
```

> Notas del Excel: *5 minutos de inactividad · 1 minuto antes se muestra el warning · en base a cookies en FE · cuando tenga cookie inválido devuelve al login* (RN-05).

#### Criterios de aceptación
1. **[Feliz]** Tras 4 minutos sin interacción se muestra MSG-10 con cuenta regresiva de 60s y acciones Continuar / Cerrar sesión.
2. **[Feliz]** "Continuar conectado" renueva la sesión 5 minutos más sin perder datos en pantalla.
3. **[Feliz]** Sin acción en 60s o "Cerrar sesión": cierra sesión, redirige a login y muestra MSG-11 (o cierre inmediato).
4. **[Alternativo]** Interacciones (navegar, clic, escribir, scroll) reinician el contador antes de los 4 minutos.
5. **[Error]** Cookie inválida/vencida en llamada al BFF → redirect a login + MSG-11.
6. **[Alternativo]** Cierre manual desde menú invalida cookie; próximo ingreso pide 2FA (RN-06).
7. **[Validación]** Operación en curso al cerrar: no se guardan datos no confirmados.

#### Escenarios BDD
```gherkin
Característica: Cierre de sesión automático por inactividad
  Como usuario logueado quiero que el portal cierre mi sesión tras un período de
  inactividad para proteger la información que gestiono.

  Antecedentes:
    Dado inicié sesión correctamente en el portal
    Y el tiempo de inactividad permitido es de 5 minutos
    Y el aviso previo se muestra 1 minuto antes del cierre

  Escenario: Aviso previo al cierre por inactividad
    Dado estoy en cualquier pantalla del portal
    Cuando permanezco 4 minutos sin interactuar
    Entonces veo el aviso MSG-10
    Y el aviso muestra una cuenta regresiva de 60 segundos
    Y el aviso ofrece las acciones "Continuar conectado" y "Cerrar sesión"

  Escenario: Extensión de la sesión ante la confirmación
    Dado veo el aviso de cierre por inactividad
    Cuando elijo "Continuar conectado"
    Entonces el aviso se cierra
    Y la sesión se renueva por 5 minutos más
    Y permanezco en la misma pantalla sin perder los datos cargados en pantalla

  Escenario: Cierre de sesión ante la no confirmación
    Dado veo el aviso de cierre por inactividad
    Cuando no realizo ninguna acción durante los 60 segundos de la cuenta regresiva
    Entonces el sistema cierra mi sesión
    Y soy redirigido a la pantalla de login
    Y veo el mensaje MSG-11

  Escenario: Cierre inmediato solicitado desde el aviso
    Dado veo el aviso de cierre por inactividad
    Cuando elijo "Cerrar sesión"
    Entonces el sistema cierra mi sesión inmediatamente
    Y soy redirigido a la pantalla de login

  Esquema del escenario: La interacción del usuario reinicia el contador
    Dado estoy operando en el portal
    Cuando realizo la acción "<acción>" antes de los 4 minutos
    Entonces el contador de inactividad se reinicia
    Y no veo el aviso de cierre de sesión

    Ejemplos:
      | acción                        |
      | navegar a otra sección        |
      | hacer clic en la pantalla     |
      | escribir en un campo          |
      | desplazar la pantalla         |

  Escenario: Cookie de sesión inválida o vencida
    Dado mi cookie de sesión está vencida o es inválida
    Cuando intento ejecutar cualquier acción que consulte al BFF
    Entonces el sistema me redirige a la pantalla de login
    Y veo el mensaje MSG-11

  Escenario: Operación en curso al momento del cierre
    Dado tengo un formulario con datos sin guardar
    Cuando la sesión se cierra por inactividad
    Entonces el sistema no guarda la información no confirmada
    Y al volver a ingresar comienzo desde el inicio de la operación

  Escenario: Cierre de sesión manual
    Dado estoy operando en el portal
    Cuando elijo "Cerrar Sesión" en el menú lateral
    Entonces el sistema invalida la cookie de sesión
    Y soy redirigido a la pantalla de login
    Y en el próximo ingreso se me solicitará el doble factor
```

#### Fuera de alcance
- Emisión/renovación de cookie en BFF (LO-29-a).
- Historia formal de logout (R-03).

#### Notas / preguntas abiertas
- ¿Mismo timeout para todos los dominios? (S-06; sugerido 5 min parametrizable).
- Aviso accesible: foco en botón principal y anuncio por lector de pantalla.
- El contador vive en FE; la autoridad del cierre es la cookie.

#### Chequeo INVEST
| I | N | V | E | S | T |
|---|---|---|---|---|---|
| ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |

---

### LO-30 — Cambio / desbloqueo de contraseña · BANCO

| | |
|---|---|
| **Tipo** | HU-FE |
| **Épica** | LOGIN |
| **Actor** | Usuario BANCO que olvidó o tiene contraseña expirada |
| **Dominios** | BANCO |
| **Prioridad sugerida** | Must |
| **Depende de** | LO-26 |
| **Habilita** | Orientación de recupero AD |
| **Pantalla POC** | `olvide-password` → `aviso-ad` |

#### Historia
```
Como usuario que intenta loguearse en la plataforma y olvidó o expiró su contraseña
quiero cambiar la contraseña de mi cuenta
para poder loguearme en la plataforma
```

#### Valor de negocio
Evita fricción y tickets confusos: el portal no pretende cambiar la clave del AD; orienta al canal correcto (MSG-12).

#### Escenarios fuente
> Transcripción literal del Excel:

```text
1-El sistema mostrará un warning de que debe actualizarlo desde el AD
```

#### Criterios de aceptación
1. **[Feliz]** Desde "¿Olvidaste tu contraseña?" un usuario BANCO ve MSG-12 + Mesa de Ayuda; no hay formulario de nueva contraseña en el portal.
2. **[Alternativo]** Contraseña AD expirada en login muestra MSG-12 y permite volver al login.
3. **[Alternativo]** Usuario BANCO bloqueado por intentos: MSG-12 con desbloqueo vía Mesa de Ayuda; sin desbloqueo automático en portal.
4. **[Validación]** Usuario inexistente: mensaje genérico sin revelar existencia (RN-07).
5. **[Feliz]** "Volver al inicio" regresa al login con campos vacíos.

#### Escenarios BDD
```gherkin
Característica: Recupero de contraseña para usuarios BANCO
  Como usuario interno del Banco quiero saber cómo recuperar mi acceso cuando
  olvido o se expira mi contraseña corporativa.

  Antecedentes:
    Dado estoy en la pantalla de login del Portal de Confirming

  Escenario: Aviso de gestión de contraseña en el AD
    Dado mi usuario pertenece al dominio "BANCO"
    Cuando elijo "¿Olvidaste tu contraseña?"
    Y ingreso mi usuario corporativo
    Entonces veo el aviso MSG-12 indicando que la contraseña se administra en el directorio corporativo
    Y veo la referencia a la Mesa de Ayuda con su canal de contacto
    Y no veo ningún formulario para definir una contraseña nueva en el portal

  Escenario: Contraseña de AD expirada detectada en el login
    Dado mi contraseña de AD está expirada
    Cuando intento ingresar con mis credenciales
    Entonces veo el aviso MSG-12
    Y puedo volver a la pantalla de login

  Escenario: Usuario BANCO bloqueado por intentos fallidos
    Dado mi usuario BANCO quedó bloqueado por 3 intentos fallidos
    Cuando elijo "¿Olvidaste tu contraseña?" e ingreso mi usuario
    Entonces veo el aviso MSG-12 con la indicación de desbloqueo por Mesa de Ayuda
    Y el portal no ofrece desbloqueo automático

  Escenario: El portal no revela la existencia del usuario
    Dado ingreso un usuario que no existe
    Cuando solicito el recupero de contraseña
    Entonces veo un mensaje genérico con las indicaciones de recupero
    Y el sistema no informa si el usuario existe

  Escenario: Retorno al login
    Dado estoy viendo el aviso de gestión de contraseña en el AD
    Cuando elijo "Volver al inicio"
    Entonces regreso a la pantalla de login con los campos vacíos
```

#### Fuera de alcance
- Cambio real de contraseña en AD desde el portal.
- Desbloqueo automático de BANCO (R-05 / Mesa de Ayuda).

#### Notas / preguntas abiertas
- Ninguna adicional; coherente con LO-34 para bloqueo BANCO.

#### Chequeo INVEST
| I | N | V | E | S | T |
|---|---|---|---|---|---|
| ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |

---

### LO-31 — Cambio / desbloqueo de contraseña · EGP/PROVEEDOR con Home Banking

| | |
|---|---|
| **Tipo** | HU-FE |
| **Épica** | LOGIN |
| **Actor** | Usuario EGP o Proveedor cliente con canal Home Banking |
| **Dominios** | EGP, PROVEEDOR CLIENTE |
| **Prioridad sugerida** | Must |
| **Depende de** | LO-33, LO-24 |
| **Habilita** | Recupero de acceso |
| **Pantalla POC** | `olvide-password` → `canal-password` → Home Banking / `nueva-password` |

#### Historia
```
Como usuario que intenta loguearse en la plataforma y olvidó o expiró su contraseña
quiero cambiar la contraseña de mi cuenta
para poder loguearme en la plataforma
```

#### Valor de negocio
Recupera el acceso de clientes del banco ofreciendo el canal Home Banking o el cambio manual con OTP.

#### Escenarios fuente
> Transcripción literal del Excel:

```text
1-El sistema mostrará un warning de que puede actualizarlo desde homebanking
  o si desea continuar cambiar la contraseña manualmente
```

#### Criterios de aceptación
1. **[Feliz]** "¿Olvidaste tu contraseña?" + usuario con HOMEBANKING: ve MSG-13 y ambas opciones.
2. **[Feliz]** Derivación a Home Banking: MSG-16, redirección; puede volver e ingresar con la nueva clave (alcance S-02 / R-01).
3. **[Feliz]** Cambio manual: OTP (MSG-08), código correcto → formulario; contraseña RN-02 → actualización y confirmación.
4. **[Feliz]** Completar cambio con OTP desbloquea cuenta bloqueada y reinicia contador de intentos.
5. **[Error]** OTP incorrecto/vencido → MSG-06/MSG-07; política no cumplida → MSG-04; reutilización últimas 3 → MSG-04; error servicio → MSG-14.
6. **[Error]** Sin correo registrado: no envía OTP; deriva a Mesa de Ayuda.

#### Escenarios BDD
```gherkin
Característica: Recupero de contraseña para EGP y Proveedor cliente con Home Banking
  Como usuario cliente del banco quiero elegir entre actualizar mi contraseña
  desde Home Banking o crear una nueva en el portal para recuperar mi acceso.

  Antecedentes:
    Dado estoy en la pantalla de login del Portal de Confirming
    Y mi usuario tiene habilitado el canal "HOMEBANKING" según la política de login

  Escenario: Elección del canal de actualización
    Cuando elijo "¿Olvidaste tu contraseña?"
    Y ingreso mi usuario
    Entonces veo el mensaje MSG-13
    Y veo la opción "Actualizar desde Home Banking"
    Y veo la opción "Crear una contraseña nueva acá"

  Escenario: Derivación a Home Banking
    Dado estoy viendo las opciones de actualización de contraseña
    Cuando elijo "Actualizar desde Home Banking"
    Entonces veo el mensaje MSG-16
    Y al confirmar soy redirigido a Home Banking
    Y puedo volver al portal e ingresar con la contraseña actualizada

  Escenario: Cambio manual con validación por OTP
    Dado estoy viendo las opciones de actualización de contraseña
    Cuando elijo "Crear una contraseña nueva acá"
    Entonces el sistema envía un código OTP a mi correo registrado
    Y veo el mensaje MSG-08
    Cuando ingreso el código correcto
    Entonces accedo al formulario de nueva contraseña
    Cuando ingreso una contraseña que cumple la política RN-02 y su confirmación
    Y confirmo el cambio
    Entonces el sistema actualiza mi contraseña
    Y veo la confirmación del cambio
    Y puedo ingresar al portal con la nueva contraseña

  Escenario: Cuenta bloqueada — el cambio de contraseña la desbloquea
    Dado mi usuario está bloqueado por 3 intentos fallidos
    Cuando completo el cambio de contraseña con validación de OTP
    Entonces el bloqueo de mi cuenta se libera
    Y el contador de intentos fallidos se reinicia
    Y puedo ingresar con la nueva contraseña

  Esquema del escenario: Errores en la validación del código OTP
    Dado solicité el cambio manual de contraseña
    Cuando ingreso un código "<condición>"
    Entonces veo el mensaje "<mensaje>"
    Y no accedo al formulario de nueva contraseña

    Ejemplos:
      | condición  | mensaje |
      | incorrecto | MSG-06  |
      | vencido    | MSG-07  |

  Escenario: La contraseña nueva no cumple la política
    Dado estoy en el formulario de nueva contraseña
    Cuando ingreso una contraseña que no cumple la política RN-02
    Entonces veo el mensaje MSG-04 con el checklist de requisitos no cumplidos
    Y el botón de confirmación permanece deshabilitado

  Escenario: La contraseña nueva coincide con una contraseña anterior
    Dado estoy en el formulario de nueva contraseña
    Cuando ingreso una contraseña igual a una de las últimas 3 utilizadas
    Y confirmo el cambio
    Entonces el sistema rechaza el cambio
    Y veo el mensaje MSG-04 indicando que no puede reutilizar contraseñas anteriores

  Escenario: Usuario sin correo registrado
    Dado mi usuario no tiene correo registrado
    Cuando solicito el cambio manual de contraseña
    Entonces el sistema no puede enviar el código
    Y veo un mensaje indicando que debo contactar a la Mesa de Ayuda

  Escenario: Error del servicio al actualizar la contraseña
    Dado completé el formulario de nueva contraseña
    Cuando confirmo el cambio y el servicio responde con error
    Entonces veo el mensaje MSG-14
    Y mi contraseña anterior sigue vigente
    Y puedo reintentar el cambio
```

#### Fuera de alcance
- Integración plena Home Banking (R-01).
- Recupero BANCO (LO-30) y solo-manual (LO-32).

#### Notas / preguntas abiertas
- Alcance real de la redirección a Home Banking (S-02 / R-01).

#### Chequeo INVEST
| I | N | V | E | S | T |
|---|---|---|---|---|---|
| ⚠️ | ✅ | ✅ | ✅ | ✅ | ✅ |

---

### LO-32 — Cambio / desbloqueo de contraseña · gestión manual

| | |
|---|---|
| **Tipo** | HU-FE |
| **Épica** | LOGIN |
| **Actor** | Usuario sin Home Banking (Proveedor no cliente u opción manual) |
| **Dominios** | PROVEEDOR NO CLIENTE (y EGP/Proveedor cliente que eligió contraseña manual) |
| **Prioridad sugerida** | Must |
| **Depende de** | LO-33, LO-24 |
| **Habilita** | Recupero de acceso manual |
| **Pantalla POC** | `olvide-password` → `2fa-otp` → `nueva-password` |

#### Historia
```
Como usuario que intenta loguearse en la plataforma y olvidó o expiró su contraseña
quiero cambiar la contraseña de mi cuenta
para poder loguearme en la plataforma
```

#### Valor de negocio
Garantiza recupero autónomo para usuarios sin Home Banking, con verificación OTP por mail.

#### Escenarios fuente
> Transcripción literal del Excel:

```text
1-El sistema muestra el flujo de cambio de contraseña
```

#### Criterios de aceptación
1. **[Feliz]** Flujo completo: sin opción HB → OTP (MSG-08) → formulario → contraseña RN-02 → actualización, confirmación y auditoría.
2. **[Feliz]** Completar el flujo desbloquea cuenta bloqueada.
3. **[Alternativo]** Contraseña expirada por política deriva al flujo; al completarlo accede sin reautenticarse.
4. **[Alternativo]** Reenvío de código según RN-03.
5. **[Error]** Validaciones formulario: MSG-04 / MSG-05; código reutilizado → MSG-07; usuario inexistente → mensaje genérico sin enviar código (RN-07).

#### Escenarios BDD
```gherkin
Característica: Recupero de contraseña con gestión manual en el portal
  Como usuario sin Home Banking quiero recuperar mi acceso definiendo una nueva
  contraseña en el portal, validando mi identidad con un código enviado por mail.

  Antecedentes:
    Dado estoy en la pantalla de login del Portal de Confirming
    Y mi usuario no tiene habilitado el canal "HOMEBANKING"

  Escenario: Flujo completo de cambio de contraseña
    Cuando elijo "¿Olvidaste tu contraseña?"
    Y ingreso mi usuario
    Entonces el sistema no me ofrece la opción de Home Banking
    Y el sistema envía un código OTP a mi correo registrado
    Y veo el mensaje MSG-08
    Cuando ingreso el código correcto
    Entonces accedo al formulario de nueva contraseña
    Cuando ingreso una contraseña que cumple la política RN-02
    Y repito la misma contraseña en la confirmación
    Y confirmo el cambio
    Entonces el sistema actualiza mi contraseña
    Y veo la confirmación del cambio con acceso directo al login
    Y se registra el cambio en auditoría

  Escenario: Reenvío del código durante el recupero
    Dado solicité el cambio de contraseña y recibí el código
    Cuando solicito reenviar el código
    Entonces se aplican las reglas de cooldown y máximo de reenvíos de RN-03

  Esquema del escenario: Validaciones del formulario de nueva contraseña
    Dado accedí al formulario de nueva contraseña
    Cuando ingreso "<password>" y confirmo "<confirmacion>"
    Entonces veo el mensaje "<mensaje>"
    Y el cambio no se realiza

    Ejemplos:
      | password      | confirmacion  | mensaje |
      | corta1!       | corta1!       | MSG-04  |
      | Valida123!    | Valida124!    | MSG-05  |
      |               |               | MSG-04  |

  Escenario: Cuenta bloqueada — el cambio de contraseña la desbloquea
    Dado mi usuario está bloqueado por 3 intentos fallidos
    Cuando completo el flujo de cambio de contraseña
    Entonces el bloqueo de mi cuenta se libera
    Y puedo ingresar con la nueva contraseña

  Escenario: Contraseña expirada por política
    Dado mi contraseña superó la vigencia definida por política
    Cuando intento ingresar con mis credenciales correctas
    Entonces el sistema me lleva al flujo de cambio de contraseña
    Y al completarlo accedo a la plataforma sin volver a autenticarme

  Escenario: Solicitud de recupero para un usuario inexistente
    Cuando solicito el recupero con un usuario que no existe
    Entonces veo el mismo mensaje que para un usuario válido
    Y el sistema no envía ningún código

  Escenario: Enlace o código utilizado dos veces
    Dado ya utilicé el código para cambiar mi contraseña
    Cuando intento reutilizar el mismo código
    Entonces veo el mensaje MSG-07
    Y debo iniciar el flujo de recupero nuevamente
```

#### Fuera de alcance
- Canal Home Banking (LO-31).
- Recupero BANCO (LO-30).

#### Notas / preguntas abiertas
- Ninguna adicional respecto de v1.

#### Chequeo INVEST
| I | N | V | E | S | T |
|---|---|---|---|---|---|
| ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |

---

### LO-34 — Bloqueo de contraseña por n intentos (FE)

| | |
|---|---|
| **Tipo** | HU-FE |
| **Épica** | LOGIN |
| **Actor** | Usuario que intenta ingresar a la plataforma |
| **Dominios** | Todos |
| **Prioridad sugerida** | Must |
| **Depende de** | LO-35 |
| **Habilita** | Feedback de seguridad en login |
| **Pantalla POC** | `login` con contador de intentos → `usuario-bloqueado` |

#### Historia
```
Como usuario que intenta ingresar a la plataforma
quiero ser informado con claridad cuando mis credenciales son incorrectas y cuando mi acceso queda bloqueado
para entender qué ocurrió y cómo recuperar el acceso
```

#### Valor de negocio
Comunica el bloqueo por fuerza bruta (RN-04) y la vía de recupero, alineado con políticas de seguridad financiera.

#### Escenarios fuente
> Detalle técnico del Excel (historia reconstruida):

```text
En N intentos (3 intentos) se bloquea a nivel BFF en keycloak
-POST Login al BFF falla
-se actualiza el flag actualizado de pass bloqueada al BFF
-FE muestra msj de error
```

#### Criterios de aceptación
1. **[Feliz / Validación]** Tras intentos fallidos 1 y 2 se muestra MSG-01 con intentos restantes (2 y 1).
2. **[Error]** Al 3.er intento fallido: Keycloak bloquea; FE muestra MSG-02; formulario deshabilitado para ese usuario; acceso a "¿Olvidaste tu contraseña?".
3. **[Error]** Con cuenta bloqueada, aunque la contraseña sea correcta, ve MSG-02 y no accede.
4. **[Feliz]** Ingreso exitoso reinicia el contador a cero.
5. **[Feliz]** Desbloqueo vía cambio de contraseña LO-31/LO-32.
6. **[Alternativo]** BANCO bloqueado: mensaje orienta a AD / Mesa de Ayuda (coherente LO-30).
7. **[Validación]** Usuario inexistente → MSG-01 sin revelar existencia (RN-07); auditoría de intentos y bloqueo (RN-08).

#### Escenarios BDD
```gherkin
Característica: Bloqueo de la credencial por intentos fallidos
  Como usuario quiero recibir información clara sobre mis intentos fallidos y el
  bloqueo de mi acceso para poder recuperarlo sin ayuda innecesaria.

  Antecedentes:
    Dado estoy en la pantalla de login del Portal de Confirming
    Y la política de bloqueo es de 3 intentos fallidos consecutivos

  Esquema del escenario: Aviso de intentos restantes
    Dado llevo <fallidos> intentos fallidos consecutivos
    Cuando ingreso mi usuario con una contraseña incorrecta
    Entonces veo el mensaje MSG-01 indicando que me quedan <restantes> intentos
    Y permanezco en la pantalla de login

    Ejemplos:
      | fallidos | restantes |
      | 0        | 2         |
      | 1        | 1         |

  Escenario: Bloqueo al tercer intento fallido
    Dado llevo 2 intentos fallidos consecutivos
    Cuando ingreso mi usuario con una contraseña incorrecta por tercera vez
    Entonces Keycloak bloquea mi credencial
    Y el servicio devuelve el estado de contraseña bloqueada
    Y veo el mensaje MSG-02
    Y el formulario de login queda deshabilitado para nuevos intentos con ese usuario
    Y veo el acceso directo a "¿Olvidaste tu contraseña?"

  Escenario: Intento de ingreso con la contraseña correcta estando bloqueado
    Dado mi credencial está bloqueada
    Cuando ingreso mi usuario y mi contraseña correcta
    Entonces no accedo a la plataforma
    Y veo el mensaje MSG-02

  Escenario: El contador se reinicia luego de un ingreso exitoso
    Dado llevo 2 intentos fallidos consecutivos
    Cuando ingreso mis credenciales correctas
    Entonces accedo a la plataforma
    Y el contador de intentos fallidos vuelve a cero

  Escenario: Desbloqueo por cambio de contraseña
    Dado mi credencial está bloqueada
    Cuando completo el flujo de cambio de contraseña de LO-31 o LO-32
    Entonces mi credencial queda desbloqueada
    Y puedo ingresar con la nueva contraseña

  Escenario: Usuario BANCO bloqueado
    Dado mi usuario pertenece al dominio "BANCO"
    Y mi credencial quedó bloqueada por intentos fallidos
    Entonces el mensaje me indica que el desbloqueo se gestiona en el directorio corporativo o con la Mesa de Ayuda

  Escenario: El mensaje no revela si el usuario existe
    Dado ingreso un usuario inexistente con cualquier contraseña
    Cuando confirmo el ingreso
    Entonces veo el mensaje MSG-01
    Y el sistema no informa que el usuario no existe

  Escenario: Registro de auditoría de los intentos
    Dado realizo intentos fallidos de ingreso
    Entonces cada intento queda registrado en auditoría con usuario, fecha/hora, IP y resultado
    Y el bloqueo queda registrado como evento de seguridad
```

#### Fuera de alcance
- Lógica de flag en BFF/Keycloak (LO-35).
- Rate limiting por IP / captcha (R-10).
- Desbloqueo desde ABM (R-05).

#### Notas / preguntas abiertas
- Historia reconstruida a partir del detalle técnico del Excel (igual que v1).

#### Chequeo INVEST
| I | N | V | E | S | T |
|---|---|---|---|---|---|
| ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |

---

## 7. Historias técnicas — Endpoints BFF / BE (enablers)

> Los contratos se toman de las hojas *API REST — BFF (orientada a UI)* y *API REST — Backend dominio (Identity)* del Excel. Todas comparten el patrón de error handling de `assets/funcional_v1.0.0.md` §8.8. Formato tarjeta HT según skill `po-expert-user-stories`.

---

### LO-06 — POST · Envío de mail (Notificaciones existente)

| | |
|---|---|
| **Tipo** | HT (enabler) |
| **Épica** | LOGIN |
| **Habilita** | LO-05 |
| **Contrato** | `POST /v1/auth/welcome-mail/trigger` → BE `POST /internal/v1/notifications/welcome` |
| **Prioridad sugerida** | Must |
| **Depende de** | T-03, T-04 |

#### Objetivo técnico
Orquestar el envío del mail de bienvenida reutilizando el servicio existente de Notificaciones / Mail (MAGIA-62 / MAGIA-133), con reintentos e histórico en Atlas Trade.

#### Criterios de aceptación
1. Ante solicitud válida con ID Template, invoca Notificaciones de Atlas Core, registra histórico `ENVIADO` y responde **202**.
2. Ante error 5xx: estado `PENDIENTE_REINTENTO`, hasta 3 reintentos con backoff; al agotar → `ERROR` con detalle.
3. Solicitud sin destinatario o ID Template → **400** y no invoca Notificaciones.
4. El histórico consultable incluye fecha/hora, template, destinatario, estado y cantidad de reintentos.

#### Escenarios BDD
```gherkin
Característica: Envío de mail desde el BFF con el servicio de notificaciones existente

  Escenario: Envío exitoso
    Dado el BFF recibe la solicitud de envío del mail de bienvenida con el ID Template
    Cuando invoca el servicio existente de Notificaciones de Atlas Core
    Entonces el servicio responde 202 aceptando el envío
    Y el BFF registra la notificación en el histórico de Atlas Trade con estado "ENVIADO"
    Y responde 202 al consumidor

  Escenario: Reintentos ante error transitorio
    Dado el servicio de Notificaciones responde con error 5xx
    Cuando el BFF procesa la respuesta
    Entonces registra la notificación con estado "PENDIENTE_REINTENTO"
    Y reintenta el envío hasta 3 veces con backoff exponencial
    Y si agota los reintentos deja la notificación en estado "ERROR" con el detalle del fallo

  Escenario: Error de datos en la solicitud
    Dado la solicitud no incluye destinatario o ID Template
    Cuando el BFF valida la solicitud
    Entonces responde 400 con el detalle del campo faltante
    Y no invoca al servicio de Notificaciones

  Escenario: Consulta del histórico de notificaciones
    Dado existen notificaciones registradas para un usuario
    Cuando se consulta el histórico
    Entonces se obtiene fecha/hora, template, destinatario, estado y cantidad de reintentos
```

#### Errores esperados
| Código HTTP | Código negocio | Cuándo |
|-------------|----------------|--------|
| 202 | — | Envío aceptado |
| 400 | VALIDATION_ERROR | Falta destinatario o ID Template |
| 5xx (upstream) | — | Dispara reintento; tras agotar → histórico ERROR |

> Detalle fuente Excel: *Se va a utilizar el servicio ya existente Notificaciones / Mail — Envío desde el BFF — Reintentos — Histórico de notificaciones*.

---

### LO-11 — POST · Validar mail/contraseña temporal (flag temporal)

| | |
|---|---|
| **Tipo** | HT (enabler) |
| **Épica** | LOGIN |
| **Habilita** | LO-10 |
| **Contrato** | `POST /v1/auth/first-login` → BE `POST /internal/v1/auth/first-login` |
| **Prioridad sugerida** | Must |
| **Depende de** | — |

#### Objetivo técnico
Validar usuario + contraseña temporal contra Keycloak y devolver `passwordTemporal`, `nextStep` del wizard y canales de actualización habilitados.

#### Criterios de aceptación
1. Credencial temporal vigente → **200** con `passwordTemporal = true`, `nextStep` y canales habilitados.
2. Contraseña incorrecta → **401** con intentos restantes.
3. Temporal vencida → **422** `TEMP_PASSWORD_EXPIRED`.
4. Sin rol → **403** `USER_WITHOUT_ROLE`; bloqueado → **423** `USER_LOCKED`.
5. Datos incompletos → **400** sin consultar Keycloak; Keycloak caído → **503** sin detalles internos.

#### Escenarios BDD
```gherkin
Característica: Validación de credencial temporal con flag de contraseña temporal

  Escenario: Credencial temporal válida
    Dado un usuario con contraseña temporal vigente
    Cuando el FE invoca POST /v1/auth/first-login con usuario y contraseña temporal
    Entonces el BFF valida la credencial contra Keycloak
    Y responde 200 con "passwordTemporal = true" y el nextStep del wizard
    Y devuelve los canales de actualización habilitados para el usuario

  Escenario: Credencial temporal inválida
    Cuando se invoca el endpoint con una contraseña incorrecta
    Entonces responde 401
    Y el cuerpo incluye la cantidad de intentos restantes

  Escenario: Credencial temporal vencida
    Cuando se invoca el endpoint con una contraseña temporal vencida
    Entonces responde 422 con el código de error "TEMP_PASSWORD_EXPIRED"

  Escenario: Usuario sin rol habilitado
    Cuando se invoca el endpoint con un usuario sin rol en el portal
    Entonces responde 403 con el código de error "USER_WITHOUT_ROLE"

  Escenario: Usuario bloqueado
    Cuando se invoca el endpoint con un usuario bloqueado
    Entonces responde 423 con el código de error "USER_LOCKED"

  Escenario: Datos incompletos
    Cuando se invoca el endpoint sin usuario o sin contraseña
    Entonces responde 400 y no consulta a Keycloak

  Escenario: Keycloak no disponible
    Dado Keycloak no responde
    Cuando se invoca el endpoint
    Entonces responde 503
    Y el BFF no expone detalles internos del error
```

#### Errores esperados
| Código HTTP | Código negocio | Cuándo |
|-------------|----------------|--------|
| 200 | — | Temporal válida; body con flag y nextStep |
| 400 | VALIDATION_ERROR | Falta username/password |
| 401 | — | Credencial incorrecta (+ remainingAttempts) |
| 403 | USER_WITHOUT_ROLE | Sin rol en portal |
| 422 | TEMP_PASSWORD_EXPIRED | Temporal vencida |
| 423 | USER_LOCKED | Usuario bloqueado |
| 503 | — | Keycloak no disponible |

> Contrato Excel: Body `{ username, password, domain, passwordChannel }` · Response 200 `{ nextStep, sessionToken }`.

---

### LO-13 — PATCH · Actualizar contraseña ingresada por el usuario

| | |
|---|---|
| **Tipo** | HT (enabler) |
| **Épica** | LOGIN |
| **Habilita** | LO-10 |
| **Contrato** | `PATCH /v1/auth/password` → BE `PATCH /internal/v1/auth/password` |
| **Prioridad sugerida** | Must |
| **Depende de** | — |

#### Objetivo técnico
Actualizar en Keycloak la contraseña definida por el usuario en el primer login, limpiando el flag de contraseña temporal.

#### Criterios de aceptación
1. Actualización exitosa con contraseña válida → **200** `{ "updated": true }` y `passwordTemporal = false`.
2. Política incumplida → **422** con requisitos no cumplidos.
3. Reutilización (últimas 3) → **422** `PASSWORD_REUSE`.
4. Contraseña actual incorrecta → **401** sin modificar.
5. `sessionToken` del wizard vencido → **401** `FIRST_LOGIN_SESSION_EXPIRED`.

#### Escenarios BDD
```gherkin
Característica: Actualización de la contraseña definida por el usuario

  Escenario: Actualización exitosa
    Dado el usuario validó su contraseña temporal
    Cuando invoca el endpoint con la contraseña actual y una nueva contraseña válida
    Entonces el BFF actualiza la credencial en Keycloak
    Y el flag de contraseña temporal queda en false
    Y responde 200 con { "updated": true }

  Escenario: Nueva contraseña que no cumple la política
    Cuando se envía una contraseña que no cumple la política de Keycloak
    Entonces responde 422 con la lista de requisitos no cumplidos

  Escenario: Reutilización de contraseña
    Cuando se envía una contraseña igual a una de las últimas 3 utilizadas
    Entonces responde 422 con el código "PASSWORD_REUSE"

  Escenario: Contraseña actual incorrecta
    Cuando se envía una contraseña actual incorrecta
    Entonces responde 401
    Y no se modifica la credencial

  Escenario: Sesión de primer login inválida
    Dado el sessionToken del wizard está vencido
    Cuando se invoca el endpoint
    Entonces responde 401 con el código "FIRST_LOGIN_SESSION_EXPIRED"
    Y el usuario debe reiniciar el primer login
```

#### Errores esperados
| Código HTTP | Código negocio | Cuándo |
|-------------|----------------|--------|
| 200 | — | Contraseña actualizada |
| 401 | — / FIRST_LOGIN_SESSION_EXPIRED | Actual incorrecta o sesión wizard vencida |
| 422 | PASSWORD_POLICY / PASSWORD_REUSE | Política o reutilización |

> Contrato Excel: Body `{ currentPassword, newPassword, otp }` · Response 200 `{ updated: true }`.

---

### LO-24 — POST · Envío OTP + validación de código

| | |
|---|---|
| **Tipo** | HT (enabler) |
| **Épica** | LOGIN |
| **Habilita** | LO-22, LO-27, LO-31, LO-32 |
| **Contrato** | `POST /v1/auth/mfa/setup`, `POST /v1/auth/mfa/verify` → BE `POST /internal/v1/auth/mfa/enroll`, `POST /internal/v1/auth/mfa/verify` |
| **Prioridad sugerida** | Must |
| **Depende de** | — |

#### Objetivo técnico
Enviar OTP por mail con template distinto al de bienvenida y validar el código (MAGIA-62 / MAGIA-133: flag template OTP + validación desde response).

#### Criterios de aceptación
1. Envío con flag `VALIDACION_OTP`: template OTP, código 6 dígitos / 5 min, almacenado cifrado/hasheado.
2. Validación correcta dentro de vigencia → **200** `{ "verified": true }` e invalidación del código.
3. Incorrecto/vencido/usado → **401** (`OTP_INVALID` / `OTP_EXPIRED` / `OTP_USED`); 3 fallos → **429** `OTP_ATTEMPTS`.
4. Reenvío antes de 60s → **429** con tiempo restante.

#### Escenarios BDD
```gherkin
Característica: Envío y validación del código OTP por mail

  Escenario: Envío con el template de OTP
    Dado se solicita el envío de un código OTP para un usuario
    Cuando el BFF invoca el servicio de Notificaciones con el flag de template "VALIDACION_OTP"
    Entonces el mail se envía con el template de OTP y no con el de bienvenida
    Y el código se genera con 6 dígitos y vigencia de 5 minutos
    Y el código se almacena cifrado o hasheado, nunca en texto plano

  Escenario: Validación exitosa del código
    Cuando el FE invoca la validación con el código correcto dentro de la vigencia
    Entonces el servicio responde 200 con { "verified": true }
    Y el código queda invalidado para nuevos usos

  Esquema del escenario: Validación fallida
    Cuando el FE invoca la validación con un código <condicion>
    Entonces el servicio responde <status> con el código de error "<error>"

    Ejemplos:
      | condicion              | status | error         |
      | incorrecto             | 401    | OTP_INVALID   |
      | vencido                | 401    | OTP_EXPIRED   |
      | ya utilizado           | 401    | OTP_USED      |
      | con 3 fallos previos   | 429    | OTP_ATTEMPTS  |

  Escenario: Cooldown de reenvío
    Cuando se solicita un reenvío antes de 60 segundos del último envío
    Entonces el servicio responde 429 con el tiempo restante
```

#### Errores esperados
| Código HTTP | Código negocio | Cuándo |
|-------------|----------------|--------|
| 200 | — | OTP verificado |
| 401 | OTP_INVALID / OTP_EXPIRED / OTP_USED | Código inválido, vencido o reutilizado |
| 429 | OTP_ATTEMPTS / cooldown | Intentos agotados o reenvío prematuro |

---

### LO-24-a — GET · Mail del usuario *(propuesto)*

| | |
|---|---|
| **Tipo** | HT (enabler) |
| **Épica** | LOGIN |
| **Habilita** | LO-22 |
| **Contrato** | Consulta/actualización del correo de contacto del usuario (fila 30 Excel, sin Issue Key) |
| **Prioridad sugerida** | Must |
| **Depende de** | — |

#### Objetivo técnico
Exponer el correo registrado (enmascarado) para la pantalla de configuración 2FA y permitir actualizar el correo de recepción del OTP.

#### Criterios de aceptación
1. Consulta en primer login → **200** con correo enmascarado + identificador de contacto; no loguear correo completo.
2. Sin correo → **200** con contacto vacío; FE ofrece registrar/corregir antes de OTP.
3. Actualización con formato válido: persiste contacto y OTP se envía al nuevo correo.

#### Escenarios BDD
```gherkin
Característica: Consulta del correo registrado del usuario

  Escenario: Obtención del correo para el flujo de 2FA
    Dado un usuario en flujo de primer login
    Cuando el FE consulta el correo registrado del usuario
    Entonces el servicio responde 200 con el correo enmascarado y un identificador de contacto
    Y no expone el correo completo en logs

  Escenario: Usuario sin correo registrado
    Cuando el FE consulta el correo de un usuario sin correo
    Entonces el servicio responde 200 con contacto vacío
    Y el FE ofrece registrar o corregir el correo antes de enviar el OTP

  Escenario: Actualización del correo de recepción del OTP
    Cuando el usuario informa un correo nuevo con formato válido
    Entonces el servicio actualiza el dato de contacto
    Y el OTP se envía al correo nuevo
```

#### Errores esperados
| Código HTTP | Código negocio | Cuándo |
|-------------|----------------|--------|
| 200 | — | Consulta OK (con o sin contacto) |
| 400 | VALIDATION_ERROR | Formato de correo inválido al actualizar |
| 401 | — | Sesión de primer login inválida |

---

### LO-26 — POST · Validación de credenciales AD / Home / Manual

| | |
|---|---|
| **Tipo** | HT (enabler) |
| **Épica** | LOGIN |
| **Habilita** | LO-07, LO-25, LO-30, LO-31, LO-32 |
| **Contrato** | `POST /v1/auth/login`, `POST /v1/auth/token-exchange` → BE `GET /internal/v1/users/{{id}}/login-policy` |
| **Prioridad sugerida** | Must |
| **Depende de** | — |

#### Objetivo técnico
Iniciar OAuth y token-exchange; Keycloak resuelve el origen de la contraseña (nota Excel: *"Keycloak se encarga de diferenciar dónde buscar la pass"*). Exponer `login-policy` para canales UI.

#### Criterios de aceptación
1. `POST /v1/auth/login` → **200** con `authorizationUrl`, `state`, `codeVerifier`.
2. `POST /v1/auth/token-exchange` → **200** con tokens y `mfaRequired`.
3. Autenticación transparente al origen (AD / HOMEBANKING / MANUAL); FE no envía parámetro de origen.
4. `GET login-policy` responde canales permitidos para mostrar/ocultar Home Banking.
5. Fallo de autenticación → **401** con intentos restantes; mensaje sin enumerar usuarios (RN-07).

#### Escenarios BDD
```gherkin
Característica: Autenticación única con resolución del origen de la credencial en Keycloak

  Escenario: Inicio del flujo OAuth
    Cuando el FE invoca POST /v1/auth/login
    Entonces el BFF responde 200 con authorizationUrl, state y codeVerifier

  Escenario: Intercambio de código por token
    Dado el FE recibió el código de autorización
    Cuando invoca POST /v1/auth/token-exchange
    Entonces el BFF responde 200 con accessToken, refreshToken y el flag mfaRequired

  Esquema del escenario: El origen de la credencial es transparente para el FE
    Dado un usuario cuya contraseña se administra en "<origen>"
    Cuando se autentica con usuario y contraseña
    Entonces Keycloak resuelve el federated provider correspondiente
    Y el FE no envía ningún parámetro que indique el origen

    Ejemplos:
      | origen        |
      | AD            |
      | HOMEBANKING   |
      | MANUAL        |

  Escenario: Consulta de la política de login del usuario
    Cuando el BE recibe GET /internal/v1/users/{id}/login-policy
    Entonces responde con los canales permitidos (AD, HB, manual) del usuario
    Y el FE usa esa respuesta para mostrar u ocultar la opción de Home Banking

  Escenario: Credenciales inválidas
    Cuando la autenticación falla
    Entonces el BFF responde 401 con el contador de intentos restantes
    Y el mensaje no distingue entre usuario inexistente y contraseña incorrecta
```

#### Errores esperados
| Código HTTP | Código negocio | Cuándo |
|-------------|----------------|--------|
| 200 | — | Login iniciado / token exchanged / policy OK |
| 401 | — | Credenciales inválidas (+ remainingAttempts) |
| 403 | USER_WITHOUT_ROLE / disabled | Usuario sin permisos o dado de baja |

---

### LO-28 — POST · Validación de 2FA

| | |
|---|---|
| **Tipo** | HT (enabler) |
| **Épica** | LOGIN |
| **Habilita** | LO-27 |
| **Contrato** | `POST /v1/auth/mfa/verify` → BE `POST /internal/v1/auth/mfa/verify` |
| **Prioridad sugerida** | Must |
| **Depende de** | — |

#### Objetivo técnico
Validar el segundo factor en accesos posteriores, opcionalmente registrando dispositivo confiable (`trustDevice`).

#### Criterios de aceptación
1. Código correcto + `trustDevice = true` → **200** `verified = true` + `deviceId` y registro en `DISPOSITIVO_CONFIABLE`.
2. Código correcto + `trustDevice = false` → **200** sin registrar dispositivo.
3. Dispositivo confiable vigente sin cierre explícito → `mfaRequired = false`.
4. Tras cierre explícito, aun con dispositivo confiable → `mfaRequired = true` (RN-06).
5. Código incorrecto → **401** `OTP_INVALID` + intentos restantes.

#### Escenarios BDD
```gherkin
Característica: Validación del segundo factor en el acceso

  Escenario: Validación exitosa con registro de dispositivo confiable
    Cuando el FE invoca la validación con el código correcto y trustDevice = true
    Entonces el servicio responde 200 con verified = true y el deviceId generado
    Y registra el dispositivo en DISPOSITIVO_CONFIABLE asociado al usuario

  Escenario: Validación exitosa sin registrar el dispositivo
    Cuando el FE invoca la validación con trustDevice = false
    Entonces el servicio responde 200 con verified = true
    Y no registra ningún dispositivo confiable

  Escenario: Dispositivo confiable vigente
    Dado el usuario tiene un dispositivo confiable vigente
    Y no cerró sesión explícitamente
    Cuando se autentica con usuario y contraseña
    Entonces el flag mfaRequired se devuelve en false

  Escenario: Doble factor exigido luego de cerrar sesión
    Dado el usuario cerró sesión explícitamente
    Cuando se autentica nuevamente desde un dispositivo confiable
    Entonces el flag mfaRequired se devuelve en true

  Escenario: Código inválido
    Cuando el FE invoca la validación con un código incorrecto
    Entonces responde 401 con el código de error "OTP_INVALID" y los intentos restantes
```

#### Errores esperados
| Código HTTP | Código negocio | Cuándo |
|-------------|----------------|--------|
| 200 | — | OTP verificado (+ deviceId opcional) |
| 401 | OTP_INVALID / OTP_EXPIRED / OTP_USED | Código inválido |
| 429 | OTP_ATTEMPTS | Intentos agotados |

> Contrato Excel: Body `{ otp, trustDevice }` · Response 200 `{ verified: true, deviceId }`.

---

### LO-29-a — Cookie de sesión en el inicio de sesión *(propuesto)*

| | |
|---|---|
| **Tipo** | HT (enabler) |
| **Épica** | LOGIN |
| **Habilita** | LO-29 |
| **Contrato** | Emisión/renovación/invalidación de cookie de sesión en el validador de login (fila 36 Excel, sin Issue Key) |
| **Prioridad sugerida** | Must |
| **Depende de** | — |

#### Objetivo técnico
Emitir cookie de sesión (HttpOnly, Secure, SameSite) al completar autenticación + 2FA, con vigencia de 5 minutos de inactividad, renovación por actividad e invalidación en logout.

#### Criterios de aceptación
1. Tras autenticación y 2FA, BFF emite cookie con atributos de seguridad y vigencia de inactividad 5 min.
2. Llamada al BFF antes de expirar renueva la vigencia.
3. Cookie inválida/vencida en endpoint protegido → **401**; FE redirige a login.
4. Cierre de sesión invalida cookie y sesión en Keycloak.

#### Escenarios BDD
```gherkin
Característica: Emisión de la cookie de sesión en el inicio de sesión

  Escenario: Emisión de la cookie al autenticar
    Cuando el usuario completa la autenticación y el doble factor
    Entonces el BFF emite la cookie de sesión con los atributos HttpOnly, Secure y SameSite
    Y la cookie tiene una vigencia de 5 minutos de inactividad

  Escenario: Renovación de la cookie por actividad
    Dado el usuario tiene una sesión activa
    Cuando realiza una llamada al BFF antes de que expire la cookie
    Entonces la vigencia de la cookie se renueva

  Escenario: Cookie inválida o vencida
    Dado la cookie de sesión está vencida o fue invalidada
    Cuando el FE invoca cualquier endpoint protegido
    Entonces el BFF responde 401
    Y el FE redirige a la pantalla de login

  Escenario: Cierre de sesión
    Cuando el usuario cierra sesión
    Entonces el BFF invalida la cookie y la sesión en Keycloak
```

#### Errores esperados
| Código HTTP | Código negocio | Cuándo |
|-------------|----------------|--------|
| 200 | — | Sesión emitida / renovada |
| 401 | SESSION_EXPIRED / INVALID_COOKIE | Cookie inválida o vencida |

---

### LO-33 — PATCH/POST · Cambio de contraseña (forgot + update)

| | |
|---|---|
| **Tipo** | HT (enabler) |
| **Épica** | LOGIN |
| **Habilita** | LO-30, LO-31, LO-32 |
| **Contrato** | `PATCH /v1/auth/password`, `POST /v1/auth/password/forgot` → BE `PATCH /internal/v1/auth/password` |
| **Prioridad sugerida** | Must |
| **Depende de** | — |

#### Objetivo técnico
Resolver la acción de recupero según dominio (`REDIRECT_AD` / `CHOOSE_CHANNEL` / `OTP_SENT`) y aplicar el cambio de contraseña con OTP, liberando bloqueos.

#### Criterios de aceptación
1. `POST /password/forgot` responde **200** con `action` según dominio: BANCO→`REDIRECT_AD`; EGP/PROVEEDOR CLIENTE→`CHOOSE_CHANNEL`; PROVEEDOR NO CLIENTE→`OTP_SENT`.
2. Usuario inexistente → **200** genérico sin enviar código (RN-07).
3. `PATCH /password` con newPassword + otp válidos → **200** `updated: true`, libera bloqueo y reinicia contador.
4. OTP inválido → **401** sin modificar credencial.
5. Más de 5 solicitudes de recupero/hora → **429**.

#### Escenarios BDD
```gherkin
Característica: Cambio de contraseña iniciado por el usuario

  Esquema del escenario: Resolución de la acción según el dominio del usuario
    Cuando el FE invoca POST /v1/auth/password/forgot para un usuario de dominio "<dominio>"
    Entonces el BFF responde 200 con action = "<action>"

    Ejemplos:
      | dominio              | action         |
      | BANCO                | REDIRECT_AD    |
      | EGP                  | CHOOSE_CHANNEL |
      | PROVEEDOR CLIENTE    | CHOOSE_CHANNEL |
      | PROVEEDOR NO CLIENTE | OTP_SENT       |

  Escenario: Respuesta uniforme para usuarios inexistentes
    Cuando el FE invoca el endpoint con un usuario inexistente
    Entonces el BFF responde 200 con un mensaje genérico
    Y no envía ningún código

  Escenario: Cambio de contraseña con OTP válido
    Cuando el FE invoca PATCH /v1/auth/password con newPassword y otp válidos
    Entonces el BFF actualiza la credencial y responde 200 con { "updated": true }
    Y libera el bloqueo de la cuenta si estaba bloqueada
    Y reinicia el contador de intentos fallidos

  Escenario: OTP inválido en el cambio de contraseña
    Cuando el FE invoca el endpoint con un otp inválido
    Entonces responde 401 y no modifica la credencial

  Escenario: Límite de solicitudes de recupero
    Cuando un mismo usuario solicita el recupero más de 5 veces en una hora
    Entonces el BFF responde 429
```

#### Errores esperados
| Código HTTP | Código negocio | Cuándo |
|-------------|----------------|--------|
| 200 | — | Acción resuelta / contraseña actualizada |
| 401 | OTP_INVALID | OTP inválido en PATCH |
| 422 | PASSWORD_POLICY / PASSWORD_REUSE | Política o reutilización |
| 429 | RATE_LIMIT | Exceso de solicitudes de recupero |

> Contrato Excel forgot: Body `{ username, domain }` · Response 200 `{ action, message }`.

---

### LO-35 — POST · Validación de pass + flag de estado

| | |
|---|---|
| **Tipo** | HT (enabler) |
| **Épica** | LOGIN |
| **Habilita** | LO-34 |
| **Contrato** | Validación de contraseña / actualización de flag de estado (Keycloak + BFF) |
| **Prioridad sugerida** | Must |
| **Depende de** | — |

#### Objetivo técnico
Responder al FE los intentos restantes y actualizar el flag de estado de la credencial (incluye bloqueo a los 3 intentos).

#### Criterios de aceptación
1. Intento fallido con intentos disponibles → **401** con `remainingAttempts`; incrementa contador en Keycloak.
2. Tercer fallo → Keycloak bloquea; flag `BLOQUEADA`; responde **423** `USER_LOCKED`.
3. Consulta de estado autenticada → ACTIVA / TEMPORAL / EXPIRADA / BLOQUEADA + fecha último cambio.
4. Login exitoso reinicia contador a cero.
5. Errores no informan existencia del usuario ni hash/fragmentos de contraseña (RN-07).

#### Escenarios BDD
```gherkin
Característica: Validación de contraseña con actualización del estado de la credencial

  Escenario: Intento fallido con intentos disponibles
    Cuando el FE invoca la validación de contraseña con credenciales incorrectas
    Entonces el servicio responde 401
    Y el cuerpo incluye "remainingAttempts" con los intentos restantes
    Y el contador de intentos fallidos se incrementa en Keycloak

  Escenario: Bloqueo al alcanzar el máximo de intentos
    Dado el usuario acumula 2 intentos fallidos
    Cuando falla el tercer intento
    Entonces Keycloak bloquea la credencial
    Y el servicio actualiza el flag de estado de contraseña a "BLOQUEADA"
    Y responde 423 con el código de error "USER_LOCKED"

  Escenario: Consulta del estado de la credencial
    Cuando el FE consulta el estado de la credencial de un usuario autenticado
    Entonces obtiene el estado (ACTIVA, TEMPORAL, EXPIRADA, BLOQUEADA) y la fecha del último cambio

  Escenario: Reinicio del contador ante login exitoso
    Dado el usuario tenía intentos fallidos acumulados
    Cuando se autentica correctamente
    Entonces el contador de intentos fallidos se reinicia en cero

  Escenario: No exposición de información sensible
    Entonces las respuestas de error no informan si el usuario existe
    Y no incluyen el hash ni fragmentos de la contraseña
```

#### Errores esperados
| Código HTTP | Código negocio | Cuándo |
|-------------|----------------|--------|
| 401 | — | Credencial incorrecta (+ remainingAttempts) |
| 423 | USER_LOCKED | Bloqueo por intentos (RN-04) |

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

- [ ] Objetivo y valor expresados en formato Como / quiero / para (tarjeta de backlog).
- [ ] Criterios de aceptación numerados (binarios) con tags de camino, referenciando MSG/RN.
- [ ] Escenarios BDD en Gherkin (español), alineados a los AC.
- [ ] Mensajes de UI identificados (§5) y validados con UX.
- [ ] Contrato de endpoints identificado (§7) y acordado con el equipo técnico.
- [ ] Dependencias y spikes bloqueantes resueltos o acotados.
- [ ] Diseño o pantalla de referencia disponible (POC).
- [ ] Chequeo INVEST completo (o spike marcado si falla).
- [ ] Historia estimada por el equipo.

**Definition of Done (por historia)**

- [ ] Todos los criterios de aceptación verificados en demo (sí/no).
- [ ] Escenarios BDD verificados (manual o automatizado).
- [ ] Validaciones de formulario y mensajes de error implementados según §5.
- [ ] Eventos de auditoría registrados (RN-08).
- [ ] Sin datos sensibles en logs ni en respuestas de error (RN-07, RN-10).
- [ ] Probado en los dominios que aplica (BANCO / EGP / PROVEEDOR CLIENTE / PROVEEDOR NO CLIENTE).
- [ ] Accesible por teclado y con contraste suficiente en las pantallas afectadas.
- [ ] Documentación funcional y matriz de trazabilidad actualizadas.
