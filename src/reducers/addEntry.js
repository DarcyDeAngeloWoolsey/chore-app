import * as actions from "../actions/index";
import { FETCH_ENTRIES_SUCCESS, FETCH_ENTRIES_ERROR } from '../actions/index.js';

const initialState = {
  balanceBook: [],
  error: null
};

//what we need here is if there is a success, then load that persons entries. and everytime they do an entry,
//they will commit it ot the database. So we need to create a post in actions/index.js for posting to their account

//seeded database should have bankBook inside user then?

export const addEntryReducer = (state = initialState, action) => {
  if (action.type === actions.ADD_ENTRY) {
    return Object.assign({}, state, {
      balanceBook: [
        ...state.balanceBook,
        {
          choreDate: action.choreDate,
          choreType: action.choreType,
          choreBanking: action.choreBanking,
          choreAmount: action.choreAmount,
          choreTotal: action.choreTotal
        }
      ]
    });
  } else if (action.type === FETCH_ENTRIES_SUCCESS) {
    return action.Chores;
  } else if (action.type === FETCH_ENTRIES_ERROR) {
      return Object.assign({}, state, {
          error: action.error
      });
  }
  return state;
};
