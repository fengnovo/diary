var events = require('events');
var util = require('util');
var EventEmitter = events.EventEmitter;
function Bell() {
    EventEmitter.call(this);
}
util.inherits(Bell, EventEmitter);

// Bell.prototype.ring = function () {
//     this.emit('ring');
// }

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
bell.addListener('ring', studentsIn);
bell.on('ring', studentsIn);
bell.on('ring', teachersIn);
bell.once('ring', MasterIn);
bell.emit('ring');
bell.emit('ring');