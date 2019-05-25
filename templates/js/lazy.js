// Lazy Loader: https://github.com/verlok/lazyload#-recipes
import LazyLoad from 'vanilla-lazyload';

// Options
const lazyLoadOptions = {
  class_error: `error`,
  class_loading: `loading`,
  elements_selector: `.lazy`,
  threshold: 500,
};

const myLazyLoad = new LazyLoad(lazyLoadOptions); // eslint-disable-line no-unused-vars
