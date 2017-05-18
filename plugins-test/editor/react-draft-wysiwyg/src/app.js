import React from 'react'
import ReactDOM from 'react-dom'
import $ from 'jquery'

import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
// import 'react-draft-wysiwyg.css';



// class Editor extends React.Component {
//     constructor(...args) {
//         super(...args)
//         this.uploadInit = this.uploadInit.bind(this)
//     }

    

//     componentDidMount() {
//         var _this = this;


//     }

//     render() {
//         return <div>
//             <Editor />
//         </div>
//     }
// }


ReactDOM.render(
    <Editor/>,
    document.getElementById('app')
);