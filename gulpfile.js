var gulp = require('gulp'),
	sass = require('gulp-sass'),
  minifyCSS = require('gulp-minify-css'),
 	tinylr = require('tiny-lr')(),
 	connect = require('connect-livereload'),
	uglify = require('gulp-uglify');

gulp.task('compress', function() {
  	gulp.src('lib/**/*.js')
	    .pipe(uglify())
	    .pipe(gulp.dest('./public/'));
});

gulp.task('styles', function() {
    gulp.src('lib/sass/*.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(minifyCSS())
      .pipe(gulp.dest('./public/css'));
});

gulp.task('express', function() {
  var express = require('express');
  var app = express();
  app.use(connect({port: 35729}));
  app.use(express.static('public'));
  app.listen(4000, '0.0.0.0');
});

gulp.task('livereload', function() {
    tinylr.listen(35729);
});

function notifyLiveReload(event) {
  var fileName = require('path').relative(__dirname, event.path);

  tinylr.changed({
    body: {
      files: [fileName]
    }
  });
}

gulp.task('watch', function() {
	gulp.watch('lib/sass/*.scss',['styles']);
	gulp.watch('lib/js/*.js',['compress']);
	gulp.watch('*.html', notifyLiveReload);
	gulp.watch('public/**/*.*', notifyLiveReload);
});

gulp.task('default', 
	['styles', 'compress', 'express', 'livereload', 'watch']);