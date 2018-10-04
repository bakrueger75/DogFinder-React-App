import notFoundImage from '../images/image-not-found.jpg';
import delay from './delay';
import delayImg from './delayImg';

export default class DogFinderApi {

	static getWikipediaDogDetails(breed, subBreed) {
		return new Promise((resolve, reject) => {
			let wikiSearch = ((subBreed) ? subBreed + '%20' + breed: breed);
			// Do a search and use the first result as the page to pull the dog details from wikipedia
			fetch("https://en.wikipedia.org/w/api.php?format=json&origin=*&action=query&list=search&srlimit=1&srsearch="+wikiSearch+"%20dog")
				.then(function(searchResponse) {
					searchResponse.json().then((searchData) => {
						let pageId = searchData.query.search[0].pageid;
						// Using the pageId from the first search result, call wikipedia to get the summary extract.
						fetch("https://en.wikipedia.org/w/api.php?format=json&origin=*&action=query&prop=extracts&exintro&redirects=1&pageids="+pageId)
							.then(function(response) {
								response.json().then((data) => {
									let dogDetails = {
										pageId: pageId,
										details: data.query.pages[pageId].extract
									};
									resolve(dogDetails);
								});
							});
					})
					.catch((error) => {
						console.log(error);
					});
				})
				.catch(function(error) {
					console.log(error);
				});
		});
	}

	static getDogList() {
		return new Promise((resolve, reject) => {
			fetch("https://dog.ceo/api/breeds/list")
	       .then(function(response) {
					 response.json().then(function (data) {
						 setTimeout(() => {
							 resolve(data.message);
						 }, delay);
					 });
	       })
	       .catch(function(error) {
	         console.log(error);
	       });
		});
	}

	static fetchDogImage(breed, subBreed) {
		return new Promise((resolve, reject) => {
			let subBreedUrl = "";
			if (subBreed && subBreed.length > 0) {
				subBreedUrl = "/" + subBreed;
			}
			try {

			fetch("https://dog.ceo/api/breed/"+breed+subBreedUrl+"/images/random")
				.then((response) => {
					if (response.ok) {
						response.json().then((imageResults) => {
							var imageUrl = "";
							if (imageResults != null) {
								imageUrl = imageResults.message;
							}
							setTimeout(() => {
								resolve(imageUrl);
 						 	}, delayImg);
						});
					} else {
						console.log("Failed to retrieve image");
						resolve(notFoundImage);
					}
				});
			}
			catch(err) {
				console.log("Failed to retrieve image");
				resolve(notFoundImage);
			}
		});
	}

}
