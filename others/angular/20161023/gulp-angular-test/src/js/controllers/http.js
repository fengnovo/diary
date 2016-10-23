var moduleApp = moduleApp || angular.module('dao_service',[]);
var HowLongTimeOut = 20000; //设置多久超时
window.userData = {
    app: 'gf-mobile',
    mobileMode: false     // 手机静态资源模式，cookie设置用jsb；网络模式，cookie设置用cookie.js插件
};
 var cookieDomain = '10.2.122.58';
//var cookieDomain = 'pod.gf.com.cn';

 // var baseUrl = '/api';        // 开发环境
 // var baseUrl = 'http://10.2.122.58:88/api';      // 测试环境
var baseUrl = 'http://pod.gf.com.cn/api/information/podcastserver/1.0.0';   // 生产环境

moduleApp.service('AudioLecture', ['$http', '$q', function($http, $q){
    this.getAllCategories = function() {
        var defer = $q.defer();
        $http({
            method:'get',
            url: baseUrl + '/categories',
            timeout: HowLongTimeOut
        }).success(function(res){
            defer.resolve(res);
        }).error(function(data,status,headers,config){
            defer.reject(data);
        });
        return defer.promise;
    };
}]);

