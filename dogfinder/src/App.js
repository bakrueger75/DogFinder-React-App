import React from 'react';
import routes from './routes.js';
import { withRouter } from 'react-router-dom';

class App extends React.Component {
  render() {
    return (
      <div id="App">
        {routes}
      </div>
    );
  }
}

export default withRouter(App);
