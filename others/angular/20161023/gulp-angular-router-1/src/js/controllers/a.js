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
            $.getJSON('/read/article/5811bf173ecde020ed30d80d',function(data){
                $('#tip1').html(JSON.stringify(data));
            });
            $('#btn1').click(function(){
                window.back();
            });
        }) .controller('b', function ($scope, $route) { 
            $scope.$route = $route;
            $('#tip2').html('alert2');
            $.getJSON('/episodes/category/57959fd6b05063000b284f58?page_no=1&page_size=10',function(data){
                $('#tip2').html(JSON.stringify(data));
            });
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

