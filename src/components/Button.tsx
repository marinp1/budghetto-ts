import * as React from 'react';
import glamorous from 'glamorous';

const Container = glamorous.button({
  backgroundColor: '#FFF',
  cursor: 'pointer',
  height: '42px',
  width: '120px',
  borderRadius: '8px',
  fontSize: '14px',
  ':hover': {
    backgroundColor: '#F4F4F4',
  },
  ':active': {
    backgroundColor: '#F2F2F2',
  }
})

interface ButtonProps { label: string; }

const Button = (props: ButtonProps) => (
  <Container>{props.label}</Container>
);

export default Button;