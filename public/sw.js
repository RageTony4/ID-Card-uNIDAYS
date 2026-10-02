
const CACHE_NAME = 'avatar-image-cache-v11';
const AVATAR_URLS = [
  "/assets/mockups/natural_view_19.jpg",
  "/assets/mockups/natural_view_21.jpg",
  "/assets/eastbridge_crest_transparent.png",
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
  "/assets/avatars/male_30.webp",
  "/assets/avatars/male_31.webp",
  "/assets/avatars/male_32.webp",
  "/assets/avatars/male_33.webp",
  "/assets/avatars/male_34.webp",
  "/assets/avatars/male_35.webp",
  "/assets/avatars/male_36.webp",
  "/assets/avatars/male_37.webp",
  "/assets/avatars/male_38.webp",
  "/assets/avatars/male_39.webp",
  "/assets/avatars/male_40.webp",
  "/assets/avatars/male_41.webp",
  "/assets/avatars/male_42.webp",
  "/assets/avatars/male_43.webp",
  "/assets/avatars/male_44.webp",
  "/assets/avatars/male_45.webp",
  "/assets/avatars/male_46.webp",
  "/assets/avatars/male_47.webp",
  "/assets/avatars/male_48.webp",
  "/assets/avatars/male_49.webp",
  "/assets/avatars/male_50.webp",
  "/assets/avatars/male_51.webp",
  "/assets/avatars/male_52.webp",
  "/assets/avatars/male_53.webp",
  "/assets/avatars/male_54.webp",
  "/assets/avatars/male_55.webp",
  "/assets/avatars/male_56.webp",
  "/assets/avatars/male_57.webp",
  "/assets/avatars/male_58.webp",
  "/assets/avatars/male_59.webp",
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
  "/assets/avatars/female_27.webp",
  "/assets/avatars/female_28.webp",
  "/assets/avatars/female_29.webp",
  "/assets/avatars/female_30.webp",
  "/assets/avatars/female_31.webp",
  "/assets/avatars/female_32.webp",
  "/assets/avatars/female_33.webp",
  "/assets/avatars/female_34.webp",
  "/assets/avatars/female_35.webp",
  "/assets/avatars/female_36.webp",
  "/assets/avatars/female_37.webp",
  "/assets/avatars/female_38.webp",
  "/assets/avatars/female_39.webp",
  "/assets/avatars/female_40.webp",
  "/assets/avatars/female_41.webp",
  "/assets/avatars/female_42.webp",
  "/assets/avatars/female_43.webp",
  "/assets/avatars/female_44.webp",
  "/assets/avatars/female_45.webp",
  "/assets/avatars/female_46.webp",
  "/assets/avatars/female_47.webp",
  "/assets/avatars/female_48.webp",
  "/assets/avatars/female_49.webp",
  "/assets/avatars/female_50.webp",
  "/assets/avatars/female_51.webp",
  "/assets/avatars/female_52.webp",
  "/assets/avatars/female_53.webp",
  "/assets/avatars/female_54.webp",
  "/assets/avatars/female_55.webp",
  "/assets/avatars/female_56.webp",
  "/assets/avatars/female_57.webp",
  "/assets/avatars/female_58.webp",
  "/assets/avatars/female_59.webp",
  "/assets/avatars/female_60.webp",
  "/assets/avatars/female_61.webp",
  "/assets/avatars/female_62.webp",
  "/assets/avatars/female_63.webp",
  "/assets/avatars/female_64.webp",
  "/assets/avatars/female_65.webp",
  "/assets/avatars/female_66.webp",
  "/assets/avatars/female_67.webp",
  "/assets/avatars/female_68.webp",
  "/assets/avatars/female_69.webp",
  "/assets/avatars/female_70.webp",
  "/assets/avatars/female_71.webp",
  "/assets/avatars/female_72.webp",
  "/assets/avatars/female_73.webp",
  "/assets/avatars/female_74.webp",
  "/assets/avatars/female_75.webp",
  "/assets/avatars/female_76.webp",
  "/assets/avatars/female_77.webp",
  "/assets/avatars/female_78.webp",
  "/assets/avatars/female_79.webp",
  "/assets/avatars/female_80.webp",
  "/assets/avatars/female_81.webp",
  "/assets/avatars/female_82.webp",
  "/assets/avatars/female_83.webp",
  "/assets/avatars/female_84.webp",
  "/assets/avatars/female_85.webp",
  "/assets/avatars/female_86.webp",
  "/assets/avatars/female_87.webp",
  "/assets/avatars/female_88.webp",
  "/assets/avatars/female_89.webp",
  "/assets/avatars/female_90.webp",
  "/assets/avatars/female_91.webp",
  "/assets/avatars/female_92.webp",
  "/assets/avatars/female_93.webp",
  "/assets/avatars/female_94.webp",
  "/assets/avatars/female_95.webp",
  "/assets/avatars/female_96.webp",
  "/assets/avatars/female_97.webp",
  "/assets/avatars/female_98.webp",
  "/assets/avatars/female_99.webp",
  "/assets/avatars/female_100.webp",
  "/assets/avatars/female_101.webp",
  "/assets/avatars/female_102.webp",
  "/assets/avatars/female_103.webp",
  "/assets/avatars/female_104.webp",
  "/assets/avatars/female_105.webp",
  "/assets/avatars/female_106.webp",
  "/assets/avatars/female_107.webp",
  "/assets/avatars/female_108.webp",
  "/assets/avatars/female_109.webp"
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
