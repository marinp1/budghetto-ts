import { observer } from 'mobx-react';
import * as React from 'react';
import { ObservableAccountStore } from './logic';
import { Tile } from './Tile';

@observer
class AccountList extends React.Component<{accountStore: ObservableAccountStore, screenWidth: number}, {}> {
  render() {
      return (
        <div className="columns is-multiline">
          {this.props.accountStore.accountsData.map((data) => {
            return <Tile
              data={data}
              accountStore={this.props.accountStore}
              screenWidth={this.props.screenWidth}
            />
          })}
        </div>
      );
    }
};

export default AccountList;

