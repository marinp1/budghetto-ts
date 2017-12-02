import * as React from 'react';
import { observer } from 'mobx-react';
import { SketchPicker } from 'react-color';
import { Account, ObservableAccountStore} from './AccountStore';

@observer
class AccountEditModal extends React.Component
  <{accountStore: ObservableAccountStore}, {colorPickerVisible: boolean}> {

  constructor(props: {accountStore: ObservableAccountStore}) {
    super(props);
    this.state = {
      colorPickerVisible: false,
    }
  }

  render() {

    if (this.props.accountStore.selectedAccount === null) {
      return null;
    }

    const account = this.props.accountStore.selectedAccount as Account;

    const colorPickerVisible = this.state.colorPickerVisible ? "modal is-active" : "modal";
    
    return (
      <div className="modal is-active">
        <div className="modal-background"></div>
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">Modal title</p>
            <button className="delete" aria-label="close"></button>
          </header>
          <section className="modal-card-body">
            <div className="box">
              <div className="field">
                <label className="label">Bank name</label>
                <div className="control has-icons-left has-icons-right">
                  <input className="input is-success" type="text" placeholder="Bank name" value={account.bankName}/>
                  <span className="icon is-small is-left">
                    <i className="fa fa-university"></i>
                  </span>
                  <span className="icon is-small is-right">
                    <i className="fa fa-check"></i>
                  </span>
                </div>
              </div>
              <div className="field">
                <label className="label">Account name</label>
                <div className="control has-icons-left has-icons-right">
                  <input className="input is-success" type="text" placeholder="Account name" value={account.accountName}/>
                  <span className="icon is-small is-left">
                    <i className="fa fa-credit-card"></i>
                  </span>
                  <span className="icon is-small is-right">
                    <i className="fa fa-check"></i>
                  </span>
                </div>
              </div>
              <div className={colorPickerVisible}>
                <div className="modal-background"></div>
                <div className="modal-card" style={{width: "auto"}}>
                  <header className="modal-card-head">
                    <p className="modal-card-title">Modal title</p>
                    <button className="delete" aria-label="close"></button>
                  </header>
                  <section className="modal-card-body">
                    <SketchPicker />
                  </section>
                  <footer className="modal-card-foot">
                    <button className="button is-success">Save changes</button>
                    <button className="button">Cancel</button>
                  </footer>
                </div>
              </div>
              <div className="field">
                <label className="label">Account colour</label>
                <div className="control has-icons-left has-addons has-icons-right">
                  <input readOnly={true} className="input is-success" type="text" placeholder="Account colour"
                   value={account.accountName}
                   style={{cursor: 'pointer', background: '#FFF'}}
                   onClick={(e) => this.toggleColourPicker(e)}/>
                  <span className="icon is-small is-left">
                    <i className="fa fa-paint-brush"></i>
                  </span>
                  <span className="icon is-small is-right" style={{borderRadius: '0 3px 3px 0', background: '#000'}}/>
                </div>
              </div>
            </div>
          </section>
          <footer className="modal-card-foot">
            <button className="button is-success">Save changes</button>
            <button className="button">Cancel</button>
          </footer>
        </div>
      </div>
    );
  }

  toggleColourPicker(e: React.MouseEvent<HTMLInputElement>) {
    e.preventDefault();
    this.setState({colorPickerVisible: true});
  }

  // Close modal by unselecting the current account
  closeModal(account: Account) {
    this.props.accountStore.selectAccount(account);
  }

}

export default AccountEditModal;