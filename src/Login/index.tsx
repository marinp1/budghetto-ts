import * as React from 'react';
import glamorous from 'glamorous';

const Container = glamorous.div({
  background: `url("./bg.jpg")`,
  backgroundSize: 'cover',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  position: 'absolute',
})

const Component = () => (
  <Container>
    <h1>Hello</h1>
  </Container>
)

export default Component;