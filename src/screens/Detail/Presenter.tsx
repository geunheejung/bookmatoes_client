import React from 'react';
import { IBookDocument } from '../../services/api/kakao';
import { SellerApiResponse } from '../../services/api';
import { Button } from '../../components/button';
import { joinArrToStr, dateFormat } from '../../services/helper/format';
import Rating from '../../components/Rating/Rating';
import './styles.css';

interface IProps {
  bookDocument: IBookDocument;
  bookSellerUrlList: SellerApiResponse;
  showBookRating: () => void;
}

const Presenter: React.FC<IProps> = ({
  bookSellerUrlList,
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
          <span>{joinArrToStr(authors)}</span>
          <span>{joinArrToStr(translators)}</span>
          <span>{publisher}</span>
          <span>{dateFormat(datetime)} 출간</span>
        </p>
        <p className="book-content">
          {contents}
        </p>
        <div className="book-rating">
          <div className="rating-list">
            {
              bookSellerUrlList.map(({ siteName, url }, index) => (
                <Rating 
                  key={`${url}_${index}`}
                  siteName={siteName}
                  url={url}
                />
              ))
            }
          </div>
          <Button 
            className="show-rating-btn"
            onClick={showBookRating}
          >
            평점 보기
          </Button>          
        </div>        
      </div>      
    </div>
  );
};

export default Presenter;
