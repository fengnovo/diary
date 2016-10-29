# browser-sync && http-proxy-middleware 设置代码解决开发时跨域问题  
```  
npm install gulp browser-sync http-proxy-middleware --save-dev  
```

## like this
```  
var p1 = httpProxyMiddleware(['/api'], {
		target: 'http://xx.com.cn', 
		changeOrigin: true});
	browserSync.init({
		server: {
			baseDir: "./",
            port: 3000,
			middleware: [p1]
		}
	}); 
```
