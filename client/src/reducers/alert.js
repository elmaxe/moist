import {SET_AND_SHOW_ALERT, HIDE_ALERT} from '../actions/alert'

const initState = {
    title: "",
    text: "",
    buttons: [],
    show: false
}

const alertReducer = (state = initState, action) => {
    switch(action.type) {
        case SET_AND_SHOW_ALERT:
            return action.alertObject
        case HIDE_ALERT:
            return {
                title: state.title,
                text: state.text,
                buttons: state.buttons,
                show: false
            }
        default:
            return state
    }
}

export default alertReducer