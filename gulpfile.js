var gulp         = require('gulp')
  , fs           = require('fs')
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
  , LineByLine   = require('line-by-line')
  , JSONStream   = require('JSONStream')
  , http         = require('http')
  , glob         = require('glob')
  , jsonfile     = require('jsonfile')
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

var count = 0;
var wordList = {};
gulp.task('word-list', function(cb) {
  var count = 0;

  glob('./data/*.txt', function(err, files) {
    if (err) console.log(err);

    var i = files.length;
    while (i--) {
      processTXT(files[i]);
    }
  });

  // processJSON('./node_modules/adjective-adjective-animal/lists/adjectives.json');

  var length = -1;
  var interval = setInterval(function() {
    var keys = Object.keys(wordList);
    if (keys.length == length) {
      console.log(keys.length);
      clearInterval(interval);
      var words = Object.keys(wordList)
      words.sort(function(a, b) {
        return a.localeCompare(b);
      });
      fs.writeFile('./data/adjectives.txt', words.join("\n"), function(err) {
        if (err) console.log(err);
      });
      // jsonfile.writeFile('./adj.json', Object.keys(wordList), function(err) {
      //   console.error(err)
      // });
      cb();
    } else {
      length = keys.length;
    }
  }, 500);
});

// Default task to be run with `gulp`
gulp.task('default', ['jade', 'less', 'browserify', 'js', 'browser-sync'], function() {
  gulp.watch('css/src/*.less', ['less']);
  gulp.watch('jade/*.jade', ['jade']);
  gulp.watch('js/src/*.js', ['js']);
});

function processTXT(file) {
  var lr = new LineByLine(file);
  lr.on('error', function (err) {
    console.log(err);
    throw err;
  }).on('line', function (line) {
    addWord(line);
  }).on('end', function () {
    console.log(Object.keys(wordList).length);
  });
}

function processJS(file) {
  http.get(file, function(res) {

  });
}

function processJSON(file) {
  var stream = fs.createReadStream(file, {encoding: 'utf8'});
  var parser = JSONStream.parse('*');
  stream.pipe(parser).on('error', function (err){
    console.log(err);
  }).on('data', function(data) {
    addWord(data);
  }).on('end', function (err){
  });
}

function addWord(word) {
  word = word.trim().toLowerCase();
  if (word) {
    if (word.match(/[^a-z0-9]/)) {
      if (word.match('-')) {
        word = word.split('-');
        var i = word.length;
        while (i-- > 1) {
          word[i] = word[i][0].toUpperCase() + word[i].substr(1);
        }
        word = word.join('');
      } else {
        console.log(word);
        return;
      }
    }
    wordList[word] = 1;
  }
}
