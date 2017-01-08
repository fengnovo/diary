import React from 'react';
import $ from 'jquery';
import Immutable from 'immutable';
import { Button, Form } from 'react-bootstrap';
import globalConfig from '../../globalConfig.json';
import util from '../util';

import Header from '../components/header'; 
import Navigate from '../components/navigate';
import NewInfo from '../components/newInfo';
import Detail from '../components/detail';
import Table from '../components/table';
import Footer from '../components/footer';
import MaskModal from '../components/maskModal';
import Toast from '../components/Toast';


class InfoDetail extends React.Component {
    constructor(props){
        super(props);

        let oaUser = util.getOaUser();

        if (!oaUser) {
            window.location.href = '/';
        }

        let path = props.route.path;

        this.state = {
            oaUser: oaUser,
            path: path,
            infoId: props.routeParams.infoId,
            previeMode: path.indexOf('infoDetail') >= 0  //查看详情时预览模式，新建或草稿时编辑模式
        };

        this._bind.apply(this, ['editInfo', 'getDetailData', 'back', 'save', 'cancel', 'showModal', 'closeModal', 'renderModal']);
    }

    _bind (...methods) {
        methods.forEach( (method)=> this[method] = this[method].bind(this));
    }

    componentDidMount() {
        let infoId = this.state.infoId;
        
        infoId && this.getDetailData(infoId);
    }

    componentWillReceiveProps (nextProps) { // 在编辑时又点了‘新建’，清空输入框，重置默认栏目
        let infoId = nextProps.routeParams.infoId, path = nextProps.route.path;

        this.setState({
            path: path,
            infoId: infoId,
            detail: undefined,
            previeMode: path.indexOf('infoDetail') >= 0  //查看详情时预览模式，新建或草稿时编辑模式
        });

        infoId && this.getDetailData(infoId);
    }

    componentWillUnmount() {
        
    }

    getDetailData (infoId) {
        let url = `${globalConfig.baseUrl}/api/article/${infoId}`;

        $.getJSON(url, (json, textStatus) => {
            json.adminlog.map((item, i) => {
                item.ctime = util.timeStrFromUnix(item.createTime);
                return item;
            });
            this.setState({
                detail: json
            });
        });
    }

    editInfo () {
        this.setState({
            previeMode: false
        });
    }

    back () {
        this.setState({
            previeMode: true
        });
    }

    save (nextStatus) {
        let data = {status: nextStatus};

        if (19 == nextStatus) {
            data.remark = this.refs.rejectReason.value;
        }

        $.ajax({
            url: `${globalConfig.baseUrl}/api/article/${this.state.infoId}`, 
            type: 'PUT',
            dataType: 'json', 
            contentType: 'application/json', 
            data: JSON.stringify(data)
        })
        .done((json) => {
            this.closeModal();
            if (0 !== json.errCode) {
                this.refs.Toast.show('提交失败，错误信息：' + json.errMsg);
            }
            else {
                this.refs.Toast.show('提交成功，页面将在2秒后自动关闭');
                setTimeout(() => {
                    window.close();
                    // window.location.href = '#/infoManage';
                }, 2000);
            }
        })
        .fail(() => {
            this.closeModal();
            this.showToast('提交失败，请重新提交');
        }); 
    }

    cancel () {
        window.close();
        // window.location.href = '#/infoManage';
    }

    showModal (modalName) {
        this.setState({
            showModal: true,
            modalName: modalName
        }, () => {
            this.refs.MaskModal && this.refs.MaskModal.open();
        });
    }

    closeModal () {
        this.refs.MaskModal && this.refs.MaskModal.close();
    }

    renderModal (modalName) {
        if (!this.state.showModal || !modalName) {
            return null;
        }

        let modalInfo, modalBody;

        if ('reject' == modalName) {
            modalInfo = {
                className: 'black-list-modal',
                title: '请填写驳回原因',
                btns: [
                    {name: '取消', click: this.closeModal},
                    {name: '提交', bsStyle: 'primary', click: this.save.bind(this, 19)}
                ]
            };

            modalBody = <textarea ref='rejectReason' placeholder='请填写驳回原因'></textarea>;
        }
        else {
            modalInfo = {
                className: 'info-delete-modal',
                title: '确定不保存并退出编辑吗？',
                btns: [
                    {name: '取消', click: this.closeModal},
                    {name: '确定', bsStyle: 'primary', click: this.closeModal}
                ]
            };
        }
        
        return (
            <MaskModal ref='MaskModal' showModal={true} modalInfo={modalInfo}>
                {modalBody}
            </MaskModal>
        );
    }

