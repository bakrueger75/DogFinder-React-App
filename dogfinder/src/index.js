import React from 'react';
import ReactDOM from 'react-dom';
import './css/styles.css';
import Header from './components/common/header.js';
import Footer from './components/common/footer.js';
import SearchForm from './components/SearchForm';

class DogFinder extends React.Component {
  render() {
    return (
		<div id="dogFinderApp">
			<Header />
			<SearchForm />
			<Footer />
		</div>
    );
  }
}

ReactDOM.render(
  <DogFinder />,
  document.getElementById('root')
);
