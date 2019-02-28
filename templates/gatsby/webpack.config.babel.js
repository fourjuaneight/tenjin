import path from 'path'
import CopyWebpackPlugin from 'copy-webpack-plugin'
import ImageminPlugin from 'imagemin-webpack-plugin'
import imageminMozjpeg from 'imagemin-mozjpeg'
import imageminPngquant from 'imagemin-pngquant'

export default {
  mode: process.env.NODE_ENV || 'production',
  entry: [
    './assets/js/barefoot.js',
    './assets/js/copy.js',
    './assets/js/filter-sort.js',
    './assets/js/ui.js',
    './assets/js/lazy.js',
  ],
  output: {
    path: path.resolve(__dirname, 'assets', 'js'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'eslint-loader']
      }
    ]
  },
  plugins: [
    new CopyWebpackPlugin([{
      from: 'assets/img/',
      to: path.resolve(__dirname, 'assets', 'img'),
      ignore: ['*.svg']
    }]),
    new ImageminPlugin({
      plugins: [
        imageminMozjpeg({
          test: /\.(jpe?g)$/,
          quality: 60,
          progressive: true
        }),
        imageminPngquant({
          test: /\.(png)$/,
          quality: [0.3, 0.5]
        })
      ]
    })
  ]
}
