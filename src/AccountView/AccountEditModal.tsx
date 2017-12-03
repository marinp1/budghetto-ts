import * as React from 'react';
import { observer } from 'mobx-react';
import { SketchPicker, ColorResult } from 'react-color';
import { Account, AccountProps, ObservableAccountStore} from './AccountStore';

@observer
class AccountEditModal extends React.Component
  <{accountStore: ObservableAccountStore},
   {colorPickerVisible: boolean, data: null | AccountProps}> {

  // Keep new color here instead of in state to avoid rerenders
  newColor: string;
  // Keep data in props and here just to avoid some unnecessary copypastes
  data: null | AccountProps = null;

  constructor(props: {accountStore: ObservableAccountStore}) {
    super(props);
    this.state = {
      colorPickerVisible: false,
      data: null,
    }
  }

  handleColourChange = (color: ColorResult) => {
    this.newColor = color.hex;
  };

  handleDataUpdate = (target: string, e: React.ChangeEvent<HTMLInputElement>, numberInput: boolean = false) => {
    if (this.data !== null) {
      !numberInput ? this.data[target] = e.target.value : this.data[target] = (Number(e.target.value));
      this.setState({data: this.data})
    }
  }

  componentWillUpdate() {
    if (this.data === null && this.props.accountStore.getSelectedAccount !== null) {
      this.data = {
        id: this.props.accountStore.getSelectedAccount.id,
        startingBalance: this.props.accountStore.getSelectedAccount.startingBalance,
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
                {this.data.bankName.trim() === '' && <p className='help is-danger'>
                  This field is required
                </p>}
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
                {this.data.accountName.trim() === '' && <p className='help is-danger'>
                  This field is required
                </p>}
              </div>
              <div className="field">
                <label className="label">Starting balance</label>
                <div className="control has-icons-left has-icons-right">
                  <input className="input is-success" type="number"
                    placeholder="0.00"
                    value={data.startingBalance}
                    onChange={(e) => this.handleDataUpdate('startingBalance', e, true)}
                  />
                  <span className="icon is-small is-left">
                    <i className="fa fa-money"></i>
                  </span>
                  <span className="icon is-small is-right">
                    <i className="fa fa-eur"></i>
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
                  <span className="icon is-small is-right"
                    style={{
                      borderRadius: '0 2px 2px 0',
                      background: data.colour,
                      margin: '1px',
                      height: '34px',
                    }}
                  />
                </div>
                {this.data.colour.trim() === '' && <p className='help is-danger'>
                  This field is required
                </p>}
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
              onChangeComplete={ this.handleColourChange }
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
    if (save && this.data && this.validateData(this.data)) {
      if (this.data.id === '-') {
        this.props.accountStore.editAccount(account, this.data);
        this.props.accountStore.addNewAccount(account);
      } else {
        this.props.accountStore.editAccount(account, this.data);
      }
    }
    if (save && this.data && !this.validateData(this.data)) {
      // Error handling
    } else {
      this.data = null;
      this.props.accountStore.selectAccount(account);
    }
  }

  validateData(data: AccountProps): boolean {
    if (data.startingBalance.toString() === '') {
      data.startingBalance = 0;
    }
    data.accountName = data.accountName.trim();
    data.bankName = data.bankName.trim();
    data.colour = data.colour.trim();
    return (
      data.accountName !== '' && data.bankName !== '' && data.colour !== '' && data.startingBalance >= 0
    );
  }

}

export default AccountEditModal;