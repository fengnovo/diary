import React from 'react';
import { ButtonToolbar, Button, DropdownButton, MenuItem, Form, FormGroup, Col, ControlLabel, FormControl } from 'react-bootstrap';
import Immutable from 'immutable';
import Simditor from 'simditor';
import $ from 'jquery';
import globalConfig from '../../globalConfig.json';
import util from '../util';

import MaskModal from './maskModal';

class NewInfo extends React.Component {
    constructor(props){
        super(props);
        
        this.editor = null;
        this.state = {
            opts: props.opts
        };

        let detailData = props.detailData;

        if (detailData && !$.isEmptyObject(detailData)) {   // 点‘编辑’进来，栏目下拉框的默认值
            let dropdownTitle = detailData.columnsInfo[0].title,
                dropdownKey = detailData.columnsInfo[0].id;

            Object.assign(this.state, {detailData, dropdownTitle, dropdownKey});
        }

        this._bind.apply(this, ['getDetailData', 'getColumns', 'showToast', 'getInfoForm', 'blackListFilter', 
            'saveToBack', 'save', 'cancel', 'onColumnSelect', 'showModal', 'closeModal', 'renderModal']);
    }

    _bind (...methods) {
        methods.forEach( (method)=> this[method] = this[method].bind(this));
    }

    componentDidMount() {
        const $textarea = $(this.refs.textarea);
        this.editor = new Simditor(Object.assign({}, {
            textarea: $textarea,
            toolbar: [
                // 'code', 'image', 'outdent'
                'title', 'bold', 'italic', 'underline', 'strikethrough', 'fontScale', 'color', 'ol', 'ul', 'blockquote', 'table', 'link', 'hr', 'indent', 'alignment'
            ],
        }, this.state.opts));

        this.editor.setValue($textarea.val());
        this.getColumns();

        let {infoId, detailData} = this.props;

        if (infoId && !detailData) {
            this.getDetailData(infoId);
        } 
    }

    componentWillUnmount() {
        this.editor.destroy();
        this.editor = null;
    }

    componentWillReceiveProps (nextProps) { // 在编辑时又点了‘新建’，清空输入框，重置默认栏目
        if (nextProps.infoId) {
            this.getDetailData(nextProps.infoId);
        }
        else {
            let $form = $(this.refs.newInfo);

            $form.find('#title').val('');
            $form.find('#subtitle').val('');
            $form.find('#media').val('');
            $form.find('#authorName').val('');
            $form.find('#certiCode').val('');

            this.editor.setValue('');

            let col0 = this.state.column[0], {title, id} = col0;
            this.setState({dropdownTitle: title, dropdownKey: id});
        }        
    }

    getColumns () {
        var url = `${globalConfig.baseUrl}/api/columns`;

        $.getJSON(url, {page: 1, pageSize: 100}, (json, textStatus) => {
            if (0 != json.errCode) {
                return;
            }

            let data = json.data, len = data.length, i = 0, column = [], item, {dropdownTitle, dropdownKey} = this.state;

            for (; i < len; i++) {
                item = data[i];
                (item.title != '直播' && item.title != '投教基地') && column.push({id: item.id, title: item.title});  // 产品说着两个栏目的内容不能自产，新建时要去掉
            }

            // 栏目列表取回后，生成下拉框，并设置默认值（编辑用草稿自己的，新建用第一个）
            dropdownTitle = dropdownTitle || column[0].title;
            dropdownKey = dropdownKey || column[0].id;
            this.setState({column, dropdownTitle, dropdownKey});
        });
    }

    getDetailData(infoId) {
        let url = `${globalConfig.baseUrl}/api/article/${infoId}`;

        $.getJSON(url, (json, textStatus) => {
            if (0 != json.errCode) {
                return;
            }

            let detailData = json.data,
                dropdownTitle = detailData.columnsInfo[0].title,
                dropdownKey = detailData.columnsInfo[0].id;

            this.setState({detailData, dropdownTitle, dropdownKey}, () => { //input defaultValue 和value处理起来很麻烦，用jquery处理了
                let $form = $(this.refs.newInfo);
                let author = (detailData.authors && detailData.authors[0]) || {};

                $form.find('#title').val(detailData.title);
                $form.find('#subtitle').val(detailData.subtitle);
                $form.find('#media').val(detailData.media);
                $form.find('#authorName').val(author.name);
                $form.find('#certiCode').val(author.certiCode);

                this.editor.setValue(detailData.content);
            });
        });
    }

    showToast (toastText, showAlways = false) {
        /*if (this.state.showToast) {
            return;
        }*/

        this.setState({showToast: true, toastText: toastText});

        !showAlways && setTimeout(() => {
            this.setState({showToast: false});
        }, 2000);
    }

