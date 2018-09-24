import React from 'react';
import headerImage from '../../images/dogs-header.jpg'

export default class Header extends React.Component {
  render() {
    return (
		<div id="headerWidget">
			<div id="headerImage"><img src={headerImage} alt="" /></div>
			<h2 id="font-red">Dog Finder</h2>
      <h4>
				Welcome to Dog Finder! Search for a dog or select a breed from the list.
			</h4>
		</div>
	);
  }
}
