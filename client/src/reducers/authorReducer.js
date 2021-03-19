import { FETCH_AUTHOR, FETCH_AUTHOR_BASIC } from "../actions/types";

export default function (state = null, action) {
  switch (action.type) {
    case FETCH_AUTHOR:
      return action.payload;
    case FETCH_AUTHOR_BASIC:
      return action.payload;
    default:
      return state;
  }
}