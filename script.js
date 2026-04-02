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

const newsFilterButtons = document.querySelectorAll('[data-news-filter]');
const newsCards = document.querySelectorAll('[data-news-category]');

if (newsFilterButtons.length && newsCards.length) {
  const applyNewsFilter = (filter) => {
    newsCards.forEach((card) => {
      const categories = (card.getAttribute('data-news-category') || '')
        .split(/[,\s]+/)
        .map((item) => item.trim())
        .filter(Boolean);
      const shouldShow = filter === 'all' || categories.includes(filter);
      card.classList.toggle('is-hidden', !shouldShow);
      card.hidden = !shouldShow;
    });

    newsFilterButtons.forEach((button) => {
      const isActive = button.getAttribute('data-news-filter') === filter;
      button.classList.toggle('is-active', isActive);
      button.setAttribute('aria-pressed', String(isActive));
    });
  };

  newsFilterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      applyNewsFilter(button.getAttribute('data-news-filter') || 'all');
    });
  });

  applyNewsFilter('all');
}

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
