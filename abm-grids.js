// ====== ABM — Grillas EGP / Proveedor, paginado y modales de detalle ======

const ABM_GRID_PAGE_SIZE = 25;
const abmGridPages = { egp: 1, proveedor: 1, usuarios: 1, roles: 1, notificaciones: 1 };

const ROLE_DETAIL_VIEW_GROUPS = [
    {
        title: 'Permisos pantalla ABM',
        permissions: [
            { label: 'ABM de EGPs y Proveedores', match: p => /ABM de EGPs y Proveedores/i.test(p) },
            { label: 'ABM de usuarios', match: p => /ABM de usuarios/i.test(p) },
            { label: 'Bloqueo de usuarios', match: p => p === 'Bloqueo de usuarios' },
            { label: 'Autorización de usuarios', match: p => p === 'Autorización de usuarios' },
            { label: 'ABM Notificaciones', match: p => /ABM Notificaciones/i.test(p) },
            { label: 'ABM relación EGP-Proveedor', match: p => /EGP|Proveedor|relaci/i.test(p) && /ABM/i.test(p) },
            { label: 'Configuración de Roles y Perfiles', match: p => p === 'Configuración de Roles y Perfiles' },
            { label: 'Configurar notificaciones y medios de envío', match: p => /Notificaciones/i.test(p) },
            { label: 'Utilizar filtros', match: p => p === 'Utilizar filtros ABM' },
        ],
    },
    {
        title: 'Permisos pantalla CONFIRMING',
        permissions: [
            { label: 'Utilizar filtros', match: p => p === 'Utilizar filtros Confirming' },
            { label: 'Ver grilla', match: p => p.startsWith('Ver grilla') },
            { label: 'Pestaña facturas vigentes', match: p => p.includes('vigentes') },
            { label: 'Pestaña facturas no vigentes', match: p => p.includes('no vigentes') },
            { label: 'Pestaña facturas no operables', match: p => p.includes('no operables') },
            { label: 'Cargar Factura — manual', match: p => p.includes('manual') && p.includes('Factura') },
            { label: 'Cargar Factura — masivo', match: p => p.includes('masivo') },
            { label: 'Editar Factura — datos cargados', match: p => p.includes('datos cargados') },
            { label: 'Editar Factura — Fecha de Pago', match: p => p.includes('Fecha de Pago') },
            { label: 'Habilitar Factura', match: p => p === 'Habilitar Factura' },
            { label: 'Bloquear Factura', match: p => p === 'Bloquear Factura' },
            { label: 'ABM Fecha de Pago de Factura', match: p => /fecha de pago/i.test(p) },
            { label: 'Simular adelanto', match: p => /simular adelanto/i.test(p) },
            { label: 'Aprobar desembolso EGP', match: p => p.includes('EGP') && /desembolso/i.test(p) },
            { label: 'Aprobar desembolso Banco', match: p => p.includes('Banco') && /desembolso/i.test(p) },
            { label: 'Revertir factura', match: p => p === 'Revertir factura' },
            { label: 'Revertir factura 2da aprobación', match: p => p.includes('2da') },
            { label: 'Ver información sensible EGP', match: p => p.includes('sensible EGP') },
            { label: 'Ver información sensible Proveedor', match: p => p.includes('sensible Proveedor') },
            { label: 'Ver Documentos', match: p => p === 'Ver Documentos' },
            { label: 'Descargar Documentos', match: p => p === 'Descargar Documentos' },
            { label: 'Ver estado de cuotas del préstamo', match: p => /cuotas|pr[eé]stamo/i.test(p) },
        ],
    },
];

function canViewEgpGrid() {
    return loggedSessionHasPermission('ABM de EGPs y Proveedores — Ver');
}

function canViewProveedorGrid() {
    return loggedSessionHasPermission('ABM de EGPs y Proveedores — Ver');
}

function canModifyParticipant() {
    return loggedSessionHasPermission('ABM de EGPs y Proveedores — Modificar');
}

function canDeleteParticipantPerm() {
    return loggedSessionHasPermission('ABM de EGPs y Proveedores — Borrar');
}

function canBlockParticipantPerm(p) {
    if (p.tipo === 'EGP') return loggedSessionHasPermission('Bloqueo de EGP');
    return loggedSessionHasPermission('Bloqueo de EGP')
        || loggedSessionHasPermission('ABM de EGPs y Proveedores — Modificar');
}

