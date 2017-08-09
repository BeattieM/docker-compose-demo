import axios from 'axios';
import * as types from '../constants/action-types';
import * as endpoints from '../constants/endpoints';
// import mockPosts from '../reducers/mock-posts';

export function fetchPosts() {
  const request = axios.get(`${endpoints.API_BASE}${endpoints.POSTS}`);
  return {
    type: types.FETCH_POSTS,
    payload: request
  };
}

export function receivePost(new_post) {
  return {
    type: types.RECEIVE_POST,
    payload: new_post
  };
}

export function createPost(new_post) {
  return {
    type: types.CREATE_POST,
    payload: new_post
  };
}

export function updatePost(new_post) {
  return {
    type: types.UPDATE_POST,
    payload: new_post
  };
}

export function deletePost(new_post) {
  return {
    type: types.DELETE_POST,
    payload: new_post
  };
}
