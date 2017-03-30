import React from 'react';
import '../../css/player.css';

class Player extends React.Component {
    constructor (...args) {
        super(...args);
    }

    render() {
        return <div class="musicbox">
            <div class="music">
            <div class="control">
                <span class="back"><i class="fa fa-step-backward"></i></span>
                <span class="play"><i class="fa fa-pause"></i></span>
                <span class="forward"><i class="fa fa-step-forward"></i></span>
            </div>
            <div class="info">
                <div class="title">My song</div>
                <div class="auther">ruoyu</div>
            </div>
            </div>

            <div class="progress">
            <div class="bar">
                <div class="progress-total"></div>
                <div class="progress-now"></div>
            </div>

            <div class="time">0:00</div>
            </div>

        </div>;
    }
}

export default Player;