import { combineReducers } from "redux";

import userData from './user';
import bucketlist from './bucketlist';
import alertReducer from './alert';

export default combineReducers({
    userData,
    bucketlist,
    alertReducer
})