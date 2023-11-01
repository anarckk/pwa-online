var cacheStorageKey = 'hello-pwa-4'

var cacheList = [
    "/pwa-online/index.html",
    "/pwa-online/main.css",
    "/pwa-online/android-chrome-192x192.png",
    "/pwa-online/favicon.ico"
]

self.addEventListener('install', e => {
    e.waitUntil(
        caches.open(cacheStorageKey)
            .then(cache => cache.addAll(cacheList))
            .then(() => self.skipWaiting())
    )
})
self.addEventListener('fetch', function (e) {
    e.respondWith(
        caches.match(e.request).then(function (response) {
            if (response != null) {
                return response
            }
            return fetch(e.request.url)
        })
    )
})
self.addEventListener('activate', function (e) {
    e.waitUntil(
        caches.keys().then(cacheNames => {
            return cacheNames.map(name => {
                if (name !== cacheStorageKey) {
                    return caches.delete(name)
                }
            })
        })
    )
    return self.clients.claim()
})
