import React from 'react';
import './App.css';

import {connect} from 'react-redux'

import { BrowserRouter, Switch, Route, Link, Redirect } from 'react-router-dom';

import * as ROUTES from '../../routes';

import Landing from '../Landing/Landing';
import Login from '../Login/Login';
import NotFound from '../NotFound/NotFound';
import Register from '../Register/Register';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import UnprotectedRoute from '../UnprotectedRoute/UnprotectedRoute';
import setUser from '../../actions/user'
import {bindActionCreators} from 'redux'

class App extends React.Component {
  constructor(props) {
    super(props)
    
    console.log(props)
  }

  componentDidMount() {
    const {setUser} = this.props.actions

    fetch(ROUTES.API_IS_AUTH, {
      method: "GET",
      credentials: "same-origin"
    })
    .then(res => res.json())
    .then(json => {
      if (json.error) {
        setUser(false, true)
      } else {
        setUser(json.authenticated, true, json.id, json.email, json.username, json.profilePicture, json.regDate)
      }
    })
  }

  componentWillUnmount() {

  }

  render() {
    console.log(this.props)
    const {hasFirstAuth} = this.props.state.userData
    return (
        
        <BrowserRouter>
          <div className="App fill-window">
            {/* TODO: PUT NAVBAR HERE */}
            {hasFirstAuth ? 
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
            :
            //TODO: Spinner?
            "reee"}
          </div>
        </BrowserRouter>

        // :
        // null
    )
  }
}

const mapActionsToProps = (dispatch) => {
  return {
    actions: bindActionCreators({setUser}, dispatch)
  }
}

export default connect(
  state => ({state}),
  mapActionsToProps
)(App);
