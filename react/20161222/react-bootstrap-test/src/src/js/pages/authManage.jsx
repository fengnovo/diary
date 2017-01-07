import React from 'react';
import { Form, FormGroup, Col, ControlLabel, FormControl, Checkbox } from 'react-bootstrap';
import $ from 'jquery';
import Immutable from 'immutable';
import globalConfig from '../../globalConfig.json';
import util from '../util';

import Header from '../components/header';
import Navigate from '../components/navigate';
import ListOps from '../components/listOps';
import Table from '../components/table';
import Footer from '../components/footer';
import MaskModal from '../components/maskModal';

class AuthManage extends React.Component {
    constructor(props){
        super(props);

        let oaUser = util.getOaUser();

        if (!oaUser || oaUser.role != 100) {
            window.location.href = '/';
        }
    
        this.state = {
            row: {}
        };
        this.option = {

        }

        this._bind.apply(this, ['onRowClick', 'getAllOps', 'getAdminList', 'getUserList', 'onPageChange', 'save', 'closeModal', 
            'adminBoxChange', 'showUnbind', 'closeUnbind', 'unbind', 'renderUnbindModal']);
    }

    _bind (...methods) {
        methods.forEach( (method)=> this[method] = this[method].bind(this));
    }

    componentDidMount() {
        this.getAllOps();
        this.getAdminList(); // 管理员列表
        this.getUserList({page: 1, pageSize: globalConfig.pageSize, role: 0});   // 用户列表
    }

    componentWillUnmount() {
        
    }

    onRowClick (row) {
        var state = row.add ? {modalName: 'new'} : {modalName: 'edit', row: row};

        this.setState(state, ()=> {
            this.refs.MaskModal && this.refs.MaskModal.open();
        });
    }

    getAllOps () {
        var _this = this, url = `${globalConfig.baseUrl}/api/operations`;

        $.getJSON(url, function(json, textStatus) {
            if (0 != json.errCode) {
                return;
            }

            _this.opList = json.data;
        });
    }

    getAdminList () {
        var option = {page: 1, pageSize: globalConfig.pageSize, role: 100};
        var _this = this, url = `${globalConfig.baseUrl}/api/privileges`;

        return $.getJSON(url, option, function(json, textStatus) {
            if (0 != json.errCode) {
                return;
            }

            json.data.map((item, i) => {
                item.add = '添加账号';
                return item;
            });

            _this.setState({
                adminList: json.data
            });
        });
    }

    getUserList (option) {
        var _this = this, url = `${globalConfig.baseUrl}/api/privileges`;

        this.option = option;   // listFilter 查询时，缓存查询条件，翻页时用

        return $.getJSON(url, option, function(json, textStatus) {
            if (0 != json.errCode) {
                return;
            }

            json.data.map((item, i) => {
                let rights = [];

                item.operationsInfo.forEach(function(it) {rights.push(it.name);});
                item.rights = rights.join('、');
                item.edit = '编辑';

                return item;
            });

            _this.setState({
                userList: json.data,
                total: json.total
            });
        });
    }

    onPageChange (page, sizePerPage) {
        this.option.page = page;
        this.getUserList(this.option);
    }

    showUnbind () {
        // this.setState({showUnbindModal: true}, () => {
        this.refs.unbindMaskModal && this.refs.unbindMaskModal.open();
        // });
    }

    closeUnbind () {
        this.refs.unbindMaskModal && this.refs.unbindMaskModal.close();
    }

    unbind () {
        $.ajax({
            url: `${globalConfig.baseUrl}/api/privilege/${this.state.row.oaname}`,
            type: 'DELETE',
            dataType: 'json', 
            contentType: 'application/json'
        })
        .done((data) => {
            if (0 != data.errCode) {
                this.setState({errMsg: data.errMsg});
            }
            else {
                this.closeModal();
                this.onPageChange(1);
            }
        })
        .fail(() => {
            this.setState({errMsg: '未知错误，请联系维护人员'});
        })
        .always(() => {
            this.closeUnbind();
        });
    }

    save () {
        let modalName = this.state.modalName,
            $modalForm = $(this.refs.modalForm),
            oaname = $modalForm.find('#oaname').val();

        if (!oaname) {
            this.setState({errMsg: '请输入oa账号'});
            return;
        }

        let role = 0, operations = []; 
        let $input = $modalForm.find('input[type="checkbox"]');

        Array.prototype.forEach.call($input, (item) => {
            let rightid = item.dataset.rightid;
            if (100 == rightid) {
                item.checked && (role = 100);
            }
            else {
                item.checked && operations.push(rightid);
            }
        });

        let formdata = {role, operations},
            ajaxParam = {dataType: 'json', contentType: 'application/json'};

        if ('new' == modalName) {    // 新建接口
            formdata.oaname = oaname;
            Object.assign(ajaxParam, {url: `${globalConfig.baseUrl}/api/privilege`, type: 'POST', data: JSON.stringify(formdata)});
        }   
        else {  // 编辑接口
            Object.assign(ajaxParam, {url: `${globalConfig.baseUrl}/api/privilege/${this.state.row.oaname}`, type: 'PUT', data: JSON.stringify(formdata)});
        }

        $.ajax(ajaxParam)
        .done((data) => {
            if (0 != data.errCode) {
                this.setState({errMsg: data.errMsg});
            }
            else {
                this.closeModal();
                role ? this.getAdminList() : this.onPageChange(1);
            }
        })
        .fail(() => {
            this.setState({errMsg: '未知错误，请联系维护人员'});
        }); 
    }

