import { combineReducers } from "redux";

import userData from './user';
import bucketlist from './bucketlist';

export default combineReducers({
    userData,
    bucketlist
})