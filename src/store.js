import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import combineReducers from "./reducers/index";
import {loadAuthToken} from './local-storage';
import {setAuthToken, refreshAuthToken} from './actions/logInActions';
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(combineReducers, composeEnhancers(applyMiddleware(thunk)));
// Hydrate the authToken from localStorage if it exist
const authToken = loadAuthToken();
if (authToken) {
    const token = authToken;
    store.dispatch(setAuthToken(token));
    store.dispatch(refreshAuthToken());
}

export default store;
