import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import combineReducers from "./reducers/index";
import {loadAuthToken} from './local-storage';
import {setAuthToken, refreshAuthToken} from './actions/logInActions';

const store = createStore(combineReducers, applyMiddleware(thunk));
// Hydrate the authToken from localStorage if it exist
const authToken = loadAuthToken();
if (authToken) {
    const token = authToken;
    store.dispatch(setAuthToken(token));
    store.dispatch(refreshAuthToken());
}

export default store;
