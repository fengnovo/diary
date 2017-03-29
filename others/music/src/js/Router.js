import React from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import App from './pages/App';
import Detail from './pages/Detail';

const routes = (
    <Router history={hashHistory}>
        <Route path='/' component={App}></Route>
        <Route path='/App' component={App}></Route>
        <Route path='/Detail' component={Detail}></Route>
    </Router>
);

export default routes;