function canViewAbmUsersDetail() {
    return loggedSessionHasPermission('ABM de usuarios — Ver');
}

function canViewAbmRolesDetail() {
    return loggedSessionHasPermission('Configuración de Roles y Perfiles')
        || loggedSessionHasPermission('Ver pantalla ABM');
}

function canViewAbmNotificationsDetail() {
    return loggedSessionHasPermission('ABM Notificaciones — Ver');
}

function paginateAbmGrid(items, pageKey) {
    const total = items.length;
    const totalPages = Math.max(1, Math.ceil(total / ABM_GRID_PAGE_SIZE));
    if (abmGridPages[pageKey] > totalPages) abmGridPages[pageKey] = totalPages;
    if (abmGridPages[pageKey] < 1) abmGridPages[pageKey] = 1;
    const page = abmGridPages[pageKey];
    const start = (page - 1) * ABM_GRID_PAGE_SIZE;
    return { slice: items.slice(start, start + ABM_GRID_PAGE_SIZE), total, totalPages, page };
}

function renderAbmPagination(containerId, pageKey, total) {
    const container = document.getElementById(containerId);
    if (!container) return;
    const totalPages = Math.max(1, Math.ceil(total / ABM_GRID_PAGE_SIZE));
    if (total === 0) {
        container.innerHTML = '';
        return;
    }
    const page = abmGridPages[pageKey];
    container.innerHTML = `
        <div class="abm-pagination">
            <span class="abm-pagination-info">Página ${page} de ${totalPages} · ${total} registro(s)</span>
            <div class="abm-pagination-controls">
                <button type="button" class="btn-secondary btn-sm" ${page <= 1 ? 'disabled' : ''} onclick="changeAbmGridPage('${pageKey}', ${page - 1})">Anterior</button>
                <button type="button" class="btn-secondary btn-sm" ${page >= totalPages ? 'disabled' : ''} onclick="changeAbmGridPage('${pageKey}', ${page + 1})">Siguiente</button>
            </div>
        </div>
    `;
}

function changeAbmGridPage(pageKey, page) {
    abmGridPages[pageKey] = page;
    if (pageKey === 'egp' || pageKey === 'proveedor') renderParticipants();
    else if (pageKey === 'usuarios') renderAbmUsers();
    else if (pageKey === 'roles') renderAbmRoles();
    else if (pageKey === 'notificaciones') renderAbmNotifications();
}

function syncAbmEntesFiltersVisibility(tabKey) {
    const wrap = document.getElementById('abm-entes-filters-wrap');
    if (wrap) wrap.classList.toggle('hidden', tabKey !== 'egp' && tabKey !== 'proveedor');
}

function formatCurrencyCodeLabel(code) {
    if (code === 'GS') return 'PYG';
    return code;
}

function formatMonedasGridCell(p) {
    if (!p.monedas?.length) return '';
    return p.monedas.map(m => `<span class="badge-moneda ${m.toLowerCase()}">${formatCurrencyCodeLabel(m)}</span>`).join('');
}

function formatLineaCreditoGridCell(p) {
    if (!p.lineaCredito || p.lineaCredito <= 0) return '';
    const isUsdPrimary = p.monedas?.includes('USD') && !p.monedas?.includes('GS');
    const formatted = new Intl.NumberFormat('es-PY').format(p.lineaCredito);
    return isUsdPrimary ? `${formatted} usd` : `${formatted}.00 Gs.`;
}

function renderClienteAtlasGridCell(p) {
    if (p.clienteAtlas == null || p.clienteAtlas === undefined) return '';
    return p.clienteAtlas
        ? '<i class="ph ph-check-circle text-success" style="font-size:18px;"></i>'
        : '<i class="ph ph-x-circle" style="font-size:18px;color:#d1d5db;"></i>';
}

