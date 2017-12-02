import { observer } from 'mobx-react';
import * as React from 'react';
import { ObservableAccountStore } from './AccountStore';
import { AccountComponent } from './AccountComponent';

@observer
class AccountList extends React.Component<{accountStore: ObservableAccountStore, screenWidth: number}, {}> {
  render() {
      return (
        <div className="columns is-multiline">
          {this.props.accountStore.getAccounts.map((account) => {
            return <AccountComponent
              account={account}
              accountStore={this.props.accountStore}
              screenWidth={this.props.screenWidth}
            />
          })}
        </div>
      );
    }
};

export default AccountList;

