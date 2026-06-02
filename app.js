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
    { id: '001-001-0009001', egp: 'Retail S.A.', prov: 'Tech Solutions S.A.', emision: '2026-05-18', vto: '2026-06-05', moneda: 'GS', monto: 4500000, estado: INVOICE_STATES.NO_ELEGIBLE },
    { id: '001-002-0009002', egp: 'Tigo Paraguay', prov: 'Logistica Integral', emision: '2026-05-17', vto: '2026-06-08', moneda: 'GS', monto: 2800000, estado: INVOICE_STATES.NO_ELEGIBLE },
];
invoices.forEach(inv => {
    if (!inv.fechaPago) inv.fechaPago = inv.vto;
});

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

// Participantes (EGPs y Proveedores)
let participants = [
    { id: 1, tipo: 'EGP', ruc: '80012345-6', razon: 'Retail S.A.', email: 'admin@retail.com.py', telefono: '+595 21 123456', monedas: ['GS', 'USD'], lineaCredito: 500000000, tasaInteres: 12, tasaComision: 1.5, iva: 10, condiciones: 'Pago a 30/60/90 días', clienteAtlas: true, desembolsoAuto: true },
    { id: 2, tipo: 'EGP', ruc: '80054321-7', razon: 'Tigo Paraguay', email: 'finanzas@tigo.com.py', telefono: '+595 21 654321', monedas: ['GS'], lineaCredito: 2000000000, tasaInteres: 11, tasaComision: 1.2, iva: 10, condiciones: '', clienteAtlas: false, desembolsoAuto: false },
    { id: 3, tipo: 'EGP', ruc: '80067890-1', razon: 'Cervepar', email: 'cuentas@cervepar.com.py', telefono: '+595 21 789012', monedas: ['GS', 'USD'], lineaCredito: 800000000, tasaInteres: 13, tasaComision: 1.8, iva: 10, condiciones: 'Límite USD 50,000 por operación', clienteAtlas: true, desembolsoAuto: true },
    { id: 4, tipo: 'Proveedor', ruc: '80099999-2', razon: 'Tech Solutions S.A.', email: 'pagos@techsolutions.com.py', telefono: '+595 21 999888', monedas: ['USD'], lineaCredito: 0, tasaInteres: 12, tasaComision: 1.5, iva: 10, condiciones: '', clienteAtlas: false, desembolsoAuto: false },
    { id: 5, tipo: 'Proveedor', ruc: '80011111-3', razon: 'Logistica Integral', email: 'cobranzas@logistica.com.py', telefono: '+595 21 111222', monedas: ['GS'], lineaCredito: 0, tasaInteres: 12, tasaComision: 1.5, iva: 10, condiciones: '', clienteAtlas: true, desembolsoAuto: false },
    { id: 6, tipo: 'Proveedor', ruc: '80022222-4', razon: 'Limpieza Total SRL', email: 'admin@limpiezatotal.com.py', telefono: '+595 21 222333', monedas: ['GS'], lineaCredito: 0, tasaInteres: 12, tasaComision: 1.5, iva: 10, condiciones: '', clienteAtlas: false, desembolsoAuto: false },
    { id: 7, tipo: 'Proveedor', ruc: '80033333-5', razon: 'Servicios IT', email: 'contacto@serviciosit.com.py', telefono: '+595 21 333444', monedas: ['GS', 'USD'], lineaCredito: 0, tasaInteres: 12, tasaComision: 1.5, iva: 10, condiciones: '', clienteAtlas: true, desembolsoAuto: false },
    { id: 8, tipo: 'Proveedor', ruc: '80044444-6', razon: 'Agencia Creativa', email: 'hola@agenciacreativa.com.py', telefono: '+595 21 444555', monedas: ['USD'], lineaCredito: 0, tasaInteres: 12, tasaComision: 1.5, iva: 10, condiciones: '', clienteAtlas: false, desembolsoAuto: false },
];

let nextParticipantId = 9;
let editingParticipantId = null;

let abmUsers = [
    { id: 1, nombre: 'Ana', apellido: 'Gómez', email: 'a.gomez@retail.com.py', telefono: '+595 981 111222', enteId: 1 },
    { id: 2, nombre: 'Carlos', apellido: 'Vera', email: 'c.vera@tigo.com.py', telefono: '+595 981 333444', enteId: 2 },
    { id: 3, nombre: 'Laura', apellido: 'Benítez', email: 'l.benitez@techsolutions.com.py', telefono: '+595 985 555666', enteId: 4 },
];
let nextAbmUserId = 4;
let editingAbmUserId = null;

