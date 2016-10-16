var webpack = require('webpack'); //如果没用到webpack plugins可以不用require('webpack');

module.exports = {

	//单个入口时
	// entry: './webpack-src/app.jsx', 
	// output: {
	// 	path: './webpack-dest',
	// 	filename: 'app.js'
	// },

	//多个文件入口时
	entry: {
		app: './webpack-src/app.jsx',
		app2: './webpack-src/app2.jsx',
	},
	output: {
		path: './webpack-dest',
		filename: '[name].js'
	},
	plugins: [
		new webpack.optimize.CommonsChunkPlugin('./common.js')
	],
	module: {
		loaders: [
			{
				test: /\.jsx$/,
				loader: 'jsx-loader'
			}
		]
	}
}	