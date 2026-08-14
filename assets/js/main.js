/**
 * Main JavaScript File for Edjabrou Ulrich Blanchard KABLAM Portfolio
 * Features:
 * - Fluid Scroll Reveal (Inspired by modern robotics & tech events)
 * - Bilingual Translator (EN / FR) with dynamic language switcher
 * - Dynamic Typewriter effect with bilingual support
 * - Animated Number Counters on Scroll (Stats)
 * - Isotope-style Portfolio Category Filtering
 * - Active ScrollSpy Navigation with Smart Navbar Blur
 * - Formspree AJAX Asynchronous Form Submission
 * - Smooth Back-to-Top trigger
 */

document.addEventListener('DOMContentLoaded', () => {
  "use strict";

  /* ==========================================================
     1. INITIALISATION DE LA LANGUE (Bilingue EN / FR)
     ========================================================== */
  const storedLang = localStorage.getItem('preferred_language') || 'en';
  switchLanguage(storedLang);

  // Écouteur sur les boutons du sélecteur de langue
  document.querySelectorAll('.lang-select-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const lang = btn.getAttribute('data-set-lang');
      if (lang) {
        switchLanguage(lang);
      }
    });
  });

  /* ==========================================================
     2. NAVBAR SCROLL & BACK TO TOP BUTTON
     ========================================================== */
  const navbar = document.querySelector('.navbar');
  const backToTop = document.querySelector('.back-to-top');

  const onScrollHandler = () => {
    const scrollPos = window.scrollY || window.pageYOffset;
    if (scrollPos > 60) {
      if (navbar) navbar.classList.add('scrolled');
      if (backToTop) backToTop.classList.add('active');
    } else {
      if (navbar) navbar.classList.remove('scrolled');
      if (backToTop) backToTop.classList.remove('active');
    }
  };

  window.addEventListener('scroll', onScrollHandler, { passive: true });
  onScrollHandler();

  if (backToTop) {
    backToTop.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  /* ==========================================================
     3. FERMETURE AUTOMATIQUE DU MENU MOBILE AU CLIC
     ========================================================== */
  const navLinksList = document.querySelectorAll('.navbar-nav .nav-link:not(.dropdown-toggle)');
  const navbarCollapse = document.querySelector('.navbar-collapse');
  navLinksList.forEach(link => {
    link.addEventListener('click', () => {
      if (navbarCollapse && navbarCollapse.classList.contains('show')) {
        const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
        if (bsCollapse) bsCollapse.hide();
      }
    });
  });

  /* ==========================================================
     4. SCROLLSPY AMÉLIORÉ (Surlignage du lien actif)
     ========================================================== */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

  const activateNavOnScroll = () => {
    const scrollY = window.pageYOffset + 140;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop;
      const sectionId = current.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', activateNavOnScroll, { passive: true });

  /* ==========================================================
     5. ANIMATIONS D'APPARITION AU DÉFILEMENT (Scroll Reveal)
     ========================================================== */
  const animatedElements = document.querySelectorAll(
    '.section-title, .about-card, .about-photo-panel, .skill-card, .service-card, .portfolio-card, .stat-box, .contact-info-card, .contact-form, .timeline-content'
  );

  animatedElements.forEach(el => {
    el.classList.add('reveal-on-scroll');
  });

  const scrollObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        // Optionnel : ne plus observer une fois affiché
        observer.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  animatedElements.forEach(el => scrollObserver.observe(el));

  /* ==========================================================
     6. COMPTEURS DE STATISTIQUES ANIMÉS
     ========================================================== */
  let statsCounted = false;

  const animateCounters = () => {
    const statsSection = document.querySelector('#impact') || document.querySelector('#about');
    if (!statsSection || statsCounted) return;

    const rect = statsSection.getBoundingClientRect();
    if (rect.top <= window.innerHeight * 0.85) {
      statsCounted = true;

      const statStudents = document.querySelector('#stat-students .stat-count');
      const statGirls = document.querySelector('#stat-girls .stat-count');
      const statTeachers = document.querySelector('#stat-teachers .stat-count');
      const statSessions = document.querySelector('#stat-sessions .stat-count');
      const statProjects = document.querySelector('#stat-projects .stat-count') || document.querySelector('#stat-projects h3');
      const statExperience = document.querySelector('#stat-experience .stat-count') || document.querySelector('#stat-experience h3');

      if (statStudents) animateValue(statStudents, 0, 500, 1800, '+');
      if (statGirls) animateValue(statGirls, 0, 115, 1600, '+');
      if (statTeachers) animateValue(statTeachers, 0, 150, 1600, '+');
      if (statSessions) animateValue(statSessions, 0, 25, 1400, '+');
      if (statProjects) animateValue(statProjects, 0, 50, 1600, '+');
      if (statExperience) animateValue(statExperience, 0, 7, 1200, '+');
    }
  };

  function animateValue(element, start, end, duration, suffix = '') {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      // Easing out cubic
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const currentVal = Math.floor(easeProgress * (end - start) + start);
      element.innerHTML = `${currentVal}${suffix}`;
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        element.innerHTML = `${end}${suffix}`;
      }
    };
    window.requestAnimationFrame(step);
  }

  window.addEventListener('scroll', animateCounters, { passive: true });
  animateCounters();

  /* ==========================================================
     7. FILTRAGE DU PORTFOLIO AVEC TRANSITION FLUIDE
     ========================================================== */
  const portfolioFilters = document.querySelectorAll('.portfolio-filters li');
  const portfolioItems = document.querySelectorAll('.portfolio-item');

  if (portfolioFilters.length > 0 && portfolioItems.length > 0) {
    portfolioFilters.forEach(filter => {
      filter.addEventListener('click', function () {
        portfolioFilters.forEach(el => el.classList.remove('filter-active'));
        this.classList.add('filter-active');

        const filterValue = this.getAttribute('data-filter');

        portfolioItems.forEach(item => {
          item.style.transition = 'opacity 0.35s ease, transform 0.35s ease';
          if (filterValue === '*' || item.classList.contains(filterValue.substring(1))) {
            item.style.display = 'block';
            setTimeout(() => {
              item.style.opacity = '1';
              item.style.transform = 'scale(1)';
            }, 30);
          } else {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.9)';
            setTimeout(() => {
              item.style.display = 'none';
            }, 350);
          }
        });
      });
    });
  }

  /* ==========================================================
     8. SOUMISSION DU FORMULAIRE DE CONTACT (Formspree AJAX)
     ========================================================== */
  const contactForm = document.getElementById('contact-form-element') || document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalHtml = submitBtn.innerHTML;
      const currentLang = localStorage.getItem('preferred_language') || 'en';

      submitBtn.disabled = true;
      submitBtn.innerHTML = (currentLang === 'fr') 
        ? '<i class="bi bi-hourglass-split me-2"></i> Envoi en cours...' 
        : '<i class="bi bi-hourglass-split me-2"></i> Sending message...';

      const formData = new FormData(contactForm);

      fetch(contactForm.action, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      })
      .then(response => {
        if (response.ok) return response.json();
        throw new Error('Form submission failed.');
      })
      .then(() => {
        const responseDiv = document.createElement('div');
        responseDiv.className = 'alert alert-success mt-3 shadow-sm rounded-4 d-flex align-items-center gap-2';
        responseDiv.role = 'alert';
        
        const successMsg = (currentLang === 'fr')
          ? '<strong>Succès !</strong> Votre message a été transmis avec succès. Je vous répondrai dans les plus brefs délais.'
          : '<strong>Success!</strong> Your message has been sent successfully. I will get back to you shortly.';

        responseDiv.innerHTML = `<i class="bi bi-check-circle-fill fs-5 text-success"></i> <div>${successMsg}</div>`;

        contactForm.appendChild(responseDiv);
        contactForm.reset();

        submitBtn.disabled = false;
        submitBtn.innerHTML = originalHtml;

        setTimeout(() => {
          responseDiv.remove();
        }, 7000);
      })
      .catch(() => {
        const responseDiv = document.createElement('div');
        responseDiv.className = 'alert alert-danger mt-3 shadow-sm rounded-4 d-flex align-items-center gap-2';
        responseDiv.role = 'alert';

        const errorMsg = (currentLang === 'fr')
          ? '<strong>Erreur :</strong> Impossible d’envoyer le message. Veuillez réessayer ou contacter directement via WhatsApp / Email.'
          : '<strong>Error:</strong> Could not send your message. Please try again or reach out directly via WhatsApp / Email.';

        responseDiv.innerHTML = `<i class="bi bi-exclamation-triangle-fill fs-5 text-danger"></i> <div>${errorMsg}</div>`;

        contactForm.appendChild(responseDiv);
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalHtml;

        setTimeout(() => {
          responseDiv.remove();
        }, 7000);
      });
    });
  }

  /* ==========================================================
     9. LIGHTBOX / ZOOM PLEIN ÉCRAN POUR TOUTES LES IMAGES
     ========================================================== */
  initImageLightbox();
});

