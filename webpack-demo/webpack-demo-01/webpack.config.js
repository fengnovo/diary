var webpack = require('webpack');
// var webpackMd5Hash = require('webpack-md5-hash');

var path = require('path');
var ExtractTextWebpackPlugin = require("extract-text-webpack-plugin");
var UglifyjsWebpackPlugin = require('Uglifyjs-webpack-plugin'); // 多线程打包

module.exports = {
    entry: {
        common: ['jquery', 'lodash'],
        react: ['react', 'react-redux'],
        one: './src/one.js',
        two: './src/two.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[chunkhash:8].js'  // 添加hash '[name].[hash:6].js'，每次三个文件都一样的hash。chunkhash则不会
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ExtractTextWebpackPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                })
            }
        ]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({   // 提取成公共文件
            name: ['react', 'common'],
            minChunks: Infinity
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'manifest'    //提取出manifest，记住每次修改后的映射，用来保持公共库不变hash
        }),
        new UglifyjsWebpackPlugin({  // 优化打包速度，webpack3及以上有用，单页面（多页面不明显）
            parallel: true
        }),
        new ExtractTextWebpackPlugin("[name].[contenthash:8].css"),  // contenthash 表示改变css文件编译就重新打包
        new webpack.HashedModuleIdsPlugin(), //引入HashedModuleIdsPlugin固定模块id
        // new webpackMd5Hash() // 不会生成manifest，只生成变化的文件。打包的模块关系变成了黑盒，存在一定的未知风险
    ]
}