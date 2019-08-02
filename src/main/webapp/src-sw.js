workbox.routing.registerRoute(
  new RegExp('/js/.*\\.js'),
  new workbox.strategies.CacheFirst()
);
workbox.routing.registerRoute(
  new RegExp('/css/.*\\.css'),
  new workbox.strategies.CacheFirst()
);
workbox.routing.registerRoute(
  new RegExp('/.*\\.ico'),
  new workbox.strategies.StaleWhileRevalidate()
);
workbox.routing.registerRoute(
  new RegExp('/'),
  new workbox.strategies.NetworkFirst()
);

clients.claim();

workbox.precaching.precacheAndRoute(self.__precacheManifest);
