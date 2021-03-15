import { combineReducers } from 'redux';
import authReducer from './authReducer';
import postReducer from './postsReducer';


export default combineReducers({
  posts: postReducer,
  auth: authReducer,
})