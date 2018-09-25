import React from 'react';
import spinnerImage from '../images/spinner-gif-17.gif';
import DogSearchItem from './DogSearchItem';

const SearchResults = ({isLoading, searchResults}) => {
	if (isLoading) {
		// Shows spinner image to indicate search is running.
		return (
			<div id="dogSearchResults" className="row w-100 p-4 justify-content-center">
				<div className='searchSpinner'><img src={spinnerImage} alt="Processing..."/></div>
			</div>
		);
	} else if (searchResults != null && searchResults.dogCount && searchResults.dogCount > 0) {
		// Render the search results
		var dogsLabel = "Dog";
		if (searchResults.dogCount > 1 || searchResults.dogCount === 0) {
			dogsLabel = "Dogs";
		}
		return (
			<div id="dogSearchResults" className="row w-100 p-2 justify-content-center">
				<div id="dogCount" className="row w-100 justify-content-center m-2"><h4>{searchResults.dogCount} {dogsLabel} Found</h4></div>
				<div id="dogResultsList" className="row w-100 justify-content-center m-2">
					{searchResults.dogResults.map((dogResult, index) => (
						<DogSearchItem key={index} itemIndex={index} dog={dogResult} />
					))}
				</div>
				<div style={{clear:'both'}}></div>
			</div>
		);
	} else {
		// Render an empty div, no search results yet.
		return (
			<div id="dogSearchResults" className="dogSearchResults"></div>
		);
	}
}

export default SearchResults;
