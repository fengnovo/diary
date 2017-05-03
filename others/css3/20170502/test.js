function s() {
	var t = new Array();
    t = Array.prototype.slice.call(arguments);
    t = t.sort(function(a,b){
        return a-b;
    });
	return t;
}

var r = s(50,11,16,32,24,99,57,100);
console.log(r); //[ 11, 16, 24, 32, 50, 57, 99, 100 ]
