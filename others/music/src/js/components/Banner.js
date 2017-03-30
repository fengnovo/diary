import React from 'react';
import ReactSwipe from 'react-swipe';
import '../../css/banner.css';

class Banner extends React.Component {
    constructor (...args) {
        super(...args);
        this.handleClick = this.handleClick.bind(this);
        window.back = ()=>{
            window.history.go(-1);
            return true;
        }
    }

    handleClick () {
        location.href = location.origin+'/#/Detail';
    }

    render() {
        return <ReactSwipe className="carousel" swipeOptions={{continuous: true,speed: 400,auto: 2000,}}>
                <div className="broadcast" onClick={this.handleClick} style={{ 'background': 'url(../src/img/cover1.jpg) no-repeat'}}>
                    <p className="corner">推荐</p>
                        <div className="audio-info">
                            <p className="title">陈慧琳：记事本</p>
                            <p className="profile">
                                <span>陈慧琳</span> 
                                <span>香港歌手</span> 
                                <span>2008-01-27</span>
                            </p>
                            <p>
                                <a className="btn-listen">立即收听</a>
                            </p>
                        </div>
                        {/*<div className="audio-info">
                            <h5>精彩节目正在赶来</h5>
                            <h3>敬请期待哦~</h3>
                        </div>*/}
                </div>
                <div className="broadcast"  onClick={this.handleClick}  style={{ 'background': 'url(../src/img/cover2.png) no-repeat'}}>
                    <div className="audio-info">
                        <p className="title">陈慧琳：记事本</p>
                        <p className="profile">
                            <span>陈慧琳</span> 
                            <span>香港歌手</span> 
                            <span>2008-01-27</span>
                        </p>
                        <p>
                            <a className="btn-listen">立即收听</a>
                        </p>
                    </div>
                </div>
                <div className="broadcast"  onClick={this.handleClick} style={{ 'background': 'url(../src/img/cover3.png) no-repeat'}}>
                    <div className="audio-info">
                        <p className="title">陈慧琳：记事本</p>
                        <p className="profile">
                            <span>陈慧琳</span> 
                            <span>香港歌手</span> 
                            <span>2008-01-27</span>
                        </p>
                        <p>
                            <a className="btn-listen">立即收听</a>
                        </p>
                    </div>
                </div>
            </ReactSwipe>
    }
}

export default Banner;