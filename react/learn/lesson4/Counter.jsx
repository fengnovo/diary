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
        this.handleClick = () => {  //没有this.就报错handleClick undefined
            this.setState({
                clickCount: this.state.clickCount + 1
            });
        }
    }
    //getInitialState (){
    //    console.log('getInitialState');
    //    return {clickCount: 0};
    //}

    render () {
        return (

            <h2 onClick={this.handleClick}>
                点击！点击次数为：{this.state.clickCount}
                {/*绑定的方法必须在constructor里面 state也是*/}
            </h2>
        );
    }
}

export default Counter;