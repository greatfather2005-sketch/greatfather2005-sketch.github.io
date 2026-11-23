const OFFLINE_PAGE = '/5-academy-offline.html';
const CACHE_NAME = 'mnk-offline-v1';
self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll([OFFLINE_PAGE, "/1-academy-icon-192.png"])));
  self.skipWaiting();
});
self.addEventListener('activate', event => event.waitUntil(self.clients.claim()));
self.addEventListener('fetch', event => {
  if (event.request.mode !== 'navigate' || new URL(event.request.url).origin !== self.location.origin) return;
  event.respondWith(fetch(event.request).catch(() => caches.match(OFFLINE_PAGE)));
});
