import React from 'react';

class App extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
           visibile: false,
            text: []
        };
        //this.handleClick.bind(this);
        this.handleClick = () => {
            this.setState({
                visibile: !this.state.visibile
            });
        }
    }
    componentWillMount () {
        // var myRequest = new Request('http://mdn.github.io/fetch-examples/fetch-json/products.json');   //<-服务器跨越
        var myRequest = new Request('http://www.html5online.com.cn/articles/students.json');//<-服务器没跨越，不行
        fetch('http://mdn.github.io/fetch-examples/fetch-json/products.json')
            .then((response) => {
                //console.log(response);
                return response.json()
            }).then((json) => {
                //console.log(json.products[0].Name);
                this.setState({
                    text: json.products
                });
            });
    }

    handleClick () {
        this.setState({
            visibile: !this.state.visibile
        });
    }
// <p>{this.state.text}</p>
    //{this.state.text.forEach((p)=>{
    //    <li>{p.Name}</li>
    //})}
    render () {
        let displayValue = this.state.visibile ? 'block' : 'none';
        let arr = [];
        this.state.text.map(function(item){
            console.log(item);
            arr.push(<li key={item.Name}>{item.Name}</li>);
        })
        return (
            <div className="dropdown">
                <button className="btn btn-default" onClick={this.handleClick}>Browsers</button>
                <ul className="dropdown-menu" style={{display: displayValue}}>{arr}</ul>
            </div>
        )
    }
};
export default App;


