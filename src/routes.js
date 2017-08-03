import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/app';
import NotFoundPage from './components/not-found-page';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={App}/>
    <Route path="*" component={NotFoundPage}/>
  </Route>
);
