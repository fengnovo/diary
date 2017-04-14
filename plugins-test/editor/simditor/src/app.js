import React from 'react'

import ReactDOM from 'react-dom'

import Simditor from 'simditor'
import SimditorMark from './simditor-mark'

import './styles/simditor.css'

class App extends React.Component {
    constructor(...args) {
        super(...args)
    }

    componentDidMount () {//componentDidMount
        this.refs.test

        var toolbar = ['title', 'bold', 'italic', 'underline', 'strikethrough', 'color', '|', 'ol', 'ul', 'blockquote', 'code', 'table', '|', 'link', 'image', 'hr', '|', 'indent', 'outdent', 'mark'];
        var simditor = new Simditor({
            textarea: '#textarea',
            toolbar: toolbar
        });
    }

    render() {
        return <div ref="test" id="textarea"></div>
    }
}


ReactDOM.render(
    <App />,
    document.getElementById('app')
);