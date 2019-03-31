module.exports = api => {
  const presets = [
    [
      'babel-preset-gatsby',
      {
        targets: {
          browsers: ['last 2 versions', 'safari >= 7'],
        },
      },
    ],
  ];

  api.cache(false);
  return {
    presets,
  };
};
