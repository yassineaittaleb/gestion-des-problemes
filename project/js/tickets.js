function getTickets() {
    return JSON.parse(localStorage.getItem('tickets')) || [];
}

function saveTickets(tickets) {
    localStorage.setItem('tickets', JSON.stringify(tickets));
}

function createTicket(title, description, createdBy, type, level) {
    const tickets = getTickets();
    const ticket = {
        id: Date.now(),
        title: title,
        description: description,
        createdBy: createdBy,
        type: type,
        level: level,
        status: 'Ouvert',
        assignedTo: null,
        createdAt: new Date().toLocaleString('fr-FR'),
        priority: 'Moyenne'
    };
    tickets.push(ticket);
    saveTickets(tickets);
    return ticket;
}

function getTicketsByUser(username) {
    return getTickets().filter(t => t.createdBy === username);
}

function getOpenTickets() {
    return getTickets().filter(t => t.status === 'Ouvert');
}

function getTechnicianTickets(username) {
    return getTickets().filter(t => t.assignedTo === username && t.status !== 'Resolu');
}

function getEscalatedTickets() {
    return getTickets().filter(t => t.status === 'Escalade');
}

function takeTicket(ticketId, technician) {
    const tickets = getTickets();
    const ticket = tickets.find(t => t.id === ticketId);
    if (ticket) {
        ticket.status = 'En cours';
        ticket.assignedTo = technician;
        saveTickets(tickets);
    }
}

function resolveTicket(ticketId) {
    const tickets = getTickets();
    const ticket = tickets.find(t => t.id === ticketId);
    if (ticket) {
        ticket.status = 'Resolu';
        saveTickets(tickets);
    }
}

function escalateTicket(ticketId) {
    const tickets = getTickets();
    const ticket = tickets.find(t => t.id === ticketId);
    if (ticket) {
        ticket.status = 'Escalade';
        saveTickets(tickets);
    }
}

function getStatusBadge(status) {
    const colors = {
        'Ouvert': '#3498db',
        'En cours': '#f39c12',
        'Resolu': '#27ae60',
        'Escalade': '#e74c3c'
    };
    const labels = {
        'Ouvert': 'Ouvert',
        'En cours': 'En cours',
        'Resolu': 'Resolu',
        'Escalade': 'Escalade'
    };
    return '<span class="badge" style="background:' + (colors[status] || '#95a5a6') + '">' + (labels[status] || status) + '</span>';
}
