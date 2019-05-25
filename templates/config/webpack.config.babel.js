// Learn more about Webpack:
// https://webpack.js.org/

import path from 'path';

export default {
  mode: process.env.NODE_ENV || 'production',
  entry: [
    './assets/js/lazy.js',
    './assets/js/cookies.js',
  ],
  output: {
    path: path.resolve(__dirname, 'assets'),
    filename: 'scripts.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      }
    ]
  }
}