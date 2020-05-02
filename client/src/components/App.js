import React from 'react';
import './App.css';

import {connect} from 'react-redux'

import { BrowserRouter, Switch, Route, Link, Redirect } from 'react-router-dom';

import * as ROUTES from '../routes';

import Landing from './Landing/Views/Landing';
import Logout from './Logout/Logout';
import NotFound from './NotFound/Views/NotFound';
import Home from './Home/Home';

import ProtectedRoute from './ProtectedRoute/ProtectedRoute';
import UnprotectedRoute from './UnprotectedRoute/UnprotectedRoute';
import setUser from '../actions/user'
import {bindActionCreators} from 'redux'

import spinner from '../images/spinner.gif'
import SearchPage from './SearchResultPage/SearchPage';
import UserPage from './UserPage/User'

export function fetchIsAuth(setUser) {
      fetch(ROUTES.API_IS_AUTH, {
        method: "GET",
        credentials: "same-origin"
      })
      .then(res => res.json())
      .then(json => {
        if (json.error) {
          setUser(false, true)
        } else {
          setUser(json.authenticated, true, json.user.id, json.user.email, json.user.username, json.user.profilePicture, json.user.regDate)
        }
      })
}

class App extends React.Component {
  constructor(props) {
    super(props)
    
    console.log(props)
  }

  componentDidMount() {
    const {setUser} = this.props.actions
    fetchIsAuth(setUser)
  }

  componentWillUnmount() {

  }

  render() {
    console.log(this.props)
    const {hasFirstAuth} = this.props.state.userData
    return (
        
        <BrowserRouter>
          <div className="App fill-window">
            {hasFirstAuth ? 
              <Switch>
              <Route exact path={ROUTES.LANDING} >
                {/* <ProtectedRoute component={Landing} /> */}
                <UnprotectedRoute component={Landing} />
              </Route>
              <Route exact path={ROUTES.HOME} >
                <ProtectedRoute component={Home} />
              </Route>
              <Route exact path={ROUTES.LOGOUT}>
                <ProtectedRoute component={Logout} />
              </Route>
              <Route exact path={ROUTES.SEARCH}>
                <ProtectedRoute component={SearchPage} />
              </Route>
              <Route exact path={ROUTES.USER}>
                <ProtectedRoute component={UserPage} />
              </Route>
              <Route component={NotFound} />
            </Switch>
            :
            null}
          </div>
        </BrowserRouter>
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
