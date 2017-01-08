module.exports.getConfig = function(isPub) {
  var webpack = require('webpack');
  var HappyPack = require('happypack');

  var plugins = [
      new webpack.ProvidePlugin({
        $: 'n-zepto'
      }),
      new HappyPack({
        loaders: [ 'babel' ]
      })
  ];
  if (isPub) {
      plugins.push(
        new webpack.DefinePlugin({  
          'process.env':{
            'NODE_ENV': JSON.stringify('production')
          }
        })
      );
  }

  var config = {
    entry: './src/js/main.js',
    output: {
      path: __dirname,
      filename: 'main.js'
    },
    debug : !isPub,
    resolve:{
      extensions:["",".js",".jsx",".json"]
    },
    module: {
      loaders: [{
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'happypack/loader'
        // query: {
        //   presets: ['react', 'es2015']
        // }
      },{
        test: /\.(jpg|png|gif)$/,
        loader: "url-loader?limit=8192"
      }, {
        test: /\.json$/,   
        loader: 'json'
      }]
    },
    plugins: plugins
  };

  // isPub && (config.devtool = 'eval');

  return config;
}