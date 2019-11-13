import React, { Component } from 'react';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import {  IBookSearchResponse, TBookDocumentList } from './';
import Presenter from './Presenter';

const searchBook = async (keyword: string) => {
  const apiKey = 'df02aa681731a2f1ccdf67cc5c61ea02';
  const initConfig = {
    headers: {
      Authorization: `KakaoAK ${apiKey}`,
    },  
  };
  const axiosInstance = axios.create(initConfig);
  const axiosConfig: AxiosRequestConfig = {
    url: `https://dapi.kakao.com/v3/search/book`,
    method: 'get',
    params: {
      query: keyword
    },
  };

  try {
    const res: AxiosResponse<IBookSearchResponse> = await axiosInstance.request(axiosConfig);
    return res;
  } catch(e) {
    throw e;
  }
};

interface IProps {
  
}

interface IState {
  bookDocuments: TBookDocumentList | undefined;
  keyword: string;
}

export default class Container extends Component<IProps, IState> {
  state = {
    bookDocuments: undefined,
    keyword: '',
  };

  fetchBookSearch = async () => {
    const { keyword } = this.state;
    try {
      const { data: { documents } } = await searchBook(keyword);      
      this.setState({ bookDocuments: documents });
    } catch(e) {
      throw e;
    }
  }

  changeKeyword = (e: React.ChangeEvent<HTMLInputElement>) => {  
    /*
    1. 키워드 변경.
    2. 검색 api 요청.
    */
   const { target: { value }  } = e;
   this.setState({ keyword: value }, this.fetchBookSearch);
  }

  render() {
    return (
      <Presenter
        bookDocuments={this.state.bookDocuments}
        keyword={this.state.keyword}
        onChange={this.changeKeyword}
      />
    )
  }
}
