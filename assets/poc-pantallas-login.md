# POC — Pantallas de la épica LOGIN (guía de recorrido y captura)

> **Versión POC:** v2.11.0 · **Historias:** `assets/historias-usuario-login_v1.0.0.md`
> **URL publicada:** https://marianaintive.github.io/atlas-confirming-poc/

Todos los flujos de acceso son **simulados en el front end** (`auth.js`): no hay Keycloak, ni AD,
ni envío real de correos. El objetivo es poder recorrer y capturar cada pantalla de las historias
antes de que el login esté integrado.

---

## 1. Acceso sin credenciales (siempre disponible)

La pantalla de login mantiene el botón **"Ingresar sin credenciales (modo demo)"**, que entra
directo a la plataforma sin validar nada. Mientras la sesión sea de este tipo, la barra superior
muestra el chip *"Modo demo sin login"*.

---

## 2. Panel "Escenarios de login"

Debajo (o al costado, en pantallas anchas) de la tarjeta de login hay un panel de POC con:

| Control | Para qué sirve |
|---------|----------------|
| **Perfil de usuario** | BANCO · EGP · Proveedor cliente · Proveedor no cliente. Define si la contraseña viene del AD, si hay Home Banking disponible y qué correo recibe el código. |
| **Estado de la credencial** | Primer login (contraseña temporal) · Login recurrente · Contraseña expirada · Usuario bloqueado. |
| **Inactividad (LO-29)** | 5 minutos (valor real), 30 segundos o 10 segundos, para poder capturar el aviso sin esperar. |
| **Ir a una pantalla** | Salta directo a cualquier pantalla del flujo con el contexto correcto. |

El panel se oculta con el ícono del ojo (o con `?panel=0`) para capturar pantallas limpias: al
ocultarlo también desaparecen la etiqueta `LO-xx` y las ayudas de demo.

**Credenciales de demo** (las muestra el propio panel):

| Perfil | Usuario | Contraseña temporal | Contraseña definitiva |
|--------|---------|---------------------|-----------------------|
| BANCO | `admin` | `Temporal2026` | `admin` |
| EGP | `ana` | `Temporal2026` | `Atlas2026!` |
| Proveedor cliente | `laura` | `Temporal2026` | `Atlas2026!` |
| Proveedor no cliente | `supervisor` | `Temporal2026` | `Atlas2026!` |

Cualquier otra contraseña dispara el flujo de intentos fallidos y, al tercero, el bloqueo (LO-34).

---

## 3. Pantallas y URLs directas

Parámetros disponibles: `paso`, `perfil`, `estado`, `inactividad`, `panel`.

| Pantalla (`paso`) | Historia | URL de ejemplo |
|-------------------|----------|----------------|
| `login` | LO-25 / LO-07 / LO-10 | `?paso=login&panel=0` |
| `2fa-ad` | LO-07 | `?paso=2fa-ad&perfil=BANCO&panel=0` |
| `primer-login-temporal` | LO-10 | `?paso=primer-login-temporal&perfil=EGP&panel=0` |
| `canal-password` | LO-10 / LO-31 | `?paso=canal-password&perfil=EGP&panel=0` |
| `derivacion-homebanking` | LO-10 / LO-31 | `?paso=derivacion-homebanking&perfil=EGP&panel=0` |
| `nueva-password` | LO-10 / LO-13 / LO-32 | `?paso=nueva-password&perfil=EGP&panel=0` |
| `2fa-mail` | LO-22 | `?paso=2fa-mail&perfil=EGP&panel=0` |
| `2fa-otp` | LO-22 / LO-27 / LO-32 | `?paso=2fa-otp&perfil=EGP&panel=0` |
| `2fa-listo` | LO-22 | `?paso=2fa-listo&perfil=EGP&panel=0` |
| `olvide-password` | LO-30 / LO-31 / LO-32 | `?paso=olvide-password&perfil=BANCO&panel=0` |
| `aviso-ad` | LO-30 | `?paso=aviso-ad&perfil=BANCO&panel=0` |
| `usuario-bloqueado` | LO-34 | `?paso=usuario-bloqueado&panel=0` |
| `password-actualizada` | LO-32 / LO-33 | `?paso=password-actualizada&panel=0` |
| `plataforma` | Demo | `?paso=plataforma&panel=0` |

---

## 4. Recorridos completos sugeridos

### 4.1 Primer login BANCO (LO-07)

1. `?perfil=BANCO&estado=PRIMER_LOGIN&panel=0`
2. Ingresar `admin` / `Temporal2026` → pantalla de doble factor del AD.
3. "Simular aprobación del AD" entra a la plataforma; "Simular rechazo" vuelve al login con el mensaje MSG-14.

### 4.2 Primer login EGP / Proveedor cliente (LO-10 → LO-13 → LO-22)

1. `?perfil=EGP&estado=PRIMER_LOGIN&panel=0`
2. Ingresar `ana` / `Temporal2026` → aviso de contraseña temporal.
3. "Actualizar mi contraseña" → elección de canal (Home Banking o contraseña propia).
4. "Crear una contraseña nueva acá" → checklist de política en vivo (RN-02) y validación de coincidencia.
5. Guardar → confirmación del correo del código → envío del OTP.
6. Código incorrecto muestra los intentos restantes; el código correcto (visible en la ayuda de demo) llega a "2FA configurado".
7. "Ingresar al portal" entra a la plataforma.

### 4.3 Primer login Proveedor no cliente (LO-10 / RN-09)

1. `?perfil=PROVEEDOR_NO_CLIENTE&estado=PRIMER_LOGIN&panel=0`
2. Igual al anterior, pero la pantalla de canal **no ofrece Home Banking** y lo explica.

### 4.4 Login recurrente con 2FA y dispositivo confiable (LO-25 / LO-27)

1. `?perfil=PROVEEDOR_CLIENTE&estado=RECURRENTE&panel=0`
2. Ingresar `laura` / `Atlas2026!` → pantalla del código con la opción "Recordar este dispositivo como seguro".

### 4.5 Bloqueo por intentos fallidos (LO-34)

1. `?perfil=EGP&estado=RECURRENTE&panel=0`
2. Ingresar tres contraseñas incorrectas: los dos primeros intentos muestran los restantes (MSG-01), el tercero lleva a la pantalla de bloqueo (MSG-02).

### 4.6 Cambio / desbloqueo de contraseña (LO-30 / LO-31 / LO-32)

- BANCO: `?paso=olvide-password&perfil=BANCO&panel=0` → aviso de gestión en el AD.
- EGP o Proveedor cliente: `?paso=olvide-password&perfil=EGP&panel=0` → elección de canal.
- Proveedor no cliente: `?paso=olvide-password&perfil=PROVEEDOR_NO_CLIENTE&panel=0` → OTP → nueva contraseña → confirmación.

### 4.7 Cierre de sesión por inactividad (LO-29)

1. `?panel=0&inactividad=10s` y entrar (con credenciales o sin ellas).
2. Sin tocar nada, a los 5 segundos aparece el aviso con cuenta regresiva.
3. "Continuar conectado" renueva la sesión; si no se responde, vuelve al login con el mensaje MSG-11.
4. Con el panel de escenarios visible también está el botón flotante **"Simular inactividad"**, que muestra el aviso al instante.

---

## 5. Qué no está simulado

- Validación real de credenciales, políticas y bloqueos (los aplica Keycloak).
- Envío real de correos: el código OTP se muestra en pantalla como ayuda de demo.
- Integración con Home Banking: la derivación es informativa (spike S-02 / recomendación R-01).
- Registro de auditoría y persistencia de dispositivos confiables.
