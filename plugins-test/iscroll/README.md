# iscroll练习  
工作中经常用到iscroll，在这里做个记录的demo  
演示地址：http://htmlpreview.github.io/?https://github.com/fengnovo/diary/blob/master/plugins-test/iscroll/web/index.html

# development && 运行  
```
npm install  
gulp 或者 npm start 
```  
打开src的index.html
**因为访问Github上的json数据，所以会比较慢  

# 说明  
browser-sync是用来解决开发是跨域请求的，设置一个本地服务器代理转发至后台服务器  

```  
gulp.task('browser-sync', function () {
    var proxyMiddleware = require('http-proxy-middleware');
    var proxy1 = proxyMiddleware('https://raw.githubusercontent.com/fengnovo/diary/master/plugins-test/iscroll/ajax-json',
        {target: 'https://raw.githubusercontent.com/fengnovo/diary/master/plugins-test/iscroll/ajax-json/'});
    browserSync.init({
        server: {
            baseDir: DIST_DIR,
            middleware: [historyApiFallback(), proxy1]
        }
    });
});  
```  
```
if((this.y < this.maxScrollY) && (this.pointY < 1)){
  	this.scrollTo(0, this.maxScrollY, 400);
  	return;
} else if (this.y > 0 && (this.pointY > window.innerHeight - 1)) {
  	this.scrollTo(0, 0, 400);
  	return;
}
```
这是为决解iscroll在ios滑动到边缘无法回弹的问题
