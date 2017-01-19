module.exports = {
    entry: __dirname+'/src/main.js',
    output: {
        path: __dirname+'/build',
        fileName: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test:/\.js$/,
                exclude: 'node_modules',
                loader: 'babel'
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