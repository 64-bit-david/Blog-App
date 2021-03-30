import axios from 'axios';
import { FETCH_STORIES, FETCH_USER_STORIES, FETCH_USER, POST_STORY, EDIT_STORY, UPDATE_USER, FETCH_STORY, FETCH_AUTHOR, FETCH_AUTHOR_BASIC, UPDATE_STORY_COMMENTS, POST_SNIPPET, FETCH_SNIPPETS, DELETE_SNIPPET, PAGINATE, DELETE_STORY, CLEAN_UP } from './types';

export const fetchStories = (page) => async (dispatch) => {
  const res = await axios.get('/api/stories/?page=' + page);
  dispatch({ type: FETCH_STORIES, payload: res.data.stories });
  dispatch({ type: PAGINATE, payload: res.data.pager })
}

export const fetchUserStories = (page, userId) => async (dispatch) => {
  const res = await axios.get(`/api/account/stories/${userId}/?page=${page}`);
  dispatch({ type: FETCH_USER_STORIES, payload: res.data.stories });
  dispatch({ type: PAGINATE, payload: res.data.pager });

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

export const editStory = ({ storyId, title, description, content }) =>
  async dispatch => {
    const res = await axios.put('/api/stories/' + storyId, {
      title, description, content,
    });
    dispatch({ type: EDIT_STORY, payload: res.data.story });
  }

export const deleteStory = (storyId) => async dispatch => {
  await axios.delete(`/api/stories/${storyId}`);
  dispatch({ type: DELETE_STORY, payload: storyId });
}

export const updateUsername = (username) => async dispatch => {
  const res = await axios.put('/account/update-username', {
    username
  });
  dispatch({ type: UPDATE_USER, payload: res.data.user })
}

export const updateUserDesc = (description) => async dispatch => {
  const res = await axios.put('/account/update-desc', {
    description
  })
  dispatch({ type: UPDATE_USER, payload: res.data.user });
}

export const fetchStory = (storyId) => async dispatch => {
  let res = await axios.get(`/api/stories/${storyId}`);
  if (res.data.story.comments > 0) {
    res.data.story.comments = res.data.story.comments.reverse();
  }
  dispatch({ type: FETCH_STORY, payload: res.data.story })
}


//for getting author (with stories populated )of a post/story
export const fetchAuthor = (userId) => async dispatch => {
  const res = await axios.get(`/account/${userId}`);
  dispatch({ type: FETCH_AUTHOR, payload: res.data });
}

export const fetchAuthorBasic = (userId) => async dispatch => {
  const res = await axios.get(`/account/basic/${userId}`);
  console.log('feth author bas called');
  dispatch({ type: FETCH_AUTHOR_BASIC, payload: res.data });
}

export const updateStoryComments = (storyId, commentInput) => async dispatch => {
  const res = await axios.post(`/api/stories/comments/${storyId}`, {
    commentText: commentInput
  });

  dispatch({ type: UPDATE_STORY_COMMENTS, payload: res.data.comment });
}

export const deleteStoryComment = (storyId, commentId) => async dispatch => {
  await axios.delete(`/api/stories/comments/${storyId}/${commentId}`)
}

export const fetchSnippet = () => async dispatch => {
  const res = await axios.get('/api/snippets');
  dispatch({ type: FETCH_SNIPPETS, payload: res.data.snippets })
}

export const fetchAllSnippets = (page) => async dispatch => {
  const res = await axios.get('/api/all-snippets/?page=' + page);
  dispatch({ type: FETCH_SNIPPETS, payload: res.data.snippets });
  dispatch({ type: PAGINATE, payload: res.data.pager });
}

export const postSnippet = (snippetText) => async dispatch => {
  await axios.post('/api/post-snippet', {
    snippetText
  });
  //websocket updates state so below not needed, causes duplication for user
  //server responds with full user obj, but we need user to only hold the id so overide
  // res.data.response._user = res.data.response._user._id;
  // dispatch({ type: POST_SNIPPET, payload: res.data.response });
};

export const deleteSnippet = (snippetId) => async dispatch => {
  await axios.delete('/api/snippet/' + snippetId);
  dispatch({ type: DELETE_SNIPPET, payload: snippetId });
}


export const addSnippet = (snippet) => {
  return { type: POST_SNIPPET, payload: snippet }
}

export const postPayment = (amount, authorId, userId) => async dispatch => {
  await axios.post('/post-payment-data', {
    amount,
    authorId,
    userId
  });
}

export const cleanUp = () => {
  return { type: CLEAN_UP }
}