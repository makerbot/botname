var gulp         = require('gulp')
  , browserSync  = require('browser-sync').create()
  , less         = require('gulp-less')
  , minifyCSS    = require('gulp-minify-css')
  , autoprefixer = require('gulp-autoprefixer')
  , plumber      = require('gulp-plumber')
  , notify       = require('gulp-notify')
  , jade         = require('gulp-jade')
  , uglify       = require('gulp-uglify')
  , sourcemaps   = require('gulp-sourcemaps')
  , jshint       = require('gulp-jshint')
  , browserify   = require('browserify')
  , buffer       = require('vinyl-buffer')
  , source       = require('vinyl-source-stream')
  ;

// browser-sync task for starting the server.
gulp.task('browser-sync', function() {
  browserSync.init({
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
    .pipe(browserSync.stream())
    .pipe(notify('Finished file: <%= file.relative %>'))
  ;
});

gulp.task('browserify', function() {
  var b = browserify('./index.js', {
    standalone: 'botname',
    debug: true
  });

  return b.bundle()
    .pipe(source('botname.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(uglify())
    .pipe(sourcemaps.write('maps'))
    .pipe(gulp.dest('./js/dist'))
    .pipe(browserSync.stream())
    .pipe(notify('Finished file: <%= file.relative %>'))
  ;
});

gulp.task('js', function() {
  return gulp.src('js/src/*.js')
    .pipe(plumber())
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(sourcemaps.write('maps'))
    .pipe(gulp.dest('js/dist'))
    .pipe(browserSync.stream())
    .pipe(notify('Finished file: <%= file.relative %>'))
  ;
});

gulp.task('jade', function() {
  return gulp.src('jade/index.jade')
    .pipe(plumber())
    .pipe(jade())
    .pipe(gulp.dest(''))
    .pipe(browserSync.stream())
    .pipe(notify('Finished file: <%= file.relative %>'))
  ;
});

gulp.task('bs-reload', function() {
  browserSync.reload();
});

// Default task to be run with `gulp`
gulp.task('default', ['jade', 'less', 'browserify', 'js', 'browser-sync'], function() {
  gulp.watch('css/src/*.less', ['less']);
  gulp.watch('jade/*.jade', ['jade']);
  gulp.watch('js/src/*.js', ['js']);
});
