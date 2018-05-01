import { h, Component } from 'preact';
import { Router } from 'preact-router';
import Helmet from 'preact-helmet';

import Home from '../routes/home';
import Profile from 'async!../routes/profile';

export default class App extends Component {
  render() {
    return (
      <div id="app">
        <noscript>Please enable JavaScript or go to https://xpbytes.com</noscript>
        <Helmet
          defaultTitle="Derk-Jan Karrenbeld"
          titleTemplate="Derk-Jan Karrenbeld - %s"
        />
        <Router>
          <Home path="/" />
          <Profile path="/profile/" user="me" />
          <Profile path="/profile/:user" />
        </Router>
      </div>
    );
  }
}
