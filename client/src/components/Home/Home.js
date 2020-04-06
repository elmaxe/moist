import React from 'react'

import './Home.css'
import spinner from '../../images/spinner.gif'
import Bucketlist from '../Bucketlist/Bucketlist'

class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            suggestion: null,
            fetching: false,
            bucketlist: [],
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
        const {suggestion, bucketlist, fetching} = this.state

        return (
            <div>
                <div className="Home">
                    <div>
                        <h1>My bucketlist</h1>
                    </div>
                    <div>
                        <button onClick={this.getSuggestion} disabled={fetching} >Suggest an activity</button>
                    </div>
                    <div>
                        <img src={spinner} hidden={!fetching}/>
                        {suggestion ? suggestion.activity : null}
                    </div>
                    <div>
                        <button onClick={this.save} disabled={!suggestion}>Save to bucketlist</button>
                    </div>
                    <Bucketlist actions={this.props.actions} bucketlist={this.props.state.bucketlist} />
                </div>
            </div>
        )
    }
}

export default Home