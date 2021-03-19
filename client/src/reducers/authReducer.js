import { FETCH_USER, UPDATE_USER } from "../actions/types";

export default function func(state = {}, action) {
  switch (action.type) {
    case FETCH_USER:
      return action.payload || false;
    case UPDATE_USER:
      return action.payload
    default:
      return state;
  }
}