function seedUsers() {
    var existing = JSON.parse(localStorage.getItem('users') || '[]');
    if (existing.length >= 18) return;
    var users = [
        // Utilisateurs (15)
        { username: 'user1', password: 'pass123', role: 'utilisateur', name: 'Ahmed Benali', email: 'ahmed.benali@itconnect.ma', phone: '06 12 34 56 78', department: 'Comptabilité' },
        { username: 'user2', password: 'pass123', role: 'utilisateur', name: 'Fatima Zahra', email: 'fatima.zahra@itconnect.ma', phone: '06 23 45 67 89', department: 'RH' },
        { username: 'user3', password: 'pass123', role: 'utilisateur', name: 'Omar Yassine', email: 'omar.yassine@itconnect.ma', phone: '06 34 56 78 90', department: 'Marketing' },
        { username: 'user4', password: 'pass123', role: 'utilisateur', name: 'Mouna Tazi', email: 'mouna.tazi@itconnect.ma', phone: '06 45 67 89 01', department: 'Direction' },
        { username: 'user5', password: 'pass123', role: 'utilisateur', name: 'Rachid Fassi', email: 'rachid.fassi@itconnect.ma', phone: '06 56 78 90 12', department: 'Logistique' },
        { username: 'user6', password: 'pass123', role: 'utilisateur', name: 'Youssef Berrada', email: 'y.berrada@itconnect.ma', phone: '06 67 89 01 23', department: 'Finance' },
        { username: 'user7', password: 'pass123', role: 'utilisateur', name: 'Nadia Cherkaoui', email: 'n.cherkaoui@itconnect.ma', phone: '06 78 90 12 34', department: 'Juridique' },
        { username: 'user8', password: 'pass123', role: 'utilisateur', name: 'Mehdi Lahlou', email: 'm.lahlou@itconnect.ma', phone: '06 89 01 23 45', department: 'Production' },
        { username: 'user9', password: 'pass123', role: 'utilisateur', name: 'Karima Bennani', email: 'k.bennani@itconnect.ma', phone: '06 90 12 34 56', department: 'Commercial' },
        { username: 'user10', password: 'pass123', role: 'utilisateur', name: 'Hicham Tazi', email: 'h.tazi@itconnect.ma', phone: '06 01 23 45 67', department: 'R&D' },
        { username: 'user11', password: 'pass123', role: 'utilisateur', name: 'Leila Amrani', email: 'l.amrani@itconnect.ma', phone: '06 11 22 33 44', department: 'Support' },
        { username: 'user12', password: 'pass123', role: 'utilisateur', name: 'Amine Rifi', email: 'a.rifi@itconnect.ma', phone: '06 22 33 44 55', department: 'IT' },
        { username: 'user13', password: 'pass123', role: 'utilisateur', name: 'Samia Belhaj', email: 's.belhaj@itconnect.ma', phone: '06 33 44 55 66', department: 'Achats' },
        { username: 'user14', password: 'pass123', role: 'utilisateur', name: 'Driss Idrissi', email: 'd.idrissi@itconnect.ma', phone: '06 44 55 66 77', department: 'Maintenance' },
        { username: 'user15', password: 'pass123', role: 'utilisateur', name: 'Sara Ouazzani', email: 's.ouazzani@itconnect.ma', phone: '06 55 66 77 88', department: 'Qualité' },
        // Techniciens (5)
        { username: 'tech1', password: 'pass123', role: 'technicien', name: 'Karim El Fassi', email: 'karim.elfassi@itconnect.ma', phone: '06 61 23 45 67', department: 'Support IT', speciality: 'Réseaux' },
        { username: 'tech2', password: 'pass123', role: 'technicien', name: 'Youssef Lamrani', email: 'y.lamrani@itconnect.ma', phone: '06 62 34 56 78', department: 'Support IT', speciality: 'Hardware' },
        { username: 'tech3', password: 'pass123', role: 'technicien', name: 'Salim Haddaoui', email: 's.haddaoui@itconnect.ma', phone: '06 63 45 67 89', department: 'Support IT', speciality: 'Logiciel' },
        { username: 'tech4', password: 'pass123', role: 'technicien', name: 'Nabil Benkirane', email: 'n.benkirane@itconnect.ma', phone: '06 64 56 78 90', department: 'Support IT', speciality: 'Systèmes' },
        { username: 'tech5', password: 'pass123', role: 'technicien', name: 'Hassan Mansouri', email: 'h.mansouri@itconnect.ma', phone: '06 65 67 89 01', department: 'Support IT', speciality: 'Sécurité' },
        // Ingénieurs (2)
        { username: 'eng1', password: 'pass123', role: 'ingenieur', name: 'Zineb El Alaoui', email: 'z.elalaoui@itconnect.ma', phone: '06 71 23 45 67', department: 'Infrastructure', speciality: 'Architecture Réseau' },
        { username: 'eng2', password: 'pass123', role: 'ingenieur', name: 'Adil Chraibi', email: 'a.chraibi@itconnect.ma', phone: '06 72 34 56 78', department: 'Infrastructure', speciality: 'Bases de Données' },
        // Chef Département
        { username: 'chef1', password: 'pass123', role: 'chef', name: 'Hassan El Mansouri', email: 'hassan.elmansouri@itconnect.ma', phone: '06 81 23 45 67', department: 'IT', speciality: 'Management IT' }
    ];
    localStorage.setItem('users', JSON.stringify(users));
}

function seedTickets() {
    if (localStorage.getItem('tickets')) return;
    
    const types = ['Soft', 'Hard', 'Materiel'];
    const statuses = ['Ouvert', 'En cours', 'Resolu'];
    
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
        let status = statuses[Math.floor(Math.random() * statuses.length)];
        const title = titles[Math.floor(Math.random() * titles.length)] + ' #' + (i + 1);
        
        let assignedTo = null;
        if (status === 'En cours' || status === 'Resolu') {
            assignedTo = techs[Math.floor(Math.random() * techs.length)];
        }
        
        tickets.push({
            id: 1000 + i,
            title: title,
            description: 'Description générique pour ce problème signalé par l\'utilisateur. Vérification requise.',
            createdBy: authors[Math.floor(Math.random() * authors.length)],
            type: type,
            status: status,
            assignedTo: assignedTo,
            createdAt: createdAtDate.toLocaleString('fr-FR'),
            createdAtMs: createdAtDate.getTime()
        });
    }
    
    // Sort by descending created date
    tickets.sort((a, b) => b.createdAtMs - a.createdAtMs);
    
    localStorage.setItem('tickets', JSON.stringify(tickets));
}

function addUser(username, password, role, name, spec) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    if (users.find(u => u.username === username)) return false;
    
    var newUser = { username: username, password: password, role: role, name: name };
    if (spec) newUser.speciality = spec;
    
    users.push(newUser);
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
    window.location.href = '/project/';
}

function checkAuth(allowedRoles) {
    const user = getCurrentUser();
    if (!user) {
        window.location.href = '/project/';
        return null;
    }
    if (allowedRoles && !allowedRoles.includes(user.role)) {
        window.location.href = '/project/';
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

if (!localStorage.getItem('users')) seedUsers();
if (!localStorage.getItem('tickets')) seedTickets();
