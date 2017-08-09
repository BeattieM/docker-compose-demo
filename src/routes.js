import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/app';
import PostList from './containers/post-list';
import NotFoundPage from './components/not-found-page';
import SignIn from './components/sign-in';
import SignUp from './components/sign-up';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={PostList}/>
    <Route path="sign_in" component={SignIn}/>
    <Route path="sign_up" component={SignUp}/>
    <Route path="*" component={NotFoundPage}/>
  </Route>
);
