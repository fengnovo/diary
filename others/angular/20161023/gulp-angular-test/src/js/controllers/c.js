!(function(Action){
    'use strict';
    Action.c = function ($scope, $timeout, $window, $routeParams) {
        var xx = 'c页面';
    };
    angular.module('app').directive('c', ['$timeout', '$routeParams', '$window', 
        function ($timeout, $routeParams, $window) {
            return {
                restrict: 'A',
                scope: false,
                link: function ($scope, $element, $attr) {
                    Action.c($scope, $timeout, $window, $routeParams);
                }      
            };     
        }
    ]);
}) (window.Action || (window.Action = {}));
