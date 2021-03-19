import { FETCH_STORY, UPDATE_STORY_COMMENTS } from '../actions/types';


const updateStoryComments = (state, action) => {
  const updatedState = { ...state };
  updatedState.comments.push(action.payload);
  return updatedState;
}

export default function (state = null, action) {
  switch (action.type) {
    case FETCH_STORY:
      return action.payload;
    case UPDATE_STORY_COMMENTS:
      return updateStoryComments(state, action)
    default:
      return state;
  }
}