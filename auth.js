/**
 * Flujos de acceso de la POC — Épica LOGIN.
 *
 * Cubre las pantallas de las historias LO-07, LO-10, LO-22, LO-25, LO-27, LO-29,
 * LO-30, LO-31, LO-32 y LO-34 (ver assets/historias-usuario-login_v1.0.0.md).
 * Todo el comportamiento es simulado en el front: no hay backend, Keycloak ni envío
 * real de correos. La opción "Ingresar sin credenciales" siempre está disponible para
 * poder recorrer la plataforma mientras el login no está integrado.
 */

// ====== CONFIGURACIÓN DE ESCENARIOS ======

const AUTH_PROFILES = {
    BANCO: {
        label: 'BANCO',
        username: 'admin',
        mail: 'admin@bancoatlas.com.py',
        password: 'admin',
        tempPassword: 'Temporal2026',
        homebanking: false,
        credencialAD: true,
    },
    EGP: {
        label: 'EGP',
        username: 'ana',
        mail: 'a.gomez@retail.com.py',
        password: 'Atlas2026!',
        tempPassword: 'Temporal2026',
        homebanking: true,
        credencialAD: false,
    },
    PROVEEDOR_CLIENTE: {
        label: 'Proveedor cliente',
        username: 'laura',
        mail: 'l.benitez@techsolutions.com.py',
        password: 'Atlas2026!',
        tempPassword: 'Temporal2026',
        homebanking: true,
        credencialAD: false,
    },
    PROVEEDOR_NO_CLIENTE: {
        label: 'Proveedor no cliente',
        username: 'supervisor',
        mail: 'j.ramirez@serviciosit.com.py',
        password: 'Atlas2026!',
        tempPassword: 'Temporal2026',
        homebanking: false,
        credencialAD: false,
    },
};

// Reglas de negocio parametrizadas (RN-02, RN-03, RN-04, RN-05 del documento de historias)
const AUTH_RULES = {
    maxIntentosPassword: 3,
    otpDigitos: 6,
    otpVigenciaSegundos: 300,
    otpMaxIntentos: 3,
    otpCooldownSegundos: 60,
    otpMaxReenvios: 3,
};

const AUTH_IDLE_PRESETS = {
    real: { totalMs: 5 * 60 * 1000, warningMs: 60 * 1000, label: '5 minutos' },
    '30s': { totalMs: 30 * 1000, warningMs: 10 * 1000, label: '30 segundos' },
    '10s': { totalMs: 10 * 1000, warningMs: 5 * 1000, label: '10 segundos' },
};

const AUTH_DEMO_STEPS = [
    { step: 'login', label: 'Login', hu: 'LO-25' },
    { step: '2fa-ad', label: '2FA del AD', hu: 'LO-07', perfil: 'BANCO' },
    { step: 'primer-login-temporal', label: 'Contraseña temporal', hu: 'LO-10', estado: 'PRIMER_LOGIN' },
    { step: 'canal-password', label: 'Canal de actualización', hu: 'LO-10' },
    { step: 'derivacion-homebanking', label: 'Derivación Home Banking', hu: 'LO-31' },
    { step: 'nueva-password', label: 'Nueva contraseña', hu: 'LO-13' },
    { step: '2fa-mail', label: 'Correo del código', hu: 'LO-22' },
    { step: '2fa-otp', label: 'Código OTP', hu: 'LO-22' },
    { step: '2fa-listo', label: '2FA configurado', hu: 'LO-22' },
    { step: 'olvide-password', label: 'Olvidé mi contraseña', hu: 'LO-30' },
    { step: 'aviso-ad', label: 'Aviso AD', hu: 'LO-30', perfil: 'BANCO' },
    { step: 'usuario-bloqueado', label: 'Usuario bloqueado', hu: 'LO-34', estado: 'BLOQUEADO' },
    { step: 'password-actualizada', label: 'Contraseña actualizada', hu: 'LO-33' },
    { step: 'plataforma', label: 'Plataforma (sin login)', hu: 'Demo' },
];

