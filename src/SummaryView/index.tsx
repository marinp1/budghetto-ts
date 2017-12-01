import * as React from 'react';
import glamorous from 'glamorous';
import Navbar from '../Navbar';

const Container = glamorous.div({

});

interface SummaryViewState {

}

class SummaryView extends React.Component<{}, SummaryViewState> {
  render() {
    return (
      <Container>
        <Navbar/>
      </Container>
    )
  }
}

export default SummaryView;