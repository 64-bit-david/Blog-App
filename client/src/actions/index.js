import axios from 'axios';
import { FETCH_STORIES, FETCH_USER_STORIES, FETCH_USER, POST_STORY, EDIT_STORY, UPDATE_USER, UPDATING_USERNAME, UPDATING_DESCRIPTION, FETCH_STORY, FETCH_AUTHOR, FETCH_AUTHOR_BASIC, UPDATE_STORY_COMMENTS, POST_SNIPPET, FETCH_SNIPPETS, DELETE_SNIPPET, PAGINATE, DELETE_STORY, DELETE_USER, CLEAR_MESSAGE, ADD_MESSAGE, DELETE_COMMENT, PAYMENT_SUCCESS, CLEAR_STORIES, CLEAR_ERROR, CLEAR_AUTHOR, CLEAR_STORY, CLEAR_SNIPPETS, CLEAR_USER_STORIES, DROP_NAV, UNDROP_NAV, CLEAR_PAGINATION, ADD_ERROR } from './types';


export const fetchStories = (page) => async (dispatch) => {
  const res = await axios.get('/api/stories/?page=' + page);
  dispatch({ type: PAGINATE, payload: res.data.pager })
  dispatch({ type: FETCH_STORIES, payload: res.data.stories });
}

export const fetchUserStories = (page, userId) => async (dispatch) => {
  const res = await axios.get(`/api/account/stories/${userId}/?page=${page}`);
  dispatch({ type: FETCH_USER_STORIES, payload: res.data.stories });
  dispatch({ type: PAGINATE, payload: res.data.pager });

}

//For getting current logged in user
export const fetchUser = () => async dispatch => {
  try {
    const res = await axios.get('/api/current_user');
    dispatch({ type: FETCH_USER, payload: res.data });
  }
  catch (err) {
    console.log(err);
  }
};

export const logout = () => async dispatch => {
  await axios.get('/api/logout');
}

export const postStory = ({ title, description, content, creator }, history) => async dispatch => {
  try {
    const res = await axios.post('/api/create-story', {
      title, description, content, creator
    })
    dispatch({ type: POST_STORY, payload: res.data.story });
    dispatch({ type: ADD_MESSAGE, payload: res.data.msg })
    history.push('/')
  } catch (err) {
    console.log(err);
    const error = {
      statusCode: err.response.status,
      message: err.response.data.error,
      statusText: err.response.data.statusText
    }
    dispatch({ type: ADD_ERROR, payload: error })
  }
}

export const editStory = ({ storyId, title, description, content }, history) =>
  async dispatch => {
    try {
      const res = await axios.put('/api/stories/' + storyId, {
        title, description, content,
      });
      dispatch({ type: EDIT_STORY, payload: res.data.story });
      dispatch({ type: ADD_MESSAGE, payload: res.data.msg })
      history.push('/story/' + storyId);
    } catch (err) {
      console.log(err)
      const error = {
        statusCode: err.response.status,
        message: err.response.data.error,
        statusText: err.response.data.statusText
      }
      dispatch({ type: ADD_ERROR, payload: error })
    }
  }

export const deleteStory = (storyId) => async dispatch => {
  try {
    await axios.delete(`/api/stories/${storyId}`);
    dispatch({ type: DELETE_STORY, payload: storyId });
    dispatch({ type: ADD_MESSAGE, payload: 'Story Deleted' })
  } catch (err) {
    console.log(err)
    const error = {
      statusCode: err.response.status,
      message: err.response.data.error,
      statusText: err.response.data.statusText
    }
    dispatch({ type: ADD_ERROR, payload: error })
  }
}

export const updateUsername = (username) => async dispatch => {
  dispatch({ type: UPDATING_USERNAME, payload: 'Updating...' })
  try {
    const res = await axios.put('/account/update-username', {
      username
    });
    dispatch({ type: UPDATE_USER, payload: res.data.user })
  } catch (err) {
    const error = {
      statusCode: err.response.status,
      message: err.response.data.error,
      statusText: err.response.data.statusText
    }
    dispatch({ type: ADD_ERROR, payload: error })
  }
}

export const updateUserDesc = (description) => async dispatch => {
  dispatch({ type: UPDATING_DESCRIPTION, payload: 'Updating...' })
  try {
    const res = await axios.put('/account/update-desc', {
      description
    })
    dispatch({ type: UPDATE_USER, payload: res.data.user });
  } catch (err) {
    const error = {
      statusCode: err.response.status,
      message: err.response.data.error,
      statusText: err.response.data.statusText
    }
    dispatch({ type: ADD_ERROR, payload: error })
  }
}

