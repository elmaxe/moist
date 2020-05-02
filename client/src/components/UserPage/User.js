import React, { useState } from 'react'
import './User.css'

import {Redirect} from 'react-router-dom'

import LeftBar from './LeftBar'
import SubmittedActivity from './Views/SubmittedActivity'
import ExpandableBukketlist from './ExpandableBukketlist'

const initUser = {
    username: null,
    profilePicture: null,
    id: null,
    regDate: null,
    description: null
}

class UserPage extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            fetching: true,
            error: null,
            user: {...initUser},
            submitted: [],
            bucketlists: []
        }

        this.doUserFetch = this.doUserFetch.bind(this)
        this.doSubmittedActivitiesFetch = this.doSubmittedActivitiesFetch.bind(this)
        this.doBukketlistFetch = this.doBukketlistFetch.bind(this)
        this.date = this.date.bind(this)
    }

    componentDidMount() {
        this.doUserFetch()
    }

    //if user is on a different users page and clicks their name in the bar, the state shall update.
    //The refresh state is sent from the Link in Bar
    componentWillReceiveProps() {
        if (this.props.history.location.state.refresh) {
            this.doUserFetch()
        }
    }

    doUserFetch() {
        const {history} = this.props

        const user = history.location.pathname.split("u/")[1]
        this.setState({fetching: true})
        
        fetch(`/api/search/user/${user}`, {
            method: "GET",
            credentials: "same-origin"
        })
        .then(res => res.json())
        .then(json => {
            this.setState({fetching: false})
            if (json.error) {
                history.push('/404')
                this.setState({error: json.error, user: {...initUser}})
            } else {
                this.setState({user: json.user})
            }

            this.doBukketlistFetch()
            this.doSubmittedActivitiesFetch()
        })
    }

    doSubmittedActivitiesFetch() {
        const {history} = this.props

        const user = history.location.pathname.split("u/")[1]

        fetch(`/api/activities/submitted/${user}`, {
            method: "GET",
            credentials: "same-origin"
        })
        .then(res => res.json())
        .then(json => {
            if (json.error) {

            } else {
                this.setState({submitted: json.rows})
            }
        })
    }

    doBukketlistFetch() {
        const {history} = this.props

        const user = history.location.pathname.split("u/")[1]

        fetch(`/api/search/bukketlist/${user}`, {
            method: "GET",
            credentials: "same-origin"
        })
        .then(res => res.json())
        .then(json => {
            if (json.error) {

            } else {
                this.setState({bucketlists: json.bukketlists})
            }
        })

    }

    date() {
        let date = new Date(parseInt(this.state.user.regDate, 10))
        let year = date.getUTCFullYear()
        let month = date.getUTCMonth()+1 < 10 ? "0"+(date.getUTCMonth()+1) : date.getUTCMonth()+1
        let day = date.getUTCDate() < 10 ? "0"+date.getUTCDate() : date.getUTCDate()
        date = year + "-" + month + "-" + day
        return date
    }

    render() {
        const {fetching, error, user, submitted, bucketlists} = this.state

        return (
            <div className="userview">
            {fetching ?
                null
            :
                (error ? 
                    <Redirect to="/error" />
                :
                    <UserView
                        id={user.id}
                        username={user.username}
                        profilePicture={user.profilePicture}
                        regDate={this.date()}
                        description={user.description}
                        loggedInUser={this.props.state.userData.user}
                        submitted={submitted}
                        bukketlists={bucketlists}
                        {...this.props}
                    />
                )
            }
            </div>
        )
    }
}

export default UserPage

const UserView = ({username, profilePicture, id, description, regDate, loggedInUser, submitted, bukketlists, ...rest}) => {
    console.log(bukketlists)
    return (
        <div>
            <div className="header">
                <LeftBar history={rest.history} username={username} profilePicture={profilePicture} id={id} description={description === null ? "" : description} regDate={regDate} loggedInUser={loggedInUser} />
                <div className="content">
                        <div><h3>Bukketlists</h3></div>
                    <div id="bukketlists">
                        {bukketlists.length === 0 ? `${username} has no bukketlists` : bukketlists.map(x => <ExpandableBukketlist key={x.bid} bukketlist={x} />)}
                        {/* {bukketlists} */}
                    </div>
                    <div><h3>Submitted activities</h3></div>
                    <div id="submittedactivities">
                        {submitted.length === 0 ? `${username} has not submitted any activities` : submitted.map(x => <SubmittedActivity key={x.ucaid} text={x.activity} creationDate={x.creationDate}/>)}
                    </div>
                </div>
            </div>
            
        </div>
    )
}