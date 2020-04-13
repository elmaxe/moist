import * as ROUTES from '../routes'

export const SET_USER = 'SET_USER';
export const CLEAR_USER = 'CLEAR_USER';
export const SET_FIRST_AUTH = 'SET_FIRST_AUTH';

const setUserAction = (userData) => {
    return {type: SET_USER, userData}
}

const clearUserAction = () => {
    return {type: CLEAR_USER}
}

/**
 * Set the current user in store.
 * @param {Boolean} authenticated if user is authenticated or not
 * @param {Boolean} hasFirstAuth have we done the on start fetch?
 * @param {String} id id of user.
 * @param {String} email email of user.
 * @param {String} username username of user.
 * @param {String} profilePicture URL to profile image (on this domain).
 * @param {String} regDate registration date of user.
 */
export function setUser(authenticated = false, hasFirstAuth = false, id = "", email = "", username = "", profilePicture = "", regDate = "") {
    return dispatch => {
        dispatch(setUserAction({
            authenticated,
            hasFirstAuth,
            user: {
                id,
                email,
                username,
                profilePicture,
                regDate
            }
        }));
    }
}

export default setUser;