import { FETCH_STORIES } from '../actions/types';

export default function (state = [], action) {
  switch (action.type) {
    case FETCH_STORIES:
      return action.payload
    default:
      return state;
  }
}