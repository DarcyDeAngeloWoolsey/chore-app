import { combineReducers } from "redux";

import {userInputReducer} from "./userInput";
import { addChoreReducer } from "./addChores";
import {logInReducer} from "./logIn";

export default combineReducers({ logInReducer, userInputReducer, addChoreReducer });
