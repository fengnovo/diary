import React from 'react';
import $ from 'jQuery';

import '../../css/detail.css';
// import bgimg from '../../img/ch.jpg';

class Detail extends React.Component {
    constructor (...args) {
        super(...args);
    }

    componentDidMount () {
        // $('.player').height($(window).height()+10);
    }

    render() {
        var style = {
            'backgroundImage': 'url(../src/img/ch.jpg)'
        };
        return <div className="player">
            <div className="cover">
                <div className="roller frame-pause">
                    <div className="frame" style={style}></div>
                </div>
            </div>
            <div className="control-bar">
                <div className="progress-control">
                    <div className="time-bar">
                        <div className="full-time-bar">
                            <div className="cur-time-bar"></div>
                        </div>
                        <div className="slider-btn">
                            <i className="slider-btn-icon"></i>
                        </div>
                    </div>
                    <div className="time-count left">
                        <span className="cur-time">00:00</span>
                    </div>
                    <div className="time-count right">
                        <span className="full-time">09:26</span>
                    </div>
                </div>
                <div className="btn-control">
                    <i className="pre disable"></i> 
                    <i className="btn-switch btn-start"></i> 
                    <i className="next disable"></i>
                </div>
            </div>
        </div>;
    }
}

export default Detail;