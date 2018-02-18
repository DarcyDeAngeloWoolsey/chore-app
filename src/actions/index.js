import {normalizeResponseErrors} from './utils';
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

export const FETCH_ENTRIES_ERROR = 'FETCH_ENTRIES_ERROR';
export const fetchEntriesError = error => ({
    type: FETCH_ENTRIES_ERROR,
    error
});


export const fetchEntries = () => (dispatch, getState) => {
    const authToken = getState().authToken;
    return fetch(`${API_BASE_URL}/Entries`, {
        method: 'GET',
        headers: {
            // Provide our auth token as credentials
            Authorization: `Bearer ${authToken}`
        }
    })
        .then(res => normalizeResponseErrors(res))
        .then(res => res.json())
        .then(({data}) => dispatch(fetchEntriesSuccess(data)))
        .catch(err => {
            dispatch(fetchEntriesError(err));
        });
};
