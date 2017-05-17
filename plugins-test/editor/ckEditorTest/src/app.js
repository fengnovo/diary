import React from 'react'
import ReactDOM from 'react-dom'
import $ from 'jquery'

import plupload from 'plupload'
// import './ckEditor/editor.scss';
// import './ckEditor/scayt.scss';
// import './ckEditor/wsc.scss';

// require('./ckEditor/ckeditor'); 
window.$ = $;

class Editor extends React.Component {
    constructor(...args) {
        super(...args)
        this.uploadInit = this.uploadInit.bind(this)
    }

    // ------- 配置上传的初始化事件 -------
    uploadInit(editor) {
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
            $.each(files, function (key, value) {
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
                    // debugger
                    editor.undoRecord();
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

    componentDidMount() {
        var _this = this;


        $(document).ready(function () {  
            var bodyWidth = document.body.offsetWidth;  //获取body宽度  
                // 弹窗  
                // layer = new PopupLayer({ trigger: "#trig", popupBlk: "#upcontainer", closeBtn: "#close", useOverlay: true, offsets: { x: bodyWidth/2-90, y: 80} });  
            // 监听input的change，一旦选中图片就自动上传  
            // $("#sub").change(function () {  
            //     console.log('实例化一个上传对象');
            //     //实例化一个上传对象
            //     var uploader = new plupload.Uploader({
            //         browse_button: 'sub',  // 选择文件的按钮的id
            //         url: '/api/upload',  // 服务器端的上传地址
            //         flash_swf_url: 'lib/plupload/plupload/Moxie.swf',
            //         sliverlight_xap_url: 'lib/plupload/plupload/Moxie.xap',
            //         filters: {
            //             mime_types: [
            //                 //只允许上传图片文件 （注意，extensions中，逗号后面不要加空格）
            //                 { title: "图片文件", extensions: "jpg,gif,png,bmp" }
            //             ]
            //         }
            //     });

            //     //存储所有图片的url地址
            //     var urls = [];

            //     //初始化
            //     uploader.init();

            //     //绑定文件添加到队列的事件
            //     uploader.bind('FilesAdded', function (uploader, files) {
            //         debugger
            //         //显示添加进来的文件名
            //         $.each(files, function (key, value) {
            //             console.log('添加文件' + value.name);
            //         });

            //         // 文件添加之后，开始执行上传
            //         uploader.start();
            //     });

            //     //单个文件上传之后
            //     uploader.bind('FileUploaded', function (uploader, file, responseObject) {
            //         debugger
            //         //注意，要从服务器返回图片的url地址，否则上传的图片无法显示在编辑器中
            //         var url = responseObject.response;
            //         //先将url地址存储来，待所有图片都上传完了，再统一处理
            //         urls.push(url);

            //         console.log('一个图片上传完成，返回的url是' + url);
            //     });

            //     //全部文件上传时候
            //     uploader.bind('UploadComplete', function (uploader, files) {
            //         debugger
            //         console.log('所有图片上传完成');
            //         var url = JSON.parse(urls[0]);
            //         console.log(url);
                    
            //         console.log(uploader, files);
            //         // 用 try catch 兼容IE低版本的异常情况
            //         try {
            //             //打印出所有图片的url地址
            //             $.each(urls, function (key, value) {
            //                 console.log('即将插入图片');
            //                 var res = JSON.parse(value);
            //                 console.log(res);
            //                 console.log(res.data.url);
            //                 if (url && url.data && url.data.url) {  
            //                     CKEDITOR.instances.container.insertHtml('<img src="' + res.data.url + '" style="max-width:100%;"/>');  
            //                 } else {  
            //                     return;  
            //                 } 
            //             });
            //         } catch (ex) {
            //             // 此处可不写代码
            //         } finally {
            //             //清空url数组
            //             urls = [];
            //             // 隐藏进度条
            //             // editor.hideUploadProgress();
            //         } 
            //     });

            //     // 上传进度条
            //     uploader.bind('UploadProgress', function (uploader, file) {
            //         console.log('0');
            //     });
            // })  


             $("#sub").change( function() { 
                    let file = this.files[0];

                    if (!file || file.type.indexOf('image') < 0) {
                        return;
                    };

                    if (file.size > 1000000) {
                        return;
                    }
                
                    var reader = new FileReader();

                    reader.onload = function(e){
                        var img = document.createElement('img');

                        img.title = file.name;
                        img.src = e.target.result;
                        // document.body.appendChild(img); //这里你想插哪插哪
                        img.onload = function() {
                                var formdata = new FormData();  

                                formdata.append("file", file); 
                                $.ajax({ 
                                    url : `/api/upload`, 
                                    type : 'post', 
                                    data : formdata, 
                                    cache : false, 
                                    contentType : false, 
                                    processData : false, 
                                    dataType : "json", 
                                    success : function(json) { 
                                        console.log(json);
                                        if (json.data && json.data.url) { 
                                            var element = CKEDITOR.dom.element.createFromHtml( '<img src="' + json.data.url + '" style="max-width:100%;"/>' );
                                            CKEDITOR.instances.container.insertElement( element ); 
                                            // CKEDITOR.instances.container.insertHtml('<img src="' + json.data.url + '" style="max-width:100%;"/>');  
                                        } else {  
                                            return;  
                                        } 
                                    } 
                                });        
                        }
                    };
                    reader.readAsDataURL(file);

                    this.value = '';    // 清除本次选定的文件，否则下次选择同样文件时，不触发onchange事件
                    
                    return false; 
                });
            
        }); 


        // var pathName = window.document.location.pathname;
        //获取带"/"的项目名，如：/uimcardprj
        // var projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);
        // config.filebrowserImageUploadUrl = projectName+'/control/news/uploadImage.action'; 
        CKEDITOR.replace('container',
            {
                toolbar:
                [
                    //撤销    恢复    加粗     斜体，     下划线      穿过线     数字列表       实体列表          减小缩进    增大缩进
                    ['Undo', 'Redo', 'Bold', 'Italic', 'Underline', 'Strike', 'NumberedList', 'BulletedList', '-', 'Outdent', 'Indent'],
                    //左对 齐             居中对齐          右对齐       两端对齐     取消超链接 
                    ['JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock', 'Unlink'],
                    //图片        水平线        字体     文本颜色     背景颜色    全屏        
                    // ['Image','HorizontalRule', 'Font', 'TextColor', 'BGColor', 'Maximize','simpleupload']
                    ['HorizontalRule', 'Font', 'TextColor', 'BGColor', 'Maximize','simpleupload']
                    // ['Undo', 'Redo', 'Bold']
                ],
                // filebrowserUploadUrl: '/api/upload',
                extraPlugins: 'simpleupload' 
                // pasteFromWordRemoveStyles: true,
                // filebrowserImageUploadUrl: projectName + '/api/upload'

            },
        );

        
        // CKEDITOR.on('dialogDefinition', function (ev) {
        //     var dd = ev.data.definition;
        //     if (ev.data.name == 'image') {
        //         dd.onShow = function () {
        //             var dialog = CKEDITOR.dialog.getCurrent();         // make upload default tab        
        //             this.selectPage('Upload');        // hide unwanted tab        
        //             dialog.hidePage('Link');
        //             dialog.hidePage('advanced');
        //             dialog.hidePage('info');
        //             var uploadTab = dd.getContents('Upload');
        //             var uploadButton = uploadTab.get('uploadButton');
        //             uploadButton['filebrowser']['onSelect'] = function (fileUrl, errorMessage) {
        //                 debugger
        //                 console.log(fileUrl);
        //                 console.log(errorMessage); 
        //                 dialog.getContentElement('info', 'txtUrl').setValue('http://baidu.com');
        //                 $(".cke_dialog_ui_button_ok span").val('http://baidu.com');
        //                 // $(".cke_dialog_ui_button_ok span").click();
        //                 // _this.uploadInit();
        //             }
        //         };
        //     }
        // })

        CKEDITOR.instances.container.insertHtml('<img src= style="max-width:100%;"/>');  

    }

    render() {
        return <div>
            <textarea id="container" name="container" cols="40" rows="2" className="ckeditor"></textarea>
            <input type="file" id="sub" className="dsn" name="file" /> 
        </div>
    }
}


ReactDOM.render(
    <Editor />,
    document.getElementById('app')
);