const AUTH_MESSAGES = {
    MSG_01: (intentos) => `Usuario o contraseña incorrectos. Te ${intentos === 1 ? 'queda' : 'quedan'} ${intentos} ${intentos === 1 ? 'intento' : 'intentos'} antes de que bloqueemos tu acceso.`,
    MSG_02: 'Tu acceso fue bloqueado por 3 intentos fallidos. Usá la opción "¿Olvidaste tu contraseña?" o contactá a la Mesa de Ayuda.',
    MSG_03: 'La contraseña temporal venció. Te reenviamos un nuevo acceso a tu correo.',
    MSG_04: 'La contraseña no cumple los requisitos de seguridad.',
    MSG_05: 'Las contraseñas no coinciden.',
    MSG_06: (intentos) => `El código ingresado no es correcto. Te ${intentos === 1 ? 'queda' : 'quedan'} ${intentos} ${intentos === 1 ? 'intento' : 'intentos'}.`,
    MSG_07: 'El código expiró o ya fue utilizado. Solicitá un código nuevo.',
    MSG_08: (mail) => `Te enviamos un código de 6 dígitos a ${mail}. Vence en 5 minutos.`,
    MSG_09: (segundos) => `Podés solicitar un nuevo código en ${segundos} segundos.`,
    MSG_11: 'Cerramos tu sesión por inactividad para proteger tu información.',
    MSG_12: 'Tu contraseña se administra en el directorio corporativo (AD). Cambiala desde tu equipo Banco Atlas o contactá a la Mesa de Ayuda.',
    MSG_14: 'No pudimos procesar tu solicitud en este momento. Intentá nuevamente en unos minutos.',
    MSG_16: 'Te vamos a llevar a Home Banking para actualizar tu contraseña. Volvé al portal e ingresá con la nueva contraseña.',
};

// ====== ESTADO DEL FLUJO ======

const authState = {
    step: 'login',
    perfil: 'EGP',
    estado: 'PRIMER_LOGIN',        // PRIMER_LOGIN | RECURRENTE | PASS_EXPIRADA | BLOQUEADO
    flujo: 'LOGIN',                // LOGIN | PRIMER_LOGIN | RECUPERO
    username: '',
    intentosFallidos: 0,
    passwordDefinida: null,
    dispositivoConfiable: false,
    mailContacto: '',
    otp: null,
    otpIntentos: 0,
    otpReenvios: 0,
    otpEnviadoEn: null,
    idlePreset: 'real',
};

let authOtpTicker = null;

function authProfile() {
    return AUTH_PROFILES[authState.perfil] || AUTH_PROFILES.EGP;
}

function authPasswordEsperada() {
    if (authState.passwordDefinida) return authState.passwordDefinida;
    return authProfile().password;
}

function authMaskMail(mail) {
    const value = String(mail || '');
    const [user, domain] = value.split('@');
    if (!user || !domain) return value || '—';
    const visible = user.slice(0, 2);
    return `${visible}${'*'.repeat(Math.max(user.length - 2, 2))}@${domain}`;
}

// ====== HELPERS DE UI ======

function authEl(id) {
    return document.getElementById(id);
}

function authShow(el, visible) {
    if (!el) return;
    el.classList.toggle('hidden', !visible);
}

function authSetMessage(id, text, visible = true) {
    const el = authEl(id);
    if (!el) return;
    if (text != null) el.textContent = text;
    authShow(el, visible && !!el.textContent);
}

function authClearMessages() {
    ['auth-login-msg', 'auth-password-msg', 'auth-otp-msg', 'auth-username-error',
        'auth-password-error', 'auth-confirm-error', 'auth-forgot-error', 'auth-mail-error']
        .forEach(id => authShow(authEl(id), false));
}

// ====== NAVEGACIÓN ENTRE PANTALLAS ======

function authGoToStep(step) {
    const sections = document.querySelectorAll('.auth-step');
    let target = null;
    sections.forEach(section => {
        const isTarget = section.dataset.step === step;
        section.classList.toggle('active', isTarget);
        if (isTarget) target = section;
    });
    if (!target) return;

    authState.step = step;
    authClearMessages();

    const title = authEl('auth-step-title');
    const subtitle = authEl('auth-step-subtitle');
    const pill = authEl('auth-hu-pill');
    if (title) title.textContent = target.dataset.title || 'Portal de Confirming';
    if (subtitle) subtitle.textContent = target.dataset.subtitle || '';
    if (pill) {
        pill.textContent = target.dataset.hu || '';
        authShow(pill, !!target.dataset.hu && !document.body.classList.contains('auth-demo-off'));
    }

    authRenderWizard(step);
    authOnEnterStep(step);
    window.scrollTo({ top: 0 });
}

