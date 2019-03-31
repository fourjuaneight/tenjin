import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LazyLoad from 'vanilla-lazyload';

// Lazy Loading Options
const lazyLoadOptions = {
  class_error: `error`,
  class_loading: `loading`,
  elements_selector: `.lazy`,
  threshold: 500,
};

// Only initialize it one time for the entire application
if (!document.lazyLoadInstance) {
  document.lazyLoadInstance = new LazyLoad(lazyLoadOptions);
}

export class LazyImage extends Component {
  // Update lazyLoad after first rendering of every image
  componentDidMount() {
    document.lazyLoadInstance.update();
  }

  // Update lazyLoad after rerendering of every image
  componentDidUpdate() {
    document.lazyLoadInstance.update();
  }

  // Just render the image with data-src
  render() {
    const { alt, src } = this.props;
    return <img className="lazy" data-src={src} alt={alt} />;
  }
}

LazyImage.propTypes = {
  alt: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
};

export default LazyImage;
