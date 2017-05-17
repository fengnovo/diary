import React from 'react'
import ReactDOM from 'react-dom'
// import './css/wangEditor.css'
import $ from 'jquery'

import './libs/UEditor/ueditor.config.js';
import './libs/UEditor/ueditor.all.js';
import './libs/UEditor/lang/zh-cn/zh-cn.js';

class Editor extends React.Component {
    constructor(...args) {
        super(...args)
    }


    componentDidMount() {
        CKEDITOR.replace('container',
            {
                toolbar:
                [
                    //撤销    恢复    加粗     斜体，     下划线      穿过线     数字列表       实体列表          减小缩进    增大缩进
                    ['Undo', 'Redo', 'Bold', 'Italic', 'Underline', 'Strike', 'NumberedList', 'BulletedList', '-', 'Outdent', 'Indent'],
                    //左对 齐             居中对齐          右对齐       两端对齐     取消超链接 
                    ['JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock', 'Unlink'],
                    //图片        水平线        字体     文本颜色     背景颜色    全屏        
                    ['Image', 'HorizontalRule', 'Font', 'TextColor', 'BGColor', 'Maximize']
                ]
            }
        );
        CKEDITOR.on('dialogDefinition', function (ev) {
            var dd = ev.data.definition; 
            if (ev.data.name == 'image') {
                dd.onShow = function () {
                    var dialog = CKEDITOR.dialog.getCurrent();         // make upload default tab        
                    this.selectPage('Upload');        // hide unwanted tab        
                    dialog.hidePage('Link'); 
                    dialog.hidePage('advanced'); 
                    dialog.hidePage('info'); 
                    var uploadTab = dd.getContents('Upload'); 
                    var uploadButton = uploadTab.get('uploadButton'); 
                    uploadButton['filebrowser']['onSelect'] = function (fileUrl, errorMessage) { 
                        dialog.getContentElement('info', 'txtUrl').setValue(fileUrl); 
                        $(".cke_dialog_ui_button_ok span").click(); 
                    }
                };
            }
        }); 
    }

    render() {
        return <div id="container" name="content"></div>
    }
}


ReactDOM.render(
    <Editor />,
    document.getElementById('app')
);