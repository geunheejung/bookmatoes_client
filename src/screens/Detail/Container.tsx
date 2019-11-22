import React, { Component } from 'react';
import { IBookDocument } from '../../containers/Search';
import { RouteComponentProps } from 'react-router-dom';
import Presenter from './Presenter';

interface IProps {
  history: {
    state: {
      bookDocument: IBookDocument
    }
  }
}

interface IState {
  
}

type Props = IProps & RouteComponentProps;

class Container extends Component<Props, IState> {
  constructor(props: Props) {
    super(props);
    const { 
      location: { state },
      history
    } = props;

    if (!state) history.replace('/');    
  
    this.state = {};
  }  

  render() {        
    const { location: { state: { bookDocument } } } = this.props;    
    return (
      <Presenter
        bookDocument={bookDocument}
      />
    );
  }
}

export default Container;
