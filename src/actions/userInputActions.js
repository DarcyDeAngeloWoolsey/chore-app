import {normalizeResponseErrors} from './utils';
const { API_BASE_URL } = require("../config");

export const USER_INPUT = "USER_INPUT";
export const userInput = (userName, email, password, loggedIn) => ({
  type: USER_INPUT,
  userName,
  email,
  password,
  loggedIn,
});

export const FETCH_USER_SUCCESS = "FETCH_USER_SUCCESS";
export const fetchUserSuccess = User => ({
  type: FETCH_USER_SUCCESS,
  User
});

//this will fetch from the auth array in server get request.
export const fetchUser = () => dispatch => {
  console.log("fetch user running");
  fetch(`${API_BASE_URL}/home/sign-up`)
    .then(res => {
      if (!res.ok) {
        return Promise.reject(res.statusText);
      }
      return res.json();
    })
    .then(User => {
      dispatch(fetchUserSuccess(User));
    });
};


export const registerUser = (userName, email, password) => dispatch => {
  console.log("registered user running");
    return fetch(`${API_BASE_URL}/sign-up`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userName,
          email,
          password
        })
    })
        .then(res => normalizeResponseErrors(res))
        .then(res => res.json())
        // .catch(err => {
        //     const {reason, message, location} = err;
        //     if (reason === 'ValidationError') {
        //         // Convert ValidationErrors into SubmissionErrors for Redux Form
        //         return Promise.reject(
        //             new SubmissionError({
        //                 [location]: message
        //             })
        //         );
        //     }
        // });
};
