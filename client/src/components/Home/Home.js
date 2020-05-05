import React from 'react'

import './Home.css'
import '../../Buttons.css'
import Bucketlist from './Views/Bucketlist/Bucketlist'
import SuggestionController from './SuggestionController'
import Sidebar from './Sidebar'
import Alert from '../Alert/Alert'

class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            suggestion: {
                activity: "",
                accessibility: "",
                key: "",
                link: "",
                participants: "",
                price: "",
                type: ""
            },
            fetching: false,
            addOwn: false,
        }
        this.save = this.save.bind(this)
        this.getSuggestion = this.getSuggestion.bind(this)
        this.upload = this.upload.bind(this)
        this.toggleAddOwn = this.toggleAddOwn.bind(this)
    }

    componentDidMount() {
        
    }

    save()  {
        this.upload(this.state.suggestion)
    }

    getSuggestion() {
        this.setState({fetching: true})
        fetch('/api/activities/randomize', {
            method: "GET",
            credentials: "same-origin"
        })
        .then(res => res.json())
        .then(json => {
            if (json.error) {
                //TODO: fetchIsAuth()
                this.setState({fetching: false, suggestion: {activity: json.error}})
            } else {
                this.setState({fetching: false, suggestion: json.row})
            }
        })
    }
    
    upload(data) {
        this.props.actions.addActivity(data, this.props.state.bucketlist.bukketlist.bid)
    }

    toggleAddOwn() {
        this.setState({addOwn: !this.state.addOwn})
    }

    setSuggestion(suggestion) {
        this.setState({suggestion, addOwn: false})
    }



    render() {
        const {suggestion, fetching, addOwn} = this.state

        const suggInList = this.props.state.bucketlist.activities.map(x => {return x.activity === suggestion.activity}).includes(true)
        
        const sidebarActions = {
            setAndShowAlert: this.props.actions.setAndShowAlert,
            hideAlert: this.props.actions.hideAlert,
            fetchBukketlists: this.props.actions.fetchBukketlists,
            createBukketlist: this.props.actions.createBukketlist,
            removeBukketlist: this.props.actions.removeBukketlist,
            setBukketlist: this.props.actions.setBucketlist,
            clearBucketlist: this.props.actions.clearBucketlist
        }

        const suggActions = {
            setAndShowAlert: this.props.actions.setAndShowAlert,
            hideAlert: this.props.actions.hideAlert,
        }

        return (
            <div>
                <div className="Home">
                    <div>
                        <h1>Add activities</h1>
                    </div>
                    <div className="SuggestionButtons">
                        <button className="btn blue" onClick={this.getSuggestion} disabled={fetching || addOwn} >Suggest a{suggestion ? " new" : "n"} activity</button>
                        <button className="btn red" onClick={this.toggleAddOwn} disabled={!suggestion}>{!addOwn ? "Add own activity" : "Cancel"}</button>
                    </div>
                        <span className="SuggestionSaveButton">
                        <button className="btn green" onClick={this.save} disabled={suggestion.activity === "" || suggInList || addOwn || this.props.state.bucketlist.bukketlist === undefined}>Save to bucketlist</button>
                        {this.props.state.bucketlist.bukketlist === undefined && suggestion && <span className="SuggestionSaveButtonWarning">No bukketlist selected</span>}
                        </span>
                    <div>
                        <SuggestionController state={this.props.state} actions={suggActions} fetching={fetching} suggestion={suggestion} addOwn={this.state.addOwn} setSuggestion={this.setSuggestion.bind(this)} />
                    </div>
                    <div>
                        <h1>{this.props.state.bucketlist.bukketlist ? this.props.state.bucketlist.bukketlist.name : "Select a bukketlist"}</h1>
                    </div>
                    <Bucketlist actions={this.props.actions} bucketlist={this.props.state.bucketlist} />
                </div>
                <Sidebar actions={sidebarActions} state={{bucketlists: this.props.state.bucketlists, bucketlist: this.props.state.bucketlist}}/>
                {this.props.state.alertReducer.show ?
                    <Alert title={this.props.state.alertReducer.title} text={this.props.state.alertReducer.text} buttons={this.props.state.alertReducer.buttons} show={this.props.state.alertReducer.show} hideAlert={this.props.actions.hideAlert}/>
                :
                    null
                }
            </div>
        )
    }
}

export default Home