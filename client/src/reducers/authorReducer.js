import { FETCH_AUTHOR, FETCH_AUTHOR_BASIC, CLEAN_UP } from "../actions/types";




export default function func(state = null, action) {
  switch (action.type) {
    case FETCH_AUTHOR:
      return action.payload;
    case FETCH_AUTHOR_BASIC:
      return action.payload;
    case CLEAN_UP:
      return null;
    default:
      return state;
  }
}