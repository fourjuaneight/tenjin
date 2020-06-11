// Import helpers
const isoDate = require('./src/config/isoDate');
const markdown = require('markdown-it');
const markdownLink = require('markdown-it-link-attributes');
const minifier = require('./src/config/minifier');
const regDate = require('./src/config/regDate');
const relDate = require('./src/config/relDate');
const uglify = require('./src/config/uglify');
const zeroValue = require('./src/config/zeroValue');

// Markdown
const markdownItRenderer = new markdown();
let options = {
  html: true,
  breaks: true,
  linkify: true,
};
let linkOps = {
  attrs: {
    target: '_blank',
    rel: 'noopener noreferrer',
  },
};

module.exports = config => {
  // Libraries
  config.setLibrary('md', markdown(options).use(markdownLink, linkOps));

  // Transform
  config.addTransform('minifier', minifier);
  config.addTransform('uglify', uglify);

  // Date Fileter
  config.addFilter('isoDate', date => isoDate(date));
  config.addFilter('relDate', date => relDate(date));
  config.addFilter('regDate', date => regDate(date));

  // Data modifiers
  config.addFilter('zeroValue', value => zeroValue(value));

  // markdown filter
  config.addFilter('markdownify', str => {
    return markdownItRenderer.renderInline(str);
  });

  // Passthrough assets
  config.addPassthroughCopy('src/admin/index.html');
  config.addPassthroughCopy('src/admin/config.yml');
  config.addPassthroughCopy('src/fonts');
  config.addPassthroughCopy('src/icons');
  config.addPassthroughCopy('src/img');
  config.addPassthroughCopy('src/manifest.json');

  // Custom collections
  const now = new Date();
  const livePosts = post => post.date <= now && !post.data.draft;
  config.addCollection('posts', collection => {
    return [
      ...collection.getFilteredByGlob('./src/posts/*.md').filter(livePosts),
    ].reverse();
  });
  config.addCollection('feed', collection => {
    return [
      ...collection.getFilteredByGlob('./src/posts/*.md').filter(livePosts),
    ]
      .reverse()
      .slice(0, 5);
  });
  config.addCollection('tags', tags);

  // Watch assets
  config.addWatchTarget('assets/scss/');
  config.addWatchTarget('assets/js/');

  return {
    dir: {
      data: '_data',
      input: 'src',
      output: 'dist',
      includes: '_includes',
    },
    passthroughFileCopy: true,
  };
};
