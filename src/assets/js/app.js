import '../css/main.css'

require('particles.js')

window.particlesJS.load('particles-js', '/particles.json')

if (document.querySelector('main.podcasts')) {
  const podcast = require('./podcast')
  podcast.init()
}
