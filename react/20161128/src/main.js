import React from 'react'
import ReactDOM from 'react-dom'
import {Router,Route,IndexRoute,hashHistory} from 'react-router'
import App from './js/App.js'
import A from './js/A.js'
import B from './js/B.js'
import './css/main.css'

ReactDOM.render(
    <Router history={hashHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={A}/>
            <Route path="/a" component={A}/>
            <Route path="/b" component={B}/>
        </Route>
    </Router>
    ,document.getElementById('app'));