import React from 'react';
import $ from 'jquery';
import Immutable from 'immutable';
import globalConfig from '../../globalConfig.json';
import util from '../util';

class Detail extends React.Component {
    constructor(props){
        super(props);
    
        this.state = {
            detailData: props.detailData
        };
    }

    componentDidMount() {
        if (this.props.passive) {
            return;
        }

        var url = `${globalConfig.baseUrl}/query/article/${this.props.infoId}`;

        $.getJSON(url, (json, textStatus) => {
            if (0 != json.errCode) {
                return;
            }

            if (json.data[0] && 0 == json.data[0].errCode) {
                this.setState({
                    detailData: json.data[0].data
                });
            }
        });
    }

    componentWillReceiveProps (nextProps) {
        this.setState({
            detailData: nextProps.detailData
        });
    }

    componentWillUnmount() {
        
    }

    getInfoMeta (infoData) {
        if ($.isEmptyObject(infoData)) {
            return '';
        }

        let author = infoData.authors && infoData.authors[0],
            media = infoData.media ? `新闻来源：${infoData.media} &nbsp;&nbsp;` : '',
            name = (author && author.name) ? `作者：${author.name} &nbsp;&nbsp;` : '',
            certi = (author && author.certiCode) ? `执业编号：${author.certiCode} &nbsp;&nbsp;` : '',
            ctime = util.dateStrFromUnix(infoData.createTime || infoData.publishTime);

        return `${media} ${name} ${certi} 创建时间：${ctime}`;
    }

    render() {
        var infoData = this.state.detailData || {}, meta = this.getInfoMeta(infoData);

        return (
            <div className="info-detail" ref="infoDetail">
                <h3>{infoData.title}</h3>
                <h5>{infoData.subtitle}</h5>
                <p className="info-meta" dangerouslySetInnerHTML={{__html: meta}}></p>
                <article dangerouslySetInnerHTML={{__html: infoData.content}}></article>
            </div>
        );
    }
};


export default Detail;
