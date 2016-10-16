var gulp = require('gulp');
// var react = require('gulp-react');//gulp 才用
var browserify = require('browserify');
var reactify = require('reactify');
var source = require('vinyl-source-stream');


gulp.task('jsx',function(){				
	gulp.src('./gulp-src/app.jsx')
		.pipe(react())						//用gulp-react
		.pipe(gulp.dest('./gulp-dest'));
});

gulp.task('browserify-jsx',function(){
	browserify({							//browserify，处理依赖并转换为js
		entries: ['./browserify-src/app.jsx'],
		transform: [reactify]				//用reactify,可压缩校验

	})
		.bundle()							//bundle完的流，无法用gulp直接处理
		.pipe(source('app.js'))				//用vinyl-source-stream处理，处理完就gulp可以处理，！！！一定要加bundle后的名称app.js
		.pipe(gulp.dest('./browserify-dest'));
});


gulp.task('default',['browserify-jsx'], function(){
	console.log('default is over');
});