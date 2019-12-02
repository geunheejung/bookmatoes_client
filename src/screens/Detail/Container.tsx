import React, { Component } from 'react';
import { IBookDocument } from '../../services/api/kakao';
import { RouteComponentProps } from 'react-router-dom';
import { bookSellers, BookApiEndPoint, Method } from '../../services/api';
import Presenter from './Presenter';

interface IProps {
  location: {
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

  showBookRating = async () => {      
    await bookSellers({
      bookId: '1467038&q=미움받을+용기%28교보문고+단독+스페셜+에디션%29%28리커버%3AK%29'
    });
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
