// Learn more about Prettier:
// https://prettier.io/
// Dependencies: npm i -D prettier

module.exports = {
  arrowParens: 'avoid',
  bracketSpacing: false,
  endOfLine: 'auto',
  jsxBracketSameLine: false,
  overrides: [
    {
      files: '*.json',
      options: {
        printWidth: 200,
      },
    },
  ],
  printWidth: 80,
  proseWrap: 'preserve',
  requirePragma: false,
  semi: true,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'es5',
  useTabs: false,
};
