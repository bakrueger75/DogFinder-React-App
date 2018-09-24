import notFoundImage from '../images/image-not-found.jpg';

export default class DogFinderApi {

	static getDogList() {
		return new Promise((resolve, reject) => {
			fetch("https://dog.ceo/api/breeds/list")
	       .then(function(response) {
					 response.json().then(function (data) {
						 resolve(data.message);
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
							resolve(imageUrl);
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
