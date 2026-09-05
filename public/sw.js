
const CACHE_NAME = 'avatar-image-cache-v4';
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
  "https://files.catbox.moe/mdd3ye.png",
  "https://any-link-me.lovable.app/f/2n4y4c1h3m.png",
  "https://any-link-me.lovable.app/f/5p6r5h5n01.webp",
  "https://any-link-me.lovable.app/f/2i55155k27.jfif",
  "https://any-link-me.lovable.app/f/4e411e195u.jfif",
  "https://any-link-me.lovable.app/f/30416n5j5f.jfif",
  "https://any-link-me.lovable.app/f/6q2k3h3j5y.jfif",
  "https://any-link-me.lovable.app/f/6n6e3m654l.jfif",
  "https://any-link-me.lovable.app/f/0p5117681p.jfif"
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Opened avatar cache');
      return cache.addAll(AVATAR_URLS);
    })
  );
});

self.addEventListener('fetch', (event) => {
  const url = event.request.url;
  const isAvatarRequest = AVATAR_URLS.some(avatarUrl => url.includes(avatarUrl)) || url.includes('/assets/avatars/');
  
  if (isAvatarRequest) {
    event.respondWith(
      caches.match(event.request).then((response) => {
        if (response) {
          return response;
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
        });
      })
    );
  }
});
