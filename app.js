// ====== ESTADO DE LA APP (MOCK DATA) ======

// Máquina de estados — flujo normal (diagrama POC). Solo estos estados existen en la lógica.
const INVOICE_STATES = {
    PENDIENTE: 'Pendiente',
    HABILITADA: 'Habilitada',
    BLOQUEADA: 'Bloqueada',
    PENDIENTE_APROBACION_EGP: 'Pendiente aprobación EGP',
    PENDIENTE_APROBACION_BANCO: 'Pendiente aprobación banco',
    PENDIENTE_DESEMBOLSO: 'Pendiente de desembolso',
    FINANCIADA: 'Financiada',
    VENCIDA: 'Vencida',
    NO_ELEGIBLE: 'NO ELEGIBLE',
};

// Pestañas de visualización Confirming
const INVOICE_VIEW_TABS = {
    VIGENTES: 'vigentes',
    NO_VIGENTES: 'no-vigentes',
    NO_OPERABLES: 'no-operables',
};
const INVOICE_STATES_BY_VIEW_TAB = {
    [INVOICE_VIEW_TABS.VIGENTES]: new Set([
        INVOICE_STATES.PENDIENTE,
        INVOICE_STATES.HABILITADA,
        INVOICE_STATES.BLOQUEADA,
        INVOICE_STATES.PENDIENTE_APROBACION_EGP,
        INVOICE_STATES.PENDIENTE_DESEMBOLSO,
        INVOICE_STATES.PENDIENTE_APROBACION_BANCO, // MVP2 — operativa, visible en vigentes
    ]),
    [INVOICE_VIEW_TABS.NO_VIGENTES]: new Set([
        INVOICE_STATES.FINANCIADA,
        INVOICE_STATES.VENCIDA,
    ]),
    [INVOICE_VIEW_TABS.NO_OPERABLES]: new Set([
        INVOICE_STATES.NO_ELEGIBLE,
    ]),
};

let currentInvoiceViewTab = INVOICE_VIEW_TABS.VIGENTES;

// Mock: al menos 2 facturas por cada estado de la máquina
let invoices = [
    { id: '001-001-0001001', egp: 'Retail S.A.', prov: 'Tech Solutions S.A.', emision: '2026-05-01', vto: '2026-07-01', moneda: 'GS', monto: 12000000, estado: INVOICE_STATES.PENDIENTE },
    { id: '001-002-0001002', egp: 'Tigo Paraguay', prov: 'Logistica Integral', emision: '2026-05-03', vto: '2026-07-03', moneda: 'GS', monto: 5400000, estado: INVOICE_STATES.PENDIENTE },
    { id: '001-001-0002001', egp: 'Retail S.A.', prov: 'Tech Solutions S.A.', emision: '2026-05-01', vto: '2026-06-30', moneda: 'GS', monto: 15000000, estado: INVOICE_STATES.HABILITADA },
    { id: '001-001-0002002', egp: 'Retail S.A.', prov: 'Tech Solutions S.A.', emision: '2026-05-05', vto: '2026-07-05', moneda: 'GS', monto: 8800000, estado: INVOICE_STATES.HABILITADA },
    { id: '001-001-0003001', egp: 'Retail S.A.', prov: 'Tech Solutions S.A.', emision: '2026-05-02', vto: '2026-07-02', moneda: 'USD', monto: 2500, estado: INVOICE_STATES.BLOQUEADA },
    { id: '001-003-0003002', egp: 'Cervepar', prov: 'Agencia Creativa', emision: '2026-04-20', vto: '2026-06-20', moneda: 'USD', monto: 1800, estado: INVOICE_STATES.BLOQUEADA },
    { id: '001-001-0004001', egp: 'Retail S.A.', prov: 'Tech Solutions S.A.', emision: '2026-05-08', vto: '2026-07-08', moneda: 'GS', monto: 9800000, estado: INVOICE_STATES.PENDIENTE_APROBACION_EGP },
    { id: '001-003-0004002', egp: 'Cervepar', prov: 'Servicios IT', emision: '2026-05-09', vto: '2026-07-09', moneda: 'GS', monto: 11200000, estado: INVOICE_STATES.PENDIENTE_APROBACION_EGP },
    { id: '001-002-0005001', egp: 'Tigo Paraguay', prov: 'Servicios IT', emision: '2026-04-25', vto: '2026-06-25', moneda: 'GS', monto: 22000000, estado: INVOICE_STATES.PENDIENTE_APROBACION_BANCO },
    { id: '001-002-0005002', egp: 'Tigo Paraguay', prov: 'Logistica Integral', emision: '2026-04-28', vto: '2026-06-28', moneda: 'GS', monto: 7600000, estado: INVOICE_STATES.PENDIENTE_APROBACION_BANCO },
    { id: '001-001-0006001', egp: 'Retail S.A.', prov: 'Tech Solutions S.A.', emision: '2026-05-10', vto: '2026-07-10', moneda: 'GS', monto: 6500000, estado: INVOICE_STATES.PENDIENTE_DESEMBOLSO },
    { id: '001-003-0006002', egp: 'Cervepar', prov: 'Agencia Creativa', emision: '2026-05-11', vto: '2026-07-11', moneda: 'USD', monto: 4200, estado: INVOICE_STATES.PENDIENTE_DESEMBOLSO },
    { id: '001-003-0007001', egp: 'Tigo Paraguay', prov: 'Servicios IT', emision: '2026-04-20', vto: '2026-06-20', moneda: 'GS', monto: 50000000, estado: INVOICE_STATES.FINANCIADA },
    { id: '001-001-0007002', egp: 'Retail S.A.', prov: 'Logistica Integral', emision: '2026-03-15', vto: '2026-05-15', moneda: 'GS', monto: 9200000, estado: INVOICE_STATES.FINANCIADA },
    { id: '001-002-0008001', egp: 'Tigo Paraguay', prov: 'Tech Solutions S.A.', emision: '2026-02-15', vto: '2026-03-15', moneda: 'GS', monto: 2100000, estado: INVOICE_STATES.VENCIDA },
    { id: '001-003-0008002', egp: 'Cervepar', prov: 'Limpieza Total SRL', emision: '2026-01-10', vto: '2026-02-10', moneda: 'GS', monto: 3100000, estado: INVOICE_STATES.VENCIDA },
    { id: '001-001-0009001', egp: 'Retail S.A.', prov: 'Tech Solutions S.A.', emision: '2026-05-18', vto: '2026-07-20', moneda: 'GS', monto: 4500000, estado: INVOICE_STATES.NO_ELEGIBLE },
    { id: '001-002-0009002', egp: 'Tigo Paraguay', prov: 'Logistica Integral', emision: '2026-05-17', vto: '2026-08-01', moneda: 'GS', monto: 2800000, estado: INVOICE_STATES.NO_ELEGIBLE },
];
invoices.forEach(inv => {
    if (!inv.fechaPago) inv.fechaPago = inv.vto;
});
patchNoElegibleInvoiceMocks();

// Fecha de pago: mínimo 30 días calendario desde hoy para ser operable.
const PAYMENT_DATE_MIN_DAYS = 30;
let editingFechaPagoInvoiceId = null;
let newInvoiceFechaPagoTouched = false;

function parseLocalDate(isoDate) {
    const [y, m, d] = String(isoDate || '').split('-').map(Number);
    if (!y || !m || !d) return null;
    return new Date(y, m - 1, d);
}

function daysFromTodayTo(isoDate) {
    const target = parseLocalDate(isoDate);
    if (!target) return NaN;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    target.setHours(0, 0, 0, 0);
    return Math.round((target - today) / 86400000);
}

function isPaymentDateEligible(fechaPago) {
    const days = daysFromTodayTo(fechaPago);
    return Number.isFinite(days) && days >= PAYMENT_DATE_MIN_DAYS;
}

function resolveInitialInvoiceState(requestedEstado, fechaPago) {
    if (!isPaymentDateEligible(fechaPago)) return INVOICE_STATES.NO_ELEGIBLE;
    return requestedEstado;
}

function getInvoiceFechaPago(inv) {
    return inv.fechaPago || inv.vto || '';
}

// ====== Formato de fechas dd-mm-yyyy (visualización e inputs) ======

function pad2(n) { return String(n).padStart(2, '0'); }

function formatDateISOFromParts(y, m, d) {
    return `${y}-${pad2(m)}-${pad2(d)}`;
}

function formatDateDDMMYYYY(iso) {
    if (!iso) return '—';
    const parts = String(iso).trim().split('-');
    if (parts.length !== 3) return iso;
    const [y, m, d] = parts;
    return `${d}-${m}-${y}`;
}

function parseDDMMYYYYToISO(value) {
    if (value == null || value === '') return '';
    const s = String(value).trim();
    let m = s.match(/^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})$/);
    if (m) return formatDateISOFromParts(+m[3], +m[2], +m[1]);
    m = s.match(/^(\d{4})[\/\-](\d{1,2})[\/\-](\d{1,2})$/);
    if (m) return formatDateISOFromParts(+m[1], +m[2], +m[3]);
    return '';
}

function normalizeDateToISO(value) {
    if (!value) return '';
    if (/^\d{4}-\d{2}-\d{2}$/.test(String(value).trim())) return value;
    return parseDDMMYYYYToISO(value);
}

function setDateInputValue(inputId, iso) {
    const el = document.getElementById(inputId);
    if (!el) return;
    el.value = iso ? formatDateDDMMYYYY(iso) : '';
    el.dataset.isoValue = iso || '';
}

function readDateInputValue(inputId) {
    const el = document.getElementById(inputId);
    if (!el) return '';
    const iso = normalizeDateToISO(el.value.trim());
    if (iso) el.dataset.isoValue = iso;
    return iso;
}

function todayISO() {
    const t = new Date();
    return formatDateISOFromParts(t.getFullYear(), t.getMonth() + 1, t.getDate());
}

function patchNoElegibleInvoiceMocks() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const fechaPago = new Date(today);
    const vto = new Date(today);
    vto.setDate(vto.getDate() + 45);
    const emision = new Date(today);
    emision.setDate(emision.getDate() - 20);
    const fpIso = todayISO();
    const vtoIso = formatDateISOFromParts(vto.getFullYear(), vto.getMonth() + 1, vto.getDate());
    const emIso = formatDateISOFromParts(emision.getFullYear(), emision.getMonth() + 1, emision.getDate());
    ['001-001-0009001', '001-002-0009002'].forEach(id => {
        const inv = invoices.find(i => i.id === id);
        if (!inv) return;
        inv.fechaPago = fpIso;
        inv.vto = vtoIso;
        inv.emision = emIso;
    });
}

// Participantes (EGPs y Proveedores)
let participants = [
    { id: 1, tipo: 'EGP', ruc: '80012345-6', razon: 'Retail S.A.', email: 'admin@retail.com.py', telefono: '+595 21 123456', monedas: ['GS', 'USD'], lineaCredito: 500000000, tasaInteres: 12, tasaComision: 1.5, iva: 10, condiciones: 'Pago a 30/60/90 días', clienteAtlas: true, desembolsoAuto: true },
    { id: 2, tipo: 'EGP', ruc: '80054321-7', razon: 'Tigo Paraguay', email: 'finanzas@tigo.com.py', telefono: '+595 21 654321', monedas: ['GS'], lineaCredito: 2000000000, tasaInteres: 11, tasaComision: 1.2, iva: 10, condiciones: '', clienteAtlas: false, desembolsoAuto: false },
    { id: 3, tipo: 'EGP', ruc: '80067890-1', razon: 'Cervepar', email: 'cuentas@cervepar.com.py', telefono: '+595 21 789012', monedas: ['GS', 'USD'], lineaCredito: 800000000, tasaInteres: 13, tasaComision: 1.8, iva: 10, condiciones: 'Límite USD 50,000 por operación', clienteAtlas: true, desembolsoAuto: true },
    { id: 4, tipo: 'Proveedor', egpPadreId: 1, ruc: '80099999-2', razon: 'Tech Solutions S.A.', email: 'pagos@techsolutions.com.py', telefono: '+595 21 999888', monedas: ['USD'], lineaCredito: 0, tasaInteres: 12, tasaComision: 1.5, iva: 10, condiciones: '', clienteAtlas: false, desembolsoAuto: true },
    { id: 5, tipo: 'Proveedor', egpPadreId: 2, ruc: '80011111-3', razon: 'Logistica Integral', email: 'cobranzas@logistica.com.py', telefono: '+595 21 111222', monedas: ['GS'], lineaCredito: 0, tasaInteres: 12, tasaComision: 1.5, iva: 10, condiciones: '', clienteAtlas: true, desembolsoAuto: true },
    { id: 6, tipo: 'Proveedor', egpPadreId: 3, ruc: '80022222-4', razon: 'Limpieza Total SRL', email: 'admin@limpiezatotal.com.py', telefono: '+595 21 222333', monedas: ['GS'], lineaCredito: 0, tasaInteres: 12, tasaComision: 1.5, iva: 10, condiciones: '', clienteAtlas: false, desembolsoAuto: true },
    { id: 7, tipo: 'Proveedor', egpPadreId: 1, ruc: '80033333-5', razon: 'Servicios IT', email: 'contacto@serviciosit.com.py', telefono: '+595 21 333444', monedas: ['GS', 'USD'], lineaCredito: 0, tasaInteres: 12, tasaComision: 1.5, iva: 10, condiciones: '', clienteAtlas: true, desembolsoAuto: true },
    { id: 8, tipo: 'Proveedor', egpPadreId: 3, ruc: '80044444-6', razon: 'Agencia Creativa', email: 'hola@agenciacreativa.com.py', telefono: '+595 21 444555', monedas: ['USD'], lineaCredito: 0, tasaInteres: 12, tasaComision: 1.5, iva: 10, condiciones: '', clienteAtlas: false, desembolsoAuto: true },
    { id: 9, tipo: 'Proveedor', egpPadreId: 2, ruc: '80012345-6', razon: 'Retail S.A.', email: 'admin@retail.com.py', telefono: '+595 21 123456', monedas: ['GS', 'USD'], lineaCredito: 0, tasaInteres: 12, tasaComision: 1.5, iva: 10, condiciones: '', clienteAtlas: true, desembolsoAuto: true, bloqueado: false },
];

let nextParticipantId = 10;
let editingParticipantId = null;

participants.forEach(p => {
    if (p.bloqueado == null) p.bloqueado = false;
});

const ABM_USER_STATES = {
    PENDIENTE_AUTORIZACION: 'Pendiente de Autorización',
    AUTORIZADO: 'Autorizado',
    RECHAZADO: 'Rechazado',
};

const ABM_ACCESS_STATES = {
    ACTIVO: 'Activo',
    BLOQUEADO: 'Bloqueado',
};

let abmUsers = [
    { id: 1, nombre: 'Ana', apellido: 'Gómez', documento: '1234567', email: 'a.gomez@retail.com.py', telefono: '+595 981 111222', enteId: 1, rolId: 7, estado: ABM_USER_STATES.AUTORIZADO, bloqueado: false },
    { id: 2, nombre: 'Carlos', apellido: 'Vera', documento: '2345678', email: 'c.vera@tigo.com.py', telefono: '+595 981 333444', enteId: 2, rolId: 8, estado: ABM_USER_STATES.PENDIENTE_AUTORIZACION, bloqueado: false },
    { id: 3, nombre: 'Laura', apellido: 'Benítez', documento: '3456789', email: 'l.benitez@techsolutions.com.py', telefono: '+595 985 555666', enteId: 4, rolId: 10, estado: ABM_USER_STATES.AUTORIZADO, bloqueado: false },
    { id: 4, nombre: 'María', apellido: 'Acosta', documento: '5678901', email: 'm.acosta@cervepar.com.py', telefono: '+595 981 777888', enteId: 3, rolId: 8, estado: ABM_USER_STATES.RECHAZADO, bloqueado: false, motivoRechazo: 'Documentación de respaldo incompleta' },
];
abmUsers.forEach(u => {
    if (!u.estado) u.estado = ABM_USER_STATES.PENDIENTE_AUTORIZACION;
    if (u.bloqueado == null) u.bloqueado = false;
});
let nextAbmUserId = 5;
let editingAbmUserId = null;
let managingAbmUserAuthId = null;
let editingAbmUserSnapshot = null;

let abmAuditLog = [];
let nextAbmAuditLogId = 1;

// Sesión POC del usuario logueado (dominio / rol / documento para reglas de UI)
let loggedSession = { dominio: 'Banco', rol: 'ADMIN', documento: '9000001', abmUserId: null, username: 'admin' };

const LOGIN_SESSION_PROFILES = {
    admin: { dominio: 'Banco', rol: 'ADMIN', documento: '9000001', abmUserId: null },
    administrador: { dominio: 'Banco', rol: 'ADMIN', documento: '9000001', abmUserId: null },
    ana: { dominio: 'EGP', rol: 'ADMIN', abmUserId: 1 },
    carlos: { dominio: 'EGP', rol: 'OPERADOR', abmUserId: 2 },
    laura: { dominio: 'Proveedor', rol: 'ADMIN', abmUserId: 3 },
    proveedor: { dominio: 'Proveedor', rol: 'ADMIN', abmUserId: 3 },
    supervisor: { dominio: 'Proveedor', rol: 'SUPERVISOR', documento: '9000002', abmUserId: null },
};

function syncLoggedSessionFromLogin(username) {
    const raw = String(username || 'admin').trim();
    const key = raw.toLowerCase().split('@')[0].split('.')[0];
    const profile = LOGIN_SESSION_PROFILES[key] || { dominio: 'Banco', rol: 'ADMIN', documento: '9000001', abmUserId: null };
    const linkedUser = profile.abmUserId ? abmUsers.find(u => u.id === profile.abmUserId) : null;
    loggedSession = {
        ...profile,
        username: raw || 'admin',
        documento: linkedUser?.documento || profile.documento || '',
    };
}

function getLoggedSession() {
    return loggedSession;
}

function getLoggedSessionRoleRecord() {
    const { dominio, rol } = getLoggedSession();
    return abmRoles.find(r => r.dominio === dominio && r.rol === rol) || null;
}

function loggedSessionHasPermission(permission) {
    const role = getLoggedSessionRoleRecord();
    if (!role) {
        return loggedSession.dominio === 'Banco' && loggedSession.rol === 'ADMIN';
    }
    return (role.permisos || []).includes(permission);
}

function canAuthorizeAbmUsers() {
    return loggedSessionHasPermission('Autorización de usuarios');
}

function canAccessAbmUsersModule() {
    return loggedSessionHasPermission('Ver pantalla ABM')
        && (loggedSessionHasPermission('ABM de usuarios — Ver')
            || loggedSessionHasPermission('ABM de usuarios — Modificar')
            || loggedSessionHasPermission('Autorización de usuarios'));
}

function normalizeDocumento(value) {
    return String(value || '').trim().replace(/\s+/g, '');
}

function getLoggedAuthorizerDocumento() {
    return normalizeDocumento(getLoggedSession().documento);
}

function logAbmAudit(entry) {
    const record = {
        id: nextAbmAuditLogId++,
        timestamp: new Date().toISOString(),
        actorUsername: getLoggedSession().username || '—',
        actorDocumento: getLoggedAuthorizerDocumento() || '—',
        actorDominio: getLoggedSession().dominio,
        actorRol: getLoggedSession().rol,
        ...entry,
    };
    abmAuditLog.unshift(record);
    if (typeof console !== 'undefined' && console.info) {
        console.info('[ABM Audit]', record);
    }
    return record;
}

