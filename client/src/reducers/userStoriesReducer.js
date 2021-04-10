import { CLEAN_UP, CLEAR_STORIES, FETCH_USER_STORIES, CLEAR_USER_STORIES } from '../actions/types';

export default function func(state = [], action) {
  switch (action.type) {
    case FETCH_USER_STORIES:
      return action.payload
    case CLEAN_UP:
      return [];
    case CLEAR_STORIES:
      return [];
    case CLEAR_USER_STORIES:
      return [];
    default:
      return state;
  }
}