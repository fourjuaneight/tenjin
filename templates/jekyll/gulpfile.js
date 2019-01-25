"use strict";

// Load Plugins
const autoprefixer = require('autoprefixer');
const concat = require('gulp-concat-util');
const cssnano = require('cssnano');
const gulp = require('gulp');
const plumber = require('gulp-plumber');
const postcss = require('gulp-postcss');
const rename = require('gulp-rename');
const sass = require('gulp-sass');

// Critical CSS
function critical() {
  const plugins = [autoprefixer({browsers: ['> 5%']}), cssnano()];
  return gulp
      .src('assets/css/critical.scss')
      .pipe(plumber())
      .pipe(sass().on('error', sass.logError))
      .pipe(postcss(plugins))
      // wrap with style tags
      .pipe(concat.header('<style>'))
      .pipe(concat.footer('</style>'))
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

// Watch asset folder for changes
function watchFiles() {
  gulp.watch('assets/css/colors.scss', critical);
  gulp.watch('assets/css/critical.scss', critical);
  gulp.watch('assets/css/extends.scss', critical);
  gulp.watch('assets/css/fonts.scss', critical);
  gulp.watch('assets/css/mixins.scss', critical);
  gulp.watch('assets/css/reset.scss', critical);
}

// Tasks
gulp.task("critical", critical);

// Run Watch as default
gulp.task('watch', watchFiles);

// Build
gulp.task('build', gulp.series(['critical']));