import axios from 'axios';
import { FETCH_STORIES, FETCH_USER, POST_STORY, UPDATE_USER, FETCH_STORY, FETCH_AUTHOR } from './types';

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
  dispatch({ type: FETCH_STORY, payload: res.data.post })
}

//for getting author of a post/story
export const fetchAuthor = (userId) => async dispatch => {
  const res = await axios.get(`/account/${userId}`);
  dispatch({ type: FETCH_AUTHOR, payload: res.data });
}


