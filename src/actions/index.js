const { API_BASE_URL } = require("../config");

export const ADD_CHORE = "ADD_CHORE";
export const addChore = (
  choreDate,
  choreType,
  choreBanking,
  choreAmount,
  choreTotal
) => ({
  type: ADD_CHORE,
  choreDate,
  choreType,
  choreBanking,
  choreAmount,
  choreTotal
});

export const FETCH_CHORES_SUCCESS = "FETCH_CHORES_SUCCESS";
export const fetchChoresSuccess = Chores => ({
  type: FETCH_CHORES_SUCCESS,
  Chores
});

export const fetchChores = () => dispatch => {
  console.log("fetch running");
  fetch(`${API_BASE_URL}/Chores`)
    .then(res => {
      if (!res.ok) {
        return Promise.reject(res.statusText);
      }
      return res.json();
    })
    .then(Chores => {
      dispatch(fetchChoresSuccess(Chores));
    });
};
