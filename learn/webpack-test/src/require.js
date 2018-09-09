var factories = {};
function define(moduleName, depends, factory) {
    factories[moduleName] = factory;
}
function require(mods, callback) {
    var results = mods.map(function (mod) {
        var factory = factories[mod];
        var exportFun = factory && factory();
        return exportFun;
    });
    callback.apply(null, results);
}

define('name', [], function () {
    return '小峰';
});

define('age', [], function () {
    return '28岁';
});

require(['name', 'age'], function (name, age) {
    console.log(name + age + '了!');
});