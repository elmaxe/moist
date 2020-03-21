import React from 'react'
import {Route, Redirect} from 'react-router-dom'
import * as ROUTES from '../../routes'
import { bindActionCreators } from 'redux'
import {connect} from 'react-redux'
import * as Actions from '../../actions/user'

const ProtectedRoute = ({component: Component, ...rest}) => {
    return (
        <Route {...rest} render={props => (
            rest.state.user.displayName ?
            <Component {...props} state={rest.state} actions={rest.actions} />
            :
            <Redirect to={ROUTES.LOGIN} />
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
)(ProtectedRoute)