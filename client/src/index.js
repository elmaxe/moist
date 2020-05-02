import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';

import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import combineReducers from './reducers/index'
import { doFirstAuth } from './actions/user';

let middlewares = []

if (process.env.NODE_ENV === "development") {
    middlewares = [thunk, logger]
} else {
    middlewares = [thunk]
}

const store = createStore(
    combineReducers,
    applyMiddleware(
        ...middlewares
    )
);

// store.dispatch(doFirstAuth())

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
    ,document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
