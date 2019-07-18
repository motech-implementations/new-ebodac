workbox.routing.registerRoute(
  new RegExp('/css/.*\.css | /js/.*\.js'),
  new workbox.strategies.CacheFirst()
);

clients.claim();

workbox.precaching.precacheAndRoute(self.__precacheManifest);
