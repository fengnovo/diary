import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import Immutable from 'immutable';
import globalConfig from '../../globalConfig.json'; 

class MaskModal extends React.Component {
    constructor(props){
        super(props);
    
        this.state = {
            showModal: props.showModal || false
        };

        this._bind.apply(this, ['close', 'open', 'enter']);
    }

    _bind (...methods) {
        methods.forEach( (method)=> this[method] = this[method].bind(this));
    }

    componentDidMount() {
        
    }

    componentWillUnmount() {
        
    }

    close () {
        this.setState({ showModal: false });
    }

    open () {
        this.setState({ showModal: true });
    }

    enter () {
        this.setState({ showModal: false });
    }

    render() {
        var _this = this;
        var modalInfo = this.props.modalInfo;
        var header = !modalInfo.title ? null :              
            (<Modal.Header closeButton={true} onHide={this.close}>
                <Modal.Title className='modal-title'>{modalInfo.title}</Modal.Title>
            </Modal.Header>),

            body = !this.props.children ? null :
            (<Modal.Body>
                {this.props.children}
            </Modal.Body>),
            
            footer = !(modalInfo.btns && modalInfo.btns.length) ? null :
            (<Modal.Footer>
                {modalInfo.btns.map((item, i) => (<Button key={i} bsStyle={item.bsStyle} onClick={item.click}>{item.name}</Button>))}
            </Modal.Footer>);

        return (
            <Modal className={`mask-modal ${modalInfo.className}`} show={this.state.showModal}>
                {header}
                {body}
                {footer}
            </Modal>
        );
    }
};

MaskModal.defaultProps = {
    modalInfo: {}
};

export default MaskModal;

