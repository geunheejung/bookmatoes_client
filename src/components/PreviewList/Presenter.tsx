import React from 'react';
import './styles.css';

interface IProps {

}

const Presenter: React.FC<IProps> = () => {
  return (
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
  );
};

export default Presenter;
