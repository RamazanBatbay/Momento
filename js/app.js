/**
 * Application entry point: registers the service worker and starts the router.
 */
import { startRouter } from './router.js';
import { renderList } from './views/list.js';
import { renderNew } from './views/new.js';
import { renderDetail } from './views/detail.js';

const routes = [
  { name: 'list', pattern: /^\/$/, render: renderList },
  { name: 'new', pattern: /^\/new$/, render: renderNew },
  { name: 'detail', pattern: /^\/memory\/(?<id>\d+)$/, render: renderDetail },
];

/** Highlights the active tab and shows the back button on sub-views. */
function updateChrome(routeName) {
  document.querySelectorAll('.tab-bar a').forEach((link) => {
    if (link.dataset.route === routeName) {
      link.setAttribute('aria-current', 'page');
    } else {
      link.removeAttribute('aria-current');
    }
  });
  document.getElementById('back-link').hidden = routeName === 'list';
}

function registerServiceWorker() {
  if (!('serviceWorker' in navigator)) return;

  // Register after load so the SW's precaching does not compete with first paint.
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('./sw.js')
      .catch((error) => console.error('Service worker registration failed:', error));
  });
}

startRouter(routes, document.getElementById('view'), updateChrome);
registerServiceWorker();
