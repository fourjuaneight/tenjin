// Learn more about Gulp:
// https://gulpjs.com/
// Dependencies: npm i -D gulp gulp-cache gulp-htmlmin gulp-imagemin imagemin-mozjpeg pump gulp-replace gulp-responsive

// Load Plugins
const { dest, parallel, series, src, watch } = require('gulp');
const cache = require('gulp-cache');
const htmlmin = require('gulp-htmlmin');
const imagemin = require('gulp-imagemin');
const imageminMozjpeg = require('imagemin-mozjpeg');
const pump = require('pump');
const replace = require('gulp-replace');
const responsive = require('gulp-responsive');

// Configs
const formatJPG = {
  '*.png': {
    format: 'jpg',
  },
};
const formatWebp = {
  '*.jpg': {
    format: 'webp',
  },
};

// Convert PNGs to Progressive JPEGs
const toJPG = cb =>
  pump(
    [
      src('assets/img/*.png'),
      responsive(formatJPG, { progressive: true }),
      dest('assets/img'),
    ],
    cb
  );

// Create Webps from JPEGs
const toWebp = cb =>
  pump(
    [src('assets/img/*.jpg'), responsive(formatWebp), dest('assets/img')],
    cb
  );

// Optimize JPEGs and PNGs
const optimize = cb =>
  pump(
    [
      src('assets/img/*.jpg'),
      cache(
        imagemin({
          use: [
            imageminMozjpeg({
              quality: 90,
              progressive: true,
            }),
          ],
        })
      ),
      dest('assets/img'),
    ],
    cb
  );

// Hugo fix (removed extra <p> tags)
const fix = cb =>
  pump(
    [
      src('public/**/*.html'),
      htmlmin({ collapseWhitespace: true }),
      replace(
        /<p><(p|a|div|section|h1|h2|h3|h4|ul|li|img|figure|picture)(.*?)>/g,
        '<$1$2>'
      ),
      replace(
        /<\/(p|a|div|section|h1|h2|h3|h4|ul|li|img|figure|picture)(.*?)><\/p>/g,
        '</$1$2>'
      ),
      replace(/<p><\/p>/g, ''),
      dest('public'),
    ],
    cb
  );

// Watch asset folder for changes
const watchFiles = () => watch('assets/css/*.scss', () => critical());

// Watch
exports.watch = watchFiles;

// Build
const images = series(toJPG, toWebp, optimize);

exports.post = fix;
exports.build = parallel(critical, images);
