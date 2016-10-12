import React from 'react';

var WebSite = React.createClass({
    render: function() {
        return (
            <div>
                来自Div3
                <Name name={this.props.name} />
                <Link site={this.props.site} />
            </div>
        );
    }
});

var Name = React.createClass({
    render: function() {
        return (
            <h1>{this.props.name}</h1>
        );
    }
});

var Link = React.createClass({
    render: function() {
        return (
            <a href={this.props.site}>
                {this.props.site}
            </a>
        );
    }
});

export default WebSite;