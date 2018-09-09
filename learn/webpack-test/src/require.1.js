var factories = {};
function define(moduleName, depends, factory) {
    factory.depends = depends;
    factories[moduleName] = factory;
}
function require(mods, callback) {
    var results = mods.map(function (mod) {
        var factory = factories[mod];
        var factoryDepends = factory.depends;
        var exportFun;
        require(factoryDepends, function() {
            exportFun = factory.apply(null, arguments);
        });
        return exportFun;
    });
    callback.apply(null, results);
}

define('age', [], function () {
    return '28岁';
});

define('name', ['age'], function (age) {
    return '小峰' + age;
});

require(['name'], function (name) {
    console.log(name + '了!');
});