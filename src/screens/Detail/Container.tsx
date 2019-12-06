import React, { Component } from 'react';
import { IBookDocument } from '../../services/api/kakao';
import { RouteComponentProps } from 'react-router-dom';
import { bookSellers, SellerApiResponse } from '../../services/api';
import Presenter from './Presenter';

interface IProps {  }

interface IState {
  bookSellerUrlList: SellerApiResponse,
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
    const { data } = await bookSellers({ url });
    
    /*
    1. urlList로 loop를 돌면서 렌더링한 다음, 
    2. url로 api를 요청한다  
    * api 요청이 먼저 완료되면 렌더링 해야한다.
    
    Promise.race를 돌려서 response가 존재할때마다? 

    */

    this.setState({ bookSellerUrlList: data });    
  }

  render() {        
    const { location: { state: { bookDocument } } } = this.props;    
    const { bookSellerUrlList } = this.state;
    return (
      <Presenter
        bookDocument={bookDocument}
        bookSellerUrlList={bookSellerUrlList}
        showBookRating={this.showBookRating}

      />
    );
  }
}

export default Container;
