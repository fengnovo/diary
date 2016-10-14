var gulp = require('gulp');
var react = require('gulp-react');
var babel = require('gulp-babel');
var sass = require('gulp-sass');
var less = require('gulp-less');

gulp.task('sassCss',function(){
    return gulp.src('./src/css2.scss')
        .pipe(sass())
        .pipe(gulp.dest('./dest'));
});

gulp.task('lessCss',function(){
    return gulp.src('./src/css1.less')
        .pipe(less())
        .pipe(gulp.dest('./dest'));
});

gulp.task('exchangeJS',function(){
    return gulp.src('./src/test.js')
                .pipe(react())
                .pipe(babel(
                    {presets:['babel-preset-es2015']}
                ))
                .pipe(gulp.dest('./dest'));
});

gulp.task('default',['sassCss','lessCss','exchangeJS'],function(){
    console.log('default');
});