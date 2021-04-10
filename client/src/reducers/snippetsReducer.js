import { DELETE_SNIPPET, FETCH_SNIPPETS, POST_SNIPPET, CLEAR_SNIPPETS } from "../actions/types";


export default function func(state = [], action) {
  switch (action.type) {
    case FETCH_SNIPPETS:
      return action.payload;
    case POST_SNIPPET:
      return [action.payload, ...state];
    case DELETE_SNIPPET:
      return state.filter(snippet => snippet._id !== action.payload);
    case CLEAR_SNIPPETS:
      return [];
    default:
      return state;
  }
}