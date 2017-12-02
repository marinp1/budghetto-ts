import * as React from 'react';
import glamorous from 'glamorous';
import Navbar from '../Navbar';
import { breakpoints } from '../styles';

const Container = glamorous.div({
  padding: '20px',
});

interface AccountViewState {
  screenWidth: number,
}

const Bar = glamorous.div({
  width: '20px',
  height: '100%',
  display: 'inline-block',
  position: 'absolute',
  top: 0,
  left: 0,
  borderTopLeftRadius: 'inherit',
  borderBottomLeftRadius: 'inherit',
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

export interface TileProps {
  accountName: string,
  bankName: string,
  colour: string,
  balance: string,
  screenWidth: number ,
}

export class Tile extends React.Component<TileProps, {}> {
  render() {

    const fontColour = '#333';
    const backgroundColor = '#FFF';
    const barColour = this.props.colour;
    
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
      <div className={classNames}>
        <div className="box" style={{background: backgroundColor, position: 'relative'}}>
          <Bar style={{background: barColour}}></Bar>
          <div style={{display: 'inline-block', marginLeft: '20px'}}>
            <h4 className="title is-5" style={{color: fontColour}}>{this.props.accountName}</h4>
            <h6 className="subtitle is-6" style={{color: fontColour}}>{this.props.bankName}</h6>
          </div>
          <CenteredFlexbox>
            <h4 className="title is-4" style={{color: fontColour}}>{this.props.balance}</h4>
          </CenteredFlexbox>
        </div>
      </div>
    )
  }
  

};

class AccountView extends React.Component<{}, AccountViewState> {

  constructor(props: {}) {
    super(props);
    this.state = {
      screenWidth: 0,
    }
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }
  
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }
  
  updateWindowDimensions() {
    this.setState({ screenWidth: window.innerWidth });
  }

  render() {
    return (
      <div>
        <Navbar/>
        <Container>
          <div className="columns is-multiline">
            <Tile accountName="Käyttötili" bankName="Osuuspankki" colour="#FF0000" balance="300.00 €" screenWidth={this.state.screenWidth}>
            </Tile>
            <Tile accountName="Käyttötili" bankName="Osuuspankki" colour="#FF0000" balance="300.00 €" screenWidth={this.state.screenWidth}>
            </Tile>
            <Tile accountName="Käyttötili" bankName="Osuuspankki" colour="#FF0000" balance="300.00 €" screenWidth={this.state.screenWidth}>
            </Tile>
            <Tile accountName="Käyttötili" bankName="Osuuspankki" colour="#FF0000" balance="300.00 €" screenWidth={this.state.screenWidth}>
            </Tile>
            <Tile accountName="Käyttötili" bankName="Osuuspankki" colour="#FF0000" balance="300.00 €" screenWidth={this.state.screenWidth}>
            </Tile>
            <Tile accountName="Käyttötili" bankName="Osuuspankki" colour="#FF0000" balance="300.00 €" screenWidth={this.state.screenWidth}>
            </Tile>
            <Tile accountName="Käyttötili" bankName="Osuuspankki" colour="#FF0000" balance="300.00 €" screenWidth={this.state.screenWidth}>
            </Tile>
            <Tile accountName="Käyttötili" bankName="Osuuspankki" colour="#FF0000" balance="300.00 €" screenWidth={this.state.screenWidth}>
            </Tile>
          </div>
        </Container>
      </div>
    )
  }
}

export default AccountView;