function buildParticipantActionButtons(p) {
    const blocked = isParticipantBlocked(p);
    const blockBtnClass = blocked ? 'btn-icon-action--unlock' : 'btn-icon-action--lock';
    const blockBtnTitle = blocked ? 'Desbloquear ente' : 'Bloquear ente';
    const blockBtnIcon = blocked ? 'ph-lock-open' : 'ph-lock';
    const buttons = [];
    buttons.push(`<button type="button" class="btn-icon-action btn-icon-action--view" onclick="openAbmViewModal(${p.id})" title="Ver detalle" aria-label="Ver detalle"><i class="ph ph-eye"></i></button>`);
    if (canModifyParticipant()) {
        buttons.push(`<button type="button" class="btn-icon-action btn-icon-action--edit" onclick="openAbmModal(${p.id})" title="Editar" aria-label="Editar"><i class="ph ph-pencil-simple"></i></button>`);
    }
    if (canBlockParticipantPerm(p)) {
        buttons.push(`<button type="button" class="btn-icon-action ${blockBtnClass}" onclick="toggleParticipantBlock(${p.id})" title="${blockBtnTitle}" aria-label="${blockBtnTitle}"><i class="ph ${blockBtnIcon}"></i></button>`);
    }
    if (canDeleteParticipantPerm()) {
        buttons.push(`<button type="button" class="btn-icon-action btn-icon-action--delete" onclick="deleteParticipant(${p.id})" title="Eliminar" aria-label="Eliminar"><i class="ph ph-x"></i></button>`);
    }
    return buttons.join('');
}

function renderAttachmentsViewHtml(p) {
    const files = p.adjuntos?.length
        ? p.adjuntos
        : [{ nombre: 'documento-registro.pdf' }, { nombre: 'contrato-marco.pdf' }];
    return files.map(f => `
        <button type="button" class="abm-attachment-link" onclick="showCustomAlert('Descarga simulada: ${f.nombre}', 'Documento')">
            <i class="ph ph-download-simple"></i> ${f.nombre}
        </button>
    `).join('');
}

function renderEgpGrid() {
    const panel = document.getElementById('abm-panel-egp');
    const tbody = document.getElementById('egp-tbody');
    if (!tbody) return;
    if (!canViewEgpGrid()) {
        tbody.innerHTML = '<tr><td colspan="7"><div class="table-empty">Su perfil no tiene permiso para visualizar la grilla de EGP.</div></td></tr>';
        renderAbmPagination('egp-pagination', 'egp', 0);
        if (panel) panel.classList.toggle('abm-panel--denied', true);
        return;
    }
    if (panel) panel.classList.remove('abm-panel--denied');

    const filtered = participants.filter(p => p.tipo === 'EGP' && participantMatchesEntesFilters(p));
    const { slice, total } = paginateAbmGrid(filtered, 'egp');
    tbody.innerHTML = '';
    if (!slice.length) {
        tbody.innerHTML = '<tr><td colspan="7"><div class="table-empty">No se encontraron EGP con los filtros aplicados.</div></td></tr>';
        renderAbmPagination('egp-pagination', 'egp', total);
        return;
    }
    slice.forEach(p => {
        const tr = document.createElement('tr');
        if (isParticipantBlocked(p)) tr.classList.add('abm-row-blocked');
        tr.innerHTML = `
            <td>${p.ruc || ''}</td>
            <td><strong>${p.razon || ''}</strong></td>
            <td style="font-size:13px;color:#6b7280;">${p.email || ''}</td>
            <td>${formatMonedasGridCell(p)}</td>
            <td style="font-weight:600;">${formatLineaCreditoGridCell(p)}</td>
            <td style="text-align:center;">${renderClienteAtlasGridCell(p)}</td>
            <td class="abm-actions-cell">${buildParticipantActionButtons(p)}</td>
        `;
        tbody.appendChild(tr);
    });
    renderAbmPagination('egp-pagination', 'egp', total);
}

function renderProveedorGrid() {
    const panel = document.getElementById('abm-panel-proveedor');
    const tbody = document.getElementById('proveedor-tbody');
    if (!tbody) return;
    if (!canViewProveedorGrid()) {
        tbody.innerHTML = '<tr><td colspan="6"><div class="table-empty">Su perfil no tiene permiso para visualizar la grilla de Proveedor.</div></td></tr>';
        renderAbmPagination('proveedor-pagination', 'proveedor', 0);
        if (panel) panel.classList.add('abm-panel--denied');
        return;
    }
    if (panel) panel.classList.remove('abm-panel--denied');

    const filtered = participants.filter(p => p.tipo === 'Proveedor' && participantMatchesEntesFilters(p));
    const { slice, total } = paginateAbmGrid(filtered, 'proveedor');
    tbody.innerHTML = '';
    if (!slice.length) {
        tbody.innerHTML = '<tr><td colspan="6"><div class="table-empty">No se encontraron proveedores con los filtros aplicados.</div></td></tr>';
        renderAbmPagination('proveedor-pagination', 'proveedor', total);
        return;
    }
    slice.forEach(p => {
        const egpCol = getParticipantEgpPadreRazon(p) || '';
        const tr = document.createElement('tr');
        if (isParticipantBlocked(p)) tr.classList.add('abm-row-blocked');
        tr.innerHTML = `
            <td>${p.ruc || ''}</td>
            <td><strong>${p.razon || ''}</strong></td>
            <td style="font-size:13px;">${egpCol ? `<strong>${egpCol}</strong>` : ''}</td>
            <td style="font-size:13px;color:#6b7280;">${p.email || ''}</td>
            <td style="text-align:center;">${renderClienteAtlasGridCell(p)}</td>
            <td class="abm-actions-cell">${buildParticipantActionButtons(p)}</td>
        `;
        tbody.appendChild(tr);
    });
    renderAbmPagination('proveedor-pagination', 'proveedor', total);
}

