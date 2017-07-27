var path = require('path');
var webpack = require('webpack');
var HtmlwebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var ROOT_PATH = path.resolve(__dirname);		
var APP_PATH = path.resolve(ROOT_PATH, 'src');			
var BUILD_PATH = path.resolve(ROOT_PATH, 'build');		


module.exports = {
	entry:{
		// vendor: ['react','react-dom','react-router','redux','react-redux'],
		app: [path.resolve(APP_PATH,'app.js')],
	},
	output:{
		path: BUILD_PATH,
        publicPath: './',     //后面的就直接css/style.css  imgs/img.png
		filename:'js/[name]-[hash:8].js',
        // chunkFilename: 'js/[id].js'
	},
	resolve:{
		extensions:['.js','.jsx']
	},
	//启动dev source map，出错以后就会采用source-map的形式直接显示你出错代码的位置。
	// devtool:'eval-source-map',
	// devServer:{
	// 	historyApiFallback:true,
	// 	hot:true,
	// 	inline:true,
	// 	proxy:{
	// 		'/api/*':{
	// 			target:'http://localhost:8080',
	// 			secure:false
	// 		}
	// 	}
	// },
	module:{
		loaders: [
	      {
	        test: /\.jsx?$/,
	        loader: 'babel-loader',
	        include: APP_PATH,
	        query: {
	          //添加两个presents 使用这两种presets处理js或者jsx文件
	          presets: ['es2015', 'react','stage-0']
	        }
	      },
          {
            test: /\.(css|scss)$/,
            include: APP_PATH,
            use: ExtractTextPlugin.extract({
                fallbackLoader: 'style-loader?minimize',
                loader: ['css-loader?minimize','postcss-loader?minimize', 'sass-loader?minimize']
            })
          },
          
            {
                test: /\.(jpg|jpeg|png|gif)$/,
                loader: 'url-loader',
				include: APP_PATH,
                query: {
                    limit: 8192,
                    name: './imgs/[name]-[hash:8].[ext]'
                }
            },
            {
                test: /\.(ico|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
                loader: 'file-loader',
				include: APP_PATH,
                query: {
                    name: './fonts/[name]-[hash:8].[ext]',
                },
            }
	    ]
	},
    plugins: [
    	new webpack.DefinePlugin({
          	"process.env": {
		        NODE_ENV: JSON.stringify("production")
		    }
      	}),
     	//这个使用uglifyJs压缩你的js代码
	    new webpack.optimize.UglifyJsPlugin({
	    	minimize: true,
	    	output: {
		        comments: false,  // remove all comments
		    },
            compress: {
                warnings: false
            }
	    }),
	    new HtmlwebpackPlugin({
	      title: 'react-ele-webapp',
	      template: path.resolve(ROOT_PATH, 'publish.html'),
	      filename: 'index.html',
	      favicon:'./favicon.ico',
	      // chunks: ['app', 'vendors'],
	      minify: {
               caseSensitive: false, 			//是否大小写敏感
			   collapseBooleanAttributes: true, //是否简写boolean格式的属性如：disabled="disabled" 简写为disabled 
			   collapseWhitespace: true 		//是否去除空格
          },
	      inject: 'body'
	    }),
        new ExtractTextPlugin('css/[name]-[hash:8].css')
	  ]
}