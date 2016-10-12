import React from 'react';

let HelloMessage = React.createClass({
    render: function() {
        return <h1>Hello {this.props.name}</h1>;
    }
});

let Ok = React.createClass({
    render: function() {
        return <h1>这段没什么用，因为没有export default</h1>;
    }
});

export default HelloMessage;
//ReactDOM.render(
//    <HelloMessage name="Runoob" />,
//    document.getElementById('example')
//);

