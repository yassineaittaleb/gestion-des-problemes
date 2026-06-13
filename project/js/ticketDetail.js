/* Ticket Detail Panel - Shared across all dashboards */
(function() {
    // Inject overlay HTML once
    var overlay = document.createElement('div');
    overlay.className = 'ticket-detail-overlay';
    overlay.id = 'ticketDetailOverlay';
    overlay.innerHTML = '<div class="ticket-detail-panel" id="ticketDetailPanel"></div>';
    overlay.addEventListener('click', function(e) {
        if (e.target === overlay) closeTicketDetail();
    });
    document.body.appendChild(overlay);

    window.closeTicketDetail = function() {
        overlay.classList.remove('active');
    };

    window.openTicketDetail = function(ticketId, actionButtons) {
        var tickets = getTickets();
        var t = tickets.find(function(x){ return x.id === ticketId; });
        if (!t) return;

        var initials = t.createdBy.split(' ').map(function(n){return n[0];}).join('').substring(0,2).toUpperCase();
        var colors = ['#b91c1c','#2563eb','#7c3aed','#d97706','#16a34a'];
        var bgColor = colors[Math.abs(t.id) % colors.length];
        var typeIcons = {
            Soft: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>',
            Hard: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/></svg>',
            Materiel: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4"/></svg>'
        };
        var typeLabels = { Soft: 'LOGICIEL', Hard: 'HARDWARE', Materiel: 'MATÉRIEL' };

        var html = '';
        // Header
        html += '<div class="td-header"><div style="flex:1; padding-right:1rem;">';
        html += '<div class="td-category">' + (typeIcons[t.type] || '') + ' ' + (typeLabels[t.type] || t.type) + '</div>';
        html += '<h2 class="td-title">' + t.title + '</h2>';
        html += '<div class="td-meta">' + getStatusBadge(t.status) + ' <span>par ' + t.createdBy + '</span></div>';
        html += '<div class="td-tags">';
        html += '<span class="td-tag">' + t.type + '</span>';
        html += '<span class="td-tag">' + t.level + '</span>';
        if (t.priority) html += '<span class="td-tag">' + t.priority + '</span>';
        html += '</div>';
        html += '</div>';
        html += '<button class="td-close" onclick="closeTicketDetail()"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button>';
        html += '</div>';

        // Actions (like the reference - Modifier / Supprimer style)
        if (actionButtons) {
            var actHtml = actionButtons(t);
            if (actHtml) html += '<div class="td-actions">' + actHtml + '</div>';
        }

        // Info grid
        html += '<div class="td-info-grid">';
        html += '<div class="td-info-item"><div class="td-info-label"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg> CRÉÉ PAR</div><div class="td-info-value">' + t.createdBy + '</div></div>';
        html += '<div class="td-info-item"><div class="td-info-label"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg> DATE</div><div class="td-info-value">' + t.createdAt.split(' ')[0] + '</div></div>';
        html += '<div class="td-info-item"><div class="td-info-label"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg> NIVEAU</div><div class="td-info-value">' + t.level + '</div></div>';
        html += '<div class="td-info-item"><div class="td-info-label"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg> ASSIGNÉ À</div><div class="td-info-value">' + (t.assignedTo || '—') + '</div></div>';
        html += '</div>';

        // Description
        html += '<div class="td-desc"><h4>À propos de ce ticket</h4><p>' + t.description + '</p></div>';

        document.getElementById('ticketDetailPanel').innerHTML = html;
        overlay.classList.add('active');
    };
})();
