import React from 'react';
import ReactDOM from 'react-dom';
import './css/styles.css';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
//import DogFinder from './components/DogFinder.js';

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
  , document.getElementById('root')
);
