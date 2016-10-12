import React from 'react';
import ReactDOM from 'react-dom';

import App from './App.jsx';
import Div1 from './Div1.jsx';
import Div2 from './Div2.jsx';
import Div3 from './Div3Props.jsx';
import LikeButton from './Div4State.jsx';
import Hello from './Div5DefaultProps.jsx';
import Div6StateAndProps from './Div6StateAndProps.jsx';



ReactDOM.render(
    <div>
        <App />
        <Div1 />
        <Div2 name='中文'/>
        <Div3 name='百度' site='http://www.baidu.com'/>
        <LikeButton />
        <Hello />
        <Div6StateAndProps />
    </div>,
    document.getElementById('app')
)


