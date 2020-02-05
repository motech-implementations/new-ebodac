workbox.routing.registerRoute(
  new RegExp('/js/.*\\.js'),
  new workbox.strategies.CacheFirst()
);
workbox.routing.registerRoute(
  new RegExp('/css/.*\\.css'),
  new workbox.strategies.CacheFirst()
);
workbox.routing.registerRoute(
  new RegExp('/.*\\.png'),
  new workbox.strategies.StaleWhileRevalidate()
);
workbox.routing.registerRoute(
  new RegExp('/.*\\.jpg'),
  new workbox.strategies.StaleWhileRevalidate()
);
workbox.routing.registerRoute(
  new RegExp('/api/.*'),
  new workbox.strategies.NetworkOnly()
);
workbox.routing.registerRoute(
  new RegExp('/'),
  new workbox.strategies.NetworkFirst()
);

clients.claim();

workbox.precaching.precacheAndRoute(self.__precacheManifest);
