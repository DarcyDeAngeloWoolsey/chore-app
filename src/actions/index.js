export const ADD_CHORE = 'ADD_CHORE';
export const addChore = (choreDate, choreType, choreBanking, choreAmount) => ({
    type: ADD_CHORE,
    choreDate,
    choreType,
    choreBanking,
    choreAmount
});
