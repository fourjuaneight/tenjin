// Learn more about Gulp:
// https://gulpjs.com/

'use strict';

// Load Plugins
const gm = require('gulp-gm');
const gulp = require('gulp');
const htmlbeautify = require('gulp-jsbeautifier');
const htmlmin = require('gulp-htmlmin');
const plumber = require('gulp-plumber');
const postcss = require('gulp-postcss');
const rename = require('gulp-rename');
const replace = require('gulp-replace');
const sass = require('gulp-sass');

// Critical CSS
const critical = () => {
  return gulp
      .src('assets/css/critical.scss')
      .pipe(plumber())
      .pipe(sass().on('error', sass.logError))
      .pipe(postcss())
      // wrap with style tags
      .pipe(replace(/^/g, '<style>'))
      .pipe(replace(/$/g, '</style>'))
      // convert it to an include file
      .pipe(
        rename({
          basename: 'critical',
          extname: '.html',
        })
      )
      // insert file
      .pipe(gulp.dest('layouts/partials'))
}

// Image Conversion
const convert = () => {
  return gulp
    .src(['assets/img/*.jpg','assets/img/*.png'])
    .pipe(plumber())
    .pipe(
      gm(function(gmfile) {
        return gmfile.setFormat('webp');
      })
    )
    .pipe(gulp.dest('assets/img'));
}

/*
HTML Cleanup:
- Removed HTML comments.
- Removed extra <p> tags.
*/
const fixHugo = () => {
  return gulp
  .src(['public/**/*.html'])
  .pipe(plumber())
  .pipe(htmlmin({ collapseWhitespace: true }))
  .pipe(replace(/<p><(p|a|div|section|h1|h2|h3|h4|ul|li|img|figure|picture)(.*?)>/g, '<$1$2>'))
  .pipe(replace(/<\/(p|a|div|section|h1|h2|h3|h4|ul|li|img|figure|picture)(.*?)><\/p>/g, '</$1$2>'))
  .pipe(replace(/<p><\/p>/g, ''))
  .pipe(htmlbeautify({
    indent_char: ' ',
    indent_size: 2
  }))
  .pipe(gulp.dest('public'));
}

// Watch asset folder for changes
const watchFiles = () => {
  gulp.watch('assets/css/critical.scss', critical);
  gulp.watch('assets/css/extends.scss', critical);
  gulp.watch('assets/css/fonts.scss', critical);
  gulp.watch('assets/css/header.scss', critical);
  gulp.watch('assets/css/mixins.scss', critical);
  gulp.watch('assets/css/reset.scss', critical);
  gulp.watch('assets/css/variables.scss', critical);
}

// Tasks
gulp.task('critical', critical);
gulp.task('convert', convert);
gulp.task('fixHugo', fixHugo);

// Run Watch as default
gulp.task('watch', watchFiles);

// Build
gulp.task('build', critical);
