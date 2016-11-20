var webpack = require('webpack');
module.exports = {
    entry: [
      "./src/pages/app.jsx"
    ],
    output: {
        path: './',
        filename: "index.js"
    },
    devServer: {
        historyApiFallback: true,
        hot: true,
        inline: true,
        stats: { colors: true },
        proxy: {
            ///list/column  --> http://10.2.130.20:9000/column
            '/list': {
              target: 'http://10.2.130.20:9000',
              pathRewrite: {'^/column' : '/column'},
              changeOrigin: true
            },
            ///ok/ok  --> http://pod.gf.com.cn/api/information/podcastserver/1.0.0/episodes/category/57959fd6b05063000b284f58?page_no=1&page_size=1
            '/ok':{
                target: 'http://pod.gf.com.cn/api/information/podcastserver/1.0.0',
                pathRewrite: {'^/ok':'/episodes/category/57959fd6b05063000b284f58?page_no=1&page_size=10'},
                changeOrigin: true
            },

            //  /categories -->http://pod.gf.com.cn/api/information/podcastserver/1.0.0/categories
            '/categories': {
                target: 'http://pod.gf.com.cn/api/information/podcastserver/1.0.0',
                pathRewrite: {'^/': '/'},
                changeOrigin: true
            }
         }
    },
    module: {
        loaders: [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel',
            query: {
                presets: ['es2015','react']
            }
         },{
            test: /\.css$/,
            loader: "style!css"
         }, {
            test: /\.scss/,
            loader: 'style-loader!css-loader!sass-loader'
        },
           // { test: /\.png$/, loader: 'file'}
           {
                test: /\.(png|jpg|gif)$/,
                loader: 'url-loader?limit=8192'
            } // 内联 base64 URLs, 限定 <=8k 的图片, 其他的用 URL


        ]
    },
    resolve:{
        extensions:['','.js','.jsx']
    }
};