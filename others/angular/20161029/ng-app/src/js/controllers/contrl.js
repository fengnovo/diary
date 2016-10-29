define(['app','telBox'], function(app){
      
    app.controller('contrl', ['$scope','$rootScope','$http','$sce', function ($scope,$rootScope,$http,$sce) {
            
            // $rootScope.headTitle = $rootScope.title = "网点详情";
            // $rootScope.favBol = true;
            // $rootScope.backBol = true;

            // $http.get('./src/json/wdxq.json').
            //   success(function(data) {

            //     $scope.xq = data;

            //     $scope.myHTML = $sce.trustAsHtml($scope.xq.branch_remark);

            //     $scope.branchTel = $scope.xq.branch_tel;
            //     $scope.tels = $scope.branchTel.split(",");
                
            //   });

            //   $scope.boxShow = false;
            //   $scope.toggleShow = function() {
            //         $scope.boxShow = !$scope.boxShow;
            //   };
             $rootScope.headTitle = $rootScope.title = "商户列表";
            $rootScope.favBol = false;
            $rootScope.backBol = false;

            $scope.getMore = function(){
              angular.element('.list-box ul').append('<p>1111111111111111111111</p>')
            }

            $http.get('./src/list.json').
              success(function(data) {

                $scope.shops = data.shops;
                $scope.areas = data.areas;
                $scope.types = data.types;
                $scope.orders = data.orders;
                $scope.$emit('dataloaded');//发送数据加载完成信号
              });


        }])

})