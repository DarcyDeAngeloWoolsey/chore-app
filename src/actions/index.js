const { API_BASE_URL } = require("../config");

export const ADD_ENTRY = "ADD_ENTRY";
export const addEntry = (
  choreDate,
  choreType,
  choreBanking,
  choreAmount,
  choreTotal
) => ({
  type: ADD_ENTRY,
  choreDate,
  choreType,
  choreBanking,
  choreAmount,
  choreTotal
});

export const FETCH_ENTRIES_SUCCESS = "FETCH_ENTRIES_SUCCESS";
export const fetchEntriesSuccess = Chores => ({
  type: FETCH_ENTRIES_SUCCESS,
  Chores
});

export const fetchEntries = () => dispatch => {
  console.log("fetch running");
  fetch(`${API_BASE_URL}/Entries`, {
    headers: {
      authorization: `Bearer ${localStorage.getItem("token")}`
    }
  })
    .then(res => {
      if (!res.ok) {
        return Promise.reject(res.statusText);
      }
      return res.json();
    })
    .then(Chores => {
      dispatch(fetchEntriesSuccess(Chores));
    });
};
