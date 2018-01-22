import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';

import ChoreBox from './ChoreBox';
import './index.css';
import store from './store';

import registerServiceWorker from './registerServiceWorker';

const rootEl = document.getElementById('root');

ReactDOM.render( <Provider store={store}><ChoreBox /></Provider>, rootEl);
registerServiceWorker();
