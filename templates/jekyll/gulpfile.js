const autoprefixer    = require('autoprefixer'),
      cache           = require('gulp-cache'),
      concat          = require('gulp-concat-util'),
      cssnano         = require('cssnano'),
      gm              = require('gulp-gm'),
      gulp            = require('gulp'),
      imagemin        = require('gulp-imagemin'),
      imageminMozjpeg = require('imagemin-mozjpeg'),
      plumber         = require('gulp-plumber'),
      postcss         = require('gulp-postcss'),
      rename          = require('gulp-rename'),
      sass            = require('gulp-sass');

// Critical CSS
gulp.task('critical', () => {
  const plugins = [autoprefixer({browsers: ['last 2 version']}), cssnano()];
  return (
    gulp.src('assets/css/critical.scss')
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
  );
});

// Image Conversion
gulp.task('convert', () => gulp.src('assets/img/*.png')
  .pipe(plumber())
  .pipe(gm(gmfile => gmfile.interlace('Line')))
  .pipe(gulp.dest('assets/img')));

// Image Optimization
gulp.task('optimize', () => gulp.src('assets/img/*.jpg')
  .pipe(plumber())
  .pipe(
    cache(
      imagemin({
        use: [
          imageminMozjpeg({
            quality: 100,
            progressive: true
          })
        ]
      })
    )
  )
  .pipe(gulp.dest('assets/img')));

// Watch asset folder for changes
gulp.task('watch', ['critical', 'convert', 'optimize'], () => {
  gulp.watch('assets/css/fonts.scss', ['critical']);
  gulp.watch('assets/css/variables.scss', ['critical']);
  gulp.watch('assets/css/extends.scss', ['critical']);
  gulp.watch('assets/css/reset.scss', ['critical']);
  gulp.watch('assets/css/layout.scss', ['critical']);
  gulp.watch('assets/css/critical.scss', ['critical']);
  gulp.watch('assets/img/*', ['convert']);
  gulp.watch('assets/img/*', ['optimize']);
});

// Run Watch as default
gulp.task('default', ['watch']);

// Build
gulp.task('build', ['critical', 'convert', 'optimize']);