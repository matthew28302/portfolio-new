document.addEventListener('DOMContentLoaded', () => {
  // --- Navbar Scroll Logic ---
  const navbar = document.getElementById('navbar');
  const navContainer = document.getElementById('nav-container');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      navbar.classList.remove('py-6');
      navbar.classList.add('py-3');
      navContainer.classList.add('shadow-md');
    } else {
      navbar.classList.add('py-6');
      navbar.classList.remove('py-3');
      navContainer.classList.remove('shadow-md');
    }
  });

  // --- Smooth Scrolling for all internal links ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const offset = 100; // Adjust for sticky navbar
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // --- Mobile Menu Logic ---
  const menuToggle = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const menuIcon = document.getElementById('menu-icon');
  const closeIcon = document.getElementById('close-icon');

  menuToggle.addEventListener('click', () => {
    const isOpen = !mobileMenu.classList.contains('hidden');
    if (isOpen) {
      mobileMenu.classList.add('hidden');
      menuIcon.classList.remove('hidden');
      closeIcon.classList.add('hidden');
    } else {
      mobileMenu.classList.remove('hidden');
      menuIcon.classList.add('hidden');
      closeIcon.classList.remove('hidden');
    }
  });

  // Close mobile menu on link click
  const mobileLinks = mobileMenu.querySelectorAll('a');
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
      menuIcon.classList.remove('hidden');
      closeIcon.classList.add('hidden');
    });
  });

  // --- Intersection Observer for Animations ---
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const animateElements = document.querySelectorAll('.reveal');
  animateElements.forEach(el => observer.observe(el));

  // --- Dynamic Year ---
  const yearElements = document.querySelectorAll('.current-year');
  yearElements.forEach(el => {
    el.textContent = new Date().getFullYear();
  });

  // --- Dynamic Floating Icons ---
  const iconTypes = ['star', 'heart', 'flower-2', 'cloud', 'sparkles', 'sun', 'leaf', 'smile', 'zap', 'coffee'];
  const sections = document.querySelectorAll('section, footer');
  
  sections.forEach(section => {
    const iconCount = 4;
    for (let i = 0; i < iconCount; i++) {
      const iconWrap = document.createElement('div');
      const type = iconTypes[Math.floor(Math.random() * iconTypes.length)];
      
      iconWrap.className = 'absolute pointer-events-none z-0 opacity-20 animate-float';
      iconWrap.style.left = `${Math.random() * 90}%`;
      iconWrap.style.top = `${Math.random() * 90}%`;
      iconWrap.style.animationDelay = `${Math.random() * 5}s`;
      iconWrap.style.animationDuration = `${4 + Math.random() * 4}s`;
      
      const icon = document.createElement('i');
      icon.setAttribute('data-lucide', type);
      
      // Add some color variety
      if (type === 'star') icon.classList.add('fill-yellow-400', 'text-yellow-400');
      if (type === 'heart') icon.classList.add('fill-pink-400', 'text-pink-400');
      if (type === 'sun') icon.classList.add('text-orange-300');
      if (type === 'leaf') icon.classList.add('text-emerald-400');
      
      iconWrap.appendChild(icon);
      section.style.position = 'relative';
      section.appendChild(iconWrap);
    }
  });

  // --- Click Ripple Effect ---
  window.addEventListener('click', (e) => {
    const ripple = document.createElement('div');
    ripple.className = 'click-ripple';
    ripple.style.left = `${e.clientX}px`;
    ripple.style.top = `${e.clientY}px`;
    document.body.appendChild(ripple);
    
    setTimeout(() => {
      ripple.remove();
    }, 600);
  });

  // Re-run lucide to catch new icons
  if (window.lucide) {
    window.lucide.createIcons();
  }
});
