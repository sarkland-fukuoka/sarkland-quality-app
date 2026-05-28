const CACHE_NAME = 'sarkland-v3';
const urlsToCache = [
  '/sarkland-quality-app/',
  '/sarkland-quality-app/index.html',
  '/sarkland-quality-app/manifest.json'
];

// インストール時に古いキャッシュを削除
self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

// 古いキャッシュを削除してすぐに有効化
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      )
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request).catch(() =>
      caches.match(event.request)
    )
  );
});
