const { offlineFallback, warmStrategyCache } = require('workbox-recipes');
const { CacheFirst, StaleWhileRevalidate } = require('workbox-strategies');
const { registerRoute } = require('workbox-routing');
const { CacheableResponsePlugin } = require('workbox-cacheable-response');
const { ExpirationPlugin } = require('workbox-expiration');
const { precacheAndRoute } = require('workbox-precaching/precacheAndRoute');

precacheAndRoute(self.__WB_MANIFEST);

// Configuration du cache des pages
const pageCacheConfig = {
  cacheName: 'page-cache',
  plugins: [
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    new ExpirationPlugin({
      maxAgeSeconds: 30 * 24 * 60 * 60,
    }),
  ],
};
const pageCache = new CacheFirst(pageCacheConfig);

// Configuration du cache des ressources
const assetCacheConfig = {
  cacheName: 'asset-cache',
  plugins: [
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
  ],
};
const assetCache = new StaleWhileRevalidate(assetCacheConfig);

// Enregistrement des routes
try {
  // Enregistrement de la route pour la mise en cache des pages
  registerRoute(({ request }) => request.mode === 'navigate', pageCache);

  // Enregistrement de la route pour la mise en cache des ressources
  registerRoute(
    ({ request }) => ['style', 'script', 'worker'].includes(request.destination),
    assetCache
  );
} catch (error) {
  console.error('Erreur lors de l enregistrement des routes:', error);
}