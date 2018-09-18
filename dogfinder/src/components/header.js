import React from 'react';
import ReactDOM from 'react-dom';
import headerImage from '../images/dogs-header.jpg'

export default class Header extends React.Component {
  render() {
    return (
		<div id="headerWidget">
			<div id="headerImage"><img src={headerImage} alt="" /></div>
			<div id="headerTitle">Dog Finder</div>
		</div>    
	);
  }
}

