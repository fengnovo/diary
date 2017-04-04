let {ab:a,ac:{ad:b},af:c} ={
	ab: 1,
	ac: {
		ad: 23
	},
	af: 6
}
// console.log(a,b,c);		//1 23 6

let obj ={
	ab: 1,
	ac: {
		ad: 23
	},
	af: 6
}

let {ab:a1,ac:a2,af:a3} = obj;

// console.log(a2===obj.ac);	//true
// console.log(a2.ad);			//23

// var k=1;
// (function(){
// 	console.log(k);		//undefined
// 	var k=2;
// })();


// var k=1;
// (function(){
// 	console.log(k);	//1
// 	 k=2;
// })();