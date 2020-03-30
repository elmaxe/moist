import React from 'react'
import {Route, Redirect} from 'react-router-dom'
import * as ROUTES from '../../routes'
import { bindActionCreators } from 'redux'
import {connect} from 'react-redux'
import * as Actions from '../../actions/user'

import Bar from '../Bar/Bar'

const ProtectedRoute = ({component: Component, ...rest}) => {
    return (
        <Route {...rest} render={props => (
            // rest.state.user.displayName ?
            rest.state.userData.authenticated ?
            <div><Bar state={rest.state}/><Component {...props} state={rest.state} actions={rest.actions} /></div>
            :
            <Redirect to={ROUTES.LANDING} />
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