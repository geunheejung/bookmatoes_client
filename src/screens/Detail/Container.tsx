import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import Presenter from './Presenter';

interface IProps extends RouteComponentProps {
  
}
interface IState {
  
}

class Container extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    const { 
      location: { state },
      history
    } = props;

    if (!state) history.replace('/');
  
    this.state = {};
  }

  componentWillMount() {
    /* TODO
    원하는 경로로 들어오지 않았을 경우 
    1. 리다이렉트 처리.
    2. 토스트 메세지 처리.
    */
   
  }

  render() {    
    return (
      <Presenter />
    );
  }
}

export default Container;
