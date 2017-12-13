import * as React from 'react';
import { Switch, Route } from 'react-router-dom';
import WelcomeScreen from './WelcomeScreen';
import AccountView from './AccountView';
import paths from './paths';

class Main extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path={paths.home} component={WelcomeScreen} />
        <Route path={paths.accounts} component={AccountView} />
      </Switch>
    );
  }
}

export default Main;
