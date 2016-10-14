var gulp = require('gulp');
var browserify = require('gulp-browserify');
var uglify = require('gulp-uglify');
// gulp-browserify gulp-uglify

gulp.task('buildJS',function(){
    return gulp.src('./src/a.js')
            .pipe(browserify())
            .pipe(uglify())
            .pipe(gulp.dest('./dest'));
});

gulp.task('default',['buildJS'],function(){
    console.log('default');
});