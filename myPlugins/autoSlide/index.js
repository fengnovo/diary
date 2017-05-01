; (function (window, document, undefined) {
    function AutoSlide(){};
    AutoSlide.prototype.init = function (param) {
        var element = param.slideWrap.children[0];
        var slides,slidePos,slideFocus = param.focusBox;
        var index = 0;
        var speed;
        var currWidth = document.documentElement.clientWidth;

        function init(){
            slides = element.children;   //  li
            if(slides.length<4){
                element.appendChild(slides[0].cloneNode(true));
            }
            var focusHtml = '';
            for(var i=0;i<slides.length;i++){
                focusHtml += '<span></span>'
            }
            slideFocus.innerHtml = focusHtml;
            slideFocus.children[index].className = 'on';

            element.style.width = slides.length * currWidth + 'px';
            slidePos = new Array(slides.length);
            ``

        }





    }










})(window, document);

autoSlide.init({
    "slideLi":document.getElementById('slide-li'),
    "slideWrap":document.getElementById('ul'),
    "focusBox":document.getElementById('fucus-slide'),
    "slideLi":document.getElementById('slide-li')
})
