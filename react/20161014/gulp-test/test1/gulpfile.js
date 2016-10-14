var gulp = require('gulp');

gulp.task('task1',function(){
    console.log('task1');
});

gulp.task('task2',function(){
    console.log('task2');
});

gulp.task('default',['task1','task2'],function(){
    console.log('default');
});