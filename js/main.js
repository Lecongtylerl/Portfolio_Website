/* ===================================================
   Tyler Le — SEG3125 Portfolio  |  main.js
   =================================================== */

// ----- Navbar: add .scrolled class on scroll -----
const nav = document.getElementById('mainNav');

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

// ----- Active nav link highlight -----
const sections  = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('#mainNav .nav-link');

const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    navLinks.forEach(link => {
      const active = link.getAttribute('href') === `#${entry.target.id}`;
      link.classList.toggle('active', active);
    });
  });
}, { threshold: 0.35 });

sections.forEach(s => sectionObserver.observe(s));

// ----- Fade-in on scroll for cards -----
const fadeEls = document.querySelectorAll('.fade-in');

const fadeObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

fadeEls.forEach(el => fadeObserver.observe(el));

// ----- Stagger delay for case cards -----
document.querySelectorAll('.case-card').forEach((card, i) => {
  card.style.transitionDelay = `${i * 80}ms`;
});

// ----- Close mobile menu after clicking a link -----
document.querySelectorAll('#navMenu .nav-link').forEach(link => {
  link.addEventListener('click', () => {
    const toggler = document.querySelector('.navbar-toggler');
    const menu    = document.getElementById('navMenu');
    if (menu.classList.contains('show')) toggler.click();
  });
});
