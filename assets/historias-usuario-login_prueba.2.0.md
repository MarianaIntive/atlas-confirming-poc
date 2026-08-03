# Historias de Usuario — Épica LOGIN (prueba.2.0)

> **Versión:** prueba.2.0 · **Fecha:** 2026-08-03
> **Prompt aplicado:** skill `po-expert-user-stories`; desestimar tachadas; elaborar filas puntuadas **y**, por pedido explícito, los enablers LO-11 / LO-13 / LO-26 / LO-28 / LO-33 / LO-35; recomendaciones de faltantes por separado; escenarios Excel → lógica Gherkin (ES) con validaciones/errores; FE contrastada con POC https://marianaintive.github.io/atlas-confirming-poc/
> **Excel de entrada:** se solicitó `login (2).xlsx`; **no estaba disponible en el entorno**. Se usó el Excel adjunto de la sesión `login (3) (1).xlsx` (hojas LOGIN + API + Matriz), cuyo contenido de hoja LOGIN es el de la épica LOGIN referenciada como login (2).
> **Otros archivos del repo:** no se usaron como fuente de historias.
> **Producto:** Portal de Confirming (Atlas Trade)

---

## Tabla de contenidos

1. [Criterio de elaboración (prompt)](#1-criterio-de-elaboración-prompt)
2. [Matriz tachadas / puntuadas / sin elaborar](#2-matriz-tachadas--puntuadas--sin-elaborar)
3. [Hallazgos de la POC (FE)](#3-hallazgos-de-la-poc-fe)
4. [Actores y reglas transversales](#4-actores-y-reglas-transversales)
5. [Catálogo de mensajes (MSG)](#5-catálogo-de-mensajes-msg)
6. [Historias puntuadas — funcionales (HU)](#6-historias-puntuadas--funcionales-hu)
7. [Historias técnicas (HT) y tareas](#7-historias-técnicas-ht-y-tareas)
8. [Filas vivas aún no elaboradas](#8-filas-vivas-aún-no-elaboradas)
9. [Spikes (columna DUDAS)](#9-spikes-columna-dudas)
10. [Recomendaciones del PO — qué faltaría](#10-recomendaciones-del-po--qué-faltaría)
11. [Matriz de trazabilidad HU ↔ endpoint ↔ POC](#11-matriz-de-trazabilidad-hu--endpoint--poc)
12. [Definition of Ready / Done](#12-definition-of-ready--done)

---

## 1. Criterio de elaboración (prompt)

| Regla del prompt | Aplicación |
|-----------------|------------|
| Desestimar tachadas | Strikethrough en Issue Key y/o Summary → ❌ no se elaboran |
| Solo puntuadas | Se elaboran filas vivas con viñetas/`1-`/`2-` en OBJETIVO, ESCENARIOS o Summary |
| Escenarios → Gherkin | Transcripción literal + lógica completa (feliz, alternativo, error, validación) |
| FE vs POC | Cada HU-FE indica pantallas/elementos observados en la POC publicada |
| Faltantes | Solo en §10 Recomendaciones |

---

## 2. Matriz tachadas / puntuadas / sin elaborar

| Fila | Key | Summary | Tachada | Puntuada | Decisión |
|-----:|-----|---------|:-------:|:--------:|----------|
| 3 | LO-01 | Implementar servicio OAuth | No | No | Viva sin elaborar → §8 |
| 4 | LO-02 | Estructura DER LOGIN | Sí | No | ❌ Desestimada |
| 5 | XX | Configuración ente Open-API Atlas | No | Sí | ✅ TAREA elaborada §7 |
| 6 | LO-01-a *(propuesto)* | Config. mail Atlas Core/Trade | No | No | Viva sin elaborar → §8 (key propuesta) |
| 7 | — | SPEC CORE | No | Sí | ✅ TAREA elaborada §7 |
| 8 | LO-03 | Mail Bienvenida BANCO | Sí | Sí | ❌ Desestimada (nota: resuelto por Keycloak) |
| 9 | LO-04 | EP POST BE Envío mail | Sí | Sí | ❌ Desestimada |
| 10 | LO-05 | Mail Bienvenida EGP/PROVEEDOR | No | Sí | ✅ HU-BE §6 |
| 11 | LO-06 | EP POST BE Envío mail | No | Sí | ✅ HT §7 |
| 12 | LO-07 | PANTALLA Primer Login BANCO | No | Sí | ✅ HU-FE §6 |
| 13 | LO-08 | EP validar temporal KC | Sí | No | ❌ Desestimada |
| 14 | LO-09 | EP update pass AD | Sí | No | ❌ Desestimada |
| 15 | LO-10 | PANTALLA Primer Login EGP/PROVEEDOR | No | Sí | ✅ HU-FE §6 |
| 16 | LO-11 | EP validar temporal + flag | No | No | ✅ HT elaborada §7 (pedido explícito; key Excel LO-11) |
| 17 | LO-12 | EP update pass Home Banking | Sí | No | ❌ Desestimada (impacta LO-10/31) |
| 18 | LO-13 | EP update pass manual | No | No | ✅ HT elaborada §7 (pedido explícito; key Excel LO-13) |
| 19 | LO-14 | Primer Login PROVEEDOR CLIENTE | Sí | Sí | ❌ Desestimada (unificada en LO-10) |
| 20 | LO-15 | EP validar temporal | Sí | No | ❌ Desestimada |
| 21 | LO-16 | EP update HB | Sí | No | ❌ Desestimada |
| 22 | LO-17 | EP update manual | Sí | No | ❌ Desestimada |
| 23 | LO-18 | Primer Login PROVEEDOR NO CLIENTE | Sí | Sí | ❌ Desestimada (unificada en LO-10) |
| 24 | LO-19 | EP validar temporal | Sí | No | ❌ Desestimada |
| 25 | LO-20 | EP update manual | Sí | No | ❌ Desestimada |
| 26 | LO-21 | 2FA primer login BANCO | Sí | Sí | ❌ Desestimada (2FA vía AD en LO-07) |
| 27 | LO-22 | 2FA primer login EGP/PROVEEDOR | No | Sí | ✅ HU-FE §6 |
| 28 | LO-23 | 2FA primer login (variante) | Sí | Sí | ❌ Desestimada |
| 29 | LO-24 | EP mail OTP + validación código | No | Sí | ✅ HT §7 |
| 30 | LO-24-a *(propuesto)* | EP Mail del usuario | No | No | Viva sin elaborar → §8 (key propuesta) |
| 31 | LO-25 | PANTALLA Acceso próximo login | No | Sí | ✅ HU-FE §6 |
| 32 | LO-26 | EP validación AD/Home/Manual | No | No* | ✅ HT elaborada §7 (pedido explícito; nota Keycloak en Excel) |
| 33 | LO-27 | 2FA accesos próximos | No | Sí | ✅ HU-FE §6 |
| 34 | LO-28 | EP validación 2FA | No | No | ✅ HT elaborada §7 (pedido explícito; key Excel LO-28) |
| 35 | LO-29 | Cierre sesión por inactividad | No | Sí | ✅ HU-FE §6 |
| 36 | LO-29-a *(propuesto)* | EP cookie en validador login | No | No | Viva sin elaborar → §8 (key propuesta) |
| 37 | LO-30 | Cambio/desbloqueo pass BANCO | No | Sí | ✅ HU-FE §6 |
| 38 | LO-31 | Cambio/desbloqueo + Home Banking | No | Sí | ✅ HU-FE §6 |
| 39 | LO-32 | Cambio/desbloqueo pass manual | No | Sí | ✅ HU-FE §6 |
| 40 | LO-33 | EP PATCH cambio contraseña | No | No | ✅ HT elaborada §7 (pedido explícito; key Excel LO-33) |
| 41 | LO-34 | Bloqueo n intentos FE | No | Sí | ✅ HU-FE §6 |
| 42 | LO-35 | EP validación pass + flag | No | No | ✅ HT elaborada §7 (pedido explícito; key Excel LO-35) |

\* LO-26 tiene una línea en ESCENARIOS (nota Keycloak), sin viñetas numeradas.

**Elaboradas en este documento:** 10 HU + **8 HT** (2 puntuadas + 6 enablers pedidos) + 2 TAREA. **Desestimadas:** 18. **Vivas aún sin elaborar:** 4 (LO-01, fila 6, fila 30, fila 36).

---

## 3. Hallazgos de la POC (FE)

Revisión de https://marianaintive.github.io/atlas-confirming-poc/ (flujos de acceso visibles en la POC). Usado **solo** para enriquecer HU-FE.

| Paso / UI observada | Texto / comportamiento relevante | HU |
|--------------------|----------------------------------|-----|
| Login | Usuario, Contraseña, *Ingresar al Portal*, *¿Olvidaste tu contraseña?*, ingreso demo | LO-07, LO-10, LO-25, LO-34 |
| 2FA AD | *El portal no gestiona el 2FA BANCO: lo provee el AD*; simular aprobación/rechazo | LO-07 |
| Contraseña temporal | Un solo uso; obliga a definir contraseña definitiva | LO-10 |
| Canal de actualización | Home Banking **o** crear contraseña acá; sin HB si no cliente | LO-10, LO-31 |
| Derivación HB | Integración pendiente; en POC la derivación es **informativa** | LO-10, LO-31 |
| Nueva contraseña | Checklist: 8+, mayúscula, minúscula, número, especial, distinta de la anterior; confirmación | LO-10, LO-32 |
| Correo OTP | *Te enviamos un correo… código de 6 dígitos*; *Usar otro correo* | LO-22 |
| Código OTP | Reenviar; *Recordar este dispositivo como seguro*; Validar código | LO-22, LO-27 |
| 2FA listo | Aviso de que el próximo ingreso pedirá código tras cerrar sesión | LO-22, LO-27 |
| Olvidé contraseña | Respuesta igual exista o no el usuario | LO-30…32 |
| Aviso AD / bloqueado | Mesa de Ayuda; desbloqueo por cambio de pass o Mesa | LO-30, LO-34 |
| Inactividad | Control *Simular inactividad* en POC | LO-29 |

---

## 4. Actores y reglas transversales

### 4.1 Dominios

| Dominio | Credencial | 2FA | Recupero |
|---------|------------|-----|----------|
| BANCO | AD | AD (POC + LO-07) | Aviso AD (LO-30) |
| EGP / PROVEEDOR CLIENTE | Temporal → propia (manual o HB) | OTP mail (LO-22) | HB o manual (LO-31/32) |
| PROVEEDOR NO CLIENTE | Temporal → propia manual | OTP mail | Manual (LO-32); sin HB en POC |

### 4.2 RN (solo lo sustentado en Excel/POC)

| ID | Regla | Fuente |
|----|-------|--------|
| **RN-01** | Flag de pass temporal obliga al cambio antes de operar | LO-10 Excel |
| **RN-02** | Bloqueo a los **3** intentos fallidos (Keycloak + flag BFF + msj FE) | LO-34 Excel |
| **RN-03** | Inactividad **5 min**; warning **1 min** antes; cookie inválida → login | LO-29 DUDAS |
| **RN-04** | EGP/Proveedor: pedir 2FA **siempre** tras cerrar sesión | LO-27 DUDAS |
| **RN-05** | Keycloak resuelve origen AD/Home/Manual | LO-26 (nota Excel; HT elaborada en §7) |
| **RN-06** | Notificaciones/Mail existente; reintentos + histórico Trade | LO-06 |
| **RN-07** | Forgot no revela si el usuario existe (POC) | POC olvido pass |
| **RN-08** | Política de pass de la POC (checklist) — validar con Seguridad | POC nueva contraseña |

---

## 5. Catálogo de mensajes (MSG)

| Código | Mensaje (alineado a Excel/POC) |
|--------|--------------------------------|
| MSG-01 | Usuario o contraseña incorrectos. Te quedan {n} intentos. |
| MSG-02 | Tu acceso fue bloqueado por 3 intentos fallidos. Cambiá tu contraseña o contactá a Mesa de Ayuda. |
| MSG-03 | Debés actualizar tu contraseña temporal (un solo uso) para continuar. |
| MSG-04 | Te enviamos un correo a {mail} con un código de 6 dígitos. |
| MSG-05 | El código ingresado no es correcto. |
| MSG-06 | Tu sesión está por cerrarse por inactividad. ¿Querés continuar? |
| MSG-07 | Cerramos tu sesión por inactividad. |
| MSG-08 | Debés actualizar tu contraseña desde el directorio corporativo (AD). |
| MSG-09 | Podés actualizarla desde Home Banking o crear una contraseña nueva acá. |
| MSG-10 | No pudimos completar la operación. Intentá nuevamente. |
| MSG-11 | Ya configuramos la verificación en dos pasos. |
| MSG-12 | La contraseña no cumple los requisitos / no coinciden. |
| MSG-13 | Tu usuario no tiene Home Banking habilitado; solo podés crear la contraseña acá. |
| MSG-14 | Por seguridad, la respuesta es la misma exista o no el usuario. |

---

## 6. Historias puntuadas — funcionales (HU)

### LO-05 — Mail de bienvenida EGP / PROVEEDOR

| | |
|---|---|
| **Tipo** | HU-BE |
| **Épica** | LOGIN |
| **Actor** | Usuario EGP o Proveedor dado de alta |
| **Dominios** | EGP, PROVEEDOR CLIENTE, PROVEEDOR NO CLIENTE |
| **Prioridad sugerida** | Must |
| **Depende de** | LO-06, TAREA SPEC CORE / mail |
| **Habilita** | LO-10 |
| **Pantalla POC** | N/A (correo; alta desde ABM de la POC) |

#### Historia
```
Como usuario con dominio/rol dado de alta en la plataforma
quiero recibir un mail de bienvenida
para obtener la información para loguearme en la plataforma
```

#### Valor de negocio
Dispara el primer acceso de usuarios externos con link y credencial temporal.

#### Escenarios fuente
> Transcripción literal del Excel:

```text
-El sistema envía un correo al usuario, con link de acceso, usuario/contraseña temporal
---BD Atlas Trade se guarda el ID Template
---Servicio de Notificaciones de Core envía el mail
--BD Atlas Core se guarda template
```

#### Criterios de aceptación
1. **[Feliz]** Al autorizar el alta EGP/PROVEEDOR se envía mail con link, usuario y contraseña temporal (RN-01, RN-06).
2. **[Feliz]** Se usa ID Template en Atlas Trade y template en Atlas Core vía Notificaciones.
3. **[Feliz]** Queda histórico de notificación en Atlas Trade.
4. **[Alternativo]** BANCO no recibe este mail (LO-03 desestimada).
5. **[Error]** Falla de Notificaciones → reintentos LO-06; el alta no se revierte.

#### Escenarios BDD
```gherkin
Característica: Mail de bienvenida EGP/Proveedor
  Antecedentes:
    Dado el template de bienvenida está vigente en Atlas Core
    Y Atlas Trade tiene registrado el ID Template
  Esquema del escenario: Envío al autorizar el alta
    Dado un usuario del dominio "<dominio>" con correo válido
    Cuando se autoriza el alta en el ABM
    Entonces Notificaciones envía el mail con link, usuario y contraseña temporal
    Y se registra el envío en el histórico de Atlas Trade
    Ejemplos:
      | dominio |
      | EGP |
      | PROVEEDOR CLIENTE |
      | PROVEEDOR NO CLIENTE |
  Escenario: Error del servicio de mail
    Cuando Notificaciones falla
    Entonces se reintenta según LO-06
    Y el alta permanece
```

#### Fuera de alcance
- Mail bienvenida BANCO.
- Contenido visual del template.

#### Notas / preguntas abiertas
- Vigencia de la temporal no está en el Excel.

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
| **Depende de** | OAuth/Keycloak (LO-01), spike S-01 |
| **Habilita** | Acceso BANCO |
| **Pantalla POC** | `?paso=login` → `?paso=2fa-ad&perfil=BANCO` → plataforma |

#### Historia
```
Como usuario con dominio/rol que me habilita a ingresar a la plataforma de Confirming
quiero ingresar a la plataforma con mis credenciales de AD
para loguearme en la plataforma
```

#### Valor de negocio
Permite operar a usuarios banco con identidad corporativa.

#### Escenarios fuente
> Transcripción literal del Excel:

```text
-Al loguearse se recibe la Autenticacion del doble factor desde el AD
```

#### Criterios de aceptación
1. **[Feliz]** En login (POC) ingresa usuario/contraseña AD; el sistema solicita 2FA del AD; al aprobar, accede.
2. **[Feliz]** El portal no gestiona el 2FA BANCO (texto POC); lo provee el AD.
3. **[Error]** Rechazo/no completación del 2FA AD → no accede; vuelve a login; MSG-10.
4. **[Error]** Credenciales inválidas → MSG-01 e intentos (RN-02 / LO-34).
5. **[Validación]** Usuario o contraseña vacíos → no envía; validación de obligatorio (POC: *Ingresá tu usuario/contraseña*).
6. **[Error]** Usuario AD sin rol Confirming → acceso denegado.

#### Escenarios BDD
```gherkin
Característica: Primer login BANCO
  Antecedentes:
    Dado estoy en la pantalla de login de la POC
    Y mi perfil es BANCO
  Escenario: Ingreso con AD y aprobación del 2FA
    Cuando completo usuario y contraseña de AD y elijo "Ingresar al Portal"
    Entonces se inicia la autenticación corporativa
    Y veo la espera de aprobación del AD
    Cuando el AD aprueba el segundo factor
    Entonces accedo a la plataforma
  Escenario: Rechazo del 2FA del AD
    Dado el sistema espera la aprobación del AD
    Cuando el AD rechaza el segundo factor
    Entonces no accedo
    Y vuelvo al login
    Y veo MSG-10
  Escenario: Credenciales incorrectas
    Cuando ingreso una contraseña incorrecta
    Entonces veo MSG-01
  Escenario: Campos vacíos
    Cuando dejo Usuario o Contraseña vacíos e intento ingresar
    Entonces no se envía la autenticación
    Y veo la validación de campo obligatorio
```

#### Fuera de alcance
- Configurar 2FA en el portal para BANCO (LO-21 desestimada).
- Cambio de pass AD en el portal.

#### Notas / preguntas abiertas
- **S-01** spike 2FA del AD (DUDAS Excel).
- POC expone botones de simulación aprobación/rechazo.

#### Chequeo INVEST
| I | N | V | E | S | T |
|---|---|---|---|---|---|
| ✅ | ✅ | ✅ | ⚠️ | ✅ | ✅ |

---

### LO-10 — Primer login EGP/PROVEEDOR con temporal

| | |
|---|---|
| **Tipo** | HU-FE |
| **Épica** | LOGIN |
| **Actor** | Usuario EGP o Proveedor |
| **Dominios** | EGP, PROVEEDOR CLIENTE, PROVEEDOR NO CLIENTE |
| **Prioridad sugerida** | Must |
| **Depende de** | LO-05, LO-11, LO-13 |
| **Habilita** | LO-22 |
| **Pantalla POC** | `login` → `primer-login-temporal` → `canal-password` → (`derivacion-homebanking`|`nueva-password`) |

#### Historia
```
Como usuario con dominio/rol que me habilita a ingresar a la plataforma de Confirming
quiero poder introducir el usuario y contraseña recibidos por mail
para loguearme en la plataforma y actualizar la contraseña mediante homebanking o generando una nueva contraseña
```

#### Valor de negocio
Onboarding seguro de externos reemplazando la temporal.

#### Escenarios fuente
> Transcripción literal del Excel:

```text
-El sistema ejecuta el flujo de primer login, valida contraseña temporal, usuario y rol (en la respuesta del servicio se envía un flag que marca a la pass como contraseña temporal para obligar al usuario a cambiarla)
-El sistema ejecuta el flujo de actualización de contraseña temporal integrando al homebanking
-El sitema ejecuta el flujo de actuaización manual de contraseña
```

#### Criterios de aceptación
1. **[Feliz]** Login con temporal válida → flag temporal (RN-01) → pantalla POC de temporal (MSG-03) → *Actualizar mi contraseña*.
2. **[Feliz]** Canal manual: checklist POC (RN-08); confirmación; guarda y sigue a LO-22.
3. **[Alternativo]** Canal HB: POC muestra derivación **informativa** (LO-12 tachado). El usuario actualiza fuera y vuelve.
4. **[Alternativo]** Proveedor no cliente: no se ofrece HB; MSG-13.
5. **[Error]** Temporal inválida/vencida → no continúa.
6. **[Error]** Credenciales incorrectas → MSG-01 / RN-02.
7. **[Validación]** Vacíos / pass que no cumple checklist / no coinciden → MSG-12; no avanza.

#### Escenarios BDD
```gherkin
Característica: Primer login EGP/Proveedor
  Antecedentes:
    Dado recibí el mail de bienvenida
    Y estoy en la pantalla de login
  Escenario: Temporal válida obliga al cambio
    Cuando ingreso usuario y contraseña temporal válidos
    Entonces el servicio indica flag de contraseña temporal
    Y veo el aviso de un solo uso (MSG-03)
    Y no puedo operar en la plataforma aún
  Escenario: Actualización manual con política de la POC
    Cuando elijo "Crear una contraseña nueva acá"
    Y ingreso una contraseña que cumple el checklist y la confirmación
    Entonces se guarda la nueva contraseña
    Y continúo a la configuración de 2FA
  Escenario: Contraseñas que no coinciden
    Cuando la confirmación difiere
    Entonces veo MSG-12
    Y no se guarda
  Escenario: Home Banking (integración no disponible)
    Dado soy EGP o Proveedor cliente
    Cuando elijo "Actualizar desde Home Banking"
    Entonces veo la derivación informativa
    Y no se invoca el endpoint LO-12 (tachado)
  Escenario: Proveedor no cliente sin Home Banking
    Dado soy Proveedor no cliente
    Cuando debo actualizar la temporal
    Entonces no se ofrece Home Banking
    Y veo MSG-13
```

#### Fuera de alcance
- HU LO-14/LO-18 tachadas.
- Endpoint HB LO-12 tachado.

#### Notas / preguntas abiertas
- **S-02** momento de ofrecer HB (DUDAS).
- Enablers LO-11 / LO-13 elaborados en §7.

#### Chequeo INVEST
| I | N | V | E | S | T |
|---|---|---|---|---|---|
| ⚠️ | ✅ | ✅ | ⚠️ | ✅ | ✅ |

---

### LO-22 — Configurar 2FA en primer login EGP/PROVEEDOR

| | |
|---|---|
| **Tipo** | HU-FE |
| **Épica** | LOGIN |
| **Actor** | Usuario EGP/PROVEEDOR que ya cambió su pass |
| **Dominios** | EGP, PROVEEDOR CLIENTE, PROVEEDOR NO CLIENTE |
| **Prioridad sugerida** | Must |
| **Depende de** | LO-10, LO-24 |
| **Habilita** | LO-25 |
| **Pantalla POC** | `2fa-mail` → `2fa-otp` → `2fa-listo` |

#### Historia
```
Como usuario EGP/PROVEEDOR que está realizando el primer login y que ya cambió su pass
quiero configurar 2FA
para completar el flujo de login
```

#### Valor de negocio
Cierra el alta de acceso con segundo factor antes de operar.

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
1. **[Feliz]** Tras cambiar pass, muestra mail y MSG-04 (6 dígitos en POC); permite *Usar otro correo*.
2. **[Feliz]** Envía OTP (LO-24); al validar código correcto finaliza (MSG-11) y puede *Ingresar al portal*.
3. **[Feliz]** Opción *Recordar este dispositivo como seguro* disponible en pantalla OTP (también usada en LO-27).
4. **[Error]** Código incorrecto → MSG-05; no finaliza.
5. **[Validación]** Correo nuevo con formato inválido → no envía.
6. **[Alternativo]** Reenviar código desde la POC.
7. **[Error]** Falla de envío → MSG-10.

#### Escenarios BDD
```gherkin
Característica: Configuración 2FA primer login
  Antecedentes:
    Dado ya actualicé mi contraseña temporal
  Escenario: Configuración exitosa
    Cuando inicia el flujo 2FA
    Entonces veo MSG-04 con opción de usar otro correo
    Cuando envío e ingreso el código correcto de 6 dígitos
    Entonces veo la confirmación de 2FA configurado (MSG-11)
    Y puedo ingresar al portal
  Escenario: Cambio de correo de recepción
    Cuando elijo "Usar otro correo" e informo un mail válido
    Entonces el OTP se envía al nuevo correo
  Escenario: Código incorrecto
    Cuando ingreso un código inválido
    Entonces veo MSG-05
  Escenario: Correo con formato inválido
    Cuando intento enviar a un correo mal formado
    Entonces veo la validación de formato
    Y no se envía el OTP
```

#### Fuera de alcance
- 2FA BANCO en portal (LO-21 desestimada).
- TOTP qrUri/secret de API vs OTP mail del Excel → R-02.

#### Notas / preguntas abiertas
- Parámetros de vigencia/reintentos OTP no fijados en Excel.

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
| **Actor** | Usuario que finalizó primer login |
| **Dominios** | BANCO, EGP, PROVEEDOR |
| **Prioridad sugerida** | Must |
| **Depende de** | LO-01, LO-26 |
| **Habilita** | LO-27 |
| **Pantalla POC** | `?paso=login` (estado recurrente) |

#### Historia
```
Como usuario de la plataforma que finalizó su primer login
quiero ingresar a la plataforma con las nuevas credenciales
para acceder y utilizar la plataforma
```

#### Valor de negocio
Acceso cotidiano homogéneo sin que el FE elija el origen de la pass.

#### Escenarios fuente
> Transcripción literal del Excel:

```text
1-El sistema ejecuta el flujo de login y autentica credenciales AD
2-El sistema ejecuta el flujo de login y autentica credenciales homebanking
3-El sistema ejecuta el flujo de login y autentica credenciales configuradas manualmente
```

#### Criterios de aceptación
1. **[Feliz]** Autentica AD / Home Banking / Manual vía Keycloak (RN-05) desde la misma pantalla de login.
2. **[Feliz]** Si corresponde 2FA, continúa en LO-27.
3. **[Error]** Credenciales inválidas → MSG-01.
4. **[Error]** Bloqueado → MSG-02 (LO-34).
5. **[Validación]** Campos vacíos → no envía.

#### Escenarios BDD
```gherkin
Característica: Login recurrente
  Antecedentes:
    Dado finalicé mi primer login
    Y estoy en la pantalla de login
  Esquema del escenario: Orígenes de credencial
    Dado mi contraseña se administra en "<origen>"
    Cuando ingreso usuario y contraseña válidos
    Entonces Keycloak autentica sin que el FE indique el origen
    Ejemplos:
      | origen |
      | AD |
      | homebanking |
      | manual |
  Escenario: Credenciales inválidas
    Cuando ingreso una contraseña incorrecta
    Entonces veo MSG-01
  Escenario: Usuario bloqueado
    Cuando intento ingresar estando bloqueado
    Entonces veo MSG-02
```

#### Fuera de alcance
- Primer login/temporal (LO-10).

#### Notas / preguntas abiertas
- LO-26 elaborada en §7 (RN-05).

#### Chequeo INVEST
| I | N | V | E | S | T |
|---|---|---|---|---|---|
| ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |

---

### LO-27 — 2FA en próximos logins + dispositivo seguro

| | |
|---|---|
| **Tipo** | HU-FE |
| **Épica** | LOGIN |
| **Actor** | Usuario post primer login |
| **Dominios** | EGP/PROVEEDOR (BANCO según S-01) |
| **Prioridad sugerida** | Must |
| **Depende de** | LO-25, LO-28 |
| **Habilita** | Acceso a plataforma |
| **Pantalla POC** | `2fa-otp` con opción recordar dispositivo |

#### Historia
```
Como usuario de la plataforma que finalizó su primer login
quiero validar doble autenticación y registrar dispositivo como seguro
para acceder y utilizar la plataforma
```

#### Valor de negocio
Protege reingresos y permite confiar el dispositivo.

#### Escenarios fuente
> Transcripción literal del Excel:

```text
1-El sistema pide la ejecución de la doble autenticación para validar el login
```

#### Criterios de aceptación
1. **[Feliz]** Tras autenticar pass se pide OTP; código OK → acceso.
2. **[Feliz]** Puede marcar *Recordar este dispositivo como seguro*.
3. **[Alternativo]** EGP/Proveedor: siempre pedir 2FA tras cerrar sesión (RN-04; texto POC en 2FA listo).
4. **[Alternativo]** BANCO: sujeto a S-01 (AD).
5. **[Error]** Código inválido → MSG-05.
6. **[Alternativo]** Reenviar código.

#### Escenarios BDD
```gherkin
Característica: 2FA en accesos posteriores
  Antecedentes:
    Dado me autentiqué con usuario y contraseña
  Escenario: Validación con dispositivo confiable
    Cuando ingreso el OTP correcto y marco recordar dispositivo
    Entonces accedo a la plataforma
  Escenario: Se vuelve a pedir tras cerrar sesión
    Dado cerré sesión
    Cuando vuelvo a autenticarme
    Entonces se solicita nuevamente el 2FA
  Escenario: OTP incorrecto
    Cuando ingreso un código inválido
    Entonces veo MSG-05
    Y no accedo
```

#### Fuera de alcance
- Enrolamiento inicial (LO-22).

#### Notas / preguntas abiertas
- Spike BANCO en DUDAS; TTL de dispositivo confiable no definido.

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
| **Depende de** | LO-29-a *(propuesto)* |
| **Habilita** | Protección de sesión |
| **Pantalla POC** | Sesión activa + control POC *Simular inactividad* |

#### Historia
```
Como usuario logueado en la plataforma
quiero que se cierre la sesión automáticamente luego de n minutos
para proteger la información sensible que gestiono en la plataforma
```

#### Valor de negocio
Mitiga abandono de sesión en puestos desatendidos.

#### Escenarios fuente
> Transcripción literal del Excel:

```text
1-El sistema mostrará un warning de cierre de sesión para permitirle al usuario extender la sesión
2-El sistema extiende la sesión ante la confirmación
3-El sistema cierra la sesión ante la no confirmación
```

#### Criterios de aceptación
1. **[Feliz]** A los 4 min (RN-03) muestra MSG-06 con opción de continuar.
2. **[Feliz]** Confirmación → extiende sesión (renueva cookie).
3. **[Feliz]** Sin confirmación → cierra; MSG-07; vuelve a login.
4. **[Error]** Cookie inválida → login (DUDAS Excel).
5. **[Aclaración]** Valores 5 min / 1 min antes tomados de DUDAS, no de ESCENARIOS.

#### Escenarios BDD
```gherkin
Característica: Cierre por inactividad
  Antecedentes:
    Dado estoy logueado
  Escenario: Warning y extensión
    Cuando transcurren 4 minutos sin actividad
    Entonces veo MSG-06
    Cuando confirmo continuar
    Entonces la sesión se extiende
  Escenario: Cierre sin confirmación
    Cuando no confirmo a tiempo
    Entonces la sesión se cierra
    Y veo MSG-07
    Y vuelvo al login
  Escenario: Cookie inválida
    Cuando la cookie es inválida
    Entonces vuelvo al login
```

#### Fuera de alcance
- Logout manual (R-03).

#### Notas / preguntas abiertas
- POC permite simular inactividad para demo.

#### Chequeo INVEST
| I | N | V | E | S | T |
|---|---|---|---|---|---|
| ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |

---

### LO-30 — Cambio/desbloqueo contraseña BANCO

| | |
|---|---|
| **Tipo** | HU-FE |
| **Épica** | LOGIN |
| **Actor** | Usuario BANCO con pass olvidada/expirada |
| **Dominios** | BANCO |
| **Prioridad sugerida** | Must |
| **Depende de** | LO-33 |
| **Habilita** | Reintento de login AD |
| **Pantalla POC** | `olvide-password` → `aviso-ad` (+ contacto Mesa de Ayuda en POC) |

#### Historia
```
Como usuario que intenta loguearse en la plataforma y olvido o expiro su contraseña
quiero cambiar la contraseña de mi cuenta
para poder loguearme a la plataforma
```

#### Valor de negocio
Evita flujos falsos: el secreto vive en el AD.

#### Escenarios fuente
> Transcripción literal del Excel:

```text
1-El sistema mostrará un warning de que debe actualizarlo desde el AD
```

#### Criterios de aceptación
1. **[Feliz]** Desde *¿Olvidaste tu contraseña?* BANCO ve MSG-08 (actualizar en AD).
2. **[Feliz]** No inicia wizard de nueva pass del portal.
3. **[Feliz]** Muestra contacto Mesa de Ayuda (POC).
4. **[Validación]** Forgot no revela existencia del usuario (MSG-14 / RN-07).

#### Escenarios BDD
```gherkin
Característica: Recupero BANCO
  Escenario: Aviso AD
    Dado soy BANCO
    Cuando elijo "¿Olvidaste tu contraseña?"
    Entonces veo MSG-08
    Y veo los datos de Mesa de Ayuda
    Y no se abre el flujo de nueva contraseña del portal
  Escenario: Respuesta uniforme
    Cuando informo un usuario inexistente
    Entonces la respuesta no revela si existe (MSG-14)
```

#### Fuera de alcance
- Reset AD dentro del portal.
- Desbloqueo admin (R-05).

#### Notas / preguntas abiertas
- Alineado a LO-09 tachado.

#### Chequeo INVEST
| I | N | V | E | S | T |
|---|---|---|---|---|---|
| ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |

---

### LO-31 — Cambio/desbloqueo con opción Home Banking

| | |
|---|---|
| **Tipo** | HU-FE |
| **Épica** | LOGIN |
| **Actor** | Usuario EGP/Proveedor con HB |
| **Dominios** | EGP, PROVEEDOR CLIENTE |
| **Prioridad sugerida** | Must |
| **Depende de** | LO-33 |
| **Habilita** | Login con nueva pass |
| **Pantalla POC** | `olvide-password` → `canal-password` / `derivacion-homebanking` |

#### Historia
```
Como usuario que intenta loguearse en la plataforma y olvido o expiro su contraseña
quiero cambiar la contraseña de mi cuenta
para poder loguearme a la plataforma
```

#### Valor de negocio
Ofrece dos caminos de recupero al cliente bancarizado.

#### Escenarios fuente
> Transcripción literal del Excel:

```text
1-El sistema mostrará un warning de que puede actualizarlo desde homebanking o si desea continuar cambiar la contraseña manualmente
```

#### Criterios de aceptación
1. **[Feliz]** Muestra MSG-09 (HB o manual).
2. **[Alternativo]** HB: derivación informativa (mismo límite LO-12 tachado / POC).
3. **[Feliz]** Si elige manual → flujo LO-32.
4. **[Validación]** RN-07/MSG-14 en el paso inicial de olvido.

#### Escenarios BDD
```gherkin
Característica: Recupero con Home Banking
  Escenario: Elección de canal
    Dado soy EGP o Proveedor cliente
    Cuando inicio "¿Olvidaste tu contraseña?"
    Entonces veo MSG-09
    Y puedo elegir Home Banking o cambio manual
  Escenario: Derivación Home Banking informativa
    Cuando elijo Home Banking
    Entonces se informa la derivación
    Y no se ejecuta integración LO-12
```

#### Fuera de alcance
- Integración real HB (R-01).

#### Notas / preguntas abiertas
- Depende de S-02.

#### Chequeo INVEST
| I | N | V | E | S | T |
|---|---|---|---|---|---|
| ⚠️ | ✅ | ✅ | ⚠️ | ✅ | ✅ |

---

### LO-32 — Cambio/desbloqueo pass manual

| | |
|---|---|
| **Tipo** | HU-FE |
| **Épica** | LOGIN |
| **Actor** | Usuario EGP/Proveedor en recupero manual |
| **Dominios** | EGP, PROVEEDOR (cliente o no) |
| **Prioridad sugerida** | Must |
| **Depende de** | LO-33, LO-24 |
| **Habilita** | Login con nueva pass |
| **Pantalla POC** | `olvide-password` → (`2fa-otp`) → `nueva-password` → `password-actualizada` |

#### Historia
```
Como usuario que intenta loguearse en la plataforma y olvido o expiro su contraseña
quiero cambiar la contraseña de mi cuenta
para poder loguearme a la plataforma
```

#### Valor de negocio
Recupero cuando no hay HB o se elige el camino manual.

#### Escenarios fuente
> Transcripción literal del Excel:

```text
1-El sistema muestra el flujo de cambio de contraseña
```

#### Criterios de aceptación
1. **[Feliz]** Muestra flujo de cambio (OTP + nueva pass según API/POC).
2. **[Feliz]** Éxito → pantalla *contraseña actualizada*; puede ir al login; desbloquea si estaba bloqueado (POC).
3. **[Error]** OTP inválido → MSG-05; no cambia.
4. **[Validación]** Política RN-08 / confirmación → MSG-12.

#### Escenarios BDD
```gherkin
Característica: Cambio manual de contraseña
  Escenario: Cambio exitoso
    Cuando completo OTP válido y una nueva contraseña válida
    Entonces veo la confirmación de contraseña actualizada
    Y puedo ir al login
  Escenario: Desbloqueo implícito
    Dado estaba bloqueado por intentos
    Cuando cambio la contraseña exitosamente
    Entonces puedo volver a intentar el login
  Escenario: OTP inválido
    Cuando el OTP es incorrecto
    Entonces veo MSG-05
    Y la contraseña no cambia
```

#### Fuera de alcance
- Cambio desde Mi Perfil logueado (R-09).

#### Notas / preguntas abiertas
- Forgot OTP_SENT para no cliente según API del Excel.

#### Chequeo INVEST
| I | N | V | E | S | T |
|---|---|---|---|---|---|
| ✅ | ✅ | ✅ | ⚠️ | ✅ | ✅ |

---

### LO-34 — Bloqueo por intentos fallidos

| | |
|---|---|
| **Tipo** | HU-FE |
| **Épica** | LOGIN |
| **Actor** | Usuario que falla el login reiteradamente |
| **Dominios** | Todos |
| **Prioridad sugerida** | Must |
| **Depende de** | LO-35 |
| **Habilita** | LO-30…32 |
| **Pantalla POC** | `login` (contador) → `usuario-bloqueado` |

#### Historia
```
Como usuario de la plataforma
quiero que mi cuenta se bloquee tras reiterados intentos fallidos
para reducir el riesgo de acceso indebido
```

#### Valor de negocio
El Excel define el comportamiento técnico; se expresa como valor de seguridad.

#### Escenarios fuente
> Transcripción literal del Excel:

```text
En N intentos (3 intentos) se bloquea a nivel BFF en keycloak
-POST Login al BFF falla
-se actualiza el flag actualizado de pass bloqueada al BFF
-FE muestra msj de error
```

#### Criterios de aceptación
1. **[Seguridad]** Al 3er fallo: Keycloak bloquea; BFF actualiza flag; FE MSG-02 (pantalla bloqueado POC).
2. **[Alternativo]** Fallos 1–2: login falla; MSG-01 con restantes.
3. **[Feliz/Recupero]** POC indica desbloqueo por cambio de pass o Mesa de Ayuda.
4. **[Error]** Reintento estando bloqueado → MSG-02.

#### Escenarios BDD
```gherkin
Característica: Bloqueo por intentos
  Escenario: Tercer intento
    Dado llevo 2 fallos
    Cuando fallo el tercero
    Entonces el POST de login falla por bloqueo
    Y el FE muestra MSG-02
  Escenario: Intentos previos
    Cuando fallo el primero o el segundo
    Entonces veo MSG-01 con intentos restantes
  Escenario: Usuario ya bloqueado
    Cuando intento ingresar
    Entonces veo MSG-02
    Y las acciones ofrecidas son cambiar contraseña o Mesa de Ayuda
```

#### Fuera de alcance
- Desbloqueo ABM (R-05).
- Historia Connextra derivada: el Excel solo traía OBJETIVO técnico.

#### Notas / preguntas abiertas
- Ventana de reset del contador no especificada.

#### Chequeo INVEST
| I | N | V | E | S | T |
|---|---|---|---|---|---|
| ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |

---

## 7. Historias técnicas (HT) y tareas

> Incluye HT puntuadas (LO-06, LO-24), HT enablers elaborados por pedido (LO-11, LO-13, LO-26, LO-28, LO-33, LO-35 — **todas con Issue Key ya asignado en el Excel**) y tareas puntuadas.

### LO-06 — POST · Envío de mail (servicio existente)

| | |
|---|---|
| **Tipo** | HT (enabler) |
| **Épica** | LOGIN |
| **Habilita** | LO-05 |
| **Contrato** | `POST /v1/auth/welcome-mail/trigger` → `POST /internal/v1/notifications/welcome` |

#### Objetivo técnico
Usar Notificaciones/Mail existente (MAGIA-62/133): envío BFF, reintentos, histórico Trade.

#### Criterios de aceptación
1. BFF llama al servicio existente (no mailer nuevo).
2. Persiste histórico en Atlas Trade.
3. Reintenta ante fallas transitorias.
4. Soporta trigger/reenvío desde ABM.

#### Escenarios BDD
```gherkin
Característica: Envío mail bienvenida
  Escenario: Trigger OK
    Cuando el BFF dispara welcome-mail/trigger
    Entonces Core envía el mail
    Y Trade guarda histórico
  Escenario: Reintento
    Dado el primer intento falla
    Cuando corre el reintento
    Entonces se actualiza el histórico
```

#### Errores esperados
| Código HTTP | Código negocio | Cuándo |
|-------------|----------------|--------|
| 200 | — | Aceptado |
| 502 | NOTIFICATION_UNAVAILABLE | Core caído |
| 422 | TEMPLATE_MISSING | Sin template |

---

### LO-24 — POST · Mail OTP + validación de código

| | |
|---|---|
| **Tipo** | HT (enabler) |
| **Épica** | LOGIN |
| **Habilita** | LO-22, LO-27, LO-32 |
| **Contrato** | Notificaciones con template OTP + `POST /v1/auth/mfa/verify` (y/o validación en response) |

#### Objetivo técnico
Summary Excel puntuado: template distinto (validación OTP / primer mail) y validación del código OTP.

#### Criterios de aceptación
1. Envío OTP usa template distinto al de bienvenida.
2. Código correcto → verificado e invalidado para reuso.
3. Código incorrecto/vencido → error al FE.

#### Escenarios BDD
```gherkin
Característica: OTP
  Escenario: Envío y validación
    Cuando se solicita OTP de validación
    Entonces se envía mail con template OTP
    Cuando el FE envía el código correcto
    Entonces la validación es exitosa
  Escenario: Código inválido
    Cuando el código es incorrecto
    Entonces se responde error de OTP
```

#### Errores esperados
| Código HTTP | Código negocio | Cuándo |
|-------------|----------------|--------|
| 200 | — | OK |
| 401 | OTP_INVALID | Incorrecto |
| 401 | OTP_EXPIRED | Vencido |

---

### LO-11 — POST · Validar mail/contraseña temporal (flag temporal)

| | |
|---|---|
| **Tipo** | HT (enabler) |
| **Épica** | LOGIN |
| **Issue Key** | LO-11 *(Excel)* |
| **Habilita** | LO-10 |
| **Contrato** | `POST /v1/auth/first-login` → BE `POST /internal/v1/auth/first-login` (Excel lo enuncia como GET; la hoja API lo define como POST) |

#### Objetivo técnico
Validar usuario/mail y contraseña temporal contra Keycloak y devolver el **flag de pass temporal** para que el FE obligue el cambio (RN-01).

#### Escenarios fuente
> Summary Excel (sin viñetas): `EP GET BFF / BE - Validar mail/contraseña temporal contra Keycloak (respuesta con flag de pass temporal)`

#### Criterios de aceptación
1. **[Feliz]** Credencial temporal válida → **200** con señal de pass temporal y `nextStep` del wizard (p. ej. cambio de contraseña / 2FA).
2. **[Feliz]** La respuesta incluye dato suficiente para que el FE bloquee el acceso a la plataforma hasta cambiar la pass (RN-01).
3. **[Error]** Credenciales inválidas → **401**; incrementa contador de intentos (alineado a LO-35 / RN-02).
4. **[Error]** Usuario sin rol / no habilitado → **403**.
5. **[Validación]** Body incompleto → **400** / **422**.

#### Escenarios BDD
```gherkin
Característica: Validación de contraseña temporal
  Escenario: Temporal válida con flag
    Cuando el FE invoca first-login con usuario y contraseña temporal válidos
    Entonces el BFF responde 200
    Y la respuesta indica que la contraseña es temporal
    Y el FE obliga al flujo de actualización (LO-10)
  Escenario: Credenciales inválidas
    Cuando el FE invoca first-login con contraseña incorrecta
    Entonces responde 401
  Escenario: Usuario sin permisos
    Cuando el usuario no tiene rol habilitado en Confirming
    Entonces responde 403
```

#### Errores esperados
| Código HTTP | Código negocio | Cuándo |
|-------------|----------------|--------|
| 200 | — | OK + flag temporal / nextStep |
| 400/422 | VALIDATION_ERROR | Datos incompletos |
| 401 | — | Credenciales inválidas |
| 403 | — | Sin rol / no habilitado |

---

### LO-13 — POST/PATCH · Actualizar contraseña ingresada por el usuario

| | |
|---|---|
| **Tipo** | HT (enabler) |
| **Épica** | LOGIN |
| **Issue Key** | LO-13 *(Excel)* |
| **Habilita** | LO-10, LO-32 |
| **Contrato** | `PATCH /v1/auth/password` → `PATCH /internal/v1/auth/password` (Excel: EP POST; hoja API: PATCH) |

#### Objetivo técnico
Persistir en Keycloak la nueva contraseña definida por el usuario (canal manual), reemplazando la temporal o la anterior en recupero.

#### Escenarios fuente
> Summary Excel: `EP POST BFF / BE - Actualizar contraseña ingresada por el usuario`

#### Criterios de aceptación
1. **[Feliz]** `newPassword` (+ `otp` si el flujo lo exige) válido → **200** `{ "updated": true }`.
2. **[Feliz]** Tras éxito en primer login, el flag de pass temporal queda en falso.
3. **[Error]** OTP inválido → **401**; no modifica la credencial.
4. **[Validación]** Incumple política (RN-08 / checklist POC) → **422** `PASSWORD_POLICY`.
5. **[Validación]** No se loguea ni se devuelve la contraseña en claro.

#### Escenarios BDD
```gherkin
Característica: Actualización de contraseña manual
  Escenario: Cambio exitoso
    Cuando el FE invoca PATCH /v1/auth/password con newPassword válido
    Entonces responde 200 con updated true
    Y Keycloak almacena la nueva contraseña
  Escenario: Política no cumplida
    Cuando newPassword no cumple la política
    Entonces responde 422 con PASSWORD_POLICY
  Escenario: OTP inválido en recupero
    Cuando el flujo exige otp y el valor es incorrecto
    Entonces responde 401
    Y la contraseña no cambia
```

#### Errores esperados
| Código HTTP | Código negocio | Cuándo |
|-------------|----------------|--------|
| 200 | — | Actualizada |
| 401 | OTP_INVALID | OTP inválido |
| 422 | PASSWORD_POLICY | No cumple política |
| 422 | PASSWORD_REUSE | Reutiliza reciente / temporal |

---

### LO-26 — POST · Validación de credenciales AD / Home / Manual

| | |
|---|---|
| **Tipo** | HT (enabler) |
| **Épica** | LOGIN |
| **Issue Key** | LO-26 *(Excel)* |
| **Habilita** | LO-07, LO-25, LO-30, LO-31, LO-32 |
| **Contrato** | `POST /v1/auth/login` + `POST /v1/auth/token-exchange`; BE `GET /internal/v1/users/{id}/login-policy` |

#### Objetivo técnico
Autenticar sin que el FE elija el origen de la contraseña. Excel: *"Keycloak se encarga de diferenciar dónde buscar la pass"* (RN-05). Exponer canales permitidos vía `login-policy`.

#### Escenarios fuente
> Summary: `EP GET BFF- Validación de credenciales AD/Home/Manual`  
> Escenarios Excel: `Keycloak se encarga de difrerenciar donde buscar la pass`

#### Criterios de aceptación
1. **[Feliz]** `POST /login` → **200** con `authorizationUrl`, `state`, `codeVerifier`.
2. **[Feliz]** `POST /token-exchange` → **200** con tokens y `mfaRequired`.
3. **[Feliz]** Autenticación transparente para orígenes AD / HOMEBANKING / MANUAL (RN-05).
4. **[Feliz]** `login-policy` indica canales (AD, HB, manual) para mostrar/ocultar HB en FE (LO-10/31).
5. **[Error]** Auth fallida → **401** + intentos restantes (sin enumerar usuarios, RN-07).

#### Escenarios BDD
```gherkin
Característica: Login unificado con resolución de origen en Keycloak
  Escenario: Inicio OAuth
    Cuando el FE invoca POST /v1/auth/login
    Entonces responde 200 con authorizationUrl, state y codeVerifier
  Escenario: Token exchange
    Cuando el FE invoca POST /v1/auth/token-exchange con code válido
    Entonces responde 200 con accessToken, refreshToken y mfaRequired
  Esquema del escenario: Origen transparente
    Dado un usuario cuya pass se administra en "<origen>"
    Cuando se autentica con usuario y contraseña
    Entonces Keycloak resuelve el provider
    Y el FE no envía el origen
    Ejemplos:
      | origen |
      | AD |
      | HOMEBANKING |
      | MANUAL |
  Escenario: Consulta login-policy
    Cuando el BE responde GET login-policy
    Entonces incluye los canales permitidos del usuario
  Escenario: Credenciales inválidas
    Cuando la autenticación falla
    Entonces responde 401 con intentos restantes
```

#### Errores esperados
| Código HTTP | Código negocio | Cuándo |
|-------------|----------------|--------|
| 200 | — | OK |
| 401 | — | Credenciales inválidas |
| 403 | — | Sin permisos / deshabilitado |

---

### LO-28 — POST · Validación de 2FA

| | |
|---|---|
| **Tipo** | HT (enabler) |
| **Épica** | LOGIN |
| **Issue Key** | LO-28 *(Excel)* |
| **Habilita** | LO-27 |
| **Contrato** | `POST /v1/auth/mfa/verify` → `POST /internal/v1/auth/mfa/verify` (Excel: EP GET; hoja API: POST) |

#### Objetivo técnico
Validar el segundo factor en accesos posteriores y, opcionalmente, registrar dispositivo confiable (`trustDevice` / `deviceId`).

#### Escenarios fuente
> Summary Excel: `EP GET BFF - Validación de 2FA`

#### Criterios de aceptación
1. **[Feliz]** OTP correcto + `trustDevice=true` → **200** `{ verified: true, deviceId }` y registro en dispositivo confiable.
2. **[Feliz]** OTP correcto + `trustDevice=false` → **200** sin registrar dispositivo.
3. **[Alternativo]** Tras logout, `mfaRequired=true` aunque exista dispositivo (RN-04).
4. **[Error]** OTP incorrecto/vencido → **401** con código de negocio.
5. **[Error]** Intentos de OTP agotados → **429** (si aplica política OTP).

#### Escenarios BDD
```gherkin
Característica: Validación de 2FA
  Escenario: OK con dispositivo confiable
    Cuando el FE invoca mfa/verify con otp correcto y trustDevice true
    Entonces responde 200 con verified true y deviceId
  Escenario: OK sin recordar dispositivo
    Cuando trustDevice es false y el otp es correcto
    Entonces responde 200
    Y no registra dispositivo
  Escenario: OTP inválido
    Cuando el otp es incorrecto
    Entonces responde 401 con OTP_INVALID
  Escenario: Exigencia tras cerrar sesión
    Dado el usuario cerró sesión
    Cuando se autentica de nuevo
    Entonces mfaRequired es true
```

#### Errores esperados
| Código HTTP | Código negocio | Cuándo |
|-------------|----------------|--------|
| 200 | — | Verificado |
| 401 | OTP_INVALID / OTP_EXPIRED / OTP_USED | Código inválido |
| 429 | OTP_ATTEMPTS | Intentos agotados |

---

### LO-33 — PATCH/POST · Cambio de contraseña (forgot + update)

| | |
|---|---|
| **Tipo** | HT (enabler) |
| **Épica** | LOGIN |
| **Issue Key** | LO-33 *(Excel)* |
| **Habilita** | LO-30, LO-31, LO-32 |
| **Contrato** | `PATCH /v1/auth/password` + `POST /v1/auth/password/forgot` → BE `PATCH /internal/v1/auth/password` |

#### Objetivo técnico
Resolver la acción de recupero según dominio y aplicar el cambio de contraseña (Excel: `EP PATCH BFF - Cambio de contraseña`).

#### Escenarios fuente
> Summary Excel: `EP PATCH BFF - Cambio de contraseña`  
> Contrato forgot (hoja API): `action = REDIRECT_AD | CHOOSE_CHANNEL | OTP_SENT`

#### Criterios de aceptación
1. **[Feliz]** Forgot BANCO → **200** `action=REDIRECT_AD` (soporta LO-30 / MSG-08).
2. **[Feliz]** Forgot EGP/Proveedor cliente → **200** `action=CHOOSE_CHANNEL` (LO-31).
3. **[Feliz]** Forgot Proveedor no cliente → **200** `action=OTP_SENT` (LO-32).
4. **[Feliz]** Usuario inexistente → **200** genérico sin revelar existencia (RN-07 / MSG-14).
5. **[Feliz]** PATCH con newPassword + otp válidos → **200** `{ updated: true }`; libera bloqueo si aplica.
6. **[Error]** OTP inválido en PATCH → **401**; no cambia pass.
7. **[Error]** Abuso de forgot → **429**.

#### Escenarios BDD
```gherkin
Característica: Forgot y cambio de contraseña
  Esquema del escenario: Acción por dominio
    Cuando el FE invoca POST /v1/auth/password/forgot para "<dominio>"
    Entonces action = "<action>"
    Ejemplos:
      | dominio | action |
      | BANCO | REDIRECT_AD |
      | EGP | CHOOSE_CHANNEL |
      | PROVEEDOR CLIENTE | CHOOSE_CHANNEL |
      | PROVEEDOR NO CLIENTE | OTP_SENT |
  Escenario: No enumeración de usuarios
    Cuando el usuario no existe
    Entonces responde 200 genérico
    Y no envía código
  Escenario: PATCH exitoso
    Cuando invoco PATCH /v1/auth/password con datos válidos
    Entonces updated es true
    Y se libera el bloqueo si existía
```

#### Errores esperados
| Código HTTP | Código negocio | Cuándo |
|-------------|----------------|--------|
| 200 | — | Acción resuelta / updated |
| 401 | OTP_INVALID | OTP inválido |
| 422 | PASSWORD_POLICY | Política |
| 429 | RATE_LIMIT | Abuso de forgot |

---

### LO-35 — POST · Validación de pass + flag de status

| | |
|---|---|
| **Tipo** | HT (enabler) |
| **Épica** | LOGIN |
| **Issue Key** | LO-35 *(Excel)* |
| **Habilita** | LO-34 |
| **Contrato** | POST de validación de pass / login que responde al FE y actualiza el flag de status en BFF/Keycloak |

#### Objetivo técnico
Excel: responder al FE el resultado de la validación y actualizar el flag de estado de la pass (incl. bloqueada a los 3 intentos).

#### Escenarios fuente
> Summary Excel: `EP POST Validación de pass (responde al FE y actualiza el flag de status de pass)`  
> Relacionado a LO-34: POST login falla → flag bloqueada → FE muestra error.

#### Criterios de aceptación
1. **[Alternativo]** Fallo con intentos disponibles → **401** + `remainingAttempts`; incrementa contador.
2. **[Seguridad]** 3er fallo → Keycloak bloquea; flag `BLOQUEADA`; respuesta de bloqueo al FE (**423** `USER_LOCKED` o equivalente consumible por LO-34).
3. **[Feliz]** Login exitoso → reinicia contador; status activo.
4. **[Feliz]** Consulta de estado (si se expone) → ACTIVA / TEMPORAL / EXPIRADA / BLOQUEADA.
5. **[Validación]** Errores no revelan existencia del usuario ni fragmentos de pass (RN-07).

#### Escenarios BDD
```gherkin
Característica: Validación de pass y flag de status
  Escenario: Fallo con intentos restantes
    Cuando el FE valida una contraseña incorrecta
    Entonces responde 401 con remainingAttempts
    Y el contador se incrementa
  Escenario: Bloqueo al tercer fallo
    Dado el usuario tiene 2 fallos
    Cuando falla el tercero
    Entonces se actualiza el flag a BLOQUEADA
    Y el FE puede mostrar MSG-02 (LO-34)
  Escenario: Reinicio por login exitoso
    Dado había fallos acumulados
    Cuando se autentica correctamente
    Entonces el contador vuelve a cero
```

#### Errores esperados
| Código HTTP | Código negocio | Cuándo |
|-------------|----------------|--------|
| 401 | — | Fallido (+ remainingAttempts) |
| 423 | USER_LOCKED | Bloqueado (RN-02) |

---

### T-02 — Configuración ente Open-API Atlas *(key Excel XX, puntuada)*

| | |
|---|---|
| **Tipo** | TAREA |
| **Épica** | LOGIN |

#### Objetivo (Excel)
```text
Configuración inicial OPEN API ATLAS
-Generar Json Web token
-Conexión a BFF OAuth
```

#### Criterios de aceptación
1. Se genera y valida un JWT para el ente.
2. Queda probada la conexión del ente hacia el BFF OAuth.

---

### T-04 — SPEC CORE *(sin Issue Key, puntuada)*

| | |
|---|---|
| **Tipo** | TAREA |
| **Épica** | LOGIN |

#### Objetivo (Excel)
```text
6 Michi Fenix/ Ignis open Api Alta baja
-Crear el ente para Trade, para que se pueda conectar como cliente Atlas
-Permisos del ente de notificaciones ente trade
```

#### Criterios de aceptación
1. Ente Trade creado/habilitado como cliente Atlas.
2. Permisos del ente de notificaciones otorgados y verificados con una llamada real.

---

## 8. Filas vivas aún no elaboradas

Quedan fuera de las tarjetas (sin puntos en Excel y sin pedido de elaboración). Se proponen Issue Keys donde faltan:

| Key | Summary | Por qué importa | Key propuesta |
|-----|---------|-----------------|---------------|
| LO-01 | Implementar servicio OAuth | Base de login | *(ya tiene LO-01)* |
| LO-01-a *(propuesto)* | Config. mail Atlas Core/Trade (fila 6) | Habilita LO-05/06/24 | **LO-01-a** |
| LO-24-a *(propuesto)* | EP Mail del usuario (fila 30) | Enabler LO-22 (cambiar mail OTP) | **LO-24-a** |
| LO-29-a *(propuesto)* | Cookie en validador de login (fila 36) | Enabler LO-29 | **LO-29-a** |

> LO-11 / LO-13 / LO-26 / LO-28 / LO-33 / LO-35 ya tenían Issue Key en el Excel y fueron elaboradas en §7.

---

## 9. Spikes (columna DUDAS)

| ID | Origen | Pregunta | Propuesta |
|----|--------|----------|-----------|
| S-01 | LO-07, LO-27 | 2FA del AD / relación AD–AUTH | Timeboxear antes de cerrar UX BANCO |
| S-02 | LO-10 | ¿Cuándo ofrecer HB? (primer login / Mi Perfil / segundo login) | Preferir Mi Perfil en 1er release |
| S-03 | LO-27 | Frecuencia 2FA EGP/Proveedor | Excel: siempre al cerrar sesión |
| S-04 | Gap | Política formal pass + parámetros OTP | Validar checklist POC con Seguridad |
| S-05 | LO-05 | Vigencia temporal | Definir (ej. 72 h) |
| S-06 | LO-29 | ¿Misma inactividad para todos? | 5 min globales |

---

## 10. Recomendaciones del PO — qué faltaría

> **Separadas** del alcance puntuado del Excel.

| ID | Faltante | Por qué | Prioridad |
|----|----------|---------|-----------|
| R-01 | Flujo/endpoint real Home Banking | Pedido en LO-10/31; LO-12 tachado; POC lo marca informativo | Alta |
| R-02 | Definir OTP mail vs TOTP (`qrUri`/`secret` en API) | Contradicción Excel vs hoja API | Alta |
| R-03 | Logout manual | RN-04/POC dependen de cerrar sesión | Alta |
| R-04 | Elaborar restantes sin tarjeta (LO-01 detalle, LO-01-a mail, LO-24-a mail usuario, LO-29-a cookie) | Cierran OAuth, OTP mail y sesión | Alta |
| R-05 | Desbloqueo desde ABM / Mesa | Bloqueo LO-34 sin herramienta admin | Alta |
| R-06 | Auditoría INTENTO_LOGIN / SESION_AUDIT | Están en matriz, sin historia | Alta |
| R-07 | Expiración periódica de pass + aviso | Se menciona expirada sin regla | Media |
| R-08 | Gestión de dispositivos confiables | Se pueden crear, no revocar | Media |
| R-09 | Cambio de pass desde sesión (Mi Perfil) | Solo hay recupero en login | Media |
| R-10 | Rate limiting / anti-bot en login | Complementa RN-02 | Media |
| R-11 | Formalizar Issue Keys filas 6/7/30/36 | Hoy sin key | Baja |
| R-12 | Unificar numeración hoja Matriz vs LOGIN | Evita errores al cargar Jira | Alta |

---

## 11. Matriz de trazabilidad HU ↔ endpoint ↔ POC

| HU | Endpoints (hoja API Excel)* | Pantalla POC |
|----|-----------------------------|--------------|
| LO-05 | `POST /v1/auth/welcome-mail/trigger` | ABM alta usuario (sin pantalla login) |
| LO-07 | `POST /v1/auth/login`, `token-exchange` | `login` → `2fa-ad` |
| LO-10 | LO-11, LO-13 · `POST /v1/auth/first-login`, `PATCH /password` | `login` → temporal → canal → nueva pass / HB |
| LO-22 | LO-24 · `POST /v1/auth/mfa/setup`, `mfa/verify` | `2fa-mail` → `2fa-otp` → `2fa-listo` |
| LO-25 | LO-26 · `POST /v1/auth/login`, `token-exchange` | `login` |
| LO-27 | LO-28, LO-24 · `POST /v1/auth/mfa/verify` | `2fa-otp` (recordar dispositivo) |
| LO-29 | LO-29-a *(propuesto)* cookie sesión | sesión + simular inactividad |
| LO-30 | LO-33 · `POST /v1/auth/password/forgot` | `olvide-password` → `aviso-ad` |
| LO-31 | LO-33 · `password/forgot` | olvido → canal / derivación HB |
| LO-32 | LO-33, LO-24 · `password/forgot`, `PATCH /password` | olvido → OTP → nueva pass → actualizada |
| LO-34 | LO-35 · login + flag status | `login` → `usuario-bloqueado` |

\* La hoja Matriz usa **otra** numeración LO; aquí se mapea por capacidad usando keys de LOGIN + contratos API.

---

## 12. Definition of Ready / Done

**DoR:** Como/quiero/para · AC binarios · Gherkin ES · MSG/RN · contrato si aplica · spikes acotados · pantalla POC en FE · INVEST · estimada.

**DoD:** AC en demo · BDD verificados · mensajes §5 · sin fuga de existencia de usuario (RN-07) · dominios aplicables · trazabilidad §11 actualizada.

