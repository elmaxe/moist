import {FETCH_BUKKETLISTS, ADD_ACTIVITY, REMOVE_ACTIVITY} from '../actions/bucketlist'

const initState = []

// case ADD_ACTIVITY:
//     return [...state].concat(action.activity)
// case REMOVE_ACTIVITY:
//     console.log(action)
//     let newArray = [...state]
//     newArray.splice(action.index, 1)
//     return newArray

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

            //This is fishy, check redux-logger in console, list is same before and after action
            return newState
        case REMOVE_ACTIVITY:
            const activitylistToRemoveFrom = [...state].filter(x => x.bukketlist.bid === action.bid)[0].activities
            const newActivities2 = activitylistToRemoveFrom.filter((x,i) => i !== action.index)
            // console.log([...state].filter(x => x.bukketlist.bid === action.bid)[0].activities)
            // console.log(activitylistToRemoveFrom.filter((x,i) => i !== action.index))

            // console.log([...state].map(x => {
            //     if (x.bukketlist.bid === action.bid) {
            //         x.activities = newActivities2
            //     }
            //     return x
            // }))

            const newState2 = [...state].map(x => {
                if (x.bukketlist.bid === action.bid) {
                    x.activities = newActivities2
                }
                return x
            })

            return newState2
        case FETCH_BUKKETLISTS:
            return action.bukketlists
        default: return state
    }
}

export default bucketlists