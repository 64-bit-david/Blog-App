import { ADD_ERROR, CLEAN_UP } from '../actions/types';

export default function func(state = {}, action) {
  switch (action.type) {
    case ADD_ERROR:
      return action.payload;
    case CLEAN_UP:
      return {}
    default:
      return state;
  }
}