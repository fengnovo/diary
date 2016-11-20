import iScroll from './iscroll.js';
import $ from 'jquery';
	var iscrollInstance = {
		/**
		 * @param wrapper      要渲染滚动实例的位置 (字符串)
		 * @param pullDown 	下拉dom的id	(字符串)
		 * @param pullUp   	上拉dom的id(字符串)
		 * @param pullDownLabel     下拉dom块	(字符串)
		 * @param pullUpLabel       上拉dom块	(字符串)
		 * @param pullDownAction	下拉逻辑方法	(function)
		 * @param pullUpAction		上拉逻辑方法	(function)
		 *  例 fcScroll('wrapper','pullDown','pullUp','.pullDownLabel','.pullUpLabel',pullDownAction,pullUpAction)
		 *	需配合css，符合html结构
		 *
		 *hScroll: true, 左右滑动，默认为true
		 *vScroll: true,上下滑动
		 *hScrollbar: true, 是否显示y轴滚动条，默认为显示
		 *vScrollbar: true,是否显示X轴滚动条，默认为显示
		 * @return iscroll 实例
		 */

		fcScroll : function(wrapper,pullDown,pullUp,pullDownLabel,pullUpLabel,pullDownAction,pullUpAction,param){
			var pullDownEl = document.getElementById(pullDown);
			var pullDownOffset = pullDownEl.offsetHeight;
			var pullUpEl = document.getElementById(pullUp);
			var pullUpOffset = pullUpEl.offsetHeight;
			var data = {
				useTransform: true,
				useTransition: false,
				vScrollbar:false,
				topOffset: pullDownOffset,
				onRefresh: function () {
					if (pullDownEl.className.match('loading')) {
						pullDownEl.className = '';
						pullDownEl.querySelector(pullDownLabel).innerHTML = '下拉刷新...';
					} else if (pullUpEl.className.match('loading')) {
						pullUpEl.className = '';
						pullUpEl.querySelector(pullUpLabel).innerHTML = '上拉加载更多...';
					}
				},
				onScrollMove: function () {
					if (this.y > 5 && !pullDownEl.className.match('flip')) {
						pullDownEl.className = 'flip';
						pullDownEl.querySelector(pullDownLabel).innerHTML = '松开刷新...';
						this.minScrollY = 0;
					} else if (this.y < 5 && pullDownEl.className.match('flip')) {
						pullDownEl.className = '';
						pullDownEl.querySelector(pullDownLabel).innerHTML = '下拉刷新...';
						this.minScrollY = -pullDownOffset;
					} else if (this.y < this.minScrollY && this.y < (this.maxScrollY - 5) && !pullUpEl.className.match('flip')) {
						pullUpEl.className = 'flip';
						pullUpEl.querySelector(pullUpLabel).innerHTML = '松开加载更多...';
						this.maxScrollY = this.maxScrollY;
					} else if (this.y > (this.maxScrollY + 5) && pullUpEl.className.match('flip')) {
						pullUpEl.className = '';
						pullUpEl.querySelector(pullUpLabel).innerHTML = '上拉加载更多...';
						this.maxScrollY = pullUpOffset;
					}
				},
				onScrollEnd: function () {
					if (pullDownEl.className.match('flip')) {
						pullDownEl.className = 'loading';
						pullDownEl.querySelector(pullDownLabel).innerHTML = '刷新中...';
						pullDownAction();
					} else if (pullUpEl.className.match('flip')) {
						pullUpEl.className = 'loading';
						pullUpEl.querySelector(pullUpLabel).innerHTML = '加载中...';
						pullUpAction();
					}
				}
			};
			data = $.extend(data,param);
			var scrollObj =  new iScroll(wrapper,data);
			return scrollObj;
		},


		fcScroll_i : function(wrapper,pullDown,pullUp,pullDownLabel,pullUpLabel,pullDownAction,pullUpAction){
			var pullDownEl = document.getElementById(pullDown);
			var pullDownOffset = pullDownEl.offsetHeight;
			var pullUpEl = document.getElementById(pullUp);
			var pullUpOffset = pullUpEl.offsetHeight;
			var scrollObj =  new iScroll(wrapper,{
				useTransform: true,
				useTransition: false,
				vScrollbar:false,
				topOffset: pullDownOffset,
				onRefresh: function () {
					if (pullDownEl.className.match('loading')) {
						pullDownEl.className = '';
						pullDownEl.querySelector(pullDownLabel).innerHTML = '下拉刷新...';
					} else if (pullUpEl.className.match('loading')) {
						pullUpEl.className = '';
						pullUpEl.querySelector(pullUpLabel).innerHTML = '上拉加载更多...';
					}
				},
				onScrollMove: function () {
					if (this.y > 55 && !pullDownEl.className.match('flip')) {
						pullDownEl.className = 'flip m_t2b';
						pullDownEl.querySelector(pullDownLabel).innerHTML = '松开刷新...';
						this.minScrollY = 0;
					} else if (this.y < 55 && pullDownEl.className.match('flip')) {
						pullDownEl.className = '';
						pullDownEl.querySelector(pullDownLabel).innerHTML = '下拉刷新...';
						this.minScrollY = -pullDownOffset;
					} else if (this.y < this.minScrollY && this.y < (this.maxScrollY - 55) && !pullUpEl.className.match('flip')) {
						pullUpEl.className = 'flip';
						pullUpEl.querySelector(pullUpLabel).innerHTML = '松开加载更多...';
						this.maxScrollY = this.maxScrollY;
					} else if (this.y > (this.maxScrollY + 55) && pullUpEl.className.match('flip')) {
						pullUpEl.className = '';
						pullUpEl.querySelector(pullUpLabel).innerHTML = '上拉加载更多...';
						this.maxScrollY = pullUpOffset;
					}
				},
				onScrollEnd: function () {
					if (pullDownEl.className.match('flip')) {
						pullDownEl.className = 'loading m_t5rm';
						pullDownEl.querySelector(pullDownLabel).innerHTML = '刷新中...';
						pullDownAction();
					} else if (pullUpEl.className.match('flip')) {
						pullUpEl.className = 'loading';
						pullUpEl.querySelector(pullUpLabel).innerHTML = '加载中...';
						pullUpAction();
					}
				}
			});
			return scrollObj;
		},

		selectScroll : function(wrapper){
			var scrollObj =  new iScroll(wrapper,{
				useTransform: true,
				useTransition: false,
				vScrollbar:false,
				onRefresh: null,
				onScrollMove: null,
				onScrollEnd: null
			});
			return scrollObj;
		}
	};

	window.iscrollInstance = iscrollInstance;


//解决IOS滑动顶部之后无法下拉
function solveIOS(cbFun){
	// window.addEventListener("touchmove", function (event) {
	//     if (App.IS_IOS) {
	//         var point = event.changedTouches[0];
	//         //var maxX = window.screen.width;
	//         var hei = $(window).height();
	//         if (point.clientY <= 1 || point.clientY > hei) {
	//             cbFun();
	//         }
	//     }
	// }, true);
}
export default iscrollInstance;
