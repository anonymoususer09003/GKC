// reducers/index.js
import { combineReducers } from 'redux';
import userReducer from './userReducer';
import filesReducer from './filesReducer';

const rootReducer = combineReducers({
  user: userReducer,
  files: filesReducer,
  // Add more reducers here if needed
});

export default rootReducer;
