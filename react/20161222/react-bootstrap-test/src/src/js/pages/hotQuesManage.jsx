import React from 'react';
import { Form, FormGroup, Col, ControlLabel, DropdownButton, 
    MenuItem, ButtonToolbar, Button, FormControl, Glyphicon} from 'react-bootstrap';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import $ from 'jquery';
import moment from 'moment';
import Immutable from 'immutable';
import globalConfig from '../../globalConfig.json';
import util from '../util';

import Header from '../components/header';
import Navigate from '../components/navigate';
import ListFilter from '../components/listFilter';
import ListOps from '../components/listOps';
import Table from '../components/table';
import Footer from '../components/footer';
import MaskModal from '../components/maskModal';
import Toast from '../components/Toast';

let  oaname,oaUser = util.getOaUser();

class HotQuesManage extends React.Component {
    constructor(props){
        super(props);

        if (!oaUser || oaUser.role != 100) {
            window.location.href = '/';
        }else{
            oaname = oaUser.oaname;
        }
    
        this.state = {
            showAddAdModal: false,
            showAddBtn: false
        };
        this.option = {

        };
        this.dataToOp = {

        };

        this._bind.apply(this, ['onRowClick', 'getTableData', 'onPageChange', 
            'closeQuesModal', 'renderQuesModal','showQuesModal','showToast','save',
            'onRowSelect','onSelectAll','doDelete','renderDelModal',
            'ensureDelete', 'closeDelModal','doCheck']);
    }

    _bind (...methods) {
        methods.forEach( (method)=> this[method] = this[method].bind(this));
    }

    componentDidMount() {
        if(oaUser){
            this.getTableData(this.option);
        }
    }

    componentWillUnmount() {
        
    }

    onRowClick (row) {
        if(row.id){
            this.setState({
                showQuesModal: true,
                type: 'edit',
                editId: row.id
            });
        }
    }
    
    onRowSelect (row, isSelected) {
        if (isSelected) {
            this.dataToOp[row.id] = row;
        }
        else {
            delete this.dataToOp[row.id];
        }
    }

    onSelectAll (isSelected) {
        if (isSelected) {
            let i = 0, list = this.state.list, len = list.length, row;
            for (; i < len; i++) {
                row = list[i];
                this.dataToOp[row.id] = row;
            }            
        }
        else {
            this.dataToOp = {};
        }
    }

    doDelete () {
        console.log(this.dataToOp);

        if (this.dataToOp && $.isEmptyObject(this.dataToOp)) {
            this.refs.listOps.showToast();
            return;
        }

        this.refs.renderDelModal && this.refs.renderDelModal.open();
    }

    getTableData (option) {
        var _this = this;
        var url = `${globalConfig.baseUrl}/api/asks`; //'./test/hotQuesTestData.json';

        $.getJSON(url, function(json, textStatus) {
            if (0 != json.errCode) {
                return;
            }
            let list = json.data;
            
            list.map((item, i) => {
                item.createTime = util.dateStrFromUnix(item.createTime);
                return item;
            });

            if(list.length>0){
                _this.setState({
                    showAddBtn: false,  //如果有一条数据就不能再有新增按钮让新增
                    list: list,
                    total: json.total
                });
            }else{
                _this.setState({
                    showAddBtn: true,
                    list: list,
                    total: json.total
                });
            }
        });
    }

    onPageChange (page, sizePerPage) {
        this.option.page = page;
        this.getTableData(this.option);
    }

    closeQuesModal () {
        this.setState({
            showQuesModal: false
        });
    }

    showQuesModal () {
        this.setState({
            showQuesModal: true,
            type: 'add'
        });
    }

    closeDelModal () {
        this.refs.renderDelModal && this.refs.renderDelModal.close();
    }

    showToast (msg) {
        this.refs.Toast.show(msg);
    }

