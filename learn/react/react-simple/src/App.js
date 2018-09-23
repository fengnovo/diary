import React from 'react';
import { 
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';
import './app.css';

const Home = () => (
    <div>
        <h2>Home</h2>
    </div>
);

const About = () => (
    <div>
        <h2>About</h2>
    </div>
);

const Topic = ({ match }) => (
    <div>
        <h3>{match.params.topicId}</h3>
    </div>
);

const Topics = ({ match }) => (
    <div>
        <h2>Topics</h2>
        <ul>
            <li>
                <Link to={`${match.url}/rendering`}>
                    rendering with react
                </Link>
            </li>
            <li>
                <Link to={`${match.url}/components`}>
                    components
                </Link>
            </li>
            <li>
                <Link to={`${match.url}/props-v-state`}>
                    props state
                </Link>
            </li>
        </ul>


        <Route path={`${match.url}/:topicId`} component={Topic} />
        <Route exact 
            path={`${match.url}/:topicId`}
            render={() => (
                <h3>请选择一个topic</h3>
            )}
        />
    </div>
);

const BasicExample = () => (
    <Router>
        <div className='container'>
            <ul>
                <li><Link to='/'>Home</Link></li>
                <li><Link to='/about'>About</Link></li>
                <li><Link to='/topic'>Topic</Link></li>
            </ul>
            <hr />
            <Route exact path='/' component={Home}/>
            <Route path='/about' component={About}/>
            <Route path='/topics' component={Topics}/>
        </div>
    </Router>
);

export default BasicExample;