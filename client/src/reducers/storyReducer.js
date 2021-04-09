import { FETCH_STORY, UPDATE_STORY_COMMENTS, EDIT_STORY, CLEAN_UP, FETCH_STORY_REQUEST, DELETE_COMMENT, CLEAR_STORY } from '../actions/types';


const updateStoryComments = (state, action) => {
  const updatedState = { ...state };
  if (!updatedState.comments) {
    updatedState.comments = [action.payload];
  } else {
    updatedState.comments.unshift(action.payload);
  }
  return updatedState;
}

const deleteStoryComment = (state, action) => {
  const updatedState = { ...state };
  updatedState.comments = updatedState.comments.filter(comment => comment.id !== action.payload);
  return updatedState;

}

export default function func(state = null, action) {
  switch (action.type) {
    case FETCH_STORY_REQUEST:
      return action.payload;
    case FETCH_STORY:
      return action.payload;
    case EDIT_STORY:
      return action.payload;
    case UPDATE_STORY_COMMENTS:
      return updateStoryComments(state, action);
    case DELETE_COMMENT:
      return deleteStoryComment(state, action)
    case CLEAN_UP:
      return {}
    case CLEAR_STORY:
      return null;
    default:
      return state;
  }
}