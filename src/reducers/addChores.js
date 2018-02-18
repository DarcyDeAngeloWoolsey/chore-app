import * as actions from "../actions/index";

const initialState = {
  balanceBook: []
};

export const addChoreReducer = (state = initialState, action) => {
  if (action.type === actions.ADD_CHORE) {
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
  } else if (action.type === actions.FETCH_CHORES_SUCCESS) {
    return action.Chores;
  }
  return state;
};
