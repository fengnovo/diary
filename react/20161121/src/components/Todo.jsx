import React from 'react';

export default class Todo extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      
    };
  }
  render() {
    return (
      <li
        onClick={this.props.onClick}
        style={{
          textDecoration: this.props.completed ? 'line-through' : 'none',
          cursor: this.props.completed ? 'default' : 'pointer'
        }}>
        {this.props.text}
      </li>
    );
  }
}

// Todo.propTypes = {
//   onClick: PropTypes.func.isRequired,
//   text: PropTypes.string.isRequired,
//   completed: PropTypes.bool.isRequired
// };