# Projet : Gestion des Problèmes — Système de Tickets Helpdesk IT

## Stack

HTML/CSS/JS Vanilla, stockage localStorage (pas de backend, pas de base de données).

## Rôles (4)

| Rôle | Dashboard |
|---|---|
| **Utilisateur** | `user-dashboard.html` |
| **Technicien** | `technicien-dashboard.html` |
| **Ingénieur** | `ingenieur-dashboard.html` |
| **Chef de Service** | `chef-dashboard.html` |

## Comptes de démonstration (seed)

Tous les mots de passe : `pass123`

| Username | Rôle | Nom |
|---|---|---|
| `user1` | utilisateur | Ahmed Benali |
| `user2` | utilisateur | Fatima Zahra |
| `tech1` | technicien | Karim El Fassi |
| `tech2` | technicien | Youssef Lamrani |
| `eng1` | ingenieur | Sara Ouazzani |
| `chef1` | chef | Hassan El Mansouri |

## Structure des fichiers

```
gestion-des-problemes/
  index.html                          # Redirection vers project/
  project/
    index.html                        # Landing page + Authentification
    helpdesk-flow.html                # Diagramme du flux
    css/
      style.css                       # Tous les styles (1405 lignes)
    js/
      auth.js                         # Authentification (seed, login, logout, checkAuth)
      main.js                         # Utilitaires ($, show, hide, qs, qsa)
      tickets.js                      # CRUD tickets (create, take, resolve, escalate)
    pages/
      dashboard.html                  # Redirection vers le dashboard du rôle connecté
      user-dashboard.html             # Dashboard Utilisateur
      technicien-dashboard.html       # Dashboard Technicien
      ingenieur-dashboard.html        # Dashboard Ingénieur
      chef-dashboard.html             # Dashboard Chef de Service
      reclamations.html               # Liste globale des tickets
      utilisateurs.html               # Gestion des utilisateurs
      postes.html                     # Liste des postes de travail
```

---

## UTILISATEUR (`user-dashboard.html`)

### Menu latéral
- Tableau de Bord
- Déconnexion

### Contenu
| Section | Éléments |
|---|---|
| **En-tête** | Message de bienvenue personnalisé |
| **3 cartes statistiques** | Total des tickets · Ouverts / En cours · Résolus |
| **Bouton d'action** | **Créer un Ticket** → ouvre un modal |
| **Tableau "Mes Tickets"** | Colonnes : ID, Titre, Type, Niveau, Statut (badge coloré), Date, Assigné à |

### Modal "Créer un Ticket"
- Champ : Titre
- Sélecteur : Type (Soft / Hard / Matériel)
- Sélecteur : Niveau (Normal / Élevé)
- Sélecteur : Priorité (Basse / Moyenne / Haute / Critique)
- Zone de texte : Description
- Bouton : **Soumettre le Ticket**

### Capacités
- Créer un nouveau ticket
- Voir la liste de ses tickets
- Suivre l'évolution du statut (Ouvert → En cours → Résolu)

---

## TECHNICIEN (`technicien-dashboard.html`)

### Menu latéral
- Tableau de Bord
- Réclamations
- Déconnexion

### Contenu du dashboard
| Section | Éléments |
|---|---|
| **En-tête** | Message de bienvenue personnalisé |
| **3 cartes statistiques** | Tickets Ouverts · En Cours · Résolus |
| **Tableau "Tickets Ouverts"** | ID, Titre, Type, Niveau, Date → bouton **Prendre** |
| **Tableau "Mes Tickets en Cours"** | ID, Titre, Type, Niveau, Statut (badge), Date → boutons **Résoudre** (si Niveau Normal) / **Transférer** (escalade vers ingénieur) |

### Page : Réclamations (`reclamations.html`)
- **3 cartes stats** : Total, Ouverts, Résolus
- **Champ de recherche** : filtre en temps réel par titre, description, auteur, ID
- **Tableau** : ID, Titre, Auteur, Statut, Date

