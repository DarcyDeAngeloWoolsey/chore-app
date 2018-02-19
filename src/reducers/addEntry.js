import * as actions from "../actions/entryActions";
import { FETCH_ENTRIES_SUCCESS, FETCH_ENTRIES_ERROR } from '../actions/entryActions.js';

const initialState = {
  balanceBook: [],
  error: null
};

//what we need here is if there is a success, then load that persons entries. and everytime they do an entry,
//they will commit it ot the database. So we need to create a post in actions/index.js for posting to their account

//seeded database should have balanceBook inside user then?
//what I could do instead is that the bankbook has a seperate collection and then we give each user a bankBokkId that matches
//that matches the balanceBook id http://mongoosejs.com/docs/populate.html

//fetch all first, add new ones to database with a post/update, then show the new ones(send to db and render at the same time without doing another fetch).

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
  } if (action.type === FETCH_ENTRIES_SUCCESS) {
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
        ],
          error: null
      });
  } if (action.type === FETCH_ENTRIES_ERROR) {
      return Object.assign({}, state, {
          error: action.error
      });
  }
  return state;
};
