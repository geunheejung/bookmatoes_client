import { put, take, call, fork } from 'redux-saga/effects';
import { AxiosResponse } from 'axios';
import {
  REQUEST_SELLER,
  REQUEST_RATING,
  BookSeller,
  IBookSeller,
  IBookRating,
  successSeller,
  requestSeller,
  requestRating,
  successRating,
} from '../reducers/book';
import { bookSellers, bookRating } from '../services/api';

export function* workRequestSellerApi(url: string) {

  try {
    const { data }: AxiosResponse<BookSeller> = yield call(bookSellers, { url });
    yield put(successSeller(data));
  } catch (e) {

  }
}

export function* workRequestRatingApi(seller: IBookSeller) {
  try {
    const { data }: AxiosResponse<IBookRating> = yield call(bookRating, seller);    

    yield put(successRating(seller.siteName, data));  
  } catch(e) {

  }
}

export function* watchRequestSellerApi() {
  while (true) {
    const action: ReturnType<typeof requestSeller> = yield take(REQUEST_SELLER);
    yield fork(workRequestSellerApi, action.payload.url);
  }
}

export function* watchRequestRatingApi() {
  while (true) {
    const action: ReturnType<typeof requestRating> = yield take(REQUEST_RATING);
    yield fork(workRequestRatingApi, action.payload);
  }
}

export default [
  watchRequestSellerApi,
  watchRequestRatingApi
];