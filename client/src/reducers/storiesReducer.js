import { CLEAR_STORIES, FETCH_STORIES, POST_STORY } from '../actions/types';


//Adding new story will break pagination, so remove last item in array to keep it constant at 7? stories.
const addStory = (state, action) => {
  const newStoryArray = [action.payload, ...state];
  newStoryArray.pop();
  return newStoryArray
}

export default function func(state = [], action) {
  switch (action.type) {
    case FETCH_STORIES:
      return action.payload
    case POST_STORY:
      return addStory(state, action);
    case CLEAR_STORIES:
      return [];
    default:
      return state;
  }
}