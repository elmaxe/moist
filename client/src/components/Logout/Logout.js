import React from 'react'
import * as ROUTES from '../../routes'

class Logout extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        fetch(ROUTES.API_LOGOUT, {
            method: "GET"
        })
        .then(res => res.json())
        .then(json => {
            if (json.error) {
                //ProtectedRoute.js handles this, Logout is a protected route
            } else {
                this.props.actions.setUser(false, true)
            }
        })
    }

    render() {
        return (
            <div style={{paddingTop:"50px"}} >
                
            </div>
        )
    }
}

export default Logout