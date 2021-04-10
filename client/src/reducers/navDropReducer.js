import { UNDROP_NAV, DROP_NAV } from "../actions/types";

export default function func(state = false, action) {
  switch (action.type) {
    case DROP_NAV:
      return true;
    case UNDROP_NAV:
      return false;
    default:
      return state;
  }
}