let abmRoles = [
    { id: 1, dominio: 'Banco', rol: 'ADMIN', permisos: ['Ver ABM', 'Editar ABM', 'Ver Confirming', 'Editar Confirming', 'Ver Facturas', 'Adelantar Facturas', 'Aprobar Desembolsos', 'Revertir Adelantos'] },
    { id: 2, dominio: 'EGP', rol: 'Supervisor', permisos: ['Ver Confirming', 'Ver Facturas', 'Adelantar Facturas', 'Ver Info Financiera Ente'] },
    { id: 3, dominio: 'Proveedor', rol: 'Operador', permisos: ['Ver Confirming', 'Ver Facturas'] },
];
let nextAbmRoleId = 4;
let editingAbmRoleId = null;

// Notificaciones del sistema (disparadas por avance en la máquina de estados)
let abmNotifications = [
    { id: 1, nombre: 'Factura cargada — Pendiente', estadoDisparador: INVOICE_STATES.PENDIENTE, dominio: 'EGP', rol: 'Supervisor', emails: 'supervisor@retail.com.py, a.gomez@retail.com.py', activa: true, mensaje: 'Factura en estado Pendiente: lista para Habilitar o Bloquear por el aprobador EGP.' },
    { id: 2, nombre: 'Solicitud adelanto — Aprobación EGP', estadoDisparador: INVOICE_STATES.PENDIENTE_APROBACION_EGP, dominio: 'EGP', rol: 'Supervisor', emails: 'supervisor@retail.com.py', activa: true, mensaje: 'Factura pendiente de aprobación EGP del adelanto solicitado por el proveedor.' },
    { id: 3, nombre: 'Desembolso en curso', estadoDisparador: INVOICE_STATES.PENDIENTE_DESEMBOLSO, dominio: 'Banco', rol: 'ADMIN', emails: 'operaciones@bancoatlas.com.py', activa: true, mensaje: 'Factura en Pendiente de desembolso: CORE BANKING procesando el pago.' },
    { id: 4, nombre: 'Aprobación banco manual (MVP2)', estadoDisparador: INVOICE_STATES.PENDIENTE_APROBACION_BANCO, dominio: 'Banco', rol: 'ADMIN', emails: 'operaciones@bancoatlas.com.py', activa: true, mensaje: 'EGP sin desembolso automático: requiere aprobación bancaria manual.' },
    { id: 5, nombre: 'Factura financiada', estadoDisparador: INVOICE_STATES.FINANCIADA, dominio: 'Proveedor', rol: 'Operador', emails: 'pagos@techsolutions.com.py', activa: true, mensaje: 'Adelanto acreditado: factura en estado Financiada.' },
    { id: 6, nombre: 'Factura no elegible', estadoDisparador: INVOICE_STATES.NO_ELEGIBLE, dominio: 'EGP', rol: 'Supervisor', emails: 'finanzas@tigo.com.py', activa: true, mensaje: 'Factura marcada NO ELEGIBLE (fecha de pago menor a 30 días).' },
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
        }
    });
});

document.getElementById('toggle-sidebar')?.addEventListener('click', () => {
    document.getElementById('app-view')?.classList.toggle('sidebar-mobile-open');
});

