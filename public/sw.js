const CACHE = 'alcazar-v1'
self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(['./', './index.html', './manifest.json'])))
  self.skipWaiting()
})
self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== CACHE).map((k) => caches.delete(k)))))
  self.clients.claim()
})
// Red primero para navegación; caché primero para assets. Offline cae a caché.
self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET' || !e.request.url.startsWith(self.location.origin)) return
  const nav = e.request.mode === 'navigate'
  e.respondWith(
    (nav ? fetch(e.request).catch(() => caches.match('./index.html')) :
      caches.match(e.request).then((hit) => hit || fetch(e.request).then((res) => {
        const copy = res.clone(); caches.open(CACHE).then((c) => c.put(e.request, copy)); return res
      }))
    )
  )
})
