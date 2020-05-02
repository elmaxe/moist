import React from 'react'
import {Route, Redirect} from 'react-router-dom'
import * as ROUTES from '../../routes'
import { bindActionCreators } from 'redux'
import {connect} from 'react-redux'
import setUser from '../../actions/user'
import addActivity, {removeActivity, setBucketlist, clearBucketlist, fetchBukketlists, removeBukketlist, createBukketlist} from '../../actions/bucketlist'
import setAndShowAlert, {hideAlert} from '../../actions/alert'

import Bar from '../Bar/Views/Bar'

const ProtectedRoute = ({component: Component, ...rest}) => {
    return (
        <Route {...rest} render={props => (
            // rest.state.user.displayName ?
            rest.state.userData.authenticated ?
            <div><Bar {...props} state={rest.state}/><Component {...props} state={rest.state} actions={rest.actions} /></div>
            :
            <Redirect to={ROUTES.LANDING} />
        )} />
    )
}

const mapActionsToProps = dispatch => {
    return {
        actions: bindActionCreators({setUser, addActivity, removeActivity, setBucketlist, clearBucketlist, setAndShowAlert, hideAlert, fetchBukketlists, removeBukketlist,createBukketlist}, dispatch)
    }
}

export default connect(
    state => ({state}),
    mapActionsToProps
)(ProtectedRoute)