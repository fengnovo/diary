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


let chan = cg => {
    if(cg==1){
        return '轮播广告'
    }
    if(cg==2){
        return '文字条广告'
    }
    if(cg==3){
        return '四方块广告'
    }
}

let selectCategory;

class AdsItem extends React.Component {
    constructor(props){
        super(props);
        console.log(chan(this.props.curCategory));
        this.state = {
            repOpsTitle1: chan(this.props.curCategory),
            status1: this.props.curCategory,
            repOpsTitle2: '3',
            status2: 0,
            repOpsTitle3: '当前页',
            status3: 0,
            repOpsTitle4: '请选择',
            status4: true,
            repOpsTitle5: '默认',
            status5: 0,
            beginTime: moment().subtract(29, 'days').startOf('day'),//moment(new Date()).format('YYYY-MM-DD'),
            category: this.props.curCategory,
            content:"",
            endTime: moment().endOf('day'),//moment(new Date()).format('YYYY-MM-DD'),
            linkUrl: "",
            name: "",
            order: 0,       //顺序  越小越大
            picUrl: "",
            status:0,       //审核状态
            target:1,       //显示方式
            linkType:0,     //打开模式，0是默认从清单里面选择跳转链接，1是自定义跳转链接
            repOpsTitle6: '指向h5页面',
            status6:1       //选择自定义里的h5页面1,native界面2,arms界面3
        };

        selectCategory = this.props.curCategory;
        this._bind.apply(this, ['onRepOPsSelect1','onRepOPsSelect2','onRepOPsSelect3',
        'onRepOPsSelect4','onRepOPsSelect5','onRepOPsSelect6', 'upfile',
        'handleAdNameChange','handleAdOrderChange','handleContentChange','handleLinkUrlChange',
        'openFile','handleEvent']);

    }

    _bind (...methods) {
        methods.forEach( (method)=> this[method] = this[method].bind(this));
    }

    componentDidMount() {
        let _this = this;
        if(this.props.type === 'edit'){
            let id = this.props.editId;
            console.log(id);
            $.getJSON(`${globalConfig.baseUrl}/api/ad/${id}`, (json, textStatus) => {
                let {beginTime,category,content, endTime,linkUrl,
                    name,order,picUrl,status,target,linkType} = json;
                let loadState;
                selectCategory = category;
                if(linkType === 1){ //自定义的
                    loadState = {
                        status4: false, //显示自定义，指向h5页面或是指向原生界面
                        repOpsTitle5: '自定义',
                        status5: 1,
                        repOpsTitle6: util.changeStatusToShow(linkUrl).stName,
                        status6: util.changeStatusToShow(linkUrl).st,
                        id: id,
                        beginTime:  moment(new Date(beginTime*1000)).endOf('day'),//,
                        category: category,
                        repOpsTitle1: chan(category), 
                        status1: category,
                        content: content,
                        endTime: moment(new Date(endTime*1000)).endOf('day'),//,
                        linkUrl: util.changeStatusToShow(linkUrl).showUrl,
                        name: name,
                        order: order,
                        picUrl: picUrl,
                        status: status,
                        target: target,
                        linkType: linkType
                    };
                }else{
                    loadState = {
                        id: id,
                        beginTime:  moment(new Date(beginTime*1000)).endOf('day'),//,
                        category: category,
                        repOpsTitle1: chan(category), 
                        status1: category,
                        content: content,
                        endTime: moment(new Date(endTime*1000)).endOf('day'),//,
                        linkUrl: linkUrl,
                        name: name,
                        order: order,
                        picUrl: picUrl,
                        status: status,
                        target: target,
                        repOpsTitle4:  util.changeStatusToShow(linkUrl).showUrl,
                        linkType: linkType
                    };
                }
                this.setState(loadState);
                console.log({
                    beginTime: moment(new Date(beginTime*1000)).endOf('day'),
                    category: category,
                    content: content,
                    endTime: moment(new Date(endTime*1000)).endOf('day'),
                    linkUrl: linkUrl,
                    name: name,
                    order: order,
                    picUrl: picUrl,
                    status: status,
                    target: target,
                    linkType: linkType
                });
            });

        }
        
        this.upfile ();
    }
    

