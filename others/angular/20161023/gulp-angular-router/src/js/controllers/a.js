(function($){
 "use strict";


 var app = angular.module('App', ['ngRoute']);
     app.controller('a', function ($scope, $route) { 
            $scope.$route = $route;
            $('#tip1').html('alert1');
            window.back = function(){
                window.history.back();
                return true;
            }
            $('#btn1').click(function(){
                window.back();
            });
        }) .controller('b', function ($scope, $route) { 
            $scope.$route = $route;
            $('#tip2').html('alert2');
            window.back = function(){
                window.history.back();
                return true;
            }
            $('#btn2').click(function(){
                window.back();
            });
        }) .controller('c', function ($scope, $route) { 
            $scope.$route = $route;
            $('#tip3').html('alert3');
            window.back = function(){
                window.history.back();
                return true;
            }
            $('#btn3').click(function(){
                window.back();
            });
        });

		app.config(function ($routeProvider) {
            $routeProvider. when('/a', {
                templateUrl: 'page/a.html',
                controller: 'a'
            }). when('/b', {
                templateUrl: 'page/b.html',
                controller: 'b'
            }). when('/c', {
                templateUrl: 'page/c.html',
                controller: 'c'
            }). otherwise({
                redirectTo: '/a'
            });
        });
})(jQuery); 

