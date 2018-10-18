let config = {
  use: [
    'postcss-cssnext',
    'postcss-import',
    'postcss-custom-properties',
    'postcss-nesting',
    'postcss-calc',
  ],
  'autoprefixer': {
    browsers: '> 5%'
  },
  'postcssCssnext': {
    features: {
      autoprefixer: true
    }
  },
};

module.exports = config;