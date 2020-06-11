// Learn more about Babel:
// https://babeljs.io/

module.exports = api => {
  const plugins = [
    'module:@babel/plugin-proposal-class-properties',
    'module:@babel/plugin-proposal-optional-chaining',
    'macros',
  ];
  const presets = [
    [
      'module:@babel/preset-env',
      {
        include: ['transform-arrow-functions'],
      },
    ],
  ];

  api.cache(false);
  return {
    plugins,
    presets,
  };
};