function buildAbmUserFormPayload() {
    return {
        nombre: document.getElementById('nu-nombre').value.trim(),
        apellido: document.getElementById('nu-apellido').value.trim(),
        documento: document.getElementById('nu-doc').value.trim(),
        telefono: document.getElementById('nu-telefono').value.trim(),
        email: document.getElementById('nu-email').value.trim(),
        enteId: parseInt(document.getElementById('nu-ente-id').value, 10),
        rolId: parseInt(document.getElementById('nu-rol-id').value, 10),
    };
}

function validateAbmUserRequiredFields(payload) {
    if (!payload.nombre || !payload.apellido || !payload.telefono || !payload.email || !payload.enteId || !payload.rolId) {
        showCustomAlert('Complete los campos obligatorios (nombre, apellido, teléfono, correo, ente asociado y rol).', 'Datos incompletos');
        return false;
    }
    return true;
}

function hasRequiredAbmUserChanges(snapshot, payload) {
    if (!snapshot) return true;
    const requiredKeys = ['nombre', 'apellido', 'telefono', 'email', 'enteId', 'rolId'];
    return requiredKeys.some(key => String(snapshot[key] ?? '') !== String(payload[key] ?? ''));
}

function finalizeAbmUserAuthorization(u, { action, previousEstado, details = {} }) {
    logAbmAudit({
        action,
        targetUserId: u.id,
        targetUserEmail: u.email,
        targetUserDocumento: u.documento || '—',
        details: {
            estadoAnterior: previousEstado,
            estadoNuevo: u.estado,
            ...details,
        },
    });
    renderAbmUsers();
    switchAbmTab('usuarios');
}

function canEditProveedorAdminFields() {
    const { dominio, rol } = getLoggedSession();
    return dominio === 'Proveedor' && (rol === 'ADMIN' || rol === 'SUPERVISOR');
}

// Catálogo de roles permitidos por dominio (POC)
const ABM_ROLES_BY_DOMINIO = {
    Banco: ['ADMIN', 'SUPERVISOR', 'OPERADOR', 'APROBADOR', 'GERENTE', 'EJECUTIVO DE CUENTAS'],
    EGP: ['ADMIN', 'OPERADOR'],
    Proveedor: ['ADMIN', 'SUPERVISOR', 'OPERADOR'],
};

// Catálogo granular de permisos por pantalla (modal de roles)
const ROLE_PERMISSION_CATALOG = [
    {
        screen: 'ABM',
        groups: [
            {
                title: 'Pantalla ABM',
                items: [
                    { value: 'Ver pantalla ABM', label: 'Ver pantalla ABM' },
                    { value: 'ABM de EGPs y Proveedores — Ver', label: 'ABM de EGPs y Proveedores — Ver entes' },
                    { value: 'ABM de EGPs y Proveedores — Crear', label: 'ABM de EGPs y Proveedores — Crear entes' },
                    { value: 'ABM de EGPs y Proveedores — Borrar', label: 'ABM de EGPs y Proveedores — Borrar entes' },
                    { value: 'ABM de EGPs y Proveedores — Modificar', label: 'ABM de EGPs y Proveedores — Modificar entes' },
                    { value: 'Bloqueo de EGP', label: 'Bloqueo de EGP' },
                    { value: 'ABM de usuarios — Ver', label: 'ABM de usuarios — Ver usuarios' },
                    { value: 'ABM de usuarios — Crear', label: 'ABM de usuarios — Crear usuarios' },
                    { value: 'ABM de usuarios — Borrar', label: 'ABM de usuarios — Borrar usuarios' },
                    { value: 'ABM de usuarios — Modificar', label: 'ABM de usuarios — Modificar usuarios' },
                    { value: 'Autorización de usuarios', label: 'Autorización de usuarios' },
                    { value: 'Bloqueo de usuarios', label: 'Bloqueo de usuarios' },
                    { value: 'Configuración de Roles y Perfiles', label: 'Configuración de Roles y Perfiles' },
                    { value: 'ABM Notificaciones — Ver', label: 'ABM Notificaciones — Ver notificaciones' },
                    { value: 'ABM Notificaciones — Crear', label: 'ABM Notificaciones — Crear notificaciones (no sistema)' },
                    { value: 'ABM Notificaciones — Borrar', label: 'ABM Notificaciones — Borrar notificaciones (no sistema)' },
                    { value: 'ABM Notificaciones — Modificar', label: 'ABM Notificaciones — Modificar notificaciones (no sistema)' },
                    { value: 'Utilizar filtros ABM', label: 'Utilizar filtros ABM' },
                ],
            },
        ],
    },
    {
        screen: 'Confirming',
        groups: [
            {
                title: 'Pantalla Confirming',
                items: [
                    { value: 'Ver pantalla Confirming', label: 'Ver pantalla Confirming' },
                    { value: 'Utilizar filtros Confirming', label: 'Utilizar filtros Confirming' },
                ],
            },
            {
                title: 'Ver grilla',
                items: [
                    { value: 'Ver grilla — Facturas vigentes', label: 'Pestaña facturas vigentes' },
                    { value: 'Ver grilla — Facturas no vigentes', label: 'Pestaña facturas no vigentes' },
                    { value: 'Ver grilla — Facturas no operables', label: 'Pestaña facturas no operables' },
                ],
            },
            {
                title: 'Operaciones sobre facturas',
                items: [
                    { value: 'Cargar Factura — manual', label: 'Cargar Factura — manual' },
                    { value: 'Cargar Factura — masivo', label: 'Cargar Factura — masivo' },
                    { value: 'Editar Factura — datos cargados', label: 'Editar Factura — datos cargados' },
                    { value: 'Editar Factura — Fecha de Pago', label: 'Editar Factura — Fecha de Pago' },
                    { value: 'Habilitar Factura', label: 'Habilitar Factura' },
                    { value: 'Bloquear Factura', label: 'Bloquear Factura' },
                    { value: 'Simular adelanto', label: 'Simular adelanto' },
                    { value: 'Aprobar desembolso EGP', label: 'Aprobar desembolso EGP' },
                    { value: 'Aprobar desembolso Banco', label: 'Aprobar desembolso Banco' },
                    { value: 'Revertir factura', label: 'Revertir factura' },
                    { value: 'Revertir factura 2da aprobación', label: 'Revertir factura 2da aprobación' },
                ],
            },
            {
                title: 'Información y documentos',
                items: [
                    { value: 'Ver información sensible EGP', label: 'Ver información sensible EGP' },
                    { value: 'Ver información sensible Proveedor', label: 'Ver información sensible Proveedor' },
                    { value: 'Ver Documentos', label: 'Ver Documentos' },
                    { value: 'Descargar Documentos', label: 'Descargar Documentos' },
                    { value: 'Descargar Grilla', label: 'Descargar Grilla' },
                ],
            },
        ],
    },
];

function getAllRolePermissionValues() {
    return ROLE_PERMISSION_CATALOG.flatMap(section =>
        section.groups.flatMap(group => group.items.map(item => item.value))
    );
}

const ABM_SCREEN_PERMS = ROLE_PERMISSION_CATALOG.find(s => s.screen === 'ABM').groups.flatMap(g => g.items.map(i => i.value));
const CONFIRMING_SCREEN_PERMS = ROLE_PERMISSION_CATALOG.find(s => s.screen === 'Confirming').groups.flatMap(g => g.items.map(i => i.value));

let abmRoles = [
    {
        id: 1,
        dominio: 'Banco',
        rol: 'ADMIN',
        permisos: [...ABM_SCREEN_PERMS, ...CONFIRMING_SCREEN_PERMS],
    },
    {
        id: 2,
        dominio: 'Banco',
        rol: 'SUPERVISOR',
        permisos: [
            'Ver pantalla ABM', 'ABM de EGPs y Proveedores — Ver', 'ABM de usuarios — Ver',
            'Autorización de usuarios', 'Bloqueo de usuarios', 'ABM Notificaciones — Ver', 'Utilizar filtros ABM',
            'Ver pantalla Confirming', 'Utilizar filtros Confirming',
            'Ver grilla — Facturas vigentes', 'Ver grilla — Facturas no vigentes', 'Ver grilla — Facturas no operables',
            'Editar Factura — datos cargados', 'Editar Factura — Fecha de Pago', 'Habilitar Factura', 'Bloquear Factura',
            'Simular adelanto', 'Aprobar desembolso EGP', 'Aprobar desembolso Banco',
            'Revertir factura', 'Revertir factura 2da aprobación',
            'Ver información sensible EGP', 'Ver información sensible Proveedor',
            'Ver Documentos', 'Descargar Documentos', 'Descargar Grilla',
        ],
    },
    {
        id: 3,
        dominio: 'Banco',
        rol: 'OPERADOR',
        permisos: [
            'Ver pantalla Confirming', 'Utilizar filtros Confirming',
            'Ver grilla — Facturas vigentes', 'Ver grilla — Facturas no vigentes', 'Ver grilla — Facturas no operables',
            'Cargar Factura — manual', 'Editar Factura — datos cargados', 'Editar Factura — Fecha de Pago',
            'Habilitar Factura', 'Bloquear Factura', 'Simular adelanto',
            'Ver Documentos', 'Descargar Documentos', 'Descargar Grilla',
        ],
    },
    {
        id: 4,
        dominio: 'Banco',
        rol: 'APROBADOR',
        permisos: [
            'Ver pantalla Confirming', 'Utilizar filtros Confirming', 'Ver grilla — Facturas vigentes',
            'Aprobar desembolso Banco', 'Revertir factura', 'Revertir factura 2da aprobación',
            'Ver información sensible EGP',
        ],
    },
    {
        id: 5,
        dominio: 'Banco',
        rol: 'GERENTE',
        permisos: [
            'Ver pantalla ABM', 'Utilizar filtros ABM',
            'Ver pantalla Confirming', 'Utilizar filtros Confirming',
            'Ver grilla — Facturas vigentes', 'Ver grilla — Facturas no vigentes', 'Ver grilla — Facturas no operables',
            'Ver información sensible EGP', 'Ver información sensible Proveedor',
        ],
    },
    {
        id: 6,
        dominio: 'Banco',
        rol: 'EJECUTIVO DE CUENTAS',
        permisos: [
            'Ver pantalla Confirming', 'Utilizar filtros Confirming',
            'Ver grilla — Facturas vigentes', 'Ver grilla — Facturas no vigentes', 'Ver grilla — Facturas no operables',
            'Ver información sensible EGP', 'Ver información sensible Proveedor',
            'Ver Documentos', 'Descargar Documentos',
        ],
    },
    {
        id: 7,
        dominio: 'EGP',
        rol: 'ADMIN',
        permisos: [
            'Ver pantalla Confirming', 'Utilizar filtros Confirming',
            'Ver grilla — Facturas vigentes', 'Ver grilla — Facturas no vigentes', 'Ver grilla — Facturas no operables',
            'Cargar Factura — manual', 'Cargar Factura — masivo',
            'Editar Factura — datos cargados', 'Editar Factura — Fecha de Pago',
            'Habilitar Factura', 'Bloquear Factura', 'Simular adelanto', 'Aprobar desembolso EGP', 'Revertir factura',
            'Ver información sensible EGP', 'Ver Documentos', 'Descargar Documentos', 'Descargar Grilla',
        ],
    },
    {
        id: 8,
        dominio: 'EGP',
        rol: 'OPERADOR',
        permisos: [
            'Ver pantalla Confirming', 'Utilizar filtros Confirming',
            'Ver grilla — Facturas vigentes', 'Ver grilla — Facturas no vigentes',
            'Cargar Factura — manual', 'Editar Factura — datos cargados', 'Editar Factura — Fecha de Pago',
            'Habilitar Factura', 'Bloquear Factura', 'Simular adelanto',
        ],
    },
    {
        id: 9,
        dominio: 'Proveedor',
        rol: 'ADMIN',
        permisos: [
            'Ver pantalla Confirming', 'Utilizar filtros Confirming', 'Ver grilla — Facturas vigentes',
            'Simular adelanto', 'Ver Documentos', 'Descargar Documentos',
        ],
    },
    {
        id: 10,
        dominio: 'Proveedor',
        rol: 'OPERADOR',
        permisos: [
            'Ver pantalla Confirming', 'Ver grilla — Facturas vigentes',
        ],
    },
];
let nextAbmRoleId = 11;
let editingAbmRoleId = null;

abmUsers.forEach(u => {
    if (u.rolId == null && abmRoles.length > 0) u.rolId = abmRoles[0].id;
});

// Notificaciones del sistema (disparadas por avance en la máquina de estados)
let abmNotifications = [
    { id: 1, nombre: 'Factura cargada — Pendiente', estadoDisparador: INVOICE_STATES.PENDIENTE, tipoEnvio: 'Email', dominio: 'EGP', rol: 'ADMIN', emails: 'supervisor@retail.com.py, a.gomez@retail.com.py', activa: true, mensaje: 'Factura en estado Pendiente: lista para Habilitar o Bloquear por el aprobador EGP.' },
    { id: 2, nombre: 'Solicitud adelanto — Aprobación EGP', estadoDisparador: INVOICE_STATES.PENDIENTE_APROBACION_EGP, tipoEnvio: 'Email', dominio: 'EGP', rol: 'ADMIN', emails: 'supervisor@retail.com.py', activa: true, mensaje: 'Factura pendiente de aprobación EGP del adelanto solicitado por el proveedor.' },
    { id: 3, nombre: 'Desembolso en curso', estadoDisparador: INVOICE_STATES.PENDIENTE_DESEMBOLSO, tipoEnvio: 'Email', dominio: 'Banco', rol: 'ADMIN', emails: 'operaciones@bancoatlas.com.py', activa: true, mensaje: 'Factura en Pendiente de desembolso: CORE BANKING procesando el pago.' },
    { id: 4, nombre: 'Aprobación banco manual (MVP2)', estadoDisparador: INVOICE_STATES.PENDIENTE_APROBACION_BANCO, tipoEnvio: 'Email', dominio: 'Banco', rol: 'APROBADOR', emails: 'operaciones@bancoatlas.com.py', activa: true, mensaje: 'EGP sin desembolso automático: requiere aprobación bancaria manual.' },
    { id: 5, nombre: 'Factura financiada', estadoDisparador: INVOICE_STATES.FINANCIADA, tipoEnvio: 'Email', dominio: 'Proveedor', rol: 'OPERADOR', emails: 'pagos@techsolutions.com.py', activa: true, mensaje: 'Adelanto acreditado: factura en estado Financiada.' },
    { id: 6, nombre: 'Factura no elegible', estadoDisparador: INVOICE_STATES.NO_ELEGIBLE, tipoEnvio: 'Email', dominio: 'EGP', rol: 'ADMIN', emails: 'finanzas@tigo.com.py', activa: true, mensaje: 'Factura marcada NO ELEGIBLE (fecha de pago menor a 30 días).' },
];
let nextAbmNotificationId = 7;
let editingNotificationId = null;

let currentSimulationInvoice = null;
// simulate | approve-egp | approve-bank | bulk-simulate
let currentSimulationMode = 'simulate';
let confirmCallback = null;

// Selección masiva de facturas (persiste entre cambios de filtro / búsqueda)
const selectedInvoiceIds = new Set();
// Estados desde los cuales una factura puede pasar a "Habilitada" mediante la acción masiva
// (camino "usuario habilita o bloquea factura" en la máquina de estados).
const HABILITAR_VALID_STATES = new Set([INVOICE_STATES.PENDIENTE, INVOICE_STATES.BLOQUEADA]);
const HABILITAR_INVALID_TOOLTIP =
    'Solo pueden habilitarse facturas en estado Bloqueada o Pendiente';
const HABILITAR_EMPTY_TOOLTIP = 'Seleccione facturas en estado Bloqueada o Pendiente para habilitar';
const BLOQUEAR_VALID_STATES = new Set([INVOICE_STATES.PENDIENTE, INVOICE_STATES.HABILITADA]);
const BLOQUEAR_INVALID_TOOLTIP =
    'Solo pueden bloquearse facturas en estado Habilitada o Pendiente';
const BLOQUEAR_EMPTY_TOOLTIP = 'Seleccione facturas en estado Habilitada o Pendiente para bloquear';
const SIMULAR_INVALID_TOOLTIP = 'Seleccione 2 o más facturas Habilitada con mismo EGP, Proveedor y Moneda';
const SIMULAR_EMPTY_TOOLTIP = 'Seleccione al menos 2 facturas Habilitada (misma combinatoria) para simular';

function isInvoiceEligibleForBulkHabilitar(inv) {
    const e = inv.estado;
    return e === INVOICE_STATES.PENDIENTE || e === INVOICE_STATES.BLOQUEADA;
}
function isInvoiceEligibleForBulkBloquear(inv) {
    const e = inv.estado;
    return e === INVOICE_STATES.PENDIENTE || e === INVOICE_STATES.HABILITADA;
}

function getSelectedInvoices() {
    return invoices.filter(i => selectedInvoiceIds.has(i.id));
}

function invoiceBelongsToCurrentViewTab(inv) {
    const allowed = INVOICE_STATES_BY_VIEW_TAB[currentInvoiceViewTab];
    return allowed ? allowed.has(inv.estado) : true;
}

function getSelectionAnchorCombo() {
    const selected = getSelectedInvoices();
    if (selected.length === 0) return null;
    const first = selected[0];
    return { egp: first.egp, prov: first.prov, moneda: first.moneda };
}

function invoiceMatchesSelectionCombo(inv, combo) {
    if (!combo) return true;
    return inv.egp === combo.egp && inv.prov === combo.prov && inv.moneda === combo.moneda;
}

function canSelectInvoiceForCheckbox(inv) {
    return invoiceMatchesSelectionCombo(inv, getSelectionAnchorCombo());
}

function countSelectedHabilitadaInvoices() {
    return getSelectedInvoices().filter(i => i.estado === INVOICE_STATES.HABILITADA).length;
}

function isBulkSimulateActive() {
    return countSelectedHabilitadaInvoices() >= 2;
}

function getEgpConfigForInvoice(inv) {
    return participants.find(p => p.razon === inv.egp && p.tipo === 'EGP');
}

function switchInvoiceViewTab(tabKey) {
    if (!Object.values(INVOICE_VIEW_TABS).includes(tabKey)) return;
    currentInvoiceViewTab = tabKey;
    document.querySelectorAll('.confirming-invoice-tab').forEach(btn => {
        const on = btn.dataset.invoiceTab === tabKey;
        btn.classList.toggle('active', on);
        btn.setAttribute('aria-selected', on ? 'true' : 'false');
    });
    renderCurrentConfirmingFilters();
}

/** Resuelve el id real de factura desde el checkbox (data-invoice-id puede estar escapado en HTML). */
function resolveInvoiceIdFromCheckboxInput(input) {
    const attrVal = input.getAttribute('data-invoice-id');
    if (!attrVal) return null;
    const direct = invoices.find(i => i.id === attrVal);
    if (direct) return direct.id;
    const matched = invoices.find(i => invoiceIdToHtmlAttr(i.id) === attrVal);
    return matched ? matched.id : null;
}

function getSelectedOperatingEntityRazon() {
    const sel = document.getElementById('operating-entity-select');
    if (!sel || sel.value === '') return null;
    const p = participants.find(x => String(x.id) === sel.value);
    return p ? p.razon : null;
}

function getSelectedOperatingEntity() {
    const sel = document.getElementById('operating-entity-select');
    if (!sel || sel.value === '') return null;
    return participants.find(x => String(x.id) === sel.value) || null;
}

