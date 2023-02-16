const { generate } = require('critical');
const { minify } = require('html-minifier');

const buildDir = 'dist';

const shouldTransformHTML = outputPath =>
  outputPath &&
  outputPath.endsWith('.html') &&
  process.env.ELEVENTY_ENV === 'production';

const isHomePage = outputPath => outputPath === `${buildDir}/index.html`;

process.setMaxListeners(Infinity);

module.exports = {
  htmlmin: (content, outputPath) => {
    if (shouldTransformHTML(outputPath)) {
      return minify(content, {
        collapseWhitespace: true,
        minifyCSS: true,
        minifyJS: true,
        removeComments: true,
        useShortDoctype: true,
      });
    }

    return content;
  },

  critical: async (content, outputPath) => {
    if (shouldTransformHTML(outputPath) && isHomePage(outputPath)) {
      try {
        const config = {
          base: `${buildDir}/`,
          html: content,
          inline: true,
          width: 1280,
          height: 1000,
        };
        const { html } = await generate(config);

        return html;
      } catch (err) {
        console.error('[Critical Transform]:', err);
      }
    }
    return content;
  },
};
