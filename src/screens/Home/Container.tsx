import React, { Component } from 'react';
import Presenter from './Presenter';

interface IProps {
  
}
interface IState {
  
}

export default class Container extends Component<IProps, IState> {
  state = {}

  render() {
    return (
      <Presenter />
    )
  }
}
