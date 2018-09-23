const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const PUBLIC_PATH = process.env.NODE_ENV === 'production' ? './' : '../';

module.exports = {
    entry: ['babel-polyfill', './index.js'],
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: '[name].[contenthash:12].js',
    },
    module: {
        rules : [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader?cacheDirectory'
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    // 'style-loader', 
                    'css-loader?modules&localIdentName=[name]-[hash:base64:5]'
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: ['file-loader']
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: ['file-loader']
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(['dist'], {
            root: path.resolve(__dirname, '../')
        }),
        new HtmlWebpackPlugin({
            title: '这里设置标题为什么没用？？',
            template: './index.html'
        }),
    ]
}