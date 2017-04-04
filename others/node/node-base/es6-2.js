let obj = {
	item: 'item',
	b: [4,5,6,7],
	fun1(){
		this.b.forEach(item=>{
			console.log(this.item);
		});
	},
	fun2(){
		this.b.forEach(item=>{
			console.log(item);
		});
	},
	fun3(){
		this.b.forEach(function(item){
			console.log(item);
		});
	},
	fun4(){
		this.b.forEach(function(item){
			console.log(item);
		}.bind(this));
	},
}

// obj.fun1();
// console.log('-------------');
// obj.fun2();
// console.log('-------------');
// obj.fun3();
// console.log('-------------');
// obj.fun4();

/*
item
item
item
item
-------------
4
5
6
7
-------------
4
5
6
7
-------------
4
5
6
7
*/

let arr1=[];
let i=1;while(i<100){
	arr1.push(i);
	i++;
}
let arr2 = arr1.map(item=>item%2==0);
// console.log(arr2)

let arr3 = [1,2,3,5,6,2,3,5,6,7];
let arr4 = arr3.filter((item,i) => {
	return arr3.indexOf(item) == i;
})
// console.log(arr4);		//[ 1, 2, 3, 5, 6, 7 ]


















