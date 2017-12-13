import * as React from 'react';
import { breakpoints } from '../styles';
import { Account, ObservableAccountStore } from './AccountStore';

class NewAccountButton extends React.Component
  <{accountStore: ObservableAccountStore, screenWidth: number}> {

  handleClick = () => {
    // Bit hacky way to do this with reusing editing modal
    const newAccount = new Account('', '', '' , 0);
    this.props.accountStore.selectAccount(newAccount);
  }

  render() {
    return (
      <a className="button" style={{ float: 'right' }} onClick={() => this.handleClick()}>
        <span className="icon">
          <i className="fa fa-plus"></i>
        </span>
        {this.props.screenWidth > breakpoints.mobile && <span>Create new account</span>}
      </a>
    );
  }

}

export default NewAccountButton;
