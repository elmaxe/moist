import {FETCH_BUKKETLISTS, ADD_ACTIVITY, REMOVE_ACTIVITY, MARK_AS_DONE} from '../actions/bucketlist'

const initState = []

const bucketlists = (state = initState, action) => {
    switch (action.type) {
        case ADD_ACTIVITY:
            //Find activity list to add to
            const activitylistToAddTo = [...state].filter(blist => blist.bukketlist.bid === action.bid)[0].activities
            //Add new activity to that list
            const newActivities = activitylistToAddTo.concat(action.activity)

            //Replace the old activity list with the new one in the correct bukketlist
            const newState = [...state].map(x => {
                if (x.bukketlist.bid === action.bid) {
                    x.activities = newActivities
                }
                return x
            })

            //This is fishy, check redux-logger in console, list is same before and after action. No deep copy
            return newState
        case REMOVE_ACTIVITY:
            const activitylistToRemoveFrom = [...state].filter(x => x.bukketlist.bid === action.bid)[0].activities
            const newActivities2 = activitylistToRemoveFrom.filter((x,i) => i !== action.index)

            const newState2 = [...state].map(x => {
                if (x.bukketlist.bid === action.bid) {
                    x.activities = newActivities2
                }
                return x
            })

            return newState2
        case MARK_AS_DONE:
            const toReturn = [...state]
            const activity = toReturn.filter(x => x.bukketlist.bid === action.bid)[0].activities[action.index]
            activity.done = action.state

            return toReturn
        case FETCH_BUKKETLISTS:
            return action.bukketlists
        default: return state
    }
}

export default bucketlists