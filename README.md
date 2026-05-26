# TaskFlow – Gestionnaire de tâches d'équipe

Application SPA développée avec React + Vite.js dans le cadre du TP évalué – Architecture Front-End.

## Installation et lancement

### Prérequis
- Node.js (v18 ou supérieur)
- npm

### Étapes

1. **Cloner le dépôt**
   ```bash
   git clone <url-du-repo>
   cd taskflow
   ```

2. **Installer les dépendances**
   ```bash
   npm install
   ```

3. **Lancer le serveur de développement**
   ```bash
   npm run dev
   ```

4. Ouvrir le navigateur à l'adresse affichée (généralement `http://localhost:5173`)

## Structure du projet

```
src/
├── components/
│   ├── TaskCard.jsx       # Carte affichant une tâche
│   └── TaskForm.jsx       # Formulaire d'ajout de tâche
├── pages/
│   ├── Dashboard.jsx      # Page principale (liste des tâches)
│   └── TaskDetail.jsx     # Page de détail d'une tâche
├── layouts/
│   └── Navbar.jsx         # Barre de navigation globale
├── hooks/
│   └── useLocalStorage.js # Hook personnalisé (BONUS)
└── App.jsx                # Routage principal
```

## Fonctionnalités

- ✅ Ajout de tâches via formulaire contrôlé
- ✅ Affichage dynamique avec `.map()` et clé `id`
- ✅ Persistance locale (localStorage) via `useEffect`
- ✅ Navigation SPA sans rechargement (`react-router-dom`)
- ✅ Page de détail par URL dynamique (`/task/:id`)
- ✅ Hook personnalisé `useLocalStorage` (Bonus)
