import React from 'react'


// @pureRender
class C extends React.Component {
    constructor (props) {
        super (props)
    }
  componentWillReceiveProps(newProps){
    console.log(`我新的props的name是${newProps.name}，age是${newProps.age}。我以前的props的name是${this.props.name}，age是${this.props.age}是我要re-render了`);
  }
  render() {
    let {name,age} = this.props;

      return (
        <div>
          <span>姓名:</span>
          <span>{name}</span>
          <span> age:</span>
          <span>{age}</span>
        </div>
      )
  }
}


export default C