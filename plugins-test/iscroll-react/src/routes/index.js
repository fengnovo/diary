import React from 'react'
import { Router, Route, browserHistory } from 'react-router'
import { Main,App,UserListApp,UserDetailApp } from '../containers'

const routes = (
    <Router history={browserHistory}>
        <Route path="/" component={App}></Route>
        <Route path="users" component={UserListApp}></Route>
        <Route path="user" component={UserDetailApp}>
            <Route path=":newsId" component={UserDetailApp} />
        </Route>
        
    </Router>
)

// const routes = (
//     <Router history={browserHistory}>
//         <Route path='/' component={ Main }>
//             <IndexRoute component={ App }/>
//             <Route path="/" component={App}></Route>
//             <Route path="/users" component={UserListApp}></Route>
//             <Route path="/user/:userId" component={UserDetailApp}></Route>
//         </Route>
//     </Router>
// )

export default routes