const AUTH_WIZARD_MAP = {
    'primer-login-temporal': 'password',
    'canal-password': 'password',
    'derivacion-homebanking': 'password',
    'nueva-password': 'password',
    '2fa-mail': 'verificacion',
    '2fa-otp': 'verificacion',
    '2fa-listo': 'listo',
};

function authRenderWizard(step) {
    const wizard = authEl('auth-wizard');
    if (!wizard) return;
    const current = authState.flujo === 'PRIMER_LOGIN' ? AUTH_WIZARD_MAP[step] : null;
    authShow(wizard, !!current);
    if (!current) return;
    const order = ['password', 'verificacion', 'listo'];
    const currentIndex = order.indexOf(current);
    wizard.querySelectorAll('li').forEach(li => {
        const index = order.indexOf(li.dataset.wizardStep);
        li.classList.toggle('is-current', index === currentIndex);
        li.classList.toggle('is-done', index < currentIndex);
    });
}

function authOnEnterStep(step) {
    switch (step) {
        case 'login':
            authRenderLoginStep();
            break;
        case 'canal-password':
            authRenderCanalStep();
            break;
        case 'derivacion-homebanking':
            authSetMessage('auth-hb-msg', AUTH_MESSAGES.MSG_16);
            break;
        case 'nueva-password':
            authRenderPasswordStep();
            break;
        case '2fa-mail':
            authRenderMailStep();
            break;
        case '2fa-otp':
            authRenderOtpStep();
            break;
        case 'olvide-password': {
            const input = authEl('auth-forgot-username');
            if (input) input.value = authProfile().username;
            break;
        }
        case 'aviso-ad':
            authSetMessage('auth-ad-msg', AUTH_MESSAGES.MSG_12);
            break;
        case 'usuario-bloqueado': {
            authSetMessage('auth-blocked-msg', AUTH_MESSAGES.MSG_02);
            const note = authEl('auth-blocked-note')?.querySelector('span');
            if (note) {
                note.textContent = authProfile().credencialAD
                    ? 'Para usuarios BANCO el desbloqueo se gestiona en el directorio corporativo o con la Mesa de Ayuda.'
                    : 'El desbloqueo se realiza cambiando tu contraseña o desde la Mesa de Ayuda.';
            }
            break;
        }
        default:
            break;
    }
}

function authRenderLoginStep() {
    const profile = authProfile();
    const usernameInput = authEl('username');
    const passwordInput = authEl('password');
    if (usernameInput) usernameInput.value = profile.username;
    if (passwordInput) passwordInput.value = '';
    authStopOtpTicker();
}

function authRenderCanalStep() {
    const profile = authProfile();
    authShow(authEl('auth-option-homebanking'), profile.homebanking);
    authShow(authEl('auth-canal-note'), !profile.homebanking);
}

function authRenderPasswordStep() {
    const nueva = authEl('auth-new-password');
    const confirma = authEl('auth-confirm-password');
    if (nueva) nueva.value = '';
    if (confirma) confirma.value = '';
    authValidatePasswordForm();
}

function authRenderMailStep() {
    const profile = authProfile();
    if (!authState.mailContacto) authState.mailContacto = profile.mail;
    authSetMessage('auth-mail-masked', authMaskMail(authState.mailContacto));
    authShow(authEl('auth-mail-group'), false);
    const input = authEl('auth-mail-input');
    if (input) input.value = '';
}

// ====== PANTALLA DE LOGIN (LO-07 / LO-10 / LO-25 / LO-34) ======

