import axios from 'axios';
import { FETCH_STORIES, FETCH_USER, POST_STORY, UPDATE_USER } from './types';

export const fetchStories = () => async (dispatch) => {
  const res = await axios.get('/api/posts');
  dispatch({ type: FETCH_STORIES, payload: res.data.posts });
}
export const fetchUser = () => async dispatch => {
  const res = await axios.get('/api/current_user');
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const postStory = ({ title, description, story, creator }) => async dispatch => {
  const res = await axios.post('/api/create-post', {
    title, description, story, creator
  })
  dispatch({ type: POST_STORY, payload: res.data.post });
}

export const updateUser = (username) => async dispatch => {
  const res = await axios.put('/api/update-account', {
    username
  });

  dispatch({ type: UPDATE_USER, payload: res.data.user })
}

