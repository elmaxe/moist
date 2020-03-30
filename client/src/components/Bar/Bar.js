import React from 'react'
import './Bar.css'
import * as ROUTES from '../../routes'
import GenericProfile from '../../images/profile1600x1600.png'

import {Link} from 'react-router-dom'

class Bar extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const {user} = this.props.state
        return (
            <div className="Bar">
                <div className="BarItem">
                    <Link to={ROUTES.GARDENS}>Gardens</Link>
                </div>
                <div className="BarItem">
                    <Link to={ROUTES.ACCOUNT}>
                    <img src={user.profilePicture? user.profilePicture : GenericProfile} style={{height:"30px", width:"30px",objectFit:"contain", borderRadius: "50%"}} />
                    <span style={{paddingLeft: "5px"}}>
                    {user.username}
                    </span>
                    </Link>
                </div>
                <div className="BarItem Logout">
                    <Link to={ROUTES.LOGOUT}>Logout</Link>
                </div>
            </div>
        )
    }
}

export default Bar