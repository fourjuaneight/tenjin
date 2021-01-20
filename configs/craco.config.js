const { resolve } = require('path');
const { realpathSync } = require('fs');
const glob = require('glob');

const { POSTCSS_MODES } = require('@craco/craco');
const PurgecssPlugin = require('purgecss-webpack-plugin');

const appDirectory = realpathSync(process.cwd());
const resolveApp = relativePath => resolve(appDirectory, relativePath);

module.exports = {
  babel: {
    plugins: ['macros'],
  },
  style: {
    postcss: {
      mode: POSTCSS_MODES.file,
    },
  },
  webpack: {
    plugins: [
      new PurgecssPlugin({
        paths: [
          resolveApp('public/index.html'),
          ...glob.sync(`${resolveApp('src')}/**/**/*`, { nodir: true }),
        ],
      }),
    ],
  },
};
