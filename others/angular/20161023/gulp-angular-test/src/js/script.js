//document.ontouchmove = function(e) {//这个是干什么用的，浏览器有什么默认的行为？？？？
//	e.preventDefault();
//}

window.addUserDataToUrls = function(url){
	if(window.userData){
		if(url.indexOf('?') != -1){
			url += '&';
		}else{
			url += '?';
		}
		var queryParams = []
		angular.forEach(window.userData, function(value, key){
			var query = key + '=' + value;
			queryParams.push(query)
		});
		url += queryParams.join('&');
		return url;
	}
}

var module = angular.module('app', ['dao_service'])
//	.factory('globalAjaxError', ['$q', function($q) {
//		return function(promise) {
//			return promise.then(function(response) {
//				return response;
//			}, function(response) {
//				//非200的请求统计信息写在这
//				$('#errorMsgContainer').show();
//				// setTimeout(function(){
//				// 	$('#errorMsgContainer').hide();
//				// }, 1000);
//				return $q.reject(response);
//			});
//		};
//	}])
	.factory('statInterceptor', ['$q', function($q) {
		return function(promise) {
			return promise.then(function(response) {
				//全局百度统计
				if (window.statistic_push) {
					var url = response.config.url;
					if (url.charAt(0) !== '/') url = '/' + url;
					var i = url.indexOf('?');
					if (i>=0) {
						url = url.substr(0, i);
					}
					statistic_push(url);
				}
				return response;
			}, function(response) {
				return $q.reject(response);
			});
		};
	}])
	.config(['$httpProvider', function($httpProvider) {
		$httpProvider.responseInterceptors.push('statInterceptor');
	}])
module.controller('AppCtrl', ['$scope', '$location', '$routeParams', function($scope, $location, $routeParams ) {
	var xx = '入口文件';
}]);

module.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
	var version = '201507151733'
	$routeProvider
		.when('/a', {templateUrl: 'page/a.html?v=' + version, controller : App.a})
		.when('/b', {templateUrl: 'page/b.html?v=' + version, controller : App.b})
		.when('/c', {templateUrl: 'page/c.html?v=' + version, controller : Action.c})
		.otherwise({redirectTo: '/a'});
}]);

angular.element(document).ready(function() {
	angular.bootstrap(document.body, ['app']);
});


