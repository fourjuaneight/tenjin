// Learn more about Babel:
// https://babeljs.io/
// Dependencies: npm i -D @babel/core @babel/preset-env @babel/register babel-cli browserlist

module.exports = api => {
  const presets = [
    [
      '@babel/preset-env',
      {
        targets: '> 3%, defaults, safari >= 10, ios >= 10'
      },
    ],
  ];

  api.cache(false);
  return {
    presets,
  };
};
