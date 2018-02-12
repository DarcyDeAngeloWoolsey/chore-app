import {normalizeResponseErrors} from './utils';
const { API_BASE_URL } = require("../config");

export const AUTH_REQUEST = 'AUTH_REQUEST';
export const authRequest = () => ({
    type: AUTH_REQUEST
});

export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const authSuccess = currentUser => ({
    type: AUTH_SUCCESS,
    currentUser
});

export const AUTH_ERROR = 'AUTH_ERROR';
export const authError = error => ({
    type: AUTH_ERROR,
    error
});

export const login = (userName, password) => dispatch => {
  console.log("login action running");
    dispatch(authRequest());
    return (
        fetch(`${API_BASE_URL}/home/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userName,
                password
            })
        })

            .then(res => normalizeResponseErrors(res))
            .then(res => res.json())
            // .then(({authToken}) => storeAuthInfo(authToken, dispatch))
            // .catch(err => {
            //     const {code} = err;
            //     const message =
            //         code === 401
            //             ? 'Incorrect username or password'
            //             : 'Unable to login, please try again';
            //     dispatch(authError(err));
            //     return Promise.reject(
            //         new SubmissionError({
            //             _error: message
            //         })
            //     );
            // })
    );
};
