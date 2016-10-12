import React from 'react';

let Web = React.createClass({
    getInitialState () {
        return {
            name: '百度',
            site: 'http://www.baidu.com'
        }
    },
    render () {
        return (
            <div>
                <Name name={this.state.name}/>
                <Link site={this.state.site} name={this.state.name}/>
            </div>
        );
    }
});

let Name = React.createClass({
    render () {
        return (<h2>{this.props.name}</h2>);
    }
});

let Link = React.createClass({
    render () {
        return (
            <a href={this.props.site}>{this.props.name}</a>
        );
    }
});

export default Web;