import {SET_BUCKETLIST, CLEAR_BUCKETLIST} from '../actions/bucketlist'

const initState = {}

const bucketlist = (state = initState, action) => {
    switch (action.type) {
        case SET_BUCKETLIST:
            return action.bukketlist
        case CLEAR_BUCKETLIST:
            return {}
        default: return state
    }
}

export default bucketlist