import React from 'react';
import Header from '../common/header';
import Footer from '../common/footer';

export default class AboutPage extends React.Component {
  render() {
    return (
      <div id="aboutPage" className="container">
        <Header message="About Dog Finder" />
        <div id="aboutPage" className="row justify-content-center">
          <div id="aboutContent" className="col-10 col-sm-10 col-xs-10 col-md-10 col-lg-8 col-xl-8">
            <p>Dog Finder is a React appliction developed for training purposes to learn React.</p>
            <ul>
              <li>Created By: Brian Krueger</li>
              <li>Editor: Atom</li>
              <li>Technologies:<br/>
                <ul>
                  <li>React</li>
                  <li>React Router</li>
                  <li>Bootstrap</li>
                  <li>Sass</li>
                </ul>
              </li>
              <li>Data/API Sources:<br/>
                <ul>
                  <li>Dog CEO: <a href="https://dog.ceo">https://dog.ceo</a><br/>
                    <ul>
                      <li>Breed List: https://dog.ceo/api/breeds/list</li>
                      <li className="text-muted">Random Image All Breeds (future): https://dog.ceo/api/breeds/image/random</li>
                      <li>Random Image Breed: https://dog.ceo/api/breed/<span className="text-success">breed</span>/image/random</li>
                      <li>Random Image Sub-Breed: https://dog.ceo/api/breed/<span className="text-success">breed</span>/<span className="text-success">subbreed</span>/image/random</li>
                      <li>List All (Used for Search): https://dog.ceo/api/breeds/list/all</li>
                    </ul>
                  </li>
                  <li>Wikipedia: for dog details<br/>
                    <ul>
                      <li>Search: https://en.wikipedia.org/w/api.php?format=json&origin=*&action=query&list=search&srlimit=1&srsearch=<span className="text-success">breed%20subBreed</span>%20dog</li>
                      <li>Details Extract: https://en.wikipedia.org/w/api.php?format=json&origin=*&action=query&prop=extracts&exintro&redirects=1&pageids=<span className="text-success">pageId</span></li>
                    </ul>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}
