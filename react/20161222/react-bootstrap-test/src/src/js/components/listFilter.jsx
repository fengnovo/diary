import React from 'react';
import $ from 'jquery';
import { ButtonToolbar, Button, DropdownButton, MenuItem, Form, FormGroup, ControlLabel, FormControl, Glyphicon } from 'react-bootstrap';
import moment from 'moment';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import Immutable from 'immutable';
import globalConfig from '../../globalConfig.json';
import util from '../util';

class ListFilter extends React.Component {
    constructor(props){
        super(props);
    
        this.state = {
            startDate: moment().subtract(29, 'days').startOf('day'),
            endDate: moment().endOf('day'),
            btnColor: [true,false,false,false,false,false]
        };
        this.ranges = {
            '今天': [moment().startOf('day'), moment().endOf('day')],
            '最近7天': [moment().subtract(6, 'days').startOf('day'), moment().endOf('day')],
            '最近30天': [moment().subtract(29, 'days').startOf('day'), moment().endOf('day')],
            '本月': [moment().startOf('month').startOf('day'), moment().endOf('month')]
        };

        this._bind.apply(this, ['handleEvent', 'doQuery', '_renderForm', 'onInfoStatusSelect', 'onColTypeSelect', 'onColStatusSelect', 'onRepStatusSelect', 'onSearchSourceSelect']);
    }

    _bind (...methods) {
        methods.forEach( (method)=> this[method] = this[method].bind(this));
    }

    componentDidMount() {
        var {autoGet} = this.props, oaUser = util.getOaUser();

        autoGet && oaUser && this.doQuery(this.props.pageName || this.props.colName);
    }

    componentWillUnmount() {
        
    }

    handleEvent (event, picker) {
        this.setState({
            startDate: picker.startDate,
            endDate: picker.endDate
        });
    }

    onInfoStatusSelect (key, evt) {
        var select = globalConfig.dropdown.infoStatus[key],
            dropdownTitle = select.name,
            status = select.key;

        this.setState({dropdownTitle, status});
    }

    onColTypeSelect (key, evt) {
        var title = ['全部', '固定栏目', '非固栏目'][key],
            fixed = ['-1', '1', '0'][key];

        this.setState({colTypeTitle: title, fixed});

    }

    onColStatusSelect (key, evt) {
        var title = ['全部', '已上线', '已下线'][key],
            status = ['-1', '40', '80'][key];

        this.setState({colStatusTitle: title, status});
    }

    onRepStatusSelect (key, evt) {
        var title = ['全部', '未审核', '已核实', '不实举报'][key],
            status = ['-1', '0', '40', '80'][key];

        this.setState({repStatusTitle: title, status});
    }

    onSearchSourceSelect (key, evt) {
        var select = globalConfig.dropdown.searchSource[key],
            title = select.name,
            source = select.key;

        this.setState({searchSourceTitle: title, source});
    }

