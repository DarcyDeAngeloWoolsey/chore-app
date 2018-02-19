import {normalizeResponseErrors} from './utils';
const { API_BASE_URL } = require("../config");

export const ADD_ENTRY = "ADD_ENTRY";
export const addEntry = ( choreDate, choreType, choreBanking, choreAmount, choreTotal) => dispatch => {
  console.log("addEntry runngin");
    return fetch(`${API_BASE_URL}/balanceBook`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          choreDate,
          choreType,
          choreBanking,
          choreAmount,
          choreTotal
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

export const FETCH_ENTRIES_SUCCESS = "FETCH_ENTRIES_SUCCESS";
export const fetchEntriesSuccess = records => ({
  type: FETCH_ENTRIES_SUCCESS,
  records
});

export const FETCH_ENTRIES_ERROR = 'FETCH_ENTRIES_ERROR';
export const fetchEntriesError = error => ({
    type: FETCH_ENTRIES_ERROR,
    error
});


export const fetchEntries = () => (dispatch, getState) => {
  //  const authToken = getState().authToken;
    return fetch(`${API_BASE_URL}/balanceBook`, {
        method: 'GET',
        headers: {
            // Provide our auth token as credentials
          //  Authorization: `Bearer ${authToken}`
        }
    })
        .then(console.log("sdfghhcgfghjgfhjkhgfhjkhgfhjkhggfhjkhgfdghjggfdghjgfdghjgfd"))
        .then(res => console.log((res.body)))
         .then(res => normalizeResponseErrors(res))
        .then(res => res.json())
        .then(({records}) => dispatch(fetchEntriesSuccess(records)))
        .catch(err => {
            dispatch(fetchEntriesError(err));
        });
};
