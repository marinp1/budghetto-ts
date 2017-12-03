import * as React from 'react';
import { observer } from 'mobx-react';
import { SketchPicker, ColorResult } from 'react-color';
import { Account, AccountProps, ObservableAccountStore} from './AccountStore';

@observer
class AccountEditModal extends React.Component
  <{accountStore: ObservableAccountStore}, {colorPickerVisible: boolean, data: null | AccountProps}> {

  newColor: string;
  data: null | AccountProps = null;

  constructor(props: {accountStore: ObservableAccountStore}) {
    super(props);
    this.state = {
      colorPickerVisible: false,
      data: null,
    }
  }

  handleChangeComplete = (color: ColorResult) => {
    this.newColor = color.hex;
  };

  handleDataUpdate = (target: string, e: React.ChangeEvent<HTMLInputElement>) => {
    if (this.data !== null) {
      this.data[target] = e.target.value;
      this.setState({data: this.data})
    }
  }

  componentWillUpdate() {
    if (this.data === null && this.props.accountStore.getSelectedAccount !== null) {
      this.data = {
        id: this.props.accountStore.getSelectedAccount.id,
        balance: this.props.accountStore.getSelectedAccount.balance,
        accountName: this.props.accountStore.getSelectedAccount.accountName,
        bankName: this.props.accountStore.getSelectedAccount.bankName,
        colour: this.props.accountStore.getSelectedAccount.colour,
      }
      this.setState({data: this.data})
    }
  }

  render() {

    if (this.props.accountStore.getSelectedAccount === null || this.data === null) {
      return null;
    }

    const colorPickerVisible = this.state.colorPickerVisible ? "modal is-active" : "modal";
    const account = this.props.accountStore.getSelectedAccount;
    const data = this.data;
    
    return (
      <div>
      <div className="modal is-active">
        <div className="modal-background"></div>
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">Edit account</p>
            <button className="delete" aria-label="close" onClick={() => this.closeModal(account)}></button>
          </header>
          <section className="modal-card-body">
            <div className="box">
              <div className="field">
                <label className="label">Bank name</label>
                <div className="control has-icons-left has-icons-right">
                  <input className="input is-success" type="text"
                    placeholder="Bank name"
                    value={data.bankName}
                    onChange={(e) => this.handleDataUpdate('bankName', e)}
                  />
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
                  <input className="input is-success" type="text"
                    placeholder="Account name"
                    value={data.accountName}
                    onChange={(e) => this.handleDataUpdate('accountName', e)}
                  />
                  <span className="icon is-small is-left">
                    <i className="fa fa-credit-card"></i>
                  </span>
                  <span className="icon is-small is-right">
                    <i className="fa fa-check"></i>
                  </span>
                </div>
              </div>
              <div className="field">
                <label className="label">Account colour</label>
                <div className="control has-icons-left has-addons has-icons-right">
                  <input readOnly={true} className="input is-success" type="text" placeholder="Account colour"
                   value={data.colour}
                   style={{cursor: 'pointer', background: '#FFF'}}
                   onClick={() => this.toggleColourPicker(true)}/>
                  <span className="icon is-small is-left">
                    <i className="fa fa-paint-brush"></i>
                  </span>
                  <span className="icon is-small is-right" style={{borderRadius: '0 3px 3px 0', background: data.colour}}/>
                </div>
              </div>
            </div>
          </section>
          <footer className="modal-card-foot">
            <button className="button is-success" onClick={() => this.closeModal(account, true)}>Save changes</button>
            <button className="button" onClick={() => this.closeModal(account)}>Cancel</button>
          </footer>
        </div>
      </div>
      <div className={colorPickerVisible}>
        <div className="modal-background"></div>
        <div className="modal-card" style={{width: "auto"}}>
          <section className="modal-card-head">
            <SketchPicker
              color={ data.colour }
              onChangeComplete={ this.handleChangeComplete }
            />
          </section>
          <footer className="modal-card-foot">
            <button className="button is-success" onClick={() => this.toggleColourPicker(false, true)}>Apply</button>
            <button className="button" onClick={() => this.toggleColourPicker(false)}>Cancel</button>
          </footer>
        </div>
      </div>
      </div>
    );
  }

  toggleColourPicker(visibility: boolean, save: boolean = false) {
    if (this.data && save) {
      this.data.colour = this.newColor;
    }
    this.setState({data: this.data, colorPickerVisible: visibility});
  }

  // Close modal by unselecting the current account
  closeModal(account: Account, save: boolean = false) {
    if (save && this.data) {
      this.props.accountStore.editAccount(account, this.data);
    }
    this.data = null;
    this.props.accountStore.selectAccount(account);
  }

}

export default AccountEditModal;