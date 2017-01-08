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

import NotLogin from '../components/notLogin';

let oaname,oaUser = util.getOaUser();
class HomeNavManage extends React.Component {
    constructor(props){
        super(props);

        // let oaUser = util.getOaUser();
        // if (!oaUser || oaUser.role != 100) {
        //     window.location.href = '/';
        // }else{
        //     oaname = oaUser.oaname;
        // }
    
        this.state = {
            showAdModal: false,
            showTipModal: false,
            type: 'add',
            editId: null
        };
        this.option = {

        };
        this.dataToOp = {

        };

        this._bind.apply(this, ['onRowClick', 'getTableData', 'onPageChange',
            'onRowSelect', 'onSelectAll',  'save', 'doDelete', 'doCheck',
            'renderDelModal', 'closeDelModal', 'ensureDelete',
            'closeAdModal', 'renderAdModal','showAdModal','showToast']);
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
        // console.log(row);
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

    doDelete () {
        if (this.dataToOp && $.isEmptyObject(this.dataToOp)) {
            this.refs.listOps.showToast();
            return;
        }

        this.refs.renderDelModal && this.refs.renderDelModal.open();
    }

 
    
    getTableData (option) {
        var _this = this;
        // var url = `${globalConfig.baseUrl}/api/reports`;
        var url = `${globalConfig.baseUrl}/api/navs?page=1&pageSize=50`;//'./test/homeNavTestData.json';

        this.option = option;   // listFilter 查询时，缓存查询条件，翻页时用

        $.getJSON(url, function(json, textStatus) {
            if (0 != json.errCode) {
                return;
            }
            
            let list = json.data;
            list.map((item, i) => {
                item.startTime = util.dateStrFromUnix(item.startTime);
                item.finishTime = util.dateStrFromUnix(item.finishTime);
                item.target = item.target==1 ? '首页' : '第二页';
                return item;
            });

            _this.setState({
                list: list,
                total: json.total
            });
        });
    }

    onPageChange (page, sizePerPage) {
        console.log('------------');
        this.option.page = page;
        if(oaUser){
            this.getTableData(this.option);
        }
    }

    closeAdModal () {
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

    showToast (msg) {
        this.refs.Toast.show(msg);
    }

    closeDelModal (){
        this.refs.renderDelModal && this.refs.renderDelModal.close();
    }

    ensureDelete () {
        this.doCheck(100);
        this.closeDelModal();
    }

    save() {
        let { id,linkUrl,navName,navOrder,navStatus,navTarget,picUrl,repOpsTitle1,repOpsTitle2,status1,status2 } = this.refs.navsItem.state;
        console.log(this.refs.navsItem.state);
        if($.trim(navName)== ''){
            this.showToast ('名称不能为空！');
            return;
        }
        if($.trim(navOrder)== ''){
            this.showToast ('顺序不能为空！');
            return;
        }
        if($.trim(picUrl)== ''){
            this.showToast ('icon图标不能为空！');
            return;
        }
        if($.trim(linkUrl)== ''){
            this.showToast ('指向链接不能为空！');
            return;
        }
        if(this.state.type === 'add'){
            console.log('新增');
                $.ajax({
                    url: `${globalConfig.baseUrl}/api/nav`,
                    type: 'POST',
                    dataType: 'json',
                    contentType: 'application/json',
                    data: JSON.stringify({
                        linkUrl: util.changeStatusToAction(status1,linkUrl).actionLinkUrl,
                        name:  navName,
                        oaname: oaname,
                        order: 0,
                        picUrl : picUrl,
                        status: 0,
                        target: status2 //显示：1是首页，2是第二页
                    })
                })
                .done((data) => {
                    console.log('新增成功');
                    if (0 == data.errCode) {
                        this.closeAdModal();
                        this.onPageChange(1);
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
                $.ajax({
                    url: `${globalConfig.baseUrl}/api/nav/${id}`,
                    type: 'PUT',
                    dataType: 'json',
                    contentType: 'application/json',
                    data: JSON.stringify({
                        linkUrl: util.changeStatusToAction(status1,linkUrl).actionLinkUrl,
                        name:  navName,
                        oaname: oaname,
                        order: parseInt(navOrder),
                        picUrl : picUrl,
                        status: 0,
                        target: status2 //显示：1是首页，2是第二页
                    })
                })
                .done((data) => {
                    console.log('修改成功');
                    if (0 == data.errCode) {
                        this.closeAdModal();
                        this.onPageChange(1);
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
                url: `${globalConfig.baseUrl}/api/nav/${row.id}`, 
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
            className: 'navs-item-modal',
            btns: btns
        };
        return (
            <MaskModal ref='MaskModal' showModal={true} modalInfo={modalInfo}> 
                <NavsItem ref='navsItem' showToast={this.showToast} {...this.state}/>
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
        var tableConfig = globalConfig.tableConfig.homeNavTable;
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

        var bodyRight;
        if (oaUser) {
            oaname = oaUser.oaname;
            bodyRight = (
                <div className='body-right'>
                    <ListOps colName='homeNavManage' opFun={opFun} ref='listOps'/>
                    <Table colName='homeNavManage' tableConfig={tableConfig} tableFun={tableFun} tableData={tableData}/>
                    <Footer />
                </div>
            );
        }
        else {
            bodyRight = (
                <div className='body-right'>
                    <NotLogin />
                    <Footer />
                </div>
            );
        }
        
        return (
            <div className="info-manage-page page-wrap" ref="homeNavManage">
                <Header colName='homeNavManage'/>
                <div className='info-manage-body page-body'> 
                    <div className='body-left'>
                        <Navigate colName='homeNavManage'/>
                    </div>
                    {bodyRight}
                </div>
                {this.state.showAdModal ? this.renderAdModal(): null}
                {this.renderDelModal()}
            </div>
        ); 
    }
};


export default HomeNavManage;

class NavsItem extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            id: this.props.editId,
            repOpsTitle1: '指向h5页面',
            status1: 1,
            repOpsTitle2: '首页',
            status2: 1,
            navName: '',    //导航按钮的名称
            linkUrl: '',    //导航的链接
            picUrl: '',     //导航图标的链接
            navOrder: 0,    //导航的顺序序号
            navStatus: 0,   //导航的审核状态
            navTarget: 1    //导航的显示方式，首页1还是第二页2
        };
        this._bind.apply(this, ['onRepOPsSelect1','onRepOPsSelect2',
            'handleNavOrderChange',
            'handleNavNameChange','handleLinkUrlChange',
            'openFile']);
    }

    _bind (...methods) {
        methods.forEach( (method)=> this[method] = this[method].bind(this));
    }

    componentDidMount() {
        let _this = this;

        if(this.props.type === 'edit'){
            let id = this.props.editId;

            $.getJSON(`${globalConfig.baseUrl}/api/nav/${id}`, (json, textStatus) => {
                // console.log(json);
                // if (0 != json.errCode) {
                //     return;
                // }
                let {createTime,id,linkUrl,name,
                    oaname,order,picUrl,
                    status,target,updateTime} = json;
                this.setState({
                    repOpsTitle1: util.changeStatusToShow(linkUrl).stName,
                    status1: util.changeStatusToShow(linkUrl).st,
                    repOpsTitle2: target==1 ? '首页': '第二页',
                    status2: target,
                    navName: name,     //导航按钮的名称
                    linkUrl: util.changeStatusToShow(linkUrl).showUrl,    //导航的链接
                    picUrl: picUrl,     //导航图标的链接
                    navOrder: order,   //导航的顺序序号
                    navStatus: status,  //导航的审核状态
                    navTarget: target   //导航的显示方式，首页还是第二页
                });
                
            });
        }
        
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
                img.onload = function() {
                    if (this.width != 80 || this.height != 80) {
                        _this.refs.Toast.show('图片尺寸不符合80*80规格');
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
                                console.log(json.errCode);
                                if(json.errCode == '0'){
                                    $(_this.refs.fileIcon).attr('src',json.data.url);
                                    _this.setState({
                                        picUrl: json.data.url
                                    })
                                }
                            } 
                        });           
                    }
                }
            };
            reader.readAsDataURL(file);

            this.value = '';    // 清除本次选定的文件，否则下次选择同样文件时，不触发onchange事件
            
            return false; 
        });

    }

