// ====== ESTADO DE LA APP (MOCK DATA) ======

// Máquina de estados de facturas (replica el diagrama de la POC).
// Estos valores son los que viajan en `invoice.estado`.
const INVOICE_STATES = {
    PENDIENTE: 'Pendiente',                                // Intermedio: ERP recibe la factura. Bloqueada para adelantos.
    HABILITADA: 'Habilitada',                              // Operable: usuario puede simular/solicitar adelanto.
    BLOQUEADA: 'Bloqueada',                                // Final: no operable.
    PENDIENTE_APROBACION_BANCO: 'Pendiente aprobación banco', // Esperando que el banco apruebe/rechace el desembolso.
    PENDIENTE_DESEMBOLSO: 'Pendiente de desembolso',       // Intermedio: API CORE BANKING está desembolsando.
    PENDIENTE_REVERSION: 'Pendiente de Reversión',         // Intermedio: rechazada por banco, en reversión.
    FINANCIADA: 'Financiada',                              // Final operativo: adelanto otorgado.
    PAGADA: 'Pagada',                                      // Final: cobrada al EGP.
    MORA: 'Mora',                                          // Final: vencida sin cobro.
    VENCIDA: 'Vencida',                                    // Final: factura vencida sin haber operado adelanto.
};

// Datos iniciales de facturas (cubren todos los estados de la máquina de estados)
let invoices = [
    { id: '001-001-0001234', egp: 'Retail S.A.', prov: 'Tech Solutions S.A.', emision: '2026-05-01', vto: '2026-06-30', moneda: 'GS', monto: 15000000, estado: INVOICE_STATES.HABILITADA },
    { id: '001-002-0005432', egp: 'Tigo Paraguay', prov: 'Logistica Integral', emision: '2026-04-15', vto: '2026-05-15', moneda: 'GS', monto: 8500000, estado: INVOICE_STATES.PAGADA },
    { id: '001-001-0000987', egp: 'Cervepar', prov: 'Limpieza Total SRL', emision: '2026-03-01', vto: '2026-04-01', moneda: 'GS', monto: 3200000, estado: INVOICE_STATES.MORA },
    { id: '001-001-0005678', egp: 'Retail S.A.', prov: 'Tech Solutions S.A.', emision: '2026-05-02', vto: '2026-07-02', moneda: 'USD', monto: 2500, estado: INVOICE_STATES.BLOQUEADA },
    { id: '001-003-0001111', egp: 'Tigo Paraguay', prov: 'Servicios IT', emision: '2026-04-20', vto: '2026-06-20', moneda: 'GS', monto: 50000000, estado: INVOICE_STATES.FINANCIADA },
    { id: '001-001-0002222', egp: 'Cervepar', prov: 'Agencia Creativa', emision: '2026-04-25', vto: '2026-05-25', moneda: 'USD', monto: 1200, estado: INVOICE_STATES.PENDIENTE_APROBACION_BANCO },
    { id: '001-004-0003333', egp: 'Retail S.A.', prov: 'Logistica Integral', emision: '2026-05-10', vto: '2026-07-10', moneda: 'GS', monto: 4200000, estado: INVOICE_STATES.PENDIENTE },
    { id: '001-005-0004444', egp: 'Cervepar', prov: 'Servicios IT', emision: '2026-05-12', vto: '2026-07-12', moneda: 'GS', monto: 6750000, estado: INVOICE_STATES.PENDIENTE },
    { id: '001-006-0005555', egp: 'Tigo Paraguay', prov: 'Tech Solutions S.A.', emision: '2026-02-15', vto: '2026-03-15', moneda: 'GS', monto: 2100000, estado: INVOICE_STATES.VENCIDA },
];

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

let abmRoles = [
    { id: 1, dominio: 'Banco', rol: 'ADMIN', permisos: ['Ver ABM', 'Editar ABM', 'Ver Confirming', 'Editar Confirming', 'Ver Facturas', 'Adelantar Facturas', 'Aprobar Desembolsos', 'Revertir Adelantos'] },
    { id: 2, dominio: 'EGP', rol: 'Supervisor', permisos: ['Ver Confirming', 'Ver Facturas', 'Adelantar Facturas', 'Ver Info Financiera Ente'] },
    { id: 3, dominio: 'Proveedor', rol: 'Operador', permisos: ['Ver Confirming', 'Ver Facturas'] },
];
let nextAbmRoleId = 4;

