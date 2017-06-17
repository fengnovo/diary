import React from 'react';
import {render} from 'react-dom';
import '../node_modules/material-design-lite/material.min.js';
import Main from './js/Main'; 
import './css/common.css';
import './css/index.scss';


render(<Main />, document.getElementById('app'));