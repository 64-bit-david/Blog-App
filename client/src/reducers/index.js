import { combineReducers } from 'redux';
import authReducer from './authReducer';
import storyReducer from './storyReducer';


export default combineReducers({
  stories: storyReducer,
  auth: authReducer,
})