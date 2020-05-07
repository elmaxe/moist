import {fetchIsAuth} from './user'
export const ADD_ACTIVITY = "ADD_ACTIVITY"
export const REMOVE_ACTIVITY = "REMOVE_ACTIVITY"
export const SET_BUCKETLIST = "SET_BUCKETLIST"
export const CLEAR_BUCKETLIST = "CLEAR_BUCKETLIST"
export const MARK_AS_DONE = "MARK_AS_DONE"
export const FETCH_BUKKETLISTS = "FETCH_BUKKETLISTS"

function addActivity(activity, bid) {
    return dispatch => {
        fetch('/api/activities/add', {
            method: "POST",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                activity: activity.activity,
                accessibility: activity.accessibility,
                type: activity.type,
                participants: activity.participants,
                price: activity.price,
                link: activity.link,
                key: activity.key,
                createdBy: {
                    uid: activity.createdByID,
                    username: activity.createdByUsername
                },
                saveGlobally: activity.saveGlobally,
                bid
            })
        })
        .then(res => res.json())
        .then(json => {
            if (json.error) {
                //TODO: SHOW ERROR
                fetchIsAuth(dispatch)
            } else {
                //this.get()
                //TODO: aid
                dispatch({type: ADD_ACTIVITY, bid, activity: {
                    aid: undefined,
                    bid,
                    activity: activity.activity,
                    accessibility: activity.accessibility,
                    type: activity.type,
                    participants: activity.participants,
                    price: activity.price,
                    link: activity.link,
                    key: activity.key,
                    done: 0
                }})
                // dispatch({type: FETCH_BUKKETLISTS, bukketlists: json.bukketlists})
                // getBukketlists(dispatch)
            }
        })
    }
}

export function removeActivity(index, bid, activity) {
    return dispatch => {
        fetch('/api/activities/remove', {
            method: "POST",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({bid, activity})
        })
        .then(res => res.json())
        .then(json => {
            if (json.error) {
                fetchIsAuth(dispatch)
            } else {
                dispatch({type: REMOVE_ACTIVITY, bid, index})
            }
        })
        // dispatch({type: REMOVE_ACTIVITY, bid, index})
    }
}

export function markAsDone(index, bid, aid, state) {
    return dispatch => {
        fetch('/api/activities/markasdone', {
            method: "POST",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({bid, aid, state})
        })
        .then(res => res.json())
        .then(json => {
            if (json.error) {
                fetchIsAuth(dispatch)
            } else {
                dispatch({type: MARK_AS_DONE, index, bid, state})
            }
        })
    }
}

export function setBucketlist(index) {
    return dispatch => {
        dispatch({type: SET_BUCKETLIST, index})
    }
}

export function clearBucketlist() {
    return dispatch => {
        dispatch({type: CLEAR_BUCKETLIST})
    }
}

export function fetchBukketlists() {
    return dispatch => {
        getBukketlists(dispatch)
    }
}

const getBukketlists = (dispatch) => {
    fetch('/api/bukketlist/mine', {
        method: "GET",
        credentials: "same-origin",
    })
    .then(res => res.json())
    .then(json => {
        if (json.error) {
            dispatch({type: FETCH_BUKKETLISTS, bucketlists: []})
        } else {
            dispatch({type: FETCH_BUKKETLISTS, bukketlists: json.bukketlists})
        }
    })
}

export function removeBukketlist(bid) {
    return dispatch => {
        fetch('/api/bukketlist/remove', {
            method: "POST",
            credentials: "same-origin",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify({bid})
        })
        .then(res => res.json())
        .then(json => {
            if (json.error) {
                fetchIsAuth(dispatch)
            } else {
                getBukketlists(dispatch)
                dispatch({type: "HIDE_ALERT"})
            }
        })
    }
}

export function createBukketlist(name, description, isPrivate) {
    return dispatch => {
        fetch('/api/bukketlist/create', {
            method: "POST",
            credentials: "same-origin",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify({name, description, private: isPrivate})
        })
        .then(res => res.json())
        .then(json => {
            if (json.error) {
                fetchIsAuth(dispatch)
            } else {
                getBukketlists(dispatch)
                dispatch({type: "HIDE_ALERT"})
            }
        })
    }
}

export default addActivity