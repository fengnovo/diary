import React from 'react';
import ReactDOM from 'react-dom';

import App from './App.jsx';
import Counter from './Counter2.jsx';

let title = '标题';
ReactDOM.render(
    <div>
        <App name={title}/>
        <Counter />
    </div>,
    document.getElementById('app')
)