function openAbmDetailModal(title, bodyHtml) {
    const titleEl = document.getElementById('abm-detail-modal-title');
    const bodyEl = document.getElementById('abm-detail-modal-body');
    if (titleEl) titleEl.textContent = title;
    if (bodyEl) bodyEl.innerHTML = bodyHtml;
    openModal('abm-detail-modal');
}

function openAbmViewModal(participantId) {
    const p = participants.find(x => x.id === participantId);
    if (!p) return;
    if (p.tipo === 'EGP' && !canViewEgpGrid()) {
        showCustomAlert('Su perfil no tiene permiso para ver detalle de EGP.', 'Acción no disponible');
        return;
    }
    if (p.tipo === 'Proveedor' && !canViewProveedorGrid()) {
        showCustomAlert('Su perfil no tiene permiso para ver detalle de Proveedor.', 'Acción no disponible');
        return;
    }

    const viz = getAbmVisualizationDefaults(p);
    const tipoLabel = p.tipo === 'EGP' ? 'Empresa Gran Pagador (EGP)' : 'Proveedor';
    const estadoLabel = getAbmAccessLabel(isParticipantBlocked(p));
    const atlasLabel = p.clienteAtlas == null ? '—' : (p.clienteAtlas ? 'Sí' : 'No');
    const monedasLabel = viz.monedas?.length
        ? viz.monedas.map(m => formatCurrencyCodeLabel(m)).join(', ')
        : '—';
    const relations = getEnteEgpProveedorRelations(p);
    const adminDefaults = getProveedorAdminFieldDefaults(p.ruc);
    const attachmentsHtml = `<div class="abm-attachments-list">${renderAttachmentsViewHtml(p)}</div>`;

    let body = `
        ${abmViewField('Tipo de Ente', tipoLabel)}
        ${abmViewField('RUC', p.ruc)}
        ${abmViewField('Razón Social', `<strong>${p.razon}</strong>`)}
        ${abmViewField('Estado', estadoLabel)}
        ${abmViewField('Email de contacto', p.email)}
        ${abmViewField('Teléfono', p.telefono)}
        <div class="form-group abm-view-field">
            <label>Archivos adjuntos</label>
            <div class="abm-view-value">${attachmentsHtml}</div>
        </div>
        ${abmViewField('Cliente Atlas', atlasLabel)}
    `;

    if (p.tipo === 'EGP') {
        body += `
            ${abmViewField('Monedas habilitadas para operar', monedasLabel)}
            <p class="form-section-title" style="margin-top:16px">Condiciones financieras</p>
            <div class="form-row">
                ${abmViewField('% Interés (TNA)', `${viz.tasaInteres}%`)}
                ${abmViewField('% Comisión', `${viz.tasaComision}%`)}
                ${abmViewField('% IVA', `${viz.iva}%`)}
            </div>
            ${abmViewField('Desembolsos automáticos', p.desembolsoAuto ? 'Sí' : 'No')}
        `;
    } else {
        body += `${abmViewField('Desembolsos automáticos', p.desembolsoAuto ? 'Sí' : 'No')}`;
        if (!p.clienteAtlas) {
            body += `
                <p class="form-section-title" style="margin-top:16px">Datos bancarios y titular</p>
                <div class="form-row">
                    ${abmViewField('Cuenta crédito', p.cuentaCredito || adminDefaults.cuentaCredito)}
                    ${abmViewField('Banco', p.banco || adminDefaults.banco)}
                </div>
                <div class="form-row">
                    ${abmViewField('Moneda', p.monedaOperacion || adminDefaults.monedaOperacion)}
                    ${abmViewField('Tipo de documento', p.tipoDocumento)}
                </div>
                <div class="form-row">
                    ${abmViewField('Número de documento', p.numeroDocumento)}
                    ${abmViewField('Nombre y Apellido', p.nombreApellido)}
                </div>
            `;
        }
    }

    body += `
        <p class="form-section-title" style="margin-top:24px">Relaciones EGP–Proveedor</p>
        <p class="abm-panel-caption">Relaciones del ente según RUC <strong>${p.ruc}</strong> en la plataforma.</p>
        ${renderEnteRelationsPanel(relations)}
    `;

    openAbmDetailModal(`Ver detalle — ${p.razon}`, body);
}

