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
    return getTickets().filter(t => t.assignedTo === username && t.status !== 'Résolu');
}

function getEscalatedTickets() {
    return getTickets().filter(t => t.status === 'Escaladé');
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
        ticket.status = 'Résolu';
        saveTickets(tickets);
    }
}

function escalateTicket(ticketId) {
    const tickets = getTickets();
    const ticket = tickets.find(t => t.id === ticketId);
    if (ticket) {
        ticket.status = 'Escaladé';
        saveTickets(tickets);
    }
}

function getStatusBadge(status) {
    const classes = {
        'Ouvert': 'badge-ouvert',
        'En cours': 'badge-en-cours',
        'Resolu': 'badge-resolu',
        'Escalade': 'badge-escalade'
    };
    const labels = {
        'Ouvert': 'Ouvert',
        'En cours': 'En cours',
        'Resolu': 'Resolu',
        'Escalade': 'Escalade'
    };
    return '<span class="badge ' + (classes[status] || '') + '">' + (labels[status] || status) + '</span>';
}

function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebarOverlay');
    if (!sidebar) return;
    if (window.innerWidth <= 820) {
        sidebar.classList.toggle('open');
        if (overlay) overlay.classList.toggle('active');
    } else {
        sidebar.classList.toggle('collapsed');
    }
}

// Simulation of dynamic data changes
setInterval(() => {
    const tickets = getTickets();
    if (!tickets.length) return;
    
    // Pick a random ticket
    const randomIndex = Math.floor(Math.random() * tickets.length);
    const t = tickets[randomIndex];
    
    let changed = false;
    
    if (t.status === 'Ouvert' && Math.random() > 0.5) {
        const techs = ['Karim El Fassi', 'Youssef Lamrani', 'Salim Haddaoui'];
        t.status = 'En cours';
        t.assignedTo = techs[Math.floor(Math.random() * techs.length)];
        changed = true;
    } else if (t.status === 'En cours' && Math.random() > 0.6) {
        t.status = 'Resolu';
        changed = true;
    }
    
    if (changed) {
        saveTickets(tickets);
        // Refresh UI if functions are available on the current dashboard
        if (typeof loadAllTickets === 'function') loadAllTickets();
        if (typeof loadMyTickets === 'function') loadMyTickets();
        if (typeof loadOpenTickets === 'function') loadOpenTickets();
        if (typeof loadProgressTickets === 'function') loadProgressTickets();
    }
}, 3000);

// -----------------------------------------------------
// MOCK DATA SEEDER
// -----------------------------------------------------
function seedTickets() {
    let tickets = JSON.parse(localStorage.getItem('tickets')) || [];
    if (tickets.length < 50) {
        console.log("Seeding Mock Tickets...");
        const statuses = ['Ouvert', 'En cours', 'Resolu', 'Escalade'];
        const types = ['Matériel', 'Logiciel', 'Réseau', 'Accès'];
        const levels = ['Normal', 'Élevé', 'Critique'];
        const creators = ['Hassan El Mansouri', 'Sara Alaoui', 'Amine Bennis', 'Utilisateur Test'];
        const techs = ['Karim El Fassi', 'Youssef Lamrani', 'Salim Haddaoui', 'Technicien Test'];
        
        let newTickets = [];
        const now = new Date();
        
        for (let i = 0; i < 150; i++) {
            const pastDays = Math.floor(Math.random() * 30);
            const d = new Date(now);
            d.setDate(d.getDate() - pastDays);
            
            const type = types[Math.floor(Math.random() * types.length)];
            const level = levels[Math.floor(Math.random() * levels.length)];
            const creator = creators[Math.floor(Math.random() * creators.length)];
            
            let status = statuses[Math.floor(Math.random() * statuses.length)];
            if (pastDays < 3 && Math.random() > 0.3) status = 'Ouvert';
            else if (pastDays > 10 && Math.random() > 0.2) status = 'Resolu';
            
            const assigned = (status !== 'Ouvert') ? techs[Math.floor(Math.random() * techs.length)] : null;
            
            newTickets.push({
                id: Date.now() - Math.floor(Math.random() * 100000) + i,
                title: 'Problème ' + type + ' - ' + Math.floor(Math.random() * 1000),
                description: 'Ceci est une description générée automatiquement pour un problème de type ' + type + '.',
                createdBy: creator,
                type: type,
                level: level,
                status: status,
                assignedTo: assigned,
                createdAt: d.toLocaleDateString('fr-FR', {day:'2-digit', month:'2-digit', year:'numeric'}) + ' ' + d.toLocaleTimeString('fr-FR'),
                priority: level === 'Critique' ? 'Haute' : 'Moyenne'
            });
        }
        
        newTickets.sort((a, b) => {
            const da = a.createdAt.split(' ')[0].split('/').reverse().join('');
            const db = b.createdAt.split(' ')[0].split('/').reverse().join('');
            return db.localeCompare(da);
        });
        
        localStorage.setItem('tickets', JSON.stringify(newTickets));
    }
}
seedTickets();

