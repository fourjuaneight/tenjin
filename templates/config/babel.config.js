// Learn more about Babel:
// https://babeljs.io/
// Dependencies: npm i -D @babel/core @babel/preset-env @babel/register babel-cli

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
