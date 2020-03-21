import React from 'react';
import './App.css';

import {connect} from 'react-redux'

import { BrowserRouter, Switch, Route, Link, Redirect } from 'react-router-dom';

import * as ROUTES from '../../routes';

import Landing from '../Landing/Landing';
import Login from '../Login/Login';
import NotFound from '../NotFound/NotFound';
import Register from '../Register/Register';

import { withFirebase } from '../Firebase';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import UnprotectedRoute from '../UnprotectedRoute/UnprotectedRoute';
import setUser from '../../actions/user'
import {bindActionCreators} from 'redux'

class AppBase extends React.Component {
  constructor(props) {
    super(props)
    
    console.log(props)
    console.log(props.dispatch)
  }

  componentDidMount() {
    this.listener = this.props.firebase.auth.onAuthStateChanged(authUser => {
      console.log(authUser)
      authUser ?
        this.props.actions.setUser(authUser.currentUser)
        :
        this.props.actions.setUser(null)
    })
  }

  componentWillUnmount() {
    this.listener()
  }

  render() {
    console.log(this.props.state.user)
    return (
        
        <BrowserRouter>
          <div className="App fill-window">
            {/* TODO: PUT NAVBAR HERE */}
              <Switch>
              <Route exact path={ROUTES.LANDING} >
                <ProtectedRoute component={Landing} />
              </Route>
              <Route exact path={ROUTES.LOGIN} >
                <UnprotectedRoute component={Login} />
              </Route>
              <Route exact path={ROUTES.REGISTER} >
                <UnprotectedRoute component={Register} />
              </Route>
              <Route component={NotFound} />
            </Switch>
          </div>
        </BrowserRouter>

        // :
        // null
    )
  }
}

const App = withFirebase(AppBase)

const mapActionsToProps = (dispatch) => {
  return {
    actions: bindActionCreators({setUser}, dispatch)
  }
}

export default connect(
  state => ({state}),
  mapActionsToProps
)(App);
