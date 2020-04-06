import {ADD_ACTIVITY, REMOVE_ACTIVITY, SET_BUCKETLIST} from '../actions/bucketlist'

const initState = []

const bucketlist = (state = initState, action) => {
    switch (action.type) {
        case ADD_ACTIVITY:
            return [...state].concat(action.activity)
        case REMOVE_ACTIVITY:
            console.log(action)
            let newArray = [...state]
            newArray.splice(action.index, 1)
            return newArray
        case SET_BUCKETLIST:
            return action.bucketlist
        default: return state
    }
}

export default bucketlist