const http = require('http');
const PORT = 7000;
let App =  require('./app');
let server = new App();

http.createServer(server.initServer()).listen(PORT,()=>{
	console.log(`listen to server ${PORT}`);
});
