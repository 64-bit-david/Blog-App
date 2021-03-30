import { combineReducers } from 'redux';
import authorReducer from './authorReducer';
import authReducer from './authReducer';
import storiesReducer from './storiesReducer';
import storyReducer from './storyReducer';
import snippetReducer from './snippetsReducer';
import paginationReducer from './paginationReducer';
import userStoriesReducer from './userStoriesReducer';


export default combineReducers({
  stories: storiesReducer,
  auth: authReducer,
  story: storyReducer,
  author: authorReducer,
  snippets: snippetReducer,
  pager: paginationReducer,
  userStories: userStoriesReducer
})