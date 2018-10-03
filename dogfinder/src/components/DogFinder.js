import React from 'react';
import Header from './common/header';
import Footer from './common/footer';
import SearchForm from './SearchForm';

export default class DogFinder extends React.Component {
  render() {
    return (
		<div id="dogFinderApp" className="container">
  		<Header message="Welcome to Dog Finder!" />
  		<SearchForm />
  		<Footer />
		</div>
    );
  }
}
