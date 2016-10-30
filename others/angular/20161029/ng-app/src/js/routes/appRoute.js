/**
 * 路由
 */
define(['app'], function(app){
  
   return app.config(['$routeProvider',function($routeProvider) {
            $routeProvider
              .when('/', {
                templateUrl: 'src/js/views/listCtrl.html',
                controller: 'listCtrl'
              })
              .when('/listCtrl', {
                templateUrl: 'src/js/views/listCtrl.html',
                controller: 'listCtrl'
              })
              .when('/detailCtrl', {
                templateUrl: 'src/js/views/detailCtrl.html',
                controller: 'detailCtrl'
              })
              .otherwise({ redirectTo: '/' });

              //$locationProvider.html5Mode(true).hashPrefix('!');

   }])
   
  
})