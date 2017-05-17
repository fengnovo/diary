

(function () {  
    function show() {  
        $("#trig")[0].click();  
    }  
    var a = {  
        exec: function (editor) {  
        //调用jsp中的函数弹出上传框，  
            // show();  
            $("#sub").trigger('click'); 
            console.log("trigger('click')");
        }  
    },  
    b = 'simpleupload';  
    CKEDITOR.plugins.add(b, {  
        init: function (editor) {  
            editor.addCommand(b, a);  
            editor.ui.addButton('simpleupload', {  
                label: '添加图片',  //鼠标悬停在插件上时显示的名字  
                icon: 'plugins/icons.png',   //自定义图标的路径  
                command: b  
            });  
            setTimeout(function(){
                $('.cke_button__simpleupload_icon').css({"background-position":"0 -960px"});
            },100)
        }  
    });  
})();  