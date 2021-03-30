import { CLEAN_UP, FETCH_USER_STORIES } from '../actions/types';

export default function func(state = [], action) {
  switch (action.type) {
    case FETCH_USER_STORIES:
      return action.payload
    case CLEAN_UP:
      return [];
    default:
      return state;
  }
}