import React from 'react';
import $ from 'jquery';
import globalConfig from '../../globalConfig.json';
import util from '../util';

import ListFilter from './listFilter';
import MaskModal from './maskModal';
import Detail from './detail';


class InfoSearch extends React.Component {
    constructor(props){
        super(props);
    
        this.state = {    
        };
        
        this._bind.apply(this, ['onInfoItemClick', 'getListData', 'filterCancel', 'closeDetailModal', 'onInfoSelectDone']);
    }

    _bind (...methods) {
        methods.forEach( (method)=> this[method] = this[method].bind(this));
    }

    getListData (option) {
        var url = `${globalConfig.baseUrl}/api/search`;

        $.getJSON(url, option, (json, textStatus) => {
            if (0 != json.errCode) {
                return;
            }

            let list = json.data.map((item, i) => {
                item.ctime = util.dateStrFromUnix(item.createTime || item.publishTime);

                return item;
            });

            this.setState({
                list: list,
                total: json.total
            });
        });
    }

    onInfoItemClick (i) {
        var info = this.state.list[i || 0];

        this.setState({infoId: info.id, info}, ()=> {
            this.refs.MaskModal.open();
        });
    } 

    /*onPageChange (page, sizePerPage) {
        var opt = Object.assign(this.option, {page});
        this.getListData(opt);
    }*/

    filterCancel () {
        this.props.closeSearchModal && this.props.closeSearchModal() ;
    }

    closeDetailModal () {
        this.setState({infoId: undefined});
        // this.refs.MaskModal.close();
    }

    onInfoSelectDone () {
        this.props.onInfoSelectDone(this.state.infoId, this.state.info);

        this.setState({infoId: undefined});
        this.props.closeSearchModal();
    }

    componentDidMount() {

    }

    componentWillUnmount() {
        
    }

    render() {
        var ul, list = this.state.list, _this = this;

        if (!list) {
            ul = <h1 className='filter-hint'>请输入过滤条件查询相关资讯</h1>;
        }
        else if (0 == list.length) {
            ul = <h1 className='filter-hint'>没有查询符合条件的资讯，请重新设定</h1>;
        }
        else {
            ul = (
                <ul className='info-list'>
                    {list.map((item, i) => {
                        let author = item.authors && item.authors[0];

                        return (
                            <li key={item.id} onClick={_this.onInfoItemClick.bind(_this, i)}>
                                <h4 className='title'>{item.title}</h4>
                                <p className='info-meta'>新闻来源：{item.media} &nbsp;&nbsp; 作者：{author ? author.name : '匿名'} &nbsp;&nbsp; 创建时间：{item.ctime}</p>
                            </li>
                        );
                    })}
                </ul>
            );
        }

        var modalInfo = {
            className: 'info-detail-modal',
            btns: [
                {name: '取消', click: this.closeDetailModal},
                {name: '确定', bsStyle: 'primary', click: this.onInfoSelectDone}
            ]
        };

        return (
            <div className='info-search-body'>
                <ListFilter pageName='infoSearch' getTableData={this.getListData} filterCancel={this.filterCancel} autoGet={true} />
                {ul}
                {this.state.infoId ? 
                <MaskModal ref='MaskModal' showModal={true} modalInfo={modalInfo}>
                    <Detail infoId={this.state.infoId}/>
                </MaskModal> : null}
            </div>
        ); 
    }
};

export default InfoSearch;


