import React, {Component} from 'react';

import { HashRouter as Router, Route } from 'react-router-dom'
import createHistory from 'history/createHashHistory'
const history = createHistory()
import A1 from './A/A1';
import A2 from './A/A2';
import B1 from './B/A1';
import C1 from './C/A1';
import D1 from './D/A1';
import D2 from './D/A2';
import D3 from './D/A3';
import D4 from './D/A4';

class Main extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Router history={history}>
                <Route render={({ location }) => {
                  return(
                        <div>
                            <Route location={location} exact path="/" component={A1} />
                            <Route location={location} path="/A1" component={A1} />
                            <Route location={location} path="/A2" component={A2} />
                            <Route location={location} path="/B1" component={B1} />
                            <Route location={location} path="/C1" component={C1} />
                            <Route location={location} path="/D1" component={D1} />
                            <Route location={location} path="/D2" component={D2} />
                            <Route location={location} path="/D3" component={D3} />
                            <Route location={location} path="/D4" component={D4} />
                        </div>
                  )}}/>
            </Router>   
        )
    }
}

export default Main;