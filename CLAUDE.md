# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal portfolio website for Edjabrou Ulrich Blanchard KABLAM, hosted on GitHub Pages at `https://bkablam11.github.io`. The site is a static HTML/CSS/JavaScript implementation using Bootstrap 5 for layout and components, with custom styling and interactive features.

## File Structure

```
.
├── index.html              # Main HTML page
├── assets/
│   ├── css/
│   │   └── style.css       # Custom CSS styles
│   ├── js/
│   │   └── main.js         # Custom JavaScript functionality
│   └── img/                # Images (profile, testimonials, project screenshots)
├── README.md               # Minimal README (in French)
└── .gitignore              # Empty (no ignored files currently)
```

## Development Commands

### Running the Site Locally

Since this is a static site with no build process, you can view it directly in a browser:

1. Open `index.html` in your preferred web browser.
2. Alternatively, use a simple static server for more accurate behavior (especially if testing relative paths):
   - Python: `python -m http.server 8000` (then visit `http://localhost:8000`)
   - Node.js: `npx serve` or `npx http-server`
   - Ruby: `ruby -run -e httpd . -p 8000`

### Deploying to GitHub Pages

The site is automatically deployed to GitHub Pages when changes are pushed to the `main` branch (the default branch for `<username>.github.io` repositories). No additional deployment steps are required.

To deploy:
1. Make changes locally.
2. Commit and push to GitHub: `git add . && git commit -m "Your message" && git push`
3. GitHub Actions will build and deploy the site (though for a static site, it's essentially immediate).

## Architecture Overview

### Page Layout

The site follows a single-page layout with multiple sections:
- Hero (Introduction)
- About
- Skills
- Experience (Services)
- Testimonials (Carousel)
- Portfolio (Filterable grid)
- Contact (Form)
- Footer

All sections are contained within `index.html` and are shown/hidden via CSS as the user scrolls or clicks navigation links.

### Styling

- **CSS Framework**: Bootstrap 5 (loaded from CDN)
- **Custom CSS**: Located in `assets/css/style.css` defining:
  - CSS variables for colors, fonts, shadows
  - Component overrides and custom classes (e.g., `.btn-custom-primary`, `.skill-card`)
  - Responsive adjustments
- **Fonts**: 'Plus Jakarta Sans' from Google Fonts

### JavaScript

All interactivity is handled in `assets/js/main.js` (vanilla JS, no external dependencies beyond Bootstrap):

1. **Navbar Behavior**: Adds `.scrolled` class on scroll for background change.
2. **Back-to-Top Button**: Shows/hides based on scroll position; smooth scroll to top.
3. **Typed Text Effect**: Vanilla implementation that cycles through predefined strings in the hero subtitle.
4. **Portfolio Filtering**: Filter buttons show/hide portfolio items with simple scale/fade animations (data-filter attributes match item classes).
5. **Contact Form**: Prevents default submission, shows simulated success message, and resets form.
6. **Scrollspy**: Updates active navigation link based on scroll position (custom implementation, not relying on Bootstrap's scrollspy due to offset requirements).

### Assets

- Images are stored in `assets/img/` organized by subdirectory:
  - `me/` : Personal photos and project screenshots
  - `testimonials/` : Headshots for testimonial carousel
- SVGs are used for some project icons (e.g., `project-2.svg`, `project-3.svg`)

## Key Points for Development

- **No Build Tools**: There is no package.json, webpack, Vite, or other build tools. Changes to HTML, CSS, or JS take effect immediately upon refresh.
- **Responsive Design**: The site uses Bootstrap's grid system and responsive utilities; test at various screen sizes.
- **Accessibility**: Basic accessibility features are present (ARIA labels, semantic HTML), but consider enhancing when making changes.
- **Performance**: Assets are optimized for web use; avoid adding large uncompressed images.
- **GitHub Pages**: The site is served from the root of the repository; ensure all links are relative or use absolute paths correctly.

## When Making Changes

1. **HTML**: Modify sections in `index.html` as needed. Maintain consistent section IDs for navigation links.
2. **CSS**: Add custom styles to `assets/css/style.css`. Use CSS variables defined at the top for theme consistency.
3. **JavaScript**: Enhance interactivity in `assets/js/main.js`. Follow the existing patterns (event listeners, DOMContentLoaded wrapper).
4. **Images**: Optimize images before adding; place in appropriate subdirectories under `assets/img/`.
5. **Testing**: Verify changes locally using a static server before pushing to ensure links and paths work correctly.

## Notes

- The `.gitignore` file is currently empty; consider adding `.DS_Store` or IDE-specific files if needed.
- There are no automated tests, linting, or CI pipelines beyond GitHub Pages deployment.
- The site is designed to be simple and maintainable; avoid over-engineering additions.


## TODO: Improvements for Portfolio (Recruiter Perspective)

- [x] **Quantify impact of projects**: Add 1-2 concrete metrics to each portfolio item (e.g., "reduced processing time by 40%", "92% accuracy on 10K samples", "+200 daily users").
- [x] **Optimize for recruitment keywords**: 
    - Refine hero title to include top 3-4 bankable tech keywords (e.g., "IA Engineer | Python & ML Specialist | EdTech Innovator | Professeur ENS").
    - In project descriptions, specify exact stack versions (Django REST + PostgreSQL + Docker + CI/CD GitHub Actions).
- [x] **Reinforce technical proof**:
    - Add GitHub stars/forks badges or last commit date to each project card.
    - Consider a mini "Open Source" section if applicable.
    - Add a "Code Samples" tab/snippet highlighting relevant algorithms or architecture.
- [x] **Improve contact form conversion**:
    - Replace simulated form with a real service (Formspree, Getform, etc.).
    - Add a qualifier field: "Quel type de projet cherchez-vous à réaliser ?".
    - After submission, redirect to a thank-you page with Calendly link for scheduling.
- [x] **Strengthen international dimension**:
    - Add an English version (at least hero, about, skills).
    - Ensure LinkedIn title and "About" are bilingual.
    - Mention any international collaborations or clients.
- [x] **Optimize perceived speed**:
    - Compress all images (use Squoosh or similar).
    - Add `loading="lazy"` to images below the fold.
    - Host any video demos on YouTube/Vimeo instead of direct upload.
- [x] **Mobile verification checklist**:
    - Test menu hamburger closes after link click.
    - Ensure text legible without zoom.
    - Verify button spacing for touch.
    - Confirm contact form works on mobile keyboard.
- [x] **Bonus ATS keywords** (hidden for humans, scannable by some systems):
    - Add invisible footer div with keywords: Python Machine Learning Deep Learning Computer Vision Django Flask React JavaScript HTML5 CSS3 Data Analysis Pandas NumPy Scikit-learn MLOps Docker Git CI/CD Professeur Enseignement Formation Pédagogie.
- [x] **Next actionable steps (this week)**:
    1. Choose 3 flagship projects and add concrete impact metrics.
    2. Rewrite LinkedIn title to contain top 3 bankable tech keywords.
    3. Implement a real contact form (Formspree free tier) and test it.