    getInfoForm () {
        let title, subtitle, media, columns = [], name, certiCode, authors = [], content;
        let $form = $(this.refs.newInfo);

        title = $form.find('#title').val();
        if (!title) {
            this.showToast('标题是必填项哦~');
            return false;
        }

        subtitle = $form.find('#subtitle').val();
        media = $form.find('#media').val() || '广发证券';
        name = $form.find('#authorName').val();
        if (!name) {
            this.showToast('作者是必填项哦~'); 
            return false;
        }

        certiCode = $form.find('#certiCode').val();

        columns.push(this.state.dropdownKey);
        authors.push({name, certiCode});

        content = this.editor.getValue();
        if (!content) {
            this.showToast('正文是必填项哦~');
            return false;
        }   

        var infoForm = {
            title, subtitle, media, columns, authors, content
        };

        return infoForm;
    }

    blackListFilter (infoForm) {
        // http://10.2.130.200:/blacklist/v2?appId=finInfo&currentUser=maqinghua&userType=3&mode=2
        var defer = $.Deferred(),
            filterData = (data) => {
                let url =  '/blacklist/v2?appId=finInfo&currentUser=maqinghua&userType=3&mode=2';
                return $.ajax({
                    url: url,
                    type: 'POST',
                    dataType: 'json',
                    contentType: 'application/json',
                    data: JSON.stringify(data)
                });
            };

        $.when(filterData(infoForm.title), filterData(infoForm.subtitle), filterData(infoForm.content))
        .done((tbl, sbl, cbl) => {
            let tl = tbl[0], sl = sbl[0], cl = cbl[0], html = '';
            if (tl.length || sl.length || cl.length) {
                tl.length && (html += '<p class="line">标题含有如下敏感词：' + tl + '</p>');
                sl.length && (html += '<p class="line">副标题含有如下敏感词：' + sl + '</p>');
                cl.length && (html += '<p class="line">正文含有如下敏感词：' + cl + '</p>');
                
                this.setState({showToast: false, showModal: true, modalName: 'black', modalBody: html}, () => {
                    this.refs.MaskModal && this.refs.MaskModal.open();
                });

                defer.reject('黑匣子验证驳回');
            }
            else {
                defer.resolve('黑匣子验证通过');
            }
        })
        .fail(() => {
            let html = '<p class="line">黑匣子验证出错，请重新提交</p>';
            this.setState({showToast: false, showModal: true, modalName: 'black', modalBody: html}, () => {
                this.refs.MaskModal && this.refs.MaskModal.open();
            });
            defer.reject('黑匣子验证驳回');
        });

        return defer;
    }

    saveToBack (infoForm) {
        let infoId = this.props.infoId, ajaxParam = {dataType: 'json', contentType: 'application/json', data: JSON.stringify(infoForm)};

        if (infoId) {    // 点编辑进来，走修改接口
            Object.assign(ajaxParam, {url: `${globalConfig.baseUrl}/api/article/${infoId}`, type: 'PUT'});
        }   
        else {  // 点新建进来，走新建接口
            Object.assign(ajaxParam, {url: `${globalConfig.baseUrl}/api/article`, type: 'POST'});
        }

        $.ajax(ajaxParam)
        .done((data) => {
            if (0 !== data.errCode) {
                this.showToast('保存失败，错误信息：' + data.errMsg);
            }
            else {
                this.showToast('保存成功，页面将在2秒后自动跳转');
                setTimeout(() => {
                    window.location.href = '#/infoManage';
                }, 2000);
            }
        })
        .fail(() => {
            this.showToast('保存失败，请重新提交');
        }); 
    }

    save (nextStatus=1) { // 1保存草稿，10保存并提交审核
        if (this.state.showToast) return;   // 避免重复保存

        let infoForm = this.getInfoForm();

        if (!infoForm) {
            return;
        }
        
        let toastText = (1 == nextStatus ? '正在保存草稿，请稍候...' : '正在提交审核，请稍候...');

        this.showToast(toastText, true);

        infoForm.status = nextStatus; // 审核中
        if (1 == nextStatus) {
            this.saveToBack(infoForm);
        }
        else {
            this.blackListFilter(infoForm)
            .done((arg) => {
                console.log(arg);
                this.saveToBack(infoForm);
            });
        }  
    }

    cancel () {
        let {path, back} = this.props;

        if (path.indexOf('infoDetail') >= 0) {
            back ? back() : window.location.href = '#/infoManage';
        }   
        else {  // 点新建进来
            window.location.href = '#/draftManage';
            // window.close();
        }
    }

    onColumnSelect (key, evt) {
        var select = this.state.column[key],
            dropdownKey = select.id,
            dropdownTitle = select.title;

        this.setState({dropdownKey, dropdownTitle});
    }

