import * as types from '../constants/action-types';

export default function(state = [], action) {
  switch (action.type) {
    case types.SIGN_UP:
      localStorage.setItem('access_token', action.payload.data.access_token);
      localStorage.setItem('refresh_token', action.payload.data.refresh_token);
      localStorage.setItem('user_id', action.payload.data.user_id);
      return state;
    case types.SIGN_IN:
      localStorage.setItem('access_token', action.payload.data.access_token);
      localStorage.setItem('refresh_token', action.payload.data.refresh_token);
      localStorage.setItem('user_id', action.payload.data.user_id);
      return state;
  }
  return state;
}
