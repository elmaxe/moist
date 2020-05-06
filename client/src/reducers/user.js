import {SET_USER, CLEAR_USER, SET_PROFILE_PIC} from '../actions/user.js'

const initialState = {
    authenticated: false,
    hasFirstAuth: false,
    user: {
        id: "",
        email: "",
        username: "",
        profilePicture: "",
        regDate: "",
    }
}

const userData = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER:
            return action.userData;
        case CLEAR_USER:
            return {...initialState};
        case SET_PROFILE_PIC:
            return {
                authenticated: state.authenticated,
                hasFirstAuth: state.hasFirstAuth,
                user: {
                    id: state.user.id,
                    email: state.user.email,
                    username: state.user.username,
                    profilePicture: action.path,
                    regDate: state.user.regDate
                }
            }
        default: return state;
    }
}

export default userData;