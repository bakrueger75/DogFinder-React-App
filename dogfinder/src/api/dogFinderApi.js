import notFoundImage from '../images/image-not-found.jpg';
import delay from './delay';
import delayImg from './delayImg';

export default class DogFinderApi {

	static getWikipediaDogDetails(breed, subBreed) {
		return new Promise((resolve, reject) => {
			let wikiSearch = ((subBreed) ? subBreed + '%20' + breed: breed);
			console.log(wikiSearch);
			// 	{
			// 		mode: "no-cors"
			// 		// ,
			// 		// headers: {
			// 		// 	"Content-Type": "text/json; charset=utf-8",
			// 		// 	"X-Content-Type-Options": "nosniff"
			// 		// }
			// 	})
			//fetch("https://en.wikipedia.org/w/api.php?&origin=*&action=opensearch&search=cattledog&limit=2")
			fetch("https://en.wikipedia.org/w/api.php?format=json&origin=*&action=query&prop=extracts&exintro&explaintext&redirects=1&titles="+wikiSearch)
				.then(function(response) {
					//console.log(response.json());
					response.json().then((data) => {
						console.log(data);
						resolve(data.message);
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
