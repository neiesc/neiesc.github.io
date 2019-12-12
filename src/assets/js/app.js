import '../css/main.css'

require('particles.js')

window.particlesJS.load('particles-js', '/particles.json')

if (document.querySelector('main.podcasts')) {
  const podcast = require('./podcast')
  podcast.init()
}

if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/sw.js').then(
      function(registration) {
        // Registration was successful
        console.log(
          'ServiceWorker registration successful with scope: ',
          registration.scope
        )
      },
      function(err) {
        // registration failed :(
        console.log('ServiceWorker registration failed: ', err)
      }
    )
  })
}
