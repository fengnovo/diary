import React, { Component } from 'react';
export default class MenuList extends Component {
    render() {
        return (
            <div> 
                {this.props.children}
            </div>
        );
    }
};