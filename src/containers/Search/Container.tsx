import React, { Component } from 'react';
import _debounce from 'lodash/debounce';
import { RouteComponentProps } from 'react-router-dom';
import axios, { AxiosRequestConfig, AxiosResponse, Method } from 'axios';
import {  IBookSearchResponse, TBookDocumentList, IBookDocument } from './';
import Presenter from './Presenter';

enum METHOD {
  GET = 'get',
  DELETE = 'delete',
  HEAD = 'head',
  OPTIONS = 'options',
  POST = 'post',
  PUT = 'put',
  PATCH = 'patch',
}

enum KAKAO_API_PATH {
  Book = 'search/book'
}

interface ISearchBookPayload {
  query: string;
}

const fetchKakaoAPI = async (
  path: KAKAO_API_PATH,
  method: Method,
  payload?: ISearchBookPayload
) => {
  const API_KEY = 'df02aa681731a2f1ccdf67cc5c61ea02';
  const AXIOS_CONFIG: AxiosRequestConfig = {
    headers: {
      Authorization: `KakaoAK ${API_KEY}`,
    },
  };

  const axiosInstance = axios.create(AXIOS_CONFIG);
  const requestConfig: AxiosRequestConfig = {
    url: `https://dapi.kakao.com/v3/${path}`,
    method,
  };

  if (!!payload) {
    requestConfig[method === METHOD.GET ? 'params' : 'data'] = payload;
  }

  return await axiosInstance.request(requestConfig);
};

const searchBook = async (keyword: string) => {
  if (!keyword) throw false;

  try {
    const res: AxiosResponse<IBookSearchResponse> = await fetchKakaoAPI(
      KAKAO_API_PATH.Book,
      METHOD.GET,
      { query: keyword }
    );
    return res;
  } catch(e) {    
    throw e;
  }
};

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
      this.props.history.push(`/${bookDocument.title}`);
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