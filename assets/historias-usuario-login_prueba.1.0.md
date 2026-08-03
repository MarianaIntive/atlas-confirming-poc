# Historias de Usuario — Épica LOGIN (prueba.1.0)

> **Versión:** prueba.1.0 · **Fecha:** 2026-08-03
> **Fuente única de requerimientos:** `login (3) (1).xlsx` (únicamente este archivo).
> **Hojas usadas:** `LOGIN` (fuente de verdad de keys y alcance), `Matriz de trazabilidad`, `API REST — Backend dominio (Identity)`, `API REST — BFF (orientada a UI)`.
> **Método:** skill `po-expert-user-stories` — análisis y redacción **desde cero**; no se reutilizó contenido de versiones previas del repositorio.
> **Producto:** Portal de Confirming (Atlas Trade)

---

## Tabla de contenidos

1. [Criterio de elaboración y alcance](#1-criterio-de-elaboración-y-alcance)
2. [Matriz de inclusión / desestimación](#2-matriz-de-inclusión--desestimación)
3. [Actores, dominios y supuestos](#3-actores-dominios-y-supuestos)
4. [Reglas de negocio transversales (RN)](#4-reglas-de-negocio-transversales-rn)
5. [Catálogo de mensajes de UI (MSG)](#5-catálogo-de-mensajes-de-ui-msg)
6. [Historias de usuario funcionales](#6-historias-de-usuario-funcionales)
7. [Historias técnicas (enablers)](#7-historias-técnicas-enablers)
8. [Tareas técnicas / habilitadores](#8-tareas-técnicas--habilitadores)
9. [Spikes y decisiones pendientes](#9-spikes-y-decisiones-pendientes)
10. [Recomendaciones del PO (no están en el Excel)](#10-recomendaciones-del-po-no-están-en-el-excel)
11. [Observaciones de consistencia del Excel](#11-observaciones-de-consistencia-del-excel)
12. [Matriz de trazabilidad HU ↔ endpoint](#12-matriz-de-trazabilidad-hu--endpoint)
13. [Definition of Ready / Definition of Done](#13-definition-of-ready--definition-of-done)

---

## 1. Criterio de elaboración y alcance

| Criterio | Decisión |
|----------|----------|
| **Input** | Solo `login (3) (1).xlsx`. Ningún otro documento del repo se usó como fuente. |
| **Filas tachadas** | Desestimadas (strikethrough en Issue Key y/o Summary). Quedan registradas en §2. |
| **Filas vivas** | Se elaboran HU / HT / TAREA según tipo y contenido de OBJETIVO / ESCENARIOS. |
| **Keys** | Se conservan los `LO-xx` de la hoja LOGIN. Filas sin key reciben key propuesto `LO-NN-a`. |
| **Endpoints** | Tomados de las hojas API REST del mismo Excel. La hoja Matriz usa otra numeración LO (ver §11). |
| **Alcance faltante** | Va a §10 Recomendaciones; no se mezcla con lo comprometido. |
| **Formato** | Tarjeta PO: metadatos + Como/quiero/para + AC numerados + Gherkin en español + INVEST. |

**Tipos**

| Tipo | Significado |
|------|-------------|
| `HU-FE` | Valor en pantalla / flujo de usuario |
| `HU-BE` | Valor vía backend / notificación sin pantalla propia |
| `HT` | Enabler de endpoint BFF/BE |
| `TAREA` | Infraestructura o configuración |

---

## 2. Matriz de inclusión / desestimación

Hoja `LOGIN`, filas 3–42. Estado según strikethrough del Excel.

| Fila | Key | Summary | Tipo elaborado | Estado | Motivo |
|-----:|-----|---------|----------------|--------|--------|
| 3 | LO-01 | Implementar servicio OAuth | TAREA | ✅ Incluida | §8 |
| 4 | ~~LO-02~~ | ~~Estructura DER LOGIN~~ | — | ❌ Desestimada | Tachada en Excel |
| 5 | XX | Configuración de ente Open-API Atlas | TAREA | ✅ Incluida | §8 |
| 6 | — | Atlas Core - Atlas Trade configuración de servicios de mail | TAREA | ✅ Incluida | §8 |
| 7 | — | SPEC CORE | TAREA | ✅ Incluida | §8 |
| 8 | ~~LO-03~~ | ~~Mail Bienvenida - Login usuarios BANCO~~ | — | ❌ Desestimada | Tachada. Duda viva: «Ya está resuelto por Keycloak» |
| 9 | ~~LO-04~~ | ~~EP POST BE - Envio de mail~~ | — | ❌ Desestimada | Tachada; capacidad absorbida por LO-06 |
| 10 | **LO-05** | Mail Bienvenida - Login usuarios EGP/PROVEEDOR | HU-BE | ✅ Historia elaborada | §6 |
| 11 | **LO-06** | EP POST BE - Envio de mail | HT | ✅ Historia elaborada | §7 |
| 12 | **LO-07** | PANTALLA LOGIN - Primer Login BANCO | HU-FE | ✅ Historia elaborada | §6 |
| 13 | ~~LO-08~~ | ~~EP GET BFF / BE - Validar mail/contraseña temporal contra Keycloak~~ | — | ❌ Desestimada | Tachada. BANCO no usa contraseña temporal |
| 14 | ~~LO-09~~ | ~~EP POST BFF / BE - Actualizar contraseña integrada al AD~~ | — | ❌ Desestimada | Tachada. Cambio de pass BANCO fuera del portal (AD) |
| 15 | **LO-10** | PANTALLA LOGIN - Primer Login EGP/PROVEEDOR CLIENTE/PROVEEDOR NO CLIEN | HU-FE | ✅ Historia elaborada | §6 |
| 16 | **LO-11** | EP GET BFF / BE - Validar mail/contraseña temporal contra Keycloak (re | HT | ✅ Historia elaborada | §7 |
| 17 | ~~LO-12~~ | ~~EP POST BFF / BE - Actualizar contraseña integrada al homebanking~~ | — | ❌ Desestimada | Summary tachado. Impacta canal Home Banking de LO-10 |
| 18 | **LO-13** | EP POST BFF / BE - Actualizar contraseña ingresada por el usuario | HT | ✅ Historia elaborada | §7 |
| 19 | ~~LO-14~~ | ~~PANTALLA LOGIN - Primer Login PROVEEDOR - CLIENTE~~ | — | ❌ Desestimada | Tachada; unificada en LO-10 |
| 20 | ~~LO-15~~ | ~~EP GET BFF / BE - Validar mail/contraseña temporal contra Keycloak?~~ | — | ❌ Desestimada | Tachada; absorbida por LO-11 |
| 21 | ~~LO-16~~ | ~~EP POST BFF / BE - Actualizar contraseña integrada al homebanking~~ | — | ❌ Desestimada | Tachada |
| 22 | ~~LO-17~~ | ~~EP POST BFF / BE - Actualizar contraseña ingresada por el usuario~~ | — | ❌ Desestimada | Tachada; absorbida por LO-13 |
| 23 | ~~LO-18~~ | ~~PANTALLA LOGIN - Primer Login PROVEEDOR - NO CLIENTE~~ | — | ❌ Desestimada | Tachada; unificada en LO-10 |
| 24 | ~~LO-19~~ | ~~EP GET BFF / BE - Validar mail/contraseña temporal contra Keycloak?~~ | — | ❌ Desestimada | Tachada; absorbida por LO-11 |
| 25 | ~~LO-20~~ | ~~EP POST BFF / BE - Actualizar contraseña ingresada por el usuario~~ | — | ❌ Desestimada | Tachada; absorbida por LO-13 |
| 26 | ~~LO-21~~ | ~~Doble Autenticación - Configuración primer login BANCO~~ | — | ❌ Desestimada | Tachada. 2FA BANCO lo provee el AD (LO-07) |
| 27 | **LO-22** | Doble Autenticación - Configuración primer login EGP/PROVEEDOR CLIENTE | HU-FE | ✅ Historia elaborada | §6 |
| 28 | ~~LO-23~~ | ~~Doble Autenticación - Configuración primer login ~~ | — | ❌ Desestimada | Tachada; absorbida por LO-22 |
| 29 | **LO-24** | EP POST BE - Envio de mail (con diferente template flag= validacion OT | HT | ✅ Historia elaborada | §7 |
| 30 | **LO-24-a *(propuesto)*** | EP GET BFF/BE - Mail del usuario | HT | ✅ Historia elaborada | §7 (sin Issue Key) |
| 31 | **LO-25** | PANTALLA LOGIN - Acceso próximo login password | HU-FE | ✅ Historia elaborada | §6 |
| 32 | **LO-26** | EP GET BFF-  Validación de credenciales AD/Home/Manual | HT | ✅ Historia elaborada | §7 |
| 33 | **LO-27** | Doble Autenticación - Acceso próximos login | HU-FE | ✅ Historia elaborada | §6 |
| 34 | **LO-28** | EP GET BFF -  Validación de 2FA | HT | ✅ Historia elaborada | §7 |
| 35 | **LO-29** | Cierre de sesión automático por inactividad | HU-FE | ✅ Historia elaborada | §6 |
| 36 | **LO-29-a *(propuesto)*** | EP validador del inicio de sesión envia tambien el cookie | HT | ✅ Historia elaborada | §7 (sin Issue Key) |
| 37 | **LO-30** | Cambio de contraseña /  Desbloqueo de contraseña - BANCO | HU-FE | ✅ Historia elaborada | §6 |
| 38 | **LO-31** | Cambio de contraseña /  Desbloqueo de contraseña - EGP/PROVEEDOR homeb | HU-FE | ✅ Historia elaborada | §6 |
| 39 | **LO-32** | Cambio de contraseña /  Desbloqueo de contraseña - EGP/PROVEEDOR pass  | HU-FE | ✅ Historia elaborada | §6 |
| 40 | **LO-33** | EP PATCH BFF -  Cambio de contraseña | HT | ✅ Historia elaborada | §7 |
| 41 | **LO-34** | Bloqueo de contraseña n intentos FE | HU-FE | ✅ Historia elaborada | §6 |
| 42 | **LO-35** | EP POST Validación de pass (responde al FE y actualiza el flag de stat | HT | ✅ Historia elaborada | §7 |

**Resumen (hoja LOGIN):** 40 filas con contenido → **18 desestimadas** · **11 HU** · **10 HT** · **4 TAREA**.

---

## 3. Actores, dominios y supuestos

### 3.1 Dominios inferidos del Excel

| Dominio | Evidencia en Excel | Credencial | 2FA | Recupero de contraseña |
|---------|-------------------|------------|-----|------------------------|
| **BANCO** | LO-07, LO-21 (desest.), LO-25 esc.1, LO-30 | AD | Del AD (LO-07; spike S-01) | Aviso: actualizar en AD (LO-30) |
| **EGP** | LO-05, LO-10, LO-22, LO-31/32 | Temporal por mail → propia | OTP mail en primer login (LO-22) | Home Banking o manual (LO-31/32) |
| **PROVEEDOR CLIENTE** | LO-10 (unifica), LO-14 desest. | Ídem EGP | Ídem EGP | Home Banking o manual |
| **PROVEEDOR NO CLIENTE** | LO-10 (unifica), LO-18 desest. | Ídem EGP | Ídem EGP | Manual (sin HB en filas desest. de primer login) |

### 3.2 Componentes citados en el Excel

- Keycloak (OAuth LO-01; validación de pass; bloqueo; flag temporal).
- BFF Identity / Login (endpoints hoja API BFF).
- BE Identity `/internal/v1/**` (hoja API Backend).
- Atlas Core — Notificaciones / Mail (servicio **ya existente**, LO-06).
- Atlas Trade — ID Template e histórico de notificaciones (LO-05/LO-06).
- Active Directory (BANCO).
- Home Banking (canal de actualización; endpoint LO-12 tachado).

### 3.3 Supuestos derivados solo del Excel

| ID | Supuesto | Fuente |
|----|----------|--------|
| SUP-01 | Keycloak decide dónde buscar la contraseña (AD/Home/Manual). | LO-26 escenarios |
| SUP-02 | El mail de bienvenida se dispara en el alta (BFF ABM → welcome-mail). | API BFF welcome-mail |
| SUP-03 | Histórico de notificaciones en Atlas Trade. | LO-06 dudas |
| SUP-04 | Sesión basada en cookie FE; cookie inválida → login. | LO-29 dudas |
| SUP-05 | Bloqueo a 3 intentos en Keycloak; BFF actualiza flag; FE muestra error. | LO-34 |

---

## 4. Reglas de negocio transversales (RN)

| ID | Regla | Fuente Excel |
|----|-------|--------------|
| **RN-01** | Si la validación responde flag de contraseña temporal, el usuario **debe** cambiarla antes de usar la plataforma. | LO-10, LO-11 |
| **RN-02** | Bloqueo tras **3 intentos** fallidos de contraseña (Keycloak + flag BFF). | LO-34 |
| **RN-03** | Inactividad: **5 minutos**; warning **1 minuto antes**; extensión o cierre. | LO-29 dudas |
| **RN-04** | Tras cerrar sesión, el 2FA se pide **siempre** en el próximo acceso (EGP/Proveedor). | LO-27 dudas |
| **RN-05** | El origen de la contraseña (AD / Home Banking / Manual) es transparente para el FE; lo resuelve Keycloak. | LO-26 |
| **RN-06** | Mail de bienvenida y OTP usan el servicio existente de Notificaciones/Mail (Core), con reintentos e histórico. | LO-06, LO-24 |
| **RN-07** *(propuesta PO)* | Errores de login no deben enumerar usuarios (mismo mensaje si no existe o pass incorrecta). | Buena práctica; no está en Excel → validar |
| **RN-08** *(propuesta PO)* | Política de complejidad de contraseña nueva a acordar con Seguridad (no detallada en Excel). | Gap → S-04 |
| **RN-09** *(propuesta PO)* | OTP: 6 dígitos, vigencia corta, reintentos/reenvío limitados (Excel no fija valores). | LO-22; valores a confirmar |

---

## 5. Catálogo de mensajes de UI (MSG)

Textos **propuestos** a partir de escenarios del Excel (el Excel casi no fija copy). Validar con UX.

| Código | Contexto | Mensaje propuesto |
|--------|----------|-------------------|
| MSG-01 | Credenciales inválidas | «Usuario o contraseña incorrectos. Te quedan {n} intentos.» |
| MSG-02 | Cuenta bloqueada (RN-02) | «Tu acceso fue bloqueado por 3 intentos fallidos. Usá «Olvidé mi contraseña» o contactá a Mesa de Ayuda.» |
| MSG-03 | Pass temporal / primer login | «Debés actualizar tu contraseña temporal para continuar.» |
| MSG-04 | OTP enviado (LO-22) | «Te enviamos un correo a {mailEnmascarado}.» |
| MSG-05 | OTP incorrecto | «El código ingresado no es correcto.» |
| MSG-06 | Warning inactividad (RN-03) | «Tu sesión está por cerrarse por inactividad. ¿Querés continuar?» |
| MSG-07 | Sesión cerrada por inactividad | «Cerramos tu sesión por inactividad.» |
| MSG-08 | Cambio pass BANCO (LO-30) | «Debés actualizar tu contraseña desde el directorio corporativo (AD).» |
| MSG-09 | Canal HB o manual (LO-31) | «Podés actualizarla desde Home Banking o continuar y cambiarla manualmente.» |
| MSG-10 | Error de servicio | «No pudimos procesar tu solicitud. Intentá nuevamente.» |
| MSG-11 | 2FA configurado | «Configuramos la verificación en dos pasos.» |
| MSG-12 | Política de contraseña | «La contraseña no cumple los requisitos de seguridad.» |

---

## 6. Historias de usuario funcionales

> AC numerados = fuente de verdad. Gherkin en español. Escenarios fuente = transcripción literal del Excel.

### LO-05 — Mail de bienvenida EGP / PROVEEDOR

| | |
|---|---|
| **Tipo** | HU-BE |
| **Épica** | LOGIN |
| **Actor** | Usuario EGP o Proveedor dado de alta |
| **Dominios** | EGP, PROVEEDOR CLIENTE, PROVEEDOR NO CLIENTE |
| **Prioridad sugerida** | Must |
| **Depende de** | LO-06, T-03, T-04 |
| **Habilita** | LO-10 |
| **Pantalla** | N/A (correo) |

#### Historia
```
Como usuario con dominio/rol dado de alta en la plataforma
quiero recibir un mail de bienvenida
para obtener la información para loguearme en la plataforma
```

#### Valor de negocio
Sin el mail con usuario y contraseña temporal, el externo no puede iniciar el primer acceso.

#### Escenarios fuente
> Transcripción literal del Excel:

```text
-El sistema envía un correo al usuario, con link de acceso, usuario/contraseña temporal
---BD Atlas Trade se guarda el ID Template
---Servicio de Notificaciones de Core envía el mail
--BD Atlas Core se guarda template
```

#### Criterios de aceptación
1. **[Feliz]** Al autorizar el alta de un usuario EGP/PROVEEDOR, se envía mail con link, usuario y contraseña temporal (RN-01, RN-06).
2. **[Feliz]** El envío usa ID Template en Atlas Trade y template en Atlas Core vía Notificaciones.
3. **[Feliz]** Queda registro en histórico de notificaciones Atlas Trade.
4. **[Alternativo]** BANCO no recibe este mail con temporal (LO-03 desestimada; nota Excel: resuelto por Keycloak/AD).
5. **[Error]** Si Notificaciones falla, se reintenta según LO-06 sin revertir el alta.

#### Escenarios BDD
```gherkin
Característica: Mail de bienvenida EGP/Proveedor
  Antecedentes:
    Dado existe template de bienvenida en Atlas Core
    Y Atlas Trade tiene el ID Template registrado
  Esquema del escenario: Envío al autorizar alta
    Dado un usuario del dominio "<dominio>" con correo válido
    Cuando se autoriza el alta
    Entonces se invoca el servicio de Notificaciones
    Y el usuario recibe link, usuario y contraseña temporal
    Y se registra la notificación en Atlas Trade
    Ejemplos:
      | dominio |
      | EGP |
      | PROVEEDOR CLIENTE |
      | PROVEEDOR NO CLIENTE |
  Escenario: Falla del servicio de mail
    Cuando Notificaciones responde error
    Entonces se aplica política de reintentos de LO-06
    Y el alta del usuario no se revierte
```

#### Fuera de alcance
- Mail de bienvenida BANCO (LO-03 desestimada).
- Diseño visual del template.

#### Notas / preguntas abiertas
- Vigencia de la temporal no está en el Excel (S-05).

#### Chequeo INVEST
| I | N | V | E | S | T |
|---|---|---|---|---|---|
| ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |

---

### LO-07 — Primer login BANCO con AD

| | |
|---|---|
| **Tipo** | HU-FE |
| **Épica** | LOGIN |
| **Actor** | Usuario interno BANCO |
| **Dominios** | BANCO |
| **Prioridad sugerida** | Must |
| **Depende de** | LO-01, LO-26, S-01 |
| **Habilita** | Acceso BANCO |
| **Pantalla** | Pantalla Login (primer acceso BANCO) |

#### Historia
```
Como usuario con dominio/rol que me habilita a ingresar a la plataforma de Confirming
quiero ingresar a la plataforma con mis credenciales de AD
para loguearme en la plataforma
```

#### Valor de negocio
Habilita operadores del banco con identidad corporativa, sin contraseña local del portal.

#### Escenarios fuente
> Transcripción literal del Excel:

```text
-Al loguearse se recibe la Autenticacion del doble factor desde el AD
```

#### Criterios de aceptación
1. **[Feliz]** Usuario BANCO habilitado autentica con AD y completa 2FA del AD; accede con su rol.
2. **[Feliz]** No se le pide crear contraseña en el portal.
3. **[Error]** 2FA AD rechazado/no completado → no accede; MSG-10; vuelve a login.
4. **[Error]** Credenciales AD incorrectas → MSG-01 e intentos (RN-02).
5. **[Error]** Sin rol Confirming → denegado con mensaje de permisos.
6. **[Validación]** Usuario/contraseña vacíos → no envía; validación de obligatorio.

#### Escenarios BDD
```gherkin
Característica: Primer login BANCO
  Antecedentes:
    Dado estoy en la pantalla de login
    Y mi usuario es dominio BANCO habilitado
  Escenario: Ingreso exitoso con AD y 2FA del AD
    Cuando ingreso usuario y contraseña de AD y confirmo
    Entonces se valida contra AD federado en Keycloak
    Y completo el doble factor del AD
    Entonces accedo a la plataforma
  Escenario: 2FA del AD no completado
    Cuando no completo el 2FA del AD
    Entonces no accedo
    Y veo MSG-10
  Escenario: Credenciales incorrectas
    Cuando ingreso contraseña incorrecta
    Entonces veo MSG-01 con intentos restantes
```

#### Fuera de alcance
- Configurar 2FA en el portal para BANCO (LO-21 desestimada).
- Actualizar pass AD dentro del portal.

#### Notas / preguntas abiertas
- **S-01:** spike de investigación del 2FA del AD (columna DUDAS).

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
| **Pantalla** | Pantalla Login — primer acceso con temporal |

#### Historia
```
Como usuario con dominio/rol que me habilita a ingresar a la plataforma de Confirming
quiero poder introducir el usuario y contraseña recibidos por mail
para loguearme en la plataforma y actualizar la contraseña mediante homebanking o generando una nueva contraseña
```

#### Valor de negocio
Convierte la temporal del mail en credencial definitiva y completa el onboarding externo.

#### Escenarios fuente
> Transcripción literal del Excel:

```text
-El sistema ejecuta el flujo de primer login, valida contraseña temporal, usuario y rol (en la respuesta del servicio se envía un flag que marca a la pass como contraseña temporal para obligar al usuario a cambiarla)
-El sistema ejecuta el flujo de actualización de contraseña temporal integrando al homebanking
-El sitema ejecuta el flujo de actuaización manual de contraseña
```

#### Criterios de aceptación
1. **[Feliz]** Con usuario+temporal válidos, el servicio marca pass temporal (RN-01) y el FE obliga el cambio (MSG-03).
2. **[Feliz]** Canal manual: el usuario define nueva contraseña vía LO-13 y continúa a LO-22.
3. **[Alternativo]** Canal Home Banking: el Excel lo pide, pero **LO-12 está tachado**. En esta entrega el canal se trata como **derivación informativa** (el usuario actualiza fuera y vuelve); integración plena = R-01 + S-02.
4. **[Error]** Temporal inválida/vencida → no continúa; ofrece reintento/reenvío según LO-05/LO-06.
5. **[Error]** Credenciales incorrectas → MSG-01 / RN-02.
6. **[Validación]** Campos vacíos → no envía.

#### Escenarios BDD
```gherkin
Característica: Primer login EGP/Proveedor
  Antecedentes:
    Dado recibí mail de bienvenida con usuario y contraseña temporal
    Y estoy en la pantalla de login
  Escenario: Temporal válida obliga cambio
    Cuando ingreso usuario y contraseña temporal válidos
    Entonces la respuesta indica flag de contraseña temporal
    Y veo MSG-03
    Y no puedo entrar a la plataforma sin actualizar la contraseña
  Escenario: Actualización manual
    Dado debo cambiar la contraseña temporal
    Cuando elijo generar una nueva contraseña y la confirmo válida
    Entonces se actualiza vía LO-13
    Y continúo al flujo de configuración 2FA (LO-22)
  Escenario: Opción Home Banking sin endpoint (LO-12 tachado)
    Cuando elijo Home Banking
    Entonces se informa que debo actualizarla allí y volver a ingresar
    Y no se invoca un endpoint de integración HB (desestimado)
```

#### Fuera de alcance
- Endpoints HB LO-12/LO-16 (tachados).
- HU separadas LO-14/LO-18 (tachadas; unificadas aquí).

#### Notas / preguntas abiertas
- **S-02:** cuándo ofrecer integración HB (3 opciones en DUDAS de LO-10).
- Alerta: objetivo menciona HB pero LO-12 está tachado.

#### Chequeo INVEST
| I | N | V | E | S | T |
|---|---|---|---|---|---|
| ⚠️ | ✅ | ✅ | ⚠️ | ✅ | ✅ |

---

### LO-22 — Configuración 2FA en primer login EGP/PROVEEDOR

| | |
|---|---|
| **Tipo** | HU-FE |
| **Épica** | LOGIN |
| **Actor** | Usuario EGP/PROVEEDOR que ya cambió su contraseña |
| **Dominios** | EGP, PROVEEDOR CLIENTE, PROVEEDOR NO CLIENTE |
| **Prioridad sugerida** | Must |
| **Depende de** | LO-10, LO-24, LO-24-a |
| **Habilita** | LO-25 |
| **Pantalla** | Flujo 2FA post cambio de contraseña |

#### Historia
```
Como usuario EGP/PROVEEDOR que está realizando el primer login y que ya cambió su pass
quiero configurar 2FA
para completar el flujo de login
```

#### Valor de negocio
Cierra el primer acceso con un segundo factor antes de operar en la plataforma.

#### Escenarios fuente
> Transcripción literal del Excel:

```text
-Al finalizar la actualización de contraseña el sistema ejecuta el flujo de configuración de 2FA
--Valida datos del usuario (mail): msj "te enviamos un correo a xxx@aaa" y la opcion de cambiarlo para la recepción del OTP
--Se envía notificaciónOTP  por mail
--Recibe el código OTP
--Ingresa el código OTP en la plataforma 
-Validación del codigo ingresa vs el enviado por mail
--Finaliza la configuracion de 2FA
```

#### Criterios de aceptación
1. **[Feliz]** Tras cambiar la pass, inicia setup 2FA: muestra mail (MSG-04) con opción de cambiarlo (LO-24-a).
2. **[Feliz]** Se envía OTP por mail (LO-24 / RN-06); el usuario lo ingresa; si coincide, 2FA queda configurado (MSG-11) y puede entrar.
3. **[Error]** Código incorrecto → MSG-05; no finaliza 2FA.
4. **[Alternativo]** Usuario cambia mail de recepción antes del envío; OTP va al nuevo correo.
5. **[Error]** Falla envío OTP → MSG-10; permite reintento según LO-24.

#### Escenarios BDD
```gherkin
Característica: Configuración 2FA primer login
  Antecedentes:
    Dado ya actualicé mi contraseña temporal
  Escenario: Configuración exitosa con OTP mail
    Cuando inicia el flujo 2FA
    Entonces veo MSG-04 con opción de cambiar el correo
    Cuando confirmo el envío e ingreso el OTP correcto
    Entonces la configuración 2FA finaliza
    Y veo MSG-11
  Escenario: OTP incorrecto
    Cuando ingreso un código incorrecto
    Entonces veo MSG-05
    Y la configuración no finaliza
```

#### Fuera de alcance
- 2FA primer login BANCO (LO-21 desestimada).
- TOTP con QR: la API BFF devuelve qrUri/secret pero el escenario Excel describe OTP mail → R-02.

#### Notas / preguntas abiertas
- Parámetros OTP (largo, vigencia, reintentos) no están en Excel → RN-09 / S-04.

#### Chequeo INVEST
| I | N | V | E | S | T |
|---|---|---|---|---|---|
| ✅ | ✅ | ✅ | ⚠️ | ✅ | ✅ |

---

### LO-25 — Login recurrente con contraseña

| | |
|---|---|
| **Tipo** | HU-FE |
| **Épica** | LOGIN |
| **Actor** | Usuario que finalizó su primer login |
| **Dominios** | BANCO, EGP, PROVEEDOR CLIENTE, PROVEEDOR NO CLIENTE |
| **Prioridad sugerida** | Must |
| **Depende de** | LO-01, LO-26 |
| **Habilita** | LO-27 |
| **Pantalla** | Pantalla Login — accesos siguientes |

#### Historia
```
Como usuario de la plataforma que finalizó su primer login
quiero ingresar a la plataforma con las nuevas credenciales
para acceder y utilizar la plataforma
```

#### Valor de negocio
Es el acceso diario; debe autenticar sin importar el origen de la contraseña.

#### Escenarios fuente
> Transcripción literal del Excel:

```text
1-El sistema ejecuta el flujo de login y autentica credenciales AD
2-El sistema ejecuta el flujo de login y autentica credenciales homebanking
3-El sistema ejecuta el flujo de login y autentica credenciales configuradas manualmente
```

#### Criterios de aceptación
1. **[Feliz]** Usuario con pass AD / Home Banking / Manual autentica vía LO-26; Keycloak resuelve el origen (RN-05).
2. **[Feliz]** Si corresponde 2FA (LO-27), se exige antes de entrar.
3. **[Error]** Credenciales inválidas → MSG-01; contador RN-02.
4. **[Error]** Usuario bloqueado → MSG-02 (LO-34).
5. **[Validación]** Campos vacíos → no envía.

#### Escenarios BDD
```gherkin
Característica: Login recurrente
  Antecedentes:
    Dado finalicé mi primer login
    Y estoy en la pantalla de login
  Esquema del escenario: Autenticación según origen de credencial
    Dado mi contraseña se administra en "<origen>"
    Cuando ingreso usuario y contraseña válidos
    Entonces Keycloak autentica sin que el FE indique el origen
    Ejemplos:
      | origen |
      | AD |
      | homebanking |
      | manual |
  Escenario: Credenciales inválidas
    Cuando ingreso contraseña incorrecta
    Entonces veo MSG-01
```

#### Fuera de alcance
- Primer login / cambio de temporal (LO-10).
- Detalle del desafío 2FA (LO-27).

#### Notas / preguntas abiertas
- El FE no selecciona el provider (RN-05).

#### Chequeo INVEST
| I | N | V | E | S | T |
|---|---|---|---|---|---|
| ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |

---

### LO-27 — 2FA en accesos posteriores + dispositivo seguro

| | |
|---|---|
| **Tipo** | HU-FE |
| **Épica** | LOGIN |
| **Actor** | Usuario que finalizó primer login |
| **Dominios** | BANCO (según S-01), EGP, PROVEEDOR |
| **Prioridad sugerida** | Must |
| **Depende de** | LO-25, LO-28 |
| **Habilita** | Acceso a plataforma |
| **Pantalla** | Desafío 2FA post-login |

#### Historia
```
Como usuario de la plataforma que finalizó su primer login
quiero validar doble autenticación y registrar dispositivo como seguro
para acceder y utilizar la plataforma
```

#### Valor de negocio
Protege accesos siguientes y permite recordar dispositivo confiable.

#### Escenarios fuente
> Transcripción literal del Excel:

```text
1-El sistema pide la ejecución de la doble autenticación para validar el login
```

#### Criterios de aceptación
1. **[Feliz]** Tras autenticar pass, se solicita 2FA; con código válido accede (LO-28).
2. **[Feliz]** Puede marcar dispositivo como seguro; queda registrado según contrato `trustDevice`.
3. **[Alternativo]** EGP/Proveedor: 2FA **siempre** después de cerrar sesión (RN-04 / DUDAS Excel).
4. **[Alternativo]** BANCO: depende del resultado del spike AD (S-01 / DUDAS).
5. **[Error]** Código inválido → MSG-05; no accede.

#### Escenarios BDD
```gherkin
Característica: 2FA en próximos logins
  Antecedentes:
    Dado ya finalicé el primer login
    Y me autentiqué con usuario y contraseña
  Escenario: 2FA exitoso con dispositivo confiable
    Cuando ingreso el código correcto y marco dispositivo seguro
    Entonces accedo a la plataforma
    Y el dispositivo queda registrado
  Escenario: Tras cerrar sesión se vuelve a pedir 2FA
    Dado cerré sesión
    Cuando vuelvo a autenticarme
    Entonces se solicita nuevamente el 2FA
```

#### Fuera de alcance
- Enrolamiento inicial 2FA (LO-22).
- Política AD para BANCO pendiente S-01.

#### Notas / preguntas abiertas
- DUDAS Excel: spike BANCO AD/AUTH; EGP/Proveedor = siempre al cerrar sesión.

#### Chequeo INVEST
| I | N | V | E | S | T |
|---|---|---|---|---|---|
| ✅ | ✅ | ✅ | ⚠️ | ✅ | ✅ |

---

### LO-29 — Cierre de sesión por inactividad

| | |
|---|---|
| **Tipo** | HU-FE |
| **Épica** | LOGIN |
| **Actor** | Usuario logueado |
| **Dominios** | Todos |
| **Prioridad sugerida** | Must |
| **Depende de** | LO-29-a |
| **Habilita** | Protección de sesión |
| **Pantalla** | Sesión autenticada (warning de inactividad) |

#### Historia
```
Como usuario logueado en la plataforma
quiero que se cierre la sesión automáticamente luego de n minutos
para proteger la información sensible que gestiono en la plataforma
```

#### Valor de negocio
Reduce riesgo de exposición en puestos desatendidos.

#### Escenarios fuente
> Transcripción literal del Excel:

```text
1-El sistema mostrará un warning de cierre de sesión para permitirle al usuario extender la sesión
2-El sistema extiende la sesión ante la confirmación
3-El sistema cierra la sesión ante la no confirmación
```

#### Criterios de aceptación
1. **[Feliz]** A los 4 min de inactividad (1 min antes del cierre a 5 min, RN-03) se muestra MSG-06.
2. **[Feliz]** Si confirma, se extiende la sesión (renueva cookie).
3. **[Feliz]** Si no confirma / vence el tiempo, se cierra sesión y ve MSG-07; vuelve a login.
4. **[Error]** Cookie inválida en cualquier momento → redirección a login (DUDAS Excel).

#### Escenarios BDD
```gherkin
Característica: Cierre por inactividad
  Antecedentes:
    Dado estoy logueado
    Y la inactividad máxima es 5 minutos
  Escenario: Warning y extensión
    Cuando transcurren 4 minutos sin actividad
    Entonces veo MSG-06
    Cuando confirmo continuar
    Entonces la sesión se extiende
  Escenario: Cierre sin confirmación
    Cuando no confirmo antes del vencimiento
    Entonces la sesión se cierra
    Y veo MSG-07
    Y vuelvo al login
  Escenario: Cookie inválida
    Cuando la cookie de sesión es inválida
    Entonces vuelvo al login
```

#### Fuera de alcance
- Logout manual explícito (no está en Excel → R-03).

#### Notas / preguntas abiertas
- Tiempos tomados de DUDAS LO-29 (5 min / 1 min antes).
- Basado en cookies FE + validador LO-29-a.

#### Chequeo INVEST
| I | N | V | E | S | T |
|---|---|---|---|---|---|
| ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |

---

### LO-30 — Cambio / desbloqueo de contraseña — BANCO

| | |
|---|---|
| **Tipo** | HU-FE |
| **Épica** | LOGIN |
| **Actor** | Usuario BANCO que olvidó o tiene pass expirada |
| **Dominios** | BANCO |
| **Prioridad sugerida** | Must |
| **Depende de** | LO-26, LO-33 |
| **Habilita** | Volver a login AD |
| **Pantalla** | Flujo «olvidé / expiró contraseña» BANCO |

#### Historia
```
Como usuario que intenta loguearse en la plataforma y olvido o expiro su contraseña
quiero cambiar la contraseña de mi cuenta
para poder loguearme a la plataforma
```

#### Valor de negocio
Evita fricción inútil: el portal no gestiona el secreto AD, solo orienta.

#### Escenarios fuente
> Transcripción literal del Excel:

```text
1-El sistema mostrará un warning de que debe actualizarlo desde el AD
```

#### Criterios de aceptación
1. **[Feliz]** En recupero BANCO, el sistema muestra MSG-08 (actualizar en AD) y no ofrece cambio local.
2. **[Feliz]** `POST /v1/auth/password/forgot` responde acción `REDIRECT_AD` (hoja API).
3. **[Validación]** No se envía mail de reset de portal para BANCO.

#### Escenarios BDD
```gherkin
Característica: Recupero de contraseña BANCO
  Escenario: Aviso de actualización en AD
    Dado soy usuario BANCO
    Cuando solicito cambiar u olvidé mi contraseña
    Entonces veo MSG-08
    Y no se inicia un flujo de nueva contraseña en el portal
```

#### Fuera de alcance
- Reset de contraseña AD dentro del portal.
- Desbloqueo administrativo (R-05).

#### Notas / preguntas abiertas
- Alineado a LO-09 tachado (no hay update pass AD vía BFF).

#### Chequeo INVEST
| I | N | V | E | S | T |
|---|---|---|---|---|---|
| ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |

---

### LO-31 — Cambio / desbloqueo — EGP/PROVEEDOR con Home Banking

| | |
|---|---|
| **Tipo** | HU-FE |
| **Épica** | LOGIN |
| **Actor** | Usuario EGP/Proveedor con canal Home Banking |
| **Dominios** | EGP, PROVEEDOR CLIENTE |
| **Prioridad sugerida** | Must |
| **Depende de** | LO-33, LO-24 |
| **Habilita** | Login con nueva pass |
| **Pantalla** | Flujo olvido/expiración — elección de canal |

#### Historia
```
Como usuario que intenta loguearse en la plataforma y olvido o expiro su contraseña
quiero cambiar la contraseña de mi cuenta
para poder loguearme a la plataforma
```

#### Valor de negocio
Ofrece al cliente bancarizado dos caminos de recupero sin bloquear el acceso.

#### Escenarios fuente
> Transcripción literal del Excel:

```text
1-El sistema mostrará un warning de que puede actualizarlo desde homebanking o si desea continuar cambiar la contraseña manualmente
```

#### Criterios de aceptación
1. **[Feliz]** Se muestra MSG-09 con opción Home Banking o continuar manual (LO-32).
2. **[Feliz]** Forgot responde `CHOOSE_CHANNEL` (API BFF).
3. **[Alternativo]** Home Banking: misma salvedad que LO-10 (LO-12 tachado) → derivación informativa + R-01.
4. **[Feliz]** Si elige manual, continúa al flujo de LO-32.

#### Escenarios BDD
```gherkin
Característica: Recupero con opción Home Banking
  Escenario: Elección de canal
    Dado soy EGP o Proveedor cliente
    Cuando inicio olvido/expiración de contraseña
    Entonces veo MSG-09
    Y puedo elegir Home Banking o cambio manual
```

#### Fuera de alcance
- Integración técnica HB (LO-12 tachado).

#### Notas / preguntas abiertas
- Depende de S-02 para el momento de ofrecer HB.

#### Chequeo INVEST
| I | N | V | E | S | T |
|---|---|---|---|---|---|
| ⚠️ | ✅ | ✅ | ⚠️ | ✅ | ✅ |

---

### LO-32 — Cambio / desbloqueo — EGP/PROVEEDOR pass manual

| | |
|---|---|
| **Tipo** | HU-FE |
| **Épica** | LOGIN |
| **Actor** | Usuario EGP/Proveedor en cambio manual |
| **Dominios** | EGP, PROVEEDOR CLIENTE, PROVEEDOR NO CLIENTE |
| **Prioridad sugerida** | Must |
| **Depende de** | LO-33, LO-24 |
| **Habilita** | Login con nueva pass |
| **Pantalla** | Flujo de cambio de contraseña manual |

#### Historia
```
Como usuario que intenta loguearse en la plataforma y olvido o expiro su contraseña
quiero cambiar la contraseña de mi cuenta
para poder loguearme a la plataforma
```

#### Valor de negocio
Permite recuperar acceso cuando no hay (o no se usa) Home Banking.

#### Escenarios fuente
> Transcripción literal del Excel:

```text
1-El sistema muestra el flujo de cambio de contraseña
```

#### Criterios de aceptación
1. **[Feliz]** Se muestra el flujo de cambio (nueva pass + verificación OTP según API `otp`).
2. **[Feliz]** `PATCH /v1/auth/password` con datos válidos → `updated: true`; puede volver a loguearse.
3. **[Error]** OTP/política inválidos → no cambia; MSG-05 / MSG-12.
4. **[Feliz]** Si estaba bloqueado (LO-34), el cambio exitoso habilita nuevo intento de login.

#### Escenarios BDD
```gherkin
Característica: Cambio manual de contraseña
  Escenario: Cambio exitoso
    Cuando completo el flujo de cambio de contraseña con OTP válido
    Entonces la contraseña se actualiza
    Y puedo loguearme con la nueva contraseña
  Escenario: OTP inválido
    Cuando envío un OTP incorrecto
    Entonces la contraseña no cambia
    Y veo MSG-05
```

#### Fuera de alcance
- Cambio desde Mi Perfil estando logueado (R-08).
- Política formal RN-08/S-04.

#### Notas / preguntas abiertas
- Proveedor no cliente: forgot → `OTP_SENT` según API.

#### Chequeo INVEST
| I | N | V | E | S | T |
|---|---|---|---|---|---|
| ✅ | ✅ | ✅ | ⚠️ | ✅ | ✅ |

---

### LO-34 — Bloqueo por intentos fallidos (FE)

| | |
|---|---|
| **Tipo** | HU-FE |
| **Épica** | LOGIN |
| **Actor** | Usuario que falla el login reiteradamente |
| **Dominios** | Todos los que autentican pass vía portal |
| **Prioridad sugerida** | Must |
| **Depende de** | LO-35 |
| **Habilita** | Recupero LO-30/31/32 |
| **Pantalla** | Login con contador / pantalla bloqueado |

#### Historia
```
Como usuario de la plataforma
quiero que mi acceso se bloquee tras reiterados intentos fallidos
para proteger mi cuenta de uso indebido
```

#### Valor de negocio
El Excel define el comportamiento de bloqueo; se expresa como valor de seguridad para el usuario y el banco.

#### Escenarios fuente
> Transcripción literal del Excel:

```text
En N intentos (3 intentos) se bloquea a nivel BFF en keycloak
-POST Login al BFF falla
-se actualiza el flag actualizado de pass bloqueada al BFF
-FE muestra msj de error
```

#### Criterios de aceptación
1. **[Feliz/Seguridad]** Al 3er intento fallido consecutivo, Keycloak bloquea; BFF actualiza flag; FE muestra MSG-02 (RN-02).
2. **[Alternativo]** En intentos 1–2, POST login falla y FE muestra MSG-01 con restantes (LO-35).
3. **[Error]** Usuario ya bloqueado que intenta login → MSG-02 sin revelar más datos (RN-07).

#### Escenarios BDD
```gherkin
Característica: Bloqueo por intentos
  Escenario: Tercer intento fallido
    Dado acumulo 2 intentos fallidos
    Cuando fallo el tercero
    Entonces el login responde fallo de bloqueo
    Y el FE muestra MSG-02
  Escenario: Intentos previos
    Cuando fallo el primer o segundo intento
    Entonces veo MSG-01 con intentos restantes
```

#### Fuera de alcance
- Desbloqueo por Mesa de Ayuda (R-05).
- Definición de ventana de reset del contador (no está en Excel).

#### Notas / preguntas abiertas
- Historia expresada a partir del OBJETIVO técnico del Excel (no traía Connextra).

#### Chequeo INVEST
| I | N | V | E | S | T |
|---|---|---|---|---|---|
| ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |

---


## 7. Historias técnicas (enablers)

### LO-06 — POST · Envío de mail (bienvenida)

| | |
|---|---|
| **Tipo** | HT (enabler) |
| **Épica** | LOGIN |
| **Habilita** | LO-05 |
| **Contrato** | `POST /v1/auth/welcome-mail/trigger` → BE `POST /internal/v1/notifications/welcome` |

#### Objetivo técnico
Usar el servicio existente Notificaciones/Mail (MAGIA-62 / MAGIA-133): envío desde BFF, reintentos e histórico en Atlas Trade.

#### Criterios de aceptación
1. BFF dispara envío al servicio existente de Notificaciones (no se construye mailer nuevo).
2. Persiste histórico en Atlas Trade (enviado / reintento).
3. Soporta reintentos ante falla transitoria.
4. Puede invocarse desde ABM para alta/reenvío.

#### Escenarios BDD
```gherkin
Característica: Envío mail bienvenida
  Escenario: Trigger exitoso
    Cuando el BFF invoca welcome-mail/trigger para un usuario EGP/Proveedor
    Entonces Core Notificaciones envía el mail
    Y Atlas Trade registra el histórico
  Escenario: Reintento
    Dado el primer intento falla
    Cuando corre la política de reintentos
    Entonces se reintenta el envío y se actualiza el histórico
```

#### Errores esperados
| Código HTTP | Código negocio | Cuándo |
|-------------|----------------|--------|
| 200 | — | Envío aceptado |
| 502/503 | NOTIFICATION_UNAVAILABLE | Core no disponible |
| 422 | TEMPLATE_MISSING | Falta ID Template |

---

### LO-11 — Validar usuario/temporal contra Keycloak (flag temporal)

| | |
|---|---|
| **Tipo** | HT (enabler) |
| **Épica** | LOGIN |
| **Habilita** | LO-10 |
| **Contrato** | `POST /v1/auth/first-login` → BE `POST /internal/v1/auth/first-login` (Excel dice GET; API del Excel lo define como POST) |

#### Objetivo técnico
Validar mail/usuario y contraseña temporal en Keycloak devolviendo flag de pass temporal para forzar cambio.

#### Criterios de aceptación
1. Credencial temporal válida → 200 con indicación de pass temporal / `nextStep` de wizard.
2. Credencial inválida → 401.
3. Usuario sin permiso → 403.
4. Respuesta habilita al FE a bloquear acceso hasta cambiar pass (RN-01).

#### Escenarios BDD
```gherkin
Característica: Validación primer login
  Escenario: Temporal válida
    Cuando el FE envía usuario y contraseña temporal válidos
    Entonces responde 200 con nextStep y señal de pass temporal
  Escenario: Inválida
    Cuando las credenciales no coinciden
    Entonces responde 401
```

#### Errores esperados
| Código HTTP | Código negocio | Cuándo |
|-------------|----------------|--------|
| 200 | — | OK + nextStep |
| 401 | — | Credenciales inválidas |
| 403 | — | Sin rol |
| 422 | — | Datos inválidos |

---

### LO-13 — POST · Actualizar contraseña ingresada por el usuario

| | |
|---|---|
| **Tipo** | HT (enabler) |
| **Épica** | LOGIN |
| **Habilita** | LO-10, LO-32 |
| **Contrato** | `PATCH /v1/auth/password` → `PATCH /internal/v1/auth/password` |

#### Objetivo técnico
Persistir la nueva contraseña definida por el usuario (canal manual) en Keycloak.

#### Criterios de aceptación
1. Body con newPassword (+ otp si aplica) válido → 200 `{ updated: true }`.
2. Rechaza contraseña que viole política → 422.
3. No expone la contraseña en logs ni respuesta.

#### Escenarios BDD
```gherkin
Característica: Update password manual
  Escenario: Actualización OK
    Cuando invoco PATCH /v1/auth/password con nueva contraseña válida
    Entonces respondo 200 con updated true
```

#### Errores esperados
| Código HTTP | Código negocio | Cuándo |
|-------------|----------------|--------|
| 200 | — | Actualizada |
| 401 | OTP_INVALID | OTP inválido |
| 422 | PASSWORD_POLICY | No cumple política |

---

### LO-24 — POST · Mail OTP + validación de código

| | |
|---|---|
| **Tipo** | HT (enabler) |
| **Épica** | LOGIN |
| **Habilita** | LO-22, LO-27, LO-32 |
| **Contrato** | Envío OTP vía Notificaciones (template distinto a bienvenida) + validación del código en response / `POST /v1/auth/mfa/verify` |

#### Objetivo técnico
Enviar OTP con template de validación y validar el código ingresado (MAGIA-62 / MAGIA-133).

#### Criterios de aceptación
1. Envío OTP usa template distinto al de bienvenida (flag/template de validación).
2. Código correcto → verificado e invalidado para reuso.
3. Código incorrecto/vencido → error controlado al FE.

#### Escenarios BDD
```gherkin
Característica: OTP mail
  Escenario: Envío y validación OK
    Cuando se solicita OTP de validación
    Entonces se envía mail con template OTP
    Cuando el FE envía el código correcto
    Entonces la validación es exitosa
```

#### Errores esperados
| Código HTTP | Código negocio | Cuándo |
|-------------|----------------|--------|
| 200 | — | OTP ok |
| 401 | OTP_INVALID | Código incorrecto |
| 401 | OTP_EXPIRED | Vencido |

---

### LO-24-a *(propuesto)* — GET/PATCH · Mail del usuario

| | |
|---|---|
| **Tipo** | HT (enabler) |
| **Épica** | LOGIN |
| **Habilita** | LO-22 |
| **Contrato** | Consulta/actualización del mail de recepción OTP (fila 30 Excel, sin Issue Key) |

#### Objetivo técnico
Exponer el mail del usuario para el mensaje de LO-22 y permitir cambiarlo antes de enviar el OTP.

#### Criterios de aceptación
1. Devuelve mail (preferible enmascarado) para mostrar MSG-04.
2. Permite actualizar el mail de recepción usado en el envío OTP.

#### Escenarios BDD
```gherkin
Característica: Mail del usuario
  Escenario: Lectura para 2FA
    Cuando el FE consulta el mail del usuario en primer login
    Entonces obtiene el dato para mostrar MSG-04
```

#### Errores esperados
| Código HTTP | Código negocio | Cuándo |
|-------------|----------------|--------|
| 200 | — | OK |
| 400 | VALIDATION_ERROR | Mail inválido |

---

### LO-26 — Validación de credenciales AD / Home / Manual

| | |
|---|---|
| **Tipo** | HT (enabler) |
| **Épica** | LOGIN |
| **Habilita** | LO-07, LO-25, LO-30, LO-31, LO-32 |
| **Contrato** | `POST /v1/auth/login` + `POST /v1/auth/token-exchange`; BE `GET /internal/v1/users/{id}/login-policy` |

#### Objetivo técnico
Autenticar sin que el FE elija el origen; Keycloak diferencia dónde buscar la pass. Exponer login-policy (canales).

#### Criterios de aceptación
1. `POST /login` → authorizationUrl/state/codeVerifier.
2. `POST /token-exchange` → tokens + `mfaRequired`.
3. `login-policy` indica canales AD/HB/manual permitidos.
4. Fallo de auth → 401 + intentos restantes.

#### Escenarios BDD
```gherkin
Característica: Login unificado
  Escenario: Keycloak resuelve el origen
    Dado usuarios con pass en AD, Home Banking o Manual
    Cuando se autentican
    Entonces Keycloak resuelve el provider
    Y el FE no envía el origen
```

#### Errores esperados
| Código HTTP | Código negocio | Cuándo |
|-------------|----------------|--------|
| 200 | — | OK |
| 401 | — | Credenciales inválidas |
| 403 | — | Sin permisos |

---

### LO-28 — Validación de 2FA

| | |
|---|---|
| **Tipo** | HT (enabler) |
| **Épica** | LOGIN |
| **Habilita** | LO-27 |
| **Contrato** | `POST /v1/auth/mfa/verify` → `POST /internal/v1/auth/mfa/verify` |

#### Objetivo técnico
Validar segundo factor y opcionalmente registrar dispositivo confiable (`trustDevice`).

#### Criterios de aceptación
1. OTP correcto + trustDevice true → 200 verified + deviceId.
2. OTP incorrecto → 401.
3. Tras logout, mfaRequired vuelve a true (RN-04).

#### Escenarios BDD
```gherkin
Característica: Verify 2FA
  Escenario: OK con dispositivo
    Cuando verifico OTP correcto con trustDevice true
    Entonces verified true y se registra deviceId
```

#### Errores esperados
| Código HTTP | Código negocio | Cuándo |
|-------------|----------------|--------|
| 200 | — | OK |
| 401 | OTP_INVALID | OTP inválido |

---

### LO-29-a *(propuesto)* — Cookie en validador de inicio de sesión

| | |
|---|---|
| **Tipo** | HT (enabler) |
| **Épica** | LOGIN |
| **Habilita** | LO-29 |
| **Contrato** | El validador de inicio de sesión también emite/renueva la cookie (fila 36, sin Issue Key) |

#### Objetivo técnico
Emitir cookie de sesión usada por el FE para controlar inactividad (DUDAS LO-29).

#### Criterios de aceptación
1. Tras login (+2FA si aplica) se emite cookie de sesión.
2. Actividad renueva vigencia; cookie inválida → 401 y FE a login.
3. Logout/inactividad invalidan la cookie.

#### Escenarios BDD
```gherkin
Característica: Cookie de sesión
  Escenario: Emisión
    Cuando el usuario completa el login
    Entonces el validador envía también la cookie de sesión
```

#### Errores esperados
| Código HTTP | Código negocio | Cuándo |
|-------------|----------------|--------|
| 200 | — | Sesión OK |
| 401 | SESSION_EXPIRED | Cookie inválida |

---

### LO-33 — PATCH · Cambio de contraseña / forgot

| | |
|---|---|
| **Tipo** | HT (enabler) |
| **Épica** | LOGIN |
| **Habilita** | LO-30, LO-31, LO-32 |
| **Contrato** | `PATCH /v1/auth/password` + `POST /v1/auth/password/forgot` |

#### Objetivo técnico
Resolver acción de recupero por dominio y aplicar cambio de contraseña.

#### Criterios de aceptación
1. Forgot BANCO → `REDIRECT_AD`.
2. Forgot EGP/Proveedor cliente → `CHOOSE_CHANNEL`.
3. Forgot Proveedor no cliente → `OTP_SENT`.
4. PATCH válido → `{ updated: true }`.

#### Escenarios BDD
```gherkin
Característica: Forgot/change password API
  Esquema del escenario: Acción por dominio
    Cuando invoco password/forgot para "<dominio>"
    Entonces action = "<action>"
    Ejemplos:
      | dominio | action |
      | BANCO | REDIRECT_AD |
      | EGP | CHOOSE_CHANNEL |
      | PROVEEDOR CLIENTE | CHOOSE_CHANNEL |
      | PROVEEDOR NO CLIENTE | OTP_SENT |
```

#### Errores esperados
| Código HTTP | Código negocio | Cuándo |
|-------------|----------------|--------|
| 200 | — | OK |
| 401 | OTP_INVALID | OTP inválido |
| 422 | PASSWORD_POLICY | Política |

---

### LO-35 — POST · Validación de pass + flag de status

| | |
|---|---|
| **Tipo** | HT (enabler) |
| **Épica** | LOGIN |
| **Habilita** | LO-34 |
| **Contrato** | POST de validación de pass (login) que responde al FE y actualiza flag de status |

#### Objetivo técnico
Devolver resultado al FE e actualizar flag (incl. bloqueada) alineado a Keycloak.

#### Criterios de aceptación
1. Fallo con intentos restantes → 401 + remainingAttempts.
2. Al 3er fallo → flag bloqueada + respuesta de bloqueo al FE.
3. Éxito → reinicia contador / status activo.

#### Escenarios BDD
```gherkin
Característica: Flag de status de pass
  Escenario: Actualiza flag al bloquear
    Cuando ocurre el tercer fallo
    Entonces se actualiza el flag de pass bloqueada
    Y el FE puede mostrar MSG-02
```

#### Errores esperados
| Código HTTP | Código negocio | Cuándo |
|-------------|----------------|--------|
| 401 | — | Fallido |
| 423 | USER_LOCKED | Bloqueado |

---

## 8. Tareas técnicas / habilitadores

| ID | Key Excel | Tarea | Objetivo (Excel) | DoD sugerido |
|----|-----------|-------|------------------|--------------|
| **T-01** | LO-01 | Implementar servicio OAuth | Implementación OAuth para login | Realm/clients Keycloak, Authorization Code + PKCE, federación AD operable en desarrollo |
| **T-02** | XX | Configuración ente Open-API Atlas | Generar JWT; conexión a BFF OAuth | JWT válido; conectividad BFF ↔ Open API Atlas verificada |
| **T-03** | — (fila 6) | Configuración servicios de mail Atlas Core / Trade | Implementación del servicio de mail | Templates bienvenida/OTP en Core; ID Template en Trade; envío de prueba OK |
| **T-04** | — (fila 7) | SPEC CORE | Alta/baja ente Trade como cliente Atlas; permisos ente notificaciones | Ente Trade creado; permisos notificaciones verificados con llamada real |

---

## 9. Spikes y decisiones pendientes

Extraídos de la columna **DUDAS** del Excel (y gaps bloqueantes evidentes).

| ID | Origen | Pregunta | Impacto | Propuesta PO |
|----|--------|----------|---------|--------------|
| **S-01** | LO-07, LO-27 | Spike 2FA del AD / relación AD y AUTH | Diseño login BANCO | Timeboxear antes de estimar LO-07/LO-27 BANCO |
| **S-02** | LO-10 | ¿Cuándo ofrecer integración Home Banking? (1) primer login (2) Mi Perfil (3) segundo login / cambio pass | Alcance LO-10/LO-31; LO-12 tachado | Preferir (2) para menor complejidad en 1er release |
| **S-03** | LO-27 | Frecuencia 2FA EGP/Proveedor | UX/seguridad | Excel ya decide: **siempre al cerrar sesión** (RN-04). Confirmar TTL dispositivo seguro |
| **S-04** | Gap | Política formal de contraseñas y parámetros OTP | LO-10/22/32 | Acordar con Seguridad (RN-08/RN-09) |
| **S-05** | LO-05 | Vigencia de contraseña temporal | Onboarding | Definir (ej. 72 h) y comportamiento al vencer |
| **S-06** | LO-29 | ¿Misma inactividad para todos los dominios? | Cookie/FE | Usar 5 min globales salvo excepción de Seguridad |

---

## 10. Recomendaciones del PO (no están en el Excel)

> No forman parte del alcance comprometido del Excel.

| ID | Recomendación | Por qué | Prioridad |
|----|---------------|---------|-----------|
| **R-01** | Endpoint/flujo real de actualización integrada a Home Banking | LO-10/LO-31 lo piden; LO-12/LO-16 tachados | Alta |
| **R-02** | Definir si 2FA es OTP mail o TOTP (qrUri/secret en API) | Contradicción escenarios vs contrato API | Alta |
| **R-03** | Logout manual | RN-04 depende de «cerrar sesión» y no hay HU | Alta |
| **R-04** | Auditoría de INTENTO_LOGIN / SESION_AUDIT | Aparecen en matriz; sin historia de qué se registra | Alta |
| **R-05** | Desbloqueo desde ABM / Mesa de Ayuda | Bloqueo LO-34 sin herramienta de desbloqueo | Alta |
| **R-06** | Expiración periódica de pass + aviso | LO-30..32 mencionan expirada sin regla de vigencia | Media |
| **R-07** | Gestión/revocación de dispositivos confiables | LO-27 crea dispositivo seguro sin administración | Media |
| **R-08** | Cambio de pass desde sesión autenticada (Mi Perfil) | Solo hay recupero desde login | Media |
| **R-09** | Rate limiting / anti-automatización en login | RN-02 no basta ante fuerza bruta distribuida | Media |
| **R-10** | Formalizar keys de filas 6, 7, 30, 36 | Hoy sin Issue Key | Baja |

---

## 11. Observaciones de consistencia del Excel

1. **Doble numeración LO:** hoja LOGIN usa LO-01…LO-35; hoja Matriz usa LO-01…LO-16 con otro significado. **Fuente de verdad de keys = LOGIN.**
2. **Matriz incluye capacidades tachadas** en LOGIN (mail BANCO, 2FA BANCO, variantes Proveedor separadas).
3. **Home Banking** pedido en LO-10/LO-31 pero endpoints LO-12/LO-16 tachados.
4. **2FA:** escenarios = OTP mail; API `mfa/setup` = `qrUri`/`secret` (TOTP).
5. **Métodos HTTP:** LO-11/LO-26 dicen GET; hoja API los define como POST de autenticación.
6. **Filas sin Issue Key:** 6, 7, 30, 36 → T-03, T-04, LO-24-a, LO-29-a.
7. Link de diagramas en fila 1 (Drive) no se abrió como input de historias; queda referencia externa.

---

## 12. Matriz de trazabilidad HU ↔ endpoint

Mapeo usando **keys de hoja LOGIN** + contratos de hojas API del mismo Excel (no la numeración de la hoja Matriz).

| HU | HT | Endpoints BFF (Excel) | Notas |
|----|----|-----------------------|-------|
| LO-05 | LO-06 | `POST /v1/auth/welcome-mail/trigger` | Alta/reenvío mail |
| LO-07 | LO-26 | `POST /v1/auth/login`, `token-exchange` | 2FA vía AD |
| LO-10 | LO-11, LO-13 | `POST /v1/auth/first-login`, `PATCH /v1/auth/password` | HB sin LO-12 |
| LO-22 | LO-24, LO-24-a | `POST /v1/auth/mfa/setup`, `mfa/verify` | Escenario = OTP mail |
| LO-25 | LO-26, LO-29-a | `POST /v1/auth/login`, `token-exchange` | RN-05 |
| LO-27 | LO-28, LO-24 | `POST /v1/auth/mfa/verify` | trustDevice |
| LO-29 | LO-29-a | cookie de sesión | FE idle 5 min |
| LO-30 | LO-33 | `POST /v1/auth/password/forgot` | REDIRECT_AD |
| LO-31 | LO-33 | `password/forgot`, `PATCH /password` | CHOOSE_CHANNEL |
| LO-32 | LO-33, LO-24 | `password/forgot`, `PATCH /password` | OTP_SENT / manual |
| LO-34 | LO-35 | `POST /v1/auth/login` (validación pass) | 3 intentos |

---

## 13. Definition of Ready / Definition of Done

**DoR**

- [ ] Como / quiero / para completo
- [ ] AC numerados binarios con refs MSG/RN
- [ ] Gherkin ES alineado a AC
- [ ] Contrato endpoint acordado (§7) si aplica
- [ ] Dependencias/spikes bloqueantes resueltos o acotados
- [ ] INVEST revisado
- [ ] Estimada por el equipo

**DoD**

- [ ] AC verificados en demo (sí/no)
- [ ] Escenarios BDD verificados
- [ ] Mensajes §5 aplicados
- [ ] Sin datos sensibles en errores/logs (RN-07)
- [ ] Probado en dominios aplicables
- [ ] Trazabilidad §12 actualizada

