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
				//非200的请求统计信息写在这
				return $q.reject(response);
			});
		};
	}])
	.config(['$httpProvider', function($httpProvider) {
		//$httpProvider.responseInterceptors.push('globalAjaxError');
		$httpProvider.responseInterceptors.push('statInterceptor');
	}])
//这个AppCtrl 独立于 module.config中的$routeProvider
module.controller('AppCtrl', ['$scope', '$location', '$routeParams', function($scope, $location, $routeParams ) {
	var customHistory = window.CUSTOM_HISTORY = [];
	var homePage = window.location.href;
	var defaultCategory = '资讯中心';
	var setCategory = function(category){
		$scope.category = category || $scope.category || defaultCategory;
		document.title = $scope.category;
	};

	$scope.reload = function(){
		if(window.RELOAD){
			window.RELOAD();
			$('#errorMsgContainer').hide();
		}
	};

	$scope.close = function(){
		$('#errorMsgContainer').hide();
	};

	var back = function(){
		var url;
		var result;
		while(url = customHistory.pop()){
			if(url != $location.absUrl()){
				result = url;
				break;				
			}
		}
		return result;
	}

	$scope.back = function() {
		var url = back();
		if(url){
			window.location.href = url;
		}
	}

	window.back = function(){ //这个给到了news.js中使用
		var url = back();
		if(url){
			window.location.href = url;
			return true
		}else{
			customHistory.push(homePage);
			return false;
		}
	};

	window.defultBackFun = window.back;

	$scope.category = defaultCategory;

	$scope.$on('$routeChangeSuccess', function(){
		var url = $location.absUrl();
		if(!~customHistory.indexOf(url)){
			if($location.path() == '/home'){
				setCategory(defaultCategory);
			}else{
				setCategory($routeParams.category);
			}
			customHistory.push(url);

			var backUrl = customHistory[customHistory.length - 2] || '';
			document.back = backUrl;  //这儿用了document.back 函数 ,在news.js中又用window.back 都没使用
		}
	});
}]);

module.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
	var version = '201507151733'
	$routeProvider
		.when('/home', {templateUrl: 'partials/home.html?v=' + version, controller : App.NavigationCtrl})
		.when('/news', {templateUrl: 'partials/news.html?v=' + version, controller : App.NewsCtrl, reloadOnSearch: false})//这有设置了reloadOnSearch  '$routeUpdate' 才会起作用
		.when('/category',{templateUrl:'partials/audio_info.html',controller:Action.categoryList})
		.when('/play_comment',{templateUrl:'partials/play_comment.html',controller:Action.playComment})
		.otherwise({redirectTo: '/home'});
}]);

angular.element(document).ready(function() {
	angular.bootstrap(document.body, ['app']);
});


