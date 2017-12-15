import * as React from 'react';
import { breakpoints } from '../styles';
import { ObservableAccountStore } from './AccountStore';
const uuidv1 = require('uuid/v1');

class NewAccountButton extends React.Component
  <{accountStore: ObservableAccountStore, screenWidth: number}> {

  handleClick = () => {
    // Bit hacky way to do this with reusing editing modal
    const newAccount = {
      id: uuidv1(),
      name: '',
      bankName: '',
      vCardName: null,
      colour: '',
      startingBalance: 0,
      initiationDate: '',
      currencyType: '',
    };
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
