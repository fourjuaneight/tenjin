// Swiper: https://github.com/nolimits4web/swiper/
// npm i -D swiper

import { Swiper, Autoplay } from 'swiper/dist/js/swiper.esm';

// Install modules
Swiper.use([Autoplay, EffectFade, Navigation, Pagination]);

// Use Swiper
const swiperHero = new Swiper('.swiper', {
  autoplay: {
    delay: 5000,
  },
  effect: 'fade',
  fadeEffect: {
    crossFade: true,
  },
});