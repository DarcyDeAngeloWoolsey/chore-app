import * as actions from "../actions/logInActions";

//right now we are creating a user and then sending back the userName
//we will need a unique ID generator

const initialState = {
  users: []
};

export const logInReducer = (state = initialState, action) => {
  if (action.type === actions.LOGIN) {
    return Object.assign({}, state, {
      users: [
        ...state.users,
        {
          userName: action.userName,
          password: action.password,
        }
      ]
    });
  }
  return state;
}
