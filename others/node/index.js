const http = require('http');
const PORT = 7000;

http.createServer((require,response)=>{
	response.end('hello wolrd');
}).listen(PORT,()=>{
	console.log(`listen to server ${PORT}`);
});
