/**
 * Momento service worker - written by hand, no libraries (course requirement).
 *
 * Part 1 strategy: precache the app shell and serve it cache-first.
 * Runtime strategies for photos, map tiles and other resources are added
 * in part 3 (see README → "Caching strategy").
 */

// Bump this whenever a file in APP_SHELL changes, so clients get the new version.
const CACHE_VERSION = 'v1';
const SHELL_CACHE = `momento-shell-${CACHE_VERSION}`;

// Everything needed to render every view without a network connection.
// Paths are relative to the SW location so the app works under a sub-path
// (e.g. https://user.github.io/momento/).
const APP_SHELL = [
  './',
  './index.html',
  './manifest.webmanifest',
  './css/styles.css',
  './js/app.js',
  './js/router.js',
  './js/utils.js',
  './js/data/sample-memories.js',
  './js/views/list.js',
  './js/views/new.js',
  './js/views/detail.js',
  './icons/icon.svg',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/maskable-512.png',
  './icons/apple-touch-icon.png',
];

// Install: download the app shell into a versioned cache.
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(SHELL_CACHE)
      .then((cache) => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting()),
  );
});

// Activate: delete caches from older versions, then take control of open pages.
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key.startsWith('momento-') && key !== SHELL_CACHE)
            .map((key) => caches.delete(key)),
        ),
      )
      .then(() => self.clients.claim()),
  );
});

// Fetch: cache-first for the app shell.
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Only handle same-origin GET requests; let the browser deal with the rest.
  if (request.method !== 'GET' || url.origin !== self.location.origin) return;

  // Navigations (typing the URL, reloading, opening the installed app)
  // always get the cached index.html - the router then renders the right view.
  if (request.mode === 'navigate') {
    event.respondWith(
      caches.match('./index.html').then((cached) => cached || fetch(request)),
    );
    return;
  }

  event.respondWith(
    caches.match(request).then((cached) => cached || fetch(request)),
  );
});
