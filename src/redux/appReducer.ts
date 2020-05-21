import { combineReducers } from 'redux';
import authReducer from './authReducer';
import contactsReducer from './contactsReducer';
import searchReducer from './searchReducer';
export default combineReducers({
  auth: authReducer,
  contacts: contactsReducer,
  search: searchReducer,
});
