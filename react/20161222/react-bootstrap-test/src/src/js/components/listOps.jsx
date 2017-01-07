import React from 'react';
import { Button, Form, Checkbox } from 'react-bootstrap';
import Immutable from 'immutable';
import globalConfig from '../../globalConfig.json';
import util from '../util';

class ListOps extends React.Component {
    constructor(props){
        super(props);
    
        this.state = {
            
        };

        this._bind.apply(this, ['doFirstCheck', 'doRecheck','doAdd', 'doDelete', 'checkReport', 'uncheckReport', 'showToast', 'closeToast']);
    }

    _bind (...methods) {
        methods.forEach( (method)=> this[method] = this[method].bind(this));
    }

    componentDidMount() {
        
    }

    componentWillUnmount() {
        
    }

    doDelete () {
        this.props.opFun.doDelete();
    }

    doFirstCheck () {
        this.props.opFun.doCheck(11);
    }

    doRecheck () {
        this.props.opFun.doCheck(30);
    }

    checkReport () {
        this.props.opFun.doCheck(40);
    }

    doAdd () {
        this.props.opFun.showAddAdModal();
    }

    uncheckReport () {
        this.props.opFun.doCheck(80);
    }

    showToast (text = '未选中任何数据项', showAlways = false) {
        /*if (this.state.showToast) {
            return;
        }*/

        this.setState({
            showToast: true,
            toastText: text
        });

        var _this = this;

        !showAlways && setTimeout(() => {
            _this.setState({
                showToast: false
            });
        }, 2000);
    }

    closeToast () {
        this.setState({
            showToast: false
        });
    }

    render() {
        var btnGroup=[], oaUser = util.getOaUser(), rights = oaUser ? oaUser.operations.split('+') : []; //1查看2编辑3初审4复审5上线

        switch (this.props.colName) {
            case 'infoManage':
                rights.indexOf('2')>=0 && btnGroup.push(<Button bsStyle="warning" key='del' onClick={this.doDelete}>删除</Button>);
                rights.indexOf('3')>=0 && btnGroup.push(<Button bsStyle="success" key='check' onClick={this.doFirstCheck}>通过初审</Button>);
                rights.indexOf('4')>=0 && btnGroup.push(<Button bsStyle="success" key='recheck' onClick={this.doRecheck}>通过复审</Button>);

                break;

            case 'draftManage':
                rights.indexOf('2')>=0 && btnGroup.push(<Button bsStyle="warning" key='del' onClick={this.doDelete}>删除</Button>);

                break;

            //举报管理和评论管理，必须管理员才能进，权限都存在
            case 'reportManage':
                btnGroup = [
                    <Button bsStyle="warning" key='del' onClick={this.doDelete}>删除</Button>,
                    <Button bsStyle="success" key='pass' onClick={this.checkReport}>通过</Button>,
                    <Button bsStyle="success" key='unpase' onClick={this.uncheckReport}>不通过</Button>                    
                ];

                break;

            case 'commentManage':
                btnGroup = [
                    <Button bsStyle="warning" key='del' onClick={this.doDelete}>删除</Button>,
                    <Button bsStyle="success" key='in' onClick={this.doFirstCheck}>移入精选</Button>,
                    <Button bsStyle="success" key='out' onClick={this.doRecheck}>移出精选</Button>                    
                ];

                break;
            case 'adsManage':
                btnGroup = [
                    // <Button bsStyle="success" key='edit' onClick={this.doEdit}>修改</Button>,
                    <Button bsStyle="success" key='add' onClick={this.doAdd}>添加</Button>,
                    <Button bsStyle="warning" key='del' onClick={this.doDelete}>删除</Button>                    
                ];

                break;

            case 'homeNavManage':
                btnGroup = [
                    // <Button bsStyle="success" key='edit' onClick={this.doEdit}>修改</Button>,
                    <Button bsStyle="success" key='add' onClick={this.doAdd}>添加</Button>,
                    <Button bsStyle="warning" key='del' onClick={this.doDelete}>删除</Button>                    
                ];
                break;

            case 'hotQuesManage':
                btnGroup = [
                    <Button bsStyle="warning" key='del' onClick={this.doDelete}>删除</Button>                    
                ];
                if(this.props.showAddBtn){
                    btnGroup.unshift(<Button bsStyle="success" key='add' onClick={this.doAdd}>添加</Button>);
                }
                break;

            default: 
                btnGroup = 'listOps';
        }
        return (
            <Form componentClass="fieldset" inline className="list-ops">                
                {btnGroup}
                {this.state.showToast ?
                <div className='op-toast'>
                    <div className='right-arrow'></div>
                    <Button>{this.state.toastText}</Button>
                </div> : null}
            </Form>
        );
    }
};

ListOps.defaultProps = {
    opFun: {}
};

export default ListOps;
