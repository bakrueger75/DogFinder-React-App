import React from 'react';
import DogFinderApi from '../api/dogFinderApi';
import DogSearchApi from '../api/dogSearchApi';
import SearchResults from './SearchResults';

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
		return "ERROR";
	} else if (!breedsLoaded) {
		return "LOADING";
	} else {
		return (
			<div id="dogSearchForm">
				<div className="searchFields">
					<div className="searchField">
						<select className="form-control text-capitalize" id="breedList" onChange={this.breedSelected} ref="breedList">
							<option className="text-capitalize" value="">Choose Dog Breed</option>
							{ breeds.map((breed, index) => (
								<option className="text-capitalize" key={index} value={breed}>{breed}</option>
							))}
						</select>
					</div>

					<div  className="searchField or">OR</div>

					<div className="searchField">
						<input className="form-control" name="dogSearchTerm" id="dogSearchTerm" type="input" ref="dogSearchTerm" onKeyUp={this.dogSearchKeyup}/>
						<button id="searchButton" type="button" className="btn btn-primary" onClick={this.dogSearch}>Search</button>
					</div>
				</div>

				<SearchResults isLoading={this.state.searchLoading} searchResults={this.state.searchResults} />
			</div>
		);
	}
  }
}