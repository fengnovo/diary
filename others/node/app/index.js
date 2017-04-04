let fs = require('fs');

class App{
	constructor(){

	}
	/*
	initServer(request,response){
		fs.readFile('./public/index.html','utf8',(error,data)=>{
			if(error) console.log(error);
			response.end(data);
		})
		
	}
	*/
	initServer(){
		//初始化的工作
		let _package = require('../package');
		_package = JSON.stringify(_package);

		return (request,response) => {
			fs.readFile('./public/index.html','utf8',(error,data)=>{
				if(error) console.log(error);
				response.end(_package);
			})
		}
	}
}



/*
function App(){

}

App.prototype.initServer = (request,response) =>{
	response.end('Hello World');
}
*/

module.exports = App;