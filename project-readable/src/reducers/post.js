import { FETCH_POST } from "../actions/types";

const INITIAL_STATE = {
  post: {}
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_POST:
      return action.payload;
    default:
      return state;
  }
}