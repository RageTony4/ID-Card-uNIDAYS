
const CACHE_NAME = 'avatar-image-cache-v8';
const AVATAR_URLS = [
  "/assets/avatars/male_1.webp",
  "/assets/avatars/male_2.webp",
  "/assets/avatars/male_3.webp",
  "/assets/avatars/male_4.webp",
  "/assets/avatars/male_5.webp",
  "/assets/avatars/male_6.webp",
  "/assets/avatars/male_7.webp",
  "/assets/avatars/male_8.webp",
  "/assets/avatars/male_9.webp",
  "/assets/avatars/male_10.webp",
  "/assets/avatars/male_11.webp",
  "/assets/avatars/male_12.webp",
  "/assets/avatars/male_13.webp",
  "/assets/avatars/male_14.webp",
  "/assets/avatars/male_15.webp",
  "/assets/avatars/male_16.webp",
  "/assets/avatars/male_17.webp",
  "/assets/avatars/male_18.webp",
  "/assets/avatars/male_19.webp",
  "/assets/avatars/male_20.webp",
  "/assets/avatars/male_21.webp",
  "/assets/avatars/male_22.webp",
  "/assets/avatars/male_23.webp",
  "/assets/avatars/male_24.webp",
  "/assets/avatars/male_25.webp",
  "/assets/avatars/male_26.webp",
  "/assets/avatars/male_27.webp",
  "/assets/avatars/male_28.webp",
  "/assets/avatars/male_29.webp",
  "/assets/avatars/female_1.webp",
  "/assets/avatars/female_2.webp",
  "/assets/avatars/female_3.webp",
  "/assets/avatars/female_4.webp",
  "/assets/avatars/female_5.webp",
  "/assets/avatars/female_6.webp",
  "/assets/avatars/female_7.webp",
  "/assets/avatars/female_8.webp",
  "/assets/avatars/female_9.webp",
  "/assets/avatars/female_10.webp",
  "/assets/avatars/female_11.webp",
  "/assets/avatars/female_12.webp",
  "/assets/avatars/female_13.webp",
  "/assets/avatars/female_14.webp",
  "/assets/avatars/female_15.webp",
  "/assets/avatars/female_16.webp",
  "/assets/avatars/female_17.webp",
  "/assets/avatars/female_18.webp",
  "/assets/avatars/female_19.webp",
  "/assets/avatars/female_20.webp",
  "/assets/avatars/female_21.webp",
  "/assets/avatars/female_22.webp",
  "/assets/avatars/female_23.webp",
  "/assets/avatars/female_24.webp",
  "/assets/avatars/female_25.webp",
  "/assets/avatars/female_26.webp",
  "/assets/avatars/female_27.webp"
];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return Promise.allSettled(
        AVATAR_URLS.map((url) => cache.add(url).catch(() => {}))
      );
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const url = event.request.url;
  const isAvatarRequest = url.includes('/assets/avatars/');
  
  if (isAvatarRequest && event.request.method === 'GET') {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }
        return fetch(event.request).then((networkResponse) => {
          if (!networkResponse || networkResponse.status !== 200) {
            return networkResponse;
          }
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
          return networkResponse;
        }).catch(() => {
          return caches.match('/assets/avatars/female_1.webp');
        });
      })
    );
  }
});
