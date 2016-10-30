define(['app','telBox'], function(app){
      
    app.controller('contrl', ['$scope','$rootScope','$http','$sce', function ($scope,$rootScope,$http,$sce) {
            
            $rootScope.headTitle = $rootScope.title = "cnode";
            $rootScope.favBol = false;
            $rootScope.backBol = false;
            var page = 1, canLoad = true, list = [],tabType = ['','good','share','ask','job'],tab = '';
            $scope.getMore = function(){
                loadData();
            }
            $scope.select = function(index){
                $('button:eq('+index+')').addClass('select-box-one').siblings().removeClass('select-box-one');
                page = 1;
                tab = tabType[index];
                $(window).scrollTop(0);
                list = [];
                loadData();
            }

            function loadData(){
              if(canLoad){
                canLoad = false;
                $http.get('/api/v1/topics?page='+page+'&limit=10&tab='+tab)
                  .success(function(data) {
                    var ajaxListData = data && data.data;
                    if( ajaxListData && ajaxListData.length>0){
                      list = list.concat(ajaxListData);
                    }
                    $scope.data = list;
                    page ++;
                    canLoad = true;
                  });
              }
            }

            loadData();
        }])

})