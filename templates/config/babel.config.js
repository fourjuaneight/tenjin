// Learn more about Babel:
// https://babeljs.io/

module.exports = api => {
  const presets = [
    [
      '@babel/preset-env',
      {
        targets: {
          browsers: ['ie >= 11']
        },
        'useBuiltIns': 'entry'
      },
    ],
  ];

  api.cache(false);
  return {
    presets,
  };
};
