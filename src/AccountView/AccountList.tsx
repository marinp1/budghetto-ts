import { observer } from 'mobx-react';
import * as React from 'react';
import { Account, ObservableAccountStore } from './AccountStore';
import { AccountComponent } from './AccountComponent';

@observer
class AccountList extends React.Component<{accountStore: ObservableAccountStore, screenWidth: number}, {}> {

  constructor(props: {accountStore: ObservableAccountStore, screenWidth: number}) {
    super(props);
    this.handleAccountClick = this.handleAccountClick.bind(this);
  }

  handleAccountClick(account: Account): void {
    this.props.accountStore.selectAccount(account);
  }

  render() {
      return (
        <div className="columns is-multiline">
          {this.props.accountStore.getAccounts.map((account) => {
            return <AccountComponent
              account={account}
              handleAccountClick={this.handleAccountClick}
              screenWidth={this.props.screenWidth}
              selected={this.props.accountStore.getSelectedAccount === account}
            />
          })}
        </div>
      );
    }
};

export default AccountList;

