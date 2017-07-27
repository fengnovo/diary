var wp_config;
var ENV = process.env.NODE_ENV;

if(ENV=='production'){
    console.log('生产环境--------------------------------------------------');
    wp_config = require('./webpack.config.pub');
}else{
    console.log('开发环境--------------------------------------------------');
    wp_config = require('./webpack.config.dev');
}

module.exports = wp_config;