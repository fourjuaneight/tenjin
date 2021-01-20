/* eslint-disable @typescript-eslint/no-var-requires */
const cssnano = require("cssnano");
const postcssImport = require("postcss-import");
const postcssPresetEnv = require("postcss-preset-env");
const tailwind = require("tailwindcss");

module.exports = (config, options) => {
  console.info(`Using '${config.mode}' mode:`, options);

  config.module.rules.push({
    test: /tailwind\.scss$/,
    use: [
      {
        loader: "postcss-loader",
        options: {
          postcssOptions: {
            ident: "postcss",
            syntax: "postcss-scss",
            plugins: [
              postcssImport,
              postcssPresetEnv({
                stage: 3,
                features: {
                  "custom-properties": {
                    preserve: true,
                    fallback: true,
                  },
                },
                autoprefixer: {
                  flexbox: true,
                  grid: false,
                },
              }),
              cssnano({
                preset: [
                  "default",
                  {
                    discardComments: {
                      removeAll: true,
                    },
                  },
                ],
              }),
              tailwind("./tailwind.config.js"),
            ],
          },
        },
      },
    ],
  });

  return config;
};
