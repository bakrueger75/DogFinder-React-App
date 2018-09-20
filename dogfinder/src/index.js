import React from 'react';
import ReactDOM from 'react-dom';
import './css/dogfinder.css';
import Header from './components/header.js';
import Footer from './components/footer.js';
import spinnerImage from './images/spinner-gif-17.gif'

class DogSearchResults extends React.Component {
	constructor(props) {
	  super(props);
	  this.state = {
		  error: null,
		  breedSelected: props.breedSelected,
		  searchTerm: props.searchTerm,
		  searchResults: [],
		  resultsCount: 0,
		  isLoading: props.isLoading
	  }
	}

	componentDidUpdate() {
		if (this.state.isLoading) {
			var that = this;
			if (this.state.searchTerm != null && this.state.searchTerm.length > 0) {
				fetch("http://localhost:8080/BKDogFinderRestServices/services/bkdogfinderservice/searchByTerm/"+ encodeURI(this.state.searchTerm))
					.then(function(response) {
						return response.json();
					})
					.then(function(data) {
						that.setState({
							isLoading: false,
							searchResults: data.dogResults,
							resultsCount: data.dogCount
						});
					});
			} else if (this.state.breedSelected != null && this.state.breedSelected.length > 0) {
				fetch("http://localhost:8080/BKDogFinderRestServices/services/bkdogfinderservice/searchByBreed/"+this.state.breedSelected)
					.then(function(response) {
						return response.json();
					})
					.then(function(data) {
						that.setState({
							isLoading: false,
							searchResults: data.dogResults,
							resultsCount: data.dogCount
						});
					});
			}
		}
	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			isLoading: nextProps.isLoading,
			breedSelected: nextProps.breedSelected,
			searchTerm: nextProps.searchTerm
		});
    }

	shouldComponentUpdate(nextProps, nextState) {
		if (nextProps.isLoading !== this.state.isLoading) {
			return true;
		} else if (nextProps.breedSelected !== this.state.breedSelected) {
			return true;
		} else if(nextProps.searchTerm !== this.state.searchTerm) {
			return true;
		} else if (nextState.isLoading !== this.state.isLoading) {
			return true;
		} else {
			return false;
		}
	}

  render() {
	if (this.state.isLoading) {
		return (
		<div id="dogSearchResults">
			<div className='searchSpinner'><img src={spinnerImage} alt="Processing..."/></div>
		</div>
		);
	} else if (this.state.resultsCount > 0) {
		var dogsLabel = "Dog";
		if (this.state.resultsCount > 1 || this.state.resultsCount === 0) {
			dogsLabel = "Dogs";
		}
 		var dogClass = "dogResult";
 		if (this.state.resultsCount >= 3) {
	 		dogClass += " left";
		}
		return (
			<div id="dogSearchResults">
				<div id="dogResultsList">
					<div id="dogCount" className="dogCount">{this.state.resultsCount} {dogsLabel} Found.</div>
					{this.state.searchResults.map((dogResult, index) => (
						<div id={"dogBreed_"+index} className={dogClass} key={index}>
						<img src={dogResult.image} alt={dogResult.breedName} /	>
						<div id={"dogBreedName_"+index} className="breedName resultBreedName">{dogResult.breedName}</div>
						</div>
					))}
				</div>
				<div style={{clear:'both'}}></div>
			</div>
		);
	} else {
		return (
			<div id="dogSearchResults" className="dogSearchResults"></div>
		);
	}
  }
}

class SearchForm extends React.Component {
  constructor(props) {
	  super(props);
	  this.state = {
		  error: null,
		  breedsLoaded: false,
		  breeds: [],
		  searchTerm: "",
		  breedSelected: "",
		  searchLoading: false
	  }

	  this.dogSearchKeyup = this.dogSearchKeyup.bind(this);
	  this.breedSelected = this.breedSelected.bind(this);
	  this.dogSearch = this.dogSearch.bind(this);
  }

  breedSelected(e) {
	  this.setState({
		  breedSelected: e.currentTarget.value,
		  searchTerm: "",
		  searchLoading: true
	  });
	  this.refs.dogSearchTerm.value="";
  }

  dogSearch() {
	  this.setState({
		  breedSelected: "",
		  searchTerm: this.refs.dogSearchTerm.value,
		  searchLoading: true
	  });
  }

  dogSearchKeyup(e) {
	  if (e.key === "Enter") {
		  this.dogSearch();
	  }
	  this.refs.breedList.value="";
  }

  componentDidMount() {
	var that = this;
	fetch("http://localhost:8080/BKDogFinderRestServices/services/bkdogfinderservice/getDogList")
		.then(function(response) {
			return response.json();
		})
		.then(function(data) {
			that.setState({
				breedsLoaded: true,
				breeds: data.breedList
			});
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
				<div id="welcomeMessage">
					Welcome to Dog Finder! Search for a dog or select a breed from the list.
				</div>

				<div className="searchFields">
					<div className="searchField">
						<select id="breedList" onChange={this.breedSelected} ref="breedList">
							<option className="breedOption" value="">Choose Dog Breed</option>
							{ breeds.map((breed, index) => (
								<option className="breedOption" key={index} value={breed}>{breed}</option>
							))}
						</select>
					</div>

					<div  className="searchField or">OR</div>

					<div className="searchField">
						<input name="dogSearchTerm" id="dogSearchTerm" type="input" ref="dogSearchTerm" onKeyUp={this.dogSearchKeyup}/>
						<button id="searchButton" className="redButton" onClick={this.dogSearch}>Search</button>
					</div>
				</div>

				<DogSearchResults isLoading={this.state.searchLoading} searchTerm={this.state.searchTerm} breedSelected={this.state.breedSelected} />
			</div>
		);
	}
  }
}


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

// ========================================

ReactDOM.render(
  <DogFinder />,
  document.getElementById('root')
);
