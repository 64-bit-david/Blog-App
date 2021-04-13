import { DELETE_USER, FETCH_USER, PAYMENT_SUCCESS, UPDATE_USER, UPDATING_DESCRIPTION, UPDATING_USERNAME } from "../actions/types";


export default function func(state = {}, action) {
  switch (action.type) {
    case FETCH_USER:
      return action.payload || false;
    case UPDATE_USER:
      return action.payload;
    case UPDATING_USERNAME:
      return { ...state, [state.username]: action.payload };
    case UPDATING_DESCRIPTION:
      return { ...state, [state.description]: action.payload };
    case PAYMENT_SUCCESS:
      return action.payload;
    case DELETE_USER:
      console.log('deletion reached auth reducer')
      return null;
    default:
      return state;
  }
}