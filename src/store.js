import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import combineReducers from "./reducers/index";

export default createStore(combineReducers, applyMiddleware(thunk));
