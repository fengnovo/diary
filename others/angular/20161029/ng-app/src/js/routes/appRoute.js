/**
 * 路由
 */
define(['app'], function(app){
  
   return app.config(['$routeProvider',function($routeProvider) {
            $routeProvider
              .when('/', {
                templateUrl: 'src/js/views/list.html',
                controller: 'contrl'
              })
              .when('/contrl', {
                templateUrl: 'src/js/views/list.html',
                controller: 'contrl'
              })
              .otherwise({ redirectTo: '/' });

              //$locationProvider.html5Mode(true).hashPrefix('!');

   }])
   
  
})