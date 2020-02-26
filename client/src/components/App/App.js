import React from 'react';
import './App.css';

import {connect} from 'react-redux'

import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';

import * as ROUTES from '../../routes';

import Landing from '../Landing/Landing';
import Login from '../Login/Login';
import NotFound from '../NotFound/NotFound';
import Register from '../Register/Register';

import { withFirebase } from '../Firebase';

const AppBase = ({firebase}) => {
  
  return (
    <BrowserRouter>
      <div className="App fill-window">
        {/* TODO: PUT NAVBAR HERE */}
        <Switch>
          <Route exact path={ROUTES.LANDING} component={Landing} />
          <Route exact path={ROUTES.LOGIN} component={Login} />
          <Route exact path={ROUTES.REGISTER} component={Register} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

const App = withFirebase(AppBase)

export default App;
