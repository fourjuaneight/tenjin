const { minify } = require('terser');
const babel = require('@babel/core');

// minify HTML
module.exports = async (value, outputPath) => {
  if (outputPath.indexOf('.js') > -1) {
    // transpile with babel; uses local config file and browserslist in package.json
    const compiled = await babel
      .transformAsync(value)
      .then(result => result.code);

    const minified = await minify(compiled);

    return minified.code;
  }

  return value;
};
