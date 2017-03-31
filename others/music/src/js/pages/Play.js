import React from 'react';
import '../../css/player.css';

class Play extends React.Component {
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
        var backBtn = document.querySelector('.musicbox .next')
        var playBtn = document.querySelector('.musicbox .btn-switch')
        var forwardBtn = document.querySelector('.musicbox .pre')
        var titleNode = document.querySelector('.musicbox .title')
        var authorNode = document.querySelector('.musicbox .auther')
        var timeNode = document.querySelector('.musicbox .time')
        var progressBarNode = document.querySelector('.musicbox .progress .bar')
        var progressNowNode = document.querySelector('.musicbox .progress-now')
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
        return <div className="musicbox">
            <div className="music">
                <div className="btn-control">
                    <i className="pre"></i> 
                    <i className="btn-switch btn-pause"></i> 
                    <i className="next"></i>
                </div>
                <div className="info">
                    <div className="title">My song</div>
                    <div className="auther">ruoyu</div>
                </div>
                </div>

                <div className="progress">
                <div className="bar">
                    <div className="progress-total"></div>
                    <div className="progress-now"></div>
                </div>

                <div className="time">0:00</div>
            </div>
        </div>;
    }
}

export default Play;