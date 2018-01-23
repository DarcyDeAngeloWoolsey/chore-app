import * as actions from '../actions/index';

const initialState = {
  choreList: [{
    choreDate: 'January 21 2018',
    choreType: 'Wash Dishes',
    choreBanking: 'Credit',
    choreAmount: 5.00
  },
  {
    choreDate: 'January 22 2018',
    choreType: 'Take out Trash',
    choreBanking: 'Deposit',
    choreAmount: 3.00
  }
]
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

    return state;
};
