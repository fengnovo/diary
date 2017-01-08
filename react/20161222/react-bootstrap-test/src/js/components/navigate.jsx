import React from 'react';
import $ from 'jquery';
import { Nav, NavItem } from 'react-bootstrap';
import util from '../util';
import globalConfig from '../../globalConfig.json';

import MaskModal from '../components/maskModal';

class Navigate extends React.Component {
    constructor(props){
        super(props);
    
        this.state = {
            
        };

        this._bind.apply(this, ['navSwitch', 'showModal', 'closeModal', 'href', 'renderModal', 'getTableData']);
    }

    componentDidMount() {
        // this.getTableData({page: 1, pageSize: 1, status: 1});
    }

    _bind (...methods) {
        methods.forEach( (method)=> this[method] = this[method].bind(this));
    }

    getTableData (option) {
        var _this = this, url = `${globalConfig.baseUrl}/api/articles`;

        $.getJSON(url, option, function(json, textStatus) {
            if (0 != json.errCode) {
                return;
            }

            _this.setState({
                draftNum: json.total
            });
        });
    }

    navSwitch (target) {
        this.nextHref = target;

        if(document.forms.newInfoForm) {
            this.showModal();
        }
        else {
            this.href();
        }
    }

    href () {
        this.closeModal();
        window.location.href = '#/'+this.nextHref;
    }

    showModal () {
        this.refs.MaskModal && this.refs.MaskModal.open();
    }

    closeModal () {
        this.refs.MaskModal && this.refs.MaskModal.close();
    }

    renderModal () {
        let modalInfo = {
            className: 'info-delete-modal',
            title: '确定不保存并退出当前编辑吗？',
            btns: [
                {name: '取消', click: this.closeModal},
                {name: '确定', bsStyle: 'primary', click: this.href}
            ]
        };
        
        return (
            <MaskModal ref='MaskModal' showModal={false} modalInfo={modalInfo}>
            </MaskModal>
        );
    }

    render () {
        let oaUser = util.getOaUser();
        let adminNavs, draftNum = this.state.draftNum,
            draftNumStr = 'number' == typeof(draftNum) ? `(${draftNum})` : '',
            navs = [
                <NavItem eventKey={"infoManage"} key='infoManage' onClick={this.navSwitch.bind(this, 'infoManage')}>
                    资讯管理
                </NavItem>,
                <NavItem eventKey={"draftManage"} key='draftManage' onClick={this.navSwitch.bind(this, 'draftManage')}>
                    草稿箱{draftNumStr}
                </NavItem>
            ];

        if (oaUser && 100 == oaUser.role) {
            adminNavs = [
                <NavItem eventKey={"colsManage"} key='colsManage' onClick={this.navSwitch.bind(this, 'colsManage')}>
                    栏目管理
                </NavItem>,
                <NavItem eventKey={"reportManage"} key='reportManage' onClick={this.navSwitch.bind(this, 'reportManage')}>
                    举报管理
                </NavItem>,
                <NavItem eventKey={"authManage"} key='authManage' onClick={this.navSwitch.bind(this, 'authManage')}>
                    权限管理
                </NavItem>
            ];

            navs = navs.concat(adminNavs);
        }

        let adsNavs = [];
        if(true){
            adsNavs = [
                <NavItem className="fz" eventKey={"homeNavManage"} key='homeNavManage' onClick={this.navSwitch.bind(this, 'homeNavManage')}>
                    功能清单管理
                </NavItem>,
                <NavItem className="fz" eventKey={"adsManage"} key='adsManage' onClick={this.navSwitch.bind(this, 'adsManage')}>
                    广告配置
                </NavItem>,
                <NavItem className="fz" eventKey={"hotQuesManage"} key='hotQuesManage' onClick={this.navSwitch.bind(this, 'hotQuesManage')}>
                    必答热门问题管理
                </NavItem>
            ];

        }
/*
    <Nav className="navigate" bsStyle="pills" stacked activeKey={this.props.colName}>
        {navs}
    </Nav>
*/
        return (
            <aside>
                <Nav className="navigate" bsStyle="pills" stacked activeKey={this.props.colName}>
                    {adsNavs}
                </Nav>
                {this.renderModal()}
            </aside>
        );       
    }
}

export default Navigate;