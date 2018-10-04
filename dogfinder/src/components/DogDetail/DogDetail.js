import React from 'react';
import Header from '../common/header';
import Footer from '../common/footer';
import DogImage from '../DogImage/DogImage';
import DogDetailTxt from './DogDetailTxt';

export default class DogDetail extends React.Component {
  render() {
    return (
		<div id="dogDetail" className="container">
      <div className="row justify-content-center">
    		<Header message={((this.props.match.params.subBreed) ? this.props.match.params.subBreed + ' ' : '') + this.props.match.params.breed} />
        <div className="row col-12 mt-2">
          <div className="col-xl-6 col-lg-6 col-md-4 col-sm-12 col-12 justify-content-right text-center mb-4 mb-sm-4 mb-xs-4 mb-md-0">
            <DogImage breed={this.props.match.params.breed} subBreed={this.props.match.params.subBreed} />
          </div>
          <div className="col-xl-6 col-lg-6 col-md-8 col-sm-12 col-12 justify-content-left align-top">
            <DogDetailTxt breed={this.props.match.params.breed} subBreed={this.props.match.params.subBreed} />
          </div>
        </div>
    		<Footer />
      </div>
		</div>
    );
  }
}
