import * as React from 'react';
import glamorous from 'glamorous';
import Navbar from '../Navbar';

const Container = glamorous.div({

});

interface AccountViewState {

}

class AccountView extends React.Component<{}, AccountViewState> {
  render() {
    return (
      <Container>
        <Navbar/>
      </Container>
    )
  }
}

export default AccountView;