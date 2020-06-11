// Smooth-Scroll: https://github.com/cferdinandi/smooth-scroll
// npm i -D smooth-scroll

import SmoothScroll from 'smooth-scroll/dist/smooth-scroll';

// eslint-disable-line no-unused-vars
// eslint-disable-next-line no-unused-vars
const scroll = new SmoothScroll('a[href*="#"]', {
  easing: 'easeOutQuad',
  speed: 500,
  speedAsDuration: true,
  updateURL: false,
});
