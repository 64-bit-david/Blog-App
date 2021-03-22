import { FETCH_SNIPPETS, POST_SNIPPET } from "../actions/types";


export default function func(state = [], action) {
  switch (action.type) {
    case FETCH_SNIPPETS:
      return action.payload;
    case POST_SNIPPET:
      console.log(action);
      return [action.payload, ...state]
    default:
      return state;
  }
}