const CACHE_NAME = 'colpovision-v1';
const ASSETS = [
    '/',
    '/index.html',
    'https://cdn.tailwindcss.com',
    'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js'
];

// Instala la app en el dispositivo
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('Archivos cacheados para uso offline');
            return cache.addAll(ASSETS);
        })
    );
});

// Intercepta las peticiones para que funcione sin internet
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});