### Capacités
- Voir tous les tickets ouverts
- **Prendre** un ticket ouvert (l'assigner à soi-même, passe en "En cours")
- **Résoudre** un ticket de niveau Normal (passe en "Résolu")
- **Transférer** un ticket de niveau Élevé vers un ingénieur (passe en "Escaladé")
- Rechercher dans tous les tickets

---

## INGÉNIEUR (`ingenieur-dashboard.html`)

### Menu latéral
- Tableau de Bord
- Utilisateurs
- Réclamations
- Déconnexion

### Contenu du dashboard
| Section | Éléments |
|---|---|
| **En-tête** | Message de bienvenue personnalisé |
| **3 cartes statistiques** | Escalades · Résolus · Total Tickets |
| **Tableau "Tickets Escaladés"** | ID, Titre, Créé par, Type, Niveau, Date → bouton **Résoudre** |
| **Tableau "Tous les Tickets"** | Read-only : ID, Titre, Créé par, Type, Niveau, Statut (badge) |

### Page : Utilisateurs (`utilisateurs.html`)
- **Tableau** : Liste des utilisateurs (Nom, Username, Rôle avec badge coloré)
- **Bouton** : **Ajouter Technicien** → modal (Nom complet, Nom d'utilisateur, Mot de passe → **Ajouter**)

### Page : Réclamations (`reclamations.html`)
- Identique au Technicien

### Capacités
- Résoudre les tickets escaladés
- Voir tous les tickets du système
- Lister les utilisateurs
- Ajouter des techniciens

---

## CHEF DE SERVICE (`chef-dashboard.html`)

### Menu latéral
- Tableau de Bord
- Utilisateurs
- Réclamations
- Déconnexion

### Contenu du dashboard
| Section | Éléments |
|---|---|
| **En-tête** | Message de bienvenue personnalisé |
| **10 cartes statistiques** | Utilisateurs · Techniciens · Ingénieurs · Total Tickets · Ouverts · En Cours · Résolus · Escalades · Soft (par type) · Hard (par type) |
| **Tableau "Tous les Tickets"** | ID, Titre, Créé par, Type, Niveau, Statut (badge), Technicien assigné |
| **Action sur tickets Ouverts** | Menu déroulant pour choisir un technicien + bouton **Assigner** |

### Page : Utilisateurs (`utilisateurs.html`)
- **Tableau** : Liste des utilisateurs
- **Bouton** : **Ajouter Technicien** (même modal que l'ingénieur)
- **Bouton** : **Ajouter Ingénieur** (exclusif au Chef de Service)

### Page : Réclamations (`reclamations.html`)
- Identique au Technicien / Ingénieur

### Capacités
- Vue complète des statistiques système
- Assigner les tickets ouverts à un technicien spécifique
- Ajouter des techniciens
- Ajouter des ingénieurs (exclusivité Chef)

---

## Pages partagées (Technicien / Ingénieur / Chef)

| Page | Accès | Contenu |
|---|---|---|
| **Réclamations** (`reclamations.html`) | Tech, Ing, Chef | Champ de recherche + tableau global de tous les tickets |
| **Utilisateurs** (`utilisateurs.html`) | Tech, Ing, Chef | Liste des utilisateurs + Ajout Technicien (Ing/Chef) / Ajout Ingénieur (Chef only) |
| **Postes** (`postes.html`) | Tech, Ing, Chef | Tableau read-only des 8 postes de travail |

---

## Cycle de vie d'un ticket

```
Utilisateur crée un ticket
        │
        ▼
      Ouvert
        │
        ├─── Technicien clique "Prendre" ───→ En cours
        │                                         │
        │                              ┌──────────┴──────────┐
        │                              │                     │
        │                              ▼                     ▼
        │                           Résolu               Escaladé
        │                      (si Niveau Normal)    (si Niveau Élevé)
        │                              │                     │
        │                              │                     ▼
        │                              │                 Résolu
        │                              │           (par Ingénieur)
        │
        └─── Chef assigne à un technicien ──→ En cours (idem)
```

### Statuts d'un ticket
| Statut | Description |
|---|---|
| **Ouvert** | Nouveau ticket, non assigné |
| **En cours** | Pris en charge par un technicien |
| **Résolu** | Problème résolu |
| **Escaladé** | Transféré à un ingénieur |

### Types de ticket
| Type | Description |
|---|---|
| **Soft** | Problème logiciel |
| **Hard** | Problème matériel |
| **Matériel** | Problème d'équipement |

### Niveaux
| Niveau | Description |
|---|---|
| **Normal** | Résolvable par un technicien |
| **Élevé** | Nécessite un ingénieur |

### Priorités
| Priorité |
|---|
| Basse |
| Moyenne |
| Haute |
| Critique |

---

## Règles métier

| Règle | Implémentation |
|---|---|
| Un technicien ne peut résoudre que les tickets de niveau Normal | `technicien-dashboard.html` — bouton Résoudre désactivé avec infobulle si Élevé |
| Un technicien doit transférer les tickets de niveau Élevé | `tickets.js` — fonction `escalateTicket()` |
| Seul le Chef peut ajouter des ingénieurs | `utilisateurs.html` — bouton "Ajouter Ingénieur" visible uniquement si rôle = chef |
| Chef et Ingénieur peuvent ajouter des techniciens | `utilisateurs.html` — bouton "Ajouter Technicien" visible pour ingénieur et chef |
| La connexion vérifie que le rôle sélectionné correspond à l'utilisateur | `auth.js` — validation croisée rôle utilisateur / rôle choisi |
| Les données sont initialisées une seule fois (vérification localStorage) | `auth.js` — `seedUsers()` et `seedTickets()` au premier lancement |

---

## Matrice d'accès

| Page | User | Tech | Ing | Chef |
|---|---|---|---|---|
| user-dashboard.html | ✅ | ❌ | ❌ | ❌ |
| technicien-dashboard.html | ❌ | ✅ | ❌ | ❌ |
| ingenieur-dashboard.html | ❌ | ❌ | ✅ | ❌ |
| chef-dashboard.html | ❌ | ❌ | ❌ | ✅ |
| reclamations.html | ❌ | ✅ | ✅ | ✅ |
| utilisateurs.html | ❌ | ✅ | ✅ | ✅ |
| postes.html | ❌ | ✅ | ✅ | ✅ |

---

## Notes techniques

- **Pas de backend** : tout est stocké dans `localStorage` (clés : `users`, `tickets`, `currentUser`)
- **Sécurité** : la protection des pages est côté client via `checkAuth()`, contournable via les outils de développement
- **ID des tickets** : généré via `Date.now()` (timestamp milliseconde)
- **Postes de travail** : 8 postes hardcodés dans `postes.html` (pas de CRUD)
