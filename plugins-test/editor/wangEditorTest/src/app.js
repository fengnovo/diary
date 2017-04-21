import React from 'react'
import ReactDOM from 'react-dom'
import plupload from 'plupload' 
// import './css/wangEditor.css'
import $ from 'jquery'

import wangEditor from './wangEditor'

class Editor extends React.Component {
    constructor(...args) {
        super(...args)
        this.uploadInit = this.uploadInit.bind(this)
        this.getContent = this.getContent.bind(this)
    }

    // 获取内容
    getContent () {
        var content = this.editor.$txt.html();
        console.log(content);
    }

    // ------- 配置上传的初始化事件 -------
    uploadInit (editor) {
        console.log('uploadInit');
        // this 即 editor 对象
        // var editor = editor;
        // 编辑器中，触发选择图片的按钮的id
        var btnId = editor.customUploadBtnId;
        // 编辑器中，触发选择图片的按钮的父元素的id
        var containerId = editor.customUploadContainerId;

        //实例化一个上传对象
        var uploader = new plupload.Uploader({
            browse_button: btnId,  // 选择文件的按钮的id
            url: '/api/upload',  // 服务器端的上传地址
            flash_swf_url: 'lib/plupload/plupload/Moxie.swf',
            sliverlight_xap_url: 'lib/plupload/plupload/Moxie.xap',
            filters: {
                mime_types: [
                    //只允许上传图片文件 （注意，extensions中，逗号后面不要加空格）
                    { title: "图片文件", extensions: "jpg,gif,png,bmp" }
                ]
            }
        });

        //存储所有图片的url地址
        var urls = [];

        //初始化
        uploader.init();

        //绑定文件添加到队列的事件
        uploader.bind('FilesAdded', function (uploader, files) {
            //显示添加进来的文件名
            $.each(files, function(key, value){
                console.log('添加文件' + value.name);
            });

            // 文件添加之后，开始执行上传
            uploader.start();
        });

        //单个文件上传之后
        uploader.bind('FileUploaded', function (uploader, file, responseObject) {
            //注意，要从服务器返回图片的url地址，否则上传的图片无法显示在编辑器中
            var url = responseObject.response;
            //先将url地址存储来，待所有图片都上传完了，再统一处理
            urls.push(url);

            console.log('一个图片上传完成，返回的url是' + url);
        });

        //全部文件上传时候
        uploader.bind('UploadComplete', function (uploader, files) {
            console.log('所有图片上传完成');
            console.log(uploader, files);
            // 用 try catch 兼容IE低版本的异常情况
            try {
                //打印出所有图片的url地址
                $.each(urls, function (key, value) {
                    console.log('即将插入图片');
                    var res = JSON.parse(value);
                    console.log(res);
                    console.log(res.data.url);
                    editor.command(null, 'insertHtml', '<img src="' + res.data.url + '" style="max-width:100%;"/>');
                });
            } catch (ex) {
                // 此处可不写代码
            } finally {
                //清空url数组
                urls = [];
                // 隐藏进度条
                editor.hideUploadProgress();
            }
        });

        // 上传进度条
        uploader.bind('UploadProgress', function (uploader, file) {
            // 显示进度条
            editor.showUploadProgress(file.percent);
        });
    }

    componentDidMount () {
        var id = this.props.id;
        // wangEditor.config.printLog = false;
        this.editor = new window.wangEditor(id);
        this.editor.config.menus = [
            // 'source',
            // '|',
            'undo',
            'redo',
            '|',
            'bold',
            'underline',
            'italic',
            'strikethrough',
            'eraser',
            'forecolor',
            'bgcolor',
            '|',
            'quote',
            // 'fontfamily',
            // 'fontsize',
            'unorderlist',
            'orderlist',
            'alignleft',
            'aligncenter',
            'alignright',
            '|',
            'unlink',
            'table',
            '|',
            'img',
            'fullscreen'
        ];
        
        this.editor.config.customUpload = true;  // 配置自定义上传的开关
        // 配置上传事件，uploadInit方法已经在上面定义了
        this.editor.config.customUploadInit = this.uploadInit.bind(this,this.editor);  
        this.editor.config.hideLinkImg = true;
        this.editor.create();

        // 初始化内容
        this.editor.$txt.html(this.props.content);
    }

    render() {
       let style = {
            width: '100%',
            height: '200px'
        };
        return <div>
            <div id={this.props.id} style={style} contentEditable="true"></div>
            <button onClick={this.getContent}>get content</button>
        </div>
    }
}


ReactDOM.render(
    <Editor id="editor1" content=""/>,
    document.getElementById('app')
);