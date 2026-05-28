const CACHE_NAME = 'sarkland-v1';
const urlsToCache = [
  '/sarkland-quality-app/',
  '/sarkland-quality-app/index.html',
  '/sarkland-quality-app/manifest.json'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});

self.addEventListener('push', event => {
  const data = event.data ? event.data.json() : {};
  const title = data.title || 'SARKLAND 品質管理';
  const options = {
    body: data.body || '新しい入庫チェックが届きました',
    icon: '/sarkland-quality-app/icon-192.svg',
    badge: '/sarkland-quality-app/icon-96.svg',
    data: data
  };
  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', event => {
  event.notification.close();
  event.waitUntil(clients.openWindow('/sarkland-quality-app/'));
});
