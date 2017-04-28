import React from 'react';
import {render} from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Main from './js/Main'; 
import './css/index.scss';

injectTapEventPlugin();

render(<Main />, document.getElementById('app'));