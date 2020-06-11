/* eslint-disable class-methods-use-this */
const { readdirSync, readFileSync } = require('fs');
const { resolve } = require('path');
const { minify } = require('terser');
const babel = require('@babel/core');

// file paths
const jsFiles = readdirSync(resolve('./assets/js'));
const jsData = jsFiles
  .map(file =>
    readFileSync(resolve(`./assets/js/${file}`), 'utf8', data => data)
  )
  .join('\n');
const outputFile = 'scripts.js';

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
    // transpile with babel; uses local config file and browserslist in package.json
    const compiled = await babel
      .transformAsync(jsData)
      .then(result => result.code);

    const minified = await minify(compiled);

    return minified.code;
  }
};
