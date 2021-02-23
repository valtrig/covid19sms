// Name of the cache holding the application's resources
const SITE_CACHE_NAME = 'site-cache-v{{version}}';

// Resources to be cached
const SITE_RESOURCES = [
  '/',
  '/android-chrome-192x192.png',
  '/android-chrome-512x512.png',
  '/apple-touch-icon.png',
  '/browserconfig.xml',
  '/cc-by-nc-sa-3.0-88x31.png',
  '/favicon-16x16.png',
  '/favicon-32x32.png',
  '/favicon.ico',
  '/favicon.png',
  '/index.html',
  '/main.css',
  '/main.js',
  '/mstile-150x150.png',
  '/safari-pinned-tab.svg',
  '/site.webmanifest',
  '/fontawesome-free/css/all.css',
  '/fontawesome-free/webfonts/fa-solid-900.woff2',
  '/fontawesome-free/webfonts/fa-solid-900.woff',
  '/fontawesome-free/webfonts/fa-solid-900.ttf',
  '/fontawesome-free/webfonts/fa-solid-900.svg',
  '/fontawesome-free/webfonts/fa-solid-900.eot'
];

self.addEventListener('install', function (event) {
  event.waitUntil(
    // Open the application's cache.
    caches.open(SITE_CACHE_NAME)
      .then(function (cache) {
        // Add the application's resources to the cache.
        return cache.addAll(SITE_RESOURCES);
      })
  );
});

self.addEventListener('activate', function (event) {
  event.waitUntil(
    // Iterate all previously stored caches by name.
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.filter(function (cacheName) {
          // Filter out all caches except for the current application version.
          return SITE_CACHE_NAME !== cacheName;
        }).map(function (cacheName) {
          // Delete the filtered out caches.
          return caches.delete(cacheName);
        })
      );
    })
  );
});

self.addEventListener('fetch', function (event) {
  // Return the requested resource from the cache.
  event.respondWith(caches.match(event.request));
});
