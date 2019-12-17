// Import plugins
const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');

// Import transforms
const minifier = require('./src/transforms/minifier.js');
const tags = require('./src/transforms/tags.js');

// Markdown
const markdown = require('markdown-it');
let markdownLink = require('markdown-it-link-attributes');
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

const elConf = config => {
  // Plugins
  config.addPlugin(syntaxHighlight);

  // Libraries
  config.setLibrary('md', markdown(options).use(markdownLink, linkOps));

  // Transform
  config.addTransform('minifier', minifier);

  // Passthrough
  // assets
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

module.exports = elConf;
