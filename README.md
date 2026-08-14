# Portfolio Kablam Edjabrou Ulrich Blanchard

## État actuel du projet (août 2026)

Ce portfolio est un site web statique présentant le profil professionnel d'Edjabrou Ulrich Blanchard KABLAM, professeur de collège (ENS) et développeur en Intelligence Artificielle.

### Fonctionnalités implantées

#### Internationalisation (FR/EN)
- Commutateur de langue dans la navbar (Français/English)
- Persistance du choix de langue via localStorage
- Sections entièrement bilingues :
  - Hero (Introduction)
  - À Propos de moi
  - Titre de la section Compétences
  - Statistiques (Projets, expérience)
  - Pied de page (description professionnelle)
- Basculement fluide entre les langues sans rechargement de page

#### Améliorations pour les recruteurs
- **Métriques concrètes** ajoutées à chaque projet portfolio :
  - Ex: "réduisant le temps de traitement des commandes de 40%"
  - Ex: "92% de précision sur 10K+ images"
  - Ex: "gérant un stock de 5000+ références"
- **Stack technique détaillée** spécifiée :
  - Ex: "Django REST + PostgreSQL + Docker + CI/CD GitHub Actions"
  - Ex: "Python + OpenCV + YOLO11 + ByteTrack + Docker + CI/CD"
- **Preuves techniques renforcées** :
  - Badges GitHub avec étoiles et date de dernier commit
  - Liens directs vers les dépôts GitHub
  - Description précise des technolgies utilisées
- **Formulaire de contact optimisé** :
  - Intégration réelle avec Formspree (envoi d'emails fonctionnel)
  - Champ de qualification : "Quel type de projet cherchez-vous à réaliser ?"
  - Réinitialisation automatique après soumission
  - Messages de succès/erreur en temps réel
  - Suppression de la page de remerciement intermédiaire
- **Optimisation des performances** :
  - Attribut `loading="lazy"` sur toutes les images
  - Compression des images
  - Hébergement des vidéos sur YouTube
- **Mots-clés ATS** : Section invisible en pied de page pour les systèmes de suivi des candidatures
- **Dimensions internationales** : Version anglaise disponible pour les sections principales

#### Aspects techniques
- **Lightbox** : Agrandissement des photos de la section À Propos
- **Vidéo en arrière-plan** : Section À Propos présentant une formation LaTeX (YouTube, autoplay silencieux)
- **Filtrage du portfolio** : Animation scale/fade lors du filtrage par catégorie
- **Typed.js effect** : Animation de texte dans l'intro
- **Navbar dynamique** : Classe scrolleé au défilement
- **Bouton retour en haut** : Apparition/disparition basée sur le scroll
- **Lightbox pour photos** : Agrandissement des images de la section À Propos
- **Spy Scroll personnalisé** : Mise à jour du lien de navigation actif basé sur la position de défilement

#### Vérification mobile
- Menu hamburger qui se ferme après clic sur un lien
- Texte lisible sans zoom
- Espacement des boutons adapté au toucher
- Fonctionnalité du formulaire de contact sur clavier mobile

### Technologies utilisées

- **HTML5** : Structure sémantique
- **CSS3** : Bootstrap 5 + personnalisation via `assets/css/style.css`
- **JavaScript** : Vanilla JS (aucune dépendance externe hormis Bootstrap)
  - Comportement de la navbar
  - Bouton retour en haut
  - Effet machine à écrire
  - Filtrage du portfolio
  - Gestion du formulaire Formspree
  - Lightbox pour les photos
  - Commutation de langue
  - Spy Scroll personnalisé
- **Bootstrap 5** : Framework CSS pour la mise en page et les composants
- **Bootstrap Icons** : Bibliothèque d'icônes
- **Google Fonts** : Plus Jakarta Sans
- **Formspree** : Service backend pour le formulaire de contact
- **YouTube** : Hébergement de la vidéo de formation
- **GitHub Pages** : Hébergement du site statique

### Structure du projet

```
.
├── index.html              # Page principale unique
├── assets/
│   ├── css/
│   │   └── style.css       # Styles personnalisés
│   ├── js/
│   │   └── main.js         # Fonctionnalité JavaScript
│   └── img/                # Images organisées par catégorie
│       ├── me/             # Photos personnelles et captures d'écran
│       └── testimonials/   # Photos des témoignages
├── README.md               # Ce fichier
└── .gitignore              # Vide actuellement
```

### Déploiement

Le site est automatiquement déployé sur GitHub Pages lorsqu'il est poussé vers la branche `main` :
```bash
git add .
git commit -m "Votre message"
git push
```

### Pour le développement local

Puisqu'il s'agit d'un site statique sans processus de construction :
1. Ouvrez directement `index.html` dans votre navigateur
2. Ou utilisez un serveur statique simple :
   - Python : `python -m http.server 8000`
   - Node.js : `npx serve` ou `npx http-server`

### À venir (améliorations futures)

1. Section « Parcours & Formations » (Timeline Interactive)
Ajouter une frise chronologique élégante qui valorise :
Votre parcours académique d'excellence (École Normale Supérieure - ENS, CAP/ES Mathématiques).
Vos certifications en Data Science, Machine Learning et Robotique éducative.
Vos postes et expériences de formateur / développeur.
2. Bouton Téléchargement de CV bilingue (PDF)
Ajouter dans la section Hero et/ou la barre de navigation un bouton :
📄 Download CV (EN) / 📄 Télécharger le CV (FR) avec prévisualisation modale ou téléchargement direct de votre CV actualisé.
3. Modale "Détails du Projet" pour le Portfolio
Au clic sur un projet (ex. poissonnerie_pro_app, car-tracking, PrintPay_app), ouvrir une fenêtre popup élégante avec :
Les captures d'écran du projet en haute résolution.
La liste des technologies et l'architecture (Frontend, Backend, BDD, IA).
Le problème résolu, les résultats mesurables et les liens vers le code source GitHub et la démo en ligne.
4. Galerie / Événements Robotique & Ateliers
Une section galerie photos/vidéos dédiée aux moments forts des formations :
Photos d'ateliers avec les élèves et enseignants.
Vidéos et photos des compétitions de robotique (ex: CNR).
Visionneuse d'images en plein écran (Lightbox).
5. Section FAQ / Foire Aux Questions
Une section déroulante moderne (accordéon) pour répondre immédiatement aux questions de vos futurs partenaires et recruteurs :
Quels types de projets d'IA réalisez-vous ?
Proposez-vous des formations sur mesure pour écoles ou entreprises ?
Quelles sont vos disponibilités (consulting, CDI, freelance) ?

---

*Document maintenu par Edjabrou Ulrich Blanchard KABLAM*
*Dernière mise à jour : août 2026*