function authHandleLoginSubmit(event) {
    event.preventDefault();
    const usernameInput = authEl('username');
    const passwordInput = authEl('password');
    const username = usernameInput?.value.trim() || '';
    const password = passwordInput?.value || '';

    authShow(authEl('auth-username-error'), !username);
    authShow(authEl('auth-password-error'), !password);
    authShow(authEl('auth-login-msg'), false);
    if (!username || !password) return;

    authState.username = username;

    if (authState.estado === 'BLOQUEADO') {
        authGoToStep('usuario-bloqueado');
        return;
    }

    const profile = authProfile();
    const esperada = authState.estado === 'PRIMER_LOGIN' ? profile.tempPassword : authPasswordEsperada();

    if (password !== esperada) {
        authState.intentosFallidos += 1;
        const restantes = AUTH_RULES.maxIntentosPassword - authState.intentosFallidos;
        if (restantes <= 0) {
            authState.estado = 'BLOQUEADO';
            authGoToStep('usuario-bloqueado');
            return;
        }
        authSetMessage('auth-login-msg', AUTH_MESSAGES.MSG_01(restantes));
        if (passwordInput) passwordInput.value = '';
        return;
    }

    authState.intentosFallidos = 0;

    if (profile.credencialAD) {
        if (authState.estado === 'PASS_EXPIRADA') {
            authState.flujo = 'RECUPERO';
            authGoToStep('aviso-ad');
            return;
        }
        authState.flujo = authState.estado === 'PRIMER_LOGIN' ? 'PRIMER_LOGIN' : 'LOGIN';
        authGoToStep('2fa-ad');
        return;
    }

    if (authState.estado === 'PRIMER_LOGIN') {
        authState.flujo = 'PRIMER_LOGIN';
        authGoToStep('primer-login-temporal');
        return;
    }

    if (authState.estado === 'PASS_EXPIRADA') {
        authState.flujo = 'RECUPERO';
        authGoToStep(profile.homebanking ? 'canal-password' : 'nueva-password');
        return;
    }

    authState.flujo = 'LOGIN';
    authSendOtp({ silent: true });
    authGoToStep('2fa-otp');
}

// ====== NUEVA CONTRASEÑA (LO-10 / LO-13 / LO-32 / LO-33) ======

function authPasswordRules(value) {
    const anterior = authState.estado === 'PRIMER_LOGIN'
        ? authProfile().tempPassword
        : authPasswordEsperada();
    return {
        length: value.length >= 8,
        upper: /[A-ZÁÉÍÓÚÑ]/.test(value),
        lower: /[a-záéíóúñ]/.test(value),
        number: /[0-9]/.test(value),
        special: /[^A-Za-z0-9]/.test(value),
        distinct: value.length > 0 && value !== anterior,
    };
}

function authValidatePasswordForm() {
    const value = authEl('auth-new-password')?.value || '';
    const confirmation = authEl('auth-confirm-password')?.value || '';
    const rules = authPasswordRules(value);

    document.querySelectorAll('#auth-policy-list li').forEach(li => {
        const ok = !!rules[li.dataset.rule];
        li.classList.toggle('is-ok', ok);
        const icon = li.querySelector('i');
        if (icon) icon.className = ok ? 'ph ph-check-circle' : 'ph ph-circle';
    });

    const policyOk = Object.values(rules).every(Boolean);
    const matchOk = confirmation.length > 0 && confirmation === value;
    authShow(authEl('auth-confirm-error'), confirmation.length > 0 && !matchOk);

    const submit = authEl('auth-password-submit');
    if (submit) submit.disabled = !(policyOk && matchOk);
    return policyOk && matchOk;
}

function authHandlePasswordSubmit(event) {
    event.preventDefault();
    const value = authEl('auth-new-password')?.value || '';
    const confirmation = authEl('auth-confirm-password')?.value || '';
    const rules = authPasswordRules(value);

    if (!Object.values(rules).every(Boolean)) {
        authSetMessage('auth-password-msg', AUTH_MESSAGES.MSG_04);
        return;
    }
    if (value !== confirmation) {
        authSetMessage('auth-password-msg', AUTH_MESSAGES.MSG_05);
        return;
    }

    authState.passwordDefinida = value;
    authState.estado = 'RECURRENTE';

    if (authState.flujo === 'PRIMER_LOGIN') {
        authGoToStep('2fa-mail');
        return;
    }
    authGoToStep('password-actualizada');
}

// ====== CÓDIGO OTP (LO-22 / LO-24 / LO-27 / LO-28) ======

function authGenerateOtp() {
    return String(Math.floor(100000 + Math.random() * 900000));
}

function authSendOtp({ silent = false } = {}) {
    const profile = authProfile();
    if (!authState.mailContacto) authState.mailContacto = profile.mail;
    authState.otp = authGenerateOtp();
    authState.otpIntentos = 0;
    authState.otpEnviadoEn = Date.now();
    if (!silent) authState.otpReenvios += 1;
    return authState.otp;
}

function authOtpSegundosRestantes() {
    if (!authState.otpEnviadoEn) return 0;
    const transcurrido = Math.floor((Date.now() - authState.otpEnviadoEn) / 1000);
    return Math.max(AUTH_RULES.otpVigenciaSegundos - transcurrido, 0);
}

function authOtpCooldownRestante() {
    if (!authState.otpEnviadoEn) return 0;
    const transcurrido = Math.floor((Date.now() - authState.otpEnviadoEn) / 1000);
    return Math.max(AUTH_RULES.otpCooldownSegundos - transcurrido, 0);
}

