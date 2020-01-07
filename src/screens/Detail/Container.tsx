import React, { Component } from 'react';
import { IBookDocument } from '../../services/api/kakao';
import { RouteComponentProps } from 'react-router-dom';
import Presenter from './Presenter';

interface IProps {  }
type Props = IProps & RouteComponentProps<undefined, any, { bookDocument: IBookDocument }>;

interface IState {}

class Container extends Component<Props, IState> {
  constructor(props: Props) {
    super(props);
    const { 
      location: { state },
      history
    } = props;

    if (!state) history.replace('/');    

    this.state = {
      bookSellerUrlList: []
    };
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