// -----------------------------------------------------
// DYNAMIC CHART GENERATOR
// -----------------------------------------------------
function drawActivityChart(containerId, tickets) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    const days = 30;
    const now = new Date();
    const counts = new Array(days).fill(0);
    
    tickets.forEach(t => {
        const parts = t.createdAt.split(' ')[0].split('/');
        if (parts.length === 3) {
            const tDate = new Date(parts[2], parts[1] - 1, parts[0]);
            const diffTime = now.getTime() - tDate.getTime();
            const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
            if (diffDays >= 0 && diffDays < days) {
                counts[days - 1 - diffDays]++;
            }
        }
    });
    
    const smooth = (arr, windowSize) => {
        const res = [];
        for (let i = 0; i < arr.length; i++) {
            let sum = 0; let count = 0;
            for (let j = Math.max(0, i - windowSize); j <= Math.min(arr.length - 1, i + windowSize); j++) {
                sum += arr[j]; count++;
            }
            res.push(sum / count);
        }
        return res;
    };
    
    const smoothedCounts = smooth(counts, 2);
    const maxVal = Math.max(...smoothedCounts, 5);
    
    const w = container.clientWidth || 800;
    const h = container.clientHeight || 250;
    
    const xStep = w / (days - 1);
    
    let pathD = `M 0,${h} `;
    let lineD = `M 0,${h - (smoothedCounts[0]/maxVal)*h*0.8} `;
    
    for (let i = 0; i < days; i++) {
        const x = i * xStep;
        const y = h - (smoothedCounts[i]/maxVal)*h*0.8;
        
        if (i === 0) {
            pathD += `L ${x},${y} `;
        } else {
            const prevX = (i - 1) * xStep;
            const prevY = h - (smoothedCounts[i - 1]/maxVal)*h*0.8;
            const cpX1 = prevX + (x - prevX) / 2;
            const cpX2 = prevX + (x - prevX) / 2;
            pathD += `C ${cpX1},${prevY} ${cpX2},${y} ${x},${y} `;
            lineD += `C ${cpX1},${prevY} ${cpX2},${y} ${x},${y} `;
        }
    }
    
    pathD += `L ${w},${h} Z`;
    
    container.innerHTML = `
    <svg width="100%" height="100%" viewBox="0 0 ${w} ${h}" preserveAspectRatio="none">
        <defs>
            <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="var(--primary)" stop-opacity="0.3"/>
                <stop offset="100%" stop-color="var(--primary)" stop-opacity="0.0"/>
            </linearGradient>
            <pattern id="grid" width="${w/6}" height="${h/4}" patternUnits="userSpaceOnUse">
                <path d="M ${w/6} 0 L 0 0 0 ${h/4}" fill="none" stroke="var(--border)" stroke-width="0.5"/>
            </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
        <path d="${pathD}" fill="url(#chartGrad)" />
        <path d="${lineD}" fill="none" stroke="var(--primary)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
        <text x="10" y="20" fill="var(--text-muted)" font-size="12" font-family="sans-serif">${Math.round(maxVal)}</text>
        <text x="10" y="${h/2 + 5}" fill="var(--text-muted)" font-size="12" font-family="sans-serif">${Math.round(maxVal/2)}</text>
    </svg>
    `;
}

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        drawActivityChart('activityChart', getTickets());
    }, 100);
});
