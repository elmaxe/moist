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

    render() {
        const {fetching, suggestion , addOwn} = this.props

        return (
            // <SuggestionView fetching={fetching} suggestion={suggestion} addOwn={addOwn} ownState={this.state} onChangeOwn={this.onChangeOwn.bind(this)} onSaveOwn={this.onSaveOwn.bind(this)} user={this.props.state.userData.user} />
            <>
                {!addOwn && <SuggestedActivity fetching={fetching} suggestion={suggestion} user={this.props.state.userData.user} />}
                {addOwn && <SuggestionAddOwn addOwnState={this.state} onChange={this.onChangeOwn.bind(this)} onSave={this.onSaveOwn.bind(this)}/>}
            </>
        )
    }
}

export default Suggestion