var webpack = require('webpack');
module.exports = {
	entry: './src/app.js',
	output: {
		path: './',
		filename: 'index.js'
	},
	devServer: {
		historyApiFallback: true,
      	hot: true,
		inline: true,
		stats: { colors: true }
	},
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