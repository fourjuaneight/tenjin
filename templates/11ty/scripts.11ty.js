const { readFileSync } = require('fs');
const babel = require('@babel/core');
const Terser = require('terser');

// file paths
const color = readFileSync('assets/js/color.js', 'utf8', data => data);
const noise = readFileSync('assets/js/noise.js', 'utf8', data => data);
const outputFile = 'scripts.js';

module.exports = class {
  data() {
    return {
      eleventyExcludeFromCollections: true,
      layout: false,
      permalink: outputFile,
    };
  }

  async render() {
    const compiled = await babel
      .transformAsync(`${color}${noise}`)
      .then(result => result.code);

    const minified = await Terser.minify(compiled);

    return minified.code;
  }
};