function authRenderOtpStep() {
    if (!authState.otp) authSendOtp({ silent: true });
    const input = authEl('auth-otp-input');
    if (input) input.value = '';
    const submit = authEl('auth-otp-submit');
    if (submit) submit.disabled = true;
    authSetMessage('auth-otp-sent', AUTH_MESSAGES.MSG_08(authMaskMail(authState.mailContacto)));
    authShow(authEl('auth-trust-device-wrap'), authState.flujo !== 'PRIMER_LOGIN');
    authRenderOtpDemoHint();
    authStartOtpTicker();
}

function authRenderOtpDemoHint() {
    const hint = authEl('auth-otp-demo-hint');
    if (!hint) return;
    hint.textContent = `Demo: el código generado es ${authState.otp}. En el producto llega por correo.`;
    authShow(hint, !document.body.classList.contains('auth-demo-off'));
}

function authStartOtpTicker() {
    authStopOtpTicker();
    const paint = () => {
        const expiry = authEl('auth-otp-expiry');
        const resend = authEl('auth-otp-resend');
        const restante = authOtpSegundosRestantes();
        const cooldown = authOtpCooldownRestante();
        if (expiry) {
            const min = String(Math.floor(restante / 60)).padStart(1, '0');
            const sec = String(restante % 60).padStart(2, '0');
            expiry.textContent = restante > 0
                ? `El código vence en ${min}:${sec}`
                : 'El código venció';
        }
        if (resend) {
            resend.disabled = cooldown > 0;
            resend.textContent = cooldown > 0
                ? `Reenviar código (${cooldown}s)`
                : 'Reenviar código';
        }
    };
    paint();
    authOtpTicker = setInterval(paint, 1000);
}

function authStopOtpTicker() {
    if (authOtpTicker) {
        clearInterval(authOtpTicker);
        authOtpTicker = null;
    }
}

function authHandleOtpValidation() {
    const value = authEl('auth-otp-input')?.value.trim() || '';
    if (value.length !== AUTH_RULES.otpDigitos) return;

    if (authOtpSegundosRestantes() <= 0) {
        authSetMessage('auth-otp-msg', AUTH_MESSAGES.MSG_07);
        return;
    }

    if (value !== authState.otp) {
        authState.otpIntentos += 1;
        const restantes = AUTH_RULES.otpMaxIntentos - authState.otpIntentos;
        if (restantes <= 0) {
            authState.otp = null;
            authState.otpEnviadoEn = null;
            authSetMessage('auth-otp-msg', AUTH_MESSAGES.MSG_07);
            authStopOtpTicker();
            return;
        }
        authSetMessage('auth-otp-msg', AUTH_MESSAGES.MSG_06(restantes));
        return;
    }

    const trustDevice = authEl('auth-trust-device')?.checked;
    authState.otp = null;
    authState.otpEnviadoEn = null;
    authState.dispositivoConfiable = !!trustDevice;
    authStopOtpTicker();

    if (authState.flujo === 'PRIMER_LOGIN') {
        authGoToStep('2fa-listo');
        return;
    }
    if (authState.flujo === 'RECUPERO') {
        authGoToStep('nueva-password');
        return;
    }
    authEnterPlatform();
}

function authHandleOtpResend() {
    const cooldown = authOtpCooldownRestante();
    if (cooldown > 0) {
        authSetMessage('auth-otp-msg', AUTH_MESSAGES.MSG_09(cooldown));
        return;
    }
    if (authState.otpReenvios >= AUTH_RULES.otpMaxReenvios) {
        authSetMessage('auth-otp-msg', 'Alcanzaste el máximo de reenvíos. Reintentá el ingreso más tarde o contactá a la Mesa de Ayuda.');
        return;
    }
    authSendOtp();
    authRenderOtpStep();
}

// ====== OLVIDÉ MI CONTRASEÑA (LO-30 / LO-31 / LO-32) ======

function authHandleForgotSubmit(event) {
    event.preventDefault();
    const input = authEl('auth-forgot-username');
    const username = input?.value.trim() || '';
    authShow(authEl('auth-forgot-error'), !username);
    if (!username) return;

    authState.flujo = 'RECUPERO';
    const profile = authProfile();

    if (profile.credencialAD) {
        authGoToStep('aviso-ad');
        return;
    }
    if (profile.homebanking) {
        authGoToStep('canal-password');
        return;
    }
    authSendOtp({ silent: true });
    authGoToStep('2fa-otp');
}