// Renderiza (o vacía) el panel informativo del ente seleccionado.
// Cuando se elige "Todos los entes" el panel queda oculto y la tabla recupera su posición.
function renderOperatingEntityPanel() {
    const panel = document.getElementById('operating-entity-panel');
    if (!panel) return;
    const ente = getSelectedOperatingEntity();

    if (!ente) {
        panel.innerHTML = '';
        panel.classList.add('hidden');
        return;
    }

    const tipoBadge = ente.tipo === 'EGP'
        ? '<span class="badge-egp">EGP</span>'
        : '<span class="badge-proveedor">Proveedor</span>';

    const lineaCreditoTxt = ente.lineaCredito > 0
        ? formatCurrency(ente.lineaCredito, 'GS')
        : '—';

    const monedasHtml = (ente.monedas || []).map(m =>
        `<span class="badge-moneda ${m.toLowerCase()}">${m}</span>`
    ).join(' ') || '—';

    panel.innerHTML = `
        <div class="ente-panel-header">
            <div class="ente-panel-title-block">
                <p class="ente-panel-eyebrow">Ente seleccionado</p>
                <h3 class="ente-panel-title">${ente.razon} ${tipoBadge}</h3>
            </div>
            <div class="ente-panel-monedas" title="Monedas habilitadas">${monedasHtml}</div>
        </div>
        <div class="ente-panel-grid">
            <div class="ente-panel-cell">
                <span class="ente-panel-label">Razón Social</span>
                <span class="ente-panel-value">${ente.razon}</span>
            </div>
            <div class="ente-panel-cell">
                <span class="ente-panel-label">RUC</span>
                <span class="ente-panel-value">${ente.ruc}</span>
            </div>
            <div class="ente-panel-cell">
                <span class="ente-panel-label">Límite Crediticio</span>
                <span class="ente-panel-value ente-panel-value--strong">${lineaCreditoTxt}</span>
            </div>
            <div class="ente-panel-cell">
                <span class="ente-panel-label">Tasa de Interés (TNA)</span>
                <span class="ente-panel-value">${ente.tasaInteres}%</span>
            </div>
            <div class="ente-panel-cell">
                <span class="ente-panel-label">Comisión</span>
                <span class="ente-panel-value">${ente.tasaComision}%</span>
            </div>
            <div class="ente-panel-cell">
                <span class="ente-panel-label">IVA</span>
                <span class="ente-panel-value">${ente.iva}%</span>
            </div>
        </div>
    `;
    panel.classList.remove('hidden');
}

function populateOperatingEntitySelect() {
    const sel = document.getElementById('operating-entity-select');
    if (!sel) return;
    const prev = sel.value;
    sel.innerHTML = '<option value="">Todos los entes</option>';
    [...participants]
        .sort((a, b) => a.razon.localeCompare(b.razon, 'es'))
        .forEach(p => {
            const opt = document.createElement('option');
            opt.value = String(p.id);
            opt.textContent = `${p.razon} (${p.tipo})`;
            sel.appendChild(opt);
        });
    if (prev && [...sel.options].some(o => o.value === prev)) {
        sel.value = prev;
    }
}

// Formateador de moneda
const formatCurrency = (monto, moneda) => {
    if (moneda === 'USD') {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(monto);
    }
    return new Intl.NumberFormat('es-PY', { style: 'currency', currency: 'PYG' }).format(monto);
};


// ====== VERSIÓN POC (UI) ======

function applyPocVersionLabels() {
    const versionText = typeof POC_APP_VERSION_LABEL !== 'undefined'
        ? POC_APP_VERSION_LABEL
        : (typeof POC_APP_VERSION !== 'undefined' ? POC_APP_VERSION : '');
    document.querySelectorAll('[data-poc-version]').forEach(el => {
        el.textContent = versionText;
    });
    const titleSuffix = typeof POC_APP_VERSION !== 'undefined' ? ` · ${POC_APP_VERSION}` : '';
    if (titleSuffix && !document.title.includes(POC_APP_VERSION)) {
        document.title = `Portal Confirming | Banco Atlas${titleSuffix}`;
    }
}

function syncLoggedUserDisplayFromLogin() {
    const input = document.getElementById('username');
    const display = document.getElementById('logged-user-display');
    if (!display) return;
    const raw = input?.value?.trim();
    display.textContent = raw
        ? raw.charAt(0).toUpperCase() + raw.slice(1)
        : 'Administrador Atlas';
}

document.addEventListener('DOMContentLoaded', () => {
    applyPocVersionLabels();
});

// ====== NAVEGACIÓN Y LOGIN ======

document.getElementById('login-form').addEventListener('submit', (e) => {
    e.preventDefault();
    syncLoggedSessionFromLogin(document.getElementById('username')?.value);
    syncLoggedUserDisplayFromLogin();
    applyPocVersionLabels();
    document.getElementById('login-view').classList.remove('active');
    document.getElementById('app-view').classList.add('active');
    initDashboardChart();
    renderInvoices();
    renderParticipants();
    renderAbmUsers();
    renderAbmRoles();
    renderAbmNotifications();
    populateAbmRolesFilterSelect();
    populateOperatingEntitySelect();
    renderOperatingEntityPanel();
});

document.getElementById('logout-btn').addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('app-view').classList.remove('active');
    document.getElementById('login-view').classList.add('active');
});

// Navegación Sidebar
document.querySelectorAll('.nav-item[data-target]').forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        document.querySelectorAll('.sidebar-nav .nav-item[data-target]').forEach(nav => nav.classList.remove('active'));
        item.classList.add('active');
        document.querySelectorAll('.page-view').forEach(view => view.classList.remove('active'));
        const targetId = item.getAttribute('data-target');
        document.getElementById(targetId).classList.add('active');
        const pageTitleEl = document.getElementById('page-title');
        const pageTitle = item.getAttribute('data-page-title') || item.querySelector('span').textContent;
        if (pageTitleEl) pageTitleEl.textContent = pageTitle;
        document.getElementById('app-view')?.classList.remove('sidebar-mobile-open');
        if (targetId === 'dashboard-view') initDashboardChart();
        if (targetId === 'abm-view') {
            renderParticipants();
            renderAbmUsers();
            renderAbmRoles();
            renderAbmNotifications();
            populateAbmRolesFilterSelect();
        }
    });
});

document.getElementById('toggle-sidebar')?.addEventListener('click', () => {
    document.getElementById('app-view')?.classList.toggle('sidebar-mobile-open');
});

document.getElementById('operating-entity-select')?.addEventListener('change', () => {
    renderCurrentConfirmingFilters();
    renderOperatingEntityPanel();
});

function switchReportTab(tabId) {
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    document.querySelectorAll('.report-tab-content').forEach(content => content.classList.remove('active'));
    document.getElementById('rep-' + tabId).classList.add('active');
}


// ====== DASHBOARD (CHART.JS) ======

let mainChartInstance = null;

function initDashboardChart() {
    const ctx = document.getElementById('mainChart');
    if (!ctx) return;
    if (mainChartInstance) mainChartInstance.destroy();

    mainChartInstance = new Chart(ctx.getContext('2d'), {
        type: 'bar',
        data: {
            labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
            datasets: [
                {
                    label: 'Adelantos Generados (Millones)',
                    data: [1200, 1500, 1100, 2300, 3100, 4200],
                    backgroundColor: '#901d2d',
                    borderRadius: 4
                },
                {
                    label: 'Cobranzas a Término (Millones)',
                    data: [1150, 1400, 1100, 2100, 2900, 3800],
                    backgroundColor: '#4D4D4D',
                    borderRadius: 4
                }
            ]
        },
        options: {
            responsive: true, maintainAspectRatio: false,
            plugins: { legend: { position: 'top' } },
            scales: { y: { beginAtZero: true } }
        }
    });
}


// ====== MODALES GLOBALES ======

const MODAL_BASE_Z_INDEX = 100;
let openModalStack = [];

function syncModalStackZIndex() {
    openModalStack.forEach((modalId, index) => {
        const modal = document.getElementById(modalId);
        if (modal) modal.style.zIndex = String(MODAL_BASE_Z_INDEX + index);
    });
}

function openModal(id) {
    const modal = document.getElementById(id);
    if (!modal) return;
    openModalStack = openModalStack.filter(x => x !== id);
    openModalStack.push(id);
    syncModalStackZIndex();
    modal.classList.add('active');
}

function closeModal(id) {
    const modal = document.getElementById(id);
    if (!modal) return;
    modal.classList.remove('active');
    modal.style.zIndex = '';
    openModalStack = openModalStack.filter(x => x !== id);
    syncModalStackZIndex();
}

function showCustomAlert(message, title = "Aviso") {
    document.getElementById('alert-title').textContent = title;
    document.getElementById('alert-message').textContent = message;
    openModal('alert-modal');
}

function showCustomConfirm(message, callback, title = "Confirmar") {
    document.getElementById('confirm-title').textContent = title;
    document.getElementById('confirm-message').textContent = message;
    confirmCallback = callback;
    openModal('confirm-modal');
}

document.getElementById('btn-confirm-action').addEventListener('click', () => {
    closeModal('confirm-modal');
    if (typeof confirmCallback === 'function') confirmCallback();
});


// ====== ABM - GESTIÓN DE PARTICIPANTES ======

function getParticipantEgpPadreRazon(p) {
    if (p.tipo !== 'Proveedor' || p.egpPadreId == null) return '';
    const egp = participants.find(x => x.id === p.egpPadreId && x.tipo === 'EGP');
    return egp ? egp.razon : '';
}

function listEgpParticipants() {
    return participants.filter(p => p.tipo === 'EGP');
}

function populateAbmEgpPadreSelect(selectedId = '') {
    const sel = document.getElementById('abm-egp-padre');
    if (!sel) return;
    sel.innerHTML = '<option value="">Seleccione un EGP...</option>';
    listEgpParticipants()
        .sort((a, b) => a.razon.localeCompare(b.razon, 'es'))
        .forEach(egp => {
            const opt = document.createElement('option');
            opt.value = String(egp.id);
            opt.textContent = egp.razon;
            sel.appendChild(opt);
        });
    if (selectedId != null && selectedId !== '') sel.value = String(selectedId);
}

function syncAbmTipoFields() {
    const tipo = document.getElementById('abm-tipo')?.value;
    const group = document.getElementById('abm-egp-padre-group');
    const sel = document.getElementById('abm-egp-padre');
    if (!group || !sel) return;
    const isProv = tipo === 'Proveedor';
    group.classList.toggle('hidden', !isProv);
    sel.required = isProv;
    if (!isProv) sel.value = '';
}

function applyAbmModalReadonlyDefaults() {
    document.getElementById('abm-moneda-gs').checked = true;
    document.getElementById('abm-moneda-usd').checked = false;
    document.getElementById('abm-linea').value = '';
    document.getElementById('abm-interes').value = 12;
    document.getElementById('abm-comision').value = 1.5;
    document.getElementById('abm-iva').value = 10;
    document.getElementById('abm-condiciones').value = '';
    document.getElementById('abm-cliente-atlas').checked = false;
    const desAuto = document.getElementById('abm-desembolso-auto');
    if (desAuto) {
        desAuto.checked = true;
        desAuto.disabled = true;
    }
}

function getProveedorAdminFieldDefaults(ruc) {
    const cleanRuc = String(ruc || '').trim();
    return {
        cuentaCredito: cleanRuc ? `CC-${cleanRuc}` : '',
        banco: 'Banco Atlas',
        monedaOperacion: 'PYG',
    };
}

function populateProveedorAdminFields(p) {
    const defaults = getProveedorAdminFieldDefaults(p.ruc);
    document.getElementById('abm-cuenta-credito').value = p.cuentaCredito ?? defaults.cuentaCredito;
    document.getElementById('abm-banco').value = p.banco ?? defaults.banco;
    const moneda = p.monedaOperacion || defaults.monedaOperacion;
    document.querySelectorAll('input[name="abm-moneda-operacion"]').forEach(radio => {
        radio.checked = radio.value === moneda;
    });
    document.getElementById('abm-tipo-documento').value = p.tipoDocumento || '';
    document.getElementById('abm-numero-documento').value = p.numeroDocumento || '';
    document.getElementById('abm-nombre-apellido').value = p.nombreApellido || '';
}

function clearProveedorAdminFields() {
    ['abm-cuenta-credito', 'abm-banco', 'abm-tipo-documento', 'abm-numero-documento', 'abm-nombre-apellido'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.value = '';
    });
    const pygRadio = document.querySelector('input[name="abm-moneda-operacion"][value="PYG"]');
    if (pygRadio) pygRadio.checked = true;
}

function syncAbmProveedorAdminBlock(isEdit) {
    const block = document.getElementById('abm-proveedor-admin-block');
    if (!block) return;
    block.classList.toggle('hidden', !(isEdit && canEditProveedorAdminFields()));
}

function getEnteEgpProveedorRelations(participant) {
    const ruc = participant.ruc;
    const recordsWithSameRuc = participants.filter(p => p.ruc === ruc);
    const relations = [];
    const seen = new Set();

    const pushRelation = (rel) => {
        const key = `${rel.tipo}|${rel.egpRazon}|${rel.proveedorRazon}|${rel.registroTipo}|${rel.registroId}`;
        if (seen.has(key)) return;
        seen.add(key);
        relations.push(rel);
    };

    recordsWithSameRuc.forEach(record => {
        if (record.tipo === 'EGP') {
            participants
                .filter(p => p.tipo === 'Proveedor' && p.egpPadreId === record.id)
                .forEach(prov => {
                    pushRelation({
                        tipo: 'EGP → Proveedor',
                        registroTipo: record.tipo,
                        registroId: record.id,
                        egpRazon: record.razon,
                        egpRuc: record.ruc,
                        proveedorRazon: prov.razon,
                        proveedorRuc: prov.ruc,
                        detalle: `${record.razon} (EGP) tiene como proveedor a ${prov.razon}`,
                    });
                });
        }
        if (record.tipo === 'Proveedor') {
            const egp = participants.find(p => p.id === record.egpPadreId);
            if (egp) {
                pushRelation({
                    tipo: 'Proveedor → EGP',
                    registroTipo: record.tipo,
                    registroId: record.id,
                    egpRazon: egp.razon,
                    egpRuc: egp.ruc,
                    proveedorRazon: record.razon,
                    proveedorRuc: record.ruc,
                    detalle: `${record.razon} (Proveedor) vinculado al EGP ${egp.razon}`,
                });
            }
        }
    });

    return relations;
}

function renderEnteRelationsPanel(relations) {
    if (!relations.length) {
        return '<p class="abm-relations-empty">No se encontraron relaciones EGP–Proveedor para este RUC.</p>';
    }
    const rows = relations.map(rel => `
        <tr>
            <td><span class="badge-relation">${rel.tipo}</span></td>
            <td><strong>${rel.egpRazon}</strong><br><span class="abm-relation-meta">${rel.egpRuc}</span></td>
            <td><strong>${rel.proveedorRazon}</strong><br><span class="abm-relation-meta">${rel.proveedorRuc}</span></td>
            <td style="font-size:13px;color:#4b5563;">${rel.detalle}</td>
        </tr>
    `).join('');
    return `
        <div class="table-container abm-relations-table-wrap">
            <table class="data-table abm-relations-table">
                <thead>
                    <tr>
                        <th>Relación</th>
                        <th>EGP</th>
                        <th>Proveedor</th>
                        <th>Detalle</th>
                    </tr>
                </thead>
                <tbody>${rows}</tbody>
            </table>
        </div>
    `;
}

function abmViewField(label, value) {
    return `
        <div class="form-group abm-view-field">
            <label>${label}</label>
            <div class="abm-view-value">${value || '—'}</div>
        </div>
    `;
}

function getAbmVisualizationDefaults(existing) {
    const base = existing || {};
    return {
        monedas: base.monedas?.length ? [...base.monedas] : ['GS'],
        lineaCredito: base.lineaCredito ?? 0,
        tasaInteres: base.tasaInteres ?? 12,
        tasaComision: base.tasaComision ?? 1.5,
        iva: base.iva ?? 10,
        condiciones: base.condiciones ?? '',
        clienteAtlas: base.clienteAtlas ?? false,
        desembolsoAuto: true,
    };
}

// ====== ABM — filtros de búsqueda ======

function normalizeAbmSearchText(value) {
    return String(value || '')
        .trim()
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');
}

function abmTextIncludes(haystack, needle) {
    const q = normalizeAbmSearchText(needle);
    if (!q) return true;
    return normalizeAbmSearchText(haystack).includes(q);
}

function getAbmEntesFilterValues() {
    return {
        search: document.getElementById('filter-entes-search')?.value?.trim() || '',
        clienteAtlas: document.getElementById('filter-entes-cliente-atlas')?.value || 'all',
        estado: document.getElementById('filter-entes-estado')?.value || 'all',
    };
}

function participantMatchesEntesFilters(p) {
    const { search, clienteAtlas, estado } = getAbmEntesFilterValues();
    const matchSearch = !search || abmTextIncludes(p.ruc, search) || abmTextIncludes(p.razon, search);
    let matchAtlas = true;
    if (clienteAtlas === 'si') matchAtlas = p.clienteAtlas === true;
    else if (clienteAtlas === 'no') matchAtlas = !p.clienteAtlas;
    let matchEstado = true;
    if (estado === 'activo') matchEstado = !isParticipantBlocked(p);
    else if (estado === 'bloqueado') matchEstado = isParticipantBlocked(p);
    return matchSearch && matchAtlas && matchEstado;
}

function getUserAssociatedEnte(u) {
    return participants.find(p => p.id === u.enteId) || null;
}

function getAbmRoleById(roleId) {
    return abmRoles.find(r => r.id === roleId) || null;
}

function getAbmRoleLabel(roleId) {
    const r = getAbmRoleById(roleId);
    return r ? `${r.rol} (${r.dominio})` : '—';
}

function populateRoleNombreSelect(dominio = '', selectedRol = '') {
    const sel = document.getElementById('role-nombre-rol');
    if (!sel) return;
    sel.innerHTML = '<option value="">Seleccione...</option>';
    const roles = ABM_ROLES_BY_DOMINIO[dominio] || [];
    roles.forEach(rol => {
        const opt = document.createElement('option');
        opt.value = rol;
        opt.textContent = rol;
        sel.appendChild(opt);
    });
    if (selectedRol && roles.includes(selectedRol)) sel.value = selectedRol;
}

function syncRoleOptionsFromDominio() {
    const dominio = document.getElementById('role-dominio')?.value || '';
    populateRoleNombreSelect(dominio);
}

function populateAbmRolesFilterSelect() {
    const sel = document.getElementById('filter-roles-rol');
    if (!sel) return;
    const prev = sel.value;
    const uniqueRoles = [...new Set(abmRoles.map(r => r.rol))].sort((a, b) => a.localeCompare(b, 'es'));
    sel.innerHTML = '<option value="all">Todos</option>';
    uniqueRoles.forEach(rol => {
        const opt = document.createElement('option');
        opt.value = rol;
        opt.textContent = rol;
        sel.appendChild(opt);
    });
    if (prev && [...sel.options].some(o => o.value === prev)) sel.value = prev;
}

function populateUserRoleSelect(selectedId = '') {
    const sel = document.getElementById('nu-rol-id');
    if (!sel) return;
    const prev = sel.value;
    sel.innerHTML = '<option value="">Seleccione un rol...</option>';
    [...abmRoles]
        .sort((a, b) => `${a.dominio} ${a.rol}`.localeCompare(`${b.dominio} ${b.rol}`, 'es'))
        .forEach(r => {
            const opt = document.createElement('option');
            opt.value = String(r.id);
            opt.textContent = `${r.rol} (${r.dominio})`;
            sel.appendChild(opt);
        });
    const target = selectedId !== '' && selectedId != null ? String(selectedId) : prev;
    if (target && [...sel.options].some(o => o.value === target)) sel.value = target;
}

