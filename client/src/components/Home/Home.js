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
        }

        this.save = this.save.bind(this)
        this.getSuggestion = this.getSuggestion.bind(this)
        this.get = this.get.bind(this)
        this.upload = this.upload.bind(this)
    }

    componentDidMount() {
        this.get()
    }

    save()  {
        //setBucketlist(bucketlist.concat([suggestion]))
        this.upload(this.state.suggestion)
    }

    getSuggestion() {
        this.setState({fetching: true, suggestion: null})
        fetch('https://www.boredapi.com/api/activity', {
            method: "GET"
        })
        .then(res => res.json())
        .then(json => {
            console.log(json)
            this.setState({fetching: false, suggestion: json})
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
        console.log(data)
        this.props.actions.addActivity(data)
    }


    render() {
        const {suggestion, fetching} = this.state

        const suggInList = this.props.state.bucketlist.map(x => x.activity).includes(suggestion === null ? "" : suggestion.activity)

        return (
            <div>
                <div className="Home">
                    <div>
                        <h1>My bukketlist</h1>
                    </div>
                    <div>
                        <button className="btn blue" onClick={this.getSuggestion} disabled={fetching} >Suggest an activity</button>
                    </div>
                    <div>
                        <Suggestion fetching={fetching} suggestion={suggestion} />
                    </div>
                    <div>
                        <button className="btn green" onClick={this.save} disabled={!suggestion || suggInList}>Save to bucketlist</button>
                    </div>
                    <Bucketlist actions={this.props.actions} bucketlist={this.props.state.bucketlist} />
                </div>
            </div>
        )
    }
}

export default Home