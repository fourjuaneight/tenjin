import path from 'path';

export default {
  mode: process.env.NODE_ENV || 'production',
  entry: [
    "./assets/js/webp.js",
    "./assets/js/header.js",
    "./assets/js/lazy.js",
  ],
  output: {
    path: path.resolve(__dirname, "assets", "js"),
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'eslint-loader']
      }
    ]
  }
}