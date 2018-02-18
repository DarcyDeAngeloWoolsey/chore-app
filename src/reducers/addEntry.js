import * as actions from "../actions/index";

const initialState = {
  balanceBook: []
};

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
  } else if (action.type === actions.FETCH_ENTRIES_SUCCESS) {
    return action.Chores;
  }
  return state;
};
