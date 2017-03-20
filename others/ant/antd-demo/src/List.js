import React, { Component } from 'react';
import { Table } from 'antd';
import moment from 'moment';
// import fetchJsonp from 'fetch-jsonp';
import reqwest from 'reqwest';
import './List.css';

let tabType;

const columns = [{
  title: '图片',
  dataIndex: 'top_image',
  key: 'top_image',
  render: (text, record) => (
    record.top_image ? <img className="new-img" src={record.top_image} alt={record.source} /> : null
  ),
}, {
  title: '标题',
  dataIndex: 'title',
  key: 'title',
}, {
  title: '时间',
  key: 'edit_time',
  dataIndex: 'edit_time',
  render: (text, record) => {
  	let openUrl = (news_id) =>{
	  	window.open(location.href+'detail/'+tabType+'/'+news_id)
	 };
  	return (
	    <span>
	      <a href="javascript:void(0);" onClick={openUrl.bind(this,record.news_id)}>{ 
	      	record.edit_time ? moment(record.edit_time*1000).format('YYYY-MM-DD HH:mm:ss') 
	      		: moment()}</a>
	    </span>
	  )},
}, {
  title: '简介',
  key: 'digest',
  
  render: (text, record) => {
	  let openUrl = (news_id) =>{
	  	window.open(location.href+'detail/'+tabType+'/'+news_id)
	  };
	  return (
	    <span>
	      <a href="javascript:void(0);" onClick={openUrl.bind(this,record.news_id)}>{record.digest}</a>
	    </span>
	  )
  },
}];

class List extends Component {

	constructor (props) {
		super(props);
		this.state = {
			data : [],
			pagination: {},
			loading: false
		};
		this.fetchData = this.fetchData.bind(this);
		this.handleTableChange = this.handleTableChange.bind(this);
	}

	componentDidMount () {
		tabType = this.props.tabType;
		this.fetchData({
	      tableNum: this.props.tabType,
	      pagesize: this.state.pagination.pageSize || 10
	    });
	}

	fetchData (params) {
		// console.log('params:', params);
    	this.setState({ loading: true });
		// fetchJsonp('http://api.dagoogle.cn/news/get-news',
		// 	{
		// 	    data: {
		// 	    	...params
		// 	    }
		// 	  })
		// 	.then(respose => respose.json())
		// 	.then(datas => {
		// 		const pagination = { ...this.state.pagination };
  //     			pagination.total = 200;
		// 		this.setState({
		// 			data : datas.data,
		// 			pagination: pagination,
		// 			loading: false
		// 		});
		// 	});

		reqwest({
	      url: 'http://api.dagoogle.cn/news/get-news',
	      method: 'get',
	      data: {
	        ...params,
	      },
	      type: 'jsonp',
	    }).then((datas) => {
	      const pagination = { ...this.state.pagination };
      			pagination.total = 200;
				this.setState({
					data : datas.data,
					pagination: pagination,
					loading: false
				});
	    });
	}

	handleTableChange (pagination, filters, sorter) {
	    const pager = { ...this.state.pagination };
	    pager.current = pagination.current;
	    this.setState({
	      pagination: pager,
	    });
	    this.fetchData({
	      tableNum: this.props.tabType,
	      pagesize: pagination.pageSize,
	      page: pagination.current,
	      sortField: sorter.field,
	      sortOrder: sorter.order,
	      ...filters,
	    });
	}

	render() {
		return (
		  <Table columns={columns} 
		  		 dataSource={this.state.data}
		  		 pagination={this.state.pagination}
        		 loading={this.state.loading} 
        		 onChange={this.handleTableChange}
        	/>
		);
	}
}

export default List;