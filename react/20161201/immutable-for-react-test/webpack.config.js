module.exports = {
    entry: __dirname + '/src/main.js',
    output: {
        path: __dirname + '/build',
        filename: 'bundle.js'
    },
    module:{
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel',
                exclude: /node_modules/
            }
        ]
    },
    devServer: {
        contentBase: './',
        colors: true,
        online: true,
        historyApiFallback: true
    },
    solve:['','.js','.jsx']
}