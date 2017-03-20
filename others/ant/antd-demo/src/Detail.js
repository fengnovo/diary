import React, { Component } from 'react';
import { Card } from 'antd';
import moment from 'moment';
import reqwest from 'reqwest';

class Detail extends Component {

	constructor (props) {
		super(props);
		this.state = {
			loading: true,
			data : {
				title: "新闻详情",
				source: '',
				edit_time: '',
				reply_count: '',	
				content:'加载中...'
			}
		};
	}

	componentDidMount () {
		// console.log(this.props.params.id);
		this.fetchData();
	}

	fetchData () {
		// console.log(this.props.params);
		reqwest({
	      url: 'http://api.dagoogle.cn/news/single-news',
	      method: 'get',
	      data: {
	        tableNum: this.props.params.tab,
	        news_id: this.props.params.id
	      },
	      type: 'jsonp',
	    }).then((datas) => {
	    	// console.log(datas.data);
			this.setState({
				loading: false,
				title: datas.data.title,
				data : datas.data
			});
	    });
	}

	render() {
		let {title,source,edit_time,reply_count,content} = this.state.data;
		return (
		  <Card loading={this.state.loading} title={title} style={{ width: '100%'}}>
		  	<div>
		      <p>新闻来源：{source}</p>
		      <p>时间：{edit_time ? moment(edit_time*1000).format('YYYY-MM-DD HH:mm:ss') : moment()}</p>
		      <p>评论数：{reply_count}</p>
		    </div>
		    <div dangerouslySetInnerHTML={{__html:content}}></div>
		  </Card>
		);
	}
}

export default Detail;