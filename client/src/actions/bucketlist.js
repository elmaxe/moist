

export const ADD_ACTIVITY = "ADD_ACTIVITY"
export const REMOVE_ACTIVITY = "REMOVE_ACTIVITY"
export const SET_BUCKETLIST = "SET_BUCKETLIST"

function addActivity(data) {
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
                //TODO: GENERATE KEY FOR user created activities
                key: data.key,
                createdBy: {
                    uid: data.createdByID,
                    username: data.createdByUsername
                },
                saveGlobally: data.saveGlobally
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

export function setBucketlist(bucketlist) {
    return dispatch => {
        dispatch({type: SET_BUCKETLIST, bucketlist})
    }
}

export default addActivity