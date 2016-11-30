var webpack = require('webpack');
var htmlWebpackPlugin = require('html-webpack-plugin');
var autoprefixer = require('autoprefixer');

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
          loader: 'style!css'
      }
    ]
  },
  //postcss:[autoprefixer({browsers:['last 2 versions']})],
  plugins: [
    new htmlWebpackPlugin({
      template: __dirname + '/src/build-html/index.html',
      hash: true
    }),
    new webpack.BannerPlugin("Copyright fengnovo.")
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