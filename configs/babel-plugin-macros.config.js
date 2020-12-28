// Learn more about Babel macros:
// https://github.com/okonet/lint-staged#configuration
// and Twin:
// https://github.com/ben-rogerson/twin.macro/blob/master/README.md

module.exports = {
  twin: {
    preset: 'styled-components',
    config: 'tailwind.config.js',
    autoCssProp: true,
  },
};
