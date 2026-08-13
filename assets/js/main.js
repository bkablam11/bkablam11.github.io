/**
 * Main JavaScript File for Edjabrou Ulrich Blanchard KABLAM Portfolio
 */

document.addEventListener('DOMContentLoaded', () => {
  "use strict";

  /**
   * Header / Navbar scroll class
   */
  const navbar = document.querySelector('.navbar');
  const backtotop = document.querySelector('.back-to-top');

  const handleScroll = () => {
    if (window.scrollY > 50) {
      if (navbar) navbar.classList.add('scrolled');
      if (backtotop) backtotop.classList.add('active');
    } else {
      if (navbar) navbar.classList.remove('scrolled');
      if (backtotop) backtotop.classList.remove('active');
    }
  };

  window.addEventListener('scroll', handleScroll);
  handleScroll();

  /**
   * Back to top button action
   */
  if (backtotop) {
    backtotop.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  /**
   * Typed.js Effect (Vanilla Implementation / Typed.js Library Fallback)
   */
  const typedContainer = document.querySelector('.typed-text');
  if (typedContainer) {
    const items = ["Professeur de Collège (ENS)", "Développeur en Intelligence Artificielle", "Data Scientist", "Formateur Robotique"];
    let itemIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function type() {
      const currentText = items[itemIndex];
      
      if (isDeleting) {
        typedContainer.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
      } else {
        typedContainer.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
      }

      if (!isDeleting && charIndex === currentText.length) {
        isDeleting = true;
        typingSpeed = 2000; // Pause at end
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        itemIndex = (itemIndex + 1) % items.length;
        typingSpeed = 500;
      }

      setTimeout(type, typingSpeed);
    }

    type();
  }

  /**
   * Portfolio Filtering (Isotope logic)
   */
  const portfolioFilters = document.querySelectorAll('.portfolio-filters li');
  const portfolioItems = document.querySelectorAll('.portfolio-item');

  if (portfolioFilters.length > 0 && portfolioItems.length > 0) {
    portfolioFilters.forEach(filter => {
      filter.addEventListener('click', function() {
        portfolioFilters.forEach(el => el.classList.remove('filter-active'));
        this.classList.add('filter-active');

        const filterValue = this.getAttribute('data-filter');

        portfolioItems.forEach(item => {
          if (filterValue === '*' || item.classList.contains(filterValue.substring(1))) {
            item.style.display = 'block';
            setTimeout(() => {
              item.style.opacity = '1';
              item.style.transform = 'scale(1)';
            }, 50);
          } else {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.8)';
            setTimeout(() => {
              item.style.display = 'none';
            }, 300);
          }
        });
      });
    });
  }

  /**
   * Contact Form Handling
   */
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="bi bi-hourglass-split"></i> Envoi en cours...';

      // Simulate network sending
      setTimeout(() => {
        const responseDiv = document.createElement('div');
        responseDiv.className = 'alert alert-success mt-3';
        responseDiv.role = 'alert';
        responseDiv.innerHTML = '<i class="bi bi-check-circle-fill me-2"></i> Merci ! Votre message a été envoyé avec succès. Je vous répondrai dans les plus brefs délais.';

        contactForm.appendChild(responseDiv);
        contactForm.reset();

        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;

        setTimeout(() => {
          responseDiv.remove();
        }, 6000);
      }, 1200);
    });
  }

  /**
   * Scrollspy for Active Navigation Link
   */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 100;
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + sectionId) {
            link.classList.add('active');
          }
        });
      }
    });
  });
});
