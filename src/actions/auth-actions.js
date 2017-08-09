import axios from 'axios';
import * as types from '../constants/action-types';
import * as endpoints from '../constants/endpoints';

export function signUp(token_data) {
  return {
    type: types.SIGN_UP,
    payload: token_data
  };
}

export function signIn(token_data) {
  return {
    type: types.SIGN_IN,
    payload: token_data
  };
}

export function signOut() {
  return {
    type: types.SIGN_OUT,
    payload: null
  };
}
