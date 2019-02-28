module.exports = ({}) => ({
  plugins: {
    'autoprefixer': {browsers: ['> 5%']},
    'cssnano': {preset: 'default'},
    'postcss-calc': {},
    'postcss-custom-properties': {},
    'postcss-import': {},
    'postcss-mixins': {},
    'postcss-nested': {},
    'postcss-simple-vars': {},
  }
})