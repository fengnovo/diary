var webpack = require('webpack');
var htmlWebpackPlugin = require('html-webpack-plugin');
var autoprefixer = require('autoprefixer');
var extractTextWebpackPlugin = require('extract-text-webpack-plugin');
console.log(process.env.NODE_ENV);
module.exports = {
  devtool: 'eval-source-map',

  entry:  __dirname + "/src/main.js",
  output: {
    path: __dirname + "/build",
    filename: "bundle.js"
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel'
      },
      {
          test:/\.css$/,
          exclude: /node_modules/,
          // loader: 'style!css?modules!postcss'
          loader: extractTextWebpackPlugin.extract('style','css')
      }
    ]
  },
  //postcss:[autoprefixer({browsers:['last 2 versions']})],
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
          NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
    }), //NODE_ENV=production webpack --config webpack.production.config.js --progress
    new htmlWebpackPlugin({
      template: __dirname + '/src/build-html/index.html',
      hash: true
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      output: {
        comments: false,  // remove all comments
      },
      compress: {
        warnings: false
      }
    }),
    new extractTextWebpackPlugin("style.css"),
    new webpack.BannerPlugin("Copyright fengnovo.")
  ],
  solove : {
    extends: ['','.js','.jsx']
  }
}