    componentWillUnmount() {
        
    }

    openFile () {
        $(this.refs.fileUpload).trigger('click');
    }

    onRepOPsSelect1 (key, evt) {
        var title = ['指向h5页面', '指向原生界面','指向arms界面'][key],
            status1 = [1,2,3][key]; 
        console.log(status1);
        this.setState({repOpsTitle1: title, status1});
    }
    

    onRepOPsSelect2 (key, evt) {
        var title = ['','首页', '第二页'][key],
            status2 = [0,1,2][key]; 
        this.setState({repOpsTitle2: title,status2, navTarget:status2});
    }

    handleNavOrderChange(event) {
        this.setState({navOrder: event.target.value});
    }
    handleNavNameChange(event) {
        this.setState({navName: event.target.value});
    }
    handleLinkUrlChange(event) {
        this.setState({linkUrl: event.target.value});
    }

    render () {

        let renderUrlInput = () => {
            let status1 = this.state.status1, _vdom;
            if(status1 === 1){
               _vdom = (<FormGroup>
                    <Col componentClass={ControlLabel} sm={2}>
                        指向h5页面<strong className="prompt">*</strong>
                    </Col>
                    <Col sm={10}>
                        <div>
                           <FormControl type="text"
                                    value={this.state.linkUrl} 
                                    placeholder={'输入h5页面地址，如有参数，以&隔开，例如xxx?x1=xx1&x2=xx2'}
                                    onChange={this.handleLinkUrlChange} 
                                    ref="urlInput"  />
                        </div>
                    </Col>
                </FormGroup>);
            }else if(status1 === 2){
                _vdom = (<FormGroup>
                        <Col componentClass={ControlLabel} sm={2}>
                            指向原生界面<strong className="prompt">*</strong>
                        </Col>
                        <Col sm={10}>
                            <div>
                            <FormControl type="text"
                                        value={this.state.linkUrl}
                                        placeholder={'输入原生界面地址，如有参数，以&隔开，例如xxx?x1=xx1&x2=xx2'}
                                        onChange={this.handleLinkUrlChange}
                                        ref="urlInput"      />
                            </div>
                        </Col>
                    </FormGroup>);
            }else if(status1 === 3){
                 _vdom = (<FormGroup>
                        <Col componentClass={ControlLabel} sm={2}>
                            指向arms界面<strong className="prompt">*</strong>
                        </Col>
                        <Col sm={10}>
                            <div>
                            <FormControl type="text"
                                        value={this.state.linkUrl}
                                        placeholder={'输入arms界面地址，如有参数，以&隔开，例如xxx?x1=xx1&x2=xx2'}
                                        onChange={this.handleLinkUrlChange}
                                        ref="urlInput"      />
                            </div>
                        </Col>
                    </FormGroup>);
            }
            return _vdom;
        }

        return (
            <Form componentClass="fieldset" className='ads-detail-body' horizontal>
                <FormGroup>
                    <Col componentClass={ControlLabel} sm={2}>
                        名称<strong className="prompt">*</strong>
                    </Col>
                    <Col sm={10}>
                        <div>
                            <FormControl
                                ref='nameInput'
                                value={this.state.navName} 
                                onChange={this.handleNavNameChange}  
                                type="text"   />
                        </div>
                    </Col>
                </FormGroup>
                <FormGroup>
                    <Col componentClass={ControlLabel} sm={2}>
                        顺序<strong className="prompt">*</strong>
                    </Col>
                   {
                       this.props.type === 'edit' ? ( <Col sm={2}>
                        <div>
                            <FormControl
                                ref='orderInput'
                                value={this.state.navOrder}
                                 onChange={this.handleNavOrderChange}   
                                type="text"   />
                        </div>
                    </Col>):( <Col sm={2}>
                        <div>
                            <FormControl
                                ref='orderInput'
                                value={this.state.navOrder} 
                                disabled='true'  
                                type="text"   />
                        </div>
                    </Col>)


                   }
                    <Col componentClass={ControlLabel} sm={2}>
                        显示方式<strong className="prompt">*</strong>
                    </Col>
                    <Col sm={2}>
                        <DropdownButton bsStyle='default' id='repOpsDropdown' onSelect={this.onRepOPsSelect2} title={this.state.repOpsTitle2 || '首页'}>
                            <MenuItem eventKey="1">首页</MenuItem>
                            <MenuItem eventKey="2">第二页</MenuItem>
                        </DropdownButton>
                    </Col>
                </FormGroup>
                <FormGroup>
                    <Col componentClass={ControlLabel} sm={2}>
                        ICO图标<strong className="prompt">*</strong>
                    </Col>
                    <Col sm={7}>
                        <div>
                            <FormControl 
                                ref='iconInput'  
                                type="text"  
                                value={this.state.picUrl} 
                                readOnly="true"   />
                        </div>
                    </Col>
                    <Col sm={2}>
                        <Button bsStyle="info" onClick={this.openFile}>上传图片</Button>
                        <input type='file' id='fileUpload' 
                        ref='fileUpload' style={{"display": "none"}}/>
                    </Col>
                </FormGroup>
                <FormGroup>
                    <Col componentClass={ControlLabel} sm={2}>
                    </Col>
                    <Col sm={3}>
                        <div className="text-line">支持jpg/png格式，RGB模式，单张尺寸（80*80），大小不超过1M</div>
                        <div>
                            <img ref='fileIcon' src={this.state.picUrl} className="home-nav-icon img-rounded" />
                        </div>
                    </Col>
                    <Col sm={2}>
                        
                    </Col>
                </FormGroup>
                <FormGroup>
                    <Col componentClass={ControlLabel} sm={2}>
                        类型<strong className="prompt">*</strong>
                    </Col>
                    <Col sm={3}>
                        <DropdownButton bsStyle='default' id='repOpsDropdown' onSelect={this.onRepOPsSelect1} title={this.state.repOpsTitle1 || '指向h5页面'}>
                            <MenuItem eventKey="0">指向h5页面</MenuItem>
                            <MenuItem eventKey="1">指向原生界面</MenuItem>
                            <MenuItem eventKey="2">指向arms界面</MenuItem>
                        </DropdownButton>
                    </Col>
                </FormGroup>
                { renderUrlInput() }

            <Toast ref='Toast' />

            </Form>   
        );
    }
};