    showModal () {
        this.setState({
            showModal: true,
            modalName: 'cancel'
        }, () => {
            this.refs.MaskModal && this.refs.MaskModal.open();
        });
    }

    closeModal () {
        this.refs.MaskModal && this.refs.MaskModal.close();
    }

    renderModal (modalName) {
        if (!this.state.showModal || !modalName) {
            return null;
        }

        let modalInfo, modalBody;

        if ('black' == modalName) {
            modalInfo = {
                className: 'black-list-modal',
                title: '黑匣子驳回原因',
                btns: [
                    {name: '确定', click: this.closeModal}
                ]
            };

            modalBody = <div className='' dangerouslySetInnerHTML={{__html: this.state.modalBody}}></div>;
        }
        else {
            modalInfo = {
                className: 'info-delete-modal',
                title: '确定不保存并退出当前编辑吗？',
                btns: [
                    {name: '取消', click: this.closeModal},
                    {name: '确定', bsStyle: 'primary', click: this.cancel}
                ]
            };
        }
        
        return (
            <MaskModal ref='MaskModal' showModal={true} modalInfo={modalInfo}>
                {modalBody}
            </MaskModal>
        );
    }

    render() {
        var {detailData={}, column=[], dropdownTitle='要闻'} = this.state,
            author = (detailData.authors && detailData.authors[0]) || {};
        var dropdown = (
            <DropdownButton bsStyle='default' id='dropdown' onSelect={this.onColumnSelect} title={dropdownTitle}>
                {column.map((item, i) => (<MenuItem key={item.id} eventKey={i}>{item.title}</MenuItem>))}
            </DropdownButton>
        );

        var btnGroup=[], oaUser = util.getOaUser(), rights = oaUser ? oaUser.operations.split('+') : []; //1查看2编辑3初审4复审5上线

        if (rights.indexOf('2') >=0) {
            btnGroup = [
                <Button bsStyle="success" key='check' onClick={this.save.bind(this, 10)}>保存并提交审核</Button>,
                <Button bsStyle="success" key='save' onClick={this.save.bind(this, 1)}>保存草稿</Button>
            ];
        }

        btnGroup.push(<Button bsStyle="success" key='cancel' onClick={this.showModal}>取消</Button>);

        return (
            <div className="new-info" ref="newInfo">
                <Form horizontal name='newInfoForm' className="form">
                    <FormGroup controlId="title">
                        <Col componentClass={ControlLabel} sm={1}>
                            标题<strong>*</strong>
                        </Col>
                        <Col sm={11}>
                            <FormControl type="text" placeholder="请输入标题" defaultValue={detailData.title} />
                        </Col>
                    </FormGroup>
                    <FormGroup controlId="subtitle">
                        <Col componentClass={ControlLabel} sm={1}>
                            副标题                        
                        </Col>
                        <Col sm={11}>
                            <FormControl type="text" placeholder="请输入副标题" defaultValue={detailData.subtitle}/>
                        </Col>
                    </FormGroup>
                    <FormGroup controlId="media">
                        <Col componentClass={ControlLabel} sm={1}>
                            来源
                        </Col>
                        <Col sm={11}>
                            <FormControl type="text" placeholder="来源" defaultValue={detailData.media}/>
                        </Col>
                    </FormGroup>
                    <FormGroup controlId="column">
                        <Col componentClass={ControlLabel} sm={1}>
                            栏目
                        </Col>
                        <Col sm={11}>
                            {dropdown}
                        </Col>
                    </FormGroup>
                    <FormGroup controlId="authorName">
                        <Col componentClass={ControlLabel} sm={1}>
                            作者<strong>*</strong>
                        </Col>
                        <Col sm={11}>
                            <FormControl type="text" placeholder="作者" defaultValue={author.name} />
                        </Col>
                    </FormGroup>
                    <FormGroup controlId="certiCode">
                        <Col componentClass={ControlLabel} sm={1}>
                            执业编号
                        </Col>
                        <Col sm={11}>
                            <FormControl type="text" placeholder="执业编号" defaultValue={author.certiCode}/>
                        </Col>
                    </FormGroup> 
                    <FormGroup>
                        <Col componentClass={ControlLabel} sm={1}>
                            正文<strong>*</strong>
                        </Col>
                        <Col sm={11}>
                            <textarea ref="textarea" defaultValue={detailData.content}></textarea>                        
                        </Col>
                    </FormGroup>
                    {this.state.showToast ?
                    <div className='toast-like'>
                        <Button>{this.state.toastText}</Button>
                    </div> : null}
                </Form>
                <Form componentClass="fieldset" inline className="form-ops">
                    {btnGroup}
                </Form>
                {this.renderModal(this.state.modalName)}
            </div>
        );
    }
};


export default NewInfo;
