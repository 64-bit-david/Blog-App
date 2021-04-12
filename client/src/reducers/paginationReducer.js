import { CLEAR_PAGINATION, PAGINATE } from "../actions/types";


export default function func(state = {}, action) {
  switch (action.type) {
    case PAGINATE:
      return action.payload;
    case CLEAR_PAGINATION:
      return {};
    default:
      return state;
  }
}