define(['app','telBox','time'], function(app){
      
    app.controller('listCtrl', ['$scope','$rootScope','$routeParams','$http','$timeout','$sce', 
        function ($scope,$rootScope,$routeParams,$http,$timeout,$sce) {
            
            $rootScope.headTitle = $rootScope.title = "cnode";
            console.log(location.hash.replace("#/",""));
            $rootScope.favBol = false;
            $rootScope.backBol = false;
            var page = 1, canLoad = true, list = [],tabType = ['','good','share','ask','job'],tab = location.hash.replace("#/","");
            $scope.getMore = function(){
                loadData();
            }
            var index = 0;
            tabType.map(function(item,i){
                item == tab ? index = i : null;
            });
            console.log(index);
            $('button:eq('+index+')').addClass('select-box-one').siblings().removeClass('select-box-one');
            $scope.select = function(index){
                // $('button:eq('+index+')').addClass('select-box-one').siblings().removeClass('select-box-one');
                page = 1;
                // tab = tabType[index];
                location.href='/#/'+tabType[index];
                $(window).scrollTop(0);
                list = [];
                loadData();
            }

            function bindScroll(){
                $(window).unbind('scroll').scroll( function() { 
                    // console.log("滚动条到顶部的垂直高度: "+$(document).scrollTop()); 
                    // console.log("页面的文档高度 ："+$(document).height());
                    // console.log('浏览器的高度：'+$(window).height());
                    var totalheight = parseFloat($(window).height()) + parseFloat($(window).scrollTop());     //浏览器的高度加上滚动条的高度 
                    if ($(document).height() <= totalheight && canLoad) {
                        canLoad = false;
                        // console.log("到达底部"+page);
                        $http.get('/api/v1/topics?page='+page+'&limit=10&tab='+tab)
                              .success(function(data) {
                                var ajaxListData = data && data.data;
                                if( ajaxListData && ajaxListData.length>0){
                                  list = list.concat(ajaxListData);
                                }
                               $timeout(function(){
                                 $scope.data = list;
                               },0);
                                page ++;
                                canLoad = true;
                              });
                    }
                }); 
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
                    $timeout(function(){
                        $scope.data = list;
                    },0);
                    page ++;
                    canLoad = true;
                    $timeout(function(){
                        bindScroll();
                    },0);
                    
                  });
              }
            }

            loadData();
        }])

})