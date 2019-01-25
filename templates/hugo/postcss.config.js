module.exports = ({}) => ({
  plugins: {
    'autoprefixer': { browsers: ['> 5%'] },
    'cssnano': { preset: 'default' },
    'postcss-import': {},
    'postcss-custom-properties': {},
    'postcss-nested': {},
    'postcss-calc': {},
    'postcss-mixins': {},
    'postcss-simple-vars': {}
  }
})