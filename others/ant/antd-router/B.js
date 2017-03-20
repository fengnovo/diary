import React from 'react'

class B extends React.Component {
    constructor (props) {
        super(props)
        this.handleClickOne = this.handleClickOne.bind(this)
        this.handleClickFour = ::this.handleClickFour
        function map(func) {
            var mapped = new Array(this.length);
            for(var i = 0; i < this.length; i++) {
                mapped[i] = func(this[i], i);  
            }
            return mapped;
        }
        console.log([1, 2, 3]::map(x => x * 2))
    }

    handleBack () {
        history.back()
    }

    handleClickOne () {
        alert('点击一')
        console.log('使用   this.handleClickOne = this.handleClickOne.bind(this)')
    }

    handleClickTwo () {
        alert('点击二')
        console.log('使用   this.handleClickFour = ::this.handleClickFour')
    }

    handleClickThree = () => {
        alert('点击三')
        console.log('使用   handleClickThree = () => {alert("点击三")}')
    }

    handleClickFour () {
        alert('点击四')
        console.log('使用   this.handleClickFour = ::this.handleClickFour')
    }

    render () {
        return(<div className="detail">
        <div className="nav"><span className="nav-back" onClick={ () => this.handleBack() }> 《 返回</span></div>
        <div className="content">
        <p>
            <button onClick={this.handleClickOne}>点击一</button>
            <br /><br />
            <button onClick={ () => this.handleClickTwo()}>点击二</button>
            <br /><br />
            <button onClick={this.handleClickThree}>点击三</button>
            <br /><br />
            <button onClick={this.handleClickFour}>点击四</button>
            <br /><br />
        </p>
        </div>
        </div>);
    }
}

export default B