import * as React from 'react';
import glamorous from 'glamorous';

const Container = glamorous.div({

});

interface SummaryViewState {

}

class SummaryView extends React.Component<{}, SummaryViewState> {
  render() {
    return (
      <Container/>
    )
  }
}

export default SummaryView;