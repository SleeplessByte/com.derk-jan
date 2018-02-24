import { h, Component } from 'preact'
import { Switch, Route } from 'react-router'
import { BrowserRouter as Router } from 'react-router-dom'

import Home from './home'
import Profile from './profile'

export default class App extends Component {
  render() {
    return (
      <div id="app">
        <Router>
          <Switch>
            <Route path="/" exact={true} component={Home} />
            <Route path="/profile" exact={true} component={Profile} />
            <Route path="/profile/:user" component={Profile} />
          </Switch>
        </Router>
      </div>
    )
  }
}
