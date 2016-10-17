$(function(){
	var buildUrl = 'https://raw.githubusercontent.com/fengnovo/diary/master/plugins-test/iscroll/ajax-json/';
	var myScroll,
		pullDownEl, pullDownOffset,
		pullUpEl, pullUpOffset;
	var page = 1, num = 10, canLoad = false, canPullDown = false;

	var line = function(){
		$('#line').height($('#thelist').height());
	}
	function returnHtml(list){
		Date.prototype.Format = function (fmt) { //author: meizz
			var o = {
				"M+": this.getMonth() + 1, 	//月份
				"d+": this.getDate(), 		//日
				"h+": this.getHours(), 		//小时
				"m+": this.getMinutes(), 	//分
				"s+": this.getSeconds(), 	//秒
				"q+": Math.floor((this.getMonth() + 3) / 3), //季度
				"S": this.getMilliseconds() //毫秒
			};
			if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
			for (var k in o)
				if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
			return fmt;
		}
		var _html = '';
		list.map(function(item){
			return  _html+= '<li id='+item.id+'><p>'+new Date(item.publishTime* 1000).Format("MM月dd日")+'<span>'+new Date(item.publishTime* 1000).Format("hh:mm")+'</span></p><b></b><dl><dt>'+item.content+'</dt></dl></li>';
		});
		return _html;
	}

	var loadData = function(){
		url = buildUrl+'1.json';
		$.ajax({        
            url: url,
            type: 'GET',
            dataType: "json",
            timeout: 10000,
            error: function(){},
            success: function (data) {
            	page++;
				$('#loadingTip').remove();
				$('#wrapper').show();
				var list = data.data;
				$('#listCon').html(returnHtml(list));
				line();
				loaded();
				myScroll.refresh();
				canLoad = true;
				canPullDown = true;
			}
        });
	}

	loadData();


	/**
	 * 下拉刷新数据
	 */
	function pullDownAction () {
		if(canPullDown) {
			canPullDown = false;	
			url = buildUrl+'1.json';
			$.ajax({        		
	            url: url,
	            type: 'GET',
	            dataType: "json",
	            timeout: 10000,
	            error: function(){},
	            success: function (data) {
					page = 2;
					var list = data.data;
					$('#listCon').html(returnHtml(list));
					line();
					$('#pullUp').show();
					$('#listEnd').hide();
					myScroll.refresh();
					canPullDown = true;
					canLoad = true;
				}
	        });

		}
	}
	/**
	 * 上拉加载下一页数据
	 */
	function pullUpAction () {
		if(canLoad){
			canLoad = false;
			url = buildUrl+page+'.json';
			$.ajax({        
	            url: url,
	            type: 'GET',
	            dataType: "json",  
	            timeout: 10000,
	            error: function(){},
	            success: function (data) {
					page++;
					var list = data.data;
					if(list && list.length === 0){
						$('#pullUp').hide();
						$('#line').height($('#thelist').height()+48);
						$('#listEnd').show();
						canLoad = false;
						return;
					}
					$('#listCon').append(returnHtml(list));
					line();
					myScroll.refresh();
					canLoad = true;
				}
	        });
		}
	}

	/**
	 * 初始化iScroll控件
	 */
	function loaded() {
		pullDownEl = document.getElementById('pullDown');
		pullDownOffset = pullDownEl.offsetHeight;
		pullUpEl = document.getElementById('pullUp');
		pullUpOffset = pullUpEl.offsetHeight;

		myScroll = new iScroll('wrapper', {
			scrollbarClass: 'myScrollbar', 				/* 重要样式 */
			useTransition: false,
			topOffset: pullDownOffset,
			onRefresh: function () {
				if (pullDownEl.className.match('loading')) {
					pullDownEl.className = '';
					pullDownEl.querySelector('.pullDownLabel').innerHTML = '下拉刷新...';
				} else if (pullUpEl.className.match('loading')) {
					pullUpEl.className = '';
					pullUpEl.querySelector('.pullUpLabel').innerHTML = '上拉加载更多...';
				}
			},
			onScrollMove: function () {
				if (this.y > 5 && !pullDownEl.className.match('flip')) {
					pullDownEl.className = 'flip';
					pullDownEl.querySelector('.pullDownLabel').innerHTML = '松手开始更新...';
					this.minScrollY = 0;
				} else if (this.y < 5 && pullDownEl.className.match('flip')) {
					pullDownEl.className = '';
					pullDownEl.querySelector('.pullDownLabel').innerHTML = '下拉刷新...';
					this.minScrollY = -pullDownOffset;
				} else if (this.y < (this.maxScrollY - 5) && !pullUpEl.className.match('flip')) {
					pullUpEl.className = 'flip';
					pullUpEl.querySelector('.pullUpLabel').innerHTML = '松手开始更新...';
					this.maxScrollY = this.maxScrollY;
				} else if (this.y > (this.maxScrollY + 5) && pullUpEl.className.match('flip')) {
					pullUpEl.className = '';
					pullUpEl.querySelector('.pullUpLabel').innerHTML = '上拉加载更多...';
					this.maxScrollY = pullUpOffset;
				}
				if((this.y < this.maxScrollY) && (this.pointY < 1)){
				  	this.scrollTo(0, this.maxScrollY, 400);
				  	return;
				} else if (this.y > 0 && (this.pointY > window.innerHeight - 1)) {
				  	this.scrollTo(0, 0, 400);
				  	return;
				}
			},
			onScrollEnd: function () {
				if (pullDownEl.className.match('flip')) {
					pullDownEl.className = 'loading';
					pullDownEl.querySelector('.pullDownLabel').innerHTML = '刷新中...';
					pullDownAction();	
				} else if (pullUpEl.className.match('flip')) {
					pullUpEl.className = 'loading';
					pullUpEl.querySelector('.pullUpLabel').innerHTML = '加载中...';
					pullUpAction();	
				}
			}
		});

		setTimeout(function () { document.getElementById('wrapper').style.left = '0'; }, 800);
	}

});