/*
function* 就是生成器函数Generator
*/

function* helloWorldGeneratorFunction() {
  yield 'hello';
  yield 'world';
  return '!';
}

var helloWorldGenerator = helloWorldGeneratorFunction();

console.log(helloWorldGenerator.next())	//	{ value: 'hello', done: false }

console.log(helloWorldGenerator.next())	//	{ value: 'world', done: false }

console.log(helloWorldGenerator.next())	//	{ value: '!', done: true }

console.log(helloWorldGenerator.next())	//	{ value: undefined, done: true }

console.log('-------------------------------------------------------------------');


// yield 的作用，即暂停函数的执行并返回右值 
function* GenFunc1() {
  yield [1, 2];
  yield* [3, 4];
  yield "56";
  yield* "78";
}
var gen1 = GenFunc1();
// console.log(gen1.next());	//{ value: [ 1, 2 ], done: false }
// console.log(gen1.next());	//{ value: 3, done: false }
console.log(gen1.next().value); // [1, 2]
console.log(gen1.next().value); // 3
console.log(gen1.next().value); // 4
console.log(gen1.next().value); // 56
console.log(gen1.next().value); // 7
console.log(gen1.next().value); // 8

console.log('-------------------------------------------------------------------');


function* GenFunc2() {
  yield arguments;
  yield* arguments;
}
var gen2 = GenFunc2(1, 2);
console.log(gen2.next().value); // { '0': 1, '1': 2 }
console.log(gen2.next().value); // 1
console.log(gen2.next().value); // 2

console.log('-------------------------------------------------------------------');

function* Gen1() {
  yield 2;
  yield 3;
}
function* Gen2() {
  yield 1;
  yield* Gen1();
  yield 4;
}
var g2 = Gen2();
console.log(g2.next().value); // 1
console.log(g2.next().value); // 2
console.log(g2.next().value); // 3
console.log(g2.next().value); // 4

console.log('-------------------------------------------------------------------');

function* GenFunc3() {
  yield {a: '1', b: '2'};
  yield* {a: '1', b: '2'};		//不可迭代的对象----------!!!
}
var gen3 = GenFunc3();
console.log(gen3.next()); // { value: { a: '1', b: '2' }, done: false }
console.log(gen3.next()); // TypeError: undefined is not a function
// console.log(gen3.next());

console.log('-------------------------------------------------------------------');
/*
yield 与 yield* 的区别在于：yield 只是返回右值，而 yield* 则将函数委托
（delegate）到另一个生成器（ Generator）或可迭代的对象（如字符串、数组和类数组 arguments，以及 ES6 中的 Map、Set 等）。
*/