function getAbmUsuariosFilterValues() {
    return {
        enteSearch: document.getElementById('filter-usuarios-ente')?.value?.trim() || '',
        cedula: document.getElementById('filter-usuarios-cedula')?.value?.trim() || '',
        apellido: document.getElementById('filter-usuarios-apellido')?.value?.trim() || '',
        estado: document.getElementById('filter-usuarios-estado')?.value || 'all',
    };
}

function abmUserEstadoBadgeClass(estado) {
    if (estado === ABM_USER_STATES.AUTORIZADO) return 'status-usuario-autorizado';
    if (estado === ABM_USER_STATES.RECHAZADO) return 'status-usuario-rechazado';
    return 'status-usuario-pendiente-autorizacion';
}

function abmAccessBadgeClass(bloqueado) {
    return bloqueado ? 'status-acceso-bloqueado' : 'status-acceso-activo';
}

function getAbmAccessLabel(bloqueado) {
    return bloqueado ? ABM_ACCESS_STATES.BLOQUEADO : ABM_ACCESS_STATES.ACTIVO;
}

function isParticipantBlocked(p) {
    return p?.bloqueado === true;
}

function isAbmUserBlocked(u) {
    return u?.bloqueado === true;
}

function toggleParticipantBlock(id) {
    const p = participants.find(x => x.id === id);
    if (!p) return;
    const willBlock = !isParticipantBlocked(p);
    const actionLabel = willBlock ? 'bloquear' : 'desbloquear';
    showCustomConfirm(
        `¿Confirma ${actionLabel} el ente "${p.razon}" (${p.tipo})? ${willBlock ? 'No podrá ejecutar acciones en la plataforma hasta ser desbloqueado.' : 'Volverá a poder operar con normalidad.'}`,
        () => {
            p.bloqueado = willBlock;
            renderParticipants();
            populateOperatingEntitySelect();
            renderOperatingEntityPanel();
            showCustomAlert(
                `El ente "${p.razon}" fue ${willBlock ? 'bloqueado' : 'desbloqueado'} correctamente.`,
                willBlock ? 'Ente bloqueado' : 'Ente desbloqueado'
            );
        },
        willBlock ? 'Bloquear ente' : 'Desbloquear ente'
    );
}

function toggleAbmUserBlock(id) {
    const u = abmUsers.find(x => x.id === id);
    if (!u) return;
    const willBlock = !isAbmUserBlocked(u);
    const actionLabel = willBlock ? 'bloquear' : 'desbloquear';
    showCustomConfirm(
        `¿Confirma ${actionLabel} al usuario "${u.nombre} ${u.apellido}" (${u.email})? ${willBlock ? 'No podrá ejecutar acciones en la plataforma hasta ser desbloqueado.' : 'Volverá a poder operar con normalidad.'}`,
        () => {
            u.bloqueado = willBlock;
            renderAbmUsers();
            showCustomAlert(
                `El usuario "${u.nombre} ${u.apellido}" fue ${willBlock ? 'bloqueado' : 'desbloqueado'} correctamente.`,
                willBlock ? 'Usuario bloqueado' : 'Usuario desbloqueado'
            );
        },
        willBlock ? 'Bloquear usuario' : 'Desbloquear usuario'
    );
}

function openUserAuthModal(id) {
    if (!canAuthorizeAbmUsers()) {
        showCustomAlert('Su dominio/rol no tiene permiso para autorizar usuarios en el ABM.', 'Acción no disponible');
        return;
    }
    const u = abmUsers.find(x => x.id === id);
    if (!u) return;
    const userEstado = u.estado || ABM_USER_STATES.PENDIENTE_AUTORIZACION;
    if (userEstado !== ABM_USER_STATES.PENDIENTE_AUTORIZACION) {
        showCustomAlert('Solo se puede gestionar la autorización de usuarios en estado Pendiente de Autorización.', 'Acción no disponible');
        return;
    }
    managingAbmUserAuthId = id;
    const ente = getUserAssociatedEnte(u);
    const rolLabel = getAbmRoleLabel(u.rolId);
    const fields = document.getElementById('user-auth-fields');
    if (fields) {
        fields.innerHTML = `
            ${abmViewField('Cédula de Identidad', u.documento || '—')}
            <div class="form-row">
                ${abmViewField('Nombre', u.nombre)}
                ${abmViewField('Apellido', u.apellido)}
            </div>
            <div class="form-row">
                ${abmViewField('Rol', rolLabel)}
                ${abmViewField('Ente Asociado', ente ? ente.razon : '—')}
            </div>
        `;
    }
    const motivoInput = document.getElementById('user-auth-motivo');
    const rejectBlock = document.getElementById('user-auth-reject-block');
    if (motivoInput) motivoInput.value = '';
    if (rejectBlock) rejectBlock.classList.add('hidden');
    openModal('user-auth-modal');
}

function authorizeManagedAbmUser() {
    const u = abmUsers.find(x => x.id === managingAbmUserAuthId);
    if (!u) return;
    const userEstado = u.estado || ABM_USER_STATES.PENDIENTE_AUTORIZACION;
    if (userEstado !== ABM_USER_STATES.PENDIENTE_AUTORIZACION) {
        showCustomAlert('El usuario ya no está pendiente de autorización.', 'Acción no disponible');
        closeModal('user-auth-modal');
        managingAbmUserAuthId = null;
        renderAbmUsers();
        return;
    }
    const targetDoc = normalizeDocumento(u.documento);
    const authorizerDoc = getLoggedAuthorizerDocumento();
    if (targetDoc && authorizerDoc && targetDoc === authorizerDoc) {
        showCustomAlert(
            'No es posible autorizar un usuario que comparte su misma Cédula de Identidad, póngase en contacto con su administrador',
            'Autorización no permitida'
        );
        return;
    }
    const previousEstado = u.estado;
    u.estado = ABM_USER_STATES.AUTORIZADO;
    u.motivoRechazo = '';
    closeModal('user-auth-modal');
    managingAbmUserAuthId = null;
    finalizeAbmUserAuthorization(u, {
        action: 'AUTORIZAR_USUARIO',
        previousEstado,
    });
    showCustomAlert(`Usuario "${u.nombre} ${u.apellido}" autorizado correctamente.`, 'Usuario autorizado');
}

function rejectManagedAbmUser() {
    const u = abmUsers.find(x => x.id === managingAbmUserAuthId);
    if (!u) return;
    const rejectBlock = document.getElementById('user-auth-reject-block');
    const motivoInput = document.getElementById('user-auth-motivo');
    const motivo = motivoInput?.value?.trim() || '';
    if (rejectBlock?.classList.contains('hidden')) {
        rejectBlock.classList.remove('hidden');
        motivoInput?.focus();
        return;
    }
    if (!motivo) {
        showCustomAlert('Ingrese el motivo de rechazo.', 'Motivo obligatorio');
        motivoInput?.focus();
        return;
    }
    const previousEstado = u.estado;
    u.estado = ABM_USER_STATES.RECHAZADO;
    u.motivoRechazo = motivo;
    closeModal('user-auth-modal');
    managingAbmUserAuthId = null;
    finalizeAbmUserAuthorization(u, {
        action: 'RECHAZAR_USUARIO',
        previousEstado,
        details: { motivoRechazo: motivo },
    });
    showCustomAlert(`Usuario "${u.nombre} ${u.apellido}" rechazado.`, 'Usuario rechazado');
}

function syncUserModalMode(user = null) {
    const isRejectedEdit = user && (user.estado || ABM_USER_STATES.PENDIENTE_AUTORIZACION) === ABM_USER_STATES.RECHAZADO;
    const badge = document.getElementById('user-modal-rejected-badge');
    const btnSave = document.getElementById('user-modal-btn-save');
    const btnConfirmAuth = document.getElementById('user-modal-btn-confirm-auth');
    if (badge) badge.classList.toggle('hidden', !isRejectedEdit);
    if (btnSave) btnSave.classList.toggle('hidden', isRejectedEdit);
    if (btnConfirmAuth) btnConfirmAuth.classList.toggle('hidden', !isRejectedEdit);
}

function userMatchesUsuariosFilters(u) {
    const { enteSearch, cedula, apellido, estado } = getAbmUsuariosFilterValues();
    const ente = getUserAssociatedEnte(u);
    const matchEnte = !enteSearch || (ente && (
        abmTextIncludes(ente.ruc, enteSearch) || abmTextIncludes(ente.razon, enteSearch)
    ));
    const matchCedula = !cedula || abmTextIncludes(u.documento || '', cedula);
    const matchApellido = !apellido || abmTextIncludes(u.apellido, apellido);
    const userEstado = u.estado || ABM_USER_STATES.PENDIENTE_AUTORIZACION;
    const matchEstado = estado === 'all' || userEstado === estado;
    return matchEnte && matchCedula && matchApellido && matchEstado;
}

function getAbmRolesFilterValues() {
    return {
        dominio: document.getElementById('filter-roles-dominio')?.value || 'all',
        rol: document.getElementById('filter-roles-rol')?.value || 'all',
    };
}

function roleMatchesRolesFilters(r) {
    const { dominio, rol } = getAbmRolesFilterValues();
    const matchDominio = dominio === 'all' || r.dominio === dominio;
    const matchRol = rol === 'all' || r.rol === rol;
    return matchDominio && matchRol;
}

function getAbmNotificacionesFilterValues() {
    return {
        nombre: document.getElementById('filter-notificaciones-nombre')?.value?.trim() || '',
    };
}

function notificationMatchesNotificacionesFilters(n) {
    const { nombre } = getAbmNotificacionesFilterValues();
    return !nombre || abmTextIncludes(n.nombre, nombre);
}

function renderParticipants() {
    renderEgpGrid();
    renderProveedorGrid();
}

function switchAbmTab(tabKey) {
    const valid = ['egp', 'proveedor', 'usuarios', 'roles', 'notificaciones'];
    if (!valid.includes(tabKey)) return;
    document.querySelectorAll('.abm-tab').forEach(btn => {
        const on = btn.dataset.abmTab === tabKey;
        btn.classList.toggle('active', on);
        btn.setAttribute('aria-selected', on ? 'true' : 'false');
    });
    document.querySelectorAll('.abm-tab-panel').forEach(panel => {
        const on = panel.id === `abm-panel-${tabKey}`;
        panel.classList.toggle('active', on);
    });
    if (typeof syncAbmEntesFiltersVisibility === 'function') {
        syncAbmEntesFiltersVisibility(tabKey);
    }
    closeAbmAddMenu();
}

function renderAbmUsers() {
    const tbody = document.getElementById('abm-users-tbody');
    if (!tbody) return;
    tbody.innerHTML = '';

    const filtered = abmUsers.filter(userMatchesUsuariosFilters);
    const { slice, total } = typeof paginateAbmGrid === 'function'
        ? paginateAbmGrid(filtered, 'usuarios')
        : { slice: filtered, total: filtered.length };

    if (!slice.length) {
        tbody.innerHTML = '<tr><td colspan="11"><div class="table-empty">No se encontraron usuarios con los filtros aplicados.</div></td></tr>';
        if (typeof renderAbmPagination === 'function') renderAbmPagination('usuarios-pagination', 'usuarios', total);
        return;
    }

    slice.forEach(u => {
        const ente = getUserAssociatedEnte(u);
        const enteRazon = ente ? ente.razon : '—';
        const tipoBadge = !ente ? '—' : (ente.tipo === 'EGP'
            ? '<span class="badge-egp">EGP</span>'
            : '<span class="badge-proveedor">Proveedor</span>');
        const userEstado = u.estado || ABM_USER_STATES.PENDIENTE_AUTORIZACION;
        const estadoBadge = `<span class="status-badge ${abmUserEstadoBadgeClass(userEstado)}">${userEstado}</span>`;
        const blocked = isAbmUserBlocked(u);
        const accessBadge = `<span class="status-badge ${abmAccessBadgeClass(blocked)}">${getAbmAccessLabel(blocked)}</span>`;
        const rolLabel = getAbmRoleLabel(u.rolId);
        const isPendingAuth = userEstado === ABM_USER_STATES.PENDIENTE_AUTORIZACION;
        const manageBtn = isPendingAuth && canAuthorizeAbmUsers()
            ? `<button type="button" class="btn-abm-manage" onclick="openUserAuthModal(${u.id})" title="Gestionar autorización" aria-label="Gestionar autorización">Gestionar</button>`
            : '';
        const blockBtnClass = blocked ? 'btn-icon-action--unlock' : 'btn-icon-action--lock';
        const blockBtnTitle = blocked ? 'Desbloquear usuario' : 'Bloquear usuario';
        const blockBtnIcon = blocked ? 'ph-lock-open' : 'ph-lock';
        const viewBtn = typeof canViewAbmUsersDetail === 'function' && canViewAbmUsersDetail()
            ? `<button type="button" class="btn-icon-action btn-icon-action--view" onclick="openUserDetailModal(${u.id})" title="Ver detalle" aria-label="Ver detalle"><i class="ph ph-eye"></i></button>`
            : '';
        const tr = document.createElement('tr');
        if (blocked) tr.classList.add('abm-row-blocked');
        tr.innerHTML = `
            <td>${u.nombre}</td>
            <td>${u.apellido}</td>
            <td style="font-size:13px;">${u.documento || '—'}</td>
            <td style="font-size:13px;color:#6b7280;">${u.email}</td>
            <td>${u.telefono}</td>
            <td><strong>${enteRazon}</strong></td>
            <td>${tipoBadge}</td>
            <td><strong>${rolLabel}</strong></td>
            <td>${estadoBadge}</td>
            <td>${accessBadge}</td>
            <td class="abm-actions-cell">
                ${viewBtn}
                ${manageBtn}
                <button type="button" class="btn-icon-action btn-icon-action--edit" onclick="openUserModal(${u.id})" title="Editar usuario" aria-label="Editar usuario">
                    <i class="ph ph-pencil-simple"></i>
                </button>
                <button type="button" class="btn-icon-action ${blockBtnClass}" onclick="toggleAbmUserBlock(${u.id})" title="${blockBtnTitle}" aria-label="${blockBtnTitle}">
                    <i class="ph ${blockBtnIcon}"></i>
                </button>
                <button type="button" class="btn-icon-action btn-icon-action--delete" onclick="deleteAbmUser(${u.id})" title="Eliminar usuario" aria-label="Eliminar usuario">
                    <i class="ph ph-x"></i>
                </button>
            </td>
        `;
        tbody.appendChild(tr);
    });
    if (typeof renderAbmPagination === 'function') renderAbmPagination('usuarios-pagination', 'usuarios', total);
}

function renderAbmRoles() {
    const tbody = document.getElementById('abm-roles-tbody');
    if (!tbody) return;
    tbody.innerHTML = '';

    const filtered = abmRoles.filter(roleMatchesRolesFilters);
    const { slice, total } = typeof paginateAbmGrid === 'function'
        ? paginateAbmGrid(filtered, 'roles')
        : { slice: filtered, total: filtered.length };

    if (!slice.length) {
        tbody.innerHTML = '<tr><td colspan="4"><div class="table-empty">No se encontraron roles con los filtros aplicados.</div></td></tr>';
        if (typeof renderAbmPagination === 'function') renderAbmPagination('roles-pagination', 'roles', total);
        return;
    }

    slice.forEach(r => {
        const n = r.permisos.length;
        const summary = n === 0
            ? 'Sin permisos'
            : `${n} — ${r.permisos.slice(0, 2).join(', ')}${n > 2 ? '…' : ''}`;
        const viewBtn = typeof canViewAbmRolesDetail === 'function' && canViewAbmRolesDetail()
            ? `<button type="button" class="btn-icon-action btn-icon-action--view" onclick="openRoleDetailModal(${r.id})" title="Ver detalle" aria-label="Ver detalle"><i class="ph ph-eye"></i></button>`
            : '';
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${r.dominio}</td>
            <td><strong>${r.rol}</strong></td>
            <td style="font-size:12px;color:#6b7280;max-width:360px;">${summary}</td>
            <td class="abm-actions-cell">
                ${viewBtn}
                <button type="button" class="btn-icon-action btn-icon-action--edit" onclick="openRoleModal(${r.id})" title="Editar rol" aria-label="Editar rol">
                    <i class="ph ph-pencil-simple"></i>
                </button>
                <button type="button" class="btn-icon-action btn-icon-action--delete" onclick="deleteAbmRole(${r.id})" title="Eliminar rol" aria-label="Eliminar rol">
                    <i class="ph ph-x"></i>
                </button>
            </td>
        `;
        tbody.appendChild(tr);
    });
    if (typeof renderAbmPagination === 'function') renderAbmPagination('roles-pagination', 'roles', total);
}

function renderAbmNotifications() {
    const tbody = document.getElementById('abm-notifications-tbody');
    if (!tbody) return;
    tbody.innerHTML = '';

    const filtered = abmNotifications.filter(notificationMatchesNotificacionesFilters);
    const { slice, total } = typeof paginateAbmGrid === 'function'
        ? paginateAbmGrid(filtered, 'notificaciones')
        : { slice: filtered, total: filtered.length };

    if (!slice.length) {
        tbody.innerHTML = '<tr><td colspan="8"><div class="table-empty">No se encontraron notificaciones con los filtros aplicados.</div></td></tr>';
        if (typeof renderAbmPagination === 'function') renderAbmPagination('notificaciones-pagination', 'notificaciones', total);
        return;
    }

    slice.forEach(n => {
        const viewBtn = typeof canViewAbmNotificationsDetail === 'function' && canViewAbmNotificationsDetail()
            ? `<button type="button" class="btn-icon-action btn-icon-action--view" onclick="openNotificationDetailModal(${n.id})" title="Ver detalle" aria-label="Ver detalle"><i class="ph ph-eye"></i></button>`
            : '';
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><strong>${n.nombre}</strong></td>
            <td><span class="status-badge status-pendiente" style="text-transform:none;font-size:10px;">${n.estadoDisparador}</span></td>
            <td>${n.dominio}</td>
            <td>${n.rol}</td>
            <td style="font-size:12px;color:#6b7280;max-width:200px;word-break:break-all;">${n.emails}</td>
            <td style="font-size:12px;color:#6b7280;max-width:280px;">${n.mensaje}</td>
            <td>${n.activa ? '<span class="badge-egp">Activa</span>' : '<span class="badge-proveedor">Inactiva</span>'}</td>
            <td class="abm-actions-cell">
                ${viewBtn}
                <button type="button" class="btn-icon-action btn-icon-action--edit" onclick="openNotificationModal(${n.id})" title="Editar notificación" aria-label="Editar notificación">
                    <i class="ph ph-pencil-simple"></i>
                </button>
                <button type="button" class="btn-icon-action btn-icon-action--delete" onclick="deleteAbmNotification(${n.id})" title="Eliminar notificación" aria-label="Eliminar notificación">
                    <i class="ph ph-x"></i>
                </button>
            </td>
        `;
        tbody.appendChild(tr);
    });
    if (typeof renderAbmPagination === 'function') renderAbmPagination('notificaciones-pagination', 'notificaciones', total);
}

