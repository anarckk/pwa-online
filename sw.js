var cacheStorageKey = 'hello-pwa-4'

var cacheList = [
    "/pwa-online/index.html",
    "/pwa-online/main.css",
    "/pwa-online/icon_192x192.png",
    "https://github.githubassets.com/favicons/favicon.svg"
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
