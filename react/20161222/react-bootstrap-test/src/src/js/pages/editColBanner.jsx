import React from 'react';
import { Button, Form, FormGroup, Col, ControlLabel, FormControl, Image} from 'react-bootstrap';
import $ from 'jquery';
import Immutable from 'immutable';
import globalConfig from '../../globalConfig.json';
import util from '../util';

import Header from '../components/header';
import Navigate from '../components/navigate';
import Footer from '../components/footer';
import InfoSearch from '../components/infoSearch';
import MaskModal from '../components/maskModal';
import Toast from '../components/Toast';


class EditColBanner extends React.Component {
    constructor(props){
        super(props);
        
        let oaUser = util.getOaUser();

        if (!oaUser || oaUser.role != 100) {
            window.location.href = '/';
        }
    
        this.state = {

        };

        this._bind.apply(this, ['addBanner', 'delBanner', 'save', 'cancel']);
    }

    _bind (...methods) {
        methods.forEach( (method)=> this[method] = this[method].bind(this));
    }

    componentDidMount() {
        let _this = this, url = `${globalConfig.baseUrl}/api/column/${this.props.routeParams.colId}`;

        $.getJSON(url, function(json, textStatus) {
            _this.banners = json.data && json.data.banners;
            _this.setState({detail: json.data});
        });
    }

    componentWillUnmount() {
        
    }

    addBanner (banner, idx) {
        let len = this.banners.length;

        banner.type = 0;
        // idx = Math.min(idx, this.bannners.length);
        this.banners[idx] = banner;

        if (len != this.banners.length) {   // 只有新建完成刷新，修改的不刷新
            this.forceUpdate();
        }
    } 

    delBanner (idx) {
        this.banners.splice(idx, 1);
        this.forceUpdate();
    }

    save () {
        let _this = this, url = `${globalConfig.baseUrl}/api/column/${this.props.routeParams.colId}`, ajaxData = {banners: this.banners};
        let ajaxParam = {url, type: 'PUT', dataType: 'json', contentType: 'application/json', data: JSON.stringify(ajaxData)};

        $.ajax(ajaxParam)
        .done(function(data) {
            alert('保存成功，请按确定关闭本页面');
            window.close();
        })
        .fail(function() {
            console.log("error");
        });

    }

    cancel () {
        window.close();
    }

    render() {
        let colDetail = this.state.detail, bannerItems = [], i = 0, len = 0, opBtns = [];

        if (!colDetail) {
            colDetail = {};
        }
        else {
            for (i = 0, len = this.banners.length; i < len; i++) {
                bannerItems.push(<BannerItem key={i} banner={this.banners[i]} idx={i} addBanner={this.addBanner} delBanner={this.delBanner} />);
            }
        }
        (len < 3) && bannerItems.push(<BannerItem key={'add'} idx={len} banner={null} addBanner={this.addBanner} delBanner={this.delBanner} />);    // 小于三个时，多出一个编辑的空项目

        if (0 == len) {
            opBtns = [
                <Button bsStyle="success" key='save' disabled >保存</Button>,
                <Button bsStyle="success" key='cancel' onClick={this.cancel} >取消</Button>
            ];
        }
        else {
            opBtns = [
                <Button bsStyle="success" key='save' onClick={this.save} >保存</Button>,
                <Button bsStyle="success" key='cancel' onClick={this.cancel} >取消</Button>
            ];
        }

        return (
            <div className="edit-banner-page page-wrap" ref="editBanner">
                <Header colName='colsManage'/>
                <div className='edit-banner-body page-body'> 
                    <div className='body-left'>
                        <Navigate colName='colsManage' />
                    </div>
                    <div className='body-right'>
                        <section className='items-wrap'>
                            <h3 className='column-title'>{colDetail.title}</h3>
                            {bannerItems}
                            <Form componentClass="fieldset" inline className="edit-ops">
                                {opBtns}
                            </Form>
                        </section>
                        <Footer />
                    </div>
                </div>
            </div>
        ); 
    }
};

export default EditColBanner;

class BannerItem extends React.Component {
    constructor(props){
        super(props);
    
        this.state = {
            
        };

        this.banner = props.banner ? {
            picUrl: props.banner.picUrl,
            title: props.banner.title,
            articleId: props.banner.articleId,
            linkUrl: props.banner.linkUrl
        } : {};

        this._bind.apply(this, ['fieldEditDone', 'openFile', 'openSearchModal', 'closeSearchModal', 'onInfoSelectDone']);
    }

    _bind (...methods) {
        methods.forEach( (method)=> this[method] = this[method].bind(this));
    }