function initImageLightbox() {
  // Création dynamique du conteneur Lightbox s'il n'existe pas encore
  let lightbox = document.getElementById('custom-image-lightbox');
  if (!lightbox) {
    lightbox = document.createElement('div');
    lightbox.id = 'custom-image-lightbox';
    lightbox.className = 'lightbox-backdrop';
    lightbox.innerHTML = `
      <div class="lightbox-content">
        <button type="button" class="lightbox-close" aria-label="Close">&times;</button>
        <img src="" class="lightbox-image" alt="Image preview">
        <div class="lightbox-caption"></div>
      </div>
    `;
    document.body.appendChild(lightbox);
  }

  const lightboxImg = lightbox.querySelector('.lightbox-image');
  const lightboxCaption = lightbox.querySelector('.lightbox-caption');
  const closeBtn = lightbox.querySelector('.lightbox-close');

  const openLightbox = (src, alt) => {
    lightboxImg.src = src;
    lightboxImg.alt = alt || 'Image Preview';
    if (alt && alt.trim() !== '') {
      lightboxCaption.textContent = alt;
      lightboxCaption.style.display = 'block';
    } else {
      lightboxCaption.style.display = 'none';
    }
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  };

  // Clic sur bouton fermer
  if (closeBtn) {
    closeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      closeLightbox();
    });
  }

  // Clic sur l'arrière-plan pour fermer
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox || e.target.classList.contains('lightbox-content')) {
      closeLightbox();
    }
  });

  // Touche Echap pour fermer
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
      closeLightbox();
    }
  });

  // Attacher l'événement au clic sur toutes les images du site
  const images = document.querySelectorAll(
    '.portfolio-img, .about-photo-panel img, .hero-img, .testimonial-card img, .portfolio-card img, .about-photo-main img, .about-photo-small img'
  );

  images.forEach(img => {
    img.style.cursor = 'zoom-in';
    img.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      openLightbox(img.src, img.getAttribute('alt') || '');
    });
  });
}

