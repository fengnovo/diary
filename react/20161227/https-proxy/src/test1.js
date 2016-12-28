//gulp browserSync proxy
var url = require('url');
var proxy = require('proxy-middlewre');var proxyOptions = url.parse('http://192.168.85.201:3000');

proxyOptions.route = '/api';
// requests to `http://192.168.85.201:8000/api/login` are proxied to `http://192.168.85.201:3000/login`browserSync.init({
	server: {
		baseDir: "./",
		directory: true,
		middleware: [proxy(proxyOptions)]
	}
});
//webpack proxy
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./build/webpack.config');
// 相当于通过本地node服务代理请求到了http://cnodejs.org/api
var proxy = {
	'/api/*': {
	target: 'https://cnodejs.org',
	secure: false
}
}
//启动服务
var server = new WebpackDevServer(webpack(config), {
publicPath: config.output.publicPath,
proxy: proxy,
stats: {
	colors: require('supports-color')
},
});
//将其他路由，全部返回index.html
server.app.get('*', function (req, res) {
	res.sendFile(__dirname + '/index.html')
});
server.listen(9999);