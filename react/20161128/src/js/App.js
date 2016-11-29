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

//   handleAdd () {
//        console.log('handleAdd');
//     var newItems =
//       this.state.items.concat([prompt('Enter some text')]);
//     this.setState({items: newItems});
//   }
//   handleRemove (i){
//       console.log(i);
//     var newItems = this.state.items;
//     newItems.splice(i, 1);
//     this.setState({items: newItems});
//   }
//   render () {
//     var items = this.state.items.map(function(item, i) {
//       return (
//         <div key={item} onClick={() =>this.handleRemove(i)}>
//           {item}
//         </div>
//       );
//     }.bind(this));
//     return (
//       <div>
//         <button onClick={ ()=>this.handleAdd() }>Add Item</button>
//         <ReactCSSTransitionGroup
//          component="div" 
//          transitionName="example"
//          transitionEnterTimeout={500} 
//          transitionLeaveTimeout={500}>
//           {items}
//         </ReactCSSTransitionGroup>
//       </div>
//     );
//   }
}



export default App