    closeModal () {
        this.setState({errMsg: undefined, row: {}});
        this.refs.MaskModal && this.refs.MaskModal.close();
    }

    adminBoxChange (event) {
        let checked = event.target.checked;
        let $input = $(this.refs.modalForm).find('input[type="checkbox"]');

        Array.prototype.forEach.call($input, (item) => {
            if (1 != item.dataset.rightid) {
                item.checked = checked;
            }
        });
    }

    renderUnbindModal () {
        let modalInfo = {
            className: 'grant-delete-modal',
            title: '确定解除此账号的绑定？',
            btns: [
                {name: '确定', bsStyle: 'primary', click: this.unbind},
                {name: '取消', click: this.closeUnbind}
            ]
        };

        return (
            <MaskModal ref='unbindMaskModal' showModal={false} modalInfo={modalInfo}>
            </MaskModal>
        );
    }

    renderModal (name) {
        if ('new' != name && 'edit' != name) {
            return null;
        }

        let modalForm = () => {
            let {oaname, role, operations} = this.state.row;
            let check, allBox = [];

            this.opList.forEach((item, i) => {
                if (100 == role) {
                    check = true;
                }
                else if (!operations) {
                    check = false;
                }
                else if (operations.indexOf(item.id) < 0) {
                    check = false;
                }
                else {
                    check = true;
                }
                
                if (1 == item.id) {
                    allBox.push(<Checkbox inline key={i} data-rightid={item.id} checked={true} readOnly>{item.name+'权限'}</Checkbox>);
                }
                else {
                    allBox.push(<Checkbox inline key={i} data-rightid={item.id} defaultChecked={check}>{item.name+'权限'}</Checkbox>);   
                }
            });
            allBox.push(<Checkbox inline key={'admin'} data-rightid={100} defaultChecked={100 == role} onChange={this.adminBoxChange}>管理员权限</Checkbox>);

            return (
                <div ref='modalForm'>
                    <p className='err-msg'>{this.state.errMsg}</p>
                    <Form componentClass="fieldset" className='grant-new-body' horizontal>
                        <FormGroup controlId="oaname">
                            <Col componentClass={ControlLabel} sm={3}>
                                请输入绑定的账号：
                            </Col>
                            <Col sm={9}>
                                {'new' == name 
                                ? <FormControl type="text" placeholder="账号" />
                                : <FormControl type="text" placeholder="账号" value={oaname} readOnly/>
                                }
                            </Col>
                        </FormGroup>
                        <FormGroup>
                            {allBox}
                        </FormGroup>
                    </Form>
                    {this.renderUnbindModal()}
                </div>    
            );
        };
        let modalInfo;

        if ('new' == name) {
            modalInfo = {
                className: 'grant-new-modal',
                title: '添加账号',
                btns: [
                    {name: '确定', bsStyle: 'primary', click: this.save},
                    {name: '取消', click: this.closeModal}
                ]
            };
        }
        else {
            modalInfo = {
                className: 'grant-new-modal',
                title: '编辑权限',
                btns: [
                    {name: '解除绑定', bsStyle: 'primary', click: this.showUnbind},
                    {name: '确定', bsStyle: 'primary', click: this.save},
                    {name: '取消', click: this.closeModal}
                ]
            };
        }

        return (
            <MaskModal ref='MaskModal' showModal={true} modalInfo={modalInfo}>
                {modalForm()}
            </MaskModal>
        );
    }

    render() {
        var tableConfig = globalConfig.tableConfig.authTable;
        var tableFun = {
            onRowClick: this.onRowClick,
            onPageChange: this.onPageChange
        };
        var tableData = {
            list: this.state.userList,
            page: this.option.page || 1,
            total: this.state.total
        };

        var adminTableConfig = globalConfig.tableConfig.adminTable;
        var adminTableFun = {
            onRowClick: this.onRowClick
        };
        var adminTableData = {
            list: this.state.adminList,           
            page: 1,
            total: 1
        };

        return (
            <div className="auth-manage-page page-wrap" ref="authManage">
                <Header colName='authManage'/>
                <div className='auth-manage-body page-body'> 
                    <div className='body-left'>
                        <Navigate colName='authManage' />
                    </div>
                    <div className='body-right'>
                        <section className='auth-wrap'>
                            <h5>管理员权限</h5>
                            <p className='auth-hint'>管理员可以分配任务给不同功能点的人员进行工作。</p>
                            <Table tableConfig={adminTableConfig} tableFun={adminTableFun} tableData={adminTableData}/>
                            <p className='auth-hint'>根据管理员分配的任务权限，对应不同的权限操作。</p>
                            <Table tableConfig={tableConfig} tableFun={tableFun} tableData={tableData}/>
                        </section>
                        <Footer />
                    </div>
                </div>
                {this.renderModal(this.state.modalName)}
            </div>
        );
    }
};


export default AuthManage;