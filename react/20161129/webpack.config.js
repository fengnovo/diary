var webpack = require('webpack');
var htmlWebpackPlugin = require('html-webpack-plugin');

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
          loader: 'style!css'
      }
    ]
  },
  plugins: [
    new htmlWebpackPlugin({
      template: __dirname + '/src/build-html/index.html',
      hash: true
    })
  ],
  devServer: {
    contentBase: "./",
    colors: true,
    historyApiFallback: true,
    inline: true
  },
  solove : {
    extends: ['','.js','.jsx']
  }
}