    componentWillUnmount() {
        
    }

    upfile () {
        let _this = this;
        $(this.refs.fileUpload).unbind().bind('change', function() { 
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
                    console.log('selectCategory==1-------'+(selectCategory==1));
                    let uploadImgFunc = () => {
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
                                
                                if(json.errCode == '0'){
                                    console.log(json.data.url);
                                    console.log(json);
                                    $(_this.refs.adImgInput).attr('src',json.data.url);
                                    _this.setState({
                                        picUrl: json.data.url
                                    })
                                }
                            } 
                        });  
                    }
                    if (selectCategory==1) {
                        if(this.width != 750 || this.height != 260){
                            _this.refs.Toast.show('图片尺寸不符合750*260规格');
                        }else{
                            uploadImgFunc();
                        }
                    }else{
                        if(this.width != 144 || this.height != 84){
                            _this.refs.Toast.show('图片尺寸不符合144*84规格');
                        }else{
                            uploadImgFunc();
                        }
                    }
                }
            };
            reader.readAsDataURL(file);

            this.value = '';    // 清除本次选定的文件，否则下次选择同样文件时，不触发onchange事件
            
            return false; 
        });
    }

    openFile () {
        $(this.refs.fileUpload).trigger('click');
    }

    handleEvent (event, picker) {
        this.setState({
            beginTime: picker.startDate,
            endTime: picker.endDate
        });
        console.log({
            beginTime: picker.startDate,
            endTime: picker.endDate
        });
    }

    onRepOPsSelect1 (key, evt) {            //三种广告方式切换
        this.setState({
            repOpsTitle1: chan(key), 
            status1: key,
            category: parseInt(key),
            picUrl: ""
        });
        selectCategory = parseInt(key);
        setTimeout(()=> {this.upfile();},100);
    }

    onRepOPsSelect2 (key, evt) {            
        var title = ['1', '2', '3'][key],
            status2 = [0,1,2][key]; 

        this.setState({repOpsTitle2: title, status2});
    }

    onRepOPsSelect3 (key, evt) {                    
        var title = ['当前页', 'xx页'][key],
            status3 = [0,1,2][key]; 

        this.setState({repOpsTitle3: title, status3});
    }

    onRepOPsSelect4 (key, evt) {        //默认让用户从功能清单中选择
        let text;
        this.props.opList.map((i)=>{
            if(i.id == key){
                text = i.linkUrl;
            }
        });
        if(text) {
            this.setState({
                repOpsTitle4: util.changeStatusToShow(text).showUrl,
                linkUrl: text
            });
        }
        console.log({
                repOpsTitle4: util.changeStatusToShow(text).showUrl,
                linkUrl: text
            });
    }

    onRepOPsSelect5 (key, evt) {    //设置选择默认还是自定义linkType

        let status4 = true,linkType = 0;
        console.log(key);
        if(key == '2'){
            status4 = false;
            linkType = 1;
            this.setState({
                linkUrl: '',
                repOpsTitle4: '请选择'
            });
        }
        this.setState({
            repOpsTitle5: status4?'默认':'自定义',
            linkType, status4});
    }

    onRepOPsSelect6 (key, evt) {
        var title = ['指向h5页面', '指向原生界面','指向arms界面'][key],
            status6 = [1,2,3][key]; 
            console.log(status6);
        this.setState({repOpsTitle6: title, status6});
    }

    handleAdNameChange (event) {
        this.setState({name: event.target.value});
    }

    handleAdOrderChange (event) {
        this.setState({order: event.target.value});
    }

    handleContentChange (event) {
        this.setState({content: event.target.value});
    }

    handleLinkUrlChange (event) {
        this.setState({linkUrl: event.target.value});
    }

    render () {
        let state = this.state;

        let beginDate = moment(state.beginTime).format('YYYY-MM-DD');
        let endDate = moment(state.endTime).format('YYYY-MM-DD');
        let dateRangeStr = beginDate + ' - ' + endDate;

        let opListArr = [];
        this.props.opList.map((i)=>{
            opListArr.push(<MenuItem eventKey={i.id} key={i.id}>{i.name+' '+i.linkUrl}</MenuItem>);
        });

        let renderAdNav = () => {
            console.log(this.state.status6);
            let tmp;
            if(this.state.status6 == 1){
                tmp = (
                    <FormGroup>
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
                    </FormGroup>)
             }else if(this.state.status6 == 2){ 
                 tmp = (
                    <FormGroup>
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
            }else if(this.state.status6 == 3){ 
                 tmp = (
                    <FormGroup>
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
            return tmp;
        }

        let renderAdImgInput = () => {
            let tmp = (this.state.status1 == '0' || this.state.status1 == '1')? (
                            <FormGroup>
                                <Col componentClass={ControlLabel} sm={2}>
                                    广告图片<strong className="prompt">*</strong>
                                </Col>
                                <Col sm={7}>
                                    <div>
                                        <FormControl 
                                        ref='adImgInput'
                                        readOnly="true"   
                                        value={this.state.picUrl} 
                                        type="text"  />
                                    </div>
                                </Col>
                                <Col sm={2}>
                                    <Button bsStyle="info" onClick={this.openFile}>上传图片</Button>
                                    <input type='file' id='fileUpload'
                                    ref='fileUpload' style={{"display": "none"}}/>
                                </Col>
                            </FormGroup>
                            ) : (
                            <FormGroup>
                                <Col componentClass={ControlLabel} sm={2}>
                                    ICO图标<strong className="prompt">*</strong>
                                </Col>
                                <Col sm={7}>
                                    <div>
                                        <FormControl
                                        ref='adImgInput'
                                        readOnly="true"   
                                        value={this.state.picUrl} 
                                        type="text" />
                                    </div>
                                </Col>
                                <Col sm={2}>
                                    <Button bsStyle="info" onClick={this.openFile}>上传图片</Button>
                                    <input type='file' id='fileUpload'
                                    ref='fileUpload' style={{"display": "none"}}/>
                                </Col>
                            </FormGroup>
                    );
            return tmp;
        }

        let renderAdImg = () => {
            let tmp = (this.state.status1 == '0' || this.state.status1 == '1')? (
                        <FormGroup>
                            <Col componentClass={ControlLabel} sm={2}>
                            </Col>
                            <Col sm={3}>
                                <div className="text-line">支持jpg/png格式，RGB模式，单张尺寸（750*260），大小不超过1M</div>
                                <div>
                                    <img ref='fileIcon' src={this.state.picUrl} className="ad-page-banner-img img-rounded" />
                                </div>
                            </Col>
                            <Col sm={2}>
                                
                            </Col>
                        </FormGroup>
                    ) : (
                        <FormGroup>
                            <Col componentClass={ControlLabel} sm={2}>
                            </Col>
                            <Col sm={3}>
                                <div className="text-line">支持jpg/png格式，RGB模式，单张尺寸（144*84），大小不超过1M</div>
                                <div>
                                    <img ref='fileIcon' src={this.state.picUrl} className="ad-page-img img-rounded" />
                                </div>
                            </Col>
                            <Col sm={2}>
                                
                            </Col>
                        </FormGroup>
                    );
            return tmp;
        }
/*
1 //轮播图广告
    AD_CATEGORY_TEXT      = 2 //文字条广告
    AD_CATEGORY_FOURGRIDS = 3 //四方格广告
    AD_CATEOGRY_PIC       = 4 //图片广告
    */
        return (
            <Form componentClass="fieldset" className='ads-detail-body' horizontal>
                <FormGroup>
                    <Col componentClass={ControlLabel} sm={2}>
                        所属栏目<strong className="prompt">*</strong>
                    </Col>
                    <Col sm={10}>
                        <DropdownButton bsStyle='default' style={{'width': '142px'}}  id='repOpsDropdown1' onSelect={this.onRepOPsSelect1} title={this.state.repOpsTitle1 || '轮播广告'}>
                            <MenuItem eventKey="1">轮播广告</MenuItem>
                            <MenuItem eventKey="2">文字条广告</MenuItem>
                            <MenuItem eventKey="3">四方块广告</MenuItem>
                        </DropdownButton>
                    </Col>
                </FormGroup>
                <FormGroup>
                    <Col componentClass={ControlLabel} sm={2}>
                        广告名称<strong className="prompt">*</strong>
                    </Col>
                    <Col sm={3}>
                        <div>
                            <FormControl 
                                ref='nameInput'
                                value={this.state.name} 
                                onChange={this.handleAdNameChange}  
                                type="text" />
                        </div>
                    </Col>
                    <Col componentClass={ControlLabel} sm={1}>
                        顺序<strong className="prompt">*</strong>
                    </Col>
                    {
                       this.props.type === 'edit' ? ( <Col sm={2}>
                            <div>
                                <FormControl
                                    ref='orderInput'
                                    value={this.state.order}
                                    onChange={this.handleAdOrderChange}   
                                    type="text"   />
                            </div>
                        </Col>):( <Col sm={2}>
                            <div>
                                <FormControl
                                    ref='orderInput'
                                    value={this.state.order} 
                                    disabled='true'  
                                    type="text"   />
                            </div>
                        </Col>)
                   }
                   
                </FormGroup>
                <FormGroup>
                    <Col componentClass={ControlLabel} sm={2}>
                        开始日期和结束日期<strong className="prompt">*</strong>
                    </Col>
                    <Col sm={10}>
                        <DateRangePicker className='date-picker' startDate={state.beginTime} endDate={state.endTime} ranges={this.ranges} onEvent={this.handleEvent}>
                            <Button className="date-picker-btn">
                                <div className="pull-left"><Glyphicon glyph="calendar" /></div>
                                <div className="pull-right">
                                    <span>{dateRangeStr}</span>
                                    <span className="caret"></span>
                                </div>
                            </Button>
                        </DateRangePicker>
                    </Col>
                </FormGroup>
        
        {selectCategory==2 ? null : renderAdImgInput()}

        {selectCategory==2 ? null : renderAdImg()}
            
                <FormGroup>
                    <Col componentClass={ControlLabel} sm={2}>
                        广告内容
                    </Col>
                    <Col sm={10}>
                        <textarea
                            className="form-control"
                            rows="3"
                            value={state.content}
                            onChange={this.handleContentChange} >
                        </textarea>
                    </Col>
                </FormGroup>

                <FormGroup>
                    <Col componentClass={ControlLabel} sm={2}>
                        广告指向模式<strong className="prompt">*</strong>
                    </Col>
                    <Col sm={3}>
                        <DropdownButton bsStyle='default' id='repOpsDropdown5' onSelect={this.onRepOPsSelect5} title={this.state.repOpsTitle5 || '默认'}>
                            <MenuItem eventKey="1">默认</MenuItem>
                            <MenuItem eventKey="2">自定义</MenuItem>
                        </DropdownButton>
                    </Col>

                    {this.state.linkType == 0 ? null : (
                        <div>
                            <Col componentClass={ControlLabel} sm={2}>
                                类型<strong className="prompt">*</strong>
                            </Col>
                            <Col sm={3}>
                                <DropdownButton bsStyle='default' id='repOpsDropdown' onSelect={this.onRepOPsSelect6} title={this.state.repOpsTitle6 || '指向h5页面'}>
                                    <MenuItem eventKey="0">指向h5页面</MenuItem>
                                    <MenuItem eventKey="1">指向原生界面</MenuItem>
                                    <MenuItem eventKey="2">指向arms界面</MenuItem>
                                </DropdownButton>
                            </Col>
                        </div>
                    )}
                </FormGroup>


        



        {this.state.status4 ? (
                <FormGroup>
                    <Col componentClass={ControlLabel} sm={2}>
                        广告指向页面<strong className="prompt">*</strong>
                    </Col>
                    <Col sm={10}>
                        <DropdownButton bsStyle='default' id='repOpsDropdown4' onSelect={this.onRepOPsSelect4} title={this.state.repOpsTitle4 || '请选择'}>
                            {opListArr}
                        </DropdownButton>
                    </Col>
                </FormGroup>
                ) : renderAdNav()
        }

            <Toast ref='Toast' />
            </Form>   
        );
    }
};

export default AdsItem;