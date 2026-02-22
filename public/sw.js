
const CACHE_NAME = 'catbox-image-cache-v1';
const CATBOX_URLS = [
  "https://files.catbox.moe/m7lj8u.png",
  "https://files.catbox.moe/u1skwz.png",
  "https://files.catbox.moe/z2ersq.png",
  "https://files.catbox.moe/3kliif.png",
  "https://files.catbox.moe/a4f1ct.png",
  "https://files.catbox.moe/8eq6dp.png",
  "https://files.catbox.moe/bx9f18.png",
  "https://files.catbox.moe/w22pf1.png",
  "https://files.catbox.moe/4w42hk.png",
  "https://files.catbox.moe/c0ot8t.png",
  "https://files.catbox.moe/021b0u.png",
  "https://files.catbox.moe/6rjppv.jfif",
  "https://files.catbox.moe/j9s890.png",
  "https://files.catbox.moe/0nk6tf.png",
  "https://files.catbox.moe/jkxmsd.png",
  "https://files.catbox.moe/mdd3ye.png"
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Opened cache');
      return cache.addAll(CATBOX_URLS);
    })
  );
});

self.addEventListener('fetch', (event) => {
  if (CATBOX_URLS.includes(event.request.url)) {
    event.respondWith(
      caches.match(event.request).then((response) => {
        if (response) {
          return response;
        }
        return fetch(event.request).then((networkResponse) => {
          if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
            return networkResponse;
          }
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
          return networkResponse;
        });
      })
    );
  }
});
