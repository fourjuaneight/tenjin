const util = require('util');
const sass = require('sass');
const renderSass = util.promisify(sass.render);

const postcss = require('postcss');
const cssnano = require('cssnano');
const postcssPresetEnv = require('postcss-preset-env');
const presetEnv = postcssPresetEnv({
  autoprefixer: {
    flexbox: true,
    grid: false,
  },
  features: {
    'custom-properties': {
      fallback: true,
      preserve: true,
    },
  },
  stage: 3,
});
const postcssProcessor = postcss([cssnano, presetEnv]);

// file paths
const inputFile = 'assets/scss/main.scss';
const outputFile = 'styles.css';

module.exports = class {
  data() {
    return {
      eleventyExcludeFromCollections: true,
      layout: false,
      permalink: outputFile,
    };
  }

  async render() {
    const { css } = await renderSass({
      file: inputFile,
    });

    return postcssProcessor.process(css, {
      from: inputFile,
      to: outputFile,
    });
  }
};