    render() {
        let {oaUser, path, infoId, previeMode, detail={}} = this.state, bodyRight;
        let rights = oaUser.operations.split('+'); //1查看2编辑3初审4复审5上线

        if (infoId && previeMode) {   // 从咨询管理列表进来
            let loglist = detail.adminlog || [],
                tableConfig = globalConfig.tableConfig.checkTable,
                tableFun = { },
                tableData = {
                    list: loglist,
                    total: loglist.length
                };
            let status, editBtn, opBtns;

            if (detail.data) {
                status = detail.data.status;
                if ((1 == status || 19 == status) && rights.indexOf('2') >= 0) {  // 草稿中和被驳回，才可以编辑
                    editBtn = (<Button bsStyle='success' className="edit-btn" onClick={this.editInfo}>编辑</Button>);
                }

                opBtns = [<Button bsStyle="success" key='cancel' onClick={this.cancel}>取消</Button>];            
                if ((10 == status && (rights.indexOf('3') >= 0 || rights.indexOf('4') >= 0 || rights.indexOf('5') >= 0)) || 
                    (11 == status && (rights.indexOf('4') >= 0 || rights.indexOf('5') >= 0)) ||
                    (30 == status && rights.indexOf('5'))) { //待初审，待复审，待上线，可以驳回操作
                    opBtns.unshift(<Button bsStyle="success" key='reject' onClick={this.showModal.bind(this, 'reject')}>驳回</Button>);
                }
                if (10 == status && rights.indexOf('3') >= 0) {
                    opBtns.unshift(<Button bsStyle="success" key='firstcheck' onClick={this.save.bind(this, 11)}>通过初审</Button>);
                    rights.indexOf('4') >= 0 && opBtns.unshift(<Button bsStyle="success" key='recheck' onClick={this.save.bind(this, 30)}>通过初审、复审</Button>);
                }
                else if (11 == status && rights.indexOf('4') >= 0) {
                    opBtns.unshift(<Button bsStyle="success" key='recheck' onClick={this.save.bind(this, 30)}>通过复审</Button>);
                }
                else if (30 == status && rights.indexOf('5') >= 0) {
                    opBtns.unshift(<Button bsStyle="success" key='public' onClick={this.save.bind(this, 40)}>发布</Button>);
                }
                else if (40 == status && rights.indexOf('5') >= 0) {
                    opBtns.unshift(<Button bsStyle="success" key='offline' onClick={this.save.bind(this, 80)}>下线</Button>);
                }
            }

            bodyRight = (
                <div className='body-right detail-body-right'>
                    <section className='detail-wrap'>
                        {editBtn}
                        <Detail infoId={infoId} detailData={detail.data} passive={true} />
                        <h6>操作流程：</h6>
                        <Table tableConfig={tableConfig} tableFun={tableFun} tableData={tableData} />
                        <Form componentClass="fieldset" inline className="detail-ops">
                            {opBtns}
                        </Form>
                    </section>
                    <Footer />
                </div>
            );
        }
        else {  // 点"新建"或"编辑"按钮进来
            bodyRight = (
                <div className='body-right new-body-right'>
                    <NewInfo infoId={infoId} detailData={detail.data} path={path} back={this.back}/> 
                    <Footer />
                </div>
            );
        }   
        
        let colName = path.indexOf('infoDetail') >= 0 ? 'infoManage' : 'draftManage';

        return (
            <div className="detail-new-page page-wrap" ref="infoDetail">
                <Header colName={colName} />
                <div className='detail-new-body page-body'> 
                    <div className='body-left'>
                        <Navigate colName={colName}/>
                    </div>
                    {bodyRight}
                </div>
                {this.renderModal(this.state.modalName)}
                <Toast ref='Toast' showToast={false}/>
            </div>
        ); 
    }
};

export default InfoDetail;
