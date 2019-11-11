import '../css/main.css';

require('particles.js');
var podcast = require('./podcast');

window.particlesJS.load('particles-js', '/particles.json');

if (document.querySelector('main.podcasts')) {
  podcast.init();
}
