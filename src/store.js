import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk';

import {addChoreReducer} from './reducers';

export default createStore(addChoreReducer, applyMiddleware(thunk));
