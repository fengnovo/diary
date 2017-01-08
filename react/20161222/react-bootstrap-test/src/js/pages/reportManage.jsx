import React from 'react';
import { Form, FormGroup, Col, ControlLabel, DropdownButton, MenuItem } from 'react-bootstrap';
import $ from 'jquery';
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

class ReportManage extends React.Component {
    constructor(props){
        super(props);

        let oaUser = util.getOaUser();

        if (!oaUser || oaUser.role != 100) {
            window.location.href = '/';
        }
    
        this.state = {
            
        };
        this.option = {

        };
        this.dataToOp = {

        };

        this._bind.apply(this, ['onRowClick', 'onRowSelect', 'onSelectAll', 'doDelete', 'doCheck', 'getTableData', 'onPageChange', 
            'renderDelModal', 'ensureDelete', 'closeDelModal', 'renderModal', 'save', 'closeModal']);
    }

    _bind (...methods) {
        methods.forEach( (method)=> this[method] = this[method].bind(this));
    }

    componentDidMount() {
        
    }

    componentWillUnmount() {
        
    }

    onRowClick (row) {
        this.setState({reportItemData: row}, ()=> {
            this.refs.MaskModal && this.refs.MaskModal.open();
        });
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
        if (this.dataToOp && $.isEmptyObject(this.dataToOp)) {
            this.refs.listOps.showToast();
            return;
        }

        this.refs.delMaskModal && this.refs.delMaskModal.open();
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
                url: `${globalConfig.baseUrl}/api/report/${row.id}`, 
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

    getTableData (option) {
        var _this = this;
        var url = `${globalConfig.baseUrl}/api/reports`;

        this.option = option;   // listFilter 查询时，缓存查询条件，翻页时用

        $.getJSON(url, option, function(json, textStatus) {
            if (0 != json.errCode) {
                return;
            }

            let reportStatus = {'0': '未审核', '40': '已核实', '80': '不实举报'};
            let list = json.data;
            
            list.map((item, i) => {
                item.statusName = reportStatus[item.status];
                item.title = item.articleInfo && item.articleInfo.title;
                item.ctime = util.dateStrFromUnix(item.createTime);

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

    renderDelModal () {
        let btns = [
            {name: '确定', bsStyle: 'primary', click: this.ensureDelete},
            {name: '取消', click: this.closeDelModal}
        ]
        let modalInfo = {
            className: 'info-delete-modal',
            title: '确定删除所选的内容吗？',
            btns: btns
        }

        return (
            <MaskModal ref='delMaskModal' showModal={false} modalInfo={modalInfo}>                
            </MaskModal>
        );
    }

    ensureDelete () {
        this.doCheck(100);
        this.closeDelModal();
    }

    closeDelModal () {
        this.refs.delMaskModal && this.refs.delMaskModal.close();
    }

    renderModal (reportItemData) {
        if (!reportItemData) {
            return null;
        }

        let btns = [{name: '取消', click: this.closeModal}];

        if (0 == reportItemData.status) {
            btns.unshift({name: '保存并提交', bsStyle: 'primary', click: this.save});
        } 

        let modalInfo = {
            className: 'report-item-modal',
            btns: btns
        };

        return (
            <MaskModal ref='MaskModal' showModal={true} modalInfo={modalInfo}> 
                <ReportItem ref='reportItem' reportId={reportItemData.id} />                
            </MaskModal>
        );
    }

    save () {
        let status = this.refs.reportItem.state.status;
        let id = this.state.reportItemData.id;

        $.ajax({
            url: `${globalConfig.baseUrl}/api/report/${id}`,
            type: 'PUT',
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify({status})
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
            this.closeModal();
        });
    }

    closeModal () {
        this.refs.MaskModal && this.refs.MaskModal.close();
    }

    render() {
        var tableConfig = globalConfig.tableConfig.reportTable;
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
            doDelete: this.doDelete,
            doCheck: this.doCheck
        };

        return (
            <div className="report-manage-page page-wrap" ref="reportManage">
                <Header colName='reportManage'/>
                <div className='report-manage-body page-body'> 
                    <div className='body-left'>
                        <Navigate colName='reportManage' />
                    </div>
                    <div className='body-right'>
                        <ListFilter colName='reportManage' getTableData={this.getTableData} />
                        <ListOps colName='reportManage' opFun={opFun} ref='listOps'/>
                        <Table tableConfig={tableConfig} tableFun={tableFun} tableData={tableData}/>
                        <Footer />
                    </div>
                </div>
                {this.renderModal(this.state.reportItemData)}
                {this.renderDelModal()}
            </div>
        );
    }
};


export default ReportManage;

class ReportItem extends React.Component {
    constructor(props){
        super(props);
    
        this.state = {
            
        };

        this._bind.apply(this, ['getInfoMeta', 'onRepOPsSelect']);
    }

    _bind (...methods) {
        methods.forEach( (method)=> this[method] = this[method].bind(this));
    }

    componentDidMount() {
        let id = this.props.reportId;

        $.getJSON(`${globalConfig.baseUrl}/api/report/${id}`, (json, textStatus) => {
            if (0 != json.errCode) {
                return;
            }

            let reportData = json.data,
                title = {'40': '已核实', '80': '不实举报'}[reportData.status] || '已核实';

            this.setState({
                reportData,
                repOpsTitle: title,
                status: 40
            });
        });
    }

    componentWillUnmount() {
        
    }

    getInfoMeta (infoData) {
        if ($.isEmptyObject(infoData)) {
            return '';
        }

        let author = infoData.authors && infoData.authors[0],
            ctime = util.dateStrFromUnix(infoData.createTime || infoData.publishTime);

        return `新闻来源：${infoData.media} &nbsp;&nbsp; 作者：${author ? author.name : '匿名'} &nbsp;&nbsp; 创建时间：${ctime}`;
    }

    onRepOPsSelect (key, evt) {
        var title = ['已核实', '不实举报'][key],
            status = [40, 80][key]; 

        this.setState({repOpsTitle: title, status});
    }

    render () {
        let reportData = this.state.reportData || {},
            info = reportData.articleInfo || {},

            title = info.title,
            meta = this.getInfoMeta(info);

        return (
            <Form componentClass="fieldset" className='report-detail-body' horizontal>
                <FormGroup>
                    <Col componentClass={ControlLabel} sm={2}>
                        举报内容：
                    </Col>
                    <Col sm={10}>
                        <div>
                            <h5 className='info-title'>{title}</h5>
                            <p className='info-meta' dangerouslySetInnerHTML={{__html: meta}}></p>
                        </div>
                    </Col>
                </FormGroup>
                <FormGroup>
                    <Col componentClass={ControlLabel} sm={2}>
                        举报原因：
                    </Col>
                    <Col sm={10}>
                        <div>
                            <p className='report-cont'>{reportData.content}</p>
                        </div>
                    </Col>
                </FormGroup>
                <FormGroup>
                    <Col componentClass={ControlLabel} sm={2}>
                        联系方式：
                    </Col>
                    <Col sm={10}>
                        <div>
                            <p className='report-contact'>{reportData.contact}</p>
                        </div>
                    </Col>
                </FormGroup>
                <FormGroup>
                    <Col componentClass={ControlLabel} sm={2}>
                        举报处理：
                    </Col>
                    <Col sm={3}>
                        <DropdownButton bsStyle='default' id='repOpsDropdown' onSelect={this.onRepOPsSelect} title={this.state.repOpsTitle || '已核实'}>
                            <MenuItem eventKey="0">已核实</MenuItem>
                            <MenuItem eventKey="1">不实举报</MenuItem>
                        </DropdownButton>
                    </Col>
                </FormGroup>
            </Form>
        );
    }
};