// ====== ENTRADA A LA PLATAFORMA ======

function authEnterPlatform({ sinCredenciales = false } = {}) {
    const profile = authProfile();
    const usernameInput = authEl('username');
    if (usernameInput) usernameInput.value = authState.username || profile.username;
    authStopOtpTicker();
    if (typeof enterPlatformSession === 'function') {
        enterPlatformSession(usernameInput?.value, { sinCredenciales });
    }
    authStartIdleWatcher();
}

function authLogout(motivo = 'MANUAL') {
    authStopIdleWatcher();
    closeModal('session-timeout-modal');
    document.getElementById('app-view')?.classList.remove('active');
    document.getElementById('login-view')?.classList.add('active');

    authState.flujo = 'LOGIN';
    authState.otp = null;
    authState.otpEnviadoEn = null;
    authState.otpReenvios = 0;
    if (authState.estado === 'PRIMER_LOGIN' && authState.passwordDefinida) {
        authState.estado = 'RECURRENTE';
    }
    authGoToStep('login');
    authSyncDemoPanel();

    const banner = authEl('auth-login-banner');
    if (banner) {
        if (motivo === 'INACTIVIDAD') {
            banner.textContent = AUTH_MESSAGES.MSG_11;
            banner.className = 'auth-banner auth-banner--warning';
            authShow(banner, true);
        } else {
            authShow(banner, false);
        }
    }
}

// ====== CIERRE DE SESIÓN POR INACTIVIDAD (LO-29) ======

let authIdleWarningTimer = null;
let authIdleLogoutTimer = null;
let authIdleCountdown = null;
let authIdleListenersReady = false;

function authIdlePreset() {
    return AUTH_IDLE_PRESETS[authState.idlePreset] || AUTH_IDLE_PRESETS.real;
}

function authStartIdleWatcher() {
    if (!authIdleListenersReady) {
        ['click', 'keydown', 'mousemove', 'scroll', 'touchstart'].forEach(evt => {
            document.addEventListener(evt, authOnUserActivity, { passive: true });
        });
        authIdleListenersReady = true;
    }
    authResetIdleTimers();
}

function authOnUserActivity() {
    if (!document.getElementById('app-view')?.classList.contains('active')) return;
    if (document.getElementById('session-timeout-modal')?.classList.contains('active')) return;
    authResetIdleTimers();
}

function authResetIdleTimers() {
    const preset = authIdlePreset();
    clearTimeout(authIdleWarningTimer);
    clearTimeout(authIdleLogoutTimer);
    clearInterval(authIdleCountdown);
    authIdleWarningTimer = setTimeout(authShowIdleWarning, Math.max(preset.totalMs - preset.warningMs, 0));
}

function authShowIdleWarning() {
    const preset = authIdlePreset();
    let restante = Math.round(preset.warningMs / 1000);
    const seconds = authEl('session-timeout-seconds');
    if (seconds) seconds.textContent = String(restante);
    openModal('session-timeout-modal');

    clearInterval(authIdleCountdown);
    authIdleCountdown = setInterval(() => {
        restante -= 1;
        if (seconds) seconds.textContent = String(Math.max(restante, 0));
        if (restante <= 0) clearInterval(authIdleCountdown);
    }, 1000);

    authIdleLogoutTimer = setTimeout(() => authLogout('INACTIVIDAD'), preset.warningMs);
}

function authExtendSession() {
    closeModal('session-timeout-modal');
    authResetIdleTimers();
}

function authStopIdleWatcher() {
    clearTimeout(authIdleWarningTimer);
    clearTimeout(authIdleLogoutTimer);
    clearInterval(authIdleCountdown);
}

// ====== PANEL DE ESCENARIOS DE DEMO ======

function authRenderDemoSteps() {
    const container = authEl('auth-demo-steps');
    if (!container) return;
    container.innerHTML = '';
    AUTH_DEMO_STEPS.forEach(item => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'auth-demo-step';
        btn.dataset.demoStep = item.step;
        btn.innerHTML = `<span>${item.label}</span><small>${item.hu}</small>`;
        btn.addEventListener('click', () => authOpenDemoStep(item));
        container.appendChild(btn);
    });
}

