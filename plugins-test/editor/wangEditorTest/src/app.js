import React from 'react'
import ReactDOM from 'react-dom'
// import './css/wangEditor.css'
// import $ from 'jquery'

import wangEditor from './wangEditor'

class Editor extends React.Component {
    constructor(...args) {
        super(...args)
        this.getContent = this.getContent.bind(this)
        this.upfile = this.upfile.bind(this)
    }

    getContent () {
        let content = this.editor.$txt.html();
        console.log(content);
    }

    upfile () {
        let _this = this;
        $(this.refs.fileUpload).unbind().bind('change', function() { 
            let file = this.files[0];
            
            if (!file || file.type.indexOf('image') < 0) {
                _this.refs.Toast.show('请选择图片格式的文件');
                return;
            };

            if (file.size > 1000000) {
                _this.refs.Toast.show('图片大小超过1M');
                return;
            }
            var reader = new FileReader();
            reader.onload = function(e){
                var img = document.createElement('img');
                img.title = file.name;
                img.src = e.target.result;
                img.onload = function() {
                    console.log('selectCategory-----upfile-------'+selectCategory);
                    let uploadImgFunc = () => {
                        var formdata = new FormData();  
                        formdata.append("file", file); 
                        $.ajax({ 
                            url : `${globalConfig.baseUrl}/api/upload`, 
                            type : 'post', 
                            data : formdata, 
                            cache : false, 
                            contentType : false, 
                            processData : false, 
                            dataType : "json", 
                            success : function(json) { 
                                
                                if(json.errCode == '0'){
                                    console.log(json.data.url);
                                    console.log(json);
                                    $(_this.refs.adImgInput).attr('src',json.data.url);
                                    _this.setState({
                                        picUrl: json.data.url
                                    })
                                }
                            } 
                        });  
                    }
                    if (selectCategory==3) {        //3是四方格广告
                        if(this.width != 144 || this.height != 84){
                            _this.refs.Toast.show('图片尺寸不符合144*84规格');
                        }else{
                            uploadImgFunc();
                        }
                    }else{
                        if(this.width != 750 || this.height != 260){
                            _this.refs.Toast.show('图片尺寸不符合750*260规格');
                        }else{
                            uploadImgFunc();
                        }
                    }
                }
            };
            reader.readAsDataURL(file);

            this.value = '';    // 清除本次选定的文件，否则下次选择同样文件时，不触发onchange事件
            
            return false; 
        });
    }

    componentDidMount () {
        
        // 创建编辑器
        var editor = new wangEditor('editor-trigger');
        editor.config.uploadImgUrl = '/upload';
        editor.config.uploadParams = {
        };
        editor.config.uploadHeaders = {
            // 'Accept' : 'text/x-json'
        }
        editor.create();
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
    <Editor id="editor1" content="<p>在react中使用wangEditor</p>"/>,
    document.getElementById('app')
);