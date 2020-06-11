// Browser APIs
// https://www.gatsbyjs.org/docs/browser-apis/

import 'modern-normalize';
import 'animate.css/animate.compat.css';
import intersectionObserver from 'intersection-observer';

import './src/styles/critical.css';
import './src/styles/tailwind.css';

// Load Service Worker on production only.
export const registerServiceWorker = () => {
  if (process.env.NODE_ENV !== 'production') {
    return null;
  }

  return true;
};

// Skip navigation link for screen reader and keyboard users
export const onRouteUpdate = ({ prevLocation }) => {
  if (prevLocation !== null) {
    const skipLink = document.querySelector('#reach-skip-nav');

    if (skipLink) {
      skipLink.focus();
    }
  }
};

// Intersection Observer polyfill for gatsby-background-image (Safari, IE)
export const onClientEntry = () => {
  if (!('IntersectionObserver' in window)) {
    intersectionObserver();
  }
};
