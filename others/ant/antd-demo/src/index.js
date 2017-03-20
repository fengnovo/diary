import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';
import App from './App';
import Detail from './Detail.js';
import './index.css';
import 'antd/dist/antd.css';


ReactDOM.render(
    <Router history={hashHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={App} />
            <Route path="detail/:id" component={Detail} />
        </Route>
    </Router>,
  document.getElementById('root')
);