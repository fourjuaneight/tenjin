module.exports = {
  env: {
    browser: true,
    es6: true,
    jest: true,
    node: true,
  },
  extends: [
    "plugin:@typescript-eslint/recommended",
    "prettier/@typescript-eslint",
    "plugin:prettier/recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
  ],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
    tw: true,
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
  },
  rules: {
    "id-length": [
      2,
      {
        exceptions: ["_", "a", "b", "i", "x", "y", "z"],
      },
    ],
    "no-console": [
      "error",
      {
        allow: ["error", "info"],
      },
    ],
    "no-case-declarations": 0,
    "no-nested-ternary": 0,
    "prettier/prettier": [
      "error",
      {
        arrowParens: "avoid",
        bracketSpacing: true,
        endOfLine: "auto",
        printWidth: 80,
        proseWrap: "preserve",
        requirePragma: false,
        semi: true,
        singleQuote: true,
        tabWidth: 4,
        trailingComma: "none",
        useTabs: false,
        overrides: [
          {
            files: "*.json",
            options: {
              printWidth: 200,
            },
          },
        ],
      },
    ],
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-useless-constructor": "off",
    "@typescript-eslint/no-empty-function": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-unused-vars": "off",
  },
};
