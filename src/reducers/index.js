import { combineReducers } from "redux";

import {userInputReducer} from "./userInput";
import { addEntryReducer } from "./addEntry";
import {logInReducer} from "./logIn";

export default combineReducers({ logInReducer, userInputReducer, addEntryReducer });
