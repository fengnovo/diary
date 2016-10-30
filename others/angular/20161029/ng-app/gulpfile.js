var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var httpProxyMiddleware = require('http-proxy-middleware');




gulp.task('browser-sync',function(){
	//http://localhost:3000/api/information/podcastserver/1.0.0/category/57959fd6b05063000b284f58/top
	//-->http://pod.gf.com.cn/api/information/podcastserver/1.0.0/category/57959fd6b05063000b284f58/top
	var p1 = httpProxyMiddleware(['/api'], {
		target: 'https://cnodejs.org', 
		changeOrigin: true});
	browserSync.init({
		server: {
			baseDir: "./",
            port: 3000,
			middleware: [p1]
		}
	});
});

gulp.task('default',['browser-sync'],function(){
	console.log('over');
});


