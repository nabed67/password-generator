const CACHE_NAME = "password-generator-v1";
const APP_SHELL = ["./", "./manifest.webmanifest", "./pwa-icon.svg"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    Promise.all([
      caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL)),
      self.skipWaiting(),
    ])
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    Promise.all([
      caches
        .keys()
        .then((cacheNames) =>
          Promise.all(
            cacheNames
              .filter(
                (cacheName) =>
                  cacheName.startsWith("password-generator-") &&
                  cacheName !== CACHE_NAME
              )
              .map((cacheName) => caches.delete(cacheName))
          )
        ),
      self.clients.claim(),
    ])
  );
});

function cacheResponse(request, response) {
  return caches
    .open(CACHE_NAME)
    .then((cache) => cache.put(request, response))
    .catch((error) => {
      console.error("Failed to cache app response:", error);
    });
}

self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  if (request.method !== "GET" || url.origin !== self.location.origin) {
    return;
  }

  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response.ok) {
            event.waitUntil(cacheResponse(request, response.clone()));
          }
          return response;
        })
        .catch(async () => {
          const cachedPage = await caches.match(request);
          return cachedPage || caches.match("./");
        })
    );
    return;
  }

  event.respondWith(
    caches.match(request).then(
      (cachedResponse) =>
        cachedResponse ||
        fetch(request).then((response) => {
          if (response.ok) {
            event.waitUntil(cacheResponse(request, response.clone()));
          }
          return response;
        })
    )
  );
});
