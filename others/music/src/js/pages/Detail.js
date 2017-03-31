import React from 'react';
import $ from 'jQuery';

import '../../css/detail.css';
// import bgimg from '../../img/ch.jpg';

class Detail extends React.Component {
    constructor (...args) {
        super(...args);
    }

    componentDidMount () {
        var musicList = [{
            src: 'http://cloud.hunger-valley.com/music/ifyou.mp3',
            title: 'IF YOU',
            auther: 'Big Bang'
        }, {
            src: 'http://cloud.hunger-valley.com/music/玫瑰.mp3',
            title: '玫瑰',
            auther: '贰佰'
        }]
        var backBtn = document.querySelector('.player .next')
        var playBtn = document.querySelector('.player .btn-switch')
        var forwardBtn = document.querySelector('.player .pre')
        var titleNode = document.querySelector('.player .title')
        var authorNode = document.querySelector('.player .auther')
        var timeNode = document.querySelector('.player .cur-time')
        var progressBarNode = document.querySelector('.player .progress .bar')
        var progressNowNode = document.querySelector('.player .progress-now')
        var timer

        var music = new Audio()
        music.autoplay = true
        var musicIndex = 0

        getMusic(function(musicList){
            loadMusic(musicList[musicIndex])
            
        })
        

        playBtn.onclick = function() {
            if (playBtn.classList.contains('btn-start')) {
                music.play()
                let classVal = playBtn.getAttribute("class")
                classVal = classVal.replace("btn-switch btn-start","btn-switch btn-pause")
                playBtn.setAttribute("class",classVal )
            } else {
                music.pause()
                let classVal = playBtn.getAttribute("class")
                classVal = classVal.replace("btn-switch btn-pause","btn-switch btn-start")
                playBtn.setAttribute("class",classVal )
            }
        }

        forwardBtn.onclick = loadNextMusic
        backBtn.onclick = loadLastMusic
        music.onended = loadNextMusic
        music.shouldUpdate = true


        music.onplaying = function() {
        timer = setInterval(function() {
            updateProgress()
        }, 1000)
        console.log('play')
        }
        music.onpause = function() {
            console.log('pause')
            clearInterval(timer)
        }
        /*
        music.ontimeupdate = function(){
            var _this = this
            if(_this.shouldUpdate) { 
            updateProgress()
            _this.shouldUpdate = false
            setTimeout(function(){
                _this.shouldUpdate = true
            }, 1000)
            }
        }
        */
        progressBarNode.onclick = function(e) {
            var percent = e.offsetX / parseInt(getComputedStyle(this).width)
            music.currentTime = percent * music.duration
            progressNowNode.style.width = percent * 100 + "%"
        }




        function loadMusic(songObj) {
            music.src = songObj.src
            titleNode.innerText = songObj.title
            authorNode.innerText = songObj.auther
            let classVal = playBtn.getAttribute("class")
            classVal = classVal.replace("btn-switch btn-start","btn-switch btn-pause")
            playBtn.setAttribute("class",classVal );
        }

        function loadNextMusic() {
            musicIndex++
            musicIndex = musicIndex % musicList.length
            loadMusic(musicList[musicIndex])
        }

        function loadLastMusic() {
            musicIndex--
            musicIndex = (musicIndex + musicList.length) % musicList.length
            loadMusic(musicList[musicIndex])
        }

        function updateProgress() {
            var percent = (music.currentTime / music.duration) * 100 + '%'
            progressNowNode.style.width = percent

            var minutes = parseInt(music.currentTime / 60)
            var seconds = parseInt(music.currentTime % 60) + ''
            seconds = seconds.length == 2 ? seconds : '0' + seconds
            timeNode.innerText = minutes + ':' + seconds
        }

        function getMusic(callback) {
            var xhr = new XMLHttpRequest()
            xhr.open('get', './src/music.json', true)
            xhr.send()
            xhr.onload = function() {
                if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
                callback(JSON.parse(xhr.responseText))
                }
            }
        }
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