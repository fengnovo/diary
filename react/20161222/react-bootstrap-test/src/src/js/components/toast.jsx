import React from 'react';
import { Button } from 'react-bootstrap';

class Toast extends React.Component {
    constructor(props){
        super(props);
    
        this.state = {
            showToast: props.showToast
        };

        this._bind.apply(this, ['show']);
    }

    _bind (...methods) {
        methods.forEach( (method)=> this[method] = this[method].bind(this));
    }

    componentDidMount() {

    }

    componentWillUnmount() {
        
    }

    show (toastText, showAlways = false) {
        this.setState({showToast: true, toastText: toastText});

        !showAlways && setTimeout(() => {
            this.setState({showToast: false});
        }, 2000);    
    } 

    render() {
        if (!this.state.showToast) {
            return null;
        }

        return (
            <div className='toast-like'>
                <Button className='btn'>{this.state.toastText}</Button>
            </div>
        );
    }
};


export default Toast;
