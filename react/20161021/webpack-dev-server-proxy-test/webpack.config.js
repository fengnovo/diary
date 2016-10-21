var webpack = require('webpack');
module.exports = {
	entry: './src/main.js',
	output: {
		path: './',
		filename: 'index.js'
	},
	devServer: {
		historyApiFallback: true,
      	hot: true,
		inline: true,
		stats: { colors: true },
		proxy: {
	        '/list': {
	          target: 'http://10.2.130.20:9000',
	          pathRewrite: {'^/column' : '/column'},
	          changeOrigin: true
	        }
	     }
	},
	plugins: [new webpack.ProvidePlugin({
		$: 'n-zepto'
	})],
	module: {
		loaders: 
		[
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				loader: 'babel',
				query: {
					presets: ['es2015','react']
				}
			},{
				test: /\.(jpg|png|gif)$/,
				loader: 'url-loader?limit=8192'
			},{
				test: /\.scss/,
				loader: 'style-loader!css-loader!sass-loader'
			}
		]
	}
};