    componentDidMount() {
        let _this = this;

        $(this.refs.fileUpload).change( function() { 
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
                // document.body.appendChild(img); //这里你想插哪插哪
                img.onload = function() {
                    if (this.width != 750 || this.height != 320) {
                        _this.refs.Toast.show('图片尺寸不符合750*320规格');
                    }
                    else {
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
                                // console.log(json);
                                var picUrl = json.data.url;

                                _this.fieldEditDone({picUrl});
                            } 
                        });        
                    }
                }
            };
            reader.readAsDataURL(file);

            this.value = '';    // 清除本次选定的文件，否则下次选择同样文件时，不触发onchange事件
            
            return false; 
        });

        $(this.refs.bannerItem).find('#title').blur(function () {
            var title = this.value.trim();

            _this.fieldEditDone({title});
        });

        $(this.refs.bannerItem).find('#link').blur(function () {
            var linkUrl = this.value.trim();

            _this.fieldEditDone({linkUrl});
        });
    }

    componentWillUnmount() {
        
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (!nextProps.banner || !this.props.banner) {
            return true;
        }

        let {picUrl, title, articleId} = nextProps.banner, {banner} = this.props;

        if (picUrl != banner.picUrl || title != banner.title || articleId != banner.articleId) {
            this.banner = nextProps.banner;
            $(this.refs.bannerItem).find('#title').val(this.banner.title);
            return true;
        }

        return false;
    }

    fieldEditDone (state) {
        let obj = Object.assign(this.banner, state);    // assign，会改变第一个参数，即this.banner === obj
        let {picUrl, title, articleId, linkUrl} = obj;

        if (picUrl && title && (articleId||linkUrl)) {   // 三项都有值
            let {idx, banner, addBanner} = this.props;

            addBanner(obj, idx);
            // 新建的banner，因为可能还有新建，要清空展示的数据。已有的banner，只要更改显示就行, forceUpdate。
            if (!banner && idx < 2) {
                this.banner = {};
                this.forceUpdate();
                $(this.refs.bannerItem).find('#title,#link').val('');

            }
        }
        else {
            state.picUrl && this.forceUpdate(); // 若本次是编辑标题，可以不刷新，因为标题是输入框
        }
    }

    openFile () {
        $(this.refs.fileUpload).trigger('click');
    }

    openSearchModal () {
        this.refs.MaskModal.open();
    }

    closeSearchModal () {
        this.refs.MaskModal.close();
    }

    onInfoSelectDone (articleId, article) {
        var linkUrl = `http:\/\/10.2.122.58/test/${articleId}`;
        var title = article.title;
        
        article.bigPicUrl && (this.banner.picUrl = article.bigPicUrl);
        title && (this.banner.title = title);
        $(this.refs.bannerItem).find('#title').val(title);

        this.fieldEditDone({articleId, linkUrl});
    }

    render() {
        var {picUrl, title, articleId, linkUrl} = this.banner;
        var {delBanner, idx} = this.props;
        var modalInfo = {
            className: 'info-search-modal',
            title: '搜索资讯'
        };
        return (
            <section className='banner-item' ref='bannerItem'>
                {(picUrl && (articleId||linkUrl) && title) ? <Button className='banner-deler' bsStyle="link" onClick={delBanner.bind(this, idx)}></Button> : null}
                <Form horizontal className="banner-form">
                    <FormGroup >
                        <Col componentClass={ControlLabel} sm={1}>
                            图片<strong>*</strong>
                        </Col>
                        <Col sm={2}>
                            <Button bsStyle="info" onClick={this.openFile}>选择图片</Button>
                            <input type='file' id='fileUpload' ref='fileUpload' style={{"display": "none"}}/>
                        </Col>
                        <Col sm={9}>
                            <p className='img-hint'>支持jpg/png格式，RGB模式，单张尺寸（750*320），最多上传3张，大小不超过1M</p>
                        </Col>
                    </FormGroup>
                    <FormGroup >
                        <Col smOffset={1} sm={11}>
                            {picUrl && <Image src={picUrl} rounded />}
                        </Col>
                    </FormGroup>
                    <FormGroup controlId="title">
                        <Col componentClass={ControlLabel} sm={1}>
                            标题<strong>*</strong>
                        </Col>
                        <Col sm={11}>
                            <FormControl type="text" placeholder="请输入标题" defaultValue={title}/>
                        </Col>
                    </FormGroup>
                    <FormGroup controlId="link">
                        <Col componentClass={ControlLabel} sm={1}>
                            链接<strong>*</strong>                      
                        </Col>
                        <Col sm={9}>
                            <FormControl type="text" placeholder="如选择搜索资讯，链接将自动生成；如需配置外链，请直接输入" defaultValue={linkUrl} />
                        </Col>
                        <Col sm={2}>
                            <Button bsStyle="info" onClick={this.openSearchModal}>搜索相关资讯</Button>
                        </Col>
                    </FormGroup>
                    <MaskModal ref='MaskModal' modalInfo={modalInfo}>
                        <InfoSearch closeSearchModal={this.closeSearchModal} onInfoSelectDone={this.onInfoSelectDone}/>
                    </MaskModal>
                </Form>
                <Toast ref='Toast' />
            </section>
        ); 
    }
};
