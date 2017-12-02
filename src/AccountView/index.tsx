import * as React from 'react';
import glamorous from 'glamorous';
import Navbar from '../Navbar';
import { breakpoints } from '../styles';

const Container = glamorous.div({

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

const MainTile = glamorous.div({
  cursor: 'pointer',
  ':hover': {
    '& .box': {
      background: 'whitesmoke !important',
    }
  }
})

export interface TileProps {
  accountName: string,
  bankName: string,
  colour: string,
  balance: string,
  screenWidth: number ,
}

interface TileState {
  selected: boolean,
}

export class Tile extends React.Component<TileProps, TileState> {

  state = { selected: false };

  render() {

    const fontColour = '#333';
    const backgroundColor = this.state.selected ? 'whitesmoke' : '#FFF';
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
      <MainTile className={classNames}>
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
      </MainTile>
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
        <div>
          <Container className="section">
            <div className="container">
              <h1 className="title is-4">Accounts</h1>
              <hr></hr>
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
            </div>
          </Container>
        </div>
      </div>
    )
  }
}

export default AccountView;