import React from 'react';
import $ from 'jquery';
import { Form, Col, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import Immutable from 'immutable';
import globalConfig from '../../globalConfig.json';
import util from '../util';

import MaskModal from '../components/maskModal';

class Header extends React.Component {
    constructor(props){
        super(props);
    
        this.state = {
            
        };

        this._bind.apply(this, ['login', 'logout', 'preLogout', 'newInfo', 'href', 'showModal', 'closeModal', 'renderModal']);
    }

    _bind (...methods) {
        methods.forEach( (method)=> this[method] = this[method].bind(this));
    }

    componentDidMount() {
        let oaUser = util.getOaUser();

        oaUser ? this.setState({oaUser}) : this.showModal('login');
    }

    componentWillUnmount() {
        
    }

    showModal (modalName, clickFun) {
        this.setState({showModal: true, modalName, clickFun}, ()=> {
            this.refs.MaskModal && this.refs.MaskModal.open();
        });
        
        let _this = this;
        if(modalName=='login'){
            // $("#oaname").focus();
            document.onkeydown = function keydown(e){
                var e = e||event;
                var currKey = e.keyCode||e.which||e.charCode;
                if (currKey == 13){
                    console.log('触发了回车键');
                    _this.login();
                }
            }
        }
    }



    newInfo () {
        // if ($("#certiCode").length) { // 判断当前是否是在编辑状态，
        if(document.forms.newInfoForm) {
            this.showModal('cancel', this.href);
        }
        else {
            this.href();
        }
    }

    href () {
        this.closeModal();
        window.location.href = '#/newInfo';
    }

    login () {
        let $loginForm = $(this.refs.loginForm),
            oaname = $loginForm.find('#oaname').val(),
            password = $loginForm.find('#password').val();

        if (!oaname) {
            this.setState({errMsg: '请输入用户名'});
            return;
        }        
        if (!password) {
            this.setState({errMsg: '请输入密码'});
            return;
        }

        $.ajax({
            url: `${globalConfig.baseUrl}/api/login`, 
            type: 'POST',
            dataType: 'json',
            contentType: 'application/json', 
            data: JSON.stringify({oaname, password})
        })
        .done((json) => {
            if (0 != json.errCode) {
                this.setState({errMsg: json.errMsg});
            }
            else {
                // this.setState({oaUser: json.data});
                // this.closeModal();

                window.location.reload();
            }
        })
        .fail(() => {
            this.setState({errMsg: '未知错误，请联系维护人员'});
        }); 
    }

    preLogout () {
        if(document.forms.newInfoForm) {
            this.showModal('cancel', this.logout);
        }
        else {
            this.closeModal();
            this.logout();
        }
    }

    logout () {
        $.ajax({
            url: `${globalConfig.baseUrl}/api/login`, 
            type: 'put',
            dataType: 'json',
            contentType: 'application/json'
        })
        /*.done((data) => {
            if (0 != data.errCode) {
                this.setState({errMsg: data.errMsg});
            }
            else {
                this.setState({oaUser: util.getOaUser()});
                this.closeModal();
            }
        })
        .fail(() => {
            this.setState({errMsg: '未知错误，请联系维护人员'});
        })*/
        .always(() => {
            window.location.href = '/';
            // this.setState({oaUser: undefined});
        });
    }

    closeModal () {
        this.setState({errMsg: undefined});
        this.refs.MaskModal && this.refs.MaskModal.close();
    }

    renderModal (modalName) {
        if (!this.state.showModal || !modalName) {
            return null;
        }

        let modalInfo, modalBody;

        if ('login' == modalName) {
            modalInfo = {
                className: 'oa-login-modal',
                title: '登录',
                btns: [
                    {name: '取消', click: this.closeModal},
                    {name: '登录', bsStyle: 'primary', click: this.login}
                ]
            };

            modalBody = (
                <div ref='loginForm' className='login-body'>
                    <p className='err-msg'>{this.state.errMsg}</p>
                    <Form horizontal className="login-form">
                        <FormGroup controlId="oaname">
                            <Col componentClass={ControlLabel} sm={2}>
                                用户名<strong>*</strong>
                            </Col>
                            <Col sm={10}>
                                <FormControl type="text" placeholder="请输入用户名" />
                            </Col>
                        </FormGroup>
                        <FormGroup controlId="password">
                        <Col componentClass={ControlLabel} sm={2}>
                                密码<strong>*</strong>
                            </Col>
                            <Col sm={10}>
                                <FormControl type="password" placeholder="请输入密码" />
                            </Col>
                        </FormGroup>
                    </Form>
                </div>
            );
        }
        else {
            modalInfo = {
                className: 'info-delete-modal',
                title: '确定不保存并退出当前编辑吗？',
                btns: [
                    {name: '取消', click: this.closeModal},
                    {name: '确定', bsStyle: 'primary', click: this.state.clickFun || this.closeModal}
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
        let {oaUser, modalName} = this.state;
        let colName = this.props.colName, newBtn, rights = oaUser ? oaUser.operations.split('+') : []; //1查看2编辑3初审4复审5上线

        if (oaUser && ('infoManage'==colName || 'draftManage'==colName) && rights.indexOf('2') >= 0) {
            newBtn = <a className="new" onClick={this.newInfo} href="javascript:;">新建</a>;
        }

        return (
            <header className="header">
                <div className="logo"></div>
                {oaUser
                ? <a className="login" href="javascript:;" onClick={this.preLogout}>{oaUser.oaname + ' | 退出'}</a>
                : <a className="login" href="javascript:;" onClick={this.showModal.bind(this, 'login')}>登陆</a>
                }
                {newBtn}
                {this.renderModal(modalName)}
            </header>
        );
    };
};

export default Header;