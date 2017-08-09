import * as types from '../constants/action-types';

export default function(state = [], action) {
  switch (action.type) {
    case types.FETCH_POSTS:
      return action.payload.data.data;
    case types.RECEIVE_POST:
      return [action.payload.data[0], ...state];
  }
  return state;
}
