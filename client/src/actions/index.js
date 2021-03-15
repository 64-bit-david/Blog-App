import axios from 'axios';
import { FETCH_POSTS, FETCH_USER } from './types';

export const fetchPosts = () => async (dispatch) => {
  const res = await axios.get('/api/posts');
  dispatch({ type: FETCH_POSTS, payload: res.data.posts });
}
export const fetchUser = () => async dispatch => {
  const res = await axios.get('/api/current_user');
  dispatch({ type: FETCH_USER, payload: res.data });
};
