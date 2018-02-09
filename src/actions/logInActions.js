const { API_BASE_URL } = require("../config");

export const LOGIN = "LOGIN";
export const logIn = (userName, password, loggedIn) => ({
  type: LOGIN,
  userName,
  password,
  loggedIn,
});

//do I even need a fetchLogin?
export const FETCH_LOGIN_SUCCESS = "FETCH_LOGIN_SUCCESS";
export const fetchLogInSuccess = User => ({
  type: FETCH_LOGIN_SUCCESS,
  User
});

export const fetchLogIn = () => dispatch => {
  console.log("fetch logIn running");
  fetch(`${API_BASE_URL}/home/login`)
    .then(res => {
      if (!res.ok) {
        return Promise.reject(res.statusText);
      }
      return res.json();
    })
    .then(User => {
      dispatch(fetchLogInSuccess(User));
    });
};
