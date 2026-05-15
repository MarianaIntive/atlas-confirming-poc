// ====== ESTADO DE LA APP (MOCK DATA) ======

// Datos iniciales de facturas
let invoices = [
    { id: '001-001-0001234', egp: 'Retail S.A.', prov: 'Tech Solutions S.A.', emision: '2026-05-01', vto: '2026-06-30', moneda: 'GS', monto: 15000000, estado: 'Habilitada' },
    { id: '001-002-0005432', egp: 'Tigo Paraguay', prov: 'Logistica Integral', emision: '2026-04-15', vto: '2026-05-15', moneda: 'GS', monto: 8500000, estado: 'Pagada' },
    { id: '001-001-0000987', egp: 'Cervepar', prov: 'Limpieza Total SRL', emision: '2026-03-01', vto: '2026-04-01', moneda: 'GS', monto: 3200000, estado: 'Mora' },
    { id: '001-001-0005678', egp: 'Retail S.A.', prov: 'Tech Solutions S.A.', emision: '2026-05-02', vto: '2026-07-02', moneda: 'USD', monto: 2500, estado: 'Bloqueada' },
    { id: '001-003-0001111', egp: 'Tigo Paraguay', prov: 'Servicios IT', emision: '2026-04-20', vto: '2026-06-20', moneda: 'GS', monto: 50000000, estado: 'Financiada' },
    { id: '001-001-0002222', egp: 'Cervepar', prov: 'Agencia Creativa', emision: '2026-04-25', vto: '2026-05-25', moneda: 'USD', monto: 1200, estado: 'Pendiente aprobación banco' }
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
let confirmCallback = null;

function getSelectedOperatingEntityRazon() {
    const sel = document.getElementById('operating-entity-select');
    if (!sel || sel.value === '') return null;
    const p = participants.find(x => String(x.id) === sel.value);
    return p ? p.razon : null;
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
            <td>
                <button class="btn-secondary btn-sm" onclick="openAbmModal(${p.id})">
                    <i class="ph ph-pencil-simple"></i> Editar
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
            <td>
                <button type="button" class="btn-secondary btn-sm" onclick="showCustomAlert('Edición de usuario: demostración.', 'Usuario')">
                    <i class="ph ph-pencil-simple"></i> Editar
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
            <td>
                <button type="button" class="btn-secondary btn-sm" onclick="showCustomAlert('Edición de rol: demostración.', 'Rol')">
                    <i class="ph ph-pencil-simple"></i> Editar
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
    if (estado === 'Pendiente aprobación banco') return 'status-pendiente-aprobacion-banco';
    const map = {
        Habilitada: 'habilitada',
        Financiada: 'financiada',
        Pagada: 'pagada',
        Mora: 'mora',
        Bloqueada: 'bloqueada',
    };
    const slug = map[estado];
    return slug ? `status-${slug}` : 'status-bloqueada';
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

    if (filtered.length === 0) {
        tbody.innerHTML = `<tr><td colspan="8"><div class="table-empty">No se encontraron facturas con los filtros aplicados.</div></td></tr>`;
        return;
    }

    filtered.forEach(inv => {
        let actionButtons = '';
        if (inv.estado === 'Habilitada') {
            actionButtons = `<button class="btn-primary btn-sm" onclick="openSimulation('${inv.id}')"><i class="ph ph-calculator"></i> Simular</button>`;
        } else if (inv.estado === 'Financiada') {
            actionButtons = `<button class="btn-secondary btn-sm text-danger" onclick="revertInvoice('${inv.id}')"><i class="ph ph-arrow-u-up-left"></i> Revertir</button>`;
        } else if (inv.estado === 'Bloqueada') {
            actionButtons = `<span style="font-size: 12px; color: #9ca3af;"><i class="ph ph-lock"></i> No operable</span>`;
        }

        const tr = document.createElement('tr');
        tr.innerHTML = `
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
    renderInvoices();
    showCustomAlert('La factura ha sido registrada exitosamente.', 'Factura Registrada');
}


// Simulación de Adelanto
function openSimulation(invoiceId) {
    const inv = invoices.find(i => i.id === invoiceId);
    if (!inv) return;

    currentSimulationInvoice = inv;

    // Buscar el EGP en participants para obtener su configuración de monedas y tasas
    const egpConfig = participants.find(p => p.razon === inv.egp && p.tipo === 'EGP');
    const isMultimoneda = egpConfig && egpConfig.monedas.length > 1;

    const simMonedaSelect = document.getElementById('sim-moneda');
    simMonedaSelect.value = inv.moneda;

    if (isMultimoneda) {
        // Habilitar el selector y cargar ambas opciones
        simMonedaSelect.disabled = false;
        simMonedaSelect.title = 'Este EGP opera en múltiples monedas';
    } else {
        // Moneda única: mostrar la de la factura y deshabilitar
        simMonedaSelect.disabled = true;
        simMonedaSelect.title = 'Moneda única habilitada para este participante';
    }

    document.getElementById('sim-monto').value = inv.monto;
    document.getElementById('sim-monto').max = inv.monto;

    recalculateSimulation();
    openModal('simulate-modal');
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

document.getElementById('btn-execute-adelanto').addEventListener('click', () => {
    if (currentSimulationInvoice) {
        currentSimulationInvoice.estado = 'Financiada';
        renderInvoices();
        closeModal('simulate-modal');
        currentSimulationInvoice = null;
        showCustomAlert('La operación ha sido confirmada. El monto neto será acreditado según los plazos establecidos.', 'Adelanto Ejecutado');
    }
});


// Reversión de Adelanto
function revertInvoice(invoiceId) {
    const inv = invoices.find(i => i.id === invoiceId);
    if (!inv) return;

    const msg = `¿Está seguro que desea REVERTIR la operación de la factura ${inv.id} (${inv.egp}) por un monto de ${formatCurrency(inv.monto, inv.moneda)}? Esta acción anulará el adelanto y volverá el estado a Habilitada.`;

    showCustomConfirm(msg, () => {
        inv.estado = 'Habilitada';
        renderInvoices();
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
