import React from 'react';
import headerImage from '../../images/dogs-header.jpg'

export default class Header extends React.Component {
  render() {
    return (
		<div id="headerWidget" className="row justify-content-center text-center">
      <div className="row col-12 justify-content-center">
			    <div id="headerImage" className="col-lg-6 col-md-8 col-sm-11 col-11">
            <img className="w-100" src={headerImage} alt="Dog Finder" />
          </div>
      </div>
      <div className="row">
        <h2 id="font-red" className="col-12">Dog Finder</h2>
        <h4 className="col-12 m-2 text-capitalize">
  				{this.props.message}
  			</h4>
      </div>

		</div>
	);
  }
}