let currentSimulationInvoice = null;
// 'simulate' = flujo normal de simulación de adelanto (Habilitada → Financiada)
// 'approve'  = flujo de aprobación de desembolso pendiente (Pendiente aprobación banco → Financiada / Bloqueada)
let currentSimulationMode = 'simulate';
let confirmCallback = null;

// Selección masiva de facturas (persiste entre cambios de filtro / búsqueda)
const selectedInvoiceIds = new Set();
// Estados desde los cuales una factura puede pasar a "Habilitada" mediante la acción masiva
// (camino "usuario habilita o bloquea factura" en la máquina de estados).
const HABILITAR_VALID_STATES = new Set([INVOICE_STATES.PENDIENTE, INVOICE_STATES.BLOQUEADA]);
const HABILITAR_INVALID_TOOLTIP = 'Una o más facturas están en un estado invalido para habilitar';
const HABILITAR_EMPTY_TOOLTIP = 'Seleccione una o más facturas para habilitar';
// Estados desde los cuales una factura puede pasar a "Bloqueada" mediante la acción masiva
// (camino simétrico "usuario bloquea factura" en la máquina de estados).
const BLOQUEAR_VALID_STATES = new Set([INVOICE_STATES.PENDIENTE, INVOICE_STATES.HABILITADA]);
const BLOQUEAR_INVALID_TOOLTIP = 'Una o más facturas están en un estado invalido para bloquear';
const BLOQUEAR_EMPTY_TOOLTIP = 'Seleccione una o más facturas para bloquear';

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


// ====== NAVEGACIÓN Y LOGIN ======

