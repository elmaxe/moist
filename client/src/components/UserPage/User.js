import React from 'react'
import './User.css'

import {Redirect} from 'react-router-dom'
import genericprofile from '../../images/profile1600x1600.png'

const initUser = {
    username: null,
    profilePicture: null,
    id: null,
    regDate: null
}

class UserPage extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            fetching: true,
            error: null,
            user: {...initUser}
        }

        this.doUserFetch = this.doUserFetch.bind(this)
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
        const {fetching, error, user} = this.state
        console.log(this.props)
        return (
            <div className="userview">
            {fetching ?
                null
            :
                (error ? 
                    <Redirect to="/error" />
                :
                    <UserView username={user.username} profilePicture={user.profilePicture} regDate={this.date()} description={user.description} loggedInUser={this.props.state.userData.user} />)
            }
            </div>
        )
    }
}

export default UserPage

const UserView = ({username, profilePicture, id, description, regDate, loggedInUser}) => {
    const picture = profilePicture ? profilePicture : genericprofile
    return (
        <div>
            <div className="header">
                <div className="profile">
                    <img src={picture} className="profilePic" alt={`${username}'s profile picture.`} title={username} style={{width: "250px", height: "250px", objectFit: "cover"}}/>
                    <div className="profilecontent">
                        <div id="head">
                            <h1>{username}</h1>
                            <h4>Member since {regDate}</h4>
                            {loggedInUser.username === username ? 
                                <button id="editprofile">Edit profile</button>
                            :
                                null
                            }
                        </div>
                        <div id="description">
                            Placeholder description.
                        </div>
                    </div>
                </div>
                <div className="content">
                    <div id="bukketlists">
                        Bukketlists
                    </div>
                    <div id="submittedactivities">
                        Submitted activities
                    </div>
                </div>
            </div>
            
        </div>
    )
}