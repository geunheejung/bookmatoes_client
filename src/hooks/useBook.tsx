import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../reducers";
import {IBookSeller, requestRating, requestSeller} from "../reducers/book";
import { useCallback } from 'react';

const useBook = () => {
  const seller = useSelector((state: RootState) => state.book.seller);
  const ratingList = useSelector((state: RootState) => state.book.ratingList);
  const isSellerSpinner = useSelector((state: RootState) => state.book.isSellerSpinner);  
  const dispatch = useDispatch();

  const fetchSeller = useCallback(
    (url: string) => dispatch(requestSeller(url)),
    [dispatch]
  );

  const fetchRating = useCallback(
    (seller: IBookSeller) => dispatch(requestRating(seller)),
    [dispatch]
  );
  
  return {
    seller,
    ratingList,
    isSellerSpinner,    
    fetchSeller,
    fetchRating,
  }
}

export default useBook;