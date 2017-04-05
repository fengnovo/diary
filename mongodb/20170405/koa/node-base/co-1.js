/*
let fs = require('fs');

fs.readFile('./files/a.json','utf8',(error1,data1)=>{
	console.log(data1);
	fs.readFile('./files/b.json','utf8',(error2,data2)=>{
		console.log(data2);
		fs.readFile('./files/c.json','utf8',(error3,data3)=>{
			console.log(data3);
			fs.readFile('./files/d.json','utf8',(error4,data4)=>{
				console.log(data4);
			});
		});
	});
});
*/

let fs = require('fs');
let co = require('co');

let readFile = url => {
	return cb => fs.readFile(url,'utf8',cb);
}

/*
yield 与 yield* 的区别在于：yield 只是返回右值，而 yield* 则将函数委托
（delegate）到另一个生成器（ Generator）或可迭代的对象（如字符串、数组和类数组 arguments，以及 ES6 中的 Map、Set 等）。
*/

function(cb){
	return fs.readFile('./files/a.json','utf8',cb);
}

co(function*(){
	let data1 = yield readFile('./files/a.json');
	console.log(data1);
	let data2 = yield readFile('./files/b.json');
	console.log(data2);
	let data3 = yield readFile('./files/c.json');
	console.log(data3);
	let data4 = yield readFile('./files/d.json');
	console.log(data4);
}).catch(error => console.log(error) )