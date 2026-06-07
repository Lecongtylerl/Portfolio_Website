// Navbar scroll class
const nav = document.getElementById('mainNav');

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

// Active nav link highlight
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('#mainNav .nav-link');

const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
    });
  });
}, { threshold: 0.35 });

sections.forEach(s => sectionObserver.observe(s));

// Fade-in on scroll
const fadeObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.fade-in').forEach(el => fadeObserver.observe(el));

// Stagger delay for case cards
document.querySelectorAll('.case-card').forEach((card, i) => {
  card.style.transitionDelay = `${i * 80}ms`;
});

// Close mobile menu after nav click
document.querySelectorAll('#navMenu .nav-link').forEach(link => {
  link.addEventListener('click', () => {
    const toggler = document.querySelector('.navbar-toggler');
    const menu    = document.getElementById('navMenu');
    if (menu.classList.contains('show')) toggler.click();
  });
});

// Typing animation for code card comment
const typedEl = document.getElementById('typed-text');
const phrases = [
  'compiling with passion...',
  'pushing to main...',
  'building good UX...',
  'git commit -m "done"',
  'npm run deploy...',
];

if (typedEl) {
  let phraseIdx = 0;
  let charIdx   = 0;
  let deleting  = false;

  function typeLoop() {
    const current = phrases[phraseIdx];

    if (deleting) {
      charIdx--;
      typedEl.textContent = current.slice(0, charIdx);
      if (charIdx === 0) {
        deleting  = false;
        phraseIdx = (phraseIdx + 1) % phrases.length;
        setTimeout(typeLoop, 450);
        return;
      }
      setTimeout(typeLoop, 38);
    } else {
      charIdx++;
      typedEl.textContent = current.slice(0, charIdx);
      if (charIdx === current.length) {
        deleting = true;
        setTimeout(typeLoop, 2200);
        return;
      }
      setTimeout(typeLoop, 72);
    }
  }

  setTimeout(typeLoop, 1200);
}

// Subtle parallax on hero blobs via mouse
const heroBg = document.querySelector('.hero-bg');
if (heroBg) {
  document.addEventListener('mousemove', e => {
    const x = (e.clientX / window.innerWidth  - 0.5) * 18;
    const y = (e.clientY / window.innerHeight - 0.5) * 12;
    heroBg.style.transform = `translate(${x}px, ${y}px)`;
  }, { passive: true });
}
