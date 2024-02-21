var cacheTeste = 'teste-v1';

self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(cacheTeste).then(function (cache) {
            return cache.addAll([
                '/',
                '/index.html',
                '/public/192x192.png',
                '/public/512x512.png',
                '/vite.svg',
                '/public/manifest.json',
                '/serviceWorker.js',
                '/package.md',
                '/package.json',
                '/package.config.js',
                '/package-lock.json',
                '/.eslintrc.cjs',
                '/vite.config.js',
                '/src/App.css',
                '/src/App.jsx',
                '/src/index.css',
                '/src/index.jsx',
                '/src/main.jsx',
                '/tailwind.config.js',
            ]);
        })
    )
});

self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request).then(function (cachedResponse) {
            return cachedResponse || fetch(event.request);
        })
    );
});