function openNotificationModal(id = null) {
    editingNotificationId = id;
    const title = document.getElementById('notification-modal-title');
    const form = document.getElementById('notification-form');
    form.reset();
    const estadoSel = document.getElementById('notif-estado');
    if (estadoSel) {
        estadoSel.innerHTML = Object.values(INVOICE_STATES).map(s =>
            `<option value="${s}">${s}</option>`
        ).join('');
    }
    if (id != null) {
        const n = abmNotifications.find(x => x.id === id);
        if (!n) return;
        if (title) title.textContent = 'Editar Notificación';
        document.getElementById('notif-nombre').value = n.nombre;
        document.getElementById('notif-estado').value = n.estadoDisparador;
        document.getElementById('notif-dominio').value = n.dominio;
        document.getElementById('notif-rol').value = n.rol;
        document.getElementById('notif-emails').value = n.emails;
        document.getElementById('notif-mensaje').value = n.mensaje;
        document.getElementById('notif-activa').checked = n.activa;
    } else {
        if (title) title.textContent = 'Nueva Notificación';
        document.getElementById('notif-activa').checked = true;
        document.getElementById('notif-estado').value = INVOICE_STATES.PENDIENTE;
    }
    openModal('notification-modal');
}

function submitNotificationForm() {
    const nombre = document.getElementById('notif-nombre').value.trim();
    const estadoDisparador = document.getElementById('notif-estado').value;
    const dominio = document.getElementById('notif-dominio').value;
    const rol = document.getElementById('notif-rol').value.trim();
    const emails = document.getElementById('notif-emails').value.trim();
    const mensaje = document.getElementById('notif-mensaje').value.trim();
    const activa = document.getElementById('notif-activa').checked;
    if (!nombre || !rol || !emails || !mensaje) {
        showCustomAlert('Complete nombre, rol, emails y mensaje.', 'Datos incompletos');
        return;
    }
    const payload = { nombre, estadoDisparador, tipoEnvio: 'Email', dominio, rol, emails, mensaje, activa };
    if (editingNotificationId != null) {
        const idx = abmNotifications.findIndex(x => x.id === editingNotificationId);
        if (idx >= 0) abmNotifications[idx] = { ...abmNotifications[idx], ...payload };
        showCustomAlert('Notificación actualizada.', 'ABM Notificaciones');
    } else {
        abmNotifications.push({ id: nextAbmNotificationId++, ...payload });
        showCustomAlert('Notificación creada.', 'ABM Notificaciones');
    }
    editingNotificationId = null;
    closeModal('notification-modal');
    renderAbmNotifications();
}

function deleteAbmNotification(id) {
    const n = abmNotifications.find(x => x.id === id);
    if (!n) return;
    showCustomConfirm(
        `¿Confirma eliminar la notificación "${n.nombre}"?`,
        () => {
            abmNotifications = abmNotifications.filter(x => x.id !== id);
            renderAbmNotifications();
            showCustomAlert('Notificación eliminada.', 'ABM Notificaciones');
        },
        'Eliminar notificación'
    );
}

function onEntesFiltersChange() {
    if (typeof abmGridPages !== 'undefined') {
        abmGridPages.egp = 1;
        abmGridPages.proveedor = 1;
    }
    renderParticipants();
}

function onAbmUsersFiltersChange() {
    if (typeof abmGridPages !== 'undefined') abmGridPages.usuarios = 1;
    renderAbmUsers();
}

function onAbmRolesFiltersChange() {
    if (typeof abmGridPages !== 'undefined') abmGridPages.roles = 1;
    renderAbmRoles();
}

function onAbmNotificationsFiltersChange() {
    if (typeof abmGridPages !== 'undefined') abmGridPages.notificaciones = 1;
    renderAbmNotifications();
}

document.querySelectorAll('.abm-tab').forEach(btn => {
    btn.addEventListener('click', () => switchAbmTab(btn.dataset.abmTab));
});

document.getElementById('filter-entes-search')?.addEventListener('input', onEntesFiltersChange);
document.getElementById('filter-entes-cliente-atlas')?.addEventListener('change', onEntesFiltersChange);
document.getElementById('filter-entes-estado')?.addEventListener('change', onEntesFiltersChange);
document.getElementById('filter-usuarios-ente')?.addEventListener('input', onAbmUsersFiltersChange);
document.getElementById('filter-usuarios-cedula')?.addEventListener('input', onAbmUsersFiltersChange);
document.getElementById('filter-usuarios-apellido')?.addEventListener('input', onAbmUsersFiltersChange);
document.getElementById('filter-usuarios-estado')?.addEventListener('change', onAbmUsersFiltersChange);
document.getElementById('filter-roles-dominio')?.addEventListener('change', onAbmRolesFiltersChange);
document.getElementById('filter-roles-rol')?.addEventListener('change', onAbmRolesFiltersChange);
document.getElementById('filter-notificaciones-nombre')?.addEventListener('input', onAbmNotificationsFiltersChange);

document.querySelectorAll('.confirming-invoice-tab').forEach(btn => {
    btn.addEventListener('click', () => switchInvoiceViewTab(btn.dataset.invoiceTab));
});

function openAbmModal(participantId = null) {
    if (participantId) {
        const p = participants.find(x => x.id === participantId);
        switchAbmTab(p?.tipo === 'Proveedor' ? 'proveedor' : 'egp');
    } else {
        switchAbmTab('egp');
    }
    editingParticipantId = participantId;
    const form = document.getElementById('abm-form');
    form.reset();
    document.getElementById('abm-file-list').innerHTML = '';
    populateAbmEgpPadreSelect();
    clearProveedorAdminFields();
    syncAbmProveedorAdminBlock(false);

    if (participantId) {
        const p = participants.find(x => x.id === participantId);
        if (!p) return;
        const viz = getAbmVisualizationDefaults(p);
        document.getElementById('abm-modal-title').textContent = 'Editar Ente';
        document.getElementById('abm-tipo').value = p.tipo;
        document.getElementById('abm-ruc').value = p.ruc;
        document.getElementById('abm-razon').value = p.razon;
        document.getElementById('abm-email').value = p.email || '';
        document.getElementById('abm-telefono').value = p.telefono || '';
        document.getElementById('abm-moneda-gs').checked = viz.monedas.includes('GS');
        document.getElementById('abm-moneda-usd').checked = viz.monedas.includes('USD');
        document.getElementById('abm-linea').value = viz.lineaCredito || '';
        document.getElementById('abm-interes').value = viz.tasaInteres;
        document.getElementById('abm-comision').value = viz.tasaComision;
        document.getElementById('abm-iva').value = viz.iva;
        document.getElementById('abm-condiciones').value = viz.condiciones;
        document.getElementById('abm-cliente-atlas').checked = viz.clienteAtlas;
        if (p.tipo === 'Proveedor' && p.egpPadreId != null) {
            populateAbmEgpPadreSelect(p.egpPadreId);
        }
        syncAbmProveedorAdminBlock(true);
        if (canEditProveedorAdminFields()) {
            populateProveedorAdminFields(p);
        }
    } else {
        document.getElementById('abm-modal-title').textContent = 'Nuevo Ente';
        applyAbmModalReadonlyDefaults();
    }

    const desAuto = document.getElementById('abm-desembolso-auto');
    if (desAuto) {
        desAuto.checked = true;
        desAuto.disabled = true;
    }
    syncAbmTipoFields();
    openModal('abm-modal');
}

function submitParticipant() {
    const tipo = document.getElementById('abm-tipo').value;
    const ruc = document.getElementById('abm-ruc').value.trim();
    const razon = document.getElementById('abm-razon').value.trim();
    const email = document.getElementById('abm-email').value.trim();
    const egpPadreRaw = document.getElementById('abm-egp-padre')?.value;

    if (!tipo || !ruc || !razon) {
        showCustomAlert('Complete Tipo, RUC y Razón Social.', 'Campos incompletos');
        return;
    }
    if (tipo === 'Proveedor' && !egpPadreRaw) {
        showCustomAlert('Seleccione el EGP Padre para el proveedor.', 'Campos incompletos');
        return;
    }

    const existing = editingParticipantId
        ? participants.find(x => x.id === editingParticipantId)
        : null;
    const viz = getAbmVisualizationDefaults(existing);

    const data = {
        tipo,
        ruc,
        razon,
        email,
        telefono: document.getElementById('abm-telefono').value.trim(),
        monedas: viz.monedas,
        lineaCredito: viz.lineaCredito,
        tasaInteres: viz.tasaInteres,
        tasaComision: viz.tasaComision,
        iva: viz.iva,
        condiciones: viz.condiciones,
        clienteAtlas: viz.clienteAtlas,
        desembolsoAuto: true,
        egpPadreId: tipo === 'Proveedor' ? parseInt(egpPadreRaw, 10) : null,
        bloqueado: existing?.bloqueado ?? false,
    };

    if (editingParticipantId && canEditProveedorAdminFields()) {
        const defaults = getProveedorAdminFieldDefaults(ruc);
        data.cuentaCredito = document.getElementById('abm-cuenta-credito').value.trim() || defaults.cuentaCredito;
        data.banco = document.getElementById('abm-banco').value.trim() || defaults.banco;
        data.monedaOperacion = document.querySelector('input[name="abm-moneda-operacion"]:checked')?.value || defaults.monedaOperacion;
        data.tipoDocumento = document.getElementById('abm-tipo-documento').value.trim();
        data.numeroDocumento = document.getElementById('abm-numero-documento').value.trim();
        data.nombreApellido = document.getElementById('abm-nombre-apellido').value.trim();
    } else if (existing) {
        data.cuentaCredito = existing.cuentaCredito;
        data.banco = existing.banco;
        data.monedaOperacion = existing.monedaOperacion;
        data.tipoDocumento = existing.tipoDocumento;
        data.numeroDocumento = existing.numeroDocumento;
        data.nombreApellido = existing.nombreApellido;
    }

    if (editingParticipantId) {
        const idx = participants.findIndex(x => x.id === editingParticipantId);
        if (idx !== -1) {
            participants[idx] = { id: editingParticipantId, ...data };
        }
        showCustomAlert(`El ente "${razon}" fue actualizado exitosamente.`, 'Ente actualizado');
    } else {
        participants.push({ id: nextParticipantId++, ...data });
        showCustomAlert(`El ente "${razon}" fue registrado exitosamente.`, 'Ente registrado');
    }

    closeModal('abm-modal');
    renderParticipants();
    renderAbmUsers();
    populateOperatingEntitySelect();
    renderOperatingEntityPanel();
}

document.getElementById('abm-tipo')?.addEventListener('change', syncAbmTipoFields);

function handleFileSelect(input) {
    const list = document.getElementById('abm-file-list');
    list.innerHTML = '';
    Array.from(input.files).forEach(file => {
        const item = document.createElement('div');
        item.className = 'file-item';
        item.innerHTML = `<i class="ph ph-file-pdf"></i> <span>${file.name}</span> <span style="margin-left:auto;color:#9ca3af;font-size:12px;">${(file.size / 1024).toFixed(1)} KB</span>`;
        list.appendChild(item);
    });
}


function estadoToBadgeClass(estado) {
    const map = {
        [INVOICE_STATES.PENDIENTE]: 'status-pendiente',
        [INVOICE_STATES.HABILITADA]: 'status-habilitada',
        [INVOICE_STATES.BLOQUEADA]: 'status-bloqueada',
        [INVOICE_STATES.PENDIENTE_APROBACION_EGP]: 'status-pendiente-aprobacion-egp',
        [INVOICE_STATES.PENDIENTE_APROBACION_BANCO]: 'status-pendiente-aprobacion-banco',
        [INVOICE_STATES.PENDIENTE_DESEMBOLSO]: 'status-pendiente-desembolso',
        [INVOICE_STATES.FINANCIADA]: 'status-financiada',
        [INVOICE_STATES.VENCIDA]: 'status-vencida',
        [INVOICE_STATES.NO_ELEGIBLE]: 'status-no-elegible',
    };
    return map[estado] || 'status-bloqueada';
}

// ====== LOGICA DE CONFIRMING (CORE) ======

// Eliminar factura: delegación en el tbody (evita onclick="deleteInvoice(JSON…)" que rompe
// las comillas del atributo HTML y deja el botón sin handler válido).
(function initInvoicesTableDeleteDelegation() {
    const tbody = document.getElementById('invoices-tbody');
    if (!tbody) return;
    tbody.addEventListener('click', (e) => {
        const btn = e.target.closest('button.invoice-delete-icon-btn');
        if (!btn || !tbody.contains(btn)) return;
        const id = btn.getAttribute('data-invoice-id');
        if (id == null || id === '') return;
        deleteInvoice(id);
    });
})();

const FECHA_PAGO_EDITABLE_STATES = new Set([
    INVOICE_STATES.NO_ELEGIBLE,
    INVOICE_STATES.PENDIENTE,
    INVOICE_STATES.HABILITADA,
    INVOICE_STATES.BLOQUEADA,
]);

