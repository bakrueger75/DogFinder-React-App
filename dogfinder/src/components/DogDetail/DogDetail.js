import React from 'react';
import Header from '../common/header';
import Footer from '../common/footer';
import { Link } from 'react-router-dom';
import DogImage from '../DogImage/DogImage';
import DogFinderApi from '../../api/dogFinderApi';

export default class DogDetail extends React.Component {
  constructor(props) {
	  super(props);
	  this.state = {
      dogDetails: ''
	  }
	}

  componentWillMount() {
    DogFinderApi.getWikipediaDogDetails(this.props.match.params.breed, this.props.match.params.subBreed)
      .then((dogDetails) => {
        this.setState({
          dogDetails: dogDetails
        })
      });
  }

  render() {
    return (
		<div id="dogDetail" className="container">
      <div className="row justify-content-center">
        <Link to="/" >Home</Link>
    		<Header message={((this.props.match.params.subBreed) ? this.props.match.params.subBreed + ' ' : '') + this.props.match.params.breed} />
        <div className="row col-12">
          <div className="col-xl-6 col-lg-6 col-md-4 col-sm-12 col-12 justify-content-right">
            <DogImage breed={this.props.match.params.breed} subBreed={this.props.match.params.subBreed} />
          </div>
          <div className="col-xl-6 col-lg-6 col-md4 col-sm-12 col-12 justify-content-left">
            {this.state.dogDetails}
          </div>
        </div>
    		<Footer />
      </div>
		</div>
    );
  }
}
