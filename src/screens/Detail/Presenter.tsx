import React from 'react';
import usebook from '../../hooks/useBook';
import _isEmpty from 'lodash/isEmpty';
import { IBookDocument } from '../../services/api/kakao';
import { Button } from '../../components/button';
import Spinner from '../../components/Spinner';
import { joinArrToStr, dateFormat } from '../../services/helper/format';
import Rating from '../../components/Rating/Container';
import './styles.css';

const RatingList: React.FC = () => {
  const { seller } = usebook();

  return (
    <div className="rating-list">
      {
        seller.map((sellerInfo, index) => (
          <Rating
            key={`${sellerInfo.url}_${index}`}
            sellerInfo={sellerInfo}
          />
        ))
      }
    </div>
  );
};

interface IProps {
  bookDocument: IBookDocument;
}

const Presenter: React.FC<IProps> = ({
  bookDocument: {     
    thumbnail,
    title,
    authors,
    translators,
    publisher,
    datetime,
    contents,
    url,
  },
}) => {
  const { 
    fetchSeller, 
    isSellerSpinner,  
    ratingList,  
  } = usebook();

  const onShowRating = () => fetchSeller(url);
  const ratingListKeys = Object.keys(ratingList);
  const isRatingSpinner = _isEmpty(ratingList) ? false : ratingListKeys.some(key => ratingList[key].isSpinner);

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
          <Spinner isLoading={isSellerSpinner}>
            <RatingList />    
          </Spinner>
          <Button 
            className="show-rating-btn"
            disabled={isSellerSpinner || isRatingSpinner}
            onClick={onShowRating}
          >
            평점 보기
          </Button>          
        </div>        
      </div>      
    </div>
  );
};

export default Presenter;
