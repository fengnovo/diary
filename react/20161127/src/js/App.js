import React from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

class App extends React.Component {
    constructor (props) {
        super(props)
        this.state={
            transitionL: true,
            transitionE: true
        }
    }

    changeLive(){
        this.setState({
            transitionL: true,
            transitionE: false
        });
    }
    changeCome(){
        this.setState({
            transitionL: true,
            transitionE: true
        });
    }
  render() {
    return (
      <div className="app">
        <ReactCSSTransitionGroup
          component="div"
          className="transition-wrapper"
          transitionName="swap"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={500} 
          transitionLeave={this.state.transitionL}
          transitionEnter={this.state.transitionE}
          >
          {React.cloneElement(this.props.children, {
            transitionL: this.state.transitionL,
            transitionE: this.state.transitionE,
            key: this.props.location.pathname,
            changeLive:()=>this.changeLive(),
            changeCome:()=>this.changeCome()
            
          })}
        </ReactCSSTransitionGroup>
      </div>
    );
  }
}



export default App