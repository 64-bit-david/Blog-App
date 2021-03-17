import { FETCH_AUTHOR } from "../actions/types";

export default function (state = null, action) {
  switch (action.type) {
    case FETCH_AUTHOR:
      return action.payload;
    default:
      return state;
  }
}