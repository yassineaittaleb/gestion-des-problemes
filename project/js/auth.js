function seedUsers() {
    if (localStorage.getItem('users')) return;
    const users = [
        { username: 'user1', password: 'pass123', role: 'utilisateur', name: 'Ahmed Benali' },
        { username: 'user2', password: 'pass123', role: 'utilisateur', name: 'Fatima Zahra' },
        { username: 'user3', password: 'pass123', role: 'utilisateur', name: 'Omar Yassine' },
        { username: 'user4', password: 'pass123', role: 'utilisateur', name: 'Mouna Tazi' },
        { username: 'user5', password: 'pass123', role: 'utilisateur', name: 'Rachid Fassi' },
        { username: 'tech1', password: 'pass123', role: 'technicien', name: 'Karim El Fassi' },
        { username: 'tech2', password: 'pass123', role: 'technicien', name: 'Youssef Lamrani' },
        { username: 'tech3', password: 'pass123', role: 'technicien', name: 'Salim Haddaoui' },
        { username: 'eng1', password: 'pass123', role: 'ingenieur', name: 'Sara Ouazzani' },
        { username: 'chef1', password: 'pass123', role: 'chef', name: 'Hassan El Mansouri' },
    ];
    localStorage.setItem('users', JSON.stringify(users));
}

function seedTickets() {
    if (localStorage.getItem('tickets')) return;
    
    const types = ['Soft', 'Hard', 'Materiel'];
    const levels = ['Normal', 'Eleve'];
    const statuses = ['Ouvert', 'En cours', 'Resolu', 'Escalade'];
    const priorities = ['Basse', 'Moyenne', 'Haute', 'Critique'];
    
    const titles = [
        'Problème de connexion VPN', 'Imprimante réseau bloquée', 'Application CRM plante', 
        'Mise à jour Adobe', 'Accès serveur refusé', 'Mot de passe expiré', 'Problème Outlook',
        'Installer Zoom', 'Panne serveur base données', 'Règle firewall bloque apps',
        'Ecran bleu au démarrage', 'Clavier défectueux', 'Souris ne répond pas',
        'Connexion lente', 'Plus de wifi', 'Erreur système 404', 'Disque dur plein',
        'Logiciel métier figé', 'Micro ne marche plus en visio', 'Webcam hors service'
    ];
    
    const authors = ['Ahmed Benali', 'Fatima Zahra', 'Omar Yassine', 'Mouna Tazi', 'Rachid Fassi'];
    const techs = ['Karim El Fassi', 'Youssef Lamrani', 'Salim Haddaoui'];
    
    const tickets = [];
    const now = Date.now();
    
    for (let i = 0; i < 200; i++) {
        // Random date within the last 30 days
        const randomTimeOffset = Math.floor(Math.random() * 30 * 24 * 60 * 60 * 1000);
        const createdAtDate = new Date(now - randomTimeOffset);
        
        const type = types[Math.floor(Math.random() * types.length)];
        const level = levels[Math.floor(Math.random() * levels.length)];
        let status = statuses[Math.floor(Math.random() * statuses.length)];
        const priority = priorities[Math.floor(Math.random() * priorities.length)];
        const title = titles[Math.floor(Math.random() * titles.length)] + ' #' + (i + 1);
        
        let assignedTo = null;
        if (status === 'En cours' || status === 'Resolu') {
            assignedTo = techs[Math.floor(Math.random() * techs.length)];
        } else if (status === 'Escalade') {
            assignedTo = null; // En attente ingénieur
        }
        
        tickets.push({
            id: 1000 + i,
            title: title,
            description: 'Description générique pour ce problème signalé par l\'utilisateur. Vérification requise.',
            createdBy: authors[Math.floor(Math.random() * authors.length)],
            type: type,
            level: level,
            status: status,
            assignedTo: assignedTo,
            createdAt: createdAtDate.toLocaleString('fr-FR'),
            createdAtMs: createdAtDate.getTime(),
            priority: priority
        });
    }
    
    // Sort by descending created date
    tickets.sort((a, b) => b.createdAtMs - a.createdAtMs);
    
    localStorage.setItem('tickets', JSON.stringify(tickets));
}

function addUser(username, password, role, name) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    if (users.find(u => u.username === username)) return false;
    users.push({ username, password, role, name });
    localStorage.setItem('users', JSON.stringify(users));
    return true;
}

function login(username, password) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        return user;
    }
    return null;
}

function getCurrentUser() {
    return JSON.parse(localStorage.getItem('currentUser'));
}

function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = '../index.html';
}

function checkAuth(allowedRoles) {
    const user = getCurrentUser();
    if (!user) {
        window.location.href = '../index.html';
        return null;
    }
    if (allowedRoles && !allowedRoles.includes(user.role)) {
        window.location.href = '../index.html';
        return null;
    }
    return user;
}

const roleInfo = {
    utilisateur: { label: 'Utilisateur', icon: '👤', dashboard: 'user-dashboard.html' },
    technicien: { label: 'Technicien', icon: '🛠️', dashboard: 'technicien-dashboard.html' },
    ingenieur: { label: 'Ingénieur', icon: '💻', dashboard: 'ingenieur-dashboard.html' },
    chef: { label: 'Chef de Service', icon: '👔', dashboard: 'chef-dashboard.html' },
};

let selectedRole = null;

function showRoleStep() {
    document.getElementById('homeStep').style.display = 'none';
    document.getElementById('authContainer').style.display = '';
}

function backToHome() {
    document.getElementById('authContainer').style.display = 'none';
    document.getElementById('homeStep').style.display = '';
    document.getElementById('roleStep').style.display = '';
    document.getElementById('loginStep').style.display = 'none';
    document.querySelectorAll('.role-card-new').forEach(c => c.classList.remove('active'));
    selectedRole = null;
    document.getElementById('loginError').textContent = '';
}

function selectRole(role) {
    selectedRole = role;
    document.querySelectorAll('.role-card-new').forEach(c => c.classList.remove('active'));
    document.querySelector(`.role-card-new[data-role="${role}"]`).classList.add('active');

    document.getElementById('roleStep').style.display = 'none';
    document.getElementById('loginStep').style.display = '';

    document.getElementById('selectedRoleLabel').textContent = roleInfo[role].label;
    document.getElementById('loginError').textContent = '';
}

function backToRoles() {
    selectedRole = null;
    document.getElementById('roleStep').style.display = '';
    document.getElementById('loginStep').style.display = 'none';
    document.querySelectorAll('.role-card-new').forEach(c => c.classList.remove('active'));
    document.getElementById('loginError').textContent = '';
}

function handleLogin(e) {
    e.preventDefault();
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    const errorEl = document.getElementById('loginError');

    if (!selectedRole) { errorEl.textContent = 'Veuillez sélectionner un rôle.'; return; }
    if (!username || !password) { errorEl.textContent = 'Veuillez remplir tous les champs.'; return; }

    const user = login(username, password);

    if (user) {
        if (user.role !== selectedRole) {
            errorEl.textContent = 'Cet identifiant ne correspond pas au rôle sélectionné.';
            return;
        }
        window.location.href = 'pages/' + roleInfo[user.role].dashboard;
    } else {
        errorEl.textContent = 'Identifiants incorrects. Essayez: user1/pass123';
    }
}

function getCurrentUserName() {
    const user = getCurrentUser();
    return user ? user.name : '';
}

function getCurrentUserRole() {
    const user = getCurrentUser();
    return user ? user.role : '';
}

localStorage.removeItem('users');
localStorage.removeItem('tickets');
seedUsers();
seedTickets();
