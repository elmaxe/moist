import React from 'react'

import './Home.css'
import '../../Buttons.css'
import Bucketlist from '../Bucketlist/Bucketlist'
import Suggestion from './Suggestion'

class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            suggestion: null,
            fetching: false,
            addOwn: false,
        }

        this.save = this.save.bind(this)
        this.getSuggestion = this.getSuggestion.bind(this)
        this.get = this.get.bind(this)
        this.upload = this.upload.bind(this)
        this.toggleAddOwn = this.toggleAddOwn.bind(this)
    }

    componentDidMount() {
        this.get()
    }

    save()  {
        //setBucketlist(bucketlist.concat([suggestion]))
        this.upload(this.state.suggestion)
    }

    getSuggestion() {
        this.setState({fetching: true})
        // fetch('https://www.boredapi.com/api/activity', {
        //     method: "GET"
        // })
        // .then(res => res.json())
        // .then(json => {
        //     console.log(json)
        //     this.setState({fetching: false, suggestion: json})
        // })
        fetch('/api/activities/randomize', {
            method: "GET",
            credentials: "same-origin"
        })
        .then(res => res.json())
        .then(json => {
            console.log(json)
            if (json.error) {
                this.setState({fetching: false, suggestion: {activity: json.error}})
            } else {
                this.setState({fetching: false, suggestion: json.row})
            }
        })
    }

    get() {
        fetch('/api/activities/get', {
            method: "GET",
            credentials: "same-origin"
        })
        .then(res => res.json())
        .then(json => {
            console.log(json)
            this.props.actions.setBucketlist(json.rows)
            // this.setState({bucketlist: json.rows})
        })
    }
    
    upload(data) {
        this.props.actions.addActivity(data)
    }

    toggleAddOwn() {
        this.setState({addOwn: !this.state.addOwn})
    }

    setSuggestion(suggestion) {
        this.setState({suggestion, addOwn: false})
    }



    render() {
        const {suggestion, fetching, addOwn} = this.state

        const suggInList = this.props.state.bucketlist.map(x => x.activity).includes(suggestion === null ? "" : suggestion.activity)

        return (
            <div>
                <div className="Home">
                    <div>
                        <h1>Manage bukketlist</h1>
                    </div>
                    <div className="SuggestionButtons">
                        <button className="btn blue" onClick={this.getSuggestion} disabled={fetching || addOwn} >Suggest a{suggestion ? " new" : "n"} activity</button>
                        <button className="btn red" onClick={this.toggleAddOwn} disabled={!suggestion}>{!addOwn ? "Add own activity" : "Cancel"}</button>
                    </div>
                        <button className="btn green" onClick={this.save} disabled={!suggestion || suggInList || addOwn}>Save to bucketlist</button>
                    <div>
                        <Suggestion state={this.props.state} fetching={fetching} suggestion={suggestion} addOwn={this.state.addOwn} setSuggestion={this.setSuggestion.bind(this)} />
                    </div>
                    <div>
                        <h1>My bukketlist</h1>
                    </div>
                    <Bucketlist actions={this.props.actions} bucketlist={this.props.state.bucketlist} />
                </div>
            </div>
        )
    }
}

export default Home