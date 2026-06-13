function $(id) { return document.getElementById(id); }

function qs(sel) { return document.querySelector(sel); }

function qsa(sel) { return document.querySelectorAll(sel); }

function show(el) { if (typeof el === 'string') el = $(el); if (el) el.style.display = ''; }

function hide(el) { if (typeof el === 'string') el = $(el); if (el) el.style.display = 'none'; }

// Central init: fix topbar avatar to go to profile, set initials
document.addEventListener('DOMContentLoaded', function() {
    var user = JSON.parse(localStorage.getItem('currentUser'));
    if (!user) return;

    // Determine profile page based on current role
    var roleMap = {
        'utilisateur': 'user-profil.html',
        'technicien': 'technicien-profil.html',
        'ingenieur': 'ingenieur-profil.html',
        'chef': 'chef-profil.html'
    };
    var profilPage = roleMap[user.role] || 'user-profil.html';

    // Fix topbar avatar: go to profile instead of logout
    var avatar = $('topbarAvatar');
    if (avatar) {
        avatar.onclick = function() { window.location.href = profilPage; };
        avatar.title = 'Mon Profil';
        // Set initials
        var initials = user.name.split(' ').map(function(n) { return n[0]; }).join('').substring(0, 2).toUpperCase();
        avatar.textContent = initials;
    }

    // Set sidebar avatar initials + link
    var sAvatar = $('sidebarAvatar');
    if (sAvatar) {
        sAvatar.onclick = function() { window.location.href = profilPage; };
        sAvatar.style.cursor = 'pointer';
        sAvatar.title = 'Mon Profil';
    }
});
