
import { combineReducers } from 'redux';
import {routerReducer} from 'react-router-redux';
import PostsReducer from "./posts-reducer";
import AuthReducer from "./auth-reducer";
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
  form: formReducer,
  posts: PostsReducer,
  auth: AuthReducer,
  routing: routerReducer
});

export default rootReducer;
