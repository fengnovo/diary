/**
 * 单例模式
 */

var singleton = {
    
}

/**
 * 高级单例模式
 * 命令模式
 * 闭包
 * 发布订阅模式
 * 惰性思想
 */
var singletonModule = (function(){
    var moduleA = {
        a: '22'
    }
    function moduleFunA() {
        console.log('modulueFunA');
        console.log();
    }
    return {
        init: function() {
            moduleFunA();
        }
    }
})();

singletonModule.init();