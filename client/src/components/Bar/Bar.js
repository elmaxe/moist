import React from 'react'
import './Bar.css'
import * as ROUTES from '../../routes'
import GenericProfile from '../../images/profile1600x1600.png'

import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'

import logo from '../../images/bukketlogo.png'
import Search from './Search'

class Bar extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const {user} = this.props.state.userData
        const props = this.props
        return (
            <div className="Bar">
                <div className="BarItemLogo">
                    <Link to={ROUTES.HOME}>
                        <img src={logo} className="logo" />
                    </Link>
                </div>
                <Search {...props} />
                <div className="BarItem">
                    <Link to={ROUTES.ACCOUNT}>
                    <img src={user.profilePicture? user.profilePicture : GenericProfile} style={{height:"30px", width:"30px",objectFit:"cover", borderRadius: "50%"}} />
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

Bar.propTypes = {
    state: PropTypes.object.isRequired
}

export default Bar