function authOpenDemoStep(item) {
    if (item.perfil) {
        authState.perfil = item.perfil;
        const select = authEl('auth-demo-perfil');
        if (select) select.value = item.perfil;
    }
    if (item.estado) {
        authState.estado = item.estado;
        const select = authEl('auth-demo-estado');
        if (select) select.value = item.estado;
    }
    authSyncDemoPanel();

    if (item.step === 'plataforma') {
        authEnterPlatform({ sinCredenciales: true });
        return;
    }

    // Cada pantalla necesita el contexto de flujo correcto para ser representativa.
    if (['primer-login-temporal', 'canal-password', '2fa-mail', '2fa-listo'].includes(item.step)) {
        authState.flujo = 'PRIMER_LOGIN';
    } else if (['derivacion-homebanking', 'password-actualizada'].includes(item.step)) {
        authState.flujo = 'RECUPERO';
    } else if (item.step === 'nueva-password') {
        authState.flujo = authState.estado === 'PRIMER_LOGIN' ? 'PRIMER_LOGIN' : 'RECUPERO';
    } else if (item.step === '2fa-otp') {
        authState.flujo = authState.estado === 'PRIMER_LOGIN' ? 'PRIMER_LOGIN' : 'LOGIN';
        authSendOtp({ silent: true });
    }

    authState.username = authProfile().username;
    authGoToStep(item.step);
}

function authSyncDemoPanel() {
    const profile = authProfile();
    const hint = authEl('auth-demo-credentials');
    if (hint) {
        const password = authState.estado === 'PRIMER_LOGIN'
            ? profile.tempPassword
            : authPasswordEsperada();
        hint.innerHTML = authState.estado === 'BLOQUEADO'
            ? `Usuario <code>${profile.username}</code> · credencial bloqueada: cualquier contraseña muestra el bloqueo (LO-34).`
            : `Usuario <code>${profile.username}</code> · contraseña <code>${password}</code>${authState.estado === 'PRIMER_LOGIN' ? ' (temporal)' : ''}. Con otra contraseña se ven los intentos fallidos.`;
    }
    if (authState.step === 'login') authRenderLoginStep();
}

function authToggleDemoPanel(visible) {
    document.body.classList.toggle('auth-demo-off', !visible);
    authShow(authEl('auth-demo'), visible);
    authShow(authEl('auth-demo-show'), !visible);
    const pill = authEl('auth-hu-pill');
    if (pill) authShow(pill, visible && !!pill.textContent);
    authShow(authEl('auth-otp-demo-hint'), visible && authState.step === '2fa-otp');
    authShow(authEl('auth-idle-fab'), visible);
}

// ====== DEEP LINKS (?paso= / ?perfil= / ?estado= / ?panel= / ?inactividad=) ======

function authApplyUrlParams() {
    const params = new URLSearchParams(window.location.search);
    const perfil = params.get('perfil');
    const estado = params.get('estado');
    const idle = params.get('inactividad');
    const panel = params.get('panel');
    const paso = params.get('paso');

    if (perfil && AUTH_PROFILES[perfil]) {
        authState.perfil = perfil;
        const select = authEl('auth-demo-perfil');
        if (select) select.value = perfil;
    }
    if (estado && ['PRIMER_LOGIN', 'RECURRENTE', 'PASS_EXPIRADA', 'BLOQUEADO'].includes(estado)) {
        authState.estado = estado;
        const select = authEl('auth-demo-estado');
        if (select) select.value = estado;
    }
    if (idle && AUTH_IDLE_PRESETS[idle]) {
        authState.idlePreset = idle;
        const select = authEl('auth-demo-idle');
        if (select) select.value = idle;
    }
    if (panel === '0') authToggleDemoPanel(false);

    authSyncDemoPanel();

    if (paso) {
        const item = AUTH_DEMO_STEPS.find(step => step.step === paso);
        if (item) authOpenDemoStep({ ...item, perfil: perfil || item.perfil, estado: estado || item.estado });
    }
}

// ====== BINDINGS ======

