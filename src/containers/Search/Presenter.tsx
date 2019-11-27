import React from 'react';
import _isEmpty from 'lodash/isEmpty';
import { TBookDocumentList, IBookDocument } from '../../services/api/kakao';
import { SadTear } from '../../components/icons';
import './styles.css';

interface IProps {
  searchInputRef: React.RefObject<HTMLDivElement>; 
  previewListRef: React.RefObject<HTMLUListElement>;
  bookDocuments: TBookDocumentList;
  isShowPreview: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus: () => void;
  onItemClick: (bookDocument: IBookDocument) => void;  
}

const NotFound: React.SFC = () => (
  <div className="not-found">
    <SadTear />
    <span className="not-found__txt">검색 결과가 존재하지 않습니다.</span>
    <SadTear />
  </div>
);

const PreviewList: React.SFC<
  Pick<
    IProps, 
    'previewListRef' |
    'bookDocuments' | 
    'onItemClick'
  >
> = ({ 
  previewListRef,
  bookDocuments,   
  onItemClick }) => {    
  return (
    <ul 
      ref={previewListRef}
      className="preview-list"
    > 
      {_isEmpty(bookDocuments) && <NotFound />}
      {
        bookDocuments.map((bookDocument, index) => {
          const { title, authors } = bookDocument;
          const key = `${title}_${index}`;
          return (
            <li
              key={key}
              className="list__item"          
              onClick={() => onItemClick(bookDocument)}
            >
              <span className="item__author">{authors}</span>
              <span className="item__title">{title}</span>
            </li>
          );
        })        
      }
    </ul>
  );
};

const Presenter: React.FC<IProps> = ({  
  searchInputRef,
  previewListRef,
  bookDocuments,
  isShowPreview,
  onFocus,  
  onChange,  
  onItemClick,
}) => {  
  // input에서 커서 아웃될 때 창 닫기
  return (
    <div 
      ref={searchInputRef}
      className="search-form"
    >
      {/* 책 키워드 검색 인풋 */}
      <input
        className="search__input"
        placeholder="책 제목 e.g)미움받을 용기"
        onChange={onChange}
        onFocus={onFocus}        
      />
      {/* 검색 미리보기 리스트 */}
      {isShowPreview && (
        <PreviewList
          previewListRef={previewListRef}
          bookDocuments={bookDocuments as TBookDocumentList}
          onItemClick={onItemClick}
        />        
      )}
    </div>
  );
};

export default Presenter;
