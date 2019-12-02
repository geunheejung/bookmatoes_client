import React, { Component } from 'react';
import { IBookDocument } from '../../services/api/kakao';
import { RouteComponentProps } from 'react-router-dom';
import { bookSellers } from '../../services/api';
import Presenter from './Presenter';

interface IProps {  }

interface IState {
  bookSellerUrlList: string[],
}

type Props = IProps & RouteComponentProps<undefined, any, { bookDocument: IBookDocument }>;

class Container extends Component<Props, IState> {
  constructor(props: Props) {
    super(props);
    const { 
      location: { state },
      history
    } = props;

    if (!state) history.replace('/');    
  
    this.state = {
      bookSellerUrlList: [],
    };
  }  

  showBookRating = async () => {    
    const { location: { state: { bookDocument: { url } } } } = this.props;
    const response = await bookSellers({ url });

    this.setState({ bookSellerUrlList: response.data });    
  }

  render() {        
    const { location: { state: { bookDocument } } } = this.props;    
    return (
      <Presenter
        bookDocument={bookDocument}
        showBookRating={this.showBookRating}
      />
    );
  }
}

export default Container;
