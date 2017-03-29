module.exports = {
    entry: __dirname+'/src/main.js',
    output: {
        path: __dirname+'/bundle.js'
    },
    module: {
        loaders:[
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel'
            },{
                test: /\.css$/, 
                exclude: /node_modules/,
                loader: 'style-loader!css-loader'
            },{
                test: /\.(png|jpg)$/,
                exclude: /node_modules/,
                loader: 'url-loader'
            }
        ]
    },
    solove: [
        '','.js','.jsx'
    ],
    devServer: {
        contentBase: './',
        colors: true,
        inline: true,
        historyApiFallback: true
    }
}