import React from 'react';
import DogFinderApi from '../../api/dogFinderApi';
import loadingImage from '../../images/image-loading.gif';

export default class DogImage  extends React.Component {
  constructor(props) {
	  super(props);
	  this.state = {
      imageUrl: loadingImage
	  }
	}

  fetchImage(breed, subBreed) {
    this.setState({
      imageUrl: loadingImage
    });
    DogFinderApi.fetchDogImage(breed, subBreed)
      .then((dogImage) => {
        this.setState({
          imageUrl: dogImage
        });
      });
  }

  componentWillMount() {
    this.fetchImage(this.props.breed, this.props.subBreed);
  }

  render() {
    return (
      <img className="dogResultImg" src={this.state.imageUrl} alt={this.props.breedName} style={{cursor:"pointer"}} onClick={() => {this.fetchImage(this.props.breed, this.props.subBreed)}}/>
    );
  }
};
