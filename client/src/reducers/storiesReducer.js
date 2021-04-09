import { CLEAR_STORIES, FETCH_STORIES, POST_STORY } from '../actions/types';

export default function func(state = [], action) {
  switch (action.type) {
    case FETCH_STORIES:
      return action.payload
    case POST_STORY:
      return [...state, action.payload]
    case CLEAR_STORIES:
      return [];
    default:
      return state;
  }
}