function openUserDetailModal(userId) {
    if (!canViewAbmUsersDetail()) {
        showCustomAlert('Su perfil no tiene permiso para ver detalle de usuarios.', 'Acción no disponible');
        return;
    }
    const u = abmUsers.find(x => x.id === userId);
    if (!u) return;
    const ente = getUserAssociatedEnte(u);
    const body = `
        <div class="form-row">
            ${abmViewField('Nombre', u.nombre)}
            ${abmViewField('Apellido', u.apellido)}
        </div>
        ${abmViewField('Cédula de identidad', u.documento || '—')}
        ${abmViewField('RUC', ente?.ruc || '—')}
        <div class="form-row">
            ${abmViewField('Email', u.email)}
            ${abmViewField('Teléfono', u.telefono)}
        </div>
        <div class="form-row">
            ${abmViewField('Tipo de ente asociado', ente?.tipo || '—')}
            ${abmViewField('Ente asociado', ente?.razon || '—')}
        </div>
        ${abmViewField('Rol', getAbmRoleLabel(u.rolId))}
    `;
    openAbmDetailModal(`Ver detalle — ${u.nombre} ${u.apellido}`, body);
}

function renderRolePermissionsDetailHtml(role) {
    const permSet = role.permisos || [];
    return ROLE_DETAIL_VIEW_GROUPS.map(group => {
        const items = group.permissions.map(item => {
            const active = permSet.some(item.match);
            return `<li class="abm-perm-detail-item ${active ? 'is-active' : ''}">${item.label}${active ? ' <i class="ph ph-check"></i>' : ''}</li>`;
        }).join('');
        return `
            <div class="abm-perm-detail-group">
                <p class="form-section-title">${group.title}</p>
                <ul class="abm-perm-detail-list">${items}</ul>
            </div>
        `;
    }).join('');
}

function openRoleDetailModal(roleId) {
    if (!canViewAbmRolesDetail()) {
        showCustomAlert('Su perfil no tiene permiso para ver detalle de roles.', 'Acción no disponible');
        return;
    }
    const r = abmRoles.find(x => x.id === roleId);
    if (!r) return;
    const body = `
        <div class="form-row">
            ${abmViewField('Dominio', r.dominio)}
            ${abmViewField('Rol', r.rol)}
        </div>
        <p class="form-section-title" style="margin-top:16px">Permisos</p>
        ${renderRolePermissionsDetailHtml(r)}
    `;
    openAbmDetailModal(`Ver detalle — ${r.rol} (${r.dominio})`, body);
}

function openNotificationDetailModal(notificationId) {
    if (!canViewAbmNotificationsDetail()) {
        showCustomAlert('Su perfil no tiene permiso para ver detalle de notificaciones.', 'Acción no disponible');
        return;
    }
    const n = abmNotifications.find(x => x.id === notificationId);
    if (!n) return;
    const body = `
        ${abmViewField('Nombre de la notificación', n.nombre)}
        ${abmViewField('Estado disparador', n.estadoDisparador)}
        ${abmViewField('Tipo de envío de notificación', n.tipoEnvio || 'Email')}
        ${abmViewField('Dominio / Rol', `${n.dominio} / ${n.rol}`)}
        ${abmViewField('Emails', n.emails)}
        ${abmViewField('Mensaje', n.mensaje)}
        ${abmViewField('Notificación activa', n.activa ? 'Sí' : 'No')}
    `;
    openAbmDetailModal(`Ver detalle — ${n.nombre}`, body);
}
