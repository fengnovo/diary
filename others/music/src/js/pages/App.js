import React from 'react';
import $ from 'jQuery';

import Banner from '../components/Banner';
import Tabs from '../components/Tabs';

import '../../css/App.css';

class App extends React.Component {
    constructor (...args) {
        super(...args);
    }

    componentDidMount () {
        $('.content').height($(window).height() - $('.broadcast').height() - 14);
        $('.tab-nav').height($('.list-ul').height());
    }

    render() {
        return <div className="container">
            <Banner/>
            <Tabs/>
        </div>;
    }
}

export default App;