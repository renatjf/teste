'use strict';

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    imagemin = require('gulp-imagemin'),
    injectSvg = require('gulp-inject-svg'),
    webpack = require('webpack-stream'),
    browserSync = require('browser-sync');

//sass
gulp.task('sass', function() {
    return gulp.src('./assets/sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(sass({
            outputStyle: 'compressed'
        }))
        .pipe(gulp.dest('./css'));
});


//imagemin
gulp.task('img', function() {
    return gulp.src('./assets/img/**/*.{gif,jpg,png,svg}')
        .pipe(imagemin({
            optimizationLevel: 7,
            progressive: true,
            interlaced: true,

        }))

        .pipe(gulp.dest('./img/'));

});

gulp.task('injectSvg', function() {

    return gulp.src('*.html')
        .pipe(injectSvg())
        .pipe(gulp.dest(''));

});


//browser-sync
gulp.task('browser-sync', function() {
    browserSync.init(['./css/**', './**'], {
        server: {
            baseDir: './',
            index: './confirmacao.html'
        }
    });
});

//gulp-webpack
gulp.task('webpack-stream', function() {
    return gulp.src('./assets/components/bundle.jsx')
        .pipe(webpack(require('./webpack.config.js')))
        .pipe(gulp.dest('./js/'));
});


//view
gulp.task('dev', ['sass', 'webpack-stream', 'img', 'injectSvg', 'browser-sync'], function() {
    gulp.watch('/assets/img/**/*.{gif,jpg,png,svg}', ['img']);
    gulp.watch('*.html', ['injectSvg']);
    gulp.watch('./assets/sass/**/*.scss', ['sass']);
    gulp.watch('./assets/components/**/*.js', ['webpack-stream']);

});