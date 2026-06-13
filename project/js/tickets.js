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
    tickets.unshift(ticket);
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
        const types = ['Soft', 'Hard', 'Materiel'];
        const levels = ['Normal', 'Eleve'];
        const priorities = ['Basse', 'Moyenne', 'Haute', 'Critique'];
        const creators = ['Ahmed Benali', 'Fatima Zahra', 'Omar Yassine', 'Mouna Tazi', 'Rachid Fassi'];
        const techs = ['Karim El Fassi', 'Youssef Lamrani', 'Salim Haddaoui'];
        const titles = [
            'Problème de connexion VPN', 'Imprimante réseau bloquée', 'Application CRM plante',
            'Mise à jour Adobe', 'Accès serveur refusé', 'Mot de passe expiré', 'Problème Outlook',
            'Installer Zoom', 'Panne serveur', 'Règle firewall bloque apps',
            'Ecran bleu au démarrage', 'Clavier défectueux', 'Souris ne répond pas',
            'Connexion lente', 'Plus de wifi', 'Erreur système 404', 'Disque dur plein',
            'Logiciel métier figé', 'Micro ne marche plus', 'Webcam hors service'
        ];
        
        let newTickets = [];
        const now = new Date();
        
        for (let i = 0; i < 150; i++) {
            const pastDays = Math.floor(Math.random() * 30);
            const d = new Date(now);
            d.setDate(d.getDate() - pastDays);
            
            const type = types[Math.floor(Math.random() * types.length)];
            const level = levels[Math.floor(Math.random() * levels.length)];
            const priority = priorities[Math.floor(Math.random() * priorities.length)];
            const creator = creators[Math.floor(Math.random() * creators.length)];
            const title = titles[Math.floor(Math.random() * titles.length)] + ' #' + (i + 1);
            
            let status = statuses[Math.floor(Math.random() * statuses.length)];
            if (pastDays < 3 && Math.random() > 0.3) status = 'Ouvert';
            else if (pastDays > 10 && Math.random() > 0.2) status = 'Resolu';
            
            const assigned = (status !== 'Ouvert') ? techs[Math.floor(Math.random() * techs.length)] : null;
            
            newTickets.push({
                id: Date.now() - Math.floor(Math.random() * 100000) + i,
                title: title,
                description: 'Description du problème: ' + title,
                createdBy: creator,
                type: type,
                level: level,
                status: status,
                assignedTo: assigned,
                createdAt: d.toLocaleDateString('fr-FR', {day:'2-digit', month:'2-digit', year:'numeric'}) + ' ' + d.toLocaleTimeString('fr-FR'),
                priority: priority
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

// Force reseed for rich data
(function() {
    var t = JSON.parse(localStorage.getItem('tickets') || '[]');
    if (t.length < 200 || !t[0].priority || t[0].type === 'Matériel') {
        localStorage.removeItem('tickets');
    }
})();

// -----------------------------------------------------
// RICH MOCK DATA SEEDER
// -----------------------------------------------------
function seedTickets() {
    var tickets = JSON.parse(localStorage.getItem('tickets') || '[]');
    if (tickets.length >= 200) return;
    console.log("Seeding Rich Mock Data...");

    var statuses = ['Ouvert', 'En cours', 'Resolu', 'Escalade'];
    var types = ['Soft', 'Hard', 'Materiel'];
    var levels = ['Normal', 'Eleve'];
    var priorities = ['Basse', 'Moyenne', 'Haute', 'Critique'];

    var creators = [
        'Ahmed Benali', 'Fatima Zahra', 'Omar Yassine', 'Mouna Tazi', 'Rachid Fassi',
        'Sara Ouazzani', 'Youssef Berrada', 'Nadia Cherkaoui', 'Mehdi Lahlou', 'Karima Bennani',
        'Hicham Tazi', 'Leila Amrani', 'Amine Rifi', 'Samia Belhaj', 'Driss Idrissi'
    ];

    var techs = ['Karim El Fassi', 'Youssef Lamrani', 'Salim Haddaoui', 'Nabil Benkirane', 'Hassan Mansouri'];

    var softTitles = [
        'Application CRM plante au démarrage', 'Mise à jour Adobe Reader bloquée', 'Outlook ne synchronise plus',
        'Erreur lors de l\'export Excel', 'Licence Microsoft Office expirée', 'Installation Zoom impossible',
        'VPN ne se connecte pas', 'Navigateur Chrome figé', 'Antivirus bloque l\'application métier',
        'SAP erreur connexion base de données', 'Teams ne charge plus les réunions', 'Firefox crash fréquent',
        'Problème de synchronisation OneDrive', 'Erreur de mise à jour Windows', 'Application comptable gelée',
        'Accès SharePoint refusé', 'Power BI ne charge pas les données', 'Erreur 503 intranet',
        'Plugin Outlook défaillant', 'Logiciel de paie affiche erreur'
    ];

    var hardTitles = [
        'Écran bleu au démarrage du PC', 'Imprimante réseau hors service', 'Clavier défectueux poste P-003',
        'Souris sans fil ne répond plus', 'Disque dur saturé à 98%', 'Ventilateur PC fait du bruit',
        'Port USB ne fonctionne plus', 'Écran scintille périodiquement', 'Batterie laptop ne charge plus',
        'Casque audio grésille', 'Webcam flou permanent', 'Scanner ne détecte plus les documents',
        'PC redémarre tout seul', 'RAM insuffisante pour le poste', 'Carte graphique artefacts visuels'
    ];

    var materielTitles = [
        'Câble réseau endommagé bureau 204', 'Routeur WiFi en panne salle réunion', 'Switch réseau saturé étage 3',
        'Demande nouveau moniteur 27 pouces', 'Remplacement chaise ergonomique', 'Installation projecteur salle B',
        'Téléphone IP ne sonne plus', 'Câblage réseau nouveau bureau', 'Onduleur salle serveur HS',
        'Demande de dock station USB-C', 'Multiprise défectueuse bureau 112', 'Climatisation salle serveur en panne',
        'Badge d\'accès ne fonctionne plus', 'Demande casque Bluetooth', 'Remplacement câble HDMI cassé'
    ];

    var softDescs = [
        'L\'application se fige lors du chargement et affiche un message d\'erreur critique. Le problème persiste après redémarrage.',
        'Impossible de mettre à jour le logiciel. L\'installateur affiche une erreur de compatibilité avec la version actuelle du système.',
        'Le logiciel ne répond plus après la dernière mise à jour Windows. Tous les utilisateurs du département sont affectés.',
        'Erreur de synchronisation avec le serveur principal. Les données ne sont plus à jour depuis 48 heures.',
        'La licence a expiré et l\'application refuse de démarrer. Besoin d\'un renouvellement urgent pour continuer le travail.',
        'L\'installation échoue à chaque tentative. L\'erreur mentionne des permissions insuffisantes sur le répertoire système.',
        'Connexion VPN impossible depuis le bureau. Le client affiche "Délai d\'attente dépassé" après 30 secondes.',
        'Le navigateur consomme 4 Go de RAM et gèle le poste de travail. Plusieurs onglets restent bloqués.'
    ];

    var hardDescs = [
        'L\'écran affiche un écran bleu avec le code d\'erreur IRQL_NOT_LESS_OR_EQUAL. Le PC redémarre en boucle.',
        'L\'imprimante est détectée mais n\'imprime rien. La file d\'attente reste bloquée avec des documents en erreur.',
        'Plusieurs touches du clavier ne répondent plus. Le problème a commencé après un déversement de café.',
        'Le disque dur est quasiment plein. Les performances du poste sont très dégradées et les applications crashent.',
        'Le ventilateur fait un bruit anormal depuis une semaine. Le PC surchauffe et s\'éteint périodiquement.',
        'L\'écran scintille toutes les 5 secondes rendant le travail impossible. Le problème apparaît sur tous les logiciels.',
        'Le PC redémarre sans avertissement environ 3 fois par jour. Aucune erreur visible dans les logs Windows.',
        'La batterie du laptop ne dépasse plus 15% de charge. Le portable ne fonctionne que branché sur secteur.'
    ];

    var materielDescs = [
        'Le câble réseau est physiquement endommagé et provoque des déconnexions intermittentes du réseau.',
        'Le routeur WiFi est en panne complète. Aucun signal détecté dans la zone couverte. Remplacement nécessaire.',
        'Le switch est saturé avec tous les ports utilisés. Besoin d\'un switch supplémentaire pour les nouveaux postes.',
        'Demande de moniteur supplémentaire pour une configuration double écran. Résolution minimum 2K requise.',
        'L\'onduleur de la salle serveur ne maintient plus la charge. Risque de perte de données en cas de coupure.',
        'Le badge d\'accès est démagnétisé et ne fonctionne plus sur aucun lecteur du bâtiment. Besoin de remplacement.',
        'Le téléphone IP n\'émet plus de sonnerie et l\'afficheur reste noir. Le réseau PoE fonctionne normalement.',
        'Installation de câblage réseau Cat6 nécessaire pour le nouveau bureau au 3ème étage.'
    ];

    var newTickets = [];
    var now = new Date();

    for (var i = 0; i < 220; i++) {
        var pastDays = Math.floor(Math.random() * 60);
        var d = new Date(now);
        d.setDate(d.getDate() - pastDays);
        d.setHours(Math.floor(Math.random() * 10) + 8, Math.floor(Math.random() * 60), 0);

        var type = types[Math.floor(Math.random() * types.length)];
        var level = levels[Math.floor(Math.random() * levels.length)];
        var priority = priorities[Math.floor(Math.random() * priorities.length)];
        var creator = creators[Math.floor(Math.random() * creators.length)];

        var titles, descs;
        if (type === 'Soft') { titles = softTitles; descs = softDescs; }
        else if (type === 'Hard') { titles = hardTitles; descs = hardDescs; }
        else { titles = materielTitles; descs = materielDescs; }

        var title = titles[Math.floor(Math.random() * titles.length)];
        var desc = descs[Math.floor(Math.random() * descs.length)];

        var status;
        if (pastDays < 2) status = Math.random() > 0.2 ? 'Ouvert' : 'En cours';
        else if (pastDays < 7) status = statuses[Math.floor(Math.random() * statuses.length)];
        else if (pastDays < 20) status = Math.random() > 0.3 ? 'Resolu' : (Math.random() > 0.5 ? 'En cours' : 'Escalade');
        else status = Math.random() > 0.15 ? 'Resolu' : 'Escalade';

        var assigned = (status !== 'Ouvert') ? techs[Math.floor(Math.random() * techs.length)] : null;

        // Give high priority to escalated
        if (status === 'Escalade' && Math.random() > 0.4) priority = 'Critique';
        if (status === 'Escalade') level = 'Eleve';

        newTickets.push({
            id: 1700000000000 + i * 1000 + Math.floor(Math.random() * 999),
            title: title,
            description: desc,
            createdBy: creator,
            type: type,
            level: level,
            status: status,
            assignedTo: assigned,
            createdAt: d.toLocaleDateString('fr-FR', {day:'2-digit', month:'2-digit', year:'numeric'}) + ' ' + d.toLocaleTimeString('fr-FR', {hour:'2-digit', minute:'2-digit'}),
            priority: priority
        });
    }

    newTickets.sort(function(a, b) {
        var da = a.createdAt.split(' ')[0].split('/').reverse().join('');
        var db = b.createdAt.split(' ')[0].split('/').reverse().join('');
        return db.localeCompare(da);
    });

    localStorage.setItem('tickets', JSON.stringify(newTickets));
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
