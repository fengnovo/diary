/**
 * 路由
 */
define(['app'], function(app){
  
   return app.config(['$routeProvider',function($routeProvider) {
            $routeProvider
              .when('/', {
                templateUrl: 'src/js/views/wd/list.html',
                controller: 'wdListCtrl'
              })
              .when('/wdxq', {
                templateUrl: 'src/js/views/wd/xq.html',
                controller: 'wdxqCtrl'
              })
              .when('/sh', {
                templateUrl: 'src/js/views/sh/list.html',
                controller: 'shListCtrl'
              })
              .when('/shxq', {
                templateUrl: 'src/js/views/sh/xq.html',
                controller: 'shxqCtrl'
              })
              .when('/listimg', {
                templateUrl: 'src/js/views/sh/listimg.html',
                controller: 'listimgCtrl'
              })
              .when('/jr', {
                templateUrl: 'src/js/views/jr/list.html',
                controller: 'jrListCtrl'
              })
              .when('/lcxq', {
                templateUrl: 'src/js/views/jr/lcxq.html',
                controller: 'lcxqCtrl'
              })
              .when('/jjxq', {
                templateUrl: 'src/js/views/jr/jjxq.html',
                controller: 'jjxqCtrl'
              })
              .otherwise({ redirectTo: '/' });

              //$locationProvider.html5Mode(true).hashPrefix('!');

   }])
   
  
})