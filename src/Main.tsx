import * as React from 'react';
import { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import WelcomeScreen from './WelcomeScreen'

class Main extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={WelcomeScreen} />
      </Switch>
    )
  }
}

export default Main
