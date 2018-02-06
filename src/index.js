import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';

import ChoreBox from './components/pages/ChoreBox';
import './index.css';
import store from './store';



const rootEl = document.getElementById('root');

ReactDOM.render( <Provider store={store}><ChoreBox /></Provider>, rootEl);
