import { bookFeatch } from './utils';
import { 
  BookApiEndPoint, 
  Method, 
  IBookApiPayload,
  SellerApiResponse,
  ISellerApiRequest,
  IRatingResponse
} from './type';
import {IBookSeller} from "../../reducers/book";

export const bookSellers = (payload: IBookApiPayload) => {
  const { url } = payload;
  const findText = 'bookId=';
  const bookId = url.substring(url.indexOf(findText) + findText.length, url.length);

  return bookFeatch.request<undefined, SellerApiResponse>({
    endPoint: `${BookApiEndPoint.SELLER}/${bookId}`,
    method: Method.GET,    
  });
};

export const bookRating = (seller: IBookSeller) => bookFeatch.request<ISellerApiRequest, IRatingResponse>({
  endPoint: BookApiEndPoint.RATING,
  method: Method.GET,
  payload: seller
});

export * from './type';
export * from './utils';