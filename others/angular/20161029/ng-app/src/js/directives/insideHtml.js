/**
 * 电话框的directive
 */
define(['jquery','app'], function ($,app) {
  	app.directive('insideHtml', [function () {
  		console.log('---------0');
		return {
			restrict: 'AE',
			replace:true,
            //transclude: true,
			templateUrl: "src/js/views/insideHtml.html",
			scope: {
		    },
			link: function (scope, ele, attr) {
            	// if(attr.insideHtml){
			      scope.$watch('insideHtml' , function(html){
			      	console.log('---------1');
			        el.html(html || '');//更新html内容

			      });
			    // }
			}	
		}
  }])

})