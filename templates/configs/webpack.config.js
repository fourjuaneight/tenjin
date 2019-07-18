// Learn more about Webpack:
// https://webpack.js.org/
// Dependencies: npm i -D babel-loader css-loader sass-loader postcss-loader extract-loader file-loader copy-webpack-plugin terser-webpack-plugin imagemin-webpack-plugin imagemin-mozjpeg imagemin-pngquant imagemin-webp

const { resolve } = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin');
const imageminMozjpeg = require('imagemin-mozjpeg');
const imageminPngquant = require('imagemin-pngquant');
const imageminWebp = require('imagemin-webp');

module.exports = {
  mode: process.env.NODE_ENV || 'production',
  entry: [
    '',
  ],
  output: {
    path: resolve(__dirname, 'assets'),
    filename: 'scripts.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /layout.scss$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'css/styles.css',
            },
          },
          {
            loader: 'extract-loader',
          },
          {
            loader: 'css-loader',
            options: { url: false },
          },
          'postcss-loader',
          {
            loader: 'sass-loader',
            options: {
              includePaths: ['./src/scss'],
            },
          },
        ],
      },
    ]
  },
  plugins: [
    new CopyWebpackPlugin([
      {
        from: resolve(__dirname, 'assets', 'img'),
        to: resolve(__dirname, 'assets', 'img'),
        ignore: ['*.svg']
      }
    ]),
    new ImageminPlugin({
      plugins: [
        imageminWebp({
          test: /\.(jpe?g)$/,
          quality: 90,
        }),
        imageminMozjpeg({
          test: /\.(jpe?g)$/,
          quality: 90,
          progressive: true
        }),
        imageminPngquant({
          test: /\.(png)$/,
          quality: [0.3, 0.5]
        })
      ]
    }),
  ],
  optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          output: {
            comments: false,
          },
        },
      }),
    ],
  },
  watchOptions: {
    ignored: /node_modules/,
    aggregateTimeout: 500
  }
}