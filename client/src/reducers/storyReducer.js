import { FETCH_STORY, UPDATE_STORY_COMMENTS, EDIT_STORY, CLEAN_UP } from '../actions/types';


const updateStoryComments = (state, action) => {
  console.log(action.payload);
  const updatedState = { ...state };
  if (!updatedState.comments) {
    updatedState.comments = [action.payload];
  } else {
    updatedState.comments.unshift(action.payload);
  }
  return updatedState;
}

export default function func(state = {}, action) {
  switch (action.type) {
    case FETCH_STORY:
      return action.payload;
    case EDIT_STORY:
      return action.payload;
    case UPDATE_STORY_COMMENTS:
      return updateStoryComments(state, action);
    case CLEAN_UP:
      return {}
    default:
      return state;
  }
}