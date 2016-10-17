# 说明
npm install gulp browserify webpack -g  

npm install   

gulp 构建gulp生成项目文件  

webpack 构建webpack生成项目文件  

一、gulp 
``` 
var gulp = require('gulp');    
var react = require('gulp-react');	//处理jsx和react
```  
用法  
```
gulp.src('./gulp-src/app.jsx')
		.pipe(react())						//用gulp-react
		.pipe(gulp.dest('./gulp-dest'));
```  
二、browerify 处理前端代码依赖  
```
var gulp = require('gulp');
var browserify = require('browserify');
var reactify = require('reactify');
var source = require('vinyl-source-stream');
```
用法  
```
browserify({							//browserify，处理依赖并转换为js
		entries: ['./browserify-src/app.jsx'],
		transform: [reactify]				//用reactify,可压缩校验

	})
		.bundle()							//bundle完的流，无法用gulp直接处理
		.pipe(source('app.js'))				//用vinyl-source-stream处理，处理完就gulp可以处理，！！！一定要加bundle后的名称app.js
		.pipe(gulp.dest('./browserify-dest'));
```  
三、webpack  

用法  
```  
module: {
		loaders: [
			{
				test: /\.jsx$/,
				loader: 'jsx-loader'
			}
		]
	}  
```

```
plugins: [
		new webpack.optimize.CommonsChunkPlugin('./common.js')
	],
```