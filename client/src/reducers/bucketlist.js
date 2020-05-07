import {SET_BUCKETLIST, CLEAR_BUCKETLIST} from '../actions/bucketlist'

// const initState = {
//     bukketlist: undefined,
//     activities: []
// }

const initState = -100

const bucketlist = (state = initState, action) => {
    switch (action.type) {
        case SET_BUCKETLIST:
            return action.index
        case CLEAR_BUCKETLIST:
            return initState
        default: return state
    }
}

export default bucketlist