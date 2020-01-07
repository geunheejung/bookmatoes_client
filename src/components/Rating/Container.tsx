import React, { useEffect } from 'react';
import Spinner from '../Spinner';
import useBook from '../../hooks/useBook';
import { bookRating, ISellerApiRequest, IRatingResponse } from '../../services/api';
import './styles.css';

interface IProps { 
  sellerInfo: ISellerApiRequest
}

interface IState {
  response?: IRatingResponse;
  isSpinner: boolean;
}

const Rating: React.SFC<IProps> = ({ sellerInfo }) => {
  const { 
    ratingList,
    fetchRating,
  } = useBook();

  useEffect(() => {    
    fetchRating(sellerInfo);
  }, []);

  const { siteName } = sellerInfo;
  const rating = ratingList[siteName];

  const renderRating = () => {
    if (!rating || !rating.data) return;
    const { data: { totalCount, count } } = rating;
    return (
      <div>
        <b>{siteName}</b>
        <span>{totalCount} / {count}</span>
      </div>
    );
  };

  return (
    <div>
      <Spinner isLoading={rating ? rating.isSpinner : true}>
        <div>
          {/* 사이트명 : 결과 */}
          <b>{siteName}</b> : 
          {
            rating && rating.data 
              ? `${rating.data.totalCount} / ${rating.data.count}`
              : '검색 결과 없습니다.'
          }
        </div>
      </Spinner>
    </div>
  );
};

export default Rating;