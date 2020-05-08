import React from 'react'
import './Bar.css'
import * as ROUTES from '../../../routes'
import GenericProfile from '../../../images/profile1600x1600.png'

import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'

import BarSearchComponent from '../BarSearchComponent'

const Bar = (props) => {
    const {user} = props.state.userData

    return (
        <div className="Bar">
            <div className="BarItemLogo">
                {props.history.location.pathname !== "/home" ?
                    <Link to={ROUTES.HOME}>
                        <img src="/bukket/bukketlogo.png" className="logo" />
                    </Link>
                :
                    <a href={ROUTES.HOME}>
                        <img src="/bukket/bukketlogo.png" className="logo" />
                    </a>
                }
            </div>
            <BarSearchComponent {...props} />
            <div className="BarItem">
                <Link to={{pathname: `/u/${user.username}`, state: {refresh: true}}}>
                <img src={user.profilePicture? user.profilePicture : GenericProfile} style={{height:"30px", width:"30px",objectFit:"cover", borderRadius: "10%"}} />
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

Bar.propTypes = {
    state: PropTypes.object.isRequired
}

export default Bar