    doQuery (label,index) {
        if ('function' != typeof this.props.getTableData) {
            return null;
        }
        // 取查询条件
        var option, $form = $(this.refs.listFilter);
        var id, title, author, status, fixed, beginTime, endTime;

        switch (label) {
            case 'infoManage':
                beginTime = this.state.startDate.unix();
                endTime = this.state.endDate.unix(); // unix返回的时间是s，不是ms
                
                id = $form.find('#infoId').val();
                title = $form.find('#infoTitle').val();
                status = this.state.status || -1;

                option = {
                    id, title, status, //1草稿中等
                    beginTime, endTime,
                    page: 1,
                    pageSize: globalConfig.pageSize || 20
                };

                // !id && delete option.id;
                // !title && delete option.title;
                // !status && delete option.status;

                this.props.getTableData(option);
                break;

            case 'colsManage':
                id = $form.find('#colId').val();
                title = $form.find('#colTitle').val();
                status = this.state.status || -1;
                fixed = this.state.fixed || -1;

                option = {
                    id, title, status, fixed,
                    // status: null,    null全部, 40 已上线, 80 已下线
                    // fixed: null,      null全部, 1 固定栏目, 0 非固栏目
                    page: 1,
                    pageSize: globalConfig.pageSize || 20
                };
                this.props.getTableData(option);
                break;

            case 'infoSearch':
                title = $form.find('#titleKey').val();
                author = $form.find('#author').val();
                beginTime = this.state.startDate.unix();
                endTime = this.state.endDate.unix(); // unix返回的时间是s，不是ms
                
                var grade, source = this.state.source || 0;

                if ('null' == source) {
                    source = undefined;
                }
                else if (0 == source) {
                    grade = 1;
                    source = undefined;
                }

                option = {
                    title, author, source, 
                    grade, status: 40,    // null全部, 40 已上线, 80 已下线
                    beginTime, endTime,
                    page: 1,
                    pageSize: 50
                };
                this.props.getTableData(option);
                break;

            case 'reportManage':
                beginTime = this.state.startDate.unix();
                endTime = this.state.endDate.unix(); // unix返回的时间是s，不是ms

                id = $form.find('#reportId').val();
                title = $form.find('#articleId').val();
                status = this.state.status || -1;                

                option = {
                    id, articleId: title, status,
                    beginTime, endTime,
                    page: 1,
                    pageSize: globalConfig.pageSize || 20
                };
                this.props.getTableData(option);
                break;

            case 'commentManage':
                option = {
                    // status: null,    null全部, 40 已上线, 80 已下线
                    // type: null,      null全部, 40 固定栏目, 80 非固栏目
                    page: 1,
                    pageSize: globalConfig.pageSize || 20
                };
                this.props.getTableData(option);
                break;

            case 'adsManage':
                if(index !== undefined){
                    let temArr = [false,false,false,false,false,false];
                    temArr[index] = true;
                    this.setState({
                        btnColor: temArr
                    });
                }
                /*
                    const (
                        AD_CATEGORY_BANNER    = 1 //轮播图广告
                        AD_CATEGORY_TEXT      = 2 //文字条广告
                        AD_CATEGORY_FOURGRIDS = 3 //四方格广告
                    ) 
                */
                option = {
                    category: index || 0,
                    page: 1,
                    pageSize: globalConfig.pageSize || 20
                };
                this.props.getTableData(option);
                break;

            case 'homeNavManage':
                option = {
                    // status: null,    null全部, 40 已上线, 80 已下线
                    // type: null,      null全部, 40 固定栏目, 80 非固栏目
                    page: 1,
                    pageSize: globalConfig.pageSize || 20
                };
                this.props.getTableData(option);
                break;

            case 'hotQuesManage':
                option = {
                    // status: null,    null全部, 40 已上线, 80 已下线
                    // type: null,      null全部, 40 固定栏目, 80 非固栏目
                    page: 1,
                    pageSize: globalConfig.pageSize || 20
                };
                this.props.getTableData(option);
                break;

            default:
                 // statements_def
                break;
        }
    }

