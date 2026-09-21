/**
 * Minimal service worker — installability + a basic offline shell (see roadmap item 47).
 *
 * Deliberately conservative: it does NOT cache-first every page, because this site's
 * content changes as the CMS is filled in and forms need a live network connection to
 * submit. Strategy:
 *   - Navigations (HTML pages): network-first, falling back to the cached copy, then to
 *     /offline.html if neither is available.
 *   - Static assets (icons, manifest): cache-first, since they rarely change.
 *
 * Push notification *sending* is not implemented yet — this file only handles the
 * `push` event shape so that piece can be turned on later without touching the rest of
 * the service worker. See lib/models.ts `pushSubscriptions` for the storage side.
 */

const CACHE_NAME = "mla-shell-v1";
const OFFLINE_URL = "/offline.html";
const PRECACHE_ASSETS = [
  OFFLINE_URL,
  "/manifest.json",
  "/icons/icon-192.png",
  "/icons/icon-512.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE_ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;

  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((res) => {
          const copy = res.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
          return res;
        })
        .catch(() => caches.match(request).then((cached) => cached || caches.match(OFFLINE_URL)))
    );
    return;
  }

  const url = new URL(request.url);
  if (url.pathname.startsWith("/icons/") || url.pathname === "/manifest.json") {
    event.respondWith(
      caches.match(request).then((cached) => cached || fetch(request))
    );
  }
});

// Wired for future use once actual push sending (web-push + VAPID) is added server-side.
self.addEventListener("push", (event) => {
  if (!event.data) return;
  let payload;
  try {
    payload = event.data.json();
  } catch {
    payload = { title: "Masters Leadership Academy", body: event.data.text() };
  }
  event.waitUntil(
    self.registration.showNotification(payload.title || "Masters Leadership Academy", {
      body: payload.body || "",
      icon: "/icons/icon-192.png",
      badge: "/icons/icon-192.png",
    })
  );
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  event.waitUntil(self.clients.openWindow(event.notification.data?.url || "/"));
});