function buildEditFechaPagoButtonHtml(inv) {
    if (!FECHA_PAGO_EDITABLE_STATES.has(inv.estado)) return '';
    const safeId = String(inv.id).replace(/'/g, "\\'");
    return `<button type="button" class="btn-secondary btn-sm" onclick="openEditFechaPagoModal('${safeId}')"><i class="ph ph-calendar"></i> Editar fecha de pago</button>`;
}

function invoiceMatchesDateFilters(inv, filterVtoIso, filterFechaPagoIso) {
    if (filterVtoIso && inv.vto !== filterVtoIso) return false;
    if (filterFechaPagoIso && getInvoiceFechaPago(inv) !== filterFechaPagoIso) return false;
    return true;
}

function getConfirmingFilterValues() {
    const status = document.getElementById('filter-status')?.value || 'all';
    const query = document.getElementById('search-invoice')?.value?.trim() || '';
    const filterVto = readDateInputValue('filter-vto');
    const filterFechaPago = readDateInputValue('filter-fecha-pago');
    return { status, query, filterVto, filterFechaPago };
}

function renderInvoices(filter = 'all', searchQuery = '', filterVto = '', filterFechaPago = '') {
    const tbody = document.getElementById('invoices-tbody');
    tbody.innerHTML = '';

    const enteRazon = getSelectedOperatingEntityRazon();
    const bulkSimActive = isBulkSimulateActive();
    const vtoIso = filterVto || '';
    const fpIso = filterFechaPago || '';

    const filtered = invoices.filter(inv => {
        const matchTab = invoiceBelongsToCurrentViewTab(inv);
        const matchStatus = filter === 'all' || inv.estado === filter;
        const matchSearch = !searchQuery ||
            inv.id.includes(searchQuery) ||
            inv.egp.toLowerCase().includes(searchQuery.toLowerCase()) ||
            inv.prov.toLowerCase().includes(searchQuery.toLowerCase());
        const matchEnte = !enteRazon || inv.egp === enteRazon || inv.prov === enteRazon;
        const matchDates = invoiceMatchesDateFilters(inv, vtoIso, fpIso);
        return matchTab && matchStatus && matchSearch && matchEnte && matchDates;
    });

    pruneSelectionsToExistingInvoices();

    if (filtered.length === 0) {
        tbody.innerHTML = `<tr><td colspan="11"><div class="table-empty">No se encontraron facturas con los filtros aplicados.</div></td></tr>`;
        updateInvoiceSelectionUI(filtered);
        return;
    }

    filtered.forEach(inv => {
        let actionButtons = '';
        const rowSimDisabled = bulkSimActive && inv.estado === INVOICE_STATES.HABILITADA;
        switch (inv.estado) {
            case INVOICE_STATES.HABILITADA:
                actionButtons = `<div class="action-btns-stack">${
                    rowSimDisabled
                        ? `<button type="button" class="btn-primary btn-sm is-disabled" aria-disabled="true" title="Use Simular de la cabecera para selección múltiple"><i class="ph ph-calculator"></i> Simular</button>`
                        : `<button class="btn-primary btn-sm" onclick="openSimulation('${inv.id}')"><i class="ph ph-calculator"></i> Simular</button>`
                }${buildEditFechaPagoButtonHtml(inv)}</div>`;
                break;
            case INVOICE_STATES.PENDIENTE_APROBACION_EGP:
                actionButtons = `<button class="btn-primary btn-sm" onclick="openEgpApprovalModal('${inv.id}')"><i class="ph ph-buildings"></i> Aprobar EGP</button>`;
                break;
            case INVOICE_STATES.PENDIENTE_APROBACION_BANCO:
                actionButtons = `<button class="btn-primary btn-sm btn-aprobar" onclick="openBankApprovalModal('${inv.id}')"><i class="ph ph-bank"></i> Aprobar Banco</button>`;
                break;
            case INVOICE_STATES.PENDIENTE:
                actionButtons = `<div class="action-btns-stack">
                    <span class="row-action-hint"><i class="ph ph-hourglass-medium"></i> Use Habilitar / Bloquear</span>
                    ${buildEditFechaPagoButtonHtml(inv)}
                </div>`;
                break;
            case INVOICE_STATES.PENDIENTE_DESEMBOLSO:
                actionButtons = `<span class="row-action-hint row-action-hint--processing"><i class="ph ph-spinner ph-spin"></i> CORE BANKING desembolsando…</span>`;
                break;
            case INVOICE_STATES.BLOQUEADA:
                actionButtons = `<div class="action-btns-stack">
                    <span class="row-action-hint"><i class="ph ph-lock"></i> No operable</span>
                    ${buildEditFechaPagoButtonHtml(inv)}
                </div>`;
                break;
            case INVOICE_STATES.VENCIDA:
                actionButtons = `<span class="row-action-hint row-action-hint--danger"><i class="ph ph-clock-counter-clockwise"></i> Vencida</span>`;
                break;
            case INVOICE_STATES.NO_ELEGIBLE:
                actionButtons = buildEditFechaPagoButtonHtml(inv);
                break;
            case INVOICE_STATES.FINANCIADA:
                actionButtons = `<span class="row-action-hint"><i class="ph ph-check-circle"></i> Financiada</span>`;
                break;
            default:
                actionButtons = '';
        }

        const safeId = invoiceIdToHtmlAttr(inv.id);
        const deleteInvoiceBtn =
            `<button type="button" class="invoice-delete-icon-btn" data-invoice-id="${safeId}" title="Eliminar factura" aria-label="Eliminar factura"><i class="ph ph-x"></i></button>`;

        const isChecked = selectedInvoiceIds.has(inv.id);
        const checkboxSelectable = canSelectInvoiceForCheckbox(inv);
        const checkboxDisabled = !checkboxSelectable && !isChecked;

        const tr = document.createElement('tr');
        if (isChecked) tr.classList.add('row-selected');
        if (checkboxDisabled) tr.classList.add('row-select-locked');
        tr.innerHTML = `
            <td class="col-select">
                <label class="row-checkbox ${checkboxDisabled ? 'row-checkbox--disabled' : ''}" title="${checkboxDisabled ? 'No coincide con EGP / Proveedor / Moneda de la selección' : `Seleccionar factura ${inv.id}`}">
                    <input type="checkbox" ${isChecked ? 'checked' : ''} ${checkboxDisabled ? 'disabled' : ''} data-invoice-id="${safeId}" onchange="onInvoiceCheckboxChange(this)">
                    <span class="row-checkbox-box" aria-hidden="true"></span>
                </label>
            </td>
            <td><strong>${inv.id}</strong></td>
            <td>${inv.egp}</td>
            <td>${inv.prov}</td>
            <td>${formatDateDDMMYYYY(inv.emision)}</td>
            <td>${formatDateDDMMYYYY(inv.vto)}</td>
            <td>${formatDateDDMMYYYY(getInvoiceFechaPago(inv))}</td>
            <td style="font-weight: 600;">${formatCurrency(inv.monto, inv.moneda)}</td>
            <td><span class="status-badge ${estadoToBadgeClass(inv.estado)}">${inv.estado}</span></td>
            <td class="col-inv-delete">${deleteInvoiceBtn}</td>
            <td class="action-btns">${actionButtons}</td>
        `;
        tbody.appendChild(tr);
    });

    updateInvoiceSelectionUI(filtered);
}

// Escapa el id de factura para usarlo de forma segura en un atributo HTML.
function invoiceIdToHtmlAttr(id) {
    return String(id).replace(/[&<>"']/g, ch => ({
        '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    }[ch]));
}

// Quita del set de selección los IDs de facturas que ya no existen
// (por ejemplo si el listado cambia en el futuro).
function pruneSelectionsToExistingInvoices() {
    const existing = new Set(invoices.map(i => i.id));
    [...selectedInvoiceIds].forEach(id => {
        if (!existing.has(id)) selectedInvoiceIds.delete(id);
    });
}

// Refresca todos los controles que dependen de la selección actual:
// header (checkbox / X) y botón Habilitar.
function updateInvoiceSelectionUI(filteredInvoices) {
    updateSelectAllToggle(filteredInvoices || getCurrentFilteredInvoices());
    updateHabilitarButtonState();
    updateSimularButtonState();
}

function getCurrentFilteredInvoices() {
    const { status: filter, query, filterVto, filterFechaPago } = getConfirmingFilterValues();
    const enteRazon = getSelectedOperatingEntityRazon();
    return invoices.filter(inv => {
        const matchTab = invoiceBelongsToCurrentViewTab(inv);
        const matchStatus = filter === 'all' || inv.estado === filter;
        const matchSearch = !query ||
            inv.id.includes(query) ||
            inv.egp.toLowerCase().includes(query.toLowerCase()) ||
            inv.prov.toLowerCase().includes(query.toLowerCase());
        const matchEnte = !enteRazon || inv.egp === enteRazon || inv.prov === enteRazon;
        const matchDates = invoiceMatchesDateFilters(inv, filterVto, filterFechaPago);
        return matchTab && matchStatus && matchSearch && matchEnte && matchDates;
    });
}

// ===== Selección masiva: handlers =====

function onInvoiceCheckboxChange(input) {
    const id = resolveInvoiceIdFromCheckboxInput(input);
    if (!id) return;
    if (input.checked) {
        const inv = invoices.find(i => i.id === id);
        if (inv && !canSelectInvoiceForCheckbox(inv)) {
            input.checked = false;
            return;
        }
        selectedInvoiceIds.add(id);
    } else {
        selectedInvoiceIds.delete(id);
    }
    renderCurrentConfirmingFilters();
}

function onSelectAllToggleClick() {
    if (selectedInvoiceIds.size > 0) {
        clearAllInvoiceSelections();
    } else {
        selectAllVisibleInvoices();
    }
}

function onSelectAllToggleKey(e) {
    if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        onSelectAllToggleClick();
    }
}

function selectAllVisibleInvoices() {
    const visible = getCurrentFilteredInvoices().filter(canSelectInvoiceForCheckbox);
    visible.forEach(inv => selectedInvoiceIds.add(inv.id));
    renderCurrentConfirmingFilters();
}

function clearAllInvoiceSelections() {
    selectedInvoiceIds.clear();
    renderCurrentConfirmingFilters();
}

// Renderiza el control de la cabecera. Dos estados:
//   - 0 selecciones: caja vacía (al clickear, selecciona todo lo visible).
//   - 1+ selecciones: ícono X (al clickear, deselecciona todo).
function updateSelectAllToggle(filteredInvoices) {
    const toggle = document.getElementById('invoices-select-all');
    if (!toggle) return;
    const count = selectedInvoiceIds.size;

    if (count > 0) {
        toggle.classList.add('select-toggle--clear');
        toggle.classList.remove('select-toggle--checked');
        toggle.setAttribute('aria-checked', 'true');
        toggle.setAttribute('title', `Deseleccionar todas las facturas (${count} seleccionada${count === 1 ? '' : 's'})`);
        toggle.innerHTML = '<i class="ph ph-x" aria-hidden="true"></i>';
    } else {
        toggle.classList.remove('select-toggle--clear');
        toggle.classList.remove('select-toggle--checked');
        toggle.setAttribute('aria-checked', 'false');
        const visibleCount = (filteredInvoices || []).length;
        toggle.setAttribute(
            'title',
            visibleCount > 0
                ? `Seleccionar todas las facturas visibles (${visibleCount})`
                : 'No hay facturas visibles para seleccionar'
        );
        toggle.innerHTML = '<span class="select-toggle-box" aria-hidden="true"></span>';
    }
}

// Habilita / deshabilita los botones de acción masiva (Habilitar / Bloquear) según
// la selección actual.
function updateHabilitarButtonState() {
    updateBulkActionButtonState({
        btnId: 'btn-habilitar-facturas',
        wrapperId: 'btn-habilitar-wrapper',
        validPred: isInvoiceEligibleForBulkHabilitar,
        invalidTooltip: HABILITAR_INVALID_TOOLTIP,
        emptyTooltip: HABILITAR_EMPTY_TOOLTIP,
        verb: 'Habilitar',
    });
    updateBulkActionButtonState({
        btnId: 'btn-bloquear-facturas',
        wrapperId: 'btn-bloquear-wrapper',
        validPred: isInvoiceEligibleForBulkBloquear,
        invalidTooltip: BLOQUEAR_INVALID_TOOLTIP,
        emptyTooltip: BLOQUEAR_EMPTY_TOOLTIP,
        verb: 'Bloquear',
    });
}

function updateSimularButtonState() {
    const btn = document.getElementById('btn-simular-facturas');
    const wrapper = document.getElementById('btn-simular-wrapper');
    if (!btn || !wrapper) return;

    const selected = getSelectedInvoices();
    const habilitadas = selected.filter(i => i.estado === INVOICE_STATES.HABILITADA);
    const count = habilitadas.length;
    const sameCombo = count > 0 && habilitadas.every(i =>
        i.egp === habilitadas[0].egp &&
        i.prov === habilitadas[0].prov &&
        i.moneda === habilitadas[0].moneda
    );
    const allValid = count >= 2 && sameCombo && selected.every(i => i.estado === INVOICE_STATES.HABILITADA);

    if (allValid) {
        btn.classList.remove('is-disabled');
        btn.removeAttribute('aria-disabled');
        btn.setAttribute('title', `Simular adelanto de ${count} facturas (${habilitadas[0].egp} – ${habilitadas[0].prov} – ${habilitadas[0].moneda})`);
        wrapper.removeAttribute('title');
        wrapper.classList.remove('btn-tooltip-wrapper--inactive');
    } else {
        btn.classList.add('is-disabled');
        btn.setAttribute('aria-disabled', 'true');
        btn.removeAttribute('title');
        wrapper.classList.add('btn-tooltip-wrapper--inactive');
        if (count === 0 || selected.length === 0) {
            wrapper.setAttribute('title', SIMULAR_EMPTY_TOOLTIP);
        } else {
            wrapper.setAttribute('title', SIMULAR_INVALID_TOOLTIP);
        }
    }
}

function simularSelectedInvoices() {
    const btn = document.getElementById('btn-simular-facturas');
    if (!btn || btn.classList.contains('is-disabled') || btn.getAttribute('aria-disabled') === 'true') return;

    const selected = getSelectedInvoices().filter(i => i.estado === INVOICE_STATES.HABILITADA);
    if (selected.length < 2) return;
    const combo = selected[0];
    if (!selected.every(i => i.egp === combo.egp && i.prov === combo.prov && i.moneda === combo.moneda)) return;

    const total = selected.reduce((s, i) => s + i.monto, 0);
    const idsPreview = selected.slice(0, 5).map(i => i.id).join(', ');
    const more = selected.length > 5 ? ` y ${selected.length - 5} más` : '';
    const msg = `¿Confirma simular y solicitar adelanto para ${selected.length} facturas (${idsPreview}${more})?\n\nEGP: ${combo.egp}\nProveedor: ${combo.prov}\nMoneda: ${combo.moneda}\nMonto total: ${formatCurrency(total, combo.moneda)}\n\nTodas pasarán a "Pendiente aprobación EGP".`;

    showCustomConfirm(msg, () => {
        selected.forEach(inv => { inv.estado = INVOICE_STATES.PENDIENTE_APROBACION_EGP; });
        selectedInvoiceIds.clear();
        renderCurrentConfirmingFilters();
        showCustomAlert(
            `${selected.length} facturas enviadas a aprobación EGP.`,
            'Simulación masiva'
        );
    }, 'Simular adelanto masivo');
}

function updateBulkActionButtonState({ btnId, wrapperId, validPred, invalidTooltip, emptyTooltip, verb }) {
    const btn = document.getElementById(btnId);
    const wrapper = document.getElementById(wrapperId);
    if (!btn || !wrapper) return;

    const selectedInvoices = getSelectedInvoices();
    const count = selectedInvoices.length;
    const allValid = count > 0 && selectedInvoices.every(validPred);

    if (allValid) {
        btn.classList.remove('is-disabled');
        btn.removeAttribute('aria-disabled');
        btn.setAttribute('title', `${verb} ${count} factura${count === 1 ? '' : 's'} seleccionada${count === 1 ? '' : 's'}`);
        wrapper.removeAttribute('title');
        wrapper.classList.remove('btn-tooltip-wrapper--inactive');
    } else {
        btn.classList.add('is-disabled');
        btn.setAttribute('aria-disabled', 'true');
        btn.removeAttribute('title');
        wrapper.classList.add('btn-tooltip-wrapper--inactive');
        wrapper.setAttribute('title', count === 0 ? emptyTooltip : invalidTooltip);
    }
}

// Acción del botón Habilitar: confirma y, si se acepta, pasa todas las facturas
// seleccionadas (todas en estado Pendiente o Bloqueada) a estado Habilitada.
function habilitarSelectedInvoices() {
    const btn = document.getElementById('btn-habilitar-facturas');
    if (!btn || btn.classList.contains('is-disabled') || btn.getAttribute('aria-disabled') === 'true') return;

    const selectedInvoices = getSelectedInvoices();
    if (selectedInvoices.length === 0) return;
    if (!selectedInvoices.every(isInvoiceEligibleForBulkHabilitar)) return;

    const count = selectedInvoices.length;
    const idsPreview = selectedInvoices.slice(0, 5).map(i => i.id).join(', ');
    const more = count > 5 ? ` y ${count - 5} más` : '';
    const msg = count === 1
        ? `¿Confirma habilitar la factura ${idsPreview}? Pasará al estado "Habilitada".`
        : `¿Confirma habilitar ${count} facturas seleccionadas (${idsPreview}${more})? Todas pasarán al estado "Habilitada".`;

    showCustomConfirm(msg, () => {
        selectedInvoices.forEach(inv => { inv.estado = INVOICE_STATES.HABILITADA; });
        selectedInvoiceIds.clear();
        renderCurrentConfirmingFilters();
        showCustomAlert(
            count === 1
                ? `La factura fue habilitada correctamente.`
                : `${count} facturas fueron habilitadas correctamente.`,
            'Habilitación exitosa'
        );
    }, 'Habilitar facturas');
}

// Acción simétrica al Habilitar: bloquea facturas en estado Pendiente o Habilitada
// (camino "usuario bloquea factura" en la máquina de estados).
function bloquearSelectedInvoices() {
    const btn = document.getElementById('btn-bloquear-facturas');
    if (!btn || btn.classList.contains('is-disabled') || btn.getAttribute('aria-disabled') === 'true') return;

    const selectedInvoices = getSelectedInvoices();
    if (selectedInvoices.length === 0) return;
    if (!selectedInvoices.every(isInvoiceEligibleForBulkBloquear)) return;

    const count = selectedInvoices.length;
    const idsPreview = selectedInvoices.slice(0, 5).map(i => i.id).join(', ');
    const more = count > 5 ? ` y ${count - 5} más` : '';
    const msg = count === 1
        ? `¿Confirma bloquear la factura ${idsPreview}? Pasará al estado "Bloqueada".`
        : `¿Confirma bloquear ${count} facturas seleccionadas (${idsPreview}${more})? Todas pasarán al estado "Bloqueada".`;

    showCustomConfirm(msg, () => {
        selectedInvoices.forEach(inv => { inv.estado = INVOICE_STATES.BLOQUEADA; });
        selectedInvoiceIds.clear();
        renderCurrentConfirmingFilters();
        showCustomAlert(
            count === 1
                ? `La factura fue bloqueada correctamente.`
                : `${count} facturas fueron bloqueadas correctamente.`,
            'Bloqueo exitoso'
        );
    }, 'Bloquear facturas');
}

document.getElementById('filter-status')?.addEventListener('change', () => renderCurrentConfirmingFilters());
document.getElementById('search-invoice')?.addEventListener('input', () => renderCurrentConfirmingFilters());
document.getElementById('filter-vto')?.addEventListener('change', () => renderCurrentConfirmingFilters());
document.getElementById('filter-fecha-pago')?.addEventListener('change', () => renderCurrentConfirmingFilters());
document.getElementById('filter-vto')?.addEventListener('blur', () => renderCurrentConfirmingFilters());
document.getElementById('filter-fecha-pago')?.addEventListener('blur', () => renderCurrentConfirmingFilters());


// SIMULAR ESCANEO QR
function simulateScan() {
    const overlay = document.getElementById('scanner-overlay');
    overlay.classList.remove('hidden');

    setTimeout(() => {
        document.getElementById('ni-nro').value = '001-002-' + Math.floor(1000000 + Math.random() * 9000000);
        document.getElementById('ni-egp').value = 'Retail S.A.';
        document.getElementById('ni-prov').value = 'Logistica Integral';

        const today = new Date();
        const emIso = formatDateISOFromParts(today.getFullYear(), today.getMonth() + 1, today.getDate());
        const vtoD = new Date(today);
        vtoD.setDate(vtoD.getDate() + 45);
        const vtoIso = formatDateISOFromParts(vtoD.getFullYear(), vtoD.getMonth() + 1, vtoD.getDate());
        setDateInputValue('ni-emision', emIso);
        setDateInputValue('ni-vto', vtoIso);
        syncNewInvoiceFechaPagoFromVto();

        document.getElementById('ni-moneda').value = 'GS';
        document.getElementById('ni-monto').value = Math.floor(10000000 + Math.random() * 50000000);

        overlay.classList.add('hidden');
        showCustomAlert('Factura leída correctamente desde código QR.', 'Éxito');
    }, 2000);
}

function openNewInvoiceModal() {
    newInvoiceFechaPagoTouched = false;
    openModal('new-invoice-modal');
    syncNewInvoiceFechaPagoFromVto();
}

function syncNewInvoiceFechaPagoFromVto() {
    if (newInvoiceFechaPagoTouched) return;
    const vtoIso = readDateInputValue('ni-vto') || document.getElementById('ni-vto')?.dataset.isoValue;
    if (vtoIso) setDateInputValue('ni-fecha-pago', vtoIso);
}

// Nueva Factura
function submitNewInvoice() {
    const nro = document.getElementById('ni-nro').value;
    const egp = document.getElementById('ni-egp').value;
    const prov = document.getElementById('ni-prov').value;
    const emision = readDateInputValue('ni-emision');
    const vto = readDateInputValue('ni-vto');
    const fechaPago = readDateInputValue('ni-fecha-pago') || vto;
    const moneda = document.getElementById('ni-moneda').value;
    const monto = parseFloat(document.getElementById('ni-monto').value);
    const estadoSolicitado = document.getElementById('ni-estado').value;

    if (!nro || !emision || !vto || !fechaPago || !monto) {
        showCustomAlert("Por favor complete todos los campos obligatorios.");
        return;
    }

    const estado = resolveInitialInvoiceState(estadoSolicitado, fechaPago);
    invoices.unshift({ id: nro, egp, prov, emision, vto, fechaPago, moneda, monto, estado });

    closeModal('new-invoice-modal');
    document.getElementById('new-invoice-form').reset();
    newInvoiceFechaPagoTouched = false;
    renderCurrentConfirmingFilters();

    if (estado === INVOICE_STATES.NO_ELEGIBLE) {
        showCustomAlert(
            'La factura fue registrada en estado NO ELEGIBLE: la fecha de pago debe estar a 30 días o más desde hoy.',
            'Factura no elegible'
        );
    } else {
        showCustomAlert('La factura ha sido registrada exitosamente.', 'Factura Registrada');
    }
}

function openEditFechaPagoModal(invoiceId) {
    const inv = invoices.find(i => i.id === invoiceId);
    if (!inv || !FECHA_PAGO_EDITABLE_STATES.has(inv.estado)) return;
    editingFechaPagoInvoiceId = invoiceId;
    document.getElementById('efp-invoice-id').textContent = inv.id;
    setDateInputValue('efp-fecha-pago', getInvoiceFechaPago(inv));
    const hint = document.getElementById('efp-hint');
    if (hint) {
        hint.innerHTML = inv.estado === INVOICE_STATES.NO_ELEGIBLE
            ? `Factura <strong>${inv.id}</strong>. Si la nueva fecha está a 30 días o más desde hoy, la factura vuelve a Habilitada.`
            : `Factura <strong>${inv.id}</strong> (${inv.estado}). Si la fecha de pago queda a menos de 30 días desde hoy, pasará a NO ELEGIBLE.`;
    }
    openModal('edit-fecha-pago-modal');
}

function submitEditFechaPago() {
    const inv = invoices.find(i => i.id === editingFechaPagoInvoiceId);
    if (!inv) return;
    const nuevaFecha = readDateInputValue('efp-fecha-pago');
    if (!nuevaFecha) {
        showCustomAlert('Indique una fecha de pago válida (dd-mm-yyyy).', 'Fecha inválida');
        return;
    }
    const prevState = inv.estado;
    inv.fechaPago = nuevaFecha;
    if (!isPaymentDateEligible(nuevaFecha)) {
        inv.estado = INVOICE_STATES.NO_ELEGIBLE;
        closeModal('edit-fecha-pago-modal');
        editingFechaPagoInvoiceId = null;
        renderCurrentConfirmingFilters();
        showCustomAlert(
            prevState === INVOICE_STATES.NO_ELEGIBLE
                ? `La fecha fue guardada. La factura ${inv.id} sigue NO ELEGIBLE (menos de 30 días desde hoy).`
                : `La factura ${inv.id} pasó a NO ELEGIBLE: la fecha de pago debe estar a 30 días o más desde hoy.`,
            'Fecha de pago actualizada'
        );
        return;
    }
    if (prevState === INVOICE_STATES.NO_ELEGIBLE) {
        inv.estado = INVOICE_STATES.HABILITADA;
    }
    closeModal('edit-fecha-pago-modal');
    editingFechaPagoInvoiceId = null;
    renderCurrentConfirmingFilters();
    showCustomAlert(
        prevState === INVOICE_STATES.NO_ELEGIBLE
            ? `La fecha de pago fue actualizada. La factura ${inv.id} pasó a estado Habilitada.`
            : `La fecha de pago de la factura ${inv.id} fue actualizada.`,
        'Fecha de pago actualizada'
    );
}


// Simulación de Adelanto
function openSimulation(invoiceId) {
    openSimulationModal(invoiceId, 'simulate');
}

function openEgpApprovalModal(invoiceId) {
    openSimulationModal(invoiceId, 'approve-egp');
}

function openBankApprovalModal(invoiceId) {
    openSimulationModal(invoiceId, 'approve-bank');
}

/** @deprecated usar openBankApprovalModal */
function openApprovalModal(invoiceId) {
    openBankApprovalModal(invoiceId);
}

function openSimulationModal(invoiceId, mode = 'simulate') {
    const inv = invoices.find(i => i.id === invoiceId);
    if (!inv) return;

    currentSimulationInvoice = inv;
    currentSimulationMode = mode;

    // Buscar el EGP en participants para obtener su configuración de monedas y tasas
    const egpConfig = participants.find(p => p.razon === inv.egp && p.tipo === 'EGP');
    const isMultimoneda = egpConfig && egpConfig.monedas.length > 1;

    const simMonedaSelect = document.getElementById('sim-moneda');
    simMonedaSelect.value = inv.moneda;

    const simMonto = document.getElementById('sim-monto');

    const readOnlyModes = ['approve-egp', 'approve-bank'];
    if (readOnlyModes.includes(mode)) {
        simMonedaSelect.disabled = true;
        simMonedaSelect.title = 'Moneda definida en la factura';
        simMonto.disabled = true;
        simMonto.title = 'Monto del adelanto';
    } else {
        if (isMultimoneda) {
            simMonedaSelect.disabled = false;
            simMonedaSelect.title = 'Este EGP opera en múltiples monedas';
        } else {
            simMonedaSelect.disabled = true;
            simMonedaSelect.title = 'Moneda única habilitada para este participante';
        }
        simMonto.disabled = false;
        simMonto.title = '';
    }

    simMonto.value = inv.monto;
    simMonto.max = inv.monto;

    applySimulationModalMode();
    recalculateSimulation();
    openModal('simulate-modal');
}

// Configura título, leyendas y footer del modal según el modo activo
function setModalFooterBtnVisible(id, visible) {
    const el = document.getElementById(id);
    if (el) el.classList.toggle('hidden', !visible);
}

function applySimulationModalMode() {
    const titleEl = document.getElementById('simulate-modal-title');
    const sectionTitleEl = document.getElementById('simulate-section-title');
    const hintEl = document.getElementById('simulate-mode-hint');
    const inv = currentSimulationInvoice;
    const mode = currentSimulationMode;

    const allFooterIds = [
        'btn-execute-adelanto',
        'btn-aprobar-desembolso',
        'btn-rechazar-desembolso',
        'btn-aprobar-egp',
        'btn-rechazar-egp-motivo',
        'btn-rechazar-egp-sin-motivo',
    ];
    allFooterIds.forEach(id => setModalFooterBtnVisible(id, false));

    if (mode === 'approve-egp') {
        if (titleEl) titleEl.textContent = 'Aprobación EGP';
        if (sectionTitleEl) sectionTitleEl.textContent = 'Adelanto pendiente de aprobación por el EGP';
        const auto = getEgpConfigForInvoice(inv)?.desembolsoAuto;
        if (hintEl) {
            hintEl.textContent = auto
                ? 'EGP con desembolso automático: al aprobar, el banco aprueba la TX y pasa a Pendiente de desembolso.'
                : 'EGP sin desembolso automático: al aprobar, pasa a Pendiente aprobación banco (MVP2).';
        }
        setModalFooterBtnVisible('btn-aprobar-egp', true);
        setModalFooterBtnVisible('btn-rechazar-egp-motivo', true);
        setModalFooterBtnVisible('btn-rechazar-egp-sin-motivo', true);
    } else if (mode === 'approve-bank') {
        if (titleEl) titleEl.textContent = 'Aprobación Banco';
        if (sectionTitleEl) sectionTitleEl.textContent = 'Desembolso pendiente de aprobación bancaria';
        if (hintEl) hintEl.textContent = 'El banco aprueba la transacción (desembolso) o la rechaza (factura Bloqueada).';
        setModalFooterBtnVisible('btn-aprobar-desembolso', true);
        setModalFooterBtnVisible('btn-rechazar-desembolso', true);
    } else {
        if (titleEl) titleEl.textContent = 'Simulación de Adelanto';
        if (sectionTitleEl) sectionTitleEl.textContent = 'Datos a adelantar';
        if (hintEl) hintEl.textContent = 'Al ejecutar, la solicitud pasa a Pendiente aprobación EGP.';
        setModalFooterBtnVisible('btn-execute-adelanto', true);
    }
}

function recalculateSimulation() {
    if (!currentSimulationInvoice) return;

    const inv = currentSimulationInvoice;
    let montoAdelanto = parseFloat(document.getElementById('sim-monto').value) || 0;
    // La moneda seleccionada puede diferir (multimoneda)
    const monedaSim = document.getElementById('sim-moneda').value;

    if (montoAdelanto > inv.monto) {
        montoAdelanto = inv.monto;
        document.getElementById('sim-monto').value = montoAdelanto;
    }

    // Calcular días reales a partir del vencimiento
    const hoy = new Date();
    const fVto = new Date(inv.vto);
    const diffTime = fVto - hoy;
    let diasAdelanto = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diasAdelanto < 0) diasAdelanto = 0;

    // Obtener tasas del participante si existen, si no usar defaults
    const egpConfig = participants.find(p => p.razon === inv.egp && p.tipo === 'EGP');
    const tasaAnual = egpConfig ? egpConfig.tasaInteres / 100 : 0.12;
    const tasaComision = egpConfig ? egpConfig.tasaComision / 100 : 0.015;
    const tasaIva = egpConfig ? egpConfig.iva / 100 : 0.10;

    const interes = (montoAdelanto * tasaAnual * diasAdelanto) / 365;
    const comision = montoAdelanto * tasaComision;
    const iva = (interes + comision) * tasaIva;
    const neto = montoAdelanto - interes - comision - iva;

    const simTicket = document.getElementById('simulation-ticket');
    simTicket.innerHTML = `
        <div class="ticket-row">
            <div class="label"><i class="ph ph-receipt"></i> Factura original</div>
            <div class="value">${inv.id} <span class="subtext">(${inv.egp} – ${inv.prov})</span></div>
        </div>
        <div class="ticket-row">
            <div class="label"><i class="ph ph-calendar-blank"></i> Días a adelantar</div>
            <div class="value">${diasAdelanto} días <span class="subtext">Vto: ${inv.vto}</span></div>
        </div>
        <div class="ticket-row">
            <div class="label"><i class="ph ph-percent"></i> Intereses a descontar</div>
            <div class="value text-danger">– ${formatCurrency(interes, monedaSim)} <span class="subtext">(–${(tasaAnual * 100).toFixed(1)}% TNA)</span></div>
        </div>
        <div class="ticket-row">
            <div class="label"><i class="ph ph-file-text"></i> Comisiones operativas</div>
            <div class="value text-danger">– ${formatCurrency(comision, monedaSim)} <span class="subtext">(–${(tasaComision * 100).toFixed(1)}%)</span></div>
        </div>
        <div class="ticket-row">
            <div class="label"><i class="ph ph-bank"></i> I.V.A.</div>
            <div class="value text-danger">– ${formatCurrency(iva, monedaSim)} <span class="subtext">(${(tasaIva * 100).toFixed(0)}%)</span></div>
        </div>
        <div class="ticket-row total">
            <div class="label">Monto Neto a Acreditar</div>
            <div class="value">${formatCurrency(neto, monedaSim)}</div>
        </div>
    `;
}

// Recalcular al cambiar la moneda en simulación
document.getElementById('sim-moneda').addEventListener('change', recalculateSimulation);

// === Flujo normal: Habilitada → Pendiente aprobación EGP (simular / solicitar adelanto) ===
document.getElementById('btn-execute-adelanto').addEventListener('click', () => {
    if (!currentSimulationInvoice) return;
    const inv = currentSimulationInvoice;
    inv.estado = INVOICE_STATES.PENDIENTE_APROBACION_EGP;
    renderCurrentConfirmingFilters();
    closeModal('simulate-modal');
    currentSimulationInvoice = null;
    showCustomAlert(
        `La solicitud de adelanto para la factura ${inv.id} fue enviada al EGP. Estado: "Pendiente aprobación EGP".`,
        'Solicitud enviada al EGP'
    );
});

// EGP aprueba → desembolso automático (flag SI) o Pendiente aprobación banco (flag NO)
document.getElementById('btn-aprobar-egp')?.addEventListener('click', () => {
    if (!currentSimulationInvoice) return;
    const inv = currentSimulationInvoice;
    const egpConfig = getEgpConfigForInvoice(inv);
    if (egpConfig?.desembolsoAuto) {
        inv.estado = INVOICE_STATES.PENDIENTE_DESEMBOLSO;
        finishSimulationModalAction(
            `EGP aprobó con desembolso automático. La factura ${inv.id} pasa a "Pendiente de desembolso" (banco aprueba TX).`,
            'EGP aprobó — desembolso auto'
        );
        scheduleCoreBankingDisbursement(inv.id);
    } else {
        inv.estado = INVOICE_STATES.PENDIENTE_APROBACION_BANCO;
        finishSimulationModalAction(
            `El EGP aprobó el adelanto de la factura ${inv.id}. Pasa a "Pendiente aprobación banco" (MVP2).`,
            'EGP aprobó'
        );
    }
});

// EGP rechaza con motivo → Habilitada (actualiza fecha de pago)
document.getElementById('btn-rechazar-egp-motivo')?.addEventListener('click', () => {
    if (!currentSimulationInvoice) return;
    const inv = currentSimulationInvoice;
    const newVto = window.prompt(
        `EGP rechaza con motivo. Indique la nueva fecha de pago (dd-mm-yyyy) para la factura ${inv.id}:`,
        formatDateDDMMYYYY(getInvoiceFechaPago(inv))
    );
    if (newVto == null || newVto.trim() === '') return;
    const nuevaFecha = normalizeDateToISO(newVto.trim());
    if (!nuevaFecha) {
        showCustomAlert('Formato de fecha inválido. Use dd-mm-yyyy.', 'Fecha inválida');
        return;
    }
    inv.fechaPago = nuevaFecha;
    inv.vto = nuevaFecha;
    inv.estado = isPaymentDateEligible(nuevaFecha)
        ? INVOICE_STATES.HABILITADA
        : INVOICE_STATES.NO_ELEGIBLE;
    const estadoMsg = inv.estado === INVOICE_STATES.HABILITADA
        ? 'vuelve a Habilitada'
        : 'queda en NO ELEGIBLE (fecha de pago menor a 30 días)';
    finishSimulationModalAction(
        `El EGP rechazó con motivo. La factura ${inv.id} ${estadoMsg} (fecha de pago: ${inv.fechaPago}).`,
        'EGP rechazó con motivo'
    );
});

// EGP rechaza sin motivo → Bloqueada
document.getElementById('btn-rechazar-egp-sin-motivo')?.addEventListener('click', () => {
    if (!currentSimulationInvoice) return;
    const inv = currentSimulationInvoice;
    inv.estado = INVOICE_STATES.BLOQUEADA;
    finishSimulationModalAction(
        `El EGP rechazó sin motivo. La factura ${inv.id} pasa a estado Bloqueada.`,
        'EGP rechazó'
    );
});

// Banco aprueba → Pendiente de desembolso → CORE BANKING
document.getElementById('btn-aprobar-desembolso')?.addEventListener('click', () => {
    if (!currentSimulationInvoice) return;
    const inv = currentSimulationInvoice;
    inv.estado = INVOICE_STATES.PENDIENTE_DESEMBOLSO;
    finishSimulationModalAction(
        `El banco aprobó la TX de la factura ${inv.id}. CORE BANKING está desembolsando.`,
        'Banco aprobó'
    );
    scheduleCoreBankingDisbursement(inv.id);
});

// Banco rechaza → Bloqueada
document.getElementById('btn-rechazar-desembolso')?.addEventListener('click', () => {
    if (!currentSimulationInvoice) return;
    const inv = currentSimulationInvoice;
    inv.estado = INVOICE_STATES.BLOQUEADA;
    finishSimulationModalAction(
        `El banco rechazó la transacción. La factura ${inv.id} pasa a estado Bloqueada.`,
        'Banco rechazó'
    );
});

function finishSimulationModalAction(message, title) {
    renderCurrentConfirmingFilters();
    closeModal('simulate-modal');
    currentSimulationInvoice = null;
    currentSimulationMode = 'simulate';
    showCustomAlert(message, title);
}

// ====== Transiciones automáticas (simulan agentes externos del diagrama) ======

// Simula la API CORE BANKING. Mayoría de las veces concreta el desembolso (Pendiente
// de desembolso → Financiada). Con baja probabilidad simula un ERROR y la factura vuelve
// a "Pendiente aprobación banco" (flecha roja del diagrama) para reintentar.
const CORE_BANKING_DELAY_MS = 2500;
const CORE_BANKING_ERROR_RATE = 0.15;
function scheduleCoreBankingDisbursement(invoiceId) {
    setTimeout(() => {
        const inv = invoices.find(i => i.id === invoiceId);
        if (!inv || inv.estado !== INVOICE_STATES.PENDIENTE_DESEMBOLSO) return;
        if (Math.random() < CORE_BANKING_ERROR_RATE) {
            inv.estado = INVOICE_STATES.PENDIENTE_APROBACION_BANCO;
            renderCurrentConfirmingFilters();
            showCustomAlert(
                `La API CORE BANKING reportó un ERROR al desembolsar la factura ${inv.id}. La factura vuelve a "Pendiente aprobación banco" para reintentar la operación.`,
                'Error de desembolso'
            );
        } else {
            inv.estado = INVOICE_STATES.FINANCIADA;
            renderCurrentConfirmingFilters();
            showCustomAlert(
                `Desembolso completado por CORE BANKING. La factura ${inv.id} pasa a estado "Financiada".`,
                'Adelanto acreditado'
            );
        }
    }, CORE_BANKING_DELAY_MS);
}

// Helper para refrescar la grilla respetando los filtros y búsqueda actuales
function renderCurrentConfirmingFilters() {
    const { status, query, filterVto, filterFechaPago } = getConfirmingFilterValues();
    renderInvoices(status, query, filterVto, filterFechaPago);
}

function deleteInvoice(invoiceId) {
    const inv = invoices.find(i => i.id === invoiceId);
    if (!inv) return;
    showCustomConfirm(
        `¿Confirma eliminar la factura ${inv.id} (${inv.egp} – ${inv.prov})? Esta acción no se puede deshacer.`,
        () => {
            invoices = invoices.filter(i => i.id !== invoiceId);
            selectedInvoiceIds.delete(invoiceId);
            renderCurrentConfirmingFilters();
            showCustomAlert('La factura fue eliminada correctamente.', 'Factura eliminada');
        },
        'Eliminar factura'
    );
}


function toggleAbmAddMenu() {
    const menu = document.getElementById('abm-add-menu');
    const btn = document.getElementById('abm-add-toggle');
    if (!menu || !btn) return;
    menu.classList.toggle('hidden');
    btn.setAttribute('aria-expanded', menu.classList.contains('hidden') ? 'false' : 'true');
}

function closeAbmAddMenu() {
    const menu = document.getElementById('abm-add-menu');
    const btn = document.getElementById('abm-add-toggle');
    if (menu) menu.classList.add('hidden');
    if (btn) btn.setAttribute('aria-expanded', 'false');
}

document.addEventListener('click', (e) => {
    const wrap = document.getElementById('abm-add-dropdown');
    if (wrap && !wrap.contains(e.target)) closeAbmAddMenu();
});

function populateUserEnteSelect() {
    const sel = document.getElementById('nu-ente-id');
    if (!sel) return;
    const prev = sel.value;
    sel.innerHTML = '<option value="">Seleccione un ente...</option>';
    [...participants]
        .sort((a, b) => a.razon.localeCompare(b.razon, 'es'))
        .forEach(p => {
            const opt = document.createElement('option');
            opt.value = String(p.id);
            opt.textContent = `${p.razon} (${p.tipo})`;
            sel.appendChild(opt);
        });
    if (prev && [...sel.options].some(o => o.value === prev)) sel.value = prev;
}

function openUserModal(id = null) {
    if (id != null && !canAccessAbmUsersModule()) {
        showCustomAlert('Su dominio/rol no tiene permiso para editar usuarios en el ABM.', 'Acción no disponible');
        return;
    }
    editingAbmUserId = id;
    editingAbmUserSnapshot = null;
    const form = document.getElementById('user-form');
    if (form) form.reset();
    populateUserEnteSelect();
    populateUserRoleSelect();
    const title = document.getElementById('user-modal-title');
    let currentUser = null;
    if (id != null) {
        currentUser = abmUsers.find(x => x.id === id);
        if (!currentUser) return;
        if (title) title.textContent = 'Editar Usuario';
        document.getElementById('nu-nombre').value = currentUser.nombre;
        document.getElementById('nu-apellido').value = currentUser.apellido;
        document.getElementById('nu-doc').value = currentUser.documento || '';
        document.getElementById('nu-telefono').value = currentUser.telefono;
        document.getElementById('nu-email').value = currentUser.email;
        document.getElementById('nu-ente-id').value = String(currentUser.enteId);
        populateUserRoleSelect(currentUser.rolId);
        if ((currentUser.estado || ABM_USER_STATES.PENDIENTE_AUTORIZACION) === ABM_USER_STATES.RECHAZADO) {
            editingAbmUserSnapshot = {
                nombre: currentUser.nombre,
                apellido: currentUser.apellido,
                telefono: currentUser.telefono,
                email: currentUser.email,
                enteId: currentUser.enteId,
                rolId: currentUser.rolId,
            };
        }
    } else {
        if (title) title.textContent = 'Nuevo Usuario';
    }
    syncUserModalMode(currentUser);
    openModal('user-modal');
}

function submitUserModal() {
    const payload = buildAbmUserFormPayload();
    if (!validateAbmUserRequiredFields(payload)) return;
    const ente = participants.find(p => p.id === payload.enteId);
    const rol = getAbmRoleById(payload.rolId);
    closeModal('user-modal');
    if (editingAbmUserId != null) {
        const idx = abmUsers.findIndex(x => x.id === editingAbmUserId);
        if (idx >= 0) abmUsers[idx] = { ...abmUsers[idx], ...payload };
        showCustomAlert(
            `Usuario "${payload.nombre} ${payload.apellido}" actualizado correctamente.`,
            'Usuario actualizado'
        );
    } else {
        abmUsers.push({
            id: nextAbmUserId++,
            ...payload,
            estado: ABM_USER_STATES.PENDIENTE_AUTORIZACION,
            bloqueado: false,
        });
        showCustomAlert(
            `Usuario "${payload.nombre} ${payload.apellido}" (${payload.email}) asociado a ${ente ? `${ente.razon} (${ente.tipo})` : 'ente'} con rol ${rol ? getAbmRoleLabel(rol.id) : '—'} guardado correctamente.`,
            'Usuario registrado'
        );
    }
    editingAbmUserId = null;
    editingAbmUserSnapshot = null;
    renderAbmUsers();
    switchAbmTab('usuarios');
}

function submitUserConfirmAuthorize() {
    if (editingAbmUserId == null) return;
    const u = abmUsers.find(x => x.id === editingAbmUserId);
    if (!u || (u.estado || ABM_USER_STATES.PENDIENTE_AUTORIZACION) !== ABM_USER_STATES.RECHAZADO) {
        showCustomAlert('Esta acción solo está disponible para usuarios rechazados.', 'Acción no disponible');
        return;
    }
    const payload = buildAbmUserFormPayload();
    if (!validateAbmUserRequiredFields(payload)) return;
    const targetDoc = normalizeDocumento(payload.documento || u.documento);
    const authorizerDoc = getLoggedAuthorizerDocumento();
    if (targetDoc && authorizerDoc && targetDoc === authorizerDoc) {
        showCustomAlert(
            'No es posible autorizar un usuario que comparte su misma Cédula de Identidad, póngase en contacto con su administrador',
            'Autorización no permitida'
        );
        return;
    }
    const changed = hasRequiredAbmUserChanges(editingAbmUserSnapshot, payload);
    const applyAuthorization = () => {
        const previousEstado = u.estado;
        const motivoRechazoAnterior = u.motivoRechazo || '';
        Object.assign(u, payload);
        u.estado = ABM_USER_STATES.AUTORIZADO;
        u.motivoRechazo = '';
        closeModal('user-modal');
        finalizeAbmUserAuthorization(u, {
            action: 'CONFIRMAR_AUTORIZAR_USUARIO',
            previousEstado,
            details: {
                camposModificados: changed,
                motivoRechazoAnterior,
            },
        });
        editingAbmUserId = null;
        editingAbmUserSnapshot = null;
        showCustomAlert(`Usuario "${u.nombre} ${u.apellido}" autorizado correctamente.`, 'Usuario autorizado');
    };
    if (!changed) {
        showCustomConfirm(
            'Se autoriza la activación del usuario, con la misma información provista anteriormente',
            applyAuthorization,
            'Confirmar autorización'
        );
        return;
    }
    applyAuthorization();
}

function renderRolePermissionsCheckboxes() {
    const container = document.getElementById('role-permissions-list');
    if (!container) return;
    container.innerHTML = ROLE_PERMISSION_CATALOG.map(section => {
        const groupsHtml = section.groups.map(group => {
            const itemsHtml = group.items.map(item => `
                <label class="checkbox-label permission-row">
                    <input type="checkbox" name="role-perm" value="${item.value}">
                    <span class="checkbox-custom"></span>
                    <span>${item.label}</span>
                </label>
            `).join('');
            return `
                <div class="permission-group">
                    <p class="permission-group-title">${group.title}</p>
                    ${itemsHtml}
                </div>
            `;
        }).join('');
        return `
            <div class="permission-screen-block">
                <p class="permission-screen-title">${section.screen}</p>
                ${groupsHtml}
            </div>
        `;
    }).join('');
}

function openRoleModal(id = null) {
    editingAbmRoleId = id;
    renderRolePermissionsCheckboxes();
    const form = document.getElementById('role-form');
    if (form) form.reset();
    document.querySelectorAll('#role-form input[name="role-perm"]').forEach(cb => { cb.checked = false; });
    const title = document.getElementById('role-modal-title');
    if (id != null) {
        const r = abmRoles.find(x => x.id === id);
        if (!r) return;
        if (title) title.textContent = 'Editar Rol';
        document.getElementById('role-dominio').value = r.dominio;
        populateRoleNombreSelect(r.dominio, r.rol);
        const permSet = new Set(r.permisos || []);
        document.querySelectorAll('#role-form input[name="role-perm"]').forEach(cb => {
            cb.checked = permSet.has(cb.value);
        });
    } else {
        if (title) title.textContent = 'Nuevo Rol';
        populateRoleNombreSelect('');
    }
    openModal('role-modal');
}

function submitRoleModal() {
    const dominio = document.getElementById('role-dominio').value;
    const rol = document.getElementById('role-nombre-rol').value;
    if (!dominio || !rol) {
        showCustomAlert('Seleccione dominio y rol.', 'Campos incompletos');
        return;
    }
    const rolesPermitidos = ABM_ROLES_BY_DOMINIO[dominio] || [];
    if (!rolesPermitidos.includes(rol)) {
        showCustomAlert(`El rol "${rol}" no está permitido para el dominio ${dominio}.`, 'Rol inválido');
        return;
    }
    const perms = [...document.querySelectorAll('#role-form input[name="role-perm"]:checked')].map(c => c.value);
    const payload = { dominio, rol, permisos: perms };
    closeModal('role-modal');
    if (editingAbmRoleId != null) {
        const idx = abmRoles.findIndex(x => x.id === editingAbmRoleId);
        if (idx >= 0) abmRoles[idx] = { ...abmRoles[idx], ...payload };
        showCustomAlert(`Rol "${rol}" en dominio "${dominio}" actualizado (${perms.length} permiso(s)).`, 'Rol actualizado');
    } else {
        abmRoles.push({ id: nextAbmRoleId++, ...payload });
        showCustomAlert(
            `Rol "${rol}" en dominio "${dominio}" con ${perms.length} permiso(s) asignado(s) guardado correctamente.`,
            'Rol registrado'
        );
    }
    editingAbmRoleId = null;
    populateAbmRolesFilterSelect();
    renderAbmRoles();
    switchAbmTab('roles');
}

document.getElementById('role-dominio')?.addEventListener('change', syncRoleOptionsFromDominio);


// ====== ABM - Eliminación con confirmación ======

function deleteParticipant(id) {
    const p = participants.find(x => x.id === id);
    if (!p) return;
    showCustomConfirm(
        `¿Confirma eliminar el ente "${p.razon}" (${p.tipo})? Esta acción no se puede deshacer.`,
        () => {
            participants = participants.filter(x => x.id !== id);
            renderParticipants();
            renderAbmUsers();
            populateOperatingEntitySelect();
            renderOperatingEntityPanel();
            showCustomAlert(`El ente "${p.razon}" fue eliminado.`, 'Ente eliminado');
        },
        'Eliminar Ente'
    );
}

function deleteAbmUser(id) {
    const u = abmUsers.find(x => x.id === id);
    if (!u) return;
    showCustomConfirm(
        `¿Confirma eliminar al usuario "${u.nombre} ${u.apellido}" (${u.email})? Esta acción no se puede deshacer.`,
        () => {
            abmUsers = abmUsers.filter(x => x.id !== id);
            renderAbmUsers();
            showCustomAlert(`El usuario "${u.nombre} ${u.apellido}" fue eliminado.`, 'Usuario eliminado');
        },
        'Eliminar Usuario'
    );
}

function deleteAbmRole(id) {
    const r = abmRoles.find(x => x.id === id);
    if (!r) return;
    showCustomConfirm(
        `¿Confirma eliminar el rol "${r.rol}" del dominio "${r.dominio}"? Esta acción no se puede deshacer.`,
        () => {
            abmRoles = abmRoles.filter(x => x.id !== id);
            renderAbmRoles();
            showCustomAlert(`El rol "${r.rol}" fue eliminado.`, 'Rol eliminado');
        },
        'Eliminar Rol'
    );
}


// ====== Carga masiva de facturas (.xls / .xlsx / .csv) ======

const BULK_INVOICE_HEADERS = [
    'Nro. Factura',
    'Empresa (EGP)',
    'Proveedor',
    'Fecha emisión',
    'Fecha vencimiento',
    'Fecha de pago',
    'Moneda',
    'Monto',
    'Estado inicial'
];

// Genera y descarga un .xlsx con la fila de cabeceras estandarizadas para que
// el usuario complete el detalle de las facturas a cargar masivamente.
function downloadInvoiceTemplate() {
    if (typeof XLSX === 'undefined') {
        showCustomAlert('No se pudo generar el template (librería de Excel no disponible).', 'Descarga fallida');
        return;
    }
    const sampleRow = [
        '001-001-0001234',
        'Retail S.A.',
        'Tech Solutions S.A.',
        '2026-05-01',
        '2026-06-30',
        '2026-06-30',
        'GS',
        15000000,
        'Pendiente'
    ];
    const ws = XLSX.utils.aoa_to_sheet([BULK_INVOICE_HEADERS, sampleRow]);
    // Ancho de columnas legible
    ws['!cols'] = [
        { wch: 20 }, { wch: 22 }, { wch: 22 }, { wch: 16 },
        { wch: 18 }, { wch: 16 }, { wch: 10 }, { wch: 16 }, { wch: 18 }
    ];
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Facturas');
    XLSX.writeFile(wb, 'template-facturas.xlsx');
}

function triggerBulkInvoiceUpload() {
    const input = document.getElementById('bulk-invoice-file-input');
    if (!input) return;
    input.value = '';
    input.click();
}

async function handleBulkInvoiceFile(input) {
    const file = input && input.files && input.files[0];
    if (!file) return;
    if (typeof XLSX === 'undefined') {
        showCustomAlert('No se pudo procesar el archivo (librería de Excel no disponible).', 'Carga fallida');
        return;
    }

    let rows;
    try {
        const buffer = await file.arrayBuffer();
        let wb;
        const isCsv = /\.csv$/i.test(file.name);
        if (isCsv) {
            // Decodificamos explícitamente como UTF-8 para preservar acentos en cabeceras.
            const text = new TextDecoder('utf-8').decode(buffer);
            wb = XLSX.read(text, { type: 'string', cellDates: true });
        } else {
            wb = XLSX.read(buffer, { cellDates: true });
        }
        const ws = wb.Sheets[wb.SheetNames[0]];
        if (!ws) throw new Error('El archivo no contiene hojas');
        // defval garantiza claves vacías como '' y no como undefined
        rows = XLSX.utils.sheet_to_json(ws, { defval: '', raw: false });
    } catch (err) {
        showCustomAlert(`No se pudo leer el archivo: ${err.message || err}`, 'Carga fallida');
        return;
    } finally {
        input.value = '';
    }

    const result = processBulkInvoiceRows(rows);
    showBulkUploadResult(result);

    if (result.loaded.length > 0) {
        renderCurrentConfirmingFilters();
    }
}

// Procesa un array de objetos (uno por fila del Excel/CSV) y devuelve
// { loaded: [...ids], failedIncomplete: [...], failedCurrency: [...] }.
function processBulkInvoiceRows(rows) {
    const loaded = [];
    const failedIncomplete = [];
    const failedCurrency = [];

    rows.forEach((raw, idx) => {
        const row = normalizeBulkRow(raw);
        const rowLabel = row.id || `(fila ${idx + 2})`;

        const required = ['id', 'egp', 'prov', 'emision', 'vto', 'moneda', 'monto'];
        const missing = required.some(k => row[k] === '' || row[k] == null);
        if (missing || !Number.isFinite(row.monto) || row.monto <= 0) {
            failedIncomplete.push(rowLabel);
            return;
        }

        // Validar moneda contra las habilitadas para el ente (si el ente existe en participants)
        const egpConfig = participants.find(p => p.razon === row.egp && p.tipo === 'EGP');
        if (egpConfig && Array.isArray(egpConfig.monedas) && egpConfig.monedas.length > 0
            && !egpConfig.monedas.includes(row.moneda)) {
            failedCurrency.push({
                id: rowLabel,
                moneda: row.moneda,
                ente: egpConfig.razon,
                permitidas: egpConfig.monedas.join(', ')
            });
            return;
        }

        const fechaPago = row.fechaPago || row.vto;
        const estado = resolveInitialInvoiceState(row.estado, fechaPago);
        invoices.unshift({
            id: row.id,
            egp: row.egp,
            prov: row.prov,
            emision: row.emision,
            vto: row.vto,
            fechaPago,
            moneda: row.moneda,
            monto: row.monto,
            estado
        });
        loaded.push(row.id);
    });

    return { loaded, failedIncomplete, failedCurrency };
}

// Normaliza una fila cualquiera (claves variables, mayúsculas, espacios) hacia
// un objeto con campos estándar.
function normalizeBulkRow(raw) {
    const lookup = {};
    Object.keys(raw || {}).forEach(k => {
        lookup[normalizeKey(k)] = raw[k];
    });

    const get = (...keys) => {
        for (const k of keys) {
            const v = lookup[normalizeKey(k)];
            if (v !== undefined && v !== '') return v;
        }
        return '';
    };

    const id = String(get('Nro. Factura', 'Nro Factura', 'NroFactura', 'Numero Factura', 'Número Factura') || '').trim();
    const egp = String(get('Empresa (EGP)', 'Empresa', 'EGP') || '').trim();
    const prov = String(get('Proveedor') || '').trim();
    const emision = parseBulkDate(get('Fecha emisión', 'Fecha emision', 'Emisión', 'Emision'));
    const vto = parseBulkDate(get('Fecha vencimiento', 'Vencimiento'));
    let fechaPago = parseBulkDate(get('Fecha de pago', 'Fecha pago', 'Fecha Pago'));
    if (!fechaPago) fechaPago = vto;
    let moneda = String(get('Moneda') || '').trim().toUpperCase();
    if (moneda === 'GUARANIES' || moneda === 'GUARANÍES' || moneda === 'PYG') moneda = 'GS';
    if (moneda === 'DOLAR' || moneda === 'DÓLAR' || moneda === 'DOLARES' || moneda === 'DÓLARES') moneda = 'USD';
    const montoRaw = get('Monto');
    const monto = parseBulkNumber(montoRaw);

    let estado = String(get('Estado inicial', 'Estado') || '').trim();
    estado = normalizeBulkEstado(estado);

    return { id, egp, prov, emision, vto, fechaPago, moneda, monto, estado };
}

function normalizeKey(s) {
    return String(s || '')
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]/g, '');
}

