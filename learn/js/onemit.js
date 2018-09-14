function Bell() {
    this.eventPool = {};
}
Bell.prototype.on = function (eventName, callBack) {
    if (this.eventPool[eventName]) {
        this.eventPool[eventName].push(callBack);
    } else {
        this.eventPool[eventName] = [callBack];
    }
}
Bell.prototype.emit = function (eventName) {
    this.eventPool[eventName].forEach(function(callback) {
        callback();
    });
}

var bell = new Bell();
var studentsIn = function () {
    console.log('Students come in classroom!');
}
var teachersIn = function () {
    console.log('Teachers come in classroom!');
}
var MasterIn = function () {
    console.log('Master comes in classroom!');
}
bell.on('ring', studentsIn);
bell.on('ring', teachersIn);
bell.on('ring', MasterIn);
bell.emit('ring');