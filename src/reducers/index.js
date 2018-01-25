import * as actions from '../actions/index';

const initialState = {
  choreList: []
};

export const addChoreReducer = (state=initialState, action) => {
    if (action.type === actions.ADD_CHORE) {
        return Object.assign({}, state, {
             choreList: [...state.choreList, {
                 choreDate: action.choreDate,
                 choreType: action.choreType,
                 choreBanking: action.choreBanking,
                 choreAmount: action.choreAmount
             }]
         });

    }
    else if (action.type === actions.FETCH_CHORES_SUCCESS) {
        return action.Chores;
    }
    return state;
};
