function seedUsers() {
    if (localStorage.getItem('users')) return;
    const users = [
        { username: 'user1', password: 'pass123', role: 'utilisateur', name: 'Ahmed Benali' },
        { username: 'user2', password: 'pass123', role: 'utilisateur', name: 'Fatima Zahra' },
        { username: 'tech1', password: 'pass123', role: 'technicien', name: 'Karim El Fassi' },
        { username: 'tech2', password: 'pass123', role: 'technicien', name: 'Youssef Lamrani' },
        { username: 'eng1', password: 'pass123', role: 'ingenieur', name: 'Sara Ouazzani' },
        { username: 'chef1', password: 'pass123', role: 'chef', name: 'Hassan El Mansouri' },
    ];
    localStorage.setItem('users', JSON.stringify(users));
}

function seedTickets() {
    if (localStorage.getItem('tickets')) return;
    const tickets = [
        { id: 1001, title: 'Problème de connexion VPN', description: 'Impossible de se connecter au VPN depuis mon poste à distance.', createdBy: 'Ahmed Benali', type: 'Soft', level: 'Eleve', status: 'Ouvert', assignedTo: null, createdAt: '01/06/2026 08:30', priority: 'Haute' },
        { id: 1002, title: 'Imprimante réseau bloquée', description: 'L\'imprimante du bureau 203 n\'imprime plus et affiche une erreur papier.', createdBy: 'Fatima Zahra', type: 'Materiel', level: 'Normal', status: 'Ouvert', assignedTo: null, createdAt: '01/06/2026 09:15', priority: 'Moyenne' },
        { id: 1003, title: 'Application CRM plante', description: 'L\'application CRM se ferme automatiquement après 5 minutes d\'utilisation.', createdBy: 'Ahmed Benali', type: 'Soft', level: 'Eleve', status: 'Ouvert', assignedTo: null, createdAt: '01/06/2026 10:00', priority: 'Critique' },
        { id: 1004, title: 'Mise à jour Adobe', description: 'Besoin de mettre à jour la suite Adobe sur 5 postes du service compta.', createdBy: 'Fatima Zahra', type: 'Soft', level: 'Normal', status: 'En cours', assignedTo: 'Karim El Fassi', createdAt: '31/05/2026 14:20', priority: 'Moyenne' },
        { id: 1005, title: 'Accès serveur refusé', description: 'Accès refusé au répertoire partagé \\\\serveur\\docs pour le nouveau stagiaire.', createdBy: 'Ahmed Benali', type: 'Hard', level: 'Eleve', status: 'En cours', assignedTo: 'Youssef Lamrani', createdAt: '31/05/2026 16:45', priority: 'Haute' },
        { id: 1006, title: 'Mot de passe expiré', description: 'Réinitialisation du mot de passe Windows pour l\'utilisateur du bureau 105.', createdBy: 'Fatima Zahra', type: 'Soft', level: 'Normal', status: 'Resolu', assignedTo: 'Karim El Fassi', createdAt: '30/05/2026 09:00', priority: 'Basse' },
        { id: 1007, title: 'Problème Outlook', description: 'Les emails Outlook ne s\'envoient pas, erreur de connexion au serveur SMTP.', createdBy: 'Ahmed Benali', type: 'Soft', level: 'Normal', status: 'Resolu', assignedTo: 'Youssef Lamrani', createdAt: '29/05/2026 11:30', priority: 'Haute' },
        { id: 1008, title: 'Installer Zoom', description: 'Installation de Zoom sur le poste de la réception pour les réunions clients.', createdBy: 'Fatima Zahra', type: 'Soft', level: 'Normal', status: 'Resolu', assignedTo: 'Karim El Fassi', createdAt: '28/05/2026 15:10', priority: 'Basse' },
        { id: 1009, title: 'Panne serveur base données', description: 'Le serveur SQL ne répond plus depuis la mise à jour nocturne. Toute l\'équipe est bloquée.', createdBy: 'Ahmed Benali', type: 'Hard', level: 'Eleve', status: 'Escalade', assignedTo: null, createdAt: '01/06/2026 07:00', priority: 'Critique' },
        { id: 1010, title: 'Règle firewall bloque apps', description: 'Le pare-feu bloque des applications légitimes après la dernière mise à jour de sécurité.', createdBy: 'Fatima Zahra', type: 'Soft', level: 'Eleve', status: 'Escalade', assignedTo: null, createdAt: '31/05/2026 18:00', priority: 'Critique' },
    ];
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
    document.querySelectorAll('.role-card').forEach(c => c.classList.remove('active'));
    selectedRole = null;
    document.getElementById('loginError').textContent = '';
}

function selectRole(role) {
    selectedRole = role;
    document.querySelectorAll('.role-card').forEach(c => c.classList.remove('active'));
    document.querySelector(`.role-card[data-role="${role}"]`).classList.add('active');

    document.getElementById('roleStep').style.display = 'none';
    document.getElementById('loginStep').style.display = '';

    document.getElementById('selectedRoleLabel').textContent = '- ' + roleInfo[role].label;
    document.getElementById('selectedRoleIcon').textContent = roleInfo[role].icon;
    document.getElementById('loginError').textContent = '';
}

function backToRoles() {
    selectedRole = null;
    document.getElementById('roleStep').style.display = '';
    document.getElementById('loginStep').style.display = 'none';
    document.querySelectorAll('.role-card').forEach(c => c.classList.remove('active'));
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

seedUsers();
seedTickets();