    save() {
        let { id,name,content} = this.refs.quesItem.state;
        if($.trim(name)== ''){
            this.showToast ('名称不能为空！');
            return;
        }
        if($.trim(content)== ''){
            this.showToast ('内容不能为空！');
            return;
        }
        if(this.state.type === 'add'){
            console.log('新增');
            console.log({
                        content: content,
                        name: name,
                        oaname: oaname
                    });
                $.ajax({
                    url: `${globalConfig.baseUrl}/api/ask`,
                    type: 'POST',
                    dataType: 'json',
                    contentType: 'application/json',
                    data: JSON.stringify({
                        content: content,
                        name: name,
                        oaname: oaname,
                        order: 1,
                        status: 0
                    })
                })
                .done((data) => {
                    console.log('新增成功');
                    if (0 == data.errCode) {
                        this.closeQuesModal();
                        this.onPageChange(1);
                    }else{
                        this.showToast ('新增失败，原因：'+data.errMsg);
                    }
                })
                .fail(() => {
                    console.log('新增失败');
                    this.showToast('新增失败');
                    this.closeQuesModal();
                });
                
        }else{
            console.log('修改');
            console.log({
                        content: content,
                        name: name,
                        oaname: oaname,
                        order: 1,
                        status: 0
                    });
                $.ajax({
                    url: `${globalConfig.baseUrl}/api/ask/${id}`,
                    type: 'PUT',
                    dataType: 'json',
                    contentType: 'application/json',
                    data: JSON.stringify({
                        content: content,
                        name: name,
                        oaname: oaname
                    })
                })
                .done((data) => {
                    console.log('修改成功');
                    if (0 == data.errCode) {
                         this.closeQuesModal();
                        this.onPageChange(1);
                    }else{
                        this.showToast ('修改失败，原因：'+data.errMsg);
                    }
                })
                .fail(() => {
                    console.log('修改失败');
                    this.showToast('修改失败');
                    this.closeQuesModal();
                });
        }
    }

    ensureDelete () {
        this.doCheck(100);
        this.closeDelModal();
    }

    doCheck (nextStatus = 40) {
        let listOps = this.refs.listOps, dataToOp = this.dataToOp;
        let opName = {'40': '处理', '80': '处理', '100': '删除条目'}[nextStatus];

        if (listOps.state.showToast) {
            return;  // 避免重复操作
        }

        if (dataToOp && $.isEmptyObject(dataToOp)) {
            listOps.showToast();
            return;
        }
        else {
            listOps.showToast(`正在${opName}，请稍候...`, true);
        }

        let _this = this, key, row, size = 0;

        for (key in dataToOp) {
            row = dataToOp[key];
            if ((100 != nextStatus && 0 != row.status) || (100 == nextStatus && row.status == 100)) {    // 删除条目时，不用判断状态(已经是删除状态的除外)
                continue;
            }

            size++;

            $.ajax({
                url: `${globalConfig.baseUrl}/api/ask/${row.id}`, 
                type: 'PUT',
                dataType: 'json', 
                contentType: 'application/json', 
                data: JSON.stringify({status: nextStatus})
            })
            .always(() => {
                size--;

                if (0 == size) {
                    listOps.showToast(`${opName}操作完成`);
                    setTimeout(() => {
                        this.onPageChange(1); // 全部返回后，刷新列表
                    }, 2000);
                }
            }); 
        };

        if (0 == size) {
            listOps.showToast(`${opName}操作完成`);
            setTimeout(() => {
                this.onPageChange(1);   // 取消选中态
            }, 2000); 
        }

        this.dataToOp = {};
    }

    renderQuesModal () {

        let btns = [{name: '取消', click: this.closeQuesModal},
        {name: '保存并提交', bsStyle: 'primary', click: this.save}];

        let modalInfo = {
            className: 'hot-item-modal',
            btns: btns
        };
        return (
            <MaskModal ref='MaskModal' showModal={true} modalInfo={modalInfo}> 
                <QuesItem ref='quesItem' showToast={this.showToast} {...this.state}/>
                <Toast ref='Toast' />            
            </MaskModal>
        );
    }

