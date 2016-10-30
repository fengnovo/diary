define(['app','insideHtml'], function(app){
      
    app.controller('detailCtrl', ['$scope','$rootScope','$routeParams','$http','$sce', function ($scope,$rootScope,$routeParams,$http,$sce) {
        $rootScope.headTitle = $rootScope.title = "详情";
        $rootScope.favBol = true;
        $rootScope.backBol = true;
        $scope.data = {
        	title : '加载中...',
        	content: ''
        }
        console.log($routeParams.id);

        $http.get('/api/v1/topic/'+$routeParams.id).success(function(data){
			$scope.data = data.data;
			// $scope.$on('insideHtml', data.data.content);
			$('#content').html(data.data && data.data.content);
        });



    }]);

})