var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var proxyMiddleware = require('http-proxy-middleware');

gulp.task('browser-sync', function () {
    //开发时连接测试环境,		//http://web.juhe.cn:8080/finance/exchange/rmbquot
    var proxyOption = {
        target: 'http://web.juhe.cn:8080'
    };
    var proxy = proxyMiddleware('/finance/exchange/rmbquot', proxyOption);
    browserSync.init({
        server: {
            baseDir: "./src/",
            port: 3000,
            middleware: [proxy]
        },
        browser: "google chrome"
    });

    //开发时连接生产环境
 //    var proxyOption = {
 //        target: 'https://xxx.com/',
 //        changeOrigin: true   // for vhosted sites
 //    };
 //    var proxy = proxyMiddleware('/api', proxyOption);

	// browserSync.init({
 //        server: {
 //            baseDir: "./src/",
 //            port: 3000,
 //            middleware: [proxy]
 //        },
 //        https: true,
 //        browser: "google chrome"
	// });
});

gulp.task( 'default', ['browser-sync'], function(){
    console.log('运行完毕！');
});