<div align="center">
  <div style="display: flex; justify-content: center; gap: 40px; align-items: center; margin-bottom: 20px;">
    <a href="https://www.geeks.institute/" target="_blank">
      <img src="./public/download.jpg" alt="Geeks Institute Logo" width="120"/>
    </a>
    <img src="https://upload.wikimedia.org/wikipedia/commons/2/2c/Flag_of_Morocco.svg" alt="Morocco Flag" width="80"/>
    <img src="./public/logo.png" alt="Project Logo" width="180"/>
  </div>
  <h1>Morocco Travel App 🇲🇦</h1>
  <h3>🏆 Winning Project - Geeks Institute Hackathon / Projet Gagnant - Hackathon Geeks Institute</h3>
  <p><i>English below / Français plus bas</i></p>

  <p>
    <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
    <img src="https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E" alt="Vite" />
    <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
    <img src="https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white" alt="React Router" />
  </p>
</div>

---

## 📁 Project Structure / Structure du Projet

```text
geeks-sprint1/
├── public/                 # Static assets / Ressources statiques
├── src/                    # Source code / Code source
│   ├── components/         # Reusable UI components / Composants d'interface réutilisables
│   │   ├── Auth/           # Authentication components / Composants d'authentification
│   │   ├── sections/       # App sections (Hero, Benefits, etc.) / Sections de l'application
│   │   └── Navbar.jsx      # Navigation bar / Barre de navigation
│   ├── context/            # React context providers / Fournisseurs de contexte React
│   ├── hooks/              # Custom React hooks / Hooks React personnalisés
│   ├── pages/              # Main application pages / Pages principales de l'application
│   ├── services/           # API and data services / Services API et de données
│   ├── utils/              # Utility functions / Fonctions utilitaires
│   ├── App.jsx             # Main application component & Routing / Composant principal et routage
│   ├── main.jsx            # Entry point / Point d'entrée
│   └── index.css           # Global styles & Tailwind config / Styles globaux
├── index.html              # HTML template / Modèle HTML
├── package.json            # Project metadata & dependencies / Métadonnées et dépendances
└── vite.config.js          # Vite configuration / Configuration de Vite
```

---

## 🇬🇧 English

This project was developed as part of our participation in the [Geeks Institute Hackathon](https://www.geeks.institute/) and we are proud to be the winners! 🎉

This application is your ultimate guide to discovering the magic of Morocco, built with the latest web technologies to deliver a fast and seamless user experience.

### Key Technologies & Features ✨

- ⚛️ **React & Vite**: Modern and blazing fast infrastructure.
- 🛣️ **Advanced Routing & Performance**: 
  - **Advanced Routing** using `createBrowserRouter` from `react-router-dom` for smart error handling and data loading paths.
  - **Lazy Loading** implemented via `React.lazy` and `Suspense` to load pages (such as Blogs, About Us, and Contact) only when required, reducing the initial bundle size and speeding up the application's first contentful paint.
- 🎨 **Attractive Design**: Built with `Tailwind CSS` for modern, fully responsive user interfaces.
- 🔒 **Authentication & Security**: Protected routes that require user login.

### Getting Started 🚀

1. Install dependencies: `npm install`
2. Start development server: `npm run dev`
3. Build for production: `npm run build`
4. Deploy to GitHub Pages: `npm run deploy`

We extend our deep gratitude to [Geeks Institute](https://www.geeks.institute/) for organizing this outstanding hackathon!

---

## 🇫🇷 Français

Ce projet a été développé dans le cadre de notre participation au [Hackathon Geeks Institute](https://www.geeks.institute/) et nous sommes fiers d'être les gagnants ! 🎉

Cette application est votre guide ultime pour découvrir la magie du Maroc, construite avec les dernières technologies web pour offrir une expérience utilisateur rapide et fluide.

### Technologies Clés et Fonctionnalités ✨

- ⚛️ **React et Vite** : Infrastructure moderne et extrêmement rapide.
- 🛣️ **Routage Avancé et Performance** : 
  - **Routage Avancé** utilisant `createBrowserRouter` de `react-router-dom` pour une gestion intelligente des erreurs et du chargement des données.
  - **Lazy Loading** implementé via `React.lazy` et `Suspense` pour charger les pages (telles que la page des blogs, à propos et contact) uniquement en cas de besoin afin de réduire la taille du bundle initial et d'accélérer l'ouverture initiale de l'application.
- 🎨 **Design Attrayant** : Utilisation de `Tailwind CSS` pour construire des interfaces modernes et entièrement réactives.
- 🔒 **Authentification et Sécurité** : Routes protégées nécessitant une connexion.

### Démarrage 🚀

1. Installer les dépendances : `npm install`
2. Lancer l'environnement de développement : `npm run dev`
3. Générer la version de production : `npm run build`
4. Déployer sur GitHub Pages : `npm run deploy`

Nous remercions chaleureusement [Geeks Institute](https://www.geeks.institute/) pour l'organisation de ce hackathon exceptionnel !
