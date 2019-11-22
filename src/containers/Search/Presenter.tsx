import React from 'react';
import { TBookDocumentList, IBookDocument } from '../../services/api/kakao';
import { SadTear } from '../../components/icons';
import './styles.css';

interface IProps {
  bookDocuments: TBookDocumentList | undefined,  
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

const Presenter: React.FC<IProps> = ({  
  onFocus,
  bookDocuments,
  isShowPreview,
  onChange,
  onItemClick,
}) => {
  const renderListItem = () => {
    if (!bookDocuments) return;

    if (Array.isArray(bookDocuments) && !bookDocuments.length) {
      return <NotFound />;
    }

    return bookDocuments.map((bookDocument) => {
      const { 
        title, 
        authors,
        datetime 
      } = bookDocument;
      return (
        <li
          key={`${title}_${authors}_${datetime}`}
          className="list__item"
          onClick={() => onItemClick(bookDocument)}
        >
          <span className="item__author">
            {
              Array.isArray(authors) 
                ? authors.map((value, index, arr) => (
                  <span key={value}>
                    {value}
                    {index > arr.length && <br />}
                  </span>
                ))
                : authors
              }
          </span>
          <span className="item__title">{title}</span>
        </li>
      );
    });
  };
  // 포커스 -> 입력 -> 프리뷰열림 -> 선택 -> 디테일로 리다이렉트, 닫힘 -> 포커스 -> 열림
  return (
    <div className="search-form">
      {/* 책 키워드 검색 인풋 */}
      <input 
        className="search__input"
        placeholder="책 제목 e.g)미움받을 용기"
        onChange={onChange}
        onFocus={onFocus}        
      />
      {/* 검색 미리보기 리스트 */}
      {isShowPreview && (
        <ul className="preview-list">
          {renderListItem()}
        </ul>
      )}
    </div>
  );
};

export default Presenter;
