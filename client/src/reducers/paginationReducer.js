import { PAGINATE } from "../actions/types";


export default function func(state = {}, action) {
  switch (action.type) {
    case PAGINATE:
      return action.payload;
    default:
      return state;
  }
}