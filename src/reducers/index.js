import { combineReducers } from "redux";

import {userInputReducer} from "./userInput";
import { addChoreReducer } from "./addChores";

export default combineReducers({ userInputReducer, addChoreReducer });
