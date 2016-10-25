(function () {
      angular.module("Demo", ["ngRoute"])
      .config(["$routeProvider",routeConfig])
      .controller("testCtrl", ["$route","$scope",testCtrl])
      .controller("firstPageCtrl",firstPageCtrl)
      .controller("secondPageCtrl",secondPageCtrl);
      function routeConfig($routeProvider){
          $routeProvider.otherwise("/index/page1");
          $routeProvider
          .when("/index/page1",{
            templateUrl:"page1.tpl",
            controller:"firstPageCtrl",
            controllerAs:"fisrtCtrl"
          })
          .when("/index/page2",{
            templateUrl:"page2.tpl",
            controller:"secondPageCtrl",
            controllerAs:"secondCtrl"
          });
      };
      function testCtrl($route,$scope) {
          this.reload = function(){
              $route.reload();
          };
          this.update = function(){
              $route.updateParams({name:"beast"});
          };
          $scope.$on("$routeChangeStart",function(event,nextRoute,currentRoute){
              //event.preventDefault();  //可控制不跳转页面，主要在路由权限控制的时候用的多
              console.log(nextRoute,currentRoute);// 下一个路由信息和上一个路由信息
          });
      };
      function firstPageCtrl(){
          this.value = "hello world";
          console.log("this is page1");//用于证明reload
      }
      function secondPageCtrl(){
          this.value = "Hello World";
          console.log("this is page2");//用于证明reload
      }
  }());

