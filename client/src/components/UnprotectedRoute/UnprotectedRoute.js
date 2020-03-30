import React from 'react'
import {Route, Redirect} from 'react-router-dom'
import * as ROUTES from '../../routes'
import { bindActionCreators } from 'redux'
import {connect} from 'react-redux'
import * as Actions from '../../actions/user'

const UnprotectedRoute = ({component: Component, ...rest}) => {
    console.log(rest)
    return (
        <Route {...rest} render={props => (
            // rest.state.user.displayName ?
            rest.state.userData.authenticated ?
                <Redirect to={ROUTES.HOME} />
            :
            <Component {...props} state={rest.state} actions={rest.actions} />
        )} />
    )
}

const mapActionsToProps = dispatch => {
    return {
        actions: bindActionCreators(Actions, dispatch)
    }
}

export default connect(
    state => ({state}),
    mapActionsToProps
)(UnprotectedRoute)