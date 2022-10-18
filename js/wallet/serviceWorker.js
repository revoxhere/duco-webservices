const cacheName = 'duco_wallet-v1';

// Files to cache

const contentToCache = [
    '../../img/yenn-sea-1.jpg',
    '../../img/AmongTreesScreenshot5.jpg',
    '../../backgrounds/wallet/yenn-mountains-1.jpg',
    '../../img/csou8q3.jpeg',
    "../../img/halloween1.jpg",
    "../../img/halloween2.jpg",
    "../../img/halloween3.jpg",

    '../../assets/sushi.png',
    '../../assets/sunswap.png',
    '../../assets/pancake.png',
    '../../assets/ubeswap.png',
    '../../assets/ducoexchange.png',

    '../../assets/explorer.png',
    '../../assets/webminer.png',
    '../../assets/ducominingdashboarddark.png',
    '../../assets/ducopcgeek.png',
    '../../assets/magi.png',
    '../../assets/pastelfaucet.png',

    '../../assets/amogus_faucet.png',
    '../../assets/duco_square.png',
    '../../assets/duino_faucet.png',
    '../../assets/ecoria.png',
    '../../assets/furim_faucet.png',

    '../jquery-3.6.0.min.js',
    '../fontawesome.js',
    '../chart.js',
    '../jquery-ui.min.js',
    '../qr-code-styling.js',
    '../qr-scanner.js',

    '../../assets/loadfailed.jpg',

    '../../img/esp32.gif',
    '../../img/wemos.gif',
    '../../img/arduino.gif',

    '../../assets/duco.svg',
];

// Installing Service Worker
self.addEventListener('install', (e) => {
  console.log('[Service Worker] Install');
  e.waitUntil((async () => {
    const cache = await caches.open(cacheName);
    console.log('[Service Worker] Caching all: app shell and content');
    await cache.addAll(contentToCache);
  })());
});

// Fetching content using Service Worker
self.addEventListener('fetch', (e) => {
  e.respondWith((async () => {
    const r = await caches.match(e.request);
    console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
    if (r) return r;
    const response = await fetch(e.request);
    const cache = await caches.open(cacheName);
    console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
    cache.put(e.request, response.clone());
    return response;
  })());
});
