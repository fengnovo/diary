import React from 'react';
import '../../css/tabs.css';

class TabUl extends React.Component {
    constructor (...args) {
        super(...args);
        this.state={
            activeTab: 0
        }
        this.changeNav = this.changeNav.bind(this);
    }

    changeNav (e) {
        // console.log(e.currentTarget);
        // console.log(e.target);
        var a = [], elm = e.currentTarget;
        var p = elm.parentNode.children;
        for(var i =0,pl= p.length;i<pl;i++) {
            if(p[i] !== elm) {
                p[i].className='';
            }
        }
        e.currentTarget.className = "active";
        e.stopPropagation();
        e.preventDefault();
    }

    render() {
        return <nav className="tab-nav">
            <a className="active" onClick={this.changeNav}>列表1</a>
            <a onClick={this.changeNav}>列表2</a>
            <a onClick={this.changeNav}>列表3</a>
            <a onClick={this.changeNav}>列表4</a>
        </nav>
    }
}

class TabLists extends React.Component {
    constructor (...args) {
        super(...args);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick () {
        location.href = location.origin+'/#/Detail';
    }

    render() {
        return <ul className="list-ul">
            <li>
                <a onClick={this.handleClick}>
                    <img alt="" src="../src/img/chl.png" />
                    <div className="row">
                        <p className="title">复克ii：爱一个人</p>
                        <p className="dec">陈慧琳&nbsp;&nbsp;&nbsp;爱一个人</p>
                    </div>
                </a>
            </li>
            <li>
                <a onClick={this.handleClick}>
                    <img alt="" src="../src/img/chl.png" />
                    <div className="row">
                        <p className="title">复克ii：爱一个人</p>
                        <p className="dec">陈慧琳&nbsp;&nbsp;&nbsp;爱一个人</p>
                    </div>
                </a>
            </li>
            <li>
                <a onClick={this.handleClick}>
                    <img alt="" src="../src/img/chl.png" />
                    <div className="row">
                        <p className="title">复克ii：爱一个人</p>
                        <p className="dec">陈慧琳&nbsp;&nbsp;&nbsp;爱一个人</p>
                    </div>
                </a>
            </li>
            <li>
                <a onClick={this.handleClick}>
                    <img alt="" src="../src/img/chl.png" />
                    <div className="row">
                        <p className="title">复克ii：爱一个人</p>
                        <p className="dec">陈慧琳&nbsp;&nbsp;&nbsp;爱一个人</p>
                    </div>
                </a>
            </li>
            <li>
                <a onClick={this.handleClick}>
                    <img alt="" src="../src/img/chl.png" />
                    <div className="row">
                        <p className="title">复克ii：爱一个人</p>
                        <p className="dec">陈慧琳&nbsp;&nbsp;&nbsp;爱一个人</p>
                    </div>
                </a>
            </li>
            <li>
                <a onClick={this.handleClick}>
                    <img alt="" src="../src/img/chl.png" />
                    <div className="row">
                        <p className="title">复克ii：爱一个人</p>
                        <p className="dec">陈慧琳&nbsp;&nbsp;&nbsp;爱一个人</p>
                    </div>
                </a>
            </li>
            <li>
                <a onClick={this.handleClick}>
                    <img alt="" src="../src/img/chl.png" />
                    <div className="row">
                        <p className="title">复克ii：爱一个人</p>
                        <p className="dec">陈慧琳&nbsp;&nbsp;&nbsp;爱一个人</p>
                    </div>
                </a>
            </li>
        </ul>
    }
}

class Tabs extends React.Component {
    constructor (...args) {
        super(...args);
    }

    render() {
        return <div className="content">
            <TabUl />
            <TabLists />
        </div>
    }
}

export default Tabs;