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

import AdsItem from './adsManageAddEdit';

let oaname,
    oaUser = util.getOaUser(),
    category;       //新增或修改时的Category

class AdsManage extends React.Component {
    constructor(props){
        super(props);

        if (!oaUser || oaUser.role != 100) {
            window.location.href = '/';
        }else{
            oaname = oaUser.oaname;
        }
    
        this.state = {
            type: 'add',
            showAdModal: false,
            editId: null,
            opList: [],
            oaname: oaname,
            curCategory: '0',    //当前浏览Category
            category: category
        };
        this.option = {

        };
        this.dataToOp = {

        };

        this._bind.apply(this, ['getOptionData',  'getTableData', 'onPageChange', 
            'closeAdModal', 'renderAdModal','showAdModal','showToast',
            'save','doDelete','renderDelModal',
            'onRowClick', 'onRowSelect', 'onSelectAll',
            'ensureDelete', 'closeDelModal','doCheck']);
    }

    _bind (...methods) {
        methods.forEach( (method)=> this[method] = this[method].bind(this));
    }

    componentDidMount() {
        if(oaUser){
            this.getTableData(this.option);
            this.getOptionData();
        }
    }

    componentWillUnmount() {
        
    }

    onRowClick (row) {
        if(row.id){
            this.setState({
                showAdModal: true,
                type: 'edit',
                editId: row.id
            });
        }
    }
    
    onRowSelect (row, isSelected) {
        console.log(row);
        if (isSelected) {
            this.dataToOp[row.id] = row;
        }
        else {
            delete this.dataToOp[row.id];
        }
    }

