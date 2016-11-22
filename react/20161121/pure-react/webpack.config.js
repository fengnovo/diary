var path = require('path');
module.exports = {
    entry: path.resolve(__dirname, './src/main.jsx'),
    output: {
        path: path.resolve(__dirname, 'web'),
        filename: 'index.js'
    },
    devServer: {
		historyApiFallback: true,
      	hot: true,
		inline: true,
		stats: { colors: true }
	},
    module: {
        loaders: [
            // {
            //     test:/\.jsx?$/,
            //     loader: 'babel',
            //     exclude: /node_modules/,
            //     query:{
            //         presets: ['react','es2015']
            //     }
            // }
            { 
                test: /\.js[x]?$/, 
                exclude: /node_modules/, 
                loader: 'babel-loader?presets[]=es2015&presets[]=react' 
            }
        ]
    }
}


