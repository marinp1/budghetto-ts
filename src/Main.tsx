import * as React from 'react';
import { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import WelcomeScreen from './WelcomeScreen';
import SummaryView from './SummaryView';

class Main extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={WelcomeScreen} />
        <Route path="/summary" component={SummaryView} />
      </Switch>
    )
  }
}

export default Main
