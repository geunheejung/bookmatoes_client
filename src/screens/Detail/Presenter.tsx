import React from 'react';
import moment from 'moment';
import { IBookDocument } from '../../services/api/kakao';
import { Button } from '../../components/button';
import './styles.css';

interface IProps {
  bookDocument: IBookDocument;
  showBookRating: () => void;
}

const spreadArrToStr = (str: string | string[]) => {
  if (!Array.isArray(str)) return str;
  return str.join(', ').trimEnd();
};

const Presenter: React.FC<IProps> = ({
  bookDocument: {     
    thumbnail,
    title,
    authors,
    translators,
    publisher,
    datetime,
    contents,    
  },
  showBookRating 
}) => {
  return (    
    <div className="detail-wrapper">      
      <div className="thumbnail-wrapper">
        {/* 썸네일 */}
        <img 
          src={thumbnail}           
          alt="book_thumbnail"
        />
      </div>
      {/* 서브 */}
      <div className="info-wrapper">
        <h1 className="book-title">{title}</h1>
        <p className="book-source"> 
        <span>{spreadArrToStr(authors)}</span>
        <span>{spreadArrToStr(translators)}</span>
        <span>{publisher}</span>
        <span>{moment(datetime).format('YYYY년 MM일 DD월')} 출간</span>
        </p>
        <p className="book-content">
          {contents}
        </p>
        <div className="book-rating">
          <Button 
            className="show-rating-btn"
            onClick={showBookRating}
          >
            평점 보기
          </Button>
        </div>        
      </div>      
    </div>
  )
}

export default Presenter;
