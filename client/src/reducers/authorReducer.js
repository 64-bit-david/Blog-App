import { FETCH_AUTHOR, FETCH_AUTHOR_BASIC, POST_STORY } from "../actions/types";


const postStoryHelper = (state, action) => {
  const copyState = { ...state };
  return state;
}

export default function func(state = null, action) {
  switch (action.type) {
    case FETCH_AUTHOR:
      return action.payload;
    case FETCH_AUTHOR_BASIC:
      return action.payload;
    case POST_STORY:
      return postStoryHelper(state, action)
    default:
      return state;
  }
}