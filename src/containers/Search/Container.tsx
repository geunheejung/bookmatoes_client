import React, { Component, createRef } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import _isEmpty from 'lodash/isEmpty';
import _debounce from 'lodash/debounce';
import isNull from '../../services/helper/isNull';
import {  
  searchBook,
  TBookDocumentList, 
  IBookDocument 
} from '../../services/api/kakao';
import Presenter from './Presenter';

interface IProps extends RouteComponentProps {}

interface IState {
  bookDocuments: TBookDocumentList;
  keyword: string;
  isShowPreview: boolean;
}

class Container extends Component<IProps, IState> {
  searchInputRef: React.RefObject<HTMLDivElement> = createRef(); 
  previewListRef: React.RefObject<HTMLUListElement> = createRef();  
  mouseEventCb?: (event: MouseEvent) => void;
  
  state = {
    bookDocuments: [],
    keyword: '',
    isShowPreview: false,  
  };  
    
  componentDidUpdate(prevProps: IProps, prevState: IState) {    
    if (this.mouseEventCb) return;     
    
    this.bindingMouseEvent(prevState);
  }

  componentWillUnmount() {
    if (this.mouseEventCb) document.removeEventListener('mousedown', this.mouseEventCb);
  }

  bindingMouseEvent = (prevState: IState) => {
    if (this.mouseEventCb) return;

    const { isShowPreview } = this.state;
    const { 
      searchInputRef: { current: searchInput },
      previewListRef: { current: previewList },
    } = this;          
    
    this.mouseEventCb = ({ target }: MouseEvent) => {                     
      if (
        prevState.isShowPreview === isShowPreview || 
        isNull(target, searchInput, previewList)
      ) return;          

      const targetElement = target as HTMLElement;
      const elementList = [
        searchInput as HTMLDivElement, 
        previewList as HTMLUListElement
      ];
      
      if (elementList.some((element) => element.contains(targetElement))) return;

      this.setState({ isShowPreview: false });       
    };

    document.addEventListener('mousedown', this.mouseEventCb);    
  } 
  
  fetchBookSearch = _debounce(async () => {
    const { keyword } = this.state;

    if (!keyword) {
      this.setState({ bookDocuments: [] });
      return;
    }

    const { data: { documents } } = await searchBook(keyword);
    this.setState({ bookDocuments: documents });
  }, 300);

  changeKeyword = (e: React.ChangeEvent<HTMLInputElement>) => {    
   const { target: { value }  } = e;
   this.setState({ keyword: value }, this.fetchBookSearch);
  }

  focusInput = () => {    
    this.setState({ isShowPreview: true });
  }  

  clickItem = (bookDocument: IBookDocument) => {   
    this.setState({ isShowPreview: false }, () => {
      this.props.history.push({
        pathname: `/${bookDocument.title}`,
        state: { bookDocument }
      });
    });      
  }

  render() {
    const { 
      isShowPreview, 
      bookDocuments 
    } = this.state;  
    return (
      <Presenter
        searchInputRef={this.searchInputRef}
        previewListRef={this.previewListRef}  
        bookDocuments={bookDocuments || []}        
        isShowPreview={Array.isArray(bookDocuments) ? isShowPreview : false}              
        onChange={this.changeKeyword}
        onFocus={this.focusInput}
        onItemClick={this.clickItem}
      />
    )
  }
}

export default Container;