function seed() {
    if (localStorage.getItem('su')) return;
    var us = [
        { u: 'user1', p: 'pass123', r: 'user', n: 'Ahmed Benali' },
        { u: 'user2', p: 'pass123', r: 'user', n: 'Fatima Zahra' },
        { u: 'tech1', p: 'pass123', r: 'tech', n: 'Karim El Fassi' },
        { u: 'tech2', p: 'pass123', r: 'tech', n: 'Youssef Lamrani' }
    ];
    localStorage.setItem('su', JSON.stringify(us));

    if (!localStorage.getItem('st')) {
        var ts = [
            { id: 1, t: 'Problème connexion VPN', d: 'Impossible de se connecter au VPN.', cb: 'Ahmed Benali', cu: 'user1', tp: 'Réseau', pr: 'Haute', s: 'Ouvert', a: null, c: '01/06/2026 08:30' },
            { id: 2, t: 'Imprimante bloquée', d: "L'imprimante du bureau 203 ne fonctionne plus.", cb: 'Fatima Zahra', cu: 'user2', tp: 'Matériel', pr: 'Moyenne', s: 'Ouvert', a: null, c: '01/06/2026 09:15' },
            { id: 3, t: 'Application CRM plante', d: "L'application se ferme après 5 minutes.", cb: 'Ahmed Benali', cu: 'user1', tp: 'Logiciel', pr: 'Critique', s: 'Ouvert', a: null, c: '01/06/2026 10:00' },
            { id: 4, t: 'Mise à jour Adobe', d: 'Mettre à jour sur 5 postes.', cb: 'Fatima Zahra', cu: 'user2', tp: 'Logiciel', pr: 'Moyenne', s: 'En cours', a: 'Karim El Fassi', c: '31/05/2026 14:20' },
            { id: 5, t: 'Accès serveur refusé', d: 'Accès refusé pour le stagiaire.', cb: 'Ahmed Benali', cu: 'user1', tp: 'Réseau', pr: 'Haute', s: 'En cours', a: 'Youssef Lamrani', c: '31/05/2026 16:45' },
            { id: 6, t: 'Mot de passe expiré', d: 'Réinitialisation mot de passe Windows.', cb: 'Fatima Zahra', cu: 'user2', tp: 'Logiciel', pr: 'Basse', s: 'Résolu', a: 'Karim El Fassi', c: '30/05/2026 09:00' },
            { id: 7, t: 'Problème Outlook', d: 'Erreur SMTP - envoi impossible.', cb: 'Ahmed Benali', cu: 'user1', tp: 'Logiciel', pr: 'Haute', s: 'Résolu', a: 'Youssef Lamrani', c: '29/05/2026 11:30' },
            { id: 8, t: 'Panne serveur BD', d: 'Le serveur SQL ne répond plus.', cb: 'Ahmed Benali', cu: 'user1', tp: 'Serveur', pr: 'Critique', s: 'Escaladé', a: null, c: '01/06/2026 07:00' },
            { id: 9, t: 'Firewall bloque apps', d: 'Applications légitimes bloquées.', cb: 'Fatima Zahra', cu: 'user2', tp: 'Réseau', pr: 'Critique', s: 'Escaladé', a: null, c: '31/05/2026 18:00' },
            { id: 10, t: 'Installer logiciel compta', d: 'Installation sur le poste du chef.', cb: 'Fatima Zahra', cu: 'user2', tp: 'Logiciel', pr: 'Basse', s: 'Ouvert', a: null, c: '28/05/2026 15:10' }
        ];
        localStorage.setItem('st', JSON.stringify(ts));
    }
}

function login(u, p) {
    var us = JSON.parse(localStorage.getItem('su')) || [];
    var user = us.find(function(x) { return x.u === u && x.p === p; });
    if (user) {
        localStorage.setItem('scu', JSON.stringify(user));
        return user;
    }
    return null;
}

function cu() {
    return JSON.parse(localStorage.getItem('scu'));
}

function logout() {
    localStorage.removeItem('scu');
    window.location.href = 'index.html';
}

function ca() {
    var u = cu();
    if (!u) { window.location.href = 'index.html'; }
    return u;
}

function gts() {
    return JSON.parse(localStorage.getItem('st')) || [];
}

function sts(ts) {
    localStorage.setItem('st', JSON.stringify(ts));
}

function ct(t, d, tp, pr) {
    var u = cu();
    var ts = gts();
    var mx = ts.reduce(function(m, x) { return x.id > m ? x.id : m; }, 0);
    var n = new Date();
    var ds = n.toLocaleDateString('fr-FR') + ' ' + n.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
    ts.push({ id: mx + 1, t: t, d: d, cb: u.n, cu: u.u, tp: tp, pr: pr, s: 'Ouvert', a: null, c: ds });
    sts(ts);
}

function uts(id, s) {
    var ts = gts();
    var t = ts.find(function(x) { return x.id === id; });
    if (t) { t.s = s; sts(ts); }
}

function bdg(s) {
    var c = 'bdg bdg-b';
    if (s === 'Résolu' || s === 'Escaladé') c = 'bdg bdg-g';
    return '<span class="' + c + '">' + s + '</span>';
}

function pbdg(p) {
    var c = p === 'Critique' || p === 'Haute' ? 'bdg bdg-b' : 'bdg bdg-g';
    return '<span class="' + c + '">' + p + '</span>';
}

function rs(a) {
    var u = cu();
    if (!u) return;
    var ls = [
        { h: 'dashboard.html', l: 'Tableau de bord', i: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>' },
        { h: 'tickets.html', l: u.r === 'tech' ? 'Tous les tickets' : 'Mes réclamations', i: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>' }
    ];
    if (u.r === 'user') {
        ls.splice(1, 0, { h: 'creer.html', l: 'Nouvelle réclamation', i: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>' });
    }
    var h = '<div class="side-logo"><div class="lb">SG</div><span>SGRI</span></div><div class="side-nav">';
    ls.forEach(function(l) {
        h += '<a href="' + l.h + '"' + (a === l.h ? ' class="act"' : '') + '>' + l.i + l.l + '</a>';
    });
    h += '</div><div class="side-foot"><a href="#" onclick="logout()"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg> Déconnexion</a></div>';
    document.getElementById('side').innerHTML = h;
}

function tsb() {
    document.getElementById('side').classList.toggle('o');
}

seed();
