let obj = {
	f(){
		console.log('f');
	},
	['prop_'+(()=>42)()]: 42
}

// console.log(obj);	//{ f: [Function: f], prop_42: 42 }

let s = String.raw`This is a "\n" string!`
// console.log(s);		//This is a "\n" string!

//函数传入值的三种写法		default,rest,spread
function fun1(x,y=12){
	return x+y;
}
// console.log(fun1(3));		//15

function fun2(x,...y){		//rest剩下的		y是一个array
	return x*y.length;
}
// console.log(fun2(4,'world',true));		//8
// console.log(fun2(6,'world',true));		//12

function fun3(x,y){			//spread展开的
	return x+y;
}
// console.log(fun3(...[1,2]));	//3

function fun31(x,y,z){
	return x*y*z;
}
// console.log(fun3(...[4,7,1]));		//11
// console.log(fun31(...[4,7,1]));		//28

// for(var i=0;i<5;i++){
// 	setTimeout(function(){
// 		console.log(i);
// 	});
// }
//	55555

// for(let a=0;a<5;a++){
// 	setTimeout(function(){
// 		console.log(a);
// 	});
// }
//	01234

// for(var a=0;a<5;a++){
// 	setTimeout(()=>{
// 		console.log(a);
// 	});
// }
//	55555

// for(var a=0;a<5;a++){
// 	setTimeout((a)=>{
// 		console.log(a);
// 	});
// }
//	undefined	undefined	undefined	undefined	undefined
















