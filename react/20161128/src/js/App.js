import React from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

class App extends React.Component {
    constructor (props) {
        super(props)
        this.state = {items: ['hello', 'world', 'click', 'me']};
    }
    render () {
        const key = 'root'
        return (<ReactCSSTransitionGroup
                transitionName="swap"
                component="div"
                transitionEnterTimeout={300}
                transitionLeaveTimeout={300}>
                <div key={this.props.location.pathname}>
                    {
                        this.props.children
                    }
                </div>
            </ReactCSSTransitionGroup>);
    }
}



export default App