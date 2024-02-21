var CACHE_NAME = 'static-v1';

self.addEventListener('install', function (event) {

  console.log("Service install");

  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll([
        '/',
        '/index.html',
        '/192x192.png',
        '/512x512.png',
        '/manifest.json',
        '/vite.svg',
        '/src/assets/react.svg',
        '/src/App.css',
        '/src/App.jsx',
        '/src/index.css',
        '/src/index.jsx',
        '/.eslintrc.cjs',
        '/package-lock.json',
        '/package.json',
        '/postcss.config.js',
        '/serviceWorker.js',
        '/tailwind.config.js',
        '/vite.config.js',
      ]);
    })
  )
});

self.addEventListener('activate', function activator(event) {

  console.log("Service activate");

  event.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys
        .filter(function (key) {
          return key.indexOf(CACHE_NAME) !== 0;
        })
        .map(function (key) {
          return caches.delete(key);
        })
      );
    })
  );
});

self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request).then(function (cachedResponse) {
      return cachedResponse || fetch(event.request);
    })
  );
});