const AUTH_ACTIONS = {
    'olvide-password': () => { authState.flujo = 'RECUPERO'; authGoToStep('olvide-password'); },
    'volver-login': () => { authState.flujo = 'LOGIN'; authGoToStep('login'); },
    'ad-aprobar': () => authEnterPlatform(),
    'ad-rechazar': () => {
        authGoToStep('login');
        authSetMessage('auth-login-msg', AUTH_MESSAGES.MSG_14);
    },
    'ir-canal-password': () => {
        const profile = authProfile();
        authGoToStep(profile.homebanking ? 'canal-password' : 'nueva-password');
    },
    'canal-homebanking': () => authGoToStep('derivacion-homebanking'),
    'canal-manual': () => authGoToStep('nueva-password'),
    'hb-confirmar': () => {
        authGoToStep('login');
        const banner = authEl('auth-login-banner');
        if (banner) {
            banner.textContent = 'Actualizá tu contraseña en Home Banking y volvé a ingresar con la nueva contraseña.';
            banner.className = 'auth-banner auth-banner--info';
            authShow(banner, true);
        }
    },
    'cambiar-mail': () => {
        authShow(authEl('auth-mail-group'), true);
        authEl('auth-mail-input')?.focus();
    },
    'enviar-otp': () => {
        const group = authEl('auth-mail-group');
        if (group && !group.classList.contains('hidden')) {
            const value = authEl('auth-mail-input')?.value.trim() || '';
            const valido = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);
            authShow(authEl('auth-mail-error'), !valido);
            if (!valido) return;
            authState.mailContacto = value;
        }
        authSendOtp({ silent: true });
        authGoToStep('2fa-otp');
    },
    'reenviar-otp': () => authHandleOtpResend(),
    'validar-otp': () => authHandleOtpValidation(),
    'entrar-plataforma': () => authEnterPlatform(),
};

function authBindEvents() {
    document.getElementById('login-form')?.addEventListener('submit', authHandleLoginSubmit);
    document.getElementById('auth-password-form')?.addEventListener('submit', authHandlePasswordSubmit);
    document.getElementById('auth-forgot-form')?.addEventListener('submit', authHandleForgotSubmit);

    document.querySelectorAll('[data-auth-action]').forEach(el => {
        el.addEventListener('click', (event) => {
            event.preventDefault();
            const action = AUTH_ACTIONS[el.dataset.authAction];
            if (typeof action === 'function') action();
        });
    });

    document.querySelectorAll('[data-toggle-password]').forEach(btn => {
        btn.addEventListener('click', () => {
            const input = authEl(btn.dataset.togglePassword);
            if (!input) return;
            const visible = input.type === 'text';
            input.type = visible ? 'password' : 'text';
            const icon = btn.querySelector('i');
            if (icon) icon.className = visible ? 'ph ph-eye' : 'ph ph-eye-slash';
        });
    });

    authEl('auth-bypass-btn')?.addEventListener('click', () => authEnterPlatform({ sinCredenciales: true }));

    ['auth-new-password', 'auth-confirm-password'].forEach(id => {
        authEl(id)?.addEventListener('input', authValidatePasswordForm);
    });

    const otpInput = authEl('auth-otp-input');
    otpInput?.addEventListener('input', () => {
        otpInput.value = otpInput.value.replace(/\D/g, '').slice(0, AUTH_RULES.otpDigitos);
        const submit = authEl('auth-otp-submit');
        if (submit) submit.disabled = otpInput.value.length !== AUTH_RULES.otpDigitos;
    });
    otpInput?.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            authHandleOtpValidation();
        }
    });

    authEl('auth-demo-perfil')?.addEventListener('change', (event) => {
        authState.perfil = event.target.value;
        authState.passwordDefinida = null;
        authState.mailContacto = '';
        authSyncDemoPanel();
        if (authState.step !== 'login') authGoToStep(authState.step);
    });
    authEl('auth-demo-estado')?.addEventListener('change', (event) => {
        authState.estado = event.target.value;
        authState.intentosFallidos = 0;
        authState.passwordDefinida = null;
        authSyncDemoPanel();
    });
    authEl('auth-demo-idle')?.addEventListener('change', (event) => {
        authState.idlePreset = event.target.value;
        if (document.getElementById('app-view')?.classList.contains('active')) authResetIdleTimers();
    });
    authEl('auth-demo-hide')?.addEventListener('click', () => authToggleDemoPanel(false));
    authEl('auth-demo-show')?.addEventListener('click', () => authToggleDemoPanel(true));

    authEl('session-timeout-extend')?.addEventListener('click', authExtendSession);
    authEl('session-timeout-logout')?.addEventListener('click', () => authLogout('MANUAL'));
    authEl('auth-idle-fab')?.addEventListener('click', () => {
        clearTimeout(authIdleWarningTimer);
        authShowIdleWarning();
    });
}

document.addEventListener('DOMContentLoaded', () => {
    authRenderDemoSteps();
    authBindEvents();
    authGoToStep('login');
    authApplyUrlParams();
});
