
export const SET_USER = 'SET_USER';
export const CLEAR_USER = 'CLEAR_USER';

const setUser = (user) => {
    return {type: SET_USER, user}
}

export const clearUser = () => {
    return {type: CLEAR_USER}
}

export default setUser;