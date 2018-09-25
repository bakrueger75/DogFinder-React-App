import React from 'react';
import DogFinderApi from '../api/dogFinderApi';
import loadingImage from '../images/image-loading.gif';

//const DogSearchItem = ({itemIndex, itemClass, breed, breedName, subBreed}) => {
export default class DogSearchItem  extends React.Component {
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
    this.fetchImage(this.props.dog.breed, this.props.dog.subBreed);
  }

  render() {
    return (
      <div id={"dogBreed_"+this.props.itemIndex} className='col-xl-3 col-lg-4 col-md-6 col-sm-12 col-12 justify-content-center text-center p-2' style={{cursor:"pointer"}} key={this.props.itemIndex} onClick={() => {this.fetchImage(this.props.dog.breed, this.props.dog.subBreed)}} >
        <img className="dogResultImg" src={this.state.imageUrl} alt={this.props.breedName}/>
        <div id={"dogBreedName_"+this.props.itemIndex} ><h4 className="text-capitalize text-red text-center">{this.props.dog.breedName}</h4></div>
      </div>
    );
  }
};
