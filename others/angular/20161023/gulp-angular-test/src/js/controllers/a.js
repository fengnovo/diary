(function($){
 "use strict";
var app = angular.module('App',[]);
    app.controller('a', function ($scope) { 
        console.log('------------------');
            $('#test2').html('test2');
            $('div').click(function(){
                alert('2');
            });
    });
    $('#test1').html('test1');
})(jQuery); 

