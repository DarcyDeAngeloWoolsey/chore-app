

export const USER_INPUT = 'USER_INPUT';
export const userInput = (userName, email, password) => ({
    type: USER_INPUT,
    userName,
    email,
    password
});
