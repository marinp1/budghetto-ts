import * as React from 'react';
import glamorous from 'glamorous';
import Button from '../components/Button';
import { mediaQueries } from '../styles';

const Container = glamorous.div({
  background: `url("./bg.jpg")`,
  backgroundSize: 'cover',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  position: 'absolute',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: '32px',
  alignItems: 'flex-start',
  [mediaQueries.small]: {
    alignItems: 'center',
  }
})

const Title = glamorous.h1({
  fontSize: '40px',
  marginBottom: '40px',
  [mediaQueries.small]: {
    fontSize: '60px',
  }
})

const ButtonsContainer = glamorous.div({
  marginTop: '10px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  [mediaQueries.small]: {
    flexDirection: 'row',
  }
})

const ButtonContainer = glamorous.div({
  margin: '6px 0',
  [mediaQueries.small]: {
    margin: '16px',
  }
})

const Component = () => (
  <Container>
    <Title>BUDGHETTO</Title>
    <p>Start by loading a budget file or creating a new one:</p>
    <ButtonsContainer>
      <ButtonContainer><Button label="Open file"/></ButtonContainer>
      <ButtonContainer><Button label="Create new"/></ButtonContainer>
    </ButtonsContainer>
  </Container>
)

export default Component;