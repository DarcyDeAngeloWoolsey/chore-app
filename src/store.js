import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

// import {addChoreReducer} from './reducers/index';
// import {userInputReducer} from './reducers/userInput';

import combineReducers from "./reducers/index";

// export default createStore(
//   combineReducers({
//     users: userInputReducer,
//     choreList: addChoreReducer
//   }),
//   applyMiddleware(thunk));

export default createStore(combineReducers, applyMiddleware(thunk));
