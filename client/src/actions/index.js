import blogapi from '../apis/blogapi';
import { FETCH_POSTS, FETCH_USER } from './types';

export const fetchPosts = () => async (dispatch) => {
  const res = await blogapi.get('/');
  dispatch({ type: FETCH_POSTS, payload: res.data.posts });
}
export const fetchUser = () => async dispatch => {
  const res = await blogapi.get('/api/current_user');

  dispatch({ type: FETCH_USER, payload: res.data });
};
