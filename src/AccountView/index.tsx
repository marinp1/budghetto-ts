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
  width: '10px',
  height: '100%',
  display: 'inline-block',
  background: '#FFF',
  position: 'absolute',
  top: 0,
})

const CenteredFlexbox = glamorous.div({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
  position: 'absolute',
  top: 0,
  right: 0,
  marginRight: '30px',
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
        <div className="box" style={{background: this.props.colour, position: 'relative'}}>
          <Bar></Bar>
          <div style={{display: 'inline-block', marginLeft: '30px'}}>
            <h4 className="title is-5" style={{color: '#FFF'}}>{this.props.accountName}</h4>
            <h6 className="subtitle is-6" style={{color: '#FFF'}}>{this.props.bankName}</h6>
          </div>
          <CenteredFlexbox>
            <h4 className="title is-4" style={{color: '#FFF'}}>{this.props.balance}</h4>
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