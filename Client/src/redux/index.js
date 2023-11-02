import { combineReducers } from 'redux';
import userReducer from './user.reducer';
import sessionReducer from './session.reducer';

export default combineReducers({
    user: userReducer,
    session: sessionReducer,
});