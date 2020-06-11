const { minify } = require('html-minifier');

// minify HTML
module.exports = (value, outputPath) => {
  if (outputPath.indexOf('.html') > -1) {
    const minified = minify(value, {
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
