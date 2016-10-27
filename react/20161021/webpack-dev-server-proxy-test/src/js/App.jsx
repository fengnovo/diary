import React from 'react';
import 'whatwg-fetch';

let App = React.createClass({
    getInitialState: ()=>{
        return{
           data: 'lizi'
        } 
    },
    componentDidMount: function(){
        fetch('/categories')
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                console.log(data);
                this.setState({
                    data: JSON.stringify(data)
                });
                // console.log(this.state.data);
            })
            .catch((ex) => {
                console.log(ex);
            });
    },
    render: function(){
        let d = this.state.data;
        return (
            <div>
                {d}
            </div>);
    }
});
export default App;
