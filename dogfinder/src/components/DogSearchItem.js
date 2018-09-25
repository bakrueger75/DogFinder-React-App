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
    var dogClass = "col-md";
 		if (this.props.dogCount >= 3) {
	 		dogClass = "col-md-4";
		}
    return (
      <div id={"dogBreed_"+this.props.itemIndex} className={dogClass + ' dogSearchItem'} key={this.props.itemIndex} onClick={() => {this.fetchImage(this.props.dog.breed, this.props.dog.subBreed)}} >
        <img className="dogResultImg" src={this.state.imageUrl} alt={this.props.breedName}/>
        <div id={"dogBreedName_"+this.props.itemIndex} ><h2 className="text-capitalize text-red">{this.props.dog.breedName}</h2></div>
      </div>
    );
  }
};
