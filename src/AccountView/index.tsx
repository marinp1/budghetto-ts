import * as React from 'react';
import Navbar from '../Navbar';
import { ObservableAccountStore } from './AccountStore';
import { observer } from 'mobx-react';
import AccountList from './AccountList';
import AccountEditModal from './AccountEditModal';
import NewAccountButton from './NewAccountButton';

interface AccountViewState {
  screenWidth: number;
}

const observableAccountStore = new ObservableAccountStore();

@observer
class AccountView extends React.Component<{}, AccountViewState> {

  constructor(props: {}) {
    super(props);
    this.state = {
      screenWidth: 0,
    };
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
          <AccountEditModal
            screenWidth={this.state.screenWidth}
            accountStore={observableAccountStore}
          />
          <div className="section">
            <div className="container">
              <div>
                <h1 className="title is-4" style={{ display: 'inline-block', margin: 0 }}>
                  Accounts
                </h1>
                <NewAccountButton
                  screenWidth={this.state.screenWidth}
                  accountStore={observableAccountStore}
                />
              </div>
              <hr></hr>
              <AccountList
                accountStore={observableAccountStore}
                screenWidth={this.state.screenWidth}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AccountView;
