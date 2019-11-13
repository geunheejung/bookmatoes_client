import React from 'react';
import { TBookDocumentList } from './Container';

interface IProps {
  bookDocuments?: TBookDocumentList,
  keyword: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Presenter: React.FC<IProps> = ({
  keyword,
  onChange,
}) => {
  return (
    <div className="search-form">
      {/* 책 키워드 검색 인풋 */}
      <input 
        onChange={onChange}
      />
      {/* 검색 미리보기 리스트 */}
      {!!keyword && (
        <ul className="preview-list">
          {/* 책 정보 (저자, 제목) */}
          <li className="list__item">
            <span>홍길동</span>
            <span>미움받을 용기</span>
          </li>
          <li>
            <span>홍길동</span>
            <span>미움받을 용기2</span>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Presenter;
