// Learn more about PostCSS:
// https://github.com/postcss/postcss
// Dependencies: npm i -D postcss-cli postcss-preset-env

module.exports = () => ({
  plugins: {
    'postcss-preset-env': {
      stage: 3,
      features: {
        'custom-properties': {
          preserve: true,
          fallback: true,
        },
      },
      autoprefixer: {
        flexbox: true,
        grid: false,
      },
    },
    cssnano: {},
  },
});
