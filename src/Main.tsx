import * as React from 'react';
import { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './Login'

class Main extends Component {
  render() {
    return (
      <Switch>
        <Route path="/" component={Login} />
      </Switch>
    )
  }
}

export default Main