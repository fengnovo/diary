import React from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router'; // hashHistory, browserHistory

import App from './pages/app.jsx';
import InfoManage from './pages/infoManage.jsx';
import DraftManage from './pages/draftManage.jsx';
import InfoDetail from './pages/infoDetail.jsx';
import ColsManage from './pages/colsManage.jsx';
import EditColBanner from './pages/editColBanner.jsx';
import ReportManage from './pages/reportManage.jsx';
import AuthManage from './pages/authManage.jsx';
import AdsManage from './pages/adsManage.jsx';
import HomeNavManage from './pages/homeNavManage.jsx';
import HotQuesManage from './pages/hotQuesManage.jsx';

const historyOptions = {
    queryKey : false
};

const routes = (
    <Router history={ hashHistory }>
        <Route path='/' component={ App }>
            <IndexRoute component={ HomeNavManage }/>
            <Route path='infoManage' component={ InfoManage } />
            <Route path='newInfo(/:infoId)' component={ InfoDetail } />   
            <Route path='infoDetail/:infoId' component={ InfoDetail } />
            <Route path='draftManage' component={ DraftManage } />
            <Route path='colsManage' component={ ColsManage } />
            <Route path='editColBanner/:colId' component={ EditColBanner } />
            <Route path='reportManage' component={ ReportManage } />
            <Route path='authManage' component={ AuthManage } />
            <Route path='adsManage' component={ AdsManage } />
            <Route path='homeNavManage' component={ HomeNavManage } />
            <Route path='hotQuesManage' component={ HotQuesManage } />
        </Route>
    </Router>
);

export default routes;
