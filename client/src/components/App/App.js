import React from 'react';
import './App.css';

import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';

import * as ROUTES from '../../routes';

import Landing from '../Landing/Landing';
import Login from '../Login/Login';
import NotFound from '../NotFound/NotFound';

function App() {
  return (
    <BrowserRouter>
        {/* TODO: PUT NAVBAR HERE */}
        <Switch>
          <Route exact path={ROUTES.LANDING} component={Landing} />
          <Route exact path={ROUTES.LOGIN} component={Login} />
          <Route exact path={ROUTES.REGISTER} component={Landing} />
          <Route component={NotFound} />
        </Switch>
    </BrowserRouter>
  );
}

export default App;
