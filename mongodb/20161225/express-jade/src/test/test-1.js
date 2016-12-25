var http = require('http');

//第一种写法
var server = http.createServer(function(req,res){
	console.log(req.method);
	console.log(req.url);
	console.log(req.headers);
	res.end('Hello World!');
});


/*
//第二种写法
var server = http.createServer();
server.on('request',function(req,res){
	console.log(req.method);
	console.log(req.url);
	console.log(req.headers);
	res.end('Hello World!');
});
*/


server.listen(3008);
console.log('listen 3008 ...');