import {ADD_ACTIVITY, REMOVE_ACTIVITY, SET_BUCKETLIST, FETCH_BUKKETLISTS} from '../actions/bucketlist'

const initState = 0

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
            return action.id
        default: return state
    }
}

export default bucketlist