function parseBulkNumber(v) {
    if (typeof v === 'number') return v;
    if (v == null || v === '') return NaN;
    const s = String(v).trim().replace(/\s/g, '');
    // Acepta "1.500.000,50" (es) o "1,500,000.50" (en) o "1500000.50"
    const hasComma = s.includes(',');
    const hasDot = s.includes('.');
    let cleaned = s;
    if (hasComma && hasDot) {
        // Asume el último separador como decimal
        if (s.lastIndexOf(',') > s.lastIndexOf('.')) {
            cleaned = s.replace(/\./g, '').replace(',', '.');
        } else {
            cleaned = s.replace(/,/g, '');
        }
    } else if (hasComma) {
        cleaned = s.replace(/\./g, '').replace(',', '.');
    } else {
        cleaned = s.replace(/,/g, '');
    }
    const n = parseFloat(cleaned);
    return Number.isFinite(n) ? n : NaN;
}

function parseBulkDate(v) {
    if (v == null || v === '') return '';
    if (v instanceof Date && !isNaN(v.getTime())) {
        return formatDateISO(v);
    }
    const s = String(v).trim();
    const fromDisplay = parseDDMMYYYYToISO(s);
    if (fromDisplay) return fromDisplay;
    // ISO YYYY-MM-DD o YYYY/MM/DD
    let m = s.match(/^(\d{4})[-/](\d{1,2})[-/](\d{1,2})$/);
    if (m) return `${m[1]}-${pad2(m[2])}-${pad2(m[3])}`;
    // DD/MM/YYYY o DD-MM-YYYY (formato es-PY)
    m = s.match(/^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})$/);
    if (m) return `${m[3]}-${pad2(m[2])}-${pad2(m[1])}`;
    // M/D/YY o MM/DD/YY (formato corto que produce SheetJS al exportar CSV)
    m = s.match(/^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{2})$/);
    if (m) {
        const yyyy = `20${m[3]}`;
        return `${yyyy}-${pad2(m[1])}-${pad2(m[2])}`;
    }
    // Excel serial number como fallback (ej. 45810)
    if (/^\d+(\.\d+)?$/.test(s)) {
        const serial = parseFloat(s);
        const epoch = new Date(Date.UTC(1899, 11, 30));
        const d = new Date(epoch.getTime() + serial * 86400000);
        if (!isNaN(d.getTime())) return formatDateISO(d);
    }
    return '';
}

