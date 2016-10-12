import React from 'react';

let Hello = React.createClass({
    getDefaultProps () {
      return {
          name: 'fengnovo'
      };
    },
    render () {
        return <h1>Hello {this.props.name}</h1>;
    }
});

export default Hello;