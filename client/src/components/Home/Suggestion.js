import React from 'react'
import './Suggestion.css'
import Accessibility from '../../images/accessibility.svg'
import Participants from '../../images/participants.svg'
import Price from '../../images/price.svg'
import spinner from '../../images/spinner.gif'
import questionmark from '../../images/questionmark.svg'
import { Link } from 'react-router-dom'

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
            <SuggestionView fetching={fetching} suggestion={suggestion} addOwn={addOwn} ownState={this.state} onChangeOwn={this.onChangeOwn.bind(this)} onSaveOwn={this.onSaveOwn.bind(this)} user={this.props.state.userData.user} />
        )
    }
}

const SuggestionView = ({fetching, suggestion, addOwn, ownState, onChangeOwn, onSaveOwn, user}) => {
    const emptyData = ownState.title === "" || ownState.accessibility === "" || ownState.participants === "" || ownState.price === ""
    const invalidData = isNaN(parseFloat(ownState.accessibility)) || isNaN(parseInt(ownState.participants)) || isNaN(parseFloat(ownState.price)) || parseFloat(ownState.accessibility) < 0 || parseFloat(ownState.accessibility) > 1 || parseFloat(ownState.price) < 0 || parseFloat(ownState.price) > 1 || !(parseFloat(ownState.participants) > 0)

    return (
        <div className="Suggestion">

                <img title="Help" id="help" src={questionmark} hidden={!suggestion} />
                {fetching ? 
                    <img id="spinner" src={spinner} height="150px"/>
                    :
                    suggestion ?
                    <>
                            <div id="title">{addOwn ? <input placeholder="Activity" autoFocus autoComplete="off" name="title" value={ownState.title} onChange={onChangeOwn} type="text" /> : suggestion.activity}</div>
                            <div id="info">
                                <span id="icon" title="Accessibility">  
                                    <img src={Accessibility} height="30px" alt="Accessibility" />
                                    {addOwn ? <input placeholder="0-1" autoComplete="off" name="accessibility" value={ownState.accessibility} onChange={onChangeOwn} type="text" /> : suggestion.accessibility}
                                </span>
                                <span id="icon" title="Participants">
                                    <img src={Participants} height="30px" alt="Participants" />
                                    {addOwn ? <input placeholder="1-&#8734;" autoComplete="off" name="participants" value={ownState.participants} onChange={onChangeOwn} type="number" /> : suggestion.participants}
                                </span>
                                <span id="icon" title="Price">
                                    <img src={Price} height="30px" alt="Price" />
                                    {addOwn ? <input placeholder="0-1" autoComplete="off" name="price" value={ownState.price} onChange={onChangeOwn} type="text" /> : suggestion.price}
                                </span>
                            </div>
                            <div id="link">
                                {suggestion.link && !addOwn ? <a href={suggestion.link} title={suggestion.link} rel="noopener noreferrer" target="_blank">Link</a> : null}
                            </div>
                            <div id="warningtext">
                                {suggestion.saveGlobally && !addOwn ? "*Will add as a suggestion for other users" : null}
                            </div>
                            <div id="createdby">
                                {suggestion.createdBy ?
                                    <div>
                                            Created by user <Link to={'/u/' + suggestion.createdBy.username}>{suggestion.createdBy.username}</Link>
                                            <br />
                                            <Link to={{pathname: '/report', state: {suggestion, reporter: user, time: Date.now()}}}>Report</Link>
                                    </div>
                                : null}
                            </div>
                            <div id="saveOwn">
                            {addOwn ? <><button className="btn green" onClick={onSaveOwn} disabled={emptyData || invalidData} >Save</button><span><input onChange={onChangeOwn} checked={ownState.saveGlobally} name="saveGlobally" type="checkbox" />Add as suggestions for other users</span></> : null}
                            </div>
                    </>
                    :
                    <b>Click the button above to randomize an activity</b>
                }
        </div>
    )
}

export default Suggestion