    _renderForm () {
        var state = this.state;
        var start = state.startDate.format('YYYY-MM-DD');
        var end = state.endDate.format('YYYY-MM-DD');
        var dateRangeStr = start + ' - ' + end;

        if (start === end) {
            dateRangeStr = start;
        }

        var switchLabel = (this.props.pageName || this.props.colName), form;

        switch (switchLabel) {
            case 'infoManage':
                var infoStatus = globalConfig.dropdown.infoStatus;
                var dropdown = (
                    <DropdownButton bsStyle='default' id='infoStatusDropdown' onSelect={this.onInfoStatusSelect} title={state.dropdownTitle || infoStatus[0].name}>
                        {infoStatus.map((item, i) => (<MenuItem key={item.key} eventKey={i}>{item.name}</MenuItem>))}
                    </DropdownButton>
                );

                form = (
                    <Form componentClass="fieldset" inline className="list-filter">
                        <FormGroup controlId="infoId">
                            <ControlLabel>资讯ID：</ControlLabel>{' '}
                            <FormControl type="text" />
                        </FormGroup>
                        <FormGroup controlId="infoTitle">
                            <ControlLabel>资讯标题：</ControlLabel>{' '}
                            <FormControl type="text" />
                        </FormGroup>
                        <label>创建日期：</label>{' '}
                        <DateRangePicker className='date-picker' startDate={state.startDate} endDate={state.endDate} ranges={this.ranges} onEvent={this.handleEvent}>
                            <Button className="date-picker-btn">
                                <div className="pull-left"><Glyphicon glyph="calendar" /></div>
                                <div className="pull-right">
                                    <span>{dateRangeStr}</span>
                                    <span className="caret"></span>
                                </div>
                            </Button>
                        </DateRangePicker>
                        <label>状态：</label>{' '}
                        {dropdown}
                        <Button bsStyle="info" onClick={this.doQuery.bind(this, 'infoManage')}>查询</Button>
                    </Form>
                );
                break;

            case 'colsManage':
                form = (
                    <Form componentClass="fieldset" inline className="list-filter">
                        <FormGroup controlId="colId">
                            <ControlLabel>栏目ID：</ControlLabel>{' '}
                            <FormControl type="text" />
                        </FormGroup>
                        <FormGroup controlId="colTitle">
                            <ControlLabel>栏目标题：</ControlLabel>{' '}
                            <FormControl type="text" />
                        </FormGroup>
                        <label>类别：</label>{' '}
                        <DropdownButton bsStyle='default' id='colTypeDropdown' onSelect={this.onColTypeSelect} title={state.colTypeTitle || '全部'}>
                            <MenuItem eventKey="0">全部</MenuItem>
                            <MenuItem eventKey="1">固定栏目</MenuItem>
                            <MenuItem eventKey="2">非定栏目</MenuItem>
                        </DropdownButton>
                        <label>状态：</label>{' '}
                        <DropdownButton bsStyle='default' id='colStatusDropdown' onSelect={this.onColStatusSelect} title={state.colStatusTitle || '全部'}>
                            <MenuItem eventKey="0">全部</MenuItem>
                            <MenuItem eventKey="1">已上线</MenuItem>
                            <MenuItem eventKey="2">已下线</MenuItem>
                        </DropdownButton>
                        <Button bsStyle="info" onClick={this.doQuery.bind(this, 'colsManage')}>查询</Button>
                    </Form>
                );
                break;

            case 'infoSearch':
                var searchSource = globalConfig.dropdown.searchSource;
                
                dropdown = (
                    <DropdownButton bsStyle='default' id='searchSourceDropdown' onSelect={this.onSearchSourceSelect} title={state.searchSourceTitle || '精选资讯'}>
                        {searchSource.map((item, i) => (<MenuItem key={item.key} eventKey={i}>{item.name}</MenuItem>))}
                    </DropdownButton>
                );
                form = (
                    <Form componentClass="fieldset" inline className="list-filter">
                        <FormGroup controlId="titleKey">
                            <ControlLabel>标题关键字：</ControlLabel>{' '}
                            <FormControl type="text" />
                        </FormGroup>
                        <FormGroup controlId="author">
                            <ControlLabel>作者：</ControlLabel>{' '}
                            <FormControl type="text" />
                        </FormGroup>
                        <label>创建日期：</label>{' '}
                        <DateRangePicker className='date-picker' startDate={state.startDate} endDate={state.endDate} ranges={this.ranges} onEvent={this.handleEvent}>
                            <Button className="date-picker-btn">
                                <div className="pull-left"><Glyphicon glyph="calendar" /></div>
                                <div className="pull-right">
                                    <span>{dateRangeStr}</span>
                                    <span className="caret"></span>
                                </div>
                            </Button>
                        </DateRangePicker>
                        <label>资讯来源：</label>{' '}
                        {dropdown}
                        <Button bsStyle="info" onClick={this.doQuery.bind(this, 'infoSearch')}>查询</Button>
                        <Button bsStyle="info" style={{margin: 0}} onClick={this.props.filterCancel}>取消</Button>
                    </Form>
                );
                break;

            case 'reportManage':
                form = (
                    <Form componentClass="fieldset" inline className="list-filter">
                        <FormGroup controlId="reportId">
                            <ControlLabel>举报ID：</ControlLabel>{' '}
                            <FormControl type="text" />
                        </FormGroup>
                        <FormGroup controlId="articleId">
                            <ControlLabel>资讯ID：</ControlLabel>{' '}
                            <FormControl type="text" />
                        </FormGroup>
                        <label>举报日期：</label>{' '}
                        <DateRangePicker className='date-picker' startDate={state.startDate} endDate={state.endDate} ranges={this.ranges} onEvent={this.handleEvent}>
                            <Button className="date-picker-btn">
                                <div className="pull-left"><Glyphicon glyph="calendar" /></div>
                                <div className="pull-right">
                                    <span>{dateRangeStr}</span>
                                    <span className="caret"></span>
                                </div>
                            </Button>
                        </DateRangePicker>
                        <label>状态：</label>{' '}
                        <DropdownButton bsStyle='default' id='repStatusDropdown' onSelect={this.onRepStatusSelect} title={state.repStatusTitle || '全部'}>
                            <MenuItem eventKey="0">全部</MenuItem>
                            <MenuItem eventKey="1">未审核</MenuItem>
                            <MenuItem eventKey="2">已核实</MenuItem>
                            <MenuItem eventKey="3">不实举报</MenuItem>
                        </DropdownButton>
                        <Button bsStyle="info" onClick={this.doQuery.bind(this, 'reportManage')}>查询</Button>
                    </Form>
                );
                break;

            case 'commentManage':
                form = (
                    <Form componentClass="fieldset" inline className="list-filter">
                        <FormGroup controlId="infoId">
                            <ControlLabel>资讯ID：</ControlLabel>{' '}
                            <FormControl type="text" />
                        </FormGroup>
                        <FormGroup controlId="infoTitle">
                            <ControlLabel>资讯标题：</ControlLabel>{' '}
                            <FormControl type="text" />
                        </FormGroup>
                        <label>创建日期：</label>{' '}
                        <DateRangePicker className='date-picker' startDate={state.startDate} endDate={state.endDate} ranges={this.ranges} onEvent={this.handleEvent}>
                            <Button className="date-picker-btn">
                                <div className="pull-left"><Glyphicon glyph="calendar" /></div>
                                <div className="pull-right">
                                    <span>{dateRangeStr}</span>
                                    <span className="caret"></span>
                                </div>
                            </Button>
                        </DateRangePicker>
                        <label>状态：</label>{' '}
                        <DropdownButton bsStyle='default' id='statusDropdown' title='待审核'>
                            <MenuItem eventKey="1">待审核</MenuItem>
                            <MenuItem eventKey="2">已核实</MenuItem>
                        </DropdownButton>
                        <Button bsStyle="info" onClick={this.doQuery.bind(this, 'commentManage')}>查询</Button>
                    </Form>
                );
                break;

            case 'adsManage':
                form = (
                    <Form componentClass="fieldset" inline className="list-filter">
                        <Button bsStyle={this.state.btnColor[0] ? "info" : "default" } 
                                                   onClick={this.doQuery.bind(this, 'adsManage',0)}>全部</Button>
                        <Button bsStyle={this.state.btnColor[1] ? "info" : "default" } 
                                className="btn-w3" onClick={this.doQuery.bind(this, 'adsManage',1)}>轮播广告</Button>
                        <Button bsStyle={this.state.btnColor[2] ? "info" : "default" } 
                                className="btn-w3" onClick={this.doQuery.bind(this, 'adsManage',2)}>文字条广告</Button>
                        <Button bsStyle={this.state.btnColor[3] ? "info" : "default" } 
                                className="btn-w3" onClick={this.doQuery.bind(this, 'adsManage',3)}>四方格广告</Button>
                    </Form>
                );
                break;

            case 'homeNavManage':
                form = (
                    <Form componentClass="fieldset" inline className="list-filter">
                    </Form>
                );
                break;

            case 'hotQuesManage':
                form = (
                    <Form componentClass="fieldset" inline className="list-filter">
                    </Form>
                );
                break;

            default:
                form = 'listFilter';
                break;
        }

        return form;
    }

    render() {
        return <div ref='listFilter'>{this._renderForm()}</div>;
    }
};

ListFilter.defaultProps = {
    autoGet: true
};


export default ListFilter;
