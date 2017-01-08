import React from 'react';
import $ from 'jquery';
import Immutable from 'immutable';
import globalConfig from '../../globalConfig.json';
import util from '../util';

import Header from '../components/header';
import Navigate from '../components/navigate';
import ListFilter from '../components/listFilter';
import Table from '../components/table';
import Footer from '../components/footer';
import MaskModal from '../components/maskModal';


class colsManage extends React.Component {
    constructor(props){
        super(props);

        let oaUser = util.getOaUser();

        if (!oaUser || oaUser.role != 100) {
            window.location.href = '/';
        }
    
        this.state = {
            
        };
        this.option = {
            // page: 1
        };
        this._bind.apply(this, ['onRowClick', 'getTableData', 'onPageChange']);
    }

    _bind (...methods) {
        methods.forEach( (method)=> this[method] = this[method].bind(this));
    }

    componentDidMount() {
        
    }

    componentWillUnmount() {
        
    }

    onRowClick (row) {
        row.op && window.open(`#/editColBanner/${row.id}`);
        // window.location.href = `#/infoDetail/${row.id}`;
    }

    getTableData (option) {
        var _this = this;
        var url = `${globalConfig.baseUrl}/api/columns`;

        this.option = option;   // listFilter 查询时，缓存查询条件，翻页时用

        $.getJSON(url, option, function(json, textStatus) {
            let list = json.data.map((item, i) => {
                item.typeName = (item.fixed ? '固定栏目' : '非定栏目');
                item.statusName = '已上线';
                item.title == '要闻' && (item.op = '编辑banner');   // 产品说目前这里只可配置要闻的banner
                return item;
            });
            _this.setState({
                list: list,
                total: json.total
            });
        });
    }

    onPageChange (page, sizePerPage) {
        var opt = Object.assign(this.option, {page});
        this.getTableData(opt);
    }

    render() {
        var tableConfig = globalConfig.tableConfig.colsTable;
        var tableFun = {
            onRowClick: this.onRowClick,
            onPageChange: this.onPageChange
        };
        var tableData = {
            list: this.state.list,
            page: this.option.page || 1,
            total: this.state.total
        };

        return (
            <div className="cols-manage-page page-wrap" ref="colsManage">
                <Header colName='colsManage'/>
                <div className='cols-manage-body page-body'> 
                    <div className='body-left'>
                        <Navigate colName='colsManage' />
                    </div>
                    <div className='body-right'>
                        <ListFilter colName='colsManage' getTableData={this.getTableData} />
                        <Table tableConfig={tableConfig} tableFun={tableFun} tableData={tableData} />
                        <Footer />
                    </div>
                </div>
            </div>
        );
    }
};


export default colsManage;


 