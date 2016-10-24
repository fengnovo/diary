$(function(){

        
    app.controller('a', function ($scope, $route, $) { 
            $scope.$route = $route;
            $('#tip').click(function(){
                alert('a页面');
            });
        })
        .controller('b', function ($scope, $route) { 
            $scope.$route = $route;
        })
        .controller('c', function ($scope, $route) { 
            $scope.$route = $route;
        });

        
});
var app = angular.module('ngRouteExample', ['ngRoute']);
app.config(function ($routeProvider) {
            $routeProvider.
            when('/a', {
                templateUrl: 'page/a.html',
                controller: 'a'
            }).
            when('/b', {
                templateUrl: 'page/b.html',
                controller: 'b'
            }).
            when('/c', {
                templateUrl: 'page/c.html',
                controller: 'c'
            }).
            otherwise({
                redirectTo: '/a'
            });
        });
