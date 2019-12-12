const CACHE_NAME = 'v1'
const urlsToCache = [
  '/index.html',
  'podcasts/index.html',
  'palestras/index.html',
  'main.js '
]

self.addEventListener('install', function(event) {
  console.log('Service Worker: Install')

  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      console.log('Opened cache')
      return cache.addAll(urlsToCache)
    })
  )
})

self.addEventListener('fetch', function(event) {
  console.log('Service Worker: Fetch')
  event.respondWith(
    caches.match(event.request).then(function(response) {
      // Cache hit - return response
      if (response) {
        return response
      }
      return fetch(event.request)
    })
  )
})
