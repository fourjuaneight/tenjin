module.exports = {
  env: {
    browser: true,
    es6: true,
    jest: true,
    node: true,
  },
  extends: [
    "airbnb",
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:react/recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "prettier",
    "prettier/@typescript-eslint",
    "prettier/react",
  ],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
    tw: true,
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2020,
    ecmaFeatures: {
      classes: true,
      impliedStrict: true,
      jsx: true,
    },
    sourceType: "module",
  },
  plugins: ["html", "prettier", "react", "@typescript-eslint",],
  rules: {
    "id-length": [
      2,
      {
        exceptions: ["_", "a", "b", "i", "x", "y", "z"],
      },
    ],
    "jsx-a11y/accessible-emoji": 0,
    "jsx-a11y/anchor-is-valid": [
      "warn",
      {
        aspects: ["invalidHref"],
      },
    ],
    "jsx-a11y/href-no-hash": 0,
    "jsx-a11y/label-has-associated-control": 0,
    "no-console": [
      "error",
      {
        allow: ["error", "info"],
      },
    ],
    "no-case-declarations": 0,
    "no-nested-ternary": 0,
    "no-useless-constructor": 0,
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
        tabWidth: 2,
        trailingComma: "es5",
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
    "react/display-name": 0,
    "react/jsx-filename-extension": [
      1,
      {
        extensions: [".js", ".jsx", ".tsx"],
      },
    ],
    "react/jsx-uses-react": "error",
    "react/jsx-uses-vars": "error",
    "react/no-danger": 0,
    "react/no-unescaped-entities": 0,
    "react/prop-types": 0,
    "@typescript-eslint/no-unused-vars": [
      "warn",
      {
        args: "none",
        vars: "local",
        varsIgnorePattern: "^(React|e|i|it|expect)$",
      },
    ],
    "@typescript-eslint/no-useless-constructor": "error",
  },
  settings: {
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      },
    },
    linkComponents: [
      // Components used as alternatives to <a> for linking, eg. <Link to={ url } />
      "Hyperlink",
      { name: "Link", linkAttribute: "to" },
    ],
    propWrapperFunctions: [
      // The names of any function used to wrap propTypes, e.g. `forbidExtraProps`. If this isn't set, any propTypes wrapped in a function will be skipped.
      "forbidExtraProps",
      { property: "freeze", object: "Object" },
      { property: "myFavoriteWrapper" },
    ],
    react: {
      createClass: "createReactClass", // Regex for Component Factory to use,
      // default to "createReactClass"
      pragma: "React", // Pragma to use, default to "React"
      version: "detect", // React version. "detect" automatically picks the version you have installed.
      // You can also use `16.0`, `16.3`, etc, if you want to override the detected value.
      // default to latest and warns if missing
      // It will default to "detect" in the future
      flowVersion: "0.53", // Flow version
    },
  },
};
