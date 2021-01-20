// Browser APIs
// https://www.gatsbyjs.org/docs/browser-apis/

import "modern-normalize";
import "animate.css/animate.compat.css";

import wrapWithProvider from "./src/store/reduxWrapper";

import "./src/styles/critical.css";
import "./src/styles/tailwind.css";

// Load Redux store
export const wrapRootElement = wrapWithProvider;

// Load Service Worker on production only.
export const registerServiceWorker = () => {
  if (process.env.NODE_ENV !== "production") {
    return null;
  }

  return true;
};

// Skip navigation link for screen reader and keyboard users
export const onRouteUpdate = ({ prevLocation }) => {
  if (prevLocation !== null) {
    const skipLink = document.querySelector("#reach-skip-nav");

    if (skipLink) {
      skipLink.focus();
    }
  }
};
