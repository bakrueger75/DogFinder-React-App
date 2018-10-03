import React from 'react';
import DogFinderApi from '../api/dogFinderApi';
import DogSearchApi from '../api/dogSearchApi';
import SearchResults from './SearchResults';
import spinnerImage from '../images/spinner-gif-17.gif';

export default class SearchForm extends React.Component {
  constructor(props) {
	  super(props);
	  this.state = {
		  error: null,
		  breedsLoaded: false,
		  breeds: [],
		  searchTerm: "",
		  breedSelected: "",
		  searchLoading: false,
      searchResults: []
	  }

	  this.dogSearchKeyup = this.dogSearchKeyup.bind(this);
	  this.breedSelected = this.breedSelected.bind(this);
	  this.dogSearch = this.dogSearch.bind(this);
    this.scrollToResults = this.scrollToResults.bind(this);
  }

  scrollToResults() {

  }

  breedSelected(e) {
    this.setState({
      breedSelected: e.target.value,
      searchTerm: "",
      searchLoading: true
    });
    DogSearchApi.performDogSearch(e.target.value, true)
      .then((dogResults) => {
        this.setState({
    		  searchLoading: false,
          searchResults: dogResults
    	  });
      });
      this.refs.dogSearchTerm.value="";
  }

  dogSearch() {
	  this.setState({
      breedSelected: "",
      searchTerm: this.refs.dogSearchTerm.value,
		  searchLoading: true
	  });
    DogSearchApi.performDogSearch(this.refs.dogSearchTerm.value, false)
      .then((dogResults) => {
        this.setState({
    		  searchLoading: false,
          searchResults: dogResults
    	  });
      });
  }

  dogSearchKeyup(e) {
	  if (e.key === "Enter") {
		  this.dogSearch();
	  }
	  this.refs.breedList.value="";
  }

  componentDidMount() {
		DogFinderApi.getDogList()
      .then((dogList) => {
    		if (dogList) {
    			this.setState({
    				breedsLoaded: true,
    				breeds: dogList
    			});
    		}
      });
  }

  render() {
	const { error, breedsLoaded, breeds } = this.state;
	if (error) {
    return (
      <div id="dogSearchForm" className="row justify-content-center text-danger text-center m-4">
				Failed to load, please try again later.
			</div>
    );
	} else if (!breedsLoaded) {
		return (
      <div id="dogSearchForm" className="row justify-content-center">
				<div className='searchSpinner'><img src={spinnerImage} alt="Processing..."/></div>
			</div>
    );
	} else {
		return (
			<div id="dogSearchForm" className="row justify-content-center">
        <div className="row justify-content-center col-12"><h5>Search for a dog or select a breed from the list.</h5></div>
        <div className="row justify-content-center col-10 col-sm-10 col-md-6 col-lg-4">
  				<div className="w-100 p-1">
  					<select className="form-control text-capitalize" id="breedList" onChange={this.breedSelected} ref="breedList">
  						<option className="text-capitalize" value="">Choose a Breed</option>
  						{ breeds.map((breed, index) => (
  							<option className="text-capitalize" key={index} value={breed}>{breed}</option>
  						))}
  					</select>
  				</div>

  				<div className="row w-100 p-1 justify-content-center font-weight-bold">OR</div>

  				<div className="w-100 p-1">
  					<input className="form-control" name="dogSearchTerm" id="dogSearchTerm" placeholder="Search for a dog" type="input" ref="dogSearchTerm" onKeyUp={this.dogSearchKeyup}/>
          </div>
          <div className="row w-100 p-1 justify-content-center">
  					<button id="searchButton" type="button" className="btn btn-primary w-75" onClick={this.dogSearch}>Search</button>
  				</div>
        </div>

				<SearchResults isLoading={this.state.searchLoading} searchResults={this.state.searchResults} />
			</div>
		);
	}
  }
}
