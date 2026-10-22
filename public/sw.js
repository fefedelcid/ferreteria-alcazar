const CACHE = 'alcazar-v2'
self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(['./', './index.html', './manifest.json'])))
  self.skipWaiting()
})
self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== CACHE).map((k) => caches.delete(k)))))
  self.clients.claim()
})
self.addEventListener('fetch', (e) => {
  const req = e.request
  if (req.method !== 'GET' || !req.url.startsWith(self.location.origin)) return
  // Red primero (con respaldo offline) para la navegación y las opiniones; caché primero para el resto
  if (req.mode === 'navigate') {
    e.respondWith(fetch(req).catch(() => caches.match('./index.html')))
  } else if (req.url.includes('resenas.json')) {
    e.respondWith(fetch(req).then((res) => {
      if (res.ok) { const c = res.clone(); caches.open(CACHE).then((x) => x.put(req, c)) }
      return res
    }).catch(() => caches.match(req)))
  } else {
    e.respondWith(caches.match(req).then((hit) => hit || fetch(req).then((res) => {
      const c = res.clone(); caches.open(CACHE).then((x) => x.put(req, c)); return res
    })))
  }
})
