// Learn more about Webpack:
// https://webpack.js.org/
// Dependencies: npm i -D babel-loader sass-loader postcss-loader string-replace-loader copy-webpack-plugin mini-css-extract-plugin imagemin-webpack-plugin imagemin-mozjpeg imagemin-pngquant imagemin-webp workbox-webpack-plugin

'use strict';

const { resolve } = require('path'),
      CopyWebpackPlugin = require('copy-webpack-plugin'),
      MiniCssExtractPlugin = require('mini-css-extract-plugin'),
      ImageminPlugin = require('imagemin-webpack-plugin'),
      imageminMozjpeg = require('imagemin-mozjpeg'),
      imageminPngquant = require('imagemin-pngquant'),
      imageminWebp = require('imagemin-webp'),
      { GenerateSW } = require('workbox-webpack-plugin');

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
        use: ['babel-loader']
      },
      {
        test: /\critical.scss/,
        use: [
          'sass-loader',
          'postcss-loader',
          {
            loader: 'string-replace-loader',
            options: {
              multiple: [
                { search: '^', replace: '<style>', flags: 'g' },
                { search: '$', replace: '</style>', flags: 'g' }
             ]
            }
          }
        ]
      }
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
    new MiniCssExtractPlugin({
      filename: 'critical.css',
    }),
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
    new GenerateSW({
      cacheId: '',
      clientsClaim: true,
      globDirectory: '.',
      globPatterns: ['**/*.{woff,png,jpg,svg,js,css}'],
      precacheManifestFilename: resolve(__dirname, 'assets', 'manifest.json'),
      skipWaiting: true,
      swDest: resolve(__dirname, 'assets', 'sw.js'),
      runtimeCaching: [
        {
          urlPattern: /img/,
          handler: 'cacheFirst',
          expiration: {
            maxAgeSeconds: 30 * 24 * 60 * 60,
          },
        },
        {
          urlPattern: /.*/,
          handler: 'networkFirst'
        }
      ]
    })
  ]
}