import * as React from 'react';
import glamorous from 'glamorous';
import { breakpoints } from '../styles';
import { Account } from './AccountStore';

const Bar = glamorous.div({
  width: '20px',
  height: '100%',
  display: 'inline-block',
  position: 'absolute',
  top: '-1px',
  left: '-1px',
  padding: '1px',
  borderTopLeftRadius: 'inherit',
  borderBottomLeftRadius: 'inherit',
})

const CenteredFlexbox = glamorous.div({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
  position: 'absolute',
  marginRight: '20px',
  top: 0,
  right: 0,
})

const MainTile = glamorous.div({
  cursor: 'pointer',
  ':hover': {
    filter: 'brightness(95%)',
  }
})

export class AccountComponent extends React.Component
  < {account: Account,
    screenWidth: number,
    handleAccountClick: (account: Account) => void,
    selected: boolean}
  > {

  render() {
    const fontColour = '#333';
    const backgroundColor = '#FFF';
    const barColour = this.props.account.colour;
    const border = this.props.selected
      ? `1px solid ${barColour}`
      : '1px solid transparent';
    
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
      <MainTile className={classNames} onClick={() => this.props.handleAccountClick(this.props.account)}>
        <div className="box"
          style={{
            background: backgroundColor,
            position: 'relative',
            paddingTop: '0.75rem',
            paddingBottom: '0.75rem',
            boxSizing: 'content-box',
            border
          }}>
          <Bar style={{background: barColour}}></Bar>
          <div style={{display: 'inline-block', marginLeft: '15px'}}>
            <b style={{color: fontColour}}>{this.props.account.accountName}</b>
            <p className="subtitle is-6" style={{color: fontColour}}>{this.props.account.bankName}</p>
          </div>
          <CenteredFlexbox>
            <h6 className="title is-6" style={{color: fontColour}}>{this.props.account.startingBalance.toFixed(2)} €</h6>
          </CenteredFlexbox>
        </div>
      </MainTile>
    )
  }
};
