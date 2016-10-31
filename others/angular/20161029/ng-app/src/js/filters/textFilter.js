

define(['app'], function (app) {
	app.filter('time',function(){
	    return function(input){
	    	Date.prototype.format = function(format){
	            var o = {
	                "M+" : this.getMonth()+1,   //月
	                "d+" : this.getDate(),      //日
	                "h+" : this.getHours(),     //时
	                "m+" : this.getMinutes(),   //分
	                "s+" : this.getSeconds(),   //秒
	                "q+" : Math.floor((this.getMonth()+3)/3), //刻
	                "S" : this.getMilliseconds()//毫秒
	            }

	            if(/(y+)/.test(format)) {
	                format = format.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
	            }

	            for(var k in o) {
	                if(new RegExp("("+ k +")").test(format)) {
	                    format = format.replace(RegExp.$1, RegExp.$1.length==1 ? o[k] : ("00"+ o[k]).substr((""+ o[k]).length));
	                }
	            }
	            return format;
	        }
			var date = new Date(input);
	        var time = new Date().getTime() - date.getTime(); //现在的时间-传入的时间 = 相差的时间（单位 = 毫秒）
	        var out = '';
	        if (time < 0) {
	            out = '';
	        } else if (time / 1000 < 60) {
	            out = '刚刚';
	        } else if ((time / 60000) < 60) {
	            out = parseInt((time / 60000)) + '分钟前';
	        } else if ((time / 3600000) < 24) {
	            out = parseInt(time / 3600000) + '小时前';
	        } else {
	            out = date.getFullYear()+'-'+date.format("MM-dd");
	        }
	        return out;
	    }
	});

});