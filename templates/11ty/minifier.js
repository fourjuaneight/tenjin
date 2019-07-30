const htmlmin = require('html-minifier');

const htmlMinTransform = (value, outputPath) => {
  if (outputPath.indexOf('.html') > -1) {
    const minified = htmlmin.minify(value, {
      collapseWhitespace: true,
      minifyCSS: true,
      minifyJS: true,
      removeComments: true,
      useShortDoctype: true,
    });
    return minified;
  }
  return value;
};

module.exports = htmlMinTransform;