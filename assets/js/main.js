/* ══════════════════════════════════════════════════
   main.js — Site Dra. Ana Lima
   Organizado em módulos para facilitar expansões
══════════════════════════════════════════════════ */

/* ── SCROLL PROGRESS BAR ── */
const progressBar = document.getElementById('progress');
window.addEventListener('scroll', () => {
  const pct = window.scrollY / (document.body.scrollHeight - innerHeight) * 100;
  progressBar.style.width = pct + '%';
});

/* ── NAV SHADOW ON SCROLL ── */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
});

/* ── HAMBURGER / MOBILE DRAWER ── */
const hbg = document.getElementById('hbg');
const drw = document.getElementById('drawer');

hbg.addEventListener('click', () => {
  const isOpen = hbg.classList.toggle('open');
  drw.classList.toggle('open', isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
});

function closeDrawer() {
  hbg.classList.remove('open');
  drw.classList.remove('open');
  document.body.style.overflow = '';
}

/* ── FADE-UP ON SCROLL (IntersectionObserver) ── */
const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('vis'), i * 95);
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.fu').forEach(el => fadeObserver.observe(el));

/* ── FAQ ACCORDION ── */
document.querySelectorAll('.faq-q').forEach(btn => {
  btn.addEventListener('click', () => {
    const answer = btn.nextElementSibling;
    const isOpen = btn.getAttribute('aria-expanded') === 'true';

    document.querySelectorAll('.faq-q').forEach(b => {
      b.setAttribute('aria-expanded', 'false');
      b.nextElementSibling.classList.remove('open');
    });

    if (!isOpen) {
      btn.setAttribute('aria-expanded', 'true');
      answer.classList.add('open');
    }
  });
});

/* ── CONTACT FORM ── */
function handleForm(e) {
  e.preventDefault();
  const btn  = e.target.querySelector('button[type="submit"]');
  const orig = btn.textContent;

  btn.textContent       = 'Mensagem enviada ✓';
  btn.style.background  = '#22c55e';
  btn.style.boxShadow   = '0 4px 16px rgba(34,197,94,.35)';

  setTimeout(() => {
    btn.textContent      = orig;
    btn.style.background = '';
    btn.style.boxShadow  = '';
    e.target.reset();
  }, 3500);
}
