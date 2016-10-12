var path = require('path');
var webpack = require('webpack');

var env = process.env.NODE_ENV; //设置环境，开发 dev 生产 production
console.log(env);
var config = {
	entry: ['./src/main.js'],
	output: {
		path: path.join(__dirname,'dist'), //根目录下dist
		publicPath: '/dist/',
		filename: 'index.js'
	},
	plugins: [],
	devServer: {
		port: 7777
	},
	module: {
		loaders: [{
			test: /\.jsx?$/,
			exclude: /node_modules/,
			loader: 'babel',
			query: {
				presets: ['es2015','react']
			}
		},{
		//	test: /\.css$/,
		//	loaders: ['style','raw'],
		//	include: __dirname
		//},{
			test: /\.css$/,
			loader: "style!css"
		},{
			test: /\.scss/,
			loader: 'style-loader!css-loader!sass-loader'
		}]
	}
}

if(env === 'production'){
	config.plugins = [
		new webpack.optimize.UglifyJsPlugin(),
		new webpack.optimize.OccurenceOrderPlugin()
	]
}

module.exports = config;