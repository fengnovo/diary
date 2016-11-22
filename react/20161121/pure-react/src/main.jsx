//  这是的代码是  react的知识
// 引入react
import React from 'react';
import ReactDOM from 'react-dom';
import Hello from './component.jsx';//或者component.js时用./component

//// react 的render 方法渲染页面
ReactDOM.render(
    <Hello />,
    document.body
);

//require.ensure(['./component.jsx'],function(require){
//    var Hello = require('component.jsx');
//    ReactDOM.render(
//        <Hello />,
//        document.body
//    );
//});