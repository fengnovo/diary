import React from 'react';



 //var Counter = React.createClass({
 //    getInitialState: function () {
 //       return { clickCount: 0 };
 //    },
 //    handleClick: function () {
 //        this.setState(function(state) {
 //            return {clickCount: state.clickCount + 1};
 //        });
 //    },
 //    render: function () {
 //       return (<h2 onClick={this.handleClick}>点我！点击次数为: {this.state.clickCount}</h2>);
 //    }
 //});


class Counter extends React.Component {
    constructor (props) {
        super(props);
        console.log('constructor');
        this.state = {clickCount: 0};
        this._bind.apply(this, ['handleClick']);
    }

    _bind (...methods) {
        methods.forEach( (method)=> this[method] = this[method].bind(this));
    }
    
    //getInitialState (){
    //    //return {clickCount: 0};
    //      用constructor    时不能用    getInitialState
    //}

    handleClick () {
        this.setState({
            clickCount: this.state.clickCount + 1
        });
    }

    render () {
        return (
            <h2 onClick={this.handleClick}>点击！点击次数为：{this.state.clickCount}</h2>
        );
    }
}

export default Counter;