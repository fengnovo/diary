var gulp = require('gulp'),			  //按Home跳到行首  End跳到行尾
	connect = require('gulp-connect'),//搭建livereload服务器的，
	browserify = require('gulp-browserify'),
	concat = require('gulp-concat'),
	port = process.env.port || 5000;

gulp.task('browserify',function(){
	gulp.src('./app/js/main.js')
	// .pipe(browserify({
	// 	transform: 'reactify',
	// }))
	.pipe(gulp.dest('./dist/js'));
});

gulp.task('connect',function(){
	connect.server({
		root:'./',
		port: port,
		livereload:true
	});
});

//监视js的变化
gulp.task('js',function(){
	gulp.src('./dist/**/*.js')
	.pipe(connect.reload())	//一旦有变化就reload
});

//监视html的变化
gulp.task('html',function(){
	gulp.src('./app/**/*.html')
	.pipe(connect.reload())
});

gulp.task('watch',function(){
	gulp.watch('./dist/**/*.js',['js']);
	gulp.watch('./app/**/*.html',['html']);
	gulp.watch('./app/js/**/*.js',['browserify']);
});

gulp.task('default',['browserify','connect','watch']);

gulp.task('dest',['browserify']);