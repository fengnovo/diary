function Girl() {
    this.eventPool = {};
}
Girl.prototype.on = function (eventName, callBack) {
    if (this.eventPool[eventName]) {
        this.eventPool[eventName].push(callBack);
    } else {
        this.eventPool[eventName] = [callBack];
    }
}
Girl.prototype.emit = function (eventName) {
    var args = Array.prototype.slice.call(arguments);
    args = args.slice(1);
    this.eventPool[eventName].forEach((callback) => {
        // 匿名函数this指向全局对象， 箭头匿名函数this指向Girl
        callback.call(this, args);
        // callback.call(null, args); // 指定null (匿名函数this)(箭头匿名函数this)都指向全局对象
    });
}

var girl = new Girl();
var eat = function (who) {
    console.log(this);
    console.log(who + '吃');
}
var play = function (who) {
    console.log(who + '游玩');
}
var shopping = function (who) {
    console.log(who + '购物');
}
girl.on('lovelorn', eat);
girl.on('lovelorn', play);
girl.on('lovelorn', shopping);
girl.emit('lovelorn', '小李');