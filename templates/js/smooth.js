// Smooth-Scroll: https://github.com/cferdinandi/smooth-scroll
// npm i -D smooth-scroll

import SmoothScroll from 'smooth-scroll/dist/smooth-scroll'

// eslint-disable-line no-unused-vars
const scroll = new SmoothScroll('a[href*="#"]', {
  speed: 500,
  speedAsDuration: true,
  easing: 'easeOutQuad',
  updateURL: false
});