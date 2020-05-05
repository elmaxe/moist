import React from 'react'
import './User.css'
import LeftBar from '../LeftBar'
import SubmittedActivity from './SubmittedActivity'
import ExpandableBukketlist from '../ExpandableBukketlist'

const UserView = ({username, profilePicture, id, description, regDate, loggedInUser, submitted, bukketlists, ...rest}) => {
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

export default UserView