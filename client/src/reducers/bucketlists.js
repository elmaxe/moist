import {FETCH_BUKKETLISTS} from '../actions/bucketlist'

const initState = []

const bucketlists = (state = initState, action) => {
    switch (action.type) {
        case FETCH_BUKKETLISTS:
            return action.bukketlists
        default: return state
    }
}

export default bucketlists