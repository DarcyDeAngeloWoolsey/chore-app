import {USER_INPUT} from '../actions/userInputActions';

//right now we are creating a user and then sending back the userName
//we will need a unique ID generator

const initialState = {
  users: []
};

export default function userInputReducer (state=initialState, action){
    if (action.type === USER_INPUT) {
        return Object.assign({}, state, {
             users: [...state.users, {
                     userName: action.userName,
                     email: action.email,
                     password: action.password,
                     loggedIn: true,
             }]
         });
    }
    return state;
};