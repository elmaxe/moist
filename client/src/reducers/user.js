import {SET_USER, CLEAR_USER} from '../actions/user.js'

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
        default: return state;
    }
}

export default userData;