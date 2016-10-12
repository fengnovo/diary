import React from 'react';

let LikeButton = React.createClass({
    getInitialState () {
        return {liked: false};
    },
    handleClick () {
        this.setState({liked: !this.state.liked});
    },
    render () {
        let text = this.state.liked ? '喜欢':'不喜欢';
        return (
            <p onClick={this.handleClick}>
                你<b>{text}</b>吃。点击切换状态
            </p>
        );
    }
});

export default LikeButton;