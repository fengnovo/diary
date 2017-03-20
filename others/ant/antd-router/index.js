import ReactDOM from 'react-dom';
import React from 'react';
import MenuList from './Menu.js';
import { Router, Route, Link, hashHistory, IndexRoute } from 'react-router';

import A from './A.js'
import B from './B.js'


ReactDOM.render((
    <Router history={hashHistory}>
        <Route path="/" component={MenuList}>
            <IndexRoute component={A} />
            <Route path="A" component={A} />
            <Route path="B" component={B} />
        </Route>
    </Router>
), document.getElementById("root"));
