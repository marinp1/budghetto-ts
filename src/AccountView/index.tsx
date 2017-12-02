import * as React from 'react';
import glamorous from 'glamorous';
import Navbar from '../Navbar';
import { ObservableAccountStore } from './AccountStore';
import AccountList from './AccountList';
import AccountEditModal from './AccountEditModal';

const Container = glamorous.div({

});

interface AccountViewState {
  screenWidth: number,
}

const observableAccountStore = new ObservableAccountStore();

class AccountView extends React.Component<{}, AccountViewState> {

  constructor(props: {}) {
    super(props);
    this.state = {
      screenWidth: 0,
    }
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }
  
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }
  
  updateWindowDimensions() {
    this.setState({ screenWidth: window.innerWidth });
  }

  render() {
    return (
      <div>
        <Navbar/>
        <div>
          <AccountEditModal accountStore={observableAccountStore}/>
          <Container className="section">
            <div className="container">
              <h1 className="title is-4">Accounts</h1>
              <hr></hr>
              <AccountList accountStore={observableAccountStore} screenWidth={this.state.screenWidth}/>
            </div>
          </Container>
        </div>
      </div>
    )
  }
}

export default AccountView;