import React, { Component } from 'react';
import { Card } from 'antd';
import reqwest from 'reqwest';

class Detail extends Component {

	constructor (props) {
		super(props);
		this.state = {
			data : {}
		};
	}

	componentDidMount () {
		this.fetchData();
	}

	fetchData () {
		reqwest({
	      url: 'http://api.dagoogle.cn/news/single-news',
	      method: 'get',
	      data: {
	        tableNum: this.props.tableNum,
	        news_id: this.props.news_id
	      },
	      type: 'jsonp',
	    }).then((datas) => {
			this.setState({
				data : datas.data
			});
	    });
	}

	render() {
		return (
		  <Card loading title="Card title" style={{ width: '34%' }}>
		    Whatever content
		  </Card>
		);
	}
}

export default Detail;