import React from 'react'
import SuggestedActivity from './Views/Suggestion/SuggestedActivity'
import SuggestionAddOwn from './Views/Suggestion/SuggestionAddOwn'

const initState = {
    title: "",
    accessibility: "",
    participants: "",
    price: "",
    link: "",
    saveGlobally: false
}

class Suggestion extends React.Component {
    constructor(props) {
        super(props)

        this.state = {...initState}
        console.log(props)
    }

    onChangeOwn(e) {
        if (e.target.name === "saveGlobally") {
            this.setState({
                [e.target.name]: e.target.checked
            })
        } else {
            this.setState({
                [e.target.name]: e.target.value
            })
        }
    }

    onSaveOwn() {
        const {title, accessibility, participants, price, saveGlobally} = this.state

        this.props.setSuggestion({
            activity: title,
            accessibility,
            participants,
            price,
            link: "",
            isOwn: true,
            createdByID: this.props.state.userData.user.id,
            createdByUsername: this.props.state.userData.user.username,
            saveGlobally 
        })
        // this.setState({...initState})
    }

    onClickHelp() {
        const {actions} = this.props
        
        actions.setAndShowAlert(
            "Help",
            <div style={{textAlign: "left"}}>
                <b>Randomizing activities: </b>
                Press the button <i style={{color: "#2c57a8"}}>"Suggest a new activity"</i> to randomize an activity.
                <br/><br/><b>Adding activities: </b>
                Select a bukketlist to the right to add your activities to. If you have no bukketlist, create one. Once created, you can add activities to it.
                <br/><br/><b>Removing activities: </b>
                Select the bukketlist and the activity you want to remove and click <i style={{color: "#a82c2c"}}>"Remove"</i> on the activity in the bukketlist below.
                <br/><br/><b>Marking activities as done: </b>
                Select the bukketlist and the activity you want to mark as done and click <i style={{color: "#2ca82c"}}>"Mark as done"</i> on the activity in the bukketlist below. Activities marked as done will remain in the list, but you have the option to remove them.
                <br/><br/><b>Creating activities: </b>
                In addition to randomizing activities you can add your own activities by pressing <i style={{color: "#a82c2c"}}>"Add own activity"</i>. Fill the form and submit.
                When creating your own activity, you have the choice to make it available as a suggestion for other users, i.e. there is a chance they can be randomly suggested to other users. Click the box <i style={{color: "gray"}}>"Add as suggestions for other users"</i> when creating your activity. If you don't click it the activity won't be suggested to other users.
            </div>,
            [<button className="btn green" onClick={() => actions.hideAlert()}>Close</button>]
        )
    }

    render() {
        const {fetching, suggestion , addOwn} = this.props

        return (
            <>
                {!addOwn && <SuggestedActivity fetching={fetching} suggestion={suggestion.activity === "" ? null : suggestion} user={this.props.state.userData.user} onClickHelp={this.onClickHelp.bind(this)} />}
                {addOwn && <SuggestionAddOwn addOwnState={this.state} onChange={this.onChangeOwn.bind(this)} onSave={this.onSaveOwn.bind(this)}/>}
            </>
        )
    }
}

export default Suggestion