    renderDelModal () {
        let modalInfo = {
            className: 'info-delete-modal',
            title: '确定删除所选的内容吗？',
            btns: [
                {name: '确定', bsStyle: 'primary', click: this.ensureDelete},
                {name: '取消', click: this.closeDelModal}
            ]
        }

        return (
            <MaskModal ref='renderDelModal' showModal={false} modalInfo={modalInfo}>                
            </MaskModal>
        );
    }

    render() {
        var tableConfig = globalConfig.tableConfig.hotQuesTable;
        var tableFun = {
            onRowClick: this.onRowClick,
            onRowSelect: this.onRowSelect,
            onSelectAll: this.onSelectAll,
            onPageChange: this.onPageChange
        };
        var tableData = {
            list: this.state.list,
            page: this.option.page || 1,
            total: this.state.total
        };
        var opFun = {
            showAddAdModal: this.showQuesModal,
            doDelete: this.doDelete 
        };


        return (
            <div className="report-manage-page page-wrap" ref="hotQuesManage">
                <Header colName='hotQuesManage'/>
                <div className='report-manage-body page-body'> 
                    <div className='body-left'>
                        <Navigate colName='hotQuesManage' />
                    </div>
                    <div className='body-right'>
                        <ListOps colName='hotQuesManage' opFun={opFun} ref='listOps' showAddBtn={this.state.showAddBtn}/>
                        <Table colName='hotQuesManage' tableConfig={tableConfig} tableFun={tableFun} tableData={tableData}/>
                        <Footer />
                    </div>
                </div>
                {this.state.showQuesModal ? this.renderQuesModal(): null}
                {this.renderDelModal()}
            </div>
        );
    }
};


export default HotQuesManage;

class QuesItem extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            name: '',
            content: ''
        };

        this._bind.apply(this, ['handleNameChange','handleContentChange']);
    }

    _bind (...methods) {
        methods.forEach( (method)=> this[method] = this[method].bind(this));
    }

    componentDidMount() {
        let _this = this;
        let id = this.props.editId;
        if(this.props.type === 'edit'){
            $.getJSON(`${globalConfig.baseUrl}/api/ask/${id}`, (json, textStatus) => {
                // console.log(json);
                // if (0 != json.errCode) {
                //     return;
                // }
                let { content, name } = json;
                this.setState({
                        id: id,
                        content: content,
                        name: name
                    });
            });
        }
    }

    componentWillUnmount() {
        
    }

    handleNameChange (event) {
        this.setState({name: event.target.value});
    }

    handleContentChange (event) {
        this.setState({content: event.target.value});
    }


    render () {
        let btns = [{name: '取消', click: this.closeAddAdModal},
        {name: '保存并提交', bsStyle: 'primary', click: this.save}];

        let modalInfo = {
            className: 'hot-item-modal',
            btns: btns
        };
        let state = this.state;
        
        return (
            <Form componentClass="fieldset" className='ads-detail-body' horizontal>
                <FormGroup>
                    <Col componentClass={ControlLabel} sm={2}>
                        名称<strong className="prompt">*</strong>
                    </Col>
                    <Col sm={10}>
                        <div>
                           <FormControl 
                            type="text" 
                            value={state.name}
                            onChange={this.handleNameChange} />
                        </div>
                    </Col>
                </FormGroup>
                <FormGroup>
                    <Col componentClass={ControlLabel} sm={2}>
                        内容<strong className="prompt">*</strong>
                    </Col>
                    <Col sm={10}>
                        <textarea
                            className="form-control"
                            rows="3"
                            value={state.content}
                            onChange={this.handleContentChange} >
                        </textarea>
                    </Col>
                </FormGroup>
            </Form>   
        );
    }
};
