import React from 'react';
import Header from '../common/header';
import Footer from '../common/footer';

export default class AboutPage extends React.Component {
  render() {
    return (
      <div id="aboutPage" className="container">
        <Header message="About Dog Finder" />
        <Footer />
      </div>
    );
  }
}
