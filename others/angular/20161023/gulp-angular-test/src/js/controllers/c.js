!(function(Action,$){
    'use strict';
    Action.commentList = function ($scope, $timeout, $window, $routeParams, AudioLecture) {
        var xx = 'c页面';
    };
    angular.module('app').directive('gfAudioComment', ['$timeout', '$routeParams', '$window', 'AudioLecture', 
        function ($timeout, $routeParams, $window, AudioLecture) {
            return {
                restrict: 'A',
                scope: false,
                link: function ($scope, $element, $attr) {
                    Action.commentList($scope, $timeout, $window, $routeParams, AudioLecture);
                }      
            };     
        }
    ]);
}) (window.Action || (window.Action = {}),$);
