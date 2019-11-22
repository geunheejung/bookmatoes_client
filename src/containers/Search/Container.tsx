import React, { Component } from 'react';
import _debounce from 'lodash/debounce';
import { RouteComponentProps } from 'react-router-dom';
import {  
  searchBook,
  TBookDocumentList, 
  IBookDocument 
} from '../../services/api/kakao';
import Presenter from './Presenter';

interface IProps extends RouteComponentProps {
  
}

interface IState {
  bookDocuments: TBookDocumentList | undefined;
  keyword: string;
  isShowPreview: boolean;
}

class Container extends Component<IProps, IState> {
  state = {
    bookDocuments: undefined,
    keyword: '',
    isShowPreview: true,
  };
  
  fetchBookSearch = async () => {
    const { keyword } = this.state;

    if (!keyword) {
      this.setState({ bookDocuments: undefined });
      return;
    }

    const { data: { documents } } = await searchBook(keyword);
    this.setState({ bookDocuments: documents });
  }  

  _fetchBookSearch = _debounce(this.fetchBookSearch, 300);

  changeKeyword = (e: React.ChangeEvent<HTMLInputElement>) => {
    /*
    1. 키워드 변경.
    2. 검색 api 요청.
    */
   const { target: { value }  } = e;
   this.setState({ keyword: value }, this._fetchBookSearch);

  }

  focusInput = () => {
    const { bookDocuments, isShowPreview } = this.state;

    if (!bookDocuments || isShowPreview) return;

    this.setState({ isShowPreview: true });
  }

  clickItem = (bookDocument: IBookDocument) => {
    this.setState({ isShowPreview: false }, () => {
      this.props.history.push({
        pathname: `/${bookDocument.title}`,
        state: { bookDocument }
      });
    });
  };

  render() {
    const { 
      isShowPreview, 
      bookDocuments 
    } = this.state;
    /*
    닫혀야할 경우
    1. 디테일 페이지일 경우
    2. 책 검색을 한번도 시도하지 않을 경우 = bookDocuments === undefined    
    */
    return (
      <Presenter
        bookDocuments={this.state.bookDocuments}        
        isShowPreview={Array.isArray(bookDocuments) ? isShowPreview : false}
        onChange={this.changeKeyword}
        onFocus={this.focusInput}
        onItemClick={this.clickItem}
      />
    )
  }
}

export default Container;