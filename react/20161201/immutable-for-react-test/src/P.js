import React from 'react'
import pureRender from "pure-render-decorator"
import C from './C.js'

class P extends React.Component {
    constructor(props){
        super(props)
        this.state={
          name:"",
          age :"",
          persons:[]
        }
      }
      _handleChange(event){
        console.log(event.target.name);
        this.setState({
          [event.target.name]: event.target.value
        })
      }
      _handleClick(){
        let s = this.state.persons.slice()
        let p = s.concat([{name:this.state.name,age:this.state.age}])
        this.setState({
          name:"",
          age :"",
          persons: p
        })
    
      }
      
      render() {
        const {name,age,persons} = this.state
        return (
          <div>
            <span>姓名:</span><input value={name} name="name" onChange={this._handleChange.bind(this)}></input>
            <span>年龄:</span><input value={age} name="age" onChange={this._handleChange.bind(this)}></input>
            <input type="button" onClick={this._handleClick.bind(this)} value="确认"></input>
            {persons.map((person,index)=>(
              <C key={index} name={person.name} age={person.age}></C>
            ))}
          </div>
        )
      }
      
}

export default pureRender(P)