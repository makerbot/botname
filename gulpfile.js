var gulp         = require('gulp')
  , browserSync  = require('browser-sync')
  , reload       = browserSync.reload
  , less         = require('gulp-less')
  , minifyCSS    = require('gulp-minify-css')
  , autoprefixer = require('gulp-autoprefixer')
  , plumber      = require('gulp-plumber')
  , notify       = require('gulp-notify')
  , jade         = require('gulp-jade')
  , uglify       = require('gulp-uglify')
  , sourcemaps   = require('gulp-sourcemaps')
  , jshint       = require('gulp-jshint')
  ;

// browser-sync task for starting the server.
gulp.task('browser-sync', function() {
  browserSync({
    server: {
      baseDir: './'
    }
  });
});

gulp.task('less', function() {
  return gulp.src('css/src/*.less')
    .pipe(plumber())
    .pipe(less())
    .pipe(autoprefixer())
    .pipe(minifyCSS())
    .pipe(gulp.dest('css/dist'))
    .pipe(reload({ stream: true }))
    .pipe(notify('Finished file: <%= file.relative %>'))
  ;
});

gulp.task('js', function() {
  var bundle = browserify('./index.js').bundle();

  return bundle
    .pipe(source('main.js'))
    // .pipe(sourcemaps.init())
    .pipe(streamify(uglify()))
    // .pipe(sourcemaps.write('maps'))
    .pipe(gulp.dest('js/dist'))
  ;

  // return gulp.src('js/src/*.js')
  //   .pipe(plumber())
  //   .pipe(jshint())
  //   .pipe(jshint.reporter('jshint-stylish'))
  //   .pipe(sourcemaps.init())
  //   .pipe(uglify())
  //   .pipe(sourcemaps.write('maps'))
  //   .pipe(gulp.dest('js/dist'))
  //   .pipe(reload({ stream: true }))
  //   .pipe(notify('Finished file: <%= file.relative %>'))
  // ;
});

gulp.task('jade', function() {
  return gulp.src('jade/index.jade')
    .pipe(plumber())
    .pipe(jade())
    .pipe(gulp.dest(''))
    .pipe(reload({ stream: true }))
    .pipe(notify('Finished file: <%= file.relative %>'))
  ;
});

gulp.task('bs-reload', function() {
  browserSync.reload();
});

// Default task to be run with `gulp`
gulp.task('default', ['jade', 'less', 'browser-sync'], function() {
  gulp.watch('css/src/*.less', ['less']);
  gulp.watch('jade/*.jade', ['jade']);
  gulp.watch('js/src/*.js', ['js']);
});
