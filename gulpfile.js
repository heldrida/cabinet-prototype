var gulp = require('gulp'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    plumber = require('gulp-plumber'),
    browserSync = require('browser-sync').create(),
    jasmine = require('gulp-jasmine'),
	KarmaServer = require('karma').Server,
	rename = require('gulp-rename'),
	webpack = require('webpack'),
	webpackConfig = require('./webpack.config.js'),
	gulpWebpack = require('gulp-webpack');

gulp.task("webpack", function() {
    return gulp.src('./src/js/index.js')
    .pipe(rename('bundle.js'))
    .pipe( gulpWebpack(webpackConfig, webpack) )
    .pipe(gulp.dest('./dist/js/'));
});

gulp.task('sass', function() {
    return gulp.src('./src/sass/app.scss')
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./dist/css'))
        .pipe(browserSync.stream());
});

gulp.task('watch', function() {
    gulp.watch('./src/sass/**/*.scss', ['sass']);
    gulp.watch("./**/*.html", ['reload']);
    gulp.watch("./src/js/**/*.js", ['reload']);
	gulp.watch('./src/**/*.js', ['test']);
	gulp.watch('./src/**/*.js', ['webpack']);
});

gulp.task('reload', function() {
    browserSync.reload();
});

gulp.task('test', function (done) {
  new KarmaServer({
    configFile: __dirname +  '/karma.conf.js',
    singleRun: true
  }, done).start();
});

gulp.task('serve', ['watch'], function() {

    browserSync.init({
        notify: false,
		server: {
			baseDir: "./"
		}
    });

});

gulp.task('build', ['test', 'webpack', 'sass']);

gulp.task('default', ['serve']);
