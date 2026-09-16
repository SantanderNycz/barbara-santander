// ---------- Nav scroll state ----------
const nav = document.getElementById('nav');
const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 60);
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

// ---------- Mobile menu ----------
const burger  = document.getElementById('burger');
const overlay = document.getElementById('overlay');

function toggleMenu(open) {
  burger.classList.toggle('active', open);
  overlay.classList.toggle('open', open);
  burger.setAttribute('aria-expanded', open);
  overlay.setAttribute('aria-hidden', !open);
  document.body.classList.toggle('menu-open', open);
}

burger.addEventListener('click', () => {
  toggleMenu(!overlay.classList.contains('open'));
});
overlay.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => toggleMenu(false));
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && overlay.classList.contains('open')) toggleMenu(false);
});

// ---------- Scroll reveal ----------
const revealEls = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); }
    });
  }, { threshold: 0.12 });
  revealEls.forEach(el => observer.observe(el));
} else {
  // Navegador antigo sem suporte: revela tudo imediatamente
  revealEls.forEach(el => el.classList.add('visible'));
}
