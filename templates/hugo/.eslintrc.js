module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    jquery: true,
    jest: true,
    node: true,
    serviceworker: true
  },
  extends: ['airbnb', 'prettier'],
  plugins: ['prettier'],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 8,
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      impliedStrict: true,
      classes: true
    },
    sourceType: 'module'
  },
  rules: {
    'arrow-body-style': ['error', 'always'],
    'curly': 2,
    'dot-notation': 2,
    'func-names': 0,
    'id-length': [
      2,
      {
        'exceptions': ['i','a','b']
      }
    ],
    'import': 0,
    'import/no-unresolved': [
      2,
      { 'caseSensitive': false }
   ],
    'import/prefer-default-export': 0,
    'linebreak-style': 0,
    'no-alert': 0,
    'no-await-in-loop': 0,
    'no-console': [
      'error',
      {
        'allow': [
          'warn',
          'error'
        ]
      }
    ],
    'no-const-assign': 2,
    'no-debugger': 0,
    'no-dupe-class-members': 2,
    'no-else-return': 2,
    'no-inner-declarations': 2,
    'no-lonely-if': 2,
    'no-magic-numbers': 'off',
    'no-param-reassign': ['error', { 'props': false }],
    'no-shadow': [
      2,
      {
        'hoist': 'all',
        'allow': [
          'resolve',
          'reject',
          'done',
          'next',
          'err',
          'error'
        ]
      }
    ],
    'no-nested-ternary': 'off',
    'no-unneeded-ternary': 2,
    'no-unused-expressions': 2,
    'no-unused-vars': [
      2,
      {
        'args': 'none'
      }
    ],
    'no-useless-return': 2,
    'no-var': 2,
    'one-var': [2, 'never'],
    'prefer-arrow-callback': 2,
    'prefer-const': 2,
    'prefer-promise-reject-errors': 2,
    'quotes': [
      'error',
      'backtick',
    ],
    'prettier/prettier': [
      'error',
      {
        'arrowParens': 'avoid',
        'bracketSpacing': false,
        'endOfLine': 'auto',
        'jsxBracketSameLine': false,
        'printWidth': 80,
        'proseWrap': 'preserve',
        'requirePragma': false,
        'semi': true,
        'singleQuote': true,
        'tabWidth': 2,
        'trailingComma': 'es5',
        'useTabs': false,
        'overrides': [
          {
            'files': '*.json',
            'options': {
              'printWidth': 200
            }
          }
        ]
      }
    ],
    'sort-imports': 2,
    'sort-keys': [
      2,
      'asc',
      {
        'caseSensitive': true,
        'natural': true
      }
    ],
    'sort-vars': 2,
    'space-before-function-paren': 0,
    'strict': [2, 'global']
  },
  'settings': {
    'import/no-unresolved': 'off',
    'import/resolver': 'webpack'
  }
}