    onSelectAll (isSelected) {
        console.log(this.state.list);
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

    getOptionData () {
        var _this = this;
        var url = `${globalConfig.baseUrl}/api/navs?page=1&pageSize=20`;
        $.getJSON(url,function(json, textStatus) {
            if (0 != json.errCode) {
                return;
            }
            let list = json.data;
            _this.setState({
                opList: list,
            });
        });
    }

    

    getTableData (option) {
        var _this = this;
        var url = `${globalConfig.baseUrl}/api/ads`; //'./test/adsTestData.json';
        this.option = option;   // listFilter 查询时，缓存查询条件，翻页时用
        console.log('--------------'+option.category);
        this.setState({curCategory: (option.category || '0')});
        $.getJSON(url, option, function(json, textStatus) {
            if (0 != json.errCode) {
                return;
            }
             
            let list = json.data;
            list.map((item, i) => {
                item.categoryName = util.changeToCategoryName(item.category);
                item.beginTime = util.dateStrFromUnix(item.beginTime);
                item.endTime = util.dateStrFromUnix(item.endTime);
                return item;
            });

            _this.setState({
                list: list,
                total: json.total
            });
        });
    }

    onPageChange (page, sizePerPage) {
        this.option.page = page;
        this.getTableData(this.option);
    }

    closeAdModal () {
        console.log('closeAdModal');
        this.setState({
            showAdModal: false
        });
    }

    showAdModal () {
        this.setState({
            showAdModal: true,
            type: 'add'
        });
    }

    doDelete () {
        console.log(this.dataToOp);

        if (this.dataToOp && $.isEmptyObject(this.dataToOp)) {
            this.refs.listOps.showToast();
            return;
        }

        this.refs.renderDelModal && this.refs.renderDelModal.open();
    }

    showToast (msg) {
        this.refs.Toast.show(msg);
    }

    closeDelModal () {
        this.refs.renderDelModal && this.refs.renderDelModal.close();
    }

    ensureDelete () {
        this.doCheck(100);
        this.closeDelModal();
    }

    save() {
        let { id,beginTime,category,content,endTime,linkUrl,
            name,order,picUrl,status,target,linkType,status6 } = this.refs.adsItem.state;
        if($.trim(name)== ''){
            this.showToast ('名称不能为空！');
            return;
        }
        if($.trim(order)== ''){
            this.showToast ('顺序不能为空！');
            return;
        }
        if(endTime && parseInt(endTime.format('X'))*1000 < new Date()){
            this.showToast ('不能发布今天之前的广告！');
            return;
        }
        console.log(category);
        if (category!=2 && $.trim(picUrl)== '') {   //非2 轮播广告、四方格广告必须输入图片url
            this.showToast ('icon图标不能为空！');
            return;
        }
        
        if($.trim(linkUrl)== ''){
            this.showToast ('指向链接不能为空！');
            return;
        }
        if(linkType === 1){ //自定义的
            // linkUrl = status6==0 ? 'web:'+linkUrl : 'native:'+linkUrl;
            linkUrl = util.changeStatusToAction(status6,linkUrl).actionLinkUrl;
        }
        if(this.state.type === 'add'){
            console.log('新增');
            console.log({
                        beginTime: parseInt(beginTime.format('X')),//1481558400*1000,
                        category: typeof(category) === 'string' ? parseInt(category) : category,
                        content: content,
                        endTime: parseInt(endTime.format('X')),
                        linkUrl: linkUrl,
                        name: name,
                        oaname: oaname,
                        order: 1,
                        picUrl: picUrl,
                        status: 0,
                        target: 1
                    });
                    
                $.ajax({
                    url: `${globalConfig.baseUrl}/api/ad`,
                    type: 'POST',
                    dataType: 'json',
                    contentType: 'application/json',
                    data: JSON.stringify({
                        beginTime: parseInt(beginTime.format('X')),//1481558400*1000,
                        category: typeof(category) === 'string' ? parseInt(category) : category,
                        content: content,
                        endTime: parseInt(endTime.format('X')),
                        linkUrl: linkUrl,
                        name: name,
                        oaname: oaname,
                        order: 1,
                        picUrl: picUrl,
                        status: 0,
                        linkType: linkType,
                        target: 1
                    })
                })
                .done((data) => {
                    console.log('新增成功');
                    if (0 == data.errCode) {
                        this.closeAdModal();
                        this.onPageChange(1);
                        console.log(this.state.curCategory);
                        this.getTableData({category: this.state.curCategory});
                    }else {
                        this.showToast ('新增失败，原因：'+data.errMsg);
                    }
                })
                .fail(() => {
                    console.log('新增失败');
                    this.showToast ('新增失败');
                    this.closeAdModal();
                });
                
        }else{
            console.log('修改');
            console.log({
                        beginTime: parseInt(beginTime.format('X')),//1479115229,//1481558400*1000,
                        category: typeof(category) === 'string' ? parseInt(category) : category,
                        content: content,
                        endTime: parseInt(endTime.format('X')),//1481558400,
                        linkUrl: linkUrl,
                        name: name,
                        oaname: oaname,
                        order: typeof(order) === 'string' ? parseInt(order) : order,
                        picUrl: picUrl,
                        status: 0,
                        target: typeof(target) === 'string' ? parseInt(target) : target
                    });
                $.ajax({
                    url: `${globalConfig.baseUrl}/api/ad/${id}`,
                    type: 'PUT',
                    dataType: 'json',
                    contentType: 'application/json',
                    data: JSON.stringify({
                        beginTime: parseInt(beginTime.format('X')),//1479115229,//1481558400*1000,
                        category: typeof(category) === 'string' ? parseInt(category) : category,
                        content: content,
                        endTime: parseInt(endTime.format('X')),//1481558400,
                        linkUrl: linkUrl,
                        name: name,
                        oaname: oaname,
                        order: typeof(order) === 'string' ? parseInt(order) : order,
                        picUrl: picUrl,
                        status: 0,
                        linkType: linkType,
                        target: typeof(target) === 'string' ? parseInt(target) : target
                    })
                })
                .done((data) => {
                    console.log('修改成功');
                    if (0 == data.errCode) {
                        this.closeAdModal();
                        this.onPageChange(1);
                        console.log(this.state.curCategory);
                        this.getTableData({category: this.state.curCategory});
                    }else {
                        this.showToast ('修改失败，原因：'+data.errMsg);
                    }
                })
                .fail(() => {
                    console.log('修改失败');
                    this.showToast ('修改失败');
                    this.closeAdModal();
                });
        }
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
                url: `${globalConfig.baseUrl}/api/ad/${row.id}`, 
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

    renderAdModal () {

        let btns = [{name: '取消', click: this.closeAdModal},
        {name: '保存并提交', bsStyle: 'primary', click: this.save}];

        let modalInfo = {
            className: 'ads-item-modal',
            btns: btns
        };
        return (
            <MaskModal ref='MaskModal' showModal={true} modalInfo={modalInfo}> 
                <AdsItem ref='adsItem' showToast={this.showToast}  {...this.state}/>
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
        var tableConfig = globalConfig.tableConfig.adsTable;
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
            showAddAdModal: this.showAdModal,
            doDelete: this.doDelete
        };


        return (
            <div className="report-manage-page page-wrap" ref="adsManage">
                <Header colName='adsManage'/>
                <div className='report-manage-body page-body'> 
                    <div className='body-left'>
                        <Navigate colName='adsManage' />
                    </div>
                    <div className='body-right'>
                        <ListFilter colName='adsManage' getTableData={this.getTableData} ref='listFilter'/>
                        <ListOps colName='adsManage' opFun={opFun} ref='listOps'/>
                        <Table colName='adsManage' tableConfig={tableConfig} tableFun={tableFun} tableData={tableData}/>
                        <Footer />
                    </div>
                </div>
                {this.state.showAdModal ? this.renderAdModal(): null}
                {this.renderDelModal()}
            </div>
        );
    }
};



export default AdsManage;

