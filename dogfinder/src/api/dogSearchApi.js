import delay from './delay';

export default class DogSearchApi {

  static performDogSearch(searchTerm, breedSearch) {
		return new Promise((resolve, reject) => {

			let dogResults = {
				"dogCount": 0,
				"searchTerm": searchTerm,
				"breedSearch": breedSearch,
				"dogResults": []
			};
			if (searchTerm != null && searchTerm.length > 0) {
				// The service URL should in a properties file instead of in the code.
				fetch("https://dog.ceo/api/breeds/list/all").then((apiResponse) => {
					apiResponse.json().then ((data) => {
						if (data != null) {
							let dogMatches = [];
							let dogList = data.message;
							let breedList = Object.keys(data.message);
							let searchMatch = false;
							let subBreedMatch = false;
							let matchCount = 0;
							let searchTermMatches = 0;
							let searchTerms = decodeURI(searchTerm).split(" ");
							let subBreedsMatched = [];
							 // Loop through the dog breeds from the rest service and look for a match on the selected breed name or search term
							 // in the master breed list or the sub breeds.
							breedList.forEach((dogBreed) => {
								searchTermMatches = 0;
								searchMatch = false;
								subBreedMatch = false;
								subBreedsMatched = [];
								// Look for a search term match for the master breed
								searchTerms.forEach((searchTerm) => {
									if ((breedSearch && dogBreed === searchTerm) || dogBreed.indexOf(searchTerm) >= 0) {
										searchTermMatches++;
									}
								});
								if (searchTermMatches === searchTerms.length) {
									matchCount++;
									searchMatch = true;
								}

								if (!breedSearch) {
									// If the customer is using a search term, look through the sub breeds for additional matches.
									let subBreeds = dogList[dogBreed];
									if (subBreeds != null && subBreeds.length > 0) {
										subBreeds.forEach((subBreed) => {
											searchTermMatches = 0;
											let fullBreedName = dogBreed + " " + subBreed;
											if (!searchMatch) {
												searchTerms.forEach((searchTerm) => {
													if (fullBreedName.indexOf(searchTerm) >= 0) {
														searchTermMatches++;
													}
												});
											}
											if (searchMatch || searchTermMatches === searchTerms.length) {
												subBreedMatch = true;
												// Add the searchTerm matched subBreed to the list of subBreedMatches,
												// these will be added to the search results below.
												subBreedsMatched.push(subBreed);
												matchCount++;
											}
										});
									}
								}

								if (searchMatch || subBreedMatch) {
									let dogMatch;
									if (searchMatch) {
										//  Add the matching breed to the search results.
										dogMatch = {
											"breed": "",
											"breedName": "",
											"subBreed": "",
											"subBreeds": {}
										};
										dogMatch.breed = dogBreed;
										dogMatch.breedName = dogBreed;
										dogMatch.subBreeds = dogList[dogBreed];
										dogMatches.push(dogMatch);
									}

									if (breedSearch || subBreedMatch) {
										// If the customer is doing a breed search or the searchTerm matched a subbreed,
										// pull the corresponding subbreeds and add them to the results.
										let subBreeds = [];
										if (breedSearch) {
											// Use any subbreeds from the master breed
											subBreeds= dogList[dogBreed];
										} else {
											// Use the subbreeds that matched the searchTerm
											subBreeds= subBreedsMatched;
										}
										if (subBreeds != null && subBreeds.length > 0) {
											let dogMatch = {};
											subBreeds.forEach((subBreed) => {
												//  Add the matching subbreed to the search results.
												dogMatch = {
													"breed": "",
													"breedName": "",
													"subBreed": "",
													"subBreeds": {}
												};
												dogMatch.breed = dogBreed;
												dogMatch.breedName = subBreed + " " + dogBreed;
												dogMatch.subBreed = subBreed;
												dogMatches.push(dogMatch);

												if (breedSearch) matchCount++;
											});
										}
									}
								}
							});
							dogResults.dogCount = matchCount;
							if (dogMatches.length > 0) {
								// Sort the dog results alphabetically by breedName
								dogMatches.sort((a,b) => {
									if (a.breedName < b.breedName) return -1;
									if (a.breedName > b.breedName) return 1
									return 0;
								});
								//DogFinderApi.dogCompare);
								dogResults.dogResults = dogMatches;
							} else {
								dogResults.dogResults = "";
							}
						}
            setTimeout(() => {
              resolve(dogResults);
            }, delay);
					}); // end of json after the fetch
				}); // End of fetch for all breeds
			} // searchTerm if block
		});
	} // performDogSearch


}
