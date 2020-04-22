export const SET_AND_SHOW_ALERT = "SET_AND_SHOW_ALERT"
export const HIDE_ALERT = "HIDE_ALERT"

function setAndShowAlert(title = "", text = "", buttons = []) {
    const alertObject = {
        title,
        text,
        buttons,
        show: true
    }

    return dispatch => {
        dispatch({type: SET_AND_SHOW_ALERT, alertObject})
    }
}

export default setAndShowAlert

export function hideAlert() {
    return dispatch => {
        dispatch({type: HIDE_ALERT})
    }
}