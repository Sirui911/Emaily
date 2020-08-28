// reducer set up
//combineReducer() function as the name suggests to combine all reducers in one store and return as a global application state object.
import { combineReducers } from 'redux';
import authReducer from './authReducer';

export default combineReducers({
    auth: authReducer
});