document.getElementById('operating-entity-select')?.addEventListener('change', () => {
    const status = document.getElementById('filter-status')?.value || 'all';
    const query = document.getElementById('search-invoice')?.value || '';
    renderInvoices(status, query);
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

function openModal(id) { document.getElementById(id).classList.add('active'); }
function closeModal(id) { document.getElementById(id).classList.remove('active'); }

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

function renderParticipants() {
    const tbody = document.getElementById('participants-tbody');
    if (!tbody) return;
    tbody.innerHTML = '';

    participants.forEach(p => {
        const monedasHtml = p.monedas.map(m =>
            `<span class="badge-moneda ${m.toLowerCase()}">${m}</span>`
        ).join('');

        const tipoBadge = p.tipo === 'EGP'
            ? `<span class="badge-egp">EGP</span>`
            : `<span class="badge-proveedor">Proveedor</span>`;

        const atlasIcon = p.clienteAtlas
            ? `<i class="ph ph-check-circle text-success" style="font-size:18px;"></i>`
            : `<i class="ph ph-x-circle" style="font-size:18px;color:#d1d5db;"></i>`;

        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${tipoBadge}</td>
            <td>${p.ruc}</td>
            <td><strong>${p.razon}</strong></td>
            <td style="font-size:13px;color:#6b7280;">${p.email}</td>
            <td>${monedasHtml}</td>
            <td style="font-weight:600;">${p.lineaCredito > 0 ? formatCurrency(p.lineaCredito, 'GS') : '—'}</td>
            <td>${p.tasaInteres}%</td>
            <td style="text-align:center;">${atlasIcon}</td>
            <td class="abm-actions-cell">
                <button type="button" class="btn-icon-action btn-icon-action--edit" onclick="openAbmModal(${p.id})" title="Editar ente" aria-label="Editar ente">
                    <i class="ph ph-pencil-simple"></i>
                </button>
                <button type="button" class="btn-icon-action btn-icon-action--delete" onclick="deleteParticipant(${p.id})" title="Eliminar ente" aria-label="Eliminar ente">
                    <i class="ph ph-x"></i>
                </button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function switchAbmTab(tabKey) {
    const valid = ['entes', 'usuarios', 'roles', 'notificaciones'];
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
    closeAbmAddMenu();
}

function renderAbmUsers() {
    const tbody = document.getElementById('abm-users-tbody');
    if (!tbody) return;
    tbody.innerHTML = '';
    abmUsers.forEach(u => {
        const ente = participants.find(p => p.id === u.enteId);
        const enteRazon = ente ? ente.razon : '—';
        const tipoBadge = !ente ? '—' : (ente.tipo === 'EGP'
            ? '<span class="badge-egp">EGP</span>'
            : '<span class="badge-proveedor">Proveedor</span>');
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${u.nombre}</td>
            <td>${u.apellido}</td>
            <td style="font-size:13px;color:#6b7280;">${u.email}</td>
            <td>${u.telefono}</td>
            <td><strong>${enteRazon}</strong></td>
            <td>${tipoBadge}</td>
            <td class="abm-actions-cell">
                <button type="button" class="btn-icon-action btn-icon-action--edit" onclick="openUserModal(${u.id})" title="Editar usuario" aria-label="Editar usuario">
                    <i class="ph ph-pencil-simple"></i>
                </button>
                <button type="button" class="btn-icon-action btn-icon-action--delete" onclick="deleteAbmUser(${u.id})" title="Eliminar usuario" aria-label="Eliminar usuario">
                    <i class="ph ph-x"></i>
                </button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function renderAbmRoles() {
    const tbody = document.getElementById('abm-roles-tbody');
    if (!tbody) return;
    tbody.innerHTML = '';
    abmRoles.forEach(r => {
        const n = r.permisos.length;
        const summary = n === 0
            ? 'Sin permisos'
            : `${n} — ${r.permisos.slice(0, 2).join(', ')}${n > 2 ? '…' : ''}`;
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${r.dominio}</td>
            <td><strong>${r.rol}</strong></td>
            <td style="font-size:12px;color:#6b7280;max-width:360px;">${summary}</td>
            <td class="abm-actions-cell">
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
}

function renderAbmNotifications() {
    const tbody = document.getElementById('abm-notifications-tbody');
    if (!tbody) return;
    tbody.innerHTML = '';
    abmNotifications.forEach(n => {
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
    const payload = { nombre, estadoDisparador, dominio, rol, emails, mensaje, activa };
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

document.querySelectorAll('.abm-tab').forEach(btn => {
    btn.addEventListener('click', () => switchAbmTab(btn.dataset.abmTab));
});

document.querySelectorAll('.confirming-invoice-tab').forEach(btn => {
    btn.addEventListener('click', () => switchInvoiceViewTab(btn.dataset.invoiceTab));
});

function openAbmModal(participantId = null) {
    switchAbmTab('entes');
    editingParticipantId = participantId;
    const form = document.getElementById('abm-form');
    form.reset();
    document.getElementById('abm-file-list').innerHTML = '';

    if (participantId) {
        // Modo edición
        const p = participants.find(x => x.id === participantId);
        if (!p) return;
        document.getElementById('abm-modal-title').textContent = 'Editar Ente';
        document.getElementById('abm-tipo').value = p.tipo;
        document.getElementById('abm-ruc').value = p.ruc;
        document.getElementById('abm-razon').value = p.razon;
        document.getElementById('abm-email').value = p.email;
        document.getElementById('abm-telefono').value = p.telefono;
        document.getElementById('abm-moneda-gs').checked = p.monedas.includes('GS');
        document.getElementById('abm-moneda-usd').checked = p.monedas.includes('USD');
        document.getElementById('abm-linea').value = p.lineaCredito || '';
        document.getElementById('abm-interes').value = p.tasaInteres;
        document.getElementById('abm-comision').value = p.tasaComision;
        document.getElementById('abm-iva').value = p.iva;
        document.getElementById('abm-condiciones').value = p.condiciones;
        document.getElementById('abm-cliente-atlas').checked = p.clienteAtlas;
        document.getElementById('abm-desembolso-auto').checked = p.desembolsoAuto;
    } else {
        // Modo alta
        document.getElementById('abm-modal-title').textContent = 'Nuevo Ente';
        // Defaults
        document.getElementById('abm-moneda-gs').checked = true;
        document.getElementById('abm-interes').value = 12;
        document.getElementById('abm-comision').value = 1.5;
        document.getElementById('abm-iva').value = 10;
    }

    openModal('abm-modal');
}

function submitParticipant() {
    const tipo = document.getElementById('abm-tipo').value;
    const ruc = document.getElementById('abm-ruc').value.trim();
    const razon = document.getElementById('abm-razon').value.trim();
    const email = document.getElementById('abm-email').value.trim();

    if (!tipo || !ruc || !razon || !email) {
        showCustomAlert('Por favor complete los campos obligatorios: Tipo, RUC, Razón Social y Email.', 'Campos Incompletos');
        return;
    }

    const monedas = [];
    if (document.getElementById('abm-moneda-gs').checked) monedas.push('GS');
    if (document.getElementById('abm-moneda-usd').checked) monedas.push('USD');
    if (monedas.length === 0) {
        showCustomAlert('Debe seleccionar al menos una moneda habilitada.', 'Campos Incompletos');
        return;
    }

    const data = {
        tipo,
        ruc,
        razon,
        email,
        telefono: document.getElementById('abm-telefono').value.trim(),
        monedas,
        lineaCredito: parseFloat(document.getElementById('abm-linea').value) || 0,
        tasaInteres: parseFloat(document.getElementById('abm-interes').value) || 12,
        tasaComision: parseFloat(document.getElementById('abm-comision').value) || 1.5,
        iva: parseFloat(document.getElementById('abm-iva').value) || 10,
        condiciones: document.getElementById('abm-condiciones').value.trim(),
        clienteAtlas: document.getElementById('abm-cliente-atlas').checked,
        desembolsoAuto: document.getElementById('abm-desembolso-auto').checked,
    };

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

function renderInvoices(filter = 'all', searchQuery = '') {
    const tbody = document.getElementById('invoices-tbody');
    tbody.innerHTML = '';

    const enteRazon = getSelectedOperatingEntityRazon();
    const bulkSimActive = isBulkSimulateActive();

    const filtered = invoices.filter(inv => {
        const matchTab = invoiceBelongsToCurrentViewTab(inv);
        const matchStatus = filter === 'all' || inv.estado === filter;
        const matchSearch = inv.id.includes(searchQuery) ||
                            inv.egp.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            inv.prov.toLowerCase().includes(searchQuery.toLowerCase());
        const matchEnte = !enteRazon || inv.egp === enteRazon || inv.prov === enteRazon;
        return matchTab && matchStatus && matchSearch && matchEnte;
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
                actionButtons = rowSimDisabled
                    ? `<button type="button" class="btn-primary btn-sm is-disabled" aria-disabled="true" title="Use Simular de la cabecera para selección múltiple"><i class="ph ph-calculator"></i> Simular</button>`
                    : `<button class="btn-primary btn-sm" onclick="openSimulation('${inv.id}')"><i class="ph ph-calculator"></i> Simular</button>`;
                break;
            case INVOICE_STATES.PENDIENTE_APROBACION_EGP:
                actionButtons = `<button class="btn-primary btn-sm" onclick="openEgpApprovalModal('${inv.id}')"><i class="ph ph-buildings"></i> Aprobar EGP</button>`;
                break;
            case INVOICE_STATES.PENDIENTE_APROBACION_BANCO:
                actionButtons = `<button class="btn-primary btn-sm btn-aprobar" onclick="openBankApprovalModal('${inv.id}')"><i class="ph ph-bank"></i> Aprobar Banco</button>`;
                break;
            case INVOICE_STATES.PENDIENTE:
                actionButtons = `<span class="row-action-hint"><i class="ph ph-hourglass-medium"></i> Use Habilitar / Bloquear</span>`;
                break;
            case INVOICE_STATES.PENDIENTE_DESEMBOLSO:
                actionButtons = `<span class="row-action-hint row-action-hint--processing"><i class="ph ph-spinner ph-spin"></i> CORE BANKING desembolsando…</span>`;
                break;
            case INVOICE_STATES.BLOQUEADA:
                actionButtons = `<span class="row-action-hint"><i class="ph ph-lock"></i> No operable</span>`;
                break;
            case INVOICE_STATES.VENCIDA:
                actionButtons = `<span class="row-action-hint row-action-hint--danger"><i class="ph ph-clock-counter-clockwise"></i> Vencida</span>`;
                break;
            case INVOICE_STATES.NO_ELEGIBLE:
                actionButtons = `<button type="button" class="btn-primary btn-sm" onclick="openEditFechaPagoModal('${inv.id}')"><i class="ph ph-calendar"></i> Editar fecha de pago</button>`;
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
            <td>${inv.emision}</td>
            <td>${inv.vto}</td>
            <td>${getInvoiceFechaPago(inv)}</td>
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
    const filter = document.getElementById('filter-status')?.value || 'all';
    const query = document.getElementById('search-invoice')?.value || '';
    const enteRazon = getSelectedOperatingEntityRazon();
    return invoices.filter(inv => {
        const matchTab = invoiceBelongsToCurrentViewTab(inv);
        const matchStatus = filter === 'all' || inv.estado === filter;
        const matchSearch = inv.id.includes(query) ||
                            inv.egp.toLowerCase().includes(query.toLowerCase()) ||
                            inv.prov.toLowerCase().includes(query.toLowerCase());
        const matchEnte = !enteRazon || inv.egp === enteRazon || inv.prov === enteRazon;
        return matchTab && matchStatus && matchSearch && matchEnte;
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

document.getElementById('filter-status').addEventListener('change', (e) => {
    const query = document.getElementById('search-invoice').value;
    renderInvoices(e.target.value, query);
});

document.getElementById('search-invoice').addEventListener('input', (e) => {
    const status = document.getElementById('filter-status').value;
    renderInvoices(status, e.target.value);
});


// SIMULAR ESCANEO QR
function simulateScan() {
    const overlay = document.getElementById('scanner-overlay');
    overlay.classList.remove('hidden');

    setTimeout(() => {
        document.getElementById('ni-nro').value = '001-002-' + Math.floor(1000000 + Math.random() * 9000000);
        document.getElementById('ni-egp').value = 'Retail S.A.';
        document.getElementById('ni-prov').value = 'Logistica Integral';

        const today = new Date();
        document.getElementById('ni-emision').value = today.toISOString().split('T')[0];

        const vto = new Date(today);
        vto.setDate(vto.getDate() + 45);
        document.getElementById('ni-vto').value = vto.toISOString().split('T')[0];
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
    const vto = document.getElementById('ni-vto')?.value;
    const fp = document.getElementById('ni-fecha-pago');
    if (fp && vto) fp.value = vto;
}

// Nueva Factura
function submitNewInvoice() {
    const nro = document.getElementById('ni-nro').value;
    const egp = document.getElementById('ni-egp').value;
    const prov = document.getElementById('ni-prov').value;
    const emision = document.getElementById('ni-emision').value;
    const vto = document.getElementById('ni-vto').value;
    const fechaPago = document.getElementById('ni-fecha-pago').value || vto;
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
    if (!inv || inv.estado !== INVOICE_STATES.NO_ELEGIBLE) return;
    editingFechaPagoInvoiceId = invoiceId;
    document.getElementById('efp-invoice-id').textContent = inv.id;
    document.getElementById('efp-fecha-pago').value = getInvoiceFechaPago(inv);
    openModal('edit-fecha-pago-modal');
}

function submitEditFechaPago() {
    const inv = invoices.find(i => i.id === editingFechaPagoInvoiceId);
    if (!inv) return;
    const nuevaFecha = document.getElementById('efp-fecha-pago').value;
    if (!nuevaFecha) {
        showCustomAlert('Indique una fecha de pago válida.');
        return;
    }
    inv.fechaPago = nuevaFecha;
    if (isPaymentDateEligible(nuevaFecha)) {
        inv.estado = INVOICE_STATES.HABILITADA;
        closeModal('edit-fecha-pago-modal');
        editingFechaPagoInvoiceId = null;
        renderCurrentConfirmingFilters();
        showCustomAlert(
            `La fecha de pago fue actualizada. La factura ${inv.id} pasó a estado Habilitada.`,
            'Fecha de pago actualizada'
        );
    } else {
        inv.estado = INVOICE_STATES.NO_ELEGIBLE;
        closeModal('edit-fecha-pago-modal');
        editingFechaPagoInvoiceId = null;
        renderCurrentConfirmingFilters();
        showCustomAlert(
            `La fecha de pago fue guardada, pero la factura sigue NO ELEGIBLE: debe estar a 30 días o más desde hoy.`,
            'Sigue no elegible'
        );
    }
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
        `EGP rechaza con motivo. Indique la nueva fecha de pago (AAAA-MM-DD) para la factura ${inv.id}:`,
        inv.vto
    );
    if (newVto == null || newVto.trim() === '') return;
    const nuevaFecha = newVto.trim();
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
    const status = document.getElementById('filter-status')?.value || 'all';
    const query = document.getElementById('search-invoice')?.value || '';
    renderInvoices(status, query);
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
    editingAbmUserId = id;
    const form = document.getElementById('user-form');
    if (form) form.reset();
    populateUserEnteSelect();
    const title = document.getElementById('user-modal-title');
    if (id != null) {
        const u = abmUsers.find(x => x.id === id);
        if (!u) return;
        if (title) title.textContent = 'Editar Usuario';
        document.getElementById('nu-nombre').value = u.nombre;
        document.getElementById('nu-apellido').value = u.apellido;
        document.getElementById('nu-doc').value = u.documento || '';
        document.getElementById('nu-telefono').value = u.telefono;
        document.getElementById('nu-email').value = u.email;
        document.getElementById('nu-ente-id').value = String(u.enteId);
    } else {
        if (title) title.textContent = 'Nuevo Usuario';
    }
    openModal('user-modal');
}

function submitUserModal() {
    const nombre = document.getElementById('nu-nombre').value.trim();
    const apellido = document.getElementById('nu-apellido').value.trim();
    const documento = document.getElementById('nu-doc').value.trim();
    const telefono = document.getElementById('nu-telefono').value.trim();
    const email = document.getElementById('nu-email').value.trim();
    const enteId = document.getElementById('nu-ente-id').value;
    if (!nombre || !apellido || !telefono || !email || !enteId) {
        showCustomAlert('Complete los campos obligatorios (nombre, apellido, teléfono, correo y ente asociado).', 'Datos incompletos');
        return;
    }
    const ente = participants.find(p => String(p.id) === enteId);
    const payload = {
        nombre,
        apellido,
        email,
        telefono,
        enteId: parseInt(enteId, 10),
        documento,
    };
    closeModal('user-modal');
    if (editingAbmUserId != null) {
        const idx = abmUsers.findIndex(x => x.id === editingAbmUserId);
        if (idx >= 0) abmUsers[idx] = { ...abmUsers[idx], ...payload };
        showCustomAlert(
            `Usuario "${nombre} ${apellido}" actualizado correctamente.`,
            'Usuario actualizado'
        );
    } else {
        abmUsers.push({ id: nextAbmUserId++, ...payload });
        showCustomAlert(
            `Usuario "${nombre} ${apellido}" (${email}) asociado a ${ente ? `${ente.razon} (${ente.tipo})` : 'ente'} guardado correctamente.`,
            'Usuario registrado'
        );
    }
    editingAbmUserId = null;
    renderAbmUsers();
    switchAbmTab('usuarios');
}

function openRoleModal(id = null) {
    editingAbmRoleId = id;
    const form = document.getElementById('role-form');
    if (form) form.reset();
    document.querySelectorAll('#role-form input[name="role-perm"]').forEach(cb => { cb.checked = false; });
    const title = document.getElementById('role-modal-title');
    if (id != null) {
        const r = abmRoles.find(x => x.id === id);
        if (!r) return;
        if (title) title.textContent = 'Editar Rol';
        document.getElementById('role-dominio').value = r.dominio;
        document.getElementById('role-nombre-rol').value = r.rol;
        const permSet = new Set(r.permisos || []);
        document.querySelectorAll('#role-form input[name="role-perm"]').forEach(cb => {
            cb.checked = permSet.has(cb.value);
        });
    } else {
        if (title) title.textContent = 'Nuevo Rol';
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
    renderAbmRoles();
    switchAbmTab('roles');
}


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

function pad2(n) { return String(n).padStart(2, '0'); }

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
