/* eslint-disable class-methods-use-this */
const cssnano = require('cssnano');
const postcss = require('postcss');
const postcssPresetEnv = require('postcss-preset-env');
const sass = require('sass');
const { promisify } = require('util');

const renderSass = promisify(sass.render);

// postCSS config
const presetEnv = postcssPresetEnv({
  autoprefixer: {
    flexbox: true,
    grid: true,
  },
  features: {
    'custom-properties': {
      fallback: true,
      preserve: true,
    },
  },
  stage: 3,
});
// use cssnano for minification and presetEnv for prefixing config
const postcssProcessor = postcss([cssnano, presetEnv]);

// file paths
const inputFile = 'assets/scss/main.scss';
const outputFile = 'styles.css';

module.exports = class {
  // template "frontmatter"
  data() {
    return {
      eleventyExcludeFromCollections: true,
      layout: false,
      permalink: outputFile,
    };
  }

  async render() {
    // scss to css
    const { css } = await renderSass({
      file: inputFile,
    });

    // output processed file
    return postcssProcessor
      .process(css, {
        from: inputFile,
        to: outputFile,
      })
      .then(result => result.css);
  }
};