function formatDateISO(d) {
    return `${d.getUTCFullYear()}-${pad2(d.getUTCMonth() + 1)}-${pad2(d.getUTCDate())}`;
}

// Mapea estados desde la planilla a los valores internos válidos.
// La carga masiva sólo permite los 3 estados de entrada de la máquina de estados:
// Pendiente / Habilitada / Bloqueada. Cualquier otro texto (o vacío) se asume "Pendiente"
// (arribo desde "API ERP recibe facturas").
function normalizeBulkEstado(estadoTexto) {
    const k = normalizeKey(estadoTexto);
    if (k === 'habilitada') return INVOICE_STATES.HABILITADA;
    if (k === 'bloqueada') return INVOICE_STATES.BLOQUEADA;
    return INVOICE_STATES.PENDIENTE;
}

// Renderiza el modal de resultado del bulk upload.
// Cargadas: tope de visualización 15 + "y N más".
// Falladas (por motivo): se muestran todas, con scroll si son muchas.
function showBulkUploadResult(result) {
    const body = document.getElementById('bulk-upload-result-body');
    const title = document.getElementById('bulk-upload-result-title');
    if (!body || !title) return;

    const totalProcessed = result.loaded.length + result.failedIncomplete.length + result.failedCurrency.length;
    const allOk = result.failedIncomplete.length === 0 && result.failedCurrency.length === 0;

    title.textContent = result.loaded.length > 0
        ? (allOk ? 'Carga masiva exitosa' : 'Carga masiva con observaciones')
        : 'Carga masiva sin facturas registradas';

    const sections = [];
    sections.push(`
        <p class="bulk-result-summary">Se procesaron <strong>${totalProcessed}</strong> filas:
            <span class="bulk-result-pill bulk-result-pill--ok">${result.loaded.length} cargadas</span>
            ${result.failedIncomplete.length > 0 ? `<span class="bulk-result-pill bulk-result-pill--warn">${result.failedIncomplete.length} incompletas</span>` : ''}
            ${result.failedCurrency.length > 0 ? `<span class="bulk-result-pill bulk-result-pill--warn">${result.failedCurrency.length} con moneda inválida</span>` : ''}
        </p>
    `);

    if (result.loaded.length > 0) {
        const cap = 15;
        const visible = result.loaded.slice(0, cap);
        const extra = result.loaded.length - cap;
        const items = visible.map(id => `<li>${escapeHtml(id)}</li>`).join('');
        const ellipsis = extra > 0 ? `<li class="bulk-result-ellipsis">… y ${extra} factura${extra === 1 ? '' : 's'} más</li>` : '';
        sections.push(`
            <div class="bulk-result-section bulk-result-section--ok">
                <p class="bulk-result-section-title"><i class="ph ph-check-circle"></i> Facturas cargadas (${result.loaded.length})</p>
                <ul class="bulk-result-list">${items}${ellipsis}</ul>
            </div>
        `);
    }

    if (result.failedIncomplete.length > 0) {
        const items = result.failedIncomplete.map(id => `<li>${escapeHtml(id)}</li>`).join('');
        sections.push(`
            <div class="bulk-result-section bulk-result-section--err">
                <p class="bulk-result-section-title"><i class="ph ph-warning-circle"></i> No cargadas — información incompleta (${result.failedIncomplete.length})</p>
                <ul class="bulk-result-list bulk-result-list--scroll">${items}</ul>
            </div>
        `);
    }

    if (result.failedCurrency.length > 0) {
        const items = result.failedCurrency.map(f =>
            `<li><strong>${escapeHtml(f.id)}</strong> — moneda <code>${escapeHtml(f.moneda || '—')}</code> no habilitada para ${escapeHtml(f.ente)} (permitidas: ${escapeHtml(f.permitidas)})</li>`
        ).join('');
        sections.push(`
            <div class="bulk-result-section bulk-result-section--err">
                <p class="bulk-result-section-title"><i class="ph ph-currency-circle-dollar"></i> No cargadas — moneda no habilitada por el ente (${result.failedCurrency.length})</p>
                <ul class="bulk-result-list bulk-result-list--scroll">${items}</ul>
            </div>
        `);
    }

    if (totalProcessed === 0) {
        sections.push('<p class="bulk-result-empty">El archivo no contiene filas para procesar.</p>');
    }

    body.innerHTML = sections.join('');

    // Cierra el modal de carga (si está abierto) para no taparle el resultado al usuario
    const newInvoiceModal = document.getElementById('new-invoice-modal');
    if (newInvoiceModal && newInvoiceModal.classList.contains('active')) {
        closeModal('new-invoice-modal');
    }
    openModal('bulk-upload-result-modal');
}

function escapeHtml(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, ch => ({
        '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    }[ch]));
}

document.getElementById('ni-vto')?.addEventListener('change', syncNewInvoiceFechaPagoFromVto);
document.getElementById('ni-fecha-pago')?.addEventListener('input', () => {
    newInvoiceFechaPagoTouched = true;
});
