import * as React from 'react';
import glamorous from 'glamorous';
import { breakpoints } from '../styles';
import { Account, ObservableAccountStore } from './AccountStore';
import { observer } from 'mobx-react';

const Bar = glamorous.div({
  width: '20px',
  height: '100%',
  display: 'inline-block',
  position: 'absolute',
  top: 0,
  left: '15px',
})

const CenteredFlexbox = glamorous.div({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
  position: 'absolute',
  top: 0,
  right: 0,
  marginRight: '20px',
})

const MainTile = glamorous.div({
  cursor: 'pointer',
  ':hover': {
    filter: 'brightness(95%)',
  }
})

@observer
export class AccountComponent extends React.Component
  < {account: Account, screenWidth: number, accountStore: ObservableAccountStore},
    {selectedAccount: () => Account | null} > {

  constructor(props: {account: Account, screenWidth: number, accountStore: ObservableAccountStore}) {
    super(props);
    this.state = {selectedAccount: () => this.props.accountStore.getSelectedAccount}
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e: React.MouseEvent<HTMLDivElement>): void {
    e.preventDefault();
    this.props.accountStore.selectAccount(this.props.account);
  }

  render() {
    const fontColour = '#333';
    const backgroundColor = '#FFF';
    const barColour = this.props.account.colour;
    const border = this.state.selectedAccount() === this.props.account
      ? `1px solid ${barColour}`
      : '1px solid #FFF';
    
    let classNames = "column ";
    if (this.props.screenWidth >= breakpoints.widescreen) {
      classNames += 'is-3'
    } else if (this.props.screenWidth >= breakpoints.desktop) {
      classNames += 'is-4'
    } else if (this.props.screenWidth >= breakpoints.tablet) {
      classNames += 'is-6'
    } else {
      classNames += 'is-6'
    }

    return (
      <MainTile className={classNames} onClick={e => this.handleClick(e)}>
        <div className="box" style={{background: backgroundColor, position: 'relative', border}}>
          <Bar style={{background: barColour}}></Bar>
          <div style={{display: 'inline-block', marginLeft: '35px'}}>
            <h4 className="title is-5" style={{color: fontColour}}>{this.props.account.accountName}</h4>
            <h6 className="subtitle is-6" style={{color: fontColour}}>{this.props.account.bankName}</h6>
          </div>
          <CenteredFlexbox>
            <h4 className="title is-4" style={{color: fontColour}}>{this.props.account.balance} €</h4>
          </CenteredFlexbox>
        </div>
      </MainTile>
    )
  }
};