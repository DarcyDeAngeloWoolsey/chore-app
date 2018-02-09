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

export const fetchUser = () => dispatch => {
  console.log("fetch user running");
  fetch(`${API_BASE_URL}/home/login`)
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
