import {SET_USER, CLEAR_USER} from '../actions/user.js'

const initialState = null

const user = (state = initialState, action) => {
    console.log(action)
    console.log(action.user)
    switch (action.type) {
        case SET_USER:
            return action.user;
        case CLEAR_USER:
            return null;
        default: return state;
    }
}

export default user;