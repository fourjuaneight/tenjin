// Learn more about Gulp:
// https://gulpjs.com/
// Dependencies: npm i -D gulp gulp-cache gulp-gm gulp-htmlmin gulp-imagemin imagemin-mozjpeg imagemin-pngquant gulp-postcss pump gulp-rename gulp-replace gulp-sass

'use strict';

// Load Plugins
const { dest, parallel, series, src, watch } = require('gulp');
const cache = require('gulp-cache');
const gm = require('gulp-gm');
const htmlmin = require('gulp-htmlmin');
const imagemin = require('gulp-imagemin');
const imageminMozjpeg = require('imagemin-mozjpeg');
const imageminPNGquant = require('imagemin-pngquant');
const postcss = require('gulp-postcss');
const pump = require('pump');
const rename = require('gulp-rename');
const replace = require('gulp-replace');
const sass = require('gulp-sass');

// Critical CSS
const critical = cb =>
  pump([
    src('assets/css/critical.scss'),
    sass().on('error', sass.logError),
    postcss(),
    htmlmin({ collapseWhitespace: true, minifyCSS: true }),
    replace(/^/g, '<style>'),
    replace(/$/g, '</style>'),
    rename({
      basename: 'critical',
      extname: '.html',
    }),
    dest('layouts/partials')
  ], cb);

// Convert PNGs to Progressive JPEGs
const toJPG = cb =>
  pump([
    src('assets/img/*.png'),
    gm(gmfile => gmfile.setFormat('jpg')),
    dest('assets/img')
  ], cb);

// Create Webps from JPEGs
const toWebp = cb =>
  pump([
    src('assets/img/*.jpg'),
    gm(gmfile => gmfile.setFormat('webp')),
    dest('assets/img')
  ], cb);

// Optimize JPEGs and PNGs
const optimize = cb =>
  pump([
    src(['assets/img/*.jpg', 'assets/img/*.png']),
    cache(
      imagemin({
        use: [
          imageminMozjpeg({
            quality: 90,
            progressive: true
          }),
          imageminPNGquant({
            quality: [0.3, 0.5],
          })
        ],
      })
    ),
    dest('assets/img')
  ], cb);


// Hugo fix (removed extra <p> tags)
const fix = cb =>
  pump([
    src('public/**/*.html'),
    htmlmin({ collapseWhitespace: true }),
    replace(/<p><(p|a|div|section|h1|h2|h3|h4|ul|li|img|figure|picture)(.*?)>/g, '<$1$2>'),
    replace(/<\/(p|a|div|section|h1|h2|h3|h4|ul|li|img|figure|picture)(.*?)><\/p>/g, '</$1$2>'),
    replace(/<p><\/p>/g, ''),
    dest('public')
  ], cb);

// Watch asset folder for changes
const watchFiles = () => watch('assets/css/*.scss', () => critical());

// Watch
exports.watch = watchFiles;

// Build
const images = series(toJPG, toWebp, optimize);

exports.post = fix;
exports.build = parallel(critical, images);
