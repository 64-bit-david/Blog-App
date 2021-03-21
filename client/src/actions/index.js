import axios from 'axios';
import { FETCH_STORIES, FETCH_USER, POST_STORY, UPDATE_USER, FETCH_STORY, FETCH_AUTHOR, FETCH_AUTHOR_BASIC, UPDATE_STORY_COMMENTS, POST_SNIPPET, FETCH_SNIPPETS } from './types';

export const fetchStories = () => async (dispatch) => {
  const res = await axios.get('/api/stories');
  dispatch({ type: FETCH_STORIES, payload: res.data.stories });
}


//For getting current logged in user
export const fetchUser = () => async dispatch => {
  const res = await axios.get('/api/current_user');
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const postStory = ({ title, description, content, creator }) => async dispatch => {
  const res = await axios.post('/api/create-story', {
    title, description, content, creator
  })
  dispatch({ type: POST_STORY, payload: res.data.story });
}

export const updateUser = (username) => async dispatch => {
  const res = await axios.put('/api/update-account', {
    username
  });
  dispatch({ type: UPDATE_USER, payload: res.data.user })
}


export const fetchStory = (storyId) => async dispatch => {
  const res = await axios.get(`/api/stories/${storyId}`);
  dispatch({ type: FETCH_STORY, payload: res.data.story })
}

//for getting author (with stories populated )of a post/story
export const fetchAuthor = (userId) => async dispatch => {
  const res = await axios.get(`/account/${userId}`);
  dispatch({ type: FETCH_AUTHOR, payload: res.data });
}

export const fetchAuthorBasic = (userId) => async dispatch => {
  const res = await axios.get(`/account/basic/${userId}`);
  dispatch({ type: FETCH_AUTHOR_BASIC, payload: res.data });
}

export const updateStoryComments = (storyId, commentInput) => async dispatch => {
  const res = await axios.post(`/api/stories/comments/${storyId}`, {
    commentText: commentInput
  });

  dispatch({ type: UPDATE_STORY_COMMENTS, payload: res.data.comment });
}

export const fetchSnippet = () => async dispatch => {
  const res = await axios.get('/api/snippets');
  dispatch({ type: FETCH_SNIPPETS, payload: res.data.snippets })
}

export const postSnippet = (snippetText) => async dispatch => {
  const res = await axios.post('/api/post-snippet', {
    snippetText
  });

  //server responds with full user obj, but we need user to only hold the id so overide
  res.data.response._user = res.data.response._user._id;
  dispatch({ type: POST_SNIPPET, payload: res.data.response });
}
