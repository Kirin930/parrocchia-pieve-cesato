const toggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.site-nav');

if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!expanded));
    nav.classList.toggle('open');
  });
}

const current = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.site-nav a').forEach((link) => {
  const href = link.getAttribute('href');
  if (href === current) link.classList.add('active');
});

const openNewsOverlay = (id) => {
  const overlay = document.getElementById(`news-overlay-${id}`);
  if (!overlay) return;

  overlay.classList.add('is-open');
  overlay.setAttribute('aria-hidden', 'false');
  document.body.classList.add('news-open');
};

const closeNewsOverlay = (id) => {
  const overlay = document.getElementById(`news-overlay-${id}`);
  if (!overlay) return;

  overlay.classList.remove('is-open');
  overlay.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('news-open');
};

document.querySelectorAll('[data-news-open]').forEach((card) => {
  const id = card.getAttribute('data-news-open');

  card.addEventListener('click', () => openNewsOverlay(id));
  card.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      openNewsOverlay(id);
    }
  });
});

document.querySelectorAll('[data-news-close]').forEach((button) => {
  const id = button.getAttribute('data-news-close');
  button.addEventListener('click', () => closeNewsOverlay(id));
});

document.addEventListener('keydown', (event) => {
  if (event.key !== 'Escape') return;

  document.querySelectorAll('.news-overlay.is-open').forEach((overlay) => {
    const id = overlay.id.replace('news-overlay-', '');
    closeNewsOverlay(id);
  });
});
