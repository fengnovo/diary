import React from 'react'
import {Link } from 'react-router'


class A extends React.Component {
    constructor (props){
        super(props)

    }

    componentDidMount () {
        this.props.come()
    }

    render () {
        return(<ul>
                <li><Link to="/B">这是一个列表标题1</Link><hr/></li>
                <li><Link to="/B">这是一个列表标题2</Link><hr/></li>
                <li><Link to="/B">这是一个列表标题3</Link><hr/></li>
                <li><Link to="/B">这是一个列表标题4</Link><hr/></li>
                <li><Link to="/B">这是一个列表标题5</Link><hr/></li>
                <li><Link to="/B">这是一个列表标题6</Link><hr/></li>
                <li><Link to="/B">这是一个列表标题7</Link><hr/></li>
                <li><Link to="/B">这是一个列表标题8</Link><hr/></li>
                <li><Link to="/B">这是一个列表标题9</Link><hr/></li>
                <li><Link to="/B">这是一个列表标题10</Link><hr/></li>
                <li><Link to="/B">这是一个列表标题11</Link><hr/></li>
                <li><Link to="/B">这是一个列表标题12</Link><hr/></li>
                <li><Link to="/B">这是一个列表标题13</Link><hr/></li>
                <li><Link to="/B">这是一个列表标题14</Link><hr/></li>
                <li><Link to="/B">这是一个列表标题15</Link><hr/></li>
                <li><Link to="/B">这是一个列表标题16</Link><hr/></li>
                <li><Link to="/B">这是一个列表标题17</Link><hr/></li>
                <li><Link to="/B">这是一个列表标题18</Link><hr/></li>
                <li><Link to="/B">这是一个列表标题1</Link><hr/></li>
                <li><Link to="/B">这是一个列表标题2</Link><hr/></li>
                <li><Link to="/B">这是一个列表标题3</Link><hr/></li>
                <li><Link to="/B">这是一个列表标题4</Link><hr/></li>
                <li><Link to="/B">这是一个列表标题5</Link><hr/></li>
                <li><Link to="/B">这是一个列表标题6</Link><hr/></li>
                <li><Link to="/B">这是一个列表标题7</Link><hr/></li>
                <li><Link to="/B">这是一个列表标题8</Link><hr/></li>
                <li><Link to="/B">这是一个列表标题9</Link><hr/></li>
                <li><Link to="/B">这是一个列表标题10</Link><hr/></li>
                <li><Link to="/B">这是一个列表标题11</Link><hr/></li>
                <li><Link to="/B">这是一个列表标题12</Link><hr/></li>
                <li><Link to="/B">这是一个列表标题13</Link><hr/></li>
                <li><Link to="/B">这是一个列表标题14</Link><hr/></li>
                <li><Link to="/B">这是一个列表标题15</Link><hr/></li>
                <li><Link to="/B">这是一个列表标题16</Link><hr/></li>
                <li><Link to="/B">这是一个列表标题17</Link><hr/></li>
                <li><Link to="/B">这是一个列表标题18</Link><hr/></li>
                <li><Link to="/B">这是一个列表标题1</Link><hr/></li>
                <li><Link to="/B">这是一个列表标题2</Link><hr/></li>
                <li><Link to="/B">这是一个列表标题3</Link><hr/></li>
                <li><Link to="/B">这是一个列表标题4</Link><hr/></li>
                <li><Link to="/B">这是一个列表标题5</Link><hr/></li>
                <li><Link to="/B">这是一个列表标题6</Link><hr/></li>
                <li><Link to="/B">这是一个列表标题7</Link><hr/></li>
                <li><Link to="/B">这是一个列表标题8</Link><hr/></li>
                <li><Link to="/B">这是一个列表标题9</Link><hr/></li>
                <li><Link to="/B">这是一个列表标题10</Link><hr/></li>
                <li><Link to="/B">这是一个列表标题11</Link><hr/></li>
                <li><Link to="/B">这是一个列表标题12</Link><hr/></li>
                <li><Link to="/B">这是一个列表标题13</Link><hr/></li>
                <li><Link to="/B">这是一个列表标题14</Link><hr/></li>
                <li><Link to="/B">这是一个列表标题15</Link><hr/></li>
                <li><Link to="/B">这是一个列表标题16</Link><hr/></li>
                <li><Link to="/B">这是一个列表标题17</Link><hr/></li>
                <li><Link to="/B">这是一个列表标题18</Link><hr/></li>
            </ul>);
    }
}

export default A