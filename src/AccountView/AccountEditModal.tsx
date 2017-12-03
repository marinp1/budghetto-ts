import * as React from 'react';
import { observer } from 'mobx-react';
import { SketchPicker, ColorResult } from 'react-color';
import { breakpoints } from '../styles';
import { Account, AccountProps, ObservableAccountStore} from './AccountStore';


interface InputFieldProps {
  name: string;
  sizeModifier: string;
  value: string | number;
  placeholder: string;
  dataId: string;
  leftIcon: string;
  rightIcon: string;
  onChange: (dataId: string, e: React.ChangeEvent<HTMLInputElement>, numberInput: boolean) => void;
}

const InputFieldComponent = (props: InputFieldProps) => {
  return (
    <div className="field">
      <label className={"label" + props.sizeModifier}>{props.name}</label>
      <div className="control has-icons-left has-icons-right">
        <input className={"input is-success" + props.sizeModifier}
          type={typeof props.value === 'string' ? "text" : "number"}
          placeholder={props.placeholder}
          value={props.value}
          onChange={(e) => props.onChange(props.dataId, e, typeof props.value !== 'string')}
        />
        <span className="icon is-small is-left">
          <i className={`fa ${props.leftIcon}`}></i>
        </span>
        <span className="icon is-small is-right">
          <i className={`fa ${props.rightIcon}`}></i>
        </span>
      </div>
      {typeof props.value === 'string' && props.value.trim() === '' && <p className='help is-danger'>
        This field is required
      </p>}
    </div>
  );
};

@observer
class AccountEditModal extends React.Component
  <{accountStore: ObservableAccountStore, screenWidth: number},
   {colorPickerVisible: boolean, data: null | AccountProps}> {

  // Keep new color here instead of in state to avoid rerenders
  newColor: string;
  // Keep data in props and here just to avoid some unnecessary copypastes
  data: null | AccountProps = null;

  constructor(props: {accountStore: ObservableAccountStore, screenWidth: number}) {
    super(props);
    this.state = {
      colorPickerVisible: false,
      data: null,
    }
  }

  handleColourChange = (color: ColorResult) => {
    this.newColor = color.hex;
  };

  handleDataUpdate = (target: string, e: React.ChangeEvent<HTMLInputElement>, numberInput: boolean) => {
    if (this.data !== null) {
      !numberInput ? this.data[target] = e.target.value : this.data[target] = (Number(e.target.value));
      if (numberInput) {
        e.target.value = e.target.value.replace(/^0+/, '');
      }
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
    const modalTitle = account.id === '-' ? 'New account' : 'Edit account';
    const sizeModifier = this.props.screenWidth <= breakpoints.mobile ? ' is-small' : '';
    
    return (
      <div>
      <div className="modal is-active">
        <div className="modal-background"></div>
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">{modalTitle}</p>
            <button className="delete" aria-label="close" onClick={() => this.closeModal(account)}></button>
          </header>
          <section className="modal-card-body">
            <div className="box">
              <InputFieldComponent
                name={"Bank name"}
                sizeModifier={sizeModifier}
                value={data.bankName}
                placeholder={"Bank name"}
                dataId={"bankName"}
                leftIcon={"fa-university"}
                rightIcon={"fa-check"}
                onChange={this.handleDataUpdate}
              />
              <InputFieldComponent
                name={"Account name"}
                sizeModifier={sizeModifier}
                value={data.accountName}
                placeholder={"Account name"}
                dataId={"accountName"}
                leftIcon={"fa-credit-card"}
                rightIcon={"fa-check"}
                onChange={this.handleDataUpdate}
              />
              <InputFieldComponent
                name={"Starting balance"}
                sizeModifier={sizeModifier}
                value={data.startingBalance}
                placeholder={"0.00"}
                dataId={"startingBalance"}
                leftIcon={"fa-money"}
                rightIcon={"fa-eur"}
                onChange={this.handleDataUpdate}
              />
              <div className="field">
                <label className={"label" + sizeModifier}>Account colour</label>
                <div className="control has-icons-left has-addons has-icons-right">
                  <input readOnly={true}
                    className={"input is-success" + sizeModifier}
                    type="text"
                    placeholder="Account colour"
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
            <div className="field is-grouped" style={{width: '100%'}}>
              <p className="control">
                <a className={"button is-success" + sizeModifier} onClick={() => this.closeModal(account, true)}>
                  Save changes
                </a>
              </p>
              <p className="control">
                <a className={"button" + sizeModifier} onClick={() => this.closeModal(account)}>
                  Cancel
                </a>
              </p>
              {account.id !== '-' &&
              <p className="control" style={{marginLeft: 'auto'}}>
                <a className={"button is-danger" + sizeModifier} onClick={() => this.closeModal(account)}>
                  {this.props.screenWidth <= breakpoints.mobile &&
                    <span className="icon">
                      <i className="fa fa-trash"></i>
                    </span>}
                  {this.props.screenWidth > breakpoints.mobile && "Delete account" }
                </a>
              </p>}
            </div>
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
            <button className={"button is-success" + sizeModifier} onClick={() => this.toggleColourPicker(false, true)}>Apply</button>
            <button className={"button" + sizeModifier} onClick={() => this.toggleColourPicker(false)}>Cancel</button>
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