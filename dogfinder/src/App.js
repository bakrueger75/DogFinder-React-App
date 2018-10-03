//import React, { Component } from 'react';
import React from 'react';
//import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { Route } from 'react-router-dom';
import DogFinder from './components/DogFinder';
import DogDetail from './components/DogDetail/DogDetail';

const App = () => (
  <div>
      <Route exact path="/" component={DogFinder} />
      <Route exact path="/detail/:breed" component={DogDetail} />
      <Route exact path="/detail/:breed/:subBreed" component={DogDetail} />
  </div>
);

export default App;
