import * as React from 'react';
import Search from '../Search';
import BookDetail from '../BookDetail';

const Presenter = () => {
  return (
    <div>
      {/* 검색 폼 */}
      <Search />
      {/* 책 상세 정보 */}
      <BookDetail />
    </div>
  )
};

export default Presenter;