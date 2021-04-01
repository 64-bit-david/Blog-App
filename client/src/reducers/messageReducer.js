// keep track of successful operations (ie deleting stories);

import { ADD_MESSAGE, CLEAR_MESSAGE, DELETE_USER } from "../actions/types";

export default function func(state = null, action) {
  switch (action.type) {
    case DELETE_USER:
      return action.payload;
    case ADD_MESSAGE:
      return action.payload;
    case CLEAR_MESSAGE:
      return null;
    default:
      return state
  }
}