document.getElementById('login-form').addEventListener('submit', (e) => {
    e.preventDefault();
    document.getElementById('login-view').classList.remove('active');
    document.getElementById('app-view').classList.add('active');
    initDashboardChart();
    renderInvoices();
    renderParticipants();
    renderAbmUsers();
    renderAbmRoles();
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
    const valid = ['entes', 'usuarios', 'roles'];
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
                <button type="button" class="btn-icon-action btn-icon-action--edit" onclick="showCustomAlert('Edición de usuario: demostración.', 'Usuario')" title="Editar usuario" aria-label="Editar usuario">
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
                <button type="button" class="btn-icon-action btn-icon-action--edit" onclick="showCustomAlert('Edición de rol: demostración.', 'Rol')" title="Editar rol" aria-label="Editar rol">
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

document.querySelectorAll('.abm-tab').forEach(btn => {
    btn.addEventListener('click', () => switchAbmTab(btn.dataset.abmTab));
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
        [INVOICE_STATES.PENDIENTE_APROBACION_BANCO]: 'status-pendiente-aprobacion-banco',
        [INVOICE_STATES.PENDIENTE_DESEMBOLSO]: 'status-pendiente-desembolso',
        [INVOICE_STATES.PENDIENTE_REVERSION]: 'status-pendiente-reversion',
        [INVOICE_STATES.FINANCIADA]: 'status-financiada',
        [INVOICE_STATES.PAGADA]: 'status-pagada',
        [INVOICE_STATES.MORA]: 'status-mora',
        [INVOICE_STATES.VENCIDA]: 'status-vencida',
    };
    return map[estado] || 'status-bloqueada';
}

// ====== LOGICA DE CONFIRMING (CORE) ======

function renderInvoices(filter = 'all', searchQuery = '') {
    const tbody = document.getElementById('invoices-tbody');
    tbody.innerHTML = '';

    const enteRazon = getSelectedOperatingEntityRazon();

    const filtered = invoices.filter(inv => {
        const matchStatus = filter === 'all' || inv.estado === filter;
        const matchSearch = inv.id.includes(searchQuery) ||
                            inv.egp.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            inv.prov.toLowerCase().includes(searchQuery.toLowerCase());
        const matchEnte = !enteRazon || inv.egp === enteRazon || inv.prov === enteRazon;
        return matchStatus && matchSearch && matchEnte;
    });

    // Limpia selecciones que apuntan a facturas que ya no existen
    pruneSelectionsToExistingInvoices();

    if (filtered.length === 0) {
        tbody.innerHTML = `<tr><td colspan="9"><div class="table-empty">No se encontraron facturas con los filtros aplicados.</div></td></tr>`;
        updateInvoiceSelectionUI(filtered);
        return;
    }

    filtered.forEach(inv => {
        let actionButtons = '';
        switch (inv.estado) {
            case INVOICE_STATES.HABILITADA:
                actionButtons = `<button class="btn-primary btn-sm" onclick="openSimulation('${inv.id}')"><i class="ph ph-calculator"></i> Simular</button>`;
                break;
            case INVOICE_STATES.FINANCIADA:
                actionButtons = `<button class="btn-secondary btn-sm text-danger" onclick="revertInvoice('${inv.id}')"><i class="ph ph-arrow-u-up-left"></i> Revertir</button>`;
                break;
            case INVOICE_STATES.PENDIENTE_APROBACION_BANCO:
                actionButtons = `<button class="btn-primary btn-sm btn-aprobar" onclick="openApprovalModal('${inv.id}')"><i class="ph ph-check-circle"></i> Aprobar Desembolso</button>`;
                break;
            case INVOICE_STATES.PENDIENTE:
                actionButtons = `<span class="row-action-hint"><i class="ph ph-hourglass-medium"></i> Use Habilitar / Bloquear</span>`;
                break;
            case INVOICE_STATES.PENDIENTE_DESEMBOLSO:
                actionButtons = `<span class="row-action-hint row-action-hint--processing"><i class="ph ph-spinner ph-spin"></i> CORE BANKING desembolsando…</span>`;
                break;
            case INVOICE_STATES.PENDIENTE_REVERSION:
                actionButtons = `<span class="row-action-hint row-action-hint--processing"><i class="ph ph-spinner ph-spin"></i> Revirtiendo operación…</span>`;
                break;
            case INVOICE_STATES.BLOQUEADA:
                actionButtons = `<span class="row-action-hint"><i class="ph ph-lock"></i> No operable</span>`;
                break;
            case INVOICE_STATES.VENCIDA:
                actionButtons = `<span class="row-action-hint row-action-hint--danger"><i class="ph ph-clock-counter-clockwise"></i> Vencida</span>`;
                break;
            default:
                // Pagada / Mora / cualquier otro final: sin acciones operables
                actionButtons = '';
        }

        const deleteInvoiceBtn =
            `<button type="button" class="btn-icon-action btn-icon-action--delete invoice-row-delete-btn" onclick="deleteInvoice(${JSON.stringify(inv.id)})" title="Eliminar factura" aria-label="Eliminar factura"><i class="ph ph-x"></i></button>`;
        actionButtons = actionButtons
            ? `${actionButtons}<span class="action-btns-sep" aria-hidden="true"></span>${deleteInvoiceBtn}`
            : deleteInvoiceBtn;

        const isChecked = selectedInvoiceIds.has(inv.id);
        const safeId = invoiceIdToHtmlAttr(inv.id);

        const tr = document.createElement('tr');
        if (isChecked) tr.classList.add('row-selected');
        tr.innerHTML = `
            <td class="col-select">
                <label class="row-checkbox" title="Seleccionar factura ${inv.id}">
                    <input type="checkbox" ${isChecked ? 'checked' : ''} data-invoice-id="${safeId}" onchange="onInvoiceCheckboxChange(this)">
                    <span class="row-checkbox-box" aria-hidden="true"></span>
                </label>
            </td>
            <td><strong>${inv.id}</strong></td>
            <td>${inv.egp}</td>
            <td>${inv.prov}</td>
            <td>${inv.emision}</td>
            <td>${inv.vto}</td>
            <td style="font-weight: 600;">${formatCurrency(inv.monto, inv.moneda)}</td>
            <td><span class="status-badge ${estadoToBadgeClass(inv.estado)}">${inv.estado}</span></td>
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
}

function getCurrentFilteredInvoices() {
    const filter = document.getElementById('filter-status')?.value || 'all';
    const query = document.getElementById('search-invoice')?.value || '';
    const enteRazon = getSelectedOperatingEntityRazon();
    return invoices.filter(inv => {
        const matchStatus = filter === 'all' || inv.estado === filter;
        const matchSearch = inv.id.includes(query) ||
                            inv.egp.toLowerCase().includes(query.toLowerCase()) ||
                            inv.prov.toLowerCase().includes(query.toLowerCase());
        const matchEnte = !enteRazon || inv.egp === enteRazon || inv.prov === enteRazon;
        return matchStatus && matchSearch && matchEnte;
    });
}

// ===== Selección masiva: handlers =====

function onInvoiceCheckboxChange(input) {
    const id = input.dataset.invoiceId;
    if (!id) return;
    if (input.checked) {
        selectedInvoiceIds.add(id);
    } else {
        selectedInvoiceIds.delete(id);
    }
    const tr = input.closest('tr');
    if (tr) tr.classList.toggle('row-selected', input.checked);
    updateInvoiceSelectionUI();
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
    const visible = getCurrentFilteredInvoices();
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
        validStates: HABILITAR_VALID_STATES,
        invalidTooltip: HABILITAR_INVALID_TOOLTIP,
        emptyTooltip: HABILITAR_EMPTY_TOOLTIP,
        verb: 'Habilitar',
    });
    updateBulkActionButtonState({
        btnId: 'btn-bloquear-facturas',
        wrapperId: 'btn-bloquear-wrapper',
        validStates: BLOQUEAR_VALID_STATES,
        invalidTooltip: BLOQUEAR_INVALID_TOOLTIP,
        emptyTooltip: BLOQUEAR_EMPTY_TOOLTIP,
        verb: 'Bloquear',
    });
}

function updateBulkActionButtonState({ btnId, wrapperId, validStates, invalidTooltip, emptyTooltip, verb }) {
    const btn = document.getElementById(btnId);
    const wrapper = document.getElementById(wrapperId);
    if (!btn || !wrapper) return;

    const selectedInvoices = invoices.filter(i => selectedInvoiceIds.has(i.id));
    const count = selectedInvoices.length;
    const allValid = count > 0 && selectedInvoices.every(i => validStates.has(i.estado));

    if (count === 0) {
        btn.classList.add('is-disabled');
        btn.setAttribute('aria-disabled', 'true');
        btn.removeAttribute('title');
        wrapper.setAttribute('title', emptyTooltip);
    } else if (!allValid) {
        btn.classList.add('is-disabled');
        btn.setAttribute('aria-disabled', 'true');
        btn.removeAttribute('title');
        wrapper.setAttribute('title', invalidTooltip);
    } else {
        btn.classList.remove('is-disabled');
        btn.setAttribute('aria-disabled', 'false');
        btn.setAttribute('title', `${verb} ${count} factura${count === 1 ? '' : 's'} seleccionada${count === 1 ? '' : 's'}`);
        wrapper.removeAttribute('title');
    }
}

// Acción del botón Habilitar: confirma y, si se acepta, pasa todas las facturas
// seleccionadas (todas en estado Pendiente o Bloqueada) a estado Habilitada.
function habilitarSelectedInvoices() {
    const btn = document.getElementById('btn-habilitar-facturas');
    if (!btn || btn.classList.contains('is-disabled')) return;

    const selectedInvoices = invoices.filter(i => selectedInvoiceIds.has(i.id));
    if (selectedInvoices.length === 0) return;
    const allValid = selectedInvoices.every(i => HABILITAR_VALID_STATES.has(i.estado));
    if (!allValid) return;

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
    if (!btn || btn.classList.contains('is-disabled')) return;

    const selectedInvoices = invoices.filter(i => selectedInvoiceIds.has(i.id));
    if (selectedInvoices.length === 0) return;
    const allValid = selectedInvoices.every(i => BLOQUEAR_VALID_STATES.has(i.estado));
    if (!allValid) return;

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

        document.getElementById('ni-moneda').value = 'GS';
        document.getElementById('ni-monto').value = Math.floor(10000000 + Math.random() * 50000000);

        overlay.classList.add('hidden');
        showCustomAlert('Factura leída correctamente desde código QR.', 'Éxito');
    }, 2000);
}

// Nueva Factura
function submitNewInvoice() {
    const nro = document.getElementById('ni-nro').value;
    const egp = document.getElementById('ni-egp').value;
    const prov = document.getElementById('ni-prov').value;
    const emision = document.getElementById('ni-emision').value;
    const vto = document.getElementById('ni-vto').value;
    const moneda = document.getElementById('ni-moneda').value;
    const monto = parseFloat(document.getElementById('ni-monto').value);
    const estado = document.getElementById('ni-estado').value;

    if (!nro || !emision || !vto || !monto) {
        showCustomAlert("Por favor complete todos los campos obligatorios.");
        return;
    }

    invoices.unshift({ id: nro, egp, prov, emision, vto, moneda, monto, estado });

    closeModal('new-invoice-modal');
    document.getElementById('new-invoice-form').reset();
    renderCurrentConfirmingFilters();
    showCustomAlert('La factura ha sido registrada exitosamente.', 'Factura Registrada');
}


// Simulación de Adelanto
function openSimulation(invoiceId) {
    openSimulationModal(invoiceId, 'simulate');
}

// Aprobación de desembolso pendiente (reutiliza el modal de simulación)
function openApprovalModal(invoiceId) {
    openSimulationModal(invoiceId, 'approve');
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

    if (mode === 'approve') {
        // En modo aprobación los datos son sólo informativos
        simMonedaSelect.disabled = true;
        simMonedaSelect.title = 'Moneda definida en la factura a aprobar';
        simMonto.disabled = true;
        simMonto.title = 'Monto del adelanto pendiente de aprobación';
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
function applySimulationModalMode() {
    const titleEl = document.getElementById('simulate-modal-title');
    const sectionTitleEl = document.getElementById('simulate-section-title');
    const btnExecute = document.getElementById('btn-execute-adelanto');
    const btnAprobar = document.getElementById('btn-aprobar-desembolso');
    const btnRechazar = document.getElementById('btn-rechazar-desembolso');

    if (currentSimulationMode === 'approve') {
        if (titleEl) titleEl.textContent = 'Aprobación de Desembolso';
        if (sectionTitleEl) sectionTitleEl.textContent = 'Datos del adelanto a otorgar';
        if (btnExecute) btnExecute.classList.add('hidden');
        if (btnAprobar) btnAprobar.classList.remove('hidden');
        if (btnRechazar) btnRechazar.classList.remove('hidden');
    } else {
        if (titleEl) titleEl.textContent = 'Simulación de Adelanto';
        if (sectionTitleEl) sectionTitleEl.textContent = 'Datos a adelantar';
        if (btnExecute) btnExecute.classList.remove('hidden');
        if (btnAprobar) btnAprobar.classList.add('hidden');
        if (btnRechazar) btnRechazar.classList.add('hidden');
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

// === Flujo "usuario simula o solicita adelanto" en la máquina de estados ===
// Habilitada → (usuario ejecuta adelanto) → Pendiente aprobación banco
// (luego el banco aprueba/rechaza desde la nueva acción "Aprobar Desembolso")
document.getElementById('btn-execute-adelanto').addEventListener('click', () => {
    if (!currentSimulationInvoice) return;
    const inv = currentSimulationInvoice;
    inv.estado = INVOICE_STATES.PENDIENTE_APROBACION_BANCO;
    renderCurrentConfirmingFilters();
    closeModal('simulate-modal');
    currentSimulationInvoice = null;
    showCustomAlert(
        `La solicitud de adelanto para la factura ${inv.id} (${inv.egp} – ${inv.prov}) fue enviada al banco. La factura queda en estado "Pendiente aprobación banco" hasta que el banco apruebe o rechace el desembolso.`,
        'Solicitud enviada al banco'
    );
});

// === Flujo "banco aprueba la TX" → Pendiente de desembolso → (CORE BANKING) → Financiada ===
// Con probabilidad de error simulado, la API CORE BANKING puede fallar el desembolso y la
// factura vuelve al estado "Pendiente aprobación banco" (flecha ERROR del diagrama).
document.getElementById('btn-aprobar-desembolso')?.addEventListener('click', () => {
    if (!currentSimulationInvoice) return;
    const inv = currentSimulationInvoice;
    inv.estado = INVOICE_STATES.PENDIENTE_DESEMBOLSO;
    renderCurrentConfirmingFilters();
    closeModal('simulate-modal');
    currentSimulationInvoice = null;
    currentSimulationMode = 'simulate';
    showCustomAlert(
        `El desembolso para la factura ${inv.id} (${inv.egp} – ${inv.prov}) fue aprobado por el banco. La API CORE BANKING está procesando el desembolso.`,
        'Desembolso aprobado'
    );
    scheduleCoreBankingDisbursement(inv.id);
});

// === Flujo "banco rechaza la TX" → Pendiente de Reversión → (auto) → Bloqueada ===
document.getElementById('btn-rechazar-desembolso')?.addEventListener('click', () => {
    if (!currentSimulationInvoice) return;
    const inv = currentSimulationInvoice;
    inv.estado = INVOICE_STATES.PENDIENTE_REVERSION;
    renderCurrentConfirmingFilters();
    closeModal('simulate-modal');
    currentSimulationInvoice = null;
    currentSimulationMode = 'simulate';
    showCustomAlert(
        `El desembolso para la factura ${inv.id} (${inv.egp} – ${inv.prov}) fue rechazado por el banco. Se está procesando la reversión.`,
        'Desembolso rechazado'
    );
    scheduleReversionToBlocked(inv.id);
});

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

// Reversión automática (Pendiente de Reversión → Bloqueada) tras el rechazo del banco.
const REVERSION_DELAY_MS = 1800;
function scheduleReversionToBlocked(invoiceId) {
    setTimeout(() => {
        const inv = invoices.find(i => i.id === invoiceId);
        if (!inv || inv.estado !== INVOICE_STATES.PENDIENTE_REVERSION) return;
        inv.estado = INVOICE_STATES.BLOQUEADA;
        renderCurrentConfirmingFilters();
    }, REVERSION_DELAY_MS);
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


// Reversión de Adelanto
function revertInvoice(invoiceId) {
    const inv = invoices.find(i => i.id === invoiceId);
    if (!inv) return;

    const msg = `¿Está seguro que desea REVERTIR la operación de la factura ${inv.id} (${inv.egp}) por un monto de ${formatCurrency(inv.monto, inv.moneda)}? Esta acción anulará el adelanto y volverá el estado a Habilitada.`;

    showCustomConfirm(msg, () => {
        inv.estado = INVOICE_STATES.HABILITADA;
        renderCurrentConfirmingFilters();
        showCustomAlert('La operación ha sido revertida. La factura vuelve a estar en estado Habilitada.', 'Reversión exitosa');
    }, "Revertir Operación");
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

function openUserModal() {
    const form = document.getElementById('user-form');
    if (form) form.reset();
    populateUserEnteSelect();
    openModal('user-modal');
}

function submitUserModal() {
    const nombre = document.getElementById('nu-nombre').value.trim();
    const apellido = document.getElementById('nu-apellido').value.trim();
    const telefono = document.getElementById('nu-telefono').value.trim();
    const email = document.getElementById('nu-email').value.trim();
    const enteId = document.getElementById('nu-ente-id').value;
    if (!nombre || !apellido || !telefono || !email || !enteId) {
        showCustomAlert('Complete los campos obligatorios (nombre, apellido, teléfono, correo y ente asociado).', 'Datos incompletos');
        return;
    }
    const ente = participants.find(p => String(p.id) === enteId);
    closeModal('user-modal');
    abmUsers.push({
        id: nextAbmUserId++,
        nombre,
        apellido,
        email,
        telefono,
        enteId: parseInt(enteId, 10),
    });
    renderAbmUsers();
    switchAbmTab('usuarios');
    showCustomAlert(
        `Usuario "${nombre} ${apellido}" (${email}) asociado a ${ente ? `${ente.razon} (${ente.tipo})` : 'ente'} guardado correctamente (simulación).`,
        'Usuario registrado'
    );
}

function openRoleModal() {
    const form = document.getElementById('role-form');
    if (form) form.reset();
    document.querySelectorAll('#role-form input[name="role-perm"]').forEach(cb => { cb.checked = false; });
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
    closeModal('role-modal');
    abmRoles.push({
        id: nextAbmRoleId++,
        dominio,
        rol,
        permisos: perms,
    });
    renderAbmRoles();
    switchAbmTab('roles');
    showCustomAlert(
        `Rol "${rol}" en dominio "${dominio}" con ${perms.length} permiso(s) asignado(s) guardado correctamente (simulación).`,
        'Rol registrado'
    );
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
        'GS',
        15000000,
        'Pendiente'
    ];
    const ws = XLSX.utils.aoa_to_sheet([BULK_INVOICE_HEADERS, sampleRow]);
    // Ancho de columnas legible
    ws['!cols'] = [
        { wch: 20 }, { wch: 22 }, { wch: 22 }, { wch: 16 },
        { wch: 18 }, { wch: 10 }, { wch: 16 }, { wch: 18 }
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

        invoices.unshift({
            id: row.id,
            egp: row.egp,
            prov: row.prov,
            emision: row.emision,
            vto: row.vto,
            moneda: row.moneda,
            monto: row.monto,
            estado: row.estado
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
    let moneda = String(get('Moneda') || '').trim().toUpperCase();
    if (moneda === 'GUARANIES' || moneda === 'GUARANÍES' || moneda === 'PYG') moneda = 'GS';
    if (moneda === 'DOLAR' || moneda === 'DÓLAR' || moneda === 'DOLARES' || moneda === 'DÓLARES') moneda = 'USD';
    const montoRaw = get('Monto');
    const monto = parseBulkNumber(montoRaw);

    let estado = String(get('Estado inicial', 'Estado') || '').trim();
    estado = normalizeBulkEstado(estado);

    return { id, egp, prov, emision, vto, moneda, monto, estado };
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
