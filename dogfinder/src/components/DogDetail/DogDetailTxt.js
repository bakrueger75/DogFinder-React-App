import React from 'react';
import DogFinderApi from '../../api/dogFinderApi';

export default class DogDetail extends React.Component {
  constructor(props) {
	  super(props);
	  this.state = {
      dogDetails: {
        pageId: 0,
        details: ''
      }
	  }
	}

  componentWillMount() {
    DogFinderApi.getWikipediaDogDetails(this.props.breed, this.props.subBreed)
      .then((dogDetails) => {
        this.setState({
          dogDetails: dogDetails
        })
      });
  }

  render() {
      if (this.state.dogDetails.pageId === 0) {
        return (
          <div id="dogDetailTxt">
            Loading
      		</div>
        );
      } else {
        return (
          <div id="dogDetailTxt">
            <div dangerouslySetInnerHTML={{__html: this.state.dogDetails.details}} />
            <div>For more information visit <a href={"http://en.wikipedia.org/?curid="+this.state.dogDetails.pageId} target="_blank">Wikipedia</a>.</div>
      		</div>
        );
      }
  }
}
