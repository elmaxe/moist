import {SET_USER, CLEAR_USER} from '../actions/user.js'

const initialState = {}

const user = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER:
            return action.user;
        case CLEAR_USER:
            return {};
        default: return state;
    }
}

export default user;