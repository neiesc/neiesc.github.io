import '../css/main.css'

require('particles.js')

window.particlesJS.load('particles-js', '/particles.json')

if (document.querySelector('main.blog')) {
  const blog = require('./blog')
  blog.init()
}

if (document.querySelector('main.podcasts')) {
  const podcast = require('./podcast')
  podcast.init()
}

if (document.querySelector('main.projects')) {
  const projects = require('./projects')
  projects.init()
}
