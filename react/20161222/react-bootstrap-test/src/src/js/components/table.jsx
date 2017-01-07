import React from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import Immutable from 'immutable';
import globalConfig from '../../globalConfig.json';

class Table extends React.Component {
    constructor(props){
        super(props);
    
        this.state = {
            // tableData: props.tableData
        };
        this.selectRowProp =  {
            onSelect: props.tableFun.onRowSelect,
            onSelectAll: props.tableFun.onSelectAll,
            selected: []
        };
        this.options = {
            page: props.tableData.page || 1,
            sizePerPage: globalConfig.pageSize || 20,
            sizePerPageList: [],
            onRowClick: props.tableFun.onRowClick,
            onPageChange: props.tableFun.onPageChange
        };

        props.tableConfig.checkboxMode && (this.selectRowProp.mode = 'checkbox');

        // this._bind.apply(this, ['onPageChange']);
    }

    _bind (...methods) {
        methods.forEach( (method)=> this[method] = this[method].bind(this));
    }

    componentDidMount() {
        
    }

    componentWillUnmount() {
        
    }

    render() {
        var props = this.props;
        var {list=[], total=0}  = props.tableData, tableHeight = props.tableConfig.height;

        if (!tableHeight) {
            tableHeight =  window.innerHeight - 40 - 113 - 36 - 75;  // 40 header, 113 top, 36 bottom, 75 pagination
            tableHeight = Math.min(612, tableHeight);   // 612, 20条数据的高度。取二者较小值，用于滚动   
        }

       
        var columns = [];
        let imgFormatter = (cell, row) =>{
            if(cell != ''){
                return '<img style="width: 80px;" src='+cell+' />';
            }else{
                return '';
            }
        }

         switch (this.props.colName) {
            case 'adsManage':
                columns.push(<TableHeaderColumn columnClassName="dsn" key="id" dataField="id" isKey={true}>ID</TableHeaderColumn>);    
                columns.push(<TableHeaderColumn columnClassName="w1" key="order" dataField="order" isKey={false}>顺序</TableHeaderColumn>); 
                columns.push(<TableHeaderColumn key="categoryName" dataField="categoryName" isKey={false}>所属栏目</TableHeaderColumn>); 
                columns.push(<TableHeaderColumn columnClassName="col" key="name" dataField="name" isKey={false}>名称</TableHeaderColumn>); 
                columns.push(<TableHeaderColumn columnClassName="col" key="linkUrl" dataField="linkUrl" isKey={false}>链接</TableHeaderColumn>); 
                columns.push(<TableHeaderColumn key="beginTime" dataField="beginTime" isKey={false}>开始日期</TableHeaderColumn>); 
                columns.push(<TableHeaderColumn key="endTime" dataField="endTime" isKey={false}>结束日期</TableHeaderColumn>); 
                // columns.push(<TableHeaderColumn key="target" dataField="target" isKey={false}>显示方式</TableHeaderColumn>); 
                columns.push(<TableHeaderColumn key="picUrl" dataField="picUrl" dataFormat={imgFormatter} isKey={false}>图片</TableHeaderColumn>); 
                columns.push(<TableHeaderColumn columnClassName="col" key="content" dataField="content" isKey={false}>内容</TableHeaderColumn>); 
            break;
             case 'homeNavManage':
                columns.push(<TableHeaderColumn columnClassName="dsn" key="id" dataField="id" isKey={true}>ID</TableHeaderColumn>);    
                columns.push(<TableHeaderColumn columnClassName="w1" key="order" dataField="order" isKey={false}>顺序</TableHeaderColumn>); 
                columns.push(<TableHeaderColumn columnClassName="col" key="name" dataField="name" isKey={false}>名称</TableHeaderColumn>); 
                columns.push(<TableHeaderColumn columnClassName="col" key="linkUrl" dataField="linkUrl" isKey={false}>链接</TableHeaderColumn>); 
                columns.push(<TableHeaderColumn key="target" dataField="target" isKey={false}>显示方式</TableHeaderColumn>); 
                columns.push(<TableHeaderColumn key="picUrl" dataField="picUrl" dataFormat={imgFormatter} isKey={false}>图标</TableHeaderColumn>); 
                break;

            case 'hotQuesManage':
                columns.push(<TableHeaderColumn columnClassName="dsn" key="id" dataField="id" isKey={true}>ID</TableHeaderColumn>);    
                columns.push(<TableHeaderColumn columnClassName="w1" key="order" dataField="order" isKey={false}>顺序</TableHeaderColumn>); 
                columns.push(<TableHeaderColumn columnClassName="col" key="name" dataField="name" isKey={false}>名称</TableHeaderColumn>); 
                columns.push(<TableHeaderColumn columnClassName="col" key="content" dataField="content" isKey={false}>内容</TableHeaderColumn>); 
                columns.push(<TableHeaderColumn key="createTime" dataField="createTime" isKey={false}>添加时间</TableHeaderColumn>); 
                break;

            default:
                columns = props.tableConfig.column.map((item, i) => {
                    return (
                        <TableHeaderColumn key={item.field} dataField={item.field} isKey={item.isKey}>{item.name}</TableHeaderColumn>       
                    );
                });
                break;
        }
        
        return (
            <BootstrapTable ref='tableContainer'
                data={list} height={tableHeight} remote={ true } fetchInfo={ { dataTotalSize: total } }
                selectRow={this.selectRowProp} striped={true} hover={true} condensed={true} 
                ignoreSinglePage={true} pagination={true} options={this.options} >
                {columns}
            </BootstrapTable>
        );
    }
};

Table.defaultProps = {
    tableConfig: {},
    tableFun: {},
    tableData: {}
};

export default Table;
