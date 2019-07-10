// Learn more about PostCSS:
// https://github.com/postcss/postcss
// Dependencies: npm i -D postcss-cli postcss-preset-env

module.exports = () => {
  return {
    plugins: {
      'postcss-preset-env': {
        stage: 3,
        autoprefixer: {
          flexbox: true,
          grid: false
        },
        overrideBrowserslist: [
          '> 5%',
          'IE 11'
        ]
      }
    }
  };
};
