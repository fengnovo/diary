; (function ($, window, document, undefined) {
    'use strict';
    //定义变量
    var pluginName = 'slideDownRefresh',
        defaults = {};
    //构造函数
    function Plugin(element, options) {
        this.element = element;
        this.options = $.extend({}, defaults, options);
        this.init();    //初始化
        this.render(this.element);
        this.eventHandle();
    }

    Plugin.prototype = {
        init: function () {       //  一般是用来初始化一些参数
            this.defaults = defaults;
            this.name = this.pluginName;
            this._start = 0;
            this._end = 0;

        },
        render: function (ele) {
            $(ele).prepend([
                '<div class="slideDown">',
                '<div class="sliding">',
                '<p>下拉刷新</p>',
                '</div>',
                '<div class="slided">',
                '<p>正在刷新...</p>',
                '</div>',
                '</div>'
            ].join(''));
            this.$sliding = $(ele).find('.sliding');
            this.$slided = $(ele).find('.slided');
        },
        eventHandle: function () {
            this.touchStart(this.element);
        },
        touchStart: function (ele) {
            var _this = this;
            $(ele).on('touchstart', function (e) {
                var touch = e.targetTouches[0];
                _this._start = touch.pageY;
                _this.touchMove(_this.element);
            })
        },
        touchMove: function (ele) {
            var _this = this;
            $(ele).on('touchmove', function (e) {
                var touch = e.targetTouches[0];
                _this._end = _this._start - touch.pageY;
                // console.log('移动的距离：'+_this._end);

                if (_this._end < 0) {
                    _sliding.call(_this, _this._end);
                }
                _this.touchEnd(_this.element);
            });

            //下拉时触发的function
            function _sliding(dist) {
                this.$sliding.css({
                    display: 'block',
                    height: -dist + 'px'
                });
            }
        },
        touchEnd: function (ele) {
            var _this = this;   //this是指插件
            // console.log(_this);
            $(ele).on('touchend', function () {
                if (_this._end < -200) {
                    console.log('下拉了' + _this._end);
                    _slided.call(_this);
                    setTimeout(function(){
                        _reset.call(_this);
                    },1000);
                }else{
                    _noslide.call(_this);
                }
                // console.log($(ele));
                $(this).unbind('touchmove');    //this是指ele
                $(this).unbind('touchend');
            });

            //下拉松开时触发的方法
            function _slided() {
                this.$sliding.css({
                    display: 'none',
                    height: 0
                });
                this.$slided.css('display','block');
            }

            //刷新完成，回到初始状态
            function _reset(){
                window.location.reload();
                this.$sliding.css('display','none');
                this.$slided.css('display','none');
            }

            //下滑距离不够时复原且不刷新
            function _noslide() {
                this.$sliding.css({
                    display: 'none',
                    height: 0
                });
                this.$slided.css('display','none');
            }
        }
    }

    $.fn[pluginName] = function (options) {
        return this.each(function () {    //有可能要初始化多个插件
            if (!$(this).data('plugin-' + pluginName)) {
                $(this).data('plugin-' + pluginName, new Plugin(this, options)); //this代表$('.container')
            }
        })
    }



})(Zepto, window, document);

$('.container').slideDownRefresh();     //$.fn[pluginName] = function(options)