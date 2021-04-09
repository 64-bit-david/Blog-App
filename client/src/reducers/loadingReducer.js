import { CLEAN_UP, LOADING } from "../actions/types";


export default function func(state = null, action) {
  switch (action.type) {
    case LOADING:
      return action.payload;
    case CLEAN_UP:
      return null;
    default:
      return state;
  }
}