export const fetchStory = (storyId) => async dispatch => {
  try {
    let res = await axios.get(`/api/stories/${storyId}`);
    if (res.data.story.comments > 0) {
      res.data.story.comments = res.data.story.comments.reverse();
    }
    dispatch({ type: FETCH_STORY, payload: res.data.story })
  } catch (err) {
    const error = {
      statusCode: err.response.status,
      message: err.response.data.error,
      statusText: err.response.data.statusText
    }
    console.log(error)
    dispatch({ type: ADD_ERROR, payload: error })
  }
}


//for getting author (with stories populated )of a post/story
export const fetchAuthor = (userId) => async dispatch => {
  const res = await axios.get(`/account/${userId}`);

  dispatch({ type: FETCH_AUTHOR, payload: res.data });
}

export const fetchAuthorBasic = (userId) => async dispatch => {
  try {
    const res = await axios.get(`/account/basic/${userId}`);
    dispatch({ type: FETCH_AUTHOR_BASIC, payload: res.data });
  } catch (err) {
    const error = {
      statusCode: err.response.status,
      message: err.response.data.error,
      statusText: err.response.data.statusText
    }
    dispatch({ type: ADD_ERROR, payload: error });
  }
}
export const updateStoryComments = (storyId, commentInput) => async dispatch => {
  try {
    const res = await axios.post(`/api/stories/comments/${storyId}`, {
      commentText: commentInput
    });

    dispatch({ type: UPDATE_STORY_COMMENTS, payload: res.data.comment });
  } catch (err) {
    const error = {
      statusCode: err.response.status,
      message: err.response.data.error,
      statusText: err.response.data.statusText
    }
    dispatch({ type: ADD_ERROR, payload: error });

  }
}

export const deleteStoryComment = (storyId, commentId) => async dispatch => {
  try {
    await axios.delete(`/api/stories/comments/${storyId}/${commentId}`)
    dispatch({ type: DELETE_COMMENT, payload: commentId });
  } catch (err) {
    console.log(err);
    const error = {
      statusCode: err.response.status,
      message: err.response.data.error,
      statusText: err.response.data.statusText
    }
    dispatch({ type: ADD_ERROR, payload: error });

  }
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
  try {
    await axios.post('/api/post-snippet', {
      snippetText
    });
  } catch (err) {
    const error = {
      statusCode: err.response.status,
      message: err.response.data.error,
      statusText: err.response.data.statusText
    }
    dispatch({ type: ADD_ERROR, payload: error })
  }
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


export const postPayment = (amount, authorId, userId, paymentId) => async dispatch => {
  try {
    const res = await axios.post('/post-payment-data', {
      amount,
      authorId,
      userId,
      paymentId
    });
    dispatch({ type: PAYMENT_SUCCESS, payload: res.data.user })
  } catch (err) {
    const error = {
      statusCode: err.response.status,
      message: err.response.data.error,
      statusText: err.response.data.statusText
    }
    dispatch({ type: ADD_ERROR, payload: error })
  }
}

export const deleteUser = (userId, history) => async dispatch => {
  try {
    const res = await axios.delete('/account/' + userId);

    dispatch({ type: DELETE_USER, payload: res.data.msg });
    history.push('/');
  } catch (err) {
    console.log(err);
    const error = {
      statusCode: err.response.status,
      message: err.response.data.error,
      statusText: err.response.data.statusText
    }
    dispatch({ type: ADD_ERROR, payload: error })
  }
}

export const dropNav = (drop) => {
  if (drop) {
    return { type: DROP_NAV }
  }
  if (!drop) {
    return { type: UNDROP_NAV }
  }
}



export const clearMessage = () => {
  return { type: CLEAR_MESSAGE };
}

export const clearError = () => {
  return { type: CLEAR_ERROR }
}

export const clearStories = () => {
  return { type: CLEAR_STORIES }
}

export const clearAuthor = () => {
  return { type: CLEAR_AUTHOR }
}

export const clearStory = () => {
  return { type: CLEAR_STORY }
}

export const clearSnippets = () => {
  return { type: CLEAR_SNIPPETS }
}

export const clearUserStories = () => {
  return { type: CLEAR_USER_STORIES }
}

export const clearPagination = () => {
  return { type: CLEAR_PAGINATION }
}
