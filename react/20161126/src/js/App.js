import React from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

class App extends React.Component {
    constructor (props) {
        super(props)

        // let transitionName = 'page';
        // if (action === 'PUSH') {
            
        // } else if (action === 'POP') {
        //     transitionName = 'page-l2r';
        // }
        this.state={
            transitionName: 'page'
        }
    }

    leave(){
        this.setState({
            transitionName: 'page-l2r'
        });
    }
    come(){
        this.setState({
            transitionName: 'page-r2l'
        });
    }
    
  render() {
        
    return (
      <div className="app">
        <ReactCSSTransitionGroup
           component="div"
                transitionName={this.state.transitionName}
                transitionEnterTimeout={200}
                transitionLeaveTimeout={200}
          >
          {React.cloneElement(this.props.children, {
            key: this.props.location.pathname,
            leave:()=>this.leave(),
            come:()=>this.come()
          })}
        </ReactCSSTransitionGroup>
      </div>
    );
  }
}



export default App