/* ==========================================================
   10. MACHINE À ÉCRIRE TYPED EFFECT (Bilingue EN & FR)
   ========================================================== */
let typeTimeout = null;

function startTypedEffect(lang) {
  if (typeTimeout) {
    clearTimeout(typeTimeout);
  }

  const typedContainer = document.querySelector(`.typed-text-${lang}`);
  if (!typedContainer) return;

  const words = (lang === 'fr') 
    ? [
        "Professeur de Collège (ENS)",
        "Développeur en Intelligence Artificielle",
        "Spécialiste Python & Machine Learning",
        "Formateur en Robotique",
        "Data Scientist"
      ]
    : [
        "an ENS Mathematics Teacher",
        "an AI & Machine Learning Developer",
        "a Python & Computer Vision Specialist",
        "a Robotics Instructor",
        "a Data Scientist"
      ];

  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 90;

  function type() {
    const currentWord = words[wordIndex];

    if (isDeleting) {
      typedContainer.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 45;
    } else {
      typedContainer.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 90;
    }

    if (!isDeleting && charIndex === currentWord.length) {
      isDeleting = true;
      typingSpeed = 2200; // Pause avant suppression
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      typingSpeed = 400; // Pause avant nouveau mot
    }

    typeTimeout = setTimeout(type, typingSpeed);
  }

  type();
}

/* ==========================================================
   10. GESTIONNAIRE GLOBAL DE TRADUCTION (EN / FR)
   ========================================================== */
function switchLanguage(lang) {
  // 1. Sauvegarde dans localStorage
  localStorage.setItem('preferred_language', lang);
  document.documentElement.lang = lang;

  // 2. Mise à jour du libellé du menu déroulant
  const currentLangText = document.getElementById('current-lang-text');
  if (currentLangText) {
    currentLangText.textContent = (lang === 'fr') ? 'Français (FR)' : 'English (EN)';
  }

  // 3. Basculement des éléments de texte Navbar
  document.querySelectorAll('.nav-text-en').forEach(el => {
    el.style.display = (lang === 'en') ? 'inline' : 'none';
  });
  document.querySelectorAll('.nav-text-fr').forEach(el => {
    el.style.display = (lang === 'fr') ? 'inline' : 'none';
  });

  // 4. Basculement des blocs [data-lang="en"] et [data-lang="fr"]
  document.querySelectorAll('[data-lang]').forEach(el => {
    const elementLang = el.getAttribute('data-lang');
    if (elementLang === lang) {
      if (el.classList.contains('row')) {
        el.style.display = 'flex';
      } else if (el.tagName === 'SPAN' || el.tagName === 'A' || el.tagName === 'P') {
        el.style.display = '';
      } else {
        el.style.display = 'block';
      }
    } else {
      el.style.display = 'none';
    }
  });

  // 5. Ajustement dynamique des Placeholders du formulaire
  const inputName = document.getElementById('name');
  const inputEmail = document.getElementById('email');
  const inputSubject = document.getElementById('subject');
  const inputMessage = document.getElementById('message');

  if (lang === 'fr') {
    if (inputName) inputName.placeholder = 'Ex : Jean Dupont';
    if (inputEmail) inputEmail.placeholder = 'Ex : jean.dupont@exemple.com';
    if (inputSubject) inputSubject.placeholder = 'Ex : Projet IA / Opportunité professionnelle';
    if (inputMessage) inputMessage.placeholder = 'Décrivez votre projet, besoin ou opportunité...';
  } else {
    if (inputName) inputName.placeholder = 'Ex: John Doe';
    if (inputEmail) inputEmail.placeholder = 'Ex: john.doe@example.com';
    if (inputSubject) inputSubject.placeholder = 'Ex: AI / Data Science Project Inquiry';
    if (inputMessage) inputMessage.placeholder = 'Describe your project, need or opportunity...';
  }

  // 6. Relancer l'effet machine à écrire
  startTypedEffect(lang);
}
