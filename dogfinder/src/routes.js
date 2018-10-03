import React from 'react';
import { Route } from 'react-router-dom';
import DogFinder from './components/DogFinder';
import DogDetail from './components/DogDetail/DogDetail';

export default (
  <Route path="/" component={DogFinder}>
    <Route path="detail" component={DogDetail} />
  </Route>
);
