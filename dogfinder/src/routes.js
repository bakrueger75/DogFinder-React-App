import React from 'react';
import { Route } from 'react-router-dom';
import DogFinder from './components/DogFinder';
import DogDetail from './components/DogDetail/DogDetail';
import AboutPage from './components/about/aboutPage.js';

export default (
  <div>
    <Route exact path="/" component={DogFinder} />
    <Route exact path="/detail/:breed" component={DogDetail} />
    <Route exact path="/detail/:breed/:subBreed" component={DogDetail} />
    <Route exact path="/about" component={AboutPage} />
  </div>
);
