import {fetchIsAuth} from './user'
export const ADD_ACTIVITY = "ADD_ACTIVITY"
export const REMOVE_ACTIVITY = "REMOVE_ACTIVITY"
export const SET_BUCKETLIST = "SET_BUCKETLIST"

export const FETCH_BUKKETLISTS = "FETCH_BUKKETLISTS"

function addActivity(data, bid) {
    console.log(bid)
    return dispatch => {
        fetch('/api/activities/add', {
            method: "POST",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                activity: data.activity,
                accessibility: data.accessibility,
                type: data.type,
                participants: data.participants,
                price: data.price,
                link: data.link,
                key: data.key,
                createdBy: {
                    uid: data.createdByID,
                    username: data.createdByUsername
                },
                saveGlobally: data.saveGlobally,
                bid
            })
        })
        .then(res => res.json())
        .then(json => {
            console.log(json)
            if (json.error) {
                //TODO: SHOW ERROR
            } else {
                //this.get()
                dispatch({type: ADD_ACTIVITY, activity: {
                    activity: data.activity,
                    accessibility: data.accessibility,
                    type: data.type,
                    participants: data.participants,
                    price: data.price,
                    link: data.link,
                    key: data.key
                }})
            }
        })
    }
}

export function removeActivity(index, aid) {
    return dispatch => {
        fetch('/api/activities/remove', {
            method: "POST",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({aid})
        })
        .then(res => res.json())
        .then(json => {
            console.log(json)
            if (json.error) {

            } else {
                dispatch({type: REMOVE_ACTIVITY, index})
            }
        })
    }
}

export function setBucketlist(bukketlist) {
    return dispatch => {
        dispatch({type: SET_BUCKETLIST, bukketlist})
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
        console.log(json)
        if (json.error) {
            dispatch(FETCH_BUKKETLISTS, [])
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