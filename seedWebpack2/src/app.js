import React from 'react';
import ReactDOM from 'react-dom';
import './css/common.css'
import './css/index.scss'
import bg from './imgs/bg.jpg'
import './css/font/fontawesome-webfont.eot'
import './css/font/fontawesome-webfont.svg'
import './css/font/fontawesome-webfont.ttf'
import './css/font/fontawesome-webfont.woff'
import './css/font/FontAwesome.otf'


ReactDOM.render(<div><span className="font-text">Hello World!</span>
        <div className="bg-img"></div>
        <i className="icon-spinner icon-spin"></i> loading content...
        <img src={bg}/>
    </div>, document.querySelector('#app'));
